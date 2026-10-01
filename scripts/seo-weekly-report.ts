/**
 * Veckovis SEO observability-rapport (SEO-programmet, Marknadschefens steg 13).
 * Kör hela kvalitetskedjan och skriver EN samlad rapport till ledning/marknad/seo-vecka.md:
 *  - index-täckning: sitemap.xml mot faktiska routes (check-sitemap.ts, statiskt + valfritt --live)
 *  - titel-/meta-dubbletter: två olika URL:er som råkat få samma <title> eller meta description
 *  - tunna sidor: thin-content-check.ts (sidor helt utan prerenderat innehåll)
 *  - trasiga länkar: link-audit.ts (orphans, trasiga internlänkar)
 *  - schemafel: validate-structured-data.mjs
 *  - innehållsdjup: content-depth-check.ts (ordantal + nära-dubbletter per sidtyp)
 *  - nya sidor sedan senaste rapporten: diff mot en sparad snapshot
 *  - GSC (Google Search Console): väntar på åtkomst, se ads/24-underlaget — inga riktiga
 *    sökdata kopplas in förrän Vidar delat GSC-åtkomst.
 *
 * Kör: bun scripts/seo-weekly-report.ts [--live]
 * Skriver: ledning/marknad/seo-vecka.md (skrivs över varje körning; historik i git-loggen)
 *          ledning/marknad/.seo-vecka-snapshot.json (sitemap-URL:er, för nästa körnings diff)
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { prerenderContent } from "./prerender-content";

const LIVE = process.argv.includes("--live");
const REPORT_PATH = resolve("../ledning/marknad/seo-vecka.md");
const SNAPSHOT_PATH = resolve("../ledning/marknad/.seo-vecka-snapshot.json");
const today = new Date().toISOString().slice(0, 10);

const run = (cmd: string): { ok: boolean; output: string } => {
  try {
    const output = execSync(cmd, { encoding: "utf8", stdio: "pipe" });
    return { ok: true, output };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message: string };
    return { ok: false, output: (err.stdout ?? "") + (err.stderr ?? err.message) };
  }
};

/* ---------- 1. index coverage (check-sitemap.ts) ---------- */
const sitemapCheck = run(`bun scripts/check-sitemap.ts${LIVE ? " --live" : ""}`);

/* ---------- 2. titel-/meta-dubbletter ---------- */
const sitemapXml = readFileSync(resolve("public/sitemap.xml"), "utf8");
const currentPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/",
);

const byTitle = new Map<string, string[]>();
const byDescription = new Map<string, string[]>();
for (const path of currentPaths) {
  const page = prerenderContent(path);
  if (!page) continue;
  if (page.title) byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), path]);
  if (page.description) byDescription.set(page.description, [...(byDescription.get(page.description) ?? []), path]);
}
const titleDupes = [...byTitle.entries()].filter(([, paths]) => paths.length > 1);
const descriptionDupes = [...byDescription.entries()].filter(([, paths]) => paths.length > 1);

/* ---------- 3. tunna sidor ---------- */
const thinCheck = run("bun scripts/thin-content-check.ts");

/* ---------- 4. trasiga länkar ---------- */
const linkAudit = run("bun scripts/link-audit.ts");

/* ---------- 5. schemafel ---------- */
const schemaCheck = run("bun scripts/validate-structured-data.mjs");

/* ---------- 6. innehållsdjup (ordantal + nära-dubbletter) ---------- */
const depthCheck = run("bun scripts/content-depth-check.ts");

/* ---------- 7. nya sidor sedan senaste rapporten ---------- */
let newPages: string[] = [];
let removedPages: string[] = [];
let isFirstRun = true;
if (existsSync(SNAPSHOT_PATH)) {
  isFirstRun = false;
  const previous: string[] = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));
  const prevSet = new Set(previous);
  const currSet = new Set(currentPaths);
  newPages = currentPaths.filter((p) => !prevSet.has(p));
  removedPages = previous.filter((p) => !currSet.has(p));
}
writeFileSync(SNAPSHOT_PATH, JSON.stringify(currentPaths));

