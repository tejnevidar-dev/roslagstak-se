/**
 * Gren 180 (#13): egna FAQ-svar på 212 ortssidor (steg 1–22 i innehall/faq-egna-2026-10-22.md, godkända av Marknadschefen). De tre egna frågorna ersätter mallens tre
 * om tidsåtgång, takmaterial och "byta eller renovera"; pris, garanti, ROT, bokning och eternit står kvar. Svaren står i serverns HTML och i FAQPage.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { ortAvindexerad } from "../data/avindexerade-orter";
import { EGNA_FAQ, egnaFaqFor } from "../data/location-egna-faq";
import { generateLocationFAQs } from "../data/location-faqs";
import { prerenderContent } from "../../scripts/prerender-content";

const MALL = ["Hur lång tid tar ett takbyte", "Vilka takmaterial lägger ni", "Behöver jag byta hela taket eller räcker en renovering"];
const KVAR = ["Vad kostar ett takbyte", "Erbjuder ni garanti", "Kan jag använda ROT-avdrag", "Hur bokar jag en kostnadsfri takkontroll", "Kan ni byta ett eternittak"];
const slugs = Object.keys(EGNA_FAQ);
const sida = (slug: string) => prerenderContent(`/taklaggare-${slug}`)!;
const ld = (slug: string) => (sida(slug).jsonLd as { "@type"?: string; mainEntity?: { name: string; acceptedAnswer?: { text: string } }[] }[]).find((n) => n["@type"] === "FAQPage");

describe("gren 180: egna FAQ-svar per ortssida", () => {
  it("212 sidor, tre frågor var, alla på sidor som finns och är indexerbara, inga dubbletter och inga tomma svar", () => {
    expect(slugs.length).toBe(212); // 206 (steg 1–22 utom Trosa och Nyköping) + 6 (steg 23, gren 183)
    // gren 180b: Trosa och Nyköping ligger utanför Vidars område och behåller mallens frågor (Marknadschefen 2026-10-22 00:54)
    expect(slugs).not.toContain("trosa");
    expect(slugs).not.toContain("nykoping");
    for (const s of slugs) {
      const l = locations.find((x) => x.slug === s);
      expect(l, s).toBeTruthy();
      expect(ortAvindexerad(s), `${s}: avindexerad`).toBe(false);
      const f = EGNA_FAQ[s];
      expect(f.length, s).toBe(3);
      expect(new Set(f.map((x) => x.question)).size, s).toBe(3);
      for (const x of f) {
        expect(x.question.endsWith("?"), `${s}: ${x.question}`).toBe(true);
        expect(x.answer.length, `${s}: ${x.question}`).toBeGreaterThan(40);
        expect(MALL.some((m) => x.question.startsWith(m)), `${s}: egen fråga ser ut som mallens`).toBe(false);
      }
    }
  });

  it("generateLocationFAQs: med egna svar byts de tre mallfrågorna, utan egna svar är listan som förut", () => {
    const utan = generateLocationFAQs("Täby", "i", false).map((f) => f.question);
    expect(utan.length).toBe(8);
    for (const m of MALL) expect(utan.some((q) => q.startsWith(m)), m).toBe(true);
    const med = generateLocationFAQs("Täby", "i", false, undefined, egnaFaqFor("taby")).map((f) => f.question);
    expect(med.length).toBe(8);
    for (const m of MALL) expect(med.some((q) => q.startsWith(m)), m).toBe(false);
    for (const k of KVAR) expect(med.some((q) => q.startsWith(k)), k).toBe(true);
    for (const e of EGNA_FAQ.taby) expect(med).toContain(e.question);
  });

  it("serverns HTML och FAQPage har de tre egna frågorna och svaren, och inte mallens tre, på varje sida med egna svar", () => {
    for (const s of slugs) {
      const c = sida(s);
      const text = c.paragraphs.map((p) => (typeof p === "string" ? p : "")).join("\n");
      const fragor = (ld(s)?.mainEntity ?? []).map((q) => q.name);
      for (const e of EGNA_FAQ[s]) {
        expect(text, `${s}: ${e.question}`).toContain(e.question);
        expect(text, `${s}: svar ${e.question}`).toContain(e.answer.slice(0, 60));
        expect(fragor, `${s}: FAQPage`).toContain(e.question);
      }
      for (const m of MALL) expect(fragor.some((q) => q.startsWith(m)), `${s}: ${m}`).toBe(false);
      expect(new Set(fragor).size, `${s}: dubbletter i FAQPage`).toBe(fragor.length);
    }
  });

  it("sidor utan egna svar behåller mallens frågor", () => {
    const utan = locations.filter((l) => !EGNA_FAQ[l.slug] && !ortAvindexerad(l.slug) && prerenderContent(`/taklaggare-${l.slug}`));
    expect(utan.length).toBeGreaterThan(0);
    for (const l of utan.slice(0, 10)) {
      const fragor = (ld(l.slug)?.mainEntity ?? []).map((q) => q.name);
      if (fragor.length) expect(fragor.some((q) => q.startsWith("Hur lång tid tar ett takbyte")), l.slug).toBe(true);
    }
  });

  it("inga belopp, ingen 'ofta' och inga löften om närvaro i de egna svaren (regel 5)", () => {
    for (const s of slugs) for (const e of EGNA_FAQ[s]) {
      expect(e.answer, `${s}: belopp`).not.toMatch(/\d[\d  ]*\s?kr\b/);
      expect(e.answer, `${s}: ofta`).not.toMatch(/\b(ofta|oftast)\b/i);
      expect(e.answer, `${s}: garantibevis`).not.toMatch(/skriftlig garanti|garantibevis/i);
    }
  });
});
