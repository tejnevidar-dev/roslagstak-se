/**
 * Paket 118: Görla och Bolkadalen på /taklaggare-norrtalje (Innehålls passrapport 179, innehall/kommunrader-lasning-2026-10-15.md).
 * Källan säger att husen mest är från 1990- och 2000-talen, så texten säger "De flesta husen här".
 */
import { describe, expect, it } from "vitest";
import { villaAreasBlocks } from "../data/villa-areas";
import { prerenderContent } from "../../scripts/prerender-content";

const NY = "De flesta husen här är alltså mellan knappt 20 och drygt 35 år gamla.";
const GAMMAL = "Husen här är alltså mellan knappt 20 och drygt 35 år gamla.";

describe("paket 118: Görla och Bolkadalen", () => {
  it("datan har 'De flesta husen här' och inte den gamla lydelsen", () => {
    const s = JSON.stringify(villaAreasBlocks("norrtalje"));
    expect(s).toContain(NY);
    expect(s).not.toContain(GAMMAL);
    expect(s).toContain("är enligt hitta.se mest från 1990- och 2000-talen. " + NY);
  });
  it("serverns HTML för /taklaggare-norrtalje har samma mening", () => {
    const sida = JSON.stringify(prerenderContent("/taklaggare-norrtalje"));
    expect(sida).toContain(NY);
    expect(sida).not.toContain(GAMMAL);
  });
});
