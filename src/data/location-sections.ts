/**
 * Ortssidornas två avsnitt "Varför välja RoslagsTak som …" och "Om <ort> och takläggning i <region>" (AA3).
 * Delas av LocationPage.tsx (rendering) och scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma text.
 */
import { GARANTI_RENOVERING } from "@/data/guarantee";
import type { LocationData } from "@/data/locations";

export interface LocationSection {
  heading: string;
  paragraph: string;
}

/**
 * Regioner (värden av `location.region`) som med säkerhet ligger i Roslagen. Bara för dem står "i Roslagen" i meningen om regionen;
 * för alla andra, och för regioner där vi är osäkra (t.ex. Österåker), står meningen utan "i Roslagen" (Marknadschefen 2026-10-08).
 */
export const ROSLAGEN_REGIONER = new Set(["Roslagens inland", "Norra Roslagen", "Kusten", "Mellersta skärgården", "Norra skärgården", "Rådmansöhalvön"]);
/** Regioner vars namn är vanliga ord och därför skrivs med liten bokstav mitt i en mening; övriga behåller sin stavning. */
const REGION_SOM_VANLIGT_ORD = new Set(["Kusten", "Mellersta skärgården", "Norra skärgården"]);
/** "i Roslagen" läggs till bara för regioner i Roslagen vars namn inte redan innehåller "Roslag" ("Hallstavik tillhör Norra Roslagen."). */
export const iRoslagen = (region: string): boolean => ROSLAGEN_REGIONER.has(region) && !region.includes("Roslag");
export const regionIMening = (region: string): string => (REGION_SOM_VANLIGT_ORD.has(region) ? region.toLowerCase() : region);

/** `far` = långt från basen (samma värde som LocationPage.tsx räknar), `prep` = "i" eller "på". */
export const locationWhySections = (location: LocationData, prep: string, far: boolean): LocationSection[] => {
  const uppdrag = far
    ? `Vi tar uppdrag ${prep} ${location.name} och närområdet, för både villaägare och bostadsrättsföreningar, med kostnadsfri takkontroll och fast pris.`
    : `Vi tar uppdrag ${prep} ${location.name} och i Roslagen och Storstockholm, med kostnadsfri takkontroll och fast pris.`;
  const skargard = far ? "" : location.isIsland ? ` Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.` : "";
  const region =
    location.region === "Mälardalen"
      ? `${location.name} ligger i Mälardalen. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.`
      : `${location.name} tillhör ${regionIMening(location.region)}${iRoslagen(location.region) ? " i Roslagen" : ""}. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.`;
  return [
    {
      heading: `Varför välja RoslagsTak som ${location.primaryKeyword}?`,
      paragraph: `${uppdrag}${skargard} Vi arbetar enligt AMA. ${GARANTI_RENOVERING}`,
    },
    {
      heading: `Om ${location.name} och takläggning i ${regionIMening(location.region)}`,
      paragraph: `${region} Kontakta oss för en kostnadsfri takkontroll ${prep} ${location.name}, utan förpliktelser.`,
    },
  ];
};
