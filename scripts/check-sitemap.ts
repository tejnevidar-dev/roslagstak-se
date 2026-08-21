/**
 * Sitemap status check.
 *
 * Run with:  bun scripts/check-sitemap.ts            (static/offline check)
 *            bun scripts/check-sitemap.ts --live     (also HTTP-check every URL)
 *            bun scripts/check-sitemap.ts --live --base=http://localhost:8080
 *
 * Static checks (no network needed, safe to run before every publish):
 *  - malformed / non-canonical <loc> values (wrong host, trailing slash, query,
 *    uppercase, duplicates)
 *  - URLs that would render the 404 page (no matching route in the app)
 *  - URLs that are aliases of another canonical URL (duplicate content)
 *  - URLs that resolve to a noindex path (admin etc.)
 *  - routes that exist in the app but are missing from the sitemap (orphans)
 *  - prerendered dist/<path>/index.html: missing file, noindex robots tag or
 *    canonical that does not match the sitemap URL
 *
 * Live checks (--live): real HTTP status per URL, redirect target, and the
 * robots meta tag in the served HTML. Anything that is not 200 + index is
 * flagged.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { allServiceSlugs } from "../src/data/service-location-combos";
import {
  CANONICAL_ALIASES,
  SITE_URL,
  canonicalPath,
  isNoindexPath,
  normalizePath,
} from "../src/lib/canonical";

const args = process.argv.slice(2);
const LIVE = args.includes("--live");
const BASE = (args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? SITE_URL).replace(/\/$/, "");

type Issue = { level: "error" | "warn"; url: string; message: string };
const issues: Issue[] = [];
const fail = (url: string, message: string) => issues.push({ level: "error", url, message });
const warn = (url: string, message: string) => issues.push({ level: "warn", url, message });

/* ---------- 1. read sitemap ---------- */
const sitemapPath = resolve("public/sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (locs.length === 0) {
  console.error("[sitemap] no <loc> entries found in public/sitemap.xml");
  process.exit(1);
}

/* ---------- 2. build the set of routes the app actually serves ---------- */
const src = (p: string) => readFileSync(resolve(p), "utf8");

const serviceSlugs = [
  ...src("src/components/Services.tsx").matchAll(/slug:\s*"([^"]+)"/g),
].map((m) => m[1]);
const blogSlugs = [...src("src/data/blog-posts.ts").matchAll(/slug:\s*"([^"]+)"/g)].map(
  (m) => m[1],
);

const staticRoutes = [
  "/",
  "/recensioner",
  "/priser",
  "/offert",
  "/taktyper",
  "/hur-det-gar-till",
  "/blogg",
  "/kontakt",
  "/radgivning",
  "/konsultation",
  "/boka",
  "/taktvatt",
  "/tjanster/taktvatt",
  "/tjanster/takvard",
  "/admin",
  "/admin/login",
  "/admin/seo",
];

const knownRoutes = new Set<string>([
  ...staticRoutes,
  ...serviceSlugs.map((s) => `/tjanster/${s}`),
  ...blogSlugs.map((s) => `/blogg/${s}`),
  ...locations.map((l) => `/taklaggare-${l.slug}`),
  ...locations.flatMap((l) => allServiceSlugs.map((s) => `/${s}-${l.slug}`)),
]);

/* ---------- 3. static validation of every sitemap URL ---------- */
const seen = new Map<string, number>();
const sitemapPaths = new Set<string>();

