/**
 * Gren 197e: nya stycken på de fem ägarortssidorna i 197e (Solna, Värmdö, Nacka, Sollentuna, Stockholm). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "solna",
    2,
    [
      "Ulriksdals slott uppfördes omkring 1638–1645 men byggdes tidigt om fle",
      "Enligt Solna stad ligger flera av museerna och de kulturhistoriska pla"
    ]
  ],
  [
    "varmdo",
    2,
    [
      "Enligt Värmdö kommun finns 14 områden i kommunen som är utpekade som r",
      "Siggesta gård, i en gammal kulturbygd, är dokumenterad sedan 1323, och"
    ]
  ],
  [
    "nacka",
    3,
    [
      "Nacka gård var enligt Wikipedia ett bruk för järn- och mässingsföremål",
      "Järla gård nämns 1453 i Stockholms stads tänkeböcker, och gårdens läge",
      "Enligt Nacka kommun har Nacka fyra riksintressen för kulturmiljövården"
    ]
  ],
  [
    "sollentuna",
    3,
    [
      "Enligt Sollentuna kommun bosatte sig de första människorna här vid öve",
      "Kommunen skriver att vissa byggnader och områden är kulturhistoriskt s",
      "Socknens namn skrevs 1287 Solendatunum, och förleden innehåller enligt"
    ]
  ],
  [
    "stockholm",
    3,
    [
      "Enligt Stockholms stad ansvarar Stadsmuseet för inventering och kultur",
      "Sedan den 1 december 2025 gäller enligt staden en utökad lovplikt för ",
      "Stadsmuseet skriver att det viktigaste vid en renovering är att utgå f"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 197e: nya stycken på de fem ägarortssidorna i 197e (Solna, Värmdö, Nacka, Sollentuna, Stockholm)", () => {
  it("5 sidor", () => expect(NYA.length).toBe(5));
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
