/**
 * Text som bara finns efter att sidan har laddat (N2, Marknadschefen 2026-10-06). Jämför det en besökare ser (renderad sida i
 * huvudlös Chrome, med JavaScript) mot den statiska HTML:en (samma sida i Chrome UTAN JavaScript, alltså det sökmotorer
 * och kontrollerna ser). Listar varje textblock som bara finns i den renderade sidan, med gissad källfil och rad.
 *
 * Körning (rapport mot live):  CHROME_PATH=... bun scripts/text-bara-i-react.mjs --base=https://roslagstak.se --md=<fil>
 * Byggkontroll (varnar, fäller aldrig): bun scripts/text-bara-i-react.mjs --varna   (kör mot dist via en liten lokal server;
 * hoppar över om ingen Chrome hittas, t.ex. i CI och på Cloudflare; SKIP_REACT_TEXT_CHECK=1 stänger av)
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const args = process.argv.slice(2);
const arg = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const varna = args.includes("--varna");
const mdFil = arg("md");
let base = arg("base");

const ALLA_SIDOR = [
  ["startsida", "/"],
  ["ortssida (ö)", "/taklaggare-grisslehamn"],
  ["ortssida (tätort)", "/taklaggare-taby"],
  ["kommunsida", "/taklaggare-norrtalje"],
  ["tjänst × ort", "/takrenovering-taby"],
  ["material × ort", "/betongpannor-taby"],
  ["tjänstesida", "/tjanster/takomlaggning"],
  ["materialsida", "/material/betongpannor"],
  ["takproblem", "/takproblem/fukt-pa-vinden"],
  ["guide", "/blogg/mala-plattak-guide-pris"],
  ["projekt", "/projekt/takbyte-singo"],
  ["priser", "/priser"],
  ["takkontroll", "/takkontroll"],
  ["offert (konfigurator)", "/offert"],
  ["offert (annonssida)", "/offert/taby"],
  ["BRF", "/brf"],
  ["BRF × ort", "/brf/norrtalje"],
  ["region", "/omraden/kusten"],
  ["taktyper", "/taktyper"],
];

const SIDOR = arg("sidor") ? arg("sidor").split(",").map((p) => ["vald", p]) : ALLA_SIDOR;

const hittaChrome = () => {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  for (const p of ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]) if (existsSync(p)) return p;
  return null;
};

if (varna) {
  // Varnar aldrig fällande: oväntade fel och hängning ska inte stoppa ett bygge
  process.on("uncaughtException", (e) => { console.log("[text-bara-i-react] hoppar över efter fel:", String(e).slice(0, 120)); process.exit(0); });
  setTimeout(() => { console.log("[text-bara-i-react] hoppar över: tog för lång tid"); process.exit(0); }, 240000).unref();
}
if (process.env.SKIP_REACT_TEXT_CHECK === "1" || process.env.CI || process.env.CF_PAGES) {
  console.log("[text-bara-i-react] avstängd (SKIP_REACT_TEXT_CHECK=1)");
  process.exit(0);
}
const chrome = hittaChrome();
if (!chrome) {
  console.log("[text-bara-i-react] hoppar över: ingen Chrome hittades (normalt i CI och på Cloudflare)");
  process.exit(0);
}
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.log("[text-bara-i-react] hoppar över: playwright-core saknas");
  process.exit(0);
}

// Lokal server över dist (samma adresstolkning som Cloudflare Pages: /x -> x.html, /x/ -> x/index.html)
let server;
if (!base) {
  const dist = resolve("dist");
  if (!existsSync(join(dist, "index.html"))) {
    console.log("[text-bara-i-react] hoppar över: dist saknas");
    process.exit(0);
  }
  const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".mp4": "video/mp4", ".xml": "application/xml", ".txt": "text/plain" };
  server = createServer((req, res) => {
    const p = decodeURIComponent((req.url ?? "/").split("?")[0].split("#")[0]);
    const kandidater = [join(dist, p), join(dist, p + ".html"), join(dist, p, "index.html")];
    const fil = kandidater.find((f) => f.startsWith(dist) && existsSync(f) && statSync(f).isFile());
    if (!fil) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "content-type": MIME[extname(fil)] ?? "application/octet-stream" });
    res.end(readFileSync(fil));
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  base = `http://127.0.0.1:${server.address().port}`;
}

const BLOCK = "p,li,h1,h2,h3,h4,h5,h6,td,th,dd,dt,figcaption,blockquote,label,summary,button,a";
const BLOCK_UTAN_A = "p,li,h1,h2,h3,h4,h5,h6,td,th,dd,dt,figcaption,blockquote,label,summary,button";
const extrahera = ({ BLOCK, BLOCK_UTAN_A }) => {
  const ut = [];
  for (const e of document.querySelectorAll(BLOCK)) {
    if (e.closest("header,nav,footer,#static-cookie-banner,[role=dialog],[data-radix-toast-viewport],noscript,script,style,[aria-hidden='true'] svg")) continue;
    if (e.tagName === "A" && e.parentElement?.closest(BLOCK_UTAN_A)) continue;
    const t = (e.textContent || "").replace(/[\s\u00a0]+/g, " ").trim();
    if (t.length < 3) continue;
    // Länk, knapp eller listpunkt som bara är en länk räknas som navigering, resten som text
    const norm1 = (x) => (x || "").replace(/[\s ]+/g, " ").trim();
    const bara = e.tagName === "LI" && e.children.length === 1 && e.children[0].tagName === "A" && norm1(e.children[0].textContent) === t;
    const nav = ["A", "BUTTON", "LABEL", "SUMMARY"].includes(e.tagName) || bara;
    ut.push({ t, nav });
  }
  return ut;
};

const norm = (s) => s.toLowerCase().replace(/[\s\u00a0]+/g, " ").replace(/[“”„]/g, '"').replace(/[‘’]/g, "'").trim();

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const mobil = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, locale: "sv-SE" };

const mata = async ([typ, path]) => {
  // Statisk: utan JavaScript
  const ctxS = await browser.newContext({ ...mobil, javaScriptEnabled: false });
  const pS = await ctxS.newPage();
  const resp = await pS.goto(base + path, { waitUntil: "load" });
  const status = resp?.status() ?? 0;
  const statisk = status === 200 ? (await pS.evaluate(extrahera, { BLOCK, BLOCK_UTAN_A })).map((x) => x.t) : [];
  await ctxS.close();
  // Renderad: med JavaScript, samtycke på förhand (kakrutan påverkar inte texten), rulla igenom sidan
  const ctxR = await browser.newContext({ ...mobil });
  await ctxR.addInitScript(() => { try { localStorage.setItem("rt_consent_v1", JSON.stringify({ analytics: false, marketing: false })); } catch {} });
  const pR = await ctxR.newPage();
  await pR.goto(base + path, { waitUntil: "load" });
  await pR.waitForTimeout(3500);
  const hojd = await pR.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < hojd; y += 700) { await pR.evaluate((v) => window.scrollTo(0, v), y); await pR.waitForTimeout(120); }
  await pR.waitForTimeout(800);
  const renderad = await pR.evaluate(extrahera, { BLOCK, BLOCK_UTAN_A });
  await ctxR.close();
  return { typ, path, status, statisk, renderad };
};

// Några sidor i taget
const resultat = [];
const kö = [...SIDOR];
await Promise.all(Array.from({ length: 4 }, async () => { while (kö.length) { const s = kö.shift(); resultat[SIDOR.indexOf(s)] = await mata(s); } }));
await browser.close();
server?.close();

// Källplats: sök i src efter texten (första/sista delen), normaliserat radvis
const kallor = [];
const gaIgenom = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!/seo-regler|node_modules|test|overrides/.test(f)) gaIgenom(p); }
    else if (/\.(tsx?|json)$/.test(f) && !/\.d\.ts$/.test(f)) kallor.push([p, readFileSync(p, "utf8").split("\n").map(norm)]);
  }
};
if (existsSync("src")) gaIgenom("src");
const hittaKalla = (text) => {
  const t = norm(text);
  const bitar = [t.slice(0, 30), t.slice(-30), t.slice(Math.max(0, Math.floor(t.length / 2) - 15), Math.floor(t.length / 2) + 15)].filter((b) => b.length >= 12);
  for (const bit of bitar) for (const [fil, rader] of kallor) { const i = rader.findIndex((r) => r.includes(bit)); if (i >= 0) return `${fil.replace(/\\/g, "/")}:${i + 1}`; }
  return null;
};

const rapport = resultat.map((r) => {
  const sj = r.statisk.map(norm);
  const set = new Set(sj);
  const joined = sj.join(" | ");
  const sett = new Set();
  const bara = [];
  let navBara = 0;
  for (const { t, nav } of r.renderad) {
    const n = norm(t);
    if (sett.has(n)) continue;
    sett.add(n);
    if (set.has(n) || (n.length >= 25 && joined.includes(n))) continue;
    if (nav) { navBara++; continue; }
    bara.push({ text: t, kalla: hittaKalla(t) });
  }
  return { ...r, bara, navBara, antalRenderade: sett.size };
});

const BASLINJE = "scripts/text-bara-i-react-baslinje.json";
const hash = (t) => createHash("sha1").update(norm(t)).digest("hex").slice(0, 10);

if (args.includes("--spara-baslinje")) {
  const b = {};
  for (const r of rapport) if (r.status === 200) b[r.path] = r.bara.map((x) => hash(x.text)).sort();
  writeFileSync(BASLINJE, JSON.stringify(b, null, 0) + "\n");
  console.log(`[text-bara-i-react] baslinje sparad: ${Object.values(b).reduce((s, x) => s + x.length, 0)} textblock på ${Object.keys(b).length} sidor`);
  process.exit(0);
}

if (varna) {
  // Varnar bara för text som är NY i förhållande till baslinjen (det som redan fanns bara i React när baslinjen togs varnar vi inte för varje bygge)
  const baslinje = existsSync(BASLINJE) ? JSON.parse(readFileSync(BASLINJE, "utf8")) : null;
  if (!baslinje) { console.log("[text-bara-i-react] ingen baslinje (kör --spara-baslinje), hoppar över"); process.exit(0); }
  let totalt = 0;
  for (const r of rapport) {
    if (r.status !== 200) { console.log(`[text-bara-i-react] VARNING ${r.path}: statisk sida hittades inte (status ${r.status})`); continue; }
    const kand = new Set(baslinje[r.path] ?? []);
    const nya = r.bara.filter((x) => !kand.has(hash(x.text)));
    if (!nya.length) continue;
    totalt += nya.length;
    console.log(`[text-bara-i-react] VARNING ${r.path} (${r.typ}): ${nya.length} nya textblock finns bara efter att sidan har laddat, t.ex. "${nya[0].text.slice(0, 90)}" (${nya[0].kalla ?? "källa ej funnen"})`);
  }
  console.log(totalt ? `[text-bara-i-react] ${totalt} nya textblock som bara finns i React (varnar, fäller inte). Lägg dem i prerender-content.ts eller kör --spara-baslinje om det är avsiktligt.` : `[text-bara-i-react] OK: ingen ny text bara i React på ${rapport.length} kontrollerade sidor`);
  process.exit(0);
}

const rader = [`# Text som bara finns efter att sidan har laddat, ${new Date().toISOString().slice(0, 10)}`, "", `Källa: ${base}. Mätt i huvudlös Chrome, mobil (390 px). **Statisk** = samma sida med JavaScript avstängt (det sökmotorer och våra kontroller ser). **Renderad** = med JavaScript, efter att sidan rullats igenom. Listan är textblock (stycke, listpunkt, rubrik, tabellcell, knapp, länk) som finns i den renderade sidan men inte i den statiska. Ändrar ingenting. Källan är en gissning (första träff i src på en bit av texten); "–" betyder att texten byggs ur data eller mallar utan sammanhängande träff.`, "", "| Sida | Typ | Block (renderade) | Text bara i React | Länkar/knappar bara i React |", "|---|---|---|---|---|"];
for (const r of rapport) rader.push(`| ${r.path} | ${r.typ} | ${r.antalRenderade} | **${r.bara.length}**${r.status !== 200 ? " (statisk sida saknas: " + r.status + ")" : ""} | ${r.navBara} |`);
rader.push("");
for (const r of rapport) {
  if (!r.bara.length) continue;
  rader.push(`## ${r.path} (${r.typ}): ${r.bara.length}`, "");
  for (const b of r.bara) rader.push(`- ${b.text.length > 220 ? b.text.slice(0, 220) + "…" : b.text} — \`${b.kalla ?? "–"}\``);
  rader.push("");
}
if (mdFil) { writeFileSync(mdFil, rader.join("\n")); console.log("Skrev", mdFil); } else console.log(rader.join("\n"));
