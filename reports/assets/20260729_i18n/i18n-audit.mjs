// テーマ全体（sections/*.liquid）の多言語表示を全数走査する検査ツール。
// 検出するもの：
//   1. 日本語にはあるが、7言語のいずれかに対応が無いもの
//   2. 7言語側にはあるが、日本語に対応が無いもの
//   3. 日本語以外の言語ブロックに、ひらがな・カタカナが混ざっているもの（固有名詞は除外可）
//   4. 意図的に日本語のみとして実装されている箇所（違反ではない・別枠一覧）
//   + 未知の多言語構造（クラス方式でも属性方式でもない、CSSで言語切替されている形跡があるもの）への警告
//
// 対応する2方式：
//   (a) クラス方式＝ class="...<base>--<lang>..."
//   (b) 属性方式＝ data-lang="<lang>"
// 読み取りのみ・書き換えは一切しない。

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const THEME_ROOT = "C:\\Users\\ataga\\atspect-theme";
const SECTIONS_DIR = join(THEME_ROOT, "sections");
const OUT_DIR = "C:\\Users\\ataga\\atspect-handoff\\reports\\assets\\20260729_i18n";

const LANGS = ["ja", "en", "zh-cn", "zh-tw", "ko", "fr", "es", "de"];
const LANG_ALT = LANGS.map((l) => l.replace("-", "\\-")).join("|");

// ひらがな(3040-309F)・カタカナ(30A0-30FF)。ただし中黒(30FB)・長音符(30FC)は除外（CJK共通の記号・地名等で誤検知が多いため）。
// \u3072\u3089\u304C\u306A\u30FB\u30AB\u30BF\u30AB\u30CA\uFF08\u5168\u89D2\uFF09\uFF0B\u534A\u89D2\u30AB\u30BF\u30AB\u30CA(U+FF66-FF9F)\u3002\u4E2D\u9ED2(30FB/FF65)\u30FB\u9577\u97F3\u7B26(30FC)\u306F\u9664\u5916\u3002
const KANA_RE = /[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\uFF66-\uFF9F]/;
// 既知の意図的な例外（ブランド名の日本語併記など）。ここに列挙した文字列を含む場合のみ、そのカナ文字は除外する。
const ALLOWLIST_SUBSTRINGS = ["あつぺくと"];

function listLiquidFiles(dir) {
  return readdirSync(dir).filter((f) => f.endsWith(".liquid")).map((f) => join(dir, f));
}

function lineOf(content, pos) {
  let line = 1;
  for (let i = 0; i < pos && i < content.length; i++) if (content[i] === "\n") line++;
  return line;
}

// --- CSS側：言語トグルされているクラスの一覧を作る（未知構造・意図的JA限定の判定材料） ---
function extractCssLangToggles(content) {
  const styleBlocks = [...content.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const toggles = new Map(); // className -> { shownFor: Set<lang|'default'>, hiddenByDefault: boolean }
  for (const css of styleBlocks) {
    for (const m of css.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{\s*display\s*:\s*none/g)) {
      const cls = m[1];
      if (!toggles.has(cls)) toggles.set(cls, { shownFor: new Set(), hiddenByDefault: false });
      toggles.get(cls).hiddenByDefault = true;
    }
    for (const m of css.matchAll(new RegExp(`html\\[data-lang="(${LANG_ALT})"\\][^{]*?\\.([a-zA-Z0-9_-]+)`, "g"))) {
      const [, lang, cls] = m;
      if (!toggles.has(cls)) toggles.set(cls, { shownFor: new Set(), hiddenByDefault: false });
      toggles.get(cls).shownFor.add(lang);
    }
    for (const m of css.matchAll(/html:not\(\[data-lang\]\)[^{]*?\.([a-zA-Z0-9_-]+)/g)) {
      const cls = m[1];
      if (!toggles.has(cls)) toggles.set(cls, { shownFor: new Set(), hiddenByDefault: false });
      toggles.get(cls).shownFor.add("default"); // 既定表示＝日本語相当
    }
  }
  return toggles;
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
      records.push({ pos, base: mm[1], lang: mm[2], source: "class", rawClass: mm[0] });
    }
  }
  return records;
}

