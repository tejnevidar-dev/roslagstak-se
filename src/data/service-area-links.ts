/**
 * Fas 2.15 / #1ag punkt 2: alla 9 tjänstesidor länkade tidigare till samma två ortssidor (Blidö,
 * Ljusterö) oavsett tjänst — noll länkvärde till de 12 områdessidor som seo-vecka.md visade med
 * bara 3–4 inlänkar (Österskär, Brevik, Ormsta, Vallatorp och Visinge, Nora och Kevinge,
 * Bollstanäs, Tegelhagen och Silverdal, Mölna, Sticklinge, Lännersta, Solhem och Lunda,
 * Viggbyholm). Varje tjänstesida länkar nu i stället till 1–2 av dessa, deterministiskt
 * fördelade (ingen slump, ingen geografisk relevansregel bruten — vi arbetar i alla områdena).
 *
 * Delad källa för src/pages/ServiceDetail.tsx (klientsidan) OCH scripts/prerender-content.ts
 * (den statiska kopian) — annars syns länkarna bara för besökare med JS, inte för crawlers som
 * läser den förrenderade HTML:en direkt (samma mönster som flera andra fynd denna sprint).
 */
/* Vidars beslut 10f (2026-10-01, beslut.md): taktvätt, takmålning och takkupor/takfönster
 * erbjuds och får länkas som alla andra tjänster. "takvard" och "takkupor" ingår därför nu i
 * fördelningen nedan, med ett extra inlänk vardera till två av de 12 områdena. */
export const serviceAreaLinks: Record<string, { to: string; label: string }[]> = {
  takomlaggning: [
    { to: "/taklaggare-osterskar", label: "Takläggare i Österskär" },
    { to: "/taklaggare-molna", label: "Takläggare i Mölna" },
  ],
  takrenovering: [
    { to: "/taklaggare-brevik", label: "Takläggare i Brevik" },
    { to: "/taklaggare-sticklinge", label: "Takläggare i Sticklinge" },
  ],
  takavvattning: [
    { to: "/taklaggare-ormsta", label: "Takläggare i Ormsta" },
    { to: "/taklaggare-lannersta", label: "Takläggare i Lännersta" },
  ],
  takinspektion: [
    { to: "/taklaggare-vallatorp-visinge", label: "Takläggare i Vallatorp och Visinge" },
    { to: "/taklaggare-solhem-lunda", label: "Takläggare i Solhem och Lunda" },
  ],
  platarbeten: [
    { to: "/taklaggare-nora-kevinge", label: "Takläggare i Nora och Kevinge" },
    { to: "/taklaggare-viggbyholm", label: "Takläggare i Viggbyholm" },
  ],
  "eternit-asbest": [{ to: "/taklaggare-bollstanas", label: "Takläggare i Bollstanäs" }],
  tegeltak: [{ to: "/taklaggare-tegelhagen-silverdal", label: "Takläggare i Tegelhagen och Silverdal" }],
  takvard: [{ to: "/taklaggare-bollstanas", label: "Takläggare i Bollstanäs" }],
  takkupor: [{ to: "/taklaggare-tegelhagen-silverdal", label: "Takläggare i Tegelhagen och Silverdal" }],
};
