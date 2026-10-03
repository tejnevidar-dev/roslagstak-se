/**
 * Ämnesmatris-täckning (SEO-programmet 2.45). Läser ledning/marknad/amnesmatris-2026-10.md (avsnitt 1),
 * kontrollerar att varje sida i en cell finns i dist/ och räknar vilka länkar som saknas mellan cellerna i samma rad.
 *
 * Regel (matrisens avsnitt 4): varje guide länkar till tjänstesidan i sin rad och till /priser eller /takkontroll.
 * Länkar läses ur den statiska HTML-spegeln i dist/ (brödsmulor räknas inte).
 *
 * Kör efter bygget: bun scripts/amnesmatris-tackning.ts [utfil.md]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MATRIS = resolve("../ledning/marknad/amnesmatris-2026-10.md");
const UT = resolve(process.argv[2] ?? "../ledning/marknad/amnesmatris-tackning-2026-10-04.md");

const text = readFileSync(MATRIS, "utf8");
const sec = text.split(/^## 1\./m)[1]?.split(/^## 2\./m)[0] ?? "";
const rows = sec.split("\n").filter((l) => l.startsWith("|") && !l.startsWith("|---"));
const header = rows.shift()!.split("|").slice(1, -1).map((s) => s.trim());

const PATH = /(?<![\w<.])\/[a-z0-9-]+(?:\/[a-z0-9-]+)*/g;
const fil = (p: string) => {
  const kand = [`dist${p}.html`, `dist${p}/index.html`];
  return kand.find(existsSync);
};
const normal = (h: string) => h.replace(/[?#].*$/, "").replace(/^https?:\/\/(www\.)?roslagstak\.se/, "").replace(/\/$/, "") || "/";
const lankar = (p: string): Set<string> => {
  const f = fil(p);
  if (!f) return new Set();
  const html = readFileSync(f, "utf8").replace(/<nav aria-label="Brödsmulor"[\s\S]*?<\/nav>/, "");
  return new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => normal(m[1])).filter((h) => h.startsWith("/")));
};

type Sida = { path: string; kolumn: string };
const ut: string[] = [];
let sidor = 0, saknasSida = 0, regelBrott = 0, par = 0, parOk = 0;
const lucka: string[] = [];

for (const rad of rows) {
  const celler = rad.split("|").slice(1, -1).map((s) => s.trim());
  const tjanst = celler[0];
  const pages: Sida[] = [];
  celler.slice(1).forEach((c, i) => {
    if (/^\*\*LUCKA|^–/.test(c) && !c.match(PATH)) return;
    for (const m of c.matchAll(PATH)) if (!m[0].includes("/*")) pages.push({ path: m[0], kolumn: header[i + 1] });
  });
  const unika = [...new Map(pages.map((p) => [p.path, p])).values()];
  const finns = unika.filter((p) => fil(p.path) || p.path === "/takproblem");
  const saknas = unika.filter((p) => !finns.includes(p));
  sidor += finns.length;
  saknasSida += saknas.length;

  const tjanstesidor = unika.filter((p) => p.kolumn === "Tjänstesida").map((p) => p.path);
  const guider = finns.filter((p) => p.path.startsWith("/blogg/"));
  const rad_ut: string[] = [];
  for (const g of guider) {
    const l = lankar(g.path);
    const tillTjanst = tjanstesidor.filter((t) => fil(t)).some((t) => l.has(t));
    const tillPris = l.has("/priser") || l.has("/takkontroll");
    if (tjanstesidor.some((t) => fil(t)) && !tillTjanst) { rad_ut.push(`${g.path} (${g.kolumn}): länkar inte till tjänstesidan (${tjanstesidor.join(", ")})`); regelBrott++; }
    if (!tillPris) { rad_ut.push(`${g.path} (${g.kolumn}): länkar varken till /priser eller /takkontroll`); regelBrott++; }
  }
  // Parvis täckning: länkar sidan till övriga sidor i raden?
  for (const a of finns) {
    const l = lankar(a.path);
    for (const b of finns) {
      if (a === b) continue;
      par++;
      if (l.has(b.path)) parOk++;
    }
  }
  ut.push(`### ${tjanst}`);
  ut.push(`Sidor i raden som finns i bygget: ${finns.length}${saknas.length ? `, **finns inte i dist: ${saknas.map((s) => s.path).join(", ")}**` : ""}.`);
  ut.push(rad_ut.length ? rad_ut.map((s) => `- ${s}`).join("\n") : "- Alla guider länkar till tjänstesidan och till /priser eller /takkontroll.");
  ut.push("");
  for (const t of rad_ut) lucka.push(`${tjanst}: ${t}`);
}

const head = [
  `# Ämnesmatris: täckning (2.45), Hemsida & SEO ${new Date().toISOString().slice(0, 10)}`,
  "",
  `Maskinräknat av \`scripts/amnesmatris-tackning.ts\` mot dist/ och \`${"amnesmatris-2026-10.md"}\`. Länkar läses ur den statiska HTML-spegeln (utan brödsmulor). Sidor som bara visas av React (t.ex. länkblock som inte finns i spegeln) räknas inte, så siffrorna är en golvnivå.`,
  "",
  `- Sidor som matrisen pekar ut och som finns i bygget: **${sidor}**; pekas ut men finns inte: **${saknasSida}**.`,
  `- Regelbrott (guide utan länk till tjänstesidan i sin rad, eller utan /priser eller /takkontroll): **${regelBrott}**.`,
  `- Parvisa länkar mellan sidor i samma rad: **${parOk} av ${par}** finns (${par ? Math.round((100 * parOk) / par) : 0} %). Det är inte ett mål att nå 100 %; regeln är bara guide → tjänstesida och guide → /priser eller /takkontroll.`,
  "",
  "## Per rad",
  "",
];
writeFileSync(UT, head.concat(ut).join("\n") + "\n");
console.log(`[amnesmatris] ${sidor} sidor, ${saknasSida} saknas i dist, ${regelBrott} regelbrott, parvis ${parOk}/${par}`);
for (const l of lucka) console.log("  - " + l);
