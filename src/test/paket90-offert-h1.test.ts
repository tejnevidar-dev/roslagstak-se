/**
 * Paket 90: h1 på /offert är densamma i serverns HTML (som Google läser först) som efter att React tagit över (som besökaren ser).
 * Förut skrev förrenderingen "Få offert på takbyte i Roslagen" medan QuotePage visade "Få pris på ditt takprojekt".
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 90: /offert har samma h1 före och efter React", () => {
  const sida = prerenderContent("/offert")!;
  const quote = readFileSync("src/pages/QuotePage.tsx", "utf8");
  const reactH1 = quote.match(/<PageHero[\s\S]*?title="([^"]+)"/)?.[1] ?? quote.match(/title="([^"]+)"/)?.[1];

  it("serverns h1 är den rubrik besökaren ser", () => {
    expect(reactH1).toBe("Få pris på ditt takprojekt");
    expect(sida.h1).toBe(reactH1);
  });
  it("det gamla h1 är borta ur serverns HTML för /offert och titeln är orörd", () => {
    expect(sida.h1).not.toContain("Roslagen");
    expect(sida.title).toBe("Offert på takbyte — fast pris efter kostnadsfri takkontroll");
  });
});
