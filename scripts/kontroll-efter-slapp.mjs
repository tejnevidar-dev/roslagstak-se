/**
 * Kontroll mot live efter morgonens släpp (slapp-2026-10-07.md): ja eller nej per punkt, resultatet skrivs i en fil.
 * Läser bara. Skickar inget formulär (formulär fylls aldrig i och ingen skicka-knapp trycks).
 * Körning: CHROME_PATH=... bun scripts/kontroll-efter-slapp.mjs [--base=https://roslagstak.se] [--ut=<fil>]
 */
import { writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const arg = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const base = arg("base", "https://roslagstak.se");
const ut = arg("ut", `../ledning/marknad/kontroll-efter-slapp-${new Date().toISOString().slice(0, 10)}.md`);

// De 26 ortssidor som hade ** i sina extra avsnitt före rättningen (bugg-fet-i-extrasektioner)
const FET_SIDOR = ["norrtalje", "vaxholm", "akersberga", "vallentuna", "taby", "ella-gard", "stockholm", "solna", "sundbyberg", "danderyd", "sollentuna", "lidingo", "nacka", "varmdo", "tyreso", "haninge", "ekero", "jarfalla", "huddinge", "sigtuna", "upplands-vasby", "nynashamn", "botkyrka", "salem", "sodertalje", "upplands-bro"].map((s) => `/taklaggare-${s}`);
// En sida per sidtyp med FAQ i statisk HTML
const FAQ_SIDOR = ["/", "/taklaggare-taby", "/taklaggare-grisslehamn", "/takrenovering-taby", "/betongpannor-taby", "/tjanster/tegeltak", "/tjanster/platarbeten", "/tjanster/eternit-asbest", "/taktyper", "/offert", "/hur-det-gar-till", "/brf", "/brf/norrtalje", "/rot-avdrag", "/priser", "/takkontroll", "/material/betongpannor"];
const TJANSTELISTA_SIDOR = ["/taklaggare-taby", "/taklaggare-grisslehamn", "/taklaggare-norrtalje", "/taklaggare-solna"];

const resultat = []; // { punkt, ok, detalj }
const punkt = (namn, ok, detalj = "") => { resultat.push({ namn, ok, detalj }); console.log(`${ok ? "JA " : "NEJ"}  ${namn}${detalj ? " — " + detalj : ""}`); };

const norm = (s) => (s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/<[^>]+>/g, " ").replace(/[\s ]+/g, " ").trim().toLowerCase();
const hamta = async (path) => { const r = await fetch(base + path, { redirect: "follow" }); return { status: r.status, html: await r.text() }; };
const synligStatisk = (html) => norm(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " "));
const faqNoder = (html) => {
  const qa = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); for (const o of Array.isArray(j) ? j : (j["@graph"] ?? [j])) if (o["@type"] === "FAQPage") for (const q of o.mainEntity ?? []) qa.push({ q: q.name, a: q.acceptedAnswer?.text ?? "" }); } catch {}
  }
  return qa;
};

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
const nyKontext = () => browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: "sv-SE" }).then(async (c) => { await c.addInitScript(() => { try { localStorage.setItem("rt_consent_v1", JSON.stringify({ analytics: false, marketing: false })); } catch {} }); return c; });
const renderad = async (ctx, path, vantaMs = 3500) => {
  const p = await ctx.newPage();
  await p.goto(base + path, { waitUntil: "load" });
  await p.waitForTimeout(vantaMs);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(100); }
  await p.waitForTimeout(500);
  return p;
};

const ctx = await nyKontext();

