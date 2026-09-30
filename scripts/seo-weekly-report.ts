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
const WAVE1 = [
  { path: "/taklaggare-ella-gard", area: "Ella gård, Täby" },
  { path: "/taklaggare-skarpang", area: "Skarpäng, Täby" },
  { path: "/taklaggare-viby", area: "Viby-Järvafältet, Sollentuna" },
  { path: "/taklaggare-brevik", area: "Brevik-Lervik-Flaxenvik, Österåker" },
  { path: "/taklaggare-ormsta", area: "Vallentuna östra (Ormsta), Vallentuna" },
];
const WAVE1_BASELINE_DATE = "2026-09-30";
const WAVE1_BASELINE_PATH = resolve("../ledning/marknad/.seo-vag1-baslinje.json");
type Wave1Row = { path: string; inSitemap: boolean; indexable: string; canonical: string; inlinks: number; words: number };
const inlinkCount = new Map<string, number>();
for (const from of currentPaths) {
  const page = prerenderContent(from);
  if (!page) continue;
  for (const href of new Set(page.links.map((l) => l.href))) {
    if (href !== from) inlinkCount.set(href, (inlinkCount.get(href) ?? 0) + 1);
  }
}
const wave1Rows: Wave1Row[] = WAVE1.map(({ path }) => {
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
let wave1Baseline: { date: string; rows: Wave1Row[] };
if (existsSync(WAVE1_BASELINE_PATH)) {
  wave1Baseline = JSON.parse(readFileSync(WAVE1_BASELINE_PATH, "utf8"));
} else {
  wave1Baseline = { date: WAVE1_BASELINE_DATE, rows: wave1Rows };
  writeFileSync(WAVE1_BASELINE_PATH, JSON.stringify(wave1Baseline, null, 2));
}
const wave1Table = [
  "| Sida | Område | I sitemap | Indexerbar | Canonical | Inlänkar (utg.→nu) | Ord prerender (utg.→nu) | Indexerad i Google |",
  "|---|---|---|---|---|---|---|---|",
  ...wave1Rows.map((r, i) => {
    const b = wave1Baseline.rows.find((x) => x.path === r.path);
    return `| ${r.path} | ${WAVE1[i].area} | ${r.inSitemap ? "ja" : "NEJ"} | ${r.indexable} | ${r.canonical} | ${b?.inlinks ?? "–"}→${r.inlinks} | ${b?.words ?? "–"}→${r.words} | väntar på GSC |`;
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
    "8. Villaområden våg 1 — 14-dagarsmätning",
    `Utgångsläge ${wave1Baseline.date} (fryst i ledning/marknad/.seo-vag1-baslinje.json). Avläsning 2026-10-14. Beslutsregel: ≥ 3 av 5 indexerade i Google inom 14 dagar och inga kvalitetsvarningar. Inlänkar = antal andra sitemap-sidor vars förrenderade HTML länkar hit. Ord = förrenderad brödtext (samma mått som content-depth-check, gräns 400).\n\n${wave1Table}`,
  ),
);
lines.push(
  section(
    "9. Google Search Console",
    "Väntar på GSC-åtkomst från Vidar (se ads/24-underlaget). Ingen riktig söktrafik-, CTR- eller positionsdata kan kopplas in förrän åtkomst finns — den här sektionen fylls i när den är klar.",
  ),
);

writeFileSync(REPORT_PATH, lines.join("\n"));
console.log(`[seo-weekly-report] skrivet till ledning/marknad/seo-vecka.md`);
console.log(
  `Sammanfattning: sitemap ${sitemapCheck.ok ? "OK" : "AVVIKELSER"}, titel-dubbletter ${titleDupes.length}, meta-dubbletter ${descriptionDupes.length}, ${isFirstRun ? "baslinje sparad" : `${newPages.length} nya sidor, ${removedPages.length} borttagna`}.`,
);
