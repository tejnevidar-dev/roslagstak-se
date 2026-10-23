/**
 * Gren 197b (Marknadschefens grindsvar 311, Innehålls `innehall/agarorter-2026-10-24.md`): minst 300 nya källbelagda ord på de sex ägarorternas ortssidor (Bro, Kungsängen, Botkyrka, Sundbyberg, Nynäshamn, Ekerö),
 * som nya stycken efter första stycket i områdestexten. Raderna är tillämpade av _verktyg/gren182-rader.mjs (6 rader, en träff var). Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "bro",
    4,
    [
      "Bro kyrka har byggts om i flera omgångar. På 1400-talet förlängdes lån",
      "I grannsocknen står Låssa kyrka, som förr var patronatskyrka åt Säbyho",
      "Kommunen har enligt Wikipedia ett typiskt mälarlandskap, med skogklädd",
      "Knappt en kilometer väster om Låssa kyrka ligger Rösaring, där det enl"
    ]
  ],
  [
    "kungsangen",
    4,
    [
      "Trakten kring Kungsängens kyrka låg för omkring 2 000 år sedan under v",
      "Under 1600- och 1700-talen gick enligt Wikipedia en fyra till fem mete",
      "Ekhammars gård nämns 1370 som två hemman under Sankta Klara kloster, o",
      "Kungsängens kyrka hette tidigare Stockholms-Näs kyrka. Den byggdes för"
    ]
  ],
  [
    "botkyrka",
    4,
    [
      "Av stenkyrkan i romansk stil står långhuset kvar. Under medeltiden för",
      "Kommunen ligger på Södertörn och gränsar i norr till Mälaren via Slags",
      "Hågelby gård har åtminstone medeltida ursprung, men många av byggnader",
      "Tullingesjön är en sprickdalssjö mellan Tullinge och Tumba, och sedan "
    ]
  ],
  [
    "sundbyberg",
    4,
    [
      "Kommunen består enligt Wikipedia huvudsakligen av områden som en gång ",
      "Lilla Alby municipalsamhälle inrättades 1907 i Solna landskommun. Från",
      "Centrala Sundbyberg är en av Stockholms äldsta förstäder, med innersta",
      "Hallonbergen ligger på en bergig kulle, och namnet syftar troligen på "
    ]
  ],
  [
    "nynashamn",
    4,
    [
      "Kommunen är en kustkommun. Östersjön omger den i öster, med Horsfjärde",
      "Vid kommunreformen 1952 gick Torö landskommun upp i Ösmo landskommun. ",
      "Torö är förbunden med fastlandet via väg 528. Ön nämns som landmärke i",
      "Sorunda kyrka har byggts ut flera gånger och har fått formen av en kor"
    ]
  ],
  [
    "ekero",
    4,
    [
      "Kommunen består av öar i Mälaren. Lovön, Färingsö och Adelsö är enligt",
      "Ekerö kyrka hade från början en typisk romansk form, med långhus, smal",
      "Adelsö är omkring tio kilometer lång och mellan två och fyra kilometer",
      "Lovön har vägförbindelse med fastlandet via Drottningholmsbron och Noc"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 197b: nya stycken på de sex ägarorternas ortssidor", () => {
  it("sex sidor", () => expect(NYA.length).toBe(6));
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