// 1. Knapparna "Boka (kostnadsfri) takkontroll" leder till /takkontroll
for (const path of ["/", "/blogg/mala-plattak-guide-pris", "/taktyper", "/taklaggare-taby", "/projekt/takbyte-singo", "/recensioner"]) {
  const p = await renderad(ctx, path);
  const lank = await p.evaluate(() => [...document.querySelectorAll("a")].filter((a) => /^\s*Boka (kostnadsfri )?takkontroll/i.test(a.textContent || "") && !a.closest("header,nav,footer")).map((a) => a.getAttribute("href")));
  const fel = lank.filter((h) => h !== "/takkontroll" && h !== "#forfragan");
  punkt(`Knapparna "Boka takkontroll" leder till /takkontroll: ${path}`, lank.length > 0 && fel.length === 0, `${lank.length} länkar${fel.length ? ", fel mål: " + [...new Set(fel)].join(", ") : ""}`);
  if (path === "/") {
    const sticky = await p.evaluate(() => [...document.querySelectorAll("div.fixed a")].filter((a) => /Boka takkontroll/.test(a.textContent || "")).map((a) => a.getAttribute("href")));
    punkt("Klisterraden på mobil: 'Boka takkontroll' leder till /takkontroll", sticky.length > 0 && sticky.every((h) => h === "/takkontroll"), sticky.join(", ") || "hittades inte");
  }
  await p.close();
}

// 2. Inga ** på ortssidorna (renderad sida och statisk HTML)
{
  const feta = [];
  for (const path of FET_SIDOR) {
    const { html } = await hamta(path);
    if (/\*\*\S/.test(synligStatisk(html).replace(/\*\*/g, "**"))) feta.push(path + " (statisk)");
  }
  const sidor = ["/taklaggare-taby", "/taklaggare-norrtalje", "/taklaggare-solna", "/taklaggare-nacka", "/taklaggare-sodertalje"];
  for (const path of sidor) {
    const p = await renderad(ctx, path);
    const finns = await p.evaluate(() => /\*\*\S/.test(document.body.innerText));
    if (finns) feta.push(path + " (renderad)");
    await p.close();
  }
  punkt(`Inga ** på ortssidorna (${FET_SIDOR.length} statiska, ${sidor.length} renderade)`, feta.length === 0, feta.join(", "));
}

// 3. Tjänstelistan utan Velux, takinspektion, underhåll och eternit
for (const path of TJANSTELISTA_SIDOR) {
  const p = await renderad(ctx, path);
  const text = await p.evaluate(() => document.body.innerText);
  const dalig = [];
  if (/Velux/i.test(text)) dalig.push("Velux");
  if (/Kostnadsfri takinspektion/i.test(text)) dalig.push("Kostnadsfri takinspektion");
  if (/Takrenovering och underhåll/i.test(text)) dalig.push("Takrenovering och underhåll");
  if (/Byta eternittak, med sanering/i.test(text)) dalig.push("raden om eternit");
  const ny = /Betongpannor, lertegel, TP20, pannplåt och dubbelfalsat plåttak/.test(text) && /Kostnadsfri takkontroll/.test(text);
  punkt(`Tjänstelistan på ${path}: ny lista, utan Velux/takinspektion/underhåll/eternit`, dalig.length === 0 && ny, dalig.length ? "kvar: " + dalig.join(", ") : ny ? "" : "nya listan hittades inte");
  await p.close();
}

// 4. Löftena om två minuter borta på /offert (renderad, båda flikarna, och statisk HTML)
{
  const p = await renderad(ctx, "/offert");
  let text = await p.evaluate(() => document.body.innerText);
  await p.getByRole("button", { name: /Kostnadsfri rådgivning/ }).click();
  await p.waitForTimeout(500);
  text += "\n" + (await p.evaluate(() => document.body.innerText));
  const { html } = await hamta("/offert");
  const alla = text + " " + synligStatisk(html);
  const dalig = [[/inom\s+2\s+min/i, "inom 2 minuter"], [/kostnadsförslag\s+(direkt\s+)?på\s+(mail|e-post)/i, "kostnadsförslag på mail"], [/prisförslag\s+direkt/i, "prisförslag direkt"]].filter(([re]) => re.test(alla)).map(([, n]) => n);
  punkt("Löftena om två minuter, kostnadsförslag på mail och prisförslag direkt borta på /offert", dalig.length === 0, dalig.join(", "));
  punkt("/offert: 'Vi svarar inom 24 timmar' finns", /Vi svarar inom 24 timmar/.test(text));
  await p.close();
}

