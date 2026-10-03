/**
 * Lista över ortssidor som använder ersättningsmallen (gammal data), sorterad efter visningar i den senaste
 * sökdataexporten (ledning/marknad/seo-data). Skriver en markdown-tabell utan persondata.
 * Kör: bun scripts/ortslista-gammal-data.ts [utfil.md]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { usesMall } from "../src/data/location-mall";

const DIR = resolve("../ledning/marknad/seo-data");
const files = readdirSync(DIR).filter((f) => /^seo-data-.*\.json$/.test(f)).sort();
const exp = JSON.parse(readFileSync(resolve(DIR, files[files.length - 1]), "utf8"));
const OUT = resolve(process.argv[2] ?? "../ledning/marknad/innehall/ortslista-gammal-data-2026-10-04.md");

const impr = new Map<string, { impr: number; clicks: number }>();
const path = (u: string | null) => {
  try { return new URL(u ?? "").pathname.replace(/\/+$/, "").toLowerCase(); } catch { return ""; }
};
for (const r of exp.keywords as { landingPage: string | null; impressions: number; clicks: number }[]) {
  const p = path(r.landingPage);
  const a = impr.get(p) ?? { impr: 0, clicks: 0 };
  a.impr += r.impressions ?? 0; a.clicks += r.clicks ?? 0;
  impr.set(p, a);
}
const rows = locations
  .map((l, i) => ({ l, i }))
  .filter(({ l }) => usesMall(l))
  .map(({ l, i }) => ({ slug: l.slug, name: l.name, region: l.region, ...(impr.get(`/taklaggare-${l.slug}`) ?? { impr: 0, clicks: 0 }), nr: i }))
  .sort((a, b) => b.impr - a.impr || a.name.localeCompare(b.name, "sv"));
const exportedAt = String(exp.exportedAt).slice(0, 10);
const lines = [
  `# Ortssidor med ersättningsmall (gammal data), sorterade efter visningar`,
  ``,
  `Maskinräknad av \`scripts/ortslista-gammal-data.ts\` ur \`src/data/locations.ts\` (orter utan faktaruta = utan riktig områdestext) och sökdataexporten ${exportedAt} (${exp.period}). Visningar och klick är summerade över alla sökord med sidan som landningssida. ${rows.length} av ${locations.length} ortssidor. Ordningsnumret styr mallens variantval.`,
  ``,
  `| # | Sida | Ort | Region | Visningar | Klick |`,
  `|---|---|---|---|---|---|`,
  ...rows.map((r, n) => `| ${n + 1} | /taklaggare-${r.slug} | ${r.name} | ${r.region} | ${r.impr} | ${r.clicks} |`),
  ``,
];
writeFileSync(OUT, lines.join("\n"));
console.log(`[ortslista] ${rows.length} orter, ${rows.filter((r) => r.impr > 0).length} med visningar. Skrev ${OUT}`);