for (const url of locs) {
  if (!url.startsWith(`${SITE_URL}/`)) {
    fail(url, `wrong host — must start with ${SITE_URL}/`);
    continue;
  }
  const raw = url.slice(SITE_URL.length) || "/";
  if (raw !== raw.toLowerCase()) fail(url, "uppercase characters in URL");
  if (/[?#]/.test(raw)) fail(url, "query string or fragment in sitemap URL");
  if (raw.length > 1 && raw.endsWith("/")) fail(url, "trailing slash (canonical has none)");

  const path = normalizePath(raw);
  seen.set(url, (seen.get(url) ?? 0) + 1);
  sitemapPaths.add(path);

  if (!knownRoutes.has(path)) fail(url, "no matching route in App.tsx → renders 404 page");
  if (isNoindexPath(path)) fail(url, "noindex path must not be in the sitemap");
  const canonical = canonicalPath(path);
  if (canonical !== path)
    fail(url, `alias of ${SITE_URL}${canonical} — duplicate, remove from sitemap`);
}

for (const [url, count] of seen) if (count > 1) fail(url, `duplicated ${count}× in sitemap`);

/* ---------- 4. orphan routes: indexable but not in the sitemap ---------- */
for (const route of knownRoutes) {
  if (isNoindexPath(route)) continue;
  if (canonicalPath(route) !== route) continue; // alias, intentionally excluded
  if (!sitemapPaths.has(route)) warn(`${SITE_URL}${route}`, "indexable route missing from sitemap");
}

/* ---------- 5. prerendered head tags in dist (if a build exists) ---------- */
const dist = resolve("dist");
let checkedHeads = 0;
if (existsSync(resolve(dist, "index.html"))) {
  for (const path of sitemapPaths) {
    const file = path === "/" ? resolve(dist, "index.html") : resolve(dist, `.${path}/index.html`);
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    if (!existsSync(file)) {
      fail(url, "no prerendered dist file → served as SPA fallback without static head tags");
      continue;
    }
    checkedHeads++;
    const html = readFileSync(file, "utf8");
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? "";
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "";
    if (/noindex/i.test(robots)) fail(url, `prerendered head is noindex ("${robots}")`);
    if (!robots) fail(url, "prerendered head has no robots meta tag");
    if (!canonical) fail(url, "prerendered head has no canonical tag");
    else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, ""))
      fail(url, `canonical mismatch: head says ${canonical}`);
  }
} else {
  warn(sitemapPath, "no dist build found — run `npm run build` to check prerendered head tags");
}

/* ---------- 6. live HTTP status ---------- */
let liveChecked = 0;
if (LIVE) {
  const paths = [...sitemapPaths];
  const CONCURRENCY = 12;
  let cursor = 0;
  const worker = async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      const target = `${BASE}${path === "/" ? "/" : path}`;
      const label = `${SITE_URL}${path === "/" ? "/" : path}`;
      try {
        const res = await fetch(target, { redirect: "manual" });
        liveChecked++;
        if (res.status >= 300 && res.status < 400) {
          fail(label, `HTTP ${res.status} → ${res.headers.get("location") ?? "?"}`);
          continue;
        }
        if (res.status !== 200) {
          fail(label, `HTTP ${res.status}`);
          continue;
        }
        const html = await res.text();
        const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? "";
        if (/noindex/i.test(robots)) fail(label, `served HTML is noindex ("${robots}")`);
      } catch (e) {
        fail(label, `request failed: ${(e as Error).message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

/* ---------- report ---------- */
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

console.log(`\nSitemap status check — ${locs.length} URLs in public/sitemap.xml`);
console.log(`  unique paths        : ${sitemapPaths.size}`);
console.log(`  known app routes    : ${knownRoutes.size}`);
console.log(`  prerendered checked : ${checkedHeads}`);
console.log(`  live HTTP checked   : ${LIVE ? `${liveChecked} (${BASE})` : "skipped (--live to enable)"}`);

const print = (list: Issue[], title: string) => {
  if (!list.length) return;
  console.log(`\n${title} (${list.length}):`);
  for (const i of list.slice(0, 60)) console.log(`  ${i.url}\n    ${i.message}`);
  if (list.length > 60) console.log(`  … and ${list.length - 60} more`);
};
print(errors, "AVVIKELSER (blockerar publicering)");
print(warnings, "VARNINGAR");

if (!errors.length && !warnings.length) console.log("\n✓ Inga avvikelser — sitemap är klar för publicering.\n");
else console.log("");

process.exit(errors.length ? 1 : 0);