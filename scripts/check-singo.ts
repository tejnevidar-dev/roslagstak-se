/**
 * Singö är en ö och Grisslehamn en ort på Väddö (Marknadschefen 2026-10-11, paket 50): "Singö i Grisslehamn" och "på Singö, Grisslehamn" läses som att ön ligger i orten
 * och säger emot jobbet i Grisslehamn. Fäller bygget om frasen står i den byggda HTML-texten eller i källtexterna i src (regelfiler, tester och överstyrningslogg räknas inte).
 * Uppräkningar där Singö och Grisslehamn är två platser ("Singö, Grisslehamn, Arholma", "Vätö, Blidö, Singö, Grisslehamn och närområdet") går igenom.
 * Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const FRASER: [string, RegExp][] = [
  ["Singö i Grisslehamn", /Singö\s+i\s+Grisslehamn/i],
  ["på Singö, Grisslehamn", /\bpå\s+Singö,\s+Grisslehamn/i],
];
const walk = (d: string, ok: (f: string) => boolean, skipDir: (n: string) => boolean): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (skipDir(f) ? [] : walk(p, ok, skipDir)) : ok(f) ? [p] : [];
  });

const fel: string[] = [];
for (const f of walk("src", (n) => /\.(tsx?)$/.test(n), (n) => /^(seo-regler|test|overrides|integrations)$/.test(n))) {
  const text = readFileSync(f, "utf8");
  for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`${f}: "${namn}"`);
}
let sidor = 0;
if (existsSync("dist")) {
  for (const f of walk("dist", (n) => n.endsWith(".html"), () => false)) {
    sidor++;
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`${f}: "${namn}"`);
  }
}
if (fel.length) {
  console.error(`[check-singo] ${fel.length} träffar:\n  ` + fel.slice(0, 20).join("\n  "));
  process.exit(1);
}
console.log(`[check-singo] OK: ingen "Singö i Grisslehamn" i källan eller på ${sidor} byggda sidor`);
