interface JsonLdProps {
  /** Ett schema-objekt eller en lista med scheman. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renderar JSON-LD som inline-script i sidan. Tidigare lades scripten i <head> via Helmet, men Helmet skriver inget
 * till DOM:en i produktion (0 element med data-rh, kontrollerat 2026-10-05), så FAQPage och BreadcrumbList från
 * FaqSection, Breadcrumbs och landningssidorna kom aldrig med. BlogPost och tjänst × ort-sidorna använder redan
 * inline-script, och det är samma sätt här. "<" skrivs som < så att innehållet aldrig kan stänga scripttaggen.
 */
const JsonLd = ({ data }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
};

export default JsonLd;
