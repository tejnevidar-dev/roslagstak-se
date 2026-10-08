/**
 * Paritet för tjänst × ort- och material × ort-sidorna (AG1, paket 20): ServiceLocationPage (React) och den statiska HTML:en hämtar
 * texten ur src/data/service-location-text.ts och google-reviews-text.ts.
 */
import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { locations } from "@/data/locations";
import { generateCombos } from "@/data/service-location-combos";
import { SERVICE_LOCATION_TEXT as T } from "@/data/service-location-text";
import { prerenderContent } from "../../scripts/prerender-content";

describe("tjänst × ort och material × ort: statisk text", () => {
  it("varje sida har relaterade tjänster, sidokolumn, fördelar, ortlistans rubrik och omdömesbandet", () => {
    const saknas: string[] = [];
    for (const c of generateCombos()) {
      const lista = prerenderContent(c.url)?.paragraphs ?? [];
      const loc = locations.find((l) => l.slug === c.locationSlug);
      const harGrannar = !!loc?.nearbyLocations.some((n) => locations.some((l) => l.name === n));
      const förväntat = [
        T.relatedHeading(c.prep, c.locationName), T.asideHeading, T.asideText(c.serviceName, c.prep, c.locationName), T.uspHeading, ...T.usps(c.serviceSlug),
        ...(harGrannar ? [T.nearbyHeading(c.serviceName)] : []), T.allLocationsHeading(c.serviceName),
        GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress,
      ];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${c.url}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
