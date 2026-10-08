/**
 * Paritet för /taklaggare-<ort> (AD5): LocationPage (React) och den statiska HTML:en hämtar texten ur
 * src/data/location-page-text.ts, local-sections.ts, villa-areas.ts och google-reviews-text.ts.
 */
import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { buildLocalSections } from "@/data/local-sections";
import { LOCATION_PAGE_TEXT } from "@/data/location-page-text";
import { locations } from "@/data/locations";
import { villaAreasBlocks } from "@/data/villa-areas";
import { prerenderContent } from "../../scripts/prerender-content";

describe("/taklaggare-<ort>: statisk text", () => {
  it("varje ortssida har fakta, taktjänster, pris, sidokolumn och omdömesband som egna block", () => {
    const saknas: string[] = [];
    for (const loc of locations) {
      const lista = prerenderContent(`/taklaggare-${loc.slug}`)?.paragraphs ?? [];
      const prep = loc.isIsland ? "på" : "i";
      const förväntat = [
        ...buildLocalSections(loc).facts.flatMap((f) => [f.label, f.value]),
        LOCATION_PAGE_TEXT.servicesHeading(prep, loc.name), ...LOCATION_PAGE_TEXT.serviceItems(prep, loc.name),
        LOCATION_PAGE_TEXT.priceHeading(prep, loc.name), LOCATION_PAGE_TEXT.priceText(prep, loc.name, loc.isIsland),
        LOCATION_PAGE_TEXT.linksHeading(prep, loc.name), LOCATION_PAGE_TEXT.asideHeading, LOCATION_PAGE_TEXT.asideText(prep, loc.name),
        LOCATION_PAGE_TEXT.problemsHeading, LOCATION_PAGE_TEXT.sidebarServicesHeading, LOCATION_PAGE_TEXT.allLocationsHeading,
        GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress,
        ...villaAreasBlocks(loc.slug).map((b) => (typeof b === "string" ? b : b.h)),
      ];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${loc.slug}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
