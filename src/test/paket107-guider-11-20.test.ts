/**
 * Paket 107: guiderna 11–20 enligt Innehålls passrapport 163 (innehall/guider-11-20-lasning-2026-10-15.md): alla 21 fynd, ordagrant.
 * Tilläggsmeningen är juristens P2, "Tillägg bara efter ditt godkännande." BRF-guidens målgrupp är orörd (Vidar).
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";

const guide = (slug: string) => {
  const g = blogPosts.find((p) => p.slug === slug);
  expect(g, slug).toBeTruthy();
  return g!.content.join("\n");
};
const NY: [string, string][] = [
  ["hangrannor-stupror-skargard", "Där kan rören få stötar och rosta."],
  ["hangrannor-stupror-skargard", "kan det vara bättre att byta dem helt."],
  ["hangrannor-stupror-skargard", "Det kan vara det. Ställningen står redan på plats"],
  ["hangrannor-stupror-skargard", "Det går vi igenom vid takkontrollen."],
  ["plattak-vs-betongpannor", "## Vikten\n"],
  ["plattak-vs-betongpannor", "ger ett pannat tak. De finns i flera kulörer och profiler."],
  ["plattak-vs-betongpannor", "Hur mycket ett plåttak hörs när det regnar beror på vad som finns under plåten."],
  ["takrenovering-sommarstuga-roslagen", "och varje skarv ska vara tät."],
  ["takrenovering-sommarstuga-roslagen", "Det beror på taket, och särskilt på underlaget, alltså det som ligger under pannorna, plåten eller pappen."],
  ["takrenovering-sommarstuga-roslagen", "Kan arbetet göras när vi inte är i stugan?** Det går vi igenom innan arbetet börjar. Tillägg bara efter ditt godkännande."],
  ["takbyte-ljustero-guide-pris", "## Med bil via färjan"],
  ["takbyte-ljustero-guide-pris", "Kan arbetet göras när vi inte är på ön?** Det går vi igenom innan arbetet börjar. Tillägg bara efter ditt godkännande."],
  ["takbyte-ljustero-guide-pris", "och fritidshus har byggts om och byggts till."],
  ["tecken-byta-tak", "Det kan synas som grus i hängrännorna."],
  ["tecken-byta-tak", "kan visa att vatten tar sig dit det inte ska."],
  ["tecken-byta-tak", "Vinden kan berätta mer än utsidan."],
  ["tecken-byta-tak", "## Underlaget kan avgöra mer än ytan"],
  ["tecken-byta-tak", "Underlaget syns inte från marken."],
  ["tecken-byta-tak", "kan tyda på att underlaget inte längre håller tätt."],
];
const BORTA: [string, string][] = [
  ["hangrannor-stupror-skargard", "Det är där rören oftast får stötar och rostar"],
  ["hangrannor-stupror-skargard", "är det oftast bättre att byta dem helt"],
  ["hangrannor-stupror-skargard", "Ofta. Ställningen står redan på plats"],
  ["hangrannor-stupror-skargard", "Det ser vi vid takkontrollen."],
  ["plattak-vs-betongpannor", "Vikten: det som oftast avgör"],
  ["plattak-vs-betongpannor", "Priset skiljer mindre än många tror."],
  ["plattak-vs-betongpannor", "det som många förknippar med en svensk villa"],
  ["plattak-vs-betongpannor", "Plåttak kan upplevas som ljudligare vid regn"],
  ["takrenovering-sommarstuga-roslagen", "plåtarbetet avgör hur tätt det blir"],
  ["takrenovering-sommarstuga-roslagen", "Det som avgör är underlaget"],
  ["takrenovering-sommarstuga-roslagen", "också om du inte är på plats"],
  ["takbyte-ljustero-guide-pris", "Färjan gör det enkelt"],
  ["takbyte-ljustero-guide-pris", "också om du inte är på plats"],
  ["takbyte-ljustero-guide-pris", "och många fritidshus har byggts om"],
  ["tecken-byta-tak", "Ofta syns det som grus i hängrännorna."],
  ["tecken-byta-tak", "visar att vatten tar sig dit det inte ska"],
  ["tecken-byta-tak", "Vinden berättar ofta mer än utsidan."],
  ["tecken-byta-tak", "## Underlaget avgör mer än ytan"],
  ["tecken-byta-tak", "och då är det underlaget som avgör"],
  ["tecken-byta-tak", "Underlaget går sällan att se utan att någon tittar på taket på plats."],
  ["tecken-byta-tak", "tyder på att underlaget inte längre håller tätt"],
];

describe("paket 107: guiderna 11–20", () => {
  it("Innehålls nya meningar står i guiderna", () => {
    for (const [slug, t] of NY) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).toContain(t);
  });
  it("de gamla formuleringarna är borta", () => {
    for (const [slug, t] of BORTA) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).not.toContain(t);
  });
  it("BRF-guidens målgrupp är orörd (Vidar)", () => {
    expect(guide("byta-tak-brf-guide-styrelse")).toContain("bostadsrättsföreningar");
  });
  it("guider utanför ordern är orörda: Vaxholm, Husarö och Rådmansö har kvar sin tilläggsmening (inte i Innehålls lista)", () => {
    for (const slug of ["takbyte-vaxholm-skargarden", "takbyte-husaro-finnhamn-oar", "taklaggare-radmanso-vato"]) expect(guide(slug), slug).toContain("också om du inte är på plats");
  });
});
