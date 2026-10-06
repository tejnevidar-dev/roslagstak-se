/**
 * Mobila skärmbilder av sajten som en besökare ser den (Marknadschefens beställning 2026-10-06): första skärmen (390×844) och
 * hela sidan, i huvudlös Chrome, utan att godkänna kakor och utan att skicka något formulär. Kakrutan och laddningsskärmen
 * syns alltså som de gör för en förstagångsbesökare.
 * Körning: CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe" bun scripts/mobil-skarmbilder.mjs [--base=https://roslagstak.se] [--ut=<mapp>]
 */
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("--base="))?.slice(7) ?? "https://roslagstak.se";
const ut = args.find((a) => a.startsWith("--ut="))?.slice(5) ?? "../ledning/marknad/mobil-skarmbilder-2026-10-06";
if (!existsSync(ut)) mkdirSync(ut, { recursive: true });

const SIDOR = [
  ["startsidan", "/"],
  ["takkontroll", "/takkontroll"],
  ["offert-taby", "/offert/taby"],
  ["taklaggare-taby", "/taklaggare-taby"],
  ["takbyte-taby", "/takbyte-taby"],
  ["projekt-takbyte-grisslehamn", "/projekt/takbyte-grisslehamn"],
  ["projekt-takbyte-singo", "/projekt/takbyte-singo"],
  ["projekt-takrenovering-blido", "/projekt/takrenovering-blido"],
  ["blogg-mala-plattak-guide-pris", "/blogg/mala-plattak-guide-pris"],
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
const rapport = [];
for (const [namn, path] of SIDOR) {
  // Ny kontext per sida: tom lagring, så att kakrutan och laddningsskärmen visas som för en förstagångsbesökare.
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
    locale: "sv-SE",
  });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "load" });
  // Startsidan visar en laddningsskärm (1,6 s + 0,9 s toning) första besöket: ta en bild av den också.
  if (path === "/") {
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${ut}/${namn}-laddningsskarm.png` });
    await page.waitForTimeout(3600);
  } else {
    await page.waitForTimeout(3500);
  }
  await page.screenshot({ path: `${ut}/${namn}-forsta-skarmen.png` });

  // Rulla igenom sidan så att sektioner som monteras vid ledig stund, lata bilder och rull-animationer hinner komma fram
  const hojd = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < hojd; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const mat = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bredare = [...document.querySelectorAll("body *")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return r.width > 0 && r.right > vw + 2 && cs.position !== "fixed" && !e.closest("[aria-hidden='true']");
      })
      .slice(0, 5)
      .map((e) => e.tagName.toLowerCase() + "." + String(e.className).slice(0, 40) + " (" + Math.round(e.getBoundingClientRect().right) + " px)");
    const form = document.querySelector("form");
    const knapp = [...document.querySelectorAll("a,button")].find((e) => /boka|ring|begär|skicka/i.test(e.textContent ?? ""));
    return {
      scrollbredd: document.documentElement.scrollWidth,
      vw,
      hojd: document.documentElement.scrollHeight,
      bredare,
      formularY: form ? Math.round(form.getBoundingClientRect().top + window.scrollY) : null,
      forstaKnappY: knapp ? Math.round(knapp.getBoundingClientRect().top + window.scrollY) : null,
      kakruta: !!document.querySelector("#static-cookie-banner, [role=dialog]"),
    };
  });
  // Helsidesbilden tas med content-visibility avstängt (annars målas sektionerna utanför skärmen inte i en helsidesbild).
  // Det är bara bildtagningen som ändras: en besökare som rullar ser sektionerna rendera som vanligt.
  await page.addStyleTag({ content: ".cv-auto,.cv-auto-sm{content-visibility:visible !important}" });
  await page.waitForTimeout(600);
  // Chromium tar helsidesbilder över ca 16 000 bildpunkter i flera rutor och upprepar då fasta element (sidhuvud, kakruta) och ibland
  // sidans topp. Därför delas helsidan i delbilder om högst 5 000 CSS-pixlar, som läses uppifrån och ned.
  const fullHojd = await page.evaluate(() => document.documentElement.scrollHeight);
  const DEL = 5000;
  const antal = Math.ceil(fullHojd / DEL);
  for (let d = 0; d < antal; d++) {
    const y = d * DEL;
    await page.screenshot({
      path: `${ut}/${namn}-helsida-del-${d + 1}-av-${antal}.png`,
      fullPage: true,
      clip: { x: 0, y, width: 390, height: Math.min(DEL, fullHojd - y) },
    });
  }
  rapport.push({ namn, path, ...mat });
  console.log(JSON.stringify({ namn, ...mat }));
  await ctx.close();
}
await browser.close();