/* ---------- 8. villaområden våg 1: 14-dagarsmätning (SEO DEL 2 steg 15–16) ----------
   En rad per våg 1-sida med utgångsläge 2026-09-30 (sparas första körningen i
   .seo-vag1-baslinje.json och skrivs aldrig över). Beslutsregel (seo-plan-omraden.md
   avsnitt 5): ≥ 3 av 5 indexerade inom 14 dagar (2026-10-14), inga kvalitetsvarningar.
   Indexering i Google kräver GSC — tills dess mäts sajtens egna förutsättningar. */
/** Alla publicerade villaområdessidor per våg. Lägg till en rad när en sida publiceras. */
const WAVES: { path: string; area: string; wave: number }[] = [
  { path: "/taklaggare-stuvsta", area: "Stuvsta, Huddinge (befintlig sida förstärkt)", wave: 0 },
  { path: "/taklaggare-trangsund", area: "Trångsund, Huddinge (befintlig sida förstärkt)", wave: 0 },
  { path: "/taklaggare-ronninge", area: "Rönninge, Salem (befintlig sida förstärkt)", wave: 0 },
  { path: "/taklaggare-enebyberg", area: "Enebyberg, Danderyd (befintlig sida förstärkt)", wave: 0 },
  { path: "/taklaggare-radmanso", area: "Rådmansö, Norrtälje (våg 4, befintlig sida förstärkt)", wave: 4 },
  { path: "/taklaggare-ella-gard", area: "Ella gård, Täby", wave: 1 },
  { path: "/taklaggare-skarpang", area: "Skarpäng, Täby", wave: 1 },
  { path: "/taklaggare-viby", area: "Viby-Järvafältet, Sollentuna", wave: 1 },
  { path: "/taklaggare-brevik", area: "Brevik-Lervik-Flaxenvik, Österåker", wave: 1 },
  { path: "/taklaggare-ormsta", area: "Vallentuna östra (Ormsta), Vallentuna", wave: 1 },
  { path: "/taklaggare-nasbypark", area: "Näsbypark, Täby", wave: 2 },
  { path: "/taklaggare-vallabrink", area: "Vallabrink, Täby", wave: 2 },
  { path: "/taklaggare-kalvesta", area: "Kälvesta, Stockholm", wave: 2 },
  { path: "/taklaggare-fullersta", area: "Fullersta norra, Huddinge", wave: 2 },
  { path: "/taklaggare-brevik-kappala-gashaga", area: "Brevik-Käppala-Gåshaga, Lidingö", wave: 2 },
  { path: "/taklaggare-bollstanas", area: "Bollstanäs, Upplands Väsby", wave: 2 },
  { path: "/taklaggare-nora-kevinge", area: "Danderyd västra (Nora, Kevinge), Danderyd", wave: 2 },
  { path: "/taklaggare-jakobsberg", area: "Jakobsberg västra, Järfälla (befintlig sida förstärkt)", wave: 2 },
  { path: "/taklaggare-ensta", area: "Ensta, Täby", wave: 3 },
  { path: "/taklaggare-erikslund", area: "Erikslund, Täby", wave: 3 },
  { path: "/taklaggare-gribbylund", area: "Gribby-Myräng (Gribbylund, Löttingelund), Täby", wave: 3 },
  { path: "/taklaggare-karlslund", area: "Karlslund (Täby kyrkby), Täby", wave: 3 },
  { path: "/taklaggare-midgard-byle", area: "Midgård och Byle (Täby kyrkby), Täby", wave: 3 },
  { path: "/taklaggare-roslags-nasby", area: "Roslags-Näsby, Täby", wave: 3 },
  { path: "/taklaggare-viggbyholm", area: "Viggbyholm, Täby", wave: 3 },
  { path: "/taklaggare-vallatorp-visinge", area: "Vallatorp och Visinge, Täby", wave: 3 },
  { path: "/taklaggare-osterskar", area: "Österskär, Österåker (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-tegelhagen-silverdal", area: "Tegelhagen-Silverdal, Sollentuna", wave: 3 },
  { path: "/taklaggare-snattringe", area: "Snättringe, Huddinge", wave: 3 },
  { path: "/taklaggare-solgard-sorskogen", area: "Sjödalen södra (Solgård, Sörskogen), Huddinge", wave: 3 },
  { path: "/taklaggare-segeltorp", area: "Segeltorp, Huddinge (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-skogas", area: "Östra Skogås och Mörtvik, Huddinge (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-molna", area: "Mölna (Stockby östra-Mölna-Ekholmsnäs), Lidingö", wave: 3 },
  { path: "/taklaggare-sticklinge", area: "Sticklinge, Lidingö", wave: 3 },
  { path: "/taklaggare-saltsjobaden", area: "Saltsjöbaden, Nacka (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-storangen", area: "Storängen och Saltsjö-Duvnäs, Nacka", wave: 3 },
  { path: "/taklaggare-lannersta", area: "Södra Boo (Lännersta), Nacka", wave: 3 },
  { path: "/taklaggare-viksjo", area: "Viksjö västra, Järfälla (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-angby", area: "Norra Ängby, Stockholm (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-hasselby", area: "Hässelby villastad, Stockholm (befintlig sida förstärkt)", wave: 3 },
  { path: "/taklaggare-langbro", area: "Långbro, Stockholm", wave: 3 },
  { path: "/taklaggare-orby", area: "Örby, Stockholm", wave: 3 },
  { path: "/taklaggare-solhem-lunda", area: "Solhem-Lunda, Stockholm", wave: 3 },
  { path: "/taklaggare-svalnas-osby", area: "Svalnäs och Ösby, Danderyd (Djursholm norra)", wave: 6 },
  { path: "/taklaggare-lindholmen", area: "Lindholmen, Vallentuna", wave: 6 },
  { path: "/taklaggare-sjoberg", area: "Sjöberg, Sollentuna", wave: 6 },
  { path: "/taklaggare-lahall", area: "Lahäll, Täby", wave: 6 },
  { path: "/taklaggare-stenhamra", area: "Stenhamra, Ekerö", wave: 5 },
  { path: "/taklaggare-vasterhaninge", area: "Västerhaninge, Haninge", wave: 5 },
  { path: "/taklaggare-uttran", area: "Uttran och Broängen, Tumba (Botkyrka)", wave: 5 },
  { path: "/taklaggare-hagersten", area: "Hägersten, Stockholm (befintlig sida förstärkt)", wave: 7 },
  { path: "/taklaggare-bjorknas", area: "Björknäs och Eknäs, Nacka", wave: 7 },
  { path: "/taklaggare-langsjo", area: "Långsjö, Stockholm", wave: 7 },
  { path: "/taklaggare-alsten", area: "Ålsten, Stockholm (Bromma)", wave: 7 },
  { path: "/taklaggare-staket", area: "Stäket, Järfälla", wave: 7 },
  { path: "/taklaggare-nockebyhov", area: "Nockebyhov och Olovslund, Stockholm (Bromma)", wave: 7 },
  { path: "/taklaggare-bromma-kyrka", area: "Bromma Kyrka, Stockholm (Bromma)", wave: 7 },
  { path: "/taklaggare-flysta", area: "Flysta, Stockholm (Järva)", wave: 7 },
  { path: "/taklaggare-vidja", area: "Vidja och Högmora, Huddinge", wave: 8 },
  { path: "/taklaggare-glomsta", area: "Glömsta, Huddinge", wave: 8 },
  { path: "/taklaggare-kummelnas", area: "Kummelnäs, Nacka", wave: 8 },
  { path: "/taklaggare-hersby", area: "Hersby och Herserud, Lidingö", wave: 8 },
  { path: "/taklaggare-malarhojden", area: "Mälarhöjden, Stockholm", wave: 8 },
  { path: "/taklaggare-stureby", area: "Stureby, Stockholm", wave: 8 },
  { path: "/taklaggare-vendelso", area: "Vendelsö och Norrby, Haninge (befintlig sida förstärkt)", wave: 8 },
  { path: "/taklaggare-alta", area: "Älta, Nacka (befintlig sida förstärkt)", wave: 8 },
  { path: "/taklaggare-resaro", area: "Resarö, Vaxholm", wave: 8 },
  { path: "/taklaggare-ingaro", area: "Ingarö, Värmdö (befintlig sida förstärkt)", wave: 8 },
  { path: "/taklaggare-duvbo", area: "Duvbo, Sundbyberg", wave: 9 },
  { path: "/taklaggare-smedslatten", area: "Smedslätten, Stockholm (Bromma)", wave: 9 },
  { path: "/taklaggare-pershagen", area: "Pershagen, Södertälje", wave: 9 },
  { path: "/taklaggare-glado-kvarn", area: "Gladö kvarn och Lissma, Huddinge", wave: 9 },
  { path: "/taklaggare-enskede", area: "Gamla Enskede, Stockholm (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-jarna", area: "Järna, Södertälje (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-riala", area: "Riala, Länna och Rö, Norrtälje (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-vaddo", area: "Roslagsbro och Väddö, Norrtälje (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-dalaro", area: "Dalarö, Haninge (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-nockeby", area: "Nockeby, Stockholm (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-kungsangen", area: "Kungsängen, Upplands-Bro (befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-loharad", area: "Lohärad och Estuna, Norrtälje", wave: 9 },
  { path: "/taklaggare-vasterhaninge", area: "Västerhaninge, Haninge (Norrskogen tillagt, befintlig sida förstärkt)", wave: 9 },
  { path: "/taklaggare-hoglandet", area: "Höglandet, Stockholm (Bromma)", wave: 10 },
  { path: "/taklaggare-skarsatra", area: "Skärsätra, Lidingö", wave: 10 },
  { path: "/taklaggare-stora-mossen", area: "Stora Mossen, Stockholm (Bromma)", wave: 10 },
  { path: "/taklaggare-nasbypark", area: "Näsbypark, Täby (Näsby allé/Centralvägen tillagt, befintlig sida förstärkt)", wave: 10 },
  { path: "/taklaggare-sodra-angby", area: "Södra Ängby, Stockholm (Bromma)", wave: 11 },
  { path: "/taklaggare-enskededalen", area: "Enskededalen, Stockholm (Skarpnäck)", wave: 11 },
  { path: "/taklaggare-tungelsta", area: "Tungelsta, Haninge (regel-5-fix + befintlig sida förstärkt)", wave: 11 },
];
const WAVE1_BASELINE_PATH = resolve("../ledning/marknad/.seo-vag1-baslinje.json");
type Wave1Row = { path: string; inSitemap: boolean; indexable: string; canonical: string; inlinks: number; words: number; date?: string };
const inlinkCount = new Map<string, number>();
for (const from of currentPaths) {
  const page = prerenderContent(from);
  if (!page) continue;
  for (const href of new Set(page.links.map((l) => l.href))) {
    if (href !== from) inlinkCount.set(href, (inlinkCount.get(href) ?? 0) + 1);
  }
}

