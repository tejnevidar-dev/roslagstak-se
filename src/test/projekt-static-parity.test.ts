/**
 * Projektsidorna (AG1, paket 24): faktarutan (etikett och värde), bildgalleriets rubrik och bildtexter och "Fler projekt och tjänster"
 * står som egna block i den statiska HTML:en, ur samma data som ProjectPage.tsx.
 */
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { RELATED_LINKS_INTRO } from "@/data/related-links-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("projektsidor: statisk text", () => {
  it("varje /projekt/<projekt> har faktarutans etiketter och värden, galleriet och Fler projekt och tjänster", () => {
    const saknas: string[] = [];
    for (const p of projects) {
      const lista = prerenderContent(`/projekt/${p.slug}`)?.paragraphs ?? [];
      const förväntat = [
        "Ort", `${p.locationName.split(",")[0]}, Norrtälje kommun`, "Jobb", p.serviceName, "Material", p.material,
        ...(p.area ? ["Yta", p.area] : []), ...(p.period ? ["Utfört", p.period] : []),
        ...(p.facts ?? []).flatMap((f) => [f.label, f.value]),
        ...(p.gallery.length ? ["Bilder från jobbet", ...p.gallery.map((g) => g.alt)] : []),
        "Fler projekt och tjänster", RELATED_LINKS_INTRO,
      ];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${p.slug}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
