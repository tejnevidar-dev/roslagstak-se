/**
 * Konkurrentanalys av PUBLIKA sidor (SEO-programmet 2.43/2.44, backlog 1ar). Lokalt verktyg, ingen del av bygget.
 *
 * Regler: bara publika sidor, en förfrågan i sekunden, robots.txt respekteras (Disallow: / → ingen hämtning),
 * ingen text sparas. Bara URL-listor och mätvärden (rubrikantal, ordantal, FAQ ja/nej, schematyper, antal
 * interna länkar). Texter och bilder kopieras aldrig. Det som inte går att se är "okänt".
 *
 * Kör: bun scripts/konkurrentanalys.ts            (hämtar och skriver ../ledning/marknad/.konkurrentanalys-2026-10.json)
 *      bun scripts/konkurrentanalys.ts --rapport  (skriver tabeller ur JSON-filen till stdout, utan nya hämtningar)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locationIndex } from "../src/data/location-index";
import { problems } from "../src/data/problems";
import { materials } from "../src/data/materials";

const OUT = resolve("../ledning/marknad/.konkurrentanalys-2026-10.json");
const UA = "Mozilla/5.0 (compatible; RoslagsTak-research; +https://roslagstak.se)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const COMPETITORS: { id: string; domain: string; note: string }[] = [
  { id: "vertex", domain: "vertextak.se", note: "Stockholm, Mälardalen; annonserar på takbyte Täby/Norrtälje (ads/11)" },
  { id: "beckmans", domain: "beckmansbygg.se", note: "Stockholm; annonserar på takbyte Täby/Norrtälje (ads/11)" },
  { id: "villatakexperten", domain: "villatakexperten.se", note: "Stockholm, Uppsala, Västerås; träff på takläggare Norrtälje" },
  { id: "modernatak", domain: "www.modernatak.se", note: "Täby och norra Stockholm; träff på takläggare Norrtälje" },
  { id: "besttak", domain: "www.besttak.se", note: "Lidingö, Stockholm" },
  { id: "taklaggarennorrtalje", domain: "taklaggarennorrtalje.se", note: "Norrtälje/Roslagen; organisk träff" },
  { id: "taklaggningnorrtalje", domain: "taklaggning-norrtalje.se", note: "Norrtälje; organisk träff" },
  { id: "daasbygg", domain: "www.daasbygg.se", note: "Takläggare per ort; organisk träff Norrtälje" },
  { id: "takfirmastockholm", domain: "takfirma-stockholm.se", note: "Takfirma per ort; organisk träff Norrtälje" },
  { id: "karlfeldt", domain: "www.karlfeldtbygg.se", note: "Åkersberga/Österåker; byggfirma med takarbeten" },
];

const get = async (url: string): Promise<{ status: number; text: string }> => {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    const text = r.ok ? await r.text() : "";
    return { status: r.status, text };
  } catch {
    return { status: 0, text: "" };
  }
};

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/å|ä/g, "a").replace(/ö/g, "o");

const KW = {
  problem: ["lackage", "lacker", "fuktskad", "mossa", "alger", "raspont", "ispropp", "rutten", "snoras", "kondens", "fuktflack", "isbildning", "skadat", "takskada", "stormskada", "ranndal"],
  material: ["tegel", "betongpann", "plat", "papp", "falsat", "falsad", "tp20", "eternit", "pannplat", "shingel", "sedum", "lertegel", "stalplat", "zink", "koppar", "aluminium"],
  service: ["takbyte", "taklaggning", "takrenovering", "renovering", "takomlaggning", "taktvatt", "takmalning", "takrannor", "hangrannor", "platslageri", "taksakerhet", "snorasskydd", "takkupa", "takfonster", "takservice", "takinspektion", "takkontroll", "takreparation", "taklaggare", "solcell", "fasad", "brf"],
  blog: ["/blogg", "/nyheter", "/artiklar", "/guide", "/tips", "/kunskap", "/nyhet", "/inspiration"],
  project: ["/referens", "/projekt", "/portfolio", "/vara-jobb", "/galleri", "/case"],
};
const ourLocationSlugs = new Set(locationIndex.map((l) => l.slug));
const ourLocationNames = locationIndex.map((l) => norm(l.name).replace(/\s+/g, "-"));

type Cat = "ORT" | "PROBLEM" | "MATERIAL" | "TJANST" | "BLOGG" | "PROJEKT" | "OVRIGT";
const categorize = (path: string): Cat => {
  const p = norm(decodeURIComponent(path));
  if (KW.blog.some((k) => p.includes(k))) return "BLOGG";
  if (KW.project.some((k) => p.includes(k))) return "PROJEKT";
  const tokens = p.split(/[^a-z0-9]+/).filter(Boolean).join("-");
  const hasOrt = ourLocationNames.some((n) => n.length > 3 && new RegExp(`(^|-)${n}(-|$)`).test(tokens)) || /(^|\/)(taklaggare|takbyte|takfirma|taklaggning)[-/][a-z-]{3,}$/.test(p);
  if (hasOrt && KW.service.some((k) => p.includes(k))) return "ORT";
  if (KW.problem.some((k) => p.includes(k))) return "PROBLEM";
  if (KW.material.some((k) => p.includes(k))) return "MATERIAL";
  if (KW.service.some((k) => p.includes(k))) return "TJANST";
  return "OVRIGT";
};

type PageStat = { url: string; cat: Cat; words: number; h1: number; h2: number; h3: number; faq: boolean; schema: string[]; internalLinks: number };

const statOf = (url: string, html: string, cat: Cat): PageStat => {
  const host = new URL(url).host.replace(/^www\./, "");
  const jsonLd = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const types = new Set<string>();
  for (const j of jsonLd) for (const m of j.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)) types.add(m[1]);
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  const main = body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? body;
  const words = main.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const hrefs = new Set<string>();
  for (const m of main.matchAll(/<a[^>]+href="([^"#]+)"/gi)) {
    try {
      const u = new URL(m[1], url);
      if (u.host.replace(/^www\./, "") === host) hrefs.add(u.pathname);
    } catch {
      /* ogiltig länk */
    }
  }
  const count = (tag: string) => (main.match(new RegExp(`<${tag}[\\s>]`, "gi")) ?? []).length;
  const faq = types.has("FAQPage") || /vanliga fr[aå]gor|<details|accordion/i.test(main);
  return { url, cat, words, h1: count("h1"), h2: count("h2"), h3: count("h3"), faq, schema: [...types].sort(), internalLinks: hrefs.size };
};