/** Header.tsx + Footer.tsx:s globala navigering — visas på VARJE sida, till skillnad från
    innehållslänkarna i prerender-content.ts (som bara speglar den sidspecifika brödtexten).
    Klickdjupsgrafen nedan (Phase 2.16) måste räkna med dessa, annars felrapporteras sidor som
    bara nås via headern/footern (t.ex. /brf, /hur-det-gar-till, /omraden, /cookies) som
    oåtkomliga — de är fullt nåbara för riktiga besökare och JS-körande crawlers. */
const GLOBAL_NAV_TARGETS = [
  "/", "/priser", "/blogg", "/recensioner", "/kontakt", "/offert", "/brf", "/hur-det-gar-till",
  "/omraden", "/cookies", "/akut-lackage", "/hangrannor", "/platslagare", "/rot-avdrag",
  "/takbyte-var-2027", "/takkontroll", "/takreparation", "/taktyper",
  "/tjanster/eternit-asbest", "/tjanster/platarbeten", "/tjanster/takavvattning",
  "/tjanster/takinspektion", "/tjanster/takkupor", "/tjanster/takomlaggning",
  "/tjanster/takrenovering", "/tjanster/taktvatt",
];
/** Kantlista path → [path, ...] för klickdjupsberäkningen (Phase 2.16), byggd från samma
    sidinnehåll som ovan plus den globala navigeringen på varje sida. */
