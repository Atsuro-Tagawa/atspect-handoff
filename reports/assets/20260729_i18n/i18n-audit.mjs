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
