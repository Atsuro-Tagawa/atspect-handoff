// A件・B件の是正を、テーマ161141915906へ安全に一括反映するスクリプト。
// 検索文字列は完全一致・正規表現不使用。行番号に依存しない（他ターミナルの編集でずれても壊れない）。
//
// 使い方：
//   node apply-fixes.mjs --dry-run   （既定・何も書き換えない。1件ずつ0/1/2+件を報告）
//   node apply-fixes.mjs --apply     （dry-runで全件1件だったときのみ実行を許可。部分適用はしない）
//
// バックアップ・並行編集検知・読み戻し検証は、システム開発Tが新設した
// atspect-system/scripts/theme161-pull.mjs（読み取り専用）・theme161-update.mjs
// （pull→バックアップ→CAS再チェック→upsert→SHA-256読み戻し検証）をそのまま呼び出して行う。
// 本スクリプトはこれに加えて、fixes.json 1件ごとの置換後文字列が実際に反映されたかを
// 個別に読み戻し確認し、失敗した場合はそのファイルのみ即座にバックアップから復元する。

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const SCRIPTS_DIR = "C:\\Users\\ataga\\atspect-system\\scripts";
const PULL = join(SCRIPTS_DIR, "theme161-pull.mjs");
const UPDATE = join(SCRIPTS_DIR, "theme161-update.mjs");
const FIXES_PATH = join(HERE, "fixes.json");
const REPORT_PATH = join(HERE, "apply-report.md");

const mode = process.argv.includes("--apply") ? "apply" : "dry-run";

const allFixes = JSON.parse(readFileSync(FIXES_PATH, "utf-8"));
const excluded = allFixes.filter((f) => f.excluded);
const active = allFixes.filter((f) => !f.excluded);

function pullLive(remoteFilename) {
  const tmp = mkdtempSync(join(tmpdir(), "apply-fixes-"));
  const outPath = join(tmp, "pulled.liquid");
  execFileSync("node", [PULL, remoteFilename, outPath], { cwd: SCRIPTS_DIR, stdio: "pipe" });
  const content = readFileSync(outPath, "utf-8");
  rmSync(tmp, { recursive: true, force: true });
  return content;
}

function countOccurrences(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let idx = 0;
  while ((idx = haystack.indexOf(needle, idx)) !== -1) {
    count++;
    idx += needle.length;
  }
  return count;
}

// ファイル単位にグループ化
const byFile = new Map();
for (const f of active) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

console.log(`モード: ${mode}　対象ファイル数: ${byFile.size}　実行対象件数: ${active.length}　除外件数: ${excluded.length}`);

const results = []; // { id, file, status: 'OK'|'ZERO'|'MULTI'|'APPLIED'|'VERIFY_FAIL'|'ROLLED_BACK'|'ERROR', count, note }
const fileLiveCache = new Map();

// ---- 1. dry-run 判定（apply時も必ず先に全件これを行う） ----
for (const [file, fixes] of byFile.entries()) {
  let live;
  try {
    live = pullLive(file);
  } catch (e) {
    for (const f of fixes) results.push({ id: f.id, file, status: "ERROR", count: null, note: "ライブ取得に失敗: " + e.message.split("\n")[0] });
    continue;
  }
  fileLiveCache.set(file, live);

  // 同一ファイル内で検索文字列同士が互いの部分文字列になっていないかの注意チェック（安全確認・自動除外はしない）
  for (let i = 0; i < fixes.length; i++) {
    for (let j = 0; j < fixes.length; j++) {
      if (i === j) continue;
      if (fixes[i].search && fixes[j].search && fixes[i].search !== fixes[j].search && fixes[j].search.includes(fixes[i].search)) {
        console.log(`  ⚠ 注意: ${fixes[i].id} の検索文字列が ${fixes[j].id} の検索文字列に含まれています（適用順序に注意）`);
      }
    }
  }

  for (const f of fixes) {
    const count = countOccurrences(live, f.search);
    let status;
    if (count === 1) status = "OK";
    else if (count === 0) status = "ZERO";
    else status = "MULTI";
    results.push({ id: f.id, file, status, count, note: status === "OK" ? "" : `検索文字列が${count}件見つかりました（1件のみ許可）` });
  }
}

const notOk = results.filter((r) => r.status !== "OK");

console.log("\n=== dry-run 結果 ===");
for (const r of results) {
  console.log(`  [${r.status.padEnd(6)}] ${r.id}  ${r.file ?? ""}  ${r.note}`);
}

if (mode === "dry-run") {
  writeReport({ mode, results, excluded, applied: [] });
  console.log(`\ndry-run完了。0件・2件以上・エラー ＝ ${notOk.length}件。詳細は apply-report.md を参照。`);
  if (notOk.length > 0) {
    console.log("★これらの件は apply では自動的にスキップされ、実行そのものが停止します（部分適用はしません）。");
  }
  process.exit(0);
}

// ---- 2. apply モード：1件でもOK以外があれば全体を中止 ----
if (notOk.length > 0) {
  console.error(`\n★中止: ${notOk.length}件が「1件のみ」ではありませんでした。部分適用はしません。apply を中止します。`);
  writeReport({ mode, results, excluded, applied: [], aborted: true });
  process.exit(1);
}

console.log("\n全件が1件のみの一致を確認しました。適用を開始します。");

const applied = [];

