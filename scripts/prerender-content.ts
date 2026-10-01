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
import { stripInlineMd, inlineMdLinks } from "../src/lib/inline-md";
import { relatedForPost } from "../src/data/blog-related";

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

const villaAreaLinks = (key: string) =>
  (villaAreasByPage[key]?.areas ?? [])
    .filter((a) => a.href)
    .map((a) => ({ href: a.href!, label: `Takläggare i ${a.name}` }));
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
  /** Sidspecifik delningsbild för den statiska HTML:en (og:image/twitter:image), t.ex. ett
   *  projektfoto eller en materialbild — en STABIL sökväg under public/ (aldrig en Vite-import,
   *  det här scriptet körs via esbuild utan Vite:s tillgångsupplösning). Mirrors SEOHead. */
  ogImage?: string;
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
      "Huset ligger i skogen på Blidö i Norrtälje kommun. Uppdraget var ett komplett takbyte, från underlag till avvattning.",
      "Nytt ytmaterial är betongpannor från Benders i svart.",
      "Nytt underlag, ny läkt, nya betongpannor, nya plåtdetaljer, nya skorstensbeslag och nya hängrännor. Den befintliga råsponten behölls.",
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
      "Huset ligger på Singö i Grisslehamn, Norrtälje kommun, med utsikt över fjärden. Uppdraget var ett komplett takbyte.",
      "Två material i samma röda kulör: betongpannor på huvudtaket och TP20, en trapetsprofilerad plåt, på de lägre delarna.",
      "Komplett takbyte, inklusive byte av delar av råsponten. Resten av råsponten behölls.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke, även på startsidan.",
    ],
    ogImage: "/og/project-singo-hero.jpg",
    ogImageAlt: "Nytt tak på Singö i Grisslehamn med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, med utsikt över fjärden.",
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
  {
    slug: "stormskador-pa-taket",
    title: "Stormskador på taket",
    metaTitle: "Stormskador på taket – vad du gör efter blåsten",
    metaDescription:
      "Lösa eller avblåsta pannor och plåt efter en storm? Så bedömer du läget från marken, dokumenterar skadan och får taket kontrollerat.",
    intro:
      "Efter en storm är det lätt att se om ett träd har fallit, men skador på taket syns inte alltid lika tydligt — en panna som flyttat sig eller en plåt som lyft i kanten kan släppa in vatten redan vid nästa regn.",
    paragraphs: [
      "Symptom: pannor som saknas, ligger snett eller har glidit ner mot takfoten, bitar av pannor eller plåt på marken. Nockpannor som lossnat. Plåt som lyft, vikts upp eller släppt i kanten. Hängrännor eller stuprör som lossnat eller böjts.",
      "Vanliga orsaker: kraftig vind skapar ett sug på taket, särskilt vid kanter, hörn och nock, som kan lyfta pannor och plåt som redan sitter löst. Nedfallande grenar och föremål kan också slå sönder pannor eller skada ytbehandlingen.",
      "Åtgärder som används: byte eller omläggning av lösa och trasiga pannor, nya eller omfästa nockpannor, nya plåtdetaljer och omfästning eller byte av hängrännor. Är taket i övrigt uttjänt kan ett takbyte vara bättre än att laga det som blåste loss.",
    ],
  },
  {
    slug: "lackage-vid-takfonster-och-genomforingar",
    title: "Läckage vid takfönster och genomföringar",
    metaTitle: "Läckage vid takfönster, ventilation och avluftning",
    metaDescription:
      "Fukt runt takfönstret eller vid ventilationsröret? Så hittar du var vattnet kommer in, vad du gör själv och när anslutningen mot taket behöver ses över.",
    intro:
      "Överallt där något går igenom taket finns en skarv som ska vara tät: runt takfönster, ventilationshuvar, avluftning och antennfästen. De här anslutningarna är utsatta, eftersom vatten, snö och is samlas just där taket bryts.",
    paragraphs: [
      "Symptom: fuktfläckar eller missfärgning i innertaket runt ett takfönster eller under ett ventilationsdon. På vinden syns fukt, mörka ränder eller droppmärken på råsponten och isoleringen runt rör och kanaler som går upp genom taket.",
      "Vanliga orsaker: plåten eller manschetten som sluter tätt mellan genomföringen och takytan har släppt, rostat eller spruckit. Runt takfönster kan anslutningsplåten vara fel monterad eller skadad. Ibland är det i stället kondens från en dåligt isolerad ventilationskanal, som ser ut som ett läckage men har en annan orsak.",
      "Åtgärder som används: ny eller omlagd plåt och tätning runt genomföringen, omläggning av pannorna närmast och ny anslutningsplåt runt takfönstret där den är skadad. Är taket i övrigt uttjänt kan ett takbyte vara bättre än att laga en genomföring i taget.",
    ],
  },
  {
    slug: "svackor-i-taket",
    title: "Svackor eller buktande tak",
    metaTitle: "Svackor i taket – vad buktande takytor kan tyda på",
    metaDescription:
      "Syns en svacka eller en buktning i takytan? Så kan den uppstå, varför den ska kontrolleras och vad du kan titta efter från marken och från vinden.",
    intro:
      "Ett tak ska ha raka linjer: en rak nock, jämna takfall och raka takfötter. När takytan i stället sjunker in i en svacka eller buktar är det ett tecken på att något under ytmaterialet har förändrats, i underlaget eller i den bärande konstruktionen.",
    paragraphs: [
      "Symptom: en synlig svacka eller våg i takytan, ofta tydligast i motljus eller när snö ligger kvar ojämnt. En nock som sjunker på mitten. På vinden kan det synas böjda, spruckna eller fuktskadade takstolar och brädor, eller mjuk och mörk råspont.",
      "Vanliga orsaker: råspont eller läkt som har blivit mjuk av fukt under lång tid, takstolar som skadats av fukt eller belastats hårdare än de är gjorda för, eller äldre ombyggnader där bärande delar har ändrats.",
      "Åtgärder som används: beror helt på orsaken. Är det underlaget kan skadade delar av råsponten och läkten bytas, ofta i samband med ett takbyte. Är det takstolarna kan de behöva förstärkas eller bytas efter en konstruktörs bedömning.",
    ],
  },
  {
    slug: "lackande-ranndal",
    title: "Läckande ränndal",
    metaTitle: "Läckande ränndal – tecken, orsaker och vad du gör",
    metaDescription:
      "Fukt där två takfall möts? Så känner du igen ett läckage i ränndalen, vad det kan bero på och när ränndalen behöver göras om. Kostnadsfri takkontroll.",
    intro:
      "En ränndal är den inåtvända vinkeln där två takfall möts, till exempel där en tillbyggnad eller en kupa ansluter mot huvudtaket. Allt vatten från båda takfallen samlas där och rinner ner längs ränndalen, och därför är den en av takets mest belastade delar. Här går vi igenom hur ett läckage i ränndalen visar sig, vad det kan bero på och vad du kan göra innan taket kontrolleras.",
    paragraphs: [
      "Symptom: Fuktfläckar i innertaket eller på väggen under den del av taket där två takfall möts. På vinden syns mörka ränder, droppmärken eller fukt på råsponten längs ränndalens linje. Utifrån kan du se löv, barr och mossa som har samlats i ränndalen, pannor som ligger snett eller har glidit ner i den, eller plåt som ser rostig, bucklig eller lös ut. Läckaget märks ofta mest vid kraftigt regn eller när snö och is smälter, eftersom vattenmängden i ränndalen då är som störst.",
      "Vanliga orsaker: Ränndalsplåten har rostat, spruckit eller fått hål, eller skarvarna i den har släppt. Löv, barr och skräp har bildat en damm som tvingar vattnet åt sidan och in under pannorna. Pannorna närmast ränndalen är fel kapade eller ligger för långt ut eller för långt in, så att vattnet inte leds ner i plåten. Is som bildas i ränndalen kan lyfta vatten över plåtens kant. Under plåten kan underlaget ha åldrats, så att vatten som tar sig förbi inte längre stoppas.",
      "När är det akut? När vatten droppar in, när fukten når isolering eller elinstallationer, eller när fläckarna växer för varje regn. Samla då upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. Ett läckage i ränndalen fortsätter ofta att växa, eftersom så mycket vatten passerar just där, så även en liten fläck ska kontrolleras.",
      "Så undersöks det: Vid takkontrollen tittar vi på taket på plats: ränndalsplåtens skick och skarvar, hur pannorna närmast ränndalen ligger och om skräp eller is hindrar vattnet. Där vinden går att komma åt följs fuktspåren längs ränndalen därifrån, eftersom vattnet kan rinna en bit innan det syns. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
      "Åtgärder som används: Rensning av ränndalen när det bara är skräp som dämmer. Justering eller omläggning av pannorna närmast ränndalen. Ny ränndalsplåt när den gamla har rostat eller spruckit, och då ofta även nytt underlag i ränndalen, eftersom pannorna ändå måste lyftas. Är taket i övrigt uttjänt, med slitet underlag och flera svaga punkter, kan ett takbyte vara bättre än att göra om ränndalen för sig. Vid ett takbyte görs alla ränndalar om.",
      "Gör inte själv: Gå inte upp på taket för att rensa eller laga ränndalen. Den ligger ofta högt och i en vinkel där det är lätt att halka, och pannorna runt den kan sitta löst. Du kan titta från marken, med kikare eller mobilkamerans zoom, fota fuktspåren på vinden och notera när det läcker: vid regn, snösmältning eller blåst.",
    ],
  },
  {
    slug: "ruttna-vindskivor-och-takfot",
    title: "Ruttna vindskivor eller takfotsbrädor",
    metaTitle: "Ruttna vindskivor och takfot – tecken och åtgärder",
    metaDescription:
      "Flagnande färg, mjukt trä eller mörka fläckar på vindskivor och takfot? Så hittar du orsaken, vad du gör själv och när det hänger ihop med taket.",
    intro:
      "Vindskivorna sitter längs takets gavlar och takfotsbrädorna längs takets nedre kant. De skyddar takets kanter mot väder och vind och ger huset dess avslutning. Eftersom de sitter ytterst får de ta emot mycket regn, sol och fukt. När träet börjar ruttna är det ofta ett tecken på att vatten har kommit dit det inte ska, och ibland ligger orsaken uppe på taket.",
    paragraphs: [
      "Symptom: Färg som flagnar eller släpper i flagor, trä som har mörknat, spruckit eller känns mjukt där du säkert når det från marken eller från ett fönster. Brädor som har släppt, bågnar eller har glipor i skarvarna. Mossa, alger eller svarta fläckar på träet. Under takfoten kan du ibland se droppmärken eller fuktränder på fasaden. På vinden kan det finnas fukt eller mörk råspont närmast takfoten eller gaveln.",
      "Vanliga orsaker: Vatten som rinner över kanten när hängrännorna är igensatta eller lutar fel. Fotplåt eller vindskiveplåt som saknas, har släppt eller är för kort, så att vatten kommer åt träets ändar. Ett läckage längre upp på taket där vattnet följer underlaget ner till takfoten. Is som bildas vid takfoten och tvingar smältvatten in under pannorna. Färg som har åldrats så att träet inte längre skyddas, eller kontakt med växtlighet som håller kvar fukten.",
      "När är det akut? När brädor har släppt och kan falla ner, när vatten kommer in på vinden eller i väggen, eller när rötan har gått så långt att takets kant inte längre sitter stadigt. Spärra då av under den skadade delen och kontakta en takläggare. En vindskiva som bara har flagnande färg är sällan akut, men den ska målas eller ses över innan träet hinner ta skada.",
      "Så undersöks det: Vid takkontrollen tittar vi på taket på plats: vindskivor och takfotsbrädor, fotplåt och vindskiveplåt, hängrännornas skick och lutning och om pannorna närmast kanten ligger som de ska. Där vinden går att komma åt syns därifrån om råspont eller takfot har blivit fuktig. Syftet är att hitta var vattnet kommer ifrån, så att inte bara brädan byts medan orsaken finns kvar.",
      "Åtgärder som används: Byte av ruttna vindskivor och takfotsbrädor, gärna med ny vindskiveplåt eller fotplåt som skyddar träets kanter. Rensning, justering eller byte av hängrännor om de är orsaken. Om vatten kommer från taket ska det läckaget åtgärdas samtidigt, och skadad råspont närmast kanten kan behöva bytas. Vid ett takbyte ses vindskivor, takfot och plåtdetaljer över som en del av arbetet.",
      "Gör inte själv: Arbete på hög stege eller uppe på taket vid takfoten. Kanten är den plats där fallrisken är störst, och ruttet trä kan släppa när du belastar det. Du kan fota skadorna från marken, hålla hängrännorna fria där du säkert når dem från marken och notera var på huset rötan sitter. Det hjälper till att hitta orsaken.",
    ],
  },
];

