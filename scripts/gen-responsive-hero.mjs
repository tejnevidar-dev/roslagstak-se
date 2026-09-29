import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import path from "path";

const WIDTHS = [480, 768, 1080, 1440];
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
    await sharp(buf).resize({ width: w }).avif({ quality: 55 }).toFile(`${base}.avif`);
    await sharp(buf).resize({ width: w }).webp({ quality: 68 }).toFile(`${base}.webp`);
  }
}
console.log("Klart.");
