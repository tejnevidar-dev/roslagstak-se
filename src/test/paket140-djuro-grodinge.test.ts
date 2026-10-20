/**
 * Paket 140 (Marknadschefens grind 2026-10-20): två nya områdessidor ur villaomraden/texter/: /taklaggare-djuro (Djurö och Vindö, Värmdö; bilväg över Djuröbron sedan 1962)
 * och /taklaggare-grodinge (Grödinge och Kagghamra, Botkyrka). Egna koordinater ur Wikipedia (Djuröbron respektive Grödinge socken, hämtade 2026-10-20).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { OAR_UTAN_BILVAG } from "../data/location-mall";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = (s: string) => locations.find((l) => l.slug === s)!;
const NYA = [
  { slug: "djuro", name: "Djurö", parent: "varmdo", h1: "Takläggare på Djurö och Vindö, Värmdö", titel: "Takbyte på Djurö och Vindö, Värmdö – fast pris", lat: 59.29444, lng: 18.66778, kalla: "Wikipedia, Djurö, Värmdö kommun", kommun: "/taklaggare-varmdo" },
  { slug: "grodinge", name: "Grödinge", parent: "botkyrka", h1: "Takläggare i Grödinge, Botkyrka", titel: "Takbyte i Grödinge, Botkyrka – fast pris", lat: 59.14351, lng: 17.78684, kalla: "Wikipedia, Grödinge socken", kommun: "/taklaggare-botkyrka" },
] as const;

describe("paket 140: Djurö och Grödinge", () => {
  it("adresserna är nya och krockar inte", () => {
    for (const n of NYA) expect(locations.filter((l) => l.slug === n.slug).length, n.slug).toBe(1);
  });
  it("posterna har egen text, faktaruta, källa, överordnad ort, egen titel och egna koordinater", () => {
    for (const n of NYA) {
      const l = loc(n.slug);
      expect(l.name, n.slug).toBe(n.name);
      expect(l.parentLocation?.slug, n.slug).toBe(n.parent);
      expect(l.longDescription.length, n.slug).toBeGreaterThan(300);
      expect(l.factBox?.length ?? 0, n.slug).toBeGreaterThanOrEqual(4);
      expect(l.sourceLink?.label, n.slug).toBe(n.kalla);
      expect(ortSeoOverrides[n.slug].title, n.slug).toBe(n.titel);
      expect(ortSeoOverrides[n.slug].title.length, n.slug).toBeLessThanOrEqual(60);
      expect(ortSeoOverrides[n.slug].description.length, n.slug).toBeLessThanOrEqual(160);
      expect(l.h1Override, n.slug).toBe(n.h1);
      expect(l.lat, n.slug).toBe(n.lat);
      expect(l.lng, n.slug).toBe(n.lng);
      expect(locationIndex.some((x) => x.slug === n.slug && x.name === n.name), n.slug).toBe(true);
    }
  });
  it("Djurö är en ö med bilväg: 'på', och inte bland öarna utan bilväg", () => {
    expect(loc("djuro").isIsland).toBe(true);
    expect(OAR_UTAN_BILVAG).not.toContain("djuro");
    expect(loc("grodinge").isIsland).toBe(false);
    const c = prerenderContent("/taklaggare-djuro")!;
    expect(JSON.stringify(c)).toContain("på Djurö");
    expect(JSON.stringify(c)).not.toContain("i Djurö");
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och kommunsidan länkar hit", () => {
    for (const n of NYA) {
      const c = prerenderContent(`/taklaggare-${n.slug}`)!;
      expect(c, n.slug).toBeTruthy();
      expect(c.h1, n.slug).toBe(n.h1);
      expect(c.title, n.slug).toBe(n.titel);
      const alla = [c.intro, ...c.paragraphs].join(" ");
      expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size, n.slug).toBeGreaterThanOrEqual(400);
      expect(c.paragraphs, n.slug).toContain(`Källa: ${n.kalla}`);
      expect(alla, n.slug).not.toMatch(/\b(oftast|ofta)\b/i);
      expect(prerenderContent(n.kommun)!.links.map((l) => l.href), n.slug).toContain(`/taklaggare-${n.slug}`);
    }
  });
});
