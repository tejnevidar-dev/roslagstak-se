/**
 * Paket 163 (Marknadschefens grind 2026-10-21): Älvsjö, Stuvsta, Djursholm och Trångsund vässas ur innehall/ortssidor6-vassa-briefrader-2026-10-21.md
 * (stycket "Det här gör vi i <ort>" före "Så går det till", länkar med ortsnamn, K2). Varje länkmål ska finnas i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => { const l = locations.find((x) => x.slug === s)!; return JSON.stringify([l.description, l.longDescription, l.extraSections]); };
const KRAV: Record<string, { rubrik: string; lankar: string[] }> = {
  alvsjo: { rubrik: "Det här gör vi i Älvsjö", lankar: ["/taklaggare-langsjo", "/taklaggare-langbro", "/taklaggare-orby", "/taklaggare-snattringe", "/takbyte-alvsjo", "/omraden/sodra-stockholm"] },
  stuvsta: { rubrik: "Det här gör vi i Stuvsta", lankar: ["/takbyte-huddinge", "/takomlaggning-huddinge", "/taklaggare-huddinge"] },
  djursholm: { rubrik: "Det här gör vi i Djursholm", lankar: ["/takbyte-danderyd", "/taklaggare-danderyd"] },
  trangsund: { rubrik: "Det här gör vi i Trångsund", lankar: ["/takbyte-huddinge", "/taklaggare-huddinge"] },
};

describe("paket 163: Älvsjö, Stuvsta, Djursholm och Trångsund", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: stycket finns före 'Så går det till', länkarna ritas och varje länkmål finns i sajtkartan`, () => {
      const l = locations.find((x) => x.slug === slug)!;
      expect(l.extraSections.some((x) => x.heading === k.rubrik), k.rubrik).toBe(true);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((x) => x.href);
      for (const h of k.lankar) {
        expect(hrefs, `${slug} ${h}`).toContain(h);
        expect(sitemap, h).toContain(h.startsWith("/omraden/") ? `/omraden/sodra-stockholm</loc>` : `<loc>https://roslagstak.se${h}</loc>`);
      }
      expect(text(slug)).not.toMatch(/\bofta (har|blir|ser|finns)/);
    });
  }
});
