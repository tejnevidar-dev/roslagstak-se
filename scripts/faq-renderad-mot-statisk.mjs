/**
 * FAQ i React mot FAQ i den statiska HTML:en och i FAQPage-schemat (N4). För varje sida: öppnar varje fråga i den renderade
 * sidan (dragspelet), läser svaret, och jämför med (a) schemats frågor och svar och (b) den statiska sidans synliga text
 * (samma sida utan JavaScript). Ändrar ingenting.
 * Körning: CHROME_PATH=... bun scripts/faq-renderad-mot-statisk.mjs --base=https://roslagstak.se [--sidor=/a,/b] [--md=<fil>]
 */
import { writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const arg = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const base = arg("base") ?? "https://roslagstak.se";
const md = arg("md");

const SIDOR = (arg("sidor")?.split(",") ?? [
  "/", "/taklaggare-taby", "/taklaggare-grisslehamn", "/taklaggare-norrtalje", "/takrenovering-taby", "/betongpannor-taby", "/takbyte-taby",
  ...["eternit-asbest", "platarbeten", "takavvattning", "takinspektion", "takkupor", "takomlaggning", "takrenovering", "taksakerhet", "taktvatt", "takvard", "tegeltak"].map((s) => `/tjanster/${s}`),
  ...["betongpannor", "pannplat", "papptak", "tp20-plattak", "underlagstak"].map((s) => `/material/${s}`),
  "/takproblem/fukt-pa-vinden", "/takproblem/alger-och-svarta-rander", "/takproblem/dalig-underlagspapp",
  "/blogg/mala-plattak-guide-pris", "/blogg/kostnad-takbyte-2026", "/blogg/takkupa-vindskupa-guide",
  "/priser", "/takkontroll", "/takreparation", "/akut-lackage", "/rot-avdrag", "/hangrannor", "/platslagare", "/takbyte-var-2027",
  "/offert", "/offert/taby", "/brf", "/brf/norrtalje", "/omraden/kusten", "/taktyper", "/hur-det-gar-till", "/recensioner", "/kontakt", "/boka-takkontroll",
  "/projekt/takbyte-singo", "/tjanster/taktvatt", "/takproblem", "/material", "/projekt",
]).map((p) => (p.startsWith("/") ? p : "/" + p)).filter((p, i, a) => a.indexOf(p) === i);

const norm = (s) => (s || "").replace(/&amp;/g, "&").replace(/[\s ]+/g, " ").trim().toLowerCase();
const strip = (s) => norm(s.replace(/<[^>]+>/g, " "));

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
const mobil = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: "sv-SE" };

const mata = async (path) => {
  // Statisk
  const cs = await browser.newContext({ ...mobil, javaScriptEnabled: false });
  const ps = await cs.newPage();
  const resp = await ps.goto(base + path, { waitUntil: "load" });
  const statisk = await ps.evaluate(() => {
    const qa = [];
    for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const j = JSON.parse(s.textContent);
        for (const o of Array.isArray(j) ? j : (j["@graph"] ?? [j])) if (o["@type"] === "FAQPage") for (const q of o.mainEntity ?? []) qa.push({ q: q.name, a: q.acceptedAnswer?.text ?? "" });
      } catch {}
    }
    return { qa, text: document.body.innerText };
  });
  await cs.close();
  // Renderad
  const cr = await browser.newContext(mobil);
  await cr.addInitScript(() => { try { localStorage.setItem("rt_consent_v1", JSON.stringify({ analytics: false, marketing: false })); } catch {} });
  const pr = await cr.newPage();
  await pr.goto(base + path, { waitUntil: "load" });
  await pr.waitForTimeout(3500);
  const hojd = await pr.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < hojd; y += 700) { await pr.evaluate((v) => window.scrollTo(0, v), y); await pr.waitForTimeout(100); }
  await pr.waitForTimeout(600);
  const idn = await pr.evaluate(() =>
    [...document.querySelectorAll("button[aria-expanded][aria-controls]")]
      .filter((b) => !b.closest("header,nav,footer"))
      .map((b) => b.getAttribute("aria-controls")),
  );
  const renderad = [];
  for (const id of idn) {
    const r = await pr.evaluate(async (id) => {
      const b = document.querySelector(`button[aria-controls="${id}"]`);
      if (!b) return null;
      const q = (b.textContent || "").trim();
      if (b.getAttribute("aria-expanded") !== "true") b.click();
      await new Promise((ok) => setTimeout(ok, 250));
      const a = document.getElementById(id)?.textContent ?? "";
      return { q, a };
    }, id);
    if (r) renderad.push(r);
  }
  await cr.close();
  return { path, status: resp?.status() ?? 0, statisk, renderad };
};

const kö = [...SIDOR];
const res = [];
await Promise.all(Array.from({ length: 4 }, async () => { while (kö.length) { const p = kö.shift(); try { res[SIDOR.indexOf(p)] = await mata(p); } catch (e) { res[SIDOR.indexOf(p)] = { path: p, fel: String(e).slice(0, 100) }; } } }));
await browser.close();

const rader = ["| Sida | FAQ i React (frågor) | FAQPage-schema (frågor) | React-frågor synliga i statisk text | React-svar synliga i statisk text | Svar i schemat = svar i React | Läge |", "|---|---|---|---|---|---|---|"];
const bristande = [];
for (const r of res) {
  if (r.fel) { rader.push(`| ${r.path} | fel: ${r.fel} | | | | | |`); continue; }
  const stat = norm(r.statisk.text);
  const schemaQ = new Map(r.statisk.qa.map((x) => [norm(x.q), strip(x.a)]));
  let vq = 0, va = 0, lika = 0;
  for (const x of r.renderad) {
    const q = norm(x.q), a = norm(x.a);
    if (stat.includes(q)) vq++;
    if (a && (stat.includes(a) || (stat.includes(a.slice(0, 60)) && stat.includes(a.slice(-40))))) va++;
    const sa = schemaQ.get(q);
    if (sa && a && (sa === a || sa.replace(/[^\p{L}\p{N}]/gu, "") === a.replace(/[^\p{L}\p{N}]/gu, ""))) lika++;
  }
  const nR = r.renderad.length, nS = r.statisk.qa.length;
  let lage = "ok";
  if (nR === 0 && nS === 0) lage = "ingen FAQ";
  else if (nR > 0 && nS === 0) lage = "SCHEMA SAKNAS";
  else if (nR !== nS) lage = "ANTAL SKILJER";
  if (nR > 0 && va < nR) lage = (lage === "ok" ? "" : lage + "; ") + "SVAR SAKNAS I STATISK TEXT";
  if (nR > 0 && nS > 0 && lika < nR && lage === "ok") lage = "TEXT SKILJER";
  if (lage !== "ok" && lage !== "ingen FAQ") bristande.push(r.path);
  rader.push(`| ${r.path} | ${nR} | ${nS} | ${vq}/${nR} | ${va}/${nR} | ${nS ? lika + "/" + nR : "–"} | ${lage} |`);
}
const ut = [`# FAQ i React mot statisk HTML och FAQPage-schema, ${new Date().toISOString().slice(0, 10)}`, "", `Källa: ${base}. Frågorna i React hämtas genom att öppna varje fråga i dragspelet (sidhuvud, meny och sidfot undantagna). "Läge": ok = lika överallt; ingen FAQ = varken React eller schema har frågor.`, "", ...rader, "", `Sidor med brist (${bristande.length}): ${bristande.join(", ") || "inga"}`];
if (md) { writeFileSync(md, ut.join("\n")); console.log("Skrev", md); } else console.log(ut.join("\n"));
