/**
 * Paket 120b: tilläggen till gren 120 ur Marknadschefens ruta 2026-10-18: H1 (länken "Hallstavik" på /taklaggare-norrtalje), P1 (guiden Måla plåttak, titel A och beskrivning A)
 * och P2 (/material/tp20-plattak, bara titeln). Underlag: innehall/seo-hallstavik-, seo-mala-plattak- och seo-plattak-pris-2026-10-18.md.
 */
import { describe, expect, it } from "vitest";
import { resolveMeta } from "../data/overrides";
import { blogPosts } from "../data/blog-posts";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const bas = { title: "Bas", description: "Bas" };

describe("paket 120b: H1, länken till Hallstavik", () => {
  const norrtalje = JSON.stringify(locations.find((l) => l.slug === "norrtalje"));
  it("första ordet 'Hallstavik' i löptexten är en länk till /taklaggare-hallstavik, texten är orörd", () => {
    expect(norrtalje).toContain("- **[Hallstavik](/taklaggare-hallstavik)** var en by fram till början av 1900-talet.");
    expect(norrtalje.split("(/taklaggare-hallstavik)").length - 1).toBe(1);
    expect(norrtalje).not.toContain("**Hallstavik** var en by");
  });
  it("serverns HTML har länken, och sidan länkar inte dubbelt dit", () => {
    const l = prerenderContent("/taklaggare-norrtalje")!.links.filter((x) => x.href === "/taklaggare-hallstavik");
    expect(l.length).toBeGreaterThanOrEqual(1);
    expect(l[0].label).toBe("Hallstavik");
    const text = JSON.stringify(prerenderContent("/taklaggare-norrtalje"));
    expect(text).toContain("Hallstavik var en by fram till början av 1900-talet.");
    expect(text).not.toContain("](/taklaggare-hallstavik)");
  });
  it("faktarutans ortlista är orörd (inte löptext)", () => {
    expect(norrtalje).toContain("Rimbo, Hallstavik, Älmsta, Bergshamra");
  });
});

describe("paket 120b: P1, guiden Måla plåttak", () => {
  it("titel A och beskrivning A, brödtext och H1 orörda", () => {
    const m = resolveMeta("/blogg/mala-plattak-guide-pris", bas);
    expect(m.title).toBe("Måla plåttak: när målning håller och när plåten bör bytas");
    expect(m.description).toBe("Målning av plåttak: det här avgör om färgen håller, skillnaden mellan platsmålad och fabrikslackerad plåt och vad du kan se själv från marken.");
    expect(m.description.length).toBe(142);
    const post = blogPosts.find((p) => p.slug === "mala-plattak-guide-pris")!;
    expect(post.title).toBe("Måla plåttak: när det går och när plåten bör bytas"); // H1 är guidens rubrik och ändras inte här
    expect(post.excerpt).toContain("hur du får ett fast pris"); // excerpt (listkort) orört
  });
  it("beskrivningen har inga säljled och inget pris", () => {
    const d = resolveMeta("/blogg/mala-plattak-guide-pris", bas).description.toLowerCase();
    for (const borta of ["fast pris", "kr", "offert", "vi målar", "takmålning"]) expect(d, borta).not.toContain(borta);
  });
});

describe("paket 120b: P2, /material/tp20-plattak", () => {
  it("bara titeln ändras (titel A utan belopp), beskrivningen står kvar", () => {
    const m = resolveMeta("/material/tp20-plattak", bas);
    expect(m.title).toBe("Plåttak pris: TP20, pannplåt och dubbelfalsat");
    expect(m.title + " | RoslagsTak").toBe("Plåttak pris: TP20, pannplåt och dubbelfalsat | RoslagsTak");
    expect(m.title.replace("TP20", "")).not.toMatch(/\d/);
    expect(m.description).toBe("Plåttak: riktpriser efter ROT-avdrag för TP20, pannplåt och dubbelfalsad plåt, vad som påverkar priset och vad som ingår. Fast pris i offerten.");
  });
});
