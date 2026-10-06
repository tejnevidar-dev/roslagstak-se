/**
 * Bildfilerna till /projekt/takbyte-grisslehamn och startsidans referenskort, version 2 (2026-10-06): Vidars originalbilder
 * (Dropbox, 1440×1080 PNG utan metadata) i stället för stillbilder ur WhatsApp-filmen (832×464).
 * Källor: ledning/marknad/innehall/material/2026-10-grisslehamn/original/
 *   hero    = "grisslehamn-snett-1.png" (snett uppifrån, ingen person)
 *   detail1 = "grisslehamn-uppifran.png" (rakt uppifrån, en person i varselväst syns liten vid altanen)
 *   detail2 = "grisslehamn-snett-2.png" (snett uppifrån)
 *   detail3 = "grisslehamn-snett-3.png" (snett uppifrån, längre bort)
 * Metadata: källorna har ingen, och sharp skriver inga EXIF-taggar (withMetadata anropas inte). Ingen uppskalning.
 * Kör: bun scripts/gen-grisslehamn-images.mjs
 */
import sharp from "sharp";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";

const SRC = "../ledning/marknad/innehall/material/2026-10-grisslehamn/original";
const f = (name) => `${SRC}/${name}`;
const hero = f("grisslehamn-snett-1.png");
const details = [f("grisslehamn-uppifran.png"), f("grisslehamn-snett-2.png"), f("grisslehamn-snett-3.png")];

// Gamla stillbildsvarianter bort
for (const w of [480, 768]) {
  rmSync(`src/assets/project-grisslehamn-hero-${w}.avif`, { force: true });
  rmSync(`src/assets/project-grisslehamn-hero-${w}.webp`, { force: true });
}

await sharp(hero).jpeg({ quality: 82, mozjpeg: true }).toFile("src/assets/project-grisslehamn-hero.jpg");
for (const w of [480, 768, 1080, 1440]) {
  await sharp(hero).resize({ width: w }).avif({ quality: 55 }).toFile(`src/assets/project-grisslehamn-hero-${w}.avif`);
  await sharp(hero).resize({ width: w }).webp({ quality: 68 }).toFile(`src/assets/project-grisslehamn-hero-${w}.webp`);
}
for (const [i, src] of details.entries()) {
  const n = i + 1;
  await sharp(src).jpeg({ quality: 82, mozjpeg: true }).toFile(`src/assets/project-grisslehamn-detail-${n}.jpg`);
  await sharp(src).resize({ width: 1080 }).webp({ quality: 72 }).toFile(`src/assets/project-grisslehamn-detail-${n}-1080.webp`);
}
// Delningsbild (1200×630, utsnitt)
mkdirSync("public/og", { recursive: true });
await sharp(hero).extract({ left: 0, top: 260, width: 1440, height: 756 }).resize(1200, 630).jpeg({ quality: 82, mozjpeg: true }).toFile("public/og/project-grisslehamn-hero.jpg");
const m = await sharp("src/assets/project-grisslehamn-hero.jpg").metadata();
console.log("hero", m.width, m.height, "exif:", Boolean(m.exif));