const adjacency = new Map<string, Set<string>>();
for (const from of currentPaths) {
  const page = prerenderContent(from);
  const targets = new Set(page ? page.links.map((l) => l.href) : []);
  for (const navTarget of GLOBAL_NAV_TARGETS) targets.add(navTarget);
  adjacency.set(from, targets);
}

/* ---------- 2.16 Link Equity Control: formell tier-indelning + klickdjup från "/" ----------
   Klickdjup = kortaste antal klick från startsidan via den FAKTISKA länkgrafen (prerender-
   speglingen, samma kantkälla som inlinkCount ovan) — skiljer sig från link-audit.ts:s
   orphan-check, som bara räknar RÅA förekomster av to="..." i källkoden utan att bry sig om
   länken faktiskt går att nå från "/". En sida kan ha "inlänkar" enligt link-audit.ts men ändå
   vara oåtkomlig i praktiken om den sida som länkar till den själv aldrig nås från startsidan. */
type Tier = 1 | 2 | 3 | 4;
/* Kombosidorna (/<tjänst>-<ort>) känns inte igen på prefix, så de räknas in separat genom att
   filtrera currentPaths mot samma mönster som link-audit.ts använder (tjänsteslug-ortslug). */
const comboRoutesForTiers = new Set(
  currentPaths.filter((p) => /^\/[a-z]+-[a-z0-9-]+$/.test(p) && !p.startsWith("/taklaggare-") && !p.startsWith("/omraden")),
);
const tierOf = (path: string): Tier => {
  if (
    path === "/" ||
    path === "/priser" ||
    path === "/offert" ||
    path === "/takkontroll" ||
    path === "/hur-det-gar-till" ||
    path === "/taktyper" ||
    path === "/rot-avdrag" ||
    path === "/akut-lackage" ||
    path === "/hangrannor" ||
    path === "/platslagare" ||
    path === "/takreparation" ||
    path === "/boka-takkontroll" ||
    path === "/brf" ||
    path.startsWith("/tjanster/")
  )
    return 1;
  if (
    path.startsWith("/taklaggare-") ||
    path.startsWith("/omraden") ||
    path.startsWith("/brf/") ||
    path.startsWith("/material") ||
    path.startsWith("/takproblem") ||
    path.startsWith("/projekt") ||
    comboRoutesForTiers.has(path)
  )
    return 2;
  if (path.startsWith("/blogg")) return 3;
  return 4;
};

