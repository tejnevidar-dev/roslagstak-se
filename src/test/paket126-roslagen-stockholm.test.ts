/**
 * Paket 126 (Marknadschefens grind 2026-10-18 22:40): Roslagen vässas (RV1, RÅ1, RÅ2, RÖ1, RL1, RL2) och Enskede, Älvsjö, Bro och Kungsängen får T1-formen i titeln.
 * Underlag: seo-forslag-roslagen-2026-10-18.md och seo-forslag-stockholm-titlar-2026-10-18.md.
 */
import { describe, expect, it } from "vitest";
import { resolveMeta } from "../data/overrides";
import { comboOverrides } from "../data/combo-overrides";
import { ortSeoOverrides } from "../data/seo-overrides";
import { hubLinksFor } from "../data/hub-links";
import { prerenderContent } from "../../scripts/prerender-content";

const bas = { title: "Bas", description: "Bas" };
const lankar = (p: string) => prerenderContent(p)!.links.map((l) => l.href);

describe("paket 126: Roslagen", () => {
  it("RV1 och RÅ1: ortssidornas titlar utan 'byta tak'", () => {
    expect(resolveMeta("/taklaggare-vallentuna", bas).title).toBe("Takläggare i Vallentuna – takläggning, fast pris");
    expect(resolveMeta("/taklaggare-akersberga", bas).title).toBe("Takläggare i Åkersberga – takläggning, fast pris");
    // beskrivningarna är orörda
    expect(resolveMeta("/taklaggare-vallentuna", bas).description).toBe("Takbyte och takomläggning i Vallentuna. Kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti. Svar inom 24 timmar.");
  });
  it("RÅ2: takbytessidan i Åkersberga börjar med 'Byta tak i Åkersberga?'", () => {
    expect(comboOverrides["takbyte-akersberga"].description).toBe("Byta tak i Åkersberga? Takbyte med plåt, betongpannor eller lertegel till fast pris. Boka en kostnadsfri takkontroll utan förpliktelser.");
    expect(comboOverrides["takbyte-akersberga"].description.length).toBeLessThanOrEqual(160);
    expect(prerenderContent("/takbyte-akersberga")!.description).toBe(comboOverrides["takbyte-akersberga"].description);
  });
  it("RÖ1: /omraden/osteraker har S1 'Svar inom 24 timmar' i beskrivningen och oförändrad titel", () => {
    const m = resolveMeta("/omraden/osteraker", { title: "Takläggare i Österåker – Åkersberga och Österskär", description: "x" });
    expect(m.description).toBe("Takläggare i Åkersberga, Österskär och Brevik i Österåkers kommun. Kostnadsfri takkontroll och fast pris i offerten. Svar inom 24 timmar.");
    expect(m.description.length).toBe(137);
    expect(m.title).toBe("Takläggare i Österåker – Åkersberga och Österskär");
  });
  it("RL1 och RL2: grannsidorna länkar till takbytes- och takrenoveringssidorna, orten själv och andra orter inte", () => {
    for (const s of ["taby", "ella-gard", "skarpang", "ormsta", "lindholmen"]) {
      const h = hubLinksFor(s).map((x) => x.href);
      expect(h, s).toContain("/takbyte-vallentuna");
      expect(h, s).toContain("/takrenovering-vallentuna");
    }
    for (const s of ["riala", "osterskar", "vallentuna", "taby", "ella-gard", "brevik", "ormsta"]) {
      const h = hubLinksFor(s).map((x) => x.href);
      expect(h, s).toContain("/takbyte-akersberga");
      expect(h, s).toContain("/takrenovering-akersberga");
    }
    expect(hubLinksFor("vallentuna").map((x) => x.href)).not.toContain("/takbyte-vallentuna");
    expect(hubLinksFor("akersberga").map((x) => x.href)).not.toContain("/takbyte-akersberga");
    expect(hubLinksFor("rimbo").map((x) => x.href)).not.toContain("/takbyte-vallentuna");
    expect(hubLinksFor("taby")).toContainEqual({ href: "/takbyte-vallentuna", label: "Takbyte i Vallentuna" });
    expect(lankar("/taklaggare-ormsta")).toContain("/takrenovering-akersberga");
    expect(lankar("/taklaggare-brevik")).toContain("/takbyte-akersberga");
  });
  it("RL1 och RL2 rör inte Täbys egna regionlänkar", () => {
    // gren 188: Täbys sidor länkas av Täbys egna orter (Roslagens inland), inte längre av Sollentunas orter, som länkar till sin egen kommun
    expect(hubLinksFor("ensta").map((x) => x.href)).toContain("/takrenovering-taby");
    expect(hubLinksFor("viby").map((x) => x.href)).not.toContain("/takrenovering-taby");
  });
});

describe("paket 126: Stockholmstitlarna (T1-formen)", () => {
  it("Enskede, Älvsjö, Bro och Kungsängen: '– takläggning, fast pris', beskrivningarna orörda", () => {
    expect(ortSeoOverrides.enskede.title).toBe("Takläggare i Enskede – takläggning, fast pris");
    expect(ortSeoOverrides.alvsjo.title).toBe("Takläggare i Älvsjö – takläggning, fast pris");
    expect(ortSeoOverrides.bro.title).toBe("Takläggare i Bro – takläggning, fast pris");
    expect(ortSeoOverrides.kungsangen.title).toBe("Takläggare i Kungsängen – takläggning, fast pris");
    expect(ortSeoOverrides.enskede.description).toContain("Kostnadsfri takkontroll.");
    expect(ortSeoOverrides.kungsangen.description).toContain("enplansvillor och kedjehus");
  });
  it("de övriga fyra är orörda: Huddinge, Sollentuna, Ekerö och Haninge har sina titlar", () => {
    expect(ortSeoOverrides.uppsala.title).toContain("fast pris");
    for (const s of ["huddinge", "sollentuna", "ekero", "haninge"]) expect(ortSeoOverrides[s]?.title ?? "", s).not.toContain("takläggning, fast pris");
  });
});
