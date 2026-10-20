/**
 * Paket 139 (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-mosstorp (Mosstorp och Stockby, Lidingö) ur villaomraden/texter/mosstorp-stockby-lidingo.md.
 * Egna koordinater (Wikipedia, Mosstorp, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "mosstorp")!;

describe("paket 139: Mosstorp och Stockby", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "mosstorp").length).toBe(1);
    expect(locations.some((l) => l.slug === "stockby" || l.slug === "trasthagen")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Mosstorp");
    expect(l.parentLocation?.slug).toBe("lidingo");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Mosstorp", url: "https://sv.wikipedia.org/wiki/Mosstorp" });
    expect(ortSeoOverrides.mosstorp.title).toBe("Takbyte i Mosstorp och Stockby, Lidingö – fast pris");
    expect(ortSeoOverrides.mosstorp.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.mosstorp.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Mosstorp och Stockby, Lidingö");
    expect(l.lat).toBe(59.35665);
    expect(l.lng).toBe(18.14087);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "lidingo")!.lat);
    expect(locationIndex.some((x) => x.slug === "mosstorp" && x.name === "Mosstorp")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och inga husåldrar utöver källans årtal", () => {
    const c = prerenderContent("/taklaggare-mosstorp")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Mosstorp och Stockby, Lidingö");
    expect(c.title).toBe("Takbyte i Mosstorp och Stockby, Lidingö – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Mosstorp");
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("kommunsidan på Lidingö länkar till sidan (kommunradens Mosstorp)", () => {
    expect(prerenderContent("/taklaggare-lidingo")!.links.map((l) => l.href)).toContain("/taklaggare-mosstorp");
  });
});
