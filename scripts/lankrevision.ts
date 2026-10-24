/**
 * Länkrevision över hela den byggda sajten (gren 205): läser dist/ (förrenderad HTML), dist/_redirects och dist/sitemap.xml och rapporterar
 *  1. interna länkar till adresser som ompekas med 301 (med mål), grupperade per mål,
 *  2. interna länkar till adresser som ger 404,
 *  3. omdirigeringskedjor (ett 301-mål som själv ompekas) och mål som ger 404,
 *  4. klickdjup från startsidan (BFS över länkar mellan sidor): ägarsidorna (kommunernas /taklaggare-sidor) ska ligga inom 3 klick,
 *  5. sidor i sajtkartan som har noindex, och sidor som ompekas men står i sajtkartan.
 * Läser bara. Förrenderingen saknar länkblock som bara React ritar (sidokolumner och länkrutor), men de byggs ur samma data med samma filter för ompekade adresser (arOmpekad), så fynd här gäller även dem.
 *
 * Körning: bun scripts/lankrevision.ts --dist=<dist> [--ut=<fil.md>] [--json=<fil.json>]
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const arg = (n: string, d: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const dist = resolve(arg("dist", "dist"));
const utMd = arg("ut", "");
const utJson = arg("json", "");

// ---------- 1. sidor ----------
const filer: string[] = [];
const walk = (d: string) => {
  for (const e of readdirSync(d)) {
    const f = join(d, e);
    if (statSync(f).isDirectory()) walk(f);
    else filer.push(f);
  }
};
walk(dist);
const rel = (f: string) => f.slice(dist.length).replace(/\\/g, "/");
const sidaAv = (r: string): string | null => {
  if (!r.endsWith(".html")) return null;
  if (r === "/index.html") return "/";
  if (/^\/(404|admin)\.html$/.test(r)) return null;
  if (r.endsWith("/index.html")) return r.slice(0, -"/index.html".length) || "/";
  return r.slice(0, -".html".length);
};
const sidor = new Map<string, string>(); // url -> fil
for (const f of filer) {
  const u = sidaAv(rel(f));
  if (u) sidor.set(u, f);
}
const tillgangar = new Set(filer.map(rel)); // filer som inte är sidor (bilder, js ...)

// ---------- 2. omdirigeringar (som Cloudflare Pages: första träffen, platshållare sist) ----------
const regler = readFileSync(join(dist, "_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => r.split(/\s+/) as [string, string, string]);
const omdirigera = (path: string): string | null => {
  for (const [k, m] of regler) {
    if (k.endsWith("*")) {
      const p = k.slice(0, -1);
      if (path.startsWith(p)) return m.replace(":splat", path.slice(p.length));
    } else if (k === path) return m;
  }
  return null;
};
/** 200 om sidan finns, 301 med slutmål och kedjelängd, annars 404. */
const lös = (path: string): { status: 200 | 301 | 404; mal?: string; hopp: number } => {
  let p = path;
  let hopp = 0;
  while (hopp < 6) {
    const o = omdirigera(p);
    if (o) {
      p = o.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      hopp++;
      continue;
    }
    break;
  }
  if (hopp === 0) return sidor.has(path) || tillgangar.has(path) ? { status: 200, hopp } : { status: 404, hopp };
  return sidor.has(p) || tillgangar.has(p) ? { status: 301, mal: p, hopp } : { status: 404, mal: p, hopp };
};

// ---------- 3. länkar ----------
type Lank = { fran: string; till: string };
const lankar: Lank[] = [];
const robotsNoindex = new Map<string, boolean>();
const lankarFran = new Map<string, Set<string>>();
for (const [url, fil] of sidor) {
  const html = readFileSync(fil, "utf8");
  robotsNoindex.set(url, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html));
  const body = html.replace(/<head[\s\S]*?<\/head>/, " ");
  const set = new Set<string>();
  for (const m of body.matchAll(/<a\s[^>]*href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const till = m[1].replace(/\/$/, "") || "/";
    if (till.startsWith("//")) continue;
    set.add(till);
  }
  lankarFran.set(url, set);
  for (const t of set) lankar.push({ fran: url, till: t });
}

