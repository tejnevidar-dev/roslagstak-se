/**
 * Paritet för landningssidorna (AD2: /takkontroll, /takreparation, /rot-avdrag, /akut-lackage, /hangrannor, /platslagare,
 * /takbyte-var-2027): ServiceLandingPage.tsx och den statiska HTML:en (scripts/prerender-content.ts) hämtar texten ur
 * src/data/landing-services.ts och src/data/landing-text.ts. Testet kontrollerar att varje block finns i den statiska sidan.
 */
import { describe, expect, it } from "vitest";
import { landingServices } from "@/data/landing-services";
import { LANDING_TEXT, LEAD_FORM_SUBTITLE, landingTrust } from "@/data/landing-text";
import { stripInlineMd } from "@/lib/inline-md";
import { prerenderContent } from "../../scripts/prerender-content";

describe("landningssidornas statiska text", () => {
  for (const s of landingServices) {
    it(`${s.path}: alla block finns i den statiska sidan`, () => {
      const page = prerenderContent(s.path)!;
      const lista = page.paragraphs;
      const förväntat = [
        s.eyebrow,
        ...landingTrust(s.slug),
        s.formTitle,
        LEAD_FORM_SUBTITLE,
        ...(s.slug === "takkontroll" ? [LANDING_TEXT.takkontrollNote] : []),
        s.listHeading,
        s.listIntro,
        ...s.list.flatMap((i) => [i.title, i.text]),
        s.stepsHeading,
        ...s.steps.flatMap((st) => [st.title, st.text]),
        s.extraHeading,
        ...s.extraParagraphs,
        s.priceNote,
        s.faqTitle,
        LANDING_TEXT.faqIntro,
        ...s.faqs.flatMap((f) => [f.question, stripInlineMd(f.answer)]),
        LANDING_TEXT.relatedHeading,
      ];
      for (const t of förväntat) expect(lista, t.slice(0, 50)).toContain(t);
    });
  }
});
