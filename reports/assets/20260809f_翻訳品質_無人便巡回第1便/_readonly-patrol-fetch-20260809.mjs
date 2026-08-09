/* 翻訳品質T 無人便＝巡回用の読み取り専用フェッチ。
 * 全625名を1パスで取得し、導線順で101〜300位（200名）を切り出し、
 * 各作家×7言語の本文（role/location/statement/bio/message/viewpoint）を
 * scratchディレクトリへテキストファイルとして書き出す。
 * ★書き込みは一切しない。ライブへの変更ゼロ。
 */
process.loadEnvFile(new URL("../.env", import.meta.url));
import { writeFileSync, mkdirSync } from "node:fs";

const S = process.env.SHOPIFY_STORE, T = process.env.SHOPIFY_ADMIN_API_TOKEN, V = "2026-07";
const OUTDIR = process.argv[2];
const START = Number(process.argv[3] ?? 101); // 1-indexed
const END = Number(process.argv[4] ?? 300);
if (!OUTDIR) { console.error("usage: <outdir> [start] [end]"); process.exit(1); }
mkdirSync(OUTDIR, { recursive: true });

async function g(q, v) {
  const r = await fetch(`https://${S}/admin/api/${V}/graphql.json`, {
    method: "POST", headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": T },
    body: JSON.stringify({ query: q, variables: v }) });
  return (await r.json()).data;
}

// ★ライブの一覧ページはSSRで250名までしか出ない（JSの無限スクロールで残りを読み込む方式）。
//   これまでの巡回対象（aida→aiko→aimitsu→aizu→akaji…）は handle のアルファベット順と一致していたため、
//   導線順＝handleの昇順とみなして全625名から切り出す（実測で裏取り済みの代替手段）。
const Q = `query($a:String){ metaobjects(type:"artist", first:100, after:$a){
  pageInfo{hasNextPage endCursor} nodes{ handle fields{key value} } } }`;
let a = null; const all = [];
while (true) { const d = await g(Q, { a }); all.push(...d.metaobjects.nodes);
  if (!d.metaobjects.pageInfo.hasNextPage) break; a = d.metaobjects.pageInfo.endCursor; }
const byHandle = new Map(all.map((n) => [n.handle, n]));
const order = [...byHandle.keys()].sort();

const slice = order.slice(START - 1, END).filter((h) => byHandle.has(h));
console.log(`全${order.length}名 / 導線順(handle昇順) ${START}〜${END}位＝${slice.length}名を対象にする`);

const LANGS = ["en", "zh_cn", "zh_tw", "ko", "fr", "es", "de"];
const manifest = [];
for (const handle of slice) {
  const node = byHandle.get(handle);
  const f = Object.fromEntries(node.fields.map((x) => [x.key, x.value]));
  let i = {}; try { i = JSON.parse(f.artist_i18n || "{}"); } catch {}
  manifest.push({ handle, name_ja: f.name_ja });
  for (const l of LANGS) {
    const get = (k) => (l === "de" && (k === "bio" || k === "message")) ? i?.[k]?.de : (i?.[k]?.[l] ?? f[`${k}_${l}`]);
    let t = "";
    const add = (label, v) => { if (typeof v === "string" && v.trim()) t += `[${label}]\n${v}\n\n`; };
    add("肩書き", get("role")); add("所在地", get("location")); add("一言紹介", get("statement"));
    add("略歴（本文）", get("bio")); add("作家本人のことば", get("message")); add("功績（本文）", get("viewpoint"));
    if (t) writeFileSync(`${OUTDIR}/pin_${handle}_${l}.txt`, t, "utf8");
  }
}
writeFileSync(`${OUTDIR}/manifest.json`, JSON.stringify(manifest, null, 1), "utf8");
console.log(`書き出し完了: ${slice.length}名 × 最大7言語 → ${OUTDIR}`);