// 5. FAQ-text och FAQPage i statisk HTML, en sida per sidtyp
for (const path of FAQ_SIDOR) {
  const { status, html } = await hamta(path);
  const qa = faqNoder(html);
  const text = synligStatisk(html);
  const saknas = qa.filter(({ q, a }) => { const n = norm(a); return !text.includes(norm(q)) || !(text.includes(n) || (text.includes(n.slice(0, 60)) && text.includes(n.slice(-40)))); });
  punkt(`FAQ i statisk HTML (text och FAQPage): ${path}`, status === 200 && qa.length >= 2 && saknas.length === 0, status !== 200 ? `status ${status}` : qa.length < 2 ? `FAQPage med ${qa.length} frågor` : saknas.length ? `${saknas.length} av ${qa.length} frågor/svar saknas i texten` : `${qa.length} frågor`);
}
{
  const { html } = await hamta("/rot-avdrag");
  punkt("/rot-avdrag: inget rått markdown-länkfel i statisk HTML", !/\]\(\//.test(html.replace(/<script[\s\S]*?<\/script>/g, "")));
}
for (const path of ["/brf/norrtalje", "/brf"]) {
  const { html } = await hamta(path);
  punkt(`BRF ${path}: inget 'skriftlig garanti' eller 'garantin står skriftligt'`, !/skriftlig garanti|garantin står skriftligt/i.test(synligStatisk(html)));
}

// 6. Ankaret landar vid formuläret (klick på länk till /takkontroll från en sida utan eget formulär)
for (const path of ["/taklaggare-taby", "/projekt/takbyte-singo", "/blogg/mala-plattak-guide-pris"]) {
  const p = await renderad(ctx, path);
  const l = p.locator('a[href="/takkontroll"]').first();
  try {
    await l.scrollIntoViewIfNeeded();
    await l.click({ timeout: 4000 });
    await p.waitForTimeout(2800);
    const r = await p.evaluate(() => ({ url: location.pathname + location.hash, topp: Math.round(document.querySelector("#forfragan")?.getBoundingClientRect().top ?? 9999) }));
    punkt(`Ankaret landar vid formuläret: från ${path}`, r.url === "/takkontroll#forfragan" && r.topp >= 0 && r.topp <= 250, `${r.url}, formulärets topp ${r.topp} px`);
  } catch (e) {
    punkt(`Ankaret landar vid formuläret: från ${path}`, false, String(e).slice(0, 100));
  }
  await p.close();
}

// 7. Den statiska länklistan (utan JavaScript): "Boka kostnadsfri takkontroll" leder till /takkontroll, inte /kontakt
for (const path of ["/", "/taklaggare-taby", "/takrenovering-taby", "/tjanster/tegeltak", "/blogg/mala-plattak-guide-pris", "/brf"]) {
  const { html } = await hamta(path);
  const mal = [...html.replace(/<script[\s\S]*?<\/script>/g, "").matchAll(/<a [^>]*href="([^"]+)"[^>]*>\s*Boka kostnadsfri takkontroll\s*<\/a>/g)].map((m) => m[1]);
  const fel = mal.filter((h) => h !== "/takkontroll");
  punkt(`Statiska länklistan: 'Boka kostnadsfri takkontroll' leder till /takkontroll: ${path}`, mal.length > 0 && fel.length === 0, `${mal.length} länkar${fel.length ? ", fel mål: " + [...new Set(fel)].join(", ") : ""}`);
}
{
  const { html } = await hamta("/taklaggare-taby");
  punkt("Statiska länklistan har länken 'Kontakt' till /kontakt", /<a href="\/kontakt">Kontakt<\/a>/.test(html));
}

await ctx.close();
await browser.close();
const nej = resultat.filter((r) => !r.ok);
const md = [`# Kontroll efter släpp, ${new Date().toISOString().slice(0, 16).replace("T", " ")} (${base})`, "", `**${resultat.length - nej.length} av ${resultat.length} punkter JA.${nej.length ? " " + nej.length + " NEJ." : ""}** Läser bara, skickar inget formulär.`, "", "| | Punkt | Detalj |", "|---|---|---|", ...resultat.map((r) => `| ${r.ok ? "JA" : "**NEJ**"} | ${r.namn} | ${r.detalj} |`)];
writeFileSync(ut, md.join("\n") + "\n");
console.log(`\n${resultat.length - nej.length}/${resultat.length} JA. Skrev ${ut}`);
