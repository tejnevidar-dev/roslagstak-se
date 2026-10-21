/**
 * Paket 42 (Vidars ja 2026-10-11): sex guider och /taklaggare-finnhamn tas ur sök (noindex, follow, ur sajtkartan, ingen länk från indexerbara sidor).
 * Inget raderas och inga texter ändras på sidorna själva. Byggkontrollen scripts/check-avindexerade.ts provar den byggda HTML:en och sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { AVINDEXERADE_GUIDER, avindexeradeGuidevagar, synligaGuider } from "@/data/avindexerade-guider";
import { AVINDEXERADE_ORTER, avindexeradeOrtsvagar } from "@/data/avindexerade-orter";
import { blogPosts } from "@/data/blog-posts";
import { guidesForKeywords, relatedPosts } from "@/data/related-posts";
import { avindexeradePaths, prerenderContent } from "../../scripts/prerender-content";

const SJU = [
  "/blogg/takmalning-betongpannor",
  "/blogg/tak-pa-carport-hallbart",
  "/blogg/platta-tak-lackage-avrinning",
  "/blogg/epdm-gummiduk-tak-tatskikt",
  "/blogg/snorasskydd-tak-krav-placering-pris",
  "/taklaggare-finnhamn",
];

describe("paket 42: sex sidor ur sök (radhusguiden är tillbaka i index sedan gren 161b)", () => {
  it("listorna innehåller exakt de sex adresserna, och alla finns kvar som sidor", () => {
    expect([...avindexeradeGuidevagar(), ...avindexeradeOrtsvagar()].sort()).toEqual([...SJU].sort());
    for (const s of AVINDEXERADE_GUIDER) expect(blogPosts.some((b) => b.slug === s), s).toBe(true);
    expect(AVINDEXERADE_ORTER).toEqual(["finnhamn"]);
    for (const p of SJU) expect(prerenderContent(p), p).not.toBeNull(); // sidorna finns kvar
  });

  it("de är noindex, follow i den statiska HTML:en (så att de får en egen sidhuvudsfil trots att de inte står i sajtkartan)", () => {
    for (const p of SJU) expect(avindexeradePaths, p).toContain(p);
    expect(avindexeradePaths.length).toBe(6);
  });

  it("ingen guide eller relaterad lista länkar till dem", () => {
    const vagar = new Set(SJU);
    for (const post of blogPosts) for (const r of relatedPosts(post, 4)) expect(vagar.has(`/blogg/${r.slug}`), `${post.slug} -> ${r.slug}`).toBe(false);
    for (const g of guidesForKeywords(["takmålning", "måla betongpannor", "snörasskydd", "carport", "radhus", "epdm"], 20)) expect(vagar.has(`/blogg/${g.slug}`), g.slug).toBe(false);
    expect(synligaGuider(blogPosts).length).toBe(blogPosts.length - 5);
  });

  it("bloggens lista, startsidan och tjänstesidornas länklistor länkar inte till dem", () => {
    const vagar = new Set(SJU);
    for (const sida of ["/blogg", "/", "/tjanster/taksakerhet", "/tjanster/tegeltak", "/takmalning-taby", "/tjanster/takmalning"]) {
      const lankar = prerenderContent(sida)?.links ?? [];
      for (const l of lankar) expect(vagar.has(l.href), `${sida} -> ${l.href}`).toBe(false);
    }
  });
});

describe("gren 161b: radhusguiden är indexerbar igen", () => {
  it("guiden finns inte i listan över avindexerade, och den nya texten står i blog-posts", async () => {
    const { AVINDEXERADE_GUIDER } = await import("../data/avindexerade-guider");
    const { blogPosts } = await import("../data/blog-posts");
    expect(AVINDEXERADE_GUIDER).not.toContain("byta-tak-radhus-guide");
    const p = blogPosts.find((b) => b.slug === "byta-tak-radhus-guide")!;
    expect(p.title).toBe("Byta tak på radhus: det här är bra att veta först");
    expect([...p.excerpt].length).toBeLessThanOrEqual(160);
    expect(p.updated).toBe("2026-10-21");
    expect(p.content.join(" ")).not.toMatch(/50 000|brandkrav|presenning|gemensamt pris|tegelplåt/i);
    expect(p.content.join(" ")).toContain("(/material/tp20-plattak)");
  });
});
