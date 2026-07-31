// .com privacy ページから8言語のテキストユニットを構造付きで抽出する（読み取りのみ）
import { readFileSync, writeFileSync } from 'fs';

const html = readFileSync('com_privacy.html', 'utf8');
const LANGS = ['ja','en','zh-cn','zh-tw','ko','fr','es','de'];

function decode(s) {
  return s
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// pv-l スパンを文書順に、直前の構造タグ（h2/h3/p/li など）と節番号も添えて拾う
// まず span の開始位置をすべて収集
const results = {};
for (const lang of LANGS) results[lang] = [];

const re = /<span class="pv-l pv-l--([a-z-]+)">/g;
let m;
const units = []; // {lang, start, end, text, ctx}
while ((m = re.exec(html)) !== null) {
  const lang = m[1];
  // マッチした開始タグ以降、対応する </span> を深さ追跡で探す
  let depth = 1, i = re.lastIndex;
  while (depth > 0 && i < html.length) {
    const open = html.indexOf('<span', i);
    const close = html.indexOf('</span>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) { depth++; i = open + 5; }
    else { depth--; i = close + 7; }
  }
  const inner = html.slice(re.lastIndex, i - 7);
  // 直前200文字から包含要素タグを推定
  const before = html.slice(Math.max(0, m.index - 300), m.index);
  let ctx = 'span';
  const tagm = [...before.matchAll(/<(h2|h3|p|li|div|td|th)\b[^>]*>/g)];
  const closem = [...before.matchAll(/<\/(h2|h3|p|li|div|td|th)>/g)];
  if (tagm.length) {
    const lastOpen = tagm[tagm.length - 1];
    const lastClose = closem.length ? closem[closem.length - 1] : null;
    if (!lastClose || lastOpen.index > lastClose.index) ctx = lastOpen[1];
  }
  // 節番号（atspect-privacy__num）が同じ h2 内にあれば拾う
  let num = null;
  const numm = before.match(/<span class="atspect-privacy__num">(\d+)<\/span>\s*$/);
  if (numm) num = numm[1];
  units.push({ lang, ctx, num, text: decode(inner) });
}

for (const u of units) results[u.lang].push({ ctx: u.ctx, num: u.num, text: u.text });

for (const lang of LANGS) {
  writeFileSync(`com_${lang}.json`, JSON.stringify(results[lang], null, 1), 'utf8');
}
console.log('counts:', LANGS.map(l => `${l}=${results[l].length}`).join(' '));
// 構造概要（ja基準）
results['ja'].forEach((u, i) => {
  const t = u.text.replace(/\n/g, '⏎').slice(0, 42);
  console.log(String(i).padStart(2), u.ctx.padEnd(3), u.num ? `[${u.num}]` : '   ', t);
});
