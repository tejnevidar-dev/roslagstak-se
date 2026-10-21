/**
 * Paket 164 (Marknadschefens grind 2026-10-21): /taklaggare-skarholmen får riktig text (ersätter ersättningsmallen, ur villaomraden/texter/skarholmen-stockholm.md) och
 * /taklaggare-norrviken vässas (innehall/norrviken-vassa-briefrader-2026-10-21.md). Varje länkmål ska finnas i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => { const l = locations.find((x) => x.slug === s)!; return JSON.stringify([l.description, l.longDescription, l.extraSections]); };

describe("paket 164: Skärholmen och Norrviken", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  it("Skärholmen: egen titel och meta, avsnitten och länkarna till Vårberg, Segeltorp och Södra Stockholm", () => {
    expect(ortSeoOverrides.skarholmen.title).toBe("Takläggare i Skärholmen – radhus och villor, fast pris");
    expect([...ortSeoOverrides.skarholmen.title].length).toBeLessThanOrEqual(60);
    expect([...ortSeoOverrides.skarholmen.description].length).toBeLessThanOrEqual(160);
    const l = locations.find((x) => x.slug === "skarholmen")!;
    expect(l.extraSections.map((s) => s.heading)).toEqual(expect.arrayContaining(["Det här gör vi i Skärholmen", "Vad det betyder för taket"]));
    const hrefs = prerenderContent("/taklaggare-skarholmen")!.links.map((x) => x.href);
    for (const h of ["/taklaggare-varberg", "/taklaggare-segeltorp", "/omraden/sodra-stockholm"]) {
      expect(hrefs, h).toContain(h);
      expect(sitemap, h).toContain(`/${h.split("/").slice(1).join("/")}</loc>`);
    }
    expect(text("skarholmen")).not.toMatch(/\.csv|ersättningsmall/i);
  });
  it("Norrviken: stycket 'Det här gör vi i Norrviken' och länkarna till Rotebro, Vaxmora, Häggvik, Viby, takbyte i Sollentuna och Sollentuna-sidan", () => {
    const l = locations.find((x) => x.slug === "norrviken")!;
    expect(l.extraSections.some((s) => s.heading === "Det här gör vi i Norrviken")).toBe(true);
    const hrefs = prerenderContent("/taklaggare-norrviken")!.links.map((x) => x.href);
    for (const h of ["/taklaggare-rotebro", "/taklaggare-vaxmora", "/taklaggare-haggvik", "/taklaggare-viby", "/takbyte-sollentuna", "/taklaggare-sollentuna"]) {
      expect(hrefs, h).toContain(h);
      expect(sitemap, h).toContain(`<loc>https://roslagstak.se${h}</loc>`);
    }
    expect(text("norrviken")).toMatch(/Sollentuna kyrka/);
    expect(text("norrviken")).not.toMatch(/\bofta (har|blir|ser|finns)/);
  });
});

describe("paket 164: Österskär och Furusund (innehall/osterskar-furusund-vassa-briefrader-2026-10-21.md)", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  it("båda har stycket 'Det här gör vi', länkarna ritas och varje länkmål finns i sajtkartan", () => {
    const KRAV: Record<string, { rubrik: string; lankar: string[] }> = {
      osterskar: { rubrik: "Det här gör vi i Österskär", lankar: ["/taklaggare-akersberga", "/takbyte-akersberga"] },
      furusund: { rubrik: "Det här gör vi på Furusund", lankar: ["/taklaggare-yxlan", "/taklaggare-svartno", "/takbyte-norrtalje"] },
    };
    for (const [slug, k] of Object.entries(KRAV)) {
      expect(locations.find((x) => x.slug === slug)!.extraSections.some((s) => s.heading === k.rubrik), k.rubrik).toBe(true);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((x) => x.href);
      for (const h of k.lankar) { expect(hrefs, `${slug} ${h}`).toContain(h); expect(sitemap, h).toContain(`<loc>https://roslagstak.se${h}</loc>`); }
    }
  });
  it("Furusund: vägbanken har källan med", () => {
    expect(text("furusund")).toContain("Sedan 1953 går det enligt Wikipedia att köra bil hit.");
  });
});
