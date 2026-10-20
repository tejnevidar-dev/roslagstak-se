/**
 * Paket 135 (Marknadschefens ord 2026-10-20 22:58): titel och beskrivning på sju sidor, ur innehall/gren135-tillatna-rader-2026-10-20.md.
 * Behålls: /takbyte-norrtalje, Vaxholmsguiden, BRF-guiden och takstegeguidens beskrivning.
 */
import { describe, expect, it } from "vitest";
import { taksakerhetBlocks } from "../data/service-taksakerhet";
import { blogPosts } from "../data/blog-posts";
import { resolveMeta } from "../data/overrides";
import { comboOverrides } from "../data/combo-overrides";
import { regionTexts } from "../data/region-texts";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const len = (t: string) => [...t].length;

describe("paket 135: titel och beskrivning", () => {
  const rader: [string, string, string][] = [
    ["/priser", "Takbyte pris 2026: tegel, betongpannor och plåt efter ROT", "Vad kostar takbyte med tegel, betongpannor eller plåt? Riktpriser per material efter ROT-avdrag, inkl. moms. Fast pris i offerten efter kostnadsfri takkontroll."],
    ["taksakerhet", taksakerhetBlocks.seoTitle, taksakerhetBlocks.seoDescription],
    ["moss", blogPosts.find((p) => p.slug === "ta-bort-mossa-fran-tak")!.title, blogPosts.find((p) => p.slug === "ta-bort-mossa-fran-tak")!.excerpt],
    ["lidingo", comboOverrides["takbyte-lidingo"].title, comboOverrides["takbyte-lidingo"].description],
    ["uppsala", ortSeoOverrides.uppsala.title, ortSeoOverrides.uppsala.description],
    ["spillersboda", ortSeoOverrides.spillersboda.title, ortSeoOverrides.spillersboda.description],
    ["sodra", regionTexts["Södra Stockholm"].title ?? "x", regionTexts["Södra Stockholm"].description],
  ];
  it("alla sju håller gränserna (titel högst 60, beskrivning högst 160 tecken), utan belopp och utan MATAKI", () => {
    for (const [namn, t, d] of rader) {
      expect(len(t), namn + " titel").toBeLessThanOrEqual(60);
      expect(len(d), namn + " beskrivning").toBeLessThanOrEqual(160);
      expect(t + d, namn).not.toMatch(/MATAKI|besiktning|\d\s?kr\b/i);
    }
  });
  it("/priser: serverns HTML och sidan har samma nya titel", () => {
    const c = prerenderContent("/priser")!;
    expect(c.title).toBe("Takbyte pris 2026: tegel, betongpannor och plåt efter ROT");
    expect(c.description).toBe(rader[0][2]);
  });
  it("taksäkerhet förslag A, mossguiden, Lidingö, Uppsala, Spillersboda och Södra Stockholm", () => {
    expect(taksakerhetBlocks.seoTitle).toBe("Takstege på taket i Roslagen – tegel, pannor och plåt");
    expect(rader[2][1]).toBe("Mossa på taket: ta bort, tvätta eller låta vara?");
    expect(rader[3][1]).toBe("Takbyte på Lidingö – tegel, pannor eller plåt, fast pris");
    expect(rader[4][1]).toBe("Takläggare i Uppsala – takbyte och takläggning, fast pris");
    expect(rader[5][1]).toBe("Takläggare i Spillersboda, Norrtälje – fast pris");
    expect(rader[6][2]).toContain("Takbyte och takrenovering med kostnadsfri takkontroll och fast pris i offerten.");
  });
  it("de som behålls är orörda", () => {
    expect(resolveMeta("/takbyte-norrtalje", { title: "Bas", description: "Bas" }).title).toBe("Takbyte i Norrtälje – byta tak till fast pris");
    expect(blogPosts.find((p) => p.slug === "takstege-takbrygga-sakerhet")!.excerpt).toContain("vad de kostar. Riktpriser efter ROT-avdrag, inkl. moms.");
    expect(blogPosts.find((p) => p.slug === "byta-tak-brf-guide-styrelse")!.title).toBe("Så byter ni tak i en BRF: guide för styrelsen");
  });
});
