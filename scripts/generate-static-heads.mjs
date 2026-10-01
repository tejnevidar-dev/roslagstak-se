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
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync } from "fs";
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
const { prerenderContent, thinComboPaths } = await import(pathToFileURL(bundlePath).href);

const INDEX_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow";

const noindexRoutes = [
  "/admin", "/admin/login", "/admin/seo",
  "/boka-takkontroll",
  ...["taby", "norrtalje", "vallentuna", "akersberga", "danderyd", "sollentuna", "rimbo", "hallstavik", "tyreso", "salem"].map((s) => `/offert/${s}`),
];

const routes = [
  ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE_URL, "") || "/")
    .map((path) => ({ path, robots: INDEX_ROBOTS })),
  ...noindexRoutes.map((path) => ({ path, robots: NOINDEX_ROBOTS })),
  ...thinComboPaths.map((path) => ({ path, robots: "noindex, follow" })),
];

/* Sidkomponenterna laddas lazy. Utan hint hämtas deras chunk först när huvudscriptet körts
   (en extra tur och retur). modulepreload i den statiska HTML:en hämtar den parallellt. */
const assetFiles = existsSync(resolve(dist, "assets")) ? readdirSync(resolve(dist, "assets")) : [];
const LANDING_STATIC = ["/takreparation", "/takkontroll", "/rot-avdrag", "/akut-lackage", "/hangrannor", "/platslagare", "/takbyte-var-2027"];
const COMBO_RE = /^\/(takbyte|takrenovering|takomlaggning|bandtackning|platttak|betongpannor|tegeltak|takmalning|taktvatt)-/;
const chunkPrefixFor = (path) => {
  if (path.startsWith("/offert/")) return "AdLandingPage-";
  if (LANDING_STATIC.includes(path)) return "ServiceLandingPage-";
  if (path.startsWith("/blogg/")) return "BlogPost-";
  if (path.startsWith("/taklaggare-")) return "LocationPage-";
  if (COMBO_RE.test(path)) return "ServiceLocationPage-";
  return null;
};
const preloadFor = (path) => {
  const prefix = chunkPrefixFor(path);
  const file = prefix && assetFiles.find((f) => f.startsWith(prefix) && f.endsWith(".js"));
  return file ? [`<link rel="modulepreload" crossorigin href="/assets/${file}" />`] : [];
};

const headFor = (path, robots) => {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return [
    ...preloadFor(path),
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
let stripped = template.replace(
  /\s*<link rel="alternate" hreflang="(?:sv|x-default)" href="[^"]*" \/>/g,
  "",
);

/* Prestanda: Vite lägger sin <script type="module"> och CSS-länk sist i <head>, efter flera KB
   metadata och JSON-LD-scheman. Webbläsarens preload-scanner måste tolka allt det först innan den
   hittar den renderingskritiska koden. Vi lägger därför tidiga preload-hintar för samma CSS- och
   JS-fil högst upp i <head> (rätt efter charset), så att hämtningen börjar direkt, utan att flytta
   eller ta bort själva Vite-taggarna längre ner. */
const mainCss = stripped.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/)?.[1];
const mainJs = stripped.match(/<script type="module"[^>]*src="([^"]+)"/)?.[1];
/* crossorigin måste matcha exakt det Vite-taggen längre ner har (annars räknar webbläsaren
   preload och den riktiga hämtningen som två olika förfrågningar och laddar filen två gånger). */
const earlyHints = [
  mainCss ? `<link rel="preload" as="style" crossorigin href="${mainCss}" />` : "",
  mainJs ? `<link rel="preload" as="script" crossorigin href="${mainJs}" />` : "",
]
  .filter(Boolean)
  .join("\n    ");
if (earlyHints) {
  stripped = stripped.replace(
    '<meta charset="UTF-8" />',
    `<meta charset="UTF-8" />\n    ${earlyHints}`,
  );
}

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
  if (page?.ogImage) {
    /* Sidspecifik delningsbild (projektfoto/materialbild) i stället för den sitewide
       og-image.jpg (SEO-audit P2, 2026-09-29). Bredd/höjd tas bort eftersom dessa foton inte är
       1200×630 — samma regel som SEOHead.tsx tillämpar klientsidan. */
    const imageUrl = `${SITE_URL}${page.ogImage}`;
    const imageAlt = esc(page.ogImageAlt ?? page.title ?? "");
    html = html
      .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
      .replace(/\s*<meta property="og:image:width" content="[^"]*" \/>/, "")
      .replace(/\s*<meta property="og:image:height" content="[^"]*" \/>/, "")
      .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${imageAlt}" />`)
      .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);
  }

  const body = robots === NOINDEX_ROBOTS ? "" : bodyFor(path);
  if (body) {
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    prerendered++;
  }
  const out = path === "/" ? templatePath : resolve(dist, `.${path}.html`);
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
/* 404.html (2026-10-01, mjuk 404): utan den här filen behandlar Cloudflare Pages sajten som en
   SPA och svarar 200 med startsidans HTML (titel + index,follow) på VARJE okänd adress. Med
   404.html i roten svarar Pages i stället med statuskod 404 och den här filen. Varje riktig
   route har en egen statisk fil (se loopen ovan + alias), så inga riktiga sidor påverkas.
   Filen är fortfarande SPA-skalet: React startar och visar NotFound-sidan (eller, som skyddsnät,
   rätt sida om en route skulle sakna statisk fil). */
{
  let html = stripped
    .replace(/<title>[^<]*<\/title>/, "<title>Sidan finns inte | RoslagsTak</title>")
    .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />')
    .replace(/\s*<link rel="canonical" href="[^"]*" \/>/g, "")
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      '<meta name="description" content="Sidan du letar efter finns inte. Gå till startsidan eller boka en kostnadsfri takkontroll." />',
    );
  if (!/name="robots" content="noindex, follow"/.test(html)) {
    html = html.replace("</head>", '  <meta name="robots" content="noindex, follow" />\n  </head>');
  }
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><div id="prerendered-content" style="max-width:820px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;line-height:1.65">
      <p style="font-weight:600;color:#1a365d">RoslagsTak — takläggare i Roslagen · 070-154 36 39</p>
      <h1 style="font-size:2rem;color:#1a365d;line-height:1.25">Sidan finns inte</h1>
      <p>Adressen du följde finns inte på roslagstak.se.</p>
      <nav aria-label="Sidlänkar"><ul><li><a href="/">Till startsidan</a></li><li><a href="/takkontroll">Kostnadsfri takkontroll</a></li><li><a href="/omraden">Områden</a></li><li><a href="/kontakt">Kontakt</a></li></ul></nav>
    </div></div>`,
  );
  writeFileSync(resolve(dist, "404.html"), html);
}

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
  const out = resolve(dist, `.${alias}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  aliases++;
}

rmSync(bundlePath, { force: true });
console.log(
  `[static-heads] wrote ${written} prerendered files (${prerendered} with page text, ${aliases} alias-redirects)`,
);
