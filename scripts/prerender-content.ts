/**
 * Build-time content model for the static prerender.
 *
 * The app is a client-rendered SPA, so crawlers that do not execute JS see an
 * empty <div id="root">. This module returns the *important* text for every
 * route (H1, intro, body paragraphs, key internal links) so the build can put
 * it straight into the initial HTML. React clears #root on mount, so the same
 * content is then rendered by the app itself — no duplication, no cloaking:
 * the prerendered text is the same text the visitor sees.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ortSeoOverrides } from "../src/data/seo-overrides";
import { locations } from "../src/data/locations";
import { problems, SAKERHETSRUTA } from "../src/data/problems";
import { materials } from "../src/data/materials";
import { regionTexts } from "../src/data/region-texts";
import { withRotForbehall, priceData, priceFaqs, PRICE_HERO_TEXT, PRICE_NOTE, PRICE_ROT_TITLE, PRICE_ROT_TEXT, PRICE_FACTORS_TITLE, PRICE_FACTORS_TEXT } from "../src/data/prices";
import { allServiceSlugs, generateCombos } from "../src/data/service-location-combos";
import { blogPosts } from "../src/data/blog-posts";
import { stripInlineMd, inlineMdLinks } from "../src/lib/inline-md";
import { relatedForPost } from "../src/data/blog-related";
import { relatedPosts, guidesForTitle } from "../src/data/related-posts";
import { buildBlogPostingSchema } from "../src/lib/blog-schema";

const MONEY_LINKS = [
  { href: "/takkontroll", label: "Kostnadsfri takkontroll" },
  { href: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
];
import { brfLocationSlugs } from "../src/data/brf-locations";
import { isNearBase, distanceFromBaseKm, distanceFromTabyKm, distanceKm } from "../src/data/service-reach";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { comboOverrides } from "../src/data/combo-overrides";
import { villaAreasParagraph, villaAreasByPage } from "../src/data/villa-areas";
import { serviceAreaLinks } from "../src/data/service-area-links";

const villaAreaLinks = (key: string) =>
  (villaAreasByPage[key]?.areas ?? [])
    .filter((a) => a.href)
    .map((a) => ({ href: a.href!, label: `Takläggare i ${a.name}` }));
import { landingServices } from "../src/data/landing-services";
import { fitDescription, fitTitle } from "../src/lib/seo-fit";
import { regionBySlug, regionIntros, regionLongText, regionNeighbors, regionSlugs } from "../src/data/regions";

export interface PrerenderPage {
  h1: string;
  intro: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
  /** Unique <title> for the static HTML (before JS runs). Mirrors SEOHead. */
  title?: string;
  /** Unique meta description for the static HTML. */
  description?: string;
  /** Sidspecifik delningsbild för den statiska HTML:en (og:image/twitter:image), t.ex. ett
   *  projektfoto eller en materialbild — en STABIL sökväg under public/ (aldrig en Vite-import,
   *  det här scriptet körs via esbuild utan Vite:s tillgångsupplösning). Mirrors SEOHead. */
  ogImage?: string;
  /** Brödsmulor: samma stigar som sidans egen <Breadcrumbs>. `name` används för BreadcrumbList-
   *  schemat (position = index+1, item = SITE_URL+path för varje steg); `visibleName` (om satt)
   *  används i den synliga navigeringen i stället, för sidor där de skiljer sig åt (t.ex.
   *  ortssidans schema säger "Takläggare på Blidö" men den synliga texten bara "Blidö").
   *  Sista steget har alltid sin egen path (behövs för schemats sista item), men renderas aldrig
   *  som länk i den synliga navigeringen (mirrors Breadcrumbs.tsx: sista steget är alltid text). */
  breadcrumbs?: { name: string; path: string; visibleName?: string }[];
  /** Extra JSON-LD-objekt som skrivs som <script type="application/ld+json"> i den statiska HTML:en (t.ex. BlogPosting). */
  jsonLd?: Record<string, unknown>[];
  ogImageAlt?: string;
}

/* Services live in a React component; read the data with a regex so the
   prerender never has to bundle JSX or lucide-react. */
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const services = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], title: m[2], description: m[3] }));

/* Tjänstesidornas längre brödtext (longDesc i ServiceDetail.tsx), läst med regex av samma skäl
   som ovan, så att den förrenderade HTML:en visar samma text som React-sidan (#1v, 2026-09-30). */
const serviceDetailSource = readFileSync(resolve("src/pages/ServiceDetail.tsx"), "utf8");
const serviceLongDesc = new Map(
  [...serviceDetailSource.matchAll(/^  "?([a-z-]+)"?: \{\r?\n\s*longDesc:\s*"([^"]+)"/gm)].map(
    (m) => [m[1], m[2]] as [string, string],
  ),
);

/* Extra stycken som React renderar som egen JSX-sektion (inte i serviceDetails). Håll i synk
   manuellt med ServiceDetail.tsx. */
const serviceExtraParagraphs: Record<string, string[]> = {
  platarbeten: [
    "Dubbelfalsat plåttak – bandtäckning med fast pris. Vi lägger dubbelfalsade plåttak (bandtäckning) vid takbyte, med fast pris efter kostnadsfri takkontroll. Bandtäckning är plåtbanor som fogas ihop med ett dubbelt fals i stället för synliga skruvhål — en tät skarv, men mer hantverk och arbetstid än skruvad profilplåt som TP20. Banorna hålls på plats av dolda klammer som fästs i underlaget, så att plåten kan röra sig med temperaturen utan att skarvarna tar skada. Tekniken passar både äldre hus och moderna villor, och kan formas efter kupor, ränndalar och andra detaljer på taket.",
  ],
};

/**
 * Textspegling av src/data/projects.ts, utan bildimporterna (esbuild/Node kan inte
 * lösa Vite-bildimporter). Håll fälten i synk manuellt vid ändringar i projects.ts.
 */
