/**
 * Paket 103: de tio guiderna med flest visningar enligt Innehålls passrapport 157 (innehall/guider-lasning-2026-10-15.md): G1–G17, ordagrant.
 * Plåtlänken i takkupaguiden och kortet "Takinspektion" är orörda (Vidars beslut). Guiden om snörasskydd (G15-meningen finns där också) är utanför beställningen och orörd.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";

const guide = (slug: string) => {
  const g = blogPosts.find((p) => p.slug === slug);
  expect(g, slug).toBeTruthy();
  return g!.content.join("\n");
};
const NY: [string, string][] = [
  ["mala-plattak-guide-pris", "Plåten runt skorsten, takfönster och där taket möter en vägg är ställen där ett tak kan börja läcka."],
  ["mala-plattak-guide-pris", "Mörka ränder på undersidan av taket eller blöt isolering kan visa att vatten har tagit sig in."],
  ["skiffertak-hallbarhet-pris", "men det finns kvar på äldre hus."],
  ["skiffertak-hallbarhet-pris", "hur taket mår beror också på fästena, plåten och det som ligger under, inte bara på ytmaterialet."],
  ["takkupa-vindskupa-guide", "Det är vid anslutningarna som ett läckage kan börja."],
  ["takkupa-vindskupa-guide", "Vid anslutningar kan ett läckage börja, och en kupa har flera."],
  ["takkupa-vindskupa-guide", "kan vara ett tecken på att vatten har tagit sig in."],
  ["hur-lange-haller-tak", "Underlaget kan avgöra när ett tak behöver göras om, även när ytmaterialet ser helt ut."],
  ["hur-lange-haller-tak", "Under betongpannor och lertegel ligger underlagspapp och råspont, takets andra skydd. Pannorna leder bort det mesta av vattnet och skyddar underlaget mot sol och väder."],
  ["hur-lange-haller-tak", "Därför kan det vara underlaget, och inte pannorna, som avgör när ett pannat tak behöver läggas om."],
  ["hur-lange-haller-tak", "Fukt som blir kvar kan bryta ner ett tak:"],
  ["takstege-takbrygga-sakerhet", "och det går vi igenom vid takkontrollen."],
  ["ta-bort-mossa-fran-tak", "kan visa att vatten har tagit sig förbi pannorna."],
  ["ta-bort-mossa-fran-tak", "Tjocka mosskuddar kan hålla kvar fukt och dölja skadade pannor."],
];
const BORTA: [string, string][] = [
  ["mala-plattak-guide-pris", "är de ställen där ett tak oftast börjar läcka"],
  ["mala-plattak-guide-pris", "blöt isolering visar att vatten har tagit sig in"],
  ["skiffertak-hallbarhet-pris", "på många äldre hus"],
  ["skiffertak-hallbarhet-pris", "ofta är det inte ytmaterialet som avgör hur taket mår"],
  ["bandtackt-plat-vs-klicktak", "Plåttak kräver lite skötsel."],
  ["takkupa-vindskupa-guide", "inte mitt på takfallet, som ett tak oftast börjar läcka"],
  ["takkupa-vindskupa-guide", "Det är vid anslutningar som ett tak oftast börjar läcka"],
  ["takkupa-vindskupa-guide", "är ett tecken på att vatten har tagit sig in"],
  ["hur-lange-haller-tak", "Ofta är det underlaget, inte ytmaterialet, som avgör"],
  ["hur-lange-haller-tak", "och det är underlaget som håller tätt"],
  ["hur-lange-haller-tak", "Därför är det ofta underlaget, inte pannorna"],
  ["hur-lange-haller-tak", "Fukt som blir kvar är det som bryter ner ett tak"],
  ["hur-lange-haller-tak", "Därför är utförandet minst lika viktigt som materialet."],
  ["bandtackning-tak-guide", "Ett bandtäckt tak behöver inte mycket."],
  ["takstege-takbrygga-sakerhet", "och det bedömer vi vid takkontrollen"],
  ["ta-bort-mossa-fran-tak", "fukt i läkt och råspont visar att vatten har tagit sig förbi pannorna"],
  ["ta-bort-mossa-fran-tak", "Tjocka mosskuddar håller kvar fukt"],
];

describe("paket 103: de tio guiderna", () => {
  it("Innehålls nya meningar står i guiderna", () => {
    for (const [slug, t] of NY) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).toContain(t);
  });
  it("de gamla generaliseringarna är borta", () => {
    for (const [slug, t] of BORTA) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).not.toContain(t);
  });
  it("takkupaguidens plåtlänk och kortet 'Takinspektion' är orörda (Vidar)", () => {
    expect(guide("takkupa-vindskupa-guide")).toContain("/tjanster/platarbeten");
    expect(blogPosts.some((p) => p.slug === "takinspektion-guide")).toBe(true);
  });
  it("skiffer: inget om att vi lägger skiffer eller pris har tillkommit", () => {
    const g = guide("skiffertak-hallbarhet-pris");
    expect(g).not.toMatch(/vi lägger skiffer|riktpris för skiffer/i);
  });
});
