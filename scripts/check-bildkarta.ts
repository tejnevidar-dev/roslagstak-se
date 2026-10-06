/**
 * Byggkontroll: rätt bild på rätt jobb (Marknadschefens delmål K2, 2026-10-06).
 * Varje bild av ett kundcase (src/assets/project-*, public/og/project-*, startsidans drönarbild hero-drone-poster)
 * ska ha en rad i ledning/marknad/kundcase-bildkarta.md med en källfil som finns i jobbets materialmapp.
 * Raden gäller grundnamnet (varianterna -480/-768/-1080/-1440 hör till samma rad).
 * Kör: bun scripts/check-bildkarta.ts (ingår i postbuild)
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";

const KARTA = "../ledning/marknad/kundcase-bildkarta.md";
const MATERIAL = "../ledning/marknad/innehall/material";
const fel: string[] = [];

// 1) Raderna i kartan: `grundnamn` | jobb | `källfil` | ...
const rader = new Map<string, string>();
for (const rad of readFileSync(KARTA, "utf8").split(/\r?\n/)) {
  const m = rad.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|/);
  if (m) rader.set(m[1], m[3]);
}
for (const [namn, kalla] of rader) {
  if (!existsSync(`${MATERIAL}/${kalla}`)) fel.push(`${namn}: källfilen finns inte (${kalla})`);
}

// 2) Bilderna i koden
const grundnamn = (fil: string) => fil.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "").replace(/-(\d{3,4})$/, "");
const bilder = new Set<string>();
for (const f of readdirSync("src/assets")) {
  if (/^project-/.test(f) || /^hero-drone-poster/.test(f)) bilder.add(grundnamn(f));
}
for (const f of readdirSync("public/og")) {
  if (/^project-/.test(f)) bilder.add(`public/og/${grundnamn(f)}`);
}
for (const namn of bilder) {
  if (!rader.has(namn)) fel.push(`${namn}: saknar rad i kundcase-bildkarta.md (ingen känd källfil, bilden ska bort eller läggas in i kartan)`);
}

if (fel.length) {
  console.error("FEL check-bildkarta:\n" + fel.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`[check-bildkarta] OK: ${bilder.size} bildnamn, alla med rad och källfil i kundcase-bildkarta.md`);
