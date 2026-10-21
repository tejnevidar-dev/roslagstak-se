/**
 * Paket 127 (Marknadschefens grind 2026-10-18): tre nya områdessidor ur villaomraden/texter/ (Älvnäs i Ekerö, Brevikshalvön i Tyresö, Bo och Rudboda på Lidingö).
 * Brevikshalvön heter "på Brevikshalvön" utan att vara en ö (ortPrep). Tullinge villastad blir ingen sida.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortPrep } from "../data/ort-prep";
import { ortSeoOverrides } from "../data/seo-overrides";
import { hubLinksFor } from "../data/hub-links";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA = [
  { slug: "alvnas", name: "Älvnäs", prep: "i", h1: "Takläggare i Älvnäs, Ekerö", parent: "ekero", titel: "Takbyte i Älvnäs, Ekerö – fast pris" },
  { slug: "brevikshalvon", name: "Brevikshalvön", prep: "på", h1: "Takläggare på Brevikshalvön, Tyresö", parent: "tyreso", titel: "Takbyte på Brevikshalvön, Tyresö – fast pris" },
  { slug: "bo-rudboda", name: "Bo och Rudboda", prep: "i", h1: "Takläggare i Bo och Rudboda, Lidingö", parent: "lidingo", titel: "Takbyte i Bo och Rudboda, Lidingö – fast pris" },
] as const;

describe("paket 127: tre nya områdessidor", () => {
  it("adresserna är nya och krockar inte: ingen annan ort har samma slug, och /taklaggare-brevik är fortfarande Österåker", () => {
    for (const n of NYA) expect(locations.filter((l) => l.slug === n.slug).length, n.slug).toBe(1);
    expect(locations.find((l) => l.slug === "brevik")!.region).toBe("Österåker");
    expect(locations.some((l) => l.slug === "tullinge-villastad" || l.slug.startsWith("tullinge-v"))).toBe(false);
  });
  it("posterna har egen text, faktaruta, källa, överordnad ort och egen titel", () => {
    for (const n of NYA) {
      const l = locations.find((x) => x.slug === n.slug)!;
      expect(l.name, n.slug).toBe(n.name);
      expect(l.parentLocation?.slug, n.slug).toBe(n.parent);
      expect(l.isIsland, n.slug).toBe(false);
      expect(l.longDescription.length, n.slug).toBeGreaterThan(300);
      expect(l.factBox?.length ?? 0, n.slug).toBeGreaterThanOrEqual(4);
      if (n.slug !== "alvnas") expect(l.sourceLink?.url, n.slug).toMatch(/^https:\/\//); // Älvnäs-briefen har ingen kommunlänk i Källor
      expect(ortSeoOverrides[n.slug].title, n.slug).toBe(n.titel);
      expect(ortSeoOverrides[n.slug].title.length, n.slug).toBeLessThanOrEqual(60);
      expect(ortSeoOverrides[n.slug].description.length, n.slug).toBeLessThanOrEqual(160);
      expect(l.h1Override, n.slug).toBe(n.h1);
    }
  });
  it("ortsindexet har de tre", () => {
    for (const n of NYA) expect(locationIndex.some((l) => l.slug === n.slug && l.name === n.name), n.slug).toBe(true);
  });
});

describe("paket 127: prepositionen", () => {
  it("ortPrep: Brevikshalvön är 'på' utan att vara en ö, öar är 'på', övriga 'i'", () => {
    expect(ortPrep({ slug: "brevikshalvon", isIsland: false })).toBe("på");
    expect(ortPrep({ slug: "alvnas", isIsland: false })).toBe("i");
    expect(ortPrep({ slug: "ekero", isIsland: true })).toBe("på");
    expect(ortPrep({ slug: "taby" })).toBe("i");
    for (const l of locations) expect(ortPrep(l), l.slug).toBe(l.isIsland || ["brevikshalvon", "sodermalm", "varmdo"].includes(l.slug) ? "på" : "i"); // gren 170 (L4): Södermalm och Värmdö heter "på"
  });
  it("Brevikshalvön får 'på' i frågor och länktexter men inget ö-innehåll", () => {
    const c = prerenderContent("/taklaggare-brevikshalvon")!;
    const alla = JSON.stringify(c);
    expect(alla).not.toContain("i Brevikshalvön");
    expect(alla).toContain("på Brevikshalvön");
    expect(alla).not.toContain("Ö i skärgården");
    expect(alla).not.toContain("Vi tar uppdrag i skärgården");
    expect(c.paragraphs.some((p) => p.startsWith("Hur bokar jag en kostnadsfri takkontroll på Brevikshalvön?"))).toBe(true);
  });
});

describe("paket 127: sidorna i serverns HTML och länkarna dit", () => {
  it("rubrik, titel och faktaruta finns, och 400 unika ord klaras (Raksta är kortast)", () => {
    for (const n of NYA) {
      const c = prerenderContent(`/taklaggare-${n.slug}`)!;
      expect(c, n.slug).toBeTruthy();
      expect(c.h1, n.slug).toBe(n.h1);
      expect(c.title, n.slug).toBe(n.titel);
      const ord = new Set([c.intro, ...c.paragraphs].join(" ").toLowerCase().split(/\s+/).filter(Boolean));
      expect(ord.size, n.slug).toBeGreaterThanOrEqual(400);
    }
  });
  it("kommunsidorna länkar till de nya områdena (villaområdesraderna)", () => {
    const lank = (p: string) => prerenderContent(p)!.links.map((l) => l.href);
    expect(lank("/taklaggare-ekero")).toContain("/taklaggare-alvnas");
    expect(lank("/taklaggare-tyreso")).toContain("/taklaggare-brevikshalvon");
    expect(lank("/taklaggare-lidingo")).toContain("/taklaggare-bo-rudboda");
  });
  it("Brevikshalvön har egna tjänstesidor i mallen men hubreglerna är orörda", () => {
    expect(hubLinksFor("brevikshalvon").map((h) => h.href)).not.toContain("/takbyte-brevikshalvon");
  });
});
