/**
 * Paket 115: ortssidorna 61–80 enligt Innehålls passrapport 172 (innehall/ortssidor-61-80-lasning-2026-10-15.md): O3 på Bollstanäs och Vallabrink, O8 på Ensta.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => JSON.stringify(locations.find((x) => x.slug === slug));
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("paket 115: ortssidorna 61–80", () => {
  it("O3: K2-lydelsen på Bollstanäs och Vallabrink", () => {
    for (const slug of ["bollstanas", "vallabrink"]) {
      expect(ort(slug), slug).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
      expect(ort(slug), slug).not.toContain("börjar vi med att titta på taket på plats");
    }
    expect(ort("vallabrink")).toContain("ändå ha ett slitet underlag. Därför börjar vi med en takkontroll");
  });
  it("O8: 'det som kan behöva ses över' på Ensta", () => {
    expect(ort("ensta")).toContain("hängrännor det som kan behöva ses över.");
    expect(ort("ensta")).not.toContain("hängrännor ofta det som behöver ses över");
  });
  it("serverns HTML har samma text", () => {
    expect(sida("bollstanas")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
    expect(sida("ensta")).toContain("det som kan behöva ses över.");
  });
});
