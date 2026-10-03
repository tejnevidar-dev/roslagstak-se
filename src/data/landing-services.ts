/** Innehåll för /takreparation och /takkontroll. Endast uppgifter som redan står på sajten eller som ägaren bekräftat. */
import { GARANTI_RENOVERING } from "./guarantee";

export interface LandingService {
  slug: "takreparation" | "takkontroll" | "rot-avdrag" | "akut-lackage" | "hangrannor" | "platslagare" | "takbyte-var-2027";
  path: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string;
  listHeading: string;
  listIntro: string;
  list: { title: string; text: string }[];
  stepsHeading: string;
  steps: { title: string; text: string }[];
  extraHeading: string;
  extraParagraphs: string[];
  priceNote: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  defaultTopic: "Takrenovering eller reparation" | "Takkontroll" | "Takbyte";
  formTitle: string;
  related: { to: string; label: string }[];
}

export const landingServices: LandingService[] = [
  {
    slug: "takreparation",
    path: "/takreparation",
    seoTitle: "Takreparation — läckage och trasiga takpannor",
    seoDescription:
      "Läcker taket eller är pannor trasiga? Vi gör en kostnadsfri takkontroll, lämnar fast pris och lagar. 10 års utförandegaranti. Svar inom 24 timmar.",
    breadcrumb: "Takreparation",
    eyebrow: "Takreparation",
    h1: "Takreparation vid läckage och skador.",
    h1Accent: "Fast pris efter kostnadsfri takkontroll.",
    intro:
      "Läcker taket, är pannor trasiga eller sitter plåten löst? Vi gör en kostnadsfri takkontroll, lämnar ett skriftligt fast pris och utför reparationen. Är taket i så dåligt skick att en reparation inte räcker säger vi det.",
    listHeading: "Skador vi lagar",
    listIntro: "De vanligaste orsakerna till att tak läcker eller tar skada, och vad vi gör åt dem.",
    list: [
      {
        title: "Trasiga eller förskjutna pannor",
        text: "Vi byter enstaka pannor utan att byta hela taket.",
      },
      {
        title: "Läckage kring skorsten och genomföringar",
        text: "Plåtbeslag runt skorstenar, ventiler och genomföringar är där tak oftast läcker. Vad som behöver göras bedömer vi vid takkontrollen.",
      },
      {
        title: "Sliten underlagspapp",
        text: "Papp som blivit spröd eller trasig byts, så att taket blir tätt under takmaterialet.",
      },
      {
        title: "Rötskadad råspont",
        text: "Skadat virke byts ut innan taket täcks igen. Vi visar dig omfattningen först.",
      },
      {
        title: "Skadad plåt och rost",
        text: "Rostiga eller skadade plåtar och beslag bedöms vid takkontrollen.",
      },
      {
        title: "Rännor och stuprör",
        text: "Hängrännor som läcker eller hänger snett åtgärdas, eller byts vid behov.",
      },
    ],
    stepsHeading: "Så går en reparation till",
    steps: [
      {
        title: "Kontakta oss",
        text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar. Vid akut läckage: ring 070-154 36 39.",
      },
      {
        title: "Kostnadsfri takkontroll",
        text: "Vi tittar på taket och orsaken till skadan och bedömer om en reparation räcker.",
      },
      {
        title: "Fast pris",
        text: "Du får en skriftlig offert med tydlig åtgärdslista och fast pris.",
      },
      {
        title: "Reparation och slutkontroll",
        text: "Vi utför reparationen och kontrollerar resultatet tillsammans med dig innan vi lämnar platsen.",
      },
    ],
    extraHeading: "Reparation eller nytt tak?",
    extraParagraphs: [
      "Ibland räcker en reparation, ibland är taket i så dåligt skick att ett takbyte blir bättre ekonomi över tid. Vi ger en ärlig bedömning och föreslår aldrig ett takbyte om en renovering räcker.",
      "Är skadorna många, är underlaget rötskadat på stora ytor eller är takmaterialet uttjänt är ett takbyte oftast det bästa valet. Vid takkontrollen går vi igenom alternativen med dig.",
    ],
    priceNote:
      "Priset beror på skadans omfattning, takmaterial och hur åtkomligt taket är. Vi arbetar endast till fast pris och lämnar det efter takkontrollen. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år.",
    faqTitle: "Frågor om takreparation",
    faqs: [
      {
        question: "Vad kostar en takreparation?",
        answer:
          "Det beror på skadans omfattning, takmaterial och åtkomst. Efter en kostnadsfri takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vad ska jag göra vid akut läckage?",
        answer:
          "Ring oss på 070-154 36 39. Skydda under tiden det som kan ta skada inomhus: flytta möbler och värdesaker, ställ ett kärl under droppet och fotografera skadan. Bilderna kan vara bra om du gör en försäkringsanmälan.",
      },
      {
        question: "Hur vet jag om jag ska reparera eller byta tak?",
        answer:
          "Det avgörs av takets ålder, skick och hur omfattande skadorna är. Vid takkontrollen bedömer vi underlag, papp och takmaterial och ger en ärlig rekommendation. Vi föreslår inte ett takbyte om en reparation räcker.",
      },
      {
        question: "Får jag garanti på reparationen?",
        answer: GARANTI_RENOVERING,
      },
      {
        question: "Kan jag få ROT-avdrag på en takreparation?",
        answer:
          "Ja, för privatpersoner ger ROT-avdraget 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Arbetskostnaden specificeras separat i offerten, och beloppet dras av direkt på fakturan.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
      },
    ],
    defaultTopic: "Takrenovering eller reparation",
    formTitle: "Begär takkontroll och fast pris",
    related: [
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/tjanster/takrenovering", label: "Takrenovering" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
      { to: "/tjanster/takavvattning", label: "Takavvattning" },
    ],
  },
  {
    slug: "takkontroll",
    path: "/takkontroll",
    seoTitle: "Kostnadsfri takkontroll av ditt tak — fast pris",
    seoDescription:
      "Kostnadsfri takkontroll: en av våra säljare tittar på taket på plats, ca 1–2 timmar. Utan förpliktelser. Fast pris i offerten om något behöver åtgärdas. Svar inom 24 timmar.",
    breadcrumb: "Kostnadsfri takkontroll",
    eyebrow: "Takkontroll",
    h1: "Kostnadsfri takkontroll.",
    h1Accent: "Utan förpliktelser.",
    intro:
      "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Kostnadsfritt och utan förpliktelser — du betalar inget och binder dig inte till något.",
    listHeading: "Vad vi tittar på",
    listIntro: "Vi tittar bland annat på takmaterial, plåtdetaljer och avvattning, och på vinden när den går att komma åt.",
    list: [
      {
        title: "Takmaterialet",
        text: "Vi tittar efter sprickor, förskjutningar, rost samt mossa och alger som håller kvar fukt.",
      },
      {
        title: "Plåtdetaljer och genomföringar",
        text: "Vi går igenom beslag runt skorstenar, ventiler och andra genomföringar.",
      },
      {
        title: "Takavvattning",
        text: "Vi kontrollerar hängrännor, stuprör och fall.",
      },
      {
        title: "Vinden",
        text: "När vinden går att komma åt tittar vi på underlag och råspont därifrån.",
      },
    ],
    stepsHeading: "Så går takkontrollen till",
    steps: [
      {
        title: "Boka",
        text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar och bokar en tid.",
      },
      {
        title: "Vi tittar på taket på plats",
        text: "Det tar ungefär 1–2 timmar. Kostnadsfritt och utan förpliktelser.",
      },
      {
        title: "Rapport och fast pris i offerten",
        text: "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser.",
      },
      {
        title: "Du bestämmer själv",
        text: "Vi går igenom vad vi sett med dig. Du bestämmer själv om och när något ska åtgärdas.",
      },
    ],
    extraHeading: "När är det läge för en takkontroll?",
    extraParagraphs: [
      "Boka en kontroll om du ser fuktfläckar i tak eller på vinden, trasiga eller förskjutna pannor, rost på plåt eller mossa och alger som håller kvar fukt. Också när taket börjar bli gammalt och du inte vet vilket skick det har.",
      "En regelbunden kontroll förebygger dyra skador och ger dig ett underlag för att planera underhåll eller ett eventuellt takbyte.",
    ],
    priceNote:
      "Takkontrollen är helt kostnadsfri och förpliktar inte till något. Behöver taket åtgärdas lämnar vi ett fast pris. Vi arbetar endast till fast pris.",
    faqTitle: "Frågor om takkontroll",
    faqs: [
      {
        question: "Vad händer vid takkontrollen?",
        answer:
          "En av våra säljare kommer ut och tittar på taket på plats. Det tar ungefär 1–2 timmar. Berätta gärna vad du själv har sett, till exempel fuktfläckar, trasiga pannor eller läckande hängrännor, så att vi vet vad vi ska titta extra på.",
      },
      {
        question: "Kostar takkontrollen något?",
        answer: "Nej. Takkontrollen är kostnadsfri och utan förpliktelser: du betalar inget och binder dig inte till något.",
      },
      {
        question: "Vad får jag efter kontrollen?",
        answer: "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Du bestämmer själv om och när något ska göras.",
      },
      {
        question: "Hur och när kan jag boka?",
        answer: "Fyll i formuläret eller ring 070-154 36 39. Vi svarar inom 24 timmar. Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19.",
      },
      {
        question: "Gäller ROT-avdraget?",
        answer:
          "Själva takkontrollen är kostnadsfri. Om du sedan anlitar oss drar vi ROT-avdraget direkt på fakturan: 30 % av arbetskostnaden. Det förutsätter att du har rätt till fullt ROT-avdrag (högst 50 000 kr per person och år) och har betalat tillräckligt med skatt.",
      },
      {
        question: "Vem har jag kontakt med?",
        answer: "Du har en kontaktperson genom hela processen, från takkontrollen till färdigt tak.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
      },
    ],
    defaultTopic: "Takkontroll",
    formTitle: "Boka kostnadsfri takkontroll",
    related: [
      { to: "/tjanster/takinspektion", label: "Takinspektion" },
      { to: "/takreparation", label: "Takreparation" },
      { to: "/tjanster/takrenovering", label: "Takrenovering" },
      { to: "/blogg/tecken-byta-tak", label: "Tecken på att det är dags att byta tak" },
    ],
  },
  {
    slug: "rot-avdrag",
    path: "/rot-avdrag",
    seoTitle: "ROT-avdrag på tak — 30 % av arbetskostnaden",
    seoDescription:
      "ROT-avdrag på takbyte och takarbeten: 30 % av arbetskostnaden, högst 50 000 kr per person och år. Vi drar av det direkt på fakturan. Fast pris.",
    breadcrumb: "ROT-avdrag",
    eyebrow: "ROT-avdrag",
    h1: "ROT-avdrag på takarbeten.",
    h1Accent: "30 % av arbetskostnaden.",
    intro:
      "Som privatperson kan du få ROT-avdrag på arbetskostnaden när vi byter eller renoverar taket på din bostad. Avdraget ger 30 % skattereduktion, upp till 50 000 kr per person och år. Vi drar av det direkt på fakturan.",
    listHeading: "Så fungerar ROT-avdraget på tak",
    listIntro: "Det här är det som gäller för dig som privatperson.",
    list: [
      {
        title: "30 % av arbetskostnaden",
        text: "Avdraget beräknas på arbetskostnaden, inte på hela priset.",
      },
      {
        title: "Högst 50 000 kr per person och år",
        text: "Är ni två ägare kan var och en använda sitt avdrag, om ni båda uppfyller villkoren.",
      },
      {
        title: "Bara arbetet ger avdrag",
        text: "Material, som pannor, plåt och papp, ger inget ROT-avdrag. Därför specificerar vi arbetskostnaden separat i offerten.",
      },
      {
        title: "Avdraget görs på fakturan",
        text: "Du betalar det som återstår efter avdraget. Vi hanterar ansökan till Skatteverket.",
      },
      {
        title: "För dig som äger bostaden",
        text: "ROT-avdraget gäller privatpersoner som äger bostaden, till exempel villa eller fritidshus. För bostadsrättsföreningar gäller andra regler.",
      },
      {
        title: "Skatt att göra avdrag mot",
        text: "ROT-avdraget är en skattereduktion. Du behöver ha betalat tillräckligt med skatt under året för att kunna använda hela avdraget.",
      },
    ],
    stepsHeading: "Så går det till",
    steps: [
      {
        title: "Kostnadsfri takkontroll",
        text: "Vi tittar på taket och bedömer vad som behöver göras.",
      },
      {
        title: "Offert med fast pris",
        text: "Du får en skriftlig offert där arbetskostnad och materialkostnad redovisas var för sig.",
      },
      {
        title: "Arbetet utförs",
        text: "Vi utför takarbetet enligt AMA och lämnar 10 års utförandegaranti.",
      },
      {
        title: "Faktura med ROT-avdrag",
        text: "Avdraget dras av direkt på fakturan, så du slipper vänta på pengar tillbaka.",
      },
    ],
    extraHeading: "Vilka takarbeten ger ROT-avdrag?",
    extraParagraphs: [
      "Takbyte, takomläggning, takrenovering och takreparation på din bostad ger ROT-avdrag på arbetskostnaden. Detsamma gäller plåtarbeten och takavvattning som ingår i arbetet.",
      "Vilka regler som gäller just din situation avgörs av Skatteverket. Vi går gärna igenom hur det ser ut för ditt tak när vi lämnar offert.",
    ],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. ROT-avdraget räknas av från arbetskostnaden i offerten.",
    faqTitle: "Frågor om ROT-avdrag på tak",
    faqs: [
      {
        question: "Hur mycket är ROT-avdraget?",
        answer: "30 % av arbetskostnaden, upp till 50 000 kr per person och år.",
      },
      {
        question: "Gäller ROT-avdraget materialet?",
        answer:
          "Nej. Avdraget gäller bara arbetskostnaden. Därför redovisar vi arbete och material separat i offerten.",
      },
      {
        question: "Hur får jag ROT-avdraget?",
        answer:
          "Vi drar av det direkt på fakturan och ansöker om utbetalningen hos Skatteverket, så du betalar bara det som återstår.",
      },
      {
        question: "Kan bostadsrättsföreningar få ROT-avdrag?",
        answer:
          "ROT-avdraget gäller privatpersoner. För bostadsrättsföreningar gäller andra regler, och vi går igenom det i offerten.",
      },
      {
        question: "Kan jag få ROT-avdrag på en takreparation?",
        answer: "Ja, på arbetskostnaden vid reparation, renovering och takbyte på din bostad.",
      },
      {
        question: "Vad kostar ett takbyte?",
        answer:
          "Det beror på taket. Efter en kostnadsfri takkontroll får du ett fast pris, och vi arbetar endast till fast pris.",
      },
    ],
    defaultTopic: "Takbyte",
    formTitle: "Begär offert med ROT-avdrag",
    related: [
      { to: "/blogg/rot-avdrag-takbyte", label: "Guide: ROT-avdrag vid takbyte" },
      { to: "/priser", label: "Priser för takbyte" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/offert", label: "Räkna ut din offert" },
    ],
  },
  {
    slug: "akut-lackage",
    path: "/akut-lackage",
    seoTitle: "Akut läckage i taket — ring 070-154 36 39",
    seoDescription:
      "Läcker taket? Ring oss på 070-154 36 39 eller skicka en förfrågan. Vi gör en kostnadsfri takkontroll, lämnar fast pris och lagar. 10 års utförandegaranti.",
    breadcrumb: "Akut läckage",
    eyebrow: "Akut läckage",
    h1: "Läcker taket?",
    h1Accent: "Ring oss, så tar vi det därifrån.",
    intro:
      "Ring 070-154 36 39 eller skicka formuläret. Vi gör en kostnadsfri takkontroll, hittar orsaken till läckaget och lämnar ett skriftligt fast pris för reparationen.",
    listHeading: "Gör så här medan du väntar",
    listIntro: "Några enkla åtgärder begränsar skadan tills vi har varit på plats.",
    list: [
      { title: "Skydda det som kan ta skada", text: "Flytta möbler och värdesaker undan från platsen där det droppar." },
      { title: "Fånga vattnet", text: "Ställ ett kärl under droppet så att golvet inte tar skada." },
      { title: "Fotografera skadan", text: "Bilder på fuktfläckar och droppande vatten kan vara bra om du gör en försäkringsanmälan." },
      { title: "Gå inte upp på taket", text: "Ett vått tak är halt. Lämna arbetet på taket till oss." },
      { title: "Kontakta oss", text: "Ring 070-154 36 39. Vi går igenom vad som hänt och bokar takkontroll." },
      { title: "Anmäl till försäkringsbolaget", text: "Kontakta ditt försäkringsbolag om skadan kan täckas av hemförsäkringen." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Du kontaktar oss", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Takkontroll", text: "Vi tittar på taket på plats och letar efter var vattnet kommer in." },
      { title: "Fast pris", text: "Du får en skriftlig offert med tydlig åtgärdslista och fast pris." },
      { title: "Reparation", text: "Vi utför reparationen och kontrollerar resultatet innan vi lämnar platsen." },
    ],
    extraHeading: "Var läcker tak oftast?",
    extraParagraphs: [
      "Läckage uppstår oftast kring skorstenar, ventiler och andra genomföringar, vid ränndalar och beslag, och där pannor är trasiga eller underlagspappen är sliten. Orsaken syns sällan där fuktfläcken kommer fram inomhus, så vi följer vattnet uppåt.",
      "Ibland räcker en reparation, ibland är taket i så dåligt skick att ett takbyte blir bättre ekonomi. Vi ger en ärlig bedömning.",
    ],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år.",
    faqTitle: "Frågor om akut läckage",
    faqs: [
      {
        question: "Vad ska jag göra om taket läcker?",
        answer:
          "Ring oss på 070-154 36 39. Flytta undan det som kan ta skada, ställ ett kärl under droppet och fotografera skadan.",
      },
      {
        question: "Hur snabbt får jag svar?",
        answer: "Vi återkommer inom 24 timmar. Vid akut läckage: ring oss direkt.",
      },
      {
        question: "Vad kostar det att laga ett läckage?",
        answer:
          "Det beror på orsaken, takmaterial och åtkomst. Efter en kostnadsfri takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Får jag garanti på reparationen?",
        answer: GARANTI_RENOVERING,
      },
      {
        question: "Kan jag få ROT-avdrag?",
        answer: "Ja, för privatpersoner ger ROT-avdraget 30 % på arbetskostnaden, upp till 50 000 kr per person och år.",
      },
    ],
    defaultTopic: "Takrenovering eller reparation",
    formTitle: "Begär takkontroll och fast pris",
    related: [
      { to: "/takreparation", label: "Takreparation" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
      { to: "/rot-avdrag", label: "ROT-avdrag på tak" },
    ],
  },
  {
    slug: "hangrannor",
    path: "/hangrannor",
    seoTitle: "Hängrännor och stuprör — byte och nyinstallation",
    seoDescription:
      "Nya hängrännor och stuprör i aluminium, koppar eller lackerad plåt. Dimensionering efter takyta, fast pris efter takkontroll och 10 års utförandegaranti.",
    breadcrumb: "Hängrännor och stuprör",
    eyebrow: "Takavvattning",
    h1: "Nya hängrännor och stuprör.",
    h1Accent: "Dimensionerade efter ditt tak.",
    intro:
      "Läcker rännorna, hänger de snett eller svämmar de över? Vi byter eller installerar kompletta avvattningssystem med hängrännor, stuprör, ränndalar och fotplåt, och lämnar ett fast pris efter kostnadsfri takkontroll.",
    listHeading: "Det här kan vi göra",
    listIntro: "Takavvattningen leder bort vattnet från tak, fasad och grund.",
    list: [
      { title: "Nya hängrännor", text: "Rännor i aluminium, koppar eller lackerad plåt, valda efter hus och läge." },
      { title: "Stuprör", text: "Nya stuprör med rätt antal och dimension för takytan." },
      { title: "Ränndalar och fotplåt", text: "Falsas i plåt och anpassas till takets lutning och material." },
      { title: "Dimensionering", text: "Rännstorlek väljs efter takyta, lutning och regnintensitet, så att systemet inte svämmar över." },
      { title: "Fall", text: "Rännorna läggs med rätt fall så att vattnet inte blir stående." },
      { title: "Byte i samband med takbyte", text: "Byter du tak är det klokt att se över avvattningen samtidigt." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Kontakta oss", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Kostnadsfri takkontroll", text: "Vi tittar på befintliga rännor, takyta och fasad." },
      { title: "Fast pris", text: "Du får en skriftlig offert med material, dimension och fast pris." },
      { title: "Montering", text: "Vi monterar systemet och kontrollerar att vattnet leds bort som det ska." },
    ],
    extraHeading: "Aluminium, koppar eller lackerad plåt?",
    extraParagraphs: [
      "Materialet väljs efter hus, läge och budget. Vid takkontrollen går vi igenom alternativen med dig.",
      "Under tiden går det bra att läsa mer om hur takavvattning fungerar på sidan om takavvattning.",
    ],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år.",
    faqTitle: "Frågor om hängrännor och stuprör",
    faqs: [
      {
        question: "Vad kostar nya hängrännor?",
        answer:
          "Det beror på material, takyta och antal stuprör. Efter en kostnadsfri takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vilka material finns?",
        answer: "Aluminium, koppar och lackerad plåt.",
      },
      {
        question: "Kan jag få ROT-avdrag på hängrännor?",
        answer: "Ja, för privatpersoner ger ROT-avdraget 30 % på arbetskostnaden, upp till 50 000 kr per person och år.",
      },
      {
        question: "Får jag garanti?",
        answer: GARANTI_RENOVERING,
      },
      {
        question: "Hur snabbt får jag svar?",
        answer: "Vi återkommer inom 24 timmar.",
      },
    ],
    defaultTopic: "Takrenovering eller reparation",
    formTitle: "Begär takkontroll och fast pris",
    related: [
      { to: "/tjanster/takavvattning", label: "Om takavvattning" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
      { to: "/takreparation", label: "Takreparation" },
      { to: "/rot-avdrag", label: "ROT-avdrag på tak" },
    ],
  },
  {
    slug: "platslagare",
    path: "/platslagare",
    seoTitle: "Plåt på taket — bandtäckning och plåtdetaljer",
    seoDescription:
      "Dubbelfalsat plåttak och nya plåtdetaljer som en del av ett takbyte. Kontakta oss så tittar vi på taket. Kostnadsfri takkontroll och fast pris.",
    breadcrumb: "Plåtslagare",
    eyebrow: "Plåtarbeten",
    h1: "Plåt på ditt tak.",
    h1Accent: "Fast pris efter kostnadsfri takkontroll.",
    intro:
      "Dubbelfalsat plåttak (bandtäckning) och nya plåtdetaljer kring skorstenar och genomföringar ingår när vi byter eller lägger om ett tak. Gäller det ett enskilt plåtjobb: kontakta oss, så tittar vi på taket och berättar vad vi kan hjälpa till med.",
    listHeading: "Plåtdetaljer på ett tak",
    listIntro: "Det är ofta plåtdetaljerna som avgör om ett tak håller tätt.",
    list: [
      { title: "Bandtäckning", text: "Plåtbanor som fogas ihop med dubbelfals och fästs med dolda klammer, utan synliga skruvar." },
      { title: "Falsat plåttak", text: "Klammerna gör att plåten kan röra sig med temperaturen utan att skarvarna tar skada." },
      { title: "Skorstensbeslag", text: "Beslaget runt skorstenen är en av de vanligaste platserna för läckage." },
      { title: "Ränndalar", text: "Den inåtvända vinkeln där två takfall möts, en av takets mest belastade delar." },
      { title: "Vindskiveplåt", text: "Plåt som skyddar vindskivornas och takfotens kanter." },
      { title: "Fotplåt", text: "Plåten längst ner på taket, som leder vattnet ut i hängrännan." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Kontakta oss", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Kostnadsfri takkontroll", text: "Vi tittar på taket och plåtdetaljerna på plats, utan förpliktelser." },
      { title: "Besked och fast pris", text: "Du får veta vad vi kan hjälpa till med. Ingår plåten i ett takbyte får du en offert med fast pris." },
      { title: "Takbyte enligt AMA", text: "Vid ett takbyte görs plåtdetaljerna om, med 10 års utförandegaranti." },
    ],
    extraHeading: "Vilken metall passar?",
    extraParagraphs: [
      "Stål, aluminium, koppar och zink har olika egenskaper och underhållsbehov. Vilken metall som passar beror på läge, lutning och husets karaktär.",
      "Läs mer om metallerna på sidan om plåtarbeten.",
    ],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år.",
    faqTitle: "Frågor om plåtarbeten",
    faqs: [
      {
        question: "Vad kostar plåtarbeten på tak?",
        answer:
          "Det beror på omfattning, material och åtkomst. Plåtdetaljer gör vi i första hand som en del av ett takbyte eller en takomläggning, och då får du ett fast pris efter en kostnadsfri takkontroll.",
      },
      {
        question: "Gör ni enskilda plåtjobb?",
        answer: "Kontakta oss så tittar vi på taket och berättar vad vi kan hjälpa till med.",
      },
      {
        question: "Kan jag få ROT-avdrag på plåtarbeten?",
        answer: "Ja, för privatpersoner ger ROT-avdraget 30 % på arbetskostnaden, upp till 50 000 kr per person och år.",
      },
      {
        question: "Får jag garanti?",
        answer: "Vi lämnar 10 års utförandegaranti på utfört arbete.",
      },
      {
        question: "Hur snabbt får jag svar?",
        answer: "Vi återkommer inom 24 timmar.",
      },
    ],
    defaultTopic: "Takrenovering eller reparation",
    formTitle: "Begär takkontroll och fast pris",
    related: [
      { to: "/tjanster/platarbeten", label: "Om plåtarbeten" },
      { to: "/hangrannor", label: "Hängrännor och stuprör" },
      { to: "/takreparation", label: "Takreparation" },
      { to: "/rot-avdrag", label: "ROT-avdrag på tak" },
    ],
  },
  {
    slug: "takbyte-var-2027",
    path: "/takbyte-var-2027",
    seoTitle: "Planera ditt takbyte till våren 2027",
    seoDescription:
      "Planera takbytet i god tid: kostnadsfri takkontroll nu, skriftlig offert med fast pris och en tidplan tillsammans med dig. 10 års utförandegaranti.",
    breadcrumb: "Takbyte våren 2027",
    eyebrow: "Takbyte våren 2027",
    h1: "Planera ditt takbyte till våren 2027.",
    h1Accent: "Börja med en kostnadsfri takkontroll.",
    intro:
      "Ett takbyte går smidigast när det planeras i god tid. Boka en kostnadsfri takkontroll nu, så tittar en av våra säljare på taket på plats och du får en offert med fast pris. Därefter bestämmer vi tidpunkt tillsammans.",
    listHeading: "Fördelen med att planera i god tid",
    listIntro: "Ett takbyte är ett stort beslut. Ju tidigare du har underlaget, desto lugnare kan du välja.",
    list: [
      { title: "Du vet takets skick", text: "En av våra säljare tittar på taket på plats och du får en rapport om takets skick." },
      { title: "Du får ett fast pris", text: "Offerten är skriftlig och specificerad. Vi arbetar endast till fast pris." },
      { title: "Tid att jämföra", text: "Du kan jämföra offerter och material i lugn och ro innan du bestämmer dig." },
      { title: "Tid att planera ekonomin", text: "ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Kom ihåg att avdraget gäller per år." },
      { title: "Du väljer tidpunkt", text: "Vi bestämmer tidpunkt för arbetet tillsammans med dig efter offerten." },
      { title: "Ingen förbindelse", text: "Takkontrollen är kostnadsfri och förpliktar inte till något." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Boka takkontroll", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Takkontroll", text: "Vi går igenom tak, underlag och avvattning på plats, ca 1–2 timmar." },
      { title: "Offert med fast pris", text: "Du får en skriftlig offert där arbete och material redovisas var för sig." },
      { title: "Tidplan", text: "Om du vill gå vidare bestämmer vi tidpunkt för takbytet tillsammans." },
    ],
    extraHeading: "Är det dags att byta tak?",
    extraParagraphs: [
      "Tecken på att taket närmar sig slutet är fuktfläckar i tak eller på vinden, trasiga eller förskjutna pannor, rost på plåt samt mossa och alger som håller kvar fukt. Är du osäker ger takkontrollen svar.",
      "Ibland räcker en reparation. Vi ger en ärlig bedömning och föreslår aldrig ett takbyte om en renovering räcker.",
    ],
    priceNote:
      "Priset beror på takets storlek, lutning, material och skick. Vi arbetar endast till fast pris och lämnar det efter takkontroll.",
    faqTitle: "Frågor om att planera takbyte",
    faqs: [
      {
        question: "Kostar takkontrollen något?",
        answer: "Nej, den är helt kostnadsfri och förpliktar inte till något.",
      },
      {
        question: "Måste jag bestämma mig direkt?",
        answer: "Nej. Du får en skriftlig offert och bestämmer själv om och när du vill gå vidare.",
      },
      {
        question: "Vad kostar ett takbyte?",
        answer:
          "Det beror på takets storlek, lutning, material och skick. Efter takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vilken garanti får jag?",
        answer: "Vi lämnar 10 års utförandegaranti på utfört arbete och 30 års tätskiktsgaranti genom MATAKI.",
      },
      {
        question: "Kan jag få ROT-avdrag?",
        answer: "Ja, för privatpersoner ger ROT-avdraget 30 % på arbetskostnaden, upp till 50 000 kr per person och år.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
      },
    ],
    defaultTopic: "Takbyte",
    formTitle: "Boka takkontroll inför takbyte",
    related: [
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/priser", label: "Priser för takbyte" },
      { to: "/rot-avdrag", label: "ROT-avdrag på tak" },
      { to: "/hur-det-gar-till", label: "Så går ett takbyte till" },
    ],
  },
];

export const getLandingService = (slug: string) => landingServices.find((s) => s.slug === slug);
