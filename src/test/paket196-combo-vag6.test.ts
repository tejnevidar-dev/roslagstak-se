/**
 * Gren 196 (Marknadschefens grindsvar 316): combo våg 6, fem tjänst × ort-sidor som hade mallens dolda text (takrenovering Nynäshamn, Botkyrka, Tumba, Järna, Lidingö och Järfälla,
 * takbyte Stuvsta och Vega). De får egen text, blir indexerbara och står i sajtkartan. Texterna delas ur innehall/combo-vag4-2026-10-22.md och combo-vag5-2026-10-22.md av gren187-dela.mjs.
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
const SIDOR: [string, string][] = [["takrenovering", "nacka"], ["takbyte", "vasterhaninge"], ["takbyte", "dalaro"], ["takomlaggning", "solna"], ["takomlaggning", "varmdo"]];

describe("gren 196: combo våg 6", () => {
  for (const [t, o] of SIDOR) {
    it(`/${t}-${o}: egen text, titel och meta inom gränserna, indexerbar, i sajtkartan, inte ompekad och med länk till ortssidan`, () => {
      const k = `${t}-${o}`;
      const c = comboOverrides[k];
      expect(c, k).toBeTruthy();
      expect([...c.title].length).toBeLessThanOrEqual(60);
      expect([...c.description].length).toBeLessThanOrEqual(160);
      expect(c.content.length).toBeGreaterThanOrEqual(15);
      expect(isThinCombo(t, locations.find((l) => l.slug === o)!)).toBe(false);
      expect(arOmpekad(`/${k}`)).toBe(false);
      expect(redirects).not.toMatch(new RegExp(`^/${k} `, "m"));
      expect(sitemap).toContain(`<loc>https://roslagstak.se/${k}</loc>`);
      expect(c.content.join(" ")).toContain(`](/taklaggare-${o})`);
      expect(c.content.join(" ")).not.toMatch(/\boftast\b|\b(har|finns det|används) ofta\b|behöv[ae]r ses över/);
      expect(prerenderContent(`/${k}`)!.links.map((l) => l.href)).toContain(`/taklaggare-${o}`);
    });
  }
});
