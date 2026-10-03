/**
 * Analys av Search Console-exporten från CRM:ets SEO Command Center (fas 2.23 query → landningssida, 2.24 content
 * decay, 2.25 zero-result gaps, utgångsnivåer per sidtyp). Lokalt verktyg, ingen del av bygget.
 *
 * Indata: senaste ledning/marknad/seo-data/seo-data-*.json (exporten innehåller inga personuppgifter).
 * Kör: bun scripts/seo-gsc-analys.ts
 * Skriver: ledning/marknad/seo-gsc-analys.md, samt (bara första gången) den frysta baslinjen
 *          ledning/marknad/seo-data/baslinje-<exportdatum>.json
 *
 * Ärlighet: exporten har högst 1 000 sökordsrader (topp), ett 28-dagarsfönster och föregående 28 dagar. Det räcker
 * för att jämföra två perioder, men inte för att skilja trend från normal volatilitet (kräver minst tre fönster).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { classify } from "./page-type";
import { locationIndex } from "../src/data/location-index";
import { prerenderContent } from "./prerender-content";

const DIR = resolve("../ledning/marknad/seo-data");
const files = readdirSync(DIR).filter((f) => /^seo-data-.*\.json$/.test(f)).sort();
if (!files.length) {
  console.error("Ingen exportfil i ledning/marknad/seo-data/");
  process.exit(2);
}
const exportFile = files[files.length - 1];
const exp = JSON.parse(readFileSync(resolve(DIR, exportFile), "utf8"));
const exportDate: string = String(exp.exportedAt).slice(0, 10);

interface Rad {
  keyword: string;
  position: number | null;
  previousPosition: number | null;
  clicks: number;
  previousClicks: number;
  impressions: number;
  previousImpressions: number;
  landingPage: string | null;
  expectedCtr?: number;
}

const pathOf = (u: string | null) => {
  if (!u) return "?";
  try {
    const p = new URL(u).pathname.replace(/\/+$/, "");
    return p === "" ? "/" : p.toLowerCase();
  } catch {
    return "?";
  }
};
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/å|ä/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

// ---- aggregera rader per (sökord, sida): slå ihop enheter ----
type Agg = {
  keyword: string;
  path: string;
  clicks: number;
  prevClicks: number;
  impr: number;
  prevImpr: number;
  posW: number;
  prevPosW: number;
  expected: number;
};
const aggMap = new Map<string, Agg>();
for (const r of exp.keywords as Rad[]) {
  const path = pathOf(r.landingPage);
  const k = `${r.keyword}|${path}`;
  const a = aggMap.get(k) ?? { keyword: r.keyword, path, clicks: 0, prevClicks: 0, impr: 0, prevImpr: 0, posW: 0, prevPosW: 0, expected: 0 };
  a.clicks += r.clicks ?? 0;
  a.prevClicks += r.previousClicks ?? 0;
  a.impr += r.impressions ?? 0;
  a.prevImpr += r.previousImpressions ?? 0;
  if (r.position != null) a.posW += r.position * (r.impressions ?? 0);
  if (r.previousPosition != null) a.prevPosW += r.previousPosition * (r.previousImpressions ?? 0);
  a.expected += (r.expectedCtr ?? 0) * (r.impressions ?? 0);
  aggMap.set(k, a);
}
const rows = [...aggMap.values()].map((a) => ({
  ...a,
  pos: a.impr ? a.posW / a.impr : null,
  prevPos: a.prevImpr ? a.prevPosW / a.prevImpr : null,
  ctr: a.impr ? a.clicks / a.impr : 0,
  expectedCtr: a.impr ? a.expected / a.impr : 0,
}));

// ---- sökordskluster ----
const locNames = locationIndex.map((l) => norm(l.name)).filter((n) => n.length > 3);
const hasLocation = (q: string) => locNames.some((n) => new RegExp(`(^| )${n}( |$)`).test(q)) || /\b(stockholm|uppsala|vasteras|norrtalje|taby|sollentuna|danderyd|nacka|huddinge|lidingo|vaxholm|osteraker|vallentuna|haninge|sodertalje|solna|sundbyberg|jarfalla|ekero|botkyrka)\b/.test(q);
const SERVICE_RE = /(takbyte|byta tak|takomlaggning|taklaggning|taklaggare|takrenovering|renovera|takrenovation|tak byte|takmalning|taktvatt|takrannor|hangrannor|platslagare|takkupa|takfonster|takkontroll|takinspektion|snorasskydd|takskydd)/;
type Kluster = "BRAND" | "PRIS" | "PROBLEM" | "TJANST_ORT" | "MATERIAL" | "ORT" | "TJANST" | "ÖVRIGT";
const klusterOf = (keyword: string): Kluster => {
  const q = norm(keyword);
  if (/roslags ?tak/.test(q)) return "BRAND";
  if (/(pris|kostar|kostnad|kvadratmeter|per kvm|kr m2)/.test(q)) return "PRIS";
  if (/(lacka|lackage|fukt|mossa|ruttna|rutten|trasig|trasiga|skada|istapp|ispropp|kondens|rost|svacka|losa)/.test(q)) return "PROBLEM";
  if (SERVICE_RE.test(q) && hasLocation(q)) return "TJANST_ORT";
  if (/(plattak|platt tak|tegel|betongpann|papptak|bandtackning|falsat|skiffer|pannplat|tp20|eternit|shingel|lertegel|plat )/.test(q)) return "MATERIAL";
  if (hasLocation(q)) return "ORT";
  if (SERVICE_RE.test(q)) return "TJANST";
  return "ÖVRIGT";
};
const typeOf = (path: string) => (path === "?" ? "OKÄND" : classify(path).type);

// ---- hjälp ----
const fmt = (n: number, d = 0) => n.toLocaleString("sv-SE", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (n: number) => `${fmt(n * 100, 1)} %`;
const pos = (n: number | null) => (n == null ? "–" : fmt(n, 1));
const sum = <T,>(xs: T[], f: (x: T) => number) => xs.reduce((s, x) => s + f(x), 0);
const wavg = (xs: { pos: number | null; impr: number }[]) => {
  const w = xs.filter((x) => x.pos != null && x.impr > 0);
  const t = sum(w, (x) => x.impr);
  return t ? sum(w, (x) => (x.pos as number) * x.impr) / t : null;
};

const sitemap = new Set(
  [...readFileSync(resolve("public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, "").replace(/\/+$/, "").toLowerCase() || "/"),
);

const totImpr = sum(rows, (r) => r.impr);
const totPrevImpr = sum(rows, (r) => r.prevImpr);
const totClicks = sum(rows, (r) => r.clicks);
const totPrevClicks = sum(rows, (r) => r.prevClicks);
const out: string[] = [];
const h = (s: string) => out.push("", s, "");

out.push(
  "# Search Console-analys (fas 2.23–2.25, 2.44)",
  "",
  `Genererad av \`bun scripts/seo-gsc-analys.ts\` ur \`seo-data/${exportFile}\` (export ${exportDate}, period ${exp.period}). Indata: ${exp.keywords.length} sökordsrader (topp 1 000, enheter hopslagna till ${rows.length} par sökord × sida), jämförelseperiod = föregående ${exp.period}. **Begränsning:** två fönster räcker för att se skillnader men inte för att skilja trend från normal volatilitet (det kräver minst tre fönster). Exporten innehåller ingen uppgift om sitemapen är inskickad i Search Console, se avsnitt 6.`,
);

// ---- 1. översikt ----
const pagesWithImpr = new Set(rows.filter((r) => r.impr > 0 && r.path !== "?").map((r) => r.path));
const inSitemapWithImpr = [...pagesWithImpr].filter((p) => sitemap.has(p)).length;
h("## 1. Översikt");
out.push(
  "| Mått | Nu (28 d) | Före (28 d) | Förändring |",
  "|---|---|---|---|",
  `| Visningar | ${fmt(totImpr)} | ${fmt(totPrevImpr)} | ${totPrevImpr ? (totImpr / totPrevImpr - 1 >= 0 ? "+" : "") + fmt((totImpr / totPrevImpr - 1) * 100, 0) + " %" : "–"} |`,
  `| Klick | ${fmt(totClicks)} | ${fmt(totPrevClicks)} | ${fmt(totClicks - totPrevClicks)} |`,
  `| CTR | ${pct(totImpr ? totClicks / totImpr : 0)} | ${pct(totPrevImpr ? totPrevClicks / totPrevImpr : 0)} | |`,
  `| Snittposition (viktad med visningar) | ${pos(wavg(rows))} | ${pos(wavg(rows.map((r) => ({ pos: r.prevPos, impr: r.prevImpr }))))} | |`,
  `| Rader utan landningssida i exporten | ${rows.filter((r) => r.path === "?").length} (${fmt(sum(rows.filter((r) => r.path === "?"), (r) => r.impr))} visningar) | | |`,
  `| Sidor med visningar | ${pagesWithImpr.size} (${inSitemapWithImpr} av ${sitemap.size} sitemap-sidor) | | |`,
  "",
  `Tolkning: sajten syns (${fmt(totImpr)} visningar) men får nästan inga klick (${fmt(totClicks)}), eftersom de flesta sökord ligger på position 20–40. Siffrorna är för små för att dra statistiska slutsatser om enskilda sidor. Raderna är en topp-1 000-lista, så de verkliga totalsiffrorna är minst så här höga.`,
);

// ---- 2. kluster (2.23) ----
h("## 2. Query → landningssida (2.23)");
const klusterNames: Kluster[] = ["BRAND", "PRIS", "PROBLEM", "TJANST_ORT", "MATERIAL", "ORT", "TJANST", "ÖVRIGT"];
const byKluster = new Map<Kluster, typeof rows>();
for (const r of rows) {
  const k = klusterOf(r.keyword);
  byKluster.set(k, [...(byKluster.get(k) ?? []), r]);
}
out.push("| Kluster | Sökord × sida | Visningar | Klick | CTR | Position |", "|---|---|---|---|---|---|");
for (const k of klusterNames) {
  const xs = byKluster.get(k) ?? [];
  const i = sum(xs, (x) => x.impr);
  const c = sum(xs, (x) => x.clicks);
  out.push(`| ${k} | ${xs.length} | ${fmt(i)} | ${fmt(c)} | ${pct(i ? c / i : 0)} | ${pos(wavg(xs))} |`);
}

const top = (xs: typeof rows, n: number) => [...xs].sort((a, b) => b.impr - a.impr).slice(0, n);
const rowLine = (r: (typeof rows)[number]) => `| ${r.keyword} | ${r.path} | ${typeOf(r.path)} | ${fmt(r.impr)} | ${fmt(r.clicks)} | ${pos(r.pos)} |`;
const tableHead = ["| Sökord | Landningssida | Typ | Visn. | Klick | Pos. |", "|---|---|---|---|---|---|"];

const known = rows.filter((r) => r.path !== "?");
const mismatch = {
  "Pris-sökord som landar utanför /priser och kostnadsguider": known.filter((r) => klusterOf(r.keyword) === "PRIS" && !(r.path === "/priser" || (r.path.startsWith("/blogg/") && /(kostnad|pris)/.test(r.path)))),
  "Problem-sökord som landar utanför problemsidor och läckageguider": known.filter((r) => klusterOf(r.keyword) === "PROBLEM" && !(typeOf(r.path) === "PROBLEM" || r.path === "/akut-lackage" || r.path.startsWith("/blogg/"))),
  "Tjänst × ort-sökord som landar på något annat än orts- eller tjänst×ort-sida": known.filter((r) => klusterOf(r.keyword) === "TJANST_ORT" && !["LOCATION", "SERVICE_LOCATION"].includes(typeOf(r.path))),
  "Varumärkessökord som inte landar på startsidan": known.filter((r) => klusterOf(r.keyword) === "BRAND" && r.path !== "/"),
  "Material-sökord som landar utanför material-, tjänst- och guidesidor": known.filter((r) => klusterOf(r.keyword) === "MATERIAL" && !["MATERIAL", "SERVICE", "GUIDE"].includes(typeOf(r.path)) && !r.path.startsWith("/taktyper")),
};
out.push("", "### 2.1 Troligen fel landningssida (störst efter visningar)");
for (const [rubrik, xs] of Object.entries(mismatch)) {
  out.push("", `**${rubrik}:** ${xs.length} sökord × sida, ${fmt(sum(xs, (x) => x.impr))} visningar.`);
  if (xs.length) out.push("", ...tableHead, ...top(xs, 8).map(rowLine));
}

// kannibalisering: samma sökord, flera sidor
const byKw = new Map<string, typeof rows>();
for (const r of rows) byKw.set(r.keyword, [...(byKw.get(r.keyword) ?? []), r]);
const multi = [...byKw.entries()].filter(([, xs]) => xs.length > 1 && sum(xs, (x) => x.impr) >= 20).sort((a, b) => sum(b[1], (x) => x.impr) - sum(a[1], (x) => x.impr));
out.push("", `### 2.2 Samma sökord på flera sidor (${multi.length} sökord med minst 20 visningar)`, "", "| Sökord | Visningar | Sidor (visningar, position) |", "|---|---|---|");
for (const [kw, xs] of multi.slice(0, 15)) out.push(`| ${kw} | ${fmt(sum(xs, (x) => x.impr))} | ${xs.sort((a, b) => b.impr - a.impr).map((x) => `${x.path} (${fmt(x.impr)}, ${pos(x.pos)})`).join("; ")} |`);

// CTR och positionsmöjligheter
const ctrGap = rows.filter((r) => r.impr >= 30 && r.pos != null && r.pos <= 10 && r.ctr < r.expectedCtr * 0.5);
const near = rows.filter((r) => r.impr >= 50 && r.pos != null && r.pos > 10 && r.pos <= 20);
out.push("", `### 2.3 Hög position men låg CTR (position ≤ 10, minst 30 visningar, CTR under hälften av förväntad): ${ctrGap.length}`, "");
if (ctrGap.length) out.push("| Sökord | Sida | Typ | Visn. | Klick | Pos. | CTR | Förväntad |", "|---|---|---|---|---|---|---|---|", ...top(ctrGap, 10).map((r) => `| ${r.keyword} | ${r.path} | ${typeOf(r.path)} | ${fmt(r.impr)} | ${fmt(r.clicks)} | ${pos(r.pos)} | ${pct(r.ctr)} | ${pct(r.expectedCtr)} |`));
out.push("", `### 2.4 Nära förstasidan (position 10–20, minst 50 visningar): ${near.length}`, "");
if (near.length) out.push(...tableHead, ...top(near, 10).map(rowLine));

// ---- 3. decay (2.24) ----
h("## 3. Content decay (2.24)");
type Sida = { path: string; impr: number; prevImpr: number; clicks: number; prevClicks: number; pos: number | null; prevPos: number | null };
const pageMap = new Map<string, Sida>();
for (const r of rows) {
  if (r.path === "?") continue;
  const s = pageMap.get(r.path) ?? { path: r.path, impr: 0, prevImpr: 0, clicks: 0, prevClicks: 0, pos: null, prevPos: null };
  s.impr += r.impr;
  s.prevImpr += r.prevImpr;
  s.clicks += r.clicks;
  s.prevClicks += r.prevClicks;
  pageMap.set(r.path, s);
}
for (const s of pageMap.values()) {
  const mine = rows.filter((r) => r.path === s.path);
  s.pos = wavg(mine);
  s.prevPos = wavg(mine.map((r) => ({ pos: r.prevPos, impr: r.prevImpr })));
}
const sidor = [...pageMap.values()];
const marknadsindex = totPrevImpr ? totImpr / totPrevImpr : 1;
const decay = sidor
  .filter((s) => s.prevImpr >= 50)
  .map((s) => ({ ...s, rel: s.prevImpr ? s.impr / s.prevImpr / marknadsindex : 1 }))
  .filter((s) => s.rel <= 0.6 || (s.pos != null && s.prevPos != null && s.pos - s.prevPos >= 3 && s.impr >= 30));
// Egen länkgraf (samma som veckorapporten): sidans inlänkar från sidinnehåll. CRM:s orphan-lista bygger på en crawl av
// bara 80 sidor och är därför inte tillförlitlig för "saknar inlänkar".
const inlinkCount = new Map<string, number>();
for (const from of sitemap) {
  const page = prerenderContent(from);
  if (!page) continue;
  for (const href of new Set(page.links.map((l: { href: string }) => l.href.replace(/\/+$/, "").toLowerCase() || "/"))) {
    if (href !== from) inlinkCount.set(href, (inlinkCount.get(href) ?? 0) + 1);
  }
}
const inlinks = { has: (p: string) => (inlinkCount.get(p) ?? 0) < 3 };
const recommend = (s: (typeof decay)[number]) => {
  if (inlinks.has(s.path)) return "RELINK (färre än 3 interna inlänkar i vår länkgraf)";
  if (s.pos != null && s.pos > 10 && s.impr >= 100) return "EXPAND (position utanför förstasidan, mycket efterfrågan)";
  if (s.rel <= 0.6 && s.pos != null && s.prevPos != null && s.pos - s.prevPos >= 3) return "UPDATE (minskade visningar och sämre position)";
  if (s.rel <= 0.6) return "UPDATE eller NO ACTION: visningarna minskade mer än marknaden, men underlaget är litet";
  return "NO ACTION: position sämre men visningarna håller sig";
};
out.push(
  `Jämförelse mellan de två 28-dagarsfönstren. Marknadsindex (alla sidors visningar nu / före) = ${fmt(marknadsindex, 2)}, så en sida flaggas när dess visningar föll till 60 % av förra periodens, justerat för det indexet, eller när positionen blev minst 3 steg sämre med minst 30 visningar. **Trend går inte att skilja från volatilitet med två fönster**: behandla listan som underlag att bevaka, inte som bevis.`,
  "",
  `Flaggade sidor (minst 50 visningar förra perioden): ${decay.length}`,
  "",
);
if (decay.length)
  out.push("| Sida | Typ | Visn. nu / före | Klick nu / före | Pos. nu / före | Åtgärd |", "|---|---|---|---|---|---|", ...decay.sort((a, b) => b.prevImpr - a.prevImpr).slice(0, 15).map((s) => `| ${s.path} | ${typeOf(s.path)} | ${fmt(s.impr)} / ${fmt(s.prevImpr)} | ${fmt(s.clicks)} / ${fmt(s.prevClicks)} | ${pos(s.pos)} / ${pos(s.prevPos)} | ${recommend(s)} |`));
const growing = sidor.filter((s) => s.impr >= 50 && s.prevImpr > 0 && s.impr / s.prevImpr / marknadsindex >= 1.5).sort((a, b) => b.impr - a.impr).slice(0, 8);
out.push("", `Sidor vars visningar växer mer än marknaden (≥ 1,5 × indexet, minst 50 visningar): ${growing.length}`, "");
if (growing.length) out.push("| Sida | Typ | Visn. nu / före | Pos. nu / före |", "|---|---|---|---|", ...growing.map((s) => `| ${s.path} | ${typeOf(s.path)} | ${fmt(s.impr)} / ${fmt(s.prevImpr)} | ${pos(s.pos)} / ${pos(s.prevPos)} |`));

// ---- 4. gaps (2.25) ----
h("## 4. Zero-result content gaps (2.25)");
const gaps = (exp.gaps ?? []) as { primaryKeyword: string; intent: string; impressions: number; position: number; recommendedUrl: string; reason: string }[];
out.push(`CRM:s egen gap-lista (${gaps.length} sökord utan dedikerad sida) mot vad sajten faktiskt har:`, "", "| Sökord | Visn. | Pos. | Föreslagen URL | Finns i sitemap? | Bedömning |", "|---|---|---|---|---|---|");
for (const g of gaps.sort((a, b) => b.impressions - a.impressions)) {
  const finns = sitemap.has(g.recommendedUrl.replace(/\/+$/, "").toLowerCase());
  out.push(`| ${g.primaryKeyword} | ${fmt(g.impressions)} | ${pos(g.position)} | ${g.recommendedUrl} | ${finns ? "ja" : "nej"} | ${finns ? "Sidan finns men rankar långt ner: förstärk (text och internlänkar), ingen ny URL" : "Saknas: kräver ny brief från Innehåll med Grind-rad, sitemap och internlänkar"} |`);
}
const orphanish = rows.filter((r) => r.impr >= 30 && r.pos != null && r.pos > 30 && !gaps.some((g) => g.primaryKeyword === r.keyword));
out.push("", `Sökord med minst 30 visningar och position över 30 som inte redan står i CRM:s gap-lista: ${orphanish.length}`, "");
if (orphanish.length) out.push(...tableHead, ...top(orphanish, 12).map(rowLine));

// ---- 5. utgångsnivåer per sidtyp ----
h("## 5. Utgångsnivåer per sidtyp (kalibreringspunkt 1)");
const typer = new Map<string, typeof rows>();
for (const r of rows.filter((x) => x.path !== "?")) typer.set(typeOf(r.path), [...(typer.get(typeOf(r.path)) ?? []), r]);
const baslinje: Record<string, { sidorMedVisningar: number; visningar: number; klick: number; ctr: number; position: number | null }> = {};
out.push("| Sidtyp | Sidor med visningar | Visningar | Klick | CTR | Position |", "|---|---|---|---|---|---|");
for (const [t, xs] of [...typer.entries()].sort((a, b) => sum(b[1], (x) => x.impr) - sum(a[1], (x) => x.impr))) {
  const i = sum(xs, (x) => x.impr);
  const c = sum(xs, (x) => x.clicks);
  const p = new Set(xs.filter((x) => x.impr > 0).map((x) => x.path)).size;
  baslinje[t] = { sidorMedVisningar: p, visningar: i, klick: c, ctr: i ? c / i : 0, position: wavg(xs) };
  out.push(`| ${t} | ${p} | ${fmt(i)} | ${fmt(c)} | ${pct(i ? c / i : 0)} | ${pos(wavg(xs))} |`);
}
out.push("", `Rader utan landningssida i exporten (${fmt(sum(rows.filter((r) => r.path === "?"), (r) => r.impr))} visningar, ${fmt(sum(rows.filter((r) => r.path === "?"), (r) => r.clicks))} klick) ingår inte i tabellen. De är sökord där Search Console inte angav sida, till exempel "takläggare täby" och "takomläggning stockholm": den största enskilda efterfrågan, men utan känd träffsida.`);
const baseFile = resolve(DIR, `baslinje-${exportDate}.json`);
if (!existsSync(baseFile)) {
  writeFileSync(baseFile, JSON.stringify({ exportDate, period: exp.period, kalla: exportFile, baslinje }, null, 2) + "\n");
  out.push("", `Baslinjen är frusen i \`seo-data/baslinje-${exportDate}.json\` (skrivs aldrig över; nästa mätning jämförs mot den).`);
} else out.push("", `Baslinjen \`seo-data/baslinje-${exportDate}.json\` fanns redan och är oförändrad.`);

// skyddade sidor: klick > 0 eller huvudsökord på position ≤ 3
const skyddade = sidor
  .map((s) => ({ s, best: Math.min(...rows.filter((r) => r.path === s.path && r.impr >= 10).map((r) => r.pos ?? 99), 99) }))
  .filter((x) => x.s.clicks > 0 || x.best <= 3)
  .sort((a, b) => b.s.clicks - a.s.clicks || a.best - b.best);
out.push("", `**Skyddade sidor (har klick eller ett sökord på position ≤ 3 med minst 10 visningar): ${skyddade.length}.** Översta 20 % i klick är inte meningsfullt med ${fmt(totClicks)} klick totalt, så de som har klick eller toppositioner räknas som skyddade.`, "", "| Sida | Typ | Klick | Bästa position (≥10 visn.) |", "|---|---|---|---|", ...skyddade.slice(0, 25).map((x) => `| ${x.s.path} | ${typeOf(x.s.path)} | ${fmt(x.s.clicks)} | ${x.best >= 99 ? "–" : fmt(x.best, 1)} |`));

// ---- 6. sitemap och övrigt ----
h("## 6. Sitemap och indexering");
out.push(
  `Exporten säger ingenting om sitemapen är inskickad i Search Console (det finns inget fält för det). Indirekta tecken: ${pagesWithImpr.size} sidor har visningar, ${inSitemapWithImpr} av dem finns i sitemapen (${sitemap.size} URL:er), alltså syns ca ${fmt((inSitemapWithImpr / sitemap.size) * 100, 0)} % av sitemapens sidor i sökningar i topp-1 000-listan. Det visar att många sidor är indexerade men inte att sitemapen är inskickad. **Vidar kan se det på 30 sekunder:** Search Console → Sitemaps; roslagstak.se/sitemap.xml ska stå som "Lyckades" med ca ${sitemap.size} identifierade sidor.`,
);
const gammalTitel = (exp.pages ?? []).filter((p: { url: string; title: string }) => /Takläggare Roslagen — Takbyte & Takrenovering \| RoslagsTak/.test(p.title ?? "") && pathOf(p.url) !== "/");
if (gammalTitel.length)
  out.push("", `**Obs till CRM:** i exportens sidlista har ${gammalTitel.length} av ${exp.pages.length} sidor startsidans titel ("Takläggare Roslagen — Takbyte & Takrenovering | RoslagsTak") fast deras live-HTML har egen titel (kontrollerat 2026-10-03, t.ex. /blogg/rot-avdrag-takbyte). CRM:s crawler verkar läsa en äldre eller JavaScript-lös variant. Det påverkar bara CRM:s tekniska issue-lista, inte sajten.`);

writeFileSync(resolve("../ledning/marknad/seo-gsc-analys.md"), out.join("\n") + "\n");
console.log(`[seo-gsc-analys] ${rows.length} par, ${totImpr} visningar, ${totClicks} klick → ledning/marknad/seo-gsc-analys.md`);
