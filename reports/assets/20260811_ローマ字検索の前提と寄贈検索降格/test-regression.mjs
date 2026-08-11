// 作業B検証：旧版と新版の正規化モジュールを同時に読み込み、
//  (1) 現行610名でキーが1本も変わらないこと（退行ゼロの証明）
//  (2) 符号つき化した場合の当たり方の変化（穴が塞がるか／誤ヒットが増えないか）
// を実データで数える。本番データは読むだけ。
import fs from 'fs';
import vm from 'vm';

function load(p) {
  const sb = { window: {} };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(p, 'utf8'), sb);
  return sb.window.ATSPECT_SEARCH;
}
const OLD = load(process.argv[2]);
const NEW = load(process.argv[3]);
const data = JSON.parse(fs.readFileSync(process.argv[4], 'utf8')).artists;

const keysOf = (S, a) => S.keysFromAll([a.n, a.e, a.c, a.k, a.a].filter(Boolean));

// ── (1) 退行ゼロの証明：現行データでキー配列が完全一致するか ──
let diff = 0, sample = [];
for (const a of data) {
  const o = JSON.stringify(keysOf(OLD, a)), n = JSON.stringify(keysOf(NEW, a));
  if (o !== n) { diff++; if (sample.length < 5) sample.push({ e: a.e, o, n }); }
}
console.log('=== (1) 現行610名：キー配列の一致 ===');
console.log('作家数:', data.length, '／ キーが変わった作家:', diff, '名', diff === 0 ? '＝退行ゼロ（証明）' : '＝★要調査');
sample.forEach(s => console.log('   ', s.e, '\n      旧', s.o, '\n      新', s.n));

// ── (2) 符号つき化のシミュレーション ──
// 現行のローマ字にある母音字並べを、符号つきへ機械変換して「将来のデータ」を作る（手元だけ・本番不触）
const toMacron = (s) => String(s || '')
  .replace(/ou/g, 'ō').replace(/oo/g, 'ō').replace(/uu/g, 'ū').replace(/ei/g, 'ē')
  .replace(/Ou/g, 'Ō').replace(/Oo/g, 'Ō').replace(/Uu/g, 'Ū').replace(/Ei/g, 'Ē');
const future = data.map(a => ({ ...a, e: toMacron(a.e) }));
const changed = future.filter((a, i) => a.e !== data[i].e);
console.log('\n=== (2) 符号つき化のシミュレーション ===');
console.log('符号つきになる作家:', changed.length, '名（例:', changed.slice(0, 6).map((a, i) => `${data[data.indexOf(data.find(d => d.u === a.u))].e}→${a.e}`).join(' / '), '）');

const mkIndex = (S, arr) => arr.map(a => ({ a, k: keysOf(S, a) }));
const find = (S, idx, q) => idx.filter(x => S.matches(S.tokens(q), x.k)).map(x => x.a.e);

const idxNowOld = mkIndex(OLD, data);        // 現行データ×旧実装＝いまの本番
const idxFutOld = mkIndex(OLD, future);      // 符号つきデータ×旧実装
const idxFutNew = mkIndex(NEW, future);      // 符号つきデータ×新実装

// 現行ASCII表記そのものを入力に見立てて、符号つき化しても引けるかを全数で確かめる
let lostOld = [], lostNew = [];
for (let i = 0; i < data.length; i++) {
  const orig = (data[i].e || '').toLowerCase();
  if (!orig) continue;
  const fam = orig.split(/\s+/)[0];
  if (!find(OLD, idxFutOld, fam).includes(future[i].e)) lostOld.push(fam + ' → ' + future[i].e);
  if (!find(NEW, idxFutNew, fam).includes(future[i].e)) lostNew.push(fam + ' → ' + future[i].e);
}
console.log('\n--- 符号つき化後、いまのASCII綴り（姓）で自分が引けなくなる作家 ---');
console.log('旧実装:', lostOld.length, '名 ／ 新実装:', lostNew.length, '名');
if (lostOld.length) console.log('   旧で引けない例:', lostOld.slice(0, 8).join(', '));
if (lostNew.length) console.log('   ★新でも引けない:', lostNew.slice(0, 8).join(', '));

// 「おお」由来（oo）を含む姓を、oo / o / oh の3通りで引けるか
const ooNames = data.filter(a => /oo/i.test(a.e || ''));
console.log('\n--- 「oo」を含む姓の引き方（符号つき化後）---');
console.log('該当:', ooNames.length, '名');
for (const a of ooNames.slice(0, 6)) {
  const i = data.indexOf(a), f = future[i].e;
  const fam = (a.e || '').toLowerCase().split(/\s+/)[0];       // 例 oono
  const famShort = fam.replace(/oo/g, 'o');                     // 例 ono
  const famH = fam.replace(/oo/g, 'oh');                        // 例 ohno
  const q = (S, idx, x) => find(S, idx, x).includes(f) ? '当' : '×';
  console.log(`   ${a.e} → ${f}｜"${fam}" 旧${q(OLD, idxFutOld, fam)}/新${q(NEW, idxFutNew, fam)}　"${famShort}" 旧${q(OLD, idxFutOld, famShort)}/新${q(NEW, idxFutNew, famShort)}　"${famH}" 旧${q(OLD, idxFutOld, famH)}/新${q(NEW, idxFutNew, famH)}`);
}

// 誤ヒットの増加を全数で測る＝符号つきデータに対し、610名の姓を総当たりで入力
let tOld = 0, tNew = 0, grew = [];
const fams = [...new Set(data.map(a => (a.e || '').trim().split(/\s+/)[0]).filter(Boolean).map(s => s.toLowerCase()))];
for (const f of fams) {
  const o = find(OLD, idxFutOld, f).length, n = find(NEW, idxFutNew, f).length;
  tOld += o; tNew += n;
  if (n > o) grew.push(`${f}:${o}→${n}`);
}
console.log('\n--- 符号つきデータへ姓441種を総当たり（当たり総数）---');
console.log('旧実装:', tOld, '→ 新実装:', tNew, '（増分', tNew - tOld, '）');
console.log('増えた姓:', grew.length ? grew.slice(0, 20).join(' / ') : 'なし');
