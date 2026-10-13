/**
 * Paket 77 (Innehålls leverans 2026-10-13, Del 4 punkt 2, N1, och J1): guiderna som säger att vi har gjort kompletta takbyten på "Blidö och Singö" säger tre jobb:
 * Blidö, Singö och Grisslehamn. Guiderna där meningen handlar om just de två öarna (ö-guiderna) är orörda.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";

const text = (slug: string) => JSON.stringify(blogPosts.find((p) => p.slug === slug)!.content);

describe("paket 77: tre jobb i guiderna", () => {
  it("Välja takfirma i Norrtälje (N1): 'på Blidö, på Singö och i Grisslehamn, alla tre i Norrtälje kommun'", () => {
    const t = text("taklaggare-norrtalje-guide");
    expect(t).toContain("vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn, alla tre i Norrtälje kommun. Bilder och uppgifter finns under [våra projekt](/projekt).");
    expect(t).not.toContain("Blidö och Singö, båda i Norrtälje kommun");
  });
  it.each(["basta-takmaterial-skargarden", "basta-takmaterialet-blido"])("%s: J1:s mening, med detaljerna om Blidö och Singö kvar", (slug) => {
    const t = text(slug);
    expect(t).toContain("Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn. På Blidö lades svarta betongpannor från Benders");
    expect(t).not.toContain("kompletta takbyten på Blidö och Singö");
  });
  it("guider som handlar om just de två öarna är orörda (ö-guiden, Husarö–Finnhamn-guiden)", () => {
    expect(text("takbyte-skargarden-logistik") + text("takbyte-husaro-finnhamn-oar")).toContain("kompletta takbyten på Blidö och Singö");
  });
});
