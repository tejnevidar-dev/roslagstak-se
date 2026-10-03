/**
 * Innehålls-täckningskontroll (Marknadschefens beslut 2026-10-03, pipelinefix).
 *
 * Jämför varje godkänd brief mening för mening mot det som faktiskt byggs in på sidan via
 * prerenderContent() — samma funktion byggprocessen använder för att generera den statiska
 * HTML:en, som läser locations.ts/problems.ts/materials.ts direkt ur källan. Ingen separat
 * spegling att tappa synk med. Detta ersätter manuell jämförelse mot Innehålls fetch-baserade
 * live-kontroll.mjs, men kör lokalt mot byggd data i stället för en nätverkshämtning.
 *
 * Täcker två brieftyper:
 * 1) Ortssidor (villaomraden/texter/*.md): "## Områdestext"-sektionen (till nästa "## ") räknas
 *    som sidans godkända facit, exakt som i Innehålls egen mall/live-kontroll.mjs.
 * 2) Problem- och materialsidor (innehall/problemtexter|materialtexter/*.md): antingen ett
 *    ```ts-block med en eller flera objektlitteraler (problems.ts/materials.ts-fält direkt),
 *    eller ett **fältnamn:**-format med ett enda facit per fil (**Slug:**-raden i headern).
 *
 * Kör: bun scripts/content-coverage-check.ts [--dir <mapp>] [--only <slug1,slug2,...>] [--verbose]
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { prerenderContent } from "./prerender-content";
import { locations } from "../src/data/locations";
import { regionBySlug } from "../src/data/regions";
import { regionTexts } from "../src/data/region-texts";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown-länk [text](url) -> text
    .replace(/&nbsp;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|[“”"]/g, '"')
    .replace(/&#x27;|&#39;|’/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\*\*/g, "") // markdown-fet **text** -> text (körs före kursiv-strippen nedan,
    // annars äter kursivregexen hälften av ett fetmarkeringspar och lämnar lösa asterisker)
    .replace(/\*([^*]+)\*/g, "$1") // markdown-kursiv *text* -> text
    .replace(/\s+/g, " ")
    .trim();

const toSentences = (text: string) =>
  text
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""))
    .flatMap((l) => l.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [])
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

const onlyArgIdx = process.argv.indexOf("--only");
const only = onlyArgIdx > -1 ? new Set(process.argv[onlyArgIdx + 1].split(",")) : null;
const verbose = process.argv.includes("--verbose");

type Result = { page: string; file: string; status: "ok" | "missing" | "no-slug" | "not-built"; missing: string[]; total: number };
const allResults: Result[] = [];

/* ---------- 1) Ortssidor ---------- */

const dirArgIdx = process.argv.indexOf("--dir");
const locDir = dirArgIdx > -1 ? process.argv[dirArgIdx + 1] : "../ledning/marknad/villaomraden/texter";

/** Briefens egen **Slug:**-rad stämmer inte alltid med den slug Marknadschefen senare beslöt
 *  (t.ex. en sammanslagning som i stället blev en egen sida). Känd lista, underhålls manuellt. */
const slugOverrides: Record<string, string> = {
  "enskede-gard-stockholm.md": "enskede-gard",
  "enskedefaltet-stockholm.md": "enskedefaltet",
  "skalby-jarfalla.md": "barkarby",
  "barkarby-skalby-jarfalla.md": "barkarby",
  "norrskogen-vasterhaninge-haninge.md": "vasterhaninge",
};

/** Godkända undantag: en enda CTA-fråga per sammanslagen sida ("Bor du i X ...?"), där X är
 *  underbriefens delområdesnamn men sidans egen CTA redan frågar om den riktiga sidans namn.
 *  Att tvinga in frågan en gång till skulle bara upprepa samma uppmaning med fel ortsnamn.
 *  Marknadschefens godkännande 2026-10-03 (se commit). Håll listan kort — varje rad ska vara
 *  en medveten, dokumenterad avvikelse, inte en genväg runt grinden. */
const acceptedGaps: Record<string, string[]> = {
  "nasby-slott-taby.md": ["Bor du vid Näsby slott eller Näsby allé och funderar på taket?"],
  "norrskogen-vasterhaninge-haninge.md": ["Bor du i Norrskogen i Västerhaninge och funderar på taket?"],
  "skalby-jarfalla.md": ["Bor du i Skälby och funderar på taket?"],
};

