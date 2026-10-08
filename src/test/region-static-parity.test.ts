/**
 * Regionsidorna (AG1, paket 23): RegionPage.tsx (React) och den statiska HTML:en hämtar texten ur src/data/region-page-text.ts och google-reviews-text.ts.
 */
import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { regionSlugs } from "@/data/regions";
import { REGION_PAGE_TEXT } from "@/data/region-page-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("regionsidor: statisk text", () => {
  it("varje /omraden/<region> har omdömesbandet, 'Nästa steg' med ingress och länktexten", () => {
    const saknas: string[] = [];
    for (const slug of Object.values(regionSlugs)) {
      const lista = prerenderContent(`/omraden/${slug}`)?.paragraphs ?? [];
      for (const t of [GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress, REGION_PAGE_TEXT.nextTitle, REGION_PAGE_TEXT.nextIntro, REGION_PAGE_TEXT.allRegionsLink]) {
        if (!lista.includes(t)) saknas.push(`${slug}: ${t.slice(0, 40)}`);
      }
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
