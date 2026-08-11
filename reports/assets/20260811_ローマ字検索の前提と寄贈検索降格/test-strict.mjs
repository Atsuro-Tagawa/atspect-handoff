// 前の検査の反省＝「増えた当たりが、その作家のキーに含まれるか」を基準にしたのは自明に真になる＝空振り。
// 基準を厳しくして数え直す：増えた当たりを「姓の前方一致（正当）」「姓の途中一致（既存仕様と同型）」
// 「姓に無い＝接合部由来（★本当の誤ヒット）」の3つに仕分ける。
import fs from 'fs';
import vm from 'vm';
function load(p) { const sb = { window: {} }; vm.createContext(sb); vm.runInContext(fs.readFileSync(p, 'utf8'), sb); return sb.window.ATSPECT_SEARCH; }
const OLD = load(process.argv[2]), NEW = load(process.argv[3]);
const data = JSON.parse(fs.readFileSync(process.argv[4], 'utf8')).artists;
const keysOf = (S, a) => S.keysFromAll([a.n, a.e, a.c, a.k, a.a].filter(Boolean));
const toMacron = (s) => String(s || '').replace(/ou/g, 'ō').replace(/oo/g, 'ō').replace(/uu/g, 'ū').replace(/ei/g, 'ē');
const future = data.map(a => ({ ...a, e: toMacron(a.e) }));
const idx = (S, arr) => arr.map(a => ({ a, k: keysOf(S, a) }));
const IO = idx(OLD, future), IN = idx(NEW, future);
const run = (S, I, q) => I.filter(x => S.matches(S.tokens(q), x.k)).map(x => x.a.u);

const queries = new Set();
for (const a of future) {
  const fam = (a.e || '').trim().split(/\s+/)[0]; if (!fam) continue;
  for (const f of [NEW.norm(fam), NEW.normLong(fam), NEW.normLong2(fam), NEW.normH(fam)]) {
    const s = String(f).toLowerCase(); queries.add(s);
    for (let L = 3; L <= Math.min(6, s.length); L++) queries.add(s.slice(0, L));
  }
}
// 各作家の姓の4形・氏名全体の4形
const famForms = (a) => { const f = (a.e || '').trim().split(/\s+/)[0] || ''; return [NEW.norm(f), NEW.normLong(f), NEW.normLong2(f), NEW.normH(f)]; };
const givenForms = (a) => { const p = (a.e || '').trim().split(/\s+/); const g = p.slice(1).join(' '); return g ? [NEW.norm(g), NEW.normLong(g), NEW.normLong2(g), NEW.normH(g)] : []; };

const buckets = { 姓の前方一致: [], 姓の途中一致: [], 名に一致: [], 接合部由来: [] };
for (const q of queries) {
  const o = new Set(run(OLD, IO, q));
  for (const u of run(NEW, IN, q)) {
    if (o.has(u)) continue;
    const a = future.find(x => x.u === u);
    const F = famForms(a), G = givenForms(a);
    if (F.some(f => f.startsWith(q))) buckets['姓の前方一致'].push(`"${q}"→${a.e}`);
    else if (F.some(f => f.indexOf(q) !== -1)) buckets['姓の途中一致'].push(`"${q}"→${a.e}`);
    else if (G.some(g => g.indexOf(q) !== -1)) buckets['名に一致'].push(`"${q}"→${a.e}`);
    else buckets['接合部由来'].push(`"${q}"→${a.e}`);
  }
}
console.log('=== 増えた当たり', Object.values(buckets).reduce((s, b) => s + b.length, 0), '件の仕分け（厳しい基準）===');
for (const [k, v] of Object.entries(buckets)) {
  console.log(`  ${k}: ${v.length}件` + (v.length ? `　例: ${v.slice(0, 8).join(' , ')}` : ''));
}
console.log('\n★「接合部由来」＝姓にも名にも無い文字列で当たる＝本当の誤ヒット。0件であることが合格条件。');

// ── 空振り検査（対照実験）＝わざと壊した実装を作り、この検査が本当に検出できるかを確かめる ──
// ★前回の対照実験は ā を壊したが、模擬データに ā が1件も無く「何も踏まずに合格」していた＝空振りの空振り。
//   実際に存在する ō を壊す（模擬データの符号は ō / ū / ē のみ）。
const brokenSrc = fs.readFileSync(process.argv[3], 'utf8')
  .replace("'ō': 'oh',", "'ō': 'oxqz',");  // 姓にも名にも無い文字列を混ぜる
const sb = { window: {} }; vm.createContext(sb); vm.runInContext(brokenSrc, sb);
const BROKEN = sb.window.ATSPECT_SEARCH;
const IB = idx(BROKEN, future);
let detected = 0;
for (const a of future) {
  const k = keysOf(BROKEN, a).join('|');
  if (k.indexOf('oxqz') !== -1) { detected++; }
}
console.log(`\n--- 空振り検査（対照実験）---`);
console.log(`わざと壊した実装（ō→oxqz）で、汚染されたキーを持つ作家: ${detected}名 ＝ ${detected > 0 ? '検査経路は生きている' : '★検査が届いていない（要見直し）'}`);
if (detected > 0) {
  // 壊した実装で「接合部由来」判定が実際に立つか
  let bad = 0;
  for (const a of future) {
    const k = keysOf(BROKEN, a);
    if (k.join('|').indexOf('oxqz') === -1) continue;
    const hits = IB.filter(x => BROKEN.matches(BROKEN.tokens('oxqz'), x.k));
    if (hits.length) { bad = hits.length; break; }
  }
  console.log(`壊した実装へ "oxqz" を入力 → ${bad}件が当たる ＝ 仕分けが「接合部由来」を拾える構造であることの確認`);
}
