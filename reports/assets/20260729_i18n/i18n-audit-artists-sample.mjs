// 作家個人ページ（597名／実測610名）向けの8言語検査＝10名サンプルでの実行と、
// 全件実行時の所要時間・想定件数の見積もり。★全件実行はしない（見積もりまで）。
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const THEME_ROOT = "C:\\Users\\ataga\\atspect-theme";
const OUT_DIR = "C:\\Users\\ataga\\atspect-handoff\\reports\\assets\\20260729_i18n";
const LANGS = ["ja", "en", "zh-cn", "zh-tw", "ko", "fr", "es", "de"];
const KANA_RE = /[ぁ-ゖゝ-ゟァ-ヺヽ-ヿｦ-ﾟ]/;
const ALLOWLIST_SUBSTRINGS = ["あつぺくと"];

const artistsJson = JSON.parse(readFileSync(join(THEME_ROOT, "assets", "artists.json"), "utf-8"));
const totalArtists = artistsJson.artists.length;
console.log("artists.json記載の総数:", totalArtists, "（依頼文の597名と件数が異なります・実測値を採用）");

const sample = artistsJson.artists.slice(0, 10);

function extractDataLangGroups(html) {
  const re = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*\\bdata-lang="(${LANGS.map((l) => l.replace("-", "\\-")).join("|")})"[^>]*>`, "g");
  const records = [];
  for (const m of html.matchAll(re)) {
    const classM = m[0].match(/class="([^"]*)"/);
    const base = m[1] + (classM ? ":" + classM[1] : "");
    records.push({ pos: m.index, base, lang: m[2] });
  }
  records.sort((a, b) => a.pos - b.pos);
  const groupsByBase = new Map();
  const list = [];
  for (const r of records) {
    let g = groupsByBase.get(r.base);
    if (g && g.langs.has(r.lang)) g = null;
    if (!g) {
      g = { base: r.base, langs: new Map(), startPos: r.pos };
      groupsByBase.set(r.base, g);
      list.push(g);
    }
    g.langs.set(r.lang, r.pos);
  }
  return list;
}

function textAfter(html, pos, maxLen = 500) {
  const openEnd = html.indexOf(">", pos);
  if (openEnd === -1) return "";
  const rest = html.slice(openEnd + 1, openEnd + 1 + maxLen);
  const closeTag = rest.search(/<\/[a-zA-Z]/);
  return closeTag !== -1 ? rest.slice(0, closeTag) : rest;
}

const results = [];
const t0 = Date.now();

for (const artist of sample) {
  const url = "https://atspect.com" + artist.u;
  const tStart = Date.now();
  let html;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch (e) {
    results.push({ artist: artist.n, url, error: e.message, ms: Date.now() - tStart });
    continue;
  }
  const ms = Date.now() - tStart;

  const groups = extractDataLangGroups(html);
  const findings = { missingLang: [], kanaLeak: [] };
  for (const g of groups) {
    if (g.langs.size < 2) continue;
    const present = new Set(g.langs.keys());
    const missing = LANGS.filter((l) => !present.has(l));
    if (present.has("ja") && missing.length > 0) {
      findings.missingLang.push({ base: g.base, present: [...present], missing });
    }
    for (const [lang, pos] of g.langs.entries()) {
      if (lang === "ja") continue;
      const snippet = textAfter(html, pos);
      if (KANA_RE.test(snippet)) {
        let residual = snippet;
        for (const s of ALLOWLIST_SUBSTRINGS) residual = residual.split(s).join("");
        if (KANA_RE.test(residual)) {
          findings.kanaLeak.push({ base: g.base, lang, snippet: snippet.slice(0, 80).replace(/\s+/g, " ").trim() });
        }
      }
    }
  }
  results.push({ artist: artist.n, url, ms, groups: groups.length, missingLang: findings.missingLang.length, kanaLeak: findings.kanaLeak.length, detail: findings });
  console.log(`${artist.n}: ${ms}ms, groups=${groups.length}, missing=${findings.missingLang.length}, kanaLeak=${findings.kanaLeak.length}`);
}

const totalMs = Date.now() - t0;
const avgMs = totalMs / sample.length;
const estTotalMinutes = (avgMs * totalArtists) / 1000 / 60;

const totalMissing = results.reduce((s, r) => s + (r.missingLang || 0), 0);
const totalKana = results.reduce((s, r) => s + (r.kanaLeak || 0), 0);

const md = [];
md.push("# 作家個人ページ・8言語検査（10名サンプル・全件実行の見積もり）");
md.push("");
md.push(`実行日時：${new Date().toISOString()}`);
md.push("");
md.push("★全件（597名／実測610名）への実行はこの便では行っていません。10名のサンプル実行と、そこからの見積もりまでです。");
md.push("");
md.push("## 対象件数の訂正");
md.push("");
md.push(`- 依頼文にあった「597名」に対し、\`assets/artists.json\`を実測した結果、実際の登録件数は**${totalArtists}名**でした（\`count\`フィールドも610と一致）。`);
md.push("- 3か所照合の過程で、Vault判断待ちマスターS-1に「実データ597名（物故596＋鈴木千賀子）は無傷」という記録を確認しました。「597名」という数字はこの時点で正確だったと見られ、現在の610名はその後の正当な追加（+13名）である可能性が高いです（誤りの訂正ではなく、時点の違いとして記載します）。以下の見積もりは実測値610名を基準にしています。");
md.push("- 同じく判断待ちマスターA-19に、**別ツール（`page-audit.mjs`＝実ブラウザでのスクショ・コンソール・ネットワーク取得を伴うフルの実測ツール）による597名8言語巡回の見積もり＝「直列だと13〜20時間規模」という記録がありました。** 本便の見積もり（約2分）とは大きく異なりますが、これは対象の作業が違うためです＝本ツールはHTTP fetchと正規表現によるテキスト検査のみ（ブラウザを起動せずスクショも撮らない、軽量な検査）で、page-audit.mjsは実ブラウザでのフルレンダリング・視覚的検証を伴う重い検査です。**どちらか一方が誤っているのではなく、検査の深さが異なる別のツールとして両方の見積もりを残します。**");
md.push("");
md.push("## 10名サンプルの実行結果");
md.push("");
md.push("| 作家名 | 所要時間(ms) | data-langグループ数 | 8言語欠落 | カナ混入候補 |");
md.push("|---|---|---|---|---|");
for (const r of results) {
  md.push(`| ${r.artist} | ${r.error ? "エラー" : r.ms} | ${r.groups ?? "-"} | ${r.missingLang ?? "-"} | ${r.kanaLeak ?? "-"} |`);
}
md.push("");
md.push(`- 10名合計の実行時間＝${(totalMs / 1000).toFixed(1)}秒（1件あたり平均${avgMs.toFixed(0)}ms、逐次実行・並列化なし）。`);
md.push(`- 10名での検出＝8言語欠落${totalMissing}件・カナ混入候補${totalKana}件。`);
md.push("");

