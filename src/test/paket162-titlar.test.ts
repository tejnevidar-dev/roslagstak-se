/**
 * Paket 162 (Marknadschefens grind 2026-10-21, innehåll: seo-forslag-gren162-titlar-2026-10-21.md): ny titel på /taklaggare-stockholm, /takbyte-stockholm och /taklaggare-sollentuna.
 * Västerås fick nej (Vidar vill bara ha Mälardalen närmast Stockholm). Förslag 1, 2 och 7 väntar (titlar ändrade 2026-10-04–18 är fortfarande i mätfönstret).
 */
import { describe, expect, it } from "vitest";
import { ortSeoOverrides } from "../data/seo-overrides";
import { comboOverrides } from "../data/combo-overrides";
import { resolveMeta } from "../data/overrides";

const bas = { title: "Bas", description: "Bas" };
const med = (t: string) => ([...t].length + 13 <= 60 ? `${t} | RoslagsTak` : t);

describe("paket 162: titlar", () => {
  it("de tre nya titlarna", () => {
    expect(ortSeoOverrides.stockholm.title).toBe("Takläggare i Stockholm – takbyte, fast pris");
    expect(comboOverrides["takbyte-stockholm"].title).toBe("Byta tak i Stockholm – takbyte, fast pris");
    expect(ortSeoOverrides.sollentuna.title).toBe("Takläggare i Sollentuna – byta tak, fast pris");
  });
  it("inom 60 tecken med suffixet, och inga belopp, MATAKI eller besiktning", () => {
    for (const t of [ortSeoOverrides.stockholm.title, comboOverrides["takbyte-stockholm"].title, ortSeoOverrides.sollentuna.title]) {
      expect([...med(t)].length, t).toBeLessThanOrEqual(60);
      expect(t).not.toMatch(/MATAKI|besiktning|\d\s?kr\b/i);
    }
  });
  it("Västerås och Vallentuna är orörda (nej respektive väntar), och beskrivningen på Stockholm är densamma som förut", () => {
    expect(ortSeoOverrides.vasteras.title).toBe("Takläggare i Västerås – fast pris efter takkontroll");
    expect(resolveMeta("/taklaggare-vallentuna", bas).title).toBe("Takläggare i Vallentuna – takläggning, fast pris");
    expect(ortSeoOverrides.stockholm.description).toBe("Takläggare i Stockholm: takbyte och takomläggning i ytterstadens villor, från Bromma och Hässelby till Enskede. Kostnadsfri takkontroll och fast pris.");
  });
});
