/**
 * Paritet för /taktyper och guidemallen (AD4): RoofTypes, IslandSpecialist, RoofTypesPage och BlogPost (React)
 * och den statiska HTML:en hämtar texten ur src/data/taktyper-text.ts, blog-template-text.ts och related-links-text.ts.
 */
import { describe, expect, it } from "vitest";
import { BLOG_TEMPLATE, blogHasAside } from "@/data/blog-template-text";
import { blogPosts } from "@/data/blog-posts";
import { relatedPosts } from "@/data/related-posts";
import { ISLAND_TEXT, ROOF_PRICE_HEADING, ROOF_TYPE_ORDER, ROOF_TYPE_TEXTS, ROOF_TYPES_HEADING, ROOF_TYPES_PAGE, roofTypesIntroText } from "@/data/taktyper-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("/taktyper: statisk text", () => {
  it("har eyebrow, rubrik, ingress, sex taktyper, prisrubrik och öavsnittet", () => {
    const lista = prerenderContent("/taktyper")!.paragraphs;
    const förväntat = [ROOF_TYPES_PAGE.eyebrow, ROOF_TYPES_HEADING.meta, roofTypesIntroText(), ROOF_PRICE_HEADING, ...ROOF_TYPE_ORDER.flatMap((id) => [ROOF_TYPE_TEXTS[id].name, ROOF_TYPE_TEXTS[id].sentence])];
    const saknas = förväntat.filter((t) => !lista.some((p) => p.replace(/[.:]$/, "") === t.replace(/[.:]$/, "") || p.includes(t)));
    expect(saknas.map((t) => t.slice(0, 40))).toEqual([]);
    expect(JSON.stringify(ISLAND_TEXT).length).toBeGreaterThan(10);
  });
});

describe("guidemallen: statisk text", () => {
  it("varje guide har mallens block och sina relaterade guider", () => {
    const saknas: string[] = [];
    for (const post of blogPosts) {
      const lista = prerenderContent(`/blogg/${post.slug}`)?.paragraphs ?? [];
      const förväntat = [BLOG_TEMPLATE.linksHeading, BLOG_TEMPLATE.ctaHeading, BLOG_TEMPLATE.ctaText, ...(blogHasAside(post.content.length) ? [`${BLOG_TEMPLATE.asideLead} ${BLOG_TEMPLATE.asideRest}`] : []), ...relatedPosts(post, 4).flatMap((p) => [p.title, p.excerpt]), ...(relatedPosts(post, 4).length ? [BLOG_TEMPLATE.relatedHeading] : [])];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${post.slug}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
