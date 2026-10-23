/**
 * Gren 197: en ägarsida per ort. I de första fem kommunerna (Upplands-Bro, Botkyrka, Sundbyberg, Nynäshamn, Ekerö) pekas varje tunn tjänst × ort-sida om till ortens egen ortssida
 * (för Upplands-Bro ägs kommunsökorden av /taklaggare-bro), inte till en riksomfattande tjänste- eller materialsida och inte lämnad som noindex utan 301. Sidor med egen text berörs inte.
 * Provet löser upp varje adress som Cloudflare Pages gör: första träffen gäller, en platshållarregel träffar adresser som börjar på prefixet.
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
  "Upplands-Bro": ["upplands-bro", "bro", "kungsangen"],
  Botkyrka: ["botkyrka", "grodinge", "slagsta", "tumba", "uttran"],
  Sundbyberg: ["sundbyberg", "duvbo", "ursvik"],
  Nynäshamn: ["nynashamn"],
  Ekerö: ["ekero", "stenhamra", "alvnas", "trakvista", "kungsberga", "svartsjo", "ekero-sommarstad"],
};
/** Upplands-Bro: ortssidan för kommunen är avindexerad som ägare, /taklaggare-bro äger kommunsökorden (befintliga rader går dit). */
const agare = (ort: string) => (ort === "upplands-bro" ? "/taklaggare-bro" : `/taklaggare-${ort}`);

/** Gren 197c-b (Marknadschefens grind 2026-10-24 00:57): äldre exakta rader med belägg per rad (allmänna sökord, gren 129 och 171) behåller sin tjänstesida. */
const BEHALLNA = new Set(["/tegeltak-bro", "/platttak-sundbyberg", "/takomlaggning-bro", "/takomlaggning-tumba", "/takomlaggning-marsta", "/takomlaggning-vaxholm", "/bandtackning-ljustero", "/takrenovering-osterskar", "/takbyte-enebyberg"]);

describe("gren 197: ägarsidor i fem kommuner", () => {
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
          if (BEHALLNA.has(p)) {
            expect(mal, p).toMatch(/^\/(tjanster|material)\//);
            continue;
          }
          tunna++;
          expect(mal, p).not.toBeNull();
          // en 301 som redan pekade på ortssidan (gren 195 och äldre) behålls; luckorna ska nu också gå dit
          expect(mal, `${p} pekar inte på ägarsidan`).toMatch(/^\/taklaggare-[a-z0-9-]+$/);
          if (!ortAvindexerad(slug) && slug !== "upplands-bro") expect(mal, p).toBe(agare(slug));
          expect(sitemapVagar.has(mal!), `${p} -> ${mal} står inte i sajtkartan`).toBe(true);
        }
      }
      expect(tunna).toBeGreaterThan(0);
    });
  }

  it("Upplands-Bro: kommunsidans tunna sidor går till /taklaggare-bro, och ingen rad pekar på en avindexerad ortssida", () => {
    for (const s of allServiceSlugs) {
      const l = locations.find((x) => x.slug === "upplands-bro")!;
      if (!isThinCombo(s, l)) continue;
      const mal = losUpp(`/${s}-upplands-bro`);
      expect(["/taklaggare-bro", "/taklaggare-upplands-bro"], `${s}-upplands-bro -> ${mal}`).toContain(mal);
    }
    for (const [, mal] of regler) {
      const m = mal.match(/^\/taklaggare-([a-z0-9-]+)$/);
      if (m) expect(ortAvindexerad(m[1]), `rad pekar på avindexerad ${mal}`).toBe(false);
    }
  });

  it("de fem kommunernas luckor är inte kvar: inga tunna sidor går till riksomfattande tjänste- eller materialsidor", () => {
    for (const slugs of Object.values(GRUPPER))
      for (const slug of slugs) {
        const l = locations.find((x) => x.slug === slug)!;
        for (const s of allServiceSlugs) {
          if (!isThinCombo(s, l) || BEHALLNA.has(`/${s}-${slug}`)) continue;
          expect(losUpp(`/${s}-${slug}`), `/${s}-${slug}`).not.toMatch(/^\/(tjanster|material)\//);
        }
      }
  });
});
