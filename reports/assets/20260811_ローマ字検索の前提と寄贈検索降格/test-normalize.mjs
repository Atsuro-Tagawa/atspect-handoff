// 作業A：ライブの正規化モジュール（assets/atspect-search-normalize.js）を実ファイルのまま単体検証する。
// 本番データは一切書き換えない。合成形(NFC)と分解形(NFD)の両方で試す。
import fs from 'fs';
import vm from 'vm';

const src = fs.readFileSync(process.argv[2], 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const S = sandbox.window.ATSPECT_SEARCH;
if (!S) throw new Error('ATSPECT_SEARCH が生成されなかった');

// 統合検索(atspect-artist-archive)の keysOf と同じ作り方でキーを作る
// vals = [name_ja(n), name_en(e), category(c), name_kana(k), alias(a)]
const keysOfArtist = (a) => S.keysFromAll([a.n, a.e, a.c, a.k, a.a].filter(Boolean));
const hit = (q, a) => S.matches(S.tokens(q), keysOfArtist(a));

const NFC = (s) => s.normalize('NFC');
const NFD = (s) => s.normalize('NFD');

// テスト用の架空データ（本番には存在しない。判定のためだけに手元で作る）
const mk = (e, form) => ({ n: '加藤 光一', e: form(e), c: '彫刻', k: 'かとう こういち' });
const katoNFC = mk('Katō Kōichi', NFC);
const katoNFD = mk('Katō Kōichi', NFD);
// 実在データ（比較の基準＝現行は符号なし）
const suzuki = { n: '鈴木 千賀子', e: 'Suzuki Chikako', c: '彫刻', k: 'すずき ちかこ' };
// 誤ヒット検査用
const inoue = { n: '井上 三綱', e: 'Inoue Sanko', c: '絵画', k: 'いのうえ さんこう' };
const ono = { n: '大野 幸子', e: 'Ōno Yukiko', c: '絵画', k: 'おおの ゆきこ' };
const onoShort = { n: '小野 由紀', e: 'Ono Yuki', c: '絵画', k: 'おの ゆき' };

const rows = [];
const t = (label, q, target, expect) => {
  const got = hit(q, target);
  rows.push({ label, q, name: target.e, expect, got, verdict: got === expect ? 'PASS' : '**FAIL**' });
};

console.log('=== ① 符号なし入力で符号つき表記が当たるか（合成形データ）===');
['kato', 'Kato', 'KATO', 'kAtO'].forEach(q => t('①大小文字', q, katoNFC, true));
t('①姓名つづけ', 'katokoichi', katoNFC, true);
t('①名だけ', 'koichi', katoNFC, true);
t('①姓名逆順', 'koichi kato', katoNFC, true);

console.log('=== ② 母音字並べ入力（katou）===');
['katou', 'Katou', 'KATOU'].forEach(q => t('②母音字並べ', q, katoNFC, true));
t('②名も母音字並べ', 'kouichi', katoNFC, true);
t('②姓名とも母音字並べ', 'katou kouichi', katoNFC, true);

console.log('=== ③ 符号つき入力（katō）===');
['katō', 'Katō', 'KATŌ'].forEach(q => t('③符号つき', q, katoNFC, true));
t('③符号つき姓名', 'katō kōichi', katoNFC, true);
t('③分解形で入力', NFD('katō'), katoNFC, true);

console.log('=== ④ データが分解形(NFD)で入っていた場合 ===');
['kato', 'katou', 'katō'].forEach(q => t('④NFDデータ', q, katoNFD, true));

console.log('=== ⑤ 既存の実データが退行しないか ===');
t('⑤既存', 'suzuki chikako', suzuki, true);
t('⑤既存', 'chikako suzuki', suzuki, true);
t('⑤既存', 'suzukichikako', suzuki, true);
t('⑤既存かな', 'すずき', suzuki, true);
t('⑤既存漢字', '鈴木', suzuki, true);

console.log('=== ⑥ 誤ヒットの穴（作業Bの ou→o 吸収を入れる前の現状）===');
t('⑥Inoue誤ヒット', 'inoe', inoue, false);          // 期待＝当たらない
t('⑥Inoue正しく', 'inoue', inoue, true);
t('⑥長短の区別', 'ono', ono, true);                  // Ōno は ono で当たってよい
t('⑥長短の区別', 'ono', onoShort, true);             // Ono も当たる＝同名衝突は許容
t('⑥oono', 'oono', ono, true);                       // Ōno→oono の形
// ★期待値の変更（2026-08-11）＝修正前は false（h長音は未対応）だったが、本便で MACRON_H を
//   意図して追加したため true が正しい期待値になった。挙動が変わったのではなく、仕様を変えた。
t('⑥ohno', 'ohno', ono, true);                       // Ōno→ohno（パスポート式のh長音）

const pad = (s, n) => String(s) + ' '.repeat(Math.max(0, n - String(s).length));
console.log('\n' + pad('区分', 14) + pad('入力', 16) + pad('対象', 16) + pad('期待', 6) + pad('実測', 6) + '判定');
for (const r of rows) console.log(pad(r.label, 14) + pad(JSON.stringify(r.q), 16) + pad(r.name, 16) + pad(r.expect, 6) + pad(r.got, 6) + r.verdict);
const fail = rows.filter(r => r.verdict !== 'PASS');
console.log(`\n合計 ${rows.length} 件 / FAIL ${fail.length} 件`);
if (fail.length) { console.log('FAIL 一覧:'); fail.forEach(r => console.log('  ', r.label, JSON.stringify(r.q), '→', r.name, '期待', r.expect, '実測', r.got)); }

// 参考＝実際に生成されるキーを見る
console.log('\n--- 生成キー（合成形 Katō Kōichi）:', JSON.stringify(keysOfArtist(katoNFC)));
console.log('--- 生成キー（分解形 Katō Kōichi）:', JSON.stringify(keysOfArtist(katoNFD)));
console.log('--- 生成キー（Inoue Sanko）:', JSON.stringify(keysOfArtist(inoue)));
