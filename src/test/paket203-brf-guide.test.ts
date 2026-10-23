/**
 * Gren 203 (Innehålls `guider-regel5-2026-10-24.md`, grindsvar 336): fem rättelser i guiden /blogg/byta-tak-brf-guide-styrelse. "Mälardalen" bara på regionsidan (B2), och "ofta", "största" och "bästa" borta.
 * Texten ligger i koden (blog-posts.ts), inte i en brief. Ingen annan mening är ändrad.
 */
import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "../data/blog-posts";

const post = getBlogPostBySlug("byta-tak-brf-guide-styrelse")!;
const text = JSON.stringify(post);

describe("gren 203: BRF-guiden", () => {
  it("guiden finns", () => expect(post).toBeDefined());
  it("de fem nya meningarna står i guiden", () => {
    for (const m of [
      "Vi tar uppdrag från bostadsrättsföreningar i Storstockholm och Roslagen.",
      "Ett takbyte är en stor enskild utgift i en bostadsrättsförening, och ett beslut som ska hålla inför både medlemmar och nästa styrelse.",
      "större ombyggnader kan tas upp på föreningsstämman.",
      "Ett takbyte kan finansieras via föreningens underhållsfond, banklån, en justering av årsavgiften eller en kombination.",
      "Ett bra läge för ett beslut är när taket är slitet men inte har börjat läcka.",
    ])
      expect(text, m).toContain(m);
  });
  it("de gamla lydelserna och orden som bryter mot regeln är borta", () => {
    for (const ord of ["Mälardalen", "största enskilda", "tas ofta upp", "finansieras ofta", "Det bästa läget"]) expect(text, ord).not.toContain(ord);
  });
});
