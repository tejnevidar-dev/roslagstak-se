/**
 * AG2: har briefen en egen frågedel visas inte sidans genererade FAQ-sektion, och FAQPage-schemat bygger på briefens frågor.
 */
import { describe, expect, it } from "vitest";
import { briefFaqs } from "@/data/brief-faq";
import { comboOverrides } from "@/data/combo-overrides";
import { generateCombos } from "@/data/service-location-combos";
import { prerenderContent } from "../../scripts/prerender-content";

const faqNamn = (page: ReturnType<typeof prerenderContent>): string[] => {
  const nod = (page?.jsonLd ?? []).find((j) => (j as { "@type"?: string })["@type"] === "FAQPage") as { mainEntity?: { name: string }[] } | undefined;
  return (nod?.mainEntity ?? []).map((q) => q.name);
};

describe("briefens frågedel", () => {
  it("tolkar rubriken och fråga/svar-styckena och ignorerar avslutande stycken", () => {
    const f = briefFaqs(["Text.", "## Vanliga frågor om takbyte i Täby", "**Är priset fast?** Ja, det är fast.", "**Kan ni?** Ja.", "Boka en kostnadsfri takkontroll."]);
    expect(f).toEqual([{ question: "Är priset fast?", answer: "Ja, det är fast." }, { question: "Kan ni?", answer: "Ja." }]);
    expect(briefFaqs(["Text.", "Mer text."])).toBeNull();
  });

  it("sidor med frågedel i briefen: en enda frågedel i den statiska texten och schemat på briefens frågor; övriga sidor oförändrade", () => {
    const fel: string[] = [];
    let med = 0, utan = 0;
    for (const c of generateCombos()) {
      const o = comboOverrides[`${c.serviceSlug}-${c.locationSlug}`];
      const page = prerenderContent(c.url);
      if (!page) continue;
      const bf = briefFaqs(o?.content ?? c.content);
      const genereradRubrik = `Vanliga frågor om ${c.serviceName.toLowerCase()} ${c.prep} ${c.locationName}`;
      const rubriker = page.paragraphs.filter((p) => /^(Vanliga )?frågor om /i.test(p));
      if (bf) {
        med++;
        if (rubriker.length !== 1) fel.push(`${c.url}: ${rubriker.length} frågerubriker`);
        const namn = faqNamn(page);
        if (JSON.stringify(namn) !== JSON.stringify(bf.map((f) => f.question))) fel.push(`${c.url}: schemat har inte briefens frågor`);
      } else {
        utan++;
        if (!page.paragraphs.includes(genereradRubrik)) fel.push(`${c.url}: den genererade frågedelen saknas`);
        if (faqNamn(page).length === 0) fel.push(`${c.url}: FAQPage saknas`);
      }
    }
    expect(fel.slice(0, 10)).toEqual([]);
    expect(med).toBeGreaterThan(40);
    expect(utan).toBeGreaterThan(1000);
  });
});
