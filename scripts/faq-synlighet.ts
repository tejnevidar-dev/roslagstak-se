/**
 * FAQPage-schemats frågor och svar ska stå ordagrant i den statiska HTML:ens synliga text (N4, Marknadschefen 2026-10-06):
 * det sökmotorer och kontroller ser utan JavaScript ska vara lika med det besökaren ser. Går igenom alla byggda sidor med
 * FAQPage, grupperar per sidtyp och rapporterar frågor och svar som bara finns i schemat.
 * Körning: bun scripts/faq-synlighet.ts [--fel] [--lista]   (--fel: fäll bygget om något svar saknas, annars bara rapport)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const fel = process.argv.includes("--fel");
const lista = process.argv.includes("--lista");
if (!existsSync("dist")) {
  console.log("[faq-synlighet] hoppar över: dist saknas");
  process.exit(0);
}

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "assets" || f === "admin" ? [] : walk(p)) : p.endsWith(".html") ? [p] : [];
  });

const avkoda = (s: string) =>
  s
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
const norm = (s: string) => avkoda(s).replace(/<[^>]+>/g, " ").replace(/[\s ]+/g, " ").trim().toLowerCase();

const grupp = (path: string): string => {
  const seg = path.split("/").filter(Boolean);
  if (seg.length === 0) return "startsida";
  if (["tjanster", "material", "takproblem", "blogg", "brf", "offert", "omraden", "projekt"].includes(seg[0]) && seg.length > 1) return `/${seg[0]}/*`;
  if (seg.length === 1 && seg[0].startsWith("taklaggare-")) return "/taklaggare-<ort>";
  if (seg.length === 1) {
    const m = seg[0].match(/^([a-z0-9]+)-[a-z0-9-]+$/);
    if (m && /^(takbyte|takrenovering|takomlaggning|betongpannor|tegeltak|plattak|tp20|dubbelfalsat|pannplat|bandtackning|taktvatt|takmalning|takkupor|takavvattning|hangrannor|platarbeten|takinspektion|takkontroll|taksakerhet|byta|eternit|papptak|lertegel|bandtackt)$/.test(m[1])) return `/${m[1]}-<ort> (tjänst/material × ort)`;
  }
  return "övriga enstaka sidor";
};

type Rad = { grupp: string; sidor: number; fraagor: number; svarSaknas: number; fraagaSaknas: number; sidorMedBrist: string[] };
const grupper = new Map<string, Rad>();
let totalSidor = 0;
for (const f of walk("dist")) {
  const html = readFileSync(f, "utf8");
  if (!html.includes("FAQPage")) continue;
  const path = "/" + f.split(sep).slice(1).join("/").replace(/\.html$/, "").replace(/\/index$/, "").replace(/^index$/, "");
  const faq: { name: string; text: string }[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      for (const o of Array.isArray(j) ? j : (j["@graph"] ?? [j])) if (o["@type"] === "FAQPage") for (const q of o.mainEntity ?? []) faq.push({ name: q.name, text: q.acceptedAnswer?.text ?? "" });
    } catch { /* ogiltig JSON-LD fångas av validate-structured-data */ }
  }
  if (!faq.length) continue;
  totalSidor++;
  const body = norm(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " "));
  const g = grupp(path);
  const r = grupper.get(g) ?? { grupp: g, sidor: 0, fraagor: 0, svarSaknas: 0, fraagaSaknas: 0, sidorMedBrist: [] };
  r.sidor++;
  let brist = false;
  for (const q of faq) {
    r.fraagor++;
    if (!body.includes(norm(q.name))) { r.fraagaSaknas++; brist = true; }
    const a = norm(q.text);
    if (!(body.includes(a) || (body.includes(a.slice(0, 60)) && body.includes(a.slice(-40))))) { r.svarSaknas++; brist = true; }
  }
  if (brist) r.sidorMedBrist.push(path);
  grupper.set(g, r);
}

const rader = [...grupper.values()].sort((a, b) => b.svarSaknas - a.svarSaknas || a.grupp.localeCompare(b.grupp));
console.log(`[faq-synlighet] ${totalSidor} sidor med FAQPage`);
for (const r of rader) {
  console.log(`  ${r.sidorMedBrist.length ? "BRIST" : "ok   "} ${r.grupp}: ${r.sidor} sidor, ${r.fraagor} frågor, svar saknas i synlig text: ${r.svarSaknas}, fråga saknas: ${r.fraagaSaknas}, sidor med brist: ${r.sidorMedBrist.length}${r.sidorMedBrist.length ? " (t.ex. " + r.sidorMedBrist.slice(0, 3).join(", ") + ")" : ""}`);
  if (lista) for (const s of r.sidorMedBrist) console.log("      " + s);
}
const brister = rader.reduce((s, r) => s + r.sidorMedBrist.length, 0);
if (brister && fel) {
  console.error(`[faq-synlighet] FEL: ${brister} sidor har FAQPage-svar som inte står i den synliga statiska texten`);
  process.exit(1);
}
console.log(brister ? `[faq-synlighet] ${brister} sidor med brist (rapport, fäller inte)` : "[faq-synlighet] OK: alla FAQPage-svar står i den synliga statiska texten");
