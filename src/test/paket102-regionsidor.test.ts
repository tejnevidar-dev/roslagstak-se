/**
 * Paket 102: regionsidorna /omraden/* enligt Innehålls passrapport 154 (innehall/regionsidor-lasning-2026-10-15.md), godkänt av Marknadschefen 2026-10-15 15:07:
 * R1, R2, R3, R6, K1–K4. R4 (plåtarbeten som eget jobb) väntar på Vidar och är orörd. R5 (tätskiktsgarantin med villkoret) är struken: regionsidor behåller den vanliga garantimeningen (beslutet 2026-10-05).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { regionTexts } from "../data/region-texts";
import { regionBySlug, regionLinkLabel, regionOrder, regionSlugs } from "../data/regions";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const text = (slug: string) => regionTexts[regionBySlug(slug)!];
const alla = (r: string) => [text(r).intro, ...text(r).body].join("\n");
const SLUGS = Object.values(regionSlugs);
const sida = (p: string) => JSON.stringify(prerenderContent(p));

describe("paket 102: regiontexterna (R1, R2, R3, R6)", () => {
  it("det är 16 regioner", () => {
    expect(SLUGS.length).toBe(16);
    expect(Object.keys(regionTexts).length).toBe(16);
  });
  it("R5 är struken: regionsidorna behåller den vanliga garantimeningen (beslutet 2026-10-05), alla 16 orörda", () => {
    for (const slug of SLUGS) {
      const t = alla(slug);
      expect(t, slug).toContain("Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.");
      expect(t, slug).not.toContain("gäller dessutom 30 års tätskiktsgaranti via MATAKI");
    }
  });
  it("R1: plåtarbetet som det som avgör hur tätt taket blir är borta (Rådmansöhalvön, Norra Stockholm)", () => {
    for (const slug of SLUGS) expect(alla(slug), slug).not.toContain("plåtarbetet avgör hur tätt taket blir");
    expect(alla("radmansohalvon")).toContain("har ett tak med många vinklar och anslutningar, och varje anslutning ska vara tät.");
    expect(alla("norra-stockholm")).toContain("och varje anslutning ska vara tät.");
  });
  it("R2: 'en av våra säljare' och inget om underlagets skick (Sydvästra Stockholm, Mälardalen)", () => {
    for (const slug of ["sydvastra-stockholm", "malardalen"]) {
      expect(alla(slug), slug).toContain("Ett takbyte börjar med att en av våra säljare tittar på taket på plats.");
      expect(alla(slug), slug).not.toContain("antalet genomföringar, underlagets skick");
    }
  });
  it("R3: 'och det tittar vi på vid takkontrollen' är borta, 'hur det löses går vi igenom vid takkontrollen' står (Österåker, Västerort, Östra Stockholm)", () => {
    for (const slug of SLUGS) expect(alla(slug), slug).not.toContain("och det tittar vi på vid takkontrollen");
    for (const slug of ["osteraker", "vasterort", "ostra-stockholm"]) expect(alla(slug), slug).toContain("och hur det löses går vi igenom vid takkontrollen.");
  });
  it("R6: 'Roslagen, Storstockholm och Mälardalen' i de åtta Stockholmsregionerna", () => {
    const med = SLUGS.filter((s) => alla(s).includes("tar uppdrag i Roslagen, Storstockholm och Mälardalen."));
    expect(med.length).toBe(9); // åtta Stockholmsregioner och Mälardalen, som redan hade orden
    for (const slug of SLUGS) expect(alla(slug), slug).not.toContain("tar uppdrag i Roslagen och Storstockholm.");
  });
  it("R4 är orörd: Roslagens inland länkar fortfarande till plåtarbeten (väntar på Vidars fråga 3)", () => {
    expect(alla("roslagens-inland")).toContain("Plåten runt skorstenen och i ränndalarna beskriver vi på sidan om [plåtarbeten](/tjanster/platarbeten).");
  });
  it("serverns HTML har samma texter som datan", () => {
    const t = sida("/omraden/kusten");
    expect(t).toContain("Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.");
  });
});

describe("paket 102: hubben och mallen (K1–K4)", () => {
  it("K1: ingressen på /omraden i React har Mälardalen och ingen trasig mening", () => {
    const k = kalla("src/pages/AreasPage.tsx").replace(/\s+/g, " ");
    expect(k).toContain("i Roslagen, Storstockholm och Mälardalen. Välj ditt område");
    expect(k).not.toContain("Storstockholm. Välj ditt område");
  });
  it("K3: titel och rubrik på /omraden har Mälardalen, samma i React och i serverns HTML", () => {
    const s = prerenderContent("/omraden")!;
    expect(s.title).toBe("Våra områden — Roslagen, Storstockholm och Mälardalen");
    expect(s.h1).toBe("Takläggare i Roslagen, Storstockholm och Mälardalen");
    const k = kalla("src/pages/AreasPage.tsx");
    expect(k).toContain('title="Våra områden — Roslagen, Storstockholm och Mälardalen"');
    expect(k).toContain("Takläggare i Roslagen, Storstockholm och Mälardalen");
    expect(k).toContain('description="Takbyte, takomläggning och takrenovering i Roslagen, Storstockholm och Mälardalen.');
  });
  it("K2: raden före omdömena säger 'Vi tar uppdrag i N orter i området.' på alla 16 sidor", () => {
    for (const slug of SLUGS) {
      const t = sida(`/omraden/${slug}`);
      expect(t, slug).toMatch(/Vi tar uppdrag i \d+ orter i området\. Ring /);
      expect(t, slug).not.toContain("Vi arbetar i");
    }
  });
  it("K4: länktexterna i hubbens lista och bland närliggande områden", () => {
    expect(regionLinkLabel("Kusten")).toBe("Takläggare vid kusten");
    expect(regionLinkLabel("Rådmansöhalvön")).toBe("Takläggare på Rådmansöhalvön");
    expect(regionLinkLabel("Norra skärgården")).toBe("Takläggare i Norra skärgården");
    const hubb = sida("/omraden");
    expect(hubb).toContain("Takläggare vid kusten");
    expect(hubb).toContain("Takläggare på Rådmansöhalvön");
    expect(hubb).not.toContain("Takläggare i Kusten");
    expect(hubb).not.toContain("Takläggare i Rådmansöhalvön");
    for (const slug of SLUGS) {
      const t = sida(`/omraden/${slug}`);
      expect(t, slug).not.toContain("Takläggare i Kusten");
      expect(t, slug).not.toContain("Takläggare i Rådmansöhalvön");
    }
    expect(kalla("src/pages/RegionPage.tsx")).toContain("regionLinkLabel(n)");
    expect(regionOrder.length).toBe(16);
  });
});
