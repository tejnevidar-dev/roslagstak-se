/**
 * Interna filnamn får inte synas för besökaren (Marknadschefen 2026-10-11, paket 49): "alla.csv" och andra .csv-namn är vårt eget arbetsunderlag.
 * Fäller bygget om ett .csv-namn står i den byggda HTML-texten (alla sidor i dist). Körs i postbuild.
 * Träffar i skripttaggar och stilar räknas inte, bara text som en besökare eller sökmotor läser.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });

const fel: string[] = [];
let sidor = 0;
if (existsSync("dist")) {
  for (const f of walk("dist")) {
    sidor++;
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    const m = text.match(/[\w.-]*\.csv\b/i);
    if (m) fel.push(`${f}: "${m[0]}"`);
  }
}
if (fel.length) {
  console.error(`[check-csv] ${fel.length} sidor visar ett internt .csv-namn:\n  ` + fel.slice(0, 20).join("\n  "));
  process.exit(1);
}
console.log(`[check-csv] OK: inget .csv-namn i texten på ${sidor} byggda sidor`);
