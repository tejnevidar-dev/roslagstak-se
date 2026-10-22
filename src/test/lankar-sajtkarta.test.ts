/**
 * H2 (gren 166, rättad efter Marknadschefens grind 2026-10-21 23:22, seo-analys-2026-10-21/2-live-kontroll.md): indexerbara sidor länkar inte till noindex-kombinationer eller ompekade adresser,
 * men inget synligt innehåll tas bort: raderna behåller sina etiketter och pekar på tjänstens egen indexerbara sida. Takmålning har ingen indexerbar tjänstesida, behåller sitt mål
 * och väntar på Vidar; provet undantar dem och rapporterar antalet som en egen siffra.
 * Före gren 166: 300 av 485 sidor länkade till 941 adresser utanför sajtkartan (1 092 länkar), varav takmålning (230 ortssidor + 70 tjänst × ort-sidor).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { hasServiceCombos } from "../data/service-slugs";
import { isThinCombo } from "../data/thin-combos";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const set = new Set(sidor);
const redirects = readFileSync(resolve(__dirname, "../../public/_redirects"), "utf8");
const ompekade = new Set([...redirects.matchAll(/^(\/[a-z0-9-]+) \/\S* 301$/gm)].map((m) => m[1]));

describe("H2: länkar från sajtkartans sidor", () => {
  it("ingen länk till en ompekad (301) adress, ingen länk till /takmalning-* (gren 195b) och ingen tjänst × ort-länk utanför sajtkartan", () => {
    const tjanstOrt = /^\/(takbyte|takomlaggning|takrenovering|takmalning|taktvatt|betongpannor|tegeltak|platttak|bandtackning)-[a-z0-9-]+$/;
    const fel: string[] = [];
    let takmalning = 0;
    let rader = 0;
    for (const p of sidor) {
      const c = prerenderContent(p);
      if (!c) continue;
      for (const l of c.links) {
        const h = l.href.replace(/\/$/, "") || "/";
        if (ompekade.has(h) || h.startsWith("/takmalning-")) fel.push(`${p} -> ${h} (301)`);
        else if (tjanstOrt.test(h) && !set.has(h)) fel.push(`${p} -> ${h} (utanför sajtkartan)`);
        rader++;
      }
    }
    console.info(`H2: ${rader} länkar i sajtkartans sidor, ${takmalning} till takmålningssidor (gren 195b: Vidars ja 2026-10-22 07:47, länken är borttagen)`);
    expect(fel.slice(0, 15)).toEqual([]);
    expect(fel.length).toBe(0);
    expect(takmalning).toBe(0);
  });

  it("raderna behåller sina etiketter, och noindex-kombinationer pekar på tjänstesidan (ompekade rader visas inte, som förut)", () => {
    const c = prerenderContent("/taklaggare-almsta")!;
    const m = (e: string) => c.links.find((l) => l.label === e)?.href;
    expect(m("Takrenovering i Älmsta")).toBe("/tjanster/takrenovering");
    expect(m("Taktvätt i Älmsta")).toBe("/tjanster/taktvatt");
    expect(m("Takmålning i Älmsta")).toBeUndefined(); // gren 195b: takmålningsraden är borttagen (Vidars ja 2026-10-22 07:47)
    // Älmstas takbyte och takomläggning är ompekade (301) och visas inte
    expect(m("Takbyte i Älmsta")).toBeUndefined();
    // en ort vars takbyte är noindex men inte ompekat behåller raden och pekar på tjänstesidan
    const ort = locations.find((l) => hasServiceCombos(l.region) && isThinCombo("takbyte", l) && !ompekade.has(`/takbyte-${l.slug}`) && sidor.includes(`/taklaggare-${l.slug}`));
    expect(ort, "en ort med noindex-takbyte som inte är ompekat").toBeTruthy();
    const c2 = prerenderContent(`/taklaggare-${ort!.slug}`)!;
    const rad = c2.links.find((l) => l.label.startsWith("Takbyte ") && l.label.endsWith(ort!.name));
    expect(rad?.href).toBe("/tjanster/takomlaggning");
  });
});
