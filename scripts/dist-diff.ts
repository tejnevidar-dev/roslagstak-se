/**
 * Jämför två build-kataloger sida för sida (lokalt verktyg). Används för att bevisa att en ändring i bygget inte
 * ändrar sajten (t.ex. tomma överstyrningar = samma sajt) eller att den bara ändrar de sidor man avsett.
 * Filnamnshashar i /assets/ normaliseras bort, JS/CSS-innehåll jämförs inte (det har andra hashar när koden ändras).
 *
 * Kör: bun scripts/dist-diff.ts <före-katalog> <efter-katalog>
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const [a, b] = process.argv.slice(2).map((p) => resolve(p));
if (!a || !b) {
  console.error("Användning: bun scripts/dist-diff.ts <före> <efter>");
  process.exit(2);
}
const walk = (dir: string, base = dir, out: string[] = []) => {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      if (e === "assets") continue;
      walk(full, base, out);
    } else out.push(full.slice(base.length + 1).replace(/\\/g, "/"));
  }
  return out;
};
const norm = (s: string) => s.replace(/\/assets\/([A-Za-z0-9_.-]+?)-[A-Za-z0-9_-]{8}\.([a-z0-9]+)/g, "/assets/$1.$2");
const fa = new Set(walk(a));
const fb = new Set(walk(b));
const onlyA = [...fa].filter((f) => !fb.has(f));
const onlyB = [...fb].filter((f) => !fa.has(f));
const changed: string[] = [];
let same = 0;
for (const f of fa) {
  if (!fb.has(f)) continue;
  const x = readFileSync(join(a, f));
  const y = readFileSync(join(b, f));
  const text = /\.(html|xml|txt|json|webmanifest|svg)$/.test(f);
  const equal = text ? norm(x.toString("utf8")) === norm(y.toString("utf8")) : x.equals(y);
  if (equal) same++;
  else changed.push(f);
}
console.log(`filer före: ${fa.size}, efter: ${fb.size}, identiska: ${same}, ändrade: ${changed.length}, bara före: ${onlyA.length}, bara efter: ${onlyB.length}`);
for (const f of changed.slice(0, 40)) console.log("  ändrad:", f);
for (const f of onlyA.slice(0, 20)) console.log("  bara före:", f);
for (const f of onlyB.slice(0, 20)) console.log("  bara efter:", f);
process.exit(changed.length || onlyA.length || onlyB.length ? 1 : 0);
