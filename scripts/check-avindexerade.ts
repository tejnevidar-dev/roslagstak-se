/**
 * Avindexerade sidor (paket 42, Vidars ja 2026-10-11): sex guider (src/data/avindexerade-guider.ts) och /taklaggare-finnhamn (src/data/avindexerade-orter.ts).
 * Fäller bygget om
 *   1. någon av dem inte har robots "noindex, follow" i sin byggda HTML,
 *   2. någon av dem står i sajtkartan (dist/sitemap.xml),
 *   3. någon byggd sida som själv är indexerbar länkar till någon av dem.
 * Sidorna finns kvar på sina adresser; noindex-sidor får länka till dem (de är inte indexerade). Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { avindexeradeGuidevagar } from "../src/data/avindexerade-guider";
import { avindexeradeOrtsvagar } from "../src/data/avindexerade-orter";

const mal = [...avindexeradeGuidevagar(), ...avindexeradeOrtsvagar()];
const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });
const robotsAv = (html: string): string => html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? "";
const fel: string[] = [];

if (!existsSync("dist")) {
  console.log("[check-avindexerade] ingen dist-mapp: hoppar över");
  process.exit(0);
}
const filFor = (path: string) => join("dist", path.replace(/^\//, "") + ".html");

// 1. noindex, follow på sidorna själva
for (const path of mal) {
  const f = filFor(path);
  if (!existsSync(f)) { fel.push(`${path}: ingen byggd sida (${f})`); continue; }
  const r = robotsAv(readFileSync(f, "utf8"));
  if (!/noindex/i.test(r) || /nofollow/i.test(r)) fel.push(`${path}: robots är "${r}", ska vara "noindex, follow"`);
}

// 2. sajtkartan
const sitemap = existsSync("dist/sitemap.xml") ? readFileSync("dist/sitemap.xml", "utf8") : "";
for (const path of mal) if (sitemap.includes(`<loc>https://roslagstak.se${path}</loc>`)) fel.push(`${path}: står i sajtkartan`);

// 3. indexerbara sidor som länkar dit
let indexerbara = 0;
const maltSet = new Set(mal);
for (const f of walk("dist")) {
  const html = readFileSync(f, "utf8");
  if (/noindex/i.test(robotsAv(html))) continue;
  indexerbara++;
  const sid = "/" + relative("dist", f).replace(/\\/g, "/").replace(/\.html$/, "");
  const kropp = html.replace(/<script[\s\S]*?<\/script>/gi, " ");
  for (const m of kropp.matchAll(/href="([^"#?]+)[^"]*"/g)) {
    const h = m[1].replace(/\/$/, "");
    if (maltSet.has(h)) fel.push(`${sid}: länkar till ${h}`);
  }
}

if (fel.length) {
  console.error(`[check-avindexerade] ${fel.length} fel:\n  ` + fel.slice(0, 30).join("\n  "));
  process.exit(1);
}
console.log(`[check-avindexerade] OK: ${mal.length} avindexerade sidor är noindex, follow, saknas i sajtkartan och länkas inte från de ${indexerbara} indexerbara sidorna`);
