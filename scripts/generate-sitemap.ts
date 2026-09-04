/**
 * Regenerates public/sitemap.xml from the app's data sources.
 *
 * Preserves the static + blog entries (with their lastmod dates) that are
 * already present, and rebuilds the location + service-location combo entries
 * from src/data/locations.ts so the sitemap always matches the routes.
 *
 * Run:  bun scripts/generate-sitemap.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { allServiceSlugs } from "../src/data/service-location-combos";
import { CANONICAL_ALIASES, canonicalPath, isNoindexPath, normalizePath } from "../src/lib/canonical";

const SITE_URL = "https://roslagstak.se";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

// ---------- 1. Preserve existing static + blog entries from current sitemap ----------
const current = readFileSync(resolve("public/sitemap.xml"), "utf8");
const existingEntries: Entry[] = [];
for (const m of current.matchAll(
  /<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]*)<\/lastmod>)?(?:\s*<changefreq>([^<]*)<\/changefreq>)?(?:\s*<priority>([^<]*)<\/priority>)?\s*<\/url>/g,
)) {
  const url = m[1].trim();
  const path = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || "/" : url;
  // Skip location and combo pages — we regenerate them below.
  if (/^\/taklaggare-/.test(path)) continue;
  if (allServiceSlugs.some((s) => path.startsWith(`/${s}-`))) continue;
  existingEntries.push({
    path,
    lastmod: m[2]?.trim() || undefined,
    changefreq: m[3]?.trim() || undefined,
    priority: m[4]?.trim() || undefined,
  });
}

// ---------- 2. Build location pages ----------
const locationEntries: Entry[] = locations.map((l) => ({
  path: `/taklaggare-${l.slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

// ---------- 3. Build service-location combo pages ----------
const comboEntries: Entry[] = locations.flatMap((l) =>
  allServiceSlugs.map((s) => ({
    path: `/${s}-${l.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
);

// ---------- 4. Assemble + filtrera till indexerbara canonical-URL:er ----------
const rawEntries: Entry[] = [...existingEntries, ...locationEntries, ...comboEntries];

const skipped: string[] = [];
const seen = new Set<string>();
const entries: Entry[] = [];

for (const entry of rawEntries) {
  const path = normalizePath(entry.path);
  const canonical = canonicalPath(path);

  // Aliassidor (t.ex. /taktvatt, /tjanster/takvard, /boka) hör inte i sitemapen —
  // bara primärversionen ska indexeras.
  if (canonical !== path) {
    skipped.push(`${path} -> alias för ${canonical}`);
    continue;
  }
  // Noindex-sidor (admin m.m.) och 404 ska aldrig med.
  if (isNoindexPath(path) || path === "/404" || path === "/not-found") {
    skipped.push(`${path} -> noindex`);
    continue;
  }
  if (seen.has(canonical)) {
    skipped.push(`${path} -> dubblett`);
    continue;
  }
  seen.add(canonical);
  entries.push({ ...entry, path: canonical });
}

function generateSitemap(list: Entry[]): string {
  const urls = list.map((e) => {
    const loc = e.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${e.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml: uteslöt ${skipped.length} icke-indexerbara URL:er${skipped.length ? ` (${skipped.slice(0, 8).join(", ")}${skipped.length > 8 ? ", …" : ""})` : ""}`);
console.log(`sitemap.xml written — ${entries.length} entries (${locationEntries.length} locations, ${comboEntries.length} combos, ${existingEntries.length} static/blog).`);
