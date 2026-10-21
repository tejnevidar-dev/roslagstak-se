/**
 * Ompekningen (10å, och gren 129): reglerna i public/_redirects träffar bara noindex-sidor som inte står i sajtkartan, varje regel pekar på en indexerbar sida
 * som finns, och ingen regel pekar på en adress som själv ompekas. Reglerna är dels splat-regler per tjänst (steg 1), dels exakta rader per adress (gren 129).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "@/data/locations";
import { allServiceSlugs, hasServiceCombos } from "@/data/service-slugs";
import { isThinCombo } from "@/data/thin-combos";
import { canonicalPath } from "@/lib/canonical";

const rot = resolve(__dirname, "../..");
const regler = readFileSync(resolve(rot, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => {
    const [kalla, mal, status] = r.split(/\s+/);
    return { kalla, mal, status };
  });
const splat = regler.filter((r) => r.kalla.endsWith("*"));
/** Tjänstesidor utan innehåll som ompekas med en exakt rad (gren 167, M1): källan svarar 404 i dag och står inte i sajtkartan. */
const TJANSTESIDOR_UTAN_INNEHALL = ["/tjanster/takbyte"];
const exaktaAlla = regler.filter((r) => !r.kalla.endsWith("*"));
const exakta = exaktaAlla.filter((r) => !TJANSTESIDOR_UTAN_INNEHALL.includes(r.kalla));
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const sitemapVagar = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

const prefixet = (kalla: string) => kalla.slice(0, -1);
/** /<tjänst>-<ort> -> [tjänst, ortens post] (längsta tjänsteslug som passar, resten ska vara en ort). */
const delaExakt = (kalla: string) => {
  for (const tjanst of [...allServiceSlugs].sort((a, b) => b.length - a.length)) {
    if (!kalla.startsWith(`/${tjanst}-`)) continue;
    const loc = locations.find((l) => l.slug === kalla.slice(tjanst.length + 2));
    if (loc) return { tjanst, loc };
  }
  return null;
};

describe("ompekningsreglerna", () => {
  it("är välformade: 301, absolut målsökväg, splat-regler med en splat sist, högst 2 000 regler", () => {
    expect(regler.length).toBeGreaterThan(0);
    expect(regler.length).toBeLessThanOrEqual(2000);
    for (const r of regler) {
      expect(r.status, r.kalla).toBe("301");
      expect(r.mal, r.kalla).toMatch(/^\/[a-z0-9/-]*$/);
    }
    for (const r of splat) expect(r.kalla, r.kalla).toMatch(/^\/[a-z0-9-]+-\*$/);
    for (const r of exakta) expect(r.kalla, r.kalla).toMatch(/^\/[a-z0-9-]+$/);
    for (const r of exaktaAlla.filter((x) => TJANSTESIDOR_UTAN_INNEHALL.includes(x.kalla))) expect(r.kalla, r.kalla).toMatch(/^\/tjanster\/[a-z0-9-]+$/);
  });

  it("varje splat-källa är en tunn tjänst × ort-sida (noindex) utanför sajtkartan, och minst 200 adresser träffas per regel", () => {
    for (const r of splat) {
      const tjanst = prefixet(r.kalla).slice(1, -1);
      expect(allServiceSlugs as readonly string[], tjanst).toContain(tjanst);
      const kallor = locations.filter((l) => hasServiceCombos(l.region)).map((l) => ({ l, path: `/${tjanst}-${l.slug}` }));
      expect(kallor.length, r.kalla).toBeGreaterThanOrEqual(200);
      const indexerbara = kallor.filter(({ l }) => !isThinCombo(tjanst, l)).map(({ path }) => path);
      expect(indexerbara, `${r.kalla}: indexerbara sidor som träffas`).toEqual([]);
    }
  });

  it("varje exakt källa är en tunn tjänst × ort-sida (noindex) för en ort på sajten, finns bara en gång och täcks inte redan av en splat-regel", () => {
    const sedda = new Set<string>();
    for (const r of exakta) {
      const d = delaExakt(r.kalla);
      expect(d, `${r.kalla}: ingen tjänst × ort`).not.toBeNull();
      expect(isThinCombo(d!.tjanst, d!.loc), `${r.kalla}: har egen text och får inte pekas om`).toBe(true);
      expect(sedda.has(r.kalla), `${r.kalla}: dubblett`).toBe(false);
      sedda.add(r.kalla);
      expect(splat.some((x) => r.kalla.startsWith(prefixet(x.kalla))), `${r.kalla}: täcks redan av en splat-regel`).toBe(false);
    }
  });

  it("tjänstesidor utan innehåll (gren 167): /tjanster/takbyte ompekas till /tjanster/takomlaggning med en exakt rad före splat-raderna", () => {
    const r = exaktaAlla.find((x) => x.kalla === "/tjanster/takbyte");
    expect(r).toEqual({ kalla: "/tjanster/takbyte", mal: "/tjanster/takomlaggning", status: "301" });
    expect(sitemapVagar).not.toContain("/tjanster/takbyte");
    expect(sitemapVagar).toContain("/tjanster/takomlaggning");
    const iFilen = regler.map((x) => x.kalla);
    expect(iFilen.indexOf("/tjanster/takbyte")).toBeLessThan(iFilen.findIndex((k) => k.endsWith("*")));
  });

  it("ingen sida i sajtkartan matchar en regel", () => {
    for (const r of splat) expect(sitemapVagar.filter((v) => v.startsWith(prefixet(r.kalla))), r.kalla).toEqual([]);
    for (const r of exaktaAlla) expect(sitemapVagar, r.kalla).not.toContain(r.kalla);
  });

  it("varje mål är en indexerbar sida i sajtkartan, är sin egen canonical och ompekas inte själv", () => {
    for (const r of regler) {
      expect(sitemapVagar, r.mal).toContain(r.mal);
      expect(canonicalPath(r.mal), r.mal).toBe(r.mal);
      expect(splat.some((x) => r.mal.startsWith(prefixet(x.kalla))), `${r.kalla} -> ${r.mal} är en kedja`).toBe(false);
      expect(exaktaAlla.some((x) => x.kalla === r.mal), `${r.kalla} -> ${r.mal} är en kedja`).toBe(false);
    }
  });
});
