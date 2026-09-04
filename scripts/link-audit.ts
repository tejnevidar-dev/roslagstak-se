/**
 * Internlänk-audit.
 *
 * Hittar orphan pages (sidor utan inkommande internlänk), svaga ankartexter
 * och länkningsmöjligheter mellan tjänste-, pris- och FAQ-sidor.
 *
 * Kör:  bunx tsx scripts/link-audit.ts            (rapport i terminalen)
 *       bunx tsx scripts/link-audit.ts --md=fil   (skriv markdown-rapport)
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { locations } from "../src/data/locations";
import { allServiceSlugs } from "../src/data/service-location-combos";

const args = process.argv.slice(2);
const mdPath = args.find((a) => a.startsWith("--md="))?.split("=")[1];

/* ---------- 1. filer ---------- */
const walk = (dir: string, out: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|ts)$/.test(entry)) out.push(full);
  }
  return out;
};
const files = walk(resolve("src"));
const read = (f: string) => readFileSync(f, "utf8");

/* ---------- 2. routes som appen faktiskt serverar ---------- */
const serviceSlugs = [
  ...read(resolve("src/components/Services.tsx")).matchAll(/slug:\s*"([^"]+)"/g),
].map((m) => m[1]);
const blogSlugs = [...read(resolve("src/data/blog-posts.ts")).matchAll(/slug:\s*"([^"]+)"/g)].map(
  (m) => m[1],
);

const NOINDEX = ["/admin", "/admin/login", "/admin/seo"];
const ALIASES = ["/radgivning", "/konsultation", "/boka", "/taktvatt", "/tjanster/taktvatt"];

const staticRoutes = [
  "/",
  "/priser",
  "/offert",
  "/taktyper",
  "/hur-det-gar-till",
  "/recensioner",
  "/blogg",
  "/kontakt",
  "/tjanster/takvard",
];
const serviceRoutes = serviceSlugs.map((s) => `/tjanster/${s}`);
const blogRoutes = blogSlugs.map((s) => `/blogg/${s}`);
const locationRoutes = locations.map((l) => `/taklaggare-${l.slug}`);
const comboRoutes = locations.flatMap((l) => allServiceSlugs.map((s) => `/${s}-${l.slug}`));

const routes = [
  ...staticRoutes,
  ...serviceRoutes,
  ...blogRoutes,
  ...locationRoutes,
  ...comboRoutes,
];
const routeSet = new Set(routes);

/* ---------- 3. samla internlänkar ---------- */
interface FoundLink {
  file: string;
  raw: string;
  anchor: string;
}
const links: FoundLink[] = [];

