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
  /** Takets yta när den är uppgiven (Vidar), t.ex. "120 kvadratmeter". Visas i faktarutan; saknas den visas ingen rad. */
  area?: string;
  /** Extra rader i faktarutan (etikett, värde), t.ex. Underlag och Avvattning. Visas före "Utfört". */
  facts?: { label: string; value: string }[];
  summary: string;
  /** Kort beskrivning för metataggen och för korten på startsidan, när summary är längre. */
  metaDescription?: string;
  /** Bildtext under hero-bilden, om den ska vara en annan än heroAlt. */
  heroCaption?: string;
  description: string[];
  heroAlt: string;
  /** Bildtexterna under galleribilderna, i samma ordning som bilderna i projects.ts. */
  galleryAlts: string[];
  /** Stabil sökväg under public/og/ för delningsbilden i statisk HTML. */
  ogImage?: string;
}

export const projectTexts: ProjectText[] = [
  {
    "slug": "takrenovering-blido",
    "galleryAlts": ["Taknocken, skorstenarna och gaveln på nära håll.","Huset från baksidan, med altanen."],
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
    "area": "cirka 100 kvadratmeter",
    "facts": [
      {
        "label": "Före",
        "value": "Betongpannor"
      },
      {
        "label": "Underlag",
        "value": "Nytt underlag och ny läkt"
      },
      {
        "label": "Råspont",
        "value": "Den befintliga behölls"
      },
      {
        "label": "Avvattning",
        "value": "Nya hängrännor"
      }
    ],
    "summary": "Komplett takbyte på ett hus på Blidö i Norrtälje kommun, med svarta betongpannor från Benders, nytt underlag, ny läkt, nya plåtdetaljer och nya hängrännor. Befintlig råspont behölls.",
    "description": [
      "Huset ligger i skogen på Blidö i Norrtälje kommun. Uppdraget var ett komplett takbyte, från underlag till avvattning, och arbetet gjordes sommaren 2026. Den befintliga råsponten behölls. Det gamla taket hade betongpannor. Underlaget, läkten, pannorna, plåtdetaljerna, skorstensbeslagen och hängrännorna är nya.",
      "**Vad som ingick.** Ett komplett takbyte utom råsponten: nytt underlag, ny läkt, nya pannor, nya plåtdetaljer och skorstensbeslag och nya hängrännor.",
      "**Råsponten.** Råsponten är brädlagret som resten av taket vilar på. På Blidö behölls den befintliga råsponten. Läs mer om [takets underlag](/material/underlagstak).",
      "**Nytt underlag.** Ovanpå råsponten lades ett nytt underlag. Det är takets andra skydd, som tar hand om det vatten som kan ta sig förbi pannorna.",
      "**Ny läkt.** På underlaget sattes ny läkt, som pannorna vilar på och fästs i.",
      "**Nya pannor.** Det nya ytmaterialet är [betongpannor](/material/betongpannor) från Benders, i svart.",
      "**Nya plåtdetaljer och skorstensbeslag.** Plåtdetaljerna byttes, och skorstenarna fick nya beslag.",
      "**Nya hängrännor.** Avvattningen ingick också: huset fick nya hängrännor. Mer om [takavvattning](/tjanster/takavvattning).",
      "**Tre jobb att jämföra.** På Blidö behölls hela råsponten, och huset fick svarta betongpannor. På [Singö](/projekt/takbyte-singo) byttes delar av råsponten, och taket fick pannor och plåt i rött. I [Grisslehamn](/projekt/takbyte-grisslehamn) fick ett tak på 120 kvadratmeter svarta betongpannor från Benders. Vad som behöver göras avgörs av skicket på just det taket.",
      "**Så arbetar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats. Därefter får kunden en offert med fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen.\n\nVi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning). Alla jobb finns under [Projekt](/projekt)."
    ],
    "heroAlt": "Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring.",
    "heroCaption": "Huset med det nya svarta taket, sett snett ovanifrån från altansidan.",
    "ogImage": "/og/project-blido-hero.jpg"
  },
  {
    "slug": "takbyte-singo",
    "galleryAlts": ["Taket rakt ovanifrån. Här syns hur pannorna på huvudtaket möter plåten på de lägre delarna."],
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
    "area": "120 kvadratmeter",
    "facts": [
      {
        "label": "Före",
        "value": "Lertegel"
      },
      {
        "label": "Råspont",
        "value": "Byttes delvis, där den var rutten"
      }
    ],
    "summary": "Komplett takbyte på ett hus på Singö i Norrtälje kommun, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. Delar av råsponten byttes.",
    "description": [
      "Huset ligger på Singö i Norrtälje kommun, med utsikt över fjärden. Uppdraget var ett komplett takbyte, som blev färdigt i september 2026. Huvudtaket fick röda betongpannor och de lägre takdelarna röd plåt, och delar av råsponten byttes. Det gamla taket hade lertegel.",
      "**Vad som ingick.** Ett komplett takbyte, där också delar av råsponten byttes.",
      "**Råsponten.** Råsponten är brädlagret som resten av taket vilar på. På Singö byttes råsponten delvis, där den var rutten, och resten behölls. Läs mer om [takets underlag](/material/underlagstak).",
      "**Betongpannor på huvudtaket.** Huvudtaket fick röda [betongpannor](/material/betongpannor), ett tungt material som ger ett klassiskt pannat tak.",
      "**TP20-plåt på de lägre delarna.** De lägre takdelarna fick röd [TP20](/material/tp20-plattak), en trapetsprofilerad plåt som är lätt jämfört med pannor.",
      "**Två material, en kulör.** Huset har ett huvudtak och lägre takdelar, och de fick olika material i samma röda kulör.",
      "**Tre jobb att jämföra.** På [Blidö](/projekt/takrenovering-blido) behölls hela råsponten, och huset fick svarta betongpannor. På Singö byttes delar av råsponten, och taket fick pannor och plåt i rött. I [Grisslehamn](/projekt/takbyte-grisslehamn) fick ett tak på 120 kvadratmeter svarta betongpannor från Benders. Vad som behöver göras avgörs av skicket på just det taket.",
      "**Så arbetar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats. Därefter får kunden en offert med fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen.\n\nVi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke, även på startsidan. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning). Alla jobb finns under [Projekt](/projekt)."
    ],
    "heroAlt": "Nytt tak på Singö i Norrtälje kommun med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, med utsikt över fjärden.",
    "heroCaption": "Huset med det nya röda taket, sett snett ovanifrån med fjärden i bakgrunden.",
    "ogImage": "/og/project-singo-hero.jpg"
  },
  {
    "slug": "takbyte-grisslehamn",
    "galleryAlts": ["Huset med det nya taket, altanen och en mindre byggnad intill.","Taket rakt uppifrån. Nocken går längs med huset, och skorstenen sitter vid ena gaveln.","Huset och tomten sedda på avstånd, med skog runt om."],
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
    "area": "120 kvadratmeter",
    "facts": [
      {
        "label": "Underlag",
        "value": "Ny papp (Mataki Haloten Pro) och ny läkt"
      },
      {
        "label": "Avvattning",
        "value": "Ny, från Lindab"
      },
      {
        "label": "Före",
        "value": "Betongpannor, livslängden passerad"
      },
      {
        "label": "Råspont",
        "value": "En del byttes (läckageskada), resten behölls"
      },
      {
        "label": "Taksäkerhet",
        "value": "Taksteg monterades"
      }
    ],
    "summary": "Komplett takbyte på ett hus i Grisslehamn i Norrtälje kommun, gjort i september 2026. Taket är 120 kvadratmeter och fick ny papp, ny läkt och svarta betongpannor från Benders, och huset fick ny avvattning, nya plåtdetaljer, nya vindskivor och fotbrädor och taksteg.",
    "metaDescription": "Komplett takbyte på ett hus i Grisslehamn i Norrtälje kommun, med svarta betongpannor från Benders. Taket är 120 kvadratmeter.",
    "description": [
      "Huset ligger i Grisslehamn i Norrtälje kommun. Uppdraget var ett komplett takbyte, och det gjordes i september 2026. Pappen, läkten, pannorna, plåtdetaljerna och avvattningen är nya. Det gamla taket hade betongpannor vars livslängd var passerad. Bilderna och filmen är tagna efter att arbetet var klart.",
      "**Vad som ingick.** Vi monterade ny papp (Mataki Haloten Pro), ny läkt, ny avvattning från Lindab, nya vindskivor och fotbrädor som vi målade efter kundens önskemål, nya plåtdetaljer, taksteg och nya betongpannor från Benders.",
      "**Ny papp.** Pappen ligger under pannorna och är takets andra skydd. Den tar hand om vatten som tar sig förbi pannorna. Här lades Mataki Haloten Pro.",
      "**Råsponten.** En del av råsponten var skadad av läckage och byttes ut. Resten behölls. Läs mer om [takets underlag](/material/underlagstak).",
      "**Ny läkt.** Läkten är de reglar som pannorna vilar på.",
      "**Nya betongpannor.** Svarta [betongpannor](/material/betongpannor) från Benders. Betongpannor är gjutna pannor som ger ett klassiskt pannat tak.",
      "**Nya plåtdetaljer.** Plåtdetaljer sitter där taket möter något annat.",
      "**Ny avvattning.** Hängrännor och stuprör, från Lindab. Mer om [takavvattning](/tjanster/takavvattning).",
      "**Nya vindskivor och fotbrädor.** De målades efter kundens önskemål.",
      "**Taksteg.** Taksteg monterades. Mer om [taksäkerhet](/tjanster/taksakerhet).",
      "**Så arbetar vi.** Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats. Därefter får kunden en offert med fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen.\n\nVi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
      "**Fler jobb.** Två andra kompletta takbyten finns att se: [Nytt tak på Singö](/projekt/takbyte-singo) och [Nytt tak på Blidö](/projekt/takrenovering-blido). Alla jobb finns under [Projekt](/projekt).",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke. Funderar du på ditt eget tak? [Boka en kostnadsfri takkontroll](/takkontroll) eller läs mer om [takomläggning](/tjanster/takomlaggning)."
    ],
    "heroAlt": "Nytt tak i Grisslehamn med svarta betongpannor, sett snett uppifrån med skorsten, altan och skog runt huset.",
    "heroCaption": "Taket sett snett uppifrån: svarta betongpannor, skorsten i rött tegel och taksteg.",
    "ogImage": "/og/project-grisslehamn-hero.jpg"
  },
];
