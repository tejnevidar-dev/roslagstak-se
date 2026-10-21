/**
 * Gren 184 (Marknadschefens grindsvar 284): taktvätt våg 3 (Södertälje, Sundbyberg, Stockholm, Värmdö och Åkersberga). De blir indexerbara, står i sajtkartan, har egen text
 * utan förbjudna ord och hetvatten som metod (Vidars rad 9, samma regler som gren 165 och 181).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { comboOverrides } from "../data/combo-overrides";
import { locations } from "../data/locations";
import { isThinCombo } from "../data/thin-combos";
import { arOmpekad } from "../data/ompekade";
import { prerenderContent } from "../../scripts/prerender-content";

const rot = resolve(__dirname, "../..");
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const redirects = readFileSync(resolve(rot, "public/_redirects"), "utf8");
const FORBJUDET = /lertegel|eternit|asbest|högtryck|rännrensning|efterbehandling|\bAMA\b|ROT-avdrag|garanti|skonsam|\d\s?kr\b/i;
const TAKTVATT = ["sodertalje", "sundbyberg", "stockholm", "varmdo", "akersberga"];

describe("gren 184: taktvätt våg 3", () => {
  for (const o of TAKTVATT) {
    it(`/taktvatt-${o}: egen text utan förbjudna ord, indexerbar och i sajtkartan, med hetvatten och länk till ortssidan`, () => {
      const k = `taktvatt-${o}`; const c = comboOverrides[k];
      expect(c, k).toBeTruthy();
      expect([...c.title].length).toBeLessThanOrEqual(60);
      expect([...c.description].length).toBeLessThanOrEqual(160);
      expect(isThinCombo("taktvatt", locations.find((l) => l.slug === o)!)).toBe(false);
      expect(sitemap).toContain(`<loc>https://roslagstak.se/taktvatt-${o}</loc>`);
      expect([c.title, c.description, ...c.content].join(" ")).not.toMatch(FORBJUDET);
      expect(c.content.join(" ")).toMatch(/hetvatten/);
      expect(c.content.join(" ")).toContain(`](/taklaggare-${o})`);
      expect(prerenderContent(`/${k}`)!.h1).toMatch(/^Taktvätt (i|på) /);
    });
  }
});
