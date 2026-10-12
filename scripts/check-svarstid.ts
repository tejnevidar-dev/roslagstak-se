/**
 * Svarstiden skrivs "Svar inom 24 timmar" och aldrig "24 h" eller "24h" (Innehålls efterläsning 2026-10-12, E3), och takproblemsidornas
 * brasklapp "Vi påstår inte att det här projektet …" är borta (E5). Kontrollen läser både den byggda HTML-texten (serverns HTML) och källfilerna
 * i src/ (text som bara ritas av React finns inte i HTML:en). Körs i postbuild.
 *
 * UNDANTAG: startsidans hero (src/data/home-sections.ts och index.html) byts i paket 52 och står här tills dess.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const FRASER: [string, RegExp][] = [
  ["svarstiden som '24 h' eller '24h'", /\b(?:svar|återkoppling|svarar\s+vi)\s+inom\s+24\s?h\b/i],
  ["brasklappen 'Vi påstår inte'", /Vi\s+påstår\s+inte\s+att\s+det\s+här\s+projektet/i],
];
const UNDANTAG_HTML = new Set<string>(["index.html"]);
const UNDANTAG_KALLA = new Set<string>(["src/data/home-sections.ts"]);

const walk = (d: string, ext: string[]): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "test" || f === "node_modules" ? [] : walk(p, ext)) : ext.some((e) => f.endsWith(e)) ? [p] : [];
  });

const fel: string[] = [];
let html = 0;
let kallor = 0;
if (existsSync("dist")) {
  for (const f of walk("dist", [".html"])) {
    const rel = relative("dist", f).replace(/\\/g, "/");
    if (UNDANTAG_HTML.has(rel)) continue;
    html++;
    const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    for (const [namn, re] of FRASER) if (re.test(text)) fel.push(`dist/${rel}: ${namn}`);
  }
}
for (const f of walk("src", [".ts", ".tsx"])) {
  const rel = relative(".", f).replace(/\\/g, "/");
  if (UNDANTAG_KALLA.has(rel)) continue;
  kallor++;
  // Kommentarer (// och /* */) får nämna orden; kontrollen gäller texten som visas.
  const kod = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  for (const [namn, re] of FRASER) if (re.test(kod)) fel.push(`${rel}: ${namn}`);
}
if (fel.length) {
  console.error(`[check-svarstid] ${fel.length} träffar:\n  ` + fel.slice(0, 30).join("\n  "));
  process.exit(1);
}
console.log(`[check-svarstid] OK: ingen svarstid som "24 h" eller "24h" och ingen brasklapp "Vi påstår inte" på ${html} byggda sidor och i ${kallor} källfiler (startsidans hero undantagen till paket 52)`);
