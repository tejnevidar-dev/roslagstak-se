/**
 * Paket 159 (Marknadschefens grind 2026-10-20, innehall/guider-sida1-briefrader-2026-10-20.md): klicktaksguiden /blogg/bandtackt-plat-vs-klicktak får tre korta avsnitt
 * ("Klicktak av plåt eller bandtäckt plåt?", "Vad kostar bandplåt och falsat plåttak?", "Vad kostar klicktak?"). Priset är det som redan står i prices.ts. Mossavsnittet är struket.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";
import { beloppLopande } from "../data/prices";
import { prerenderContent } from "../../scripts/prerender-content";

const post = blogPosts.find((b) => b.slug === "bandtackt-plat-vs-klicktak")!;

describe("paket 159: klicktaksguiden", () => {
  it("tre nya avsnitt, i rätt ordning och med rätt rubriker", () => {
    const h = post.content.filter((x) => x.startsWith("## "));
    const a = h.indexOf("## Klicktak av plåt eller bandtäckt plåt?");
    expect(a).toBeGreaterThan(-1);
    expect(h.indexOf("## Vad kostar bandplåt och falsat plåttak?")).toBeGreaterThan(a);
    expect(h.indexOf("## Vad kostar klicktak?")).toBe(h.indexOf("## Vad kostar bandplåt och falsat plåttak?") + 1);
  });
  it("priset i avsnittet är det som står i prices.ts, och båda prisavsnitten länkar till /priser", () => {
    const i = post.content.indexOf("## Vad kostar bandplåt och falsat plåttak?");
    expect(post.content[i + 1]).toContain(`ca ${beloppLopande("Dubbelfalsat plåttak").replace(/^ca /i, "")}`.replace("ca ca", "ca"));
    expect(post.content[i + 1]).toContain("(/priser)");
    expect(post.content[i + 3]).toContain("För klicktak har vi inget riktpris");
    expect(post.content[i + 3]).toContain("(/priser)");
  });
  it("serverns HTML har avsnitten, och mossguiden är orörd", () => {
    const t = JSON.stringify(prerenderContent("/blogg/bandtackt-plat-vs-klicktak")!.paragraphs);
    for (const r of ["Klicktak av plåt eller bandtäckt plåt?", "Vad kostar bandplåt och falsat plåttak?", "Vad kostar klicktak?"]) expect(t, r).toContain(r);
    expect(blogPosts.find((b) => b.slug === "ta-bort-mossa-fran-tak")!.content.join(" ")).not.toContain("Vad kostar mossborttagning");
  });
});
