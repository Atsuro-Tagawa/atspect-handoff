/* 網の検証＝旧方式（通読・全指摘）の「重大度=高」を正解集合とし、
 * 巡回（最大3件・速い）がそのうち何割を（表現は違っても）拾えたかを、
 * 引用文の重なり（部分文字列一致・簡易正規化）で判定する。 */
import { readFileSync, existsSync } from "node:fs";

const HANDLES = ["aizu-yaichi", "akaji-yusai", "akino-fuku", "akira-kanayama", "amada-kohei",
  "amata-akitsugu", "amemiya-jiro", "amemiya-keiko", "anzai-mizumaru", "aoyama-san-u"];
const LANGS = ["en", "zh_cn", "zh_tw", "ko", "fr", "es", "de"];

function parseOld(body) {
  const lines = body.split("\n");
  const items = []; let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (/^引用:/.test(t)) { if (cur) items.push(cur); cur = { quote: t.replace(/^引用:\s*/, "") }; }
    if (/^種別:/.test(t) && cur) cur.kind = t;
    if (/重大度: 高/.test(t) && cur) cur.high = true;
  }
  if (cur) items.push(cur);
  return items.filter((x) => x.high);
}
function parsePatrol(body) {
  const lines = body.split("\n");
  const items = []; let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (/^引用:/.test(t)) { if (cur) items.push(cur); cur = { quote: t.replace(/^引用:\s*/, "") }; }
    else if (/^違和感:/.test(t) && cur) cur.note = t.replace(/^違和感:\s*/, "");
  }
  if (cur) items.push(cur);
  return items;
}
const norm = (s) => (s || "").toLowerCase().replace(/[«»""''「」『』（）()、,。.\s]/g, "").slice(0, 40);

let totalHigh = 0, caught = 0;
const misses = [];
for (const h of HANDLES) {
  for (const l of LANGS) {
    const op = `codex_${h}_nc_${l}.out`, pp = `pout_${h}_${l}.out`;
    if (!existsSync(op) || !existsSync(pp)) continue;
    const oraw = readFileSync(op, "utf8"); const praw = readFileSync(pp, "utf8");
    const os = oraw.indexOf("\ncodex\n"), oe = oraw.indexOf("\ntokens used");
    const obody = os >= 0 && oe > os ? oraw.slice(os + 7, oe) : oraw;
    const ps = praw.indexOf("\ncodex\n"), pe = praw.indexOf("\ntokens used");
    const pbody = ps >= 0 && pe > ps ? praw.slice(ps + 7, pe) : praw;
    const highs = parseOld(obody);
    const patrolItems = parsePatrol(pbody);
    const patrolNorms = patrolItems.map((x) => norm(x.quote));
    for (const hi of highs) {
      totalHigh++;
      const hn = norm(hi.quote);
      const hit = patrolNorms.some((pn) => pn && hn && (pn.includes(hn.slice(0, 15)) || hn.includes(pn.slice(0, 15))));
      if (hit) caught++;
      else misses.push({ handle: h, lang: l, quote: hi.quote });
    }
  }
}
console.log(`正解集合（旧方式・高重大度）＝ ${totalHigh} 件`);
console.log(`巡回が拾った（表現の重なりで判定）＝ ${caught} 件`);
console.log(`拾い率 ＝ ${totalHigh ? ((caught / totalHigh) * 100).toFixed(1) : 0}%`);
console.log(`\n★巡回が拾えなかった高重大度（全件）:`);
misses.forEach((m) => console.log(`  ${m.handle}/${m.lang}: ${m.quote}`));
