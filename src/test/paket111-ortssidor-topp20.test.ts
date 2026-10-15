/**
 * Paket 111: ortssidorna topp 20 enligt Innehålls passrapport 167 (innehall/ortssidor-topp20-lasning-2026-10-15.md): O1–O5 och M3.
 * M1 (ö-mallen), M2 (bostadsrättsföreningar), M4 och M5 är orörda (Vidar).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => {
  const l = locations.find((x) => x.slug === slug);
  expect(l, slug).toBeTruthy();
  return JSON.stringify(l);
};
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("paket 111: den ortsegna texten (O1–O5)", () => {
  it("O1 Vallentuna, O2 Danderyd, O4 Söderöra, O5 Rimbo: nya meningar står, gamla är borta", () => {
    expect(ort("vallentuna")).toContain("Den som söker takläggare i Vallentuna kan ha ett hus i tätorten längs Roslagsbanan, i en mindre ort eller på en gård på landsbygden.");
    expect(ort("vallentuna")).not.toContain("har oftast ett hus i tätorten");
    expect(ort("danderyd")).toContain("Den här sidan handlar därför om villor.");
    expect(ort("danderyd")).not.toContain("har därför nästan alltid en villa");
    expect(ort("sodorora")).toContain("Ett fritidshus kan ha byggts till i efterhand,");
    expect(ort("sodorora")).not.toContain("Många fritidshus har byggts till i efterhand");
    expect(ort("rimbo")).toContain("beror bland annat på underlaget under ytskiktet.");
    expect(ort("rimbo")).not.toContain("beror på underlaget under ytskiktet.");
  });
  it("O3 Uppsala, Västerås och Tullinge: K2-lydelsen, och bara där", () => {
    for (const slug of ["uppsala", "vasteras", "tullinge"]) {
      expect(ort(slug), slug).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
      expect(ort(slug), slug).not.toContain("Därför börjar vi med att titta på taket på plats.");
    }
    const ovriga = locations.filter((l) => !["uppsala", "vasteras", "tullinge"].includes(l.slug) && JSON.stringify(l).includes("Därför börjar vi med att titta på taket på plats."));
    expect(ovriga.length).toBeGreaterThan(0); // andra sidor med samma mening är inte med i Innehålls lista
  });
  it("serverns HTML har samma text", () => {
    expect(sida("danderyd")).toContain("Den här sidan handlar därför om villor.");
    expect(sida("uppsala")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });
});

describe("paket 111: mallens fråga 'Behöver jag byta hela taket …?' (M3)", () => {
  it("svaret har inte 'framför allt underlaget' och säger 'går vi igenom', på alla ortssidor", () => {
    const k = readFileSync("src/data/location-faqs.ts", "utf8");
    expect(k).toContain("Det beror på takets skick. Vid den kostnadsfria takkontrollen ${prep} ${name} går vi igenom om en reparation räcker eller om taket behöver läggas om.");
    expect(k).not.toContain("framför allt underlaget");
    for (const slug of ["taby", "svartloga", "uppsala", "danderyd"]) {
      const t = sida(slug);
      expect(t, slug).toContain("går vi igenom om en reparation räcker eller om taket behöver läggas om");
      expect(t, slug).not.toContain("framför allt underlaget");
    }
  });
});

describe("paket 111: orört (Vidar)", () => {
  it("M2: 'för både villaägare och bostadsrättsföreningar' står kvar på orter långt från basen", () => {
    expect(readFileSync("src/data/location-sections.ts", "utf8")).toContain("bostadsrättsföreningar");
  });
  it("M1: ö-mallens takkontrollrad står kvar på Svartlöga", () => {
    expect(sida("svartloga")).toContain("kostnadsfri takkontroll");
  });
});
