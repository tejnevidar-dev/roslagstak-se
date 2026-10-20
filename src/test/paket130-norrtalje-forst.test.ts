/**
 * Paket 130 (Vidars ja till "Norrtälje först" 2026-10-20, Marknadschefens ord): paket 72 (den starkare /taklaggare-norrtalje) plus raden under rubriken bara för Norrtälje (B1 ordagrant),
 * med Marknadschefens tre rättningar (K2 och "kan" i stället för "ofta"). Variant C på övriga ortssidor ingår inte.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { radUnderRubrik } from "../data/location-rad";
import { ortPrep } from "../data/ort-prep";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = (s: string) => locations.find((l) => l.slug === s)!;
const RAD = "Takläggare i Norrtälje: takfirma med bas i Norrtälje. Takbyte, takomläggning och takrenovering. Kostnadsfri takkontroll och fast pris i offerten.";

describe("paket 130: raden under rubriken bara för Norrtälje", () => {
  it("Norrtälje har B1 ordagrant (utan 'här'), alla andra ortssidor behåller sin rad", () => {
    const n = loc("norrtalje");
    expect(radUnderRubrik(n, ortPrep(n), false)).toBe(RAD);
    for (const l of locations) {
      if (l.slug === "norrtalje") continue;
      expect(radUnderRubrik(l, ortPrep(l), false), l.slug).toBe(l.description);
    }
  });
  it("serverns HTML har raden som ingress på Norrtälje och oförändrad ingress på t.ex. Täby och Hallstavik", () => {
    expect(prerenderContent("/taklaggare-norrtalje")!.intro).toBe(RAD);
    for (const s of ["taby", "hallstavik", "rimbo", "blido"]) expect(prerenderContent(`/taklaggare-${s}`)!.intro, s).toBe(loc(s).description);
  });
  it("metabeskrivningen är orörd", () => {
    expect(loc("norrtalje").description).not.toContain("takfirma med bas i Norrtälje. Takbyte, takomläggning");
  });
});

describe("paket 130: Marknadschefens tre rättningar i Norrtälje-texten", () => {
  const alla = () => JSON.stringify(loc("norrtalje").extraSections);
  it("'kan' i stället för 'ofta' på två ställen och K2-lydelsen", () => {
    expect(alla()).toContain("De kan ha byggts om och till, och då kan det finnas takdelar av olika ålder på samma hus.");
    expect(alla()).toContain("På en gård kan det finnas fler tak än bostadshusets, till exempel uthus och bodar.");
    expect(alla()).toContain("och därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });
  it("inget 'ofta' och ingen 'ses över ibland' kvar i Norrtälje-avsnitten, och de gamla lydelserna är borta", () => {
    expect(alla()).not.toMatch(/\bofta\b/);
    expect(alla()).not.toContain("ses över ibland");
    expect(alla()).not.toContain("börjar vi med att titta på taket på plats");
  });
  it("serverns HTML har samma lydelser", () => {
    const c = prerenderContent("/taklaggare-norrtalje")!;
    const t = [c.intro, ...c.paragraphs].join(" ");
    expect(t).toContain("De kan ha byggts om och till, och då kan det finnas takdelar av olika ålder på samma hus.");
    expect(t).toContain("där en av våra säljare tittar på taket på plats.");
    expect(t).not.toContain("ses över ibland");
  });
});
