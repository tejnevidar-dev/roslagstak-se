/**
 * Paket 117: ortstexterna utan Grind-rad enligt Innehålls omgång 1–2–3–4 (innehall/utan-grind-omgang*-briefrader-2026-10-15.md). Per rad: det nya står på ortens sida (React-data och serverns HTML), det gamla är borta.
 * Genererat av _verktyg/gen-test-117.mjs. Ändrad del med lite sammanhang; ändringarna skrevs in i src/data/locations.ts av _verktyg/rader-per-slug.mjs.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => JSON.stringify(locations.find((x) => x.slug === slug));
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));
const js = (t: string) => JSON.stringify(t).slice(1, -1);

type Rad = { slug: string; kod: string; ny: string; gammal: string };

const omgang1: Rad[] = [
  {
    "slug": "alsten",
    "kod": "U",
    "ny": "ör lite om takets skick. Hur taket mår i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det som spelar roll är vad som gjordes vid den senaste omläggningen och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag"
  },
  {
    "slug": "alta",
    "kod": "T",
    "ny": "hus. Skarvarna mellan dem är värda en extra titt",
    "gammal": ", ränndalarna och genomföringarna är det som behöver granskas noga, tillsammans med underlagspapp, läkt och plåtdetaljer"
  },
  {
    "slug": "appelviken",
    "kod": "U",
    "ny": "ad som ligger där i dag. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det som går att bedöma är hur underlag, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut nu"
  },
  {
    "slug": "ballsta-bromma",
    "kod": "U",
    "ny": "säkert om hur taket mår. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det gör däremot underlaget, läkten, plåten runt skorstenen och hängrännorna, och dem går det att bedöma vid en takkontroll"
  },
  {
    "slug": "barkarby",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "bjorknas",
    "kod": "U",
    "ny": "gts om flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plat",
    "gammal": "det som betyder något är när underlagspapp, läkt och plåtdetaljer senast bytte"
  },
  {
    "slug": "bromma-kyrka",
    "kod": "U",
    "ny": "Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plat",
    "gammal": "Vid en takkontroll är det underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor som visar hur taket mår, oavsett när huset byggde"
  },
  {
    "slug": "dalaro",
    "kod": "R1",
    "ny": "ar och anslutningar, och varje anslutning ska vara tät",
    "gammal": "det är där plåtarbetet avgör hur tätt taket blir"
  },
  {
    "slug": "djursholm",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "djursholm",
    "kod": "R1",
    "ny": "många anslutningar, och varje anslutning ska vara tät",
    "gammal": "det är där arbetet med plåtdetaljer, ränndalar och skorstensbeslag avgör hur tätt taket blir"
  },
  {
    "slug": "svalnas-osby",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "svalnas-osby",
    "kod": "R1",
    "ny": "taket fler anslutningar. Varje anslutning ska vara tät",
    "gammal": "Det är i ränndalar, runt skorstenar och vid plåtdetaljer som ett sådant tak prövas, och där är hantverket avgörande"
  },
  {
    "slug": "eneby",
    "kod": "U",
    "ny": "Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "En takkontroll handlar i stället om det som finns i dag: hur underlaget ser ut, om plåten kring skorsten och ventilation sluter tätt och om hängrännor och stuprör leder bort vattnet"
  },
  {
    "slug": "enskede-gard",
    "kod": "U",
    "ny": "e vad som ligger där nu. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Svaret finns i hur underlag, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag"
  },
  {
    "slug": "enskede",
    "kod": "U",
    "ny": "r lite om hur taket mår. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plat",
    "gammal": "Det går bara att avgöra på plats, där underlag, plåtdetaljer, skorstensanslutningar och hängrännor syn"
  },
  {
    "slug": "enskededalen",
    "kod": "U",
    "ny": "öjar inte hur taket mår. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det som räknas är vad som finns under ytan i dag och hur plåtdetaljer, skorstensanslutningar och hängrännor har klarat sig sedan senaste omläggningen"
  },
  {
    "slug": "enskedefaltet",
    "kod": "T",
    "ny": "nslutningar mot vägg, är värda en extra titt",
    "gammal": "allmänt de ställen på ett tak som först behöver ses över"
  },
  {
    "slug": "flysta",
    "kod": "U",
    "ny": "Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det som går att bedöma på plats är underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor"
  }
];

describe("paket 117: omgång 1 (18 rader)", () => {
  for (const r of omgang1) {
    it(`${r.slug} ${r.kod}: det nya står i datan och på serverns sida, det gamla är borta`, () => {
      expect(ort(r.slug)).toContain(js(r.ny));
      expect(sida(r.slug)).toContain(js(r.ny));
      if (r.gammal.length > 12) expect(ort(r.slug)).not.toContain(js(r.gammal));
    });
  }
});

const omgang2: Rad[] = [
  {
    "slug": "glomsta",
    "kod": "T",
    "ny": "r taket mår. Ett läckage kan börja",
    "gammal": "börjar oftast"
  },
  {
    "slug": "hersby",
    "kod": "T",
    "ny": "utningar som ett läckage kan börja",
    "gammal": "oftast börjar"
  },
  {
    "slug": "hoglandet",
    "kod": "U",
    "ny": "inget om hur taket mår. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Svaret finns i underlaget, i plåtarbetet runt skorstenar och takkupor och i hur vattnet leds bort"
  },
  {
    "slug": "ingaro",
    "kod": "U",
    "ny": "lika tider på samma hus. Skarven mellan dem är värd en extra titt. Hur underlaget ser ut i dag går inte att se från vägen. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plat",
    "gammal": "Det är i mötet mellan dem som en takkontroll gör mest nytta: i ränndalar, vid anslutningar mot vägg och runt genomföringar. Underlagspapp, läkt, plåtdetaljer och hängrännor bedöms på plats, oavsett när huset byggde"
  },
  {
    "slug": "jakobsberg",
    "kod": "O3",
    "ny": "ag. Därför börjar vi med en takkontroll, där en av våra säljare tittar",
    "gammal": "att titta"
  },
  {
    "slug": "jarna",
    "kod": "U",
    "ny": "te för att bedöma taket. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det avgörande är underlagspapp, läkt, plåtdetaljer och hängrännor, och i vilket skick de är i dag"
  },
  {
    "slug": "kallhall",
    "kod": "T",
    "ny": "anslutningarna runt dem är värda en extra tit",
    "gammal": "hör till det som kontrolleras förs"
  },
  {
    "slug": "kummelnas",
    "kod": "O8",
    "ny": "inte har bytts på länge kan underlagspapp, läkt, plåtdetaljer och hängrännor behöva",
    "gammal": "är det oftast underlagspapp, läkt, plåtdetaljer och hängrännor som behöver"
  },
  {
    "slug": "kungsangen",
    "kod": "O8",
    "ny": "inte har bytts på länge kan underlagspapp, läkt, plåtdetaljer och hängrännor behöva ses över",
    "gammal": "är det underlagspapp, läkt, plåtdetaljer och hängrännor som behöver ses över först"
  },
  {
    "slug": "lahall",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "lahall",
    "kod": "T",
    "ny": "tningar, som ett läckage kan börja",
    "gammal": "oftast börjar"
  },
  {
    "slug": "lindholmen",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "loharad",
    "kod": "O8",
    "ny": "s om. Har det inte skett kan underlagspapp, läkt, genomföringar och plåtanslutningar behöva ses över",
    "gammal": "är det underlagspapp, läkt, genomföringar och plåtanslutningar som behöver ses över först, eftersom det är där ett tak brukar släppa in vatten"
  },
  {
    "slug": "malarhojden",
    "kod": "U",
    "ny": "a lagts om flera gånger. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plat",
    "gammal": "Det som avgör skicket är när det senast gjordes och hur underlaget ser ut i dag, inte när huset byggde"
  },
  {
    "slug": "nockeby",
    "kod": "U",
    "ny": "ör lite om takets skick. Hur taket mår i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det som spelar roll är vad som gjordes senast och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag"
  }
];

describe("paket 117: omgång 2 (15 rader)", () => {
  for (const r of omgang2) {
    it(`${r.slug} ${r.kod}: det nya står i datan och på serverns sida, det gamla är borta`, () => {
      expect(ort(r.slug)).toContain(js(r.ny));
      expect(sida(r.slug)).toContain(js(r.ny));
      if (r.gammal.length > 12) expect(ort(r.slug)).not.toContain(js(r.gammal));
    });
  }
});

const omgang3: Rad[] = [
  {
    "slug": "angby",
    "kod": "O8",
    "ny": "g, läkt och plåtdetaljer det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "pershagen",
    "kod": "U",
    "ny": "nte hur taket mår i dag. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det gör underlaget, plåten kring skorsten och genomföringar och hängrännornas skick"
  },
  {
    "slug": "resaro",
    "kod": "T",
    "ny": "ill i flera steg. Där är övergångarna värda en extra titt",
    "gammal": "det övergångarna som ska granskas"
  },
  {
    "slug": "segeltorp",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "sjoberg",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "barkarby",
    "kod": "T",
    "ny": "anslutning i taket, och anslutningarna är värda en extra titt",
    "gammal": "det är i ränndalar, vid anslutningar mot vägg och kring skorstenar som underlagspapp och plåt bör kontrolleras först. Hängrännor och stuprör hör till samma genomgång"
  },
  {
    "slug": "smedslatten",
    "kod": "?",
    "ny": "n redan ha lagts om, och hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats. På hus från 1960-talet kan underlagspapp, läkt, plåtdetaljer och hängränno",
    "gammal": "då är det den senaste omläggningen som avgör skicket, inte byggåret. På hus från 1960-talet är det underlagspapp, läkt, plåtdetaljer och hängrännor som bruka"
  },
  {
    "slug": "sodra-angby",
    "kod": "U",
    "ny": "r lite om hur taket mår. Hur taket mår i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det avgörande är när den senaste omläggningen gjordes, hur den utfördes och hur avvattning, plåtdetaljer och anslutningar mot skorsten och vägg ser ut i dag"
  },
  {
    "slug": "vasterhaninge",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "vendelso",
    "kod": "T",
    "ny": "nslutningar mot vägg, är värda en extra tit",
    "gammal": "de ställen som behöver ses över förs"
  }
];

describe("paket 117: omgång 3 (10 rader)", () => {
  for (const r of omgang3) {
    it(`${r.slug} ${r.kod}: det nya står i datan och på serverns sida, det gamla är borta`, () => {
      expect(ort(r.slug)).toContain(js(r.ny));
      expect(sida(r.slug)).toContain(js(r.ny));
      if (r.gammal.length > 12) expect(ort(r.slug)).not.toContain(js(r.gammal));
    });
  }
});

const omgang4: Rad[] = [
  {
    "slug": "stenhamra",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "stocksund",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "stocksund",
    "kod": "R1",
    "ny": "ett enkelt sadeltak, och varje anslutning ska vara tät",
    "gammal": "det är i ränndalar, kring skorstenar och vid plåtdetaljer som ett tak oftast prövas"
  },
  {
    "slug": "stora-mossen",
    "kod": "U",
    "ny": "både en och två gånger, och hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "så det är dagens skick som räknas, inte byggåret: hur underlaget ser ut, om plåten runt skorsten och kupor är tät och om rännorna för bort vattnet"
  },
  {
    "slug": "stureby",
    "kod": "O8",
    "ny": "inte har bytts på länge kan underlagspapp, läkt, plåtdetaljer och hängränno",
    "gammal": "är det underlagspapp, läkt, plåtdetaljer och hängrännor som bruka"
  },
  {
    "slug": "svedmyra",
    "kod": "U",
    "ny": "n redan ha lagts om, och hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "det som avgör skicket är vad som gjordes vid det tillfället, inte husets byggår"
  },
  {
    "slug": "svedmyra",
    "kod": "T",
    "ny": "ya anslutningar i taket. Anslutningarna vid kupornas sidor, runt takfönster och där tillbyggnaden möter det ursprungliga huset är värda en extra titt",
    "gammal": "Det är vid kupornas sidor, runt takfönster och där tillbyggnaden möter det ursprungliga huset som en takkontroll behöver vara noggrann"
  },
  {
    "slug": "tallkrogen",
    "kod": "U",
    "ny": "r lite om hur taket mår. Hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "Det går bara att avgöra på plats, genom att se på underlag, läkt, plåtdetaljer, skorstensanslutning och hängrännor"
  },
  {
    "slug": "ulvsunda",
    "kod": "T",
    "ny": "som möts i vinklar, och anslutningarna i vinklarna, vid ränndalar och plåt är värda en extra titt",
    "gammal": "det är i vinklarna, vid ränndalar och plåtanslutningar, som en kontroll behöver vara noggrann"
  },
  {
    "slug": "ursvik",
    "kod": "T",
    "ny": "ika tider, och skarvarna är värda en extra tit",
    "gammal": "hör till det som ses över förs"
  },
  {
    "slug": "uttran",
    "kod": "O8",
    "ny": "tdetaljer och hängrännor det som kan behöva",
    "gammal": "ofta det som behöver"
  },
  {
    "slug": "vidja",
    "kod": "O8",
    "ny": "länge. Där det är fallet kan underlagspapp, läkt, plåtdetaljer och hängrännor behöva",
    "gammal": "är underlagspapp, läkt, plåtdetaljer och hängrännor det som oftast behöver"
  },
  {
    "slug": "viksberg",
    "kod": "U",
    "ny": "taken redan ha lagts om, och hur underlaget ser ut i dag går inte att se från vägen. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats",
    "gammal": "så det är dagens skick som räknas och inte byggåret"
  },
  {
    "slug": "viksberg",
    "kod": "T",
    "ny": "ra ihop, och det stället är värt en extra titt",
    "gammal": "bör ses över noga"
  }
];

describe("paket 117: omgång 4 (14 rader)", () => {
  for (const r of omgang4) {
    it(`${r.slug} ${r.kod}: det nya står i datan och på serverns sida, det gamla är borta`, () => {
      expect(ort(r.slug)).toContain(js(r.ny));
      expect(sida(r.slug)).toContain(js(r.ny));
      if (r.gammal.length > 12) expect(ort(r.slug)).not.toContain(js(r.gammal));
    });
  }
});
