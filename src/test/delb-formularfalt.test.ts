/**
 * Del B, variant (b): de sex attributionsfälten (landing_path, referrer_category, utm_source, utm_medium, utm_campaign, utm_content) skickas
 * med varje förfrågan, men bara ur det som är sparat efter godkänd statistik; annars är alla sex null. Fyra fall som i lagring-samtycke.test.ts:
 * inget val, "Endast nödvändiga", godkänt, återtaget. Dessutom: alla formulärfiler skickar fälten, och de tre juridiska texterna står ordagrant.
 */
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cookieBannerContent } from "@/lib/cookie-banner-content";
import { CONSENT_CHANGED_EVENT, saveConsent } from "@/lib/consent";
import { attributionFields } from "@/lib/attribution";
import { initConsentStorage, syncStorageWithConsent } from "@/lib/lagring-samtycke";
import { utmFields } from "@/lib/utm";

const gaTill = (url: string, referrer = "") => {
  window.history.pushState({}, "", url);
  Object.defineProperty(document, "referrer", { value: referrer, configurable: true });
};
const sex = () => ({ ...attributionFields(), ...utmFields() });
const ALLA_TOMMA = { landing_path: null, referrer_category: null, utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null };

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  gaTill("/");
});
afterEach(() => window.removeEventListener(CONSENT_CHANGED_EVENT, syncStorageWithConsent));

describe("de sex fälten i formulären", () => {
  it("inget val: alla sex är tomma, också när adressen har utm-värden", () => {
    gaTill("/takkontroll?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_content=a", "https://www.google.com/");
    initConsentStorage();
    expect(sex()).toEqual(ALLA_TOMMA);
  });

  it("Endast nödvändiga: alla sex är tomma, också efter att besökaren landat på en annan sida", () => {
    initConsentStorage();
    gaTill("/taklaggare-taby?utm_source=google&gclid=x");
    saveConsent({ analytics: false, marketing: false });
    gaTill("/takkontroll");
    expect(sex()).toEqual(ALLA_TOMMA);
  });

  it("godkänd statistik: landningssidan och kampanjen följer med, och landningssidan är sidan där valet gjordes", () => {
    initConsentStorage();
    gaTill("/taklaggare-taby?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_content=annons-a", "https://www.google.com/");
    saveConsent({ analytics: true, marketing: false });
    gaTill("/takkontroll"); // formulärsidan, utan utm i adressen
    expect(sex()).toEqual({ landing_path: "/taklaggare-taby", referrer_category: "ads", utm_source: "google", utm_medium: "cpc", utm_campaign: "test", utm_content: "annons-a" });
  });

  it("godkänd statistik utan referrer och utan utm: landningssidan följer med, utm är tomma och kategorin är 'direkt'", () => {
    initConsentStorage();
    saveConsent({ analytics: true, marketing: false });
    expect(sex()).toEqual({ ...ALLA_TOMMA, landing_path: "/", referrer_category: "direkt" });
  });

  it("återtaget val: alla sex är tomma igen", () => {
    initConsentStorage();
    gaTill("/takkontroll?utm_source=google");
    saveConsent({ analytics: true, marketing: false });
    expect(sex().landing_path).toBe("/takkontroll");
    saveConsent({ analytics: false, marketing: false });
    expect(sex()).toEqual(ALLA_TOMMA);
  });

  it("blockerad sessionStorage: tomma fält, inget fel", () => {
    initConsentStorage();
    saveConsent({ analytics: true, marketing: false });
    const orig = Object.getOwnPropertyDescriptor(window, "sessionStorage")!;
    Object.defineProperty(window, "sessionStorage", { configurable: true, get() { throw new DOMException("blockerad", "SecurityError"); } });
    try {
      expect(() => sex()).not.toThrow();
      expect(sex().landing_path).toBeNull();
    } finally {
      Object.defineProperty(window, "sessionStorage", orig);
    }
  });
});

