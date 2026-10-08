/**
 * Tjänstesidorna (AG1, paket 21): omdömesbandet i ServiceDetail.tsx (GoogleReviews) står även i den statiska HTML:en, ur google-reviews-text.ts.
 */
import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { services } from "@/components/Services";
import { prerenderContent } from "../../scripts/prerender-content";

describe("tjänstesidor: statiskt omdömesband", () => {
  it("varje /tjanster/<tjänst> har omdömesbandets tre block sist", () => {
    const saknas: string[] = [];
    for (const s of services) {
      const lista = prerenderContent(`/tjanster/${s.slug}`)?.paragraphs ?? [];
      for (const t of [GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress]) if (!lista.includes(t)) saknas.push(`${s.slug}: ${t.slice(0, 30)}`);
      if (lista.length && lista[lista.length - 1] !== GOOGLE_REVIEWS_TEXT.ingress) saknas.push(`${s.slug}: omdömesbandet är inte sist`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
