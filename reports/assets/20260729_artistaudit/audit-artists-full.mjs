// 作家個人ページ610名 全数点検（読み取りのみ）
// ①日本語ページのHTTPステータス（ライブ実測）
// ②Shopify公開状態（ACTIVE/DRAFT。artist-csv-sync.mjs pull 済みの shopify_artists.json を使用・読み取りのみ）
// ③本文・画像の完全性（同じpullデータのフィールドから判定。理由＝略歴(bio_ja)はサーバー描画で
//   HTMLに直接出力されるが、功績(viewpoint)・代表作(masterworks)はJS描画でサーバーHTMLには出ず、
//   curlでは検出できないと判明。よって元データ（artist_i18n JSON・各flatフィールド）を正とする。
//
// 実行: node audit-artists-full.mjs [startIndex] [endIndex]

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'C:/Users/ataga/atspect-handoff/reports/assets/20260729_artistaudit';
const ARTISTS_JSON = join(OUT_DIR, 'artists.json');
const SHOPIFY_PULL = 'C:/Users/ataga/atspect-system/scratch/artist-sync/shopify_artists.json';
const OUT_CSV = join(OUT_DIR, 'audit-full.csv');

const CONCURRENCY = 6;

function viewpointJa(i18n) {
  if (!i18n) return '';
  try {
    const obj = JSON.parse(i18n);
    return (obj.viewpoint && obj.viewpoint.ja) ? obj.viewpoint.ja.trim() : '';
  } catch { return '__PARSE_ERROR__'; }
}

function masterworksEmpty(i18n) {
  if (!i18n) return true;
  try {
    const obj = JSON.parse(i18n);
    const mw = obj.masterworks;
    if (Array.isArray(mw)) return mw.length === 0;
    if (mw && typeof mw === 'object') return !mw.ja || !mw.ja.trim();
    return true;
  } catch { return true; }
}

function hasAnyImage(f) {
  return !!(f.portrait || f.hero_image || f.masterpiece_1_image || f.masterpiece_2_image);
}

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status >= 300 && res.status < 400) {
      return `${res.status}->${res.headers.get('location') || '?'}`;
    }
    return res.status;
  } catch (e) {
    return `ERROR:${String(e.message || e)}`;
  }
}

async function runBatch(items) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fetchStatus(items[i].url);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

async function main() {
  const artistsRaw = JSON.parse(readFileSync(ARTISTS_JSON, 'utf8')).artists;
  const shopify = JSON.parse(readFileSync(SHOPIFY_PULL, 'utf8'));
  const shopifyByHandle = new Map(shopify.map(a => [a.handle, a]));

  const artists = artistsRaw.map(a => {
    const handle = a.u.split('/').pop();
    return { handle, name: a.n, url: `https://atspect.com${a.u}` };
  });

  const startArg = process.argv[2] ? parseInt(process.argv[2], 10) : 0;
  const endArg = process.argv[3] ? parseInt(process.argv[3], 10) : artists.length;
  const slice = artists.slice(startArg, endArg);

  console.log(`[開始] ${startArg}〜${endArg}（${slice.length}件）/ 全体${artists.length}件`);

  const statuses = await runBatch(slice);

  const rows = slice.map((a, i) => {
    const sh = shopifyByHandle.get(a.handle);
    const f = sh ? sh.fields : {};
    const bioLen = (f.bio_ja || '').length;
    const vp = viewpointJa(f.artist_i18n);
    const vpEmpty = vp === '' || vp === '__PARSE_ERROR__';
    const mwEmpty = masterworksEmpty(f.artist_i18n);
    const imgPresent = hasAnyImage(f);
    return {
      handle: a.handle, name: a.name, url: a.url,
      httpStatus: statuses[i],
      shopifyStatus: sh ? sh.status : '(突合失敗)',
      bioLen,
      viewpointEmpty: vpEmpty,
      viewpointParseError: vp === '__PARSE_ERROR__',
      masterworksEmpty: mwEmpty,
      imagePresent: imgPresent,
      imagePermission: f.image_permission || '',
      deathYear: f.death_year || '',
    };
  });

  mkdirSync(OUT_DIR, { recursive: true });
  const header = 'handle,name,url,httpStatus,shopifyStatus,bioLen,viewpointEmpty,viewpointParseError,masterworksEmpty,imagePresent,imagePermission,deathYear\n';
  const csvBody = rows.map(r => [
    r.handle, `"${r.name}"`, r.url, r.httpStatus, r.shopifyStatus,
    r.bioLen, r.viewpointEmpty, r.viewpointParseError, r.masterworksEmpty, r.imagePresent,
    r.imagePermission, `"${r.deathYear}"`,
  ].join(',')).join('\n');

  if (existsSync(OUT_CSV) && startArg > 0) {
    writeFileSync(OUT_CSV, csvBody + '\n', { flag: 'a' });
  } else {
    writeFileSync(OUT_CSV, header + csvBody + '\n');
  }

  const non200 = rows.filter(r => r.httpStatus !== 200);
  const bioEmpty = rows.filter(r => r.bioLen === 0);
  const vpEmptyRows = rows.filter(r => r.viewpointEmpty && r.deathYear !== ''); // 存命(deathYear空)は仕様上除外して報告
  const mwEmptyRows = rows.filter(r => r.masterworksEmpty && r.deathYear !== '');
  console.log(`[完了] ${slice.length}件処理`);
  console.log(`  200以外=${non200.length}件`, non200.map(r => `${r.handle}:${r.httpStatus}`).join(', '));
  console.log(`  bio空=${bioEmpty.length}件`, bioEmpty.map(r => r.handle).join(', '));
  console.log(`  功績空(物故者のみ)=${vpEmptyRows.length}件`, vpEmptyRows.map(r => r.handle).join(', '));
  console.log(`  代表作空(物故者のみ)=${mwEmptyRows.length}件`, mwEmptyRows.map(r => r.handle).join(', '));
}

main();
