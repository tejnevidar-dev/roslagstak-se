/**
 * Skärmbild av ett element på en sida (lokalt verktyg för före/efter-bilder av designförslag).
 * Kör: bun scripts/screenshot.ts <url> <css-selektor eller text:Rubriktext> <utfil.png> [bredd] [ancestor-css-klass]
 * Utan klass tas närmaste omgivande <section>; med klass närmaste <div> vars class innehåller den.
 * Använder installerad Chrome via playwright-core, så ingen webbläsarpanel behövs.
 */
import { chromium } from "playwright-core";

const [url, target, out, widthArg, ancestorClass] = process.argv.slice(2);
if (!url || !target || !out) {
  console.error("Användning: bun scripts/screenshot.ts <url> <selektor|text:...> <utfil.png> [bredd]");
  process.exit(2);
}
const width = Number(widthArg ?? 1280);
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}#static-cookie-banner,[role=dialog],header{display:none!important}" });
const locator = target.startsWith("text:") ? page.getByText(target.slice(5), { exact: false }).first() : page.locator(target).first();
await locator.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const section = ancestorClass ? locator.locator(`xpath=ancestor::div[contains(@class,'${ancestorClass}')][1]`) : locator.locator("xpath=ancestor-or-self::section[1]");
const el = (await section.count()) ? section : locator;
await el.screenshot({ path: out });
await browser.close();
console.log("skrev", out);
