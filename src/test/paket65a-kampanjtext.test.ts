/**
 * Paket 65a (juristens svar 2026-10-12, ledning/jurist/cookies-sidan-tillagg-2026-10-11.md): kampanjraden FÅR följa med utan godkänd statistik, på tre villkor. /cookies, tillägg 1 har juristens nya lydelse
 * ordagrant, och de två villkor som koden ska uppfylla provas här: (1) raden innehåller aldrig ett klick-id, bara source, medium, campaign och content; (2) utan godkänd statistik skrivs inget till
 * sessionStorage, localStorage eller en kaka.
 */
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { utmFields, utmLine, withUtm, captureUtm } from "@/lib/utm";
import { saveConsent } from "@/lib/consent";

const sida = readFileSync("src/pages/CookiesPage.tsx", "utf8").split("\r").join("").replace(/\s+/g, " ");
const gaTill = (url: string) => window.history.replaceState({}, "", url);

describe("paket 65a: /cookies tillägg 1, juristens nya lydelse", () => {
  it("lydelsen står ordagrant, efter 'Förfrågan och takkontroll' och före 'Avtal och utförande'", () => {
    expect(sida).toContain(
      "Hur du hittade oss:</strong> kommer du till oss via en annons eller en länk med ett kampanjnamn sparas kampanjens namn tillsammans med din förfrågan. Har du godkänt statistik sparas också vilken sida på webbplatsen du kom in på och vilken källa du kom från. Vi använder det för att se vilka annonser och sidor som leder till förfrågningar. Grunden är vårt berättigade intresse av att följa upp vår marknadsföring (artikel 6.1 f).",
    );
    expect(sida.indexOf("Förfrågan och takkontroll:")).toBeLessThan(sida.indexOf("Hur du hittade oss:"));
    expect(sida.indexOf("Hur du hittade oss:")).toBeLessThan(sida.indexOf("Avtal och utförande:"));
    expect(sida).not.toContain("har du godkänt statistik sparas också vilken sida på webbplatsen du kom in på och vilken källa eller kampanj du kom från, tillsammans med din förfrågan. Vi använder det för att se vilka sidor");
  });
});

describe("paket 65a: villkoren för kampanjraden i koden", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  afterEach(() => gaTill("/"));

  it("villkor 1: ett klick-id (gclid, fbclid, msclkid, gbraid, wbraid) kommer aldrig med i raden eller i fälten, med eller utan samtycke", () => {
    gaTill("/takkontroll?utm_source=google&utm_medium=cpc&utm_campaign=takbyte-taby&utm_content=annons-a&gclid=EAIaIQobChMI&fbclid=IwAR1&msclkid=abc&gbraid=0AAA&wbraid=CjkK");
    for (const samtycke of [false, true]) {
      saveConsent({ analytics: samtycke, marketing: samtycke });
      const rad = utmLine();
      expect(rad).toBe("Kampanj: source=google, medium=cpc, campaign=takbyte-taby, content=annons-a");
      for (const id of ["gclid", "fbclid", "msclkid", "gbraid", "wbraid", "EAIaIQ", "IwAR1", "0AAA", "CjkK"]) expect(rad, id).not.toContain(id);
      expect(JSON.stringify(utmFields())).not.toMatch(/gclid|fbclid|msclkid|gbraid|wbraid|EAIaIQ|IwAR1/);
      expect(withUtm("Hej") ?? "").not.toMatch(/gclid|fbclid|msclkid|gbraid|wbraid|EAIaIQ|IwAR1/);
    }
  });

  it("villkor 1: bara fyra nycklar och högst 60 tecken per värde, och inga specialtecken", () => {
    gaTill(`/takkontroll?utm_source=${"a".repeat(80)}&utm_term=ord&utm_id=123&utm_medium=<b>x</b>`);
    saveConsent({ analytics: false, marketing: false });
    const rad = utmLine();
    expect(rad).toBe(`Kampanj: source=${"a".repeat(60)}`);
    expect(rad).not.toMatch(/term|utm_id|<|>/);
  });

  it("villkor 2: utan godkänd statistik skrivs inget till sessionStorage, localStorage utöver själva valet, eller en kaka", () => {
    gaTill("/takkontroll?utm_source=google&utm_medium=cpc&utm_campaign=takbyte-taby");
    saveConsent({ analytics: false, marketing: false });
    captureUtm();
    utmLine();
    withUtm("Hej");
    utmFields();
    expect(Object.keys(sessionStorage)).toEqual([]);
    expect(Object.keys(localStorage).filter((k) => k !== "rt_consent_v1")).toEqual([]);
    expect(document.cookie).toBe("");
  });

  it("villkor 2: går värdena förlorade när besökaren går vidare till en adress utan parametrar är det så det ska vara", () => {
    gaTill("/takkontroll?utm_source=google");
    saveConsent({ analytics: false, marketing: false });
    expect(utmLine()).toBe("Kampanj: source=google");
    gaTill("/takkontroll");
    expect(utmLine()).toBe("");
  });
});
