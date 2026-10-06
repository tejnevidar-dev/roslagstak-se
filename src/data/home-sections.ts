/**
 * Texten i startsidans förtroende- och tjänstesektioner (Hero, TrustBar, QuickAccess, Services-rubriken).
 * Egen modul så att React-komponenterna och den statiska HTML:en (scripts/prerender-content.ts) använder exakt samma
 * strängar. Orden får bara ändras här. Paritetstestet src/test/home-static-parity.test.ts kontrollerar båda sidorna.
 */
import { GARANTI_RENOVERING_CHIP } from "./guarantee";

export const HOME_HERO = {
  eyebrow: "Takläggare i Roslagen & Stockholm",
  text: "Vi tar hand om hela processen — från första takkontrollen till sista plåtdetaljen. Takbyte, takrenovering och takreparation för villor, BRF:er och företag i hela Roslagen och Storstockholm.",
  chips: ["10 års utförandegaranti", GARANTI_RENOVERING_CHIP, "Fast pris", "Arbete enligt AMA", "Svar inom 24 h"],
};

export const HOME_TRUST_ITEMS: { value: string; label: string; accent?: boolean }[] = [
  { value: "10 år", label: "Utförandegaranti. 30 års tätskiktsgaranti via MATAKI när nytt tätskikt läggs" },
  { value: "Fast pris", label: "Tillägg bara efter ditt godkännande" },
  { value: "0 kr", label: "Takkontroll utan förpliktelser", accent: true },
];

export const HOME_QUICK = {
  eyebrow: "Snabbval",
  heading: "Vad behöver du hjälp med?",
  phone: "Hellre prata? 070-154 36 39",
  cards: [
    {
      label: "01 — Nytt tak",
      title: "Byta eller renovera taket",
      text: "Komplett takbyte från råspont till färdig plåt — eller en riktad åtgärd där taket läcker. Vi bedömer skicket på plats och lämnar ett fast pris innan vi börjar.",
      cta: "Se tjänster för villa & fritidshus",
    },
    {
      label: "02 — Underhåll & pris",
      title: "Takvård & vad det kostar",
      text: "Taktvätt, behandling och takmålning.",
      cta: "Räkna på ditt tak",
    },
  ],
};

export const HOME_SERVICES_INTRO = {
  eyebrow: "Våra tjänster",
  headingA: "Allt inom tak och plåt —",
  headingB: "under ett och samma tak.",
  text: "Villa, radhus, fritidshus eller bostadsrättsförening — du har en kontaktperson genom hela processen, från takkontroll till färdigt tak, med material valt för svenskt klimat.",
};