/**
 * Textspegling av de posterna i src/data/materials.ts som har en egen sida (`detail` satt) —
 * lertegel och dubbelfalsat länkar till sina befintliga tjänstesidor och behöver ingen spegling.
 */
const materialSummaries = [
  {
    slug: "betongpannor",
    href: "/material/betongpannor",
    title: "Betongpannor",
    metaTitle: "Betongpannor – egenskaper, för- och nackdelar",
    metaDescription:
      "Betongpannor är ett vanligt val på svenska villatak. Så fungerar de, vad som talar för och emot och vad du ska tänka på vid ett takbyte.",
    intro:
      "Betongpannor är ett av de vanligaste takmaterialen på svenska villor — tåliga och klassiska i uttrycket, men tunga nog att kräva en konstruktion som klarar vikten.",
    paragraphs: [
      "Funktion: pannor av betong som läggs på bärläkt över ströläkt och underlag. Pannorna leder bort vattnet, och underlaget är det andra skyddet.",
      "Fördelar: klassiskt pannat utseende, finns i flera kulörer, tåligt material, enskilda pannor kan bytas. Nackdelar: tunga, så takstolarna måste klara vikten.",
      "Passar när du vill ha ett traditionellt pannat tak och huset tål vikten. Vanligt vid byte från äldre pannor.",
    ],
    ogImage: "/og/material-betongpannor.jpg",
    ogImageAlt: "Närbild på svart betongpannetak med vågprofil",
  },
  {
    slug: "tp20-plattak",
    href: "/material/tp20-plattak",
    title: "TP20-plåttak",
    metaTitle: "TP20 plåttak – egenskaper, för- och nackdelar",
    metaDescription:
      "TP20 är en trapetsprofilerad takplåt. Så fungerar den, var den passar och vad du ska tänka på jämfört med pannor och falsat.",
    intro:
      "TP20 är en trapetsprofilerad takplåt — lätt, snabb att lägga och ett vanligt val på villor, fritidshus och lägre takdelar.",
    paragraphs: [
      "Funktion: trapetsprofilerad plåt i långa längder som skruvas på läkt över underlag. Profilen ger styvhet och leder bort vattnet.",
      "Fördelar: lätt jämfört med pannor, snabb att lägga, finns i flera kulörer, fungerar på lägre lutningar. Nackdelar: skruvar och skarvar måste sitta rätt och kontrolleras.",
      "Passar när du vill ha ett lätt tak, har låg lutning eller vill ha plåttakets uttryck, eller på lägre takdelar i kombination med pannor.",
    ],
    ogImage: "/og/material-tp20-plattak.jpg",
    ogImageAlt: "Närbild på trapetsprofilerad TP20-plåt",
  },
  {
    slug: "papptak",
    href: "/material/papptak",
    title: "Papptak",
    metaTitle: "Papptak – takpapp för låglutande tak, för- och nackdelar",
    metaDescription:
      "Papptak är ett lätt och tätt tak för flacka och låglutande tak. Så fungerar takpapp, när den passar och vad du ska tänka på vid omläggning.",
    intro:
      "Papptak är ett tätt, lätt tak av takpapp och ett av få material som fungerar på riktigt flacka tak. Du hittar det på garage, carportar, uthus och tillbyggnader, men också på hus med låg taklutning.",
    paragraphs: [
      "Funktion: en duk av glasfiber eller polyester som impregnerats och belagts med bitumen, och som läggs i våder som överlappar varandra på ett fast underlag, oftast råspont. Ytpappen har ofta ett skikt av skiffer eller granulat som skyddar mot UV-ljus.",
      "Fördelar: lätt material som inte belastar takstolarna, fungerar på flacka tak där andra material inte kan användas. Nackdelar: hela tätheten hänger på skarvarna och anslutningarna, och ytan sliter av sol och stående vatten.",
      "Passar när taket är flackt eller har låg lutning, byggnaden är lätt i konstruktionen (garage, carport, uthus, tillbyggnad), eller huset har papptak i dag och ska få ett nytt tätt tak av samma slag.",
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
    "RoslagsTak är takläggare i Roslagen. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års utförandegaranti och ROT-avdrag.",
    paragraphs: [
      "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåt, pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA-standard av certifierade takläggare.",
      "Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Båda finns med bilder under Projekt.",
      "Sedan 2026 arbetar vi även i hela Storstockholm — från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Samma fasta priser, samma garanti och samma kontaktperson genom hela projektet.",
      "Ett komplett takbyte hos oss innehåller allt: rivning av gamla taket, byte av råspont och underlagspapp vid behov, ny läkt, tätskikt, plåtbeslag kring skorsten och genomföringar, taksäkerhet. Du får en kontaktperson som följer projektet från takkontroll till slutgenomgång.",
      "Du får garantihandlingar skriftligt: 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
      // Om oss-sektionen (components/About.tsx, #1z) — samma text som React
      "Om RoslagsTak. Ett tak som håller, och en kontaktperson som svarar.",
      "RoslagsTak byter och lägger om tak på villor och fritidshus i Roslagen, Storstockholm och Mälardalen. Vi lägger betongpannor, lertegel, TP20-plåt, dubbelfalsat plåttak och papptak, och gör takomläggningar, takreparationer och plåtarbeten. Allt arbete utförs enligt AMA, och du får alltid ett fast pris.",
      "Det som gör skillnad för dig som kund är att du har en och samma kontaktperson genom hela processen, från takkontrollen till färdigt tak. Takkontrollen är kostnadsfri och utan förpliktelser: en av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar, och behöver något göras får du en offert med fast pris där det framgår vad som ingår. Du bestämmer själv om och när.",
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
      "Vad händer om vi hittar skador under arbetet? Skadad råspont syns först när det gamla taket är rivet. Då kontaktar vi dig och specificerar tillägget innan vi fortsätter.",
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
    links: [...primaryLinks, ...serviceLinks],
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
      "Steg 1 — takkontroll och offert: vi går igenom taket på plats och lämnar en skriftlig offert med fast pris. Kostnadsfritt och utan förpliktelser.",
      "Steg 2 — planering och material: när du accepterat offerten planerar vi arbetet tillsammans med dig och beställer materialet. Du har en fast kontaktperson.",
      "Steg 3 — ställning och skydd: ställningen reses innan arbetet börjar.",
      "Steg 4 — rivning: gamla taket rivs. Råsponten kontrolleras, och skadad råspont specificeras som tillägg innan vi fortsätter.",
      "Steg 5 — underlag: ny underlagspapp, ströläkt och bärläkt läggs.",
      "Steg 6 — tätskikt och beslag: det nya taket monteras tillsammans med plåtbeslag kring skorsten, ventiler och genomföringar, plus taksäkerhet och takavvattning.",
      "Steg 7 — slutgenomgång: vi går igenom hela arbetet tillsammans med dig. Garantin står skriftligt i avtalet.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/priser": {
    title: "Vad kostar takbyte? Fast pris 2026 — Roslagen",
    description:
      "Vad kostar ett takbyte i Roslagen? Fast pris efter kostnadsfri takkontroll, oavsett material — TP20, betongpannor, tegel eller dubbelfalsat plåttak.",
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro:
      "Fast pris efter kostnadsfri takkontroll för alla typer av takarbeten i Roslagen. Alla priser inkluderar material och arbete, och ROT-avdrag på 30 % av arbetskostnaden.",
    paragraphs: [
      "Vi lägger TP20 plåttak, tegelprofilerad plåt, betongpannor, dubbelfalsat plåttak (bandtäckning) och lertegel, samt utför taktvätt och takmålning. Exakt pris beror på material, takets storlek och skick.",
      "Priset styrs av takets storlek, lutning, antal genomföringar samt underlagets skick. Vi lämnar alltid fast pris efter kostnadsfri takkontroll — inga dolda kostnader.",
      "Vi går igenom taket, mäter och bedömer skicket vid takkontrollen, och du får ett skriftligt fast pris innan något arbete börjar. Priset gäller sedan hela vägen, oavsett husets storlek eller materialval.",
      "ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter hela ansökan och drar av beloppet direkt på fakturan, så du behöver aldrig ligga ute med pengarna.",
      "Faktorer som påverkar priset: takets lutning och komplexitet, antal genomföringar som skorstenar och takkupor, underlagets skick, samt hur huset nås. Allt specificeras i offerten innan arbetet börjar.",
      "Vill du jämföra taktyper? På sidan Taktyper ser du livslängd, underhållsbehov och vad som passar just ditt hus. I bloggen hittar du fördjupande guider för 2026.",
      "Så budgeterar du smart: boka takkontrollen tidigt så hinner du jämföra materialalternativ i lugn takt. Överväg att samordna takbytet med byte av vindskivor, hängrännor eller taksäkerhet — marginalkostnaden blir lägre när ställningen ändå står uppe. Och glöm inte att ROT-avdraget gäller per person, två delägare kan alltså få upp till 100 000 kr tillsammans.",
      "Alla priser är fasta priser, satta efter en kostnadsfri takkontroll på plats — aldrig innan. Exakt pris för ditt tak får du alltid skriftligt efter kontrollen.",
      "Vad ingår i priset? Rivning och bortforsling av gamla taket, underlagspapp, strö- och bärläkt, tätskikt i valt material, plåtbeslag kring skorsten och genomföringar, taksäkerhet och städning. Det enda som kan tillkomma är skador på råspont eller takstolar som inte går att se förrän gamla taket är rivet — då stannar vi upp och prisar tillägget separat innan vi fortsätter.",
      "Jämför du offerter från flera firmor? Titta på vad som faktiskt ingår, inte bara totalsumman. Fråga efter garantitider, om beslag och taksäkerhet ingår, och om priset är fast eller ett ungefärligt upplägg.",
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
      "Läs RoslagsTaks omdömen direkt på Google, i original och skrivna av kunderna själva.",
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Våra omdömen finns på Google, där du kan läsa dem i original.",
    paragraphs: [
      "Vi samlar våra omdömen på Google istället för att publicera egenskrivna recensioner här på sajten. Det gör att du kan läsa omdömena i original, skrivna av verifierade kunder, direkt i vår Google-företagsprofil.",
      "Följ länken till Google för att se aktuella omdömen och stjärnbetyg. Har du själv anlitat oss får du gärna lämna ett omdöme — det hjälper andra husägare i Roslagen att välja takläggare.",
      "Vi utför takbyte, takrenovering, plåtarbeten och takvård i hela Roslagen och Storstockholm. Takkontroll och offert är alltid kostnadsfria, och du får 10 års utförandegaranti på allt arbete.",
      "Så kan du själv bedöma en takfirma: be om referenser från projekt i din närhet, kontrollera att företaget har ansvarsförsäkring och F-skatt, och be att få garantierna skriftligt i offerten. Ett seriöst företag lämnar alltid fast pris efter kostnadsfri takkontroll — aldrig ett pris per telefon.",
      "Vill du veta mer om hur vi arbetar innan du bestämmer dig? Läs om vår process steg för steg, våra riktpriser eller boka en kostnadsfri rådgivning där vi går igenom ditt tak tillsammans.",
      "Därför väljer vi att länka till Google istället för att skriva egna omdömen: omdömen på Google kan inte redigeras eller plockas bort av oss, vilket gör dem mer trovärdiga än citat på en egen hemsida. Där ser du hela bilden — både betyg, texter och hur vi svarar.",
      "Vi bygger kontinuerligt upp våra omdömen i takt med att projekt slutförs. Att lämna ett omdöme är helt frivilligt och sker utan någon form av ersättning.",
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
      "Vi erbjuder kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm, också på öar i skärgården. Du når oss enklast på telefon eller via formuläret — beskriv gärna takets storlek, material och vad du vill ha hjälp med.",
      "När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för takkontroll som passar dig, tittar på taket tillsammans med dig om du vill, och lämnar därefter en skriftlig offert med fast pris.",
      "Vi tar uppdrag i hela Roslagen — Norrtälje, Österåker, Vaxholm, Östhammar och alla öar — samt i hela Storstockholm från Täby och Sollentuna till Nacka och Södertälje.",
      "Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser), hur lång tid tar det (det beror på takets storlek, underlagets skick och väder) och kan man bo kvar under arbetet (ja, i de flesta fall).",
      `Telefon: ${PHONE}. Du kan också mejla via formuläret på sidan — ange adress så återkommer vi med förslag på tid för takkontroll.`,
      "Inför takkontrollen behöver du inte förbereda något särskilt, men det underlättar om du vet ungefär hur stort taket är, vilket material det har idag och om du märkt några specifika problem som fläckar eller läckage. Vi tar med all mätutrustning.",
      "Efter takkontrollen får du en skriftlig offert med fast pris och tydlig specifikation av vad som ingår — rivning, underlag, tätskikt, beslag, taksäkerhet och städning. Du bestämmer i din egen takt, utan påtryckningar.",
      "Välkommen att höra av dig oavsett om du planerar ett takbyte i år, funderar på taktvätt eller bara vill ha en bedömning av takets skick.",
      "För dig på en ö: vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Berätta var fastigheten ligger och hur den nås, så planerar vi takkontrollen därefter.",
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
      "Nytt tak på Blidö: nya betongpannor från Benders i svart, sommaren 2026.",
      "Nytt tak på Singö, Grisslehamn: betongpannor på huvudtaket och TP20-plåt på de lägre takdelarna, september 2026.",
    ],
    links: [...primaryLinks, { href: "/projekt/takrenovering-blido", label: "Nytt tak på Blidö" }, { href: "/projekt/takbyte-singo", label: "Nytt tak på Singö" }],
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
  "/material": {
    title: "Takmaterial – betongpannor, lertegel, plåt och falsat",
    description:
      "Jämför takmaterial: betongpannor, lertegel, TP20-plåt och dubbelfalsat plåttak. Vikt, synliga skruvar och vad som passar ditt hus.",
    h1: "Takmaterial – vad passar ditt hus?",
    intro:
      "Betongpannor, lertegel, plåt eller falsat — materialet avgör utseende, vikt och underhåll. Här går vi igenom vad som skiljer dem åt.",
    paragraphs: [
      "Betongpannor: klassiskt pannat tak, tåligt men tungt.",
      "Lertegel: det klassiska teglet, åldras med patina. Läs mer på /tjanster/tegeltak.",
      "TP20-plåttak: lätt profilplåt, snabb att lägga.",
      "Dubbelfalsat plåttak: bandtäckning utan synliga skruvar. Läs mer på /tjanster/platarbeten.",
      "Papptak: tätt och lätt, för låglutande tak.",
    ],
    links: [
      ...primaryLinks,
      { href: "/material/betongpannor", label: "Betongpannor" },
      { href: "/tjanster/tegeltak", label: "Lertegel (tegeltak)" },
      { href: "/material/tp20-plattak", label: "TP20-plåttak" },
      { href: "/tjanster/platarbeten", label: "Dubbelfalsat plåttak" },
      { href: "/material/papptak", label: "Papptak" },
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
    links: [...primaryLinks, ...serviceLinks],
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
    `${loc.name} tillhör ${loc.region} och ligger cirka ${Math.round(distanceFromBaseKm(loc))} km från Norrtälje och cirka ${Math.round(distanceFromTabyKm(loc))} km från Täby. Närmaste orter i vårt område: ${loc.nearbyLocations.join(", ")}.`,
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
    return { ...page, paragraphs: [...extra, ...page.paragraphs] };
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
      links: [...primaryLinks, { href: "/takproblem", label: "Alla takproblem" }, ...MONEY_LINKS],
    };
  }

  if (clean.startsWith("/material/")) {
    const material = materialSummaries.find((m) => m.slug === clean.slice("/material/".length));
    if (!material) return null;
    return {
      title: material.metaTitle,
      description: material.metaDescription,
      h1: material.title,
      intro: material.intro,
      paragraphs: material.paragraphs,
      links: [...primaryLinks, { href: "/material", label: "Alla material" }, { href: "/priser", label: "Priser för takarbeten" }, ...MONEY_LINKS],
      ogImage: material.ogImage,
      ogImageAlt: material.ogImageAlt,
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
      description: `Takbyte, takrenovering och plåtarbeten i ${region} — ${places.length} orter. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti. Ring ${PHONE}.`,
      h1: `Takläggare i ${region}`,
      intro: regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      paragraphs: [
        ...(regionLongText[region] ?? []),
        ...(villaAreasParagraph(regionSlugs[region]) ? [villaAreasParagraph(regionSlugs[region])!] : []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...villaAreaLinks(regionSlugs[region]),
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
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const loc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
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
        `${loc.uniqueFAQ.question} ${loc.uniqueFAQ.answer}`,
        `Ring ${PHONE} för kostnadsfri takkontroll och offert ${prep} ${loc.name}.`,
      ],
      links: [
        ...primaryLinks,
        ...MONEY_LINKS,
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
