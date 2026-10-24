/**
 * Gren 202: nya stycken på cirka 76 ortssidor (mallandel 71–170). Raderna är tillämpade av _verktyg/gren182-rader.mjs (en träff per rad). Provet kräver att varje nytt stycke står i datan och i serverns HTML. Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "soderby",
    1,
    [
      "Söderbystenen har enligt Wikipedia stått utmed en förmodad väg över de"
    ]
  ],
  [
    "krusboda",
    1,
    [
      "Utöver radhusen, atriumhusen och villorna finns enligt Wikipedia 203 h"
    ]
  ],
  [
    "varberg",
    1,
    [
      "Johannesdals gård, vid Mälaren, är enligt Wikipedia blåmärkt av Stadsm"
    ]
  ],
  [
    "akalla",
    1,
    [
      "Akalla by är enligt Wikipedia en välbevarad bymiljö, och sedan 2006 in"
    ]
  ],
  [
    "lahall",
    1,
    [
      "När området kring Näsby slott började bebyggas på 1920-talet krävdes e"
    ]
  ],
  [
    "molna",
    1,
    [
      "Mölnaåns vattenkraft användes enligt Wikipedia från 1500-talet för att"
    ]
  ],
  [
    "erikslund",
    1,
    [
      "Erikslund ligger i kommundelen Broby och har enligt Wikipedia fått sit"
    ]
  ],
  [
    "flysta",
    1,
    [
      "Namnets förled har enligt Wikipedia tidvis skrivits Fli, som 1418 och "
    ]
  ],
  [
    "enebyberg",
    1,
    [
      "Eneby by har enligt Wikipedia rötter tillbaka till vikingatiden och nä"
    ]
  ],
  [
    "solna",
    1,
    [
      "I Solnas sydvästra del ligger Huvudsta, mellan Karlbergssjön, Ulvsunda"
    ]
  ],
  [
    "solgard-sorskogen",
    1,
    [
      "Solgårds fornborg ligger i ett skogsområde vid Solgårdsvägen, på ett s"
    ]
  ],
  [
    "smedslatten",
    1,
    [
      "Platsen är betydligt äldre än trädgårdsstaden. När Smedslätten byggdes"
    ]
  ],
  [
    "ronninge",
    1,
    [
      "Rönninge gård, strax väster om sjön Flaten, har enligt Wikipedia anor "
    ]
  ],
  [
    "snattringe",
    1,
    [
      "På den häradsekonomiska kartan från 1900 skrivs namnet Snättinge. Inna"
    ]
  ],
  [
    "svedmyra",
    1,
    [
      "På 1940-talet ökade efterfrågan på bostäder, och 1944 planerades trevå"
    ]
  ],
  [
    "svartno",
    1,
    [
      "Den smala och grunda passagen mellan Svartnö och Eknö kallades i äldre"
    ]
  ],
  [
    "saltsjobaden",
    1,
    [
      "De tidiga delarna av villastaden präglas enligt Wikipedia fortfarande "
    ]
  ],
  [
    "ella-gard",
    1,
    [
      "Gården Ella omfattade 1938 enligt Wikipedia 94 hektar, varav 60 hektar"
    ]
  ],
  [
    "djuro",
    1,
    [
      "Djurö kyrka är byggd av liggtimmer på en putsad stenfot och var från b"
    ]
  ],
  [
    "uttran",
    1,
    [
      "Sjön Uttran har enligt Wikipedia fått sitt namn efter att det tidigare"
    ]
  ],
  [
    "fullersta",
    1,
    [
      "När gården blev säteri revs den dåvarande byn Fullersta och ersattes a"
    ]
  ],
  [
    "stenhamra",
    1,
    [
      "Stenbrottet ligger i ett granitberg, som har kallats Bålberget och Vår"
    ]
  ],
  [
    "tegelhagen-silverdal",
    1,
    [
      "Torpet Tegelhagen hörde först till Ärvinge by i Spånga socken och sena"
    ]
  ],
  [
    "stureby",
    1,
    [
      "Stadsdelen omfattar 205 hektar. Inom det som i dag är Stureby låg åtta"
    ]
  ],
  [
    "tynningo",
    1,
    [
      "Namnet Tynningö kan enligt Wikipedia ha uppstått redan på vikingatiden"
    ]
  ],
  [
    "stocksund",
    1,
    [
      "En stensättning sydväst om Stockby gårds byggnad visar enligt Wikipedi"
    ]
  ],
  [
    "nockeby",
    1,
    [
      "Byns namn skrevs 1552 Nåckeby och 1576 Nockeby. Kvarteren på den nordö"
    ]
  ],
  [
    "sticklinge",
    1,
    [
      "Trakten var bebodd åtminstone sedan vikingatiden, och här låg Sticklin"
    ]
  ],
  [
    "hagersten",
    1,
    [
      "Hägerstens gård var på 1700-talet ett frälsehemman, och till den räkna"
    ]
  ],
  [
    "viggbyholm",
    1,
    [
      "Viggbyholm gränsar i öster mot Hägernäs, i söder mot Stora Värtan, i v"
    ]
  ],
  [
    "svartsjo",
    1,
    [
      "Svartsjö slott och park är enligt Wikipedia statligt byggnadsminne sed"
    ]
  ],
  [
    "norsborg",
    1,
    [
      "Västra verket togs i bruk 1904 och byggdes ut 1945–1953 och 1964. För "
    ]
  ],
  [
    "enskede-gard",
    1,
    [
      "Under tidigt 1700-tal slogs de tre gårdarna Lilla Enskede, Stora Enske"
    ]
  ],
  [
    "stora-mossen",
    1,
    [
      "På yngre stenåldern låg vattennivån 22 meter över dagens, och Bromma l"
    ]
  ],
  [
    "bromma-kyrka",
    1,
    [
      "Bromma kyrka uppfördes under andra hälften av 1100-talet, och rundhuse"
    ]
  ],
  [
    "appelviken",
    1,
    [
      "Stadsdelen är 77 hektar. När trädgårdsstaden planerades fanns redan en"
    ]
  ],
  [
    "alsten",
    1,
    [
      "Ålstens gård står enligt Wikipedia på en grund från 1500-talet, och de"
    ]
  ],
  [
    "bagarmossen",
    1,
    [
      "Utom Byälvsvägen, som byggdes kring 1970, är Bagarmossen enligt Wikipe"
    ]
  ],
  [
    "kummelnas",
    1,
    [
      "Den kemiska fabriken var enligt Wikipedia en av få industrier i Nackao"
    ]
  ],
  [
    "tallkrogen",
    1,
    [
      "När stadsdelen skulle få sitt namn övervägdes också två torp, Sophem o"
    ]
  ],
  [
    "sodra-angby",
    1,
    [
      "Den ursprungliga vegetationen, hällmarkstallskog, är enligt Wikipedia "
    ]
  ],
  [
    "taby-kyrkby",
    1,
    [
      "Täby kyrka var färdigbyggd omkring 1280, och då var Täby förenat i en "
    ]
  ],
  [
    "bromsten",
    1,
    [
      "Nära den tidigaste kända byplatsen ligger en fornborg, som enligt Wiki"
    ]
  ],
  [
    "staket",
    1,
    [
      "Redan på 1620-talet planerades en stad här. Enligt den tomtkarta som u"
    ]
  ],
  [
    "enskededalen",
    1,
    [
      "Redan 1906–1912 byggdes ett äldreboende, Hemmet för gamla, mitt i Vilo"
    ]
  ],
  [
    "radmanso",
    1,
    [
      "Den nuvarande kyrkan på Rådmansö började byggas 1816 och togs i bruk 1"
    ]
  ],
  [
    "storangen",
    1,
    [
      "År 1910 fick Storängen elektricitet, med elektriskt ljus på vägarna. M"
    ]
  ],
  [
    "enskede",
    1,
    [
      "År 1890 köpte staden 14,8 hektar här för en kyrkogård, som invigdes 18"
    ]
  ],
  [
    "roslags-nasby",
    1,
    [
      "Roslags Näsby ligger omkring en kilometer söder om Täby centrum och gr"
    ]
  ],
  [
    "osterskar",
    1,
    [
      "Kring sekelskiftet 1900 ägdes större delen av Österskär av en direktör"
    ]
  ],
  [
    "ulvsunda",
    1,
    [
      "Området hette först Kungsholms villastad och bytte senare namn till Ul"
    ]
  ],
  [
    "enskedefaltet",
    1,
    [
      "Stadsdelen bildades 1934, när Enskede delades upp i Enskede gård, Gaml"
    ]
  ],
  [
    "skogas",
    1,
    [
      "Ortnamnets delar skog och ås syftar på landskapets topografi, och Skog"
    ]
  ],
  [
    "lannersta",
    1,
    [
      "Genom området går Sockenvägen i öst-västlig riktning och Lännerstaväge"
    ]
  ],
  [
    "ingmarso",
    1,
    [
      "Det finns flera teorier om namnet. Enligt en kommer det av de sjöar, i"
    ]
  ],
  [
    "gribbylund",
    1,
    [
      "Gribbylund avgränsas i norr av Löttingelund, i öster av Rönningesjön, "
    ]
  ],
  [
    "nora-kevinge",
    1,
    [
      "De flesta av Nora gårds ekonomibyggnader revs under 1900-talet, när vi"
    ]
  ],
  [
    "duvbo",
    1,
    [
      "Gatuplanen och villornas placering på tomterna följer enligt Wikipedia"
    ]
  ],
  [
    "hoglandet",
    1,
    [
      "Stadsdelen har en landyta på 44 hektar och omfattar mark som hörde til"
    ]
  ],
  [
    "malarhojden",
    1,
    [
      "Slättens gård, ett torp under Sätra gård, är känt sedan 1762, och tre "
    ]
  ],
  [
    "solhem-lunda",
    1,
    [
      "Namnet Solhem fastställdes 1904 och ansågs ge en bra bild av platsen. "
    ]
  ],
  [
    "brevik-kappala-gashaga",
    1,
    [
      "På en karta från 1720 finns Käppala med två bostadshus, som Kiäppala. "
    ]
  ],
  [
    "loharad",
    1,
    [
      "Lohärads socken omfattar enligt Wikipedia 62,73 kvadratkilometer, vara"
    ]
  ],
  [
    "riala",
    1,
    [
      "I Riala kyrka syns murarnas ursprungliga kvaderristning på långhusvind"
    ]
  ],
  [
    "sodertalje",
    1,
    [
      "Till de äldre fornlämningarna i stadsområdet hör Holmfastristningen, f"
    ]
  ],
  [
    "ursvik",
    1,
    [
      "År 1937 byggdes laboratorier i Ursvik för den då nybildade myndigheten"
    ]
  ],
  [
    "stavsnas",
    1,
    [
      "På laga skifteskartan från 1844 hade åkerskiften skapats österut mot Ö"
    ]
  ],
  [
    "jarna",
    1,
    [
      "I Järna startade Mikaelsgårdens läkepedagogiska institut 1935, och vid"
    ]
  ],
  [
    "nockebyhov",
    1,
    [
      "Där Olovslundsskolan ligger i dag fanns förr torpet Katrinelund, som t"
    ]
  ],
  [
    "holo",
    1,
    [
      "Vid Lillsjöns södra strand ligger Edeby säteri, som enligt Wikipedia h"
    ]
  ],
  [
    "enhorna-sandviken",
    1,
    [
      "På flera platser på Enhörna har man hittat stenyxor och verktyg av ste"
    ]
  ],
  [
    "musko",
    1,
    [
      "Öns namn skrevs 1278 in insula Muskø, och förleden innehåller ordet mu"
    ]
  ],
  [
    "rimbo",
    1,
    [
      "Orten skrevs 1303 ecclesie Ringboheredhi och 1498 Rimbo sochn. Rimbo h"
    ]
  ],
  [
    "herrang",
    1,
    [
      "Namnet Herräng finns på en karta från 1754 över gruvorna. Efter att ha"
    ]
  ],
  [
    "ljustero",
    1,
    [
      "På Ljusterö finns enligt Wikipedia 15 namngivna insjöar, bland dem Ins"
    ]
  ],
  [
    "arholma",
    1,
    [
      "År 1547 fanns tre gårdar på Arholma, 1613 hade de blivit fem, och 1650"
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 202: nya stycken på cirka 76 ortssidor (mallandel 71–170)", () => {
  it("76 sidor", () => expect(NYA.length).toBe(76));
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
