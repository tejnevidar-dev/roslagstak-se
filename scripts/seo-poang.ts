/**
 * Förbättringspoäng per sida (fas 2.44, SEO Opportunity Scoring). Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/seo-poang.ts
 * Skriver: ledning/marknad/seo-poang.md
 *
 * VIKTIGT: ingen efterfrågedata (GSC saknas). Poängen mäter bara hur långt en sida är från vår egen
 * kvalitetsnivå, viktad efter hur nära sidtypen ligger intäkterna. Den säger inte vilken sida som har
 * flest sökningar. När GSC-export finns läggs visningar till som en fjärde faktor.
 *
 * poäng = 100 × typvikt × (0,50 × ordgap + 0,35 × inlänksgap + 0,15 × kannibaliseringsflagga)
 *   ordgap       = max(0, (målord − ord) / målord)  (målord per sidtyp, se TARGET_WORDS)
 *   inlänksgap   = max(0, (5 − inlänkar) / 5)       (inlänkar = sidinnehållets länkar, samma graf som veckorapporten)
 *   kannibalisering = 1 om sidan ingår i ett titelpar med likhet ≥ 0,6 i seo-analys.md
 * Ord = ingress + brödtext i prerender-speglingen (statisk HTML). På sidor vars synliga innehåll är längre än
 * speglingen (t.ex. /tjanster/*, som har egna block i React) är ordgapet därför överdrivet: tolka EXPAND där som
 * "speglingen är tunn", inte som "sidan är tunn för besökaren".
 * Åtgärd: ordgap > 0,3 → EXPAND, annars inlänksgap > 0,4 → RELINK, annars kannibalisering → UPDATE (titel), annars NO ACTION.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { classify } from "./page-type";
import { prerenderContent } from "./prerender-content";

const SITE_URL = "https://roslagstak.se";
const today = new Date().toISOString().slice(0, 10);

const paths = [
  ...new Set(
    [...readFileSync(resolve("public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].replace(SITE_URL, "") || "/",
    ),
  ),
];

const TYPE_WEIGHT: Record<string, number> = {
  SERVICE_LOCATION: 1.0,
  SERVICE: 1.0,
  LOCATION: 0.8,
  PROJECT: 0.7,
  REGION_HUB: 0.7,
  PROBLEM: 0.6,
  MATERIAL: 0.6,
  GUIDE: 0.5,
  BRF_LOCATION: 0.1, // BRF är pausat segment
  BRF_HUB: 0.1,
};
const TARGET_WORDS: Record<string, number> = {
  SERVICE_LOCATION: 400,
  SERVICE: 400,
  LOCATION: 400,
  PROJECT: 250,
  REGION_HUB: 400,
  PROBLEM: 400,
  MATERIAL: 400,
  GUIDE: 600,
  BRF_LOCATION: 400,
  BRF_HUB: 400,
};

const inlinks = new Map<string, number>();
for (const from of paths) {
  const page = prerenderContent(from);
  if (!page) continue;
  for (const href of new Set(page.links.map((l) => l.href))) if (href !== from) inlinks.set(href, (inlinks.get(href) ?? 0) + 1);
}

const cannibal = new Set<string>();
const analysPath = resolve("../ledning/marknad/seo-analys.md");
if (existsSync(analysPath)) {
  for (const m of readFileSync(analysPath, "utf8").matchAll(/^- [\d.]+\s+(\/\S+)\s+↔\s+(\/\S+)/gm)) {
    cannibal.add(m[1]);
    cannibal.add(m[2]);
  }
}

type Row = { path: string; type: string; words: number; inlinks: number; cannibal: boolean; score: number; action: string };
const rows: Row[] = [];
for (const path of paths) {
  const { type } = classify(path);
  const weight = TYPE_WEIGHT[type];
  if (weight === undefined) continue;
  const page = prerenderContent(path);
  const words = page ? [page.intro, ...page.paragraphs].join(" ").split(/\s+/).filter(Boolean).length : 0;
  const il = inlinks.get(path) ?? 0;
  const wordGap = Math.max(0, (TARGET_WORDS[type] - words) / TARGET_WORDS[type]);
  const linkGap = Math.max(0, (5 - il) / 5);
  const can = cannibal.has(path);
  const score = Math.round(100 * weight * (0.5 * wordGap + 0.35 * linkGap + 0.15 * (can ? 1 : 0)));
  const action = wordGap > 0.3 ? "EXPAND" : linkGap > 0.4 ? "RELINK" : can ? "UPDATE (titel)" : "NO ACTION";
  rows.push({ path, type, words, inlinks: il, cannibal: can, score, action });
}
rows.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

const byAction = new Map<string, number>();
for (const r of rows) byAction.set(r.action, (byAction.get(r.action) ?? 0) + 1);
const byType = new Map<string, Row[]>();
for (const r of rows) byType.set(r.type, [...(byType.get(r.type) ?? []), r]);

const table = (rs: Row[]) =>
  [
    "| Poäng | Sida | Typ | Ord | Inlänkar | Titelpar | Åtgärd |",
    "|---|---|---|---|---|---|---|",
    ...rs.map((r) => `| ${r.score} | ${r.path} | ${r.type} | ${r.words} | ${r.inlinks} | ${r.cannibal ? "ja" : "–"} | ${r.action} |`),
  ].join("\n");

const out = [
  "# Förbättringspoäng per sida (fas 2.44)",
  "",
  `Genererad ${today} av \`bun scripts/seo-poang.ts\`. **Ingen efterfrågedata:** poängen visar avstånd till vår egen kvalitetsnivå, viktat efter sidtypens affärsnärhet, inte sökvolym. När GSC-export finns läggs visningar till som fjärde faktor.`,
  "",
  "Formel: `100 × typvikt × (0,50 × ordgap + 0,35 × inlänksgap + 0,15 × titelpar)`. Ord = prerender-spegelns text (på /tjanster/* är den kortare än den synliga sidan, så EXPAND där betyder att speglingen är tunn). Målord per typ: orts-/tjänst-/problem-/materialsidor 400, guider 600, projekt 250. Inlänksmål 5. Typvikt: tjänst och tjänst × ort 1,0, ortssida 0,8, projekt och regionsida 0,7, problem och material 0,6, guide 0,5, BRF 0,1 (pausat).",
  "",
  `## Fördelning av åtgärder (${rows.length} sidor)`,
  ...[...byAction.entries()].sort((a, b) => b[1] - a[1]).map(([a, n]) => `- ${a}: ${n}`),
  "",
  "## Per sidtyp: snittpoäng och antal med poäng ≥ 30",
  "| Typ | Sidor | Snittpoäng | Poäng ≥ 30 |",
  "|---|---|---|---|",
  ...[...byType.entries()]
    .map(([t, rs]) => ({ t, n: rs.length, avg: Math.round(rs.reduce((s, r) => s + r.score, 0) / rs.length), high: rs.filter((r) => r.score >= 30).length }))
    .sort((a, b) => b.avg - a.avg)
    .map((x) => `| ${x.t} | ${x.n} | ${x.avg} | ${x.high} |`),
  "",
  "## Topp 40 att förbättra",
  table(rows.slice(0, 40)),
  "",
].join("\n");

writeFileSync(resolve("../ledning/marknad/seo-poang.md"), out);
console.log(`[seo-poang] ${rows.length} sidor poängsatta. Topp: ${rows[0]?.path} (${rows[0]?.score}). Skrivet till ledning/marknad/seo-poang.md`);
