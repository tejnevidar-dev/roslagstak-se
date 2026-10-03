/**
 * Bildgranskning (SEO fas 16 och 2.12): alt-text och filstorlek för alla bilder, och ursprung per bildfil.
 * Lokalt verktyg, ingen del av bygget. Kör: bun scripts/image-audit.ts
 * Skriver: ledning/marknad/bildgranskning.md
 *
 * Ursprung (regel 5: aldrig påhittade eller AI-genererade bilder): scriptet kan inte avgöra var en bild kommer från.
 * Tabellen PROVENANCE nedan är en handskriven lista. Bilder som inte står där, eller står som "obekräftat", ska
 * Vidar eller Marknadschefen bekräfta innan bilden får stå på en sida som påstår att jobbet är vårt.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const PROVENANCE: Record<string, string> = {
  "hero-drone": "Eget drönarfoto/film, nytt tak på Blidö (belagt, används sedan länge som startsidans hero)",
  "project-blido": "Eget referensjobb Blidö (projekt/blido, belagt i projects.ts)",
  "project-singo": "Eget referensjobb Singö (projekt/singo, belagt i projects.ts)",
  "project-betongpannor-closeup": "Obekräftat (närbild betongpannor, ingen källa i repot)",
  "roof-build-": "Dokumentära byggbilder, kodkommentar i ServiceDetail.tsx säger 'eget arbete'. Obekräftat i dokument",
  "roof-type-": "Materialbilder på /taktyper. Obekräftat om egna foton eller materialleverantörens",
  "material-": "Kopior av roof-type-bilderna (public/og). Samma ursprungsfråga som roof-type",
  "roof-brf-hero": "Obekräftat",
  "roofer-work": "OBEKRÄFTAT: rött hus med nya pannor, ingen dokumenterad källa (öppen fråga 7 i om-oss-utkast.md). Borttagen från eternitsidan 2026-10-03",
  "roslagstak-logo": "Egen logotyp",
};
const provenanceOf = (file: string) => {
  const key = Object.keys(PROVENANCE).find((k) => file.startsWith(k));
  return key ? PROVENANCE[key] : "Obekräftat (inte med i listan)";
};

const walk = (dir: string, out: string[] = []): string[] => {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};
const srcFiles = walk(resolve("src")).filter((f) => /\.(tsx?|ts)$/.test(f));
const read = (f: string) => readFileSync(f, "utf8");

// 1) bildfiler
const assetDirs = [resolve("src/assets"), resolve("public/og")].filter(existsSync);
const assets = assetDirs.flatMap((d) => readdirSync(d).filter((f) => /\.(jpe?g|png|webp|avif|svg|gif)$/i.test(f)).map((f) => ({ dir: d, file: f, size: statSync(join(d, f)).size })));
const baseOf = (f: string) => f.replace(/-(480|768|1080|1440)(?=\.)/, "").replace(/\.(jpe?g|png|webp|avif)$/i, "");
const hasModern = (file: string) => assets.some((a) => baseOf(a.file) === baseOf(file) && /\.(webp|avif)$/i.test(a.file));

// 2) var används filerna (import eller sträng)
const usage = new Map<string, Set<string>>();
for (const f of srcFiles) {
  const text = read(f);
  for (const a of assets) if (text.includes(a.file) || text.includes(baseOf(a.file))) {
    if (!usage.has(a.file)) usage.set(a.file, new Set());
    usage.get(a.file)!.add(f.replace(resolve(".") + "\\", "").replace(/\\/g, "/"));
  }
}

// 3) <img>-taggar och deras alt
type Img = { file: string; line: number; alt: string; flag: string };
const imgs: Img[] = [];
for (const f of srcFiles.filter((x) => x.endsWith(".tsx"))) {
  const text = read(f);
  for (const m of text.matchAll(/<img\b([\s\S]*?)\/?>/g)) {
    const attrs = m[1];
    const line = text.slice(0, m.index).split("\n").length;
    const altLit = attrs.match(/\balt="([^"]*)"/)?.[1];
    const altExpr = attrs.match(/\balt=\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/)?.[1];
    const alt = altLit !== undefined ? altLit : altExpr !== undefined ? `{${altExpr.trim()}}` : "";
    let flag = "";
    if (altLit === undefined && altExpr === undefined) flag = "SAKNAR alt";
    else if (altLit === "" ) flag = "tomt alt (ok bara för dekorbild)";
    else if (altLit && altLit.length < 10) flag = "kort alt";
    else if (altLit && /^(bild|foto|image|picture)\b/i.test(altLit)) flag = 'börjar med "bild"/"foto"';
    imgs.push({ file: f.replace(resolve(".") + "\\", "").replace(/\\/g, "/"), line, alt, flag });
  }
}

const kb = (n: number) => `${Math.round(n / 1024)} kB`;
const out: string[] = [];
out.push("# Bildgranskning: alt-text, filstorlek och ursprung", "");
out.push(`Genererad av \`bun scripts/image-audit.ts\`. ${assets.length} bildfiler, ${imgs.length} <img>-taggar i src/.`, "");
const problems = imgs.filter((i) => i.flag && !i.flag.startsWith("tomt"));
const decorative = imgs.filter((i) => i.flag.startsWith("tomt"));
out.push("## <img> utan eller med svag alt-text", "");
if (!problems.length) out.push("Inga <img>-taggar saknar alt eller har för kort alt.");
else out.push("| Fil:rad | Alt | Fynd |", "|---|---|---|", ...problems.map((i) => `| ${i.file}:${i.line} | ${i.alt || "–"} | ${i.flag} |`));
out.push("", `Tomt alt (dekorbilder, ska vara tomt): ${decorative.length} st.`, "");
out.push("## Alla <img>-taggar", "", "| Fil:rad | Alt |", "|---|---|", ...imgs.map((i) => `| ${i.file}:${i.line} | ${i.alt || "–"} |`), "");
out.push("## Filstorlek", "");
const big = assets.filter((a) => a.size > 300 * 1024 && !/\.mp4$/.test(a.file));
out.push(`Bilder över 300 kB: ${big.length}. Av dem saknar ${big.filter((a) => !hasModern(a.file) && !/\.(webp|avif)$/i.test(a.file)).length} en WebP/AVIF-variant.`, "");
out.push("| Fil | Storlek | Har WebP/AVIF | Används i |", "|---|---|---|---|");
for (const a of [...big].sort((x, y) => y.size - x.size)) out.push(`| ${a.file} | ${kb(a.size)} | ${/\.(webp|avif)$/i.test(a.file) ? "är redan modern" : hasModern(a.file) ? "ja" : "NEJ"} | ${[...(usage.get(a.file) ?? [])].slice(0, 3).join(", ") || "används inte i koden"} |`);
out.push("", "## Ursprung per bildfil", "", "| Fil | Storlek | Används i | Ursprung |", "|---|---|---|---|");
const seenBase = new Set<string>();
for (const a of [...assets].sort((x, y) => x.file.localeCompare(y.file))) {
  const b = baseOf(a.file);
  if (seenBase.has(b)) continue;
  seenBase.add(b);
  out.push(`| ${b} | ${kb(a.size)} | ${[...(usage.get(a.file) ?? usage.get(b) ?? [])].slice(0, 2).join(", ") || "används inte"} | ${provenanceOf(a.file)} |`);
}
out.push("", "**Kräver bekräftelse från Vidar:** alla rader som börjar med Obekräftat eller OBEKRÄFTAT. Tills dess ska sidor inte påstå att bilden visar ett jobb vi har utfört (bildtexter som 'utfört i Roslagen').");
writeFileSync(resolve("../ledning/marknad/bildgranskning.md"), out.join("\n") + "\n");
console.log(`[image-audit] ${assets.length} filer, ${imgs.length} img, ${problems.length} alt-fynd, ${big.length} stora → ledning/marknad/bildgranskning.md`);
