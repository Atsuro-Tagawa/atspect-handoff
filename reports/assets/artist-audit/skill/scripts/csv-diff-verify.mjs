import fs from 'fs';
function load(p) {
  let t = fs.readFileSync(p, 'utf8');
  const bom = t.charCodeAt(0) === 0xFEFF; if (bom) t = t.slice(1);
  const rows = []; let row = []; let cur = ''; let q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i+1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\r') {} else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; } else cur += c; }
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return { rows, bom, crlf: t.includes('\r\n') };
}
const A = load(process.argv[2]), B = load(process.argv[3]);
console.log(`旧: 行=${A.rows.length - 1} BOM=${A.bom} CRLF=${A.crlf}`);
console.log(`新: 行=${B.rows.length - 1} BOM=${B.bom} CRLF=${B.crlf}`);
if (A.rows.length !== B.rows.length) { console.log('!! 行数が違う'); process.exit(1); }
const H = A.rows[0]; const iB = H.indexOf('備考'), iN = H.indexOf('名前(日本語)');
let diffBiko = 0, diffOther = 0, emptied = 0, shortened = 0;
for (let r = 0; r < A.rows.length; r++) {
  const a = A.rows[r], b = B.rows[r];
  if (a.length !== b.length) { console.log(`!! L${r+1} 列数違い ${a.length} vs ${b.length}`); diffOther++; continue; }
  for (let c = 0; c < a.length; c++) {
    if (a[c] === b[c]) continue;
    if (c === iB) { diffBiko++; if (!b[c]) emptied++; else shortened++; }
    else { diffOther++; console.log(`!! 備考以外が変化: L${r+1} ${a[iN]} 列=${H[c]}\n  旧:${a[c]}\n  新:${b[c]}`); }
  }
}
console.log(`備考の変化=${diffBiko}件（うち空欄化=${emptied} 一部残し=${shortened}） / 備考以外の変化=${diffOther}件`);
// 備考が空でない件数
const cnt = (X) => X.rows.slice(1).filter(x => (x[iB] || '').trim()).length;
console.log(`備考が空でない件数: 旧=${cnt(A)} → 新=${cnt(B)}`);
