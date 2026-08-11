// 作業B事前調査：「入力側で ou→o を潰す」案の副作用を、実データ610名で数える。
// 本番データは読むだけ。判定は手元で行う。
import fs from 'fs';
import vm from 'vm';

const src = fs.readFileSync(process.argv[2], 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const S = sandbox.window.ATSPECT_SEARCH;
const data = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')).artists;

const keysOf = (a) => S.keysFromAll([a.n, a.e, a.c, a.k, a.a].filter(Boolean));
const KEYS = data.map(a => ({ a, k: keysOf(a) }));
const search = (q, mut) => {
  let toks = S.tokens(q);
  if (mut) toks = toks.map(mut);
  return KEYS.filter(x => S.matches(toks, mut ? x.k.map(k => (k.charAt(0) === '/' ? '/' + mut(k.slice(1)) : mut(k))) : x.k)).map(x => x.a.e || x.a.n);
};
const squeezeOU = (s) => s.replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/ei/g, 'e').replace(/aa/g, 'a').replace(/ii/g, 'i');

// 1) 現行の挙動で「ou を含むローマ字」を持つ作家が何名いるか
const ouNames = data.filter(a => /ou|uu|ei|oo/i.test(a.e || ''));
console.log('=== 実データ610名のうち、母音字並べ（ou/uu/ei/oo）を含むローマ字 ===');
console.log('該当:', ouNames.length, '名');
console.log('例:', ouNames.slice(0, 20).map(a => a.e).join(' / '));

// 2) 「入力側で ou→o を潰す」案を入れた場合、既存の検索結果がどう変わるか
console.log('\n=== ou→o 吸収を入れた場合の件数変化（実データ610名で全数）===');
const probes = ['inoue', 'inoe', 'ono', 'ono yuki', 'kato', 'satou', 'sato', 'suzuki', 'ito', 'itou', 'goto', 'gotou', 'kudo', 'kudou', 'saito', 'saitou', 'ohno', 'oono', 'shuji', 'shuuji', 'keiko', 'keko'];
const rows = [];
for (const q of probes) {
  const now = search(q);
  const after = search(q, squeezeOU);
  rows.push({ q, now: now.length, after: after.length, added: after.filter(x => !now.includes(x)) });
}
const pad = (s, n) => String(s) + ' '.repeat(Math.max(0, n - String(s).length));
console.log(pad('入力', 12) + pad('現行', 6) + pad('吸収後', 8) + '増えた当たり（＝誤ヒットの疑い）');
for (const r of rows) console.log(pad(r.q, 12) + pad(r.now, 6) + pad(r.after, 8) + (r.added.length ? r.added.slice(0, 6).join(', ') + (r.added.length > 6 ? ` …計${r.added.length}件` : '') : '—'));

// 3) 総当たり＝610名の姓（ローマ字先頭語）を入力に見立て、吸収前後で当たりが増える件数を数える
console.log('\n=== 610名の姓を総当たりで入力して、吸収で増える当たりの総数 ===');
let totalNow = 0, totalAfter = 0, worsened = [];
const fams = [...new Set(data.map(a => (a.e || '').trim().split(/\s+/)[0]).filter(Boolean).map(s => s.toLowerCase()))];
for (const f of fams) {
  const n = search(f).length, af = search(f, squeezeOU).length;
  totalNow += n; totalAfter += af;
  if (af > n) worsened.push({ f, n, af });
}
console.log('姓の種類:', fams.length, '／ 当たり総数 現行:', totalNow, '→ 吸収後:', totalAfter, '（増分', totalAfter - totalNow, '）');
console.log('増えた姓の上位:', worsened.sort((a, b) => (b.af - b.n) - (a.af - a.n)).slice(0, 12).map(x => `${x.f}:${x.n}→${x.af}`).join(' / '));
