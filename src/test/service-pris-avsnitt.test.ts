/**
 * Paket 30: prisrutan på /tjanster/tegeltak är ett eget H2-avsnitt (PRIS_SOM_AVSNITT), i React och i den statiska HTML:en. Övriga tjänstesidor
 * är oförändrade (rutan är en H3 bland tre). Rubrikparitet mellan React och statisk HTML för alla tjänstesidor testas i service-page-parity.test.ts.
 */
import { describe, expect, it } from "vitest";
import { services } from "@/components/Services";
import { goodToKnowBoxes, PRIS_SOM_AVSNITT } from "@/data/service-page";
import { prerenderContent } from "../../scripts/prerender-content";

const nivaPaRubrik = (slug: string, rubrik: string): number | undefined => {
  const page = prerenderContent(`/tjanster/${slug}`);
  const i = page?.paragraphs.findIndex((p) => p.replace(/[.:]$/, "") === rubrik) ?? -1;
  return i >= 0 ? page?.headingAt?.[i] : undefined;
};

describe("prisrutan som eget avsnitt", () => {
  it("bara tegeltak är markerad", () => {
    expect(PRIS_SOM_AVSNITT).toEqual(["tegeltak"]);
  });

  it("/tjanster/tegeltak: prisrubriken är H2 i den statiska HTML:en och texten är oförändrad", () => {
    const [pris] = goodToKnowBoxes("tegeltak");
    expect(pris.t).toBe("Vad kostar tegeltak?");
    expect(nivaPaRubrik("tegeltak", pris.t)).toBe(2);
    expect(prerenderContent("/tjanster/tegeltak")?.paragraphs).toContain(pris.d);
  });

  it("övriga tjänstesidor har kvar H3 på sina tre rutor", () => {
    for (const { slug } of services.filter((s) => s.slug !== "tegeltak")) {
      for (const b of goodToKnowBoxes(slug)) {
        const niva = nivaPaRubrik(slug, b.t);
        if (niva !== undefined) expect(niva, `${slug}: ${b.t}`).toBe(3);
      }
    }
  });
});
