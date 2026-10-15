/**
 * Paket 109: guiderna 31–40 enligt Innehålls passrapport 165 (innehall/guider-31-40-lasning-2026-10-15.md): alla 18 fynd, ordagrant (N1 står kvar).
 * Tilläggsmeningen är juristens P2. Takinspektion-guidens adress och titel, plåtlänken i TP20-guiden och "Be om att få det viktiga på papper" är orörda.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";

const guide = (slug: string) => {
  const g = blogPosts.find((p) => p.slug === slug);
  expect(g, slug).toBeTruthy();
  return g!.content.join("\n");
};
const NY: [string, string][] = [
  ["takkontroll-fore-vintern", "Genom sådana öppningar kan yrsnö och smältvatten ta sig in."],
  ["betongpannor-eller-lertegel", "Det kan passa på äldre hus, där taket är en viktig del av husets karaktär,"],
  ["betongpannor-eller-lertegel", "Priset för ett takbyte beror på takets storlek"],
  ["tp20-eller-dubbelfalsat-platttak", "Två val vid ett takbyte är TP20,"],
  ["tp20-eller-dubbelfalsat-platttak", "kan falsat vara ett naturligt val."],
  ["tp20-eller-dubbelfalsat-platttak", "TP20 kommer i långa längder och skruvas direkt."],
  ["takbyte-skargarden-logistik", "går vi igenom vid takkontrollen."],
  ["takbyte-skargarden-logistik", "Ett fritidshus kan ha byggts till i omgångar."],
  ["takbyte-skargarden-logistik", "eftersom varje anslutning ska vara tät."],
  ["takbyte-skargarden-logistik", "Tillägg bara efter ditt godkännande."],
  ["basta-takmaterial-skargarden", "Den frågan avgör mer än läget."],
  ["takinspektion-guide", "Det är lätt att inte tänka på taket förrän det läcker. Då kan vattnet redan ha hunnit in i underlaget och isoleringen."],
  ["takinspektion-guide", "Underlaget under pannorna eller plåten, som har stor betydelse för hur taket mår, går inte att se från marken."],
  ["forbered-takbyte-checklista", "Efter takkontrollen får du en rapport om takets skick."],
  ["basta-takmaterialet-blido", "Enligt Wikipedia har Blidö haft sommargäster sedan slutet av 1800-talet,"],
  ["takbyte-vaxholm-skargarden", "Tillägg bara efter ditt godkännande."],
];
const BORTA: [string, string][] = [
  ["takkontroll-fore-vintern", "Det är genom sådana öppningar som yrsnö"],
  ["betongpannor-eller-lertegel", "Det är ofta förstahandsvalet på äldre hus"],
  ["betongpannor-eller-lertegel", "beror mest på takets storlek"],
  ["tp20-eller-dubbelfalsat-platttak", "Två av de vanligaste valen"],
  ["tp20-eller-dubbelfalsat-platttak", "oftast det självklara valet"],
  ["tp20-eller-dubbelfalsat-platttak", "TP20 är snabbt att lägga"],
  ["takbyte-skargarden-logistik", "Vid samma besök går det att se det som påverkar planeringen"],
  ["takbyte-skargarden-logistik", "Många fritidshus har byggts till i omgångar."],
  ["takbyte-skargarden-logistik", "plåtarbetet avgör hur tätt taket blir"],
  ["takbyte-skargarden-logistik", "Tillägg görs bara efter ditt godkännande."],
  ["takbyte-skargarden-logistik", "så fråga byggnadsnämnden om du är osäker. Det kan gälla särskilda bestämmelser"],
  ["basta-takmaterial-skargarden", "Det är oftast den frågan som avgör"],
  ["takinspektion-guide", "De flesta tänker inte på taket förrän det läcker."],
  ["takinspektion-guide", "Det som avgör hur taket mår, underlaget under pannorna eller plåten"],
  ["forbered-takbyte-checklista", "En takkontroll visar om taket behöver bytas, läggas om eller bara lagas."],
  ["basta-takmaterialet-blido", "Blidö har haft sommargäster sedan slutet av 1800-talet,"],
  ["takbyte-vaxholm-skargarden", "också om du inte är på plats"],
];

describe("paket 109: guiderna 31–40", () => {
  it("Innehålls nya meningar står i guiderna", () => {
    for (const [slug, t] of NY) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).toContain(t);
  });
  it("de gamla formuleringarna är borta", () => {
    for (const [slug, t] of BORTA) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).not.toContain(t);
  });
  it("bygglovsmeningen står en gång i ö-guiden", () => {
    const t = guide("takbyte-skargarden-logistik");
    expect(t.split("För småhus krävs normalt inget bygglov").length - 1).toBe(1);
  });
  it("orört: N1 ('Be om att få det viktiga på papper') och takinspektion-guidens titel", () => {
    expect(guide("taklaggare-norrtalje-guide")).toContain("Be om att få det viktiga på papper");
    expect(blogPosts.find((p) => p.slug === "takinspektion-guide")!.title).toContain("Takinspektion");
  });
});
