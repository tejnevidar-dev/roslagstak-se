import { locationIndex as locations } from "@/data/location-index";
import { SITE_URL, ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID, NAP, SAME_AS, buildBreadcrumbNode } from "./schema-graph";

export { SITE_URL, ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID, NAP };

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
      "Komplett omläggning av taket med ny underlagspapp, ny läkt och nytt takmaterial. Fast pris efter kostnadsfri takkontroll.",
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
      "Dimensionering och montering av hängrännor, stuprör och snörasskydd anpassat efter takyta och lutning.",
  },
  {
    slug: "takkupor",
    name: "Takkupor och takfönster",
    description: "Nya takkupor och takfönster med tät anslutning mot underlagspapp och plåt.",
  },
  {
    slug: "takinspektion",
    name: "Takinspektion",
    description: "Kostnadsfri takkontroll av tak, underlagspapp, råspont, avvattning och taksäkerhet på plats.",
  },
  {
    slug: "platarbeten",
    name: "Plåtarbeten och bandtäckning",
    description: "Fotplåt, vindskivor, skorstensbeslag och dubbelfalsad bandtäckning utförd enligt AMA Hus.",
  },
  {
    slug: "takvard",
    name: "Takvård, taktvätt och takmålning",
    description: "Skonsam taktvätt, biocidbehandling och takmålning på betongpannor, tegel och plåttak.",
  },
  {
    slug: "eternit-asbest",
    name: "Eternitsanering och asbestrivning",
    description: "Samordnad sanering av eternittak med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, inklusive transport till godkänd deponi.",
  },
];

/** Telefontider (beslut 2026-09-28): mån–fre 07–20, lör–sön 09–19. Samma som kontaktsidan och bokningen (lib/booking.ts). Delas av alla LocalBusiness-noder. */
export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "09:00",
    closes: "19:00",
  },
];

/** Unika regioner i ortsdatan — används som areaServed på områdesnivå. */
export const serviceRegions = Array.from(new Set(locations.map((l) => l.region)));

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
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: NAP.telephone,
  email: NAP.email,
  priceRange: "$$",
  currenciesAccepted: "SEK",
  paymentAccepted: "Faktura",
  parentOrganization: { "@id": ORG_ID },
  description:
    "Takläggare i Roslagen och Storstockholm. Takbyte, takomläggning, takrenovering, plåtarbeten, takvård och eternitsanering med fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
  address: {
    "@type": "PostalAddress",
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
  geo: { "@type": "GeoCoordinates", latitude: NAP.lat, longitude: NAP.lng },
  areaServed: [
    ...serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
    ...locations.map((loc) => ({ "@type": "Place", name: loc.name })),
  ],
  openingHoursSpecification: OPENING_HOURS,
  knowsAbout: [
    "Takbyte",
    "Takomläggning",
    "Takrenovering",
    "Plåttak",
    "TP20",
    "Dubbelfalsat plåttak",
    "Tegelplåt",
    "Betongpannor",
    "Takavvattning",
    "Takinspektion",
    "Taksäkerhet",
    "Eternitsanering",
    "Takkupor",
    "Takfönster",
    "Taktvätt",
    "Takmålning",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Takarbeten i Roslagen och Storstockholm",
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
  sameAs: SAME_AS,
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
