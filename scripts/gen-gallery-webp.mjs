// Genererar WebP-varianter (max 1080 px breda) av projektsidornas galleribilder och skriver ut
// originalens mått, så att <img> kan få width/height (ingen layoutförskjutning) och <picture>
// kan servera WebP (Lighthouse image-delivery, 2026-10-01). Kör: bun scripts/gen-gallery-webp.mjs
import sharp from "sharp";
import { readFileSync } from "fs";
const FILES = ["project-blido-detail-1", "project-blido-detail-2", "project-singo-lakeview", "project-singo-detail-1"];
for (const name of FILES) {
  const buf = readFileSync(`src/assets/${name}.jpg`);
  const meta = await sharp(buf).metadata();
  const w = Math.min(1080, meta.width);
  const out = await sharp(buf).resize({ width: w }).webp({ quality: 70 }).toFile(`src/assets/${name}-1080.webp`);
  console.log(`${name}: ${meta.width}x${meta.height} -> ${out.width}x${out.height}, ${Math.round(out.size / 1024)} KiB`);
}
