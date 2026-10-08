/**
 * /offerts texter (QuotePage.tsx, QuoteConfigurator.tsx, FreeConsultation.tsx): delas av sidan (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AD3). Ändra texten här.
 * Sidans H1 ("Få pris på ditt takprojekt") ligger kvar i QuotePage.tsx och rörs inte.
 */
export const QUOTE_PAGE = {
  eyebrow: "Offert & rådgivning",
  text: "Beskriv ditt tak i några steg, så svarar vi inom 24 timmar — eller låt oss ringa upp och boka en kostnadsfri takkontroll.",
  relatedTitle: "Läs vidare innan du bestämmer dig",
};

/** Konfiguratorns rubrikdel och förvalda läge ("Konfigurera själv"); rådgivningsflikens texter visas först efter ett klick. */
export const QUOTE_CONFIG = {
  eyebrow: "Offert & Rådgivning",
  heading: "Hur vill du ha hjälp?",
  intro: "Välj mellan att beskriva ditt tak själv eller bli kontaktad av en av våra säljare. Vi svarar inom 24 timmar.",
  bannerTitle: "Beskriv ditt tak",
  bannerText: "Fyll i dina takval nedan och lämna dina uppgifter. Vi svarar inom 24 timmar, kostnadsfritt och utan förpliktelser.",
  finePrintConfigure: "Helt kostnadsfritt. Vi svarar inom 24 timmar.",
  finePrintConsultation: "Helt kostnadsfritt. Vi svarar inom 24 timmar från att formuläret skickas in.",
  privacy: "Vi sparar dina uppgifter för att kunna kontakta dig om din förfrågan. Läs mer i vår",
  privacyLink: "integritetsinformation",
};

export const FREE_CONSULT = {
  eyebrow: "Kostnadsfri takkontroll",
  heading: "Osäker på taktyp? Vi hjälper dig att välja rätt.",
  text: "Du behöver inte vara expert på tak. Ring oss eller skicka en förfrågan — vi går igenom vilken taktyp som passar just ditt hus, oavsett om det ligger på en ö eller längs kusten.",
  items: [
    { no: "01", title: "Ring direkt", text: "Prata med en takläggare, inte en säljare.", href: "tel:+46701543639", cta: "Ring" },
    { no: "02", title: "Svar inom 24 timmar", text: "Skicka ett meddelande och få besked snabbt.", href: "#kontakt", cta: "Skicka meddelande" },
    { no: "03", title: "Inga förpliktelser", text: "Kostnadsfri takkontroll — inga krav.", href: "#offert", cta: "Räkna på ditt tak" },
  ],
};
