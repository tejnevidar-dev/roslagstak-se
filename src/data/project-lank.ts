/**
 * Länktexten till ortssidan på projektsidorna (paket 95): "Takläggare på Blidö", "Takläggare på Singö", "Takläggare i Grisslehamn". Prepositionen följer hur orten heter i sajtens text:
 * öar (isIsland) och Singö (som i datan inte är en ö utan bilväg, men som sajten alltid kallar "på Singö") får "på", övriga "i".
 * Delas av ProjectPage.tsx (React) och scripts/prerender-content.ts (serverns HTML). Bara relativa importer (esbuild).
 */
import { locationIndex } from "./location-index";

const PA_UTOVER_OAR = ["singo"];

export const projektOrtLank = (p: { locationSlug: string; locationName: string }): string => {
  const ort = p.locationName.split(",")[0].trim();
  const pa = locationIndex.find((l) => l.slug === p.locationSlug)?.isIsland === true || PA_UTOVER_OAR.includes(p.locationSlug);
  return `Takläggare ${pa ? "på" : "i"} ${ort}`;
};
