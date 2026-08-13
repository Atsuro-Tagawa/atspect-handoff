/* リサーチT 読み取り専用：あつぺくと作家ページの「欄」をライブから実測する。書き込みゼロ。
   使い方: node atspect.mjs <out.json> */
import { writeFileSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname } from "node:path";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9437;
const [, , outPath] = process.argv;
mkdirSync(dirname(outPath), { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const LANGS = ["ja", "en", "zh-cn", "zh-tw", "ko", "fr", "es", "de"];
const TARGETS = [
  { handle: "yamaguchi-takeo", note: "物故・標準型（代表作/収蔵先/団体あり）", langs: LANGS },
  { handle: "suzuki-chikako", note: "現存・唯一の登録作家（メッセージ/著書/代表作画像/チャンネルあり・代表作/収蔵先/団体は空）", langs: LANGS },
  { handle: "fukayama-ryudo", note: "代表作だけ空・収蔵先あり", langs: ["ja"] },
  { handle: "nishikawa-yasushi", note: "著書あり", langs: ["ja"] },
];
async function cdp(u) {
  const ws = new WebSocket(u); let id = 0; const w = new Map();
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && w.has(m.id)) { w.get(m.id)(m); w.delete(m.id); } };
  return { send: (m, p = {}) => new Promise((r) => { const i = ++id; w.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); setTimeout(() => { if (w.has(i)) { w.delete(i); r({}); } }, 40000); }), close: () => ws.close() };
}
const READ = `(() => {
  const clean = s => (s||'').replace(/\\s+/g,' ').trim();
  const vis = e => { if(!e) return false; const r=e.getBoundingClientRect(); const st=getComputedStyle(e); return !e.hidden && st.display!=='none' && st.visibility!=='hidden' && (r.width>0||r.height>0); };
  // 画面に出ている見出し・ラベルを、DOM順に
  const order = [];
  document.querySelectorAll('h1,h2,h3,dt,[data-aad-i18n]').forEach(e => {
    if (!vis(e)) return;
    const t = clean(e.textContent);
    if (!t || t.length > 60) return;
    order.push({ tag: e.tagName, i18nKey: e.getAttribute('data-aad-i18n') || null, text: t });
  });
  // dt/dd（プロフィール欄）
  const prof = [...document.querySelectorAll('.aad-prof dt')].filter(vis).map(dt => ({
    label: clean(dt.textContent),
    key: dt.nextElementSibling ? dt.nextElementSibling.getAttribute('data-aad-prof') : null,
    value: dt.nextElementSibling ? clean(dt.nextElementSibling.textContent).slice(0,300) : null
  }));
  // セクション見出し（data-aad-i18n の主要キー）
  const secKeys = {};
  document.querySelectorAll('[data-aad-i18n]').forEach(e => {
    const k = e.getAttribute('data-aad-i18n');
    if (!secKeys[k]) secKeys[k] = { text: clean(e.textContent), visible: vis(e) };
  });
  // 表示中の本文（言語切替の効きを見る）
  const bodyBlocks = [...document.querySelectorAll('[data-lang]')].map(e => ({
    lang: e.getAttribute('data-lang'), visible: vis(e), chars: clean(e.textContent).length, head: clean(e.textContent).slice(0,60)
  }));
  const t = document.body.innerText.replace(/\\n{3,}/g,'\\n\\n');
  return {
    title: document.title,
    h1: clean((document.querySelector('h1')||{}).textContent),
    order: order.slice(0,60),
    prof,
    secKeys,
    bodyBlocksVisible: bodyBlocks.filter(b=>b.visible),
    bodyBlocksCount: bodyBlocks.length,
    bodyChars: t.length,
    fullText: t.slice(0, 2600)
  };
})()`;
const chrome = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${process.env.TEMP}/.chrome-atspect`, "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars"]);
const rows = [];
try {
  await sleep(3500);
  const ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
  const c = await cdp(ver.webSocketDebuggerUrl);
  const { targetId } = (await c.send("Target.createTarget", { url: "about:blank" })).result;
  const t = await cdp(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
  await t.send("Page.enable"); await t.send("Runtime.enable");
  await t.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });
  for (const tg of TARGETS) {
    for (const lang of tg.langs) {
      const url = `https://atspect.com/pages/artist/${tg.handle}?lang=${lang}`;
      await t.send("Page.navigate", { url });
      await sleep(5200);
      await t.send("Runtime.evaluate", { expression: "window.scrollTo(0, document.body.scrollHeight)" });
      await sleep(1800);
      await t.send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
      await sleep(500);
      const r = await t.send("Runtime.evaluate", { expression: READ, returnByValue: true });
      const v = r.result?.result?.value ?? { error: true };
      rows.push({ handle: tg.handle, note: tg.note, lang, url, ...v });
      console.log(`${tg.handle} ${lang}: 欄=${(v.prof||[]).map(p=>p.label).join('/')} | 見出し=${(v.order||[]).filter(o=>o.tag!=='DT').map(o=>o.text).slice(0,12).join('/')}`);
    }
  }
  t.close(); c.close();
} finally { chrome.kill(); }
writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf8");
console.log("saved:", outPath, "rows:", rows.length);
