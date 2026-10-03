/**
 * Importskript för regiontexter (ledning/marknad/innehall/regiontexter/*.md) → src/data/region-texts.ts.
 * Genererar hela datafilen om från ALLA briefs i mappen (idempotent), så den alltid matchar de godkända
 * filerna utan manuell kortning. Meningsgrinden (content-coverage-check.ts) kontrollerar sedan varje mening.
 * Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-region.ts
 * Texten är allt mellan "## Regiontext" och nästa "## ". Första stycket blir ingress, övriga stycken
 * brödtext. "### Rubrik" blir "## Rubrik". Avsnittet "### Orter i/på <region>" utelämnas: sidan visar
 * själv ortlistan, härledd ur locations.ts.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { regionBySlug } from "../src/data/regions";

/** Bara briefar med raden "**Grind:** GODKÄND ..." (Marknadschefens märkning) får byggas. */
const isApproved = (raw: string) => /\*\*Grind:\*\*\s*GODKÄND/.test(raw);

/** Rad som bara är en länklista ("**Ort:** [a](/x) · [b](/y)"): ersätts av sidens egen ortlista. */
const isPureLinkList = (line: string) =>
  line.replace(/\[[^\]]+\]\([^)]+\)/g, "").replace(/\*\*[^*]+:\*\*/g, "").replace(/[·\s]/g, "") === "";

const dir = resolve("../ledning/marknad/innehall/regiontexter");
const js = (s: string) => JSON.stringify(s);
const entries: string[] = [];
const descEntries: string[] = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const raw = readFileSync(join(dir, file), "utf8").replace(/\r/g, "");
  const slug = raw.match(/\*\*Slug:\*\*\s*\/omraden\/([a-z0-9-]+)/)?.[1];
  const title = raw.match(/\*\*Titel \(≤ 60\):\*\*\s*(.+?)\s*·/)?.[1]?.trim();
  const description = raw.match(/\*\*Meta \(≤ 160\):\*\*\s*(.+)/)?.[1]?.trim();
  const region = slug ? regionBySlug(slug) : undefined;
  const h1 = raw.match(/\*\*H1:\*\*\s*(.+?)\s*·/)?.[1]?.trim();
  if (slug && !isApproved(raw)) {
    console.log(`[import-region] ${slug}: inte godkänd än, hoppar över`);
    continue;
  }
  if (!slug || !title || !description || !region || !h1) {
    console.error(`${file}: saknar Slug/Titel/Meta/H1 eller okänd region`, { slug, title, description, region, h1 });
    process.exit(2);
  }
  const body = raw.split(/\n## Regiontext[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "";
  const content: string[] = [];
  let skip = false;
  for (const line of body.split("\n").map((l) => l.trim()).filter(Boolean)) {
    if (line.startsWith("### ")) {
      skip = /^### Orter /.test(line);
      if (!skip) content.push("## " + line.slice(4));
      continue;
    }
    // I "### Orter …" utelämnas bara rena länklistor. Meningar där (t.ex. "Läs också om takbyte i …"
    // eller hänvisning till grannregion) behålls som vanliga stycken.
    if (skip && isPureLinkList(line)) continue;
    content.push(line);
  }
  if (content.length < 5) {
    console.error(`${file}: för få stycken (${content.length})`);
    process.exit(2);
  }
  const [intro, ...rest] = content;
  entries.push(`  ${js(region)}: {
    h1: ${js(h1)},
    title: ${js(title)},
    description: ${js(description)},
    intro: ${js(intro)},
    body: [
${rest.map((c) => `      ${js(c)},`).join("\n")}
    ],
  },`);
  descEntries.push(`  ${js(region)}: ${js(description)},`);
  console.log(`[import-region] ${region}: ${content.length} stycken`);
}

writeFileSync(
  resolve("src/data/region-texts.ts"),
  `/**
 * Godkända regiontexter (genererad av scripts/import-region.ts ur ledning/marknad/innehall/regiontexter/).
 * Redigera inte för hand: ändra briefen och kör importen. Ersätter regionens ingress och
 * "Takens förutsättningar"-text i regions.ts för de regioner som finns här.
 */
export interface RegionText {
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Stycken; rader som börjar med "## " är rubriker, [text](/länk) och **fet** renderas av inline-md. */
  body: string[];
}

export const regionTexts: Record<string, RegionText> = {
${entries.join("\n")}
};
`,
);
// Liten fil med bara metabeskrivningarna (korten på /omraden och startsidan), så att de sidorna inte drar in hela texterna.
writeFileSync(
  resolve("src/data/region-descriptions.ts"),
  `/**
 * Kort beskrivning per region (genererad av scripts/import-region.ts, samma briefar som region-texts.ts).
 * Redigera inte för hand.
 */
export const regionDescriptions: Record<string, string> = {
${descEntries.join("\n")}
};
`,
);
console.log(`[import-region] ${entries.length} regioner skrivna till src/data/region-texts.ts och region-descriptions.ts`);
