/**
 * Paket 131c (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-taby-kyrkby (Täby kyrkby med Runborg och Byle) ur villaomraden/texter/taby-kyrkby-taby.md,
 * med länk från Karlslund-sidan (H1 "… och Täby kyrkby"). Egna koordinater: Wikipedia, Täby kyrkby, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "taby-kyrkby")!;

describe("paket 131c: Täby kyrkby", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "taby-kyrkby").length).toBe(1);
    expect(locations.some((l) => l.slug === "runborg")).toBe(false);
  });
  it("posten har egen text, faktaruta, källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Täby kyrkby");
    expect(l.parentLocation?.slug).toBe("taby");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink?.url).toMatch(/^https:\/\//);
    expect(ortSeoOverrides["taby-kyrkby"].title).toBe("Takbyte i Täby kyrkby – fast pris efter takkontroll");
    expect(ortSeoOverrides["taby-kyrkby"].title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides["taby-kyrkby"].description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Täby kyrkby, Täby");
    expect(l.lat).toBe(59.49167);
    expect(l.lng).toBe(18.06667);
    expect(locationIndex.some((x) => x.slug === "taby-kyrkby" && x.name === "Täby kyrkby")).toBe(true);
  });
  it("serverns HTML har rubrik, titel och 400 unika ord, utan ofta/oftast", () => {
    const c = prerenderContent("/taklaggare-taby-kyrkby")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Täby kyrkby, Täby");
    expect(c.title).toBe("Takbyte i Täby kyrkby – fast pris efter takkontroll");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("Karlslund-sidan länkar hit (närområdet), och Karlslunds egen text är orörd", () => {
    expect(locations.find((l) => l.slug === "karlslund")!.nearbyLocations).toContain("Täby kyrkby");
    expect(prerenderContent("/taklaggare-karlslund")!.links.map((l) => l.href)).toContain("/taklaggare-taby-kyrkby");
    expect(prerenderContent("/taklaggare-karlslund")!.h1).toBe("Takläggare i Karlslund och Täby kyrkby");
  });
});
