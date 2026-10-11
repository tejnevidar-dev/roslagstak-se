/**
 * Paket 45: med alla kakor blockerade kastar åtkomsten till window.localStorage och window.sessionStorage SecurityError. installSafeStorage() ersätter
 * då lagret med ett lager i minnet, så att ingenting kastar: kakvalet, attributionsfälten och kampanjraden beter sig som med "Endast nödvändiga".
 */
import { afterEach, describe, expect, it } from "vitest";
import { installSafeStorage, minneslager } from "@/lib/safe-storage";
import { readConsent, saveConsent } from "@/lib/consent";
import { attributionFields } from "@/lib/attribution";
import { captureUtm, utmFields, utmLine } from "@/lib/utm";

const orig = {
  localStorage: Object.getOwnPropertyDescriptor(window, "localStorage"),
  sessionStorage: Object.getOwnPropertyDescriptor(window, "sessionStorage"),
};
const blockera = (...namn: ("localStorage" | "sessionStorage")[]) => {
  for (const n of namn) Object.defineProperty(window, n, { configurable: true, get() { throw new DOMException("The operation is insecure.", "SecurityError"); } });
};
afterEach(() => {
  for (const n of ["localStorage", "sessionStorage"] as const) {
    delete (window as unknown as Record<string, unknown>)[n];
    if (orig[n]) Object.defineProperty(window, n, orig[n]!);
  }
  window.history.pushState({}, "", "/");
});

describe("installSafeStorage", () => {
  it("rör inget när lagringen fungerar", () => {
    expect(installSafeStorage()).toEqual([]);
    localStorage.setItem("x", "1");
    expect(localStorage.getItem("x")).toBe("1");
  });

  it("ersätter bara det lager vars åtkomst kastar", () => {
    blockera("sessionStorage");
    expect(() => window.sessionStorage).toThrow();
    expect(installSafeStorage()).toEqual(["sessionStorage"]);
    expect(() => window.sessionStorage.getItem("a")).not.toThrow();
    expect(window.sessionStorage.getItem("a")).toBeNull();
    window.sessionStorage.setItem("a", "b");
    expect(window.sessionStorage.getItem("a")).toBe("b"); // gäller bara medan sidan är öppen
    expect(() => window.localStorage.getItem("a")).not.toThrow();
  });

  it("båda lagren blockerade: ingen åtkomst kastar efteråt", () => {
    blockera("localStorage", "sessionStorage");
    expect(installSafeStorage().sort()).toEqual(["localStorage", "sessionStorage"]);
    for (const s of [window.localStorage, window.sessionStorage]) {
      expect(s.getItem("nyckel")).toBeNull();
      expect(() => s.setItem("nyckel", "värde")).not.toThrow();
      expect(() => s.removeItem("nyckel")).not.toThrow();
      expect(() => s.clear()).not.toThrow();
    }
    // Ett bibliotek som Supabase-klientens realtimedel läser global.sessionStorage direkt:
    expect(() => (globalThis as unknown as { sessionStorage: Storage }).sessionStorage).not.toThrow();
  });

  it("minneslagret följer Storage-gränssnittet", () => {
    const s = minneslager();
    s.setItem("a", "1");
    s.setItem("b", "2");
    expect(s.length).toBe(2);
    expect(s.key(0)).toBe("a");
    expect(s.key(5)).toBeNull();
    s.removeItem("a");
    expect(s.getItem("a")).toBeNull();
    s.clear();
    expect(s.length).toBe(0);
  });
});

describe("sajten utan lagring beter sig som med 'Endast nödvändiga'", () => {
  it("kakvalet kan sparas för sidvisningen utan fel, och är borta i nästa (nytt minneslager)", () => {
    blockera("localStorage", "sessionStorage");
    installSafeStorage();
    expect(readConsent()).toBeNull(); // inget val: kakrutan visas
    expect(() => saveConsent({ analytics: false, marketing: false })).not.toThrow();
    expect(readConsent()).toEqual({ analytics: false, marketing: false });
    // Ny sidvisning = nytt minneslager: inget val, kakrutan visas igen
    delete (window as unknown as Record<string, unknown>).localStorage;
    blockera("localStorage");
    installSafeStorage();
    expect(readConsent()).toBeNull();
  });

  it("de sex attributionsfälten är tomma och kampanjraden bygger bara på adressen", () => {
    blockera("localStorage", "sessionStorage");
    installSafeStorage();
    window.history.pushState({}, "", "/takkontroll?utm_source=google&utm_medium=cpc");
    captureUtm();
    expect({ ...attributionFields(), ...utmFields() }).toEqual({ landing_path: null, referrer_category: null, utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null });
    expect(utmLine()).toBe("Kampanj: source=google, medium=cpc");
  });
});
