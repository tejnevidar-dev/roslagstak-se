/**
 * Paket 134 (Marknadschefens grind 2026-10-20 21:50): vässa Roslagen. Vallentuna och Hallstavik (innehall/roslagen-vassa-briefrader-2026-10-20.md, 10 byten och två nya avsnitt),
 * regionsidan Norra Roslagen (innehall/norra-roslagen-vassa-briefrader-2026-10-20.md, 4 byten) och Norrtälje-länkarna (seo-forslag-norrtalje-lankar-2026-10-20.md).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { regionTexts } from "../data/region-texts";
import { hubLinksFor } from "../data/hub-links";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = (s: string) => locations.find((l) => l.slug === s)!;
const allText = (s: string) => JSON.stringify([loc(s).longDescription, loc(s).extraSections]);

describe("paket 134: Vallentuna", () => {
  it("stationen 1885, Kragstalund och grönstråket, Karby torg och meningen om att byta tak", () => {
    const t = allText("vallentuna");
    expect(t).toContain("Vallentuna fick en station redan när järnvägen Stockholm–Rimbo invigdes 1885");
    expect(t).toContain("Kragstalund, i kommunens södra del, fick sin station på Roslagsbanan 1993.");
    expect(t).toContain("Kring Karby torg är husen enligt hitta.se mest från 1970- och 1980-talen.");
    expect(t).toContain("Ska du byta tak i Vallentuna börjar vi med en kostnadsfri takkontroll utan förpliktelser.");
  });
  it("nytt avsnitt 'Kyrkan vid Vallentunasjön' direkt efter 'Tätorten längs Roslagsbanan', före Lindholmen", () => {
    const rubriker = loc("vallentuna").extraSections!.map((s) => s.heading);
    const i = rubriker.indexOf("Kyrkan vid Vallentunasjön");
    expect(i).toBeGreaterThan(0);
    expect(rubriker[i - 1]).toBe("Tätorten längs Roslagsbanan");
    expect(rubriker[i + 1]).toBe("Lindholmen");
  });
  it("lydelserna följer dagens regler: underlaget, K2 och gården, inget 'ofta' i tillägget", () => {
    const t = allText("vallentuna");
    expect(t).toContain("hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
    expect(t).not.toContain("ett slitet underlag");
    expect(t).toContain("På en gård kan det finnas fler tak än bostadshusets, till exempel uthus och bodar.");
    expect(t).not.toContain("behöver ses över ibland");
  });
});

describe("paket 134: Hallstavik", () => {
  it("avsnittet 'Två gamla socknar' först bland avsnitten, med länk till Herräng, järnvägen och sökordet", () => {
    const e = loc("hallstavik").extraSections!;
    expect(e[0].heading).toBe("Två gamla socknar");
    expect(e[0].text).toContain("[Herräng](/taklaggare-herrang)");
    const t = allText("hallstavik");
    expect(t).toContain("och godstrafiken 1977, när bruket fick en normalspårig förbindelse via Hargshamn till Örbyhus");
    expect(t).toContain("vad det betyder för den som söker takläggare i Hallstavik.");
    expect(t).toContain("hur underlaget ser ut i dag går inte att se från gatan.");
    expect(t).not.toContain("ett slitet underlag");
    expect(t).not.toContain("har ofta takdelar");
  });
  it("serverns HTML har avsnittet och Herräng-länken", () => {
    const c = prerenderContent("/taklaggare-hallstavik")!;
    expect(c.paragraphs.some((p) => p.startsWith("Hallstavik ligger där två gamla socknar möts"))).toBe(true);
    expect(c.links.map((l) => l.href)).toContain("/taklaggare-herrang");
  });
});

describe("paket 134: regionsidan Norra Roslagen", () => {
  it("länkar med ortsnamnet till Hallstavik, Herräng och Älmsta, mer om orterna och 'kan' i stället för 'ofta'", () => {
    const body = regionTexts["Norra Roslagen"].body.join("\n");
    for (const o of ["[takläggare i Hallstavik](/taklaggare-hallstavik)", "[takläggare i Herräng](/taklaggare-herrang)", "[takläggare i Älmsta](/taklaggare-almsta)"]) expect(body).toContain(o);
    expect(body).toContain("En sommarstuga som används året om kan ha byggts till i efterhand");
    expect(body).not.toContain("har ofta byggts till");
    expect(body).toContain("Mellan dem går en klaffbro över kanalen.");
  });
});

describe("paket 134: Norrtälje-länkarna", () => {
  it("takrenovering-norrtalje länkas från Norrtälje-områdets ortssidor, och takbyte och takomläggning från de fyra som saknade dem", () => {
    for (const s of ["blido", "yxlan", "graddo", "kapellskar", "rimbo", "herrang"]) {
      expect(hubLinksFor(s).map((h) => h.href), s).toContain("/takrenovering-norrtalje");
    }
    for (const s of ["blido", "yxlan", "graddo", "kapellskar"]) {
      const h = hubLinksFor(s).map((x) => x.href);
      expect(h, s).toContain("/takbyte-norrtalje");
      expect(h, s).toContain("/takomlaggning-norrtalje");
    }
    expect(hubLinksFor("norrtalje").map((h) => h.href)).not.toContain("/takrenovering-norrtalje");
    expect(hubLinksFor("taby").map((h) => h.href)).not.toContain("/takrenovering-norrtalje");
    // gren 188b: orter i andra kommuner får sin egen kommuns motsvarighet i stället för Norrtälje-raden, och Vaxholm (kommunen själv) har sina egna länkar bland de vanliga
    expect(hubLinksFor("vaxholm").map((h) => h.href)).not.toContain("/takrenovering-norrtalje");
    // Resarö: takbyte byts mot Vaxholms; Vaxholms takomläggning är ompekad (301), så den raden står kvar som den är (inget tas bort)
    expect(hubLinksFor("resaro").map((h) => h.href)).not.toContain("/takbyte-norrtalje");
    expect(hubLinksFor("resaro").map((h) => h.href)).not.toContain("/takrenovering-norrtalje");
    expect(hubLinksFor("taby").length + hubLinksFor("ensta").length).toBeGreaterThan(0);
    expect(hubLinksFor("resaro").map((h) => h.label).some((x) => x.endsWith(" i Vaxholm"))).toBe(true);
  });
  it("länkarna står i serverns HTML", () => {
    expect(prerenderContent("/taklaggare-blido")!.links.map((l) => l.href)).toContain("/takrenovering-norrtalje");
  });
});
