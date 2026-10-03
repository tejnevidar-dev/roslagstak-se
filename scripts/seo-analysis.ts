/**
 * SEO-analys (fas 2.17 kannibalisering, 2.39 kunskapsgrafvalidering, 2.45/2.46 täckningsmatriser).
 * Lokalt verktyg, INGEN del av bygget/postbuild (skriver till ledning/ som inte finns i CI).
 *
 * Kör: bun scripts/seo-analysis.ts
 * Skriver: ledning/marknad/seo-analys.md. Exit 1 bara om kunskapsgrafen har trasiga relationer.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { problems } from "../src/data/problems";
import { materials } from "../src/data/materials";
import { projects } from "../src/data/projects";
import { allServiceSlugs } from "../src/data/service-location-combos";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { regionSlugs } from "../src/data/regions";
import { prerenderContent } from "./prerender-content";

const SITE_URL = "https://roslagstak.se";
const sitemapPaths = new Set(
  [...readFileSync(resolve("public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].replace(SITE_URL, "") || "/",
  ),
);
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const serviceSlugs = new Set([...servicesSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const routeExists = (to: string) => {
  const path = to.split("#")[0].split("?")[0] || "/";
  return sitemapPaths.has(path) || prerenderContent(path) !== null;
};

/* ---------- 2.39 Kunskapsgraf: relationerna måste peka på något som finns ---------- */
const graphErrors: string[] = [];
const locBySlug = new Map(locations.map((l) => [l.slug, l]));
const locByName = new Set(locations.map((l) => l.name));
const materialSlugSet = new Set(materials.map((m) => m.slug));
const projectSlugSet = new Set(projects.map((p) => p.slug));

for (const p of problems) {
  for (const r of p.related) if (!routeExists(r.to)) graphErrors.push(`problem ${p.slug} → ${r.to} (finns inte)`);
  if (p.relatedProject && !projectSlugSet.has(p.relatedProject)) graphErrors.push(`problem ${p.slug} → projekt ${p.relatedProject} (finns inte)`);
}
for (const pr of projects) {
  if (!locBySlug.has(pr.locationSlug)) graphErrors.push(`projekt ${pr.slug} → ort ${pr.locationSlug} (finns inte)`);
  if (!serviceSlugs.has(pr.serviceSlug)) graphErrors.push(`projekt ${pr.slug} → tjänst ${pr.serviceSlug} (finns inte)`);
  for (const m of pr.materialSlugs) if (!materialSlugSet.has(m)) graphErrors.push(`projekt ${pr.slug} → material ${m} (finns inte)`);
}
for (const l of locations) {
  if (l.parentLocation && !locBySlug.has(l.parentLocation.slug)) graphErrors.push(`ort ${l.slug} → överordnad ${l.parentLocation.slug} (finns inte)`);
  for (const n of l.nearbyLocations) if (!locByName.has(n)) graphErrors.push(`ort ${l.slug} → grannort "${n}" (finns inte)`);
  if (!regionSlugs[l.region]) graphErrors.push(`ort ${l.slug} → region "${l.region}" saknar sida`);
}
for (const m of materials) if (m.detail && !routeExists(m.href)) graphErrors.push(`material ${m.slug} → ${m.href} (finns inte)`);

/* ---------- 2.17 Kannibalisering: titlar/H1 som tävlar om samma sökavsikt ---------- */
const tokens = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-zåäö0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !["fast", "pris", "roslagstak", "och", "för", "med", "takläggare"].includes(w)),
  );
const jaccard = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};
const indexable = [...sitemapPaths].map((p) => ({ path: p, page: prerenderContent(p) })).filter((x) => x.page);
const h1Groups = new Map<string, string[]>();
for (const { path, page } of indexable) {
  const key = page!.h1.trim().toLowerCase();
  h1Groups.set(key, [...(h1Groups.get(key) ?? []), path]);
}
const dupH1 = [...h1Groups.entries()].filter(([, v]) => v.length > 1);
const titleTokens = indexable.map((x) => ({ path: x.path, t: tokens(x.page!.title ?? "") }));
const similar: { a: string; b: string; j: number }[] = [];
for (let i = 0; i < titleTokens.length; i++)
  for (let j = i + 1; j < titleTokens.length; j++) {
    if (titleTokens[i].t.size < 3 || titleTokens[j].t.size < 3) continue;
    const s = jaccard(titleTokens[i].t, titleTokens[j].t);
    if (s >= 0.8) similar.push({ a: titleTokens[i].path, b: titleTokens[j].path, j: s });
  }

