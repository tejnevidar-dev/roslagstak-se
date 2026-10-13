/**
 * Paket 78 (Marknadschefen 2026-10-13, J1: "högst en gång per sida"): öarna med väg, bro eller färja hade meningen "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö"
 * två gånger: i "Takläggare på <ö>: så arbetar vi" och i svaret på "Hur bokar jag en kostnadsfri takkontroll …?". Den står nu bara i "så arbetar vi". Ingen brief ändras.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { OAR_UTAN_BILVAG } from "@/data/location-mall";
import { generateLocationFAQs } from "@/data/location-faqs";
import { prerenderContent } from "../../scripts/prerender-content";

const J1_GAMMAL = "kompletta takbyten på Blidö och Singö";
const ELVA = ["blido", "ljustero", "yxlan", "vato", "lidingo", "ekero", "ingaro", "resaro", "rindo", "tynningo", "musko"];

describe("paket 78: J1 högst en gång per ö-sida", () => {
  it.each(ELVA)("%s: meningen står en gång i sidans text och inte i svaret om takkontrollen", (slug) => {
    const l = locations.find((x) => x.slug === slug)!;
    const sida = prerenderContent("/taklaggare-" + slug)!;
    const text = [sida.intro ?? "", ...sida.paragraphs].join("\n");
    expect(text.split(J1_GAMMAL).length - 1, slug).toBe(1);
    const svar = generateLocationFAQs(l.name, "på", l.isIsland, l.uniqueFAQ).find((f) => f.question.startsWith("Hur bokar jag"))!.answer;
    expect(svar).not.toContain("Blidö och Singö");
    expect(svar).toContain("Takkontrollen är kostnadsfri och utan förpliktelser.");
  });
  it("ingen ortssida har meningen mer än en gång, och öarna utan bilväg har kvar sin ö-lydelse i svaret", () => {
    for (const l of locations) {
      const sida = prerenderContent("/taklaggare-" + l.slug);
      if (!sida) continue;
      const text = [sida.intro ?? "", ...sida.paragraphs].join("\n");
      expect(text.split(J1_GAMMAL).length - 1, l.slug).toBeLessThanOrEqual(1);
    }
    for (const slug of OAR_UTAN_BILVAG) {
      const l = locations.find((x) => x.slug === slug)!;
      const svar = generateLocationFAQs(l.name, "på", l.isIsland, l.uniqueFAQ).find((f) => f.question.startsWith("Hur bokar jag"))!.answer;
      expect(svar, slug).toContain("Har ditt hus ingen bilväg");
    }
  });
});
