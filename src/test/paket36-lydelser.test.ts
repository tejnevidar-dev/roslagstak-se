/**
 * Paket 36: Innehålls rättelser del 1 står ordagrant i koden, och de gamla lydelserna finns inte kvar.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "@/data/blog-posts";
import { locations } from "@/data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const reviews = readFileSync(resolve(__dirname, "../pages/Reviews.tsx"), "utf8");
const guide = (slug: string) => blogPosts.find((b) => b.slug === slug)!;

describe("paket 36", () => {
  it("/recensioner (React): 1a, 1b, 1c och 1h ordagrant, gamla lydelser borta", () => {
    for (const ny of [
      "Våra omdömen finns på Google. Följ länken till vår Google-profil för att läsa dem. Vi publicerar inga egenskrivna recensioner och kan inte kontrollera vem som skriver på Google.",
      "På Google, inte skrivna av oss",
      "Vi publicerar inga omdömen som vi själva har skrivit, och vi kan inte kontrollera vem som skriver på Google. Namn och datum visas hos Google, och vi kan inte redigera dem.",
      "Läs dem hos Google",
      "Google visar hela omdömet och när det skrevs. Det är enklare att bedöma än citat plockade ur sitt sammanhang.",
    ]) expect(reviews).toContain(ny);
    for (const gammal of ["hämtade från Google", "ber alla kunder", "vilket svar vi har lämnat", "Läs dem i original", "medvetet tagit bort"]) expect(reviews).not.toContain(gammal);
  });

  it("/recensioner (statisk HTML): 1e, 1f och 1g ordagrant, gamla lydelser borta", () => {
    const text = (prerenderContent("/recensioner")?.paragraphs ?? []).join("\n");
    for (const ny of [
      "Vi samlar våra omdömen på Google i stället för att publicera egenskrivna recensioner här på sajten. Vi kan inte kontrollera vem som skriver på Google.",
      "Följ länken till Google för att läsa omdömena. Har du själv anlitat oss får du gärna lämna ett omdöme.",
      "Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Vi börjar med en kostnadsfri takkontroll utan förpliktelser, och du får ett fast pris i offerten.",
    ]) expect(text).toContain(ny);
    for (const gammal of ["hämtade från Google", "stjärnbetyg", "takvård", "ber alla kunder", "på allt arbete"]) expect(text).not.toContain(gammal);
  });

  it("länkkortet (1d)", async () => {
    const { hubLinks: internalLinks } = await import("@/data/internal-links");
    expect(JSON.stringify(internalLinks)).toContain("Läs omdömen om RoslagsTak på vår Google-profil.");
    expect(JSON.stringify(internalLinks)).not.toContain("hämtade från Google");
  });

  it("Knivstas stycke (2d) är struket", () => {
    expect(locations.find((l) => l.slug === "knivsta")!.extraContent).toBe("");
  });

  it("solceller på plåttak (5.7): titeln utan tankstreck och garantimeningen utan försäkringsrådet", () => {
    const g = guide("solceller-platttak-roslagen");
    expect(g.title).toBe("Solceller på plåttak: vad du ska tänka på med taket");
    const t = g.content.join("\n");
    expect(t).toContain("Garantier: fråga både takläggaren och solcellsinstallatören hur monteringen påverkar garantierna.");
    expect(t).not.toContain("försäkringsbolag");
  });
});
