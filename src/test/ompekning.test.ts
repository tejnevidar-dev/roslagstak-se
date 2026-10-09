/**
 * Ompekningen (10å): reglerna i public/_redirects träffar bara noindex-sidor som inte står i sajtkartan, varje regel pekar på en indexerbar sida
 * som finns, och ingen regel pekar på en adress som själv ompekas.
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
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const sitemapVagar = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

const prefixet = (kalla: string) => kalla.slice(0, -1);

describe("ompekningsreglerna", () => {
  it("är välformade: en splat sist, 301, absolut målsökväg, högst 2 000 regler", () => {
    expect(regler.length).toBeGreaterThan(0);
    expect(regler.length).toBeLessThanOrEqual(2000);
    for (const r of regler) {
      expect(r.kalla, r.kalla).toMatch(/^\/[a-z0-9-]+-\*$/);
      expect(r.status, r.kalla).toBe("301");
      expect(r.mal, r.kalla).toMatch(/^\/[a-z0-9/-]+$/);
    }
  });

  it("varje källa är en tunn tjänst × ort-sida (noindex) utanför sajtkartan, och minst 200 adresser träffas per regel", () => {
    for (const r of regler) {
      const tjanst = prefixet(r.kalla).slice(1, -1);
      expect(allServiceSlugs as readonly string[], tjanst).toContain(tjanst);
      const kallor = locations.filter((l) => hasServiceCombos(l.region)).map((l) => ({ l, path: `/${tjanst}-${l.slug}` }));
      expect(kallor.length, r.kalla).toBeGreaterThanOrEqual(200);
      const indexerbara = kallor.filter(({ l }) => !isThinCombo(tjanst, l)).map(({ path }) => path);
      expect(indexerbara, `${r.kalla}: indexerbara sidor som träffas`).toEqual([]);
    }
  });

  it("ingen sida i sajtkartan matchar en regel", () => {
    for (const r of regler) expect(sitemapVagar.filter((v) => v.startsWith(prefixet(r.kalla))), r.kalla).toEqual([]);
  });

  it("varje mål är en indexerbar sida i sajtkartan, är sin egen canonical och ompekas inte själv", () => {
    for (const r of regler) {
      expect(sitemapVagar, r.mal).toContain(r.mal);
      expect(canonicalPath(r.mal), r.mal).toBe(r.mal);
      expect(regler.some((x) => r.mal.startsWith(prefixet(x.kalla))), `${r.kalla} -> ${r.mal} är en kedja`).toBe(false);
    }
  });
});
