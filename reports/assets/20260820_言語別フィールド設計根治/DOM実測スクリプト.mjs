// 2026-08-20 根治便：実DOMでの検証（読み取り専用）
// 各作家×言語で (1)新版マーカー data-aad-ssr0 (2)prof欄の可視状態と表示文字 (3)著書flat欄 (4)一言/出身/肩書き (5)横溢れ を実測
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const TARGETS = ['nakahara-junichi','suzuki-chikako','fujishiro-norio','watanabe-genichi','tange-kenzo','shima-seien','nishikawa-yasushi'];
const LANGS = ['ja','en','de'];
const OUT = process.argv[2] || 'scratch/_dom-verify-konchi-20260820.json';
const kana = /[ぁ-ゟ゠-ヿ]/;
const cjk = /[一-鿿]/;
const browser = await chromium.launch();
const results = [];
for (const h of TARGETS) {
  for (const lang of LANGS) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const page = await ctx.newPage();
    let rec = { handle: h, lang };
    for (let attempt = 0; attempt < 4; attempt++) {
      await page.goto(`https://atspect.com/pages/artist/${h}?lang=${lang}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3500);
      rec = await page.evaluate((lang) => {
        const vis = (el) => !!el && el.offsetParent !== null && getComputedStyle(el).display !== 'none' && !el.hidden;
        const out = { lang, newVersion: !!document.querySelector('[data-aad-ssr0]'), prof: [], misc: {} };
        document.querySelectorAll('[data-aad-prof]').forEach((el) => {
          const dt = el.previousElementSibling;
          out.prof.push({ key: el.getAttribute('data-aad-prof'), visible: vis(el), dtVisible: vis(dt), text: (vis(el) ? el.textContent : '').slice(0, 120) });
        });
        const profSec = document.querySelector('dl.aad-prof');
        out.misc.profSectionVisible = profSec ? vis(profSec.closest('.aad-sec')) : null;
        const bh = document.querySelector('[data-aad-bh-flat]');
        out.misc.bhFlatVisible = bh ? vis(bh) : null;
        const st = document.querySelector('[data-aad-f="statement"]');
        out.misc.statement = st ? { visible: vis(st), text: st.textContent.slice(0, 80) } : null;
        const so = document.querySelector('[data-aad-stmt-orig]');
        out.misc.stmtOrig = so ? { visible: vis(so), text: so.textContent.slice(0, 60) } : null;
        const loc = document.querySelector('[data-aad-f="location"]');
        out.misc.location = loc ? { visible: vis(loc), text: loc.textContent } : null;
        const role = document.querySelector('.aad-rail__genre');
        out.misc.role = role ? { visible: vis(role), text: role.textContent } : null;
        out.misc.overflowOk = document.body.scrollWidth <= document.documentElement.clientWidth + 1;
        out.misc.dataLang = document.documentElement.getAttribute('data-lang');
        return out;
      }, lang);
      rec.handle = h;
      if (rec.newVersion) break;
      await page.waitForTimeout(20000); // 旧キャッシュ＝待って取り直す
    }
    // 日本語文字の判定（zhはかなのみ・他はかな+漢字）— 可視のprof/statement/location/roleに対して
    const isJa = (s) => lang.startsWith('zh') ? kana.test(s) : (kana.test(s) || cjk.test(s));
    if (lang !== 'ja') {
      rec.exposure = [];
      for (const p of rec.prof || []) if (p.visible && isJa(p.text)) rec.exposure.push('prof:' + p.key + '=' + p.text.slice(0, 40));
      const m = rec.misc || {};
      if (m.statement && m.statement.visible && isJa(m.statement.text)) rec.exposure.push('statement=' + m.statement.text.slice(0, 40));
      if (m.location && m.location.visible && isJa(m.location.text)) rec.exposure.push('location=' + m.location.text);
      if (m.role && m.role.visible && isJa(m.role.text)) rec.exposure.push('role=' + m.role.text);
      if (m.bhFlatVisible === true) rec.exposure.push('book_history_flat_visible');
    }
    results.push(rec);
    console.log(h, lang, 'newVer=' + rec.newVersion, 'exposure=' + JSON.stringify(rec.exposure || 'n/a(ja)'));
    await ctx.close();
  }
}
await browser.close();
writeFileSync(OUT, JSON.stringify(results, null, 1), 'utf8');
console.log('saved:', OUT);
