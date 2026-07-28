import { readFileSync, writeFileSync } from "node:fs";

const SCRATCH = "C:/Users/ataga/AppData/Local/Temp/claude/C--Users-ataga-Desktop-SNS--/807f89a1-5dfd-41cf-b368-8a0c60fd3e3c/scratchpad";
const findings = JSON.parse(readFileSync(SCRATCH + "/privacy-legal-findings.json", "utf-8"));

const LANG_NAME = { en: "英語", fr: "フランス語", de: "ドイツ語", es: "スペイン語" };
const SECTION_NAME = {
  S1_line37: "§1 適用範囲（37行目）",
  S4_line108: "§4 第三者への提供（108行目）",
  S6_line125: "§6 越境移転（125行目）",
  S11_line160: "§11 開示等の請求（160行目）",
};

const md = [];
const P = (s) => md.push(s);
const CODE = (s) => { md.push("```"); md.push(s); md.push("```"); };

P("# .com側プライバシーポリシー 権利範囲の是正指示票");
P("");
P("作成：SNS運用ターミナル（Sonnet 5）。読み取り・実測のみ。サイトは一切変更していません。");
P("対象＝`sections/atspect-privacy.liquid`（.com側・Shopifyテーマ）。");
P("");
P("## 背景");
P("");
P("コーポレート側（atspect.co.jp/privacy.html）を7言語通読した結果、A評価8件（すべて「原文にあった限定・非限定列挙・権利の強さが、訳文で狭まる／弱まる」方向）が見つかった。同じ日本語から同じ7言語に訳しているため、.com側にも同型の誤りがある可能性が高いとして、司令塔指示により本日確認した。");
P("");
P("**「同じはず」で通さず、1件ずつ実物で確認した結果＝.com側は単に corp 側と同一の誤りを引き継いでいるのではなく、翻訳が別々に作られているため、corp 側にはない.com側独自の誤りも複数見つかった。**");
P("");
P("## 判定方法");
P("");
P("corp側で見つかった5つの横断パターンを基準に、.com側の該当4か所（§1適用範囲・§4第三者提供・§6越境移転・§11開示等の請求）を全8言語（en/fr/de/es/zh-cn/zh-tw/ko、+日本語原文）で1件ずつCodexに独立判定させた（1言語1回・計8回）。「原文と比べて権利・例外の範囲が狭まっているか」だけを判定基準とした。");
P("");
P("## 結果サマリ（言語別）");
P("");
P("| 言語 | 判定した4パターン中の問題件数 | 内訳 |");
P("|---|---|---|");
P("| 英語(en) | 4/4 | ①法人／事務所の方②法令に基づく場合③等の脱落⑤委託等 |");
P("| フランス語(fr) | 4/4 | ①②③⑤（corp側と同じ3件＋新規1件） |");
P("| ドイツ語(de) | 4/4 | ①②③④⑤（corp側と同じ2件＋新規2件、③④は1文で重複） |");
P("| スペイン語(es) | 2/4 | ②⑤（corp側では0件だった言語だが.com側独自に発見） |");
P("| 簡体中文(zh-cn) | 0/4 | 該当なし |");
P("| 繁体中文(zh-tw) | 0/4 | 該当なし |");
P("| 韓国語(ko) | 0/4※ | ※「開示→열람」の1点についてCodexから指摘があったが、corp側が既に確認した「韓国個人情報保護法の標準法律用語であり訳抜けではない」という判断（同一箇所・同一表現）を踏襲し、対象外とした |");
P("");
P("**是正対象＝14件（en4・fr4・de4・es2）。corp側で既に見つかっていたのと同一の誤りは8件、.com側で独自に見つかった誤りは6件。**");
P("");
P("corp側との対応関係：");
P("- corp側と同一の誤り＝PVLEGAL-01(en①)・02(fr①)・04(en②)・05(fr②)・06(de②)・09(fr⑤)・12(en③)・14(de③④)");
P("- **.com側独自の誤り（corp側では該当なし・新規発見）**＝PVLEGAL-03(de①)・07(es②)・08(en⑤)・10(de⑤)・11(es⑤)・13(fr③)");
P("");
P("## この点検で見つけられないもの（限界）");
P("");
P("- 対象はcorp側で確立した5つの横断パターンに絞っており、それ以外の型の翻訳誤りは対象外（corp側の7言語通読ほどの全文精読は今回行っていない）。");
P("- 各言語の法律専門家によるレビューではない（日本語との対応関係の読解に基づく指摘）。");
P("- 日本語原文自体の妥当性は検証していない（原文を正として扱っている）。");
P("");
P("## 是正対象14件");
P("");

