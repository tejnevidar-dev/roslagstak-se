/**
 * Gren 206 (regel 5, Marknadschefens ruta 2026-10-24 05:27): BRF-sidornas texter i src/data/brf-sections.ts. (a) MATAKI-raden är G2 ordagrant ("Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor."),
 * (b) "Takbyten finansieras ofta" blir "Ett takbyte kan finansieras", som 203-4. Delas av BrfPage.tsx (React, /brf och 38 BRF-orter) och scripts/prerender-content.ts (serverns HTML).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { brfLocationSlugs } from "../data/brf-locations";
import { BRF_FACTS } from "../data/brf-sections";
import { prerenderContent } from "../../scripts/prerender-content";

const G2 = "Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.";
const text = (u: string) => JSON.stringify(prerenderContent(u) ?? {});

describe("gren 206: BRF-sidornas regel 5", () => {
  it("MATAKI-raden är G2 ordagrant och 'finansieras ofta' är borta ur brf-sections.ts", () => {
    expect(BRF_FACTS.find((f) => f.label === "Tätskikt")?.value).toBe(G2);
    const k = readFileSync("src/data/brf-sections.ts", "utf8");
    expect(k).not.toContain("finansieras ofta");
    expect(k).not.toContain('"30 års garanti via tillverkaren MATAKI"');
    expect(k).toContain("Ett takbyte kan finansieras via föreningens underhållsfond");
  });
  for (const slug of ["", ...brfLocationSlugs.map((s) => `/${s}`)]) {
    it(`/brf${slug}: G2 ordagrant och 'kan finansieras' i serverns HTML, inget 'finansieras ofta'`, () => {
      const t = text(`/brf${slug}`);
      expect(t).toContain(G2.replace(/"/g, '\\"'));
      expect(t).toContain("Ett takbyte kan finansieras via föreningens underhållsfond");
      expect(t).not.toContain("finansieras ofta");
      expect(t).not.toMatch(/30 års garanti via tillverkaren MATAKI(?!, på tillverkarens villkor)/);
    });
  }
});
