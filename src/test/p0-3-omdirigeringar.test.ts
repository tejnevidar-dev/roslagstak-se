/**
 * P0-3 (seo-audit/06-atgardslista.md): felriktade omdirigeringar rättas till ortssidan.
 *  1. Ingen exakt rad /<tjänst>-<ort> för en ort med indexerbar ortssida pekar på en tjänste-, material-, pris- eller regionsida.
 *  2. Jokerreglerna /takmalning-* och /bandtackning-* (301 → 404 för namn som inte är orter) är borta och ersatta av exakta rader per ort.
 *  3. De fem aliasen är riktiga 301 och skrivs inte längre som HTML-filer med meta refresh (scripts/generate-static-heads.mjs).
 * Gren 230 (Vidars ja 2026-10-24 16:57): alternativ a i seo-audit/11c är valt för materialadresserna: de adresser som /tegeltak-*, /betongpannor-* och /platttak-* träffade för orter med ortssida har fått exakta rader till ortssidan, och de tre jokerreglerna står kvar som reserv.
 * Belägg per rad: ledning/marknad/seo-analys-2026-10-21/belagg/p0-3-rader.md.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { ortAvindexerad } from "../data/avindexerade-orter";
import { CANONICAL_ALIASES } from "../lib/canonical";

const rot = resolve(__dirname, "../..");
const regler = readFileSync(resolve(rot, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => { const [kalla, mal] = r.split(/\s+/); return { kalla, mal }; });
const sitemap = new Set([...readFileSync(resolve(rot, "public/sitemap.xml"), "utf8").matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1]));
const SV = ["takbyte", "takrenovering", "takomlaggning", "bandtackning", "platttak", "betongpannor", "tegeltak", "takmalning", "taktvatt"];
const orter = new Map(locations.map((l) => [l.slug, l]));
const indexerbar = (s: string) => sitemap.has("/taklaggare-" + s) && !ortAvindexerad(s);
const heads = readFileSync(resolve(rot, "scripts/generate-static-heads.mjs"), "utf8");

describe("P0-3: omdirigeringar", () => {
  it("ingen exakt rad /<tjänst>-<ort> pekar på en generell sida när ortens egen sida är indexerbar", () => {
    const fel: string[] = [];
    for (const r of regler) {
      if (r.kalla.includes("*")) continue;
      const m = r.kalla.match(/^\/([a-z]+)-([a-z0-9-]+)$/);
      if (!m || !SV.includes(m[1]) || !orter.has(m[2]) || !indexerbar(m[2])) continue;
      if (/^\/(tjanster|material|priser|omraden)(\/|$)/.test(r.mal)) fel.push(`${r.kalla} → ${r.mal}`);
    }
    expect(fel).toEqual([]);
  });
  it("de rättade raderna pekar på ortens egen sida (76 rader enligt beräkningen på 1528c4c ingår)", () => {
    const tillOrtssida = regler.filter((r) => { const m = r.kalla.match(/^\/([a-z]+)-([a-z0-9-]+)$/); return m && SV.includes(m[1]) && orter.has(m[2]) && r.mal === `/taklaggare-${m[2]}`; });
    expect(tillOrtssida.length).toBeGreaterThan(1400);
  });
  it("jokerreglerna för takmålning och bandtäckning är borta, och varje ort har en exakt rad eller en egen sida för båda", () => {
    expect(regler.some((r) => r.kalla === "/takmalning-*")).toBe(false);
    expect(regler.some((r) => r.kalla === "/bandtackning-*")).toBe(false);
    for (const [slug] of orter) for (const sv of ["takmalning", "bandtackning"]) {
      const u = `/${sv}-${slug}`;
      expect(regler.some((r) => r.kalla === u) || sitemap.has(u), u).toBe(true);
    }
  });
  it("varje ort med indexerbar ortssida har en exakt rad till den för plåttak, betongpannor och tegeltak (eller en egen indexerbar sida)", () => {
    for (const [slug] of orter) {
      if (!indexerbar(slug)) continue;
      for (const sv of ["platttak", "betongpannor", "tegeltak"]) {
        const u = `/${sv}-${slug}`;
        const rad = regler.find((r) => r.kalla === u);
        expect(rad !== undefined || sitemap.has(u), u).toBe(true);
        if (rad) expect(rad.mal, u).toMatch(/^\/(taklaggare-|takrenovering-)/);
      }
    }
  });
  it("inga mål av takmålnings- och bandtäckningsraderna är en annan sida än ortens egen sida, utom där ortens sida är avindexerad (Finnhamn)", () => {
    for (const r of regler) {
      const m = r.kalla.match(/^\/(takmalning|bandtackning)-([a-z0-9-]+)$/);
      if (!m || !orter.has(m[2])) continue;
      if (!indexerbar(m[2])) continue;
      expect(r.mal, r.kalla).toMatch(/^\/(taklaggare-|takrenovering-)/);
    }
  });
  it("de tre materialjokerreglerna står kvar som reserv för adresser som inte är orter (gren 230, alternativ a i 11c)", () => {
    for (const p of ["/tegeltak-*", "/betongpannor-*", "/platttak-*"]) expect(regler.some((r) => r.kalla === p), p).toBe(true);
  });
  it("de fem aliasen är riktiga 301 och skrivs inte längre som meta refresh-filer", () => {
    expect(Object.keys(CANONICAL_ALIASES).sort()).toEqual(["/boka", "/konsultation", "/radgivning", "/taktvatt", "/tjanster/takvard"]);
    for (const [alias, mal] of Object.entries(CANONICAL_ALIASES)) expect(regler.filter((r) => r.kalla === alias && r.mal === mal), alias).toHaveLength(1);
    expect(heads).not.toContain('http-equiv="refresh"');
    expect(heads).not.toContain("aliasEntries");
  });
  it("antal regler: statiska under 2 000, dynamiska under 100", () => {
    const dyn = regler.filter((r) => r.kalla.includes("*"));
    expect(regler.length - dyn.length).toBeLessThan(2000);
    expect(dyn.length).toBeLessThan(100);
  });
});
