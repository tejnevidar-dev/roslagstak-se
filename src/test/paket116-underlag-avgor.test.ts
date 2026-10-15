/**
 * Paket 116: "det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag" (och varianterna) är ersatt i 43 texter enligt
 * innehall/underlag-avgor-briefrader-2026-10-15.md (godkänt i princip av Marknadschefen 2026-10-15): 15 regiontexter och 28 ortstexter.
 * Norrtälje-formen "hur underlaget ser ut i dag går inte att se från vägen" följd av K2 (en takkontroll där en av våra säljare tittar på taket på plats);
 * öar utan bilväg och skärgårdsregionerna "utifrån", och öar utan bilväg utan K2-meningen (rad 20 hos Vidar); Sydvästra Stockholm utan K2-meningen (R2 följer i nästa stycke).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { regionTexts } from "../data/region-texts";
import { regionBySlug } from "../data/regions";

const alla = JSON.stringify(locations) + JSON.stringify(regionTexts);
const ort = (slug: string) => JSON.stringify(locations.find((x) => x.slug === slug));
const region = (slug: string) => JSON.stringify(regionTexts[regionBySlug(slug)!]);

describe("paket 116: 'det som avgör är hur underlagspapp …'", () => {
  it("mönstret står inte kvar i någon ortstext eller regiontext", () => {
    expect(alla).not.toContain("det som avgör är hur underlagspapp");
    expect(alla).not.toContain("hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag");
    expect(alla).not.toMatch(/Det som avgör är (hur )?(underlagspapp|underlag),? läkt/);
  });
  it("Kusten: Norrtälje-formen och K2", () => {
    expect(region("kusten")).toContain("hur underlaget ser ut i dag går inte att se från vägen. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });
  it("Sydvästra Stockholm: Norrtälje-formen utan K2-mening, eftersom nästa stycke har R2", () => {
    expect(region("sydvastra-stockholm")).toContain("hur underlaget ser ut i dag går inte att se från vägen.");
    expect(region("sydvastra-stockholm")).toContain("Ett takbyte börjar med att en av våra säljare tittar på taket på plats.");
  });
  it("öar utan bilväg: 'utifrån', utan K2-mening i samma stycke", () => {
    for (const slug of ["svartloga", "norrora", "sodorora", "arholma", "grasko"]) {
      const o = ort(slug);
      expect(o, slug).toContain("går inte att se utifrån");
    }
    expect(ort("svartloga")).not.toContain("går inte att se utifrån. Därför börjar vi med en takkontroll");
  });
  it("Blidö (gemensamma texten) och Yxlan (egen text) har ingen rest av mönstret", () => {
    expect(ort("blido")).not.toContain("det som avgör är hur");
    expect(ort("yxlan")).not.toContain("det som avgör är hur");
  });
});
