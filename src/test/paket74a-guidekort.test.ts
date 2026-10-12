/**
 * Paket 74a (huvudbiten): startsidans guidekort hämtar bara det de visar (adress, titel, ingress, lästid) ur en liten genererad lista,
 * inte hela guidetexten i blog-posts.ts. Listan är exakt det blocket alltid har visat, och den statiska HTML:en visar samma kort.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { synligaGuider } from "@/data/avindexerade-guider";
import { HOME_GUIDES_COUNT } from "@/data/home-guides";
import { homeGuideCards } from "@/data/home-guide-cards";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 74a: guidekorten på startsidan", () => {
  it("korten är de första sex synliga guiderna i blog-posts.ts, med samma adress, titel, ingress och lästid (kör scripts/generate-home-guide-cards.ts om detta fäller)", () => {
    const forvantat = synligaGuider(blogPosts)
      .slice(0, HOME_GUIDES_COUNT)
      .map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, readTime: p.readTime }));
    expect(homeGuideCards).toHaveLength(HOME_GUIDES_COUNT);
    expect(homeGuideCards).toEqual(forvantat);
  });
  it("ingen avindexerad guide står bland korten", () => {
    for (const k of homeGuideCards) expect(synligaGuider([{ slug: k.slug }])).toHaveLength(1);
  });
  it("komponenten läser inte hela guidetexten, och korten står i den statiska HTML:en", () => {
    const kalla = readFileSync("src/components/GuidesTeaser.tsx", "utf8");
    expect(kalla).not.toContain("@/data/blog-posts");
    expect(kalla).toContain("@/data/home-guide-cards");
    const text = prerenderContent("/")!.paragraphs.join("\n");
    for (const k of homeGuideCards) expect(text, k.slug).toContain(k.title);
  });
  it("generatorn är kopplad till predev och prebuild", () => {
    const pkg = readFileSync("package.json", "utf8");
    expect(pkg).toMatch(/"predev": "[^"]*generate-home-guide-cards\.ts/);
    expect(pkg).toMatch(/"prebuild": "[^"]*generate-home-guide-cards\.ts/);
  });
});
