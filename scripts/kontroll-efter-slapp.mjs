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

// 8. Ingen rå markdown ([text](länk) eller **fet**) i statisk HTML eller FAQPage-schema (W1: "[prissidan](/priser)" på ortssidorna)
for (const path of ["/taklaggare-taby", "/taklaggare-norrtalje", "/taklaggare-upplands-bro", "/taklaggare-grisslehamn", "/", "/priser", "/tjanster/taktvatt", "/material/betongpannor", "/taktyper"]) {
  const { html } = await hamta(path);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(" ");
  const rå = [synligStatisk(html), ld].some((x) => /\[[^\]\n]{1,200}\]\((?:\/|https?:|#)[^)\s]*\)|\*\*[^*\n]{1,200}\*\*/.test(x));
  punkt(`Ingen rå markdown i statisk HTML eller schema: ${path}`, !rå);
}
for (const path of ["/taklaggare-taby", "/taklaggare-norrtalje", "/taklaggare-upplands-bro"]) {
  const { html } = await hamta(path);
  punkt(`FAQ-svaret om riktpriser är ren text med länk till /priser: ${path}`, /riktpriser per material finns på prissidan\./.test(synligStatisk(html)) && /<a href="\/priser"/.test(html));
}

// 9. Startsidans titel och beskrivning (förslag B): statisk HTML och efter att React har kört, och ingen annan sida ärver den
{
  const TITEL = "Takläggare Roslagen – takbyte i Norrtälje, fast pris";
  const BESKR = "Takfirma med bas i Norrtälje. Takbyte och takomläggning i Roslagen och Storstockholm. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.";
  const { html } = await hamta("/");
  punkt("Startsidan: titeln i statisk HTML är den nya", html.includes(`<title>${TITEL}</title>`));
  punkt("Startsidan: beskrivningen i statisk HTML är den nya", html.includes(`<meta name="description" content="${BESKR}"`));
  const p = await renderad(ctx, "/");
  const r = await p.evaluate(() => ({ titel: document.title, beskr: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "" }));
  punkt("Startsidan: titeln efter att React har kört är den nya", r.titel === TITEL, r.titel);
  punkt("Startsidan: beskrivningen efter att React har kört är den nya", r.beskr === BESKR, r.beskr.slice(0, 80));
  /* og- och twitter-taggarna: ALLA taggar med samma namn ska ha den godkända lydelsen, i statisk HTML och efter att React har kört (även efter 6 sekunder) */
  const sociala = [["property", "og:title", TITEL], ["property", "og:description", BESKR], ["name", "twitter:title", TITEL], ["name", "twitter:description", BESKR]];
  const statiska = (h, attr, namn) => [...h.matchAll(new RegExp(`<meta ${attr}="${namn}" content="([^"]*)"`, "g"))].map((m) => m[1]);
  for (const [attr, namn, vantat] of sociala) {
    const s = statiska(html, attr, namn);
    punkt(`Startsidan: ${namn} i statisk HTML är den godkända lydelsen`, s.length > 0 && s.every((v) => v === vantat), `${s.length} tagg(ar)`);
  }
  await p.waitForTimeout(6000);
  for (const [attr, namn, vantat] of sociala) {
    const v = await p.evaluate(([a, n]) => [...document.querySelectorAll(`meta[${a}="${n}"]`)].map((m) => m.getAttribute("content")), [attr, namn]);
    punkt(`Startsidan: ${namn} efter React och 6 sekunder är den godkända lydelsen i alla taggar`, v.length > 0 && v.every((x) => x === vantat), `${v.length} tagg(ar)${v.some((x) => x !== vantat) ? ", avviker: " + v.filter((x) => x !== vantat)[0]?.slice(0, 60) : ""}`);
  }
  await p.close();
  for (const path of ["/taklaggare-taby", "/priser", "/offert", "/takkontroll", "/hur-det-gar-till", "/omraden/nordvastra-stockholm"]) {
    const { html: h } = await hamta(path);
    punkt(`Annan sida ärver inte startsidans titel: ${path}`, !h.includes(`<title>${TITEL}</title>`));
  }
}

// 10. Inga fyllda stjärnikoner (lucide-star med fill-) i den renderade sidan
for (const path of ["/", "/taklaggare-taby", "/takrenovering-taby", "/offert", "/hur-det-gar-till", "/recensioner"]) {
  const p = await renderad(ctx, path);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
  await p.waitForTimeout(500);
  const n = await p.evaluate(() => [...document.querySelectorAll("svg.lucide-star")].filter((s) => /fill-/.test(s.getAttribute("class") || "")).length);
  punkt(`0 fyllda stjärnor (lucide-star med fill-): ${path}`, n === 0, `${n} st`);
  await p.close();
}

// 11. 404-sidan har egna og- och twitter-taggar och ärver inte startsidans (Z1)
{
  const { html } = await hamta("/404.html");
  const tagg = (attr, namn) => [...html.matchAll(new RegExp(`<meta ${attr}="${namn}" content="([^"]*)"`, "g"))].map((m) => m[1]);
  for (const [attr, namn, vantat] of [["property", "og:title", "Sidan finns inte | RoslagsTak"], ["name", "twitter:title", "Sidan finns inte | RoslagsTak"]]) {
    const v = tagg(attr, namn);
    punkt(`404-sidan: ${namn} är egen`, v.length === 1 && v[0] === vantat, v.join(" / ").slice(0, 70));
  }
  for (const [attr, namn] of [["property", "og:description"], ["name", "twitter:description"]]) {
    const v = tagg(attr, namn);
    punkt(`404-sidan: ${namn} ärver inte startsidans`, v.length === 1 && !/takbyte och takomläggning i roslagen/i.test(v[0]), v.join(" / ").slice(0, 70));
  }
  punkt("404-sidan: ingen og:url som pekar på startsidan", !/property="og:url" content="https:\/\/roslagstak\.se\/"/.test(html));
}

// 13. AA3: ortssidornas avsnitt "Varför välja RoslagsTak …" och "Om <ort> …" finns i statisk HTML och är lika efter React
for (const [path, rubrik] of [["/taklaggare-taby", "Varför välja RoslagsTak som takläggare Täby?"], ["/taklaggare-grisslehamn", "Varför välja RoslagsTak som takläggare Grisslehamn?"], ["/taklaggare-norrtalje", "Varför välja RoslagsTak som takläggare Norrtälje?"]]) {
  const { html } = await hamta(path);
  const stat = synligStatisk(html);
  punkt(`Statisk HTML har avsnittet "${rubrik}": ${path}`, stat.includes(rubrik.toLowerCase()) && stat.includes("vi arbetar enligt ama."));
  const p = await renderad(ctx, path);
  const r = await p.evaluate(() => [...document.querySelectorAll("h3")].map((h) => h.textContent.trim()).filter((t) => /^Varför välja RoslagsTak som|^Om .+ och takläggning i /.test(t)));
  punkt(`Renderad sida har samma två rubriker som den statiska: ${path}`, r.length === 2 && r.every((t) => stat.includes(t.toLowerCase())), r.join(" | ").slice(0, 100));
  await p.close();
}

// 12. Y3: meningen om riktpriser med länkar till ägarsidornas prisavsnitt finns i statisk HTML i de 15 guiderna
{
  const GUIDER = ["basta-takmaterial-skargarden", "betongpannor-eller-lertegel", "byta-till-plattak-forandra-look", "hur-lange-haller-tak", "kostnad-takbyte-2026", "lagga-om-tak-vad-kostar-det", "mala-plattak-guide-pris", "plattak-vs-betongpannor", "platttak-ljud-regn-skargardshus", "skota-taket-betongpannor-tegel-plat", "ta-bort-mossa-fran-tak", "takbyte-ljustero-guide-pris", "takbyte-skargarden-logistik", "takrenovering-sommarstuga-roslagen", "tp20-eller-dubbelfalsat-platttak"];
  const saknas = [];
  for (const g of GUIDER) {
    const { html } = await hamta(`/blogg/${g}`);
    if (!/Riktpriser efter ROT-avdrag finns på prissidan:/.test(html.replace(/<[^>]+>/g, " ")) || !/href="\/(?:tjanster\/tegeltak|material\/betongpannor|material\/tp20-plattak)#pris"/.test(html)) saknas.push(g);
  }
  punkt("Prisordsmeningen med länkar till prisavsnitten finns i alla 15 guider (statisk HTML)", saknas.length === 0, saknas.length ? "saknas: " + saknas.join(", ") : "15 av 15");
}

// 14. AB5: "i generationer" är borta på /taktyper (statisk HTML och efter React), lertegelraden har den nya lydelsen
{
  const { html } = await hamta("/taktyper");
  const stat = synligStatisk(html);
  punkt("/taktyper: statisk HTML utan 'i generationer' och med den nya lertegelraden", !stat.includes("i generationer") && stat.includes("lertegel är det klassiska tegeltaket: pannor av bränd lera."));
  const p = await renderad(ctx, "/taktyper");
  const text = (await p.evaluate(() => document.body.innerText)).toLowerCase();
  punkt("/taktyper: renderad sida utan 'i generationer' och med den nya lertegelraden", !text.includes("i generationer") && text.includes("lertegel är det klassiska tegeltaket: pannor av bränd lera."));
  await p.close();
}

// 21. AF1/paket 12: de rättade lydelserna är borta (statisk HTML och startsidan efter React)
{
  const GAMLA = ["skjuter fram ett takbyte", "räkna fram ett prisspann", "tätt inklätt i plåt", "takvård och plåtarbeten", "material ej angivet", "upp till 50 000 kr"];
  const SIDOR = ["/", "/taklaggare-karlslund", "/taklaggare-arholma", "/takbyte-var-2027"];
  for (const path of SIDOR) {
    const { html } = await hamta(path);
    const stat = synligStatisk(html);
    const kvar = GAMLA.filter((g) => stat.includes(g));
    punkt(`Rättade lydelser borta i statisk HTML: ${path}`, kvar.length === 0, kvar.join(" | "));
  }
  const p = await renderad(ctx, "/");
  // Långsamt, så att de uppskjutna sektionerna (DeferMount) hinner monteras
  for (let y = 0; y < 9000; y += 400) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(250); }
  const text = (await p.evaluate(() => document.body.innerText)).toLowerCase();
  const kvarR = GAMLA.filter((g) => text.includes(g));
  punkt("Rättade lydelser borta på startsidan efter React", kvarR.length === 0, kvarR.join(" | "));
  punkt("Startsidans nya kort: taktvätt och takkupor har sidornas egna beskrivningar", text.includes("taktvätt: vi börjar med en kostnadsfri takkontroll") && text.includes("takkupor och takfönster: vi börjar med en kostnadsfri takkontroll"));
  await p.close();
}

// 13b. Regionsmeningen på ortssidorna: "i Roslagen" bara för regioner i Roslagen, regionens egen stavning i rubriken (statisk HTML och efter React)
for (const [path, mening, rubrik, inte] of [
  ["/taklaggare-bromma", "bromma tillhör västerort.", "om bromma och takläggning i västerort", "tillhör västerort i roslagen"],
  ["/taklaggare-solna", "solna tillhör norra stockholm.", "om solna och takläggning i norra stockholm", "tillhör norra stockholm i roslagen"],
  ["/taklaggare-blido", "blidö tillhör mellersta skärgården i roslagen.", "om blidö och takläggning i mellersta skärgården", "tillhör mellersta skärgården i roslagen i roslagen"],
  ["/taklaggare-hallstavik", "hallstavik tillhör norra roslagen.", "om hallstavik och takläggning i norra roslagen", "norra roslagen i roslagen"],
]) {
  const { html } = await hamta(path);
  const stat = synligStatisk(html);
  punkt(`Regionsmeningen i statisk HTML: ${path}`, stat.includes(mening) && stat.includes(rubrik) && !stat.includes(inte));
  const p = await renderad(ctx, path);
  const text = (await p.evaluate(() => document.body.innerText)).toLowerCase();
  punkt(`Regionsmeningen efter React: ${path}`, text.includes(mening) && text.includes(rubrik) && !text.includes(inte));
  await p.close();
}

await ctx.close();
await browser.close();
const nej = resultat.filter((r) => !r.ok);
const md = [`# Kontroll efter släpp, ${new Date().toISOString().slice(0, 16).replace("T", " ")} (${base})`, "", `**${resultat.length - nej.length} av ${resultat.length} punkter JA.${nej.length ? " " + nej.length + " NEJ." : ""}** Läser bara, skickar inget formulär.`, "", "| | Punkt | Detalj |", "|---|---|---|", ...resultat.map((r) => `| ${r.ok ? "JA" : "**NEJ**"} | ${r.namn} | ${r.detalj} |`)];
writeFileSync(ut, md.join("\n") + "\n");
console.log(`\n${resultat.length - nej.length}/${resultat.length} JA. Skrev ${ut}`);
