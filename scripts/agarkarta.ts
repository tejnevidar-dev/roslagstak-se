/**
 * Ägarkartan per kommun (gren 197): för varje kommun ägarsidorna (/taklaggare-<ort>), orterna som hör till kommunen och för varje tjänst × ort-sida
 * dess roll: egen text (indexerbar), 301 med mål (exakt rad eller platshållarregel) eller noindex utan 301. Läser bara koden och public/_redirects.
 * Körning: bun scripts/agarkarta.ts --ut=<fil.md> [--bygg=slug,slug] [--rader]
 *   --bygg   kommuner (ägarslug, till exempel bro) vars luckor ska pekas om: skriver raderna som ska in i public/_redirects (före platshållarreglerna) till stdout med --rader
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { allServiceSlugs, hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { ortAvindexerad } from "../src/data/avindexerade-orter";

const args = process.argv.slice(2);
const arg = (n: string, d: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const rot = resolve(import.meta.dir, "..");
const regler = readFileSync(arg("redirects", resolve(rot, "public/_redirects")), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => r.split(/\s+/) as [string, string, string]);
const losUpp = (path: string): { mal: string; slag: "exakt" | "platshållare" } | null => {
  for (const [kalla, mal] of regler) {
    if (kalla.endsWith("*")) {
      const prefix = kalla.slice(0, -1);
      if (path.startsWith(prefix)) return { mal: mal.replace(":splat", path.slice(prefix.length)), slag: "platshållare" };
    } else if (kalla === path) return { mal, slag: "exakt" };
  }
  return null;
};

/** De 23 kommunerna: namn, ägarsidor (slugs med /taklaggare-<slug>) och namnet på kommunen i ortspostens kommun-fält. */
export const KOMMUNER: { namn: string; agare: string[]; alias?: string[] }[] = [
  { namn: "Norrtälje", agare: ["norrtalje"] },
  { namn: "Österåker", agare: ["akersberga"], alias: ["Åkersberga"] },
  { namn: "Vallentuna", agare: ["vallentuna"] },
  { namn: "Täby", agare: ["taby"] },
  { namn: "Danderyd", agare: ["danderyd"] },
  { namn: "Vaxholm", agare: ["vaxholm"] },
  { namn: "Lidingö", agare: ["lidingo"] },
  { namn: "Stockholm", agare: ["stockholm"] },
  { namn: "Solna", agare: ["solna"] },
  { namn: "Sundbyberg", agare: ["sundbyberg"] },
  { namn: "Sollentuna", agare: ["sollentuna"] },
  { namn: "Upplands Väsby", agare: ["upplands-vasby"] },
  { namn: "Järfälla", agare: ["jarfalla"] },
  { namn: "Nacka", agare: ["nacka"] },
  { namn: "Huddinge", agare: ["huddinge"] },
  { namn: "Sigtuna", agare: ["sigtuna", "marsta"] },
  { namn: "Upplands-Bro", agare: ["upplands-bro", "bro", "kungsangen"] },
  { namn: "Värmdö", agare: ["varmdo"] },
  { namn: "Haninge", agare: ["haninge"] },
  { namn: "Tyresö", agare: ["tyreso"] },
  { namn: "Botkyrka", agare: ["botkyrka", "tumba"], alias: ["Tumba"] },
  { namn: "Ekerö", agare: ["ekero"] },
  { namn: "Nynäshamn", agare: ["nynashamn"] },
];

type Loc = (typeof locations)[number] & { kommun?: string; parentLocation?: { name: string; slug: string } };
const bySlug = new Map(locations.map((l) => [l.slug, l as Loc]));
const tillhor = (l: Loc, k: (typeof KOMMUNER)[number]): boolean => {
  if (k.agare.includes(l.slug)) return true;
  const namn = [k.namn, ...(k.alias ?? [])];
  if (l.kommun && namn.includes(l.kommun)) return true;
  let p = l.parentLocation;
  for (let i = 0; p && i < 4; i++) {
    if (k.agare.includes(p.slug) || namn.includes(p.name)) return true;
    p = bySlug.get(p.slug)?.parentLocation;
  }
  return false;
};

