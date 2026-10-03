/**
 * Importskript för problemtexter (ledning/marknad/innehall/problemtexter/<slug>.md, ```ts-block i
 * problems.ts-format) → src/data/problems.ts. Hela objekten tas över ordagrant. Bara briefar med raden
 * "**Grind:** GODKÄND ..." byggs (regel: en brief utan Grind-rad byggs aldrig). Meningsgrinden
 * (content-coverage-check.ts) kontrollerar sedan varje mening. Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-problem.ts <brief.md>...
 * Slugs som redan finns i problems.ts hoppas över.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const files = process.argv.slice(2).filter((a) => a.endsWith(".md"));
if (!files.length) {
  console.error("Användning: bun scripts/import-problem.ts <brief.md>...");
  process.exit(2);
}
const f = resolve("src/data/problems.ts");
let src = readFileSync(f, "utf8");
let added = 0;

for (const file of files) {
  const raw = readFileSync(resolve(file), "utf8").replace(/\r/g, "");
  if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw)) {
    console.error(`${file}: saknar raden "**Grind:** GODKÄND ...", byggs inte`);
    process.exit(1);
  }
  const block = raw.match(/```ts\n([\s\S]*?)```/)?.[1];
  if (!block) {
    console.error(`${file}: hittar inget ts-block`);
    process.exit(2);
  }
  const slugs = [...block.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
  const fresh = slugs.filter((s) => !src.includes(`slug: "${s}"`));
  if (fresh.length !== slugs.length) {
    console.warn(`${file}: ${slugs.length - fresh.length} av ${slugs.length} slugs finns redan, hoppar över filen`);
    continue;
  }
  const at = src.indexOf("export const getProblem");
  const end = at < 0 ? -1 : src.lastIndexOf("];", at) - 1;
  if (end < 0) {
    console.error("Hittar inte slutet av problems-listan.");
    process.exit(2);
  }
  src = src.slice(0, end + 1) + block + src.slice(end + 1);
  added += slugs.length;
  console.log(`[import-problem] ${slugs.join(", ")}`);
}
writeFileSync(f, src);
console.log(`[import-problem] ${added} problemsidor tillagda`);