for (const file of files) {
  const src = read(file);
  // Alla to="/..." / to={`/...`} samt objekt-poster { to, label }
  const patterns = [
    /\sto=(?:"([^"]+)"|\{`([^`]+)`\})([\s\S]{0,400})/g,
    /\bto:\s*(?:"([^"]+)"|`([^`]+)`)\s*,\s*label:\s*(?:"([^"]+)"|`([^`]+)`)/g,
  ];
  for (const [i, re] of patterns.entries()) {
    for (const m of src.matchAll(re)) {
      const raw = (m[1] ?? m[2] ?? "").trim();
      if (!raw.startsWith("/")) continue;
      const anchorRaw = i === 0 ? (m[3] ?? "").split("</Link>")[0] : (m[3] ?? m[4] ?? "");
      const anchor = anchorRaw
        .replace(/<[^>]*>/g, " ")
        .replace(/\{[^}]*\}/g, " ")
        .replace(/className=("[^"]*"|\{[^}]*\})/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      links.push({ file: file.replace(resolve(".") + "/", ""), raw, anchor });
    }
  }
}

/* ---------- 4. matcha länk mot routes (hanterar ${...}) ---------- */
const toMatcher = (raw: string) => {
  const path = raw.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (!path.includes("${")) return (r: string) => r === path;
  const re = new RegExp("^" + path.replace(/\$\{[^}]*\}/g, "[a-z0-9-]+") + "$");
  return (r: string) => re.test(r);
};

const inbound = new Map<string, number>(routes.map((r) => [r, 0]));
const broken: FoundLink[] = [];

for (const link of links) {
  const match = toMatcher(link.raw);
  const hits = routes.filter(match);
  if (hits.length === 0) {
    const path = link.raw.split("#")[0] || "/";
    const isKnown =
      routeSet.has(path) || NOINDEX.includes(path) || ALIASES.includes(path) || path === "/";
    if (!isKnown && !path.includes("${")) broken.push(link);
    continue;
  }
  for (const hit of hits) inbound.set(hit, (inbound.get(hit) ?? 0) + 1);
}

/* ---------- 5. resultat ---------- */
const orphans = routes.filter((r) => r !== "/" && (inbound.get(r) ?? 0) === 0);
const groupOf = (r: string) =>
  r.startsWith("/tjanster/")
    ? "tjänstesida"
    : r.startsWith("/blogg")
      ? "blogg"
      : r.startsWith("/taklaggare-")
        ? "ortssida"
        : comboRoutes.includes(r)
          ? "tjänst+ort"
          : "navsida";

const WEAK_ANCHORS = [
  "läs mer",
  "här",
  "klicka här",
  "mer info",
  "se mer",
  "länk",
  "gå hit",
  "read more",
];
const weak = links.filter((l) => {
  const a = l.anchor.toLowerCase();
  return a.length > 0 && (WEAK_ANCHORS.includes(a) || a.length < 4);
});

const keyPages = ["/priser", "/offert", "/taktyper", "/hur-det-gar-till", ...serviceRoutes];
const keyPageStats = keyPages.map((p) => ({ path: p, inbound: inbound.get(p) ?? 0 }));

const lines: string[] = [];
const push = (s = "") => lines.push(s);

push("# Internlänk-audit — RoslagsTak");
push();
push(`- Routes totalt: **${routes.length}**`);
push(`- Internlänkar hittade i källkoden: **${links.length}**`);
push(`- Orphan pages (0 inkommande internlänkar): **${orphans.length}**`);
push(`- Trasiga internlänkar: **${broken.length}**`);
push(`- Svaga ankartexter: **${weak.length}**`);
push();
push("## Inkommande länkar till nyckelsidor");
push();
push("| Sida | Inkommande länkmönster |");
push("| --- | --- |");
for (const s of keyPageStats.sort((a, b) => a.inbound - b.inbound)) {
  push(`| ${s.path} | ${s.inbound} |`);
}
push();
push("## Orphan pages");
push();
if (orphans.length === 0) {
  push("Inga orphan pages — alla routes har minst en inkommande internlänk.");
} else {
  const byGroup = new Map<string, string[]>();
  for (const o of orphans) {
    const g = groupOf(o);
    byGroup.set(g, [...(byGroup.get(g) ?? []), o]);
  }
  for (const [group, list] of byGroup) {
    push(`### ${group} (${list.length})`);
    push();
    for (const p of list.slice(0, 40)) push(`- ${p}`);
    if (list.length > 40) push(`- …och ${list.length - 40} till`);
    push();
    push(
      group === "tjänst+ort"
        ? "**Förslag:** länka från motsvarande ortssida (`/taklaggare-<ort>`) och från tjänstesidans relaterade-block, med ankartext `\"<Tjänst> i <Ort>\"`."
        : group === "ortssida"
          ? "**Förslag:** lägg orten i `nearbyLocations` på grannorter och i områdeslistan, ankartext `\"Takläggare i <Ort>\"`."
          : "**Förslag:** länka in sidan från RelatedLinks-navet och relevanta tjänstesidor med beskrivande ankartext.",
    );
    push();
  }
}
push("## Trasiga internlänkar");
push();
if (broken.length === 0) push("Inga trasiga internlänkar.");
else for (const b of broken) push(`- \`${b.raw}\` i ${b.file}`);
push();
push("## Svaga ankartexter");
push();
if (weak.length === 0) {
  push("Inga generiska ankartexter (\"läs mer\", \"här\" osv.) hittades.");
} else {
  for (const w of weak) {
    push(
      `- \`${w.anchor}\` → \`${w.raw}\` i ${w.file} — använd i stället målsidans ämne, t.ex. \"Priser för takbyte\" eller \"Så går ett takbyte till\".`,
    );
  }
}
push();
push("## Länkningsmöjligheter");
push();
for (const s of keyPageStats.filter((s) => s.inbound < 3)) {
  push(`- **${s.path}** har bara ${s.inbound} inkommande länkmönster — lägg till den i RelatedLinks-navet, ortssidornas tjänstelista och relevanta blogginlägg.`);
}
push("- Se till att varje tjänstesida länkar till `/priser`, `/offert#faq` och minst tre systertjänster.");
push("- Varje ortssida bör länka till samtliga tjänst+ort-sidor för orten, `/priser`, `/taktyper` och `/hur-det-gar-till`.");

const report = lines.join("\n") + "\n";
if (mdPath) {
  writeFileSync(resolve(mdPath), report);
  console.log(`Rapport skriven: ${mdPath}`);
}
console.log(report);
