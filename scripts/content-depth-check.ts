/**
 * Skärpt innehållskontroll (Marknadschefens granskning 2026-09-29, före steg 12).
 * Två separata mått på den PRERENDERADE textspeglingen (prerender-content.ts):
 *
 * 1. MINSTA ORDANTAL per sidtyp — LOCATION och SERVICE_LOCATION ska ha >= 400 unika ord.
 * 2. NÄRA-DUBBLETTKONTROLL — Jaccard-likhet på 5-ords shingles mellan syskonsidor av samma typ
 *    (LOCATION mot LOCATION, och SERVICE_LOCATION mot SERVICE_LOCATION inom SAMMA tjänst, eftersom
 *    combo-sidorna genereras av EN mallfunktion per tjänst — se service.generateContent i
 *    src/data/service-location-combos.ts). > 0,8 = FAIL.
 *
 * Det här är ett RAPPORTVERKTYG, inte en publiceringsgrind än — 636 sidor byggdes innan den här
 * gränsen fanns, och en hård spärr skulle blockera hela sajten. Numren är underlaget för
 * Marknadschefens beslut om steg 12 (vidare ort/tjänst×ort-expansion).
 *
 * Kör: bun scripts/content-depth-check.ts
 */
import { locations, type LocationData } from "../src/data/locations";
import { allServiceSlugs } from "../src/data/service-location-combos";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { prerenderContent } from "./prerender-content";

const MIN_WORDS = 400;
const JACCARD_FAIL = 0.8;
const SHINGLE_SIZE = 5;

/**
 * Maskerar ortsnamnet (och "i"/"på") innan shingling. Ortsnamnet upprepas 5-8 gånger per sida och
 * förekommer i nästan varje 5-ords-fönster — utan maskering ser en ren mall-text med bara
 * ortnamnet utbytt ARTIFICIELLT olik ut, eftersom nästan alla shingles ändras när namnet byts.
 * Med maskeringen jämförs mallens skelettext, vilket är det som faktiskt avgör dubblettrisken.
 */
const maskLocation = (text: string, loc: LocationData): string => {
  const escaped = loc.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .replace(new RegExp(`\\b${escaped}\\b`, "gi"), "__ORT__")
    .replace(/\b(i|på)\b/gi, "__PREP__");
};

const shinglesOf = (words: string[]): Set<string> => {
  const s = new Set<string>();
  for (let i = 0; i <= words.length - SHINGLE_SIZE; i++) s.add(words.slice(i, i + SHINGLE_SIZE).join(" "));
  return s;
};

const jaccard = (a: Set<string>, b: Set<string>): number => {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
};

type PageEntry = { path: string; words: string[]; shingles: Set<string> };

const buildEntries = (locs: LocationData[], pathFor: (l: LocationData) => string): PageEntry[] =>
  locs
    .map((loc) => {
      const path = pathFor(loc);
      const page = prerenderContent(path);
      if (!page) return null;
      const rawText = [page.intro, ...page.paragraphs].join(" ");
      const words = rawText.toLowerCase().split(/\s+/).filter(Boolean);
      const maskedWords = maskLocation(rawText, loc).toLowerCase().split(/\s+/).filter(Boolean);
      return { path, words, shingles: shinglesOf(maskedWords) };
    })
    .filter((e): e is PageEntry => e !== null);

const nearDuplicatePairs = (entries: PageEntry[]) => {
  const pairs: { a: string; b: string; score: number }[] = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const score = jaccard(entries[i].shingles, entries[j].shingles);
      if (score > JACCARD_FAIL) pairs.push({ a: entries[i].path, b: entries[j].path, score });
    }
  }
  return pairs.sort((a, b) => b.score - a.score);
};

/* ---------- LOCATION ---------- */
const locationEntries = buildEntries(locations, (l) => `/taklaggare-${l.slug}`);
const locationBelowMin = locationEntries.filter((e) => e.words.length < MIN_WORDS);
const locationDupes = nearDuplicatePairs(locationEntries);

/* ---------- SERVICE_LOCATION (grupperat per tjänst — det är templaten som upprepas) ---------- */
type ServiceGroup = { service: string; entries: PageEntry[]; dupes: ReturnType<typeof nearDuplicatePairs> };
const serviceGroups: ServiceGroup[] = [];
for (const service of allServiceSlugs) {
  const locs = locations.filter((l) => hasServiceCombos(l.region) && !isThinCombo(service, l));
  const entries = buildEntries(locs, (l) => `/${service}-${l.slug}`);
  if (entries.length < 2) continue;
  serviceGroups.push({ service, entries, dupes: nearDuplicatePairs(entries) });
}
const comboBelowMin = serviceGroups.flatMap((g) => g.entries.filter((e) => e.words.length < MIN_WORDS));
const comboTotal = serviceGroups.reduce((n, g) => n + g.entries.length, 0);
const comboDupeTotal = serviceGroups.reduce((n, g) => n + g.dupes.length, 0);

/* ---------- rapport ---------- */
console.log(`\nInnehållsdjup-kontroll — gräns ${MIN_WORDS} ord, Jaccard-FAIL > ${JACCARD_FAIL}\n`);

console.log(`LOCATION (${locationEntries.length} sidor):`);
console.log(`  Under ${MIN_WORDS} ord: ${locationBelowMin.length} / ${locationEntries.length}`);
console.log(`  Nära-dubblettpar (> ${JACCARD_FAIL}): ${locationDupes.length}`);
for (const d of locationDupes.slice(0, 10)) console.log(`    - ${d.a} ~ ${d.b}: ${d.score.toFixed(3)}`);
if (locationEntries.length) {
  const wc = locationEntries.map((e) => e.words.length);
  console.log(`  Ordantal min/median/max: ${Math.min(...wc)} / ${wc.sort((a, b) => a - b)[Math.floor(wc.length / 2)]} / ${Math.max(...wc)}`);
}

console.log(`\nSERVICE_LOCATION (${comboTotal} sidor i ${serviceGroups.length} tjänstegrupper):`);
console.log(`  Under ${MIN_WORDS} ord: ${comboBelowMin.length} / ${comboTotal}`);
console.log(`  Nära-dubblettpar totalt (> ${JACCARD_FAIL}), inom samma tjänst: ${comboDupeTotal}`);
for (const g of serviceGroups) {
  if (g.dupes.length === 0) continue;
  const wc = g.entries.map((e) => e.words.length);
  console.log(`    ${g.service}: ${g.entries.length} sidor, ${g.dupes.length} dubblettpar, medianlikhet högst: ${g.dupes[0].score.toFixed(3)} (t.ex. ${g.dupes[0].a} ~ ${g.dupes[0].b})`);
}

console.log("");
