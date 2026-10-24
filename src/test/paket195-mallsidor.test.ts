/**
 * Gren 195 och 195b (Vidars ja 2026-10-22 07:47): tunna mallsidor utan egen text pekas om till /taklaggare-<ort>: takmålning och bandtäckning med platshållarregler (/<tjänst>-* /taklaggare-:splat), taktvätt utan egen text
 * med exakta rader, och ett undantag för ortssidor som är avindexerade. Sidor med egen text berörs inte. Länken "Takmålning i <ort>" är borttagen från ortssidorna (lankar-sajtkarta.test.ts: 0 länkar till /takmalning-*).
 * Provet löser upp varje adress som Cloudflare Pages gör: första träffen gäller, en platshållarregel träffar adresser som börjar på prefixet.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { hasServiceCombos } from "../data/service-slugs";
import { isThinCombo } from "../data/thin-combos";
import { ortAvindexerad } from "../data/avindexerade-orter";
import { arOmpekad } from "../data/ompekade";

const rot = resolve(__dirname, "../..");
const regler = readFileSync(resolve(rot, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => r.split(/\s+/) as [string, string, string]);
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const sitemapVagar = new Set([...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));

/** Cloudflare Pages: första träffen gäller; en regel med * i slutet träffar allt efter prefixet, och :splat är det som * matchade. */
const losUpp = (path: string): { mal: string; status: string } | null => {
  for (const [kalla, mal, status] of regler) {
    if (kalla.endsWith("*")) {
      const prefix = kalla.slice(0, -1);
      if (path.startsWith(prefix)) return { mal: mal.replace(":splat", path.slice(prefix.length)), status };
    } else if (kalla === path) return { mal, status };
  }
  return null;
};
const orter = locations.filter((l) => hasServiceCombos(l.region));
const TJANSTER = ["takmalning", "taktvatt", "bandtackning"];

describe("gren 195: tunna mallsidor till ortssidan", () => {
  for (const s of TJANSTER) {
    it(`${s}: varje tunn sida pekas om med 301 till en indexerbar ortssida, och sidor med egen text berörs inte`, () => {
      let omp = 0;
      let egen = 0;
      for (const l of orter) {
        const p = `/${s}-${l.slug}`;
        const r = losUpp(p);
        if (!isThinCombo(s, l)) {
          egen++;
          expect(r, `${p}: har egen text och får inte pekas om`).toBeNull();
          continue;
        }
        omp++;
        expect(r, p).not.toBeNull();
        expect(r!.status, p).toBe("301");
        expect(sitemapVagar.has(r!.mal), `${p} -> ${r!.mal}`).toBe(true);
        // en avindexerad ortssida är aldrig mål
        if (ortAvindexerad(l.slug)) expect(r!.mal, p).not.toBe(`/taklaggare-${l.slug}`);
        else if (!regler.some(([k, m]) => k === p && !m.startsWith("/taklaggare-"))) expect(r!.mal, p).toBe(s === "bandtackning" && regler.some(([k]) => k === p) ? r!.mal : `/taklaggare-${l.slug}`);
      }
      expect(omp).toBeGreaterThan(150);
      console.info(`195 ${s}: ${omp} tunna sidor pekas om, ${egen} har egen text och berörs inte`);
    });
  }
  it("ingen rad pekar på en taktvättssida som har egen text, och ingen mallsida är kvar utan 301 (603 adresser)", () => {
    let kontrollerade = 0;
    for (const [kalla, mal] of regler) {
      const m = mal.match(/^\/taktvatt-([a-z0-9-]+)$/);
      if (m) expect(isThinCombo("taktvatt", locations.find((l) => l.slug === m[1])!), `${kalla} -> ${mal}`).toBe(true);
    }
    for (const s of TJANSTER) for (const l of orter) if (isThinCombo(s, l)) kontrollerade++;
    expect(kontrollerade).toBeGreaterThan(600);
  });
  it("antal regler: högst 2 000 statiska och högst 100 dynamiska, och platshållarreglerna står sist", () => {
    const dyn = regler.filter(([k]) => k.endsWith("*"));
    expect(regler.length - dyn.length).toBeLessThan(2000);
    expect(dyn.length).toBeLessThan(100);
    const forstaDyn = regler.findIndex(([k]) => k.endsWith("*"));
    expect(regler.slice(forstaDyn).every(([k]) => k.endsWith("*"))).toBe(true);
    // P0-3: jokerreglerna för takmålning och bandtäckning är borta (de gav 301 → 404 för namn som inte är orter) och ersatta av exakta rader per ort
    for (const p of ["/takmalning-*", "/bandtackning-*"]) expect(regler.some(([k]) => k === p), p).toBe(false);
    for (const l of orter.filter((x) => x.slug !== "finnhamn")) for (const sv of ["takmalning", "bandtackning"]) expect(regler.some(([k]) => k === `/${sv}-${l.slug}`), `/${sv}-${l.slug}`).toBe(true);
  });
  it("195b: takmålningssidorna räknas som ompekade, så ingen intern länk går dit", () => {
    for (const l of orter) expect(arOmpekad(`/takmalning-${l.slug}`), l.slug).toBe(true);
    expect(arOmpekad("/takmalning-taby")).toBe(true);
    expect(arOmpekad("/takbyte-taby")).toBe(false);
  });
});
