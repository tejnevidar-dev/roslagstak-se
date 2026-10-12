/**
 * Kritisk CSS (paket 62): varje byggd sida som laddar huvudstilbladet ska ha (1) en inline <style data-kritisk-css> med minst 2 kB, (2) en icke-blockerande länk till stilbladet (media=print, onload, data-css-lazy)
 * och (3) en <noscript>-länk till samma stilblad, och inget blockerande <link rel="stylesheet"> till det. Annars väntar första målningen på hela stilbladet igen, eller så blir sidan ostylad utan JavaScript.
 * Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") ? [p] : [];
  });
if (!existsSync("dist")) {
  console.log("[check-kritisk-css] ingen dist-mapp: hoppar över");
  process.exit(0);
}
const fel: string[] = [];
let sidor = 0;
let utanStilblad = 0;
for (const f of walk("dist")) {
  const rel = relative("dist", f).split("\\").join("/");
  const h = readFileSync(f, "utf8");
  const utanNoscript = h.replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
  const lank = utanNoscript.match(/<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/g) ?? [];
  if (!lank.length) {
    utanStilblad++;
    continue;
  }
  sidor++;
  const lat = lank.filter((l) => /data-css-lazy/.test(l) && /media="print"/.test(l) && /onload=/.test(l));
  const blockerande = lank.filter((l) => !/media="print"/.test(l));
  const kritisk = h.match(/<style data-kritisk-css>([\s\S]*?)<\/style>/)?.[1] ?? "";
  if (lat.length !== 1) fel.push(`${rel}: ${lat.length} icke-blockerande stilbladslänkar (väntade 1)`);
  if (blockerande.length) fel.push(`${rel}: blockerande stilbladslänk kvar`);
  if (kritisk.length < 2000) fel.push(`${rel}: kritisk CSS saknas eller är under 2 kB (${kritisk.length} tecken)`);
  if (!/<noscript><link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"/.test(h)) fel.push(`${rel}: ingen noscript-länk till stilbladet`);
}
if (fel.length) {
  console.error(`[check-kritisk-css] ${fel.length} fel:\n  ` + fel.slice(0, 30).join("\n  "));
  process.exit(1);
}
console.log(`[check-kritisk-css] OK: ${sidor} sidor har kritisk CSS inline, ett icke-blockerande stilblad och en noscript-länk (${utanStilblad} utan stilblad)`);
