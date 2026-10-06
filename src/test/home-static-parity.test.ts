import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

/**
 * Paritet för startsidans förtroende- och tjänstesektioner (R4): samma text i React-komponenterna (Hero, TrustBar,
 * QuickAccess, Services) och i den förrenderade, statiska HTML:en (scripts/prerender-content.ts). Texten kommer ur
 * src/data/home-sections.ts och services-arrayen i Services.tsx. Testet kontrollerar att varje sträng finns i bådadera,
 * och att rubrikerna har samma nivå och ordning som på sidan.
 */
vi.mock("@/components/GoogleReviews", () => ({ default: () => null }));

import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import QuickAccess from "@/components/QuickAccess";
import Services, { services } from "@/components/Services";
import { HOME_HERO, HOME_TRUST_ITEMS, HOME_QUICK, HOME_SERVICES_INTRO } from "@/data/home-sections";
import { prerenderContent } from "../../scripts/prerender-content";

const norm = (t: string) => t.replace(/\s+/g, " ").trim();
const renderText = (el: ReturnType<typeof createElement>): string => {
  const html = renderToStaticMarkup(createElement(MemoryRouter, null, el));
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  doc.querySelectorAll("script, style, noscript").forEach((n) => n.remove());
  const out: string[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = norm(node.textContent ?? "");
      if (t) out.push(t);
    } else node.childNodes.forEach(walk);
  };
  walk(doc.body);
  return out.join(" \n ");
};

const page = prerenderContent("/")!;
const staticParas = page.paragraphs.map(norm);

describe("startsidans sektioner: statisk HTML = React", () => {
  const sektioner: { namn: string; react: () => string; strangar: string[] }[] = [
    {
      namn: "Hero",
      react: () => renderText(createElement(Hero)),
      strangar: [HOME_HERO.eyebrow, HOME_HERO.text, ...HOME_HERO.chips],
    },
    {
      namn: "TrustBar",
      react: () => renderText(createElement(TrustBar)),
      strangar: HOME_TRUST_ITEMS.flatMap((i) => [i.value, i.label]),
    },
    {
      namn: "QuickAccess",
      react: () => renderText(createElement(QuickAccess)),
      strangar: [HOME_QUICK.eyebrow, HOME_QUICK.heading, HOME_QUICK.phone, ...HOME_QUICK.cards.flatMap((c) => [c.label, c.title, c.text, c.cta])],
    },
    {
      namn: "Services",
      react: () => renderText(createElement(Services)),
      strangar: [
        HOME_SERVICES_INTRO.eyebrow,
        `${HOME_SERVICES_INTRO.headingA} ${HOME_SERVICES_INTRO.headingB}`,
        HOME_SERVICES_INTRO.text,
        ...services.filter((s) => !s.hideOnHome).flatMap((s, i) => [`${String(i + 1).padStart(2, "0")} — ${s.short}`, s.title, s.description]),
      ],
    },
  ];

  for (const s of sektioner) {
    it(`${s.namn}: varje sträng finns i React och i statisk HTML`, () => {
      const reactText = norm(s.react().replace(/ \n /g, " "));
      const reactFlat = s.react();
      const saknasReact = s.strangar.filter((t) => !reactText.includes(norm(t)) && !reactFlat.includes(norm(t)));
      expect(saknasReact, `${s.namn}: text som saknas i React-komponenten`).toEqual([]);
      const saknasStatiskt = s.strangar.filter((t) => !staticParas.includes(norm(t)));
      expect(saknasStatiskt, `${s.namn}: text som saknas i den statiska HTML:en`).toEqual([]);
    });
  }

  it("rubrikerna i den statiska HTML:en har samma nivå som på sidan", () => {
    const h = (text: string) => {
      const i = staticParas.indexOf(norm(text));
      return i >= 0 ? page.headingAt?.[i] : undefined;
    };
    expect(h(HOME_QUICK.heading)).toBe(2);
    for (const c of HOME_QUICK.cards) expect(h(c.title)).toBe(3);
    expect(h(`${HOME_SERVICES_INTRO.headingA} ${HOME_SERVICES_INTRO.headingB}`)).toBe(2);
    for (const s of services.filter((x) => !x.hideOnHome)) expect(h(s.title), s.title).toBe(3);
  });

  it("sektionerna ligger i samma ordning som på sidan: hero, förtroende, snabbval, referensjobb, tjänster", () => {
    const pos = (t: string) => staticParas.indexOf(norm(t));
    const ordning = [HOME_HERO.eyebrow, HOME_TRUST_ITEMS[0].value, HOME_QUICK.heading, "Referensjobb", HOME_SERVICES_INTRO.eyebrow].map(pos);
    expect(ordning.every((p) => p >= 0)).toBe(true);
    expect([...ordning].sort((a, b) => a - b)).toEqual(ordning);
  });
});
