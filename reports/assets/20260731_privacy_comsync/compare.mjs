// .co.jp privacy.html の lang-block からユニット抽出し、.com 抽出結果(0..72)と突き合わせる
import { readFileSync } from 'fs';

const CORP = process.env.CORP_PATH || 'C:/Users/ataga/Desktop/コーポレートサイト制作/02_サイトデータ/privacy.html';
const html = readFileSync(CORP, 'utf8');

// 言語コード対応: corp → com
const MAP = { ja:'ja', en:'en', cn:'zh-cn', tw:'zh-tw', ko:'ko', fr:'fr', es:'es', de:'de' };

function decode(s) {
  return s
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim().replace(/[ \t]*\n[ \t]*/g, '\n');
}

function extractBlock(lang) {
  const startTag = `<div class="lang-block" data-lang="${lang}">`;
  const s = html.indexOf(startTag);
  if (s === -1) throw new Error('block not found: ' + lang);
  // 対応する閉じdivを深さ追跡
  let i = s + startTag.length, depth = 1;
  while (depth > 0) {
    const open = html.indexOf('<div', i);
    const close = html.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) { depth++; i = open + 4; }
    else { depth--; i = close + 6; }
  }
  const block = html.slice(s + startTag.length, i - 6);
  // ユニット抽出: h2 / li / pp-contact-box(div) / p（pp-date含む）を文書順に
  const re = /<(h2|li|p)([^>]*)>([\s\S]*?)<\/\1>|<div class="pp-contact-box">([\s\S]*?)<\/div>/g;
  const units = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    if (m[4] !== undefined) { units.push({ ctx: 'contact', text: decode(m[4]) }); continue; }
    const tag = m[1], attrs = m[2], inner = m[3];
    const cls = /class="([^"]*)"/.exec(attrs)?.[1] || '';
    units.push({ ctx: cls.includes('pp-date') ? 'date' : tag, text: decode(inner) });
  }
  return units;
}

const args = process.argv.slice(2);
const target = args[0] || 'all';
let totalDiff = 0;

// 比較用正規化: 空白類（改行・nbsp含む）を単一スペースへ
const norm = s => s.replace(/\s+/g, ' ').trim();

function charDiff(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let ja = a.length, jb = b.length;
  while (ja > i && jb > i && a[ja-1] === b[jb-1]) { ja--; jb--; }
  return `    @${i}: corp=${JSON.stringify(a.slice(Math.max(0,i-12), ja+12))} | com=${JSON.stringify(b.slice(Math.max(0,i-12), jb+12))}`;
}

// 節番号はja抽出結果から位置で伝播（他言語spanの直前にはnumスパンが無いため）
const jaCom = JSON.parse(readFileSync('com_ja.json', 'utf8'));

for (const [corpLang, comLang] of Object.entries(MAP)) {
  if (target !== 'all' && target !== corpLang) continue;
  const corp = extractBlock(corpLang);
  const com = JSON.parse(readFileSync(`com_${comLang}.json`, 'utf8')).slice(0, 73); // 0..72（締め文除外）

  // com側をcorpの表現形に正規化: h2はnum+". "+title、contact=unit70、date=unit72
  const comNorm = com.map((u, idx) => {
    if (jaCom[idx].ctx === 'h2') return { ctx: 'h2', text: `${jaCom[idx].num}. ${u.text}` };
    if (idx === 70) return { ctx: 'contact', text: u.text };
    if (idx === 72) return { ctx: 'date', text: u.text };
    return { ctx: u.ctx, text: u.text };
  });

  console.log(`\n===== ${corpLang} (com:${comLang}) corp=${corp.length} com=${comNorm.length} =====`);
  // 単純整列だと挿入でずれるためLCSベースの整列
  const a = corp.map(u => norm(u.text)), b = comNorm.map(u => norm(u.text));
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]);
  let i2 = 0, j2 = 0, diffs = 0;
  const ops = [];
  while (i2 < a.length && j2 < b.length) {
    if (a[i2] === b[j2]) { i2++; j2++; }
    else if (dp[i2+1][j2] >= dp[i2][j2+1]) { ops.push({ op: 'del', i: i2 }); i2++; }
    else { ops.push({ op: 'ins', j: j2 }); j2++; }
  }
  while (i2 < a.length) { ops.push({ op: 'del', i: i2++ }); }
  while (j2 < b.length) { ops.push({ op: 'ins', j: j2++ }); }
  // 隣接する del+ins は「変更」としてまとめて文字diffを出す
  for (let k = 0; k < ops.length; k++) {
    const o = ops[k], nx = ops[k+1];
    if (o.op === 'del' && nx && nx.op === 'ins') {
      console.log(` CHANGED corp[${o.i}] -> com[${nx.j}] (${comNorm[nx.j].ctx})`);
      console.log(charDiff(a[o.i], b[nx.j]));
      k++; diffs++;
    } else if (o.op === 'del') {
      console.log(` CORP-ONLY [${o.i}] ${JSON.stringify(a[o.i]).slice(0,140)}`); diffs++;
    } else {
      console.log(` COM-ONLY  [${o.j}] (${comNorm[o.j].ctx}) ${JSON.stringify(b[o.j]).slice(0,160)}`); diffs++;
    }
  }
  console.log(` => diff units: ${diffs}`);
  totalDiff += diffs;
}
console.log(`\nTOTAL diff units: ${totalDiff}`);
