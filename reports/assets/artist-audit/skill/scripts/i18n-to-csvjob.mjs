/**
 * artist-i18n-update.mjs 用の指示書JSONから、CSV正本同期用のジョブJSONを機械生成する。
 *   node i18n-to-csvjob.mjs <指示書.json> <出力ジョブ.json>
 * i18n の ja と flat を、CSVの列名に対応づける（対応表 MAP）。
 * ★ja以外の言語はCSVに列が無いため対象外（CSVは日本語のみ）。
 */
import fs from 'fs';
const MAP_I18N = {
  statement: 'statement_ja',
  bio: 'bio_ja',
  viewpoint: 'viewpoint_ja',
  role: '肩書き',
  location: '出身地',
  collection: ['収蔵先・記念館', 'collection_places'],
  groups: ['所属していた美術団体', 'groups'],
  name_kana: 'name_kana',
};
const MAP_FLAT = {
  masterworks_text: ['代表作', 'masterworks_text'],
  category: 'ジャンル',
};
let t = fs.readFileSync(process.argv[2], 'utf8');
if (t.charCodeAt(0) === 0xFEFF) t = t.slice(1);
const src = JSON.parse(t);
const jobs = [];
for (const u of src.updates) {
  const set = {};
  for (const [k, v] of Object.entries(u.i18n || {})) {
    if (k === 'masterworks') continue;                  // 配列＝flat側で扱う
    const cols = MAP_I18N[k]; if (!cols) continue;
    const val = (k === 'name_kana') ? v : v?.ja;
    if (val === undefined) continue;                    // jaを書いていない項目は触らない
    for (const c of [].concat(cols)) set[c] = val ?? '';
  }
  for (const [k, v] of Object.entries(u.flat || {})) {
    const cols = MAP_FLAT[k]; if (!cols) continue;
    for (const c of [].concat(cols)) set[c] = v ?? '';
  }
  if (Object.keys(set).length) jobs.push({ name: u.name.replace(/[\s　]/g, ''), set });
}
fs.writeFileSync(process.argv[3], JSON.stringify(jobs, null, 1), 'utf8');
console.log(`ジョブ ${jobs.length}名 / 列 ${jobs.reduce((n, j) => n + Object.keys(j.set).length, 0)}箇所`);
console.log(jobs.map(j => `${j.name}(${Object.keys(j.set).join(',')})`).join('\n'));
