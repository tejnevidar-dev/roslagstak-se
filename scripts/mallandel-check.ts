/**
 * Mallandel som byggmått (F12 steg 1, plan-mallandel-kod.md): andelen av en ortssidas femordssekvenser som också står på minst 10 % av ortssidorna,
 * med sidans eget ortsnamn maskat. Mäts på den förrenderade HTML-texten i dist/ (det en sökrobot ser utan JavaScript), en sida per /taklaggare-<ort> i sajtkartan.
 * Varnar över en gräns men FÄLLER INTE bygget (gränsen är Marknadschefens beslut). Skriver listan sorterad med högst mallandel först.
 *
 * Körning efter bygget: bun scripts/mallandel-check.ts [--dist=dist] [--grans=50] [--ut=<fil.md>] [--json=<fil.json>]
 * Mätmetoden är densamma som i Innehålls mätningar (femordsfraser, ortsnamn maskat, mallgräns 10 % av sidorna); siffran kan avvika något, eftersom den här läser
 * den statiska HTML:en och Innehålls mätning läser den ritade sidan.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";

const args = process.argv.slice(2);
const arg = (n: string, d: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const dist = resolve(arg("dist", "dist"));
const grans = Number(arg("grans", "50"));
const utFil = arg("ut", "");
const jsonFil = arg("json", "");
const N_GRAM = 5;
const MALL_ANDEL_AV_SIDOR = 0.1;

const sitemapFil = resolve(dist, "sitemap.xml");
if (!existsSync(sitemapFil)) {
  console.error(`[mallandel-check] ${sitemapFil} saknas: kör efter bygget`);
  process.exit(2);
}
const sitemap = readFileSync(sitemapFil, "utf8");
const slugs = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se\/taklaggare-([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);
const namn = new Map(locations.map((l) => [l.slug, l.name]));

const avkoda = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ").replace(/&aring;/g, "å");
const synligText = (html: string) =>
  avkoda(
    html
      .replace(/<head[\s\S]*?<\/head>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " "),
  );
const ord = (s: string) => s.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
const maskaOrt = (text: string, ortsnamn: string) => {
  const delar = ord(ortsnamn);
  if (!delar.length) return text;
  const re = new RegExp(`(?<![\\p{L}\\p{N}])${delar.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^\\p{L}\\p{N}]+")}`, "giu");
  return text.replace(re, " ORT ");
};

type Sida = { slug: string; ord: number; sekvenser: string[] };
const sidor: Sida[] = [];
for (const slug of slugs) {
  const fil = [resolve(dist, `taklaggare-${slug}.html`), resolve(dist, `taklaggare-${slug}`, "index.html")].find(existsSync);
  if (!fil) continue;
  const text = maskaOrt(synligText(readFileSync(fil, "utf8")), namn.get(slug) ?? slug);
  const o = ord(text);
  const sekvenser: string[] = [];
  for (let i = 0; i + N_GRAM <= o.length; i++) sekvenser.push(o.slice(i, i + N_GRAM).join(" "));
  sidor.push({ slug, ord: o.length, sekvenser });
}
if (sidor.length < 100) {
  console.error(`[mallandel-check] bara ${sidor.length} ortssidor lästes (sajtkartan nämner ${slugs.length}): kontrollera --dist`);
  process.exit(2);
}

const sidorMedFras = new Map<string, number>();
for (const s of sidor) for (const f of new Set(s.sekvenser)) sidorMedFras.set(f, (sidorMedFras.get(f) ?? 0) + 1);
const mallGrans = Math.ceil(sidor.length * MALL_ANDEL_AV_SIDOR);
const rader = sidor
  .map((s) => {
    const mall = s.sekvenser.filter((f) => (sidorMedFras.get(f) ?? 0) >= mallGrans).length;
    return { slug: s.slug, ord: s.ord, fraser: s.sekvenser.length, mall, andel: s.sekvenser.length ? (100 * mall) / s.sekvenser.length : 0 };
  })
  .sort((a, b) => b.andel - a.andel);
const snitt = rader.reduce((a, r) => a + r.andel, 0) / rader.length;
const median = rader.map((r) => r.andel).sort((a, b) => a - b)[Math.floor(rader.length / 2)];
const over = rader.filter((r) => r.andel > grans);
const f1 = (x: number) => x.toFixed(1).replace(".", ",");

console.log(`[mallandel-check] ${rader.length} ortssidor, mallgräns ${mallGrans} sidor (${MALL_ANDEL_AV_SIDOR * 100} %): snitt ${f1(snitt)} %, median ${f1(median)} %, högst ${f1(rader[0].andel)} % (${rader[0].slug}), lägst ${f1(rader[rader.length - 1].andel)} %`);
if (over.length) console.warn(`[mallandel-check] VARNING (fäller inte): ${over.length} sidor över ${grans} %, till exempel ${over.slice(0, 5).map((r) => `${r.slug} ${f1(r.andel)} %`).join(", ")}`);

if (utFil) {
  const md = [
    `# Mallandel per ortssida (bygget, ${new Date().toISOString().slice(0, 10)})`,
    "",
    `${rader.length} ortssidor. Metod: femordssekvenser i den förrenderade texten, sidans eget ortsnamn maskat, en sekvens är mall om den finns på minst ${mallGrans} sidor (${MALL_ANDEL_AV_SIDOR * 100} %). Snitt **${f1(snitt)} %**, median ${f1(median)} %. Varnar över ${grans} %, fäller inte.`,
    "",
    "| Sida | Ord | Sekvenser | Mall | Mallandel |",
    "|---|---|---|---|---|",
    ...rader.map((r) => `| /taklaggare-${r.slug} | ${r.ord} | ${r.fraser} | ${r.mall} | ${f1(r.andel)} % |`),
    "",
  ].join("\n");
  writeFileSync(utFil, md);
}
if (jsonFil) writeFileSync(jsonFil, JSON.stringify({ snitt, median, mallGrans, rader }, null, 1));
