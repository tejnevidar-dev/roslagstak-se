/**
 * Materialsidorna (AG1, paket 22): MaterialPage.tsx (React) och den statiska HTML:en hämtar texten ur src/data/material-page-text.ts och related-links-text.ts.
 */
import { describe, expect, it } from "vitest";
import { MATERIAL_PAGE_TEXT, materialPricesSentence } from "@/data/material-page-text";
import { MATERIAL_PRISAVSNITT } from "@/data/material-prices";
import { materials } from "@/data/materials";
import { MATERIAL_EXTRAS } from "@/data/page-extras";
import { RELATED_LINKS_INTRO } from "@/data/related-links-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("materialsidor: statisk text", () => {
  it("varje /material/<material> har uppmaningen, 'Fler material' och 'Läs vidare' och prismeningen där sidan visar dem", () => {
    const saknas: string[] = [];
    for (const m of materials.filter((x) => x.detail)) {
      const lista = prerenderContent(`/material/${m.slug}`)?.paragraphs ?? [];
      const förväntat = [
        MATERIAL_PAGE_TEXT.ctaText, MATERIAL_PAGE_TEXT.relatedTitle, RELATED_LINKS_INTRO,
        ...(MATERIAL_PRISAVSNITT[m.slug] ? [materialPricesSentence()] : []),
        ...(MATERIAL_EXTRAS[m.slug] ? [MATERIAL_PAGE_TEXT.readMoreHeading] : []),
      ];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${m.slug}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
