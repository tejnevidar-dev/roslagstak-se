/**
 * Engångskontroll (backlog 1cn, punkt a): JSON-LD i den byggda HTML:en för en sida per sidtyp. Läser dist/, parsar varje
 * ld+json-block och listar noder med tomma eller bristfälliga fält (Offer utan pris eller beskrivning, tomma listor,
 * tomma strängar). Kör efter bun run build:local. Kör: bun scripts/jsonld-sample.ts
 */
import { readFileSync, existsSync } from "node:fs";

const sidor = [
  "/index", "/takbyte-taby", "/takbyte-huddinge", "/tegeltak-bro", "/taklaggare-taby", "/taklaggare-grisslehamn", "/omraden/kusten",
  "/tjanster/takomlaggning", "/tjanster/takkupor", "/tjanster/taktvatt", "/material/betongpannor", "/projekt/takbyte-grisslehamn",
  "/blogg/jamfora-offerter-takbyte", "/takkontroll", "/takreparation", "/rot-avdrag", "/priser", "/offert/taby", "/brf", "/taktyper",
];
type Node = Record<string, unknown>;
const problem: string[] = [];
const walk = (n: unknown, path: string, sida: string, typ: string[]) => {
  if (Array.isArray(n)) {
    if (n.length === 0) problem.push(`${sida}: tom lista vid ${path}`);
    n.forEach((x, i) => walk(x, `${path}[${i}]`, sida, typ));
    return;
  }
  if (n && typeof n === "object") {
    const o = n as Node;
    const t = String(o["@type"] ?? "");
    if (t === "Offer" && !("price" in o) && !("priceSpecification" in o) && !("itemOffered" in o) && !("description" in o)) {
      problem.push(`${sida}: tom Offer vid ${path}`);
    }
    for (const [k, v] of Object.entries(o)) {
      if (v === "" || v === null || v === undefined) problem.push(`${sida}: tomt fält ${path}.${k}`);
      walk(v, `${path}.${k}`, sida, typ);
    }
  }
};
let kontrollerade = 0;
for (const s of sidor) {
  const f = `dist${s}.html`;
  if (!existsSync(f)) {
    problem.push(`${s}: filen saknas`);
    continue;
  }
  const h = readFileSync(f, "utf8");
  const block = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!block.length) problem.push(`${s}: ingen JSON-LD`);
  const typer: string[] = [];
  block.forEach((b, i) => {
    try {
      const j = JSON.parse(b);
      const noder = Array.isArray(j) ? j : j["@graph"] ? j["@graph"] : [j];
      for (const n of noder) typer.push(String((n as Node)["@type"]));
      walk(j, `ld${i}`, s, typer);
    } catch (e) {
      problem.push(`${s}: ogiltig JSON i block ${i}: ${(e as Error).message}`);
    }
  });
  kontrollerade++;
  console.log(`${s}: ${block.length} block, typer: ${[...new Set(typer)].join(", ")}`);
}
console.log(`\nKontrollerade sidor: ${kontrollerade}. Problem: ${problem.length}`);
for (const p of problem) console.log("  - " + p);
