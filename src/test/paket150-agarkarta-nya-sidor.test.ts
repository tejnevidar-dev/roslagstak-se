/**
 * Paket 150 (rad 15 i pushdagslistan, Marknadschefens grind 2026-10-20): de tolv nya tjänstesidorna får länkmeningen "Mer om orten finns på sidan om takläggare i <ort>",
 * ordagrant ur innehall/agarkarta-A-nya-sidor-briefrader-2026-10-20.md.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TOLV = ["takbyte-botkyrka", "takbyte-bromma", "takbyte-nynashamn", "takbyte-sigtuna", "takomlaggning-enskede", "takomlaggning-lidingo", "takomlaggning-nacka", "takomlaggning-stockholm", "takrenovering-bromma", "takrenovering-stockholm", "takrenovering-tullinge", "takrenovering-varmdo"];
const RE = /Mer om orten finns på sidan om \[takläggare (?:i|på) [^\]]+\]\(\/taklaggare-([a-z0-9-]+)\)\./;

describe("paket 150: länkmeningen på de tolv nya tjänstesidorna", () => {
  it("varje sida har meningen en gång, den länkar till en ortssida som finns, och serverns HTML har länken", () => {
    for (const k of TOLV) {
      const t = comboOverrides[k].content.join(" ");
      expect(t.split("Mer om orten finns på sidan om").length - 1, k).toBe(1);
      const m = t.match(RE);
      expect(m, k).toBeTruthy();
      expect(locations.some((l) => l.slug === m![1]), k).toBe(true);
      expect(prerenderContent(`/${k}`)!.links.some((l) => l.href === `/taklaggare-${m![1]}`), k).toBe(true);
      expect(t.match(/Mer om orten finns på sidan om[^.]*\./)![0], k).not.toMatch(/\bofta\b/);
    }
  });
});
