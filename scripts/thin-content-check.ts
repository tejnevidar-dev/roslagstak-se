/**
 * Thin-content-kontroll (SEO-programmet Phase 2.7/2.8 + Marknadschefens steg 14).
 *
 * VIKTIGT — vad det här scriptet mäter: bara den STATISKA texten i
 * scripts/prerender-content.ts (intro + paragraphs), som generate-static-heads.mjs skriver in
 * i den icke-JS-körda HTML:en för crawlers som inte kör JavaScript. Det är EN mindre spegling
 * av sidan, inte hela den renderade sidan — FAQ-svar, tabeller, sidebars och relaterade länkar
 * som bara renderas av React syns inte här. Låg ordräkning i den här kontrollen betyder alltså
 * INTE att sidan är tunn för en riktig besökare eller för Googlebot (som kör JS) — bara att den
 * icke-JS-körda spegeltexten är kort. Gränsen är satt därefter (40 ord, inte 300).
 *
 * AVVIKELSE (blockerar): indexerbar URL utan prerenderat innehåll alls (0 ord) — sidan har
 *   ingen spegeltext bakom titeln, bara SPA-fallback utan eget innehåll.
 * VARNING (blockerar inte): under 40 ord i spegeltexten — värd en snabb koll, inte ett bevis
 *   på tunt innehåll.
 *
 * Kör: bun scripts/thin-content-check.ts
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { prerenderContent } from "./prerender-content";

const THIN_THRESHOLD = 40;

const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/",
);

const wordCount = (path: string): number | null => {
  const page = prerenderContent(path);
  if (!page) return null;
  const text = [page.intro, ...page.paragraphs].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
};

const errors: string[] = [];
const warnings: string[] = [];

for (const path of paths) {
  const words = wordCount(path);
  if (words === null) errors.push(`${path} — inget prerenderat innehåll (0 ord)`);
  else if (words < THIN_THRESHOLD) warnings.push(`${path} — ${words} ord`);
}

console.log(`\nThin-content-kontroll — ${paths.length} indexerbara URL:er, gräns ${THIN_THRESHOLD} ord\n`);
console.log(`AVVIKELSER (blockerar publicering): ${errors.length}`);
for (const e of errors) console.log(`  - ${e}`);
console.log(`\nVARNINGAR (< ${THIN_THRESHOLD} ord, blockerar inte): ${warnings.length}`);
for (const w of warnings.slice(0, 40)) console.log(`  - ${w}`);
if (warnings.length > 40) console.log(`  … och ${warnings.length - 40} till`);

if (errors.length === 0) console.log("\n✓ Inga indexerbara sidor helt utan eget innehåll.\n");
else console.log("");

process.exit(errors.length ? 1 : 0);
