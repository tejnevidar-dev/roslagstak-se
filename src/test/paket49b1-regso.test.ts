/**
 * Paket 49b-1: "RegSO" (SCB:s statistikområden) och områdeskoder som 0117R004 är arbetsord och arbetsuppgifter, inte text för en besökare.
 * Etiketten blir "Ägda småhus i området (avrundat)", koderna stryks och "(RegSO: X)" blir "(SCB:s område X)".
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";

const alla = JSON.stringify(locations);
const text = (slug: string) => JSON.stringify(locations.find((l) => l.slug === slug));
const faktarad = (slug: string, etikett: string) => locations.find((l) => l.slug === slug)?.factBox?.find((r) => r.label === etikett)?.value;

describe("paket 49b-1: ingen RegSO och inga områdeskoder i texten", () => {
  it("ingen ort har RegSO eller en områdeskod i någon text eller faktaruta", () => {
    expect(alla).not.toMatch(/RegSO/);
    expect(alla).not.toMatch(/\b\d{4}R\d{3}\b/);
  });

  it("etiketten är 'Ägda småhus i området (avrundat)' på 87 sidor och 'Bostäder med äganderätt i området (avrundat)' på 3", () => {
    expect(locations.filter((l) => l.factBox?.some((r) => r.label === "Ägda småhus i området (avrundat)")).length).toBe(87 - 2 - 1 + 3 + 2 + 1 + 1 + 1); // Ormsta och Solgård-Sörskogen tappar raden, Yxlan (egen text, paket 113) har ingen rad om ägda småhus; gren 127 lägger till Älvnäs, Brevikshalvön och Bo och Rudboda, gren 128 Träkvista och Vaxmora, gren 128d Kungsberga, gren 128f Svartsjö, gren 128g Kästa
    expect(locations.filter((l) => l.factBox?.some((r) => r.label === "Bostäder med äganderätt i området (avrundat)")).length).toBe(3);
  });

  it("Ormsta och Solgård-Sörskogen: raden med antal är struken (siffran får inte stå om området inte är belagt)", () => {
    for (const s of ["ormsta", "solgard-sorskogen"]) expect(locations.find((l) => l.slug === s)?.factBox?.some((r) => /Ägda småhus/.test(r.label)), s).toBe(false);
  });

  it("de ändrade lydelserna är de beställda", () => {
    expect(faktarad("kungsangen", "Delområden")).toContain("(SCB:s område Centrala Kungsängen)");
    expect(faktarad("enhorna-sandviken", "Ägda småhus i området (avrundat)")).toContain("SCB:s område Enhörna-Sandviken är större än orten Sandviken");
    expect(faktarad("kallhall", "Delområden")).toBe("Kallhälls villastad (Björkliden)");
    expect(faktarad("kallhall", "Antal villor")).toBe("Ca 210 (Wikipedia och SCB)");
    expect(faktarad("lannersta", "Ägda småhus i området (avrundat)")).toBe("Ca 2 050 i SCB:s område, som är större än Lännersta (SCB, 2025)");
    expect(faktarad("ostertalje", "Ägda småhus i området (avrundat)")).toBe("Ca 490 (SCB, 2025)");
    expect(faktarad("vaddo", "Delområden")).toBe("Roslagsbro, Bredsättra");
    expect(faktarad("alta", "Ägda småhus i området (avrundat)")).toBe("Ca 2 350 (SCB, 2025, området Älta-Erstavik)");
    expect(text("ljustero")).not.toContain("0117R004");
  });
});
