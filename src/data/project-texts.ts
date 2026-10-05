/**
 * Referensjobbens TEXT (ren data, inga bildimporter), så att både projects.ts (React) och
 * scripts/prerender-content.ts (statisk HTML) läser samma källa. Bilder, hero och galleri ligger kvar
 * i src/data/projects.ts (de kräver Vite-bildimporter). Nya jobb läggs in med scripts/import-project.ts
 * ur en godkänd brief (innehall/projekttexter/<slug>.md, raden "**Grind:** GODKÄND ..."); bilderna
 * kopplas sedan på sluggen i projects.ts. Endast belagda fakta (se kommentaren i projects.ts).
 */
import type { MaterialSlug } from "./materials";

export interface ProjectText {
  slug: string;
  title: string;
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  material: string;
  materialSlugs: MaterialSlug[];
  period: string;
  summary: string;
  description: string[];
  heroAlt: string;
  /** Stabil sökväg under public/og/ för delningsbilden i statisk HTML. */
  ogImage?: string;
}

export const projectTexts: ProjectText[] = [
  {
    "slug": "takrenovering-blido",
    "title": "Nytt tak på Blidö",
    "locationName": "Blidö, Norrtälje",
    "locationSlug": "blido",
    "serviceName": "Takbyte",
    "serviceSlug": "takomlaggning",
    "material": "Betongpannor (Benders, svart)",
    "materialSlugs": [
      "betongpannor"
    ],
    "period": "sommaren 2026",
    "summary": "Komplett takbyte på ett hus på Blidö i Norrtälje kommun, med svarta betongpannor från Benders, nytt underlag, ny läkt, nya plåtdetaljer och nya hängrännor. Befintlig råspont behölls.",
    "description": [
      "Huset ligger i skogen på Blidö i Norrtälje kommun. Uppdraget var ett komplett takbyte, från underlag till avvattning, och arbetet gjordes sommaren 2026.",
      "**Råsponten.** Råsponten är brädlagret som resten av taket vilar på. På Blidö behölls den befintliga råsponten. Läs mer om [takets underlag](/material/underlagstak).",
      "**Nytt underlag.** Ovanpå råsponten lades ett nytt underlag. Det är takets andra skydd, som tar hand om det vatten som kan ta sig förbi pannorna.",
      "**Ny läkt.** På underlaget sattes ny läkt, som pannorna vilar på och fästs i.",
      "**Nya pannor.** Det nya ytmaterialet är [betongpannor](/material/betongpannor) från Benders, i svart.",
      "**Nya plåtdetaljer och skorstensbeslag.** Plåtdetaljerna byttes, och skorstenarna fick nya beslag. Det är vid skorstenar, kanter och andra anslutningar som ett tak prövas hårdast, och därför görs de om när taket byts.",
      "**Nya hängrännor.** Avvattningen ingick också: huset fick nya hängrännor.",
      "**Så jobbar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där vi tittar på taket på plats. Därefter får kunden ett fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning).",
      "Fler jobb: [Singö](/projekt/takbyte-singo) och [Grisslehamn](/projekt/takbyte-grisslehamn).",
    ],
    "heroAlt": "Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring.",
    "ogImage": "/og/project-blido-hero.jpg"
  },
  {
    "slug": "takbyte-singo",
    "title": "Nytt tak på Singö",
    "locationName": "Singö",
    "locationSlug": "singo",
    "serviceName": "Takbyte",
    "serviceSlug": "takomlaggning",
    "material": "Betongpannor på huvudtaket, TP20-plåt på de lägre delarna (båda röda)",
    "materialSlugs": [
      "betongpannor",
      "tp20-plattak"
    ],
    "period": "september 2026",
    "summary": "Komplett takbyte på ett hus på Singö i Norrtälje kommun, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. Delar av råsponten byttes.",
    "description": [
      "Huset ligger på Singö i Norrtälje kommun, med utsikt över fjärden. Uppdraget var ett komplett takbyte, som blev färdigt i september 2026.",
      "**Råsponten.** Råsponten är brädlagret som resten av taket vilar på. På Singö byttes delar av råsponten, och resten behölls. Läs mer om [takets underlag](/material/underlagstak).",
      "**Två material, en kulör.** Huset har ett huvudtak och lägre takdelar, och de fick olika material i samma röda kulör.",
      "**Betongpannor på huvudtaket.** Huvudtaket fick röda [betongpannor](/material/betongpannor), ett tungt material som ger ett klassiskt pannat tak.",
      "**TP20-plåt på de lägre delarna.** De lägre takdelarna fick röd [TP20](/material/tp20-plattak), en trapetsprofilerad plåt som är lätt jämfört med pannor. På bilden rakt ovanifrån syns hur de två materialen möts.",
      "**Tre jobb att jämföra.** På [Blidö](/projekt/takrenovering-blido) behölls hela råsponten, och huset fick svarta betongpannor. På Singö byttes delar av råsponten, och taket fick pannor och plåt i rött. I [Grisslehamn](/projekt/takbyte-grisslehamn) fick ett tak på 120 kvadratmeter svarta betongpannor från Benders. Vad som behöver göras avgörs av skicket på just det taket.",
      "**Så jobbar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där vi tittar på taket på plats. Därefter får kunden ett fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke, även på startsidan. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning)."
    ],
    "heroAlt": "Nytt tak på Singö i Norrtälje kommun med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, med utsikt över fjärden.",
    "ogImage": "/og/project-singo-hero.jpg"
  },
  {
    "slug": "takbyte-grisslehamn",
    "title": "Nytt tak i Grisslehamn",
    "locationName": "Grisslehamn",
    "locationSlug": "grisslehamn",
    "serviceName": "Takbyte",
    "serviceSlug": "takomlaggning",
    "material": "Svarta betongpannor från Benders",
    "materialSlugs": [
      "betongpannor"
    ],
    "period": "september 2026",
    "summary": "Komplett takbyte på ett hus i Grisslehamn i Norrtälje kommun, med svarta betongpannor från Benders. Taket är 120 kvadratmeter.",
    "description": [
      "Huset ligger i Grisslehamn i Norrtälje kommun. Uppdraget var ett komplett takbyte.",
      "**Svarta betongpannor.** Taket fick svarta [betongpannor](/material/betongpannor) från Benders. Betongpannor är gjutna pannor som ger ett klassiskt pannat tak.",
      "**Vad som ingick.** Vi monterade ny papp (Mataki Haloten Pro), ny läkt, ny avvattning från Lindab, nya vindskivor och fotbrädor som vi målade efter kundens önskemål, nya plåtdetaljer, takstege och nya betongpannor från Benders.",
      "**Så jobbar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats. Därefter får kunden en offert med fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning). Fler jobb finns under [Projekt](/projekt)."
    ],
    "heroAlt": "Nytt tak i Grisslehamn med svarta betongpannor, sett rakt uppifrån.",
    "ogImage": "/og/project-grisslehamn-hero.jpg"
  },
];
