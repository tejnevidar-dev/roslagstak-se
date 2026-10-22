/**
 * Ortens tunga fält (gren 192): texterna som bara ortens egen sida behöver. Typen delas av de genererade filerna src/data/orter/<slug>.ts och av laddaren i src/data/location-load.ts.
 * Bara relativa importer.
 */
import type { LocationData } from "./locations";

export type LocationHeavy = Pick<LocationData, "description" | "longDescription" | "extraContent" | "extraSections" | "process" | "uniqueFAQ" | "factBox" | "sourceLink">;
