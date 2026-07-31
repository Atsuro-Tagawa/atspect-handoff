/**
 * 正本CSVの1作家・複数列を安全に書き換える。
 * 使い方: node csv_set.mjs <出力先> '<JSON>'
 *   JSON = [{ "name":"松田 権六", "set": { "代表作":"…", "masterworks_text":"…" } }, ...]
 * 物理行＝データ行（フィールド内改行なし）を利用し、該当行の該当フィールドだけを差し替える。
 * BOM・CRLF・他フィールドの引用形式はすべて保持する。
 */
import fs from 'fs';
const CSV = 'C:/Users/ataga/Desktop/作家リサーチ/artists_master_cleaned.csv';
const raw = fs.readFileSync(CSV, 'utf8');
const hasBOM = raw.charCodeAt(0) === 0xFEFF;
const body = hasBOM ? raw.slice(1) : raw;
const eol = body.includes('\r\n') ? '\r\n' : '\n';
const lines = body.split(/\r?\n/);
function spans(line) {
  const s = []; let st = 0; let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i+1] === '"') i++; else q = false; } }
    else { if (c === '"') q = true; else if (c === ',') { s.push([st, i]); st = i + 1; } }
  }
  s.push([st, line.length]);
  return s;
}
const unq = t => t.startsWith('"') ? t.slice(1, -1).replace(/""/g, '"') : t;
const quote = v => '"' + String(v).replace(/"/g, '""') + '"';
const H = spans(lines[0]).map(([a, b]) => unq(lines[0].slice(a, b)));
const norm = s => String(s).replace(/[\s　]/g, '');
let jobTxt = fs.readFileSync(process.argv[3], 'utf8');
if (jobTxt.charCodeAt(0) === 0xFEFF) jobTxt = jobTxt.slice(1);
const items = JSON.parse(jobTxt);
let n = 0;
for (const it of items) {
  let idx = -1;
  for (let li = 1; li < lines.length; li++) {
    if (!lines[li]) continue;
    const sp = spans(lines[li]);
    if (sp.length !== H.length) continue;
    if (norm(unq(lines[li].slice(sp[1][0], sp[1][1]))) === norm(it.name)) { idx = li; break; }
  }
  if (idx < 0) { console.log(`!! CSVに見つかりません: ${it.name}`); continue; }
  for (const [col, val] of Object.entries(it.set)) {
    const ci = H.indexOf(col);
    if (ci < 0) { console.log(`!! 列がありません: ${col}`); continue; }
    const sp = spans(lines[idx]);
    const before = unq(lines[idx].slice(sp[ci][0], sp[ci][1]));
    if (before === val) { console.log(`   [変更なし] ${it.name} / ${col}`); continue; }
    lines[idx] = lines[idx].slice(0, sp[ci][0]) + quote(val) + lines[idx].slice(sp[ci][1]);
    console.log(`   [更新] ${it.name} / ${col}\n      旧: ${before}\n      新: ${val}`);
    n++;
  }
}
fs.writeFileSync(process.argv[2], (hasBOM ? '\uFEFF' : '') + lines.join(eol), 'utf8');
console.log(`変更 ${n} 箇所`);
