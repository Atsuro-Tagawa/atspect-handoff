/**
 * ★ライブ（Shopify）の全625名 × 8言語 を走査して、序列を感じさせる語の残存を出す。
 *
 *   node scripts/artist-csv-sync.mjs pull            # 先に現状を落とす（読み取りのみ）
 *   node rank-words-scan-live.mjs <shopify_artists.json> <出力.md> [<対象作家名をカンマ区切り>]
 *
 * ★なぜ要るか＝CSV正本には日本語しか無い。8言語の本文は artist_i18n にしか無いため、
 *   CSVだけを走査すると en/zh/ko/fr/es/de に残った序列語を一件も検出できない。
 *   （2026-08-01、この穴でバッチ1が「是正済み」と誤判定されていた）
 */
import fs from 'fs';

// ─────────── 言語ごとの序列表現 ───────────
// ★日本語から訳す方向だけでは、その言語で自然に使われる言い方を取りこぼす。
//   各言語の側からも洗い出して足すこと（Codexに言語ごと1観点で当てる）。
const RANK = {
  ja: ['第一人者','代表する','代表的','中心的人物','中心人物','中心となった','重鎮','先駆的','先駆者','先駆','先がけ','さきがけ','先達','確立者','主導し','を主導','主導的','指導的','牽引','牽引者','けん引','草分け','旗手','旗頭','立役者','立て役者','泰斗','大御所','巨頭','巨匠','大家','随一','屈指','最高峰','第一級','第一線','最前線','一流','権威','双璧','正統','本流','頂点','名家','重要人物','重要作家','導いた','導き','中心的存在','切り開いた','切り拓いた','礎を築','基礎を築','育ての親','中核'],
  en: ['leading','foremost','pioneer','pioneering','led the','spearhead','headed','central figure','major figure','important figure','key figure','representative of','master of','preeminent','prominent','the first to','forefront','vanguard','trailblaz','doyen','luminary','towering','guided the','paved the way','laid the foundation','father of','driving force','key role in leading'],
  zh_cn: ['代表','主导','先驱','引领','中心人物','重要人物','巨匠','泰斗','重镇','首屈一指','开拓者','前沿','领军','领袖','翘楚','权威','第一人','奠基人','鼻祖','大师','开创','引导','开辟','奠定了基础','核心人物'],
  zh_tw: ['代表','主導','先驅','引領','中心人物','重要人物','巨匠','泰斗','重鎮','首屈一指','開拓者','前沿','領軍','領袖','翹楚','權威','第一人','奠基人','鼻祖','大師','開創','引導','開闢','奠定了基礎','核心人物'],
  ko: ['대표하는','대표적','주도','선구','선구자','선구적','견인','중심인물','중요 인물','거장','일인자','이끈','이끌었','최전선','선두','권위자','대가','태두','개척자','이끌','개척','기틀을 마련','핵심 인물','길을 열'],
  fr: ['figure de proue','pionnier','pionnière','chef de file','mena','dirigea','figure centrale','figure importante','figure majeure','représentatif','maître de','à l\'avant-garde','fer de lance','sommité','éminent','guida','ouvrit la voie','posa les bases','figure clé','père de'],
  es: ['pionero','pionera','figura central','figura destacada','figura clave','lideró','dirigió','encabezó','representativo','maestro de','a la vanguardia','referente','eminente','máximo exponente','guió','abrió el camino','sentó las bases','figura clave','padre de'],
  de: ['führend','Wegbereiter','Pionier','führte an','anführte','zentrale Figur','bedeutende Persönlichkeit','Meister der','an der Spitze','Vorreiter','Koryphäe','maßgeblich','herausragend','ebnete den Weg','legte den Grundstein','Schlüsselfigur','Vater der','leitete'],
};
// A判定＝誰かがそう呼んだ事実の記述。これを含む文は残す（誤検出を減らすため文単位で除外）
const QUOTED = {
  ja: ['と呼ばれた','とも呼ばれた','と称された','とも称された','と評された','の異名'],
  en: ['was called','was known as','was dubbed','was nicknamed','was hailed as'],
  zh_cn: ['被称为','被誉为','人称'], zh_tw: ['被稱為','被譽為','人稱'],
  ko: ['라고 불렸','불렸다','일컬어'],
  fr: ['était surnommé','fut surnommé','on l\'appelait','était appelé'],
  es: ['fue apodado','era llamado','fue llamado','se le llamó'],
  de: ['wurde genannt','nannte man','wurde bezeichnet'],
};
// C判定＝美術史の用語。出典確認を別途行うため、この走査では別枠で出す
const HIST = { ja: ['の祖','三筆','明治三筆','能書','創始'] };


