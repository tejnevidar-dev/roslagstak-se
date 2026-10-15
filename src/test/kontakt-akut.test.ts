/**
 * Regel 5-fynd på /kontakt (Marknadschefen 2026-10-11): den statiska texten lovade "akuta läckage" och "provisorisk tätning inom kort".
 * Akut och jour är förbjudet och "inom kort" är ett tidslöfte. Meningen är ersatt med redan godkända lydelser (landing-services.ts).
 */
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

describe("/kontakt: ingen akut- eller jourlöfte i den statiska texten", () => {
  it("den gamla meningen är borta och den godkända lydelsen står där", () => {
    const text = (prerenderContent("/kontakt")?.paragraphs ?? []).map((p) => (typeof p === "string" ? p : "")).join("\n");
    for (const borta of ["Akta läckage", "prioriterar akuta", "provisorisk tätning", "inom kort"]) expect(text, borta).not.toContain(borta);
    expect(text).toContain("Läcker det: ring 070-154 36 39. Vi svarar inom 24 timmar.");
  });
});
