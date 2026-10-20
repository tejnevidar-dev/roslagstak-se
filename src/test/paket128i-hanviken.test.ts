/**
 * Paket 128i (Marknadschefens grind 2026-10-20): avsnittet "Hanviken och Skälsätra" på /taklaggare-trollbacken (ingen ny adress), texten ordagrant ur briefraden
 * (innehall/hanviken-trollbacken-briefrader-2026-10-20.md, Wikipedia, Kumla herrgård).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TEXT = "Hanviken och Skälsätra hör till de områden som styckades av från Kumla gård. Utbyggnaden tog enligt Wikipedia fart först på 1920- och 1930-talen. I slutet av 1920-talet fanns bara 26 villor och sommarstugor i Hanvikens egnahemsområde, i norra delen av Kumla, och det var Hanvikens och Kumlas villaområden som 1947 fick det gemensamma namnet Trollbäcken. Längs Kumla allé, som är omkring 850 meter lång och leder fram till gården, står villor från 1930- och 1940-talen, och de är i dag runt 75–95 år gamla.";
const trollbacken = () => locations.find((l) => l.slug === "trollbacken")!;

describe("paket 128i: avsnittet Hanviken och Skälsätra på Trollbäcken", () => {
  it("avsnittet ligger först bland egna avsnitt med briefradens text ordagrant, och 'Vad det betyder för taket' följer", () => {
    const e = trollbacken().extraSections!;
    expect(e[0]).toEqual({ heading: "Hanviken och Skälsätra", text: TEXT });
    expect(e[1].heading).toBe("Vad det betyder för taket");
    expect(e.length).toBe(2);
  });
  it("serverns HTML har rubriken och texten före 'Vad det betyder för taket', och ingen ny adress finns", () => {
    const c = prerenderContent("/taklaggare-trollbacken")!;
    const i = c.paragraphs.findIndex((p) => p === TEXT);
    expect(i).toBeGreaterThan(0);
    expect(c.paragraphs[i - 1]).toBe("Hanviken och Skälsätra.");
    expect(c.paragraphs.slice(i + 1).some((p) => p.startsWith("Vad det betyder för taket"))).toBe(true);
    expect(locations.some((l) => /^(hanviken|skalsatra)/.test(l.slug))).toBe(false);
  });
  it("brödtexten är orörd och avsnittet har inga generaliseringar", () => {
    expect(trollbacken().longDescription).toContain("Från Kumla styckades områdena Hanviken, Persudde, Fornudden, Sofieberg, Näset och Skälsätra av.");
    expect(TEXT).not.toMatch(/(oftast|ofta)/i);
  });
});
