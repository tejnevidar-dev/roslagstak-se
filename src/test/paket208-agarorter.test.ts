/**
 * Gren 208: nya stycken på ägarortssidorna Märsta, Tumba och Spånga. Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "marsta",
    4,
    [
      "Märsta ligger i Husby-Ärlinghundra socken, vars namn enligt Wikipedia ",
      "Märsta var också tingsplats. Ett tingsställe för Ärlinghundra härad fa",
      "Märsta station öppnades den 20 september 1866. När järnvägen kom gick ",
      "Av de fyra kullar som Märsta skulle byggas på fick Brista i stället fj"
    ]
  ],
  [
    "tumba",
    4,
    [
      "Pappersbruket i Tumba tillverkar sedan 1755 papper för sedlar och andr",
      "Gula stenhuset från 1760, brukets första byggnad som finns kvar, är om",
      "Bruket byggdes ut med en ny verksbyggnad vid Tumbaåns nedre fall 1815 ",
      "Tumba kyrka, i området Tuna, invigdes 1973 och står på en gammal präst"
    ]
  ],
  [
    "spanga",
    3,
    [
      "Spånga socken låg enligt Wikipedia nordväst om Stockholm, med Lövstafj",
      "Spånga kyrka, som ligger i dagens Tensta, byggdes i sina ursprungliga ",
      "Hjulsta gård och by, kända sedan 1480-talet, låg söder om Enköpingsväg"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 208: nya stycken på ägarortssidorna Märsta, Tumba och Spånga", () => {
  it("3 sidor", () => expect(NYA.length).toBe(3));
  for (const [slug, antal, borjan] of NYA) {
    it(`/taklaggare-${slug}: ${antal} nya stycken står i datan och i serverns HTML`, () => {
      const l = locations.find((x) => x.slug === slug)!;
      const data = utanLankar(l.longDescription) + JSON.stringify(l.extraSections ?? []);
      const html = JSON.stringify(prerenderContent(`/taklaggare-${slug}`)!.paragraphs);
      expect(borjan.length, slug).toBe(antal);
      for (const b of borjan) {
        expect(data, `${slug}: ${b}`).toContain(b);
        expect(html, `${slug} (serverns HTML): ${b}`).toContain(JSON.stringify(b).slice(1, -1));
      }
    });
  }
});
