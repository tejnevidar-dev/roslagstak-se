/**
 * Paket 141 (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-alvsala (Älvsala och Bullandö, Värmdö) ur villaomraden/texter/alvsala-bullando-varmdo.md.
 * Egna koordinater (Wikipedia, Älvsala, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "alvsala")!;

describe("paket 141: Älvsala och Bullandö", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "alvsala").length).toBe(1);
    expect(locations.some((l) => l.slug === "bullando" || l.slug === "fagerdala")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Älvsala");
    expect(l.parentLocation?.slug).toBe("varmdo");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Älvsala", url: "https://sv.wikipedia.org/wiki/Älvsala" });
    expect(ortSeoOverrides.alvsala.title).toBe("Takbyte i Älvsala och Bullandö, Värmdö – fast pris");
    expect(ortSeoOverrides.alvsala.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.alvsala.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Älvsala och Bullandö, Värmdö");
    expect(l.lat).toBe(59.30389);
    expect(l.lng).toBe(18.635);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "varmdo")!.lat);
    expect(locationIndex.some((x) => x.slug === "alvsala" && x.name === "Älvsala")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och inga husåldrar utöver källans årtal", () => {
    const c = prerenderContent("/taklaggare-alvsala")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Älvsala och Bullandö, Värmdö");
    expect(c.title).toBe("Takbyte i Älvsala och Bullandö, Värmdö – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Älvsala");
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("kommunsidan på Värmdö länkar till sidan (kommunradens Älvsala och Bullandö)", () => {
    expect(prerenderContent("/taklaggare-varmdo")!.links.map((l) => l.href)).toContain("/taklaggare-alvsala");
  });
});
