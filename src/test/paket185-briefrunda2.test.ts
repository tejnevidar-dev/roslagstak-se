/**
 * Gren 185 (briefrunda 2, Marknadschefens grindsvar 285–287): 13 ortssidor som hade mallens text får egna ortstexter (innehall/utkast/briefrunda2-2026-10-22/), importerade med
 * import-omrade.ts och med briefens länkar tillbakalagda (gren-lankar-tillbaka.mjs). Faktarutornas interna anteckningar ("RegSO, alla.csv, ej kontrollerat live") står inte på sidorna.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { ortSeoOverrides } from "../data/seo-overrides";
import { EGNA_FAQ } from "../data/location-egna-faq";
import { prerenderContent } from "../../scripts/prerender-content";

const SIDOR = ["nykvarn", "brandbergen", "handen", "fisksatra", "fittja", "hogdalen", "vallingby", "akalla", "tensta", "hokarangen", "norsborg", "blackeberg", "liljeholmen"];
const ort = (s: string) => locations.find((l) => l.slug === s)!;

describe("gren 185: briefrunda 2", () => {
  for (const s of SIDOR) {
    it(`/taklaggare-${s}: egen text med länkar i datan och i serverns HTML, titel och meta, inga interna anteckningar, tre egna FAQ-svar`, () => {
      const j = JSON.stringify(ort(s));
      expect(ort(s).longDescription.length, s).toBeGreaterThan(300);
      expect(j, s).toMatch(/\]\(\/(taklaggare|takbyte|omraden)/);
      expect(j, s).not.toMatch(/\.csv\b|RegSO|ej kontrollerat live/);
      expect(j, s).not.toMatch(/\boftast\b|\b(har|finns det|används) ofta\b/);
      expect(ortSeoOverrides[s]?.title, s).toBeTruthy();
      expect(EGNA_FAQ[s]?.length, s).toBe(3);
      const html = JSON.stringify(prerenderContent(`/taklaggare-${s}`)!.links);
      expect(html, s).toMatch(/"href":"\/(taklaggare|takbyte)-/);
    });
  }
});
