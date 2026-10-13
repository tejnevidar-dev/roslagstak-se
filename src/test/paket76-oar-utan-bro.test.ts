/**
 * Paket 76 (Innehålls leverans 2026-10-13, Del 4 punkt 1): fem öar som saknar bro och nås med båt har inte längre "Kostnadsfri takkontroll" i raden under rubriken,
 * utan samma ö-lydelse som Husarö, Ingmarsö och Högmarsö. Raden är också metabeskrivningen, och båda är lika och högst 160 tecken.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { ortSeoOverrides } from "@/data/seo-overrides";

const SLUT = "Berätta var huset ligger, så går vi igenom hur en takkontroll kan ordnas.";
const OAR = ["svartloga", "sodorora", "norrora", "grasko", "arholma"];
const FORVANTAT: Record<string, string> = {
  svartloga: "Takläggare på Svartlöga i Norrtälje ytterskärgård: by, sjöbodar och sommarhus. " + SLUT,
  sodorora: "Takläggare på Söderöra i Norrtälje skärgård, en ö med omkring 180 fritidshus. " + SLUT,
  norrora: "Takläggare på Norröra i Norrtälje skärgård: en by återuppbyggd efter 1719. " + SLUT,
  grasko: "Takläggare på Gräskö i Norrtälje skärgård, en ö med fritidshus. " + SLUT,
  arholma: "Takläggare på Arholma: redargårdar från 1800-talet, pensionat och fritidshus. " + SLUT,
};

describe("paket 76: ö-sidor utan bro", () => {
  it.each(OAR)("%s: raden under rubriken är ö-lydelsen, utan 'Kostnadsfri takkontroll'", (slug) => {
    const l = locations.find((x) => x.slug === slug)!;
    expect(l.description).toBe(FORVANTAT[slug]);
    expect(l.description).not.toContain("Kostnadsfri takkontroll");
    expect(l.description.length).toBeLessThanOrEqual(160);
  });
  it.each(OAR)("%s: metabeskrivningen är samma rad", (slug) => {
    const o = ortSeoOverrides[slug];
    expect(o?.description).toBe(FORVANTAT[slug]);
  });
  it("öarna med väg, bro eller färja är orörda: de har kvar sin rad med takkontrollen", () => {
    for (const slug of ["blido", "ljustero", "yxlan", "singo", "vato"]) {
      const l = locations.find((x) => x.slug === slug)!;
      expect(l.description, slug).not.toContain("Berätta var huset ligger");
    }
  });
});
