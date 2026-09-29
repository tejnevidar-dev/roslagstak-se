/**
 * Content inventory (SEO-programmet Phase 2.40) — maskinläsbar lista över varje
 * route sajten faktiskt serverar, med typ, primär avsikt, indexerbarhet, canonical,
 * title/H1 och ett grovt ordantal. Genereras direkt från samma datakällor som
 * bygget självt (inte handskriven), så den kan köras om närhelst innehåll ändras.
 *
 * Run: bun scripts/content-inventory.ts
 * Output: ledning/marknad/content-inventory-2026.csv
 */
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { allServiceSlugs } from "../src/data/service-location-combos";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { brfLocationSlugs } from "../src/data/brf-locations";
import { regionSlugs } from "../src/data/regions";
import { blogPosts } from "../src/data/blog-posts";
import { projects } from "../src/data/projects";
import { canonicalPath, isNoindexPath } from "../src/lib/canonical";
import { prerenderContent } from "./prerender-content";

type Row = {
  url: string;
  type: string;
  service: string;
  location: string;
  indexable: boolean;
  canonical: string;
  title: string;
  h1: string;
  words: number;
};

const SITE_URL = "https://roslagstak.se";

const classify = (path: string): { type: string; service: string; location: string } => {
  if (path === "/") return { type: "HOME", service: "", location: "" };
  if (path.startsWith("/tjanster/")) return { type: "SERVICE", service: path.slice("/tjanster/".length), location: "" };
  if (path.startsWith("/taklaggare-")) return { type: "LOCATION", service: "", location: path.slice("/taklaggare-".length) };
  if (path.startsWith("/omraden/")) return { type: "REGION_HUB", service: "", location: path.slice("/omraden/".length) };
  if (path === "/omraden") return { type: "REGION_INDEX", service: "", location: "" };
  if (path.startsWith("/brf/")) return { type: "BRF_LOCATION", service: "brf", location: path.slice("/brf/".length) };
  if (path === "/brf") return { type: "BRF_HUB", service: "brf", location: "" };
  if (path.startsWith("/projekt/")) return { type: "PROJECT", service: "", location: "" };
  if (path === "/projekt") return { type: "PROJECT_INDEX", service: "", location: "" };
  if (path.startsWith("/blogg/")) return { type: "GUIDE", service: "", location: "" };
  if (path === "/blogg") return { type: "GUIDE_INDEX", service: "", location: "" };
  if (path.startsWith("/offert/")) return { type: "AD_LANDING", service: "", location: path.slice("/offert/".length) };
  for (const s of allServiceSlugs) {
    if (path.startsWith(`/${s}-`)) return { type: "SERVICE_LOCATION", service: s, location: path.slice(s.length + 2) };
  }
  return { type: "STATIC", service: "", location: "" };
};

const wordCount = (path: string): number => {
  const page = prerenderContent(path);
  if (!page) return 0;
  const text = [page.intro, ...page.paragraphs].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
};

const rows: Row[] = [];
const seen = new Set<string>();

const addRow = (path: string, indexable: boolean) => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "");
  if (seen.has(clean)) return;
  seen.add(clean);
  const { type, service, location } = classify(clean);
  const page = prerenderContent(clean);
  rows.push({
    url: clean,
    type,
    service,
    location,
    indexable: indexable && !isNoindexPath(clean),
    canonical: canonicalPath(clean),
    title: page?.title ?? "",
    h1: page?.h1 ?? "",
    words: wordCount(clean),
  });
};

// 1. Indexable URLs from the sitemap (single source of truth for what's indexed).
const sitemapXml = readFileSync(resolve("public/sitemap.xml"), "utf8");
for (const m of sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = m[1].replace(SITE_URL, "") || "/";
  addRow(path, true);
}

// 2. Known noindex/thin routes, so the inventory also documents what's deliberately excluded.
const noindexStatic = ["/admin", "/admin/login", "/admin/seo", "/boka-takkontroll"];
for (const p of noindexStatic) addRow(p, false);

for (const loc of locations) {
  if (!hasServiceCombos(loc.region)) continue;
  for (const s of allServiceSlugs) {
    if (isThinCombo(s, loc)) addRow(`/${s}-${loc.slug}`, false);
  }
}

for (const s of brfLocationSlugs) addRow(`/brf/${s}`, true);
void regionSlugs; // already covered via sitemap for indexable region hubs

// 3. Sanity cross-check against data sources (counts only, not per-row).
const summary = {
  totalRows: rows.length,
  indexable: rows.filter((r) => r.indexable).length,
  noindex: rows.filter((r) => !r.indexable).length,
  byType: Object.fromEntries(
    Object.entries(
      rows.reduce<Record<string, number>>((acc, r) => {
        acc[r.type] = (acc[r.type] ?? 0) + 1;
        return acc;
      }, {}),
    ).sort((a, b) => b[1] - a[1]),
  ),
  blogPostsInData: blogPosts.length,
  projectsInData: projects.length,
  thinWordCount: rows.filter((r) => r.indexable && r.words > 0 && r.words < 300).length,
};

// 4. Write CSV.
const esc = (s: string | number | boolean) => `"${String(s).replace(/"/g, '""')}"`;
const header = ["url", "type", "service", "location", "indexable", "canonical", "title", "h1", "words"];
const csv = [
  header.join(","),
  ...rows
    .sort((a, b) => a.url.localeCompare(b.url))
    .map((r) => header.map((h) => esc((r as any)[h])).join(",")),
].join("\n");

writeFileSync(resolve("../ledning/marknad/content-inventory-2026.csv"), csv);

console.log(`[content-inventory] ${rows.length} rader skrivna till ledning/marknad/content-inventory-2026.csv`);
console.log(JSON.stringify(summary, null, 2));
