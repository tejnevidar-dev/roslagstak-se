/**
 * Post-build prerender of head tags AND the important page text.
 *
 * The app is a client-rendered SPA, so <link rel="canonical"> and
 * <meta name="robots"> from SEOHead (react-helmet-async) only exist after JS
 * runs. This script writes one static HTML file per route (dist/<path>/index.html)
 * with those tags already present in the initial HTML, so crawlers that do not
 * execute JS still get the correct canonical, robots and og:url.
 *
 * It also injects the route's H1, intro, body paragraphs and key internal links
 * into <div id="root"> (see scripts/prerender-content.ts). React clears #root
 * when it mounts, so the app then renders the same content — the prerendered
 * text is identical to what visitors see.
 *
 * Route list comes from public/sitemap.xml (single source of truth) plus the
 * noindex routes that are deliberately kept out of the sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { tmpdir } from "os";
import { build as esbuild } from "esbuild";
import { pathToFileURL } from "url";

const SITE_URL = "https://roslagstak.se";
const dist = resolve("dist");
const templatePath = resolve(dist, "index.html");

if (!existsSync(templatePath)) {
  console.log("[static-heads] no dist/index.html — skipping");
  process.exit(0);
}

const template = readFileSync(templatePath, "utf8");
const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");

/* Compile the TS content model to JS so this plain .mjs script can import it.
   esbuild ships with Vite, so no extra dependency is needed. */
const bundlePath = resolve(tmpdir(), `prerender-content-${process.pid}.mjs`);
await esbuild({
  entryPoints: [resolve("scripts/prerender-content.ts")],
  outfile: bundlePath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  logLevel: "silent",
});
const { prerenderContent } = await import(pathToFileURL(bundlePath).href);

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

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Static markup for the route's important text, injected inside #root. */
const bodyFor = (path) => {
  const page = prerenderContent(path);
  if (!page) return "";
  const seen = new Set();
  const links = page.links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
  return `<div id="prerendered-content" style="max-width:820px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;line-height:1.65">
      <p style="font-weight:600;color:#1a365d">RoslagsTak — takläggare i Roslagen · 070-154 36 39</p>
      <h1 style="font-size:2rem;color:#1a365d;line-height:1.25">${esc(page.h1)}</h1>
      <p style="font-size:1.05rem">${esc(page.intro)}</p>
      ${page.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n      ")}
      <nav aria-label="Sidlänkar"><ul>${links
        .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
        .join("")}</ul></nav>
    </div>`;
};

// Strip the sitewide hreflang/canonical placeholders so no route ships two.
const stripped = template.replace(
  /\s*<link rel="alternate" hreflang="(?:sv|x-default)" href="[^"]*" \/>/g,
  "",
);

let written = 0;
let prerendered = 0;
for (const { path, robots } of routes) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  let html = stripped.replace(
    "</head>",
    `  ${headFor(path, robots)}
    <link rel="alternate" hreflang="sv" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
  </head>`,
  );

  /* Unique <title> and meta description per route, already in the static HTML.
     The SPA template ships the homepage title on every route — crawlers that
     do not execute JS would otherwise see 1 300+ identical titles. Mirrors
     SEOHead's rule of appending " | RoslagsTak" to short titles. */
  const page = robots === NOINDEX_ROBOTS ? null : prerenderContent(path);
  if (page?.title) {
    const fullTitle =
      page.title.length > 47 || page.title.includes("RoslagsTak")
        ? page.title
        : `${page.title} | RoslagsTak`;
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`);
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${esc(fullTitle)}" />`,
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
    );
  }
  if (page?.description) {
    html = html.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${esc(page.description)}" />`,
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${esc(page.description)}" />`,
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${esc(page.description)}" />`,
    );
  }

  const body = robots === NOINDEX_ROBOTS ? "" : bodyFor(path);
  if (body) {
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    prerendered++;
  }
  const out = path === "/" ? templatePath : resolve(dist, `.${path}/index.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written++;
}

/* Alias-/dubblett-URL:er: hostingen kan inte skicka riktig 301 för SPA-filer,
   så varje alias får en egen sida med rel=canonical mot primärversionen,
   noindex + meta-refresh och en JS-redirect. Sökmotorer slår ihop signalerna
   och besökare hamnar direkt på den kanoniska sidan. */
const aliasEntries = [
  ["/tjanster/takvard", "/tjanster/taktvatt"],
  ["/taktvatt", "/tjanster/taktvatt"],
  ["/radgivning", "/kontakt"],
  ["/konsultation", "/kontakt"],
  ["/boka", "/kontakt"],
];
let aliases = 0;
for (const [alias, target] of aliasEntries) {
  const targetUrl = `${SITE_URL}${target}`;
  const html = `<!DOCTYPE html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <title>Flyttad — RoslagsTak</title>
    <link rel="canonical" href="${targetUrl}" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <script>window.location.replace("${target}" + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p>Sidan har flyttat till <a href="${target}">${targetUrl}</a>.</p>
  </body>
</html>
`;
  const out = resolve(dist, `.${alias}/index.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  aliases++;
}

rmSync(bundlePath, { force: true });
console.log(
  `[static-heads] wrote ${written} prerendered files (${prerendered} with page text, ${aliases} alias-redirects)`,
);
