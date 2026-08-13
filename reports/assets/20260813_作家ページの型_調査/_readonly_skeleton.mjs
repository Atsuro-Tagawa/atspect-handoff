/* リサーチT 読み取り専用：作家プロフィール頁の「欄の並び」を実測して骨格をJSONに落とす。
   ★ページを開いて読むだけ。書き込みはゼロ。
   使い方: node skeleton.mjs <urls.json> <out.json> */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9433;
const [, , urlsPath, outPath] = process.argv;
if (!urlsPath || !outPath) { console.error("usage: <urls.json> <out.json>"); process.exit(1); }
mkdirSync(dirname(outPath), { recursive: true });
const TARGETS = JSON.parse(readFileSync(urlsPath, "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdp(u) {
  const ws = new WebSocket(u); let id = 0; const w = new Map();
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && w.has(m.id)) { w.get(m.id)(m); w.delete(m.id); } };
  return {
    send: (m, p = {}) => new Promise((r) => {
      const i = ++id; w.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p }));
      setTimeout(() => { if (w.has(i)) { w.delete(i); r({}); } }, 45000);
    }),
    close: () => ws.close()
  };
}

const READ = `(() => {
  const clean = s => (s||'').replace(/\\s+/g,' ').trim();
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,dt')]
    .map(e => ({ tag: e.tagName, text: clean(e.textContent) }))
    .filter(h => h.text && h.text.length <= 120);
  const body = document.body.innerText.replace(/\\n{3,}/g,'\\n\\n');
  // 各見出しから次の見出しまでの文字数＝その欄の分量
  const withLen = [];
  let cursor = 0;
  for (let i = 0; i < heads.length; i++) {
    const idx = body.indexOf(heads[i].text, cursor);
    if (idx < 0) { withLen.push({ ...heads[i], chars: null }); continue; }
    let next = -1;
    for (let j = i + 1; j < heads.length; j++) {
      const n = body.indexOf(heads[j].text, idx + heads[i].text.length);
      if (n >= 0) { next = n; break; }
    }
    withLen.push({ ...heads[i], chars: (next < 0 ? body.length : next) - (idx + heads[i].text.length) });
    cursor = idx + heads[i].text.length;
  }
  const KW = ['Awards','Award','Prizes','Prize','Honors','Honours','Collections','Public Collections','Selected Exhibitions','Exhibitions','Biography','Bio','Born','born','died','Died','d.','Price','price','Inquire','Enquire','Represented','Selected','CV','Curriculum','Press','Publications','Works','Related','Education','Nationality','Lives and works','Estate','Nachlass'];
  const kw = {};
  KW.forEach(k => { const n = body.split(k).length - 1; if (n) kw[k] = n; });
  const dl = [...document.querySelectorAll('dt')].map(dt => ({
    dt: clean(dt.textContent),
    dd: dt.nextElementSibling ? clean(dt.nextElementSibling.textContent).slice(0,200) : null
  })).slice(0,40);
  return {
    title: document.title,
    h1: clean((document.querySelector('h1')||{}).textContent),
    bodyChars: body.length,
    heads: withLen.slice(0,80),
    dl,
    kw,
    head1200: body.slice(0, 1200)
  };
})()`;

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${process.env.TEMP}/.chrome-skeleton`,
  "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars",
  "--lang=en-US"
]);
const rows = [];
try {
  await sleep(3500);
  const ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
  const c = await cdp(ver.webSocketDebuggerUrl);
  const { targetId } = (await c.send("Target.createTarget", { url: "about:blank" })).result;
  const t = await cdp(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
  await t.send("Page.enable"); await t.send("Runtime.enable"); await t.send("Network.enable");
  await t.send("Network.setExtraHTTPHeaders", { headers: { "Accept-Language": "en-US,en;q=0.9" } });
  await t.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });
  for (const item of TARGETS) {
    await t.send("Page.navigate", { url: item.url });
    await sleep(item.wait || 7000);
    // 下までスクロールして遅延読み込みを起こす
    await t.send("Runtime.evaluate", { expression: "window.scrollTo(0, document.body.scrollHeight)" });
    await sleep(2500);
    await t.send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
    await sleep(600);
    const r = await t.send("Runtime.evaluate", { expression: READ, returnByValue: true });
    const v = r.result?.result?.value ?? { error: true };
    const cur = await t.send("Runtime.evaluate", { expression: "location.href", returnByValue: true });
    rows.push({ ...item, finalUrl: cur.result?.result?.value ?? null, ...v });
    console.log(`[${rows.length}/${TARGETS.length}] ${item.label} :: ${v.title ?? "ERR"} :: heads=${v.heads?.length ?? 0} chars=${v.bodyChars ?? 0}`);
  }
  t.close(); c.close();
} finally { chrome.kill(); }
writeFileSync(outPath, JSON.stringify(rows, null, 2), "utf8");
console.log("saved:", outPath, "rows:", rows.length);
