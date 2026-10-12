/**
 * Paket 44a (Vidars ja, Marknadschefen 2026-10-12): integritetsraden under skicka-knappen i LeadForm.tsx. Bara den raden, texten och länken ur leadform-diffar-hemsida.md, diff 3,
 * samma lydelse som i BookingWidget och QuoteConfigurator.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUOTE_CONFIG } from "@/data/offert-text";

const k = readFileSync("src/components/LeadForm.tsx", "utf8").replace(/\r\n/g, "\n");

describe("paket 44a: integritetsraden i LeadForm", () => {
  it("raden står direkt efter skicka-knappen, före formulärets slut, med länk till /cookies", () => {
    expect(k).toContain(
      '      </button>\n      <p className="text-xs text-muted-foreground">\n        Vi sparar dina uppgifter för att kunna kontakta dig om din förfrågan. Läs mer i vår{" "}\n        <a href="/cookies" className="underline hover:text-foreground">integritetsinformation</a>.\n      </p>\n    </form>',
    );
  });
  it("lydelsen är samma som i offertkonfiguratorn", () => {
    expect(QUOTE_CONFIG.privacy).toBe("Vi sparar dina uppgifter för att kunna kontakta dig om din förfrågan. Läs mer i vår");
    expect(QUOTE_CONFIG.privacyLink).toBe("integritetsinformation");
    expect(k).toContain(QUOTE_CONFIG.privacy);
  });
  it("ingen annan text i filen har lagts till: raden förekommer en gång", () => {
    expect(k.split("Vi sparar dina uppgifter").length - 1).toBe(1);
  });
});
