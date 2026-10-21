import { buildOrtServiceNode } from "./schema";
import { servicePriceDescriptions } from "../data/service-price-descriptions";

/**
 * Service-noderna för ort- och tjänst × ort-sidor (gren 168, H3). EN funktion per sidtyp, anropad av React-sidorna (LocationPage.tsx, ServiceLocationPage.tsx) och av den statiska headen
 * (serviceSchemaFor i scripts/prerender-content.ts), så att den renderade och den statiska grafen är identiska. Bara relativa importer.
 */
interface OrtRef {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  primaryKeyword: string;
  description: string;
  parentLocation?: { name: string; slug: string };
}

export const ortServiceNode = (loc: OrtRef, prep: string, utanTaktjanster: boolean) =>
  buildOrtServiceNode({
    path: `/taklaggare-${loc.slug}`,
    name: `Takläggare ${prep} ${loc.name}`,
    serviceType: "Takbyte och takrenovering",
    areaName: loc.name,
    lat: loc.lat,
    lng: loc.lng,
    parent: loc.parentLocation,
    description: `${loc.primaryKeyword} — ${loc.description}`,
    offerNames: utanTaktjanster
      ? []
      : [`Takbyte ${prep} ${loc.name}`, `Takrenovering ${prep} ${loc.name}`, `Takkontroll ${prep} ${loc.name}`, `Plåtarbeten ${prep} ${loc.name}`, `Takavvattning ${prep} ${loc.name}`],
  });

export const comboServiceNode = (
  combo: { url: string; serviceSlug: string; serviceName: string; prep: string; locationName: string; description: string },
  loc: { lat: number; lng: number; parentLocation?: { name: string; slug: string } } | undefined,
  overrideDescription: string | undefined,
  tunn: boolean,
) =>
  buildOrtServiceNode({
    path: combo.url,
    name: `${combo.serviceName} ${combo.prep} ${combo.locationName}`,
    serviceType: combo.serviceName,
    areaName: combo.locationName,
    lat: loc?.lat,
    lng: loc?.lng,
    parent: loc?.parentLocation,
    description: overrideDescription ?? combo.description,
    offers: tunn ? undefined : { description: servicePriceDescriptions[combo.serviceSlug] ?? "Fast pris i offerten efter kostnadsfri takkontroll." },
  });
