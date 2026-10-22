/**
 * Genererar src/data/ompekade.ts: de exakta adresser (tjänst × ort) som public/_redirects pekar om med 301 (raderna efter kommentaren "# Ompekning (gren 129").
 * Sajtens egna länklistor (LocationPage.tsx, ServiceLocationPage.tsx och scripts/prerender-content.ts) visar ingen länk till en adress i listan, så att inga interna länkar går via ett 301-hopp.
 * Provet src/test/ompekade-lankar.test.ts kräver att filen stämmer med _redirects. Körs: bun scripts/generera-ompekade.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const rader = readFileSync("public/_redirects", "utf8").split(/\r?\n/);
const start = rader.findIndex((r) => r.startsWith("# Ompekning (gren 129"));
if (start < 0) throw new Error("kommentaren '# Ompekning (gren 129' hittades inte i public/_redirects");
const kallor = rader
  .slice(start)
  .map((r) => r.trim())
  .filter((r) => /^\/[a-z0-9-]+ \/\S* 301$/.test(r))
  .map((r) => r.split(" ")[0])
  .sort();
if (new Set(kallor).size !== kallor.length) throw new Error("dubbletter bland källorna");
const ut = `/**
 * Exakta adresser som public/_redirects pekar om med 301 (gren 129, rad 21). Genererad av scripts/generera-ompekade.ts, ändra inte för hand.
 * Länklistorna i sajten visar ingen länk till dem (LocationPage.tsx, ServiceLocationPage.tsx, scripts/prerender-content.ts), så att inga interna länkar går via ett omdirigeringshopp.
 * Bara relativa importer.
 */
export const OMPEKADE: ReadonlySet<string> = new Set([
${kallor.map((k) => `  "${k}",`).join("\n")}
]);

/**
 * Gren 195b (Vidars ja 2026-10-22 07:47): takmålningssidorna (/takmalning-<ort>) pekas om med en platshållarregel i _redirects (/takmalning-* → /taklaggare-:splat), så ingen intern länk får gå dit.
 * Prefixet gäller alla adresser på formen, även dem som inte står som exakta rader.
 */
export const OMPEKADE_PREFIX: readonly string[] = ["/takmalning-"];

export const arOmpekad = (href: string): boolean => OMPEKADE.has(href) || OMPEKADE_PREFIX.some((p) => href.startsWith(p));
`;
writeFileSync("src/data/ompekade.ts", ut);
console.log(`skrev src/data/ompekade.ts med ${kallor.length} adresser`);
