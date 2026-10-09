/**
 * Paket 38: lagring i webbläsaren kräver samtycke (juristens besked 2026-10-09). Fyra fall: inget val, "Endast nödvändiga", godkänt, återtaget.
 * Nycklarna rt_attribution_v1 och rt_utm_v1 får bara finnas i sessionStorage efter godkänd statistik, och kampanjraden i meddelandet
 * bygger utan samtycke bara på adressen till sidan där formuläret skickas.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONSENT_CHANGED_EVENT, saveConsent } from "@/lib/consent";
import { attributionFields } from "@/lib/attribution";
import { syncStorageWithConsent, initConsentStorage } from "@/lib/lagring-samtycke";
import { utmFields, utmLine, withUtm } from "@/lib/utm";

const ATTR = "rt_attribution_v1";
const UTM = "rt_utm_v1";
const gaTill = (url: string, referrer = "") => {
  window.history.pushState({}, "", url);
  Object.defineProperty(document, "referrer", { value: referrer, configurable: true });
};
const nycklar = () => ({ attr: sessionStorage.getItem(ATTR), utm: sessionStorage.getItem(UTM) });

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  gaTill("/");
});
afterEach(() => window.removeEventListener(CONSENT_CHANGED_EVENT, syncStorageWithConsent));

describe("lagring före och efter samtycke", () => {
  it("inget val: inget sparas, och kampanjraden bygger bara på adressen", () => {
    gaTill("/taklaggare-taby?utm_source=google&utm_medium=cpc");
    initConsentStorage();
    expect(nycklar()).toEqual({ attr: null, utm: null });
    expect(utmLine()).toBe("Kampanj: source=google, medium=cpc");
    gaTill("/takkontroll"); // besökaren går vidare till formuläret: inget är ihågkommet
    expect(utmLine()).toBe("");
    expect(withUtm("Hej")).toBe("Hej");
    expect(nycklar()).toEqual({ attr: null, utm: null });
  });

  it("Endast nödvändiga: inget sparas och nycklar från en tidigare session tas bort", () => {
    sessionStorage.setItem(ATTR, JSON.stringify({ landing_path: "/gammal", referrer_category: "direkt" }));
    sessionStorage.setItem(UTM, JSON.stringify({ utm_source: "gammal" }));
    gaTill("/takkontroll?utm_source=google");
    initConsentStorage(); // vid start utan val: de gamla nycklarna rensas
    expect(nycklar()).toEqual({ attr: null, utm: null });
    saveConsent({ analytics: false, marketing: false });
    expect(nycklar()).toEqual({ attr: null, utm: null });
    expect(utmLine()).toBe("Kampanj: source=google");
    expect(attributionFields()).toEqual({ landing_path: null, referrer_category: null });
  });

  it("godkänt mitt i besöket: lagringen börjar då, första sidan är sidan där valet gjordes, kampanjen följer med", () => {
    gaTill("/taklaggare-taby"); // landade här utan val: ingenting sparades
    initConsentStorage();
    expect(nycklar()).toEqual({ attr: null, utm: null });
    gaTill("/takkontroll?utm_source=google&utm_campaign=test", "https://www.google.com/");
    saveConsent({ analytics: true, marketing: false });
    expect(JSON.parse(nycklar().attr!)).toMatchObject({ landing_path: "/takkontroll" });
    expect(JSON.parse(nycklar().utm!)).toEqual({ utm_source: "google", utm_campaign: "test" });
    gaTill("/offert"); // senare sida utan utm i adressen: den sparade kampanjen följer med
    expect(utmLine()).toBe("Kampanj: source=google, campaign=test");
    expect(utmFields()).toMatchObject({ utm_source: "google", utm_campaign: "test", utm_medium: null });
    expect(attributionFields().landing_path).toBe("/takkontroll");
  });

  it("godkänt vid start (återkommande besökare): lagringen börjar direkt på första sidan", () => {
    localStorage.setItem("rt_consent_v1", JSON.stringify({ analytics: true, marketing: false }));
    gaTill("/taklaggare-norrtalje?utm_source=bing");
    initConsentStorage();
    expect(JSON.parse(nycklar().attr!)).toMatchObject({ landing_path: "/taklaggare-norrtalje" });
    expect(JSON.parse(nycklar().utm!)).toEqual({ utm_source: "bing" });
  });

  it("återtaget val: nycklarna tas bort, och kampanjraden bygger åter bara på adressen", () => {
    initConsentStorage();
    gaTill("/takkontroll?utm_source=google");
    saveConsent({ analytics: true, marketing: false });
    expect(nycklar().attr).not.toBeNull();
    expect(nycklar().utm).not.toBeNull();
    saveConsent({ analytics: false, marketing: false });
    expect(nycklar()).toEqual({ attr: null, utm: null });
    gaTill("/offert");
    expect(utmLine()).toBe("");
    expect(attributionFields()).toEqual({ landing_path: null, referrer_category: null });
  });
});
