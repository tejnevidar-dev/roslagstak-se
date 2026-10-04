/** Innehåll för /takreparation och /takkontroll. Endast uppgifter som redan står på sajten eller som ägaren bekräftat. */
import { GARANTI_RENOVERING, GARANTI_UTFORANDE } from "./guarantee";
import { ROT_FORBEHALL } from "./prices";

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
      "Läcker taket, är pannor trasiga eller sitter plåten löst? Vi gör en kostnadsfri takkontroll, lämnar en offert med fast pris och utför reparationen. Är taket i så dåligt skick att en reparation inte räcker säger vi det.",
    listHeading: "Skador vi lagar",
    listIntro: "De vanligaste orsakerna till att tak läcker eller tar skada, och vad vi gör åt dem.",
    list: [
      {
        title: "Trasiga eller förskjutna pannor",
        text: "Enstaka pannor kan bytas utan att hela taket byts.",
      },
      {
        title: "Läckage kring skorsten och genomföringar",
        text: "Plåtbeslag runt skorstenar, ventiler och genomföringar är där många läckage börjar. Vad som behöver göras bedömer vi vid takkontrollen.",
      },
      {
        title: "Sliten underlagspapp",
        text: "Vad som behöver göras bedömer vi vid takkontrollen.",
      },
      {
        title: "Skadad råspont",
        text: "Skadad råspont byts innan taket täcks igen. Vi visar dig omfattningen först.",
      },
      {
        title: "Skadad plåt och rost",
        text: "Rostiga eller skadade plåtar och beslag bedöms vid takkontrollen.",
      },
      {
        title: "Rännor och stuprör",
        text: "Vad som behöver göras bedömer vi vid takkontrollen.",
      },
    ],
    stepsHeading: "Så går en reparation till",
    steps: [
      {
        title: "Kontakta oss",
        text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar. Läcker det: ring 070-154 36 39.",
      },
      {
        title: "Kostnadsfri takkontroll",
        text: "Vi tittar på taket och orsaken till skadan och bedömer om en reparation räcker.",
      },
      {
        title: "Fast pris",
        text: "Du får en offert med fast pris.",
      },
      {
        title: "Reparation och slutgenomgång",
        text: "Vi utför det som står i offerten och går igenom resultatet tillsammans med dig.",
      },
    ],
    extraHeading: "Reparation eller nytt tak?",
    extraParagraphs: [
      "Ibland räcker en reparation, ibland behöver taket läggas om. Det ser vi vid takkontrollen.",
      "Är skadorna många kan taket behöva läggas om. Vid takkontrollen går vi igenom alternativen med dig.",
      "Kostnadsfri takkontroll utan förpliktelser. En kontaktperson genom hela processen.",
    ],
    priceNote:
      "Priset beror på skadans omfattning, takmaterial och hur åtkomligt taket är. Vi arbetar endast till fast pris och lämnar det efter takkontrollen. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
    faqTitle: "Frågor om takreparation",
    faqs: [
      {
        question: "Vad kostar en takreparation?",
        answer:
          "Det beror på skadans omfattning, takmaterial och åtkomst. Efter en kostnadsfri takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vad ska jag göra om taket läcker?",
        answer:
          "Ring oss på 070-154 36 39. Skydda under tiden det som kan ta skada inomhus: flytta möbler och värdesaker, ställ ett kärl under droppet och fotografera skadan.",
      },
      {
        question: "Hur vet jag om jag ska reparera eller byta tak?",
        answer:
          "Det avgörs av takets skick och hur omfattande skadorna är. Vid takkontrollen tittar vi på taket på plats. Är taket i så dåligt skick att en reparation inte räcker säger vi det.",
      },
      {
        question: "Får jag garanti på reparationen?",
        answer: GARANTI_RENOVERING,
      },
      {
        question: "Kan jag få ROT-avdrag på en takreparation?",
        answer:
          "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Avdraget dras av direkt på fakturan.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi tar uppdrag i Roslagen och Storstockholm.",
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
    listIntro: "En av våra säljare tittar på taket på plats.",
    list: [],
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
      "Boka en kontroll om du ser fuktfläckar i tak eller på vinden, trasiga eller förskjutna pannor, rost på plåt. Också när du inte vet när taket senast sågs över eller lades om.",
      "En kontroll ger dig ett underlag för att planera underhåll eller ett eventuellt takbyte.",
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
        answer: "Vi tar uppdrag i Roslagen och Storstockholm.",
      },
    ],
    defaultTopic: "Takkontroll",
    formTitle: "Boka kostnadsfri takkontroll",
    related: [
      { to: "/tjanster/takinspektion", label: "Takkontroll" },
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
      "Som privatperson kan du få ROT-avdrag på arbetskostnaden när vi byter eller renoverar taket på din bostad. Du kan få 30 % av arbetskostnaden i skattereduktion, högst 50 000 kr per person och år. Vi drar av det direkt på fakturan.",
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
        text: "Material, som pannor, plåt och papp, ger inget ROT-avdrag.",
      },
      {
        title: "Avdraget görs på fakturan",
        text: "Avdraget görs på fakturan: du betalar det som återstår.",
      },
      {
        title: "För dig som äger bostaden",
        text: "ROT-avdraget gäller privatpersoner som äger bostaden, till exempel villa eller fritidshus.",
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
        text: "Du får en offert med fast pris.",
      },
      {
        title: "Arbetet utförs",
        text: "Vi utför takarbetet enligt AMA och lämnar 10 års utförandegaranti.",
      },
      {
        title: "Faktura med ROT-avdrag",
        text: "Avdraget dras av direkt på fakturan.",
      },
    ],
    extraHeading: "Vilka takarbeten ger ROT-avdrag?",
    extraParagraphs: [
      "Vid takbyte, takomläggning, takrenovering och takreparation på din bostad kan du få ROT-avdrag på arbetskostnaden. Detsamma gäller plåtarbeten och takavvattning som ingår i arbetet.",
      "Vilka regler som gäller just din situation avgörs av Skatteverket.",
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
          "Nej. Avdraget gäller bara arbetskostnaden.",
      },
      {
        question: "Hur får jag ROT-avdraget?",
        answer:
          "Avdraget görs direkt på fakturan, så du betalar bara det som återstår.",
      },
      {
        question: "Kan bostadsrättsföreningar få ROT-avdrag?",
        answer:
          "ROT-avdraget gäller privatpersoner.",
      },
      {
        question: "Kan jag få ROT-avdrag på en takreparation?",
        answer: "Som privatperson kan du få ROT-avdrag på arbetskostnaden vid reparation, renovering och takbyte på din bostad.",
      },
      {
        question: "Vad kostar ett takbyte?",
        answer:
          "Det beror på taket. Efter en kostnadsfri takkontroll får du ett fast pris, och vi arbetar endast till fast pris.",
      },
    ],
    defaultTopic: "Takbyte",
    formTitle: "Boka kostnadsfri takkontroll",
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
    seoTitle: "Läckage i taket — ring 070-154 36 39",
    seoDescription:
      "Läcker taket? Ring oss på 070-154 36 39 (måndag–fredag 07–20, lördag–söndag 09–19) eller skicka en förfrågan. Kostnadsfri takkontroll och fast pris. 10 års utförandegaranti.",
    breadcrumb: "Läckage i taket",
    eyebrow: "Läckage i taket",
    h1: "Läcker taket?",
    h1Accent: "Så här gör du, och så hjälper vi dig.",
    intro:
      "Ring 070-154 36 39 (måndag–fredag 07–20, lördag–söndag 09–19) eller skicka formuläret. Vi svarar inom 24 timmar och har ingen jour. Vi gör en kostnadsfri takkontroll, letar efter var vattnet kommer in och lämnar en offert med fast pris.",
    listHeading: "Gör så här medan du väntar",
    listIntro: "Några enkla åtgärder begränsar skadan tills vi har varit på plats.",
    list: [
      { title: "Skydda det som kan ta skada", text: "Flytta möbler och värdesaker undan från platsen där det droppar." },
      { title: "Fånga vattnet", text: "Ställ ett kärl under droppet så att golvet inte tar skada." },
      { title: "Fotografera skadan", text: "Ta bilder av det du ser, och skriv upp när du upptäckte det." },
      { title: "Gå inte upp på taket", text: "Ett vått tak är halt. Lämna arbetet på taket till oss." },
      { title: "Kontakta oss", text: "Ring 070-154 36 39. Vi går igenom vad som hänt och bokar takkontroll." },
      { title: "Kontakta försäkringsbolaget", text: "Kontakta ditt försäkringsbolag och fråga vad som gäller för dig." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Du kontaktar oss", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Takkontroll", text: "Vi tittar på taket på plats och letar efter var vattnet kommer in." },
      { title: "Fast pris", text: "Du får en offert med fast pris." },
      { title: "Reparation", text: "Vi utför det som står i offerten." },
    ],
    extraHeading: "Var kan ett tak läcka?",
    extraParagraphs: [
      "Många läckage börjar kring skorstenar, ventiler och andra genomföringar, vid ränndalar och beslag, och där pannor är trasiga eller underlagspappen är sliten. Orsaken sitter inte alltid där fuktfläcken kommer fram inomhus. Därför behöver någon titta på taket på plats.",
      "Ibland räcker en reparation, ibland behöver taket läggas om. Det ser vi vid takkontrollen.",
      "Kostnadsfri takkontroll utan förpliktelser. En kontaktperson genom hela processen.",
    ],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
    faqTitle: "Frågor om läckage i taket",
    faqs: [
      {
        question: "Vad ska jag göra om taket läcker?",
        answer:
          "Ring oss på 070-154 36 39. Flytta undan det som kan ta skada, ställ ett kärl under droppet och fotografera skadan.",
      },
      {
        question: "Hur snabbt får jag svar?",
        answer: "Vi svarar inom 24 timmar och har ingen jour.",
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
        answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
      },
    ],
    defaultTopic: "Takrenovering eller reparation",
    formTitle: "Begär takkontroll och fast pris",
    related: [
      { to: "/takreparation", label: "Takreparation" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
      { to: "/rot-avdrag", label: "ROT-avdrag på tak" },
      { to: "/blogg/forsakring-takbyte-hemforsakring", label: "Försäkring och tak: fråga försäkringsbolaget först" },
    ],
  },
  {
    slug: "hangrannor",
    path: "/hangrannor",
    seoTitle: "Hängrännor och stuprör — byte och nyinstallation",
    seoDescription:
      "Nya hängrännor och stuprör i lackerad plåt. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    breadcrumb: "Hängrännor och stuprör",
    eyebrow: "Takavvattning",
    h1: "Nya hängrännor och stuprör.",
    h1Accent: "Fast pris efter kostnadsfri takkontroll.",
    intro:
      "Läcker rännorna, hänger de snett eller svämmar de över? Vi byter eller installerar kompletta avvattningssystem med hängrännor, stuprör, ränndalar och fotplåt, och lämnar ett fast pris efter kostnadsfri takkontroll.",
    listHeading: "Det här kan vi göra",
    listIntro: "Takavvattningen leder bort vattnet från tak, fasad och grund.",
    list: [
      { title: "Nya hängrännor", text: "Hängrännor och stuprör i lackerad plåt." },
      { title: "Stuprör", text: "Nya stuprör." },
      { title: "Ränndalar och fotplåt", text: "Ränndalar och fotplåt görs i plåt." },
      { title: "Hur systemet läggs upp", text: "Hur hängrännor och stuprör läggs upp på ditt hus går vi igenom vid takkontrollen." },
      { title: "Byte i samband med takbyte", text: "Byter du tak är det klokt att se över avvattningen samtidigt." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Kontakta oss", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Kostnadsfri takkontroll", text: "Vi tittar på befintliga rännor, takyta och fasad." },
      { title: "Fast pris", text: "Du får en offert med fast pris." },
      { title: "Montering", text: "Vi monterar hängrännor och stuprör." },
    ],
    extraHeading: "Vilket material?",
    extraParagraphs: [
      "Hängrännor och stuprör i lackerad plåt. Vid takkontrollen går vi igenom vad som gäller för ditt hus.",
      "Under tiden går det bra att läsa mer om hur takavvattning fungerar på sidan om takavvattning.",
      "Kostnadsfri takkontroll utan förpliktelser. En kontaktperson genom hela processen.",
    ],
    priceNote:
      "Riktpris för ett komplett system med stuprör: från ca 23 000 kr, efter ROT-avdrag och inkl. moms. " + ROT_FORBEHALL + " Vi arbetar endast till fast pris och lämnar det efter takkontroll.",
    faqTitle: "Frågor om hängrännor och stuprör",
    faqs: [
      {
        question: "Vad kostar nya hängrännor?",
        answer:
          "Det beror på material, takyta och antal stuprör. Efter en kostnadsfri takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vilka material finns?",
        answer: "Hängrännor och stuprör i lackerad plåt.",
      },
      {
        question: "Kan jag få ROT-avdrag på hängrännor?",
        answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
      },
      {
        question: "Får jag garanti?",
        answer: GARANTI_UTFORANDE,
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
    breadcrumb: "Plåt på taket",
    eyebrow: "Plåtarbeten",
    h1: "Plåt på ditt tak.",
    h1Accent: "Fast pris efter kostnadsfri takkontroll.",
    intro:
      "Dubbelfalsat plåttak (bandtäckning) och nya plåtdetaljer kring skorstenar och genomföringar görs normalt nya när vi byter eller lägger om ett tak. Gäller det ett enskilt plåtjobb: kontakta oss, så tittar vi på taket och berättar vad vi kan hjälpa till med.",
    listHeading: "Plåtdetaljer på ett tak",
    listIntro: "Det är ofta plåtdetaljerna som avgör om ett tak håller tätt.",
    list: [
      { title: "Bandtäckning", text: "Plåtbanor som fogas ihop med dubbelfals och fästs med dolda klammer, utan synliga skruvar." },
      { title: "Falsat plåttak", text: "Klammerna gör att plåten kan röra sig med temperaturen utan att skarvarna tar skada." },
      { title: "Skorstensbeslag", text: "Beslaget runt skorstenen är en plats där många läckage börjar." },
      { title: "Ränndalar", text: "Den inåtvända vinkeln där två takfall möts, dit vatten rinner från två håll." },
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
    extraHeading: "Plåt vid takbyte",
    extraParagraphs: ["Plåtdetaljerna görs om när vi byter eller lägger om ett tak. Läs mer på sidan om plåtarbeten."],
    priceNote:
      "Vi arbetar endast till fast pris och lämnar det efter takkontroll. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
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
        answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
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
      "Planera takbytet i god tid: kostnadsfri takkontroll nu, offert med fast pris och en tidplan tillsammans med dig. 10 års utförandegaranti.",
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
      { title: "Du får ett fast pris", text: "Du får en offert med fast pris. Vi arbetar endast till fast pris." },
      { title: "Tid att jämföra", text: "Du kan jämföra offerter och material i lugn och ro innan du bestämmer dig." },
      { title: "Tid att planera ekonomin", text: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år. Kom ihåg att avdraget gäller per år." },
      { title: "Du väljer tidpunkt", text: "Vi bestämmer tidpunkt för arbetet tillsammans med dig efter offerten." },
      { title: "Inga förpliktelser", text: "Takkontrollen är kostnadsfri och förpliktar inte till något." },
    ],
    stepsHeading: "Så går det till",
    steps: [
      { title: "Boka takkontroll", text: "Ring eller skicka formuläret. Vi återkommer inom 24 timmar." },
      { title: "Takkontroll", text: "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar." },
      { title: "Offert med fast pris", text: "Du får en offert med fast pris." },
      { title: "Tidplan", text: "Om du vill gå vidare bestämmer vi tidpunkt för takbytet tillsammans." },
    ],
    extraHeading: "Är det dags att byta tak?",
    extraParagraphs: [
      "Fuktfläckar i tak eller på vinden, trasiga eller förskjutna pannor och rost på plåt är skäl att låta någon titta på taket.",
      "Ibland räcker en reparation. Det ser vi vid takkontrollen.",
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
        answer: "Nej. Du får en offert och bestämmer själv om och när du vill gå vidare.",
      },
      {
        question: "Vad kostar ett takbyte?",
        answer:
          "Det beror på takets storlek, lutning, material och skick. Efter takkontroll får du ett fast pris. Vi arbetar endast till fast pris.",
      },
      {
        question: "Vilken garanti får jag?",
        answer: "Vi lämnar 10 års utförandegaranti på det arbete vi utför.",
      },
      {
        question: "Kan jag få ROT-avdrag?",
        answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, upp till 50 000 kr per person och år.",
      },
      {
        question: "Vilka områden arbetar ni i?",
        answer: "Vi tar uppdrag i Roslagen och Storstockholm.",
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
