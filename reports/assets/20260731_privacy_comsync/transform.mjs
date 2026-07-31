// privacy.html へ 8言語×3変更（きっかけli挿入・正文条項挿入・日付8/1）を適用した新版を生成
// 実ファイルへの反映は vault-file-update.mjs 経由（本スクリプトは scratchpad に出力するのみ）
import { readFileSync, writeFileSync } from 'fs';

const SRC = 'C:/Users/ataga/Desktop/コーポレートサイト制作/02_サイトデータ/privacy.html';
const OUT = 'privacy.new.html';
const lines = readFileSync(SRC, 'utf8').split('\n');

const KIKKAKE = {
  ja: '『あつぺくと』をお知りになったきっかけ',
  en: 'How you learned about "ATSPECT"',
  cn: '您得知「ATSPECT」的渠道',
  tw: '您得知「ATSPECT」的管道',
  ko: '「ATSPECT」를 알게 되신 경위',
  fr: 'comment vous avez connu «&nbsp;ATSPECT&nbsp;»',
  es: 'Cómo conoció «ATSPECT»',
  de: 'Wie Sie von „ATSPECT“ erfahren haben',
};
const SEIBUN = {
  ja: '本ポリシーは日本語を正文とします。外国語版を提供する場合、外国語版は参考訳であり、日本語版と相違がある場合は日本語版が優先します。',
  en: 'The Japanese text of this Policy is authoritative. Where versions in other languages are provided, they are reference translations; in case of any discrepancy, the Japanese version prevails.',
  cn: '本政策以日语版本为正本。如提供其他语言版本，均为参考译文；如有不一致，以日语版本为准。',
  tw: '本政策以日語版本為正本。如提供其他語言版本，均為參考譯文；如有不一致，以日語版本為準。',
  ko: '본 방침은 일본어를 정본으로 합니다. 다른 언어판을 제공하는 경우 이는 참고 번역이며, 일본어판과 차이가 있는 경우 일본어판이 우선합니다.',
  fr: "La version japonaise de la présente politique fait foi. Les versions dans d'autres langues, lorsqu'elles sont proposées, sont des traductions de référence&nbsp;; en cas de divergence, la version japonaise prévaut.",
  es: 'La versión japonesa de esta política es la auténtica. Las versiones en otros idiomas, cuando se ofrezcan, son traducciones de referencia; en caso de discrepancia, prevalece la versión japonesa.',
  de: 'Maßgeblich ist die japanische Fassung dieser Erklärung. Werden Fassungen in anderen Sprachen bereitgestellt, dienen sie als Referenzübersetzungen; bei Abweichungen hat die japanische Fassung Vorrang.',
};
const NEWDATE = {
  ja: '制定日：2026年8月1日　／　最終改定日：2026年8月1日',
  en: 'Effective date: August 1, 2026　／　Last updated: August 1, 2026',
  cn: '制定日期：2026年8月1日　／　最终修订日期：2026年8月1日',
  tw: '制定日期：2026年8月1日　／　最終修訂日期：2026年8月1日',
  ko: '제정일: 2026년 8월 1일　／　최종 개정일: 2026년 8월 1일',
  fr: "Date d'entrée en vigueur&nbsp;: 1er août 2026　／　Dernière mise à jour&nbsp;: 1er août 2026",
  es: 'Fecha de entrada en vigor: 1 de agosto de 2026　／　Última actualización: 1 de agosto de 2026',
  de: 'Inkrafttreten: 1. August 2026　／　Letzte Aktualisierung: 1. August 2026',
};
const OLDDATE = {
  ja: '制定日：2026年6月30日　／　最終改定日：2026年7月29日',
  en: 'Effective date: June 30, 2026　／　Last updated: July 29, 2026',
  cn: '制定日期：2026年6月30日　／　最终修订日期：2026年7月29日',
  tw: '制定日期：2026年6月30日　／　最終修訂日期：2026年7月29日',
  ko: '제정일: 2026년 6월 30일　／　최종 개정일: 2026년 7월 29일',
  fr: "Date d'entrée en vigueur&nbsp;: 30 juin 2026　／　Dernière mise à jour&nbsp;: 29 juillet 2026",
  es: 'Fecha de entrada en vigor: 30 de junio de 2026　／　Última actualización: 29 de julio de 2026',
  de: 'Inkrafttreten: 30. Juni 2026　／　Letzte Aktualisierung: 29. Juli 2026',
};
// 挿入・置換位置（1始まり行番号・編集前の privacy.html 基準）
const LI_BEFORE = { ja: 468, en: 604, cn: 740, tw: 876, ko: 1012, fr: 1148, es: 1284, de: 1420 };
const DATE_LINE = { ja: 555, en: 691, cn: 827, tw: 963, ko: 1099, fr: 1235, es: 1371, de: 1507 };
const LI_ANCHOR = {
  ja: 'ご登録（審査通過）後に取得する情報',
  en: 'Information acquired after registration',
  cn: '注册（审核通过）后所取得的信息',
  tw: '登錄（通過審查）後取得的資訊',
  ko: '등록(심사 통과) 후에 취득하는 정보',
  fr: "informations collectées après l'inscription",
  es: 'Información que se recopila tras el registro',
  de: 'Nach der Registrierung (nach bestandener Prüfung)',
};

// 下から上へ処理して行番号ずれを回避
const ops = [];
for (const l of Object.keys(LI_BEFORE)) ops.push({ line: LI_BEFORE[l], type: 'li', lang: l });
for (const l of Object.keys(DATE_LINE)) ops.push({ line: DATE_LINE[l], type: 'date', lang: l });
ops.sort((a, b) => b.line - a.line);

for (const op of ops) {
  const idx = op.line - 1;
  const cur = lines[idx];
  if (op.type === 'li') {
    if (!cur.includes(LI_ANCHOR[op.lang])) throw new Error(`anchor mismatch li ${op.lang} at ${op.line}: ${cur.slice(0, 60)}`);
    lines.splice(idx, 0, `        <li>${KIKKAKE[op.lang]}</li>`);
  } else {
    if (!cur.includes(OLDDATE[op.lang])) throw new Error(`anchor mismatch date ${op.lang} at ${op.line}: ${cur.slice(0, 80)}`);
    lines.splice(idx, 1,
      '    <div class="pp-section">',
      `      <p>${SEIBUN[op.lang]}</p>`,
      '    </div>',
      '',
      `    <p class="pp-date">${NEWDATE[op.lang]}</p>`
    );
  }
}

writeFileSync(OUT, lines.join('\n'), 'utf8');
console.log('written', OUT, 'lines:', lines.length);
