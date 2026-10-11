/**
 * Paket 49: det interna filnamnet "alla.csv" (vårt arbetsunderlag) får inte synas för besökaren. Källan är fastställd per mening mot villaomraden/alla.csv;
 * där den inte gick att fastställa är meningen struken. Bygget fälls dessutom av scripts/check-csv.ts om ett .csv-namn står i den byggda HTML-texten.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";

const text = (slug: string) => JSON.stringify(locations.find((l) => l.slug === slug));

describe("paket 49: inget .csv-namn på sajten", () => {
  it("ingen ort har ett .csv-namn i någon text eller faktaruta", () => {
    const traffar = locations.filter((l) => /\.csv\b/i.test(JSON.stringify(l))).map((l) => l.slug);
    expect(traffar).toEqual([]);
  });

  it("källorna som fastställdes står kvar med rätt namn", () => {
    expect(text("storangen")).toContain("Enligt Wikipedia finns i området även funkisvillor");
    expect(text("saltsjobaden")).toContain("Enligt Wikipedia växte villastaden fram mellan 1891 och 1912");
    expect(text("midgard-byle")).toContain("Enligt kommunen är villorna i Byle villastad från 1907 och 1910-talet");
    expect(text("kallhall")).toContain("SCB: ca 210 ägda småhus i RegSO");
    expect(text("vato")).toContain("Hitta.se anger");
  });

  it("meningarna utan fastställd källa är strukna, och arbetsanteckningarna är borta", () => {
    expect(text("segeltorp")).not.toContain("består bebyggelsen av villor från tidigt 1900-tal och radhus främst från 1950-talet");
    expect(text("snattringe")).not.toContain("är villorna i Snättringe främst från 1920- och 30-talen");
    expect(text("solhem-lunda")).not.toContain("finns i Solhem-Lunda hus från 1904–07");
    expect(text("hasselby")).not.toContain("omfattar området också Backlura");
    expect(text("roslags-nasby")).not.toContain("både villor och radhus i området");
    expect(text("ljustero")).not.toContain("4 311 småhusbyggnader");
    expect(text("yxlan")).not.toContain("okänd");
    expect(text("vato")).not.toContain("avgränsningen inte kontrollerad");
  });
});
