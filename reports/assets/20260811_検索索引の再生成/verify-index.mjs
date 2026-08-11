// 索引を当てる前の検証：現行(live)と新生成を1件ずつ突き合わせ、項目の欠落・退行を数える。
// 検証3点＝①name_kana ②検索エイリアス ③is_listed が正しく引き継がれるか。
import fs from 'fs';
const OLD = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const NEW = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const byU = (j) => Object.fromEntries(j.artists.map(a => [a.u, a]));
const O = byU(OLD), N = byU(NEW);
const oU = new Set(Object.keys(O)), nU = new Set(Object.keys(N));

console.log('=== 件数 ===');
console.log('  現行', OLD.artists.length, '→ 新', NEW.artists.length);
const added = [...nU].filter(u => !oU.has(u));
const removed = [...oU].filter(u => !nU.has(u));
console.log('  増えた作家:', added.length, added.slice(0, 8).map(u => N[u].n + '(' + (N[u].e || '') + ')').join(' / '));
console.log('  消えた作家:', removed.length, removed.slice(0, 12).map(u => O[u].n + ' ' + u).join(' / '));

console.log('\n=== ① name_kana（k）の引き継ぎ ===');
let kLost = [], kGained = 0, kSame = 0;
for (const u of oU) { if (!nU.has(u)) continue; const a = O[u], b = N[u];
  if (a.k && !b.k) kLost.push(a.n + ' 「' + a.k + '」→空'); else if (!a.k && b.k) kGained++; else if (a.k === b.k) kSame++; }
console.log('  同じ:', kSame, '／新たに付いた:', kGained, '／★失われた:', kLost.length);
if (kLost.length) console.log('   ', kLost.slice(0, 10).join(' , '));
console.log('  新索引でkが空の作家:', NEW.artists.filter(a => !a.k).length, '名');

console.log('\n=== ② 検索エイリアス（a）の引き継ぎ ===');
const oA = OLD.artists.filter(a => a.a), nA = NEW.artists.filter(a => a.a);
console.log('  現行', oA.length, '件 → 新', nA.length, '件');
const aLost = oA.filter(a => !(N[a.u] && N[a.u].a === a.a));
console.log('  ★失われた/変わった:', aLost.length, aLost.slice(0, 6).map(a => a.n + ':' + a.a).join(' / '));
console.log('  例:', nA.slice(0, 3).map(a => a.n + '→' + a.a).join(' / '));

console.log('\n=== ③ is_listed（一覧に出さない作家）の扱い ===');
console.log('  ※スクリプトは is_listed==="false" を索引から除外する。');
console.log('  現行に居て新に居ない（＝除外された）作家:', removed.length, '名');
removed.forEach(u => console.log('     ', O[u].n, u));

console.log('\n=== ★項目ごとの欠落検査（共通の作家だけで比較）===');
const KEYS = ['n', 'e', 'k', 'g', 'c', 'b', 'd', 'u', 'a'];
const lost = {}, changed = {};
for (const k of KEYS) { lost[k] = 0; changed[k] = 0; }
const samples = {};
for (const u of oU) {
  if (!nU.has(u)) continue;
  const a = O[u], b = N[u];
  for (const k of KEYS) {
    const av = a[k] || '', bv = b[k] || '';
    if (av && !bv) { lost[k]++; if (!samples[k]) samples[k] = a.n + ': 「' + av + '」→空'; }
    else if (av !== bv) { changed[k]++; }
  }
}
for (const k of KEYS) console.log(`  ${k}: 値が消えた ${lost[k]} 件 ／ 値が変わった ${changed[k]} 件` + (samples[k] ? '  例＝' + samples[k] : ''));

console.log('\n=== バイト数が減った理由の切り分け ===');
console.log('  現行バイト:', fs.statSync(process.argv[2]).size, '／新バイト:', fs.statSync(process.argv[3]).size);
const avg = (j) => Math.round(JSON.stringify(j.artists).length / j.artists.length);
console.log('  1件あたり平均バイト: 現行', avg(OLD), '→ 新', avg(NEW));
const sample = OLD.artists.find(a => N[a.u]);
console.log('  同一作家の現物比較:');
console.log('    現行:', JSON.stringify(sample));
console.log('    新  :', JSON.stringify(N[sample.u]));
