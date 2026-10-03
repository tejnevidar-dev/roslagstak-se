/**
 * Importskript för referensjobb (ledning/marknad/innehall/projekttexter/<slug>.md) → src/data/project-texts.ts.
 * Bara briefar med raden "**Grind:** GODKÄND ..." byggs (en brief utan Grind-rad byggs aldrig).
 * Hela texten tas över ordagrant; sluggar för ort, tjänst och material valideras mot datafilerna.
 * Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-project.ts <brief.md>
 *
 * Briefens format (se ledning/marknad/innehall/projekttexter/_mall.md):
 *   **Slug:** /projekt/<slug>
 *   **Grind:** GODKÄND av Marknadschefen ÅÅÅÅ-MM-DD (bygg).
 *   - **title:** …  - **locationName:** …  - **locationSlug:** …  - **serviceName:** …  - **serviceSlug:** …
 *   - **material:** …  - **materialSlugs:** a, b  - **period:** …  - **summary:** …  - **heroAlt:** …
 *   - **ogImage:** /og/… (valfri)
 *   ## Beskrivning   (ett stycke per rad; [text](/länk) och **fet** renderas som i bloggen)
 *
 * Efter importen: lägg bilderna i src/data/projects.ts (projectImages) under samma slug. Utan bilder
 * kastar projects.ts ett fel vid bygget, så ett jobb kan aldrig publiceras utan foton av misstag.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { materials } from "../src/data/materials";

const briefPath = process.argv.slice(2).find((a) => a.endsWith(".md"));
if (!briefPath) {
  console.error("Användning: bun scripts/import-project.ts <brief.md>");
  process.exit(2);
}
const raw = readFileSync(resolve(briefPath), "utf8").replace(/\r/g, "");
if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw)) {
  console.error('Briefen saknar raden "**Grind:** GODKÄND ...". En brief utan Grind-rad byggs aldrig.');
  process.exit(1);
}

const slug = raw.match(/\*\*Slug:\*\*\s*\/projekt\/([a-z0-9-]+)/)?.[1];
const field = (name: string) => raw.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.+)$`, "m"))?.[1]?.trim();
const title = field("title");
const locationName = field("locationName");
const locationSlug = field("locationSlug");
const serviceName = field("serviceName");
const serviceSlug = field("serviceSlug");
const material = field("material");
const materialSlugs = (field("materialSlugs") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const period = field("period");
const summary = field("summary");
const heroAlt = field("heroAlt");
const ogImage = field("ogImage");
const description = (raw.split(/\n## Beskrivning[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

const missing = Object.entries({ slug, title, locationName, locationSlug, serviceName, serviceSlug, material, period, summary, heroAlt })
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missing.length || description.length < 3) {
  console.error("Briefen är ofullständig:", { saknas: missing, stycken: description.length });
  process.exit(2);
}

const errors: string[] = [];
if (!locations.some((l) => l.slug === locationSlug)) errors.push(`locationSlug "${locationSlug}" finns inte i locations.ts`);
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
if (!new RegExp(`slug:\\s*"${serviceSlug}"`).test(servicesSource)) errors.push(`serviceSlug "${serviceSlug}" finns inte i Services.tsx`);
for (const m of materialSlugs) if (!materials.some((x) => x.slug === m)) errors.push(`materialSlug "${m}" finns inte i materials.ts`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(2);
}

const f = resolve("src/data/project-texts.ts");
const src = readFileSync(f, "utf8");
if (src.includes(`"slug": "${slug}"`) || src.includes(`slug: "${slug}"`)) {
  console.error(`/projekt/${slug} finns redan i project-texts.ts. Redigera datan direkt.`);
  process.exit(1);
}
const obj = {
  slug,
  title,
  locationName,
  locationSlug,
  serviceName,
  serviceSlug,
  material,
  materialSlugs,
  period,
  summary,
  description,
  heroAlt,
  ...(ogImage ? { ogImage } : {}),
};
const entry = "  " + JSON.stringify(obj, null, 2).replace(/\n/g, "\n  ") + ",\n";
const end = src.lastIndexOf("];");
if (end < 0) {
  console.error("Hittar inte slutet av projectTexts.");
  process.exit(2);
}
writeFileSync(f, src.slice(0, end) + entry + src.slice(end));
console.log(`[import-project] lade till /projekt/${slug}. Nästa steg: lägg bilderna under "${slug}" i projectImages (src/data/projects.ts) och sitemap-raden.`);
