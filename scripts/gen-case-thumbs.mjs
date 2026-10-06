/**
 * Små miniatyrer av de tre kundcasen för den statiska HTML:en (startsidans referenssektion och projektsidornas hero):
 * public/cases/<jobb>-480.webp och -768.webp (4:3). De stora delningsbilderna i public/og (100–375 kB) hämtades
 * förut av den statiska HTML:en och tog bandbredd från sidans egen LCP-bild. Källfilerna är desamma som i kundcase-bildkarta.md.
 * Kör: bun scripts/gen-case-thumbs.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const M = "../ledning/marknad/innehall/material";
const SRC = {
  blido: `${M}/2026-09-blido/blido-drone-4.webp`,
  singo: `${M}/2026-09-singo/singo-drone-1.webp`,
  grisslehamn: `${M}/2026-10-grisslehamn/original/grisslehamn-snett-1.png`,
};
mkdirSync("public/cases", { recursive: true });
for (const [namn, src] of Object.entries(SRC)) {
  for (const w of [480, 768]) {
    const info = await sharp(src).resize(w, Math.round((w * 3) / 4), { fit: "cover" }).webp({ quality: 55 }).toFile(`public/cases/${namn}-${w}.webp`);
    console.log(namn, w, Math.round(info.size / 1024) + " kB");
  }
}