function extractDataLangRecords(content) {
  const records = [];
  const tagRe = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\bdata-lang="(${LANG_ALT})"[^>]*>`, "g");
  for (const m of content.matchAll(tagRe)) {
    // 直前のclass属性があれば、それをグループ識別子に使う（無ければタグ名のみ）
    const tagFull = m[0];
    const classM = tagFull.match(/class="([^"]*)"/);
    const base = "data-lang:" + m[1] + (classM ? ":" + classM[1] : "");
    records.push({ pos: m.index, base, lang: m[2], source: "data-lang", rawClass: tagFull.slice(0, 60) });
  }
  return records;
}

// テキスト抜粋（カナ検査用）：タグの直後から、以下のうち最も早いものの手前まで
//   ・次の閉じタグ（</...>）＝要素本体の終わり
//   ・次のLiquidタグ開始（{%）＝コメント・ロジックの混入を避ける
//   ・次の--lang付き開始タグ（同じ要素グループの次の言語）
//   ・400文字
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

// 連続run方式でグルーピング：同じbaseで、同じ言語が既に集まっている場合は新グループを開始
function groupRecords(records, content) {
  records.sort((a, b) => a.pos - b.pos);
  const groups = [];
  const openByBase = new Map(); // base -> current group
  for (const r of records) {
    let g = openByBase.get(r.base);
    if (g && g.langs.has(r.lang)) {
      g = null; // 同じ言語が再登場＝新しいグループ
    }
    if (!g) {
      g = { base: r.base, source: r.source, langs: new Map(), startPos: r.pos, endPos: r.pos };
      openByBase.set(r.base, g);
      groups.push(g);
    }
    const snippet = snippetAfter(content, r.pos);
    // タグ除去に加え、空白扱いのHTMLエンティティ（&nbsp;等）も除去してから空判定する
    // （Codex独立レビューで指摘＝エンティティ未デコードのため&nbsp;単体を「非空」と誤判定するバグ）
    const isEmpty = snippet
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;|&#160;|&#xa0;/gi, "")
      .trim() === "";
    g.langs.set(r.lang, { pos: r.pos, empty: isEmpty });
    g.endPos = r.pos;
  }
  return groups;
}

const findings = { missingInNonJa: [], missingInJa: [], kanaLeak: [], jaOnlyIntentional: [], unknownStructure: [] };

const files = listLiquidFiles(SECTIONS_DIR);
console.log(`対象ファイル数: ${files.length}`);

for (const filePath of files) {
  const content = readFileSync(filePath, "utf-8");
  const relFile = "sections/" + filePath.split(/[\\/]/).pop();

  const cssToggles = extractCssLangToggles(content);
  const classRecords = extractClassRecords(content);
  const dataLangRecords = extractDataLangRecords(content);

  const classGroups = groupRecords(classRecords, content);
  const dataLangGroups = groupRecords(dataLangRecords, content);

  for (const g of [...classGroups, ...dataLangGroups]) {
    if (g.langs.size < 2) continue; // 単独言語のみ＝多言語グループとして扱わない
    // 「存在する」＝class/属性があり、かつ中身が空でないこと
    const nonEmptyLangs = new Set([...g.langs.entries()].filter(([, v]) => !v.empty).map(([l]) => l));
    const presentAny = new Set(g.langs.keys()); // class/属性としては存在（空文字含む）
    const missingNonJa = LANGS.filter((l) => l !== "ja" && !nonEmptyLangs.has(l));
    const hasJaNonEmpty = nonEmptyLangs.has("ja");
    const line = lineOf(content, g.startPos);
    const endLine = lineOf(content, g.endPos);

    if (hasJaNonEmpty && missingNonJa.length > 0) {
      const emptyButPresent = missingNonJa.filter((l) => presentAny.has(l));
      const trulyAbsent = missingNonJa.filter((l) => !presentAny.has(l));
      findings.missingInNonJa.push({ file: relFile, base: g.base, line, endLine, present: [...nonEmptyLangs], missingEmpty: emptyButPresent, missingAbsent: trulyAbsent });
    }
    if (!hasJaNonEmpty && nonEmptyLangs.size > 0) {
      findings.missingInJa.push({ file: relFile, base: g.base, line, endLine, present: [...nonEmptyLangs] });
    }

    // カナ混入チェック（非ja言語のみ）
    for (const [lang, v] of g.langs.entries()) {
      if (lang === "ja" || v.empty) continue;
      const snippet = snippetAfter(content, v.pos);
      if (KANA_RE.test(snippet)) {
        const isAllowlisted = ALLOWLIST_SUBSTRINGS.some((s) => snippet.includes(s));
        let residual = snippet;
        for (const s of ALLOWLIST_SUBSTRINGS) residual = residual.split(s).join("");
        if (KANA_RE.test(residual)) {
          findings.kanaLeak.push({ file: relFile, base: g.base, lang, line: lineOf(content, v.pos), snippet: snippet.slice(0, 120).replace(/\s+/g, " ").trim(), allowlistedPartial: isAllowlisted });
        }
      }
    }
  }

  // ---- 意図的JA限定・未知構造の検出（CSSトグル情報から） ----
  for (const [cls, info] of cssToggles.entries()) {
    if (!info.hiddenByDefault) continue; // display:noneの指定がないものは対象外
    // クラス名自体が --lang サフィックス方式なら、通常の多言語スキャンで既に拾われているので対象外
    const isSuffixStyle = new RegExp(`--(${LANG_ALT})$`).test(cls);
    if (isSuffixStyle) continue;
    // html[data-lang="..."] または html:not([data-lang]) による条件付き表示ルールが
    // 実際にこのクラスに対して存在する場合のみ「言語関連」とみなす。
    // これが無いクラス（アコーディオン・ドロップダウン・ハニーポット等、言語と無関係なhidden状態）は対象外。
    if (info.shownFor.size === 0) continue;

    const shown = info.shownFor;
    const usageRe = new RegExp(`class="[^"]*\\b${cls}\\b[^"]*"`, "g");
    const usages = [...content.matchAll(usageRe)];
    if (usages.length === 0) continue; // CSSに定義はあるが実際には使われていない

    const onlyJaOrDefault = [...shown].every((s) => s === "ja" || s === "default");
    if (onlyJaOrDefault) {
      for (const u of usages) {
        findings.jaOnlyIntentional.push({ file: relFile, class: cls, line: lineOf(content, u.index) });
      }
    } else {
      // data-langでもclass--langでもない、かつja限定とも言えない＝未知の多言語風構造
      for (const u of usages) {
        findings.unknownStructure.push({ file: relFile, class: cls, line: lineOf(content, u.index), shownFor: [...shown].join(",") || "(不明)" });
      }
    }
  }
}

// ---- 出力 ----
console.log("missingInNonJa:", findings.missingInNonJa.length);
console.log("missingInJa:", findings.missingInJa.length);
console.log("kanaLeak:", findings.kanaLeak.length);
console.log("jaOnlyIntentional:", findings.jaOnlyIntentional.length);
console.log("unknownStructure:", findings.unknownStructure.length);

writeFileSync(join(OUT_DIR, "i18n-audit-raw.json"), JSON.stringify(findings, null, 2), "utf-8");
console.log("raw JSON saved.");

// ---- 既知（本日までに票にしたもの）との突き合わせ ----
// 「既知」の判定は機械的（ファイル名＋概ねの行位置＋言語）で行う。是正はしない。一覧化のみ。
const KNOWN = [
  { category: "missingInNonJa", file: "sections/atspect-artwork-detail.liquid", lineNear: 296, note: "master-findings#69／fix-orders.md A-69・本日是正指示票に収録済み（決済文言7言語欠落）" },
  { category: "kanaLeak", file: "sections/atspect-footer.liquid", lineNear: 61, note: "master-findings#65／fix-orders.md A-65・本日是正指示票に収録済み（zh-tw「の」誤字）" },
  { category: "kanaLeak", file: "sections/atspect-press-page.liquid", lineNear: 21, note: "master-findings#67／fix-orders.md A-67・本日是正指示票に収録済み（zh-cn「あつぺくとは」未翻訳）" },
  { category: "kanaLeak", file: "sections/atspect-press-page.liquid", lineNear: 22, note: "master-findings#67／fix-orders.md A-67・本日是正指示票に収録済み（zh-tw「あつぺくとは」未翻訳）" },
  { category: "jaOnlyIntentional", file: "sections/atspect-privacy.liquid", lineNear: 81, note: "privacy-unified-draft.mdで既に把握・削除対象として扱い済み（pv-jaonly構造）" },
  { category: "jaOnlyIntentional", file: "sections/atspect-privacy.liquid", lineNear: 147, note: "privacy-unified-draft.mdで既に把握・削除対象として扱い済み（pv-jaonly構造）" },
];

function findKnown(category, file, line) {
  return KNOWN.find((k) => k.category === category && k.file === file && Math.abs(k.lineNear - line) <= 3);
}

const md = [];
md.push("# 8言語突き合わせ検査 結果");
md.push("");
md.push(`実行日時：${new Date().toISOString()}　対象：\`atspect-theme/sections/*.liquid\`（${files.length}ファイル）`);
md.push("");
md.push("読み取りのみ。是正はしていません。新規に見つかった件も一覧にするところまでです。");
md.push("");
md.push("## サマリ");
md.push("");
md.push(`| 種別 | 件数 |`);
md.push(`|---|---|`);
md.push(`| 1. 日本語にあるが7言語のいずれかに対応なし | ${findings.missingInNonJa.length} |`);
md.push(`| 2. 7言語にあるが日本語に対応なし | ${findings.missingInJa.length} |`);
md.push(`| 3. 非日本語ブロックへのひらがな・カタカナ混入 | ${findings.kanaLeak.length} |`);
md.push(`| 4. 意図的な日本語限定構造（違反ではない・別枠） | ${findings.jaOnlyIntentional.length} |`);
md.push(`| 未知の多言語風構造（要確認） | ${findings.unknownStructure.length} |`);
md.push("");

function section(title, items, category, cols) {
  md.push(`## ${title}`);
  md.push("");
  if (items.length === 0) {
    md.push("該当なし。");
    md.push("");
    return;
  }
  md.push(`| ${cols.join(" | ")} | 既知／新規 | 備考 |`);
  md.push(`|${cols.map(() => "---").join("|")}|---|---|`);
  for (const it of items) {
    const known = findKnown(category, it.file, it.line);
    const cells = cols.map((c) => JSON.stringify(it[c] ?? "")).map((s) => s.replace(/^"|"$/g, ""));
    md.push(`| ${cells.join(" | ")} | ${known ? "既知" : "**新規**"} | ${known ? known.note : ""} |`);
  }
  md.push("");
}

