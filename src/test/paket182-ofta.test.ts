/**
 * Gren 182: orden "ofta", "oftast", "sällan" och "behöver/behöva ses över" är bytta i de 125 godkända texterna enligt innehall/ofta-rattning-2026-10-22.md (Marknadschefens grindsvar 266),
 * och Tullinges och Smedslättens gamla underlagsmening är bytt mot underlagsformen och K2. Raderna är tillämpade av _verktyg/gren182-rader.mjs (170 rader, en träff var).
 */
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

const ORTER: string[] = [
  "uppsala",
  "tullinge",
  "alsten",
  "alta",
  "barkarby",
  "bergshamra",
  "bjorknas",
  "brevik-kappala-gashaga",
  "nora-kevinge",
  "svalnas-osby",
  "duvbo",
  "edsberg",
  "edsviken",
  "ensta",
  "graddo",
  "gustavsberg",
  "helenelund",
  "herrang",
  "herrangen",
  "hersby",
  "hoglandet",
  "hogmarso",
  "husaro",
  "ingaro",
  "ingmarso",
  "jarna",
  "kallhall",
  "knivsta",
  "kummelnas",
  "lahall",
  "langbro",
  "lindholmen",
  "ljustero",
  "loharad",
  "marsta",
  "nockeby",
  "nockebyhov",
  "angby",
  "vendelso",
  "nykoping",
  "orby",
  "riala",
  "rindo",
  "rosersberg",
  "rotebro",
  "salem",
  "saltsjo-boo",
  "saltsjobaden",
  "enhorna-sandviken",
  "segeltorp",
  "singo",
  "sjoberg",
  "barkarby",
  "skarsatra",
  "skondal",
  "smedslatten",
  "sodertalje",
  "solhem-lunda",
  "spanga",
  "stavsnas",
  "stenhamra",
  "stockholm",
  "stocksund",
  "stureby",
  "svartno",
  "svedmyra",
  "trollbacken",
  "trosa",
  "tumba",
  "tynningo",
  "ulvsunda",
  "upplands-bro",
  "uttran",
  "ormsta",
  "varberg",
  "vasteras",
  "vasterhaninge",
  "vega",
  "viby",
  "vidja",
  "viggbyholm",
  "viksberg",
  "blido",
  "yxlan",
];
const COMBO: string[] = [
  "takbyte-danderyd",
  "takbyte-haninge",
  "takbyte-huddinge",
  "takbyte-jarfalla",
  "takbyte-lidingo",
  "takbyte-nacka",
  "takbyte-salem",
  "takbyte-sollentuna",
  "takbyte-solna",
  "takbyte-stockholm",
  "takbyte-sundbyberg",
  "takbyte-tyreso",
  "takomlaggning-akersberga",
  "takomlaggning-danderyd",
  "takomlaggning-hallstavik",
  "takomlaggning-norrtalje",
  "takomlaggning-rimbo",
  "takomlaggning-salem",
  "takomlaggning-sodertalje",
  "takomlaggning-sundbyberg",
  "takomlaggning-taby",
  "takomlaggning-tyreso",
  "takomlaggning-vallentuna",
  "takrenovering-akersberga",
  "takrenovering-danderyd",
  "takrenovering-hallstavik",
  "takrenovering-haninge",
  "takrenovering-norrtalje",
  "takrenovering-salem",
  "takrenovering-sodertalje",
  "takrenovering-sollentuna",
  "takrenovering-sundbyberg",
  "takrenovering-taby",
  "takrenovering-tyreso",
  "takrenovering-vallentuna",
];
const OMRADEN: string[] = [
  "/omraden/kusten",
  "/omraden/norra-skargarden",
  "/omraden/norra-stockholm",
  "/omraden/ostra-stockholm",
  "/omraden/radmansohalvon",
  "/omraden/sydostra-stockholm",
];

const text = (path: string) => JSON.stringify(prerenderContent(path));
const FOREBJUDET = /behöv[ae]r ses över|behöva ses över|oftast|(har|finns det|används) ofta/;

describe("gren 182: 'ofta', 'oftast' och 'behöver ses över' är borta ur de godkända texterna", () => {
  it("ortssidorna (84)", () => {
    for (const s of ORTER) expect(text("/taklaggare-" + s), s).not.toMatch(FOREBJUDET);
  });
  it("tjänst × ort-sidorna (35)", () => {
    for (const s of COMBO) expect(text("/" + s), s).not.toMatch(FOREBJUDET);
  });
  it("områdessidorna (6)", () => {
    for (const s of OMRADEN) expect(text(s), s).not.toMatch(FOREBJUDET);
  });
  it("Tullinge: den gamla underlagsmeningen är bytt, K2 står kvar", () => {
    const t = text("/taklaggare-tullinge");
    expect(t).not.toContain("ett slitet underlag");
    expect(t).toContain("hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });
});
