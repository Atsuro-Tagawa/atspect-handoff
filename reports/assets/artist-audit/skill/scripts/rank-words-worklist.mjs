import fs from 'fs';
let t = fs.readFileSync('C:/Users/ataga/Desktop/作家リサーチ/artists_master_cleaned.csv', 'utf8');
if (t.charCodeAt(0) === 0xFEFF) t = t.slice(1);
const rows = []; let row = []; let cur = ''; let q = false;
for (let i = 0; i < t.length; i++) { const c = t[i];
  if (q) { if (c === '"') { if (t[i+1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
  else { if (c === '"') q = true; else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\r') {} else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; } else cur += c; } }
if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
const H = rows[0]; const I = n => H.indexOf(n);
// ライブに出る欄（i18n経由）＝statement / bio / viewpoint / 肩書き(role)
const LIVE = ['statement_ja', 'bio_ja', 'viewpoint_ja', '肩書き'];
// CSVのみ（ライブ非反映）
const CSVONLY = ['主な活動・知られること', '備考'];
const WORDS = ['第一人者','代表する','代表的','中心的人物','中心人物','中心となった','重鎮','先駆的','先駆者','先駆','先がけ','さきがけ','先達','確立者','主導し','を主導','主導的','指導的','牽引','けん引','草分け','旗手','立役者','泰斗','大御所','巨頭','巨匠','大家','随一','屈指','最高峰','第一級','一流','権威','双璧','正統','本流','頂点','名家','重要人物','重要作家'];
const out = [];
for (let r = 1; r < rows.length; r++) {
  const name = rows[r][I('名前(日本語)')], genre = rows[r][I('ジャンル')];
  const live = {}, csvonly = {};
  for (const f of LIVE) { const v = (rows[r][I(f)] || '').trim(); if (!v) continue;
    const w = WORDS.filter(x => v.includes(x)); if (w.length) live[f] = w; }
  for (const f of CSVONLY) { const v = (rows[r][I(f)] || '').trim(); if (!v) continue;
    const w = WORDS.filter(x => v.includes(x)); if (w.length) csvonly[f] = w; }
  if (Object.keys(live).length || Object.keys(csvonly).length)
    out.push({ name, genre, live, csvonly, nLive: Object.keys(live).length });
}
out.sort((a, b) => b.nLive - a.nLive || a.genre.localeCompare(b.genre) || a.name.localeCompare(b.name));
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1), 'utf8');
const liveArtists = out.filter(o => o.nLive > 0);
console.log(`該当作家=${out.length} / ライブに出る欄に該当=${liveArtists.length}名 / CSVのみ=${out.length - liveArtists.length}名`);
const perField = {};
for (const o of out) { for (const f of Object.keys(o.live)) perField[f] = (perField[f] || 0) + 1; for (const f of Object.keys(o.csvonly)) perField[f] = (perField[f] || 0) + 1; }
console.log('欄ごとの作家数: ' + JSON.stringify(perField));
console.log('ライブ該当の作家名: ' + liveArtists.map(o => o.name).join(','));
