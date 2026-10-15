/**
 * Paket 117: ortstexterna utan Grind-rad enligt Innehålls omgång 1–2 (innehall/utan-grind-omgang*-briefrader-2026-10-15.md). Per rad: det nya står på ortens sida (React-data och serverns HTML), det gamla är borta.
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
