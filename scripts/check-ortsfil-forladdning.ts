/**
 * Gren 218 (SEO-revision C2): varje ortssida (/taklaggare-<slug>) och varje tjänst × ort-sida som har en egen datafil (assets/<stam>-<hash>.js) förladdar den med modulepreload i den statiska headen,
 * så att datafilen inte hämtas först efter sidkomponenten (en extra nätverksrunda med tom skärm). Kontrollen läser dist/ efter bygget. Körs i postbuild.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve(process.argv[2] ?? "dist");
if (!existsSync(resolve(dist, "assets"))) {
  console.log("[check-ortsfil-forladdning] hoppar över: dist/assets saknas");
  process.exit(0);
}
const assets = readdirSync(resolve(dist, "assets"));
const COMBO_RE = /^(takbyte|takrenovering|takomlaggning|bandtackning|platttak|betongpannor|tegeltak|takmalning|taktvatt)-/;
const filFor = (stam: string) => assets.find((f) => f.startsWith(`${stam}-`) && f.endsWith(".js") && f.length === stam.length + 1 + 8 + 3);

let kontrollerade = 0, utanDatafil = 0;
const saknas: string[] = [];
for (const f of readdirSync(dist)) {
  if (!f.endsWith(".html")) continue;
  const namn = f.slice(0, -5);
  const stam = namn.startsWith("taklaggare-") ? namn.slice("taklaggare-".length) : COMBO_RE.test(namn) ? namn : null;
  if (!stam) continue;
  const fil = filFor(stam);
  if (!fil) { utanDatafil++; continue; }
  kontrollerade++;
  const html = readFileSync(resolve(dist, f), "utf8");
  if (!html.includes(`<link rel="modulepreload" crossorigin href="/assets/${fil}" />`)) saknas.push(`${f} (${fil})`);
}
// BRF-sidornas komponentfil (BrfPage- och BrfLocationPage-) förladdas på /brf och /brf/<ort> (gren 230, P1-8)
const brfFil = (prefix: string) => assets.find((f) => f.startsWith(prefix) && f.endsWith(".js"));
let brfKontrollerade = 0;
for (const [fil, prefix] of [["brf.html", "BrfPage-"], ...(existsSync(resolve(dist, "brf")) ? readdirSync(resolve(dist, "brf")).filter((f) => f.endsWith(".html")).map((f) => [`brf/${f}`, "BrfLocationPage-"]) : [])] as [string, string][]) {
  const chunk = brfFil(prefix);
  if (!chunk || !existsSync(resolve(dist, fil))) continue;
  brfKontrollerade++;
  if (!readFileSync(resolve(dist, fil), "utf8").includes(`href="/assets/${chunk}"`)) saknas.push(`${fil} (${chunk})`);
}
if (saknas.length) {
  console.error(`[check-ortsfil-forladdning] FEL: ${saknas.length} sidor saknar modulepreload för sin datafil, till exempel ${saknas.slice(0, 5).join(", ")}`);
  process.exit(1);
}
if (kontrollerade < 100) {
  console.error(`[check-ortsfil-forladdning] FEL: bara ${kontrollerade} sidor med datafil hittades (förväntat över 300), något stämmer inte i namngivningen`);
  process.exit(1);
}
console.log(`[check-ortsfil-forladdning] OK: ${kontrollerade} sidor förladdar sin datafil, ${utanDatafil} mallsidor utan egen datafil, ${brfKontrollerade} BRF-sidor förladdar sin komponent`);
