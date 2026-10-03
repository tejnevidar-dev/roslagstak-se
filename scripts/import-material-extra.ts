/**
 * Importskript för materialtexter som saknar egen URL och i stället fördjupar en tjänstesida
 * (ledning/marknad/innehall/materialtexter/*.md med "Slug: ingen egen URL. Texten fördjupar /tjanster/<slug>")
 * → src/data/service-extra-sections.ts. Texten visas som ett extra avsnitt under tjänstesidans nuvarande innehåll
 * (ServiceExtraSections.tsx och den statiska HTML:en). Titel, metabeskrivning och H1 på tjänstesidan rörs inte.
 * Kräver raden "**Grind:** GODKÄND". Fälten är ren text: [text](/länk) blir "text", fet och kursiv tas bort.
 *
 * Kör: bun scripts/import-material-extra.ts  (läser alla filer som har "fördjupar /tjanster/…" och skriver om hela filen)
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve("../ledning/marknad/innehall/materialtexter");
const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s*\n\s*/g, " ")
    .trim();

const SECTIONS: { key: string; heading: string }[] = [
  { key: "funktion", heading: "Funktion" },
  { key: "anvandning", heading: "Användning" },
  { key: "livslangd", heading: "Livslängd" },
  { key: "fordelar", heading: "Fördelar" },
  { key: "nackdelar", heading: "Nackdelar" },
  { key: "passarNar", heading: "Passar när" },
  { key: "underhall", heading: "Underhåll" },
  { key: "vanligaFel", heading: "Vanliga fel" },
  { key: "kostnadsdrivare", heading: "Kostnadsdrivare" },
  { key: "delAvTaksystemet", heading: "Del av taksystemet" },
  { key: "hallIsar", heading: "Håll isär" },
];

type Entry = { slug: string; heading: string; intro: string; sections: { heading: string; text: string }[] };
const entries: Entry[] = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const raw = readFileSync(resolve(dir, file), "utf8").replace(/\r/g, "");
  const m = raw.match(/Texten fördjupar \/tjanster\/([a-z0-9-]+)/);
  if (!m) continue;
  if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw)) {
    console.error(`${file}: saknar Grind-rad, hoppar över`);
    continue;
  }
  const h1 = raw.match(/^# Materialtext[^:]*:\s*([^(→\n]+)/m)?.[1]?.trim() ?? m[1];
  const field = (n: string) => {
    const f = raw.match(new RegExp(`\\*\\*${n}:\\*\\*\\n([\\s\\S]*?)(?=\\n\\*\\*[a-zA-Z]+:\\*\\*|\\n\\*\\*[^\\n]*\\?\\*\\*|\\n## |$)`));
    return f ? plain(f[1]) : null;
  };
  const intro = field("intro");
  if (!intro) throw new Error(`${file}: intro saknas`);
  const sections: { heading: string; text: string }[] = [];
  for (const s of SECTIONS) {
    const t = field(s.key);
    if (t) sections.push({ heading: s.heading, text: t });
  }
  // fristående fet fråga med svar i samma stycke, t.ex. "**Återanvända befintliga pannor?** Vid en omläggning …"
  const extra = raw.match(/\n\*\*([^*\n]+\?)\*\*\s+([^\n]+)/);
  if (extra) sections.push({ heading: extra[1].trim(), text: plain(extra[2]) });
  entries.push({ slug: m[1], heading: h1.replace(/\s+\/\s+.*/, ""), intro, sections });
}

const js = (s: string) => JSON.stringify(s);
const out = `/**
 * AUTO-GENERERAD av scripts/import-material-extra.ts ur ledning/marknad/innehall/materialtexter/ (Grind-godkända
 * texter utan egen URL som fördjupar en tjänstesida). Redigera inte för hand: ändra briefen och kör importen igen.
 * Visas som extra avsnitt under tjänstesidans nuvarande innehåll. Titel, meta och H1 rörs inte.
 */
export type ServiceExtra = {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: { heading: string; text: string }[];
};

export const serviceExtra: Record<string, ServiceExtra> = {
${entries
  .map(
    (e) => `  ${js(e.slug === "platarbeten" ? "platarbeten" : e.slug)}: {
    eyebrow: "Fördjupning",
    heading: ${js(e.heading)},
    intro: ${js(e.intro)},
    sections: [
${e.sections.map((s) => `      { heading: ${js(s.heading)}, text: ${js(s.text)} },`).join("\n")}
    ],
  },`,
  )
  .join("\n")}
};
`;
writeFileSync(resolve("src/data/service-extra-sections.ts"), out);
console.log(`[import-material-extra] ${entries.map((e) => `${e.slug} (${e.sections.length} avsnitt)`).join(", ")}`);
