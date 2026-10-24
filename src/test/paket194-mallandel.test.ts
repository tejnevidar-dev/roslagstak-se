/**
 * Gren 194: nya stycken på 20 ortssidor (mallandel 51–70). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "alvnas",
    1,
    [
      "Grundmurarna efter kastalen är enligt Wikipedia omkring 1,5 meter bred"
    ]
  ],
  [
    "stromma",
    1,
    [
      "Kanalen har en lång historia. Farleden längs Strömma å grundades enlig"
    ]
  ],
  [
    "kil",
    1,
    [
      "Kils gård nämns enligt Wikipedia redan 1324, och på 1500-talet lydde d"
    ]
  ],
  [
    "segeltorp",
    1,
    [
      "Gården Segeltorp låg i Vårbybäckens bördiga dalgång, strax väster om g"
    ]
  ],
  [
    "kungsberga",
    1,
    [
      "Färentuna kyrka är enligt Wikipedia en så kallad östtornskyrka, med et"
    ]
  ],
  [
    "alby",
    1,
    [
      "Vid en boplats från bronsålderns andra period har enligt Wikipedia omk"
    ]
  ],
  [
    "blackeberg",
    1,
    [
      "Blackebergs centrum, Blackebergs plan, invigdes 1956 och är enligt Wik"
    ]
  ],
  [
    "hogdalen",
    1,
    [
      "Högdalen och grannen i norr, Bandhagen, planerades enligt Wikipedia fr"
    ]
  ],
  [
    "karlslund",
    1,
    [
      "Namnet Täby kommer enligt Wikipedia av tä, som betyder bro eller belag"
    ]
  ],
  [
    "vallingby",
    1,
    [
      "I postorten Vällingby ingår också Råcksta, Grimsta, Vinsta och Nälsta."
    ]
  ],
  [
    "bromma",
    1,
    [
      "Namnet Bromma kommer enligt en teori från brom eller brum, som betyder"
    ]
  ],
  [
    "hasselby",
    1,
    [
      "År 1903 byggde staden en skola här. De flesta trädgårdstomterna låg en"
    ]
  ],
  [
    "tensta",
    1,
    [
      "Delar av området blev en del av Stockholm 1949, och stadsdelen bildade"
    ]
  ],
  [
    "sjoberg",
    1,
    [
      "När Sjöbergs fornborg undersöktes på 1980-talet hittades enligt Wikipe"
    ]
  ],
  [
    "langbro",
    1,
    [
      "Södertörn var enligt Wikipedia en ö fram till 1000-talet, och under st"
    ]
  ],
  [
    "hokarangen",
    1,
    [
      "I slutet av 1700-talet var Hökarängen ett frälsetorp, och under mitten"
    ]
  ],
  [
    "sigtuna",
    1,
    [
      "Namnet förklaras i dag enligt Wikipedia troligast av sik eller sig, so"
    ]
  ],
  [
    "stuvsta",
    1,
    [
      "Stuvsta är sedan 2018 en egen kommundel och sträcker sig från Hagsätra"
    ]
  ],
  [
    "handen",
    1,
    [
      "Handen är centralort för kommunens förvaltning. På 1930-talet inrättad"
    ]
  ],
  [
    "skarpang",
    1,
    [
      "I mitten av 1920-talet började tomter för fritidshus styckas av, och f"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 194: nya stycken på 20 ortssidor (mallandel 51–70)", () => {
  it("20 sidor", () => expect(NYA.length).toBe(20));
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
