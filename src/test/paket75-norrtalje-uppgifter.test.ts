/**
 * Paket 75 (Innehålls leverans 2026-10-13, Del 2, punkt 1 och 4, godkänd av Marknadschefen 2026-10-12): uppgifter på Norrtälje-sidorna som inte går att återfinna
 * i källan är rättade, och sidorna säger tre jobb (Blidö, Singö, Grisslehamn) i stället för två. Avståndet till Hallstavik följer koordinaterna.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { distanceFromBaseKm } from "@/data/service-reach";
import { villaAreasByPage } from "@/data/villa-areas";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const text = (path: string) => prerenderContent(path)!.paragraphs.join("\n");

describe("paket 75: stadsdelarna i Norrtälje mot hitta.se", () => {
  it("/taklaggare-norrtalje: Innehålls efter-lydelse, utan Frötuna, och faktarutans Orter utan Frötuna", () => {
    const n = locations.find((l) => l.slug === "norrtalje")!;
    const sektioner = JSON.stringify(n.extraSections);
    expect(sektioner).toContain(
      "Enligt hitta.se är villorna i Kvisthamra för det mesta byggda på 1940- och 1960-talen. I Gransäter finns både flerbostadshus och villor, också de mest från 1940- och 1960-talen, och kring Görlaslingan i söder är villorna och radhusen mest från 1990- och 2000-talen. I öster ligger Långgarns villaområde.",
    );
    expect(sektioner).not.toMatch(/Frötuna|sekelskiftet 1900 till 2000-talet|Görla i söder mest har/);
    const orter = n.factBox!.find((f) => f.label === "Orter")!.value;
    expect(orter).toContain("Staden (Kvisthamra, Gransäter, Görla, Långgarn), Rimbo");
    expect(orter).not.toContain("Frötuna");
  });
  it("/takomlaggning-norrtalje: Innehålls efter-lydelse, meningen om Frötuna struken", () => {
    const t = text("/takomlaggning-norrtalje");
    expect(t).toContain("Enligt hitta.se är husen i Kvisthamra och Gransäter för det mesta byggda på 1940- och 1960-talen, och kring Görlaslingan i söder är villorna och radhusen mest från 1990- och 2000-talen. Husens ålder");
    expect(t).not.toMatch(/Frötuna|Görla i söder mest/);
  });
  it("ingen sida eller data i src/data säger längre att husen i Frötuna eller 'Görla i söder' är byggda i en viss tid enligt hitta.se", () => {
    for (const f of ["src/data/locations.ts", "src/data/combo-overrides.ts", "src/data/villa-areas.ts", "src/data/region-texts.ts", "src/data/blog-posts.ts"]) {
      const s = kalla(f);
      expect(s, f).not.toContain("Görla i söder mest har hus från");
      expect(s, f).not.toContain("i Frötuna, strax utanför staden, står hus");
      expect(s, f).not.toContain("Frötuna strax utanför staden står hus");
    }
    const frotuna = JSON.stringify(villaAreasByPage.norrtalje);
    expect(frotuna).not.toContain("Enligt hitta.se är husen här byggda under flera perioder, från sekelskiftet");
    expect(frotuna).toContain("Husen kring Görlaslingan är enligt hitta.se mest från 1990- och 2000-talen.");
  });
});

describe("paket 75: tre jobb på de två Norrtälje-sidorna", () => {
  it("/takbyte-norrtalje säger tre tak och nämner Grisslehamn en gång med J1:s lydelse", () => {
    const t = text("/takbyte-norrtalje");
    expect(t).toContain("och tre tak vi har bytt i kommunen.");
    expect(t).toContain("Tre tak vi har bytt i Norrtälje kommun");
    expect(t.split("Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.").length - 1).toBe(1);
    expect(t).toContain("I Grisslehamn fick ett tak på 120 kvadratmeter svarta betongpannor från Benders i september 2026.");
    expect(t).not.toMatch(/Två tak|två tak|Två exempel/);
  });
  it("/takomlaggning-norrtalje har J1:s lydelse en gång och inte längre 'på Blidö och Singö'", () => {
    const t = text("/takomlaggning-norrtalje");
    expect(t.split("Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.").length - 1).toBe(1);
    expect(t).not.toContain("kompletta takbyten på Blidö och Singö");
  });
});

describe("paket 75: avståndet till Hallstavik: texten är vägen, rutan är fågelvägen", () => {
  it("rutans värde är 33 km fågelvägen och etiketten säger det; ortstexten (källan anger cirka 41 km, vägen) säger omkring fyra mil", () => {
    const h = locations.find((l) => l.slug === "hallstavik")!;
    expect(Math.round(distanceFromBaseKm(h))).toBe(33);
    expect(text("/taklaggare-hallstavik")).toContain("omkring fyra mil från Norrtälje");
    expect(text("/taklaggare-hallstavik")).toContain("Avstånd till vår bas i Norrtälje (fågelvägen)");
    expect(text("/taklaggare-hallstavik")).not.toContain("drygt tre mil");
  });
});
