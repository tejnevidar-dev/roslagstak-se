/**
 * Paket 131b (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-kil (Kil och Boo gård i Boo, Nacka) ur villaomraden/texter/kil-boo-gard-nacka.md.
 * Egna koordinater (Wikipedia, Kil, Nacka kommun, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "kil")!;

describe("paket 131b: Kil och Boo gård", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "kil").length).toBe(1);
    expect(locations.some((l) => l.slug === "boo-gard" || l.slug === "graninge")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Kil");
    expect(l.parentLocation?.slug).toBe("nacka");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Kil, Nacka kommun", url: "https://sv.wikipedia.org/wiki/Kil,_Nacka_kommun" });
    expect(ortSeoOverrides.kil.title).toBe("Takbyte i Kil och Boo gård, Nacka – fast pris");
    expect(ortSeoOverrides.kil.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.kil.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Kil och Boo gård, Nacka");
    expect(l.lat).toBe(59.33444);
    expect(l.lng).toBe(18.32667);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "nacka")!.lat);
    expect(locationIndex.some((x) => x.slug === "kil" && x.name === "Kil")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och inga husåldrar utöver källans årtal", () => {
    const c = prerenderContent("/taklaggare-kil")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Kil och Boo gård, Nacka");
    expect(c.title).toBe("Takbyte i Kil och Boo gård, Nacka – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Kil, Nacka kommun");
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("kommunsidan på Nacka länkar till sidan (ny områdesrad)", () => {
    expect(prerenderContent("/taklaggare-nacka")!.links.map((l) => l.href)).toContain("/taklaggare-kil");
  });
});