const projectSummaries = [
  {
    slug: "takrenovering-blido",
    title: "Nytt tak på Blidö",
    locationName: "Blidö, Norrtälje",
    locationSlug: "blido",
    serviceName: "Takrenovering",
    serviceSlug: "takrenovering",
    material: "Betongpannor (Benders, svart)",
    period: "sommaren 2026",
    summary:
      "Komplett takbyte på ett hus på Blidö i Norrtälje kommun, med svarta betongpannor från Benders, nytt underlag, ny läkt, nya plåtdetaljer och nya hängrännor. Befintlig råspont behölls.",
    description: [
      "Huset ligger i skogen på Blidö i Norrtälje kommun. Uppdraget var ett komplett takbyte, från underlag till avvattning, och arbetet gjordes sommaren 2026.",
      "Råsponten: den befintliga råsponten behölls. Nytt underlag och ny läkt lades ovanpå. Nytt ytmaterial är betongpannor från Benders i svart. Plåtdetaljerna och skorstensbeslagen byttes, och huset fick nya hängrännor.",
      "Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser. Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI, och ROT-avdraget dras direkt på fakturan.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke.",
    ],
    ogImage: "/og/project-blido-hero.jpg",
    ogImageAlt: "Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring.",
  },
  {
    slug: "takbyte-singo",
    title: "Nytt tak på Singö",
    locationName: "Singö, Grisslehamn",
    locationSlug: "singo",
    serviceName: "Takbyte",
    serviceSlug: "takomlaggning",
    material: "Betongpannor på huvudtaket, TP20-plåt på de lägre delarna (båda röda)",
    period: "september 2026",
    summary:
      "Komplett takbyte på ett hus på Singö i Grisslehamn, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. Delar av råsponten byttes.",
    description: [
      "Huset ligger på Singö i Grisslehamn, Norrtälje kommun, med utsikt över fjärden. Uppdraget var ett komplett takbyte, som blev färdigt i september 2026.",
      "Råsponten: delar av råsponten byttes, resten behölls. Huset har ett huvudtak och lägre takdelar som fick olika material i samma röda kulör — betongpannor på huvudtaket och TP20-plåt på de lägre delarna.",
      "Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser. Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI, och ROT-avdraget dras direkt på fakturan.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke, även på startsidan.",
    ],
    ogImage: "/og/project-singo-hero.jpg",
    ogImageAlt: "Nytt tak på Singö i Grisslehamn med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, med utsikt över fjärden.",
  },
];


const PHONE = "070-154 36 39";

const primaryLinks = [
  { href: "/", label: "Hem" },
  { href: "/priser", label: "Priser för takarbeten" },
  { href: "/blogg", label: "Guider om tak" },
  { href: "/recensioner", label: "Recensioner" },
  { href: "/kontakt", label: "Boka kostnadsfri rådgivning" },
];

const serviceLinks = services.map((s) => ({
  href: `/tjanster/${s.slug}`,
  label: s.title,
}));

const locationLinks = locations.map((l) => ({
  href: `/taklaggare-${l.slug}`,
  label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
}));

const combos = generateCombos();
const comboByUrl = new Map(combos.map((c) => [c.url, c]));

const home: PrerenderPage = {
  h1: "Takläggare i Roslagen — takbyte & takrenovering",
  intro:
    "RoslagsTak är takläggare i Roslagen med bas i Norrtälje. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års utförandegaranti och ROT-avdrag.",
    paragraphs: [
      "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåt, pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA-standard av certifierade takläggare.",
      "Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Båda finns med bilder under Projekt.",
      "Sedan 2026 arbetar vi även i hela Storstockholm — från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Samma fasta priser, samma garanti och samma kontaktperson genom hela projektet.",
      "Ett komplett takbyte hos oss innehåller allt: rivning av gamla taket, byte av råspont och underlagspapp vid behov, ny läkt, tätskikt, plåtbeslag kring skorsten och genomföringar, taksäkerhet. Du får en kontaktperson som följer projektet från takkontroll till slutgenomgång.",
      "Du får garantihandlingar skriftligt: 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      // Om oss-sektionen (components/About.tsx, #1z) — samma text som React
      "Om RoslagsTak. Ett tak som håller, och en kontaktperson som svarar.",
      "RoslagsTak har sin bas i Norrtälje och byter och lägger om tak på villor och fritidshus i Roslagen, Storstockholm och Mälardalen. Vi lägger betongpannor, lertegel, TP20-plåt, dubbelfalsat plåttak och papptak, och gör takomläggningar, takreparationer och plåtarbeten. Allt arbete utförs enligt AMA, och du får alltid ett fast pris.",
      "Det som gör skillnad för dig som kund är att du har en och samma kontaktperson genom hela processen, från takkontrollen till färdigt tak. Takkontrollen är kostnadsfri och utan förpliktelser: en av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Du bestämmer själv om och när.",
      "Vi visar bara riktiga jobb. På Blidö i Norrtälje fick ett hus sommaren 2026 ett komplett takbyte med nytt underlag, ny läkt, svarta betongpannor från Benders, nya plåtdetaljer, skorstensbeslag och hängrännor. På Singö i Grisslehamn blev ett takbyte klart i september 2026, med röda betongpannor på huvudtaket, röd TP20-plåt på de lägre delarna och delvis ny råspont. Båda jobben finns med bilder under Projekt, och våra omdömen från Google finns under Recensioner.",
      "Så jobbar vi. Tillgänglighet: du ska aldrig behöva jaga din takfirma. Vi svarar inom 24 timmar, och takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19. En kontaktperson: samma person tar hand om dig från första kontakten till färdigt tak. Tydliga villkor: fast pris i offerten, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI, ROT-avdraget dras direkt på fakturan. Hantverk enligt AMA.",
      `Begär kostnadsfri takkontroll och offert. Vi återkopplar inom 24 timmar. Ring ${PHONE} eller boka rådgivning på /kontakt.`,
    ],
  links: [...primaryLinks, { href: "/projekt", label: "Projekt" }, { href: "/recensioner", label: "Recensioner" }, ...serviceLinks, ...locationLinks],
};

const landingPages: Record<string, PrerenderPage> = Object.fromEntries(
  landingServices.map((s) => [
    s.path,
    {
      title: s.seoTitle,
      description: s.seoDescription,
      h1: `${s.h1} ${s.h1Accent}`,
      intro: s.intro,
      paragraphs: [
        s.listIntro,
        ...s.list.map((i) => `${i.title}: ${i.text}`),
        ...s.steps.map((st, n) => `Steg ${n + 1}, ${st.title}: ${st.text}`),
        ...s.extraParagraphs,
        s.priceNote,
        ...s.faqs.map((f) => `${f.question} ${f.answer}`),
        `Ring ${PHONE} eller skicka en förfrågan på ${s.path}. Vi återkommer inom 24 timmar.`,
      ],
      links: [...primaryLinks, ...s.related.map((r) => ({ href: r.to, label: r.label }))],
      breadcrumbs: [
        { name: "Hem", path: "/" },
        { name: s.breadcrumb, path: s.path },
      ],
    } satisfies PrerenderPage,
  ]),
);

