import { locationIndex as locations } from "@/data/location-index";
import { SITE_URL, ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID, NAP, buildBreadcrumbNode } from "./schema-graph";

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
      "Montering av hängrännor, stuprör och snörasskydd.",
  },
  {
    slug: "takkupor",
    name: "Takkupor och takfönster",
    description: "Nya takkupor och takfönster med tät anslutning mot underlagspapp och plåt.",
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
  currenciesAccepted: "SEK",
  paymentAccepted: "Faktura",
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
  areaServed: [
    ...serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
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
    areaServed: serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
  };
};
