/**
 * Paket 127b (Marknadschefens grind 2026-10-18 23:50 och 00:10): avsnittet "Tullinge villastad" på /taklaggare-tullinge (ingen ny adress), källänken för Älvnäs och områdenas egna koordinater
 * (Wikipedia, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-18) i stället för den överordnade ortens.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { distanceFromBaseKm } from "../data/service-reach";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = (s: string) => locations.find((l) => l.slug === s)!;

describe("paket 127b: Tullinge villastad", () => {
  const TEXT = "Planerna för villastaden var enligt Wikipedia större än det som blev av, och de fullföljdes inte helt. Villastaden har i stället vuxit fram i flera omgångar: de första villorna från tiden kring att hållplatsen kom, en stor del av husen från 1950-talet och en nyare årgång från 2000-talet. Husen från 1950-talet är i dag runt 70 år gamla och husen från 2000-talet runt 20. Äldre villor kan ha fler vinklar, kupor och skorstenar, och varje anslutning ska vara tät.";
  it("avsnittet ligger först bland egna avsnitt, med briefradens text ordagrant, och 'Vad det betyder för taket' följer", () => {
    const e = loc("tullinge").extraSections!;
    expect(e[0]).toEqual({ heading: "Tullinge villastad", text: TEXT });
    expect(e[1].heading).toBe("Vad det betyder för taket");
    expect(e.length).toBe(2);
  });
  it("serverns HTML har rubriken och texten, sist efter stycket om villorna, och ingen ny adress finns", () => {
    const c = prerenderContent("/taklaggare-tullinge")!;
    const i = c.paragraphs.findIndex((p) => p === TEXT);
    expect(i).toBeGreaterThan(0);
    expect(c.paragraphs[i - 1]).toBe("Tullinge villastad."); // avsnittsrubriker får punkt i serverns text (suffix ".")
    expect(c.paragraphs.slice(i + 1).some((p) => p.startsWith("Vad det betyder för taket"))).toBe(true);
    expect(locations.some((l) => /tullinge-?villa/.test(l.slug))).toBe(false);
  });
  it("inga personnamn, inga luckor och ingen generalisering i avsnittet", () => {
    expect(TEXT).not.toMatch(/\b(oftast|ofta)\b/i);
    expect(loc("tullinge").longDescription).toContain("Villorna är av olika ålder. Enligt hitta.se är husen i Tullinge villastad");
  });
});

describe("paket 127b: Älvnäs källänk", () => {
  it("sourceLink är Wikipedia-artikeln och står som 'Källa:' i serverns HTML", () => {
    expect(loc("alvnas").sourceLink).toEqual({ label: "Wikipedia, Älvnäs", url: "https://sv.wikipedia.org/wiki/Älvnäs" });
    expect(prerenderContent("/taklaggare-alvnas")!.paragraphs).toContain("Källa: Wikipedia, Älvnäs");
  });
});

describe("paket 127b: egna koordinater", () => {
  const K: Record<string, [number, number]> = { alvnas: [59.28722, 17.76722], brevikshalvon: [59.23333, 18.33333], "bo-rudboda": [59.37417, 18.15556] };
  it("de tre områdena har Wikipedias koordinater, inte den överordnade ortens", () => {
    for (const [s, [lat, lng]] of Object.entries(K)) {
      expect(loc(s).lat, s).toBe(lat);
      expect(loc(s).lng, s).toBe(lng);
    }
    expect(loc("alvnas").lat).not.toBe(loc("ekero").lat);
    expect(loc("brevikshalvon").lng).not.toBe(loc("tyreso").lng);
    expect(loc("bo-rudboda").lat).not.toBe(loc("lidingo").lat);
  });
  it("avståndsraden i serverns HTML räknas ur de egna koordinaterna", () => {
    for (const s of Object.keys(K)) {
      const km = Math.round(distanceFromBaseKm(loc(s)));
      const c = prerenderContent(`/taklaggare-${s}`)!;
      const t = JSON.stringify(c.paragraphs);
      expect(t, s).toContain(`${km} km`);
    }
  });
});
