/**
 * Paket 105: landningssidorna och /boka-takkontroll enligt Innehålls passrapport 159 (innehall/landningssidor-lasning-2026-10-15.md):
 * L2–L9, L11–L13 och "slutgenomgång" struket på landningssidorna (inte på /brf). L1 (jour) är gjort i 99b och L10 (lackerad plåt) i 100b.
 * Väntar på Vidar och är orört: ränndalar och fotplåt på /hangrannor, enskilda plåtjobb på /platslagare.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { noindexPageBody, noindexPageMeta, prerenderContent } from "../../scripts/prerender-content";
import { bookingCopy } from "../data/ad-landings";
import { BOOKING_ENABLED } from "../lib/booking";
import { GARANTI_RENOVERING_CHIP } from "../data/guarantee";

const sida = (p: string) => JSON.stringify(prerenderContent(p));
const kalla = (f: string) => readFileSync(f, "utf8");

describe("paket 105: /boka-takkontroll lovar inte en dagväljare som inte finns", () => {
  it("bokningen är avstängd, och rubrik, ingress och meta säger det som formuläret gör", () => {
    expect(BOOKING_ENABLED).toBe(false);
    expect(bookingCopy.h1Accent).toBe("Vi svarar inom 24 timmar.");
    expect(bookingCopy.intro.endsWith("Kostnadsfritt och utan förpliktelser.")).toBe(true);
    expect(bookingCopy.metaDescription).toBe("Boka en kostnadsfri takkontroll. Vi svarar inom 24 timmar. Fast pris, utan förpliktelser.");
    const t = JSON.stringify([noindexPageBody("/boka-takkontroll"), noindexPageMeta("/boka-takkontroll")]);
    expect(t).not.toMatch(/Välj dag|välj dag/);
    expect(t).toContain("Boka kostnadsfri takkontroll. Vi svarar inom 24 timmar.");
    expect(t).toContain("Boka en kostnadsfri takkontroll. Vi svarar inom 24 timmar. Fast pris, utan förpliktelser.");
  });
  it("märket om tätskiktsgarantin har villkoret (kort G3-form), samma i React", () => {
    expect(GARANTI_RENOVERING_CHIP).toBe("30 års produktgaranti från MATAKI på underlagstaket, som standard");
    const k = kalla("src/pages/BookingPage.tsx");
    expect(k).toContain("GARANTI_RENOVERING_CHIP");
    expect(k).not.toContain('"30 års tätskiktsgaranti via MATAKI"');
    expect(k).toContain("description={bookingCopy.metaDescription}");
  });
});

describe("paket 105: landningssidornas texter", () => {
  it("/takreparation: L5, L6, L7 och 'slutgenomgång' bort", () => {
    const t = sida("/takreparation");
    expect(t).toContain("Orsaker till att tak läcker eller tar skada, och vad vi gör åt dem.");
    expect(t).not.toContain("De vanligaste orsakerna");
    expect(t).toContain("Plåtbeslag runt skorstenar, ventiler och genomföringar är ställen där ett läckage kan börja.");
    expect(t).not.toContain("är där många läckage börjar");
    expect(t).toContain("En av våra säljare tittar på taket på plats och bedömer om en reparation räcker.");
    expect(t).not.toContain("orsaken till skadan");
    expect(t).not.toMatch(/lutgenomgång/);
    expect(t).toContain("Reparation");
  });
  it("/akut-lackage: L8, L9", () => {
    const t = sida("/akut-lackage");
    expect(t).toContain("Vi gör en kostnadsfri takkontroll och lämnar en offert med fast pris.");
    expect(t).not.toContain("letar efter var vattnet kommer in");
    expect(t).toContain("En av våra säljare tittar på taket på plats.");
    expect(t).toContain("Ett läckage kan börja kring skorstenar, ventiler och andra genomföringar,");
    expect(t).not.toContain("Många läckage börjar");
  });
  it("/hangrannor: L11, och ränndalar och fotplåt (väntar på Vidar) är orörda", () => {
    const t = sida("/hangrannor");
    expect(t).toContain("En av våra säljare tittar på taket och avvattningen på plats.");
    expect(t).not.toContain("Vi tittar på befintliga rännor, takyta och fasad");
    expect(t).toContain("ränndalar och fotplåt");
  });
  it("/platslagare: L12 (kortets rad struken, ingen tom rad) och L13; enskilda plåtjobb är orört", () => {
    const t = sida("/platslagare");
    expect(t).not.toContain("Det är ofta plåtdetaljerna som avgör om ett tak håller tätt");
    expect(t).toContain("Beslaget runt skorstenen är en plats där ett läckage kan börja.");
    expect(t).not.toContain("där många läckage börjar");
    expect(t).toContain("Gäller det ett enskilt plåtjobb");
    expect(kalla("src/pages/ServiceLandingPage.tsx")).toContain("service.listIntro && ");
  });
  it("'slutgenomgång' på /brf är orört", () => {
    expect(kalla("src/data/brf-sections.ts")).toMatch(/lutgenomgång/);
  });
});