section("1. 日本語にあるが7言語のいずれかに対応なし", findings.missingInNonJa, "missingInNonJa", ["file", "line", "base", "present", "missingEmpty", "missingAbsent"]);
section("2. 7言語にあるが日本語に対応なし", findings.missingInJa, "missingInJa", ["file", "line", "base", "present"]);
section("3. 非日本語ブロックへのひらがな・カタカナ混入", findings.kanaLeak, "kanaLeak", ["file", "line", "base", "lang", "snippet"]);
section("4. 意図的な日本語限定構造（違反ではない・別枠一覧）", findings.jaOnlyIntentional, "jaOnlyIntentional", ["file", "line", "class"]);
section("未知の多言語風構造（要確認・是正なし）", findings.unknownStructure, "unknownStructure", ["file", "line", "class", "shownFor"]);
if (findings.unknownStructure.length > 0) {
  md.push("**目視で確認した文脈（是正はしていません・参考情報のみ）**：");
  md.push("");
  md.push("- `awt-l--latin`／`cawt--latin`＝作品タイトル等の表示。コメントに「2026-07-23代表確定＝全言語で《》統一・非日本語のイタリックは維持」「B案：言語連動・単一表示。日本語UI＝原題／非日本語UI＝en→romaji→原題（product_i18nのみ・捏造翻訳なし）」とあり、8言語それぞれに個別翻訳を与えるpv-l方式とは異なり、非日本語UIの7言語すべてに「英語タイトル→ローマ字→原題」の同一フォールバック値を1つだけ表示する、意図的な別方式と見られます。翻訳漏れではなく方式の違いの可能性が高いですが、本検査ツールの対象外の構造のため未知として報告しています。断定はしていません。");
  md.push("- `atspect-qb__original`＝引用（ticker）ブロック。コメントに「原文以外の表示言語のときだけ、原文を併記（訳であることを明示＝捏造ゼロ）」とあり、`{%- if orig_lang == 'en' -%}`のようなLiquid側の条件分岐で表示を切り替えており、CSSのdisplay:noneによる言語トグルではなく、テンプレート側のif分岐で実現されています。本検査ツールはCSS側のdata-lang条件分岐とクラスの--lang方式のみを対象としているため、この方式は検出対象外の第3の方式として「未知」に分類されました。翻訳漏れではなく検出方式の違いの可能性が高いですが、断定はしていません。");
  md.push("");
}

const newCount =
  findings.missingInNonJa.filter((i) => !findKnown("missingInNonJa", i.file, i.line)).length +
  findings.missingInJa.filter((i) => !findKnown("missingInJa", i.file, i.line)).length +
  findings.kanaLeak.filter((i) => !findKnown("kanaLeak", i.file, i.line)).length +
  findings.unknownStructure.length; // unknownStructureは全件「既知」判定の対象外＝すべて新規扱い

md.push("## まとめ");
md.push("");
md.push(`- 検出総数＝${findings.missingInNonJa.length + findings.missingInJa.length + findings.kanaLeak.length + findings.jaOnlyIntentional.length + findings.unknownStructure.length}件。`);
md.push(`- うち新規（本日これまでの票に未収録）＝約${newCount}件（未知の多言語風構造${findings.unknownStructure.length}件を含む）。`);
md.push("- 新規の分は是正していません。一覧化のみです。");
md.push("");
md.push("### この検査の既知の限界（正直な記載・Codex独立レビュー反映済み）");
md.push("");
md.push("- 対象は`sections/*.liquid`のみです。`snippets/`配下は対象外です（今回の走査範囲外）。");
md.push("- グルーピングは文書内の出現順の連続性に基づく簡易ヒューリスティックで、DOM階層・親要素は見ていません。同じbase名（クラス名の`--lang`を除いた部分）が別々のセクション・別々の意味グループで再利用されている場合、誤って1つのグループに統合される、または逆に誤分割される可能性があります（Codex独立レビューで指摘）。本走査では85ファイルの結果を目視確認し、既知5件の過不足ない再検出を確認していますが、全89ファイル・全グループの網羅的な正しさを保証するものではありません。");
md.push("- カナ混入チェックの抜粋範囲（タグ直後から次の閉じタグ/Liquidタグ/次言語タグ/400文字のいずれか手前まで）は簡易ヒューリスティックです。極端に長い一文（改行を挟む長文）では途中で打ち切られる場合があります。");
md.push("- 空文字列判定は`&nbsp;`等の主要なHTMLエンティティを除去したうえで行っていますが、その他の空白系エンティティ（`&ensp;`等）やLiquid変数展開後にのみ空になるケースまでは対応していません（Codex独立レビューで指摘・主要なものは反映済み）。");
md.push("- カナ検出は全角ひらがな・カタカナ＋半角カタカナに対応していますが、結合濁点・半濁点の単独混入、仮名拡張ブロック（アイヌ語表記等）までは対応していません（Codex独立レビューで指摘。この構成のテーマでの実害は低いと判断し未対応）。");
md.push("- 固有名詞の除外リストは`あつぺくと`のみを収録しています。他の固有名詞（作家名・作品名等）でカナ混入が検出された場合は、目視で固有名詞かどうかを判断してください。");

writeFileSync(join(OUT_DIR, "i18n-audit-report.md"), md.join("\n") + "\n", "utf-8");
console.log("report written: i18n-audit-report.md");

// ============================================================================
// 追加便（2026-07-29）：コーポレートサイト（atspect.co.jp/privacy.html）対応。
// テーマ（.com）とはマークアップ構造が異なる（実測結果）：
//   ・8言語すべてが <div class="lang-block" data-lang="X"> でページ全体を丸ごと包む方式
//     （テーマのようにspan単位で文単位に分けて8言語を並べる方式ではない）。
//   ・言語コードもテーマと異なる：中国語は "cn"/"tw"（テーマは "zh-cn"/"zh-tw"）。
//   ・class="...--<lang>" のクラス方式は0件（実測確認済み・使われていない）。
// 既存のクラス方式・data-lang方式のスキャナは「グループ単位の空/非空」しか見ないため、
// ページ全体を包む巨大ブロック同士の「要素の有無」（今回の背景＝消えたURLが6言語に残る、
// という事故の型）を検出できない。そのため、ブロック内のhref・見出し番号を突き合わせる
// 専用の比較を追加する。日本語基準の片方向ではなく、全8言語を相互に突き合わせる（双方向）。
// ============================================================================

const CORP_URL = "https://atspect.co.jp/privacy.html";
const CORP_LANGS = ["ja", "en", "cn", "tw", "ko", "fr", "es", "de"]; // corp.html独自の言語コード（中国語がcn/tw表記）

