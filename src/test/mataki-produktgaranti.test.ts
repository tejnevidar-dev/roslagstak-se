/**
 * paket-mataki-produktgaranti (Vidars ja 2026-10-25 01:06 som juridiskt undantag, Juristens Rättelse 2 i ledning/jurist/mataki-utan-behorighet-2026-10-25.md):
 * "tätskiktsgaranti" är borta, standard är Haloten PRO eller Haloten STEEL med 30 års produktgaranti, och papptak har ingen 30-årsmening.
 * Provet läser alla förrenderade sidor (sajtkartans sidor, alla ortssidor, alla tjänst × ort-sidor och BRF-sidorna) och de fyra förbjudna mönstren ur forbjudna-monster.json.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import monster from "@/data/seo-regler/forbjudna-monster.json";
import tillatna from "@/data/seo-regler/tillatna-pastaenden.json";
import { GARANTI_ETERNIT, GARANTI_RENOVERING, GARANTI_RENOVERING_CHIP, NO_GARANTI_SERVICE_SLUGS, NO_TATSKIKT_SERVICE_SLUGS } from "@/data/guarantee";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { locations } from "@/data/locations";
import { generateCombos } from "@/data/service-location-combos";
import { brfLocationSlugs } from "@/data/brf-locations";
import { prerenderContent } from "../../scripts/prerender-content";

const DEL2 = "Vid takbyte och takomläggning lägger vi som standard underlagstak från MATAKI (Haloten PRO eller Haloten STEEL), med 30 års produktgaranti från tillverkaren på MATAKI:s villkor. Önskar du ett annat underlagstak står garantin för det i offerten.";
const KORT = "30 års produktgaranti från MATAKI på underlagstaket, som standard";
const SANERING = "Underlagstaket har som standard 30 års produktgaranti från tillverkaren MATAKI, på MATAKI:s villkor.";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = new Set<string>([
  ...[...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/"),
  ...locations.map((l) => `/taklaggare-${l.slug}`),
  ...generateCombos().map((c) => c.url),
  ...brfLocationSlugs.map((s) => `/brf/${s}`),
  "/brf", "/offert", "/priser", "/takkontroll", "/rot-avdrag", "/takreparation", "/hangrannor", "/akut-lackage", "/platslagare", "/kontakt", "/recensioner", "/cookies", "/material/papptak", "/material/underlagstak",
]);

const alltext = (p: string): string | null => {
  const c = prerenderContent(p);
  if (!c) return null;
  return [c.title, c.description, c.h1, c.intro, ...c.paragraphs, ...c.links.map((l) => l.label), JSON.stringify(c.jsonLd ?? [])].join("\n");
};
const regel = (id: string): RegExp => {
  const m = (monster as { monster: { id: string; monster: string; flaggor: string }[] }).monster.find((x) => x.id === id);
  if (!m) throw new Error(`regeln ${id} saknas`);
  return new RegExp(m.monster, m.flaggor);
};
const FORBJUDNA = ["forbjuden-tatskiktsgaranti", "forbjuden-upp-till-30-ar", "forbjuden-30-ars-garanti", "forbjuden-30-ar-pa-taket-arbetet"];

describe("paket-mataki-produktgaranti", () => {
  it("de fyra förbjudna mönstren finns i forbjudna-monster.json och träffar Juristens förbjudna uttryck men inte den nya lydelsen", () => {
    expect(regel("forbjuden-tatskiktsgaranti").test("30 års tätskiktsgaranti via MATAKI")).toBe(true);
    expect(regel("forbjuden-tatskiktsgaranti").test("TÄTSKIKTSGARANTIER")).toBe(true);
    expect(regel("forbjuden-upp-till-30-ar").test("garanti på upp till 30 år")).toBe(true);
    expect(regel("forbjuden-30-ars-garanti").test("Vi lämnar 30 års garanti")).toBe(true);
    expect(regel("forbjuden-30-ar-pa-taket-arbetet").test("30 års garanti på taket")).toBe(true);
    expect(regel("forbjuden-30-ar-pa-taket-arbetet").test("30 års garanti på arbetet")).toBe(true);
    for (const id of FORBJUDNA) for (const ok of [DEL2, KORT, SANERING, GARANTI_ETERNIT, GARANTI_RENOVERING]) expect(regel(id).test(ok), `${id}: ${ok.slice(0, 40)}`).toBe(false);
  });

  it("lydelserna är Juristens, ordagrant: långform, kortform och sanering", () => {
    expect(GARANTI_RENOVERING).toBe(`Vi lämnar 10 års utförandegaranti på det arbete vi utför. ${DEL2}`);
    expect(GARANTI_RENOVERING_CHIP).toBe(KORT);
    expect(GARANTI_ETERNIT).toContain(SANERING);
    expect(GARANTI_ETERNIT).toBe(`Vi lämnar 10 års garanti på utförandet av det nya taket. ${SANERING} Saneringen utförs av saneringsfirman.`);
  });

  it("tillåtna-listan (G2, G3) har den nya lydelsen och inte den gamla", () => {
    const t = JSON.stringify(tillatna);
    expect(t).toContain(KORT);
    expect(t).toContain(DEL2);
    expect(t).toContain(SANERING);
    expect(t).not.toMatch(/30 års tätskiktsgaranti via MATAKI|Tätskiktet har 30 års garanti/);
  });

  it("alla förrenderade sidor: 0 träffar på de fyra mönstren (text, titel, beskrivning, rubrik, länketiketter och schema)", () => {
    const traffar: string[] = [];
    let kollade = 0;
    for (const p of sidor) {
      const t = alltext(p);
      if (t === null) continue;
      kollade++;
      for (const id of FORBJUDNA) if (regel(id).test(t)) traffar.push(`${p}: ${id}`);
    }
    console.info(`MATAKI: ${kollade} förrenderade sidor lästa, ${traffar.length} träffar på de fyra förbjudna mönstren`);
    expect(kollade).toBeGreaterThan(800);
    expect(traffar.slice(0, 10)).toEqual([]);
  });

  it("den nya lydelsen står på sidor om takbyte och takomläggning, och bara där det redan fanns en garantimening (inte på papptak, taksäkerhet, hängrännor eller takkontroll)", () => {
    const med: string[] = [];
    for (const p of sidor) {
      const t = alltext(p);
      if (t && /produktgaranti/.test(t)) med.push(p);
    }
    console.info(`MATAKI: ${med.length} sidor har den nya produktgarantilydelsen`);
    expect(med.length).toBeGreaterThan(300);
    for (const p of med) {
      expect(p, p).not.toMatch(/papp/);
      expect(p, p).not.toMatch(/^\/tjanster\/(takavvattning|taksakerhet|takinspektion)$/);
    }
    for (const slug of [...NO_TATSKIKT_SERVICE_SLUGS, ...NO_GARANTI_SERVICE_SLUGS]) {
      const t = alltext(`/tjanster/${slug}`) ?? "";
      expect(t, slug).not.toMatch(/MATAKI|produktgaranti/);
    }
  });

  it("papptak: ingen 30-årsmening och ingen MATAKI på någon papptakssida", () => {
    for (const p of sidor) {
      if (!/papp/.test(p)) continue;
      const t = alltext(p) ?? "";
      expect(t, p).not.toMatch(/MATAKI|produktgaranti|30 års/);
    }
    const material = alltext("/material/papptak");
    expect(material).not.toBeNull();
  });

  it("faktarutan på /tjanster/takomlaggning heter Underlagstak och har kortformen", () => {
    const t = alltext("/tjanster/takomlaggning") ?? "";
    expect(t).toContain(`Underlagstak: ${KORT}`);
    expect(t).not.toMatch(/Tätskikt: 30 års/);
  });

  it("omdömesrubriken är 'Omdömen på Google', ingressen är oförändrad och ingen sida har den gamla rubriken", () => {
    expect(GOOGLE_REVIEWS_TEXT.title).toBe("Omdömen på Google");
    expect(GOOGLE_REVIEWS_TEXT.ingress).toBe("Läs omdömen om RoslagsTak direkt på vår Google-företagsprofil. Vi publicerar inga egenskrivna recensioner och kan inte kontrollera vem som skriver på Google.");
    let sidorMedRubrik = 0;
    for (const p of sidor) {
      const t = alltext(p);
      if (!t) continue;
      expect(t, p).not.toContain("Omdömen från våra kunder");
      if (t.includes("Omdömen på Google")) sidorMedRubrik++;
    }
    console.info(`Omdömesrubriken 'Omdömen på Google' står på ${sidorMedRubrik} av sidorna`);
    expect(sidorMedRubrik).toBeGreaterThan(300);
  });
});
