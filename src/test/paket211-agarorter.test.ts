/**
 * Gren 211: nya stycken på ägarortssidorna Edsbro, Kapellskär, Gräddö, Älmsta och Grisslehamn (agarorter6, våg 6). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "edsbro",
    2,
    [
      "Kyrkan står högt upp på ett krön, omkring 15 kilometer norr om Rimbo. ",
      "Enligt Norrtälje kommuns översiktsplan fyller Edsbro en viktig funktio"
    ]
  ],
  [
    "kapellskar",
    1,
    [
      "Enligt Norrtälje kommuns översiktsplan är Kapellskärs hamn en viktig n"
    ]
  ],
  [
    "graddo",
    1,
    [
      "Norrtälje kommun har genomfört en förstudie för Gräddö och Rävsnäs på "
    ]
  ],
  [
    "almsta",
    1,
    [
      "Den första kanalen kom till 1553, då nio socknar beordrades att gå sam"
    ]
  ],
  [
    "grisslehamn",
    2,
    [
      "Posthanteringen var enligt Wikipedia under långa tider den viktigaste ",
      "Enligt Norrtälje kommuns översiktsplan kan Grisslehamn utvecklas med o"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 211: nya stycken på ägarortssidorna Edsbro, Kapellskär, Gräddö, Älmsta och Grisslehamn", () => {
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
