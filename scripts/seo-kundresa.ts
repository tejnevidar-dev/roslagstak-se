/**
 * Kundresegrafen (fas 2.37): problem → research → kostnad → lokalt → bevis → konvertering.
 * Lokalt verktyg, ingen del av bygget. Mäter den FAKTISKA länkgrafen (prerender-spegelns innehållslänkar,
 * Header/Footer räknas inte) och visar var resan bryts: hur stor andel av sidorna i ett steg som länkar vidare
 * till nästa steg och till konvertering.
 *
 * Kör: bun scripts/seo-kundresa.ts   Skriver: ledning/marknad/kundresa.md
 */
import { readFileSync, writeFileSync } from "node:fs";
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

const STAGES = ["Problem", "Research", "Kostnad", "Lokalt", "Bevis", "Konvertering"] as const;
type Stage = (typeof STAGES)[number];

const COST_PATHS = new Set(["/priser", "/rot-avdrag", "/taktyper"]);
const PROOF_PATHS = new Set(["/recensioner"]);
const CONVERT_PATHS = new Set(["/takkontroll", "/offert", "/kontakt", "/hur-det-gar-till"]);
const PROBLEM_PATHS = new Set(["/akut-lackage", "/takreparation"]);

const stageOf = (path: string): Stage | null => {
  const { type } = classify(path);
  if (type === "PROBLEM" || type === "PROBLEM_INDEX" || PROBLEM_PATHS.has(path)) return "Problem";
  if (type === "GUIDE" || type === "GUIDE_INDEX" || type === "MATERIAL" || type === "MATERIAL_INDEX") return "Research";
  if (COST_PATHS.has(path)) return "Kostnad";
  if (type === "LOCATION" || type === "SERVICE_LOCATION" || type === "REGION_HUB" || type === "REGION_INDEX") return "Lokalt";
  if (type === "PROJECT" || type === "PROJECT_INDEX" || PROOF_PATHS.has(path)) return "Bevis";
  if (CONVERT_PATHS.has(path)) return "Konvertering";
  return null;
};

const stageOfPage = new Map<string, Stage>();
for (const p of paths) {
  const s = stageOf(p);
  if (s) stageOfPage.set(p, s);
}
const members = (s: Stage) => [...stageOfPage].filter(([, st]) => st === s).map(([p]) => p);

const outLinks = new Map<string, Set<string>>();
for (const p of paths) outLinks.set(p, new Set((prerenderContent(p)?.links ?? []).map((l) => l.href).filter((h) => h !== p)));

/** Andel sidor i steg A med minst en innehållslänk till steg B. */
const share = (a: Stage, b: Stage) => {
  const from = members(a);
  if (!from.length) return { n: 0, withLink: 0, pct: 0 };
  const withLink = from.filter((p) => [...(outLinks.get(p) ?? [])].some((h) => stageOfPage.get(h) === b)).length;
  return { n: from.length, withLink, pct: Math.round((100 * withLink) / from.length) };
};

const matrixRows = STAGES.map((a) => {
  const cells = STAGES.map((b) => (a === b ? "·" : `${share(a, b).pct} %`));
  return `| ${a} (${members(a).length}) | ${cells.join(" | ")} |`;
});

const gaps: string[] = [];
for (const a of STAGES) {
  for (const b of STAGES) {
    if (a === b || a === "Konvertering" || b === "Konvertering") continue;
    const r = share(a, b);
    if (r.n && r.pct < 10) gaps.push(`${a} → ${b}: ${r.withLink} av ${r.n} sidor länkar (${r.pct} %)`);
  }
}

/** Sidor som ligger i ett steg men inte når konvertering med ett klick. */
const noConversion = STAGES.slice(0, 5).map((s) => {
  const r = share(s, "Konvertering");
  return { stage: s, ...r, missing: r.n - r.withLink };
});
const examples = (s: Stage) =>
  members(s)
    .filter((p) => ![...(outLinks.get(p) ?? [])].some((h) => stageOfPage.get(h) === "Konvertering"))
    .slice(0, 8);

const out = [
  "# Kundresegrafen (fas 2.37)",
  "",
  `Genererad ${today} av \`bun scripts/seo-kundresa.ts\`. Resan: **Problem → Research → Kostnad → Lokalt → Bevis → Konvertering**. Mäter innehållslänkar i prerender-speglingen (Header och Footer räknas inte, och de leder till konvertering från alla sidor). Det är ett mått på hur väl sidorna själva för besökaren vidare, inte på hur besökare faktiskt rör sig. Besöksdata saknas (ingen GSC/GA4-export i den här miljön).`,
  "",
  "## Vilka sidor ligger i vilket steg",
  "| Steg | Sidtyper | Antal |",
  "|---|---|---|",
  `| Problem | /takproblem/* och hubben, /akut-lackage, /takreparation | ${members("Problem").length} |`,
  `| Research | guider (/blogg/*), material (/material/*) | ${members("Research").length} |`,
  `| Kostnad | /priser, /rot-avdrag, /taktyper | ${members("Kostnad").length} |`,
  `| Lokalt | ortssidor, tjänst × ort, regionsidor | ${members("Lokalt").length} |`,
  `| Bevis | /projekt/*, /recensioner | ${members("Bevis").length} |`,
  `| Konvertering | /takkontroll, /offert, /kontakt, /hur-det-gar-till | ${members("Konvertering").length} |`,
  "",
  "## Länkmatris: andel sidor i raden som länkar till minst en sida i kolumnen",
  `| Från \\ till | ${STAGES.join(" | ")} |`,
  `|---|${STAGES.map(() => "---").join("|")}|`,
  ...matrixRows,
  "",
  "## Luckor i resan (celler under 10 %, utom till/från konvertering)",
  ...(gaps.length ? gaps.map((g) => `- ${g}`) : ["- Inga."]),
  "",
  "## Sidor utan innehållslänk till konvertering",
  "| Steg | Sidor | Utan länk | Andel utan |",
  "|---|---|---|---|",
  ...noConversion.map((r) => `| ${r.stage} | ${r.n} | ${r.missing} | ${r.n ? Math.round((100 * r.missing) / r.n) : 0} % |`),
  "",
  ...STAGES.slice(0, 5).flatMap((s) => {
    const ex = examples(s);
    return ex.length ? [`**${s}, exempel utan konverteringslänk i innehållet:** ${ex.join(", ")}`, ""] : [];
  }),
  "## Så läser du den",
  "- En låg andel i en cell är en möjlig länklucka, inte automatiskt ett fel. Sidor kan ha en CTA-knapp i layouten som inte finns i prerender-speglingen.",
  "- Naturliga flöden som bör vara höga: Problem → Research/Kostnad/Lokalt/Konvertering, Research → Kostnad/Lokalt/Konvertering, Lokalt → Bevis/Konvertering.",
  "- Åtgärder följer samma regler som övrig internlänkning: ankartext efter sidans ämne, inga nya påståenden, ingen designändring.",
  "",
].join("\n");

writeFileSync(resolve("../ledning/marknad/kundresa.md"), out);
console.log("[seo-kundresa] skrivet till ledning/marknad/kundresa.md");
for (const r of noConversion) console.log(`  ${r.stage}: ${r.withLink}/${r.n} länkar till konvertering`);
