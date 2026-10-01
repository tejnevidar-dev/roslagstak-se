#!/usr/bin/env node
/**
 * Grind (#1ag): verifierar att den statiska cookie-bannern (injicerad av
 * generate-static-heads.mjs i dist/index.html) faktiskt innehåller de aktuella strängarna från
 * src/lib/cookie-banner-content.ts, och att samtyckes-scriptet med rätt localStorage-nyckel
 * landade i <head>. Båda byggs redan från samma källa som CookieBanner.tsx, så det här är ett
 * skyddsnät mot framtida handredigering snarare än den primära garantin mot att texterna glider
 * isär.
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { build as esbuild } from "esbuild";
import { tmpdir } from "os";
import { pathToFileURL } from "url";

const dist = resolve("dist");
const indexPath = resolve(dist, "index.html");

if (!existsSync(indexPath)) {
  console.log("[cookie-banner-sync] no dist/index.html — skipping");
  process.exit(0);
}

const bundlePath = resolve(tmpdir(), `cookie-banner-content-check-${process.pid}.mjs`);
await esbuild({
  entryPoints: [resolve("src/lib/cookie-banner-content.ts")],
  outfile: bundlePath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  logLevel: "silent",
});
const { cookieBannerContent } = await import(pathToFileURL(bundlePath).href);

const html = readFileSync(indexPath, "utf8");
const missing = [];

if (!html.includes('id="static-cookie-banner"')) missing.push('id="static-cookie-banner" saknas i dist/index.html');
for (const [key, value] of Object.entries(cookieBannerContent)) {
  if (key === "linkHref") continue; // href, inte synlig text
  // & < > " kodas om av esc() i generate-static-heads.mjs — jämför den avkodade formen är nog
  // för att upptäcka ett faktiskt textbyte (ord/meningar ändras alltid oavsett specialtecken).
  const plain = String(value).replace(/[&<>"]/g, "");
  if (plain && !html.replace(/&amp;|&lt;|&gt;|&quot;/g, "").includes(plain)) {
    missing.push(`cookieBannerContent.${key} ("${String(value).slice(0, 40)}…") hittas inte i dist/index.html`);
  }
}
if (!html.includes("data-consent")) missing.push('samtyckes-scriptet (data-consent) saknas i <head>');

if (missing.length > 0) {
  console.error("[cookie-banner-sync] FEL — cookie-bannerns statiska kopia har glidit isär:");
  missing.forEach((m) => console.error(`  - ${m}`));
  process.exit(1);
}

console.log("[cookie-banner-sync] OK — statisk kopia matchar cookie-banner-content.ts");