for (const [file, fixes] of byFile.entries()) {
  console.log(`\n--- ${file} ---`);
  // apply直前に再度ライブを取得（dry-runとの間の時間差での並行編集を減らす）
  let before;
  try {
    before = pullLive(file);
  } catch (e) {
    applied.push({ file, status: "ERROR", note: "適用直前の再取得に失敗: " + e.message.split("\n")[0] });
    continue;
  }

  // 直前の再チェック：件数が1件でなくなっていたら、このファイルはスキップ（他の件は続行）
  let reCheckFailed = false;
  for (const f of fixes) {
    const c = countOccurrences(before, f.search);
    if (c !== 1) {
      console.error(`  ★中止（このファイルのみ）: ${f.id} が適用直前の再取得で${c}件になっていました（他ターミナルの編集の可能性）。`);
      reCheckFailed = true;
    }
  }
  if (reCheckFailed) {
    applied.push({ file, status: "SKIPPED_RECHECK_FAILED", note: "適用直前の再チェックで不一致。このファイルは適用していません。" });
    continue;
  }

  let edited = before;
  for (const f of fixes) edited = edited.split(f.search).join(f.replace);

  const tmp = mkdtempSync(join(tmpdir(), "apply-fixes-"));
  const editedPath = join(tmp, "edited.liquid");
  writeFileSync(editedPath, edited, "utf-8");

  let updateOut;
  let backupPath = null;
  try {
    updateOut = execFileSync("node", [UPDATE, editedPath, file], { cwd: SCRIPTS_DIR, stdio: "pipe", encoding: "utf-8" });
    console.log(updateOut);
    const m = updateOut.match(/backup saved:\s*(.+?)\s+sha256:/);
    if (m) backupPath = m[1].trim();
  } catch (e) {
    console.error(`  ★アップロード失敗: ${e.message.split("\n").slice(0, 3).join(" / ")}`);
    applied.push({ file, status: "UPLOAD_FAILED", note: e.message.split("\n")[0] });
    rmSync(tmp, { recursive: true, force: true });
    continue;
  }

  // ---- 個別の置換後文字列が本当に反映されているかを読み戻して検証 ----
  let after;
  try {
    after = pullLive(file);
  } catch (e) {
    applied.push({ file, status: "VERIFY_READ_FAILED", note: e.message.split("\n")[0] });
    rmSync(tmp, { recursive: true, force: true });
    continue;
  }

  const failedFixes = fixes.filter((f) => f.replace !== "" && countOccurrences(after, f.replace) < 1);
  const stillHasOld = fixes.filter((f) => countOccurrences(after, f.search) > 0);

  if (failedFixes.length === 0 && stillHasOld.length === 0) {
    for (const f of fixes) applied.push({ id: f.id, file, status: "APPLIED", note: "" });
    console.log(`  ✓ ${fixes.length}件すべて反映を確認しました。`);
  } else {
    console.error(`  ★検証失敗＝${failedFixes.length}件が反映されていない／${stillHasOld.length}件が旧文言のまま残っています。バックアップから復元します。`);
    if (!backupPath) {
      console.error("  ★バックアップパスが取得できず、自動復元できません。手動で確認してください。");
      for (const f of fixes) applied.push({ id: f.id, file, status: "VERIFY_FAIL_NO_ROLLBACK", note: "backupPath不明のため自動復元なし" });
    } else {
      try {
        const backupContent = readFileSync(backupPath, "utf-8");
        const rbPath = join(tmp, "rollback.liquid");
        writeFileSync(rbPath, backupContent, "utf-8");
        execFileSync("node", [UPDATE, rbPath, file], { cwd: SCRIPTS_DIR, stdio: "inherit" });
        console.log(`  ✓ バックアップ（${backupPath}）から復元しました。`);
        for (const f of fixes) applied.push({ id: f.id, file, status: "ROLLED_BACK", note: `検証失敗のため${backupPath}から復元` });
      } catch (e) {
        console.error("  ★復元にも失敗しました。手動対応が必要です: " + e.message.split("\n")[0]);
        for (const f of fixes) applied.push({ id: f.id, file, status: "ROLLBACK_FAILED", note: e.message.split("\n")[0] });
      }
    }
  }
  rmSync(tmp, { recursive: true, force: true });
}

writeReport({ mode, results, excluded, applied });
console.log("\n完了。詳細は apply-report.md を参照。");

function writeReport({ mode, results, excluded, applied, aborted }) {
  const lines = [];
  lines.push(`# 是正スクリプト実行結果`);
  lines.push("");
  lines.push(`実行日時：${new Date().toISOString()}　モード：${mode}${aborted ? "（中止）" : ""}`);
  lines.push("");
  lines.push(`## 実行対象の内訳`);
  lines.push(`- 収録件数：${allFixes.length}件（実行対象 ${active.length}件／除外 ${excluded.length}件）`);
  lines.push("");
  lines.push(`## dry-run判定`);
  lines.push(`| ID | ファイル | 判定 | 件数 | 備考 |`);
  lines.push(`|---|---|---|---|---|`);
  for (const r of results) lines.push(`| ${r.id} | ${r.file ?? ""} | ${r.status} | ${r.count ?? "-"} | ${r.note} |`);
  lines.push("");
  if (applied.length > 0) {
    lines.push(`## apply結果`);
    lines.push(`| ID | ファイル | 結果 | 備考 |`);
    lines.push(`|---|---|---|---|`);
    for (const a of applied) lines.push(`| ${a.id ?? ""} | ${a.file} | ${a.status} | ${a.note} |`);
    lines.push("");
  }
  lines.push(`## 除外件（fixes.json内・excluded:true）`);
  lines.push(`| ID | 出典 | 除外理由 |`);
  lines.push(`|---|---|---|`);
  for (const e of excluded) lines.push(`| ${e.id} | ${e.source} | ${e.exclusionReason} |`);
  writeFileSync(REPORT_PATH, lines.join("\n") + "\n", "utf-8");
}
