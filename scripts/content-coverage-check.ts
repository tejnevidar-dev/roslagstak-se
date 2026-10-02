/**
 * Innehålls-täckningskontroll (Marknadschefens beslut 2026-10-03, pipelinefix).
 *
 * Jämför varje godkänd ortstext i ledning/marknad/villaomraden/texter/*.md mening för mening
 * mot det som faktiskt byggs in på sidan via prerenderContent() (samma funktion som
 * generate-static-heads.mjs använder, som läser loc.longDescription/extraSections m.fl. direkt
 * ur src/data/locations.ts — ingen separat spegling att tappa synk med). Detta ersätter manuell
 * jämförelse mot Innehålls fetch-baserade live-kontroll.mjs, men kör lokalt mot byggd data i
 * stället för en nätverkshämtning, så den kan köras innan push.
 *
 * En briefs "## Områdestext"-sektion (till nästa "## ") räknas som sidans godkända facit:
 * den sträcker sig över både Områdestext, "### Vad det betyder för taket" och
 * "### Så går det till", exakt som i Innehålls egen mall/live-kontroll.mjs.
 *
 * Bara briefs vars deklarerade slug (**Slug:** eller **Slug-förslag:**) matchar en BEFINTLIG
 * post i locations.ts kontrolleras. Briefs utan matchande sida (BYGG EJ, kommunrad-only, väntar
 * på grind) hoppas över och listas separat, inte som fel.
 *
 * Kör: bun scripts/content-coverage-check.ts [--dir <mapp>] [--only <slug1,slug2,...>]
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { prerenderContent } from "./prerender-content";
import { locations } from "../src/data/locations";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/&nbsp;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|[“”"]/g, '"')
    .replace(/&#x27;|&#39;|’/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

const dirArgIdx = process.argv.indexOf("--dir");
const dir = dirArgIdx > -1 ? process.argv[dirArgIdx + 1] : "../ledning/marknad/villaomraden/texter";
const onlyArgIdx = process.argv.indexOf("--only");
const only = onlyArgIdx > -1 ? new Set(process.argv[onlyArgIdx + 1].split(",")) : null;

const files = readdirSync(resolve(dir)).filter((f) => f.endsWith(".md"));

/** Briefens egen **Slug:**-rad stämmer inte alltid med den slug Marknadschefen senare beslöt
 *  (t.ex. en sammanslagning som i stället blev en egen sida). Känd lista, underhålls manuellt. */
const slugOverrides: Record<string, string> = {
  "enskede-gard-stockholm.md": "enskede-gard",
  "enskedefaltet-stockholm.md": "enskedefaltet",
  "skalby-jarfalla.md": "barkarby",
  "barkarby-skalby-jarfalla.md": "barkarby",
  "norrskogen-vasterhaninge-haninge.md": "vasterhaninge",
};

type Result = { file: string; slug: string | null; status: "ok" | "missing" | "no-slug" | "not-built"; missing: string[]; total: number };
const results: Result[] = [];

for (const file of files) {
  const raw = readFileSync(join(resolve(dir), file), "utf8").replace(/\r/g, "");

  // Slug: **Slug:** /taklaggare-xyz (...) eller **Slug-förslag:** /taklaggare-xyz (...)
  const slugMatch = raw.match(/\*\*Slug(?:-förslag)?:\*\*\s*\/taklaggare-([a-z0-9-]+)/);
  const slug = slugOverrides[file] ?? (slugMatch ? slugMatch[1] : null);

  if (!slug) {
    results.push({ file, slug: null, status: "no-slug", missing: [], total: 0 });
    continue;
  }
  if (only && !only.has(slug)) continue;

  const loc = locations.find((l) => l.slug === slug);
  if (!loc) {
    results.push({ file, slug, status: "not-built", missing: [], total: 0 });
    continue;
  }

  const m = raw.match(/\n## Områdestext[^\n]*\n([\s\S]*?)(?=\n## )/);
  if (!m) {
    results.push({ file, slug, status: "no-slug", missing: [], total: 0 });
    continue;
  }

  const meningar = m[1]
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.replace(/^\d+\.\s*/, ""))
    .flatMap((l) => l.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [])
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  const page = prerenderContent(`/taklaggare-${slug}`);
  const liveText = norm(page ? [page.intro, ...page.paragraphs].join(" ") : "");
  const missing = meningar.filter((s) => !liveText.includes(norm(s)));

  results.push({ file, slug, status: missing.length ? "missing" : "ok", missing, total: meningar.length });
}

const ok = results.filter((r) => r.status === "ok");
const missing = results.filter((r) => r.status === "missing");
const notBuilt = results.filter((r) => r.status === "not-built");
const noSlug = results.filter((r) => r.status === "no-slug");

console.log(`\nInnehålls-täckningskontroll — ${results.length} briefs i ${dir}\n`);
console.log(`OK (full täckning): ${ok.length}`);
console.log(`SAKNAR MENINGAR: ${missing.length}`);
console.log(`INTE BYGGDA (ingen matchande slug i locations.ts): ${notBuilt.length}`);
console.log(`UTAN TOLKNINGSBAR SLUG/SEKTION: ${noSlug.length}\n`);

for (const r of missing) {
  console.log(`/taklaggare-${r.slug} (${r.file}): ${r.total - r.missing.length} av ${r.total} meningar täckta`);
  for (const s of r.missing) console.log(`  - saknas: "${s.slice(0, 160)}${s.length > 160 ? "…" : ""}"`);
}

if (process.argv.includes("--verbose")) {
  console.log("\nInte byggda:");
  for (const r of notBuilt) console.log(`  - ${r.file} (slug: ${r.slug})`);
}

process.exitCode = missing.length ? 1 : 0;
