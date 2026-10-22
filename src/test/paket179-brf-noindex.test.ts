/**
 * Gren 179 (#9): BRF-ortssidorna noindex, FÖRBEREDD OCH HÅLLEN. Flaggan BRF_NOINDEX i src/data/avindexerade-brf.ts står på false tills Vidar har sagt ja (indexerbar → noindex täcks inte av det
 * stående ja:et). Provet låser att flaggan är av, att den av flaggan styrda listan är rätt (38 sidor, inte /brf själv) och att det finns en lista att lämna till Vidar.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BRF_NOINDEX, brfNoindexVagar } from "../data/avindexerade-brf";
import { brfLocationSlugs } from "../data/brf-locations";
import { isNoindexPath } from "../lib/canonical";

describe("gren 179: BRF noindex (hållen)", () => {
  it("flaggan är av, så inget är noindex än: sidorna är indexerbara och står i sajtkartan", () => {
    expect(BRF_NOINDEX).toBe(false);
    expect(brfNoindexVagar()).toEqual([]);
    const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
    for (const s of brfLocationSlugs) {
      expect(isNoindexPath(`/brf/${s}`), s).toBe(false);
      expect(sitemap, s).toContain(`<loc>https://roslagstak.se/brf/${s}</loc>`);
    }
  });
  it("listan som flaggan styr: 37 sidor under /brf/, aldrig hubben /brf", () => {
    expect(brfLocationSlugs.length).toBe(37); // arbetslistan räknade 38 inklusive hubben /brf
    expect(brfLocationSlugs.map((s) => `/brf/${s}`).every((p) => /^\/brf\/[a-z0-9-]+$/.test(p))).toBe(true);
    expect(isNoindexPath("/brf")).toBe(false);
  });
});
