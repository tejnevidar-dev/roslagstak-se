/**
 * Paket 119: serverns HTML för regionsidorna har rubriken "Orter i <region>" före ortslänkarna, som RegionPage.tsx redan visar (M3 punkt 25 efter gren 102).
 */
import { describe, expect, it } from "vitest";
import { regionSlugs } from "../data/regions";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 119: 'Orter i <region>' i serverns HTML", () => {
  it("varje regionssida har h2 'Orter i <region>' och ortslänkarna", () => {
    for (const [region, slug] of Object.entries(regionSlugs)) {
      const c = prerenderContent(`/omraden/${slug}`);
      expect(c, slug).toBeTruthy();
      expect(JSON.stringify(c), slug).toContain(`Orter i ${region}`);
      expect(c!.links.some((l) => l.href.startsWith("/taklaggare-")), slug).toBe(true);
    }
  });
  it("kusten och västerort, de två sidorna M3 kontrollerar", () => {
    for (const [region, slug] of [["Kusten", "kusten"], ["Västerort", "vasterort"]]) {
      expect(JSON.stringify(prerenderContent(`/omraden/${slug}`))).toContain(`Orter i ${region}`);
    }
  });
});
