/**
 * "RegSO" är SCB:s namn på sina statistikområden och en kod som 0117R004 är en rå arbetsuppgift (Marknadschefen 2026-10-11, paket 49b-1).
 * En besökare vet inte vad det är. Fäller bygget om "RegSO" eller en områdeskod (fyra siffror, R, tre siffror) står i den synliga texten på någon byggd HTML-sida.
 * Skript- och stiltaggar räknas inte. Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });

const FRASER: [string, RegExp][] = [
  ["RegSO", /\bRegSO\b/],
  ["områdeskod (t.ex. 0117R004)", /\b\d{4}R\d{3}\b/],
];
const fel: string[] = [];
let sidor = 0;
if (existsSync("dist")) {
  for (const f of walk("dist")) {
    sidor++;
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const [namn, re] of FRASER) {
      const m = text.match(re);
      if (m) fel.push(`${f}: ${namn} ("${m[0]}")`);
    }
  }
}
if (fel.length) {
  console.error(`[check-regso] ${fel.length} träffar:\n  ` + fel.slice(0, 20).join("\n  "));
  process.exit(1);
}
console.log(`[check-regso] OK: varken RegSO eller områdeskoder i texten på ${sidor} byggda sidor`);
