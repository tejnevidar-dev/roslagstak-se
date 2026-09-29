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
import { allServiceSlugs, generateCombos } from "../src/data/service-location-combos";
import { blogPosts } from "../src/data/blog-posts";
import { brfLocationSlugs } from "../src/data/brf-locations";
import { isNearBase } from "../src/data/service-reach";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { comboOverrides } from "../src/data/combo-overrides";
import { landingServices } from "../src/data/landing-services";
import { fitDescription, fitTitle } from "../src/lib/seo-fit";
import { regionBySlug, regionIntros, regionLongText, regionSlugs } from "../src/data/regions";

export interface PrerenderPage {
  h1: string;
  intro: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
  /** Unique <title> for the static HTML (before JS runs). Mirrors SEOHead. */
  title?: string;
  /** Unique meta description for the static HTML. */
  description?: string;
}

/* Services live in a React component; read the data with a regex so the
   prerender never has to bundle JSX or lucide-react. */
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const services = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], title: m[2], description: m[3] }));

/**
 * Textspegling av src/data/projects.ts, utan bildimporterna (esbuild/Node kan inte
 * lösa Vite-bildimporter). Håll fälten i synk manuellt vid ändringar i projects.ts.
 */
const projectSummaries = [
  {
    slug: "takrenovering-blido",
    title: "Takrenovering på Blidö",
    locationName: "Blidö, Norrtälje",
    locationSlug: "blido",
    serviceName: "Takrenovering",
    serviceSlug: "takrenovering",
    material: "Betongpannor (Benders, svart)",
    period: "sommaren 2026",
    summary:
      "Komplett takrenovering på ett fritidshus på Blidö, med nya betongpannor i svart. Befintlig råspont behölls.",
    description: [
      "Ett fritidshus på Blidö i Norrtälje kommun, omgärdat av skog med utsikt mot fjärden, fick sommaren 2026 en komplett takrenovering. Nytt underlag, ny läkt, nya plåtdetaljer kring skorstenar och genomföringar samt nya hängrännor lades hela vägen — den befintliga råsponten var i så pass gott skick att den kunde behållas.",
      "Nytt ytmaterial blev betongpannor från Benders i svart, ett robust och prisvärt val som är vanligt på fritidshus i Roslagens skärgård.",
      "Jobbet är utfört av RoslagsTak med kundens samtycke till att bilderna publiceras i marknadsföring.",
    ],
  },
  {
    slug: "takbyte-singo",
    title: "Takbyte på Singö",
    locationName: "Singö, Grisslehamn",
    locationSlug: "singo",
    serviceName: "Takomläggning",
    serviceSlug: "takomlaggning",
    material: "Betongpannor på huvudtaket, TP20-plåt på de lägre delarna (båda röda)",
    period: "september 2026",
    summary:
      "Komplett takbyte på ett hus på Singö med utsikt över fjärden — röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna.",
    description: [
      "På Singö i Grisslehamn, Norrtälje kommun, genomförde RoslagsTak i september 2026 ett komplett takbyte på ett hus med utsikt över fjärden. Delar av råsponten byttes ut där den var skadad, resten behölls.",
      "Taket har två material: röda betongpannor på huvudbyggnadens tak, och röd TP20-plåt (trapetsprofilerad plåt) på de lägre takdelarna — ett vanligt sätt att hålla nere vikten och kostnaden på tillbyggnader utan att tumma på utseendet.",
      "Jobbet är utfört av RoslagsTak med kundens samtycke till att bilderna publiceras i marknadsföring, inklusive startsidans hero-bild.",
    ],
  },
];

/**
 * Textspegling av alla poster i src/data/problems.ts. Håll i synk manuellt, samma skäl som
 * projectSummaries ovan (Node/esbuild kan inte importera .tsx-filer med bildimporter).
 */
