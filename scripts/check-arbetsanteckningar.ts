/**
 * Arbetsanteckningar får inte synas för besökaren (Marknadschefen 2026-10-11, paket 49b-2). Fraser som "ej belagd", "inte belagt", "ej verifierad", "PDF:en ej öppnad"
 * och "anges inte i källan" säger vad vi inte vet eller inte har kontrollerat, och är skrivna för oss. Fäller bygget om någon av dem står i den synliga texten på en
 * byggd HTML-sida. Skript- och stiltaggar räknas inte. Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });

const FRASER: [string, RegExp][] = [
  ["ej belagd/belagt", /\bej\s+belag[dt]/i],
  ["inte belagd/belagt", /\binte\s+belag[dt]/i],
  ["ej verifierad", /\bej\s+verifierad/i],
  ["PDF:en", /\bPDF:en\b/],
  ["anges inte i käll…", /\banges\s+inte\s+i\s+käll/i],
];
const fel: string[] = [];
let sidor = 0;
if (existsSync("dist")) {
  for (const f of walk("dist")) {
    sidor++;
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const [namn, re] of FRASER) {
      const m = text.match(re);
      if (m) fel.push(`${f}: "${m[0]}" (${namn})`);
    }
  }
}
if (fel.length) {
  console.error(`[check-arbetsanteckningar] ${fel.length} träffar:\n  ` + fel.slice(0, 30).join("\n  "));
  process.exit(1);
}
console.log(`[check-arbetsanteckningar] OK: inga arbetsanteckningar i texten på ${sidor} byggda sidor`);