if (totalMissing > 0 || totalKana > 0) {
  md.push("### サンプルで見つかった件（④判断できなかったもの・新規是正なし・一覧のみ）");
  md.push("");
  for (const r of results) {
    if ((r.missingLang || 0) > 0 || (r.kanaLeak || 0) > 0) {
      md.push(`**${r.artist}**（${r.url}）`);
      for (const m of r.detail.missingLang) md.push(`- 8言語欠落：${m.base}／存在＝${m.present.join(",")}／欠落＝${m.missing.join(",")}`);
      for (const k of r.detail.kanaLeak) md.push(`- カナ混入候補：${k.base}（${k.lang}）＝「${k.snippet}」`);
      md.push("");
    }
  }
  md.push("**目視確認（是正はしていません・参考情報）**＝鈴木千賀子の3件はいずれも「師從友永詔三」「細井良雄」等、師事した人物名が日本語の漢字表記のまま中国語・韓国語訳文に残っているものでした。人物名は固有名詞として原表記を保つのが一般的なため、翻訳漏れではなく意図的な原語併記である可能性が高いと判断しますが、断定はしていません。現在の許可リストは「あつぺくと」のみのため、この種の人物名（師事した先生・共作者等）は今回すべて未登録のまま「判断できなかったもの」として検出されています。**610名全件を実行する場合、同種の人物名混入が作家ごとに多数検出されることが見込まれ、許可リストを人物名まで広げるか、固有名詞判定の仕組み自体を見直す必要があります**（今回のスコープ外）。");
  md.push("");
}

