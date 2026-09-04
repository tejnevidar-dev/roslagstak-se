/**
 * Post-build-validering av all strukturerad data.
 *
 * Kör två kontroller och avslutar med kod 1 om något fel ELLER någon varning
 * hittas — bygget (och därmed publiceringen) blockeras då:
 *
 *  1. Schemakontroll: LocalBusiness, FAQPage och BreadcrumbList för varje
 *     sidtyp byggs med samma funktioner som appen använder (scripts/schema-fixtures.ts)
 *     och granskas mot Googles krav för rich results.
 *  2. Dist-kontroll: varje prerenderad HTML-fil i dist/ måste ha exakt en
 *     canonical, en robots-tagg och enbart JSON-LD som går att parsa.
 */
import { readFileSync, existsSync, readdirSync, statSync, rmSync } from "fs";
import { resolve, join } from "path";
import { tmpdir } from "os";
import { build as esbuild } from "esbuild";
import { pathToFileURL } from "url";

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const isAbs = (v) => typeof v === "string" && /^https:\/\//.test(v);
const strings = (n) =>
  typeof n === "string"
    ? [n]
    : Array.isArray(n)
      ? n.flatMap(strings)
      : n && typeof n === "object"
        ? Object.values(n).flatMap(strings)
        : [];

/* ---------- 1. Schemakontroll ---------- */
const bundlePath = resolve(tmpdir(), `schema-fixtures-${process.pid}.mjs`);
await esbuild({
  entryPoints: [resolve("scripts/schema-fixtures.ts")],
  outfile: bundlePath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  alias: { "@": resolve("src") },
  logLevel: "silent",
});
const { collectSchemas, serviceSlugMismatch } = await import(pathToFileURL(bundlePath).href);

const mismatch = serviceSlugMismatch();
if (mismatch) err("routing", mismatch);

const samples = collectSchemas();

const validateLocalBusiness = (page, s) => {
  if (s["@context"] !== "https://schema.org") err(page, "LocalBusiness saknar @context");
  if (!s["@type"]) err(page, "LocalBusiness saknar @type");
  if (!isAbs(s["@id"])) err(page, "LocalBusiness @id måste vara absolut URL");
  if (!s.name) err(page, "LocalBusiness saknar name");
  if (!isAbs(s.url)) err(page, "LocalBusiness url måste vara absolut");
  if (!isAbs(s.image)) err(page, "LocalBusiness image måste vara absolut");
  if (!/^\+46\d{6,}$/.test(String(s.telephone ?? ""))) err(page, "telephone är inte E.164");
  if (!s.address || s.address["@type"] !== "PostalAddress") err(page, "address saknas/felaktig");
  else if (!s.address.addressCountry) err(page, "address saknar addressCountry");
  if (typeof s.geo?.latitude !== "number" || typeof s.geo?.longitude !== "number")
    err(page, "geo saknar numeriska koordinater");
  for (const spec of s.openingHoursSpecification ?? []) {
    if (!/^\d{2}:\d{2}$/.test(spec.opens) || !/^\d{2}:\d{2}$/.test(spec.closes))
      err(page, "ogiltiga öppettider");
  }
  const areas = (s.areaServed ?? []).map((a) => a.name);
  if (areas.length === 0) err(page, "areaServed är tom");
  if (new Set(areas).size !== areas.length) err(page, "areaServed innehåller dubbletter");
  if (areas.some((n) => !n || n.trim() !== n)) err(page, "areaServed har tomma/otrimmade namn");
  const offers = s.hasOfferCatalog?.itemListElement ?? [];
  if (offers.length === 0) err(page, "hasOfferCatalog är tom");
  for (const offer of offers) {
    const item = offer.itemOffered ?? {};
    if (!isAbs(item["@id"])) err(page, `Offer "${item.name}" saknar absolut @id`);
    if (!item.description || item.description.length < 20)
      err(page, `Offer "${item.name}" har för kort description`);
    if (item.provider?.["@id"] !== s["@id"]) err(page, `Offer "${item.name}" pekar på fel provider`);
  }
  if (strings(s).some((v) => v.trim() === "")) err(page, "LocalBusiness innehåller tom sträng");
};

