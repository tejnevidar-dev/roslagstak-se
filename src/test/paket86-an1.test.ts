/**
 * Paket 86 (An1, Innehåll leverans 2026-10-13 Del 1, godkänt av Marknadschefen 2026-10-13): steg 2 på annonssidorna (/offert/<ort>) nämner rapporten om takets skick (K3).
 * Texten ligger i en datafil som React och serverns HTML delar. Inget nytt påstående.
 */
import { describe, expect, it } from "vitest";
import { AD_STEPS } from "@/data/ad-landing-text";
import { adLandings } from "@/data/ad-landings";
import { prerenderContent, noindexPageBody } from "../../scripts/prerender-content";

const NY = "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Tillägg bara efter ditt godkännande.";
const GAMMAL = "Du får en offert med fast pris. Tillägg bara efter ditt godkännande.";

describe("paket 86: An1, rapporten om takets skick i steg 2 på annonssidorna", () => {
  it("steg 2 har K3-lydelsen och rubriken är oförändrad", () => {
    expect(AD_STEPS[1].title).toBe("Offert med fast pris");
    expect(AD_STEPS[1].text).toBe(NY);
    expect(AD_STEPS.map((s) => s.text).join("\n")).not.toContain(GAMMAL);
  });
  it("serverns HTML på alla annonssidor har den nya lydelsen och inte den gamla", () => {
    expect(adLandings.length).toBeGreaterThanOrEqual(10);
    for (const l of adLandings) {
      const sida = noindexPageBody("/offert/" + l.slug);
      const t = (sida?.paragraphs ?? []).join("\n");
      expect(t, l.slug).toContain(NY);
      expect(t, l.slug).not.toContain(GAMMAL);
      expect(t.split(NY).length - 1, l.slug).toBe(1);
    }
  });
  it("de ordinarie sidorna berörs inte (/takkontroll har redan en egen mening om rapporten och är oförändrad; /offert fick K3 i paket 98 och är därför inte med här)", () => {
    for (const url of ["/takbyte-norrtalje", "/tjanster/takbyte"]) {
      const p = prerenderContent(url);
      if (p) expect(p.paragraphs.join("\n"), url).not.toContain("rapport om takets skick. Behöver taket åtgärdas får du också en offert");
    }
  });
});
