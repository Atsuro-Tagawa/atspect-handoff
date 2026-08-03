// 打診名簿の重複検出（2026-08-03・営業戦略T）
// 使い方: node roster-dedupe.mjs <名簿CSV> [<名簿CSV> ...]
// 出力: 重複の一覧＋担当の決め方の候補。★このスクリプトは読み取りのみ。名簿を書き換えません。
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const files = process.argv.slice(2);
if (!files.length) { console.error("usage: node roster-dedupe.mjs <csv> [<csv> ...]"); process.exit(1); }

// CSVの1行を分解（"…" の中のカンマを守る）
function splitLine(line) {
  const out = []; let cur = "", q = false;
  for (const ch of line) {
    if (ch === '"') { q = !q; continue; }
    if (ch === "," && !q) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

// 突き合わせ用にお名前をそろえる（全角半角・空白・記号のゆれを吸収）
function normName(s) {
  return (s || "")
    .normalize("NFKC")
    .replace(/[\s\u3000]/g, "")
    .replace(/[（(].*?[)）]/g, "")
    .replace(/[様さま氏先生]$/g, "")
    .toLowerCase();
}
function normKana(s) {
  return (s || "").normalize("NFKC").replace(/[\s\u3000]/g, "")
    .replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60)); // カタカナ→ひらがな
}
// 「最後にお会いした時期」から西暦4桁を拾う（拾えなければ null）
function year(s) { const m = (s || "").match(/(19|20)\d{2}/); return m ? Number(m[0]) : null; }

const rows = [];
for (const f of files) {
  const raw = readFileSync(f, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  const head = splitLine(lines[0]);
  const idx = (name) => head.indexOf(name);
  for (const line of lines.slice(1)) {
    const c = splitLine(line);
    const name = c[idx("お名前")] || "";
    if (!name || name.startsWith("〈記入例〉")) continue; // 記入例の行は数えない
    rows.push({
      file: basename(f),
      name,
      key: normName(name),
      kana: normKana(c[idx("お名前かな")]),
      dan: c[idx("ご所属団体")] || "",
      last: c[idx("最後にお会いした時期")] || "",
      y: year(c[idx("最後にお会いした時期")]),
      tanto: c[idx("担当")] || "",
      by: c[idx("書き出した人")] || "",
      saikakunin: c[idx("直前再確認")] || "",
    });
  }
}

// 氏名で束ねる（かなが入っていれば、かなでも束ねる）
const byKey = new Map();
for (const r of rows) {
  for (const k of [r.key, r.kana ? "かな:" + r.kana : null].filter(Boolean)) {
    if (!byKey.has(k)) byKey.set(k, []);
    if (!byKey.get(k).some((x) => x === r)) byKey.get(k).push(r);
  }
}

const dupGroups = [];
const seen = new Set();
for (const [, g] of byKey) {
  if (g.length < 2) continue;
  const sig = g.map((r) => r.file + "|" + r.name).sort().join("//");
  if (seen.has(sig)) continue;
  seen.add(sig);
  if (new Set(g.map((r) => r.file + "|" + r.name)).size < 2) continue;
  dupGroups.push(g);
}

console.log(`名簿 ${files.length}本／のべ ${rows.length}名／実人数 約${new Set(rows.map((r) => r.key)).size}名`);
console.log(`★重複 ${dupGroups.length}件`);
if (!dupGroups.length) console.log("  （重複はありませんでした）");
for (const g of dupGroups) {
  console.log("\n― " + g.map((r) => `${r.name}（${r.file}／書き出した人:${r.by || "空欄"}／最後にお会いした時期:${r.last || "空欄"}）`).join("\n  "));
  const withY = g.filter((r) => r.y !== null);
  if (withY.length) {
    const newest = withY.reduce((a, b) => (b.y > a.y ? b : a));
    console.log(`  → 担当の候補＝「最後にお会いした時期がいちばん新しい方」＝${newest.by || newest.file}（${newest.y}年）`);
  } else {
    console.log("  → ★時期が空欄のため機械では決められません。3人で話して決めてください");
  }
  const t = [...new Set(g.map((r) => r.tanto).filter(Boolean))];
  if (t.length > 1) console.log(`  ★担当が食い違っています＝${t.join(" / ")}（このままだと別々に接触します）`);
}

const mi = rows.filter((r) => r.saikakunin !== "済");
console.log(`\n★直前再確認が「済」でない方＝${mi.length}名（お送りになる前に、除外基準の5項目を実施してください）`);
