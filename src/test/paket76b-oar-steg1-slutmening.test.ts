/**
 * Paket 76b (Marknadschefen 2026-10-13 09:25): steg 1 i "Så går det till" och ortstextens slutmening på de fem öarna utan bro (Svartlöga, Söderöra, Norröra, Gräskö, Arholma)
 * har exakt samma lydelser som Husarö, med öns namn. Mallens tio ställen och Högmarsö är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const STEG1 = "**Takkontroll.** Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.";
const slut = (namn: string) => `Har du hus på ${namn} och funderar på taket? Hör av dig på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.`;
const OAR: [string, string][] = [["svartloga", "Svartlöga"], ["sodorora", "Söderöra"], ["norrora", "Norröra"], ["grasko", "Gräskö"], ["arholma", "Arholma"]];

describe("paket 76b: öar utan bro, steg 1 och slutmeningen", () => {
  it.each(OAR)("%s: steg 1 och slutmeningen som Husarö, med öns namn", (slug, namn) => {
    const p = locations.find((l) => l.slug === slug)!.process!;
    expect(p.steps[0]).toBe(STEG1);
    expect(p.paragraphs[p.paragraphs.length - 1]).toBe(slut(namn));
    expect(JSON.stringify(p)).not.toContain("Kostnadsfri takkontroll utan förpliktelser");
    expect(JSON.stringify(p)).not.toContain("Boka en kostnadsfri takkontroll");
  });
  it("Husarö är oförändrad och ger samma mönster (jämförelsen håller)", () => {
    const h = locations.find((l) => l.slug === "husaro")!.process!;
    expect(h.steps[0]).toBe(STEG1);
    expect(h.paragraphs[h.paragraphs.length - 1]).toBe(slut("Husarö"));
  });
  it.each(OAR)("%s: samma text står i den statiska HTML:en", (slug, namn) => {
    const t = prerenderContent("/taklaggare-" + slug)!.paragraphs.join("\n");
    expect(t).toContain("Takkontroll. Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.");
    expect(t).toContain(slut(namn));
  });
});
