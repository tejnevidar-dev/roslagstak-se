/**
 * Enda källan för cookie-rutans text. Importeras av CookieBanner.tsx (klientsidan) OCH av
 * scripts/generate-static-heads.mjs (den statiska kopian som visas innan React hunnit ladda,
 * se #1ag/Lighthouse-fyndet: cookie-rutans text var annars sidans LCP-element och renderades
 * först efter JS). En enda källa gör att texten inte kan glida isär mellan de två kopiorna —
 * scripts/check-cookie-banner-sync.mjs verifierar ändå att den statiska HTML:en faktiskt
 * innehåller strängarna, som ett skyddsnät mot att någon kopierar texten för hand i framtiden.
 */
export const cookieBannerContent = {
  title: "Cookies på roslagstak.se",
  text:
    "Vi använder nödvändig lagring för att sajten ska fungera. Om du godkänner använder vi också statistik från Google Analytics, och om du även godkänner marknadsföring visar vi relevant annonsering via Google Ads och Meta. Du kan ändra ditt val när som helst.",
  linkLabel: "Läs mer om cookies",
  linkHref: "/cookies",
  acceptAll: "Godkänn statistik och marknadsföring",
  necessaryOnly: "Endast nödvändiga",
  analyticsOnly: "Endast statistik",
};
