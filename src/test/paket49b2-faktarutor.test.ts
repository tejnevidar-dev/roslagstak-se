/**
 * Paket 49b-2: arbetsanteckningar i faktarutorna (2a), källraden på Svartlöga (2b), rutorna som säger det paket 49 strök (2d) och rutan "Område" (Li2).
 * Arbetsord som "ej belagd", "inte belagt", "ej verifierad", "PDF:en" och "anges inte i källan" är skrivna för oss, inte för en besökare.
 */
import { describe, expect, it } from "vitest";
import { buildLocalSections } from "@/data/local-sections";
import { locations } from "@/data/locations";

const alla = JSON.stringify(locations);
const rad = (slug: string, etikett: string) => locations.find((l) => l.slug === slug)?.factBox?.find((r) => r.label === etikett)?.value;

describe("paket 49b-2: inga arbetsanteckningar i faktarutorna", () => {
  it("inga arbetsord i någon ortstext eller faktaruta", () => {
    for (const re of [/\bej\s+belag[dt]/i, /\binte\s+belag[dt]/i, /\bej\s+verifierad/i, /\bPDF:en\b/, /\banges\s+inte\s+i\s+käll/i]) expect(alla).not.toMatch(re);
  });

  it("2a: de beställda lydelserna", () => {
    expect(rad("bromma-kyrka", "Ägda småhus (avrundat)")).toBe("Ca 740 (Stockholms stad, Områdesfakta 2025)");
    expect(rad("malarhojden", "Ägda småhus (avrundat)")).toBe("Ca 990 (Stockholms stad, Områdesfakta 2025)");
    expect(rad("lannersta", "Delområde")).toBe("Lännersta");
    expect(rad("spillersboda", "Byggperiod")).toBe("Tornvillan 1894–1895");
    expect(rad("svartno", "Byggperiod")).toBe("Byskolan 1879");
    expect(rad("hoglandet", "Byggperiod")).toMatch(/^Stadens mark 1925–1933, /);
    expect(rad("ingaro", "Byggperiod")).toBeUndefined();
    for (const s of ["edsbro", "kapellskar"]) {
      expect(rad(s, "Hustyper"), s).toBeUndefined();
      expect(rad(s, "Byggperiod"), s).toBeUndefined();
    }
  });

  it("2b: källraden på Svartlöga är en ren källhänvisning med samma länk", () => {
    const l = locations.find((x) => x.slug === "svartloga")!;
    expect(l.sourceLink?.label).toBe("Norrtälje kommun, riksintresseområdet Svartlöga–Rödlöga");
    expect(l.sourceLink?.url).toContain("svartloga--rodloga");
  });

  it("2d: rutorna säger inte det paket 49 strök ur brödtexten", () => {
    expect(rad("segeltorp", "Byggperiod")).toBe("Villor tidigt 1900-tal");
    expect(rad("snattringe", "Byggperiod")).toBe("Villor från 1900-talets början, radhus tidigt 1960-tal");
    expect(rad("hasselby", "Delområden")).toBe("Hässelby villastad, Backlura");
    expect(rad("roslags-nasby", "Hustyper")).toBeUndefined();
  });

  it("Li2: rutan Område har inga koordinater, och 'Läge: Fastland' står bara kvar för öar", () => {
    const fastland = locations.find((l) => !l.isIsland)!;
    const o = locations.find((l) => l.isIsland)!;
    const f1 = buildLocalSections(fastland).facts.map((x) => x.label);
    const f2 = buildLocalSections(o).facts.map((x) => x.label);
    expect(f1).not.toContain("Koordinater");
    expect(f1).not.toContain("Läge");
    expect(f2).not.toContain("Koordinater");
    expect(f2).toContain("Läge");
    expect(buildLocalSections(o).facts.find((x) => x.label === "Läge")?.value).toBe("Ö i skärgården");
    expect(f1).toEqual(["Område", "Närmaste orter", "Avstånd till vår bas i Norrtälje (fågelvägen)"]);
  });
});