/** Godkända områdesbriefar: filen står i _godkanda-versioner.json (Innehåll) eller har en Grind-rad. En brief som
 *  varken är godkänd eller delvis byggd är "inte byggd" (informativt), inte ett fel: den väntar på Marknadschefens grind. */
const approvedFiles = (() => {
  try {
    const j = JSON.parse(readFileSync(join(resolve(locDir), "_godkanda-versioner.json"), "utf8")) as { sidor: { fil: string }[] };
    return new Set(j.sidor.map((x) => x.fil));
  } catch {
    return new Set<string>();
  }
})();

for (const file of readdirSync(resolve(locDir)).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(join(resolve(locDir), file), "utf8").replace(/\r/g, "");

  const slugMatch = raw.match(/\*\*Slug(?:-förslag)?:\*\*\s*\/taklaggare-([a-z0-9-]+)/);
  const slug = slugOverrides[file] ?? (slugMatch ? slugMatch[1] : null);

  if (!slug) {
    allResults.push({ page: "", file, status: "no-slug", missing: [], total: 0 });
    continue;
  }
  if (only && !only.has(slug)) continue;

  if (!locations.find((l) => l.slug === slug)) {
    allResults.push({ page: `/taklaggare-${slug}`, file, status: "not-built", missing: [], total: 0 });
    continue;
  }

  const m = raw.match(/\n## Områdestext[^\n]*\n([\s\S]*?)(?=\n## )/);
  if (!m) {
    allResults.push({ page: `/taklaggare-${slug}`, file, status: "no-slug", missing: [], total: 0 });
    continue;
  }

  const meningar = toSentences(m[1]);
  const page = prerenderContent(`/taklaggare-${slug}`);
  const liveText = norm(page ? [page.intro, ...page.paragraphs].join(" ") : "");
  const accepted = acceptedGaps[file] ?? [];
  const missing = meningar.filter((s) => !liveText.includes(norm(s)) && !accepted.includes(s));

  const approved = approvedFiles.has(file) || /\*\*Grind:\*\*\s*GODKÄND/.test(raw);
  const status = !missing.length ? "ok" : !approved && missing.length === meningar.length ? "not-built" : "missing";
  allResults.push({ page: `/taklaggare-${slug}`, file, status, missing: status === "missing" ? missing : [], total: meningar.length });
}

/* ---------- 2) Problem- och materialsidor ---------- */

const PROBLEM_FIELDS = ["intro", "symptom", "orsaker", "akut", "undersokning", "atgarder", "gorInteSjalv"];
const MATERIAL_FIELDS = [
  "intro",
  "funktion",
  "anvandning",
  "livslangd",
  "fordelar",
  "nackdelar",
  "passarNar",
  "underhall",
  "vanligaFel",
  "kostnadsdrivare",
  "delAvTaksystemet",
  "hosOss",
  "hallIsar",
];

/** Godkända undantag: korshänvisningar i briefen ("Riktpriser finns på /priser. Ditt fasta
 *  pris får du efter en kostnadsfri takkontroll.") som MaterialDetail-fälten inte kan rendera
 *  som riktiga länkar (plain text, ingen markdown-rendering i MaterialPage.tsx) — sidan har
 *  redan motsvarande länkar via /priser och /takkontroll i primaryLinks/MONEY_LINKS, bara med
 *  en annan formulering. Öppen fråga till Marknadschefen/Innehåll: ska MaterialDetail-fälten
 *  stödja riktiga inline-länkar (större ändring av MaterialPage.tsx)? Till då: dokumenterat
 *  undantag, inte en tyst genväg. */
const pmRiktprisGap = [
  "Riktpriser finns på /priser.",
  "Ditt fasta pris får du efter en kostnadsfri takkontroll.",
];
const pmAcceptedGaps: Record<string, string[]> = {
  "papptak.md": pmRiktprisGap,
  "underlagstak.md": pmRiktprisGap,
  "pannplat.md": pmRiktprisGap,
};

type PmDir = { dir: string; kind: "takproblem" | "material"; fields: string[] };
const pmDirs: PmDir[] = [
  { dir: "../ledning/marknad/innehall/problemtexter", kind: "takproblem", fields: PROBLEM_FIELDS },
  { dir: "../ledning/marknad/innehall/materialtexter", kind: "material", fields: MATERIAL_FIELDS },
];

const extractField = (chunk: string, field: string): string | null => {
  const re = new RegExp(`(?:^|\\n)\\s*${field}:\\s*\\n?\\s*"([^"]*)"`, "");
  const tsMatch = chunk.match(re);
  if (tsMatch) return tsMatch[1];
  const mdRe = new RegExp(`\\*\\*${field}:\\*\\*\\n([\\s\\S]*?)(?=\\n\\*\\*[a-zA-Z]|\\n##|\\n---|$)`, "");
  const mdMatch = chunk.match(mdRe);
  return mdMatch ? mdMatch[1] : null;
};

for (const { dir, kind, fields } of pmDirs) {
  for (const file of readdirSync(resolve(dir)).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(join(resolve(dir), file), "utf8").replace(/\r/g, "");

    const tsBlockMatch = raw.match(/```ts\n([\s\S]*?)```/);
    type Entry = { slug: string; chunk: string };
    const entries: Entry[] = [];

    if (tsBlockMatch) {
      const block = tsBlockMatch[1];
      const slugRe = /slug:\s*"([a-z0-9-]+)"/g;
      const starts: { slug: string; index: number }[] = [];
      let sm: RegExpExecArray | null;
      while ((sm = slugRe.exec(block))) starts.push({ slug: sm[1], index: sm.index });
      for (let i = 0; i < starts.length; i++) {
        const end = i + 1 < starts.length ? starts[i + 1].index : block.length;
        entries.push({ slug: starts[i].slug, chunk: block.slice(starts[i].index, end) });
      }
    } else {
      const slugMatch = raw.match(new RegExp(`\\/${kind}\\/([a-z0-9-]+)`));
      if (slugMatch) entries.push({ slug: slugMatch[1], chunk: raw });
    }

    if (entries.length === 0) {
      allResults.push({ page: "", file: `${kind}texter/${file}`, status: "no-slug", missing: [], total: 0 });
      continue;
    }

    for (const { slug, chunk } of entries) {
      if (only && !only.has(slug)) continue;
      const page = prerenderContent(`/${kind}/${slug}`);
      if (!page) {
        allResults.push({ page: `/${kind}/${slug}`, file, status: "not-built", missing: [], total: 0 });
        continue;
      }

      const meningar = fields.flatMap((f) => {
        const val = extractField(chunk, f);
        return val ? toSentences(val) : [];
      });
      const liveText = norm([page.intro, ...page.paragraphs].join(" "));
      const accepted = pmAcceptedGaps[file] ?? [];
      const missing = meningar.filter((s) => !liveText.includes(norm(s)) && !accepted.includes(s));

      allResults.push({ page: `/${kind}/${slug}`, file, status: missing.length ? "missing" : "ok", missing, total: meningar.length });
    }
  }
}

/* ---------- 3) Guidetexter (/blogg/<slug>) ---------- */

const guideDir = "../ledning/marknad/innehall/guidetexter";
for (const file of readdirSync(resolve(guideDir)).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(join(resolve(guideDir), file), "utf8").replace(/\r/g, "");
  const slug = raw.match(/\*\*Slug:\*\*\s*\/blogg\/([a-z0-9-]+)/)?.[1];
  if (!slug) {
    allResults.push({ page: "", file: `guidetexter/${file}`, status: "no-slug", missing: [], total: 0 });
    continue;
  }
  if (only && !only.has(slug)) continue;
  const page = prerenderContent(`/blogg/${slug}`);
  if (!page) {
    allResults.push({ page: `/blogg/${slug}`, file, status: "not-built", missing: [], total: 0 });
    continue;
  }
  const body = (raw.split(/\n---\n/).slice(1).join("\n---\n").split(/\n## Källor/)[0] ?? "")
    .split("\n")
    .map((l) => l.replace(/^\s*- /, ""))
    .join("\n");
  const meningar = toSentences(body);
  const liveText = norm([page.intro, ...page.paragraphs].join(" "));
  const missing = meningar.filter((s) => !liveText.includes(norm(s)));
  allResults.push({ page: `/blogg/${slug}`, file, status: !meningar.length ? "ok" : missing.length === meningar.length ? "not-built" : missing.length ? "missing" : "ok", missing, total: meningar.length });
}

/* ---------- 4) Tjänst×ort-texter (/takbyte-<ort> m.fl., ortstexter/) ---------- */

const comboDir = "../ledning/marknad/innehall/ortstexter";
for (const file of readdirSync(resolve(comboDir)).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
  const raw = readFileSync(join(resolve(comboDir), file), "utf8").replace(/\r/g, "");
  const path = raw.match(/\*\*Slug:\*\*\s*(\/[a-z0-9-]+)/)?.[1];
  if (!path) {
    allResults.push({ page: "", file: `ortstexter/${file}`, status: "no-slug", missing: [], total: 0 });
    continue;
  }
  if (only && !only.has(path.slice(1))) continue;
  const page = prerenderContent(path);
  if (!page) {
    allResults.push({ page: path, file, status: "not-built", missing: [], total: 0 });
    continue;
  }
  const body = raw.split(/\n## Text\s*\n/)[1]?.split(/\n## /)[0] ?? "";
  const meningar = toSentences(body);
  const liveText = norm([page.intro, ...page.paragraphs].join(" "));
  const missing = meningar.filter((s) => !liveText.includes(norm(s)));
  allResults.push({ page: path, file, status: !meningar.length ? "ok" : missing.length === meningar.length ? "not-built" : missing.length ? "missing" : "ok", missing, total: meningar.length });
}

/* ---------- 5) Regiontexter (/omraden/<region>) ---------- */

const regionDir = "../ledning/marknad/innehall/regiontexter";
for (const file of readdirSync(resolve(regionDir)).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
  const raw = readFileSync(join(resolve(regionDir), file), "utf8").replace(/\r/g, "");
  const path = raw.match(/\*\*Slug:\*\*\s*(\/omraden\/[a-z0-9-]+)/)?.[1];
  if (!path) {
    allResults.push({ page: "", file: `regiontexter/${file}`, status: "no-slug", missing: [], total: 0 });
    continue;
  }
  if (only && !only.has(path.slice(1))) continue;
  const page = prerenderContent(path);
  const regionName = regionBySlug(path.slice("/omraden/".length));
  if (!page || !regionName || !regionTexts[regionName]) {
    allResults.push({ page: path, file, status: "not-built", missing: [], total: 0 });
    continue;
  }
  // Rena länklistor under "### Orter …" ersätts av sidans egen ortlista (härledd ur locations.ts) och
  // ingår inte. Meningar i samma avsnitt ingår (samma regel som scripts/import-region.ts).
  let inOrter = false;
  const isPureLinkList = (l: string) =>
    l.replace(/\[[^\]]+\]\([^)]+\)/g, "").replace(/\*\*[^*]+:\*\*/g, "").replace(/[·\s]/g, "") === "";
  const body = (raw.split(/\n## Regiontext[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "")
    .split("\n")
    .filter((l) => {
      if (l.startsWith("### ")) inOrter = /^### Orter /.test(l);
      return !(inOrter && isPureLinkList(l.trim()));
    })
    .join("\n");
  const meningar = toSentences(body);
  const liveText = norm([page.intro, ...page.paragraphs].join(" "));
  const missing = meningar.filter((s) => !liveText.includes(norm(s)));
  allResults.push({ page: path, file, status: missing.length ? "missing" : "ok", missing, total: meningar.length });
}

/* ---------- Rapport ---------- */

const ok = allResults.filter((r) => r.status === "ok");
const missing = allResults.filter((r) => r.status === "missing");
const notBuilt = allResults.filter((r) => r.status === "not-built");
const noSlug = allResults.filter((r) => r.status === "no-slug");

console.log(`\nInnehålls-täckningskontroll — ${allResults.length} poster\n`);
console.log(`OK (full täckning): ${ok.length}`);
console.log(`SAKNAR MENINGAR: ${missing.length}`);
console.log(`INTE BYGGDA: ${notBuilt.length}`);
console.log(`UTAN TOLKNINGSBAR SLUG/SEKTION: ${noSlug.length}\n`);

for (const r of missing) {
  console.log(`${r.page} (${r.file}): ${r.total - r.missing.length} av ${r.total} meningar täckta`);
  for (const s of r.missing) console.log(`  - saknas: "${s.slice(0, 160)}${s.length > 160 ? "…" : ""}"`);
}

if (verbose) {
  console.log("\nInte byggda:");
  for (const r of notBuilt) console.log(`  - ${r.file} (${r.page})`);
  console.log("\nUtan tolkningsbar slug/sektion:");
  for (const r of noSlug) console.log(`  - ${r.file}`);
}

process.exitCode = missing.length ? 1 : 0;
