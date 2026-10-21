/**
 * Gren 180 (#13, Marknadschefens grind steg 1–22): egna FAQ-svar på ortssidorna.
 * Läser ledning/marknad/innehall/faq-egna-2026-10-22.md och skriver src/data/location-egna-faq.ts: för varje ortssida tre egna frågor med svar,
 * som i generateLocationFAQs ersätter mallens tre frågor om tidsåtgång, takmaterial och "byta eller renovera".
 * Bara steg 1–22 tas med (steg 23 och 24 hör till gren 183 och 185 och importeras när de byggs). Rader som inte följer formen gör att körningen stoppar.
 * Körs: bun scripts/import-egna-faq.ts [sökväg till briefen]
 */
import { readFileSync, writeFileSync } from "node:fs";

const KALLA = process.argv[2] ?? "../../ledning/marknad/innehall/faq-egna-2026-10-22.md";
const MAX_STEG = 22;
const rader = readFileSync(KALLA, "utf8").split(/\r?\n/);

let steg = 1;
let slug: string | null = null;
let iEfter = false;
const perSlug = new Map<string, { question: string; answer: string }[]>();
const dubbletter: string[] = [];
const fel: string[] = [];

for (const [i, rad] of rader.entries()) {
  const s = rad.match(/^# Steg (\d+):/);
  if (s) {
    steg = Number(s[1]);
    slug = null;
    iEfter = false;
    continue;
  }
  const h = rad.match(/^## \d+\. \/taklaggare-([a-z0-9-]+) /);
  if (h) {
    slug = h[1];
    iEfter = false;
    if (steg <= MAX_STEG) {
      if (perSlug.has(slug)) dubbletter.push(slug);
      perSlug.set(slug, []);
    }
    continue;
  }
  if (rad.startsWith("## ") || rad.startsWith("---")) {
    slug = rad.startsWith("---") ? null : slug;
    iEfter = false;
    continue;
  }
  if (!slug || steg > MAX_STEG) continue;
  if (rad.startsWith("**Efter (egna):**")) {
    iEfter = true;
    continue;
  }
  if (rad.startsWith("**Före")) {
    iEfter = false;
    continue;
  }
  if (!iEfter) continue;
  if (rad.trim() === "") {
    iEfter = false;
    continue;
  }
  const m = rad.match(/^- \*\*([^*]+\?)\*\* (.+)$/);
  if (!m) {
    fel.push(`rad ${i + 1} (${slug}): ${rad.slice(0, 80)}`);
    continue;
  }
  perSlug.get(slug)!.push({ question: m[1].trim(), answer: m[2].trim() });
}

for (const [s, f] of perSlug) if (f.length !== 3) fel.push(`${s}: ${f.length} frågor (ska vara 3)`);
if (dubbletter.length) fel.push(`dubbletter: ${dubbletter.join(", ")}`);
if (fel.length) {
  console.error(fel.join("\n"));
  process.exit(1);
}

const q = (t: string) => JSON.stringify(t);
const ut = `/**
 * Egna FAQ-svar per ortssida (gren 180, #13), tre per sida. Genererad av scripts/import-egna-faq.ts ur ledning/marknad/innehall/faq-egna-2026-10-22.md (steg 1–22, godkända av
 * Marknadschefen). Ändra inte för hand: ändra briefen och kör importen. De tre ersätter mallens frågor om tidsåtgång, takmaterial och "byta eller renovera" (location-faqs.ts).
 * Bara relativa importer.
 */
export interface EgenFAQ {
  question: string;
  answer: string;
}

export const EGNA_FAQ: Record<string, readonly EgenFAQ[]> = {
${[...perSlug].map(([s, f]) => `  ${q(s)}: [\n${f.map((x) => `    { question: ${q(x.question)}, answer: ${q(x.answer)} },`).join("\n")}\n  ],`).join("\n")}
};

export const egnaFaqFor = (slug: string): readonly EgenFAQ[] | undefined => EGNA_FAQ[slug];
`;
writeFileSync("src/data/location-egna-faq.ts", ut);
console.log(`skrev src/data/location-egna-faq.ts med ${perSlug.size} sidor, ${perSlug.size * 3} frågor`);
