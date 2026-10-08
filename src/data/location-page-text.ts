/**
 * Ortssidornas fasta texter (LocationPage.tsx): delas av sidan (React) och av scripts/prerender-content.ts (statisk HTML),
 * så att besökaren och sökmotorn får samma ord på /taklaggare-<ort> för tätorter, kommuner och öar (AD5). Ändra texten här.
 */
export const LOCATION_PAGE_TEXT = {
  servicesHeading: (prep: string, name: string) => `Våra taktjänster ${prep} ${name}`,
  serviceItems: (prep: string, name: string) => [
    `Takomläggning och takbyte ${prep} ${name}`,
    `Takrenovering ${prep} ${name}`,
    "Plåtarbeten, takavvattning och hängrännor",
    "Betongpannor, lertegel, TP20, pannplåt och dubbelfalsat plåttak",
    "Takkupor och takfönster",
    "Taktvätt och takmålning",
    "Kostnadsfri takkontroll",
  ],
  priceHeading: (prep: string, name: string) => `Vad kostar takbyte ${prep} ${name}?`,
  priceText: (prep: string, name: string, isIsland: boolean) =>
    `Priset för ett takbyte ${prep} ${name} beror på takets storlek, lutning, materialval och underlagets skick, oavsett om du väljer TP20-plåttak eller dubbelfalsat plåttak.` +
    (isIsland ? " Vad som ingår står i offerten." : " Du får fast pris i offerten efter kostnadsfri takkontroll.") +
    " Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
  linksHeading: (prep: string, name: string) => `Tjänster, priser och guider ${prep} ${name}`,
  asideHeading: "Kostnadsfri takkontroll",
  asideText: (prep: string, name: string) =>
    `Boka en kostnadsfri takkontroll för ditt takprojekt ${prep} ${name}. Vi återkopplar inom 24 timmar.`,
  nearbyHeading: "Takläggare i närområdet",
  problemsHeading: "Vanliga takproblem",
  sidebarServicesHeading: "Våra taktjänster",
  allLocationsHeading: "Takläggare i Roslagen och Storstockholm",
};
