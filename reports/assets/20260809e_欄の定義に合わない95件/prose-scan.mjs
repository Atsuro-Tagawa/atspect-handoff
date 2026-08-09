/**
 * ★「欄の定義に合わない」型の走査（2026-08-09 リサーチT第5便）
 *
 * 収蔵先・所属団体・代表作の3欄は「名詞の列挙」が定義。
 * そこに「文章・説明文」が入っているものを機械的に洗い出す。
 *
 * 判定の手がかり（どれか1つでも当たれば候補に挙げる）
 *   A 句点「。」を含む
 *   B 述語らしい語尾を含む（〜した／される／れている／である／あり／ない ほか）
 *   C 括弧の中が説明文になっている（年＋動詞、または20文字超）
 *   D 欄の意味に合わない語（個人蔵・所在不明・顕彰碑・なし・不明 ほか）
 *   E 1要素が極端に長い（区切り「、」「；」で割ったとき1片が40字超）
 */
import fs from 'fs';
const live = JSON.parse(fs.readFileSync('C:/Users/ataga/atspect-system/scratch/artist-sync/shopify_artists.json', 'utf8'));

const FIELDS = [
  { flat: 'collection_places', i18n: 'collection', label: '収蔵先' },
  { flat: 'groups', i18n: 'groups', label: '所属団体' },
  { flat: 'masterworks_text', i18n: 'masterworks', label: '代表作' },
];
const PRED = /(した|して|される|されて|されている|れている|している|である|であり|います|ました|残している|使われ|指定され|登録され|認定され|竣工|現存|建て替え|取り壊|所在|に基づ|とされる|によって|のため|ほか多数|など多数)/;
const BAD  = /(個人蔵|所在不明|不明|なし|該当なし|未確認|調査中|顕彰碑|記念碑|石碑|墓|生家)/;
const rows = [];
for (const a of live) {
  const f = a.fields || {};
  const name = String(f.name_ja || '').replace(/[\s　]/g, '');
  let o = {}; try { o = JSON.parse(f.artist_i18n || '{}'); } catch {}
  for (const F of FIELDS) {
    // 日本語の値（個別フィールド優先＝画面が出す側）
    let v = String(f[F.flat] ?? '').trim();
    if (!v) {
      const iv = o[F.i18n];
      if (Array.isArray(iv)) v = iv.map(x => (x && x.ja) || '').filter(Boolean).join('、');
      else v = String((iv && iv.ja) || '').trim();
    }
    if (!v) continue;
    const why = [];
    if (v.includes('。')) why.push('A句点');
    if (PRED.test(v)) why.push('B述語');
    const paren = [...v.matchAll(/[（(]([^）)]*)[）)]/g)].map(m => m[1]);
    if (paren.some(p => p.length > 20 || /(竣工|現存|登録|指定|設計|入社|所蔵)/.test(p))) why.push('C括弧が説明');
    if (BAD.test(v)) why.push('D欄に合わない語');
    const parts = v.split(/[、;；]/).map(s => s.trim()).filter(Boolean);
    if (parts.some(p => p.length > 40)) why.push('E1片が長い');
    if (!why.length) continue;
    rows.push({ name, handle: a.handle, field: F.label, key: F.flat, why: why.join('/'), len: v.length, v });
  }
}
const names = new Set(rows.map(r => r.name));
console.log(`候補＝${rows.length}件・${names.size}名`);
const per = {}; for (const r of rows) per[r.field] = (per[r.field] || 0) + 1;
console.log('欄別: ' + JSON.stringify(per));
const perW = {}; for (const r of rows) for (const w of r.why.split('/')) perW[w] = (perW[w] || 0) + 1;
console.log('手がかり別: ' + JSON.stringify(perW));
let m = `# 「欄の定義に合わない」候補＝${rows.length}件・${names.size}名（2026-08-09 実測）\n\n収蔵先・所属団体・代表作は「名詞の列挙」が定義。文章・説明文が入っているものを挙げた。\n\n`;
for (const r of rows) m += `## ${r.name} / ${r.field}（${r.key}）\`${r.handle}\`\n- 手がかり: ${r.why} ／ ${r.len}字\n- 中身: ${r.v}\n\n`;
fs.writeFileSync(process.argv[2], m, 'utf8');
fs.writeFileSync(process.argv[3], JSON.stringify(rows, null, 1), 'utf8');