// ★ラテン文字の言語は「語の途中の一致」を拾ってしまう（es: distinguió/consiguió に guió が含まれる、
//   de: begleitete に leitete が含まれる 等）。語境界つきで判定する。
//   CJK・ハングルは語境界の概念が無いので素の包含。ただし既知の誤検出は EXCLUDE で除く。
const LATIN = new Set(['en', 'fr', 'es', 'de']);
const EXCLUDE = {
  zh_cn: { '代表': ['代表作'] }, zh_tw: { '代表': ['代表作'] },
};
function esc(x) { return x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function hasWord(s, w, lang) {
  if (LATIN.has(lang)) {
    const re = new RegExp('(^|[^\p{L}\p{M}])' + esc(w) + '($|[^\p{L}\p{M}])', 'iu');
    return re.test(s);
  }
  if (!s.includes(w)) return false;
  const ex = EXCLUDE[lang]?.[w];
  if (ex) { let t = s; for (const e of ex) t = t.split(e).join(''); if (!t.includes(w)) return false; }
  return true;
}

// ─── Codexが各言語側から洗い出した追加語を実行時に取り込む ───
// ★ハードコードせずファイルから読むことで、語を足すたびにスクリプトを書き換えずに済む。
//   `risky`（他の語の一部として頻出する短い語）は既定では取り込まない。--risky を付けたときだけ。
const ADD_PATH = 'C:/Users/ataga/atspect-handoff/reports/assets/artist-audit/rank-words-additions.json';
let added = { rank: 0, quoted: 0, risky: 0 };
try {
  let at = fs.readFileSync(ADD_PATH, 'utf8');
  if (at.charCodeAt(0) === 0xFEFF) at = at.slice(1);
  const A = JSON.parse(at);
  const useRisky = process.argv.includes('--risky');
  // ★★Codexの追加語（rank）は既定では取り込まない。--codex を付けたときだけ。
  //   理由＝2026-08-01の実測で、序列とは無関係の業務動詞が多数混ざっていた：
  //     es `representa`(158)/`representó`(46)＝「表す・描く」／`dominó`(62)`domina`(19)＝「技法を修めた」
  //     fr `dirigea`(26)`dirige`(29)`anima`(29)＝「工房を運営した」／`maître`(55)＝「親方」（職名）
  //     de `Meister`(136)＝「親方」（職名）／fr `le premier`(28)`la première`(19)＝事実としての最初
  //   これらを外すと**事実の記述まで消える**。採否を1語ずつ人が決めてから本採用すること。
  if (process.argv.includes('--codex')) for (const [lang, ws] of Object.entries(A.rank || {})) {
    RANK[lang] = [...new Set([...(RANK[lang] || []), ...ws])]; added.rank += ws.length;
  }
  for (const [lang, ws] of Object.entries(A.quoted || {})) {
    QUOTED[lang] = [...new Set([...(QUOTED[lang] || []), ...ws])]; added.quoted += ws.length;
  }
  if (useRisky) for (const [lang, ws] of Object.entries(A.risky || {})) {
    RANK[lang] = [...new Set([...(RANK[lang] || []), ...ws])]; added.risky += ws.length;
  }
  console.log(`[追加語] rank=${added.rank} quoted=${added.quoted}${useRisky ? ` risky=${added.risky}(取込)` : ' risky=未取込（--riskyで取込）'} ← ${ADD_PATH}`);
} catch (e) { console.log(`[追加語] 読み込みなし（${e.code || e.message}）`); }

const FIELDS = ['statement', 'bio', 'viewpoint', 'role'];
const LANGS = ['ja', 'en', 'zh_cn', 'zh_tw', 'ko', 'fr', 'es', 'de'];

const live = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const only = process.argv[4] ? process.argv[4].split(',').map(s => s.replace(/[\s　]/g, '')) : null;

// 文に分割して、A判定（引用形）を含む文は除外する
function sentences(text, lang) {
  const sep = /[。！？]|(?<=[.!?])\s+/;
  return String(text).split(sep).filter(Boolean);
}
const hits = [], hist = [];
let scanned = 0;
for (const a of live) {
  const name = a.fields?.name_ja || a.name_ja || '';
  if (only && !only.includes(name.replace(/[\s　]/g, ''))) continue;
  let o; try { o = JSON.parse(a.fields?.artist_i18n || '{}'); } catch { continue; }
  scanned++;
  for (const f of FIELDS) {
    const obj = o[f]; if (!obj || typeof obj !== 'object') continue;
    for (const lang of LANGS) {
      const v = obj[lang]; if (!v || typeof v !== 'string') continue;
      for (const s of sentences(v, lang)) {
        const quoted = (QUOTED[lang] || []).some(q => s.includes(q));
        for (const w of (RANK[lang] || [])) {
          if (!hasWord(s, w, lang)) continue;
          hits.push({ name, handle: a.handle, field: f, lang, word: w, quoted, s: s.trim().slice(0, 120) });
        }
        if (lang === 'ja') for (const w of HIST.ja) if (s.includes(w)) hist.push({ name, field: f, word: w, s: s.trim().slice(0, 120) });
      }
    }
  }
}
const live_ = hits.filter(h => !h.quoted);
const byArtist = new Map();
for (const h of live_) { if (!byArtist.has(h.name)) byArtist.set(h.name, []); byArtist.get(h.name).push(h); }

let m = `# ライブ8言語の序列語 残存走査\n\n走査対象＝${scanned}名 × 4欄（statement/bio/viewpoint/role）× 8言語\n\n`;
m += `**B判定（外す）の残存＝${live_.length}件／${byArtist.size}名**（A判定の引用形を含む文は除外済み＝${hits.length - live_.length}件）\n\n`;
const perLang = {}; for (const h of live_) perLang[h.lang] = (perLang[h.lang] || 0) + 1;
m += `言語別：` + LANGS.map(l => `${l}=${perLang[l] || 0}`).join(' / ') + `\n\n`;
const perWord = {}; for (const h of live_) perWord[`${h.lang}:${h.word}`] = (perWord[`${h.lang}:${h.word}`] || 0) + 1;
m += `語別（多い順）：` + Object.entries(perWord).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => `${k}(${v})`).join(' / ') + `\n\n`;
m += `## 作家別\n\n`;
for (const [name, list] of [...byArtist.entries()].sort((a, b) => b[1].length - a[1].length)) {
  m += `### ${name}（${list.length}件）\n\n`;
  for (const h of list) m += `- \`${h.lang}\` **${h.field}** / ${h.word} … ${h.s.replace(/\|/g, '/')}\n`;
  m += '\n';
}
m += `\n---\n\n## C判定（美術史の用語・出典確認が要る／このリストは外す対象ではない）＝${hist.length}件\n\n`;
for (const h of hist) m += `- ${h.name} **${h.field}** / ${h.word} … ${h.s.replace(/\|/g, '/')}\n`;
fs.writeFileSync(process.argv[3], m, 'utf8');
console.log(`走査=${scanned}名 / B残存=${live_.length}件・${byArtist.size}名 / 引用形で除外=${hits.length - live_.length}件 / C=${hist.length}件`);
console.log('言語別: ' + LANGS.map(l => `${l}=${perLang[l] || 0}`).join(' '));
console.log('作家: ' + [...byArtist.keys()].join(','));
