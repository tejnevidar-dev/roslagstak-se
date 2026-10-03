/**
 * Överstyrningskontroll (SEO Command Center, S0). Körs i postbuild (alltså även i Cloudflare-bygget och i CI) och
 * läser bara filer inom webbsida/. Stoppar bygget om en överstyrning bryter mot formatet, fältvitlistan,
 * regelfilerna (src/data/seo-regler/), spärrlistan, unikhetskravet eller loggkonsistensen.
 *
 * Kör: bun scripts/check-overrides.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import {
  bildNyckel,
  FALT,
  INNEHALL_FALT,
  innehallSomText,
  overridePath,
  serializeInnehallFile,
  serializeAvstangd,
  serializeLogg,
  serializeMetaFile,
  type Avstangd,
  type InnehallFile,
  type LoggFile,
  type MetaFile,
} from "../src/data/overrides";
import { checkInnehallPost, checkPost, type Regel, type Sparrlista } from "../src/lib/overrides-validate";
import { prerenderContent, prerenderContentRaw } from "./prerender-content";

const dir = resolve("src/data/overrides");
const reglerDir = resolve("src/data/seo-regler");
const fel: string[] = [];
const e = (m: string) => fel.push(m);

const read = (f: string) => readFileSync(f, "utf8").replace(/\r\n/g, "\n");
const parse = <T>(f: string): { raw: string; data: T } | null => {
  if (!existsSync(f)) {
    e(`${f.replace(process.cwd(), ".")} saknas`);
    return null;
  }
  const raw = read(f);
  try {
    return { raw, data: JSON.parse(raw) as T };
  } catch (err) {
    e(`${f.replace(process.cwd(), ".")} är inte giltig JSON: ${(err as Error).message}`);
    return null;
  }
};

const meta = parse<MetaFile>(resolve(dir, "meta.json"));
const innehall = parse<InnehallFile>(resolve(dir, "innehall.json"));
const logg = parse<LoggFile>(resolve(dir, "_logg.json"));
const avst = parse<Avstangd>(resolve(dir, "_avstangd.json"));
const monster = parse<{ monster: Regel[] }>(resolve(reglerDir, "forbjudna-monster.json"));
const sparr = parse<Sparrlista>(resolve(reglerDir, "sparrlista.json"));

if (!meta || !innehall || !logg || !avst || !monster || !sparr) {
  console.error("[check-overrides] FEL:\n  " + fel.join("\n  "));
  process.exit(1);
}

// 1. Format: filen ska vara exakt så som serialiseringen skriver den (poster sorterade, fast fältordning, 2 blanksteg)
if (meta.data.version !== 1) e("meta.json: version måste vara 1");
if (typeof meta.data.poster !== "object" || Array.isArray(meta.data.poster)) e("meta.json: poster måste vara ett objekt");
else if (meta.raw !== serializeMetaFile(meta.data))
  e("meta.json: formatet avviker från serializeMetaFile (src/data/overrides/index.ts): poster sorterade på sökväg, title före description, fältordning id/text/andrad/orsak, 2 blanksteg, LF och avslutande radbrytning");
if (innehall.data.version !== 1) e("innehall.json: version måste vara 1");
if (typeof innehall.data.poster !== "object" || Array.isArray(innehall.data.poster)) e("innehall.json: poster måste vara ett objekt");
else if (innehall.raw !== serializeInnehallFile(innehall.data))
  e("innehall.json: formatet avviker från serializeInnehallFile (src/data/overrides/index.ts): poster sorterade på sökväg, textblock före faq före lankar, fältordning id/rubrik/data/andrad/orsak, 2 blanksteg, LF och avslutande radbrytning");
if (logg.data.version !== 1 || !Array.isArray(logg.data.rader)) e("_logg.json: ska vara { version: 1, rader: [...] }");
else if (logg.raw !== serializeLogg(logg.data)) e("_logg.json: formatet avviker från serializeLogg");
if (typeof avst.data.alla !== "boolean" || !Array.isArray(avst.data.ider)) e("_avstangd.json: ska vara { alla: boolean, ider: string[] }");
else if (avst.raw !== serializeAvstangd(avst.data)) e("_avstangd.json: formatet avviker från serializeAvstangd");

// 2. Regler: mönstren ska kunna kompileras
for (const r of monster.data.monster) {
  try {
    new RegExp(r.monster, r.flaggor ?? "i");
  } catch (err) {
    e(`seo-regler/forbjudna-monster.json: regeln ${r.id} har ett ogiltigt mönster: ${(err as Error).message}`);
  }
}

// 3. Sidor som finns i sajten
const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
const kandaSidor = new Set<string>(["/"]);
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) kandaSidor.add(overridePath(m[1].replace(/^https?:\/\/[^/]+/, "") || "/"));

// 4. Varje post och fält
const ids = new Map<string, string>();
const poster = meta.data.poster ?? {};
for (const [path, post] of Object.entries(poster)) {
  for (const m of checkPost(path, post, {
      regler: monster.data.monster,
      sparr: sparr.data,
      kandaSidor,
      bas: (p, falt) => (prerenderContent(p) as { title?: string; description?: string } | null)?.[falt],
    })) e(`meta.json ${m}`);
  for (const f of FALT) {
    const falt = post[f];
    if (!falt?.id) continue;
    if (ids.has(falt.id)) e(`meta.json: id ${falt.id} används av både ${ids.get(falt.id)} och ${path} (${f})`);
    ids.set(falt.id, `${path} ${f}`);
  }
}
// Bildnycklar: alla bildfiler i src/assets och public (alt-överstyrningar får bara peka på riktiga bilder)
const bildNycklar = new Set<string>();
const skanna = (d: string) => {
  if (!existsSync(d)) return;
  for (const n of readdirSync(d)) {
    const full = resolve(d, n);
    if (statSync(full).isDirectory()) skanna(full);
    else if (/\.(jpe?g|png|webp|avif|gif|svg)$/i.test(n)) bildNycklar.add(bildNyckel(n));
  }
};
skanna(resolve("src/assets"));
skanna(resolve("public"));
const normText = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const innehallPoster = innehall.data.poster ?? {};
const brodtexter = new Map<string, string>();
for (const [path, post] of Object.entries(innehallPoster)) {
  for (const m of checkInnehallPost(path, post, {
    regler: monster.data.monster,
    sparr: sparr.data,
    kandaSidor,
    basText: (p) => prerenderContentRaw(p)?.paragraphs.join(" "),
    bildNycklar,
  }))
    e(`innehall.json ${m}`);
  for (const f of INNEHALL_FALT) {
    const falt = post[f];
    if (!falt?.id) continue;
    if (ids.has(falt.id)) e(`id ${falt.id} används av både ${ids.get(falt.id)} och ${path} (${f})`);
    ids.set(falt.id, `${path} ${f}`);
    // samma text får inte ligga på två sidor (duplicerat innehåll)
    const texter = f === "textblock" ? (falt as { stycken: string[] }).stycken : f === "faq" ? (falt as { fragor: { svar: string }[] }).fragor.map((x) => x.svar) : [];
    for (const t of texter ?? []) {
      const n = normText(t);
      const prev = brodtexter.get(n);
      if (prev && prev !== path) e(`${path} ${f}: samma text ligger redan på ${prev}`);
      brodtexter.set(n, path);
    }
  }
}
for (const id of avst.data.ider ?? []) if (!ids.has(id)) e(`_avstangd.json: id ${id} finns inte i meta.json eller innehall.json`);

// 5. Loggkonsistens: varje fält har en loggrad med samma id, path, fält och efter-värde
const rader = logg.data.rader ?? [];
const radIds = new Set<string>();
for (const r of rader) {
  if (radIds.has(r.id)) e(`_logg.json: id ${r.id} förekommer på mer än en rad`);
  radIds.add(r.id);
}
for (const [path, post] of Object.entries(innehallPoster)) {
  for (const f of INNEHALL_FALT) {
    const falt = post[f];
    if (!falt) continue;
    const rad = rader.find((r) => r.id === falt.id);
    if (!rad) e(`${path} ${f}: loggrad saknas i _logg.json (id ${falt.id})`);
    else {
      if (rad.path !== path) e(`${path} ${f}: loggraden för ${falt.id} har path ${rad.path}`);
      if (rad.falt !== f) e(`${path} ${f}: loggraden för ${falt.id} gäller fältet ${rad.falt}`);
      if (rad.efter !== innehallSomText(f, falt)) e(`${path} ${f}: loggradens "efter" stämmer inte med innehållet i innehall.json (id ${falt.id}); förväntat innehallSomText`);
      if (rad.fore !== null && typeof rad.fore !== "string") e(`${path} ${f}: "fore" måste vara text eller null`);
    }
  }
}
for (const [path, post] of Object.entries(poster)) {
  for (const f of FALT) {
    const falt = post[f];
    if (!falt) continue;
    const rad = rader.find((r) => r.id === falt.id);
    if (!rad) e(`${path} ${f}: loggrad saknas i _logg.json (id ${falt.id})`);
    else {
      if (rad.path !== path) e(`${path} ${f}: loggraden för ${falt.id} har path ${rad.path}`);
      if (rad.falt !== f) e(`${path} ${f}: loggraden för ${falt.id} gäller fältet ${rad.falt}`);
      if (rad.efter !== falt.text) e(`${path} ${f}: loggradens "efter" stämmer inte med texten i meta.json (id ${falt.id})`);
      if (rad.fore !== null && typeof rad.fore !== "string") e(`${path} ${f}: "fore" måste vara text eller null`);
    }
  }
}

// 6. Unikhet: en överstyrd titel eller beskrivning får inte bli identisk med någon annan sidas
const effective = { title: new Map<string, string>(), description: new Map<string, string>() };
for (const p of kandaSidor) {
  const page = prerenderContent(p);
  const ov = poster[p];
  const title = ov?.title?.text ?? page?.title;
  const description = ov?.description?.text ?? page?.description;
  if (title) effective.title.set(p, normText(title));
  if (description) effective.description.set(p, normText(description));
}
for (const [path, post] of Object.entries(poster)) {
  for (const f of FALT) {
    const value = post[f]?.text;
    if (!value) continue;
    const mine = normText(value);
    for (const [other, v] of effective[f]) if (other !== overridePath(path) && v === mine) e(`${path}: ${f} är identisk med ${other}`);
  }
}

if (fel.length) {
  console.error(`[check-overrides] ${fel.length} fel:\n  ` + fel.join("\n  "));
  process.exit(1);
}
const antalFalt = Object.values(poster).reduce((n, p) => n + FALT.filter((f) => p[f]).length, 0) + Object.values(innehallPoster).reduce((n, p) => n + INNEHALL_FALT.filter((f) => p[f]).length, 0);
console.log(`[check-overrides] OK: ${new Set([...Object.keys(poster), ...Object.keys(innehallPoster)]).size} sidor, ${antalFalt} överstyrda fält, ${avst.data.alla ? "ALLA avstängda" : `${avst.data.ider.length} avstängda`}, ${rader.length} loggrader`);
