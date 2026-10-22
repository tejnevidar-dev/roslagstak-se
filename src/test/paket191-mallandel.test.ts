/**
 * Gren 191 (mallandel på 40 ortssidor, Marknadschefens grindsvar 302–305): ett nytt källbelagt stycke på 40 ortssidor ur innehall/mallandel-11-30, -31-40 och -41-50. Raderna är tillämpade av
 * _verktyg/gren182-rader.mjs (40 rader, en träff var, träffar i det genererade FAQ-svaret räknas inte). Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA: [string, string][] = [
  [
    "edsbro",
    "Masugnen drevs med vattenkraft, som drev vattenhjul och blås"
  ],
  [
    "kapellskar",
    "Namnet har enligt Wikipedia ett medeltida ursprung och komme"
  ],
  [
    "nykvarn",
    "Järnvägen genom orten har bytts ut en gång. Norra Södermanla"
  ],
  [
    "kista",
    "Namnet är enligt Wikipedia lånat från en gård med samma namn"
  ],
  [
    "spillersboda",
    "Var namnet kommer ifrån vet man inte säkert, men enligt Wiki"
  ],
  [
    "helenelund",
    "Från Helenelunds station tar pendeltåget enligt Wikipedia om"
  ],
  [
    "jordbro",
    "Platsen var bebodd långt före torpet. Mellan Jordbro och Väs"
  ],
  [
    "farsta",
    "Namnet finns i flera äldre former, bland annat Farlasta 1384"
  ],
  [
    "balsta",
    "Den södra och folkrikaste delen av Bålsta ligger i Kalmar so"
  ],
  [
    "norrviken",
    "Området kring Norrviken är enligt Wikipedia till stora delar"
  ],
  [
    "trollbacken",
    "Namnet Kumla kommer enligt Wikipedia förmodligen av kummel, "
  ],
  [
    "knivsta",
    "Stationen byggdes enligt Wikipedia på mark som hörde till Sä"
  ],
  [
    "bollstanas",
    "Bollstanäs hörde till Fresta socken, som enligt Wikipedia är"
  ],
  [
    "grisslehamn",
    "Det ursprungliga Grisslehamn, i dag kallat Gamla Grisslehamn"
  ],
  [
    "hemmesta",
    "Från Hemmesta går SL-buss 474 till Slussen, och resan tar en"
  ],
  [
    "vega",
    "Pendeltågsstationen byggdes enligt Wikipedia på Västra Täcke"
  ],
  [
    "almsta",
    "Ön Väddö nås närmast över tre broar. Bron i Älmsta är en kla"
  ],
  [
    "ekero-sommarstad",
    "År 2005 bodde enligt Wikipedia 544 personer i Ekerö sommarst"
  ],
  [
    "bro",
    "Bro socken bildade 1862 tillsammans med grannsocknen Låssa e"
  ],
  [
    "nynashamn",
    "Namnet kommer enligt Wikipedia från Nynäs gård och är känt s"
  ],
  [
    "vaxmora",
    "Törnskogen är ett skogsområde som delas av Sollentuna och Up"
  ],
  [
    "furusund",
    "Namnet syftade enligt Wikipedia från början på sundet mellan"
  ],
  [
    "liljeholmen",
    "Mellan 1899 och 1913 var Liljeholmen ett eget municipalsamhä"
  ],
  [
    "angby",
    "I ett skogsparti mellan Bällstavägen och Vultejusvägen ligge"
  ],
  [
    "viby",
    "Till kommundelen hör enligt Wikipedia Lilla Viby, Östra Viby"
  ],
  [
    "brandbergen",
    "När området byggdes hörde det till postorten Handen och sena"
  ],
  [
    "trakvista",
    "Under medeltiden fanns enligt Wikipedia tre gårdar här på Ek"
  ],
  [
    "kalvesta",
    "Stadsdelen bildades 1953, i det område som Stockholms stad k"
  ],
  [
    "skarholmen",
    "Marken där centrum ligger hörde enligt Wikipedia till Smista"
  ],
  [
    "salem",
    "Kommunen ligger i det sprickdalslandskap som präglar Södertö"
  ],
  [
    "hallstavik",
    "Från Hallstaviks station går i dag bara godståg, på linjen t"
  ],
  [
    "singo",
    "På en karta från 1640-talet kallas ön Singsöö och har redan "
  ],
  [
    "jakobsberg",
    "Namnet finns enligt Wikipedia första gången i ett bytesbrev "
  ],
  [
    "ormsta",
    "I väster gränsar Ormsta enligt Wikipedia till Västanberga, E"
  ],
  [
    "fisksatra",
    "Fisksätra gårds huvudbyggnad från 1720-talet låg enligt Wiki"
  ],
  [
    "brevikshalvon",
    "Tegelbruket vid Kalvfjärden anlades enligt Wikipedia på 1620"
  ],
  [
    "lindholmen",
    "I Lindholmen finns enligt Wikipedia förskolor, Orkesta idrot"
  ],
  [
    "tullinge",
    "Fynd vid Eklundshov, nära det tidigare flygfältet, tyder enl"
  ],
  [
    "skondal",
    "Stadsdelen omfattar enligt Wikipedia 270 hektar land och 37 "
  ],
  [
    "alvsala",
    "Värmdö skeppslag var sedan gammalt indelat i fjärdingar, och"
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 191: nytt stycke på 40 ortssidor", () => {
  it("40 sidor", () => expect(NYA.length).toBe(40));
  for (const [slug, text] of NYA) {
    it(`/taklaggare-${slug}: det nya stycket står i datan och i serverns HTML`, () => {
      const l = locations.find((x) => x.slug === slug)!;
      expect(utanLankar(l.longDescription) + JSON.stringify(l.extraSections ?? []), slug).toContain(text);
      expect(JSON.stringify(prerenderContent(`/taklaggare-${slug}`)!.paragraphs), slug).toContain(JSON.stringify(text).slice(1, -1));
    });
  }
});
