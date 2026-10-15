/**
 * Paket 98 (Innehålls ordning i text-server-react-lasning-2026-10-15.md): /offert utan priskalkylatorn i serverns HTML och med K3 i "Så går det till";
 * /kontakt i React har samma godkända lydelser som serverns HTML (K3, öarna, jouren). "Räkna ut din offert" (knapptext) och formuläret är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const text = (p: string) => {
  const s = prerenderContent(p)!;
  return [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 98: /offert i serverns HTML", () => {
  const t = text("/offert");
  it("priskalkylatorn som inte finns är struken, resten av stycket står kvar", () => {
    expect(t).not.toContain("Välj taktyp, ange takets yta och lutning och få ett riktpris direkt");
    expect(t).toContain("Du får ett fast pris i offerten efter kostnadsfri takkontroll, och vi lämnar 10 års utförandegaranti på det arbete vi utför.");
  });
  it("'Så går det till' har K3: rapport om takets skick, och offert bara om taket behöver åtgärdas", () => {
    expect(t).toContain("En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Tillägg görs bara efter ditt godkännande.");
    expect(t).not.toContain("Efter takkontrollen får du en offert med fast pris. Tillägg görs");
  });
  it("länktexten 'Räkna ut din offert' och knappen 'Konfigurera din offert' är orörda (Vidars)", () => {
    expect(kalla("src/data/internal-links.ts")).toContain("Räkna ut din offert");
    expect(kalla("src/pages/Prices.tsx")).toContain("Konfigurera din offert");
  });
});

describe("paket 98: /kontakt i React har serverns godkända lydelser", () => {
  const k = kalla("src/pages/ContactLanding.tsx");
  const server = text("/kontakt");
  it("steg 2 och 3 har Innehålls lydelser (inte 'en av våra säljare kontaktar dig')", () => {
    expect(k).toContain('text: "Vi svarar inom 24 timmar och bokar en tid för takkontroll som passar dig."');
    expect(k).toContain('text: "En av våra säljare tittar på taket på plats. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris."');
    expect(k).not.toContain("En av våra säljare kontaktar dig för att boka takkontrollen.");
  });
  it("ö-lydelsen och jour-raden står i React, ordagrant som i serverns HTML", () => {
    const o = "För dig på en ö: vi tar uppdrag i skärgården. Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.";
    const j = "Läcker det: ring 070-154 36 39. Vi svarar inom 24 timmar och har ingen jour.";
    expect(k).toContain(o);
    expect(k).toContain(j);
    expect(server).toContain(o);
    expect(server).toContain(j);
  });
  it("formuläret är orört: inga ändringar i fälten, knappen eller LeadForm.tsx", () => {
    expect(kalla("src/components/LeadForm.tsx")).not.toContain("paket 98");
    expect(k).toContain('<form');
  });
});