const depth = new Map<string, number>([["/", 0]]);
const queue: string[] = ["/"];
while (queue.length > 0) {
  const current = queue.shift()!;
  const d = depth.get(current)!;
  for (const next of adjacency.get(current) ?? []) {
    if (!depth.has(next)) {
      depth.set(next, d + 1);
      queue.push(next);
    }
  }
}
const unreachable = currentPaths.filter((p) => !depth.has(p));
const tierStats = ([1, 2, 3, 4] as Tier[]).map((tier) => {
  const pages = currentPaths.filter((p) => tierOf(p) === tier);
  const depths = pages.map((p) => depth.get(p)).filter((d): d is number => d !== undefined);
  const sorted = [...depths].sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const max = sorted.length ? sorted[sorted.length - 1] : 0;
  const over3 = pages.filter((p) => (depth.get(p) ?? Infinity) > 3).length;
  const unreached = pages.filter((p) => !depth.has(p)).length;
  return { tier, count: pages.length, median, max, over3, unreached };
});
const wave1Rows: Wave1Row[] = WAVES.map(({ path }) => {
  const page = prerenderContent(path);
  const words = page ? [page.intro, ...page.paragraphs].join(" ").split(/\s+/).filter(Boolean).length : 0;
  const htmlPath = resolve(`dist${path}.html`);
  let indexable = "ej byggd (kör bunx vite build först)";
  let canonical = "–";
  if (existsSync(htmlPath)) {
    const html = readFileSync(htmlPath, "utf8");
    const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
    indexable = /noindex/.test(robots) ? "NEJ (noindex)" : "ja";
    const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
    canonical = canon === `https://roslagstak.se${path}` ? "ok (självrefererande)" : canon ? `AVVIKER: ${canon}` : "SAKNAS";
  }
  return { path, inSitemap: currentPaths.includes(path), indexable, canonical, inlinks: inlinkCount.get(path) ?? 0, words };
});
/* Utgångsläget fryses per sida första gången sidan finns med (datum per rad) och skrivs aldrig över. */
const wave1Baseline: { date: string; rows: Wave1Row[] } = existsSync(WAVE1_BASELINE_PATH)
  ? JSON.parse(readFileSync(WAVE1_BASELINE_PATH, "utf8"))
  : { date: today, rows: [] };
