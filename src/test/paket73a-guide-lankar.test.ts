/**
 * Paket 73a: "bas i Norrtälje" i sex guider länkar till /taklaggare-norrtalje utan att ett ord ändras, och Norrtälje-sidans länkruta länkar till guiden "Välja takfirma i Norrtälje".
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { hubLinksFor } from "@/data/hub-links";
import { stripInlineMd } from "@/lib/inline-md";
import { prerenderContent } from "../../scripts/prerender-content";

const MAL = "/taklaggare-norrtalje";
const GUIDER = ["takbyte-ljustero-guide-pris", "taklaggare-norrtalje-guide", "takbyte-vaxholm-skargarden", "taklaggare-radmanso-vato", "takrenovering-stockholm-guide", "takstege-takbrygga-sakerhet"];

describe("paket 73a: länkar i guiderna och i länkrutan", () => {
  it.each(GUIDER)("%s: 'bas i Norrtälje' länkar till ortssidan och texten är oförändrad", (slug) => {
    const content = blogPosts.find((p) => p.slug === slug)!.content;
    const rader = content.filter((r) => r.includes(`[bas i Norrtälje](${MAL})`));
    expect(rader, slug).toHaveLength(1);
    expect(stripInlineMd(rader[0])).toContain("bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm");
    expect(content.join("\n").split(`](${MAL})`).length - 1, slug).toBeGreaterThanOrEqual(1);
  });
  it("de sex guiderna står med länken i den statiska HTML:ens länklista", () => {
    for (const slug of GUIDER) expect(prerenderContent("/blogg/" + slug)!.links.some((l) => l.href === MAL), slug).toBe(true);
  });
  it("länkrutan på /taklaggare-norrtalje har guiden med dess egen titel, och bara den sidan", () => {
    const guide = blogPosts.find((p) => p.slug === "taklaggare-norrtalje-guide")!;
    expect(hubLinksFor("norrtalje")).toContainEqual({ href: "/blogg/taklaggare-norrtalje-guide", label: guide.title });
    for (const slug of ["rimbo", "hallstavik", "taby", "blido"]) expect(hubLinksFor(slug).some((l) => l.href === "/blogg/taklaggare-norrtalje-guide"), slug).toBe(false);
    const sida = prerenderContent("/taklaggare-norrtalje")!;
    expect(sida.links.some((l) => l.href === "/blogg/taklaggare-norrtalje-guide" && l.label === guide.title)).toBe(true);
  });
});
