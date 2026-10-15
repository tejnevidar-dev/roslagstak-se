/**
 * Paket 104: materialsidorna och /taktyper enligt Innehålls passrapport 158 (innehall/materialsidor-lasning-2026-10-15.md): M1–M5, ordagrant.
 * Prisrutan på plåttakssidan (gren 84) och garantimeningen på underlagstak-sidan (beslutet 2026-10-13) är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const sida = (p: string) => JSON.stringify(prerenderContent(p));
const mat = kalla("src/data/materials.ts");

describe("paket 104: materialsidorna", () => {
  it("M1: 'Stora skivor gör att takytan täcks snabbt.' är struken på pannplåt", () => {
    expect(mat).not.toContain("Stora skivor gör att takytan täcks snabbt.");
    expect(sida("/material/pannplat")).not.toContain("Stora skivor gör att takytan täcks snabbt");
  });
  it("M2: ljudmeningen på pannplåt har samma lydelse som på plåttakssidan", () => {
    expect(mat).toContain("Hur mycket ett plåttak hörs när det regnar beror på vad som finns under plåten.");
    expect(mat).not.toContain("Regn och hagel hörs mer mot plåt än mot pannor");
    expect(sida("/material/pannplat")).toContain("Hur mycket ett plåttak hörs när det regnar beror på vad som finns under plåten.");
  });
  it("M3 och M4: underlaget 'kan avgöra' i stället för 'avgör' på underlagstak", () => {
    const t = sida("/material/underlagstak");
    expect(t).toContain("men det kan avgöra om ett tak behöver lagas, läggas om eller bytas.");
    expect(t).not.toContain("men det är det som avgör om ett tak");
    expect(t).toContain("Underlaget kan avgöra när ett tak behöver göras om, även när pannorna ser hela ut.");
    expect(t).not.toContain("Ofta är det underlaget, inte pannorna, som avgör när ett tak behöver göras om.");
  });
  it("garantimeningen på underlagstak står kvar (beslutet 2026-10-13)", () => {
    expect(sida("/material/underlagstak")).toContain("Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.");
  });
});

describe("paket 104: /taktyper", () => {
  it("M5: svaret på 'Vad avgör hur länge ett tak fungerar?' har Innehålls lydelse", () => {
    const f = kalla("src/data/roof-type-faqs.ts");
    expect(f).toContain("Hur länge taket fungerar beror också på underlaget, läkten och detaljerna runt skorsten och genomföringar, inte bara på ytmaterialet.");
    expect(f).not.toContain("Det som oftast avgör är underlaget");
    const t = sida("/taktyper");
    expect(t).toContain("Hur länge taket fungerar beror också på underlaget");
    expect(t).not.toContain("Det som oftast avgör");
  });
});
