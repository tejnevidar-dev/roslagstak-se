/**
 * Responsiva AVIF/WebP-varianter för Hero.tsx:s poster-bild (src/assets/hero-drone-poster.jpg),
 * som efter cookie-banner-fixen (#1ag punkt 1) blev startsidans LCP-element på mobil (Marknadschefen
 * 2026-10-01). Samma mönster som scripts/gen-responsive-hero.mjs för projektsidornas hero.
 * Körs manuellt om källbilden byts ut.
 */
import sharp from "sharp";
import { readFileSync, existsSync } from "fs";

const WIDTHS = [480, 768, 1080];
const SOURCE = "src/assets/hero-drone-poster.jpg";

if (!existsSync(SOURCE)) {
  console.error(`Saknar källfil: ${SOURCE}`);
  process.exit(1);
}
const buf = readFileSync(SOURCE);
const meta = await sharp(buf).metadata();
console.log(`hero-drone-poster: ${meta.width}x${meta.height}`);

for (const w of WIDTHS) {
  if (w > (meta.width ?? 0)) continue;
  const base = `src/assets/hero-drone-poster-${w}`;
  await sharp(buf).resize({ width: w }).avif({ quality: 55 }).toFile(`${base}.avif`);
  await sharp(buf).resize({ width: w }).webp({ quality: 68 }).toFile(`${base}.webp`);
}
console.log("Klart.");
