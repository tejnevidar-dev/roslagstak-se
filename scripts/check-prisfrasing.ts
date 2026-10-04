/**
 * Prisfrasering (juristens villkor 2026-10-04, sokordsagare-2026-10-04.md avsnitt 5): "från" eller "ca" exakt som i
 * prislistan (prices.ts). Dubbelfalsat och papptak är "ca", aldrig "från". Fäller bygget om "från <belopp>" står
 * intill dubbelfalsat eller papptak i den byggda HTML-texten. Kontrollerar också att prisposterna i prices.ts har
 * den frasering juristen har godkänt. Körs i postbuild efter vite build.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import { prisPost } from "../src/data/prices";

const fel: string[] = [];

// 1) Prislistan själv
if (!/^Ca /.test(prisPost("Dubbelfalsat plåttak").priceRange)) fel.push('prices.ts: "Dubbelfalsat plåttak" ska börja med "Ca"');
if (!/^Ca /.test(prisPost("Papptak").priceRange)) fel.push('prices.ts: "Papptak" ska börja med "Ca"');

// 1b) Strukturerade data på tjänst × ort-sidor får inga belopp (regel 5, backlog 1ci): servicePriceDescriptionsRaw i
// ServiceLocationPage.tsx. Ett belopp ("1 200 kr/m²", "från 8 000 kr") i tabellen fäller bygget.
{
  const src = readFileSync("src/pages/ServiceLocationPage.tsx", "utf8");
  const block = src.match(/const servicePriceDescriptionsRaw[\s\S]*?\n};/)?.[0] ?? "";
  if (!block) fel.push("ServiceLocationPage.tsx: servicePriceDescriptionsRaw hittas inte (mönstret i check-prisfrasing.ts måste följa med vid omdöpning)");
  const belopp = block.match(/\d[\d ]*\s*kr(?:\/m²|\/löpmeter)?/g);
  if (belopp) fel.push(`ServiceLocationPage.tsx: belopp i servicePriceDescriptionsRaw (${belopp.join(", ")}). Riktpriser hör hemma på /priser`);
  if (/tegelprofilerad|ligger normalt lägre|ROT-avdrag tillkommer/.test(block)) fel.push("ServiceLocationPage.tsx: förbjuden formulering i servicePriceDescriptionsRaw");
}

// 1c) Ortssidornas frågor (location-faqs.ts): inga belopp, ingen "skriftlig" (garantibeviset är pausat) och ingen "Mälardalen"
// (hör bara hemma på regionsidan Mälardalen).
{
  const src = readFileSync("src/data/location-faqs.ts", "utf8").split("\n").filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join("\n");
  const belopp = src.match(/\d[\d ]*\s*kr\/m²/g);
  if (belopp) fel.push(`location-faqs.ts: belopp (${belopp.join(", ")}). Riktpriser hör hemma på /priser`);
  if (/skriftlig/i.test(src)) fel.push('location-faqs.ts: "skriftlig" (garantibeviset är pausat)');
  if (/Mälardalen/.test(src)) fel.push('location-faqs.ts: "Mälardalen" hör bara hemma på regionsidan');
}

// 2) Den byggda texten
const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "assets" || f === "admin" ? [] : walk(p)) : p.endsWith(".html") ? [p] : [];
  });
let sidor = 0;
for (const f of walk("dist")) {
  // Textnoder (en cell, ett stycke) var för sig, så att intilliggande tabellceller inte blandas ihop
  const noder = readFileSync(f, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .split(/<[^>]+>/)
    .map((n) => n.replace(/&amp;/g, "&").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const path = "/" + f.split(sep).slice(1).join("/").replace(/\.html$/, "");
  // Meningsvis, så att "från" i en annan mening inte räknas
  for (const nod of noder) for (const m of nod.matchAll(/[^.!?]+[.!?]?/g)) {
    const s = m[0];
    // "från <belopp>" fäller bara när det står direkt vid materialet: "dubbelfalsat från 2 000 kr/m²" eller
    // "från 2 000 kr/m² (dubbelfalsat)". "TP20-plåt från 1 200 kr/m², dubbelfalsat ca 2 000 kr/m²" är rätt.
    const belopp = String.raw`(?:ca\s+)?\d[\d ]*\s*kr(?:/m²)?`;
    const material = String.raw`(?:dubbelfals\w*|papptak\w*)`;
    const efter = new RegExp(String.raw`${material}(?:\s+\p{L}+){0,2}\s*:?\s*från\s+${belopp}`, "giu");
    const fore = new RegExp(String.raw`från\s+${belopp}\s*(?:\(\s*)?(?:för\s+|på\s+)?${material}`, "giu");
    const traff = efter.test(s) || fore.test(s);
    if (traff) {
      fel.push(`${path}: "${s.trim().slice(0, 140)}"`);
      sidor++;
      break;
    }
  }
}
if (fel.length) {
  console.error(`[check-prisfrasing] FEL: "från" framför dubbelfalsat eller papptak, eller felaktig prislista (${fel.length}):`);
  for (const f of fel.slice(0, 20)) console.error("  - " + f);
  process.exit(1);
}
console.log(`[check-prisfrasing] OK: "ca" framför dubbelfalsat och papptak överallt (${walk("dist").length} sidor kontrollerade)`);
