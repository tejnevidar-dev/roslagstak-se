/**
 * Paket 128e (Marknadschefens grind 2026-10-18): avsnittet "Rotsunda" på /taklaggare-rotebro (ingen ny adress), texten ordagrant ur briefraden
 * (innehall/rotsunda-rotebro-briefrader-2026-10-18.md, Wikipedia, Rotsunda gård).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TEXT = "Rotsunda har fått sitt namn efter Rotsunda gård, som nämns första gången 1409. Namnet syftar enligt Wikipedia på Rotsundet, det forntida sundet mellan Norrviken och Edssjön, vars rest är dagens Edsån. På 1600- och 1700-talen bestod Rotsunda av tre gårdar. Huvudbyggnaden från slutet av 1800-talet står kvar, liksom en flygel och ett stall från 1700-talet och ett litet rödmålat vapenhus från 1600-talet. Området började bebyggas med villor och flerfamiljshus 1947 och byggdes ut vidare under 1980- och 1990-talen. Villorna från slutet av 1940-talet är i dag knappt 80 år gamla.";
const rotebro = () => locations.find((l) => l.slug === "rotebro")!;

describe("paket 128c: avsnittet Rotsunda på Rotebro", () => {
  it("avsnittet ligger först bland egna avsnitt med briefradens text ordagrant, och 'Vad det betyder för taket' följer", () => {
    const e = rotebro().extraSections!;
    expect(e[0]).toEqual({ heading: "Rotsunda", text: TEXT });
    expect(e[1].heading).toBe("Vad det betyder för taket");
    expect(e.length).toBe(2);
  });
  it("serverns HTML har rubriken och texten före 'Vad det betyder för taket', och ingen ny adress finns", () => {
    const c = prerenderContent("/taklaggare-rotebro")!;
    const i = c.paragraphs.findIndex((p) => p === TEXT);
    expect(i).toBeGreaterThan(0);
    expect(c.paragraphs[i - 1]).toBe("Rotsunda.");
    expect(c.paragraphs.slice(i + 1).some((p) => p.startsWith("Vad det betyder för taket"))).toBe(true);
    expect(locations.some((l) => /^rotsunda/.test(l.slug))).toBe(false);
  });
  it("brödtexten är orörd och avsnittet har inga husåldrar, personnamn eller generaliseringar", () => {
    expect(rotebro().longDescription).toContain("Enligt hitta.se är husen i Gillbo mest byggda på 1970- och 1980-talen.");
    expect(TEXT).not.toMatch(/(oftast|ofta)/i);
  });
});