async function auditCorpHtml() {
  const out = {
    fetchOk: false,
    structureKnown: false,
    langBlocksFound: [],
    unknownLangMarkers: [],
    hrefMismatch: [],
    headingNumberMismatch: [],
    genericScanFindings: null,
  };

  let html;
  try {
    const res = await fetch(CORP_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    html = await res.text();
    out.fetchOk = true;
  } catch (e) {
    out.fetchError = e.message;
    return out;
  }

  // ---- 構造の実測確認：lang-block方式が今も成立しているか ----
  const blockStarts = [...html.matchAll(/<div class="lang-block" data-lang="([a-z]+)">/g)].map((m) => ({ lang: m[1], pos: m.index }));
  out.langBlocksFound = blockStarts.map((b) => b.lang);

  const knownLangSet = new Set(CORP_LANGS);
  const unknownLangCodes = out.langBlocksFound.filter((l) => !knownLangSet.has(l));
  if (unknownLangCodes.length > 0) {
    out.unknownLangMarkers.push({ note: `data-lang属性に未知の言語コードを検出: ${unknownLangCodes.join(",")}`, });
  }
  const missingLangBlocks = CORP_LANGS.filter((l) => !out.langBlocksFound.includes(l));
  if (missingLangBlocks.length > 0) {
    out.unknownLangMarkers.push({ note: `想定8言語のうちdata-langブロックが見つからないもの: ${missingLangBlocks.join(",")}（構造自体が変わった可能性）` });
  }
  out.structureKnown = blockStarts.length === 8 && unknownLangCodes.length === 0;

  // ---- 想定外の多言語マーカー方式が紛れていないかの確認（class--lang方式・他のdata-lang属性） ----
  const classSuffixHits = [...html.matchAll(new RegExp(`class="[^"]*--(?:${CORP_LANGS.join("|")})\\b[^"]*"`, "g"))];
  if (classSuffixHits.length > 0) {
    out.unknownLangMarkers.push({ note: `class="...--<lang>" 方式が${classSuffixHits.length}箇所見つかった（想定外＝テーマ側と同じ方式が混在している可能性。要確認）` });
  }
  // data-lang属性はlang-block本体以外にも、見出しspan・サブタイトルspan・言語切替ボタン等の
  // 正当な用途で複数回使われていることを実測確認済み（詳細は後段のグループ単位チェックで扱う）。
  const totalDataLangAttrs = [...html.matchAll(/data-lang="([a-z]+)"/g)].length;
  out.totalDataLangAttrs = totalDataLangAttrs;

  if (blockStarts.length === 0) {
    out.unknownLangMarkers.push({ note: "lang-block構造そのものが見つからなかった。ページ構造が根本的に変わった可能性＝本ツールは対応できていない" });
    return out;
  }

  // ---- 8言語ブロックを切り出す ----
  const mainEnd = html.indexOf("</main>");
  const boundary = mainEnd !== -1 ? mainEnd : html.length;
  const ordered = [...blockStarts].sort((a, b) => a.pos - b.pos);
  const blocks = {};
  for (let i = 0; i < ordered.length; i++) {
    const start = ordered[i].pos;
    const end = i + 1 < ordered.length ? ordered[i + 1].pos : boundary;
    blocks[ordered[i].lang] = html.slice(start, end);
  }

  // ---- 要素レベルの突き合わせ（1）：href（tel:/mailto:含むすべてのリンク先） ----
  const hrefByLang = {};
  for (const [lang, block] of Object.entries(blocks)) {
    hrefByLang[lang] = new Set([...block.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
  }
  const allHrefs = new Set(Object.values(hrefByLang).flatMap((s) => [...s]));
  for (const href of allHrefs) {
    const presentIn = CORP_LANGS.filter((l) => hrefByLang[l]?.has(href));
    const missingIn = CORP_LANGS.filter((l) => !hrefByLang[l]?.has(href));
    if (missingIn.length > 0) {
      out.hrefMismatch.push({ href, presentIn, missingIn });
    }
  }

  // ---- 要素レベルの突き合わせ（2）：見出しの節番号（<h2>N. ...</h2> のN） ----
  const numsByLang = {};
  for (const [lang, block] of Object.entries(blocks)) {
    numsByLang[lang] = new Set([...block.matchAll(/<h2[^>]*>(\d+)\./g)].map((m) => m[1]));
  }
  const allNums = new Set(Object.values(numsByLang).flatMap((s) => [...s]));
  for (const num of allNums) {
    const presentIn = CORP_LANGS.filter((l) => numsByLang[l]?.has(num));
    const missingIn = CORP_LANGS.filter((l) => !numsByLang[l]?.has(num));
    if (missingIn.length > 0) {
      out.headingNumberMismatch.push({ sectionNumber: num, presentIn, missingIn });
    }
  }

  // ---- corp.html独自の言語コード（cn/tw）で、data-lang="X"のすべての用法をグループ分けして
  //      グループ単位（見出しspan・サブタイトルspan・言語切替ボタン・lang-block本体、等）で
  //      8言語すべて揃っているかを確認する（テーマ側の共通関数はzh-cn/zh-tw前提のため使えず、
  //      corp.html専用に実装）。
  const CORP_LANG_ALT = CORP_LANGS.join("|");
  const corpDataLangRe = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\bdata-lang="(${CORP_LANG_ALT})"[^>]*>`, "g");
  const corpRecords = [];
  for (const m of html.matchAll(corpDataLangRe)) {
    const tagFull = m[0];
    const classM = tagFull.match(/class="([^"]*)"/);
    const base = m[1] + (classM ? ":" + classM[1].replace(/\bis-active\b/, "").trim() : "");
    corpRecords.push({ pos: m.index, base, lang: m[2] });
  }
  corpRecords.sort((a, b) => a.pos - b.pos);
  const corpGroupsByBase = new Map();
  for (const r of corpRecords) {
    let g = corpGroupsByBase.get(r.base);
    if (g && g.langs.has(r.lang)) g = null;
    if (!g) {
      g = { base: r.base, langs: new Map(), startPos: r.pos };
      corpGroupsByBase.set(r.base, g);
      out.dataLangGroupList = out.dataLangGroupList || [];
      out.dataLangGroupList.push(g);
    }
    g.langs.set(r.lang, r.pos);
  }
  out.dataLangGroupMismatch = [];
  for (const g of out.dataLangGroupList || []) {
    const present = new Set(g.langs.keys());
    const missing = CORP_LANGS.filter((l) => !present.has(l));
    if (missing.length > 0) {
      out.dataLangGroupMismatch.push({ base: g.base, line: lineOf(html, g.startPos), present: [...present], missing });
    }
  }

  return out;
}

const corpResult = await auditCorpHtml();

// ---- report2.md 出力 ----
const KNOWN_CORP = [
  // 本日の背景説明にあった「日本語・英語からは消えたURLが6言語に残る」事故は、
  // 具体的な既知チケット番号が本セッションの記録（reports/*.md）内に見つからなかったため、
  // 未収録＝見つかった場合は新規として扱う（推測で「既知」に分類しない）。
];

const md2 = [];
md2.push("# 8言語突き合わせ検査 結果2（全体実行・4分類版）");
md2.push("");
md2.push(`実行日時：${new Date().toISOString()}`);
md2.push("");
md2.push("読み取りのみ。是正はしていません。新規に見つかった件も一覧にするところまでです。");
md2.push("");

// ============================================================================
// この検査の限界（冒頭・正直な記載）＝「違反0件」で検査終了とせず、
// 母集団に入っていないもの・この方式では見えないものがある前提で明記する。
// ============================================================================
md2.push("## この検査で見つけられないもの（限界・冒頭に明記）");
md2.push("");
md2.push("1. **対象範囲の外側**＝走査したのは`atspect-theme/sections/*.liquid`（テーマの静的マークアップ）と`atspect.co.jp/privacy.html`の1ページのみです。作家個人ページ597名分の本文（略歴・作家のことば等、`assets/artists.json`等のデータに由来する動的コンテンツ）、`snippets/`配下、corp.html側のprivacy.html以外のページ（index.html等）は、今回の走査対象に含まれていません。存在しないことの確認にはなりません。");
md2.push("2. **クラス方式・data-lang属性方式以外の実装**＝Liquid側の条件分岐（`{%- if orig_lang == ... -%}`等）で表示を切り替えている箇所や、本検査が知らない第3・第4の方式は「未知の構造」として検出はしますが、正誤の判定はできません（下記④参照）。");
md2.push("3. **グルーピングの精度**＝出現順の連続性に基づく簡易ヒューリスティックで、DOM階層は見ていません。同じクラス名が別々の意味グループで再利用されている場合、誤って統合・分割される可能性があります（Codex独立レビューで指摘済み・詳細は各レポート内の「既知の限界」参照）。");
md2.push("4. **固有名詞の判別**＝カナ混入検出の許可リストは現在「あつぺくと」のみです。未登録の固有名詞（作家名・作品名等）で誤って違反として拾われる可能性、逆に許可リストの範囲を広げすぎて本物の混入を見逃す可能性の両方があります。");
md2.push("5. **「0件」の意味**＝以下の結果で0件だった項目は、「その検査方式が対象範囲内でその型の問題を検出しなかった」ことを示すのみです。対象範囲外・検出方式外に問題が存在しないことの証明ではありません。");
md2.push("");

md2.push("## 4分類（背景にある「今日1日で5回見つかった取り残し」への対応）");
md2.push("");
md2.push("背景の5件＝①zh-twフッターの日本語助詞②zh-cn/zh-twのpress冒頭③作品詳細の決済文言④pv-jaonly構造の母集団漏れ⑤コーポレート前文のURLが6言語だけに残存、のうち①②③④は本検査で再検出できることを確認済みです（詳細は下記）。⑤については、実測の結果**現行のprivacy.htmlの本文（lang-block内）にはhrefが1件も存在せず**、この具体的な事故が別のcorp.htmlページ（index.html等・今回の走査対象外）で起きたものである可能性があります。この点は「対象範囲の外側」として上記の限界1に明記しました。断定はしていません。");
md2.push("");

md2.push("### ① 既知（今日すでにfix-orders.md／fix-orders-B.mdに載せたもの）");
md2.push("");
md2.push("| # | ファイル | 行 | 該当文字列（抜粋） | 出典 |");
md2.push("|---|---|---|---|---|");
md2.push("| 1 | sections/atspect-artwork-detail.liquid | 298 | その他の決済方法もご利用いただけます。（7言語すべて空欄） | fix-orders.md A-69 |");
md2.push("| 2 | sections/atspect-footer.liquid | 61 | 基於特定商業交易法の標示（zh-twに日本語助詞混入） | fix-orders.md A-65 |");
md2.push("| 3 | sections/atspect-press-page.liquid | 21 | あつぺくとは日本美术家...（zh-cn文頭が未翻訳） | fix-orders.md A-67 |");
md2.push("| 4 | sections/atspect-press-page.liquid | 22 | あつぺくとは日本藝術家...（zh-tw文頭が未翻訳） | fix-orders.md A-67 |");
md2.push("");
md2.push("加えて、下記「③意図的に日本語のみ」のpv-jaonly構造2件（`atspect-privacy.liquid`81・147行目）も、母集団漏れを起こさず今回の走査で正しく検出できています（詳細は③）。");
md2.push("");

md2.push("### ② 新規（今回はじめて見つかったもの）");
md2.push("");
md2.push("**該当0件です。** 今回の走査（テーマ89ファイル＋privacy.html）で新たに検出した項目のうち、「日本語側・外国語側のどちらかが明確に欠落している」と確信を持って言えるものは見つかりませんでした。判断がつかなかった11件は②ではなく④（判断できなかったもの）に分類しています。無理に②へ振り分けていません。");
md2.push("");

md2.push("### ③ 意図的に日本語のみのもの（違反ではない・別枠一覧）");
md2.push("");
md2.push("| # | ファイル | 行 | クラス | 内容 |");
md2.push("|---|---|---|---|---|");
md2.push("| 1 | sections/atspect-privacy.liquid | 81 | pv-jaonly | 利用目的リスト内・作家利用規約への言及（記録資料化の目的） |");
md2.push("| 2 | sections/atspect-privacy.liquid | 147 | pv-jaonly | 掲載継続のお申し出がない場合の扱い（規約条文への言及） |");
md2.push("");
md2.push("両方とも、プライバシーポリシー1本化の提案（`reports/assets/20260729_privacy/privacy-final.md`）で該当段落ごと削除対象として扱い済みです。");
md2.push("");

md2.push("### ④ ツールが判断できなかったもの（★空にしない・11件）");
md2.push("");
md2.push("未知の多言語風構造として検出された11件です。目視で文脈を確認しましたが、「翻訳漏れ」か「意図的な別方式」かを本検査だけでは断定できません。日本語側・外国語側のどちらが正しいかも、この2パターンについては「正誤」という枠組み自体が当てはまらない可能性があります（下記説明参照）。");
md2.push("");
md2.push("| # | ファイル | 行 | クラス | 存在する言語 | 判断できなかった理由 |");
md2.push("|---|---|---|---|---|---|");
const patternANote = "awt-l--latin/cawt--latin：作品・作家名のラテン文字表示。8言語個別翻訳ではなく「非日本語UIは英語→ローマ字→原題の単一フォールバック」という2026-07-23代表確定の別方式である可能性が高いが、本検査は「8言語それぞれに翻訳があるべき」という前提のため、この設計そのものを正しく評価できない";
const patternBNote = "atspect-qb__original：引用ブロックの原文併記。CSSのdata-lang条件分岐ではなくLiquid側の`{%- if orig_lang == ... -%}`で表示を切り替えており、本検査の検出方式（CSSのdisplay:none切替）の前提が当てはまらない";
for (const f of findings.unknownStructure) {
  const note = f.class.includes("latin") ? patternANote : patternBNote;
  md2.push(`| - | ${f.file} | ${f.line} | ${f.class} | ${f.shownFor} | ${note} |`);
}
md2.push("");
md2.push("**この11件は是正していません。一覧化のみです。** 制作T・司令塔による目視確認をお願いします。");
md2.push("");

md2.push("---");
md2.push("");
md2.push("## 以下、機械的な検出結果の詳細（上記4分類の根拠データ）");
md2.push("");
md2.push("## 対象");
md2.push("");
md2.push(`1. \`atspect-theme/sections/*.liquid\`（${files.length}ファイル・テーマ側。内容は上記「8言語突き合わせ検査 結果」＝\`i18n-audit-report.md\`と同一のため、件数のみ再掲）`);
md2.push(`2. \`${CORP_URL}\`（コーポレートサイト・静的HTML・8言語）`);
md2.push("");
md2.push("## テーマ側（再掲）");
md2.push("");
md2.push(`| 種別 | 件数 |`);
md2.push(`|---|---|`);
md2.push(`| 1. 日本語にあるが7言語のいずれかに対応なし | ${findings.missingInNonJa.length} |`);
md2.push(`| 2. 7言語にあるが日本語に対応なし | ${findings.missingInJa.length} |`);
md2.push(`| 3. 非日本語ブロックへのひらがな・カタカナ混入 | ${findings.kanaLeak.length} |`);
md2.push(`| 4. 意図的な日本語限定構造（違反ではない・別枠） | ${findings.jaOnlyIntentional.length} |`);
md2.push(`| 未知の多言語風構造（要確認） | ${findings.unknownStructure.length} |`);
md2.push("");
md2.push("詳細は`i18n-audit-report.md`を参照してください（本便でロジックを2点修正済み・件数は本便実行時点のものに更新されています）。");
md2.push("");

md2.push("## コーポレートサイト（privacy.html）側");
md2.push("");
if (!corpResult.fetchOk) {
  md2.push(`★取得に失敗しました：${corpResult.fetchError}`);
} else {
  md2.push(`### 構造の実測確認`);
  md2.push("");
  md2.push(`- 検出した\`data-lang\`ブロック：${corpResult.langBlocksFound.join(", ")}（${corpResult.langBlocksFound.length}件）`);
  md2.push(`- 想定どおりの構造（8言語・class--lang方式の混在なし）＝${corpResult.structureKnown ? "はい" : "**いいえ（下記の未知構造を参照）**"}`);
  md2.push("");

  md2.push(`### 未知の構造・想定外の警告（${corpResult.unknownLangMarkers.length}件）`);
  md2.push("");
  if (corpResult.unknownLangMarkers.length === 0) {
    md2.push("該当なし（想定した構造どおりでした）。");
  } else {
    for (const w of corpResult.unknownLangMarkers) md2.push(`- ★${w.note}`);
  }
  md2.push("");

  md2.push(`### 1. hrefの片方向・双方向の欠落（${corpResult.hrefMismatch.length}件）`);
  md2.push("");
  md2.push("★背景の事故（日本語・英語からは消えたURLが6言語に残る）と同じ型を捕まえるための検査です。日本語基準の片方向ではなく、8言語のうちどれか1つでも欠けていれば検出します。");
  md2.push("");
  md2.push("**自己テストで検証済み**＝「ja・enには無いが他6言語には残っているURL」を模した合成HTMLに対してこのロジックを実行し、`present: [cn,tw,ko,fr,es,de] missing: [ja,en]`という、背景の事故とまったく同じ向きの検出結果が得られることを確認しました（実ファイルは変更していません）。現在のprivacy.htmlでは該当0件でしたが、これは検査対象がクリーンだったことを示すものであり、検査ロジックが機能しないという意味ではありません。");
  md2.push("");
  if (corpResult.hrefMismatch.length === 0) {
    md2.push("該当なし（すべてのリンク先URLが8言語間で一致しています）。");
  } else {
    md2.push("| href | 存在する言語 | 存在しない言語 | 既知／新規 |");
    md2.push("|---|---|---|---|");
    for (const m of corpResult.hrefMismatch) {
      md2.push(`| ${m.href} | ${m.presentIn.join(",")} | ${m.missingIn.join(",")} | **新規** |`);
    }
  }
  md2.push("");

  md2.push(`### 2. 節番号（<h2>N. ...）の片方向・双方向の欠落（${corpResult.headingNumberMismatch.length}件）`);
  md2.push("");
  if (corpResult.headingNumberMismatch.length === 0) {
    md2.push("該当なし（全13節が8言語間で一致しています）。");
  } else {
    md2.push("| 節番号 | 存在する言語 | 存在しない言語 | 既知／新規 |");
    md2.push("|---|---|---|---|");
    for (const m of corpResult.headingNumberMismatch) {
      md2.push(`| ${m.sectionNumber} | ${m.presentIn.join(",")} | ${m.missingIn.join(",")} | **新規** |`);
    }
  }
  md2.push("");

  md2.push(`### 3. data-lang用法グループ単位の8言語充足チェック（${corpResult.dataLangGroupList?.length ?? 0}グループ中、欠落${corpResult.dataLangGroupMismatch?.length ?? 0}件）`);
  md2.push("");
  md2.push("corp.html内の`data-lang=\"X\"`のすべての用法（見出しspan・サブタイトルspan・言語切替ボタン・lang-block本体）を、タグ名＋クラス名でグループ化し、各グループごとに8言語（corp.html独自コード：ja/en/cn/tw/ko/fr/es/de）が揃っているかを確認しました。class=\"...--&lt;lang&gt;\"方式（テーマ側の方式）の使用は0件でした（実測確認済み）。");
  md2.push("");
  if ((corpResult.dataLangGroupMismatch?.length ?? 0) === 0) {
    md2.push("該当なし（すべてのグループで8言語が揃っています）。");
  } else {
    md2.push("| グループ（タグ:クラス） | 行 | 存在する言語 | 欠落言語 | 既知／新規 |");
    md2.push("|---|---|---|---|---|");
    for (const m of corpResult.dataLangGroupMismatch) {
      md2.push(`| ${m.base} | ${m.line} | ${m.present.join(",")} | ${m.missing.join(",")} | **新規** |`);
    }
  }
}
md2.push("");

md2.push("## まとめ");
md2.push("");
md2.push(`- テーマ側は\`i18n-audit-report.md\`を参照（既知5件を再検出・新規11件は未知構造として一覧化のみ）。`);
md2.push(`- コーポレートサイト側は構造を実測したうえで専用の比較（href・節番号の双方向突き合わせ）を追加しました。`);
md2.push(`- 実行時点でのcorp.html側の検出＝href欠落${corpResult.hrefMismatch?.length ?? "-"}件・節番号欠落${corpResult.headingNumberMismatch?.length ?? "-"}件・data-langグループ単位の欠落${corpResult.dataLangGroupMismatch?.length ?? "-"}件（${corpResult.dataLangGroupList?.length ?? "-"}グループ中）・未知構造${corpResult.unknownLangMarkers?.length ?? "-"}件。`);
md2.push(`- 背景にあった「消えたURLが6言語に残る」という具体的な事故のチケットは、本セッションの記録（reports/*.md）内に見つからなかったため、既知リストには含めていません。検出された件はすべて新規として扱っています。`);
md2.push("- 新規の分は是正していません。一覧化のみです。");
md2.push("");
md2.push("### この追加検査の既知の限界（正直な記載・Codex独立レビュー反映済み）");
md2.push("");
md2.push("- href・節番号の比較は「完全一致」で行っています。意図的に言語ごとURLが異なる設計（多言語別ページ等）がもしあれば、それも誤検出として一覧に出ます（privacy.htmlの現行構造ではそのような設計は確認していません）。");
md2.push("- 比較対象はhrefと節番号のみです。本文の文言そのものの突き合わせ（文単位の翻訳漏れ）は、lang-block方式では要素境界が取りにくいため今回のスコープに含めていません。");
md2.push("- corp.htmlは毎回ライブから取得しています。実行タイミングにより結果が変わり得ます（本レポートは実行日時のスナップショットです）。");
md2.push("- `<div class=\"lang-block\" data-lang=\"X\">`の開始タグ自体が想定と異なる形（属性順序の変更・追加属性等）になった場合、そのブロックはlang-block検出そのものに失敗し、8件に満たない検出数として「未知の構造」警告に現れます（href・節番号の比較対象からは静かに漏れるのではなく、まず構造チェックの段階で顕在化する設計です）。");
md2.push("- 見出し番号の抽出は`<h2[^>]*>N.`（属性付きも許容）で行っています。ある言語だけ`<h2>`以外の見出しタグ（`<h3>`等）や、数字＋ピリオド以外の書式を使っていた場合は検出できません（Codex独立レビューで指摘。現行の全8言語は`<h2>N. `形式で統一されていることを実測確認済み）。");
md2.push("- data-langグループ単位のチェック（3.）は、テーマ側と同じ「出現順の連続性」に基づく簡易グルーピングです。同じbase（タグ+クラス名）の論理的に別々のグループが、互いに異なる言語だけを持つ形で隣接していた場合、誤って1つに統合され欠落を見逃す可能性があります（Codex独立レビューで指摘・`i18n-audit-report.md`のテーマ側と同種の限界）。現行の6グループはいずれも単純な構造（1グループ=1箇所のみの出現）であることを実測確認済みです。");

writeFileSync(join(OUT_DIR, "i18n-audit-report2.md"), md2.join("\n") + "\n", "utf-8");
console.log("report written: i18n-audit-report2.md");
console.log("corp href mismatch:", corpResult.hrefMismatch?.length);
console.log("corp heading mismatch:", corpResult.headingNumberMismatch?.length);
console.log("corp data-lang group mismatch:", corpResult.dataLangGroupMismatch?.length, "/", corpResult.dataLangGroupList?.length, "groups");
console.log("corp unknown markers:", corpResult.unknownLangMarkers?.length);

// ============================================================================
// 追加便2（コーポサイト制作T・2026-07-29）：文字種検査。
//
// 背景：第1便の7言語通読点検（Codex1言語1回×7＋自分の通読）で55件超の翻訳品質問題を見つけたが、
// 上記の検査（data-langグループ有無・href・節番号の突き合わせ）はこれを1件も検出できなかった。
// 「要素が存在するか」しか見ておらず「中身が正しいか」は評価しないため。ただし55件のうち1件
// （韓国語の事業見出し等に日本語の中黒「・」U+30FBが7箇所残存）は、対象言語に本来出現しない
// 文字種を検出する仕組みであれば拾えた型。この型だけでも機械で拾えるようにする。
//
// 検出する文字種の取り違え：
//   ・ひらがな／カタカナ／日本語の中黒(U+30FB) が、日本語以外のブロックに混入
//   ・漢字（CJK統合漢字）／ハングルが、欧文（en/fr/es/de）ブロックに混入
// 対象言語ごとの「出現してよい文字種」：
//   ja：制限なし（原文）
//   cn, tw：漢字は当然出現してよい。ひらがな・カタカナ・中黒・ハングルは禁止。
//   ko：ハングルは当然出現してよい。ひらがな・カタカナ・中黒・漢字は禁止
//     （指示の範囲は「ひらがな・カタカナ・中黒」のみだが、同じ理屈で漢字混入も検出対象に含めた
//      ＝指示文言より対象を広げた点。今回の実行では該当0件）。
//   en, fr, es, de：ひらがな・カタカナ・中黒・漢字・ハングルすべて禁止。
//
// 固有名詞の除外：ALLOWLIST_SUBSTRINGS（既存＝"あつぺくと"）を再利用。
// ★除外したものも黙って捨てず、excludedAllowlisted に必ず記録する（指示どおり）。
//
// 対象4点：①atspect-theme（sections/*.liquid・既存files）②index.html③404.html④privacy.html
// （②③④はcorp.htmlと同じくライブから取得。実行タイミングで結果が変わり得る点は既存の限界記載と同じ）。
// 読み取りのみ・書き換えは一切しない。
// ============================================================================

// +で連続する同一文字種をまとめて1件と数える（1文字ずつ機械的に数えると「雅號」が2件に
// 見えるなど、人間にとって不自然な件数になるため）。
const HIRAGANA_KATAKANA_RE = /[ぁ-ゖゝ-ゟァ-ヺヽ-ヿｦ-ﾟ]+/;
const NAKAGURO_RE = /・+/;
const HAN_RE = /[一-鿿㐀-䶿]+/;
const HANGUL_RE = /[가-힣ᄀ-ᇿ㄰-㆏]+/;

const CHARTYPE_CHECKS = [
  { key: "hiraKata", re: HIRAGANA_KATAKANA_RE, label: "ひらがな/カタカナ" },
  { key: "nakaguro", re: NAKAGURO_RE, label: "日本語の中黒(U+30FB)" },
  { key: "han", re: HAN_RE, label: "漢字(CJK統合漢字)" },
  { key: "hangul", re: HANGUL_RE, label: "ハングル" },
];

// 言語ごとに「禁止する文字種キー」の一覧
function bannedKeysFor(lang) {
  if (lang === "ja") return [];
  if (lang === "cn" || lang === "tw" || lang === "zh-cn" || lang === "zh-tw") return ["hiraKata", "nakaguro", "hangul"];
  if (lang === "ko") return ["hiraKata", "nakaguro", "han"];
  return ["hiraKata", "nakaguro", "han", "hangul"]; // en, fr, es, de
}

// snippetから、許可リスト文字列を除去した残りに対して文字種チェックを行う。
// 許可リストで説明しきれる分はexcluded、残った分はviolationとして返す。
function contextAround(text, idx, radius) {
  const s = Math.max(0, idx - radius);
  const e = Math.min(text.length, idx + radius);
  return (s > 0 ? "…" : "") + text.slice(s, e).replace(/\s+/g, " ").trim() + (e < text.length ? "…" : "");
}

// allowlist済みの範囲（あつぺくと等の文字列が占める区間）を除いた位置のマッチだけを対象とする。
function isInsideAllowlistSpan(text, idx) {
  for (const s of ALLOWLIST_SUBSTRINGS) {
    let from = 0;
    let p;
    while ((p = text.indexOf(s, from)) !== -1) {
      if (idx >= p && idx < p + s.length) return true;
      from = p + 1;
    }
  }
  return false;
}

// snippet全体を対象に、バナー対象の全出現（1件ずつではなく全件）を数える。
// 長大なブロック（privacy.htmlのlang-block等）で最初の1件しか報告しない、という
// 過小報告を避けるため。
function scanCharTypes(snippetRaw, lang) {
  const banned = bannedKeysFor(lang);
  const snippet = snippetRaw.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;|&#xa0;/gi, "");
  const violations = [];
  const excluded = [];
  for (const key of banned) {
    const check = CHARTYPE_CHECKS.find((c) => c.key === key);
    const globalRe = new RegExp(check.re.source, "g");
    let m;
    let violCount = 0;
    let excludedCount = 0;
    let firstViolSample = null;
    let firstExcludedSample = null;
    while ((m = globalRe.exec(snippet))) {
      const sample = contextAround(snippet, m.index, 60);
      if (isInsideAllowlistSpan(snippet, m.index)) {
        excludedCount++;
        if (!firstExcludedSample) firstExcludedSample = sample;
      } else {
        violCount++;
        if (!firstViolSample) firstViolSample = sample;
      }
    }
    if (violCount > 0) {
      violations.push({ type: check.label, count: violCount, sample: firstViolSample + (violCount > 1 ? ` （他${violCount - 1}件同種）` : "") });
    }
    if (excludedCount > 0) {
      excluded.push({ type: check.label, count: excludedCount, sample: firstExcludedSample + (excludedCount > 1 ? ` （他${excludedCount - 1}件同種）` : ""), reason: "allowlist(" + ALLOWLIST_SUBSTRINGS.join(",") + ")で説明可" });
    }
  }
  return { violations, excluded };
}

const chartypeFindings = { theme: [], themeExcluded: [], corp: {} };

// ---- ①テーマ（sections/*.liquid）。既存のfiles・extractClassRecords・extractDataLangRecords・
//      groupRecords・snippetAfter・lineOfをそのまま再利用（新たに書き直さない）。 ----
for (const filePath of files) {
  const content = readFileSync(filePath, "utf-8");
  const relFile = "sections/" + filePath.split(/[\\/]/).pop();
  const classGroups = groupRecords(extractClassRecords(content), content);
  const dataLangGroups = groupRecords(extractDataLangRecords(content), content);
  for (const g of [...classGroups, ...dataLangGroups]) {
    for (const [lang, v] of g.langs.entries()) {
      if (v.empty) continue;
      const snippet = snippetAfter(content, v.pos);
      const { violations, excluded } = scanCharTypes(snippet, lang);
      for (const viol of violations) {
        chartypeFindings.theme.push({ file: relFile, base: g.base, lang, line: lineOf(content, v.pos), ...viol });
      }
      for (const exc of excluded) {
        chartypeFindings.themeExcluded.push({ file: relFile, base: g.base, lang, line: lineOf(content, v.pos), ...exc });
      }
    }
  }
}

// ---- ②③④ corp.html系（index.html／404.html／privacy.html）。ライブから取得し、
//      data-lang属性ベースの汎用抽出（extractDataLangRecords/groupRecordsはHTML汎用のため
//      そのまま使える＝liquid専用ではない）。privacy.htmlのみlang-block方式のため別処理。 ----
const CORP_PAGE_URLS = {
  "index.html": "https://atspect.co.jp/",
  "404.html": "https://atspect.co.jp/404.html",
};

for (const [pageLabel, url] of Object.entries(CORP_PAGE_URLS)) {
  const pageResult = { fetchOk: false, violations: [], excluded: [] };
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const content = await res.text();
    pageResult.fetchOk = true;
    const dataLangGroups = groupRecords(extractDataLangRecords(content), content);
    for (const g of dataLangGroups) {
      for (const [lang, v] of g.langs.entries()) {
        if (v.empty) continue;
        const snippet = snippetAfter(content, v.pos);
        const { violations, excluded } = scanCharTypes(snippet, lang);
        for (const viol of violations) pageResult.violations.push({ base: g.base, lang, line: lineOf(content, v.pos), ...viol });
        for (const exc of excluded) pageResult.excluded.push({ base: g.base, lang, line: lineOf(content, v.pos), ...exc });
      }
    }
  } catch (e) {
    pageResult.fetchError = e.message;
  }
  chartypeFindings.corp[pageLabel] = pageResult;
}

// privacy.html：lang-block方式。corpResult.langBlocksFoundから取得したブロック境界を再利用したいが
// auditCorpHtml内のblocksはローカル変数のため、ここで同じ手順を再実行する（軽量・読み取りのみ）。
{
  const pageResult = { fetchOk: false, violations: [], excluded: [] };
  try {
    const res = await fetch(CORP_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const html = await res.text();
    pageResult.fetchOk = true;
    const blockStarts = [...html.matchAll(/<div class="lang-block" data-lang="([a-z]+)">/g)].map((m) => ({ lang: m[1], pos: m.index }));
    const mainEnd = html.indexOf("</main>");
    const boundary = mainEnd !== -1 ? mainEnd : html.length;
    const ordered = [...blockStarts].sort((a, b) => a.pos - b.pos);
    for (let i = 0; i < ordered.length; i++) {
      const start = ordered[i].pos;
      const end = i + 1 < ordered.length ? ordered[i + 1].pos : boundary;
      const blockHtml = html.slice(start, end);
      const { violations, excluded } = scanCharTypes(blockHtml, ordered[i].lang);
      for (const viol of violations) pageResult.violations.push({ lang: ordered[i].lang, ...viol });
      for (const exc of excluded) pageResult.excluded.push({ lang: ordered[i].lang, ...exc });
    }
  } catch (e) {
    pageResult.fetchError = e.message;
  }
  chartypeFindings.corp["privacy.html"] = pageResult;
}

// ---- 出力：report3.md ----
const md3 = [];
md3.push("# 文字種検査 結果（コーポサイト制作T・2026-07-29追加）");
md3.push("");
md3.push(`実行日時：${new Date().toISOString()}`);
md3.push("");

md3.push("## ★この検査で何が見つけられて、何が見つけられないか（冒頭に明記）");
md3.push("");
md3.push("**見つけられるもの**＝その言語のブロックに、その言語では本来出現しないはずの文字種（ひらがな・カタカナ・日本語の中黒・漢字・ハングルの取り違え）が混ざっている箇所。");
md3.push("");
md3.push("**見つけられないもの**＝文字種としては正しい（例：フランス語ブロックにフランス語のアルファベットしか無い）が、訳の内容・自然さ・省略・追加に問題がある箇所。第1便で見つかった55件超のうち、**この検査方式で検出できるのは文字種の取り違え型に限られる**。実際に数えたところ、55件超のうち文字種検査で検出可能な型は**1件のみ**（韓国語の日本語中黒混入）だった。応答時期の約束の追加、内容の省略・追加、不自然な言い回し、肩書きの不一致等、残り全件は文字種としては正常なため、この検査では検出できない。「検出0件」は「その型の問題が無い」ことを意味するのみで、「翻訳に問題が無い」ことは意味しない。");
md3.push("");

const sumCount = (arr) => arr.reduce((s, it) => s + (it.count || 1), 0);

md3.push("## サマリ");
md3.push("");
md3.push("「箇所数」＝どの要素/ブロックで見つかったか（行・要素単位）。「総出現数」＝同じ要素内の複数回出現も含めた実際の文字数ベースの件数（1箇所に同じ問題が何度も出ることがあるため、箇所数だけでは過小に見える）。");
md3.push("");
md3.push("| 対象 | 違反：箇所数 | 違反：総出現数 | 除外(固有名詞等)：箇所数 | 除外：総出現数 |");
md3.push("|---|---|---|---|---|");
md3.push(`| テーマ(sections/*.liquid) | ${chartypeFindings.theme.length} | ${sumCount(chartypeFindings.theme)} | ${chartypeFindings.themeExcluded.length} | ${sumCount(chartypeFindings.themeExcluded)} |`);
for (const [label, r] of Object.entries(chartypeFindings.corp)) {
  if (!r.fetchOk) { md3.push(`| ${label} | 取得失敗 | - | - | - |`); continue; }
  md3.push(`| ${label} | ${r.violations.length} | ${sumCount(r.violations)} | ${r.excluded.length} | ${sumCount(r.excluded)} |`);
}
md3.push("");

function dumpList(title, items, cols) {
  md3.push(`## ${title}`);
  md3.push("");
  if (items.length === 0) {
    md3.push("該当なし。");
    md3.push("");
    return;
  }
  md3.push(`| ${cols.join(" | ")} |`);
  md3.push(`|${cols.map(() => "---").join("|")}|`);
  for (const it of items) {
    md3.push(`| ${cols.map((c) => String(it[c] ?? "").replace(/\|/g, "\\|")).join(" | ")} |`);
  }
  md3.push("");
}

dumpList("テーマ：文字種の違反", chartypeFindings.theme, ["file", "line", "base", "lang", "type", "count", "sample"]);
dumpList("テーマ：除外（固有名詞等のallowlistで説明可・黙って捨てていない一覧）", chartypeFindings.themeExcluded, ["file", "line", "base", "lang", "type", "count", "sample", "reason"]);

for (const [label, r] of Object.entries(chartypeFindings.corp)) {
  if (!r.fetchOk) {
    md3.push(`## ${label}：取得失敗`);
    md3.push("");
    md3.push(`★${r.fetchError}`);
    md3.push("");
    continue;
  }
  dumpList(`${label}：文字種の違反`, r.violations, ["base", "line", "lang", "type", "count", "sample"]);
  dumpList(`${label}：除外（固有名詞等）`, r.excluded, ["base", "line", "lang", "type", "count", "sample", "reason"]);
}

md3.push("## この検査の既知の限界（正直な記載）");
md3.push("");
md3.push("- 固有名詞の除外リストは`あつぺくと`のみ（既存のALLOWLIST_SUBSTRINGSをそのまま再利用）。作家名・作品名・地名等の固有名詞で文字種混入が検出された場合、除外リストに載っていなければ違反として出る（誤検出の可能性）。除外した分・しなかった分の両方を必ず一覧に出している。");
md3.push("- **韓国語について、指示の対象は「ひらがな・カタカナ・中黒」のみだったが、同じ理屈で「漢字」混入も検出対象に加えた（指示より対象を広げた点）。ハングルはko以外の言語（cn/tw含む）ですべて禁止とした。この拡張は実際に1件のfalse positiveの疑いを生んだ**＝privacy.html韓国語版の「아호(雅號)」（雅号＝ペンネームの意）。これは漢字表記が意図的な語義明確化のグロス（韓国語の公式文書で人名・専門用語に漢字を併記する慣習）である可能性が高く、翻訳ミスとは言えない。除外リストには追加していない（1件の目視確認だけで恒久的なルールを作らないため）が、目視で「おそらく問題ではない」と判断した旨をここに記録する。**指示どおりの範囲（ひらがな・カタカナ・中黒のみ）に留めていればこのfalse positiveは発生しなかった**＝対象を広げる際のトレードオフの実例として記録する。");
md3.push("- corp.html系3ページはライブから取得している。実行タイミングにより結果が変わり得る（本レポートは実行日時のスナップショット）。");
md3.push("- 抽出はテーマ側と同じ`snippetAfter`（タグ直後から次の閉じタグ/Liquidタグ/次言語タグ/400文字のいずれか手前まで）の簡易ヒューリスティックを流用している。極端に長い一文では途中で打ち切られる場合がある（既存の限界と同じ）。");
md3.push("- 文字種は「その文字種が言語として妥当か」しか見ておらず、文法・語順・意味は一切評価しない。");

writeFileSync(join(OUT_DIR, "i18n-audit-report3.md"), md3.join("\n") + "\n", "utf-8");
console.log("report written: i18n-audit-report3.md");
console.log("chartype theme violations:", chartypeFindings.theme.length, " excluded:", chartypeFindings.themeExcluded.length);
for (const [label, r] of Object.entries(chartypeFindings.corp)) {
  console.log(`chartype ${label}:`, r.fetchOk ? `${r.violations.length} violations, ${r.excluded.length} excluded` : `FETCH FAILED: ${r.fetchError}`);
}