const problemSummaries = [
  {
    slug: "lackage-vid-skorsten",
    title: "Läckage vid skorstenen",
    metaTitle: "Läckage vid skorstenen – orsaker och vad du gör",
    metaDescription:
      "Fuktfläck i taket nära skorstenen? Så hittar du orsaken, när det är akut och när du behöver en takläggare. Kostnadsfri takkontroll.",
    intro:
      "Fuktfläckar nära skorstenen är ett av de vanligaste takproblemen — oftast handlar det om beslaget runt skorstenen, inte om själva murverket.",
    paragraphs: [
      "Symptom: fuktfläckar eller droppmärken i taket eller på väggen nära skorstenen, fukt eller mörka ränder på råsponten runt skorstenen på vinden, flagnande färg eller fuktskador på skorstenens murverk inomhus.",
      "Vanliga orsaker: skorstensbeslaget (plåten runt skorstenen) har släppt, rostat eller spruckit. Fogen mellan beslag och murverk har släppt. Skadat murverk eller skadad skorstenshuv. Pannor närmast skorstenen ligger fel.",
      "Åtgärder som används: nytt eller omlagt skorstensbeslag, ny fog, byte av pannor runt skorstenen. Är taket i övrigt uttjänt kan ett takbyte vara bättre än att laga en detalj.",
    ],
  },
  {
    slug: "trasiga-takpannor",
    title: "Trasiga eller förskjutna takpannor",
    metaTitle: "Trasiga eller förskjutna takpannor – vad gör man?",
    metaDescription:
      "Spruckna, lösa eller förskjutna takpannor släpper in vatten i underlaget. Så ser du det från marken och så åtgärdas det.",
    intro:
      "Pannor som glidit eller spruckit — ofta efter storm — släpper snabbt in vatten i underlaget om de inte åtgärdas.",
    paragraphs: [
      "Symptom: pannor som ligger snett, har glidit ner, har spruckit eller saknas, ofta efter storm. Mörka partier eller glipor i takytan.",
      "Vanliga orsaker: storm och kraftig vind, frostsprängning, att någon har gått på taket, lösa eller rostade fästen, eller att läkten under har gett efter.",
      "Åtgärder som används: byte av enstaka pannor och omfästning. Vid många skador, eller om underlaget är skadat, kan omläggning eller takbyte vara rätt.",
    ],
  },
  {
    slug: "mossa-pa-taket",
    title: "Mossa och påväxt på taket",
    metaTitle: "Mossa på taket – farligt eller bara fult?",
    metaDescription:
      "När mossa och påväxt blir ett problem för taket, vad du kan göra själv och när det är dags att kontakta en takläggare.",
    intro: "Lite mossa är oftast bara estetiskt. Tjocka mattor håller däremot kvar fukt och kan skada taket över tid.",
    paragraphs: [
      "Symptom: gröna eller mörka mattor av mossa, lav och alger, oftast på norrsidan och under träd. Mossrester i hängrännorna.",
      "Vanliga orsaker: skugga och fukt, träd nära huset, ett tak som torkar långsamt. Porösa ytor binder mer påväxt.",
      "Åtgärder som används: skonsam rengöring och behandling av taket, rensning av hängrännor. Är ytan skadad kan fler åtgärder behövas.",
    ],
  },
  {
    slug: "rostig-plat",
    title: "Rostig plåt och rostiga beslag",
    metaTitle: "Rost på plåttak och beslag – när behöver det åtgärdas?",
    metaDescription:
      "Rostig takplåt, fotplåt eller skorstensbeslag? Så bedömer du läget, vad som händer om du väntar och vilka åtgärder som finns.",
    intro:
      "Rost börjar oftast ytligt och går att åtgärda enkelt — men obehandlad kan den till slut gå igenom plåten.",
    paragraphs: [
      "Symptom: rostfläckar eller flagnande färg på plåttak, fotplåt, vindskiveplåt, ränndalar eller skorstensbeslag. Rostränder på fasaden under plåten.",
      "Vanliga orsaker: skadad eller sliten ytbehandling, repor, stående vatten, saltluft i kustnära lägen, felaktiga material i kontakt med varandra.",
      "Åtgärder som används: rengöring och ny ytbehandling när rosten är ytlig, byte av enskilda plåtdetaljer, eller nytt plåttak när plåten är uttjänt.",
    ],
  },
  {
    slug: "fukt-pa-vinden",
    title: "Fukt eller mögel på vinden",
    metaTitle: "Fukt eller mögel på vinden – läcka eller kondens?",
    metaDescription:
      "Mörka fläckar, droppar eller mögellukt på vinden? Så skiljer du läckage från kondens och vad som behöver göras.",
    intro:
      "Fukt på vinden beror antingen på ett läckage genom yttertaket eller på kondens från inomhusluft — åtgärden skiljer sig helt åt.",
    paragraphs: [
      "Symptom: mörka fläckar eller ränder på råsponten, droppar eller frost på undersidan av taket en kall morgon, fuktig isolering, mögellukt.",
      "Vanliga orsaker: läckage genom yttertaket (pannor, beslag, genomföringar) eller kondens, när varm fuktig inomhusluft når den kalla vinden och ventilationen i takfot och nock inte räcker.",
      "Åtgärder som används: åtgärd av läckan, förbättrad ventilation, tätning mot varm inomhusluft, och byte av skadat underlag eller råspont när det krävs.",
    ],
  },
  {
    slug: "igensatta-hangrannor",
    title: "Igensatta hängrännor",
    metaTitle: "Igensatta hängrännor – därför ska du rensa före vintern",
    metaDescription:
      "Löv och barr i hängrännan fryser och får vatten att rinna över. Så ser du problemet och när rännorna behöver lagas eller bytas.",
    intro:
      "Igensatta hängrännor är ett litet problem som blir stort på vintern, när vattnet som rinner över fryser vid takfoten.",
    paragraphs: [
      "Symptom: vatten som rinner över kanten när det regnar, växter eller löv i rännan, fuktfläckar eller påväxt på fasaden, istappar längs takfoten på vintern.",
      "Vanliga orsaker: löv, barr och mossa, fel lutning mot stupröret, hängrännor som har släppt eller läcker i skarvarna.",
      "Åtgärder som används: rensning, justering av lutning och fästen, tätning av skarvar, eller nya hängrännor och stuprör när de är uttjänta.",
    ],
  },
  {
    slug: "rutten-raspont",
    title: "Rutten eller skadad råspont",
    metaTitle: "Rutten råspont – tecken, orsaker och åtgärder",
    metaDescription:
      "Mjuk, mörk eller rutten råspont syns ofta först på vinden. Så känner du igen den, varför den uppstår och vad som görs åt det.",
    intro:
      "Råsponten är takets bärande underlag. När den ruttnar syns det oftast först som mjuka, mörka brädor på vinden.",
    paragraphs: [
      "Symptom: mörka, mjuka eller svampangripna brädor på vinden, sviktande takyta, gamla fuktränder som återkommer, mögellukt.",
      "Vanliga orsaker: fukt över lång tid från ett läckage, kondens på grund av dålig ventilation eller ett underlag som har slutat skydda.",
      "Åtgärder som används: byte av skadade delar av råsponten (ofta i samband med takbyte, när underlaget ändå är öppet) och åtgärd av fuktkällan.",
    ],
  },
  {
    slug: "kondens-pa-vinden",
    title: "Kondens på vinden",
    metaTitle: "Kondens på vinden – därför bildas den och så åtgärdas den",
    metaDescription:
      "Droppar eller frost på undersidan av taket en kall morgon är ofta kondens, inte läckage. Så skiljer du dem åt och vad som hjälper.",
    intro:
      "Kondens sprids ofta över stora ytor på vinden, till skillnad från ett läckage som brukar ha en tydlig punkt.",
    paragraphs: [
      "Symptom: droppar, rimfrost eller fukt på undersidan av yttertaket, särskilt kalla, klara morgnar, med fukt spridd över stora ytor och inte en tydlig läckpunkt.",
      "Vanliga orsaker: varm, fuktig inomhusluft som läcker upp till den kalla vinden, för lite ventilation genom takfot och nock, eller igensatta ventilationsspalter.",
      "Åtgärder som används: tätning mot bostaden (vindslucka, genomföringar), förbättrad ventilation i takfot och nock. Vid omfattande fuktskador även åtgärder på underlaget.",
    ],
  },
  {
    slug: "dalig-underlagspapp",
    title: "Dålig underlagspapp eller undertak",
    metaTitle: "Dålig underlagspapp – därför är den takets viktigaste skydd",
    metaDescription:
      "Underlagspappen är takets andra skydd mot vatten. Så märker du när den har slutat fungera och vad som krävs för att byta den.",
    intro:
      "Underlagspappen är takets reservskydd. När den slutar fungera märks det ofta som läckage på flera ställen samtidigt.",
    paragraphs: [
      "Symptom: läckage som inte går att härleda till en enskild trasig panna, fuktfläckar på flera ställen på vinden, synligt spröd, sprucken eller trasig papp där den syns från vinden.",
      "Vanliga orsaker: åldrad papp som har blivit spröd, skador vid tidigare arbeten på taket, fukt som har stått kvar.",
      "Åtgärder som används: nytt underlag kräver normalt att yttertaket tas bort, och görs därför vanligen som en omläggning eller ett takbyte med nytt underlag och ny läkt.",
    ],
  },
  {
    slug: "istappar-pa-taket",
    title: "Istappar och isbildning vid takfoten",
    metaTitle: "Istappar och is vid takfoten – vad beror det på?",
    metaDescription:
      "Stora istappar och isvallar vid takfoten kan tyda på värmeläckage eller igensatta hängrännor. Så minskar du risken och när du ska kontakta en takläggare.",
    intro:
      "Stora istappar är ofta ett tecken på att värme läcker upp genom taket och smälter snön ojämnt.",
    paragraphs: [
      "Symptom: stora istappar längs takfoten, isvallar i hängrännorna, vatten som tränger in vid takfoten under töväder.",
      "Vanliga orsaker: värme från bostaden som smälter snön på taket, så att vattnet fryser vid den kalla takfoten. Igensatta hängrännor. Otillräcklig ventilation.",
      "Åtgärder som används: rensning eller byte av hängrännor, förbättrad ventilation och tätning mot vinden så att mindre värme når yttertaket.",
    ],
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
    "RoslagsTak är takläggare i Roslagen med bas på Blidö. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års garanti och ROT-avdrag.",
    paragraphs: [
      "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåt, pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA-standard av certifierade och försäkrade takläggare.",
      "Som skärgårdsspecialister hanterar vi all materialtransport och logistik till öar utan broförbindelse — från Blidö, Yxlan och Ljusterö till Husarö, Finnhamn, Ingmarsö, Svartlöga och Arholma.",
      "Sedan 2026 arbetar vi även i hela Storstockholm — från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Samma fasta priser, samma garanti och samma kontaktperson genom hela projektet.",
      "Ett komplett takbyte hos oss innehåller allt: rivning av gamla taket, byte av råspont och underlagspapp vid behov, ny läkt, tätskikt, plåtbeslag kring skorsten och genomföringar, taksäkerhet samt städning och bortforsling. Du får en kontaktperson som följer projektet från besiktning till slutgenomgång.",
      "Varje moment dokumenteras med foton som du får ta del av. Efter slutförd besiktning får du garantihandlingar: 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      `Begär kostnadsfri takkontroll och offert. Vi återkopplar inom 24 timmar. Ring ${PHONE} eller boka rådgivning på /kontakt.`,
    ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks],
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
        ...s.list.map((i) => `${i.title}: ${i.text}`),
        ...s.steps.map((st, n) => `Steg ${n + 1}, ${st.title}: ${st.text}`),
        ...s.extraParagraphs,
        s.priceNote,
        ...s.faqs.map((f) => `${f.question} ${f.answer}`),
        `Ring ${PHONE} eller skicka en förfrågan på ${s.path}. Vi återkommer inom 24 timmar.`,
      ],
      links: [...primaryLinks, ...s.related.map((r) => ({ href: r.to, label: r.label }))],
    } satisfies PrerenderPage,
  ]),
);

