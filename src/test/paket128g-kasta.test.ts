/**
 * Paket 128g (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-kasta (Kästa i Flemingsberg, Huddinge) ur villaomraden/texter/kasta-huddinge.md.
 * Egna koordinater (Wikipedia, Kästa, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "kasta")!;

describe("paket 128g: Kästa", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "kasta").length).toBe(1);
    expect(locations.some((l) => l.slug === "kastadal" || l.slug === "katrineberg")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Kästa");
    expect(l.parentLocation?.slug).toBe("huddinge");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Kästa", url: "https://sv.wikipedia.org/wiki/Kästa" });
    expect(ortSeoOverrides.kasta.title).toBe("Takbyte i Kästa, Huddinge – fast pris");
    expect(ortSeoOverrides.kasta.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.kasta.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Kästa, Huddinge");
    expect(l.uniqueFAQ?.question).toBe("När byggdes husen i Kästa?");
    expect(l.lat).toBe(59.22639);
    expect(l.lng).toBe(17.925);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "huddinge")!.lat);
    expect(locationIndex.some((x) => x.slug === "kasta" && x.name === "Kästa")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och texten följer briefen", () => {
    const c = prerenderContent("/taklaggare-kasta")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Kästa, Huddinge");
    expect(c.title).toBe("Takbyte i Kästa, Huddinge – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Kästa");
    expect(alla).toContain("Kästa är ett bostadsområde i kommundelen Flemingsberg i Huddinge, söder om Glömstavägen.");
    expect(alla).toContain("Kästa är i dag ett villaområde med drygt 400 hushåll, med en förskola och en skola.");
    expect(alla).toContain("går inte att se från gatan");
  });
  it("kommunsidan på Huddinge länkar till sidan (ny områdesrad)", () => {
    expect(prerenderContent("/taklaggare-huddinge")!.links.map((l) => l.href)).toContain("/taklaggare-kasta");
  });
});
