/**
 * Paket 56 (Marknadschefen 2026-10-12): ortstexterna för Västerås, Nyköping och Trosa, ordagrant ur Innehålls briefar (villaomraden/texter/<ort>-<ort>.md).
 * Importerade med scripts/import-omrade.ts; meningsgrinden (content-coverage-check.ts) kontrollerar varje mening mot briefen.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { ortSeoOverrides } from "@/data/seo-overrides";

const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const text = (slug: string) => JSON.stringify(ort(slug));

const FORVANTAT = [
  {
    slug: "vasteras",
    title: "Takläggare i Västerås – fast pris efter takkontroll",
    borjan: "Den som söker takläggare i Västerås kan ha ett hus i en äldre villastadsdel",
    rubriker: ["Haga och Gideonsberg", "Öster om centrum", "Önsta-Gryta och Vallby", "Orterna runt staden", "Vad det betyder för taket"],
    faq: "När byggdes husen i Västerås?",
    gammalt: ["Mälardalens största stad", "Kan ni ta uppdrag åt större bostadsrättsföreningar i Västerås?"],
  },
  {
    slug: "nykoping",
    title: "Takläggare i Nyköping – fast pris efter takkontroll",
    borjan: "Den som söker takläggare i Nyköping kan ha ett hus i en villastad från tiden runt 1920",
    rubriker: ["Östra villastaden", "Villaområdena från 1930-talet", "1940-talet och 1960-talet", "Fler villaområden", "Vad det betyder för taket"],
    faq: "När byggdes husen i Nyköping?",
    gammalt: ["Kustnära läge ger fukt", "Vilket takmaterial passar nära kusten i Nyköping?"],
  },
  {
    slug: "trosa",
    title: "Takläggare i Trosa – fast pris efter takkontroll",
    borjan: "Den som söker takläggare i Trosa kan ha ett hus i den gamla staden vid ån",
    rubriker: ["Den gamla staden vid ån", "Östermalm och Ekensberg", "Utbyggnaden på 1960- och 1970-talen", "Vad det betyder för taket"],
    faq: "När byggdes husen i Trosa?",
    gammalt: ["Trosa är en kuststad vid Trosaån", "Tar ni uppdrag på fritidshus i Trosa?"],
  },
];

describe("paket 56: ortstexterna Västerås, Nyköping och Trosa", () => {
  for (const f of FORVANTAT) {
    describe(f.slug, () => {
      it("brödtexten börjar med briefens inledning, avsnitten har briefens rubriker och den gamla texten är borta", () => {
        const l = ort(f.slug);
        expect(l.longDescription.startsWith(f.borjan)).toBe(true);
        expect((l.extraSections ?? []).map((s) => s.heading)).toEqual(f.rubriker.filter((r) => r !== "Så går det till"));
        for (const g of f.gammalt) expect(text(f.slug), g).not.toContain(g);
        expect(l.extraContent).toBe("");
      });
      it("titel och meta ligger i seo-overrides, och metan är sidans beskrivning", () => {
        const o = ortSeoOverrides[f.slug];
        expect(o.title).toBe(f.title);
        expect(o.title.length).toBeLessThanOrEqual(60);
        expect(o.description.length).toBeLessThanOrEqual(160);
        expect(ort(f.slug).description).toBe(o.description);
      });
      it("faktaruta, källa, processen och frågan om byggperiod är med, med bygglovsraden", () => {
        const l = ort(f.slug) as unknown as { factBox: { label: string; value: string }[]; sourceLink: { label: string; url: string }; process: { steps: string[]; paragraphs: string[] }; uniqueFAQ: { question: string; answer: string } };
        expect(l.factBox.map((x) => x.label)).toContain("Kommun");
        expect(l.sourceLink.url).toBe(`https://sv.wikipedia.org/wiki/${l.factBox[0].value.split(" ")[0]}`);
        expect(l.sourceLink.label).toMatch(/^Wikipedia, /);
        expect(l.process.steps).toHaveLength(3);
        expect(l.uniqueFAQ.question).toBe(f.faq);
        expect(l.uniqueFAQ.answer).toContain("För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör.");
      });
      it("påståendena mot kund: 10 års utförandegaranti, fast pris, AMA, svar inom 24 timmar, inga personnamn eller påhittade referenser", () => {
        const t = text(f.slug);
        expect(t).toContain("10 års utförandegaranti på det arbete vi utför");
        expect(t).toContain("Fast pris");
        expect(t).toContain("AMA");
        expect(t).toContain("Vi svarar inom 24 timmar");
        expect(t).not.toMatch(/30 års|UC |kollektivavtal|återkopplar/);
      });
    });
  }
  it("Västerås: stadsdelarna i faktarutan, och Haga-meningen med 'enligt Wikipedia' och utan årtal", () => {
    const t = text("vasteras");
    for (const d of ["Haga", "Gideonsberg", "Viksäng", "Skiljebo", "Hamre", "Bjurhovda", "Önsta-Gryta", "Vallby", "Irsta", "Tillberga"]) expect(t, d).toContain(d);
    expect(t).toContain("Enligt Wikipedia har den södra delen äldre villabebyggelse");
  });
  it("de övriga orterna i Mälardalen är oförändrade (Enköping, Bålsta, Uppsala, Knivsta)", () => {
    expect(ort("enkoping").uniqueFAQ?.question).toBe("Hur går en takkontroll till i Enköping?");
    expect(ort("balsta").uniqueFAQ?.question).toBe("Vilka takproblem är vanligast i Bålsta?");
    expect(ort("uppsala").uniqueFAQ?.question).toBe("När byggdes husen i Uppsala?");
    expect(ort("knivsta").uniqueFAQ?.question).toBe("När byggdes husen i Knivsta?");
  });
});
