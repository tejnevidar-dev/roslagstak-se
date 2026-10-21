/**
 * H2 (gren 166, Marknadschefens natt 2026-10-21, seo-analys-2026-10-21/2-live-kontroll.md): inga indexerbara sidor länkar till adresser utanför sajtkartan.
 * Kontrollen går igenom serverns länklista (prerenderContent) för varje adress i sajtkartan och underkänner länkar till noindex-sidor och 301-ompekade adresser.
 * Före gren 166: 300 av 485 sidor länkade till 941 adresser utanför sajtkartan (mest /takmalning-<ort>, /taktvatt-<ort>, /takrenovering-<ort>, /takbyte-<ort>, /takomlaggning-<ort>).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const set = new Set(sidor);
const redirects = readFileSync(resolve(__dirname, "../../public/_redirects"), "utf8");
const ompekade = new Set([...redirects.matchAll(/^(\/[a-z0-9-]+) \/\S* 301$/gm)].map((m) => m[1]));

describe("H2: länkar från sajtkartans sidor", () => {
  it("ingen sida i sajtkartan länkar till en ompekad (301) adress, och inga tjänst × ort-länkar går utanför sajtkartan", () => {
    const tjanstOrt = /^\/(takbyte|takomlaggning|takrenovering|takmalning|taktvatt|betongpannor|tegeltak|platttak|bandtackning)-[a-z0-9-]+$/;
    const fel: string[] = [];
    for (const p of sidor) {
      const c = prerenderContent(p);
      if (!c) continue;
      for (const l of c.links) {
        const h = l.href.replace(/\/$/, "") || "/";
        if (ompekade.has(h)) fel.push(`${p} -> ${h} (301)`);
        else if (tjanstOrt.test(h) && !set.has(h)) fel.push(`${p} -> ${h} (utanför sajtkartan)`);
      }
    }
    expect(fel.slice(0, 15)).toEqual([]);
    expect(fel.length).toBe(0);
  });
});
