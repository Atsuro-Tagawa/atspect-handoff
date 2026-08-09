/* 巡回結果の分類。pout_<handle>_<lang>.out を読み、裁定辞書の型に自動でタグ付けする。
 * 一致しないものは「未知」として先磨きリスト候補にする。
 * 使い方: node classify.mjs <handles.txt> > report.json */
import { readFileSync, existsSync } from "node:fs";

const handlesFile = process.argv[2];
const handles = readFileSync(handlesFile, "utf8").trim().split(/\r?\n/).filter(Boolean);
const LANGS = ["en", "zh_cn", "zh_tw", "ko", "fr", "es", "de"];

// キーワード→裁定辞書ID（優先順。上から順に判定）
// ★「違和感（note）の説明文」だけを見る。引用（quote）に偶然その記号が含まれるだけでは判定しない
// （初版は quote+note をまとめて見ており、括弧を含む引用文すべてがA3に化ける過検出があった＝実測で発見し訂正）。
const RULES = [
  [/造形.*造型|造型.*(が正しい|に統一|とすべき)|「造形」/, "A7"],
  [/(中黒|なかぐろ|・.*(不要|不自然|日本式))/, "A1"],
  [/(ふりがな|読み仮名|かなが.*混入|仮名が.*残)/, "A2"],
  [/(全角(空白|括弧|かっこ|約物)|全形(括弧|空白)|fullwidth (space|paren))/, "A3"],
  [/(二重空白|重複した(空白|句読点)|double space)/, "A9"],
  [/分かち書き/, "A6"],
  [/(マクロン|長音記号|macron).*(地名|Tokyo|Kyoto|Osaka|Nihon(bashi)?|Präfektur)/, "A8"],
  [/(マクロン|長音記号|macron|ローマ字化|romanization|未処理の(日本語|漢字)|漢字.*(残|混入))/, "B1"],
  [/(固有名詞|人名|施設名|団体名|学部名|作品名|美術館名|雑誌名).*(表記|綴り|訳し方|訳されて)/, "B1"],
  [/(併記|原名|訳名).*(異物|未処理|唐突|不統一)/, "B2"],
  [/(大げさ|美文調|装飾過剰|過度に(詩的|抽象)|florid|excessif|übertrieben|exagerad)/, "B3_or_C1"],
  [/(素材|技法|彩色|箔|釉).*(曖昧|辞書的|不明確)/, "B4"],
  [/肩書き.*(選択|不自然|訳語)/, "B5"],
  [/(一般性に乏しい|一般的でない).*(素材|技法|用語)/, "B8"],
  [/(現在形|is known|est connu|ist bekannt|es conocido).*(過去形|should be past|passé)/, "B10"],
  [/imparfait.*(複合過去|passé composé)/, "B11"],
  [/(単純過去|passé simple|古典調|文語調|littéraire)/, "C2"],
  [/(長すぎる|長文|一文.*詰め込|1文が長い|too long|zu lang|trop long)/, "C1"],
  [/(断片|文型.*混在|不完全な文|主語.*(欠け|ない)|fragment|incomplete sentence|unvollständig)/, "A4"],
  [/(制度|資格|会友|membership)/, "C3"],
  [/(機関名|収蔵先).*(訳語|翻訳)/, "C4"],
  [/(gloss|説明語|定訳がない)/, "C10"],
  [/(序列語|leading figure|pioneer|renowned|著名|先駆者|巨匠|大家|重鎮)/, "C9"],
  [/(事実確認|年号が|経歴が|数値が).*(誤|不明)/, "C5"],
];

function classify(note) {
  const text = note || "";
  for (const [re, id] of RULES) if (re.test(text)) return id;
  return "UNKNOWN";
}

const results = [];
for (const h of handles) {
  for (const l of LANGS) {
    const p = `pout_${h}_${l}.out`;
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, "utf8");
    if (/^SKIP/.test(raw)) continue;
    const s = raw.indexOf("\ncodex\n"), e = raw.indexOf("\ntokens used");
    const body = s >= 0 && e > s ? raw.slice(s + 7, e) : raw;
    const lines = body.split("\n");
    let cur = null;
    for (const line of lines) {
      const t = line.trim();
      if (/^引用:/.test(t)) { if (cur) results.push(cur); cur = { handle: h, lang: l, quote: t.replace(/^引用:\s*/, "") }; }
      else if (/^違和感:/.test(t) && cur) { cur.note = t.replace(/^違和感:\s*/, ""); }
      else if (/^総評:/.test(t)) { if (cur) { results.push(cur); cur = null; } }
    }
    if (cur) results.push(cur);
  }
}
for (const r of results) r.type = classify(r.note);

const byType = {};
for (const r of results) byType[r.type] = (byType[r.type] || 0) + 1;
console.error("総件数:", results.length);
console.error("型別:", JSON.stringify(byType, null, 1));
console.error("未知件数:", results.filter((r) => r.type === "UNKNOWN").length);

process.stdout.write(JSON.stringify(results, null, 1));