const staticPages: Record<string, PrerenderPage> = {
  ...landingPages,
  "/": home,
  "/offert": {
    title: "Offert på takbyte — fast pris efter kostnadsfri takkontroll",
    description:
      "Räkna fram ett prisförslag på takbyte direkt, eller boka kostnadsfri takkontroll. Fast pris, 10 års utförandegaranti och återkoppling inom 24 timmar.",
    h1: "Få offert på takbyte i Roslagen",
    intro:
      "Räkna fram ett prisförslag på ditt takbyte direkt i konfiguratorn, eller boka kostnadsfri rådgivning och takkontroll på plats.",
    paragraphs: [
      "Välj taktyp, ange takets yta och lutning och få ett riktpris direkt. Vi lämnar alltid fast pris efter kostnadsfri takkontroll — med 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      "I offerten ingår allt som behövs för ett komplett takbyte: rivning och bortforsling av gamla taket, kontroll och byte av råspont och underlagspapp, ny strö- och bärläkt, valt tätskikt, kompletta plåtbeslag kring skorsten, ventiler och genomföringar, samt taksäkerhet i form av takstege, gångbrygga och nockfästen.",
      "Så går det till: du skickar in förfrågan, vi återkopplar inom 24 timmar och bokar en kostnadsfri takkontroll. På plats mäter vi taket, kontrollerar underlaget och pratar igenom materialval. Därefter får du en skriftlig offert med fast pris — det priset gäller, utan tillägg.",
      "När du accepterat offerten planerar vi arbetet tillsammans med dig och beställer material. Du har en kontaktperson genom hela processen, och garantin står skriftligt i avtalet.",
      "Vanliga frågor om offerten: Är takkontrollen verkligen gratis? Ja, takkontroll och offert är alltid kostnadsfria och du förbinder dig inte till något.",
      "Vi tar uppdrag i hela Roslagen och Storstockholm — från Norrtälje, Vaxholm och Österåker till Täby, Sollentuna, Nacka och öarna i skärgården.",
      "Offerten specificerar arbetskostnaden separat så att ROT-avdraget är tydligt, och vi drar av beloppet direkt på fakturan.",
      "Vad händer om vi hittar skador under arbetet? Skadad råspont syns först när det gamla taket är rivet. Hittar vi något visar vi dig omfattningen och lämnar ett skriftligt pris på tillägget innan vi fortsätter. Inget extraarbete görs utan ditt godkännande. Det enda undantaget är om något akut måste skyddas mot skada, till exempel ett öppet tak inför regn, och vi inte får tag på dig. Då gör vi bara det som är nödvändigt.",
      `Föredrar du att prata? Ring ${PHONE} och beskriv ditt takprojekt, vi återkopplar inom 24 timmar.`,
    ],
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Offert & rådgivning", path: "/offert" }],
  },
  "/taktyper": {
    title: "Taktyper — plåttak, tegel och betongpannor",
    description:
      "Jämför TP20, pannplåt, tegelplåt, dubbelfalsat plåttak, lertegel, betongpannor och papptak — livslängd, kostnad och vad som passar ditt hus.",
    h1: "Taktyper — plåttak, tegel och betongpannor",
    intro:
      "Jämför taktyper inför ditt takbyte: TP20, pannplåt, tegelplåt, dubbelfalsat plåttak (bandtäckning), lertegel, betongpannor, glaserade pannor och papptak.",
    paragraphs: [
      "Plåttak är lätt, snabbt att montera och passar de flesta hus. Dubbelfalsad bandtäckning har normalt längst livslängd. Betongpannor och lertegel ger klassisk karaktär men kräver bärande konstruktion för högre vikt.",
      "Vi hjälper dig välja material utifrån husets konstruktion, taklutning, väderutsatthet och budget.",
      "TP20-plåttak: det populäraste valet för fritidshus och villor i Roslagen. Prisvärt, lätt (4–5 kg/m²) och håller länge med minimalt underhåll. Finns i många kulörer och monteras snabbt.",
      "Dubbelfalsat plåttak (bandtäckning): premiumvalet med falsade fogar utan synliga skruvar, ett tätt och vattentätt tak. Materialet kan vara stål, aluminium eller koppar.",
      "Tegelplåt och pannplåt: plåtprofiler som imiterar tegel och pannor. Traditionellt utseende med plåtens fördelar — lägre vikt, lägre pris och enklare transport till öar.",
      "Betongpannor: beprövat och prisvärt, och passar de flesta hustyper på fastlandet. Kräver en konstruktion som tål vikten (ca 40–50 kg/m²).",
      "Lertegel: det klassiska valet som passar både äldre och nyare hus. Håller mycket länge och ger husets karaktär ett oersättligt uttryck.",
      "Papptak: för platta och låglutande tak på garage, tillbyggnader och funkishus. Modern SBS-papp håller länge när den läggs rätt.",
      "Osäker på vad som passar ditt hus? Boka en kostnadsfri takkontroll — vi tittar på konstruktion, lutning och läge och ger dig en ärlig rekommendation med fast pris.",
    ],
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Taktyper", path: "/taktyper" }],
  },
  "/brf": {
    title: "Takbyte för BRF — bostadsrättsföreningar",
    description:
      "Takbyte och takkontroll för bostadsrättsföreningar i Storstockholm, Roslagen och Mälardalen. Fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    h1: "Takbyte för bostadsrättsföreningar, med underlag styrelsen kan besluta på",
    intro:
      "Från kostnadsfri takkontroll och fast offert till slutgenomgång och skriftlig garanti. Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
    paragraphs: [
      "Ett takbyte är ett föreningsbeslut, inte bara ett hantverk. Vi bygger arbetet på tre underlag som går att spara och jämföra: en tydlig bedömning av takets skick, fast offert och garantihandlingar efter slutgenomgång.",
      "Så går ett takbyte till i en förening: takkontroll, åtgärdsförslag och fast offert, beslut i föreningen, planering tillsammans med styrelsen, genomförande samt slutgenomgång och skriftlig garanti.",
      "Vi erbjuder takbyte och takrenovering. Allt börjar med en kostnadsfri takkontroll utan förpliktelser, och föreningen får en offert med fast pris, en kontaktperson hela vägen och svar inom 24 timmar. Arbetet utförs enligt AMA.",
      "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      "För de boende begränsar vi störningen genom att stämma av tidplan och ställning med styrelsen, skydda fasad och mark, städa löpande och ge föreningen en fast kontaktperson.",
      `Boka en kostnadsfri takkontroll på /brf eller ring ${PHONE}. Vi återkommer inom 24 timmar.`,
    ],
    links: [
      ...primaryLinks,
      ...serviceLinks,
      ...(brfLocationSlugs as readonly string[])
        .map((slug) => locations.find((l) => l.slug === slug))
        .filter((l): l is NonNullable<typeof l> => !!l)
        .map((l) => ({ href: `/brf/${l.slug}`, label: `BRF ${l.isIsland ? "på" : "i"} ${l.name}` })),
    ],
  },
  "/hur-det-gar-till": {
    title: "Så går ett takbyte till — steg för steg",
    description:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    h1: "Så går ett takbyte till — steg för steg",
    intro:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    paragraphs: [
      "Ordningen är råspont, underlagspapp, hängrännor och stuprör, vindskivor, ströläkt och bärläkt, takpannor eller plåt, samt avslutande plåtbeslag kring skorsten och genomföringar.",
      "Du har en kontaktperson genom hela processen, och arbetet avslutas med en slutgenomgång.",
      "Steg 1 — takkontroll, rapport och offert: vi går igenom taket på plats, och du får en rapport om takets skick. Behöver taket åtgärdas lämnar vi också en skriftlig offert med fast pris. Kostnadsfritt och utan förpliktelser.",
      "Steg 2 — planering och material: när du accepterat offerten planerar vi arbetet tillsammans med dig och beställer materialet. Du har en fast kontaktperson.",
      "Steg 3 — ställning och skydd: ställningen reses innan arbetet börjar.",
      "Steg 4 — rivning: gamla taket rivs. Råsponten kontrolleras, och skadad råspont specificeras som tillägg innan vi fortsätter.",
      "Steg 5 — underlag: ny underlagspapp, ströläkt och bärläkt läggs.",
      "Steg 6 — tätskikt och beslag: det nya taket monteras tillsammans med plåtbeslag kring skorsten, ventiler och genomföringar, plus taksäkerhet och takavvattning.",
      "Steg 7 — slutgenomgång: vi går igenom hela arbetet tillsammans med dig. Garantin står skriftligt i avtalet.",
    ],
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Så går det till", path: "/hur-det-gar-till" }],
  },
  "/priser": {
    title: "Vad kostar takbyte? Priser 2026, efter ROT — Roslagen",
    description:
      "Vad kostar ett takbyte i Roslagen? Riktpriser efter ROT-avdrag, inkl. moms: TP20 och betongpannor från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m², dubbelfalsat ca 2 000 kr/m².",
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro: PRICE_HERO_TEXT,
    paragraphs: [
      PRICE_NOTE,
      ...priceData.flatMap((cat) => [
        `${cat.category}.`,
        ...cat.items.map((it) => `${it.name}: ${it.priceRange}. ${it.description.trim()}`),
      ]),
      `${PRICE_ROT_TITLE}. ${PRICE_ROT_TEXT}`,
      `${PRICE_FACTORS_TITLE} ${PRICE_FACTORS_TEXT}`,
      ...priceFaqs.map((faq) => `${faq.question} ${faq.answer}`),
    ],
    links: [
      { href: "/blogg/kostnad-takbyte-2026", label: "Vad kostar ett takbyte? Hela guiden" },
      ...primaryLinks,
      ...serviceLinks,
    ],
  },
  "/recensioner": {
    title: "Recensioner — läs kundernas omdömen på Google",
    description:
      "Läs RoslagsTaks omdömen direkt på Google, hämtade i original. Vi kan inte kontrollera vem som skriver dem på Google.",
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Våra omdömen finns på Google, där du kan läsa dem i original.",
    paragraphs: [
      "Vi samlar våra omdömen på Google istället för att publicera egenskrivna recensioner här på sajten. Omdömena är hämtade från Google i original. Vi ber alla kunder med avslutat jobb om ett omdöme, men vi kan inte kontrollera vem som skriver på Google.",
      "Följ länken till Google för att se aktuella omdömen och stjärnbetyg. Har du själv anlitat oss får du gärna lämna ett omdöme — det hjälper andra husägare i Roslagen att välja takläggare.",
      "Vi utför takbyte, takrenovering, plåtarbeten och takvård i hela Roslagen och Storstockholm. Takkontroll och offert är alltid kostnadsfria, och du får 10 års utförandegaranti på allt arbete.",
      "Så kan du själv bedöma en takfirma: be om referenser från projekt i din närhet, kontrollera att företaget har ansvarsförsäkring och F-skatt, och be att få garantierna skriftligt i offerten. Ett seriöst företag lämnar alltid fast pris efter kostnadsfri takkontroll — aldrig ett pris per telefon.",
      "Vill du veta mer om hur vi arbetar innan du bestämmer dig? Läs om vår process steg för steg, våra riktpriser eller boka en kostnadsfri rådgivning där vi går igenom ditt tak tillsammans.",
      "Därför väljer vi att länka till Google istället för att skriva egna omdömen: omdömen på Google kan inte redigeras eller plockas bort av oss, vilket gör dem mer trovärdiga än citat på en egen hemsida. Där ser du hela bilden — både betyg, texter och hur vi svarar.",
      "Vi bygger kontinuerligt upp våra omdömen i takt med att projekt slutförs. Att lämna ett omdöme är helt frivilligt och sker utan någon form av ersättning.",
    ],
    links: [...primaryLinks, ...locationLinks.slice(0, 24)],
    breadcrumbs: [{ name: "Startsidan", path: "/", visibleName: "Hem" }, { name: "Omdömen", path: "/recensioner" }],
  },
  "/blogg": {
    title: "Guider om tak — takbyte, priser och underhåll",
    description:
      "Fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, asbestsanering och underhåll av tak i kustnära klimat.",
    h1: "Allt om tak i Roslagen",
    intro:
      "Tips, guider och nyheter om takbyte, takrenovering och takläggning i Roslagens skärgård.",
    paragraphs: [
      "Här hittar du fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, asbestsanering, taktvätt och underhåll av tak i kustnära klimat.",
    ],
    links: [
      ...primaryLinks,
      ...blogPosts.map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
    ],
  },
  "/kontakt": {
    title: "Kontakt och kostnadsfri takrådgivning",
    description:
      "Ring 070-154 36 39 eller fyll i formuläret — kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm. Återkoppling inom 24 timmar.",
    h1: "Boka rådgivning med en takexpert",
    intro: `Ring ${PHONE} eller fyll i formuläret. Vi återkopplar inom 24 timmar — helt kostnadsfritt och utan förbindelser.`,
    paragraphs: [
      "Vi erbjuder kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm, också på öar i skärgården. Du når oss enklast på telefon eller via formuläret — beskriv gärna takets storlek, material och vad du vill ha hjälp med.",
      "När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för takkontroll som passar dig, tittar på taket tillsammans med dig om du vill, och lämnar därefter en skriftlig offert med fast pris.",
      "Vi tar uppdrag i hela Roslagen — Norrtälje, Österåker, Vaxholm, Östhammar och alla öar — samt i hela Storstockholm från Täby och Sollentuna till Nacka och Södertälje.",
      "Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser), hur lång tid tar det (det beror på takets storlek, underlagets skick och väder) och kan man bo kvar under arbetet (ja, i de flesta fall).",
      `Telefon: ${PHONE}. Du kan också mejla via formuläret på sidan — ange adress så återkommer vi med förslag på tid för takkontroll.`,
      "Inför takkontrollen behöver du inte förbereda något särskilt, men det underlättar om du vet ungefär hur stort taket är, vilket material det har idag och om du märkt några specifika problem som fläckar eller läckage. Vi tar med all mätutrustning.",
      "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en skriftlig offert med fast pris och tydlig specifikation av vad som ingår — rivning, underlag, tätskikt, beslag, taksäkerhet och städning. Du bestämmer i din egen takt, utan påtryckningar.",
      "Välkommen att höra av dig oavsett om du planerar ett takbyte i år, funderar på taktvätt eller bara vill ha en bedömning av takets skick.",
      "För dig på en ö: vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Berätta var fastigheten ligger och hur den nås, så planerar vi takkontrollen därefter.",
      "Akta läckage? Om taket läcker just nu — ring direkt istället för att fylla i formuläret. Vi prioriterar akuta läckage och kan ofta komma ut för en provisorisk tätning inom kort.",
    ],
    links: primaryLinks,
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Kontakt", path: "/kontakt" }],
  },
  "/cookies": {
    title: "Cookies och integritet",
    description:
      "Så använder roslagstak.se cookies och vilka uppgifter vi sparar när du kontaktar oss. Du väljer själv om statistik och marknadsföring ska vara på.",
    h1: "Cookies och integritet",
    intro: "Här ser du vad vi sparar, varför, och hur du ändrar ditt val.",
    paragraphs: [
      "Nödvändig lagring krävs inget samtycke för. Statistik (Google Analytics) och marknadsföring (Google Ads och Meta) laddas bara efter att du godkänt dem, och du kan ändra ditt val när som helst.",
      "Personuppgiftsansvarig är VT6 Invest AB, som driver RoslagsTak. Läs mer om vilka uppgifter vi sparar, varför, hur länge och vilka rättigheter du har längre ned på sidan.",
    ],
    links: primaryLinks,
  },
  "/projekt": {
    title: "Referensjobb — riktiga takprojekt i Roslagen",
    description:
      "Se riktiga takprojekt vi utfört i Roslagen och Storstockholm, med bilder och fakta om material, omfattning och plats.",
    h1: "Riktiga takprojekt i Roslagen",
    intro: "Här visar vi jobb vi faktiskt utfört, med kundens samtycke. Riktiga bilder, riktiga material — inga påhittade case.",
    paragraphs: [
      "Nytt tak på Blidö: nya betongpannor från Benders i svart, sommaren 2026.",
      "Nytt tak på Singö, Grisslehamn: betongpannor på huvudtaket och TP20-plåt på de lägre takdelarna, september 2026.",
    ],
    links: [...primaryLinks, { href: "/projekt/takrenovering-blido", label: "Nytt tak på Blidö" }, { href: "/projekt/takbyte-singo", label: "Nytt tak på Singö" }],
    breadcrumbs: [{ name: "Startsidan", path: "/", visibleName: "Hem" }, { name: "Referensjobb", path: "/projekt" }],
  },
  "/takproblem": {
    title: "Takproblem – tecken, orsaker och vad du gör",
    description:
      "Läcker taket, mossa, fukt på vinden eller istappar? Här är de vanligaste takproblemen, hur du känner igen dem och när det är dags att ringa en takläggare.",
    h1: "Vanliga takproblem – så känner du igen dem",
    intro:
      "Ett tak säger sällan ifrån förrän skadan har pågått ett tag. Här har vi samlat de vanligaste takproblemen villaägare upptäcker.",
    paragraphs: problems.map((p) => `${p.title}: ${p.intro}`),
    links: [...primaryLinks, ...problems.map((p) => ({ href: `/takproblem/${p.slug}`, label: p.title }))],
    breadcrumbs: [
      { name: "Startsidan", path: "/", visibleName: "Hem" },
      { name: "Takproblem", path: "/takproblem" },
    ],
  },
  "/material": {
    title: "Takmaterial – betongpannor, lertegel, plåt och falsat",
    description:
      "Jämför takmaterial: betongpannor, lertegel, TP20-plåt och dubbelfalsat plåttak. Vikt, synliga skruvar och vad som passar ditt hus.",
    h1: "Takmaterial – vad passar ditt hus?",
    intro:
      "Betongpannor, lertegel, plåt eller falsat — materialet avgör utseende, vikt och underhåll. Här går vi igenom vad som skiljer dem åt.",
    paragraphs: [
      ...materials.map((m) => `${m.title}: ${m.hubDescription}`),
      "Vilket material som passar ditt hus beror på taket, lutningen, huset och uttrycket du vill ha. Boka en kostnadsfri takkontroll utan förpliktelser. Vi går upp på taket, och sedan får du ett fast pris för det material du väljer.",
    ],
    links: [...primaryLinks, ...materials.map((m) => ({ href: m.href, label: m.title }))],
    breadcrumbs: [
      { name: "Startsidan", path: "/", visibleName: "Hem" },
      { name: "Material", path: "/material" },
    ],
  },
  "/tjanster/taktvatt": {
    title: "Taktvätt och takmålning — bort med mossa och lav",
    description:
      "Professionell taktvätt och takmålning som förlänger takets livslängd. Skonsamma metoder för betongpannor, tegel, eternit och plåttak.",
    h1: "Taktvätt i Roslagen — bort med mossa, lavar och alger",
    intro:
      "Professionell taktvätt och takmålning som förlänger takets livslängd med upp till 15 år. Skonsamma metoder för betongpannor, tegel, eternit och plåttak.",
    paragraphs: [
      "Vi rengör taket med lågtryckstvätt eller manuell borstning och behandlar därefter med miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet.",
      "Vi lämnar alltid fast pris efter kostnadsfri takkontroll, för både taktvätt och takmålning med grundning och två strykningar. ROT-avdrag på 30 % av arbetskostnaden.",
    ],
    links: [...primaryLinks, ...serviceLinks, { href: "/taklaggare-bollstanas", label: "Takläggare i Bollstanäs" }],
  },
};

