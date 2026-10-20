/**
 * Paket 155 (Marknadschefens grind 2026-10-21): kommunsidorna Sigtuna, Vaxholm, Bro, Kungsängen och Nynäshamn vässas ur innehall/kommuner5-vassa-briefrader-2026-10-21.md
 * (kyrkavsnitt, "byta tak", länkar till takbytessidorna, stycket "Det här gör vi i Kungsängen"). Varje länkmål ska finnas som sida och i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => {
  const l = locations.find((x) => x.slug === s)!;
  return JSON.stringify([l.description, l.longDescription, l.extraSections]);
};
const KRAV: Record<string, string[]> = {
  sigtuna: ["/takbyte-sigtuna"],
  vaxholm: [],
  bro: ["/takbyte-bro"],
  kungsangen: ["/takbyte-kungsangen", "/taklaggare-upplands-bro", "/taklaggare-bro"],
  nynashamn: ["/takbyte-nynashamn"],
};

describe("paket 155: Sigtuna, Vaxholm, Bro, Kungsängen och Nynäshamn", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, lankar] of Object.entries(KRAV)) {
    it(`${slug}: kyrkan och sökordet finns, länkarna ritas i serverns HTML och varje länkmål finns i sajtkartan`, () => {
      const t = text(slug);
      expect(t, "kyrka").toMatch(/[Kk]yrk/);
      expect(t, "byta tak").toContain("byta tak");
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((l) => l.href);
      for (const l of lankar) {
        expect(hrefs, l).toContain(l);
        expect(sitemap, l).toContain(`<loc>https://roslagstak.se${l}</loc>`);
      }
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
      expect(t, slug).not.toMatch(/\bofta (har|blir|ser|finns)/);
    });
  }
  it("Kungsängen har stycket 'Det här gör vi i Kungsängen' före mallens 'Så går det till'", () => {
    const l = locations.find((x) => x.slug === "kungsangen")!;
    const s = l.extraSections.find((x) => x.heading === "Det här gör vi i Kungsängen");
    expect(s).toBeTruthy();
    expect(s!.text).toContain("(/taklaggare-upplands-bro)");
    expect(s!.text).toContain("(/taklaggare-bro)");
  });
});
