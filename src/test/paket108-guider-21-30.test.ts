/**
 * Paket 108: guiderna 21–30 enligt Innehålls passrapport 164 (innehall/guider-21-30-lasning-2026-10-15.md): alla 22 fynd, ordagrant, och de två motsägelserna (R1, J2).
 * Tilläggsmeningen på Husarö-guiden är juristens P2. Snörasskyddsguiden med modeller och pris är överhoppad (ska ur sök).
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "../data/blog-posts";

const guide = (slug: string) => {
  const g = blogPosts.find((p) => p.slug === slug);
  expect(g, slug).toBeTruthy();
  return g!.content.join("\n");
};
const NY: [string, string][] = [
  ["ventilation-takfot-viktigt", "kan det finnas en större öppning någonstans"],
  ["lagga-om-tak-vad-kostar-det", "eftersom det då kan vara underlaget eller hela taket som har åldrats."],
  ["lagga-om-tak-vad-kostar-det", "men här kan du också välja ett nytt material eller ett nytt uttryck."],
  ["lagga-om-tak-vad-kostar-det", "Då kan en omläggning eller ett takbyte vara rätt åtgärd."],
  ["korrugerad-plat-falsad-plat", "går vi igenom vid takkontrollen."],
  ["takrenovering-stockholm-guide", "under dem ligger underlagspappen och råsponten, takets andra skydd."],
  ["takrenovering-stockholm-guide", "går vi igenom vid takkontrollen."],
  ["takbyte-husaro-finnhamn-oar", "Tillägg bara efter ditt godkännande."],
  ["skota-taket-betongpannor-tegel-plat", "Ett tak mår bra av att någon tittar på det ibland."],
  ["skota-taket-betongpannor-tegel-plat", "Det som går fel kan börja smått:"],
  ["skota-taket-betongpannor-tegel-plat", "är ställen där ett tak kan börja läcka."],
  ["skota-taket-betongpannor-tegel-plat", "En panna ur läge kan släppa in vatten till underlaget."],
  ["skota-taket-betongpannor-tegel-plat", "Tjocka mosskuddar kan hålla kvar fukt och dölja skadade pannor."],
  ["skota-taket-betongpannor-tegel-plat", "Hur taket mår beror också på underlaget under pannorna."],
  ["skota-taket-betongpannor-tegel-plat", "kan underlaget och plåten ha gjort sitt före teglet. Därför säger pannornas utseende inte allt om hur taket mår."],
  ["skota-taket-betongpannor-tegel-plat", "Små skador på plåt ska tas om hand innan de växer."],
  ["taket-lacker-vad-gor-jag-nu", "En läcka kan sitta i en anslutning, inte bara mitt i takytan."],
  ["taket-lacker-vad-gor-jag-nu", "Det kan det vara."],
  ["taket-lacker-vad-gor-jag-nu", "En läcka kan sitta i en detalj som kan göras om för sig. Det går vi igenom vid takkontrollen."],
  ["bygglov-byta-tak", "Vid takkontrollen tittar en av våra säljare på taket på plats och går igenom vilka material"],
  ["jamfora-offerter-takbyte", "De kan beskriva olika arbeten."],
  ["jamfora-offerter-takbyte", "Takets form, antalet genomföringar och hur man kommer åt huset syns först på plats."],
];
const BORTA: [string, string][] = [
  ["ventilation-takfot-viktigt", "Ser du mycket snö på vinden finns det en större öppning"],
  ["lagga-om-tak-vad-kostar-det", "det då oftast är underlaget"],
  ["lagga-om-tak-vad-kostar-det", "passar många på att välja"],
  ["lagga-om-tak-vad-kostar-det", "är en omläggning eller ett takbyte det som håller"],
  ["korrugerad-plat-falsad-plat", "ser vi vid takkontrollen"],
  ["takrenovering-stockholm-guide", "underlagspappen och råsponten under som håller tätt"],
  ["takrenovering-stockholm-guide", "visar takkontrollen"],
  ["takbyte-husaro-finnhamn-oar", "också om du inte är på plats"],
  ["skota-taket-betongpannor-tegel-plat", "Ett tak kräver inte mycket"],
  ["skota-taket-betongpannor-tegel-plat", "Det mesta som går fel börjar smått"],
  ["skota-taket-betongpannor-tegel-plat", "oftast börjar läcka"],
  ["skota-taket-betongpannor-tegel-plat", "Plåt kräver lite skötsel"],
  ["skota-taket-betongpannor-tegel-plat", "Det som avgör hur taket mår är underlaget"],
  ["skota-taket-betongpannor-tegel-plat", "är det sällan teglet som ger upp först"],
  ["skota-taket-betongpannor-tegel-plat", "Den är mest en fråga om utseende"],
  ["taket-lacker-vad-gor-jag-nu", "De flesta läckor sitter i en anslutning"],
  ["taket-lacker-vad-gor-jag-nu", "Många läckor sitter i en detalj"],
  ["jamfora-offerter-takbyte", "Oftast beskriver de olika arbeten."],
  ["jamfora-offerter-takbyte", "antalet genomföringar, underlagets skick"],
];

describe("paket 108: guiderna 21–30", () => {
  it("Innehålls nya meningar står i guiderna", () => {
    for (const [slug, t] of NY) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).toContain(t);
  });
  it("de gamla formuleringarna är borta", () => {
    for (const [slug, t] of BORTA) expect(guide(slug), `${slug}: ${t.slice(0, 50)}`).not.toContain(t);
  });
  it("guider utanför ordern är orörda: Vaxholm och Rådmansö har kvar sin tilläggsmening", () => {
    for (const slug of ["takbyte-vaxholm-skargarden", "taklaggare-radmanso-vato"]) expect(guide(slug), slug).toContain("också om du inte är på plats");
  });
});