const byPattern = new Map();
for (const f of findings) {
  if (!byPattern.has(f.pattern)) byPattern.set(f.pattern, []);
  byPattern.get(f.pattern).push(f);
}

for (const [pattern, items] of byPattern) {
  P("### " + pattern);
  P("");
  for (const it of items) {
    P("**" + it.id + "｜" + SECTION_NAME[it.section] + "・" + LANG_NAME[it.lang] + (it.corpMatch ? "（corp側と同一の誤り）" : "（.com側独自の発見）") + "**");
    P("");
    P("現在：");
    CODE(it.search);
    P("置換後：");
    CODE(it.replace);
    if (it.codexNote) P("★" + it.codexNote);
    P("");
  }
}

P("---");
P("");
P("## Codex独立レビュー（検出4回＋修正案検証2回・計6回）");
P("");
P("**検出フェーズ**：en/fr/de/esの4言語は個別に1言語1回、各4パターンを判定（zh-cn/zh-tw/koも同様に個別実施・問題なしを確認）。");
P("");
P("**修正案検証フェーズ**：ラテン文字系（en+fr）とゲルマン・ロマンス系（de+es）の2回に分けて、修正案が(a)日本語原文の意味の広さを正しく回復しているか(b)不自然な訳文になっていないか(c)新たな意味のズレを生んでいないかを検証。**2件の文法・語彙上の指摘を受け、反映済み**＝①フランス語①の代名詞不一致（'dont ils'→'dont elles'、'les personnes'が女性名詞のため）②ドイツ語③④の「Nutzungsstopp」が口語的との指摘（「die Einstellung der Nutzung」へ変更・隣接する「die Einstellung der Weitergabe」と文体を統一）。");
P("");
P("**韓国語の「開示→열람」については、Codexから今回あらためて指摘があったが、corp側の7言語通読でこの同一箇所・同一表現を既に確認済みで「韓国個人情報保護法の標準法律用語（access/viewing相当）であり訳抜けではない」と判断されている。今回は新規の実害確認材料がないため、この既存判断を踏襲し是正対象に含めなかった。**");
P("");
P("## 対外文言の禁止事項の確認");
P("");
P("置換はいずれも「原文の権利・例外の範囲を回復する」句読点・語句レベルの修正のみで、掲載作家数・「物故／現存」の分け方・価格・確定タグライン等への抵触はありません。");
P("");
P("## 実施していないこと");
P("");
P("- 是正の実行はしていません（票の作成まで。実行は制作T）。");
P("- corp側（.co.jpのprivacy.html）の同型是正は、コーポレート制作Tが別途対応中のため本票の対象外です（.com側のみ）。");
P("- `apply-fixes.mjs`への実際の収録・実行はしていません。`fixes-privacy-legal.json`（同梱）はapply-fixes.mjsが読み込める形式で用意しましたが、投入・実行の判断は制作T・司令塔・代表に委ねます（法的文書のため）。");
P("- 韓国語の繁体・簡体を除く全8言語の全文（前文＋13節）通読はしていません（corp側で確立した5パターンに限定した点検）。");
P("");
P("証拠の置き場所＝`reports/assets/20260729_i18n/fix-orders-privacy-legal.md`（本ファイル）・`fixes-privacy-legal.json`（機械可読版）。");
P("");

writeFileSync("C:/Users/ataga/atspect-handoff/reports/assets/20260729_i18n/fix-orders-privacy-legal.md", md.join("\n"), "utf-8");

const fixesJson = findings.map(f => ({
  id: "PVLEGAL-" + f.id.split("-")[1],
  source: "corp側privacy.html 7言語通読・法的意味点検A8件との横断確認(2026-07-29)",
  file: "sections/atspect-privacy.liquid",
  search: f.search,
  replace: f.replace,
}));
writeFileSync("C:/Users/ataga/atspect-handoff/reports/assets/20260729_i18n/fixes-privacy-legal.json", JSON.stringify(fixesJson, null, 2), "utf-8");

console.log("書き出し完了。件数:", findings.length);
