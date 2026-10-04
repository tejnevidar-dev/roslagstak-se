/**
 * Prissökord per material (Marknadschefen 2026-10-04, sokordsagare-2026-10-04.md): vilka sidor i bygget har "pris",
 * "kostnad" eller "kostar" tillsammans med ett material i titel, H1–H3 eller brödtext. Läser dist/ efter bygget.
 * Kör: bun scripts/prissokord-analys.ts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const MATERIAL: Record<string, RegExp> = {
  tegeltak: /tegeltak|lertegel|tegelpann/i,
  betongpannor: /betongpann/i,
  plåttak: /plåttak|tp20|pannplåt/i,
};
const PRIS = /\b(pris|priset|priser|kostnad|kostnaden|kostnader|kostar)\b/i;
const strip = (s: string) => s.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
const text = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "assets" || f === "admin" ? [] : walk(p)) : p.endsWith(".html") ? [p] : [];
  });

type Row = { path: string; title: boolean; rubrik: boolean; brod: boolean };
const res: Record<string, Row[]> = { tegeltak: [], betongpannor: [], plåttak: [] };
for (const f of walk("dist")) {
  const html = strip(readFileSync(f, "utf8"));
  const path = "/" + f.split(sep).slice(1).join("/").replace(/\.html$/, "").replace(/\/index$/, "");
  if (path.startsWith("/404") || path === "/index") continue;
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const heads = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((m) => text(m[1]));
  const body = text(html);
  for (const [m, re] of Object.entries(MATERIAL)) {
    const t = re.test(title) && PRIS.test(title);
    const h = heads.some((x) => re.test(x) && PRIS.test(x));
    const b = [...body.matchAll(/[^.!?]*[.!?]/g)].some((s) => re.test(s[0]) && PRIS.test(s[0]));
    if (t || h || b) res[m].push({ path, title: t, rubrik: h, brod: b });
  }
}
const typ = (p: string) =>
  /^\/(takbyte|takomlaggning|takrenovering|plattak|tegeltak|betongpannor|taktvatt|takkupor)-/.test(p)
    ? "tjänst × ort"
    : p.startsWith("/taklaggare-")
      ? "ortssida"
      : p.startsWith("/blogg/")
        ? "blogg"
        : p.startsWith("/tjanster/")
          ? "tjänst"
          : p.startsWith("/material/")
            ? "material"
            : p.startsWith("/takproblem/")
              ? "problem"
              : "övrigt";
for (const [m, rows] of Object.entries(res)) {
  console.log(`\n== ${m}: ${rows.length} sidor (titel ${rows.filter((r) => r.title).length}, H1–H3 ${rows.filter((r) => r.rubrik).length}, brödtext ${rows.filter((r) => r.brod).length})`);
  const by = new Map<string, number>();
  for (const r of rows) by.set(typ(r.path), (by.get(typ(r.path)) ?? 0) + 1);
  console.log([...by.entries()].map(([k, v]) => `${k}: ${v}`).join(", "));
  for (const r of rows.filter((r) => r.title || r.rubrik).slice(0, 40)) console.log(`  ${r.path}${r.title ? " [titel]" : ""}${r.rubrik ? " [rubrik]" : ""}`);
}