md.push("## 全件（610名）実行時の見積もり");
md.push("");
md.push(`- **所要時間の見積もり＝約${estTotalMinutes.toFixed(0)}分**（逐次実行・1件あたり平均${avgMs.toFixed(0)}ms換算。並列実行すれば短縮できますが、Shopifyストアフロントへの負荷配慮のため、この見積もりは並列化なしの保守的な数字です）。`);
md.push(`- **想定件数の見積もり**＝10名サンプルでの検出率（8言語欠落${totalMissing}/10名・カナ混入${totalKana}/10名）をそのまま610名に外挿すると、8言語欠落は約${Math.round((totalMissing / 10) * totalArtists)}件、カナ混入候補は約${Math.round((totalKana / 10) * totalArtists)}件という規模になり得ます。**ただし10名は先頭10件（横山大観・菱田春草等、著名な物故作家が中心）に偏っており、無作為抽出ではありません。実際の分布（現存作家・海外作家等、属性の異なる作家群）で検出率が変わる可能性が高く、この外挿値はあくまで粗い目安です。加えて、カナ混入候補の実例（下記）はいずれも師事した人物名が原語（日本語漢字）のまま残っているもので、翻訳漏れではなく意図的な原語併記の可能性が高いと見ています。カナ混入候補約${Math.round((totalKana / 10) * totalArtists)}件という数字は、そのほとんどが同種の人物名（固有名詞）である可能性が高く、実際に是正が必要な翻訳漏れの件数はこれよりかなり少ないと考えられます。**`);
md.push("");
md.push("## 610名全件実行にあたっての注意点（実行前に検討すべきこと）");
md.push("");
md.push("- Shopifyストアフロントへの連続アクセスになるため、逐次実行でも610回のHTTPリクエストが生じます。過度な負荷を避けるため、リクエスト間に短い間隔を空ける、または深夜等のアクセスが少ない時間帯に実行するなどの配慮を検討してください。");
md.push("- 無作為抽出での再サンプリング（例：50名程度をランダム抽出して実行）を先に行い、検出率をより正確に把握してから全件実行の要否を判断することを推奨します。");
md.push("- 全件実行する場合の出力（欠落・混入の一覧）は、610名分になるとファイルサイズが大きくなる可能性があります。作家単位でのサマリ（欠落があった作家の一覧のみ）と、詳細（全欠落箇所）を分けて出力する設計を検討してください。");
md.push("");
md.push("### この見積もりの統計的な信頼性について（Codex独立レビュー反映・正直な記載）");
md.push("");
md.push("Codex独立レビューを実施し、この見積もり自体の統計的な弱さについて以下の指摘を受けました。いずれも妥当な指摘のため、そのまま記載します。");
md.push("");
md.push("- **標本の偏り**＝先頭10名は`artists.json`の並び順そのままで、無作為抽出ではありません。著名な物故日本画家に偏っており、全610名（現存作家・海外作家等、属性の異なる作家群を含む）を代表する根拠がありません。");
md.push("- **時間見積もりの単純さ**＝`平均ms × 610`という単純な線形外挿で、610回連続アクセスに伴うネットワーク変動・サーバー負荷・レート制限等は考慮していません。実際の所要時間はこの見積もりより長くなる可能性があります。");
md.push("- **検出件数見積もりの信頼性が低い**＝カナ混入候補の外挿値（約183件）は、実質的に**鈴木千賀子1名からの3件を61倍しただけの点推定**です。10名中9名は0件だったため、実際に偏りを生んでいる標本数はn=1に等しく、統計的な信頼性は極めて低いと考えてください。「8言語欠落は610名で0件」という記載も、標本が10名（うち著名作家中心）にとどまる以上、全610名に欠落が本当に0件であることの証明にはなりません。");
md.push("- **結論**＝この見積もりは「全件実行にどれくらいの規模感で臨むべきか」の一次的な目安であり、確定的な数字ではありません。全件実行の要否を判断する前に、無作為抽出での再サンプリング（Codexの提案＝属性・登録時期等での層化を含む）を行うことを推奨します。");

writeFileSync(join(OUT_DIR, "i18n-audit-artists-sample-report.md"), md.join("\n") + "\n", "utf-8");
console.log("report written: i18n-audit-artists-sample-report.md");
console.log(`total time for 10: ${totalMs}ms, avg: ${avgMs.toFixed(0)}ms, estimated for ${totalArtists}: ${estTotalMinutes.toFixed(1)} min`);