let baselineChanged = false;
for (const r of wave1Rows) {
  if (!wave1Baseline.rows.some((x) => x.path === r.path) && r.inSitemap && r.indexable === "ja") {
    wave1Baseline.rows.push({ ...r, date: today });
    baselineChanged = true;
  }
}
if (baselineChanged) writeFileSync(WAVE1_BASELINE_PATH, JSON.stringify(wave1Baseline, null, 2));
const wave1Table = [
  "| Våg | Sida | Område | I sitemap | Indexerbar | Canonical | Utgångsläge | Inlänkar (utg.→nu) | Ord prerender (utg.→nu) | Indexerad i Google |",
  "|---|---|---|---|---|---|---|---|---|---|",
  ...wave1Rows.map((r, i) => {
    const b = wave1Baseline.rows.find((x) => x.path === r.path);
    return `| ${WAVES[i].wave} | ${r.path} | ${WAVES[i].area} | ${r.inSitemap ? "ja" : "NEJ"} | ${r.indexable} | ${r.canonical} | ${b?.date ?? wave1Baseline.date} | ${b?.inlinks ?? "–"}→${r.inlinks} | ${b?.words ?? "–"}→${r.words} | väntar på GSC |`;
  }),
].join("\n");

/* ---------- rapport ---------- */
const section = (title: string, body: string) => `## ${title}\n\n${body.trim()}\n`;
const codeBlock = (text: string) => "```\n" + text.trim() + "\n```";

const lines: string[] = [];
lines.push(`# SEO-vecka — ${today}`);
lines.push("");
lines.push(
  "Automatgenererad av `bun scripts/seo-weekly-report.ts`. Skrivs över varje körning — historik finns i git-loggen för den här filen.",
);
lines.push("");

lines.push(
  section(
    "1. Index-täckning (sitemap mot faktiska routes)",
    `${sitemapCheck.ok ? "✓ Grönt" : "⚠ Avvikelser"}${LIVE ? " (inkl. --live HTTP-check)" : " (endast statiskt — kör med --live för riktig HTTP-status)"}\n\n${codeBlock(sitemapCheck.output)}`,
  ),
);

