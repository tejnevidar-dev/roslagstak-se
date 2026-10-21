/**
 * Paket 120: de godkända SEO-förslagen 2026-10-18 (ledning/marknad/seo-forslag-norrtalje-titlar-, seo-genomgang-taby-, seo-genomgang-uppsala-, seo-forslag-taktvatt-lankar-2026-10-18.md):
 * F1, F2 (Norrtälje), T1, T2 (Täby), U1, U3 (Uppsala) och L1 (taktvätt). Ett prov per ändring, i data och i serverns HTML där det gäller.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resolveMeta } from "../data/overrides";
import { comboOverrides } from "../data/combo-overrides";
import { ortSeoOverrides } from "../data/seo-overrides";
import { hubLinksFor } from "../data/hub-links";
import { COMBO_LINK_TILL_TJANST, comboListLink } from "../data/service-location-combos";
import { prerenderContent } from "../../scripts/prerender-content";

const bas = { title: "Bas", description: "Bas" };
const lankar = (path: string) => prerenderContent(path)!.links.map((l) => l.href);
const lankText = (path: string, href: string) => prerenderContent(path)!.links.filter((l) => l.href === href).map((l) => l.label);

describe("paket 120: Norrtälje (F1, F2)", () => {
  it("F1: /takbyte-norrtalje har den nya beskrivningen och behåller titeln", () => {
    const m = resolveMeta("/takbyte-norrtalje", bas);
    expect(m.description).toBe("Byta tak i Norrtälje? Kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti. Vi har vår bas här och svarar inom 24 timmar.");
    expect(m.description.length).toBeLessThanOrEqual(155);
    expect(m.title).toBe("Takbyte i Norrtälje – byta tak till fast pris");
  });
  it("F2: /takomlaggning-norrtalje har ny titel och beskrivning", () => {
    expect(comboOverrides["takomlaggning-norrtalje"].title).toBe("Takomläggning i Norrtälje – 10 års utförandegaranti");
    expect(comboOverrides["takomlaggning-norrtalje"].description).toBe("Takomläggning i Norrtälje: kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti. Vi har vår bas här och svarar inom 24 timmar.");
    const c = prerenderContent("/takomlaggning-norrtalje")!;
    expect(c.title).toContain("10 års utförandegaranti");
    expect(c.description).toContain("10 års utförandegaranti. Vi har vår bas här");
  });
  it("sidor utan godkänd ändring är orörda", () => {
    expect(resolveMeta("/taklaggare-norrtalje", bas).title).toBe("Takläggare i Norrtälje – takläggning till fast pris");
    expect(comboOverrides["takrenovering-norrtalje"].title).toBe("Takrenovering i Norrtälje – takfirma med bas här");
  });
});

describe("paket 120: Täby (T1, T2)", () => {
  it("T1: ortssidans titel har inte längre 'byta tak' och /takbyte-taby behåller sin", () => {
    const m = resolveMeta("/taklaggare-taby", bas);
    expect(m.title).toBe("Takläggare i Täby – takläggning, fast pris");
    expect(m.title).not.toContain("byta tak");
    expect(resolveMeta("/takbyte-taby", bas).description).toContain("Byta tak i Täby?");
  });
  it("T2: grannorterna i Norra Stockholm och på Rådmansöhalvön länkar till /takomlaggning-taby, Täby själv inte", () => {
    expect(hubLinksFor("sollentuna").map((h) => h.href)).toContain("/takomlaggning-taby");
    expect(hubLinksFor("sollentuna")).toContainEqual({ href: "/takomlaggning-taby", label: "Takomläggning i Täby" });
    expect(hubLinksFor("taby").map((h) => h.href)).not.toContain("/takomlaggning-taby");
    expect(lankar("/taklaggare-sollentuna")).toContain("/takomlaggning-taby");
    expect(lankar("/taklaggare-sollentuna")).toContain("/takbyte-taby");
    expect(lankar("/taklaggare-taby")).toContain("/takomlaggning-taby");
  });
});

describe("paket 120: Uppsala (U1, U3)", () => {
  it("U1: Märsta och Sigtuna länkar till Uppsala, Uppsala till Enköping (i data och i serverns HTML)", () => {
    for (const s of ["marsta", "sigtuna"]) {
      expect(hubLinksFor(s)).toContainEqual({ href: "/taklaggare-uppsala", label: "Takläggare i Uppsala" });
      expect(lankar(`/taklaggare-${s}`), s).toContain("/taklaggare-uppsala");
    }
    expect(hubLinksFor("uppsala")).toContainEqual({ href: "/taklaggare-enkoping", label: "Takläggare i Enköping" });
    expect(lankar("/taklaggare-uppsala")).toContain("/taklaggare-enkoping");
  });
  it("U1: en länk per mål, inga dubbletter på de berörda sidorna", () => {
    for (const p of ["/taklaggare-marsta", "/taklaggare-sigtuna", "/taklaggare-uppsala", "/taklaggare-sollentuna"]) {
      const l = lankar(p).filter((h) => h.startsWith("/taklaggare-") || h.startsWith("/takomlaggning-"));
      expect(new Set(l).size, p).toBe(l.length);
    }
  });
  it("U3: Uppsalas titel har 'takbyte'", () => {
    expect(ortSeoOverrides.uppsala.title).toBe("Takläggare i Uppsala – takbyte och takläggning, fast pris");
    expect(ortSeoOverrides.uppsala.title.length).toBeLessThanOrEqual(60);
    expect(prerenderContent("/taklaggare-uppsala")!.title).toBe("Takläggare i Uppsala – takbyte och takläggning, fast pris");
  });
});

describe("paket 120: taktvätt (L1)", () => {
  it("L1 (ersatt av gren 165): Täby, Vallentuna och Vaxholm har egna indexerbara taktvätt-sidor och länkar dit i stället för till /tjanster/taktvatt", () => {
    for (const s of ["taby", "vallentuna", "vaxholm"]) {
      expect(COMBO_LINK_TILL_TJANST[`/taktvatt-${s}`], s).toBeUndefined();
      expect(lankar(`/taklaggare-${s}`), s).toContain(`/taktvatt-${s}`);
    }
  });
  it("L1: övriga orter är orörda (Norrtälje har en indexerad taktvättssida)", () => {
    expect(lankar("/taklaggare-norrtalje")).toContain("/taktvatt-norrtalje");
    expect(comboListLink({ serviceSlug: "taktvatt", url: "/taktvatt-norrtalje", serviceName: "Taktvätt", prep: "i", locationName: "Norrtälje" })).toEqual({ href: "/taktvatt-norrtalje", label: "Taktvätt i Norrtälje" });
    expect(comboListLink({ serviceSlug: "taktvatt", url: "/taktvatt-sollentuna", serviceName: "Taktvätt", prep: "i", locationName: "Sollentuna" })).toEqual({ href: "/taktvatt-sollentuna", label: "Taktvätt i Sollentuna" });
  });
  it("L1: React (LocationPage.tsx) använder samma regel som serverns HTML", () => {
    const s = readFileSync("src/pages/LocationPage.tsx", "utf8");
    // H2 (gren 166): taktvätt-länken kommer ur comboLink (combo-links.ts), samma regel som serverns HTML
    expect(s).toContain("comboLink(");
    expect(s).toContain('["taktvatt", "Taktvätt"]');
  });
});
