// index.html/contact.phpの残りB/C再判定によるFIX 16箇所を適用
import { readFileSync, writeFileSync } from 'fs';

const IDX = 'C:/Users/ataga/Desktop/コーポレートサイト制作/02_サイトデータ/index.html';
const CTP = 'C:/Users/ataga/Desktop/コーポレートサイト制作/02_サイトデータ/contact.php';

let idx = readFileSync(IDX, 'utf8');
const IDX_FIXES = [
  ['en 事業2 industry未来', 'we work to transform the future of everyone involved in the arts.', 'we work to transform the future of the entire art industry.'],
  ['en MESSAGE talented', 'and the talented artists who create them.', 'and the captivating artists who create them.'],
  ['fr MESSAGE talentueux+honneur', "j&rsquo;ai eu l&rsquo;honneur de rencontrer d&rsquo;innombrables œuvres remarquables et les artistes talentueux qui les créent.", "j&rsquo;ai eu l&rsquo;honneur de rencontrer d&rsquo;innombrables œuvres remarquables et les artistes captivants qui les créent."],
  ['fr MESSAGE fonder', "j&rsquo;ai eu l&rsquo;honneur de fonder ARTS&nbsp;RESPECT.", "j&rsquo;ai fondé ARTS&nbsp;RESPECT."],
  ['fr 取引銀行 Banque', '<span data-lang="fr">Banque partenaire</span>', '<span data-lang="fr">Banque</span>'],
  ['es 取引銀行 Banco', '<span data-lang="es">Banco asociado</span>', '<span data-lang="es">Banco</span>'],
  ['es 事業3 tangible', 'Preservamos la trayectoria de cada artista de forma tangible y contribuimos a la continuidad del valor cultural.', 'Preservamos la trayectoria de cada artista de forma fiable y contribuimos a la continuidad del valor cultural.'],
  ['es 事業4 justa', 'Apoyamos la distribución justa de las obras y nos esforzamos por crear un entorno donde las transacciones se realicen con tranquilidad.', 'Apoyamos la distribución adecuada de las obras y nos esforzamos por crear un entorno donde las transacciones se realicen con tranquilidad.'],
  ['cn 事業5 权利关系', '从活动支援到权利整理，提供全方位的支持服务。', '从活动支援到权利关系整理，提供全方位的支持服务。'],
  ['tw 事業5 權利關係', '從活動支援到權利整理，提供全方位的支持服務。', '從活動支援到權利關係整理，提供全方位的支持服務。'],
  ['cn GMO銀行名', '<span data-lang="cn">GMO青空网络银行</span>', '<span data-lang="cn">GMO Aozora Net Bank</span>'],
  ['tw GMO銀行名', '<span data-lang="tw">GMO青空網路銀行</span>', '<span data-lang="tw">GMO Aozora Net Bank</span>'],
];
for (const [name, b, a] of IDX_FIXES) {
  const n = idx.split(b).length - 1;
  if (n !== 1) throw new Error(`index.html anchor "${name}" not unique/found (n=${n})`);
  idx = idx.replace(b, a);
  console.log('index.html fixed:', name);
}
writeFileSync('index.new.html', idx, 'utf8');

let ctp = readFileSync(CTP, 'utf8');
const CTP_FIXES = [
  ['cn email 尽快削除', '我们已收到您的咨询，相关负责人将尽快与您联系。', '我们已收到您的咨询，相关负责人将与您联系。'],
  ['tw email 盡快削除', '我們已收到您的諮詢，相關負責人將盡快與您聯繫。', '我們已收到您的諮詢，相關負責人將與您聯繫。'],
];
for (const [name, b, a] of CTP_FIXES) {
  const n = ctp.split(b).length - 1;
  if (n !== 1) throw new Error(`contact.php anchor "${name}" not unique/found (n=${n})`);
  ctp = ctp.replace(b, a);
  console.log('contact.php fixed:', name);
}
writeFileSync('contact.new.php', ctp, 'utf8');
console.log('done. total fixes:', IDX_FIXES.length + CTP_FIXES.length);
