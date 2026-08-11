// Codexの指摘(a)(b)を、まず**そのまま再現**し、次に**実データ規模で害の量を数える**。
import fs from 'fs';
import vm from 'vm';
function load(p) { const sb = { window: {} }; vm.createContext(sb); vm.runInContext(fs.readFileSync(p, 'utf8'), sb); return sb.window.ATSPECT_SEARCH; }
const OLD = load(process.argv[2]), NEW = load(process.argv[3]);
const data = JSON.parse(fs.readFileSync(process.argv[4], 'utf8')).artists;
const keysOf = (S, a) => S.keysFromAll([a.n, a.e, a.c, a.k, a.a].filter(Boolean));

console.log('=== 指摘(a)の再現：接合部に生まれる部分文字列 "toh" ===');
const A1 = { n: '加藤 春', e: 'Katō Haru', c: '絵画' }, A2 = { n: '伊藤 花', e: 'Itō Hana', c: '絵画' };
for (const [lbl, S] of [['旧', OLD], ['新', NEW]]) {
  const hit = [A1, A2].filter(a => S.matches(S.tokens('toh'), keysOf(S, a))).map(a => a.e);
  console.log(`  ${lbl}実装: "toh" → ${JSON.stringify(hit)}　keys(Katō Haru)=${JSON.stringify(keysOf(S, A1).filter(k => /^[a-z\/]/.test(k)))}`);
}
console.log('  ★参考＝旧実装でも接合部の当たりは元からある:');
for (const q of ['ohar', 'oha']) {
  console.log(`    旧実装 "${q}" → ${[A1].filter(a => OLD.matches(OLD.tokens(q), keysOf(OLD, a))).map(a => a.e).length}件（接合部 kato|haru に元から存在）`);
}

console.log('\n=== 指摘(b)の再現：Ōta と Ohta が "ohta" で両方当たる ===');
const B1 = { n: '太田 健', e: 'Ōta Ken', c: '絵画' }, B2 = { n: '太田 純', e: 'Ohta Jun', c: '絵画' };
for (const [lbl, S] of [['旧', OLD], ['新', NEW]]) {
  console.log(`  ${lbl}実装: "ohta" → ${JSON.stringify([B1, B2].filter(a => S.matches(S.tokens('ohta'), keysOf(S, a))).map(a => a.e))}`);
}
console.log('  ★判断＝Ōta と Ohta は同一の姓「太田」の別綴り。両方当たるのは誤ヒットではなく意図した挙動か？');

// ── 実データ規模で「人が実際に打つ入力」による誤ヒットを数える ──
const toMacron = (s) => String(s || '').replace(/ou/g, 'ō').replace(/oo/g, 'ō').replace(/uu/g, 'ū').replace(/ei/g, 'ē');
const future = data.map(a => ({ ...a, e: toMacron(a.e) }));
const idx = (S, arr) => arr.map(a => ({ a, k: keysOf(S, a) }));
const IO = idx(OLD, future), IN = idx(NEW, future);
const run = (S, I, q) => I.filter(x => S.matches(S.tokens(q), x.k)).map(x => x.a.u);

// 人が打つであろう入力＝各作家の姓の4通りの綴り（符号つき／素／ou式／h式）＋その3〜6文字の前方一致
const queries = new Set();
for (const a of future) {
  const fam = (a.e || '').trim().split(/\s+/)[0]; if (!fam) continue;
  for (const f of [fam, NEW.norm(fam), NEW.normLong(fam), NEW.normLong2 ? NEW.normLong2(fam) : null, NEW.normH ? NEW.normH(fam) : null]) {
    if (!f) continue;
    const s = String(f).toLowerCase();
    queries.add(s);
    for (let L = 3; L <= Math.min(6, s.length); L++) queries.add(s.slice(0, L));
  }
}
console.log('\n=== 実データ610名（符号つき化を模擬）へ、人が打ちうる入力', queries.size, '通りを総当たり ===');
let newHits = 0, lostHits = 0, examples = [], lostEx = [];
for (const q of queries) {
  const o = new Set(run(OLD, IO, q)), n = new Set(run(NEW, IN, q));
  for (const u of n) if (!o.has(u)) { newHits++; if (examples.length < 12) examples.push(`"${q}"→${future.find(x => x.u === u).e}`); }
  for (const u of o) if (!n.has(u)) { lostHits++; if (lostEx.length < 6) lostEx.push(`"${q}"→${future.find(x => x.u === u).e}`); }
}
console.log('新実装で増えた当たり:', newHits, '件 ／ 減った当たり:', lostHits, '件');
console.log('増えた当たりの例:', examples.join(' , '));
if (lostHits) console.log('★減った当たり:', lostEx.join(' , '));

// 増えた当たりが「正しい当たり（その入力がその作家の綴りの一部）」かを機械判定する
let correct = 0, wrong = [];
for (const q of queries) {
  const o = new Set(run(OLD, IO, q)), n = run(NEW, IN, q);
  for (const u of n) {
    if (o.has(u)) continue;
    const a = future.find(x => x.u === u);
    const forms = [NEW.norm(a.e), NEW.normLong(a.e), NEW.normLong2(a.e), NEW.normH(a.e)];
    // 「その作家のいずれかの綴り形に、入力がそのまま含まれる」なら正しい当たり
    if (forms.some(f => f.indexOf(q) !== -1)) correct++; else wrong.push(`"${q}"→${a.e}`);
  }
}
console.log('\n増えた当たりの内訳＝ 綴りに含まれる（正しい）:', correct, '件 ／ 綴りに含まれない（★誤ヒット）:', wrong.length, '件');
if (wrong.length) console.log('★誤ヒットの例:', wrong.slice(0, 15).join(' , '));
