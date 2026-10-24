/**
 * Gren 204 (Innehålls `regionsidor-2026-10-24.md`, grindsvar 338–341): nya stycken på de 16 regionsidorna och B2-rättningen "Roslagen och Storstockholm" i första stycket på åtta av dem.
 * Raderna är tillämpade av _verktyg/gren182-rader.mjs (16 rader, en träff var). Meta, orterad och ortlänkar är orörda. Provet kräver att varje nytt stycke står i datan och i serverns HTML.
 */
import { describe, expect, it } from "vitest";
import { regionTexts } from "../data/region-texts";
import { regionBySlug } from "../data/regions";
import { prerenderContent } from "../../scripts/prerender-content";

/** [regionslug, början på varje nytt stycke] */
const NYA: [string, string[]][] = [
  [
    "ostra-stockholm",
    [
      "Östra Stockholm är på den här sidan Lidingö, Nacka och Värmdö, de tre ",
      "Efter 1860-talet och en bit in på 1900-talet byggdes enligt Wikipedia "
    ]
  ],
  [
    "mellersta-skargarden",
    [
      "Som betydelsefulla fiskehamnar nämns 1744 bland annat Håkanskär, Vattu"
    ]
  ],
  [
    "norra-skargarden",
    [
      "Under 1940-talet och efter andra världskriget växte enligt Wikipedia e"
    ]
  ],
  [
    "malardalen",
    [
      "Mälardalen är området runt Mälaren. På den här sidan gäller det Mälare",
      "Det mesta av Mälarens vatten rinner enligt Wikipedia ut via Norrström "
    ]
  ],
  [
    "kusten",
    [
      "Roslagsskutans urtyp är enligt Wikipedia skärbåten, en förstorad öppen"
    ]
  ],
  [
    "radmansohalvon",
    [
      "Farlederna från Rådmansö går enligt Wikipedia bland annat över Gisslin"
    ]
  ],
  [
    "norra-roslagen",
    [
      "Upplands tidigaste kända järntillverkning är enligt Wikipedia från en "
    ]
  ],
  [
    "osteraker",
    [
      "Enligt Österåkers kommun hör Roslags-Kulla kyrka, från 1700-talet, til"
    ]
  ],
  [
    "norra-stockholm",
    [
      "Norra Stockholm är på den här sidan de fem kommunerna närmast norr om ",
      "Brunnsviken ingår sedan 1995 i Kungliga nationalstadsparken, och runt "
    ]
  ],
  [
    "nordvastra-stockholm",
    [
      "Nordvästra Stockholm är på den här sidan Järfälla, Upplands-Bro och Si",
      "Arlanda kom till enligt Wikipedia för att Brommas banor var för korta "
    ]
  ],
  [
    "sodra-stockholm",
    [
      "Södra Stockholm är på den här sidan Söderort, alltså den del av Stockh",
      "Sjön Magelungen skrevs Målången på 1500-talet. Halterna av metaller, P"
    ]
  ],
  [
    "sydostra-stockholm",
    [
      "Sydöstra Stockholm är på den här sidan Tyresö, Haninge och Nynäshamns ",
      "Namnet Södertörn skrevs 1281 de Thørh, 1283 in Tør, 1383 a Tørinne och"
    ]
  ],
  [
    "sydvastra-stockholm",
    [
      "Sydvästra Stockholm är på den här sidan fyra kommuner: Botkyrka, Salem",
      "Enligt Botkyrka kommun är Hogslaby kommunens järnåldersby: fem små tid"
    ]
  ],
  [
    "stockholms-stad",
    [
      "Stockholms stad har villor och småhus i både väster och söder, och det",
      "Enligt Stockholms stad tar Stadsmuseet fram inventeringar och kunskaps"
    ]
  ],
  [
    "vasterort",
    [
      "Västerort är den del av Stockholms kommun som ligger väster och nordvä",
      "Badvattnet i Ulvsundasjön är enligt Wikipedia i allmänhet tjänligt, me"
    ]
  ],
  [
    "roslagens-inland",
    [
      "Vallentunasjön är enligt Wikipedia kraftigt övergödd, med extremt höga"
    ]
  ]
];
const utanMd = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

describe("gren 204: regionsidorna", () => {
  it("16 regionsidor", () => expect(NYA.length).toBe(16));
  for (const [slug, nya] of NYA) {
    it(`/omraden/${slug}: ${nya.length} nya stycken står i datan och i serverns HTML`, () => {
      const r = regionTexts[regionBySlug(slug)!];
      expect(r, slug).toBeDefined();
      const data = utanMd([r.intro, ...r.body].join("\n"));
      const pc = prerenderContent(`/omraden/${slug}`);
      const html = JSON.stringify([pc?.intro, ...(pc?.paragraphs ?? [])]);
      for (const b of nya) {
        expect(data, `${slug}: ${b}`).toContain(b);
        expect(html, `${slug} (serverns HTML): ${b}`).toContain(JSON.stringify(b).slice(1, -1));
      }
    });
  }
});
