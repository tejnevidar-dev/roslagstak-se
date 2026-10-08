/**
 * Paritet för /offert och annonssidorna /offert/<ort> (AD3): QuotePage, QuoteConfigurator, FreeConsultation och AdLandingPage (React)
 * och den statiska HTML:en hämtar texten ur src/data/offert-text.ts, google-reviews-text.ts, related-links-text.ts och ad-landing-text.ts.
 * /offerts H1 ("Få pris på ditt takprojekt") är orörd och ingår inte.
 */
import { describe, expect, it } from "vitest";
import { AD_FAQS, AD_STEPS, AD_TEXT, AD_TRUST } from "@/data/ad-landing-text";
import { adLandings } from "@/data/ad-landings";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";
import { LEAD_FORM_SUBTITLE } from "@/data/landing-text";
import { FREE_CONSULT, QUOTE_CONFIG, QUOTE_PAGE } from "@/data/offert-text";
import { RELATED_LINKS_INTRO } from "@/data/related-links-text";
import { noindexPageBody, prerenderContent } from "../../scripts/prerender-content";

describe("/offert: statisk text", () => {
  it("har sidans, konfiguratorns och rådgivningens block samt omdömesbandet", () => {
    const lista = prerenderContent("/offert")!.paragraphs;
    const förväntat = [
      QUOTE_PAGE.eyebrow, QUOTE_PAGE.text, QUOTE_CONFIG.eyebrow, QUOTE_CONFIG.heading, QUOTE_CONFIG.intro, QUOTE_CONFIG.bannerTitle, QUOTE_CONFIG.bannerText,
      QUOTE_CONFIG.finePrintConfigure, `${QUOTE_CONFIG.privacy} ${QUOTE_CONFIG.privacyLink}.`, FREE_CONSULT.eyebrow, FREE_CONSULT.heading, FREE_CONSULT.text,
      ...FREE_CONSULT.items.flatMap((i) => [i.title, i.text]), GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress,
      QUOTE_PAGE.relatedTitle, RELATED_LINKS_INTRO,
    ];
    for (const t of förväntat) expect(lista, t.slice(0, 50)).toContain(t);
  });
});

describe("/offert/<ort>: statisk text", () => {
  it("varje annonssida har trygghetsrader, steg, prisnot, frågor och slutrubrik", () => {
    const saknas: string[] = [];
    for (const l of adLandings) {
      const body = noindexPageBody(`/offert/${l.slug}`);
      const lista = body?.paragraphs ?? [];
      const förväntat = [`Takläggare ${l.prep} ${l.name}`, ...AD_TRUST, LEAD_FORM_SUBTITLE, AD_TEXT.stepsHeading, ...AD_STEPS.flatMap((s) => [s.title, s.text]), AD_TEXT.priceHeading, AD_TEXT.priceText, AD_TEXT.faqHeading, ...AD_FAQS.flatMap((f) => [f.q, f.a]), AD_TEXT.finalHeading];
      for (const t of förväntat) if (!lista.includes(t)) saknas.push(`${l.slug}: ${t.slice(0, 40)}`);
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
