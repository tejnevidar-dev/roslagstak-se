/**
 * Gren 197e: ägarsidor i de fem nästa kommunerna (Solna, Värmdö, Nacka, Sollentuna, Stockholm). Varje tunn tjänst × ort-sida pekas om till ortens egen ortssida,
 * inte till en riksomfattande tjänste- eller materialsida och inte lämnad som noindex utan 301. Sidor med egen text berörs inte. Provet löser upp varje adress som Cloudflare Pages gör.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { allServiceSlugs } from "../data/service-slugs";
import { isThinCombo } from "../data/thin-combos";
import { ortAvindexerad } from "../data/avindexerade-orter";

const rot = resolve(__dirname, "../..");
const regler = readFileSync(resolve(rot, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => r.split(/\s+/) as [string, string, string]);
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const sitemapVagar = new Set([...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));
const losUpp = (path: string): string | null => {
  for (const [kalla, mal] of regler) {
    if (kalla.endsWith("*")) {
      const prefix = kalla.slice(0, -1);
      if (path.startsWith(prefix)) return mal.replace(":splat", path.slice(prefix.length));
    } else if (kalla === path) return mal;
  }
  return null;
};

const GRUPPER: Record<string, string[]> = {
  Solna: ["solna"],
  "Värmdö": ["varmdo","ingaro","stavsnas","djuro","alvsala","stromma"],
  Nacka: ["storangen","lannersta","nacka","saltsjobaden","alta","bjorknas","kummelnas","kil"],
  Sollentuna: ["viby","tegelhagen-silverdal","sollentuna","haggvik","sjoberg","vaxmora"],
  Stockholm: ["langbro","orby","skondal","herrangen","solhem-lunda","kalvesta","stockholm","hasselby","alvsjo","enskede","skarpnack","hagersten","nockeby","angby","langsjo","alsten","nockebyhov","bromma-kyrka","flysta","malarhojden","stureby","varberg","smedslatten","hoglandet","stora-mossen","sodra-angby","enskededalen","tallkrogen","appelviken","bromsten","svedmyra","eneby","ballsta-bromma","ulvsunda","enskede-gard","enskedefaltet","bagarmossen"],
};

/** Gren 197c-b (Marknadschefens grind 2026-10-24 00:57): äldre exakta rader med belägg per rad (allmänna sökord, gren 129 och 171) behåller sin tjänstesida. */
const BEHALLNA = new Set(["/tegeltak-bro", "/platttak-sundbyberg", "/takomlaggning-bro", "/takomlaggning-tumba", "/takomlaggning-marsta", "/takomlaggning-vaxholm", "/bandtackning-ljustero", "/takrenovering-osterskar", "/takbyte-enebyberg"]);

describe("gren 197e: ägarsidor i fem kommuner till", () => {
  for (const [kommun, slugs] of Object.entries(GRUPPER)) {
    it(`${kommun}: varje tunn tjänst × ort-sida pekas om till ortens ägarsida, sidor med egen text berörs inte`, () => {
      let tunna = 0;
      for (const slug of slugs) {
        const l = locations.find((x) => x.slug === slug)!;
        expect(l, slug).toBeDefined();
        for (const s of allServiceSlugs) {
          const p = `/${s}-${slug}`;
          const mal = losUpp(p);
          if (!isThinCombo(s, l)) {
            expect(mal, `${p}: har egen text och får inte pekas om`).toBeNull();
            continue;
          }
          // äldre exakta rader med belägg per rad (gren 129 och 171) behåller sin tjänste- eller materialsida (grind 197c-b)
          if (BEHALLNA.has(p) || (/^\/(tjanster|material)\//.test(mal ?? "") && regler.some(([k]) => k === p))) {
            expect(mal, p).toMatch(/^\/(tjanster|material)\//);
            continue;
          }
          tunna++;
          // ortens ägarsida, eller (äldre rad per sida, gren 171) en tjänst × ort-sida med egen text för samma ort
          const tjanstSidaMedText = (mal ?? "").match(/^\/(takbyte|takrenovering|takomlaggning)-([a-z0-9-]+)$/);
          if (tjanstSidaMedText) {
            expect(tjanstSidaMedText[2], `${p} -> ${mal} är en annan orts sida`).toBe(slug);
            expect(isThinCombo(tjanstSidaMedText[1], l), `${p} -> ${mal} har ingen egen text`).toBe(false);
          } else if (mal !== `/taklaggare-${slug}`) {
            // äldre exakta rader med belägg per rad (gren 129) kan ha en annan ägarsida i samma kommun (till exempel Hägersten till Aspudden); de behålls
            expect(regler.some(([k, m]) => k === p && m === mal), `${p} -> ${mal} är inte ortens egen sida och inte en äldre exakt rad`).toBe(true);
            expect(mal, p).toMatch(/^\/taklaggare-[a-z0-9-]+$/);
          }
          expect(ortAvindexerad(slug), `${slug}: ortssidan är avindexerad`).toBe(false);
          expect(sitemapVagar.has(mal!), `${p} -> ${mal} står inte i sajtkartan`).toBe(true);
        }
      }
      expect(tunna).toBeGreaterThan(0);
    });
  }
});
