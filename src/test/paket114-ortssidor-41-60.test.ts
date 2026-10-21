/**
 * Paket 114: ortssidorna 41–60 enligt Innehålls passrapport 170 (innehall/ortssidor-41-60-lasning-2026-10-15.md): alla 13 fynd och M9
 * (mallens referensmening av på Singö och i Grisslehamn, där briefen själv beskriver jobbet). Briefens projektfakta står kvar.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { referensMening } from "../data/location-referens";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => {
  const l = locations.find((x) => x.slug === slug);
  expect(l, slug).toBeTruthy();
  return JSON.stringify(l);
};
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("paket 114: den ortsegna texten", () => {
  it("R1: varje anslutning ska vara tät (Grisslehamn, Arholma, Gräddö)", () => {
    for (const slug of ["grisslehamn", "arholma", "graddo"]) {
      expect(ort(slug), slug).not.toContain("plåtarbetet avgör hur tätt taket blir");
      expect(ort(slug), slug).toContain("ska vara tät.");
    }
  });
  it("U1: Kapellskär utan 'det går bara att se på plats'", () => {
    expect(ort("kapellskar")).not.toContain("det går bara att se på plats");
  });
  it("O3: K2-lydelsen på Älmsta, Edsbro, Viby och Brevik", () => {
    for (const slug of ["almsta", "edsbro", "viby", "brevik"]) {
      expect(ort(slug), slug).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
      expect(ort(slug), slug).not.toContain("Därför börjar vi med att titta på taket på plats.");
    }
  });
  it("J1: Älmsta nämner inte jobbet i sin egen text", () => {
    expect(ort("almsta")).not.toContain("Ett komplett takbyte i närheten finns att se under projekt");
  });
  it("O8: 'det som kan behöva ses över' på Ormsta, Långbro, Sköndal och Herrängen", () => {
    for (const slug of ["ormsta", "langbro", "skondal", "herrangen"]) {
      // gren 182: meningen är bytt mot underlagsformen och K2 (ofta-rattning-2026-10-22.md)
      expect(ort(slug), slug).not.toContain("hängrännor det som kan behöva ses över.");
      expect(ort(slug), slug).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
      expect(ort(slug), slug).not.toContain("hängrännor ofta det som behöver ses över.");
    }
  });
  it("serverns HTML har samma text", () => {
    expect(sida("viby")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
    expect(sida("ormsta")).not.toContain("det som kan behöva ses över.");
    expect(sida("ormsta")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });
});

describe("paket 114: M9, referensmeningen på orter där jobbet gjordes", () => {
  const l = (slug: string) => locations.find((x) => x.slug === slug)!;
  it("ingen mallmening på Singö och i Grisslehamn, och jobbet nämns en gång av briefen", () => {
    expect(referensMening(l("singo"), "på")).toBeNull();
    expect(referensMening(l("grisslehamn"), "i")).toBeNull();
    expect(sida("singo")).not.toContain("Vi har utfört ett dokumenterat referensjobb här");
    expect(sida("grisslehamn")).not.toContain("Vi har utfört ett dokumenterat referensjobb här");
    expect(ort("singo")).toContain("Vi har själva bytt tak på Singö");
    expect(ort("grisslehamn")).toContain("I Grisslehamn har vi gjort ett komplett takbyte med svarta betongpannor från Benders");
  });
  it("Blidö behåller mallens mening (inte i beställningen)", () => {
    expect(referensMening(l("blido"), "på")).toContain("dokumenterat referensjobb");
  });
});