/* ---------- 2.45/2.46 Täckningsmatriser ---------- */
const byRegion = new Map<string, { pages: number; words: number; thin: number; comboIdx: number; comboAll: number }>();
for (const l of locations) {
  const r = byRegion.get(l.region) ?? { pages: 0, words: 0, thin: 0, comboIdx: 0, comboAll: 0 };
  const w = (() => {
    const p = prerenderContent(`/taklaggare-${l.slug}`);
    return p ? [p.intro, ...p.paragraphs].join(" ").split(/\s+/).filter(Boolean).length : 0;
  })();
  r.pages++;
  r.words += w;
  if (w < 400) r.thin++;
  if (hasServiceCombos(l.region)) for (const s of allServiceSlugs) { r.comboAll++; if (!isThinCombo(s, l)) r.comboIdx++; }
  byRegion.set(l.region, r);
}
const projByRegion = new Map<string, number>();
for (const pr of projects) {
  const reg = locBySlug.get(pr.locationSlug)?.region ?? "okänd";
  projByRegion.set(reg, (projByRegion.get(reg) ?? 0) + 1);
}
const topicRows = [
  ["Problemsidor", problems.length],
  ["Materialsidor", materials.filter((m) => m.detail).length],
  ["Tjänstesidor", serviceSlugs.size],
  ["Referensprojekt", projects.length],
];

const md = `# SEO-analys (genererad av scripts/seo-analysis.ts)

Skrivs över vid varje körning. Täcker fas 2.17 (kannibalisering), 2.39 (kunskapsgrafvalidering) och 2.45/2.46 (täckningsmatriser).

## 2.39 Kunskapsgraf — relationer som pekar på något som saknas
${graphErrors.length ? graphErrors.map((e) => `- ${e}`).join("\n") : "Inga trasiga relationer (problem→länkar/projekt, projekt→ort/tjänst/material, ort→överordnad/grannar/region, material→sida)."}

## 2.17 Kannibalisering
**Samma H1 på flera indexerbara sidor:** ${dupH1.length ? "\n" + dupH1.map(([h, v]) => `- "${h}" → ${v.join(", ")}`).join("\n") : "inga."}

**Titelpar med likhet ≥ 0,8 (Jaccard på betydelsebärande ord, ${similar.length} par):**
${similar.length ? similar.slice(0, 60).map((s) => `- ${s.j.toFixed(2)}  ${s.a}  ↔  ${s.b}`).join("\n") : "inga."}
${similar.length > 60 ? `\n… och ${similar.length - 60} till.` : ""}

## 2.46 Lokal täckningsmatris (region × kvalitet)
| Region | Ortssidor | Snitt ord | Under 400 ord | Indexerade tjänst+ort | Projekt |
|---|---|---|---|---|---|
${[...byRegion.entries()]
  .sort((a, b) => b[1].pages - a[1].pages)
  .map(([k, v]) => `| ${k} | ${v.pages} | ${Math.round(v.words / v.pages)} | ${v.thin} | ${v.comboIdx}/${v.comboAll} | ${projByRegion.get(k) ?? 0} |`)
  .join("\n")}

## 2.45 Ämnestäckning (tjänst × ämnestyp, antal sidor)
| Ämnestyp | Antal |
|---|---|
${topicRows.map(([k, v]) => `| ${k} | ${v} |`).join("\n")}
`;
writeFileSync(resolve("../ledning/marknad/seo-analys.md"), md);
console.log(`[seo-analysis] ${graphErrors.length} grafrelationer trasiga, ${dupH1.length} dubbla H1, ${similar.length} lika titelpar → ledning/marknad/seo-analys.md`);
process.exit(graphErrors.length ? 1 : 0);
