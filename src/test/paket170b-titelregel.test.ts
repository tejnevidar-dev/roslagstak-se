/**
 * Gren 170b (Marknadschefens grind 2026-10-22 02:14): (1) titelregeln för alla tjänst × ort-sidor: suffixet " | RoslagsTak" sätts av EN regel (withSuffix i seo-fit.ts, samma i React och i den
 * statiska HTML:en) och titeln är högst 60 tecken inklusive suffixet; suffixet faller bort hellre än att titeln kortas. (2) Väddö och Svartnö heter "på".
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { ortPrep } from "../data/ort-prep";
import { fitTitle, withSuffix } from "../lib/seo-fit";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se(\/(?:takbyte|takomlaggning|takrenovering|takmalning|taktvatt|bandtackning|betongpannor|tegeltak|platttak)-[a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);

describe("gren 170b", () => {
  it("alla tjänst × ort-sidor i sajtkartan: titeln ≤ 60 tecken inklusive suffixet, och suffixet faller bort i stället för att titeln kortas", () => {
    expect(sidor.length).toBeGreaterThan(90);
    for (const p of sidor) {
      const c = prerenderContent(p);
      if (!c) continue;
      const titel = c.title as string;
      const slut = withSuffix(fitTitle(titel));
      expect([...slut].length, `${p}: ${slut}`).toBeLessThanOrEqual(60);
      // fitTitle kortar inte en titel som redan ryms: titeln är oförändrad, bara suffixet kan saknas
      expect(fitTitle(titel), p).toBe(titel);
      expect(slut === titel || slut === `${titel} | RoslagsTak`, p).toBe(true);
      // suffixet läggs bara på när det ryms (titeln ≤ 47 tecken)
      expect(slut.endsWith(" | RoslagsTak"), p).toBe([...titel].length <= 47 && !titel.includes("RoslagsTak"));
    }
  });
  it("den statiska HTML:ens regel är samma som SEOHeads", () => {
    const k = readFileSync(resolve(__dirname, "../../scripts/generate-static-heads.mjs"), "utf8");
    expect(k).toContain("headMeta.title.length > 47 || headMeta.title.includes(\"RoslagsTak\")");
    expect(readFileSync(resolve(__dirname, "../lib/seo-fit.ts"), "utf8")).toContain("title.length > 47 || title.includes(\"RoslagsTak\")");
  });
  it("Väddö och Svartnö heter 'på' (H1, titel, genererade meningar)", () => {
    for (const s of ["vaddo", "svartno"]) {
      const l = locations.find((x) => x.slug === s)!;
      expect(ortPrep(l), s).toBe("på");
      const c = prerenderContent(`/taklaggare-${s}`)!;
      expect(c.h1, s).toContain(`på ${l.name}`); // Väddös H1 är "Takläggare i Roslagsbro och på Väddö"
      expect(JSON.stringify(c.paragraphs), s).not.toMatch(new RegExp(`i ${l.name}[?.,"]`));
    }
  });
});
