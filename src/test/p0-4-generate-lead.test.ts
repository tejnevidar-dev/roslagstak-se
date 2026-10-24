/**
 * P0-4 (seo-audit/06, Vidars ja 2026-10-24): generate_lead skickas exakt en gång per riktigt inskick, och testinskick filtreras. Inga formulär skickas live; kontrollen görs i koden och här.
 *  1. trackLead släpper testinskick och en andra händelse för samma formulär och samma telefon/e-post inom 60 sekunder.
 *  2. Alla fem formulär anropar trackLead exakt en gång, efter att sparandet gått bra (efter felgrenen med return), och ingen kod utanför analytics.ts anropar trackEvent med generate_lead.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

vi.mock("@/lib/consent", () => ({ hasAnalyticsConsent: () => true, hasMarketingConsent: () => false }));
vi.mock("@/lib/attribution", () => ({ attributionFields: () => ({}) }));
vi.mock("@/lib/metaPixel", () => ({ trackPixelLead: vi.fn() }));

import { arTestinskick, nollstallLeadMinne, trackLead } from "@/lib/analytics";

const rot = resolve(__dirname, "../..");
const kalla = (rel: string) => readFileSync(resolve(rot, rel), "utf8");

describe("P0-4: generate_lead", () => {
  const gtag = vi.fn();
  beforeEach(() => {
    gtag.mockClear();
    nollstallLeadMinne();
    (globalThis as unknown as { window: Record<string, unknown> }).window = Object.assign((globalThis as unknown as { window?: Record<string, unknown> }).window ?? {}, { gtag, location: { pathname: "/kontakt", search: "", hash: "" }, matchMedia: undefined });
  });

  it("testinskick känns igen: e-post på example/test-domän eller sajtens egen domän, namn som börjar på test, 'testinskick' i texten", () => {
    expect(arTestinskick({ name: "Anna", email: "anna@example.com" })).toBe(true);
    expect(arTestinskick({ name: "Anna", email: "anna@roslagstak.se" })).toBe(true);
    expect(arTestinskick({ name: "Test Testsson", email: "a@b.se" })).toBe(true);
    expect(arTestinskick({ name: "Anna", email: "a@b.se", message: "Det här är ett testinskick" })).toBe(true);
    expect(arTestinskick({ name: "Anna", email: "a@b.se", message: "[TEST] hej" })).toBe(true);
  });
  it("riktiga inskick filtreras inte (även namn och ord som innehåller 'test')", () => {
    expect(arTestinskick({ name: "Anna Svensson", email: "anna@gmail.com", phone: "070-111 22 33" })).toBe(false);
    expect(arTestinskick({ name: "Testa Svensson", email: "testa@gmail.com" })).toBe(false);
    expect(arTestinskick({ name: "Erik", email: "erik@hotmail.com", message: "Vi vill ha en kostnadsfri takkontroll, taket har tidigare testats av en besiktningsman" })).toBe(false);
    expect(arTestinskick({ name: "Bo", phone: "0701234567" })).toBe(false);
  });
  it("ett riktigt inskick ger exakt en generate_lead, och ett upprepat inskick inom 60 s för samma formulär och kontakt ger ingen till", () => {
    const f = { name: "Anna Svensson", email: "anna@gmail.com", phone: "070-111 22 33" };
    expect(trackLead("kontakt_sida", f, {}, 1_000_000)).toBe(true);
    expect(trackLead("kontakt_sida", f, {}, 1_020_000)).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag.mock.calls[0][1]).toBe("generate_lead");
    expect(gtag.mock.calls[0][2]).toMatchObject({ form: "kontakt_sida" });
  });
  it("efter 60 s, för ett annat formulär eller en annan kontakt räknas ett nytt inskick", () => {
    const f = { name: "Anna Svensson", email: "anna@gmail.com", phone: "070-111 22 33" };
    expect(trackLead("kontakt_sida", f, {}, 1_000_000)).toBe(true);
    expect(trackLead("kontakt_sida", f, {}, 1_061_000)).toBe(true);
    expect(trackLead("brf", f, {}, 1_062_000)).toBe(true);
    expect(trackLead("brf", { ...f, phone: "070-999 88 77", email: "bo@gmail.com" }, {}, 1_063_000)).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(4);
  });
  it("ett testinskick skickar ingen generate_lead alls", () => {
    expect(trackLead("kontakt_sida", { name: "Test Testsson", email: "t@example.com", phone: "0701111111" })).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  const FORMULAR: [string, string][] = [
    ["src/components/LeadForm.tsx", "trackLead("],
    ["src/components/BookingWidget.tsx", "trackLead("],
    ["src/components/QuoteConfigurator.tsx", "trackLead("],
    ["src/pages/BrfPage.tsx", "trackLead("],
    ["src/pages/ContactLanding.tsx", "trackLead("],
  ];
  it("alla fem formulär anropar trackLead exakt en gång, efter felgrenen, och ingen anropar trackEvent med generate_lead", () => {
    for (const [fil, anrop] of FORMULAR) {
      const s = kalla(fil);
      expect(s.split(anrop).length - 1, `${fil}: antal trackLead-anrop`).toBe(1);
      expect(s, fil).not.toMatch(/trackEvent\(\s*"generate_lead"/);
      const iAnrop = s.indexOf(anrop);
      const iFel = s.lastIndexOf("if (error)", iAnrop);
      expect(iFel, `${fil}: trackLead ska stå efter felgrenen`).toBeGreaterThan(-1);
      expect(s.slice(iFel, iAnrop), `${fil}: felgrenen ska avsluta med return före trackLead`).toContain("return;");
    }
  });
  it("inga andra filer än analytics.ts skickar generate_lead", () => {
    const filer = ["src/components", "src/pages", "src/lib"].flatMap((d) => {
      const rec = (p: string): string[] => {
        const { readdirSync, statSync } = require("node:fs") as typeof import("node:fs");
        return readdirSync(p).flatMap((n: string) => (statSync(`${p}/${n}`).isDirectory() ? rec(`${p}/${n}`) : /\.(ts|tsx)$/.test(n) ? [`${p}/${n}`] : []));
      };
      return rec(resolve(rot, d));
    });
    const traffar = filer.filter((f) => /["']generate_lead["']/.test(readFileSync(f, "utf8")) && !f.endsWith("lib/analytics.ts") && !f.endsWith("lib/metaPixel.ts"));
    expect(traffar).toEqual([]);
  });
});
