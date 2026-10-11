/**
 * Paket 49b-3: sista delen av faktarutepaketet. M1 (tre metabeskrivningar), B1 (två meningar tillbaka med namngiven källa), orden i 2e, källrader (P1),
 * och tre frågor "När byggdes husen …?" vars svar inte längre svarade på frågan (Edsbro, Kapellskär, Ingarö).
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { ortSeoOverrides } from "@/data/seo-overrides";

const alla = JSON.stringify(locations);
const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const rad = (slug: string, etikett: string) => ort(slug).factBox?.find((r) => r.label === etikett)?.value;

describe("paket 49b-3", () => {
  it("M1: metabeskrivningarna säger inte det som ströks ur brödtexten", () => {
    expect(ortSeoOverrides.snattringe.description).toBe("Takläggare i Snättringe i Huddinge, med villor från 1900-talets början och radhus från 1960-talet. Kostnadsfri takkontroll och fast pris.");
    expect(ortSeoOverrides.segeltorp.description).toBe("Takläggare i Segeltorp, Jakobslund, Smista och Juringe i Huddinge, med villor från 1900-talets början och radhus. Kostnadsfri takkontroll.");
    expect(ortSeoOverrides.hasselby.description).toBe("Takläggare i Hässelby villastad och Backlura, med villor från 1900-talets början och radhus från 1970-talet. Kostnadsfri takkontroll.");
    expect(ort("hasselby").description).toBe(ortSeoOverrides.hasselby.description);
    expect(alla).not.toContain("Johannelund");
  });

  it("B1: Solhem-Lunda och Hässelby har fått tillbaka en mening med Wikipedia som källa", () => {
    expect(ort("solhem-lunda").longDescription).toContain("Under 1960-talet styckades enligt Wikipedia många stora tomter av och bebyggdes med nya villor, och i västra Solhem byggdes kvarter med kedjehus och radhus. I början av 2000-talet uppfördes radhus och parhus vid Avestagatan.");
    expect(ort("hasselby").longDescription).toContain("Enligt Wikipedia kom byggandet i gång på nytt i början av 1970-talet. Många äldre tomter delades, och Backlura bebyggdes med radhus och kedjehus.");
  });

  it("2e: arbetsord och tecken som inte är skrivna för en besökare är borta", () => {
    expect(locations.flatMap((l) => l.factBox ?? []).filter((r) => /som nämns|belagt/.test(r.label))).toEqual([]); // etiketterna
    for (const s of ["Tak (belagt", "Eget referensjobb", "V. Bällsta", "Kv. Assessorn", "m.fl.", "samma typ som Andeboda", "relativt jämn\\\"", "(Wikipedia, HSB)"]) expect(alla, s).not.toContain(s);
    expect(alla).not.toMatch(/[Vv]illor \+ /);
    expect(alla).not.toMatch(/ \+ (radhus|stor småhus)/);
    expect(ort("singo").factBox?.some((r) => r.label === "Vårt jobb här")).toBe(true);
    expect(rad("rimbo", "Hustyper")).toBe("Småhus och flerbostadshus");
    expect(rad("viby", "Byggperiod")).toBe("1970-tal enligt Wikipedia och HSB, 1960- och 1980-tal enligt hitta.se");
  });

  it("P1: källraderna är rena källhänvisningar", () => {
    expect(ort("uppsala").sourceLink?.label).toBe("Wikipedia, Uppsala");
    expect(ort("vaddo").sourceLink?.label).toBe("Wikipedia, Roslags-Bro socken");
    expect(ort("loharad").sourceLink?.label).toBe("Wikipedia, Lohärads socken");
  });

  it("frågan 'När byggdes husen …?' finns inte där svaret inte längre svarar på den", () => {
    expect(ort("edsbro").uniqueFAQ).toBeUndefined();
    expect(ort("kapellskar").uniqueFAQ).toBeUndefined();
    expect(ort("ingaro").uniqueFAQ?.question).toBe("Vilka hus finns på Ingarö?");
  });
});
