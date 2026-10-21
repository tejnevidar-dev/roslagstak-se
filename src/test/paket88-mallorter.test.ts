/**
 * Paket 88 (Marknadschefen 2026-10-14): hel rättning av den dolda texten på Skärholmen, Vällingby, Strängnäs och Gnesta mot regel 5.
 * Mallen skriver över fälten på live; provet låser att den rättade texten är ren om mallen någon gång tas bort,
 * och att Vällingbys tomma extraContent inte ger ett tomt stycke i React eller i serverns HTML.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { applyMall } from "@/data/location-mall";
import { prerenderContent } from "../../scripts/prerender-content";

const SLUGS = ["skarholmen", "vallingby", "strangnas", "gnesta"];
const rad = (slug: string) => locations.find((l) => l.slug === slug)!;
const allText = (slug: string) => {
  const l = rad(slug);
  return [l.description, l.longDescription, l.extraContent, l.uniqueFAQ?.question ?? "", l.uniqueFAQ?.answer ?? ""].join("\n");
};

describe("paket 88: de fyra mallorternas rådata är ren mot regel 5", () => {
  it("ingen av dem har kvar de ostödda formuleringarna", () => {
    const FORBIDDEN =
      /plåtarbeten|membrantak|kommersiell|bostadsrättsf|Bostadsrättsför|kostnadseffektiv|frostsprängning|fuktig luft|taktvätt|ärlig rekommendation|miljonprogram.*(plåttak|papptak)|monteras effektivt|korrosionsklass|oavsett om du väljer|Med ROT-avdrag/;
    for (const s of SLUGS) expect(allText(s), s).not.toMatch(FORBIDDEN);
  });
  it("Strängnäs och Gnesta har ingen egen FAQ kvar (Skärholmen fick egen text med frågan om husens byggår i gren 164); Vällingbys svar säger 'kan du få'", () => {
    for (const s of ["strangnas", "gnesta"]) expect(rad(s).uniqueFAQ, s).toBeUndefined();
    // gren 185: Vällingby har fått en egen ortstext och en egen fråga om husens byggår (briefrunda 2, 2026-10-22)
    expect(rad("vallingby").uniqueFAQ?.question).toBe("När byggdes husen i Vällingby?");
  });
  it("första stycket använder de belagda tjänstenamnen", () => {
    // gren 185: Vällingbys första stycke är den nya ortstexten (briefrunda 2)
    expect(rad("vallingby").longDescription).toContain("Vällingby är en stadsdel i Västerort");
    expect(rad("strangnas").longDescription).toContain("Vi tar uppdrag i Strängnäs med takbyte, takomläggning och takrenovering.");
    expect(rad("gnesta").longDescription).toContain("Vi tar uppdrag i Gnesta med takbyte, takomläggning, takrenovering och hängrännor.");
    expect(rad("gnesta").extraContent).toContain("går igenom om renovering eller byte är rätt för taket");
  });
});

describe("paket 88: tom extraContent (Vällingby) ger inget tomt stycke", () => {
  it("fältet är en tom sträng (typen kräver strängen) och mallen använder redan samma värde", () => {
    expect(rad("vallingby").extraContent).toBe("");
    expect(applyMall(rad("skarholmen")).extraContent).toBe("");
  });
  it("React och serverns HTML ritar extraContent bara när den har text", () => {
    expect(readFileSync("src/pages/LocationPage.tsx", "utf8")).toMatch(/\{location\.extraContent && \(/);
    expect(readFileSync("scripts/prerender-content.ts", "utf8")).toContain("...(loc.extraContent ? [loc.extraContent] : [])");
  });
  it("serverns HTML för de fyra sidorna har inga tomma stycken", () => {
    for (const s of SLUGS) {
      const sida = prerenderContent("/taklaggare-" + s)!;
      for (const p of sida.paragraphs) if (typeof p === "string") expect(p.trim(), s).not.toBe("");
    }
  });
  it("utan mall: rådatans stycken (som serverns HTML bygger dem) har inget tomt stycke", () => {
    const l = rad("vallingby");
    const stycken = [l.longDescription, ...(l.extraContent ? [l.extraContent] : [])];
    expect(stycken.every((p) => p.trim() !== "")).toBe(true);
    expect(stycken).toHaveLength(1);
  });
});
