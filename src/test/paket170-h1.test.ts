/**
 * Gren 170 (innehall/h1-rattningar-2026-10-21.md, Marknadschefens grind 2026-10-21 22:31): M4 fem tjänstesidors H1 som hela rubriker, L4 "på Södermalm" och "på Värmdö" i H1, titel och
 * genererade meningar, L3 kakrutans rubrik är ett stycke så att sidans H1 är den första rubriken i DOM:en.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { locations } from "../data/locations";
import { ortPrep } from "../data/ort-prep";
import { prerenderContent } from "../../scripts/prerender-content";

describe("gren 170", () => {
  it("M4: fem tjänstesidors H1", () => {
    const h1 = (p: string) => prerenderContent(p)!.h1;
    expect(h1("/tjanster/tegeltak")).toBe("Tegeltak i lertegel – nytt tak till fast pris");
    expect(h1("/tjanster/takrenovering")).toBe("Takrenovering – åtgärda taket utan helt takbyte");
    expect(h1("/tjanster/takkupor")).toBe("Takkupor och takfönster – kostnadsfri takkontroll");
    expect(h1("/tjanster/takinspektion")).toBe("Takinspektion: så går vår kostnadsfria takkontroll till");
    expect(h1("/tjanster/taktvatt")).toBe("Taktvätt av betongpannetak och plåttak");
    for (const p of ["/tjanster/tegeltak", "/tjanster/takrenovering", "/tjanster/takkupor", "/tjanster/takinspektion", "/tjanster/taktvatt"]) expect(h1(p), p).not.toContain("&");
  });
  it("L4: Södermalm och Värmdö har 'på' i H1, titel och genererade meningar, och är ändå ingen ö", () => {
    for (const s of ["sodermalm", "varmdo"]) {
      const l = locations.find((x) => x.slug === s)!;
      expect(ortPrep(l)).toBe("på");
      expect(l.isIsland).toBeFalsy();
      const c = prerenderContent(`/taklaggare-${s}`)!;
      expect(c.h1, s).toMatch(/^Takläggare på /);
      expect(c.title, s).toMatch(/^Takläggare på /);
      expect(JSON.stringify(c.paragraphs), s).not.toMatch(new RegExp(`i ${l.name}[?.,]`));
    }
  });
  it("L3: kakrutans rubrik är inte en h2, varken i React eller i den statiska HTML:en", () => {
    expect(readFileSync("src/components/CookieBanner.tsx", "utf8")).not.toMatch(/<h2 id="cookie-title"/);
    expect(readFileSync("scripts/generate-static-heads.mjs", "utf8")).not.toMatch(/<h2 id="cookie-title"/);
  });
});