type Rad = { sida: string; tjanst: string; roll: "egen" | "301" | "noindex"; mal?: string; slag?: string };
const kartlagg = (k: (typeof KOMMUNER)[number]) => {
  const orter = locations.filter((l) => tillhor(l as Loc, k) && hasServiceCombos(l.region));
  const rader: (Rad & { ort: string })[] = [];
  for (const o of orter)
    for (const s of allServiceSlugs) {
      const sida = `/${s}-${o.slug}`;
      if (!isThinCombo(s, o)) rader.push({ ort: o.slug, sida, tjanst: s, roll: "egen" });
      else {
        const r = losUpp(sida);
        rader.push(r ? { ort: o.slug, sida, tjanst: s, roll: "301", mal: r.mal, slag: r.slag } : { ort: o.slug, sida, tjanst: s, roll: "noindex" });
      }
    }
  return { orter, rader };
};

/** Mål för en lucka: ortens egen ortssida, utom för Upplands-Bro där /taklaggare-bro äger kommunsökorden (befintliga rader går dit) och ortssidan är avindexerad. */
const agarMal = (ort: string, k: (typeof KOMMUNER)[number]) => {
  if (ort === "upplands-bro" && k.namn === "Upplands-Bro") return "/taklaggare-bro";
  return `/taklaggare-${ort}`;
};
/** En lucka: noindex utan 301, eller en 301 till en riksomfattande tjänste- eller materialsida i stället för orten. */
/** Gren 171 (Marknadschefen): de två generiska sidorna lämnas åt platshållarreglerna (tjänste- och materialsidan äger sökorden), se paket171-ompekning-sju.test.ts. */
const BEHALL_SPLAT = new Set(["/tegeltak-bro", "/platttak-sundbyberg"]);
/** Befintliga exakta rader till en tjänste- eller materialsida har belägg per rad (gren 129, 171) och är inga luckor (Marknadschefens grind 197c-b). */
const arLucka = (r: Rad) => r.roll === "noindex" || (r.roll === "301" && r.slag === "platshållare" && /^\/(tjanster|material)\//.test(r.mal ?? ""));

const bygg = arg("bygg", "").split(",").filter(Boolean);
if (args.includes("--rader") || args.includes("--skriv")) {
  const ut: { kalla: string; mal: string; fore: string }[] = [];
  for (const k of KOMMUNER.filter((x) => bygg.some((b) => x.agare.includes(b)))) {
    const { rader } = kartlagg(k);
    for (const r of rader.filter(arLucka)) {
      if (BEHALL_SPLAT.has(r.sida)) continue;
      if (ortAvindexerad(agarMal(r.ort, k).replace("/taklaggare-", ""))) continue;
      ut.push({ kalla: r.sida, mal: agarMal(r.ort, k), fore: r.roll === "noindex" ? "noindex utan 301" : `301 ${r.slag} → ${r.mal}` });
    }
  }
  if (args.includes("--rader")) {
    console.log(ut.map((u) => `${u.kalla} ${u.mal} 301`).join("\n"));
    process.exit(0);
  }
  // --skriv: byt ut befintliga exakta rader för samma källa och lägg raderna sist bland de exakta raderna (före platshållarreglerna), så att de räknas som ompekade (ompekade.ts)
  const fil = resolve(rot, "public/_redirects");
  const raw = readFileSync(fil, "utf8");
  const crlf = raw.includes("\r\n");
  let rl = raw.replace(/\r/g, "").split("\n");
  const kallor = new Set(ut.map((u) => u.kalla));
  rl = rl.filter((l) => !(/^\/\S+ \/\S* 301$/.test(l) && kallor.has(l.split(" ")[0])));
  const grans = rl.findIndex((l) => l.startsWith("# Reglerna med * kommer SIST"));
  if (grans < 0) throw new Error("gränsen för platshållarreglerna hittades inte");
  const per = new Map<string, string[]>();
  for (const u of ut) per.set(u.mal, [...(per.get(u.mal) ?? []), `${u.kalla} ${u.mal} 301`]);
  const block = [
    `# Gren 197 (Vidars stående ja 2026-10-21 för adressändringar, beställning 2026-10-23 23:52): en ägarsida per ort. Tunna tjänst × ort-sidor i ${bygg.join(", ")}-kommunerna som saknade 301 eller pekade på en riksomfattande`,
    `# tjänste- eller materialsida pekas om till ortens egen ortssida. Sidor med egen text berörs inte. Belägg per rad: ledning/marknad/seo-analys-2026-10-21/belagg/197-agarsidor.md.`,
    ...[...per.entries()].flatMap(([mal, rader]) => [`# -> ${mal} (${rader.length})`, ...rader]),
    "",
  ];
  rl.splice(grans, 0, ...block);
  writeFileSync(fil, rl.join(crlf ? "\r\n" : "\n"));
  if (arg("json", "")) writeFileSync(arg("json", ""), JSON.stringify(ut, null, 1));
  console.log(`skrev ${ut.length} rader (${kallor.size} källor) i public/_redirects`);
  process.exit(0);
}

const md: string[] = [
  `# Ägarkarta per kommun (gren 197, bygget ur koden och public/_redirects)`,
  "",
  `Genererad av \`scripts/agarkarta.ts\`. Roller per tjänst × ort-sida: **egen** = egen godkänd text, indexerbar (pekas inte om, får en egen roll och länk upp till ägarsidan); **301** = tunn sida som pekas om (mål anges); **noindex** = tunn sida utan 301 (noindex, follow, utanför sajtkartan). "Lucka" = noindex utan 301, eller en 301 till en riksomfattande tjänste- eller materialsida i stället för orten.`,
  "",
  "| Kommun | Ägarsida(or) | Orter | Egen text | 301 till orten | 301 till tjänst/material | Noindex utan 301 |",
  "|---|---|---:|---:|---:|---:|---:|",
];
const detalj: string[] = [];
for (const k of KOMMUNER) {
  const { orter, rader } = kartlagg(k);
  const egen = rader.filter((r) => r.roll === "egen");
  const tillOrt = rader.filter((r) => r.roll === "301" && !/^\/(tjanster|material)\//.test(r.mal ?? ""));
  const tillTjanst = rader.filter((r) => r.roll === "301" && /^\/(tjanster|material)\//.test(r.mal ?? ""));
  const noi = rader.filter((r) => r.roll === "noindex");
  md.push(`| ${k.namn} | ${k.agare.map((a) => `/taklaggare-${a}`).join(", ")} | ${orter.length} | ${egen.length} | ${tillOrt.length} | ${tillTjanst.length} | ${noi.length} |`);
  detalj.push(`### ${k.namn}`, "", `Ägarsidor: ${k.agare.map((a) => `/taklaggare-${a}`).join(", ")}. Orter: ${orter.map((o) => o.slug).join(", ")}.`, "");
  detalj.push(`- **Egen text (egen roll, länk upp):** ${egen.map((r) => r.sida).join(", ") || "inga"}`);
  detalj.push(`- **Luckor att peka om till ortssidan:** ${rader.filter(arLucka).map((r) => `${r.sida} (${r.roll === "noindex" ? "noindex" : `301 → ${r.mal}`})`).join(", ") || "inga"}`, "");
}
md.push("", "## Detalj per kommun", "", ...detalj);
const ut = arg("ut", "");
if (ut) writeFileSync(ut, md.join("\n") + "\n");
else console.log(md.slice(0, 40).join("\n"));
