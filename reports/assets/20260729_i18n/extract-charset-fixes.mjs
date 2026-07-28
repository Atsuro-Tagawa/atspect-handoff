// テーマ側 文字種違反103箇所136件について、report3.mdの(file,line,base,lang,type)をキーに
// i18n-audit.mjsと同じ抽出ロジックでライブのテーマファイルから「切り詰めていない」完全な
// snippetを再取得し、fix-orders-charset.md 用の 検索文字列/置換文字列 候補を機械生成する。
// 読み取りのみ・書き換えは一切しない。人間が最終レビューする前段の下ごしらえ。

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const THEME_ROOT = "C:\\Users\\ataga\\atspect-theme";
const SECTIONS_DIR = join(THEME_ROOT, "sections");
const REPORT3 = "C:\\Users\\ataga\\atspect-handoff\\reports\\assets\\20260729_i18n\\i18n-audit-report3.md";
const OUT_JSON = "C:\\Users\\ataga\\atspect-handoff\\reports\\assets\\20260729_i18n\\charset-fix-candidates.json";

const LANGS = ["ja", "en", "zh-cn", "zh-tw", "ko", "fr", "es", "de"];
const LANG_ALT = LANGS.map((l) => l.replace("-", "\\-")).join("|");

function lineOf(content, pos) {
  let line = 1;
  for (let i = 0; i < pos && i < content.length; i++) if (content[i] === "\n") line++;
  return line;
}

const CLASS_LANG_RE = new RegExp(`([a-zA-Z0-9_-]+)--(${LANG_ALT})\\b`, "g");

function extractClassRecords(content) {
  const records = [];
  for (const m of content.matchAll(/class="([^"]*)"/g)) {
    const classAttr = m[1];
    const pos = m.index;
    let mm;
    CLASS_LANG_RE.lastIndex = 0;
    while ((mm = CLASS_LANG_RE.exec(classAttr))) {
      records.push({ pos, base: mm[1], lang: mm[2] });
    }
  }
  return records;
}

function extractDataLangRecords(content) {
  const records = [];
  const tagRe = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\bdata-lang="(${LANG_ALT})"[^>]*>`, "g");
  for (const m of content.matchAll(tagRe)) {
    const tagFull = m[0];
    const classM = tagFull.match(/class="([^"]*)"/);
    const base = "data-lang:" + m[1] + (classM ? ":" + classM[1] : "");
    records.push({ pos: m.index, base, lang: m[2] });
  }
  return records;
}

function snippetAfter(content, pos) {
  const openEnd = content.indexOf(">", pos);
  if (openEnd === -1) return "";
  const rest = content.slice(openEnd + 1, openEnd + 1 + 400);
  const candidates = [];
  const closeTag = rest.search(/<\/[a-zA-Z]/);
  if (closeTag !== -1) candidates.push(closeTag);
  const liquidTag = rest.search(/\{%/);
  if (liquidTag !== -1) candidates.push(liquidTag);
  const nextLangTag = rest.search(/<[a-zA-Z][^>]*--(?:ja|en|zh-cn|zh-tw|ko|fr|es|de)/);
  if (nextLangTag !== -1) candidates.push(nextLangTag);
  const cut = candidates.length > 0 ? Math.min(...candidates, 300) : Math.min(rest.length, 300);
  return rest.slice(0, cut);
}

function groupRecords(records, content) {
  records.sort((a, b) => a.pos - b.pos);
  const groups = [];
  const openByBase = new Map();
  for (const r of records) {
    let g = openByBase.get(r.base);
    if (g && g.langs.has(r.lang)) g = null;
    if (!g) {
      g = { base: r.base, langs: new Map(), startPos: r.pos };
      openByBase.set(r.base, g);
      groups.push(g);
    }
    g.langs.set(r.lang, { pos: r.pos });
  }
  return groups;
}

// --- report3.md から テーマ側「文字種の違反」表を読み込む ---
const report3 = readFileSync(REPORT3, "utf-8");
const lines3 = report3.split("\n");
const start = lines3.findIndex((l) => l.includes("## テーマ：文字種の違反"));
const end = lines3.findIndex((l, i) => i > start && l.startsWith("## テーマ：除外"));
const rows3 = lines3.slice(start + 3, end).filter((l) => l.trim().startsWith("|") && !l.includes("---"));

const targets = rows3.map((r) => {
  const cols = r.split("|").map((c) => c.trim());
  return { file: cols[1], line: parseInt(cols[2], 10), base: cols[3], lang: cols[4], type: cols[5], countReported: parseInt(cols[6], 10) };
});

console.log(`report3.mdから読み込んだ対象: ${targets.length}件`);

// --- ファイルごとに全グループを再構築し、(base,lang,line)で照合 ---
const fileCache = new Map();
function getFileData(relFile) {
  if (fileCache.has(relFile)) return fileCache.get(relFile);
  const fname = relFile.split("/").pop();
  const filePath = join(SECTIONS_DIR, fname);
  const content = readFileSync(filePath, "utf-8");
  const classGroups = groupRecords(extractClassRecords(content), content);
  const dataLangGroups = groupRecords(extractDataLangRecords(content), content);
  const data = { content, groups: [...classGroups, ...dataLangGroups] };
  fileCache.set(relFile, data);
  return data;
}

const results = [];
for (const t of targets) {
  const { content, groups } = getFileData(t.file);
  let found = null;
  for (const g of groups) {
    if (g.base !== t.base) continue;
    const entry = g.langs.get(t.lang);
    if (!entry) continue;
    if (lineOf(content, entry.pos) !== t.line) continue;
    found = entry;
    break;
  }
  if (!found) {
    results.push({ ...t, error: "照合失敗(グループが再現できない)" });
    continue;
  }
  const rawSnippet = snippetAfter(content, found.pos);
  results.push({ ...t, rawSnippet, truncated: rawSnippet.length >= 300 });
}

writeFileSync(OUT_JSON, JSON.stringify(results, null, 2), "utf-8");
const errors = results.filter((r) => r.error);
const truncated = results.filter((r) => r.truncated);
console.log(`照合失敗: ${errors.length}件`, errors.map((e) => `${e.file}:${e.line}:${e.lang}`));
console.log(`300文字超で切り詰められた可能性: ${truncated.length}件`, truncated.map((t) => `${t.file}:${t.line}:${t.lang}`));
console.log(`出力: ${OUT_JSON}`);
