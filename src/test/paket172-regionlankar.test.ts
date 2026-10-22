/**
 * Gren 172 (#15): regionsidorna länkar till de lågkonkurrenskommunernas indexerbara tjänst × ort-sidor (Sundbyberg, Botkyrka, Tumba, Nynäshamn, Ekerö, Upplands-Bro) och Södra Stockholm,
 * Nordvästra Stockholm och Västerort länkar till /taklaggare-stockholm. Inga länkar via tjänstesidor eller till ompekade adresser.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { REGION_EXTRA_LINKS } from "../data/hub-links";
import { prerenderContent } from "../../scripts/prerender-content";
import { arOmpekad } from "../data/ompekade";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");

describe("gren 172: länkar från regionsidorna", () => {
  it("Stockholmsregionerna länkar till Takläggare i Stockholm, och regionsidorna till kommunernas egna sidor", () => {
    for (const r of ["Södra Stockholm", "Nordvästra Stockholm", "Västerort"]) expect(REGION_EXTRA_LINKS[r].map((l) => l.href), r).toContain("/taklaggare-stockholm");
    expect(REGION_EXTRA_LINKS["Norra Stockholm"].map((l) => l.href)).toEqual(expect.arrayContaining(["/takbyte-sundbyberg", "/takrenovering-sundbyberg", "/takomlaggning-sundbyberg"]));
    expect(REGION_EXTRA_LINKS["Sydvästra Stockholm"].map((l) => l.href)).toEqual(expect.arrayContaining(["/takrenovering-botkyrka", "/takrenovering-tumba", "/takbyte-ekero"]));
    expect(REGION_EXTRA_LINKS["Sydöstra Stockholm"].map((l) => l.href)).toEqual(expect.arrayContaining(["/takbyte-nynashamn", "/takrenovering-nynashamn"]));
  });
  it("alla extra länkar går till indexerbara sidor i sajtkartan (ingen ompekad adress) och står i regionsidans länklista", () => {
    for (const [region, lista] of Object.entries(REGION_EXTRA_LINKS)) {
      for (const l of lista) {
        expect(arOmpekad(l.href), `${region}: ${l.href}`).toBe(false);
        expect(sitemap, `${region}: ${l.href}`).toContain(`<loc>https://roslagstak.se${l.href}</loc>`);
      }
    }
    const c = prerenderContent("/omraden/sodra-stockholm")!;
    expect(c.links.map((l) => l.href)).toContain("/taklaggare-stockholm");
  });
});