// ---------- 4. fynd ----------
const tillOmpekad = new Map<string, { mal: string; kallor: string[] }>();
const till404 = new Map<string, string[]>();
for (const { fran, till } of lankar) {
  const r = lös(till);
  if (r.status === 301) {
    const e = tillOmpekad.get(till) ?? { mal: r.mal!, kallor: [] };
    e.kallor.push(fran);
    tillOmpekad.set(till, e);
  } else if (r.status === 404) till404.set(till, [...(till404.get(till) ?? []), fran]);
}
// kedjor och mål som ger 404, över alla exakta regler
const kedjor: { kalla: string; mal: string; slutmal: string; hopp: number }[] = [];
const dodaMal: { kalla: string; mal: string }[] = [];
for (const [k, m] of regler) {
  if (k.endsWith("*") || m.includes(":splat")) continue;
  const mal = m.split("#")[0].replace(/\/$/, "") || "/";
  const r = lös(mal);
  if (r.status === 301) kedjor.push({ kalla: k, mal, slutmal: r.mal!, hopp: r.hopp });
  else if (r.status === 404) dodaMal.push({ kalla: k, mal });
}
// sajtkartan
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const smUrl = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => (m[1] || "/").replace(/\/$/, "") || "/");
const smNoindex = smUrl.filter((u) => robotsNoindex.get(u));
const smOmpekad = smUrl.filter((u) => lös(u).status === 301);
const smSaknas = smUrl.filter((u) => !sidor.has(u) && lös(u).status !== 200);

// klickdjup: BFS över länkar till sidor som finns (en länk till en ompekad adress räknas inte som klick)
const djup = new Map<string, number>([["/", 0]]);
const kö: string[] = ["/"];
while (kö.length) {
  const u = kö.shift()!;
  for (const t of lankarFran.get(u) ?? []) if (sidor.has(t) && !djup.has(t)) { djup.set(t, djup.get(u)! + 1); kö.push(t); }
}
const AGARSIDOR = [...new Set(smUrl.filter((u) => /^\/taklaggare-/.test(u)))];
const kommunAgare = ["norrtalje", "akersberga", "vallentuna", "taby", "danderyd", "vaxholm", "lidingo", "stockholm", "solna", "sundbyberg", "sollentuna", "upplands-vasby", "jarfalla", "nacka", "huddinge", "sigtuna", "marsta", "upplands-bro", "bro", "kungsangen", "varmdo", "haninge", "tyreso", "botkyrka", "tumba", "ekero", "nynashamn"].map((s) => `/taklaggare-${s}`);
const kommunDjup = kommunAgare.map((u) => ({ u, d: djup.get(u) ?? null }));
const alla = AGARSIDOR.map((u) => ({ u, d: djup.get(u) ?? null }));
const maxDjup = (l: { d: number | null }[]) => Math.max(...l.map((x) => (x.d === null ? 99 : x.d)));
const fordelning: Record<string, number> = {};
for (const { d } of alla) fordelning[d === null ? "oåtkomlig" : String(d)] = (fordelning[d === null ? "oåtkomlig" : String(d)] ?? 0) + 1;

console.log(`[lankrevision] ${sidor.size} sidor, ${lankar.length} interna länkar, ${regler.length} regler`);
console.log(`[lankrevision] länkar till ompekade adresser: ${tillOmpekad.size} olika adresser (${[...tillOmpekad.values()].reduce((a, b) => a + b.kallor.length, 0)} länkar)`);
console.log(`[lankrevision] länkar till 404: ${till404.size} adresser`);
console.log(`[lankrevision] kedjor: ${kedjor.length}, regler med 404-mål: ${dodaMal.length}`);
console.log(`[lankrevision] sajtkartan: ${smUrl.length} adresser, noindex ${smNoindex.length}, ompekade ${smOmpekad.length}, saknas ${smSaknas.length}`);
console.log(`[lankrevision] klickdjup, kommunernas ägarsidor (${kommunDjup.length}): störst ${maxDjup(kommunDjup)}; alla ortssidor: ${JSON.stringify(fordelning)}`);

