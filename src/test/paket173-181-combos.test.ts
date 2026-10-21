/**
 * Gren 173 och 181 (Marknadschefens ord 2026-10-21 22:31 och 22:41): tre nya tjänst × ort-sidor (takbyte Värmdö, takomläggning Järfälla, takrenovering Vaxholm; ortstexter/*.md)
 * och taktvätt våg 2 (Upplands Väsby, Huddinge, Danderyd, Tyresö, Nacka). De blir indexerbara, står i sajtkartan, och de två 301-rader som låg på Järfälla-omläggningen och
 * Vaxholm-renoveringen (gren 129) är borttagna eftersom sidorna nu har egen text. Taktvättssidorna följer samma regler som gren 165 (bara Vidars rad 9).
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
const TRE: [string, string][] = [["takbyte", "varmdo"], ["takomlaggning", "jarfalla"], ["takrenovering", "vaxholm"]];
const TAKTVATT = ["upplands-vasby", "huddinge", "danderyd", "tyreso", "nacka"];

describe("gren 173: tre nya tjänst × ort-sidor", () => {
  for (const [t, o] of TRE) {
    it(`/${t}-${o}: egen text, indexerbar, i sajtkartan, inte ompekad, länk till ortssidan`, () => {
      const k = `${t}-${o}`; const c = comboOverrides[k];
      expect(c, k).toBeTruthy();
      expect([...c.title].length).toBeLessThanOrEqual(60);
      expect([...c.description].length).toBeLessThanOrEqual(160);
      expect(c.content.length).toBeGreaterThanOrEqual(20);
      expect(isThinCombo(t, locations.find((l) => l.slug === o)!)).toBe(false);
      expect(arOmpekad(`/${k}`)).toBe(false);
      expect(redirects).not.toMatch(new RegExp(`^/${k} `, "m"));
      expect(sitemap).toContain(`<loc>https://roslagstak.se/${k}</loc>`);
      expect(c.content.join(" ")).toContain(`](/taklaggare-${o})`);
      expect(prerenderContent(`/${k}`)!.links.map((l) => l.href)).toContain(`/taklaggare-${o}`);
    });
  }
});

describe("gren 181: taktvätt våg 2", () => {
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
