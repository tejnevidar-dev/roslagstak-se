/**
 * Paket 68 (juristens lydelser 2026-10-12 kväll, ledning/jurist/cookies-sidan-tillagg-2026-10-11.md, "Gren 68"): avsnittet "Marknadsföring (Google Ads och Meta)" på /cookies ersätts helt av hennes lydelse,
 * och punkten "Google-annonsering" under "Vilka uppgifter och varför" stryks. Gäller bara om CRM bekräftar att inget skickas till Google Ads från CRM.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sida = readFileSync("src/pages/CookiesPage.tsx", "utf8").split("\r").join("");
const platt = sida.replace(/\s+/g, " ");

describe("paket 68: /cookies, Google-annonsering", () => {
  it("marknadsföringsavsnittet är juristens lydelse, ordagrant och ensam", () => {
    expect(sida).toContain(
      'title: "Marknadsföring (Google Ads och Meta)",\n    text: "I dag sätter vi inga kakor för marknadsföring, och Google Ads och Metas pixel är inte påslagna på webbplatsen. Om vi börjar mäta annonser på det sättet sker det bara om du har godkänt marknadsföring, och den här sidan uppdateras innan det börjar. Vi skickar aldrig namn, telefonnummer, e-post eller annat du har skrivit i ett formulär till Google eller Meta.",\n  },\n];',
    );
  });
  it("det som juristen strukit är borta: kaknamn, överföring utanför EU och meddelandet till Google om takkontroll och avtal", () => {
    for (const borta of ["_gcl_au", "_fbp", "_fbc", "advanced matching", "enhanced conversions", "utanför EU", "meddelar vi också Google", "meddelar vi Google när en takkontroll"]) expect(platt, borta).not.toContain(borta);
  });
  it("punkten 'Google-annonsering' under 'Vilka uppgifter och varför' är struken, och de övriga punkterna står kvar", () => {
    expect(platt).not.toContain("Google-annonsering:");
    expect(platt).not.toContain("kopplat till annonsens klick-id");
    for (const kvar of ["Marknadsföring via sms eller mejl:", "Hur du hittade oss:", "Avtal och utförande:", "ROT-avdrag:"]) expect(platt, kvar).toContain(kvar);
  });
  it("statistikavsnittet och tillägg 1 är oförändrade från 65a och 67", () => {
    expect(platt).toContain("Kakorna sparas i upp till 400 dagar, eller tills du tar tillbaka ditt val.");
    expect(platt).toMatch(/Hur du hittade oss:<\/strong> (kommer du till oss via en annons eller en länk med ett kampanjnamn sparas|har du godkänt statistik sparas)/);
  });
});
