/**
 * Paket 82 (Marknadschefens grindsvar 2026-10-13, innehall/leverans-2026-10-13.md Del 5 T2 och T3): /takbyte-taby och /takomlaggning-taby säger vilka vi är och hur man bokar
 * i första stycket, och /takomlaggning-taby säger tre jobb (Blidö, Singö, Grisslehamn). Godkända lydelser som flyttas upp, inget nytt påstående.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "@/data/combo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const BAS = "Vi är en takfirma med bas i Norrtälje och tar uppdrag i Täby.";
const innehall = (n: string) => comboOverrides[n].content;
const efter = (n: string, rubrik: string) => innehall(n)[innehall(n).indexOf("## " + rubrik) + 1];

describe("paket 82: Täby-sidorna", () => {
  it("/takbyte-taby: basen efter första frågan, bokning och svarstid sist i första stycket, basmeningen flyttad ur 'Så når vi Täby'", () => {
    const f = innehall("takbyte-taby")[0];
    expect(f.startsWith("Ska du byta tak i Täby? " + BAS + " Ett takbyte börjar med en kostnadsfri takkontroll")).toBe(true);
    expect(f.endsWith("Boka på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.")).toBe(true);
    expect(efter("takbyte-taby", "Så når vi Täby")).toBe("Täby ligger ungefär fem mil sydväst om Norrtälje, mellan Sollentuna, Danderyd, Österåker och Vallentuna. Takkontrollen bokar du vardagar 07–20 eller helger 09–19.");
  });
  it("/takomlaggning-taby: basen först, bokningen sist, 'Ordet takomläggning är vanligt …' och 'för dig som bor i Täby' borta, basmeningen flyttad", () => {
    const f = innehall("takomlaggning-taby")[0];
    expect(f.startsWith(BAS + " Till skillnad från en mindre reparation")).toBe(true);
    expect(f.endsWith("Det börjar med en kostnadsfri takkontroll: boka på roslagstak.se/takkontroll eller ring 070-154 36 39.")).toBe(true);
    expect(f).not.toContain("Ordet takomläggning är vanligt");
    expect(f).not.toContain("för dig som bor i Täby");
    expect(f).toContain("Här förklarar vi vad det innebär, när det är rätt åtgärd och hur du får ett fast pris.");
    expect(efter("takomlaggning-taby", "Så når vi Täby")).toBe("Täby gränsar till Vallentuna i norr, Österåker i öster, Danderyd i söder och Sollentuna och Upplands Väsby i väster, ungefär fem mil sydväst om Norrtälje. Takkontrollen bokar du vardagar 07–20 eller helger 09–19.");
  });
  it("/takomlaggning-taby: tre tak med Grisslehamn, jobben nämns på ett ställe", () => {
    const r = innehall("takomlaggning-taby").filter((p) => p.startsWith("## ")).map((p) => p.slice(3));
    expect(r).toContain("Tre tak vi har bytt");
    expect(r).not.toContain("Två tak vi har bytt");
    const t = efter("takomlaggning-taby", "Tre tak vi har bytt");
    expect(t).toBe(
      "Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn, alla tre i Norrtälje kommun. På Blidö lades svarta betongpannor från Benders, med nytt underlag, ny läkt och nya plåtdetaljer. På Singö lades röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. I Grisslehamn fick ett tak på 120 kvadratmeter svarta betongpannor från Benders i september 2026. Bilder och uppgifter finns under våra projekt.",
    );
    expect(innehall("takomlaggning-taby").join("\n").split("Vi har gjort kompletta takbyten").length - 1).toBe(1);
  });
  it("serverns HTML har samma första stycke, och basmeningen står bara en gång på varje sida", () => {
    for (const n of ["takbyte-taby", "takomlaggning-taby"]) {
      const sida = prerenderContent("/" + n)!;
      const p = sida.paragraphs.map((x) => (typeof x === "string" ? x : ""));
      expect(p[0], n).toBe(innehall(n)[0]);
      expect(p.join("\n").split(BAS).length - 1, n).toBe(1);
    }
  });
  it("titel och meta rörs inte (Del 5: 'Titel, meta och rubrik på de fyra sidorna ändras inte')", () => {
    expect(comboOverrides["takbyte-taby"].title).toBe("Takbyte i Täby – fast pris efter takkontroll");
    expect(comboOverrides["takomlaggning-taby"].title).toBe("Takomläggning i Täby – fast pris efter takkontroll");
  });
});
