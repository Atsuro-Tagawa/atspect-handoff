// 日本語の非限定表現（等・その他・など・含む）の全数洗い出しと7言語での保持チェック
import { readFileSync } from 'fs';

const LANGS = ['ja','en','zh-cn','zh-tw','ko','fr','es','de'];
const U = {};
for (const l of LANGS) U[l] = JSON.parse(readFileSync(`com_${l}.json`, 'utf8')).slice(0, 73);

const JA_MARK = /等|その他|など|を含み|を含む|含みます/g;
const MARK = {
  en: /\b(other|others|etc\.?|including|includes|include|such as|among others|and so on)\b/gi,
  'zh-cn': /等|其他|其它|包括|包含/g,
  'zh-tw': /等|其他|其它|包括|包含/g,
  ko: /등|기타|포함/g,
  fr: /\b(autres?|etc\.?|notamment|y compris|inclu\w*|tel(le)?s? que|entre autres|toute autre)\b/gi,
  es: /\b(otros?|otras?|etc\.?|demás|inclui\w*|incluy\w*|entre otros|entre otras|tales como|cualquier otra?)\b/gi,
  de: /\b(sonstige\w*|andere\w*|weitere\w*|usw\.?|einschließlich|unter anderem|u\.\s?a\.|dergleichen|beispielsweise|z\.\s?B\.|etwa)\b/gi,
};

const secOf = i => { // ユニットindex→節ラベル
  let sec = '前文';
  for (let k = 0; k <= i; k++) if (U.ja[k].ctx === 'h2') sec = U.ja[k].num + '節';
  return sec;
};

for (let i = 0; i < 73; i++) {
  const ja = U.ja[i].text;
  const jaHits = ja.match(JA_MARK) || [];
  if (!jaHits.length) continue;
  const row = [];
  for (const l of LANGS.slice(1)) {
    const hits = (U[l][i].text.match(MARK[l]) || []).length;
    row.push(`${l}:${hits}`);
  }
  console.log(`[${String(i).padStart(2)}] ${secOf(i)} ja(${jaHits.join('/')})  ${row.join(' ')}`);
  console.log(`     ja: ${ja.replace(/\n/g,'⏎').slice(0,90)}`);
}