const readSitemaps = async (base: string, robotsText: string): Promise<string[]> => {
  const roots = [...robotsText.matchAll(/^sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!roots.length) roots.push(`${base}/sitemap.xml`);
  const urls = new Set<string>();
  const queue = [...roots];
  let fetched = 0;
  while (queue.length && fetched < 14) {
    const sm = queue.shift()!;
    const r = await get(sm);
    fetched++;
    await sleep(1000);
    for (const m of r.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      if (/\.xml($|\?)/.test(m[1])) queue.push(m[1]);
      else urls.add(m[1]);
    }
  }
  return [...urls].slice(0, 4000);
};

if (process.argv.includes("--rapport")) {
  const data = JSON.parse(readFileSync(OUT, "utf8"));
  console.log(JSON.stringify(data.summary, null, 2));
  process.exit(0);
}

const results: Record<string, unknown> = {};
for (const c of COMPETITORS) {
  const base = `https://${c.domain}`;
  console.error(`[${c.id}] robots…`);
  const robots = await get(`${base}/robots.txt`);
  await sleep(1000);
  const disallowAll = /user-agent:\s*\*[\s\S]*?^disallow:\s*\/\s*$/im.test(robots.text);
  if (disallowAll) {
    results[c.id] = { ...c, blockedByRobots: true };
    continue;
  }
  const urls = await readSitemaps(base, robots.text);
  const byCat: Record<Cat, string[]> = { ORT: [], PROBLEM: [], MATERIAL: [], TJANST: [], BLOGG: [], PROJEKT: [], OVRIGT: [] };
  for (const u of urls) {
    let path = "/";
    try {
      path = new URL(u).pathname;
    } catch {
      continue;
    }
    byCat[categorize(path)].push(path);
  }
  // Provsidor: upp till 2 per kategori (hämtas i normal takt)
  const sample: PageStat[] = [];
  for (const cat of ["TJANST", "ORT", "PROBLEM", "MATERIAL", "BLOGG", "PROJEKT"] as Cat[]) {
    const paths = byCat[cat].filter((p) => p !== "/" && p.length > 1);
    const pick = [paths[0], paths[Math.floor(paths.length / 2)]].filter((x, i, a) => x && a.indexOf(x) === i);
    for (const p of pick) {
      console.error(`[${c.id}] ${cat} ${p}`);
      const r = await get(`${base}${p}`);
      await sleep(1000);
      if (r.status === 200) sample.push(statOf(`${base}${p}`, r.text, cat));
    }
  }
  const home = await get(`${base}/`);
  await sleep(1000);
  const homeStat = home.status === 200 ? statOf(`${base}/`, home.text, "OVRIGT") : null;
  const coveredOurLocations = locationIndex.filter((l) => byCat.ORT.some((p) => norm(p).split(/[^a-z0-9]+/).join("-").includes(norm(l.name).replace(/\s+/g, "-")))).map((l) => l.slug);
  results[c.id] = {
    ...c,
    blockedByRobots: false,
    sitemapUrls: urls.length,
    counts: Object.fromEntries(Object.entries(byCat).map(([k, v]) => [k, v.length])),
    examplesByCat: Object.fromEntries(Object.entries(byCat).map(([k, v]) => [k, v.slice(0, 6)])),
    ortPaths: byCat.ORT,
    coveredOurLocations,
    home: homeStat,
    sample,
  };
  writeFileSync(OUT, JSON.stringify({ date: new Date().toISOString().slice(0, 10), results, ours: { locations: [...ourLocationSlugs].length, problems: problems.map((p) => p.slug), materials: materials.map((m) => m.slug) } }, null, 2));
}
const final = { date: new Date().toISOString().slice(0, 10), results, ours: { locations: [...ourLocationSlugs].length, problems: problems.map((p) => p.slug), materials: materials.map((m) => m.slug) }, summary: "se results" };
writeFileSync(OUT, JSON.stringify(final, null, 2));
console.error("klart →", OUT);
