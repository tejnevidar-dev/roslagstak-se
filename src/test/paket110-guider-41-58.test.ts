/**
 * Paket 110: de sista guiderna (41–58) enligt Innehålls passrapport 166 (innehall/guider-41-58-lasning-2026-10-15.md): alla 11 fynd, ordagrant.
 * Tilläggsmeningen på Rådmansö-guiden är juristens P2. Plåtlänkarna i plåt- och vindskiveguiderna och återvinningsguiden är orörda.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";

const guide = (slug: string) => {
  const g = blogPosts.find((p) => p.slug === slug);
  expect(g, slug).toBeTruthy();
  return g!.content.join("\n");
};
const NY: [string, string][] = [
  ["taklaggare-radmanso-vato", "Tillägg bara efter ditt godkännande."],
  ["takventilation-luftspalt-nockventil", "kan det finnas en större öppning någonstans,"],
  ["platslagare-norrtalje-guide", "Ett läckage kan börja vid en anslutning:"],
  ["platslagare-norrtalje-guide", "Därför är plåten värd att titta på när ett tak ska bedömas."],
  ["platslagare-norrtalje-guide", "kan detaljerna avgöra hur omfattande arbetet blir."],
  ["solceller-platttak-roslagen", "så tittar en av våra säljare på taket på plats."],
  ["snorasskydd-krav-tak", "och det går vi igenom vid takkontrollen."],
  ["takbyte-sasong-vinter-sommar", "Efter takkontrollen får du en rapport om takets skick."],
  ["vindskivor-takfot-underhall", "de kan vara ett av de första ställena där ett tak visar att något behöver ses över."],
  ["vindskivor-takfot-underhall", "Kanterna sitter öppet för regn."],
  ["vindskivor-takfot-underhall", "Det kan ha tre skäl:"],
  ["vindskivor-takfot-underhall", "går vi igenom vid takkontrollen."],
];
const BORTA: [string, string][] = [
  ["taklaggare-radmanso-vato", "också om du inte är på plats"],
  ["takventilation-luftspalt-nockventil", "finns det en större öppning någonstans"],
  ["platslagare-norrtalje-guide", "Många läckage börjar inte mitt på takytan"],
  ["platslagare-norrtalje-guide", "det som är värt att titta på först"],
  ["platslagare-norrtalje-guide", "är det ofta detaljerna som avgör"],
  ["solceller-platttak-roslagen", "så tittar vi på taket på plats"],
  ["snorasskydd-krav-tak", "och det bedömer vi vid takkontrollen"],
  ["takbyte-sasong-vinter-sommar", "En takkontroll visar om taket behöver bytas, läggas om eller bara lagas."],
  ["vindskivor-takfot-underhall", "ofta det första stället där ett tak visar"],
  ["vindskivor-takfot-underhall", "sitter mest öppet för regn"],
  ["vindskivor-takfot-underhall", "Det händer oftast av tre skäl:"],
  ["vindskivor-takfot-underhall", "ser vi vid takkontrollen"],
];

describe("paket 110: guiderna 41–58", () => {
  it("Innehålls nya meningar står i guiderna", () => {
    for (const [slug, t] of NY) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).toContain(t);
  });
  it("de gamla formuleringarna är borta", () => {
    for (const [slug, t] of BORTA) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).not.toContain(t);
  });
  it("tilläggsmeningen 'också om du inte är på plats' står inte längre i någon guide", () => {
    for (const p of blogPosts) expect(p.content.join("\n"), p.slug).not.toContain("också om du inte är på plats");
  });
  it("orört: plåtlänkarna i plåtguiden och vindskiveguiden, och återvinningsguiden finns kvar", () => {
    expect(guide("platslagare-norrtalje-guide")).toContain("plåtarbeten");
    expect(guide("vindskivor-takfot-underhall")).toContain("plåtarbeten");
    expect(blogPosts.some((p) => p.slug === "atervinning-gammalt-tak-miljo")).toBe(true);
  });
});
