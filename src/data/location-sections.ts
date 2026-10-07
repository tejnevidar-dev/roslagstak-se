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

/** `far` = långt från basen (samma värde som LocationPage.tsx räknar), `prep` = "i" eller "på". */
export const locationWhySections = (location: LocationData, prep: string, far: boolean): LocationSection[] => {
  const uppdrag = far
    ? `Vi tar uppdrag ${prep} ${location.name} och närområdet, för både villaägare och bostadsrättsföreningar, med kostnadsfri takkontroll och fast pris.`
    : `Vi tar uppdrag ${prep} ${location.name} och i Roslagen och Storstockholm, med kostnadsfri takkontroll och fast pris.`;
  const skargard = far ? "" : location.isIsland ? ` Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.` : "";
  const region =
    location.region === "Mälardalen"
      ? `${location.name} ligger i Mälardalen. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.`
      : `${location.name} tillhör ${location.region} i Roslagen. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.`;
  return [
    {
      heading: `Varför välja RoslagsTak som ${location.primaryKeyword}?`,
      paragraph: `${uppdrag}${skargard} Vi arbetar enligt AMA. ${GARANTI_RENOVERING}`,
    },
    {
      heading: `Om ${location.name} och takläggning i ${location.region.toLowerCase()}`,
      paragraph: `${region} Kontakta oss för en kostnadsfri takkontroll ${prep} ${location.name}, utan förpliktelser.`,
    },
  ];
};
