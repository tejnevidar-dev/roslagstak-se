/**
 * Paket 67 (juristens bedömning av lagringslistan 2026-10-12, ledning/jurist/cookies-sidan-tillagg-2026-10-11.md): två lydelser ordagrant på /cookies. (a) Första meningen i avsnittet
 * "Marknadsföring (Google Ads och Meta)", (b) hur länge Google Analytics-kakorna sparas. Tillägg 1 (65a) och övrig text rörs inte.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sida = readFileSync("src/pages/CookiesPage.tsx", "utf8").split("\r").join("");
const platt = sida.replace(/\s+/g, " ");

describe("paket 67: /cookies, juristens lydelser", () => {
  it("(a) marknadsföringsavsnittets första mening (paket 67) ersattes helt av juristens lydelse i paket 68, se paket68-cookies-google.test.ts", () => {
    expect(sida).not.toContain("I dag sätter vi inga kakor för marknadsföring. Om vi börjar mäta annonser via Google Ads eller Meta");
    expect(sida).toContain("I dag sätter vi inga kakor för marknadsföring, och Google Ads och Metas pixel är inte påslagna på webbplatsen.");
  });
  it("(b) statistikavsnittet säger hur länge kakorna sparas, ordagrant, sist i avsnittet", () => {
    expect(sida).toContain("inga statistikcookies sätts. Kakorna sparas i upp till 400 dagar, eller tills du tar tillbaka ditt val.\",");
  });
  it("tillägg 1 (65a:s lydelse, eller 44b:s i 65b-varianten) och övriga avsnitt är oförändrade", () => {
    expect(platt).toMatch(/Hur du hittade oss:<\/strong> (kommer du till oss via en annons eller en länk med ett kampanjnamn sparas kampanjens namn tillsammans med din förfrågan\.|har du godkänt statistik sparas också vilken sida)/);
    expect(platt).toContain('title: "Nödvändig lagring"');
  });
});
