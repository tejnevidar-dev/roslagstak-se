/**
 * Gren 197d: nya stycken på de fem ägarortssidorna i 197d (Lidingö, Tyresö, Haninge, Järfälla, Huddinge). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "lidingo",
    4,
    [
      "Lidingö nämns i skrift första gången i ett testamente från 1328, som L",
      "Den första bron, mellan Larsberg och Kaknäs på Stockholmssidan, stod k",
      "På Elfvik anlades i slutet av 1790-talet och i början av 1800-talet fl",
      "Enligt Lidingö stad har staden tillsammans med hembygdsföreningen satt"
    ]
  ],
  [
    "tyreso",
    4,
    [
      "Godset nämns först med namnen Tyrisedhe och Tyrizö, senare Töresö och ",
      "Tyresta nationalpark har tjädern som symbol. På 1910-talet fanns plane",
      "Vid Nyfors, vid sjön Flaten, fanns förr ett pappersbruk, och av indust",
      "Enligt Tyresö kommun byggdes det stora tegelbruket vid Kalvfjärden för"
    ]
  ],
  [
    "haninge",
    4,
    [
      "Österhaninge kyrka var färdig senast i början av 1300-talet, och långh",
      "Årsta slott, med en huvudbyggnad från 1660–1667, klarade sig enligt Wi",
      "I Handen ligger Övre Rudasjön, där det plogas skridskobanor när isen ä",
      "Enligt Haninge kommun antogs en kulturmiljöpolicy av kommunfullmäktige"
    ]
  ],
  [
    "jarfalla",
    3,
    [
      "Görvälns slott nämns första gången 1478. Efter reformationen blev det ",
      "Säby gård var redan på 1500-talet en frälsegård och blev säteri på 163",
      "Enligt Järfälla kommun har det funnits människor här sedan yngre stenå"
    ]
  ],
  [
    "huddinge",
    3,
    [
      "Nära Huddinge kyrka ligger Tomtberga prästgård, uppkallad efter tingsp",
      "I berggrunden finns en del malmmineral, och järnmalm har brutits i tra",
      "Enligt Huddinge kommun är Björksättrahalvön omgiven av Orlångens natur"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 197d: nya stycken på de fem ägarortssidorna i 197d (Lidingö, Tyresö, Haninge, Järfälla, Huddinge)", () => {
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
