/**
 * Paket 91 (tillgänglighet, bara osynliga rättningar): den fasta knappraden längst ned på mobil är ett landmärke med namn, så att axe-regeln "region"
 * (allt innehåll ska ligga i ett landmärke) går igenom på sidorna med formulär. Ingen text, färg eller layout ändras: bara role och aria-label.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const kalla = (f: string) => readFileSync(f, "utf8");

describe("paket 91: den fasta knappraden är ett namngivet landmärke", () => {
  it("StickyMobileCTA (alla sidor utom annonssidorna) har role=region och aria-label", () => {
    const k = kalla("src/components/StickyMobileCTA.tsx");
    expect(k).toMatch(/role="region"\s+aria-label="Ring eller boka takkontroll"\s+className=\{`fixed bottom-0 left-0 right-0 z-50 md:hidden/);
  });
  it("annonssidornas knapprad (AdLandingPage) har role=region och aria-label, klasserna är oförändrade", () => {
    const k = kalla("src/pages/AdLandingPage.tsx");
    expect(k).toMatch(/role="region"\s+aria-label="Ring eller boka takkontroll"\s+className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border bg-background\/95 px-4 py-3 backdrop-blur md:hidden"/);
  });
  it("LeadForm.tsx är orörd av den här grenen (spärrad)", () => {
    expect(kalla("src/components/LeadForm.tsx")).not.toContain("Ring eller boka takkontroll");
  });
});
