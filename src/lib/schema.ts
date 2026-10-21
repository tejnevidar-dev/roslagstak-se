import { locationIndex } from "@/data/location-index";
import { synligaOrter } from "@/data/avindexerade-orter";
import { SITE_URL, ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID, NAP, LOGO_URL, OPENING_HOURS, buildBreadcrumbNode } from "./schema-graph";

export { SITE_URL, ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID, NAP, LOGO_URL, OPENING_HOURS };

/**
 * Central JSON-LD-byggare. Alla noder delar samma @id:n så att Google slår ihop
 * dem till en enda kunskapsgraf över företaget, tjänsterna och orterna.
 */


/** Tjänsterna vi vill att Google kopplar till företaget. */
export const services: { slug: string; name: string; description: string }[] = [
  {
    slug: "takomlaggning",
    name: "Takomläggning",
    description:
      "Omläggning av taket med ny underlagspapp, ny läkt och nytt takmaterial. Fast pris i offerten efter kostnadsfri takkontroll.",
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    description:
      "Riktade åtgärder på befintligt tak: byte av skadade pannor, tätning av genomföringar och nya plåtbeslag.",
  },
  {
    slug: "takavvattning",
    name: "Takavvattning, hängrännor och stuprör",
    description:
      "Montering av hängrännor och stuprör.",
  },
  {
    slug: "takkupor",
    name: "Takkupor och takfönster",
    description: "Takkupor och takfönster: vi börjar med en kostnadsfri takkontroll.",
  },
  {
    slug: "takinspektion",
    name: "Takkontroll",
    description: "Kostnadsfri takkontroll: en av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar.",
  },
  {
    slug: "taksakerhet",
    name: "Taksäkerhet",
    description: "Montering av takstege, gångbrygga och snörasskydd, i samband med takbyte eller som eget arbete.",
  },
  {
    slug: "platarbeten",
    name: "Plåtarbeten och bandtäckning",
    description: "Fotplåt, vindskiveplåt, skorstensbeslag och dubbelfalsad bandtäckning. Arbete enligt AMA.",
  },
  {
    slug: "takvard",
    name: "Taktvätt",
    description: "Taktvätt: vi börjar med en kostnadsfri takkontroll utan förpliktelser och lämnar en offert med fast pris.",
  },
  {
    slug: "eternit-asbest",
    name: "Byta eternittak",
    description: "Byte av eternittak: saneringen görs av en saneringsfirma med tillstånd, och vi lägger det nya taket.",
  },
];


/** Orterna som får anges som plats vi tar uppdrag på: de avindexerade orterna (src/data/avindexerade-orter.ts) ingår inte. */
const locations = synligaOrter(locationIndex);

/** Unika regioner i ortsdatan — används som areaServed på områdesnivå. */
export const serviceRegions = Array.from(new Set(locations.map((l) => l.region)));

/**
 * Kommunerna vi tar uppdrag i (gren 168, H3): areaServed på verksamheten anges per kommun i stället för per region, så att ortskopplingen är en riktig plats.
 * Namnen finns som orter eller som föräldraort i src/data/locations.ts (provas i schema-service.test.ts).
 */
export const SERVICE_KOMMUNER: readonly string[] = [
  "Norrtälje", "Österåker", "Vallentuna", "Täby", "Danderyd", "Sollentuna", "Upplands Väsby", "Vaxholm", "Värmdö", "Lidingö", "Stockholm", "Solna", "Sundbyberg", "Järfälla",
  "Upplands-Bro", "Sigtuna", "Nacka", "Tyresö", "Haninge", "Huddinge", "Botkyrka", "Salem", "Södertälje", "Ekerö", "Nynäshamn", "Nykvarn", "Uppsala", "Västerås", "Strängnäs",
  "Eskilstuna", "Enköping", "Gnesta",
];

/**
 * En Service-nod per ort- och tjänst × ort-sida (gren 168, H3, seo-analys-2026-10-21/1-teknik-i-koden.md F4): provider pekar på EN verksamhet (LOCAL_BUSINESS_ID) i stället för en egen
 * RoofingContractor per sida, och areaServed är orten som City. Delas av React-sidorna och den statiska headen (scripts/generate-static-heads.mjs), så att båda bär samma graf.
 */
