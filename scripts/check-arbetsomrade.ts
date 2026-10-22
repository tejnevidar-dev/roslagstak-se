/**
 * Arbetsområdet har EN lydelse: "Roslagen och Storstockholm" (Marknadschefen 2026-10-11, paket 53b). "hela Roslagen", "hela Storstockholm" och "hela Österåker" läses som ett löfte
 * om allt, och sidan säger då emot sig själv. Fäller bygget om frasen står i den byggda HTML-texten (utom på startsidan, som byts i paket 52 och som står i UNDANTAG tills dess).
 * Körs i postbuild. Mälardalen berörs inte.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const FRASER: [string, RegExp][] = [
  ["hela Roslagen", /\bhela\s+Roslagen\b/i],
  ["hela Storstockholm", /\bhela\s+Storstockholm\b/i],
  ["hela Österåker", /\bhela\s+Österåker\b/i],
];
/** Gren 189: en mening som talar om var vi tar uppdrag, och "hela" följt av ett ortnamn eller ett platsord (kommunen, regionen, staden, området, länet). */
const UPPDRAGSMENING = /\buppdrag\b|^\s*Ja,\s+i\s+hela\b|\bverksamma\b|\barbetar\s+i\b/i;
const HELA_PLATS = /\bhela\s+(?:[A-ZÅÄÖ][\wåäöÅÄÖ-]+|kommunen|regionen|staden|området|länet)\b/;
/** Sidor som får ha frasen tills deras paket är släppt. Startsidan (index.html) byts i paket 52. */
const UNDANTAG = new Set<string>(["index.html"]);

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });

if (!existsSync("dist")) {
  console.log("[check-arbetsomrade] ingen dist-mapp: hoppar över");
  process.exit(0);
}
const fel: string[] = [];
let sidor = 0;
for (const f of walk("dist")) {
  const rel = relative("dist", f).replace(/\\/g, "/");
  if (UNDANTAG.has(rel)) continue;
  sidor++;
  const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
  for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`${rel}: "${namn}"`);
  // Gren 189: ingen uppdragsmening får lova "hela" en ort, kommun eller region ("Vi tar uppdrag i hela Täby", "Ja, i hela kommunen"). Rader utan uppdragsord (till exempel "hela taket") berörs inte.
  for (const mening of text.split(/(?<=[.?!])\s+/)) {
    if (!UPPDRAGSMENING.test(mening)) continue;
    const m = mening.match(HELA_PLATS);
    if (m) fel.push(`${rel}: "${m[0]}" i uppdragsmening: ${mening.trim().slice(0, 90)}`);
  }
}
if (fel.length) {
  console.error(`[check-arbetsomrade] ${fel.length} träffar:\n  ` + fel.slice(0, 30).join("\n  "));
  process.exit(1);
}
console.log(`[check-arbetsomrade] OK: ingen "hela Roslagen", "hela Storstockholm", "hela Österåker" och ingen annan "hela <plats>" i en uppdragsmening på ${sidor} byggda sidor (startsidan undantagen till paket 52)`);