lines.push(
  section(
    "2. Titel-/meta-dubbletter",
    titleDupes.length === 0 && descriptionDupes.length === 0
      ? "✓ Inga två URL:er delar samma titel eller meta description."
      : [
          titleDupes.length
            ? `**${titleDupes.length} dubblerade titlar:**\n` +
              titleDupes.map(([t, paths]) => `- "${t}" → ${paths.join(", ")}`).join("\n")
            : "",
          descriptionDupes.length
            ? `**${descriptionDupes.length} dubblerade meta descriptions:**\n` +
              descriptionDupes.map(([d, paths]) => `- "${d.slice(0, 80)}…" → ${paths.join(", ")}`).join("\n")
            : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
  ),
);

lines.push(section("3. Tunna sidor (helt utan prerenderat innehåll)", codeBlock(thinCheck.output)));
lines.push(section("4. Trasiga interna länkar", codeBlock(linkAudit.output)));
lines.push(section("5. Schemafel (structured data)", codeBlock(schemaCheck.output)));
lines.push(
  section(
    "6. Innehållsdjup — ordantal och nära-dubbletter per sidtyp",
    `Rapportverktyg, INTE en publiceringsgrind ännu (se scriptets header). Mäter bara den statiska crawler-speglingen (prerender-content.ts), inte hela den React-renderade sidan.\n\n${codeBlock(depthCheck.output)}`,
  ),
);
lines.push(
  section(
    "7. Nya/borttagna sidor sedan senaste rapporten",
    isFirstRun
      ? `Första körningen — ${currentPaths.length} URL:er sparade som baslinje. Nästa rapport visar diffen.`
      : `**Nya (${newPages.length}):**\n${newPages.length ? newPages.map((p) => `- ${p}`).join("\n") : "inga"}\n\n**Borttagna (${removedPages.length}):**\n${removedPages.length ? removedPages.map((p) => `- ${p}`).join("\n") : "inga"}`,
  ),
);
lines.push(
  section(
    "8. Villaområden — mätning per våg",
    `Utgångsläget fryses per sida i ledning/marknad/.seo-vag1-baslinje.json (datum per rad). Våg 2 publicerades utan 14 dagars väntan (Vidars beslut 2026-09-30); indexering följs upp 14 dagar efter respektive utgångsläge. Inlänkar = antal andra sitemap-sidor vars förrenderade HTML länkar hit. Ord = förrenderad brödtext (samma mått som content-depth-check, gräns 400).\n\n${wave1Table}`,
  ),
);
const tierNames: Record<Tier, string> = {
  1: "Tier 1 — pengasidor (startsida, /priser, /offert, tjänstesidor, takkontroll, hur-det-gar-till m.fl.)",
  2: "Tier 2 — stödsidor (ortssidor, tjänst+ort-combos, områden, BRF, material, takproblem, projekt)",
  3: "Tier 3 — innehåll (blogg)",
  4: "Tier 4 — övrigt (recensioner, kontakt, juridiska sidor m.fl.)",
};
const tierTable = [
  "| Tier | Sidor | Medianklick från start | Max klick | > 3 klick | Oåtkomliga (ingen väg från \"/\") |",
  "|---|---|---|---|---|---|",
  ...tierStats.map(
    (t) => `| ${tierNames[t.tier]} | ${t.count} | ${t.median} | ${t.max} | ${t.over3} | ${t.unreached} |`,
  ),
].join("\n");
lines.push(
  section(
    "9. Länk-tiers och klickdjup (Phase 2.16, Link Equity Control)",
    `Klickdjup = kortaste vägen från startsidan via den faktiska länkgrafen i prerender-speglingen (samma kantkälla som inlänksräkningen i avsnitt 8) — strängare mått än link-audit.ts:s orphan-check, som bara räknar råa \`to="..."\`-förekomster utan att följa kedjan tillbaka till "/". En sida kan se ut att ha inlänkar och ändå vara oåtkomlig i praktiken om sidan som länkar till den själv aldrig nås.\n\n${tierTable}\n\n${
      unreachable.length === 0
        ? "✓ Alla sitemap-sidor nås via minst en klickkedja från startsidan."
        : `**${unreachable.length} sidor helt oåtkomliga från startsidan** (ingen väg i prerender-länkgrafen, oavsett antal klick):\n${unreachable
            .slice(0, 30)
            .map((p) => `- ${p}`)
            .join("\n")}${unreachable.length > 30 ? `\n- …och ${unreachable.length - 30} till` : ""}`
    }\n\n**Tolkning:** Tier 1 bör ligga på 0–1 klick (länkad direkt från startsidans meny/sektioner), Tier 2 på 1–2 klick (nådd från en tier 1-sida eller en ortssida), Tier 3 på 2–3 klick. Rader med hög "> 3 klick"-andel pekar på var internlänkningen (Fas 2.15) bör förstärkas näst.`,
  ),
);
lines.push(
  section(
    "10. Google Search Console",
    "Väntar på GSC-åtkomst från Vidar (se ads/24-underlaget). Ingen riktig söktrafik-, CTR- eller positionsdata kan kopplas in förrän åtkomst finns — den här sektionen fylls i när den är klar.",
  ),
);

/* Senaste Lighthouse-mätningen (manuell, ledning/marknad/lighthouse-senaste.md) tas med i
   rapporten, så att den inte försvinner när seo-vecka.md skrivs över. */
const LIGHTHOUSE_PATH = resolve("../ledning/marknad/lighthouse-senaste.md");
if (existsSync(LIGHTHOUSE_PATH)) {
  lines.push(section("11. Lighthouse / Core Web Vitals (senaste mätningen)", readFileSync(LIGHTHOUSE_PATH, "utf8")));
}

writeFileSync(REPORT_PATH, lines.join("\n"));
console.log(`[seo-weekly-report] skrivet till ledning/marknad/seo-vecka.md`);
console.log(
  `Sammanfattning: sitemap ${sitemapCheck.ok ? "OK" : "AVVIKELSER"}, titel-dubbletter ${titleDupes.length}, meta-dubbletter ${descriptionDupes.length}, ${isFirstRun ? "baslinje sparad" : `${newPages.length} nya sidor, ${removedPages.length} borttagna`}.`,
);
