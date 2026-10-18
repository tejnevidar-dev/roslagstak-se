/**
 * Paket 128c (Marknadschefens grind 2026-10-18): avsnittet "Länna" på /taklaggare-skogas (ingen ny adress), texten ordagrant ur briefraden
 * (innehall/lanna-skogas-briefrader-2026-10-18.md, Wikipedia, Länna, Huddinge kommun).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TEXT = "Länna, i kommundelens södra del vid Nynäsvägen och Drevviken, var ursprungligen en by med flera gårdar. Av den äldre bebyggelsen står i dag bara Länna gård och gästgivaregården kvar, och gästgivaregården är nu en privat villa. När Nynäsbanan hade gjort området mer attraktivt styckades mark av 1937 för sommarstugor och permanenta bostäder. Vid Drevvikens station kunde man i början av 1900-talet byta från tåg till ångbåt över sjön, och stationen lades ner 1973. Bebyggelsen består enligt Wikipedia huvudsakligen av villor och fritidshus. För Västra Länna vann en ny detaljplan laga kraft 2012, med byggrätter för villor på befintliga tomter och på tidigare obebyggd mark.";
const skogas = () => locations.find((l) => l.slug === "skogas")!;

describe("paket 128c: avsnittet Länna på Skogås", () => {
  it("avsnittet ligger först bland egna avsnitt med briefradens text ordagrant, och 'Vad det betyder för taket' följer", () => {
    const e = skogas().extraSections!;
    expect(e[0]).toEqual({ heading: "Länna", text: TEXT });
    expect(e[1].heading).toBe("Vad det betyder för taket");
    expect(e.length).toBe(2);
  });
  it("serverns HTML har rubriken och texten före 'Vad det betyder för taket', och ingen ny adress finns", () => {
    const c = prerenderContent("/taklaggare-skogas")!;
    const i = c.paragraphs.findIndex((p) => p === TEXT);
    expect(i).toBeGreaterThan(0);
    expect(c.paragraphs[i - 1]).toBe("Länna.");
    expect(c.paragraphs.slice(i + 1).some((p) => p.startsWith("Vad det betyder för taket"))).toBe(true);
    expect(locations.some((l) => /^lanna/.test(l.slug))).toBe(false);
  });
  it("brödtexten är orörd och avsnittet har inga husåldrar, personnamn eller generaliseringar", () => {
    expect(skogas().longDescription).toContain("I Mörtvik finns också en badplats och entrén till Trångsundsskogens naturreservat.");
    expect(TEXT).not.toMatch(/(oftast|ofta)/i);
    expect(TEXT).not.toMatch(/d+ år gamla/);
  });
});
