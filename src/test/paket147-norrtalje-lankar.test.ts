/**
 * Paket 147 (gren 134b, Marknadschefens grind 2026-10-20): länkar med sökordet "takbyte i Norrtälje" till /takbyte-norrtalje från Norrtälje-sidan (länktexterna i tjänstelistan) och Spillersboda
 * (K2-meningen, länken och "kan" i stället för "ofta"). Underlag: innehall/takbyte-norrtalje-lankar-briefrader-2026-10-20.md.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => JSON.stringify([locations.find((l) => l.slug === s)!.longDescription, locations.find((l) => l.slug === s)!.extraSections]);

describe("paket 147: Norrtälje-sidan", () => {
  it("länktexterna i tjänstelistan är 'Takbyte i Norrtälje' och 'Takomläggning i Norrtälje' med samma mål som förut", () => {
    const t = text("norrtalje");
    expect(t).toContain("[Takbyte i Norrtälje](/takbyte-norrtalje)");
    expect(t).toContain("[Takomläggning i Norrtälje](/takomlaggning-norrtalje)");
    expect(t).not.toContain("[Takbyte](/takbyte-norrtalje)");
    expect(t).not.toContain("[Takomläggning](/takomlaggning-norrtalje)");
    const c = prerenderContent("/taklaggare-norrtalje")!;
    expect(c.links.some((l) => l.href === "/takbyte-norrtalje" && l.label === "Takbyte i Norrtälje")).toBe(true);
  });
});

describe("paket 147: Spillersboda", () => {
  it("K2-meningen och länken med sökordet efter underlagsmeningen, och 'kan' i stället för 'ofta'", () => {
    const t = text("spillersboda");
    expect(t).toContain("hur underlaget ser ut i dag går inte att se från vägen. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats. Vad ett byte omfattar står på sidan om [takbyte i Norrtälje](/takbyte-norrtalje).");
    expect(t).toContain("används året om kan ha takdelar av olika ålder");
    expect(t).not.toContain("har ofta takdelar");
  });
  it("serverns HTML länkar till /takbyte-norrtalje med texten 'takbyte i Norrtälje'", () => {
    const c = prerenderContent("/taklaggare-spillersboda")!;
    expect(c.links.some((l) => l.href === "/takbyte-norrtalje" && /takbyte i Norrtälje/i.test(l.label))).toBe(true);
  });
});
