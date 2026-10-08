/**
 * Paritetskontroll för /tjanster/<slug> (fas 2.50 P0): statisk HTML = synlig text.
 * Renderar den riktiga React-sidan (utan Header/Footer/omdömesband/SEOHead) och jämför med den
 * förrenderade speglingen (scripts/prerender-content.ts) i båda riktningarna:
 *   1. All synlig text på sidan finns i speglingen (annars ser crawlers utan JS mindre än besökaren).
 *   2. All text i speglingen finns på sidan (annars visar vi crawlers något besökaren inte ser).
 * Undantag: svar i dragspelsfrågor (stängda tills besökaren öppnar dem, finns i FAQPage-schemat).
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/GoogleReviews", () => ({ default: () => null }));
vi.mock("@/components/SEOHead", () => ({ default: () => null }));

import ServiceDetail from "@/pages/ServiceDetail";
import { services } from "@/components/Services";
import { prerenderContent } from "../../scripts/prerender-content";
import { serviceStaticPage } from "@/data/service-page";
import { GOOGLE_REVIEWS_TEXT } from "@/data/google-reviews-text";

const norm = (t: string) => t.replace(/\s+/g, " ").trim();

const renderedTexts = (slug: string): string[] => {
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: [`/tjanster/${slug}`] },
      createElement(Routes, null, createElement(Route, { path: "/tjanster/:slug", element: createElement(ServiceDetail) })),
    ),
  );
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  doc.querySelectorAll("script, style, noscript").forEach((n) => n.remove());
  // Breadcrumbs-navigeringen och ikonernas aria-etiketter är inte brödtext.
  doc.querySelectorAll("nav[aria-label='Brödsmulor']").forEach((n) => n.remove());
  const out: string[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = norm(node.textContent ?? "");
      if (t) out.push(t);
    } else node.childNodes.forEach(walk);
  };
  walk(doc.body);
  return out;
};

const renderedHeadingList = (slug: string): string[] => {
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: [`/tjanster/${slug}`] },
      createElement(Routes, null, createElement(Route, { path: "/tjanster/:slug", element: createElement(ServiceDetail) })),
    ),
  );
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  // Löpnummer ("01") som ligger i samma rubrikelement är layout, inte rubriktext.
  return [...doc.querySelectorAll("h2, h3")].map(
    (h) => `${h.tagName.toLowerCase()}:${norm((h.textContent ?? "").replace(/^\d{2}(?=\D)/, ""))}`,
  );
};

// Omdömesbandet (GoogleReviews) är mockat till null här men står i den statiska HTML:en (AG1, paket 21): tas bort ur jämförelsen, och testet tjanstesidor-static-parity kontrollerar det.
const OMDOMESBAND = new Set([GOOGLE_REVIEWS_TEXT.bandEyebrow, GOOGLE_REVIEWS_TEXT.title, GOOGLE_REVIEWS_TEXT.ingress].map(norm));

describe("tjänstesidornas spegling mot synlig text", () => {
  for (const { slug } of services) {
    it(`/tjanster/${slug}: statisk HTML = synlig text`, () => {
      const page = prerenderContent(`/tjanster/${slug}`);
      expect(page, "prerenderContent saknas").not.toBeNull();
      const sp = serviceStaticPage(slug, services)!;
      const staticParts = [page!.h1, page!.intro, ...page!.paragraphs, ...page!.links.map((l) => l.label)].map(norm);
      const staticBlob = staticParts.join(" \n ");
      const visible = renderedTexts(slug);
      const visibleBlob = visible.join(" \n ");
      // Stycken med fet text eller länkar delas i flera textnoder i DOM:en: jämför också mot texten sammanfogad med blanksteg
      const visibleFlat = visible.join(" ").replace(/\s+([.,;:!?)])/g, "$1");

      // 1. synligt → spegling (varje textnod hittas i speglingen)
      // Rena löpnummer ("01.", "03") och ikonlösa räknare är layout, inte text.
      const missingInStatic = visible.filter((t) => !/^\d{1,2}\.?$/.test(t) && !staticBlob.includes(t));
      expect(missingInStatic, "synlig text som saknas i den statiska HTML:en").toEqual([]);

      // 2. spegling → synligt (varje stycke finns på sidan, utom stängda dragspelssvar)
      const hidden = new Set(sp.hiddenAnswers.map(norm));
      const missingInVisible = [page!.intro, ...page!.paragraphs]
        .map(norm)
        .filter((t) => t && !OMDOMESBAND.has(t) && !hidden.has(t) && !visibleBlob.includes(t) && !visibleFlat.includes(t) && !visible.some((v) => t.includes(v) && v.length > 0 && t === v));
      // en spegelrad som "k: v" (spec) eller kombinerad rad räknas som funnen om alla delar syns
      const stillMissing = missingInVisible.filter((t) => {
        const parts = t.split(/: /);
        return !(parts.length > 1 && parts.every((p) => visibleBlob.includes(p)));
      });
      expect(stillMissing, "text i den statiska HTML:en som inte syns på sidan").toEqual([]);

      // 3. rubriker: samma h2/h3 i speglingen som på den renderade sidan (G1)
      const staticHeadings = Object.entries(page!.headingAt ?? {})
        .filter(([i]) => !OMDOMESBAND.has(norm(page!.paragraphs[Number(i)])))
        .map(([i, level]) => `h${level}:${norm(page!.paragraphs[Number(i)].replace(/[.:]$/, ""))}`)
        .sort();
      const renderedHeadings = renderedHeadingList(slug).sort();
      expect(renderedHeadings, "rubriker på sidan och i speglingen ska vara desamma").toEqual(staticHeadings);
    });
  }
});
