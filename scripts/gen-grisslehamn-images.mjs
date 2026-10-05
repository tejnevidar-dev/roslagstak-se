/**
 * Engångsskript (backlog 1cr): bildfilerna till /projekt/takbyte-grisslehamn ur Vidars film, stillbild 1 och 2
 * (ledning/marknad/innehall/material/2026-10-grisslehamn/stillbilder/). Källbilderna är 832×464 och har ingen
 * metadata (ffmpeg -map_metadata -1); sharp skriver inga EXIF-taggar. Ingen uppskalning: hero-varianter i 480 och 768 px.
 * Kör: bun scripts/gen-grisslehamn-images.mjs
 */
import sharp from "sharp";
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";

const SRC = "../ledning/marknad/innehall/material/2026-10-grisslehamn/stillbilder";
const hero = readFileSync(`${SRC}/still-01.jpg`);
const detail = readFileSync(`${SRC}/still-02.jpg`);

// JPEG utan metadata (sharp tar inte med EXIF om withMetadata inte anropas)
await sharp(hero).jpeg({ quality: 82, mozjpeg: true }).toFile("src/assets/project-grisslehamn-hero.jpg");
await sharp(detail).jpeg({ quality: 82, mozjpeg: true }).toFile("src/assets/project-grisslehamn-detail-1.jpg");
for (const w of [480, 768]) {
  await sharp(hero).resize({ width: w }).avif({ quality: 55 }).toFile(`src/assets/project-grisslehamn-hero-${w}.avif`);
  await sharp(hero).resize({ width: w }).webp({ quality: 68 }).toFile(`src/assets/project-grisslehamn-hero-${w}.webp`);
}
mkdirSync("public/og", { recursive: true });
copyFileSync("src/assets/project-grisslehamn-hero.jpg", "public/og/project-grisslehamn-hero.jpg");
const m = await sharp("src/assets/project-grisslehamn-hero.jpg").metadata();
console.log("hero", m.width, m.height, "exif:", Boolean(m.exif));
