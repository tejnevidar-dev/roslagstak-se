/**
 * Importskript för materialtexter (ledning/marknad/innehall/materialtexter/<slug>.md) → src/data/materials.ts.
 * Hela texten tas över utan manuell kortning. MaterialDetail-fälten är ren text, så
 * [text](/länk) blir "text" och markdown-kursiv och -fet tas bort. Meningsgrinden (content-coverage-check.ts)
 * kontrollerar sedan varje mening. Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-material.ts <brief.md>
 * Finns sluggen redan i materials.ts avbryts importen (redigera då datan direkt).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const briefPath = process.argv.slice(2).find((a) => a.endsWith(".md"));
if (!briefPath) {
  console.error("Användning: bun scripts/import-material.ts <brief.md>");
  process.exit(2);
}
const raw = readFileSync(resolve(briefPath), "utf8").replace(/\r/g, "");
const one = (re: RegExp) => raw.match(re)?.[1]?.trim();

const slug = one(/\*\*Slug:\*\*\s*\/material\/([a-z0-9-]+)/);
const title = one(/\*\*H1:\*\*\s*([^·\n]+)/);
const hub = one(/\*\*Hubbkort:\*\*\s*"([^"]+)"/);
const weight = one(/weight:\s*(Lätt|Tungt)/);
const screws = one(/visibleScrews:\s*(Ja|Nej)/);
const minLutning = one(/minLutning:\s*([^\n·]+)/);
const metaTitle = one(/\*\*metaTitle \(≤ 60\):\*\*\s*(.+)/);
const metaDescription = one(/\*\*metaDescription \(≤ 160\):\*\*\s*(.+)/);
if (!slug || !title || !hub || !weight || !screws || !minLutning || !metaTitle || !metaDescription) {
  console.error("Briefens huvud är ofullständigt.", { slug, title, hub, weight, screws, minLutning, metaTitle, metaDescription });
  process.exit(2);
}

const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s*\n\s*/g, " ")
    .trim();

const fieldNames = [
  "intro",
  "funktion",
  "anvandning",
  "livslangd",
  "fordelar",
  "nackdelar",
  "passarNar",
  "underhall",
  "vanligaFel",
  "kostnadsdrivare",
  "delAvTaksystemet",
  "hosOss",
  "hallIsar",
];
const detail: Record<string, string> = {};
for (const n of fieldNames) {
  const m = raw.match(new RegExp(`\\*\\*${n}:\\*\\*\\n([\\s\\S]*?)(?=\\n\\*\\*[a-zA-Z]+:\\*\\*|\\n## |$)`));
  if (m) detail[n] = plain(m[1]);
}
for (const req of fieldNames.filter((n) => !["hosOss", "hallIsar"].includes(n))) {
  if (!detail[req]) {
    console.error(`Saknar obligatoriskt fält: ${req}`);
    process.exit(2);
  }
}

const js = (s: string) => JSON.stringify(s);
const entry = `  {
    slug: ${js(slug)},
    href: ${js("/material/" + slug)},
    title: ${js(title)},
    hubDescription: ${js(hub)},
    weight: ${js(weight)},
    visibleScrews: ${js(screws)},
    minLutning: ${js(minLutning)},
    detail: {
      metaTitle: ${js(metaTitle)},
      metaDescription: ${js(metaDescription)},
${fieldNames
  .filter((n) => detail[n])
  .map((n) => `      ${n}: ${js(detail[n])},`)
  .join("\n")}
    },
  },
`;

const f = resolve("src/data/materials.ts");
const src = readFileSync(f, "utf8");
if (src.includes(`slug: "${slug}"`)) {
  console.error(`/material/${slug} finns redan i materials.ts. Redigera datan direkt.`);
  process.exit(1);
}
const getAt = src.indexOf("export const getMaterial");
const end = getAt < 0 ? -1 : src.lastIndexOf("];", getAt) - 1;
if (end < 0) {
  console.error("Hittar inte slutet av materials-listan.");
  process.exit(2);
}
writeFileSync(f, src.slice(0, end + 1) + entry + src.slice(end + 1));
console.log(`[import-material] lade till /material/${slug} (${Object.keys(detail).length} fält)`);