const truncateAtWord = (text: string, maxLen: number): string =>
  text.length <= maxLen ? text : `${text.slice(0, maxLen).replace(/\s+\S*$/, "")}…`;

const serviceIntro = (title: string, description: string): PrerenderPage => ({
  title: `${title} i Roslagen & Storstockholm`,
  description: truncateAtWord(
    `${description} Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti. Ring ${PHONE}.`,
    158,
  ),
  h1: `${title} i Roslagen`,
  intro: description,
  paragraphs: [
    `RoslagsTak utför ${title.toLowerCase()} i hela Roslagen och Stockholms norra skärgård. Allt arbete utförs enligt AMA-standard av certifierade takläggare, med 10 års utförandegaranti.`,
    "Vi lämnar fast pris efter kostnadsfri takkontroll. ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.",
    `Ring ${PHONE} eller begär kostnadsfri offert — vi återkopplar inom 24 timmar.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks.slice(0, 24)],
});

const NEARBY_PROJECT_MAX_KM = 30;

/**
 * Datadriven stycke för LOCATION-sidor (Marknadschefens beslut 2026-09-29, efter fyndet att 25
 * ortspar hade Jaccard > 0,8 efter maskering av ortsnamnet): avstånd till Norrtälje/Täby, region
 * och grannorter, ev. referensjobb, och vilka tjänst+ort-sidor som faktiskt är indexerade här.
 * Byggt av riktig data (locations.ts, projectSummaries, thin-combos.ts) — aldrig malltext med bara
 * ortnamnet bytt, vilket var precis vad som orsakade dubbletterna.
 */
const geoFactsParagraph = (loc: (typeof locations)[number]): string => {
  const prep = loc.isIsland ? "på" : "i";
  const parts: string[] = [
    `${loc.name} tillhör ${loc.region} och ligger cirka ${Math.round(distanceFromBaseKm(loc))} km från vår bas i Norrtälje och cirka ${Math.round(distanceFromTabyKm(loc))} km från Täby. Närmaste orter i vårt område: ${loc.nearbyLocations.join(", ")}.`,
  ];

  const exactProject = projectSummaries.find((p) => p.locationSlug === loc.slug);
  if (exactProject) {
    parts.push(`Vi har utfört ett dokumenterat referensjobb här: ${exactProject.title}.`);
  } else {
    const nearbyProject = projectSummaries.find((p) => {
      const projectLoc = locations.find((l) => l.slug === p.locationSlug);
      return projectLoc && distanceKm(loc, projectLoc) <= NEARBY_PROJECT_MAX_KM;
    });
    if (nearbyProject) {
      const projectLoc = locations.find((l) => l.slug === nearbyProject.locationSlug)!;
      parts.push(
        `Vi påstår inte att det jobbet gjordes här, men ett referensjobb i närområdet — ${nearbyProject.title} (cirka ${Math.round(distanceKm(loc, projectLoc))} km bort) — visar hur ett komplett takbyte kan se ut.`,
      );
    }
  }

  const indexedServiceNames = hasServiceCombos(loc.region)
    ? [...new Set(combos.filter((c) => c.locationSlug === loc.slug && !isThinCombo(c.serviceSlug, loc)).map((c) => c.serviceName))]
    : [];
  if (indexedServiceNames.length > 0) {
    parts.push(`Vi har egna sidor för ${indexedServiceNames.join(", ")} ${prep} ${loc.name}.`);
  }

  return parts.join(" ");
};

/** Important on-page text for a route, or null when the route has no prerender. */
const prerenderContentRaw = (path: string): PrerenderPage | null => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();

  if (staticPages[clean]) return staticPages[clean];

  if (clean.startsWith("/tjanster/")) {
    const slug = clean.slice("/tjanster/".length);
    const service = services.find((s) => s.slug === slug);
    if (!service) return null;
    const page = serviceIntro(service.title, service.description);
    const extra = [serviceLongDesc.get(slug), ...(serviceExtraParagraphs[slug] ?? [])].filter(
      (p): p is string => Boolean(p),
    );
    // Speglar ServiceDetail.tsx:s "Relaterat innehåll" (#1ag punkt 2) — annars syns de bara för
    // besökare med JS, inte för crawlers som läser den här förrenderade HTML:en.
    const areaLinks = (serviceAreaLinks[slug] ?? []).map((l) => ({ href: l.to, label: l.label }));
    return {
      ...page,
      paragraphs: [...extra, ...page.paragraphs],
      links: [...page.links, ...areaLinks],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Tjänster", path: "/#tjanster" },
        { name: service.title, path: `/tjanster/${slug}` },
      ],
    };
  }

  if (clean.startsWith("/takproblem/")) {
    const problem = problems.find((p) => p.slug === clean.slice("/takproblem/".length));
    if (!problem) return null;
    const problemSections: { key: keyof typeof problem; heading: string }[] = [
      { key: "symptom", heading: "Symptom" },
      { key: "orsaker", heading: "Vanliga orsaker" },
      { key: "akut", heading: "När är det akut?" },
      { key: "undersokning", heading: "Så undersöks det" },
      { key: "atgarder", heading: "Åtgärder som används" },
      { key: "gorInteSjalv", heading: "Gör inte själv" },
    ];
    return {
      title: problem.metaTitle,
      description: problem.metaDescription,
      h1: problem.title,
      intro: problem.intro,
      paragraphs: [
        ...problemSections.map((s) => `${s.heading.endsWith("?") ? s.heading : s.heading + ":"} ${problem[s.key] as string}`),
        SAKERHETSRUTA,
      ],
      links: [
        ...primaryLinks,
        { href: "/takproblem", label: "Alla takproblem" },
        ...problem.related.map((r) => ({ href: r.to, label: r.label })),
        ...guidesForTitle(problem.title, 2).map((g) => ({ href: `/blogg/${g.slug}`, label: g.title })),
        ...MONEY_LINKS,
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Takproblem", path: "/takproblem" },
        { name: problem.title, path: `/takproblem/${problem.slug}` },
      ],
    };
  }

  if (clean.startsWith("/material/")) {
    const material = materials.find((m) => m.slug === clean.slice("/material/".length) && m.detail);
    if (!material || !material.detail) return null;
    const d = material.detail;
    const materialSections: { key: keyof typeof d; heading: string }[] = [
      { key: "funktion", heading: "Funktion" },
      { key: "anvandning", heading: "Användning" },
      { key: "livslangd", heading: "Livslängd" },
      { key: "fordelar", heading: "Fördelar" },
      { key: "nackdelar", heading: "Nackdelar" },
      { key: "passarNar", heading: "Passar när" },
      { key: "underhall", heading: "Underhåll" },
      { key: "vanligaFel", heading: "Vanliga fel" },
      { key: "delAvTaksystemet", heading: "Del av taksystemet" },
    ];
    const MATERIAL_OG_IMAGES: Record<string, { src: string; alt: string }> = {
      betongpannor: { src: "/og/material-betongpannor.jpg", alt: "Närbild på svart betongpannetak med vågprofil" },
      "tp20-plattak": { src: "/og/material-tp20-plattak.jpg", alt: "Närbild på trapetsprofilerad TP20-plåt" },
    };
    const og = MATERIAL_OG_IMAGES[material.slug];
    return {
      title: d.metaTitle,
      description: d.metaDescription,
      h1: material.title,
      intro: d.intro,
      paragraphs: [
        ...materialSections.map((s) => `${s.heading}: ${d[s.key] as string}`),
        `Kostnadsdrivare: ${d.kostnadsdrivare}`,
        ...(d.hallIsar ? [`Håll isär: ${d.hallIsar}`] : []),
        ...(d.hosOss ? [`Hos oss: ${d.hosOss}`] : []),
      ],
      ogImage: og?.src,
      ogImageAlt: og?.alt,
      links: [
        ...primaryLinks,
        { href: "/material", label: "Alla material" },
        { href: "/priser", label: "Priser för takarbeten" },
        ...guidesForTitle(material.title, 2).map((g) => ({ href: `/blogg/${g.slug}`, label: g.title })),
        ...MONEY_LINKS,
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Material", path: "/material" },
        { name: material.title, path: material.href },
      ],
    };
  }

  if (clean.startsWith("/projekt/")) {
    const projectSlug = clean.slice("/projekt/".length);
    const project = projectSummaries.find((p) => p.slug === projectSlug);
    if (!project) return null;
    return {
      title: `${project.title} — referensjobb`,
      description: project.summary,
      h1: project.title,
      intro: project.summary,
      paragraphs: [...project.description, `Material: ${project.material}. Utfört: ${project.period}.`],
      links: [
        ...primaryLinks,
        { href: "/projekt", label: "Alla referensjobb" },
        { href: `/tjanster/${project.serviceSlug}`, label: project.serviceName },
        { href: `/taklaggare-${project.locationSlug}`, label: `Takläggare i ${project.locationName}` },
      ],
      ogImage: project.ogImage,
      ogImageAlt: project.ogImageAlt,
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Referensjobb", path: "/projekt" },
        { name: project.title, path: `/projekt/${project.slug}` },
      ],
    };
  }

  if (clean.startsWith("/blogg/")) {
    const post = blogPosts.find((p) => p.slug === clean.slice("/blogg/".length));
    if (!post) return null;
    return {
      title: post.title,
      description: post.excerpt,
      h1: post.title,
      intro: post.excerpt,
      paragraphs: post.content.map(stripInlineMd),
      links: [
        ...primaryLinks,
        ...post.content.flatMap(inlineMdLinks),
        ...relatedForPost(post).map((r) => ({ href: r.to, label: r.label })),
        ...MONEY_LINKS,
        ...relatedPosts(post, 4).map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Blogg", path: "/blogg" },
        { name: post.title, path: `/blogg/${post.slug}` },
      ],
      jsonLd: [buildBlogPostingSchema(post)],
    };
  }

  if (clean === "/omraden") {
    return {
      title: "Våra områden — Roslagen och hela Storstockholm",
      description: `RoslagsTak utför takbyte, takrenovering och plåtarbeten i ${locations.length} orter — från ytterskärgårdens öar till Stockholms innerstad. Hitta din ort här.`,
      h1: "Takläggare i Roslagen och hela Storstockholm",
      intro: `RoslagsTak utför takbyte, takomläggning, takrenovering, plåtarbeten och takvård i ${locations.length} orter — från ytterskärgårdens öar till Stockholms innerstad.`,
      paragraphs: [
        "Välj ditt område nedan för lokala priser, vanliga taktyper och hur ett takprojekt går till just där.",
        `Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        ...Object.entries(regionSlugs).map(([region, slug]) => ({
          href: `/omraden/${slug}`,
          label: `Takläggare i ${region}`,
        })),
        ...locationLinks,
      ],
    };
  }

  if (clean.startsWith("/omraden/")) {
    const region = regionBySlug(clean.slice("/omraden/".length));
    if (!region) return null;
    const places = locations.filter((l) => l.region === region);
    const rt = regionTexts[region];
    return {
      title: rt?.title ?? `Takläggare i ${region}`,
      description: rt?.description ?? `Takbyte, takrenovering och plåtarbeten i ${region} — ${places.length} orter. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti. Ring ${PHONE}.`,
      h1: rt?.h1 ?? `Takläggare i ${region}`,
      intro: rt?.intro ?? regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      paragraphs: [
        ...(rt ? rt.body.map(stripInlineMd) : (regionLongText[region] ?? [])),
        ...(villaAreasParagraph(regionSlugs[region]) ? [villaAreasParagraph(regionSlugs[region])!] : []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...villaAreaLinks(regionSlugs[region]),
        ...(rt ? rt.body.flatMap(inlineMdLinks) : []),
        ...(regionNeighbors[region] ?? []).map((n) => ({ href: `/omraden/${regionSlugs[n]}`, label: `Takläggare i ${n}` })),
        ...places.map((l) => ({
          href: `/taklaggare-${l.slug}`,
          label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
        })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Områden", path: "/omraden" },
        { name: region, path: clean },
      ],
    };
  }

  if (clean.startsWith("/brf/")) {
    const slug = clean.slice("/brf/".length);
    const loc = (brfLocationSlugs as readonly string[]).includes(slug)
      ? locations.find((l) => l.slug === slug)
      : undefined;
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    return {
      title: `Takbyte BRF ${prep} ${loc.name} — bostadsrättsföreningar`,
      description: `Takbyte och takkontroll för bostadsrättsföreningar ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.`,
      h1: `Takbyte för bostadsrättsföreningar ${prep} ${loc.name}, med underlag styrelsen kan besluta på`,
      intro: `Från kostnadsfri takkontroll och fast offert till slutgenomgång och skriftlig garanti. Vi tar uppdrag ${prep} ${loc.name} och närområdet.`,
      paragraphs: [
        `För en bostadsrättsförening ${prep} ${loc.name} börjar ett takbyte med en kostnadsfri takkontroll, följd av en skriftlig offert med fast pris som styrelsen och stämman kan besluta på.`,
        "Vi erbjuder takbyte och takrenovering, med kostnadsfri takkontroll utan förpliktelser, fast pris och en kontaktperson hela vägen. Garantin står skriftligt i avtalet.",
        `Ring ${PHONE} eller boka takkontroll på /brf/${loc.slug}. Vi återkommer inom 24 timmar.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/brf", label: "BRF & fastigheter" },
        { href: `/taklaggare-${loc.slug}`, label: `Takläggare ${prep} ${loc.name}` },
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "BRF & fastigheter", path: "/brf" },
        { name: `BRF ${prep} ${loc.name}`, path: clean },
      ],
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const loc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    const regionHref = regionSlugs[loc.region] ? `/omraden/${regionSlugs[loc.region]}` : "/omraden";
    return {
      title: ortSeoOverrides[loc.slug]?.title ?? `Takläggare ${prep} ${loc.name} — Takbyte & Takrenovering`,
      description: ortSeoOverrides[loc.slug]?.description ?? (loc.isIsland
        ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Skärgårdsspecialist, fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och kostnadsfri offert.`
        : isNearBase(loc)
          ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och kostnadsfri offert.`
          : `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och kostnadsfri offert.`),
      h1: loc.h1Override ??
        (loc.parentLocation
          ? `Takläggare i ${loc.name}, ${loc.parentLocation.name}`
          : `Takläggare ${prep} ${loc.name} — takbyte & takrenovering`),
      intro: loc.description,
      paragraphs: [
        loc.longDescription,
        ...(loc.extraContent ? [loc.extraContent] : []),
        ...(loc.extraSections ?? []).map((sec) => `${sec.heading}. ${sec.text}`),
        ...(loc.process
          ? [
              `Så går det till. ${loc.process.steps.map((st, n) => `${n + 1}. ${st.replace(/\*\*/g, "")}`).join(" ")}`,
              ...loc.process.paragraphs,
            ]
          : []),
        ...(loc.factBox ? [loc.factBox.map((f) => `${f.label}: ${f.value}.`).join(" ")] : []),
        ...(loc.sourceLink ? [`Källa: ${loc.sourceLink.label} — ${loc.sourceLink.url}`] : []),
        ...(villaAreasParagraph(loc.slug) ? [villaAreasParagraph(loc.slug)!] : []),
        geoFactsParagraph(loc),
        `${loc.uniqueFAQ.question} ${withRotForbehall(loc.uniqueFAQ.answer)}`,
        `Ring ${PHONE} för kostnadsfri takkontroll och offert ${prep} ${loc.name}.`,
      ],
      links: [
        ...primaryLinks,
        ...MONEY_LINKS,
        { href: regionHref, label: `Takläggare i ${loc.region}` },
        ...(loc.parentLocation ? [{ href: `/taklaggare-${loc.parentLocation.slug}`, label: `Takläggare i ${loc.parentLocation.name}` }] : []),
        ...villaAreaLinks(loc.slug),
        ...combos
          .filter((c) => c.locationSlug === loc.slug)
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
        ...loc.nearbyLocations
          .map((name) => locations.find((l) => l.name === name))
          .filter((l): l is (typeof locations)[number] => Boolean(l))
          .map((l) => ({
            href: `/taklaggare-${l.slug}`,
            label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
          })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Områden", path: "/omraden" },
        { name: loc.region, path: regionHref },
        ...(loc.parentLocation
          ? [{ name: `Takläggare i ${loc.parentLocation.name}`, path: `/taklaggare-${loc.parentLocation.slug}` }]
          : []),
        { name: `Takläggare ${prep} ${loc.name}`, path: `/taklaggare-${loc.slug}`, visibleName: loc.name },
      ],
    };
  }

  const combo = comboByUrl.get(clean);
  if (combo) {
    const override = comboOverrides[`${combo.serviceSlug}-${combo.locationSlug}`];
    return {
      title: override?.title ?? `${combo.serviceName} ${combo.prep} ${combo.locationName} — Fast pris & garanti`,
      description: override?.description ?? combo.description,
      h1: `${combo.serviceName} ${combo.prep} ${combo.locationName} — fast pris & 10 års utförandegaranti`,
      intro: override?.description ?? combo.description,
      paragraphs: (override?.content ?? combo.content).map(stripInlineMd),
      links: [
        ...primaryLinks,
        {
          href: `/taklaggare-${combo.locationSlug}`,
          label: `Takläggare ${combo.prep} ${combo.locationName}`,
        },
        ...combos
          .filter(
            (c) => c.locationSlug === combo.locationSlug && c.serviceSlug !== combo.serviceSlug,
          )
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: `Takläggare ${combo.prep} ${combo.locationName}`, path: `/taklaggare-${combo.locationSlug}` },
        { name: combo.serviceName, path: combo.url },
      ],
    };
  }

  return null;
};
export const prerenderContent = (path: string): PrerenderPage | null => {
  const page = prerenderContentRaw(path);
  if (!page) return page;
  return {
    ...page,
    title: page.title ? fitTitle(page.title) : page.title,
    description: page.description ? fitDescription(page.description) : page.description,
  };
};

/** Tjänst+ort-URL:er som ska noindexeras (se src/data/thin-combos.ts). */
export const thinComboPaths: string[] = locations
  .filter((l) => hasServiceCombos(l.region))
  .flatMap((l) => allServiceSlugs.filter((s) => isThinCombo(s, l)).map((s) => `/${s}-${l.slug}`));
