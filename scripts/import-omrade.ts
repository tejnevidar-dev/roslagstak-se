/**
 * Importskript för områdestexter (ledning/marknad/villaomraden/texter/<ort>.md) → befintlig post i src/data/locations.ts
 * och titel/meta i src/data/seo-overrides.ts. Lokalt verktyg, ingen del av bygget.
 *
 * Bara briefar med raden "**Grind:** GODKÄND ..." byggs (en brief utan Grind-rad byggs aldrig). Texten tas över
 * ordagrant; meningsgrinden (content-coverage-check.ts) kontrollerar efteråt varje mening. Bara befintliga orter
 * uppdateras ("förstärker befintlig sida"). En ny ort kräver att posten läggs till först.
 *
 * Kör: bun scripts/import-omrade.ts <brief.md> [<brief2.md> ...]
 *
 * Mappning (samma som de befintliga ortssidorna):
 *   ## Områdestext   stycken före första "###"  → longDescription (sammanfogade med mellanslag)
 *                    "### Rubrik" + stycken      → extraSections[{heading, text}]
 *                    "### Så går det till"       → process {steps (numrerade punkter), paragraphs}
 *   ## Faktaruta     tabellrader                 → factBox [{label, value}]
 *   ## Källor        första kommunlänken         → sourceLink {label, url}
 *   Titel/Meta       → seo-overrides.ts (ortSeoOverrides) och description
 *   H1               → h1Override
 *   uniqueFAQ        byggs av faktarutans Byggperiod/Hustyper (samma form som övriga sidor)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";

/** Juristens lydelse om bygglov (ledning/jurist/seo-cc-lista-bygglov-regel5-granskning.md, avsnitt B). */
const BYGGLOV_NY =
  "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.";

const files = process.argv.slice(2).filter((a) => a.endsWith(".md"));
if (!files.length) {
  console.error("Användning: bun scripts/import-omrade.ts <brief.md> [...]");
  process.exit(2);
}

const stripMd = (s: string) => s.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface Parsed {
  slug: string;
  title: string;
  meta: string;
  h1?: string;
  longDescription: string;
  extraSections: { heading: string; text: string }[];
  process?: { steps: string[]; paragraphs: string[] };
  factBox: { label: string; value: string }[];
  sourceLink?: { label: string; url: string };
}

/** Godkända filer ur Innehålls förteckning (samma regel som täckningskontrollen): en fil som står där behöver ingen Grind-rad. */
const godkandaFiler = (() => {
  try {
    const j = JSON.parse(readFileSync(resolve("../ledning/marknad/villaomraden/texter/_godkanda-versioner.json"), "utf8")) as { sidor: { fil: string }[] };
    return new Set(j.sidor.map((x) => x.fil));
  } catch {
    return new Set<string>();
  }
})();

