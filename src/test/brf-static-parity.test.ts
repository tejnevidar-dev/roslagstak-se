/**
 * Paritet för BRF-sidorna (AC5): BrfPage.tsx (React) och den statiska HTML:en (scripts/prerender-content.ts) hämtar texten ur
 * src/data/brf-sections.ts. Testet kontrollerar att varje text finns i den statiska sidan, på /brf och på varje /brf/<ort>,
 * och att sektionerna kommer i samma ordning som på sidan. H1 är orörd och ingår inte.
 */
import { describe, expect, it } from "vitest";
import { brfLocationSlugs } from "@/data/brf-locations";
import {
  BRF_BOENDE, BRF_ECONOMY, BRF_FACTS, BRF_FORM, BRF_HERO_CAPTION, BRF_INTRO, BRF_OFFER, BRF_PLACES_HEADING, BRF_PROCESS, BRF_RESIDENTS, BRF_STEPS,
  brfEyebrow, brfHeroIntro, brfPlaceHeading, brfPlaceParagraphs,
} from "@/data/brf-sections";
import { locations } from "@/data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const gemensamma = [
  BRF_HERO_CAPTION,
  ...BRF_FACTS.flatMap((f) => [f.label, f.value]),
  BRF_INTRO.heading,
  BRF_INTRO.text,
  ...BRF_INTRO.items.flat(),
  BRF_PROCESS.eyebrow,
  BRF_PROCESS.heading,
  BRF_PROCESS.intro,
  ...BRF_STEPS.flatMap((s) => [s.title, s.text]),
  BRF_OFFER.eyebrow,
  BRF_OFFER.heading,
  BRF_OFFER.replace.title,
  BRF_OFFER.replace.text,
  ...BRF_OFFER.replace.items,
  BRF_OFFER.replace.link,
  BRF_OFFER.check.title,
  BRF_OFFER.check.text,
  ...BRF_OFFER.check.items,
  BRF_OFFER.check.link,
  BRF_ECONOMY.eyebrow,
  BRF_ECONOMY.heading,
  ...BRF_ECONOMY.paragraphs,
  BRF_RESIDENTS.eyebrow,
  BRF_RESIDENTS.heading,
  ...BRF_BOENDE.flatMap((b) => [b.title, b.text]),
  BRF_FORM.eyebrow,
  BRF_FORM.heading,
  BRF_FORM.text,
  `${BRF_FORM.areaText} ${BRF_FORM.areaLink}`,
  BRF_FORM.finePrint1,
  `${BRF_FORM.finePrint2} ${BRF_FORM.finePrint2Link}.`,
];

describe("BRF-sidornas statiska text", () => {
  it("/brf har alla block, i sidans ordning, med intro utan det saknade mellanslaget", () => {
    const page = prerenderContent("/brf")!;
    expect(page.intro).toBe(brfHeroIntro());
    expect(page.intro).toContain("Vi arbetar i Storstockholm och Roslagen.");
    const lista = page.paragraphs;
    for (const t of [brfEyebrow(), BRF_PLACES_HEADING, ...gemensamma]) expect(lista, t.slice(0, 50)).toContain(t);
    const ordning = [BRF_HERO_CAPTION, BRF_INTRO.heading, BRF_PROCESS.eyebrow, BRF_OFFER.eyebrow, BRF_ECONOMY.eyebrow, BRF_RESIDENTS.eyebrow, BRF_FORM.eyebrow, BRF_PLACES_HEADING].map((t) => lista.indexOf(t));
    expect(ordning.every((i) => i >= 0)).toBe(true);
    expect([...ordning].sort((a, b) => a - b)).toEqual(ordning);
  });

  it("varje /brf/<ort> har alla block och ortens avsnitt", () => {
    const saknas: string[] = [];
    for (const slug of brfLocationSlugs as readonly string[]) {
      const loc = locations.find((l) => l.slug === slug)!;
      const place = { prep: loc.isIsland ? "på" : "i", name: loc.name };
      const page = prerenderContent(`/brf/${slug}`);
      if (!page) { saknas.push(`${slug}: ingen sida`); continue; }
      if (page.intro !== brfHeroIntro({ name: loc.name })) saknas.push(`${slug}: intro`);
      for (const t of [brfEyebrow(place), brfPlaceHeading(place), ...brfPlaceParagraphs(place), ...gemensamma]) if (!page.paragraphs.includes(t)) saknas.push(`${slug}: ${t.slice(0, 40)}`);
      if (page.paragraphs.includes(BRF_PLACES_HEADING)) saknas.push(`${slug}: ortslistan ska inte finnas på ortssidor`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
