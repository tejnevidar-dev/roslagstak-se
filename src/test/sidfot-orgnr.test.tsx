// @vitest-environment node
/**
 * Sidfoten visar inget organisationsnummer (Vidars beslut 2026-10-25: inget om bolaget eller org.nr på sajten tills namnbytet är klart). Provet ritar sidfoten på servern och kräver att varken
 * "Org.nr" eller sifferföljden 559 finns i den ritade HTML:en, och att komponentens källa inte längre bygger organisationsnumret. /cookies (personuppgiftsansvarig) rörs inte här.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Footer from "@/components/Footer";

describe("sidfoten utan organisationsnummer", () => {
  it("den ritade HTML:en har inget 'Org.nr' och inget '559'", () => {
    const html = renderToString(createElement(HelmetProvider, null, createElement(MemoryRouter, null, createElement(Footer))));
    expect(html).toContain("Norrtälje, Roslagen");
    expect(html).not.toMatch(/Org\.?\s?nr/i);
    expect(html).not.toContain("559");
    expect(html).not.toContain("3595");
  });
  it("komponenten bygger inte längre organisationsnumret, och övriga rader i sidfoten finns kvar", () => {
    const k = readFileSync("src/components/Footer.tsx", "utf8");
    expect(k).not.toMatch(/orgNr|Org\.nr|"559"|"3595"/);
    expect(k).toContain("Arbete enligt AMA · 10 års utförandegaranti"); // AMA-raden hålls i egen gren (paket-sidfot-rad) och är orörd här
    expect(k).toContain("Alla rättigheter förbehållna");
  });
});