const staticPages: Record<string, PrerenderPage> = {
  ...landingPages,
  "/": home,
  "/offert": {
    title: "Offert på takbyte — fast pris efter besiktning",
    description:
      "Räkna fram ett prisförslag på takbyte direkt, eller boka kostnadsfri takkontroll. Fast pris, 10 års utförandegaranti och återkoppling inom 24 timmar.",
    h1: "Få offert på takbyte i Roslagen",
    intro:
      "Räkna fram ett prisförslag på ditt takbyte direkt i konfiguratorn, eller boka kostnadsfri rådgivning och takkontroll på plats.",
    paragraphs: [
      "Välj taktyp, ange takets yta och lutning och få ett riktpris direkt. Vi lämnar alltid fast pris efter kostnadsfri takkontroll — med 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      "I offerten ingår allt som behövs för ett komplett takbyte: rivning och bortforsling av gamla taket, kontroll och byte av råspont och underlagspapp, ny strö- och bärläkt, valt tätskikt, kompletta plåtbeslag kring skorsten, ventiler och genomföringar, samt taksäkerhet i form av takstege, gångbrygga och nockfästen.",
      "Så går det till: du skickar in förfrågan, vi återkopplar inom 24 timmar och bokar en kostnadsfri takkontroll. På plats mäter vi taket, kontrollerar underlaget och pratar igenom materialval. Därefter får du en skriftlig offert med fast pris — det priset gäller, utan tillägg.",
      "När du accepterat offerten planerar vi startdatum, beställer material och håller dig uppdaterad genom hela projektet. Efter slutbesiktning får du garantihandlingar och foton från varje moment.",
      "Vanliga frågor om offerten: Är besiktningen verkligen gratis? Ja, besiktning och offert är alltid kostnadsfria och du förbinder dig inte till något. Hur länge gäller offerten? Normalt 30 dagar. Kan jag ändra materialval efter offerten? Ja, fram tills materialet är beställt justerar vi kostnadsfritt.",
      "Vi tar uppdrag i hela Roslagen och Storstockholm — från Norrtälje, Vaxholm och Österåker till Täby, Sollentuna, Nacka och öarna i skärgården. Även öar utan broförbindelse ingår, vi löser båttransporten som en del av projektet.",
      "Offerten specificerar alltid arbetskostnaden separat så att ROT-avdraget är tydligt. Vi sköter ansökan åt dig och drar av beloppet direkt på fakturan.",
      "Hur lång tid tar ett takbyte? Ett normalt villatak tar 1–3 veckor från att ställningen resas tills slutbesiktningen är klar, beroende på storlek, väder och underlagets skick. Fritidshus och enklare tak går ofta snabbare. Du får en tidsplan i offerten och löpande uppdateringar om något ändras.",
      "Vad händer om vi hittar skador under arbetet? Om råspont eller takstolar visar sig vara skadade stannar vi upp, dokumenterar med foton och återkommer med ett fast pris på tillägget innan vi fortsätter. Du får aldrig en överraskning på slutfakturan.",
      `Föredrar du att prata? Ring ${PHONE} och beskriv ditt takprojekt, vi återkopplar inom 24 timmar.`,
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/taktyper": {
    title: "Taktyper — plåttak, tegel och betongpannor",
    description:
      "Jämför TP20, pannplåt, tegelplåt, dubbelfalsat plåttak, lertegel, betongpannor och papptak — livslängd, kostnad och vad som passar ditt hus.",
    h1: "Taktyper — plåttak, tegel och betongpannor",
    intro:
      "Jämför taktyper inför ditt takbyte: TP20, pannplåt, tegelplåt, dubbelfalsat plåttak (bandtäckning), lertegel, betongpannor, glaserade pannor och papptak.",
    paragraphs: [
      "Plåttak är lätt, snabbt att montera och passar de flesta hus i kustnära klimat. Dubbelfalsad bandtäckning har längst livslängd (50+ år). Betongpannor och lertegel ger klassisk karaktär men kräver bärande konstruktion för högre vikt.",
      "Vi hjälper dig välja material utifrån husets konstruktion, taklutning, väderutsatthet och budget — och sköter transport till öar utan broförbindelse.",
      "TP20-plåttak: det populäraste valet för fritidshus och villor i Roslagen. Prisvärt, lätt (4–5 kg/m²) och håller 30–40 år med minimalt underhåll. Finns i många kulörer och monteras snabbt.",
      "Dubbelfalsat plåttak (bandtäckning): premiumvalet med falsade fogar utan synliga skruvar. Helt vattentätt även i storm och slagregn. Livslängd 50–70 år i stål, längre i aluminium och koppar.",
      "Tegelplåt och pannplåt: plåtprofiler som imiterar tegel och pannor. Traditionellt utseende med plåtens fördelar — lägre vikt, lägre pris och enklare transport till öar.",
      "Betongpannor: beprövat och prisvärt med 30–50 års livslängd. Passar de flesta hustyper på fastlandet. Kräver minst 22 graders taklutning och en konstruktion som tål 40–50 kg/m².",
      "Lertegel: det klassiska valet för äldre hus och kulturbyggnader. Kan hålla över 100 år och ger husets karaktär ett oersättligt uttryck.",
      "Papptak: för platta och låglutande tak på garage, tillbyggnader och funkishus. Modern SBS-papp håller 25–35 år när den läggs rätt.",
      "Osäker på vad som passar ditt hus? Boka en kostnadsfri takkontroll — vi tittar på konstruktion, lutning och läge och ger dig en ärlig rekommendation med fast pris.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/brf": {
    title: "Takbyte för BRF — bostadsrättsföreningar",
    description:
      "Takbyte, takbesiktning och serviceavtal för bostadsrättsföreningar i Storstockholm, Roslagen och Mälardalen. Fast pris, 10 års utförandegaranti, F-skatt och ansvarsförsäkring.",
    h1: "Takbyte för bostadsrättsföreningar, med underlag styrelsen kan besluta på",
    intro:
      "Från kostnadsfri takbesiktning och fast offert till slutbesiktning och garantibevis. Vi arbetar i Storstockholm, Roslagen och Mälardalen.",
    paragraphs: [
      "Ett takbyte är ett föreningsbeslut, inte bara ett hantverk. Vi bygger arbetet på tre underlag som går att spara och jämföra: besiktningsrapport med foton, fast offert och garantihandlingar efter slutbesiktning.",
      "Så går ett takbyte till i en förening: takbesiktning, åtgärdsförslag och fast offert, beslut i föreningen, planering tillsammans med styrelsen, genomförande med fotodokumentation samt slutbesiktning och garantibevis.",
      "Vi erbjuder takbyte och takrenovering samt serviceavtal med regelbunden takkontroll, rengöring och snöskottning. Upplägg och pris för serviceavtal anpassas efter föreningens byggnader.",
      "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI. RoslagsTak har F-skatt och ansvarsförsäkring.",
      "För de boende begränsar vi störningen genom att stämma av tidplan och ställning med styrelsen, skydda fasad och mark, städa löpande och ge föreningen en fast kontaktperson.",
      `Boka en kostnadsfri takbesiktning på /brf eller ring ${PHONE}. Vi återkommer inom 24 timmar.`,
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/hur-det-gar-till": {
    title: "Så går ett takbyte till — steg för steg",
    description:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager, med dokumentation och slutbesiktning.",
    h1: "Så går ett takbyte till — steg för steg",
    intro:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    paragraphs: [
      "Ordningen är råspont, underlagspapp, hängrännor och stuprör, vindskivor, ströläkt och bärläkt, takpannor eller plåt, samt avslutande plåtbeslag kring skorsten och genomföringar.",
      "Varje moment dokumenteras och kontrolleras. Du får löpande återkoppling under projektet och slutbesiktning innan vi lämnar arbetsplatsen.",
      "Steg 1 — besiktning och offert: vi inspekterar taket på plats, dokumenterar med foton och lämnar en skriftlig offert med fast pris inom några dagar. Kostnadsfritt och utan förbindelser.",
      "Steg 2 — planering och material: när du accepterat offerten bokar vi startdatum och beställer materialet. Du får en tidplan och en fast kontaktperson.",
      "Steg 3 — ställning och skydd: vi reser ställning, skyddar fasad, rabatter och utemöbler med presenningar och skyddsplast.",
      "Steg 4 — rivning: gamla taket rivs och sorteras för återvinning. Råsponten inspekteras — skador dokumenteras och prisas separat innan vi fortsätter.",
      "Steg 5 — underlag: ny underlagspapp, ströläkt och bärläkt läggs. Ventilationen kontrolleras och åtgärdas vid behov.",
      "Steg 6 — tätskikt och beslag: det nya taket monteras tillsammans med plåtbeslag kring skorsten, ventiler och genomföringar, plus taksäkerhet och takavvattning.",
      "Steg 7 — städning och slutbesiktning: vi städar tomten, går igenom hela arbetet tillsammans med dig och lämnar över garantihandlingar och fotodokumentation.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/priser": {
    title: "Vad kostar takbyte? Priser per m² 2026 — Roslagen",
    description:
      "Prislista för takbyte: TP20 från ca 1 200 kr/m², betongpannor och tegelplåt från ca 1 300 kr/m², dubbelfalsat från ca 2 000 kr/m². Fast pris efter takkontroll.",
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro:
      "Riktpriser för alla typer av takarbeten i Roslagen. Alla priser inkluderar material och arbete, och ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    paragraphs: [
      "TP20 plåttak från ca 1 200 kr/m². Tegelprofilerad plåt och betongpannor från ca 1 300–1 400 kr/m². Dubbelfalsat plåttak (bandtäckning) från ca 2 000 kr/m². Taktvätt 80–150 kr/m² och takmålning från ca 150 kr/m².",
      "Priset styrs av takets storlek, lutning, antal genomföringar samt underlagets skick. Vi lämnar alltid fast pris efter kostnadsfri takkontroll — inga dolda kostnader.",
      "Exempel: ett TP20-tak på 100 m² kostar från cirka 120 000 kr, 130 m² från cirka 156 000 kr och 160 m² från cirka 192 000 kr. Ett dubbelfalsat tak på 130 m² kostar från cirka 260 000 kr. Priserna är riktpriser — exakt pris får du efter besiktning.",
      "ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter hela ansökan och drar av beloppet direkt på fakturan, så du behöver aldrig ligga ute med pengarna.",
      "Faktorer som påverkar priset: takets lutning och komplexitet, antal genomföringar som skorstenar och takkupor, underlagets skick, samt logistik — på öar utan bro tillkommer båttransport. Allt specificeras i offerten innan arbetet börjar.",
      "Vill du jämföra taktyper? På sidan Taktyper ser du livslängd, underhållsbehov och vad som passar just ditt hus. I bloggen hittar du fördjupande prisguider för 2026.",
      "Så budgeterar du smart: boka besiktningen tidigt så hinner du jämföra materialalternativ i lugn takt. Överväg att samordna takbytet med byte av vindskivor, hängrännor eller taksäkerhet — marginalkostnaden blir lägre när ställningen ändå står uppe. Och glöm inte att ROT-avdraget gäller per person, två delägare kan alltså få upp till 100 000 kr tillsammans.",
      "Alla priser på sidan är riktpriser baserade på våra utförda projekt i Roslagen och Storstockholm. Exakt pris för ditt tak får du alltid skriftligt efter den kostnadsfria takkontrollen.",
      "Vad ingår i kvadratmeterpriset? Rivning och bortforsling av gamla taket, underlagspapp, strö- och bärläkt, tätskikt i valt material, plåtbeslag kring skorsten och genomföringar, taksäkerhet och städning. Det enda som kan tillkomma är skador på råspont eller takstolar som inte går att se förrän gamla taket är rivet — då stannar vi upp och prisar tillägget separat innan vi fortsätter.",
      "Jämför du offerter från flera firmor? Titta på vad som faktiskt ingår, inte bara totalsumman. Fråga efter garantitider, om beslag och taksäkerhet ingår, och om priset är fast eller ett ungefärligt upplägg.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/recensioner": {
    title: "Recensioner — läs kundernas omdömen på Google",
    description:
      "Läs vad kunder i Roslagen och Stockholms skärgård säger om RoslagsTak — alla omdömen finns att läsa direkt på Google.",
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Omdömen från kunder i Roslagens skärgård — Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö och fler orter.",
    paragraphs: [
      "Vi samlar våra omdömen på Google istället för att publicera egenskrivna recensioner här på sajten. Det gör att du kan läsa omdömena i original, skrivna av verifierade kunder, direkt i vår Google-företagsprofil.",
      "Följ länken till Google för att se aktuella omdömen, stjärnbetyg och bilder från utförda takprojekt. Har du själv anlitat oss får du gärna lämna ett omdöme — det hjälper andra husägare i Roslagen att välja takläggare.",
      "Det vi hör oftast från kunderna: att kommunikationen är tydlig från första kontakten, att priset som avtalats är det som faktureras, och att plåtarbetet utförs med noggrannhet. Många lyfter också att vi löser materialtransport till öar utan broförbindelse som en självklar del av projektet.",
      "Vi utför takbyte, takrenovering, plåtarbeten och takvård i hela Roslagen och Storstockholm. Besiktning och offert är alltid kostnadsfria, och du får 10 års utförandegaranti på allt arbete.",
      "Så kan du själv bedöma en takfirma: be om referenser från projekt i din närhet, kontrollera att företaget har ansvarsförsäkring och F-skatt, och be att få garantierna skriftligt i offerten. Ett seriöst företag lämnar alltid fast pris efter besiktning — aldrig ett pris per telefon.",
      "Vill du veta mer om hur vi arbetar innan du bestämmer dig? Läs om vår process steg för steg, våra riktpriser eller boka en kostnadsfri rådgivning där vi går igenom ditt tak tillsammans.",
      "Därför väljer vi att länka till Google istället för att skriva egna omdömen: omdömen på Google kan inte redigeras eller plockas bort av oss, vilket gör dem mer trovärdiga än citat på en egen hemsida. Där ser du hela bilden — både betyg, texter och hur vi svarar.",
      "Vi bygger kontinuerligt upp våra omdömen i takt med att projekt slutförs. Varje kund får efter slutbesiktningen en förfrågan om att dela sin upplevelse — helt frivilligt och utan någon form av ersättning.",
    ],
    links: [...primaryLinks, ...locationLinks.slice(0, 24)],
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
      "Vi erbjuder kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm, inklusive öar utan broförbindelse. Du når oss enklast på telefon eller via formuläret — beskriv gärna takets storlek, material och vad du vill ha hjälp med.",
      "När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för besiktning som passar dig, tittar på taket tillsammans med dig om du vill, och lämnar därefter en skriftlig offert med fast pris.",
      "Vi tar uppdrag i hela Roslagen — Norrtälje, Österåker, Vaxholm, Östhammar och alla öar — samt i hela Storstockholm från Täby och Sollentuna till Nacka och Södertälje.",
      "Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser), hur lång tid tar det (normalt 1–3 veckor beroende på storlek och väder) och kan man bo kvar under arbetet (ja, i de flesta fall).",
      `Telefon: ${PHONE}. Du kan också mejla via formuläret på sidan — ange adress så återkommer vi med förslag på besiktningstid.`,
      "Inför besiktningen behöver du inte förbereda något särskilt, men det underlättar om du vet ungefär hur stort taket är, vilket material det har idag och om du märkt några specifika problem som fläckar eller läckage. Vi tar med all mätutrustning och dokumenterar taket med foton som du får ta del av.",
      "Efter besiktningen får du en skriftlig offert med fast pris och tydlig specifikation av vad som ingår — rivning, underlag, tätskikt, beslag, taksäkerhet och städning. Du bestämmer i din egen takt, utan påtryckningar.",
      "Välkommen att höra av dig oavsett om du planerar ett takbyte i år, funderar på taktvätt eller bara vill ha en bedömning av takets skick.",
      "För dig på en ö utan bro: vi besöker regelbundet Blidö, Yxlan, Ljusterö, Husarö, Finnhamn, Ingmarsö, Svartlöga, Arholma och fler öar. Berätta var fastigheten ligger och hur den nås så planerar vi besiktningen därefter — båttransport är en del av vår vardag.",
      "Akta läckage? Om taket läcker just nu — ring direkt istället för att fylla i formuläret. Vi prioriterar akuta läckage och kan ofta komma ut för en provisorisk tätning inom kort.",
    ],
    links: primaryLinks,
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
      "Takrenovering på Blidö: nya betongpannor från Benders i svart, sommaren 2026.",
      "Takbyte på Singö, Grisslehamn: betongpannor på huvudtaket och TP20-plåt på de lägre takdelarna, september 2026.",
    ],
    links: [...primaryLinks, { href: "/projekt/takrenovering-blido", label: "Takrenovering på Blidö" }, { href: "/projekt/takbyte-singo", label: "Takbyte på Singö" }],
  },
  "/takproblem": {
    title: "Takproblem – tecken, orsaker och vad du gör",
    description:
      "Läcker taket, mossa, fukt på vinden eller istappar? Här är de vanligaste takproblemen, hur du känner igen dem och när det är dags att ringa en takläggare.",
    h1: "Vanliga takproblem – så känner du igen dem",
    intro:
      "Ett tak säger sällan ifrån förrän skadan har pågått ett tag. Här har vi samlat de vanligaste takproblemen villaägare upptäcker.",
    paragraphs: problemSummaries.map((p) => `${p.title}: ${p.intro}`),
    links: [...primaryLinks, ...problemSummaries.map((p) => ({ href: `/takproblem/${p.slug}`, label: p.title }))],
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
      "Taktvätt kostar normalt 80–150 kr/m² och takmålning från ca 150 kr/m² inklusive grundning och två strykningar. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
};

const serviceIntro = (title: string, description: string): PrerenderPage => ({
  title: `${title} i Roslagen & Storstockholm`,
  description:
    `${description} Fast pris efter kostnadsfri takkontroll, 10 års garanti. Ring ${PHONE}.`.slice(
      0,
      158,
    ),
  h1: `${title} i Roslagen`,
  intro: description,
  paragraphs: [
    `RoslagsTak utför ${title.toLowerCase()} i hela Roslagen och Stockholms norra skärgård. Allt arbete utförs enligt AMA-standard av certifierade takläggare, med 10 års garanti.`,
    "Vi lämnar fast pris efter kostnadsfri takkontroll och hanterar all logistik — även till öar utan broförbindelse. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    `Ring ${PHONE} eller begär kostnadsfri offert — vi återkopplar inom 24 timmar.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks.slice(0, 24)],
});

/** Important on-page text for a route, or null when the route has no prerender. */
const prerenderContentRaw = (path: string): PrerenderPage | null => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();

  if (staticPages[clean]) return staticPages[clean];

  if (clean.startsWith("/tjanster/")) {
    const slug = clean.slice("/tjanster/".length);
    const service = services.find((s) => s.slug === slug);
    return service ? serviceIntro(service.title, service.description) : null;
  }

  if (clean.startsWith("/takproblem/")) {
    const problem = problemSummaries.find((p) => p.slug === clean.slice("/takproblem/".length));
    if (!problem) return null;
    return {
      title: problem.metaTitle,
      description: problem.metaDescription,
      h1: problem.title,
      intro: problem.intro,
      paragraphs: problem.paragraphs,
      links: [...primaryLinks, { href: "/takproblem", label: "Alla takproblem" }, { href: "/takkontroll", label: "Kostnadsfri takkontroll" }],
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
      paragraphs: post.content,
      links: [
        ...primaryLinks,
        ...blogPosts
          .filter((p) => p.slug !== post.slug)
          .slice(0, 8)
          .map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
      ],
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
    return {
      title: `Takläggare i ${region}`,
      description: `Takbyte, takrenovering och plåtarbeten i ${region} — ${places.length} orter. Fast pris efter kostnadsfri takkontroll, 10 års garanti. Ring ${PHONE}.`,
      h1: `Takläggare i ${region}`,
      intro: regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      paragraphs: [
        ...(regionLongText[region] ?? []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...places.map((l) => ({
          href: `/taklaggare-${l.slug}`,
          label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
        })),
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
      description: `Takbyte, takbesiktning och serviceavtal för bostadsrättsföreningar ${prep} ${loc.name}. Fast pris efter kostnadsfri besiktning, 10 års utförandegaranti, F-skatt och ansvarsförsäkring.`,
      h1: `Takbyte för bostadsrättsföreningar ${prep} ${loc.name}, med underlag styrelsen kan besluta på`,
      intro: `Från kostnadsfri takbesiktning och fast offert till slutbesiktning och garantibevis. Vi tar uppdrag ${prep} ${loc.name} och närområdet.`,
      paragraphs: [
        `För en bostadsrättsförening ${prep} ${loc.name} börjar ett takbyte med en kostnadsfri besiktning, följd av en skriftlig offert med fast pris som styrelsen och stämman kan besluta på.`,
        "Vi erbjuder takbyte, takrenovering och serviceavtal med regelbunden takkontroll, rengöring och snöskottning. Efter slutbesiktning lämnar vi garantibevis och fotodokumentation.",
        `Ring ${PHONE} eller boka besiktning på /brf/${loc.slug}. Vi återkommer inom 24 timmar.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/brf", label: "BRF & fastigheter" },
        { href: `/taklaggare-${loc.slug}`, label: `Takläggare ${prep} ${loc.name}` },
      ],
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const loc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    return {
      title: ortSeoOverrides[loc.slug]?.title ?? `Takläggare ${prep} ${loc.name} — Takbyte & Takrenovering`,
      description: ortSeoOverrides[loc.slug]?.description ?? (loc.isIsland
        ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Skärgårdsspecialist, fast pris efter besiktning, 10 års utförandegaranti och kostnadsfri offert.`
        : isNearBase(loc)
          ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Lokal takläggare, fast pris efter besiktning, 10 års utförandegaranti och kostnadsfri offert.`
          : `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Fast pris efter besiktning, 10 års utförandegaranti och kostnadsfri offert.`),
      h1: `Takläggare ${prep} ${loc.name} — takbyte, takrenovering & plåtarbeten`,
      intro: loc.description,
      paragraphs: [
        loc.longDescription,
        loc.extraContent,
        `${loc.uniqueFAQ.question} ${loc.uniqueFAQ.answer}`,
        `Ring ${PHONE} för kostnadsfri takkontroll och offert ${prep} ${loc.name}.`,
      ],
      links: [
        ...primaryLinks,
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
    };
  }

  const combo = comboByUrl.get(clean);
  if (combo) {
    const override = combo.serviceSlug === "takbyte" ? comboOverrides[combo.locationSlug] : undefined;
    return {
      title: override?.title ?? `${combo.serviceName} ${combo.prep} ${combo.locationName} — Fast pris & garanti`,
      description: override?.description ?? combo.description,
      h1: `${combo.serviceName} ${combo.prep} ${combo.locationName} — fast pris & 10 års garanti`,
      intro: override?.description ?? combo.description,
      paragraphs: override?.content ?? combo.content,
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
