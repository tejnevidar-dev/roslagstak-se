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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
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
/** Ett fält som bara innehåller en anteckning i kursiv parentes, t.ex. "*(tomt: …)*", räknas som tomt. */
const field = (name: string) => {
  const v = raw.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.+)$`, "m"))?.[1]?.trim();
  return v && !v.startsWith("*(") ? v : undefined;
};
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
const ogImageField = field("ogImage");
// Utan egen og-bild i briefen: public/og/project-<slug>-hero.jpg om den finns
const ogImage = ogImageField ?? (slug && existsSync(resolve(`public/og/project-${slug}-hero.jpg`)) ? `/og/project-${slug}-hero.jpg` : undefined);
const description = (raw.split(/\n## Beskrivning[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

// period får vara tomt (Vidar har inte uppgett när jobbet gjordes): sidan döljer då rutan "Utfört"
const missing = Object.entries({ slug, title, locationName, locationSlug, serviceName, serviceSlug, material, summary, heroAlt })
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
const replace = process.argv.includes("--replace");
const exists = src.includes(`"slug": "${slug}"`) || src.includes(`slug: "${slug}"`);
if (exists && !replace) {
  console.error(`/projekt/${slug} finns redan i project-texts.ts. Kör med --replace för att ersätta texten ur briefen.`);
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
  period: period ?? "",
  summary,
  description,
  heroAlt,
  ...(ogImage ? { ogImage } : {}),
};
const entry = "  " + JSON.stringify(obj, null, 2).replace(/\n/g, "\n  ") + ",\n";
if (exists) {
  // Ersätt den befintliga posten (blandade radslut tillåtna): från "  {" före sluggen till "  },".
  const at = src.search(new RegExp(`"slug": "${slug}"`));
  const start = src.lastIndexOf("\n  {", at) + 1;
  const stop = src.indexOf("\n  },", at) + "\n  },".length;
  if (start === 0 || stop < at) {
    console.error("Hittar inte posten i project-texts.ts");
    process.exit(2);
  }
  writeFileSync(f, src.slice(0, start) + entry.replace(/,\n$/, ",") + src.slice(stop));
  console.log(`[import-project] ersatte /projekt/${slug}`);
  process.exit(0);
}
const end = src.lastIndexOf("];");
if (end < 0) {
  console.error("Hittar inte slutet av projectTexts.");
  process.exit(2);
}
writeFileSync(f, src.slice(0, end) + entry + src.slice(end));
console.log(`[import-project] lade till /projekt/${slug}. Nästa steg: lägg bilderna under "${slug}" i projectImages (src/data/projects.ts) och sitemap-raden.`);
