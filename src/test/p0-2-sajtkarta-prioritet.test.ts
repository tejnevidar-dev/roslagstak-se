/**
 * P0-2 (seo-audit/06): sajtkartan börjar med de 32 prioriterade sidorna. Provet kontrollerar listan mot den spårade sajtkartan (alla sidor finns, inga dubbletter, ingen alias- eller noindex-sida),
 * att ordningsfunktionen lägger dem först och behåller resten, och att generatorn använder den.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SITEMAP_PRIORITET, ordnaEfterPrioritet } from "../data/sitemap-prioritet";
import { canonicalPath, isNoindexPath } from "../lib/canonical";

const rot = resolve(__dirname, "../..");
const sida = (u: string) => (u.replace("https://roslagstak.se", "") || "/");
const poster = [...readFileSync(resolve(rot, "public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => ({ path: sida(m[1]) }));

describe("P0-2: sajtkarta med de prioriterade sidorna först", () => {
  it("32 sidor, inga dubbletter", () => {
    expect(SITEMAP_PRIORITET).toHaveLength(32);
    expect(new Set(SITEMAP_PRIORITET).size).toBe(32);
  });
  it("alla finns i sajtkartan, är kanoniska och indexerbara", () => {
    const finns = new Set(poster.map((p) => p.path));
    for (const p of SITEMAP_PRIORITET) {
      expect(finns.has(p), `${p} saknas i sajtkartan`).toBe(true);
      expect(canonicalPath(p), p).toBe(p);
      expect(isNoindexPath(p), p).toBe(false);
    }
  });
  it("ordningsfunktionen lägger dem först i listans ordning och behåller övriga sidor oförändrade i sin ordning", () => {
    const ut = ordnaEfterPrioritet([...poster].reverse());
    expect(ut.slice(0, 32).map((p) => p.path)).toEqual([...SITEMAP_PRIORITET]);
    expect(ut).toHaveLength(poster.length);
    const ovriga = [...poster].reverse().filter((p) => !SITEMAP_PRIORITET.includes(p.path)).map((p) => p.path);
    expect(ut.slice(32).map((p) => p.path)).toEqual(ovriga);
  });
  it("sidor som saknas bland posterna hoppas över utan fel", () => {
    expect(ordnaEfterPrioritet([{ path: "/a" }, { path: "/offert" }]).map((p) => p.path)).toEqual(["/offert", "/a"]);
  });
  it("startsidan länkar till alla 32 prioriterade sidor, i serverns HTML och (sidfoten) i React-sidans källa", async () => {
    const { prerenderContent } = await import("../../scripts/prerender-content");
    const hrefs = new Set(prerenderContent("/")!.links.map((l) => l.href.replace(/\/$/, "") || "/"));
    for (const p of SITEMAP_PRIORITET) expect(hrefs.has(p), `startsidan länkar inte till ${p}`).toBe(true);
    const footer = readFileSync(resolve(rot, "src/components/Footer.tsx"), "utf8");
    expect(footer).toContain('to: "/takrenovering-stockholm"');
  }, 60000);
  it("generatorn skriver sajtkartan i den ordningen", () => {
    const kalla = readFileSync(resolve(rot, "scripts/generate-sitemap.ts"), "utf8");
    expect(kalla).toContain("generateSitemap(ordnaEfterPrioritet(entries))");
  });
});
