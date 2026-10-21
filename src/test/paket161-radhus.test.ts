/**
 * Paket 161 (Marknadschefens grind 2026-10-21, Vidars ja till radhus): fem nya områdessidor (Krusboda, Fårdala, Slagsta, Bagarmossen, Söderby) ur villaomraden/texter/, och
 * avsnitten Fastebol/Fjällen/Lund på /taklaggare-viksjo och Östra Rudboda/Elfvik på /taklaggare-bo-rudboda (innehall/utkast/radhus-2026-10-21/radhus-avsnitt-briefrader-2026-10-21.md).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { villaAreasByPage } from "../data/villa-areas";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA: Record<string, { name: string; parent: string; titel: string }> = {
  krusboda: { name: "Krusboda", parent: "tyreso", titel: "Takläggare i Krusboda, Tyresö" },
  fardala: { name: "Fårdala", parent: "tyreso", titel: "Takläggare i Fårdala, Tyresö" },
  slagsta: { name: "Slagsta", parent: "botkyrka", titel: "Takläggare i Slagsta, Botkyrka" },
  bagarmossen: { name: "Bagarmossen", parent: "stockholm", titel: "Takläggare i Bagarmossen, Stockholm" },
  soderby: { name: "Söderby", parent: "haninge", titel: "Takläggare i Söderby, Haninge" },
};

describe("paket 161: fem nya radhussidor", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(NYA)) {
    it(`/taklaggare-${slug}: finns, har text, kommunlänk, rätt H1, står i sajtkartan och länkas från kommunens områdesrad`, () => {
      const l = locations.find((x) => x.slug === slug)!;
      expect(l, slug).toBeTruthy();
      expect(l.name).toBe(k.name);
      expect(l.parentLocation?.slug).toBe(k.parent);
      expect(l.longDescription.length, "text").toBeGreaterThan(300);
      const c = prerenderContent(`/taklaggare-${slug}`)!;
      expect(c.h1).toBe(k.titel);
      expect(c.links.map((x) => x.href)).toContain(`/taklaggare-${k.parent}`);
      expect(sitemap).toContain(`<loc>https://roslagstak.se/taklaggare-${slug}</loc>`);
      const rader = Object.values(villaAreasByPage).flatMap((m) => m.areas);
      expect(rader.some((r) => r.href === `/taklaggare-${slug}`), "områdesrad med länk").toBe(true);
      expect(JSON.stringify(l)).not.toMatch(/\.csv|alla\.csv/i);
      expect(JSON.stringify(l)).not.toMatch(/plåtarbeten/i);
    });
  }
  it("grannarna i nearbyLocations är exakta ortnamn (geo-grafens blockerande kontroll)", () => {
    for (const slug of Object.keys(NYA)) for (const n of locations.find((x) => x.slug === slug)!.nearbyLocations) expect(locations.some((x) => x.name === n), `${slug} -> ${n}`).toBe(true);
  });
});

describe("paket 161: avsnitten på Viksjö och Bo Rudboda", () => {
  it("Viksjö har avsnitten Fastebol/Andeboda och Fjällen/Lund, Bo Rudboda har Östra Rudboda/Yttringe/Elfvik", () => {
    const v = locations.find((l) => l.slug === "viksjo")!.extraSections.map((s) => s.heading);
    expect(v).toContain("Fastebol, Andeboda och Fjällen");
    expect(v).toContain("Lund");
    const b = locations.find((l) => l.slug === "bo-rudboda")!.extraSections.map((s) => s.heading);
    expect(b).toContain("Östra Rudboda, Yttringe och Elfvik");
  });
});

describe("gren 161b: länk från de fem radhussidorna till radhusguiden", () => {
  it("varje sida har meningen med länken i 'Vad det betyder för taket', och länken finns i serverns länklista", () => {
    for (const slug of Object.keys(NYA)) {
      const l = locations.find((x) => x.slug === slug)!;
      expect(l.extraSections.find((s) => s.heading === "Vad det betyder för taket")?.text, slug).toContain("Mer om takbyte på radhus finns i guiden [byta tak på radhus](/blogg/byta-tak-radhus-guide).");
      expect(prerenderContent(`/taklaggare-${slug}`)!.links.map((x) => x.href), slug).toContain("/blogg/byta-tak-radhus-guide");
    }
  });
});

describe("gren 161d: Söderbys länkar till Haninge-sidorna (strippades av importen)", () => {
  it("avsnittet 'Det här gör vi i Söderby' länkar till /takbyte-haninge och /taklaggare-haninge, och länkarna finns i serverns länklista", () => {
    const s = locations.find((l) => l.slug === "soderby")!.extraSections.find((x) => x.heading === "Det här gör vi i Söderby");
    expect(s?.text).toContain("[takbyte i Haninge](/takbyte-haninge)");
    expect(s?.text).toContain("[takläggare i Haninge](/taklaggare-haninge)");
    const hrefs = prerenderContent("/taklaggare-soderby")!.links.map((x) => x.href);
    expect(hrefs).toContain("/takbyte-haninge");
    expect(hrefs).toContain("/taklaggare-haninge");
  });
});