const parse = (file: string): Parsed => {
  const raw = readFileSync(resolve(file), "utf8").replace(/\r/g, "");
  if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw) && !godkandaFiler.has(file.split(/[\\/]/).pop()!)) {
    console.error(`${file}: saknar raden "**Grind:** GODKÄND ...". En brief utan Grind-rad byggs aldrig.`);
    throw new Error("ej godkänd");
  }
  const slug = raw.match(/\*\*Slug:\*\*\s*\/taklaggare-([a-z0-9-]+)/)?.[1];
  const titleLine =
    raw.match(/\*\*Titel \(≤ 60\):\*\*\s*(.+?)\s*(?:\(\d+\)\s*)?·\s*\*\*Meta \(≤ 160\):\*\*\s*(.+)/) ??
    // äldre format: titel och meta på varsin rad
    raw.match(/\*\*Titel \(≤ 60\):\*\*\s*(.+?)\s*(?:\(\d+\)\s*)?\n(?:[^\n]*\n){0,3}?\*\*Meta \(≤ 160\):\*\*\s*(.+)/);
  // Titel och meta kan ligga utanför briefen ("Titel och meta: enligt Marknadschefens beslut, ändras inte här"): då rörs varken description eller seo-overrides.
  const titelUtanforBrief = /\*\*Titel och meta:\*\*\s*(?:enligt|rörs inte|ändras inte)/.test(raw);
  if (!slug || (!titleLine && !titelUtanforBrief)) {
    console.error(`${file}: saknar Slug eller Titel/Meta i huvudet.`);
    throw new Error("header");
  }
  const h1 = raw.match(/\*\*H1:\*\*\s*([^·\n]+?)\s*(?:·|\n)/)?.[1]?.trim();
  const body = raw.split(/\n## Områdestext[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "";
  const lines = body.split("\n");
  let section: "intro" | "process" | { heading: string } = "intro";
  const introParas: string[] = [];
  const sections: { heading: string; paras: string[] }[] = [];
  const steps: string[] = [];
  const procParas: string[] = [];
  let hasProcess = false;
  let cur: string[] = [];
  const flush = () => {
    const text = cur.join(" ").trim();
    cur = [];
    if (!text) return;
    if (section === "intro") introParas.push(text);
    else if (section === "process") procParas.push(text);
    else sections[sections.length - 1].paras.push(text);
  };
  for (const l of lines) {
    const t = l.trim();
    if (!t) {
      flush();
      continue;
    }
    if (t.startsWith("### ")) {
      flush();
      const heading = t.slice(4).trim();
      if (/^så går det till$/i.test(heading)) {
        section = "process";
        hasProcess = true;
      } else {
        section = { heading };
        sections.push({ heading, paras: [] });
      }
      continue;
    }
    const step = t.match(/^\d+\.\s+(.*)$/);
    if (step && section === "process") {
      flush();
      steps.push(step[1]);
      continue;
    }
    cur.push(t);
  }
  flush();
  const fakta = raw.split(/\n## Faktaruta[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "";
  const factBox = fakta
    .split("\n")
    .filter((l) => l.startsWith("|") && !/^\|\s*(Fält|-)/.test(l))
    .map((l) => l.split("|").map((c) => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 0))
    .filter((c) => c.length >= 2 && c[0])
    .map((c) => ({
      label: c[0],
      value: upperFirst(
        c[1]
          .replace(/\s+enligt alla\.csv,?\s*ej kontrollerad live/g, "")
          .replace(/,\s*ej kontrollerad live/g, "")
          .replace(/\s+enligt alla\.csv/g, "")
          .replace(/\s+\(\s*\)/g, ""),
      ),
    }));
  const kallor = raw.split(/\n## Källor[^\n]*\n/)[1]?.split(/\n## /)[0] ?? "";
  const srcLines = kallor.split("\n").filter((l) => /https?:\/\//.test(l));
  const pick = srcLines.find((l) => !/wikipedia/i.test(l)) ?? srcLines[0];
  let sourceLink: Parsed["sourceLink"];
  if (pick) {
    const url = pick.match(/https?:\/\/[^\s)]+/)![0].replace(/[.,;:]+$/, "");
    const label = pick.replace(/^\s*-\s*/, "").split(/:\s*https?:\/\//)[0].replace(/\*\*/g, "").trim();
    sourceLink = { label, url };
  }
  return {
    slug,
    title: titleLine ? titleLine[1].trim() : "",
    meta: titleLine ? titleLine[2].replace(/\s*\(\d+\)\s*$/, "").trim() : "",
    h1,
    longDescription: stripMd(introParas.join(" ")),
    extraSections: sections.map((s) => ({ heading: s.heading, text: stripMd(s.paras.join(" ")) })),
    process: hasProcess ? { steps, paragraphs: procParas.map(stripMd) } : undefined,
    factBox,
    sourceLink,
  };
};

const locFile = resolve("src/data/locations.ts");
let locSrc = readFileSync(locFile, "utf8");
const locCrlf = locSrc.includes("\r\n");
locSrc = locSrc.replace(/\r\n/g, "\n");
const seoFile = resolve("src/data/seo-overrides.ts");
let seoSrc = readFileSync(seoFile, "utf8");
const seoCrlf = seoSrc.includes("\r\n");
seoSrc = seoSrc.replace(/\r\n/g, "\n");

const js = (v: unknown) => JSON.stringify(v);
const quoteKey = (k: string) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(k) ? k : js(k));

let skipped = 0;
const sedda = new Map<string, Parsed>();
for (const file of files) {
  let p: Parsed;
  try {
    p = parse(file);
  } catch (e) {
    console.error(`hoppade över ${file}: ${(e as Error).message}`);
    skipped++;
    continue;
  }
  // En sida kan ha två godkända filer: huvudtexten först, sedan förstärkningen (_godkanda-versioner.json). Skickas båda i samma körning
  // läggs förstärkningen efter huvudtexten, och huvudtextens titel, meta och faktaruta står kvar.
  const prev = sedda.get(p.slug);
  if (prev) {
    p.longDescription = `${prev.longDescription} ${p.longDescription}`;
    p.extraSections = [...prev.extraSections, ...p.extraSections];
    if (!p.factBox.length) p.factBox = prev.factBox;
    p.sourceLink = prev.sourceLink ?? p.sourceLink;
    p.h1 = prev.h1 ?? p.h1;
    p.process = prev.process ?? p.process;
    p.title = prev.title || p.title;
    p.meta = prev.meta || p.meta;
  }
  sedda.set(p.slug, p);
  const cur = locations.find((l) => l.slug === p.slug) as unknown as Record<string, unknown> | undefined;
  if (!cur) {
    console.error(`${file}: /taklaggare-${p.slug} finns inte i locations.ts. Importskriptet uppdaterar bara befintliga orter.`);
    process.exit(1);
  }
  const name = String(cur.name);
  const fact = (label: string) => p.factBox.find((f) => f.label.toLowerCase() === label.toLowerCase())?.value;
  const kommun = fact("Kommun");
  const bygg = fact("Byggperiod");
  const hus = fact("Hustyper");
  const uniqueFAQ =
    bygg && hus
      ? {
          question: `När byggdes husen ${cur.isIsland ? "på" : "i"} ${name}?`,
          answer: `Byggperiod enligt källorna: ${lowerFirst(bygg)}. Hustyper: ${lowerFirst(hus)}. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. ${BYGGLOV_NY}`,
        }
      : cur.uniqueFAQ;
  void kommun;

  const next: Record<string, unknown> = { ...cur };
  if (p.meta) next.description = p.meta;
  next.longDescription = p.longDescription;
  next.extraContent = "";
  if (p.factBox.length) next.factBox = p.factBox;
  if (p.sourceLink) next.sourceLink = p.sourceLink;
  if (p.h1) next.h1Override = p.h1;
  next.uniqueFAQ = uniqueFAQ;
  next.extraSections = p.extraSections.length ? p.extraSections : undefined;
  next.process = p.process;

  // Serialisera i filens stil, nycklar i samma ordning som befintlig post, nya sist.
  const order = [
    "slug", "name", "region", "isIsland", "description", "longDescription", "extraContent", "factBox", "sourceLink",
    "parentLocation", "h1Override", "uniqueFAQ", "primaryKeyword", "lat", "lng", "nearbyLocations", "extraSections", "process",
  ];
  const keys = [...Object.keys(cur), ...order.filter((k) => !(k in cur) && next[k] !== undefined)];
  const out: string[] = ["  {"];
  for (const k of keys) {
    const v = next[k];
    if (v === undefined) continue;
    if (k === "description" || k === "longDescription" || k === "extraContent") out.push(`    ${k}:`, `      ${js(v)},`);
    else out.push(`    ${k}: ${js(v)},`);
  }
  out.push("  },");

  const marker = `    slug: ${js(p.slug)},`;
  const at = locSrc.indexOf("\n" + marker + "\n");
  if (at < 0) {
    console.error(`${file}: hittar inte posten i locations.ts`);
    process.exit(2);
  }
  const start = locSrc.lastIndexOf("\n  {\n", at) + 1;
  const end = locSrc.indexOf("\n  },\n", at) + "\n  },".length;
  locSrc = locSrc.slice(0, start) + out.join("\n") + locSrc.slice(end);

  // titel/meta i seo-overrides.ts (bara om briefen har dem)
  if (p.title && p.meta) {
  const entry = `  ${quoteKey(p.slug)}: {\n    title: ${js(p.title)},\n    description:\n      ${js(p.meta)},\n  },\n`;
  const re = new RegExp(`\\n  ${quoteKey(p.slug).replace(/[-]/g, "\\-")}: \\{\\n[\\s\\S]*?\\n  \\},\\n`);
  if (re.test(seoSrc)) seoSrc = seoSrc.replace(re, "\n" + entry);
  else {
    const close = seoSrc.indexOf("\n};", seoSrc.indexOf("export const ortSeoOverrides"));
    seoSrc = seoSrc.slice(0, close + 1) + entry + seoSrc.slice(close + 1);
  }
  }
  console.log(`[import-omrade] /taklaggare-${p.slug}: ${p.longDescription.split(/\s+/).length} ord, ${p.extraSections.length} avsnitt, ${p.factBox.length} faktarader`);
}

console.log(`[import-omrade] hoppade över ${skipped} filer som inte gick att tolka`);
writeFileSync(locFile, locCrlf ? locSrc.replace(/\n/g, "\r\n") : locSrc);
writeFileSync(seoFile, seoCrlf ? seoSrc.replace(/\n/g, "\r\n") : seoSrc);
