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
const FIELDS = ['statement_ja', 'bio_ja', 'viewpoint_ja', '主な活動・知られること', '肩書き', '備考'];

// B＝当社が付けた順位（誰が言ったか辿れない）
const B = ['第一人者','代表する','代表的','中心的人物','中心人物','中心となった','重鎮','先駆的','先駆者','先駆','先がけ','さきがけ','先達','確立者','主導し','を主導','主導的','指導的','牽引','けん引','草分け','旗手','立役者','泰斗','大御所','巨頭','巨匠','大家','随一','屈指','最高峰','第一級','第一線','最前線','牽引者','担い手として','旗頭','立て役者','トップ','一流','権威','双璧','正統','本流','頂点','を極めた第一','名家'];
// A＝通称（「〜と呼ばれた」等・誰がそう呼んだかを辿れる形）
const A = ['と呼ばれた','とも呼ばれた','と称された','とも称された','と評された','の異名'];
// C＝美術史の用語（出典が確認できれば残す）
const C = ['の祖','三筆','明治三筆','重要人物','重要作家','近代日本画の祖','近代洋画の祖','能書','中興','開拓者','創始者','創始','鼻祖'];

const hits = { A: [], B: [], C: [] };
for (let r = 1; r < rows.length; r++) {
  const name = rows[r][I('名前(日本語)')], genre = rows[r][I('ジャンル')];
  for (const f of FIELDS) {
    const v = (rows[r][I(f)] || '').trim(); if (!v) continue;
    for (const [cat, list] of [['A', A], ['B', B], ['C', C]]) {
      for (const w of list) {
        if (!v.includes(w)) continue;
        // 前後30字を切り出す
        const p = v.indexOf(w);
        const ctx = v.slice(Math.max(0, p - 30), Math.min(v.length, p + w.length + 30));
        hits[cat].push({ name, genre, field: f, word: w, ctx });
      }
    }
  }
}
// 作家単位で集計
const byArtist = new Map();
for (const cat of ['A', 'B', 'C']) for (const h of hits[cat]) {
  if (!byArtist.has(h.name)) byArtist.set(h.name, { genre: h.genre, A: [], B: [], C: [] });
  byArtist.get(h.name)[cat].push(h);
}
let m = `# 序列を感じさせる語の全数抽出 2026-07-31\n\n`;
m += `司令塔判断（2026-07-31）の基準＝**誰がそう言ったかを辿れるなら残す。辿れないなら外す。**\n\n`;
m += `| 区分 | 意味 | 扱い |\n|---|---|---|\n`;
m += `| **A** | 当時からそう呼ばれていた通称 | **残す。ただし「〜と呼ばれた」の形に書き換える**（「である」は当社の評価になるため）。一次資料で呼称の使用記録を確認できなければBへ落とす |\n`;
m += `| **B** | 当社が付けた順位 | **外す**。実績が伝わらなくなる場合は具体的な事実（受賞・所属・代表作）に置き換える |\n`;
m += `| **C** | 美術史の用語 | **出典が確認できるものだけ残す**。美術館・辞典・学術資料での使用を確認できなければ外す |\n\n`;
m += `★迷ったら外す。書かなければ後で足せる。\n\n`;
m += `## 集計\n\n| 区分 | 延べ件数 | 作家数 |\n|---|---|---|\n`;
for (const cat of ['A', 'B', 'C']) {
  const n = new Set(hits[cat].map(h => h.name)).size;
  m += `| ${cat} | ${hits[cat].length} | ${n}名 |\n`;
}
m += `| **合計（重複除く作家数）** | ${hits.A.length + hits.B.length + hits.C.length} | **${byArtist.size}名** |\n\n`;
m += `### 語ごとの件数\n\n`;
for (const cat of ['B', 'C', 'A']) {
  const cnt = {}; for (const h of hits[cat]) cnt[h.word] = (cnt[h.word] || 0) + 1;
  const sorted = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
  m += `**${cat}**：` + sorted.map(([w, c]) => `${w}(${c})`).join('／') + '\n\n';
}
for (const cat of ['B', 'A', 'C']) {
  m += `\n---\n\n## ${cat} の全件（${hits[cat].length}件）\n\n| 作家 | ジャンル | 欄 | 語 | 前後の文脈 |\n|---|---|---|---|---|\n`;
  for (const h of hits[cat]) m += `| ${h.name} | ${h.genre} | ${h.field} | ${h.word} | …${h.ctx.replace(/\|/g, '/')}… |\n`;
}
fs.writeFileSync(process.argv[2], m, 'utf8');
console.log(`A=${hits.A.length} B=${hits.B.length} C=${hits.C.length} / 該当作家=${byArtist.size}`);
// 作家名リスト（是正の作業順に使う）
fs.writeFileSync(process.argv[3], JSON.stringify([...byArtist.entries()].map(([n, v]) => ({ name: n, genre: v.genre, A: v.A.length, B: v.B.length, C: v.C.length })), null, 1), 'utf8');
