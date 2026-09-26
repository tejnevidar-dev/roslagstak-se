/** Innehåll för /takreparation och /takkontroll. Endast uppgifter som redan står på sajten eller som ägaren bekräftat. */
export interface LandingService {
  slug: "takreparation" | "takkontroll" | "rot-avdrag";
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
  defaultTopic: "Takrenovering eller reparation" | "Takbesiktning" | "Takbyte";
  formTitle: string;
  related: { to: string; label: string }[];
}

export const landingServices: LandingService[] = [
  {
    slug: "takreparation",
    path: "/takreparation",
    seoTitle: "Takreparation — läckage och trasiga takpannor",
    seoDescription:
      "Läcker taket eller är pannor trasiga? Vi besiktigar kostnadsfritt, lämnar fast pris och lagar. 10 års utförandegaranti. Svar inom 24 timmar.",
    breadcrumb: "Takreparation",
    eyebrow: "Takreparation",
    h1: "Takreparation vid läckage och skador.",
    h1Accent: "Fast pris efter kostnadsfri besiktning.",
    intro:
      "Läcker taket, är pannor trasiga eller sitter plåten löst? Vi besiktigar taket, lämnar ett skriftligt fast pris och utför reparationen. Är taket i så dåligt skick att en reparation inte räcker säger vi det.",
    listHeading: "Skador vi lagar",
    listIntro: "De vanligaste orsakerna till att tak läcker eller tar skada, och vad vi gör åt dem.",
    list: [
      {
        title: "Trasiga eller förskjutna pannor",
        text: "Vi byter enstaka pannor eller plåtsektioner utan att byta hela taket.",
      },
      {
        title: "Läckage kring skorsten och genomföringar",
        text: "Plåtbeslag runt skorstenar, ventiler och genomföringar är där tak oftast läcker. Vi byter eller tätar beslagen.",
      },
      {
        title: "Sliten underlagspapp",
        text: "Papp som blivit spröd eller trasig byts, så att taket blir tätt under takmaterialet.",
      },
      {
        title: "Rötskadad råspont",
        text: "Skadat virke byts ut innan taket täcks igen. Vi fotograferar och visar dig omfattningen först.",
      },
      {
        title: "Skadad plåt och rost",
        text: "Rostiga eller skadade plåtar och beslag lagas eller byts.",
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
        title: "Kostnadsfri besiktning",
        text: "Vi tittar på taket och orsaken till skadan, fotograferar och bedömer om en reparation räcker.",
      },
      {
        title: "Fast pris",
        text: "Du får en skriftlig offert med tydlig åtgärdslista och fast pris.",
      },
      {
        title: "Reparation och slutkontroll",
        text: "Vi utför reparationen, kontrollerar resultatet och dokumenterar arbetet med foton.",
      },
    ],
    extraHeading: "Reparation eller nytt tak?",
    extraParagraphs: [
      "Ibland räcker en reparation, ibland är taket i så dåligt skick att ett takbyte blir bättre ekonomi över tid. Vi ger en ärlig bedömning och föreslår aldrig ett takbyte om en renovering räcker.",
      "Är skadorna många, är underlaget rötskadat på stora ytor eller är takmaterialet uttjänt är ett takbyte oftast det bästa valet. Vid besiktningen går vi igenom alternativen med dig.",
    ],
    priceNote:
      "Priset beror på skadans omfattning, takmaterial och hur åtkomligt taket är. Vi arbetar endast till fast pris och lämnar det efter besiktningen. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år.",
    faqTitle: "Frågor om takreparation",
    faqs: [
      {
        question: "Vad kostar en takreparation?",
        answer:
          "Det beror på skadans omfattning, takmaterial och åtkomst. Efter en kostnadsfri besiktning får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vad ska jag göra vid akut läckage?",
        answer:
          "Ring oss på 070-154 36 39. Skydda under tiden det som kan ta skada inomhus: flytta möbler och värdesaker, ställ ett kärl under droppet och fotografera skadan. Bilderna kan vara bra om du gör en försäkringsanmälan.",
      },
      {
        question: "Hur vet jag om jag ska reparera eller byta tak?",
        answer:
          "Det avgörs av takets ålder, skick och hur omfattande skadorna är. Vid besiktningen bedömer vi underlag, papp och takmaterial och ger en ärlig rekommendation. Vi föreslår inte ett takbyte om en reparation räcker.",
      },
      {
        question: "Får jag garanti på reparationen?",
        answer: "Vi lämnar 10 års utförandegaranti på utfört arbete.",
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
    formTitle: "Begär besiktning och fast pris",
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
    seoTitle: "Kostnadsfri takkontroll — besiktning av taket",
    seoDescription:
      "Kostnadsfri takkontroll: vi går igenom tak, underlag och avvattning och du får en skriftlig rapport med foton. Utan förbindelser. Svar inom 24 timmar.",
    breadcrumb: "Kostnadsfri takkontroll",
    eyebrow: "Takkontroll",
    h1: "Kostnadsfri takkontroll.",
    h1Accent: "Skriftlig rapport med foton.",
    intro:
      "Vi går igenom taket på plats och bedömer skick, underlag och avvattning. Du får en skriftlig rapport med foton och tydliga åtgärdsförslag, utan kostnad och utan förbindelser.",
    listHeading: "Vad vi kontrollerar",
    listIntro: "Det som avgör ett taks skick ligger ofta under takmaterialet. Därför tittar vi på hela taket.",
    list: [
      {
        title: "Takmaterialet",
        text: "Pannor eller plåt: sprickor, förskjutningar, rost samt mossa och alger som håller kvar fukt.",
      },
      {
        title: "Underlagspapp och råspont",
        text: "Skador och fukt under takmaterialet, som inte syns från marken.",
      },
      {
        title: "Plåtdetaljer och genomföringar",
        text: "Beslag runt skorstenar, ventiler och andra genomföringar, där tak oftast läcker.",
      },
      {
        title: "Takavvattning",
        text: "Hängrännor, stuprör och fall, så att vattnet leds bort från fasad och grund.",
      },
      {
        title: "Taksäkerhet",
        text: "Takstege, gångbrygga och snörasskydd.",
      },
      {
        title: "Ventilation",
        text: "Att taket och vinden får den ventilation som behövs.",
      },
    ],
    stepsHeading: "Så går takkontrollen till",
    steps: [
      {
        title: "Boka",
        text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar och bokar en tid.",
      },
      {
        title: "Vi besöker fastigheten",
        text: "Vi går igenom tak, underlag och avvattning och fotograferar.",
      },
      {
        title: "Skriftlig rapport",
        text: "Du får en rapport med foton, en bedömning av takets skick och återstående livslängd samt åtgärdsförslag med prisuppskattning.",
      },
      {
        title: "Genomgång",
        text: "Vi går igenom resultatet med dig. Du bestämmer själv om något ska åtgärdas.",
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
        question: "Kostar takkontrollen något?",
        answer: "Nej, den är helt kostnadsfri och förpliktar inte till något.",
      },
      {
        question: "Vad får jag efter kontrollen?",
        answer:
          "En skriftlig rapport med foton, en bedömning av takets skick och tydliga åtgärdsförslag med prisuppskattning.",
      },
      {
        question: "Måste jag beställa något efteråt?",
        answer: "Nej. Du bestämmer själv om något ska åtgärdas.",
      },
      {
        question: "Är takkontroll samma sak som takinspektion?",
        answer:
          "Ja. Hos oss är takkontroll och takinspektion samma sak: en genomgång av taket med skriftlig rapport. Du kan läsa mer under Takinspektion.",
      },
      {
        question: "Hur snabbt får jag svar?",
        answer: "Vi återkommer inom 24 timmar.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
      },
    ],
    defaultTopic: "Takbesiktning",
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
        title: "Kostnadsfri besiktning",
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
      "Vi arbetar endast till fast pris och lämnar det efter besiktning. ROT-avdraget räknas av från arbetskostnaden i offerten.",
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
          "Det beror på taket. Efter en kostnadsfri besiktning får du ett fast pris, och vi arbetar endast till fast pris.",
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
];

export const getLandingService = (slug: string) => landingServices.find((s) => s.slug === slug);
