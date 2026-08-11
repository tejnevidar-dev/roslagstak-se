/**
 * Post-build prerender of head tags.
 *
 * The app is a client-rendered SPA, so <link rel="canonical"> and
 * <meta name="robots"> from SEOHead (react-helmet-async) only exist after JS
 * runs. This script writes one static HTML file per route (dist/<path>/index.html)
 * with those tags already present in the initial HTML, so crawlers that do not
 * execute JS still get the correct canonical, robots and og:url.
 *
 * Route list comes from public/sitemap.xml (single source of truth) plus the
 * noindex routes that are deliberately kept out of the sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";

const SITE_URL = "https://roslagstak.se";
const dist = resolve("dist");
const templatePath = resolve(dist, "index.html");

if (!existsSync(templatePath)) {
  console.log("[static-heads] no dist/index.html — skipping");
  process.exit(0);
}

const template = readFileSync(templatePath, "utf8");
const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");

const INDEX_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow";

const noindexRoutes = ["/admin", "/admin/login", "/admin/seo"];

const routes = [
  ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE_URL, "") || "/")
    .map((path) => ({ path, robots: INDEX_ROBOTS })),
  ...noindexRoutes.map((path) => ({ path, robots: NOINDEX_ROBOTS })),
];

const headFor = (path, robots) => {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:url" content="${url}" />`,
  ].join("\n    ");
};

// Strip the sitewide hreflang/canonical placeholders so no route ships two.
const stripped = template.replace(
  /\s*<link rel="alternate" hreflang="(?:sv|x-default)" href="[^"]*" \/>/g,
  "",
);

let written = 0;
for (const { path, robots } of routes) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const html = stripped.replace(
    "</head>",
    `  ${headFor(path, robots)}
    <link rel="alternate" hreflang="sv" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
  </head>`,
  );
  const out = path === "/" ? templatePath : resolve(dist, `.${path}/index.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written++;
}

console.log(`[static-heads] wrote ${written} prerendered head files`);