if (utMd) {
  const per = (m: Map<string, { mal: string; kallor: string[] }>) => [...m.entries()].sort((a, b) => b[1].kallor.length - a[1].kallor.length);
  const md = [
    `# Länkrevision, hela sajten (gren 205)`,
    "",
    `Genererad av \`scripts/lankrevision.ts\` mot en kopia av bygget. ${sidor.size} förrenderade sidor, ${lankar.length} unika interna länkar (en per sida och mål), ${regler.length} omdirigeringsregler, ${smUrl.length} adresser i sajtkartan. Förrenderingen saknar länkblock som bara React ritar (sidokolumner, länkrutor), men de byggs ur samma data och filtreras med samma lista över ompekade adresser (\`arOmpekad\`).`,
    "",
    "## Sammanfattning",
    "| Kontroll | Resultat |",
    "|---|---|",
    `| Interna länkar till adresser som ompekas med 301 | **${tillOmpekad.size}** adresser, ${[...tillOmpekad.values()].reduce((a, b) => a + b.kallor.length, 0)} länkar |`,
    `| Interna länkar till adresser som ger 404 | **${till404.size}** adresser |`,
    `| Omdirigeringskedjor (301-mål som själv ompekas) | **${kedjor.length}** |`,
    `| Omdirigeringar vars mål ger 404 | **${dodaMal.length}** |`,
    `| Sidor i sajtkartan med noindex | **${smNoindex.length}** av ${smUrl.length} |`,
    `| Adresser i sajtkartan som ompekas | **${smOmpekad.length}** |`,
    `| Adresser i sajtkartan som saknas i bygget | **${smSaknas.length}** |`,
    `| Klickdjup för kommunernas ägarsidor (${kommunDjup.length} st) | störst **${maxDjup(kommunDjup)}** klick |`,
    `| Klickdjup för alla ortssidor (/taklaggare-…, ${alla.length} st) | ${Object.entries(fordelning).map(([k, v]) => `${k}: ${v}`).join(", ")} |`,
    "",
    `## 1. Länkar till ompekade adresser (${tillOmpekad.size})`,
    per(tillOmpekad).length ? "| Länkad adress | Pekas om till | Antal länkar | Exempel på källsidor |\n|---|---|---:|---|\n" + per(tillOmpekad).slice(0, 80).map(([a, e]) => `| ${a} | ${e.mal} | ${e.kallor.length} | ${e.kallor.slice(0, 3).join(", ")} |`).join("\n") : "Inga.",
    "",
    `## 2. Länkar till adresser som ger 404 (${till404.size})`,
    till404.size ? "| Länkad adress | Antal länkar | Exempel på källsidor |\n|---|---:|---|\n" + [...till404.entries()].slice(0, 80).map(([a, k]) => `| ${a} | ${k.length} | ${k.slice(0, 3).join(", ")} |`).join("\n") : "Inga.",
    "",
    `## 3. Omdirigeringskedjor och döda mål`,
    kedjor.length ? "| Källa | Mål | Slutmål | Hopp |\n|---|---|---|---:|\n" + kedjor.slice(0, 80).map((k) => `| ${k.kalla} | ${k.mal} | ${k.slutmal} | ${k.hopp} |`).join("\n") : "Inga kedjor.",
    dodaMal.length ? "\n| Källa | Mål som ger 404 |\n|---|---|\n" + dodaMal.map((k) => `| ${k.kalla} | ${k.mal} |`).join("\n") : "",
    "",
    `## 4. Klickdjup från startsidan`,
    "Kommunernas ägarsidor:",
    "",
    "| Ägarsida | Klick från startsidan |",
    "|---|---:|",
    ...kommunDjup.map((x) => `| ${x.u} | ${x.d === null ? "**oåtkomlig**" : x.d} |`),
    "",
    `Alla ortssidor: ${Object.entries(fordelning).map(([k, v]) => `${k} klick: ${v}`).join(", ")}.`,
    alla.filter((x) => x.d === null || x.d > 3).length ? "\nOrtssidor över 3 klick eller oåtkomliga: " + alla.filter((x) => x.d === null || x.d > 3).map((x) => `${x.u} (${x.d ?? "oåtkomlig"})`).slice(0, 60).join(", ") : "\nInga ortssidor ligger djupare än 3 klick.",
    "",
    `## 5. Sajtkartan`,
    smNoindex.length ? "Noindex i sajtkartan: " + smNoindex.slice(0, 60).join(", ") : "Inga sidor i sajtkartan har noindex.",
    smOmpekad.length ? "\nOmpekade adresser i sajtkartan: " + smOmpekad.slice(0, 60).join(", ") : "\nInga ompekade adresser i sajtkartan.",
    smSaknas.length ? "\nAdresser i sajtkartan som saknas: " + smSaknas.slice(0, 60).join(", ") : "\nAlla adresser i sajtkartan finns i bygget.",
    "",
  ].join("\n");
  writeFileSync(utMd, md);
}
if (utJson) writeFileSync(utJson, JSON.stringify({ tillOmpekad: [...tillOmpekad], till404: [...till404], kedjor, dodaMal, smNoindex, smOmpekad, smSaknas, kommunDjup }, null, 1));
void existsSync;
