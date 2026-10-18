/**
 * Paket 128b (Marknadschefens grind 2026-10-18): avsnittet "Eriksberg" på /taklaggare-helenelund (ingen ny adress), texten ordagrant ur briefraden
 * (innehall/eriksberg-helenelund-briefrader-2026-10-18.md, Wikipedia, Eriksberg, Sollentuna kommun, och hitta.se).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TEXT = "Eriksberg ligger på en remsa mellan E4 och Ostkustbanan och har fått sitt namn efter ett torp som byggdes 1819. Vid mitten av 1940-talet fanns här enligt Wikipedia både sommar- och åretruntboende. Efter hand gjordes sommarstugorna om till åretruntbostäder, och tomter styckades för att ge plats åt nya hus. Eriksbergs torg kom till i mitten av 1950-talet, och 1966 byggdes större flerfamiljshus. Enligt hitta.se är husen i Eriksberg i dag främst från 1950- och 1960-talen.";
const helenelund = () => locations.find((l) => l.slug === "helenelund")!;

describe("paket 128b: avsnittet Eriksberg på Helenelund", () => {
  it("avsnittet ligger först bland egna avsnitt med briefradens text ordagrant, och 'Vad det betyder för taket' följer", () => {
    const e = helenelund().extraSections!;
    expect(e[0]).toEqual({ heading: "Eriksberg", text: TEXT });
    expect(e[1].heading).toBe("Vad det betyder för taket");
    expect(e.length).toBe(2);
  });
  it("serverns HTML har rubriken och texten före 'Vad det betyder för taket', och ingen ny adress finns", () => {
    const c = prerenderContent("/taklaggare-helenelund")!;
    const i = c.paragraphs.findIndex((p) => p === TEXT);
    expect(i).toBeGreaterThan(0);
    expect(c.paragraphs[i - 1]).toBe("Eriksberg.");
    expect(c.paragraphs.slice(i + 1).some((p) => p.startsWith("Vad det betyder för taket"))).toBe(true);
    expect(locations.some((l) => /^eriksberg/.test(l.slug))).toBe(false);
  });
  it("grunduppgifterna om Eriksberg och brödtexten är orörda, och det finns inga personnamn eller generaliseringar i avsnittet", () => {
    expect(helenelund().longDescription).toContain("På 1960-talet tog byggandet fart igen");
    expect(TEXT).not.toMatch(/\b(oftast|ofta)\b/i);
  });
});
