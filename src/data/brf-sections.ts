/**
 * BRF-sidornas texter (/brf och /brf/<ort>, BrfPage.tsx): delas av sidan (React) och av scripts/prerender-content.ts
 * (statisk HTML), så att besökaren och sökmotorn får samma ord (AC5). Ändra texten här, inte i komponenten.
 */

export const BRF_FACTS = [
  { label: "Utförande", value: "10 års utförandegaranti" },
  { label: "Tätskikt", value: "30 års garanti via tillverkaren MATAKI" },
  { label: "Offert", value: "Fast pris efter kostnadsfri takkontroll" },
  { label: "Standard", value: "Arbete enligt AMA" },
];

export const BRF_STEPS = [
  {
    title: "Takkontroll",
    text: "Vi går igenom taket på plats och bedömer skick, underlag och vilka åtgärder som behövs. Takkontrollen är kostnadsfri.",
  },
  {
    title: "Åtgärdsförslag och fast offert",
    text: "Ni får en offert med fast pris. Vill styrelsen jämföra material tar vi fram alternativ, så att beslutet vilar på jämförbara underlag.",
  },
  {
    title: "Beslut i föreningen",
    text: "Styrelsen och stämman fattar beslutet. Vi svarar på frågor om underlag, material och tidplan innan ni bestämmer er.",
  },
  {
    title: "Planering",
    text: "Startdatum, ställning, etablering och tidplan stäms av med styrelsen. Föreningen får en fast kontaktperson hos oss under hela projektet.",
  },
  {
    title: "Genomförande",
    text: "Rivning, underlag, nytt tak och plåtdetaljer. Arbetsplatsen städas löpande.",
  },
  {
    title: "Slutgenomgång",
    text: "Vi går igenom arbetet tillsammans med er när taket är klart.",
  },
];

export const BRF_BOENDE = [
  {
    title: "Tidplan som stäms av",
    text: "Ställning, etablering och de moment som märks mest planeras tillsammans med styrelsen, så att informationen till de boende kan komma i god tid.",
  },
  {
    title: "Skydd av fasad och mark",
    text: "Vi reser ställning och skyddar fasad, planteringar och uteplatser innan arbetet börjar.",
  },
  {
    title: "Ordning på arbetsplatsen",
    text: "Arbetsplatsen städas löpande och lämnas ren efter slutgenomgången, med bortforsling av det gamla taket.",
  },
  {
    title: "En fast kontaktperson",
    text: "Styrelsen har en person att ringa under hela projektet, från takkontroll till slutgenomgång.",
  },
];

export const BRF_HERO_CAPTION = "Snörasskydd på nylagt tak, Roslagens skärgård.";
/** Ögonbrynstexten över H1: orten, eller "BRF & fastigheter" på /brf. */
export const brfEyebrow = (place?: { prep: string; name: string }) => (place ? `BRF ${place.prep} ${place.name}` : "BRF & fastigheter");
export const brfHeroIntro = (place?: { name: string }) =>
  `Från kostnadsfri takkontroll och fast offert till slutgenomgång. Vi arbetar i ${place ? `${place.name} och närområdet` : "Storstockholm och Roslagen"}.`;

export const BRF_INTRO = {
  heading: "Ett takbyte är ett föreningsbeslut, inte bara ett hantverk.",
  text: "Taket är en stor post i underhållsplanen och ett beslut som ska hålla inför både medlemmar och nästa styrelse. Därför bygger vi vårt arbete på tre underlag som går att spara och jämföra.",
  items: [
    ["Takkontroll", "Takets skick bedömt på plats, som grund för underhållsplan och beslut."],
    ["Fast offert", "Offert med fast pris."],
    ["Garantivillkor", "Vilka garantier som gäller för ert tak står i offerten."],
  ] as [string, string][],
};

/** Ortens avsnitt på /brf/<ort> (de två styckena ritas av BrfLocationPage). */
export const brfPlaceParagraphs = (place: { prep: string; name: string }) => [
  `För en bostadsrättsförening ${place.prep} ${place.name} börjar ett takbyte med en kostnadsfri takkontroll.`,
  "Styrelsen får ett underlag och ett fast pris att besluta på.",
];
export const brfPlaceHeading = (place: { prep: string; name: string }) => `Takbyte för bostadsrättsföreningar ${place.prep} ${place.name}`;
export const brfPlaceLine = (place: { prep: string; name: string }, nearby: string[]) =>
  `Takläggare ${place.prep} ${place.name}${nearby.length ? ` · Närliggande: ${nearby.join(", ")}` : ""}`;

export const BRF_PROCESS = {
  eyebrow: "Processen",
  heading: "Så går ett takbyte till i en förening",
  intro: "Sex steg från första takkontrollen till slutgenomgång. Beslutet ligger hos föreningen, och vi ser till att underlaget finns när det behövs.",
};

export const BRF_OFFER = {
  eyebrow: "Tjänster för föreningen",
  heading: "Två sätt att arbeta med föreningens tak",
  replace: {
    title: "Takbyte och takrenovering",
    text: "Komplett takbyte eller renovering, från takkontroll till slutgenomgång. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    items: ["Takomläggning i plåt, betongpannor och tegel", "Takrenovering och reparation", "Takavvattning och plåtarbeten", "Taksäkerhet på det nya taket"],
    link: "Läs om takomläggning",
  },
  check: {
    title: "Takkontroll",
    text: "Allt börjar med en kostnadsfri takkontroll, utan förpliktelser. Därefter får föreningen en offert med fast pris att ta ställning till.",
    items: ["Kostnadsfri takkontroll utan förpliktelser", "Fast pris efter takkontrollen", "En kontaktperson hela vägen", "Svar inom 24 timmar"],
    link: "Boka kostnadsfri takkontroll",
  },
};

export const BRF_ECONOMY = {
  eyebrow: "Planering och ekonomi",
  heading: "Planera taket i underhållsplanen, inte först när det läcker",
  paragraphs: [
    "Ett tak som byts i tid går att planera in i budget och underhållsplan. Ett akut takbyte blir en oplanerad kostnad som styrelsen måste lösa snabbt. Med en takkontroll i god tid vet ni vad taket kräver och när.",
    "Takbyten finansieras ofta via föreningens underhållsfond, lån eller en justering av avgiften. Vi lämnar ett fast prisunderlag som styrelsen kan ta med i ekonomin och till förvaltare eller bank.",
    "Osäker på när det är dags? Boka en kostnadsfri takkontroll så får ni ett besked om takets skick, utan förpliktelser.",
  ],
};

export const BRF_RESIDENTS = { eyebrow: "För de boende", heading: "Så begränsar vi störningen under arbetet" };

export const BRF_FORM = {
  eyebrow: "Kom igång",
  heading: "Boka kostnadsfri takkontroll",
  text: "Berätta kort om föreningen och taket. Vi återkommer inom 24 timmar och bokar en tid som passar styrelsen.",
  areaText: "Vi arbetar i Storstockholm och Roslagen.",
  areaLink: "Se alla områden",
  finePrint1: "Vi svarar inom 24 timmar. Takkontroll och offert är kostnadsfria och förpliktar inte till något.",
  finePrint2: "Vi sparar dina uppgifter för att kunna kontakta dig om din förfrågan. Läs mer i vår",
  finePrint2Link: "integritetsinformation",
};

export const BRF_PLACES_HEADING = "Bostadsrättsföreningar i Storstockholm och Roslagen";
