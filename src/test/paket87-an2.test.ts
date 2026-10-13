/**
 * Paket 87 (An2, Innehåll leverans 2026-10-13 Del 1 och Del 8, Marknadschefen 2026-10-13 23:25): ingressen på /offert/norrtalje skriver öarna med rätt preposition
 * ("på Vätö, Blidö och Singö"). Texten ligger i ad-landings.ts, som React och serverns HTML delar. Inget nytt påstående.
 */
import { describe, expect, it } from "vitest";
import { adLandings, adLandingCopy, getAdLanding } from "@/data/ad-landings";
import { noindexPageBody } from "../../scripts/prerender-content";

const NY = "Vi tar uppdrag i Norrtälje, Rimbo, Hallstavik och Grisslehamn, på Vätö, Blidö och Singö och i närområdet.";
const GAMMAL = "Vi tar uppdrag i Norrtälje, Rimbo, Hallstavik, Vätö, Blidö, Singö, Grisslehamn och närområdet.";

describe("paket 87: An2, prepositionerna för öarna på /offert/norrtalje", () => {
  it("ingressen har den nya lydelsen, i datan och i serverns HTML, och inte den gamla", () => {
    const c = adLandingCopy(getAdLanding("norrtalje")!);
    expect(c.intro).toContain(NY);
    expect(c.intro).not.toContain(GAMMAL);
    const sida = noindexPageBody("/offert/norrtalje")!;
    expect(sida.intro).toContain(NY);
  });
  it("de andra annonssidorna är oförändrade (bara norrtalje har öar med ny lydelse)", () => {
    for (const l of adLandings) {
      if (l.slug === "norrtalje") continue;
      expect(l.areas, l.slug).not.toContain(" på ");
    }
    expect(getAdLanding("hallstavik")!.areas).toBe("Hallstavik, Norrtälje, Rimbo, Väddö och närområdet");
    expect(getAdLanding("taby")!.areas).toBe("Täby, Vallentuna, Danderyd, Åkersberga och närområdet");
  });
});
