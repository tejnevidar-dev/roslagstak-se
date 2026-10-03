/** Sidtyp per route. Delas av content-inventory.ts och seo-weekly-report.ts så att båda räknar likadant. */
import { allServiceSlugs } from "../src/data/service-location-combos";

export const classify = (path: string): { type: string; service: string; location: string } => {
  if (path === "/") return { type: "HOME", service: "", location: "" };
  if (path.startsWith("/tjanster/")) return { type: "SERVICE", service: path.slice("/tjanster/".length), location: "" };
  if (path.startsWith("/taklaggare-")) return { type: "LOCATION", service: "", location: path.slice("/taklaggare-".length) };
  if (path.startsWith("/omraden/")) return { type: "REGION_HUB", service: "", location: path.slice("/omraden/".length) };
  if (path === "/omraden") return { type: "REGION_INDEX", service: "", location: "" };
  if (path.startsWith("/brf/")) return { type: "BRF_LOCATION", service: "brf", location: path.slice("/brf/".length) };
  if (path === "/brf") return { type: "BRF_HUB", service: "brf", location: "" };
  if (path.startsWith("/projekt/")) return { type: "PROJECT", service: "", location: "" };
  if (path === "/projekt") return { type: "PROJECT_INDEX", service: "", location: "" };
  if (path.startsWith("/takproblem/")) return { type: "PROBLEM", service: "", location: "" };
  if (path === "/takproblem") return { type: "PROBLEM_INDEX", service: "", location: "" };
  if (path.startsWith("/material/")) return { type: "MATERIAL", service: "", location: "" };
  if (path === "/material") return { type: "MATERIAL_INDEX", service: "", location: "" };
  if (path.startsWith("/blogg/")) return { type: "GUIDE", service: "", location: "" };
  if (path === "/blogg") return { type: "GUIDE_INDEX", service: "", location: "" };
  if (path.startsWith("/offert/")) return { type: "AD_LANDING", service: "", location: path.slice("/offert/".length) };
  for (const s of allServiceSlugs) {
    if (path.startsWith(`/${s}-`)) return { type: "SERVICE_LOCATION", service: s, location: path.slice(s.length + 2) };
  }
  return { type: "STATIC", service: "", location: "" };
};
