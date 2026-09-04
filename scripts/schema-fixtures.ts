/**
 * Samlar all strukturerad data som sajten skickar ut, så att
 * scripts/validate-structured-data.mjs kan granska den utan att starta en
 * webbläsare. En post per sidtyp: LocalBusiness, FAQPage och BreadcrumbList.
 */
import { buildBreadcrumbSchema, buildFaqSchema, buildLocalBusinessSchema, services, SITE_URL } from "../src/lib/schema";
import { locations } from "../src/data/locations";
import { generateLocationFAQs, generateServiceLocationFAQs } from "../src/data/location-faqs";
import { allServiceSlugs } from "../src/data/service-slugs";
import { getCombo, serviceSlugsFromTypes } from "../src/data/service-location-combos";

export interface SchemaSample {
  /** Sidan schemat hör till (för felmeddelanden). */
  page: string;
  kind: "LocalBusiness" | "FAQPage" | "BreadcrumbList";
  schema: Record<string, unknown>;
}

const crumb = (name: string, path: string) =>
  buildBreadcrumbSchema([{ name: "Hem", path: "/" }, { name, path }]) as Record<string, unknown>;

export const collectSchemas = (): SchemaSample[] => {
  const samples: SchemaSample[] = [
    { page: "/", kind: "LocalBusiness", schema: buildLocalBusinessSchema() as Record<string, unknown> },
  ];

  // Tjänstesidor: brödsmulor per tjänst.
  for (const service of services) {
    samples.push({
      page: `/tjanster/${service.slug}`,
      kind: "BreadcrumbList",
      schema: buildBreadcrumbSchema([
        { name: "Hem", path: "/" },
        { name: "Tjänster", path: "/tjanster/takomlaggning" },
        { name: service.name, path: `/tjanster/${service.slug}` },
      ]) as Record<string, unknown>,
    });
  }

  // Pris-, offert- och innehållssidor.
  for (const [name, path] of [
    ["Priser", "/priser"],
    ["Offert & rådgivning", "/offert"],
    ["Taktyper", "/taktyper"],
    ["Så går det till", "/hur-det-gar-till"],
    ["Recensioner", "/recensioner"],
    ["Kontakt", "/kontakt"],
    ["Guider", "/blogg"],
  ] as const) {
    samples.push({ page: path, kind: "BreadcrumbList", schema: crumb(name, path) });
  }

  // Ortshubbar + service+ort: FAQ och brödsmulor.
  for (const loc of locations) {
    const prep = loc.isIsland ? "på" : "i";
    const hub = `/taklaggare-${loc.slug}`;
    samples.push({
      page: hub,
      kind: "FAQPage",
      schema: buildFaqSchema(
        generateLocationFAQs(loc.name, prep, loc.isIsland, loc.uniqueFAQ),
        `${SITE_URL}${hub}`,
      ) as Record<string, unknown>,
    });
    samples.push({ page: hub, kind: "BreadcrumbList", schema: crumb(loc.name, hub) });

    for (const service of allServiceSlugs) {
      const url = `/${service}-${loc.slug}`;
      const combo = getCombo(service, loc.slug);
      if (!combo) continue;
      samples.push({
        page: url,
        kind: "FAQPage",
        schema: buildFaqSchema(
          generateServiceLocationFAQs(combo.serviceName, combo.locationName, combo.prep, loc.isIsland),
          `${SITE_URL}${url}`,
        ) as Record<string, unknown>,
      });
    }
  }

  return samples;
};

/** Sluglistan som routing och sitemap använder måste matcha combo-generatorn. */
export const serviceSlugMismatch = () => {
  const a = [...allServiceSlugs].sort().join(",");
  const b = [...serviceSlugsFromTypes].sort().join(",");
  return a === b ? null : `service-slugs.ts (${a}) matchar inte serviceTypes (${b})`;
};
