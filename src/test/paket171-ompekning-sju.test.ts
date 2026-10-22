/**
 * Gren 171 (Marknadschefens stående ja, seo-data/noindex-sidor-2026-09-18-till-2026-10-15.md, kolumnen Ägarsida): sju noindex-sidor (platttak och tegeltak × ort) som visas i Google med ett
 * ort- eller tjänst × ort-sökord pekas om med en exakt 301-rad till ägarsidan, före splat-raderna. Rader vars bästa sökord är generiskt ("tegeltak pris", "plåttak pris") står kvar under splat.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const rot = resolve(__dirname, "../..");
const rader = readFileSync(resolve(rot, "public/_redirects"), "utf8").split(/\r?\n/).map((r) => r.trim()).filter((r) => r && !r.startsWith("#"));
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
// [källa, mål, bästa sökord, visningar 28 dagar]
const SJU: [string, string, string, number][] = [
  ["/platttak-sollentuna", "/takrenovering-sollentuna", "takrenovering sollentuna", 133],
  ["/tegeltak-sollentuna", "/takrenovering-sollentuna", "takrenovering sollentuna", 65],
  ["/tegeltak-sundbyberg", "/taklaggare-sundbyberg", "tegel tak sundbyberg", 60],
  ["/platttak-solna", "/taklaggare-solna", "takläggare solna", 36],
  ["/platttak-danderyd", "/takrenovering-danderyd", "takrenovering danderyd", 30],
  ["/tegeltak-upplands-bro", "/taklaggare-bro", "takläggare bro", 29],
  ["/platttak-bro", "/taklaggare-bro", "takläggare bro", 19],
];

describe("gren 171: sju exakta 301-rader före splat-raderna", () => {
  for (const [kalla, mal, sokord] of SJU) {
    it(`${kalla} -> ${mal} (${sokord}): en exakt rad, före första splat, målet står i sajtkartan och källan inte`, () => {
      const i = rader.indexOf(`${kalla} ${mal} 301`);
      expect(i, kalla).toBeGreaterThanOrEqual(0);
      expect(rader.filter((r) => r.startsWith(kalla + " ")).length, kalla).toBe(1);
      expect(i, kalla).toBeLessThan(rader.findIndex((r) => r.split(" ")[0].endsWith("*")));
      expect(sitemap).toContain(`<loc>https://roslagstak.se${mal}</loc>`);
      expect(sitemap).not.toContain(`<loc>https://roslagstak.se${kalla}</loc>`);
    });
  }
  it("de två generiska raderna ligger kvar under splat-reglerna", () => {
    expect(rader.some((r) => r.startsWith("/tegeltak-bro "))).toBe(false);
    expect(rader.some((r) => r.startsWith("/platttak-sundbyberg "))).toBe(false);
    expect(rader).toContain("/tegeltak-* /tjanster/tegeltak 301");
    expect(rader).toContain("/platttak-* /material/tp20-plattak 301");
  });
});
