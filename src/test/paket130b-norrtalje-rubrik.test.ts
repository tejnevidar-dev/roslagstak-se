/**
 * Paket 130b: rubriken "Takbyte och takrenovering i <ort>" som LocationPage.tsx ritar före sidans text finns också i serverns HTML på sidor med avstängda mallavsnitt (Norrtälje, paket 72).
 * Övriga ortssidor är oförändrade i serverns HTML.
 */
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 130b: rubriken före sidans text i serverns HTML", () => {
  it("Norrtälje har rubriken, direkt före den första texten", () => {
    const c = prerenderContent("/taklaggare-norrtalje")!;
    const i = c.paragraphs.findIndex((p) => p.startsWith("Takbyte och takrenovering i Norrtälje"));
    expect(i).toBe(0);
  });
  it("Täby och Hallstavik får ingen ny rubrik", () => {
    for (const s of ["taby", "hallstavik", "grisslehamn"]) {
      const c = prerenderContent(`/taklaggare-${s}`)!;
      expect(c.paragraphs.some((p) => p.startsWith("Takbyte och takrenovering i ")), s).toBe(false);
    }
  });
});
