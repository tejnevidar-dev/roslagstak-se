/**
 * Rå markdown i den byggda sidan (Marknadschefen W1, 2026-10-07): "[prissidan](/priser)" stod som kod i den statiska HTML:ens
 * FAQ-svar på 222 ortssidor. Fäller bygget om synlig text eller JSON-LD i någon HTML-fil i dist innehåller [text](länk) eller **fet**.
 * Rätt: länken ligger i länklistan, texten och schemat är rena (stripInlineMd). Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MARKDOWN: [string, RegExp][] = [
  ["[text](länk)", /\[[^\]\n]{1,200}\]\((?:\/|https?:|#|mailto:|tel:)[^)\s]*\)/],
  ["**fet**", /\*\*[^*\n]{1,200}\*\*/],
];

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) return f === "assets" || f === "admin" ? [] : walk(p);
    return f.endsWith(".html") ? [p] : [];
  });

if (!existsSync("dist")) {
  console.log("[check-ra-markdown] ingen dist, hoppar över");
  process.exit(0);
}

const fel: string[] = [];
for (const f of walk("dist")) {
  const html = readFileSync(f, "utf8");
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  const synlig = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  for (const [namn, re] of MARKDOWN) {
    const t = synlig.match(re);
    if (t) fel.push(`${f}: ${namn} i synlig text: "${t[0].slice(0, 80)}"`);
    const s = jsonLd.match(re);
    if (s) fel.push(`${f}: ${namn} i JSON-LD: "${s[0].slice(0, 80)}"`);
  }
}

if (fel.length) {
  console.error(`[check-ra-markdown] FEL: rå markdown i ${new Set(fel.map((x) => x.split(":")[0])).size} sidor (${fel.length} träffar):`);
  for (const x of fel.slice(0, 20)) console.error("  - " + x);
  if (fel.length > 20) console.error(`  … och ${fel.length - 20} till`);
  process.exit(1);
}
console.log("[check-ra-markdown] OK: ingen rå markdown i synlig text eller JSON-LD");