const validateFaq = (page, s) => {
  if (s["@type"] !== "FAQPage") err(page, "FAQ har fel @type");
  if (s["@id"] && !isAbs(s["@id"])) err(page, "FAQ @id är inte absolut");
  const entities = s.mainEntity ?? [];
  if (entities.length < 2) err(page, "FAQPage behöver minst 2 frågor");
  const seen = new Set();
  for (const q of entities) {
    if (q["@type"] !== "Question") err(page, "FAQ-post har fel @type");
    const name = String(q.name ?? "").trim();
    if (!name) err(page, "FAQ-fråga saknar text");
    if (seen.has(name)) err(page, `FAQ-fråga förekommer dubbelt: "${name}"`);
    seen.add(name);
    const answer = String(q.acceptedAnswer?.text ?? "").trim();
    if (q.acceptedAnswer?.["@type"] !== "Answer") err(page, `Svar saknar @type för "${name}"`);
    if (answer.length < 40) err(page, `För kort svar på "${name}"`);
    if (/undefined|NaN|\{\}/.test(answer)) err(page, `Svaret på "${name}" innehåller platshållartext`);
    if (/\s{2,}/.test(answer)) warn(page, `Dubbla blanksteg i svaret på "${name}"`);
  }
};

const validateBreadcrumb = (page, s) => {
  if (s["@type"] !== "BreadcrumbList") err(page, "Brödsmulor har fel @type");
  const items = s.itemListElement ?? [];
  if (items.length < 2) err(page, "BreadcrumbList behöver minst 2 steg");
  items.forEach((entry, i) => {
    if (entry["@type"] !== "ListItem") err(page, "Brödsmula har fel @type");
    if (entry.position !== i + 1) err(page, "Brödsmulornas position är inte i ordning");
    if (!entry.name) err(page, "Brödsmula saknar namn");
    if (!isAbs(entry.item)) err(page, `Brödsmula "${entry.name}" saknar absolut URL`);
  });
  if (items[0] && !/^https:\/\/[^/]+\/$/.test(items[0].item))
    err(page, "Första brödsmulan pekar inte på startsidan");
};

for (const { page, kind, schema } of samples) {
  try {
    JSON.parse(JSON.stringify(schema));
  } catch {
    err(page, `${kind} kan inte serialiseras till JSON-LD`);
    continue;
  }
  if (kind === "LocalBusiness") validateLocalBusiness(page, schema);
  else if (kind === "FAQPage") validateFaq(page, schema);
  else validateBreadcrumb(page, schema);
}

/* ---------- 2. Dist-kontroll ---------- */
const dist = resolve("dist");
let htmlChecked = 0;
if (existsSync(dist)) {
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry === "index.html") checkHtml(full);
    }
  };
  const checkHtml = (file) => {
    const rel = file.replace(dist, "") || "/index.html";
    const html = readFileSync(file, "utf8");
    htmlChecked++;
    const canon = html.match(/<link rel="canonical"[^>]*>/g) ?? [];
    if (canon.length !== 1) err(rel, `${canon.length} canonical-taggar (ska vara 1)`);
    const robots = html.match(/<meta name="robots"[^>]*>/g) ?? [];
    if (robots.length !== 1) err(rel, `${robots.length} robots-taggar (ska vara 1)`);
    for (const m of html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    )) {
      try {
        JSON.parse(m[1]);
      } catch (e) {
        err(rel, `ogiltig JSON-LD i HTML: ${e.message}`);
      }
    }
  };
  walk(dist);
} else {
  warn("dist", "dist/ finns inte — kör bygget före valideringen");
}

rmSync(bundlePath, { force: true });

/* ---------- Resultat ---------- */
console.log(
  `[schema-validate] granskade ${samples.length} scheman och ${htmlChecked} HTML-filer`,
);
for (const w of warnings.slice(0, 40)) console.warn(`  VARNING ${w}`);
for (const e of errors.slice(0, 40)) console.error(`  FEL ${e}`);
if (errors.length + warnings.length > 80)
  console.error(`  … totalt ${errors.length} fel och ${warnings.length} varningar`);

if (errors.length || warnings.length) {
  console.error(
    `[schema-validate] BLOCKERAR publicering: ${errors.length} fel, ${warnings.length} varningar`,
  );
  process.exit(1);
}
console.log("[schema-validate] OK — inga fel eller varningar");
