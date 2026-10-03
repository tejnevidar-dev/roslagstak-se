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

/** Bara texter som Marknadschefen har godkänt får byggas. Lägg till sluggen här när en brief är godkänd. */
const APPROVED = new Set(["malardalen", "norra-skargarden", "radmansohalvon"]);

const dir = resolve("../ledning/marknad/innehall/regiontexter");
const js = (s: string) => JSON.stringify(s);
const entries: string[] = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const raw = readFileSync(join(dir, file), "utf8").replace(/\r/g, "");
  const slug = raw.match(/\*\*Slug:\*\*\s*\/omraden\/([a-z0-9-]+)/)?.[1];
  const title = raw.match(/\*\*Titel \(≤ 60\):\*\*\s*(.+?)\s*·/)?.[1]?.trim();
  const description = raw.match(/\*\*Meta \(≤ 160\):\*\*\s*(.+)/)?.[1]?.trim();
  const region = slug ? regionBySlug(slug) : undefined;
  if (slug && !APPROVED.has(slug)) {
    console.log(`[import-region] ${slug}: inte godkänd än, hoppar över`);
    continue;
  }
  if (!slug || !title || !description || !region) {
    console.error(`${file}: saknar Slug/Titel/Meta eller okänd region`, { slug, title, description, region });
    process.exit(2);
  }
  const body = raw.split(/\n## Regiontext[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "";
  const content: string[] = [];
  let skip = false;
  for (const line of body.split("\n").map((l) => l.trim()).filter(Boolean)) {
    if (line.startsWith("### ")) {
      skip = /^### Orter (i|på) /.test(line);
      if (!skip) content.push("## " + line.slice(4));
      continue;
    }
    if (!skip) content.push(line);
  }
  if (content.length < 5) {
    console.error(`${file}: för få stycken (${content.length})`);
    process.exit(2);
  }
  const [intro, ...rest] = content;
  entries.push(`  ${js(region)}: {
    title: ${js(title)},
    description: ${js(description)},
    intro: ${js(intro)},
    body: [
${rest.map((c) => `      ${js(c)},`).join("\n")}
    ],
  },`);
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
console.log(`[import-region] ${entries.length} regioner skrivna till src/data/region-texts.ts`);
