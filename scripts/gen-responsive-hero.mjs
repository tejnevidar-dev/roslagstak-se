import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import path from "path";

const WIDTHS = [480, 768, 1080, 1440];
/* AVIF-kvalitet per bredd: mobilvarianterna (480 och 768, de som hämtas på telefon och bestämmer LCP på projektsidorna) kodas lägre,
   desktopvarianterna behåller 55. Singö 768: 75 kB → ca 52 kB (LCP-arbetet 2026-10-06). */
const AVIF_QUALITY = { 480: 45, 768: 45, 1080: 55, 1440: 55 };
const SOURCES = [
  { slug: "blido", file: "src/assets/project-blido-hero.jpg" },
  { slug: "singo", file: "src/assets/project-singo-hero.jpg" },
];

for (const { slug, file } of SOURCES) {
  if (!existsSync(file)) {
    console.error(`Saknar källfil: ${file}`);
    process.exit(1);
  }
  const buf = readFileSync(file);
  const meta = await sharp(buf).metadata();
  console.log(`${slug}: ${meta.width}x${meta.height}`);

  for (const w of WIDTHS) {
    if (w > (meta.width ?? 0)) continue;
    const base = `src/assets/project-${slug}-hero-${w}`;
    await sharp(buf).resize({ width: w }).avif({ quality: AVIF_QUALITY[w] ?? 55 }).toFile(`${base}.avif`);
    await sharp(buf).resize({ width: w }).webp({ quality: 68 }).toFile(`${base}.webp`);
  }
}
console.log("Klart.");