describe("alla formulär skickar de sex fälten, och inget annat i formulärfilerna ändras", () => {
  const filer: [string, number][] = [
    ["src/components/LeadForm.tsx", 1],
    ["src/components/BookingWidget.tsx", 1],
    ["src/components/QuoteConfigurator.tsx", 1],
    ["src/pages/BrfPage.tsx", 1],
    ["src/pages/ContactLanding.tsx", 1],
  ];
  for (const [fil, antal] of filer) {
    it(fil, () => {
      const t = readFileSync(fil, "utf8");
      expect(t.split("...attributionFields()").length - 1).toBe(antal);
      expect(t.split("...utmFields()").length - 1).toBe(antal);
    });
  }
});

describe("de tre juridiska texterna, ordagrant (juristens lydelse, Vidars ja 2026-10-10)", () => {
  it("kakrutans text", () => {
    expect(cookieBannerContent.text).toBe(
      "Vi använder nödvändig lagring för att sajten ska fungera. Om du godkänner statistik använder vi Google Analytics och sparar under besöket vilken sida du kom in på och varifrån, så att vi ser vilka sidor som leder till förfrågningar. Om du även godkänner marknadsföring visar vi relevant annonsering via Google Ads och Meta. Du kan ändra ditt val när som helst.",
    );
    // Knapparna är oförändrade
    expect(cookieBannerContent.acceptAll).toBe("Godkänn statistik och marknadsföring");
    expect(cookieBannerContent.necessaryOnly).toBe("Endast nödvändiga");
    expect(cookieBannerContent.analyticsOnly).toBe("Endast statistik");
  });

  it("/cookies: de två raderna under statistikstycket och meningen i integritetstexten", () => {
    const t = readFileSync("src/pages/CookiesPage.tsx", "utf8").replace(/\r/g, "").replace(/\s+/g, " ");
    expect(t).toContain("Om du godkänner statistik sparar vi också två poster i webbläsaren under besöket:");
    expect(t).toContain("rt_attribution_v1: vilken sida du kom in på och varifrån, så att vi ser vilka sidor som leder till förfrågningar. Sparas under besöket.");
    expect(t).toContain("rt_utm_v1: vilken källa eller kampanj du kom från, om det står i adressen. Sparas under besöket.");
    expect(t).toContain("Har du godkänt statistik sparas också vilken sida på webbplatsen du kom in på och vilken källa eller kampanj du kom från, tillsammans med din förfrågan.");
    // Det befintliga statistikstycket är oförändrat
    expect(t).toContain("Utan ditt godkännande laddas Google Analytics inte alls och inga statistikcookies sätts.");
  });
});

describe("paket 44b: juristens tillägg 1 på /cookies och tankstrecket", () => {
  it("punkten 'Hur du hittade oss' står ordagrant efter 'Förfrågan och takkontroll', och Google-meningen har ingen tankstreck", () => {
    const t = readFileSync("src/pages/CookiesPage.tsx", "utf8").replace(/\r/g, "").replace(/\s+/g, " ");
    // Paket 65a: juristens nya lydelse 2026-10-12 ersätter lydelsen från 44b (se paket65a-kampanjtext.test.ts)
    expect(t).toContain("Hur du hittade oss:</strong> kommer du till oss via en annons eller en länk med ett kampanjnamn sparas kampanjens namn tillsammans med din förfrågan. Har du godkänt statistik sparas också vilken sida på webbplatsen du kom in på och vilken källa du kom från. Vi använder det för att se vilka annonser och sidor som leder till förfrågningar. Grunden är vårt berättigade intresse av att följa upp vår marknadsföring (artikel 6.1 f).");
    expect(t.indexOf("Förfrågan och takkontroll:")).toBeLessThan(t.indexOf("Hur du hittade oss:"));
    expect(t.indexOf("Hur du hittade oss:")).toBeLessThan(t.indexOf("Avtal och utförande:"));
    // Paket 68: punkten "Google-annonsering" är struken (se paket68-cookies-google.test.ts)
    expect(t).not.toContain("klick-id — aldrig");
  });
});
