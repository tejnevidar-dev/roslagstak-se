/**
 * Importskript för tjänst×ort-texter (ledning/marknad/innehall/ortstexter/<tjänst>-<ort>.md) →
 * src/data/combo-overrides.ts. Hela texten tas över utan manuell kortning; meningsgrinden
 * (content-coverage-check.ts) kontrollerar sedan varje mening. Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-combo.ts <brief.md>...
 * Texten är allt mellan "## Text" och nästa "## " (källor/obs grind ingår inte). Varje rad blir ett
 * stycke, "### Rubrik" blir "## Rubrik" (renderas som rubrik), [text](/länk) och **fet** behålls.
 * Finns nyckeln redan i combo-overrides.ts avbryts importen för just den filen.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { blogPosts } from "../src/data/blog-posts";
import { projectTexts } from "../src/data/project-texts";
import { locations } from "../src/data/locations";
import { materials } from "../src/data/materials";
import { problems } from "../src/data/problems";
import { generateCombos } from "../src/data/service-location-combos";

const comboByUrl = new Map(generateCombos().map((c) => [c.url, c]));
const SERVICE_LABEL: Record<string, string> = {
  takomlaggning: "Takbyte och takomläggning",
  takrenovering: "Takrenovering",
  tegeltak: "Tegeltak",
  platarbeten: "Plåtarbeten",
  takavvattning: "Takavvattning",
  takinspektion: "Kostnadsfri takkontroll",
  taksakerhet: "Taksäkerhet",
  "eternit-asbest": "Byta eternittak",
};
/** Länktext för en intern adress ur briefens länkrad. */
const linkLabel = (href: string): string => {
  if (href === "/priser") return "Riktpriser för takarbeten";
  if (href === "/projekt") return "Våra projekt";
  if (href === "/hur-det-gar-till") return "Så går ett takbyte till";
  if (href === "/takkontroll") return "Kostnadsfri takkontroll";
  if (href === "/takbyte-norrtalje") return "Byta tak i Norrtälje";
  let m = href.match(/^\/taklaggare-([a-z0-9-]+)$/);
  if (m) {
    const l = locations.find((x) => x.slug === m![1]);
    if (l) return `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`;
  }
  m = href.match(/^\/tjanster\/([a-z0-9-]+)$/);
  if (m && SERVICE_LABEL[m[1]]) return SERVICE_LABEL[m[1]];
  m = href.match(/^\/projekt\/([a-z0-9-]+)$/);
  if (m) {
    const p = projectTexts.find((x) => x.slug === m![1]);
    if (p) return p.title;
  }
  m = href.match(/^\/blogg\/([a-z0-9-]+)$/);
  if (m) {
    const b = blogPosts.find((x) => x.slug === m![1]);
    if (b) return b.title;
  }
  const prob = problems.find((x) => `/takproblem/${x.slug}` === href);
  if (prob) return prob.title;
  const mat = materials.find((x) => x.href === href);
  if (mat) return mat.title;
  const c = comboByUrl.get(href);
  if (c) return `${c.serviceName} ${c.prep} ${c.locationName}`;
  throw new Error(`Ingen länktext för ${href}`);
};

const replace = process.argv.includes("--replace");
const files = process.argv.slice(2).filter((a) => a.endsWith(".md"));
if (!files.length) {
  console.error("Användning: bun scripts/import-combo.ts <brief.md>...");
  process.exit(2);
}

const f = resolve("src/data/combo-overrides.ts");
let src = readFileSync(f, "utf8");
const js = (s: string) => JSON.stringify(s);
let added = 0;

for (const file of files) {
  const raw = readFileSync(resolve(file), "utf8").replace(/\r/g, "");
  if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw) && !/GODKÄND av Marknadschefen/.test(raw.split("\n").slice(0, 3).join("\n"))) {
    console.error(`${file}: saknar raden "**Grind:** GODKÄND ...", byggs inte`);
    process.exit(1);
  }
  const slug = raw.match(/\*\*Slug:\*\*\s*\/([a-z0-9-]+)/)?.[1];
  const title = raw.match(/\*\*Titel \(≤ 60\):\*\*\s*(.+?)\s*·/)?.[1]?.trim();
  const description = raw.match(/\*\*Meta \(≤ 160\):\*\*\s*(.+)/)?.[1]?.trim();
  if (!slug || !title || !description) {
    console.error(`${file}: saknar Slug/Titel/Meta`, { slug, title, description });
    process.exit(2);
  }
  const keyAt = src.indexOf(`  "${slug}": {\n`);
  if (keyAt > -1) {
    if (!replace) {
      console.warn(`${slug} finns redan i combo-overrides.ts, hoppar över (använd --replace)`);
      continue;
    }
    const blockEnd = src.indexOf("\n  },\n", keyAt) + "\n  },\n".length;
    src = src.slice(0, keyAt) + src.slice(blockEnd);
  }
  const body = raw.split(/\n## Text\s*\n/)[1]?.split(/\n## /)[0] ?? "";
  const content = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith("### ") ? "## " + l.slice(4) : l));
  if (content.length < 5) {
    console.error(`${file}: för få stycken (${content.length})`);
    process.exit(2);
  }
  const linkLine = raw.match(/\*\*Internlänkar \(Hemsida lägger in[^)]*\):\*\*\s*(.+)/)?.[1] ?? "";
  const links = linkLine
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("/"))
    .map((to) => ({ to, label: linkLabel(to) }));
  const entry = `  ${js(slug)}: {
    title: ${js(title)},
    description:
      ${js(description)},
    content: [
${content.map((c) => `      ${js(c)},`).join("\n")}
    ],${links.length ? `
    links: [
${links.map((l) => `      { to: ${js(l.to)}, label: ${js(l.label)} },`).join("\n")}
    ],` : ""}
  },
`;
  const end = src.lastIndexOf("\n};");
  if (end < 0) {
    console.error("Hittar inte slutet av comboOverrides.");
    process.exit(2);
  }
  src = src.slice(0, end + 1) + entry + src.slice(end + 1);
  added++;
  console.log(`[import-combo] ${slug}: ${content.length} stycken`);
}
writeFileSync(f, src);
console.log(`[import-combo] ${added} sidor tillagda`);
