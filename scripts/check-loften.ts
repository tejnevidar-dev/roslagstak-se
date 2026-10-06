/**
 * Löften vi inte kan hålla (Marknadschefen 2026-10-06): offertformuläret skickar inget mejl, så ingen text får lova
 * "inom 2 minuter", "kostnadsförslag på mail" eller "prisförslag direkt". Fäller bygget om frasen finns i källan (src)
 * eller i den byggda HTML-texten. Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const FRASER: [string, RegExp][] = [
  ["inom 2 minuter", /inom\s+2\s+min(?:uter)?\b/i],
  ["kostnadsförslag på mail/e-post", /kostnadsförslag\s+(?:direkt\s+)?på\s+(?:mail|e-post)/i],
  ["prisförslag direkt", /prisförslag\s+(?:på\s+[\wåäö\s]{0,30}?)?direkt/i],
];
const fel: string[] = [];

const walk = (d: string, ok: (f: string) => boolean, skipDir: (n: string) => boolean): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (skipDir(f) ? [] : walk(p, ok, skipDir)) : ok(f) ? [p] : [];
  });

// Källan: texter i src (regelfiler, tester och överstyrningar räknas inte), plus den statiska förrenderingen
const kallfiler = [...walk("src", (f) => /\.(tsx?|json)$/.test(f), (n) => /^(seo-regler|test|overrides|integrations)$/.test(n)), "scripts/prerender-content.ts"];
for (const f of kallfiler) {
  const text = readFileSync(f, "utf8");
  for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`${f}: "${namn}"`);
}

// Den byggda sidan
if (existsSync("dist")) {
  const html = walk("dist", (f) => f.endsWith(".html"), (n) => n === "assets" || n === "admin");
  for (const f of html) {
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
    for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`${f}: "${namn}"`);
  }
}

if (fel.length) {
  console.error(`[check-loften] FEL: löften som inte går att hålla (${fel.length}):`);
  for (const f of fel.slice(0, 20)) console.error("  - " + f);
  process.exit(1);
}
console.log("[check-loften] OK: inget löfte om 2 minuter, kostnadsförslag på mail eller prisförslag direkt");
