/**
 * Inlänkar till nya sidor (backlog 1cn punkt b): hur många indexerade sidor (de som står i sitemap.xml) länkar till
 * varje given adress i den byggda HTML:en. Kräver minst tre. Kör efter bun run build:local.
 * Kör: bun scripts/inlankar-nya-sidor.ts /taklaggare-rosersberg /taklaggare-varberg …
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const mal = process.argv.slice(2);
if (!mal.length) {
  console.error("Ange adresser, t.ex. /taklaggare-musko");
  process.exit(2);
}
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const indexerade = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://roslagstak.se", "") || "/"));
const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "assets" || f === "admin" ? [] : walk(p)) : p.endsWith(".html") ? [p] : [];
  });
const inl = new Map<string, Set<string>>(mal.map((m) => [m, new Set()]));
for (const f of walk("dist")) {
  const path = "/" + f.split(sep).slice(1).join("/").replace(/\.html$/, "");
  const sida = path === "/index" ? "/" : path;
  if (!indexerade.has(sida)) continue;
  const h = readFileSync(f, "utf8");
  for (const m of h.matchAll(/href="([^"#?]+)/g)) {
    const t = m[1].replace(/\/$/, "") || "/";
    if (inl.has(t) && t !== sida) inl.get(t)!.add(sida);
  }
}
let under = 0;
for (const [m, s] of inl) {
  const ok = s.size >= 3;
  if (!ok) under++;
  console.log(`${ok ? "OK " : "FÅ "} ${m}: ${s.size} indexerade inlänkande sidor${s.size ? " (t.ex. " + [...s].slice(0, 4).join(", ") + ")" : ""}`);
}
console.log(under ? `\n${under} adresser har färre än tre.` : "\nAlla har minst tre.");
