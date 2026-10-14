/**
 * Paket 90 (del 2): h1 på /hur-det-gar-till är densamma i serverns HTML som efter React. Förut skrev förrenderingen "Så går ett takbyte till — steg för steg"
 * (som också är sidans titel) medan ProcessPage visar "Ett takbyte, steg för steg". Titel och övrig text är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 90: /hur-det-gar-till har samma h1 före och efter React", () => {
  const sida = prerenderContent("/hur-det-gar-till")!;
  const process = readFileSync("src/pages/ProcessPage.tsx", "utf8");
  const reactH1 = process.match(/<PageHero[\s\S]*?title="([^"]+)"/)?.[1];

  it("serverns h1 är den rubrik besökaren ser", () => {
    expect(reactH1).toBe("Ett takbyte, steg för steg");
    expect(sida.h1).toBe(reactH1);
  });
  it("titeln är orörd: 'Så går ett takbyte till — steg för steg' (utan suffix i förrenderingen)", () => {
    expect(sida.title).toBe("Så går ett takbyte till — steg för steg");
    expect(process).toContain('title="Så går ett takbyte till — steg för steg | RoslagsTak"');
  });
  it("ingressen och stycketexten är oförändrade", () => {
    expect(sida.intro).toBe("Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.");
    expect(sida.paragraphs.join("\n")).toContain("Ordningen är underlag, läkt, takmaterial och plåtdetaljer.");
  });
});