/** areaServed på verksamheten: kommunerna plus uppdragsområdet Mälardalen (beslut 2026-09-26, malardalen-omrade.test.ts). Inga regionnamn från ortsdatan. */
export const SERVICE_AREAS: readonly string[] = [...SERVICE_KOMMUNER, "Mälardalen"];

export const buildOrtServiceNode = (o: {
  path: string;
  name: string;
  serviceType: string;
  areaName: string;
  lat?: number;
  lng?: number;
  parent?: { name: string; slug: string };
  description?: string;
  offerNames?: string[];
  offers?: { description: string };
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}${o.path}#service`,
  name: o.name,
  serviceType: o.serviceType,
  url: `${SITE_URL}${o.path}`,
  ...(o.description ? { description: o.description } : {}),
  provider: { "@id": LOCAL_BUSINESS_ID },
  areaServed: {
    "@type": "City",
    name: o.areaName,
    ...(o.lat !== undefined && o.lng !== undefined ? { geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng } } : {}),
    ...(o.parent ? { containedInPlace: { "@type": "AdministrativeArea", name: o.parent.name, url: `${SITE_URL}/taklaggare-${o.parent.slug}` } } : {}),
  },
  ...(o.offerNames?.length
    ? { hasOfferCatalog: { "@type": "OfferCatalog", name: `Taktjänster ${o.areaName}`, itemListElement: o.offerNames.map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })) } }
    : {}),
  ...(o.offers ? { offers: { "@type": "Offer", description: o.offers.description } } : {}),
});

/**
 * LocalBusiness (RoofingContractor) för hela sajten — tjänstekatalog,
 * orter/områden, öppettider och kontaktuppgifter.
 */
export const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": LOCAL_BUSINESS_ID,
  name: NAP.name,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: NAP.telephone,
  email: NAP.email,
  currenciesAccepted: "SEK",
  parentOrganization: { "@id": ORG_ID },
  description:
    "Takfirma med bas i Norrtälje. Takbyte, takomläggning, takrenovering och plåtarbeten i Roslagen, Storstockholm och Mälardalen. Kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti.",
  address: {
    "@type": "PostalAddress",
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
  geo: { "@type": "GeoCoordinates", latitude: NAP.lat, longitude: NAP.lng },
  openingHoursSpecification: OPENING_HOURS,
  areaServed: [
    // Kommuner och uppdragsområdet som saknar en egen ort står som AdministrativeArea; kommuner som har en ortssida står som Place bland orterna (ett namn, en post).
    ...SERVICE_AREAS.filter((area) => !locations.some((loc) => loc.name === area)).map((area) => ({ "@type": "AdministrativeArea", name: area })),
    ...locations.map((loc) => ({ "@type": "Place", name: loc.name })),
  ],
  knowsAbout: [
    "Takbyte",
    "Takomläggning",
    "Takrenovering",
    "Plåttak",
    "TP20",
    "Dubbelfalsat plåttak",
    "Pannplåt",
    "Betongpannor",
    "Takavvattning",
    "Takkontroll",
    "Taksäkerhet",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Takarbeten i Roslagen, Storstockholm och Mälardalen",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/tjanster/${service.slug}#service`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
      },
    })),
  },
});

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage — måste alltid spegla frågor som syns på sidan. */
export const buildFaqSchema = (faqs: FaqItem[], pageUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(pageUrl ? { "@id": `${pageUrl}#faq` } : {}),
  ...(pageUrl ? { url: pageUrl } : {}),
  inLanguage: "sv-SE",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

/** BreadcrumbList från en lista med [namn, sökväg]. @id kommer från sista stegets URL (lib/schema-graph.ts). */
export const buildBreadcrumbSchema = (items: { name: string; path: string }[]) => buildBreadcrumbNode(items);

/**
 * Samma LocalBusiness-nod utan de tunga listorna (alla orter, tjänstekatalog, knowsAbout), för
 * övriga sidor än startsidan och kontaktsidan: samma @id och samma kontaktuppgifter, med regionerna
 * som areaServed. Håller HTML-storleken nere på de drygt 2 200 statiska sidorna.
 */
export const buildLocalBusinessLeanSchema = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { areaServed, knowsAbout, hasOfferCatalog, ...rest } = buildLocalBusinessSchema();
  return {
    ...rest,
    areaServed: SERVICE_AREAS.map((area) => ({ "@type": "AdministrativeArea", name: area })),
  };
};
