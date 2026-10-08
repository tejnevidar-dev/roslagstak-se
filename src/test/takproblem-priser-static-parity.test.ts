/**
 * Takproblemsidorna och /priser (AG1, paket 25): ProblemPage.tsx och Prices.tsx (React) och den statiska HTML:en hämtar texten ur
 * src/data/problem-page-text.ts, prices-page-text.ts, prices.ts, google-reviews-text.ts och related-links-text.ts.
 */
import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { PRICES_PAGE_TEXT } from "@/data/prices-page-text";
import { priceData, priceFaqs } from "@/data/prices";
import { PROBLEM_PAGE_TEXT } from "@/data/problem-page-text";
import { problems } from "@/data/problems";
import { RELATED_LINKS_INTRO } from "@/data/related-links-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("takproblem och priser: statisk text", () => {
  it("varje /takproblem/<problem> har uppmaningen, områdesrubriken och Fler takproblem", () => {
    const saknas: string[] = [];
    for (const p of problems) {
      const lista = prerenderContent(`/takproblem/${p.slug}`)?.paragraphs ?? [];
      for (const t of [PROBLEM_PAGE_TEXT.ctaText, PROBLEM_PAGE_TEXT.areasHeading, PROBLEM_PAGE_TEXT.relatedTitle, RELATED_LINKS_INTRO]) if (!lista.includes(t)) saknas.push(`${p.slug}: ${t.slice(0, 40)}`);
      if (p.relatedProject && !lista.includes(PROBLEM_PAGE_TEXT.exampleHeading)) saknas.push(`${p.slug}: exempelrubriken`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });

  it("/priser har eyebrow, kategorier, poster (namn, beskrivning, prisintervall), frågor, uppmaning, omdömesband och Relaterat till pris", () => {
    const lista = prerenderContent("/priser")?.paragraphs ?? [];
    const förväntat = [
      PRICES_PAGE_TEXT.eyebrow, PRICES_PAGE_TEXT.faqHeading, PRICES_PAGE_TEXT.ctaHeading, PRICES_PAGE_TEXT.ctaText, PRICES_PAGE_TEXT.relatedTitle, RELATED_LINKS_INTRO,
      GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress,
      ...priceData.flatMap((c) => [c.category, ...c.items.flatMap((i) => [i.name, i.description.trim(), i.priceRange])]),
      ...priceFaqs.map((f) => f.question),
    ];
    const saknas = förväntat.filter((t) => !lista.includes(t));
    expect(saknas.map((t) => t.slice(0, 40))).toEqual([]);
  });
});
