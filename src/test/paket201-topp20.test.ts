/**
 * Gren 201: nya stycken på de 20 ortssidorna med flest visningar (topp 20). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "uppsala",
    4,
    [
      "Stadens tidigaste namn var Östra Aros, där Aros betyder åmynning. Östr",
      "Den äldsta bebyggelsen låg på båda sidor om Fyrisån, mellan Dombron oc",
      "Staden ligger vid norra änden av Ekoln och omges av vidsträckta, uppod",
      "Domkyrkan på Domberget började enligt Wikipedia byggas 1272 eller 1273"
    ]
  ],
  [
    "danderyd",
    4,
    [
      "Djursholms slott, som tidigare var huvudbyggnad på godset Djursholm, ä",
      "Kommunens historia är en historia av villasamhällen som blev egna enhe",
      "Naturen präglas enligt Wikipedia av lodräta förkastningsbranter, som h",
      "Rinkebyskogen, i kommunens nordvästra del, gränsar till Sollentuna och"
    ]
  ],
  [
    "taby",
    5,
    [
      "Täby kommun ligger i den sydöstra delen av Uppland, och i norr finns d",
      "Täby municipalsamhälle inrättades den 8 april 1927 och upplöstes 1948,",
      "Centrum byggdes i Tibble, vid knutpunkten där järnvägarna mot Rimbo oc",
      "I centrumområdet byggdes också två stora bostadsområden med låghus i t",
      "Stora Värtan ligger mellan Djursholm, Täby, Bogesundslandet och Liding"
    ]
  ],
  [
    "norrtalje",
    5,
    [
      "Inom tätorten har det funnits två eller tre fornborgar, vid de tidigar",
      "Den nuvarande kyrkan byggdes 1724–1726. Den är byggd av natursten och ",
      "Norrtälje ligger längst in i Norrtäljeviken, omkring 68 kilometer nord",
      "Norrtäljeån är 1 750 meter lång och rinner från sjön Lommaren i den vä",
      "Lommaren, väster om staden, var tidigare en del av Norrtäljeviken men "
    ]
  ],
  [
    "akersberga",
    4,
    [
      "Österåkers kyrkas äldsta delar är enligt Wikipedia troligen från 1200-",
      "Vid kommunreformen 1952 gick Östra Ryds landskommun upp i Österåkers l",
      "Kommunen ligger i södra Roslagen i den sydöstra delen av Uppland. I ce",
      "Åkers kanal, som före kanaliseringen kallades Åkers å eller Åkersström"
    ]
  ],
  [
    "spillersboda",
    4,
    [
      "Frötuna socken, där Spillersboda ligger, är enligt Wikipedia en sjörik",
      "Frötuna kyrka ligger strax söder om Norrtälje, på en höjd vid norra än",
      "Spillersboda räknades som tätort igen vid avgränsningen 2015, då metod",
      "Björnö gård ligger vid innersta delen av Norrtäljeviken. Gården blev 1"
    ]
  ],
  [
    "vallentuna",
    4,
    [
      "Vallentuna kyrka har en stomme av gråsten, och ytterväggarna har aldri",
      "Kommunen präglas av ett sjörikt sprickdalslandskap. Höjderna är täckta",
      "En av de första skolorna i Vallentuna, Veda skola, togs i bruk 1884 oc",
      "Vid återuppbyggnaden efter branden 1856 byggdes ett nytt kor med samma"
    ]
  ],
  [
    "upplands-vasby",
    4,
    [
      "De första spåren av odling i trakten har hittats vid utgrävningar av H",
      "Poststationens namn ändrades 1919 från Väsby till Upplandsväsby, skriv",
      "Mellan de skogklädda och delvis kalspolade höjderna finns utbredda ler",
      "Edssjön är enligt Wikipedia näringsrik och har ett rikt fågelliv. Där "
    ]
  ],
  [
    "alvsjo",
    4,
    [
      "Älvsjö gård är en gammal gård som finns kvar och omnämns första gången",
      "Ortnamnet skrevs 1461. År 1945 blev Solberga en egen stadsdel, och på ",
      "Älvsjö hörde till Brännkyrka socken, som har fått sitt namn efter kyrk",
      "Stationen blev förgreningsstation när Nynäsbanan invigdes den 28 decem"
    ]
  ],
  [
    "tullinge",
    4,
    [
      "Gårdsnamnet Tullinge skrevs 1353 þulunge. Det kan enligt Wikipedia här",
      "Vid Albysjöns strand, strax norr om Tullinge, ligger Flottsbro. Namnet",
      "Tullingesjön, mellan Tullinge och Tumba, är en sprickdalssjö. Tillflöd",
      "Flygplatsen söder om Tullinge anlades enligt Wikipedia på mark som had"
    ]
  ],
  [
    "stuvsta",
    2,
    [
      "Tomtförsäljningen tog enligt Wikipedia fart efter 1918, när en järnväg",
      "Grannområdet Snättringe var från början ett torp under Fullersta gård "
    ]
  ],
  [
    "djursholm",
    3,
    [
      "Djursholm har ända sedan samhället grundades 1889 till stor del prägla",
      "Platsen är betydligt äldre än villastaden. Svalnäsgravfältet är enligt",
      "Vid den närbelägna Ösbysjön hittades 1924 en båt av en urholkad ekstoc"
    ]
  ],
  [
    "trangsund",
    2,
    [
      "Trångsund nämns första gången i den geometriska jordeboken från 1636, ",
      "Trångsunds gård, som i traditionen har kallats Drevvikens pärla, har r"
    ]
  ],
  [
    "vaddo",
    3,
    [
      "I söder övergår ön i Granö, Barnens ö och Björkö, och i norr går broar",
      "Väddö kanal förbinder Bagghusfjärden i söder med Väddöviken i norr och",
      "Väddö kyrka har koret i söder, och den byggdes något längre österut än"
    ]
  ],
  [
    "skarholmen",
    2,
    [
      "Stadsdelen omfattar enligt Wikipedia 189 hektar land och 4 hektar vatt",
      "Sätraskogens naturreservat inrättades av Stockholms stad 2006 och omfa"
    ]
  ],
  [
    "norrviken",
    3,
    [
      "Sjön Norrviken får sitt vatten från Vallentunasjön och Fjäturen. Under",
      "Sollentuna kyrka kan från början ha varit en försvarskyrka, med tanke ",
      "Sollentunaholms mangårdsbyggnad härjades av eld både på 1700-talet och"
    ]
  ],
  [
    "vato",
    3,
    [
      "Vätö fick troligen sin första bebyggelse under slutet av järnåldern, o",
      "Vätöborna seglade främst med mindre skutor, och Vätöhävda gård är en v",
      "Vätö kyrka nämns första gången i en handling från 1337. Den ligger mel"
    ]
  ],
  [
    "vaxholm",
    3,
    [
      "Namnets förled är enligt Wikipedia osäker. En tolkning är att den häng",
      "Den första anläggningen på holmen i sundet mellan Vaxön och Rindö bygg",
      "Vaxholms kyrka är en enskeppig salkyrka i nyklassicistisk stil, och de"
    ]
  ],
  [
    "hallstavik",
    3,
    [
      "Häverö kyrka är byggd av gråsten, med tegel i dörr- och fönsteromfattn",
      "Edebo kyrka, på andra sidan Skeboån, byggdes som stenkyrka under senar",
      "Hallsta pappersbruk har omkring 340 anställda och två pappersmaskiner,"
    ]
  ],
  [
    "grondal",
    3,
    [
      "Gröndal ingick från 1898 i Liljeholmens municipalsamhälle inom Brännky",
      "Efter Västra stambanan och Liljeholmens station på 1860-talet ändrades",
      "Från 1908 började Gröndal bebyggas med stora hyreshus, och bara under "
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 201: nya stycken på de 20 ortssidorna med flest visningar (topp 20)", () => {
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
