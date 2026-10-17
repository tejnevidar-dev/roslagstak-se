/**
 * Paket 40: tre briefar byggs ordagrant (Uppsala-ortstexten, BRF-guiden, Husarö-guiden med förslag a–g utan Finnhamn).
 * Meningsgrinden (content-coverage-check.ts) kontrollerar varje mening; det här testet fäster de lydelser som beställningen pekade ut.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { usesMall } from "@/data/location-mall";
import { locations } from "@/data/locations";
import { ortSeoOverrides } from "@/data/seo-overrides";

const guide = (slug: string) => blogPosts.find((b) => b.slug === slug)!;

describe("paket 40", () => {
  it("40a Uppsala: egen ortstext med titel och meta ur briefen, inte längre mallsida", () => {
    const u = locations.find((l) => l.slug === "uppsala")!;
    expect(usesMall(u)).toBe(false);
    expect(u.longDescription.startsWith("Den som söker takläggare i Uppsala")).toBe(true);
    expect(ortSeoOverrides.uppsala.title).toBe("Takläggare i Uppsala – takbyte, fast pris | RoslagsTak"); // gren 120 (U3), tidigare "– fast pris efter takkontroll"
    expect(ortSeoOverrides.uppsala.description).toBe("Takläggare i Uppsala: villastaden i Kåbo, egnahemmen i Ekeby, Sunnersta och de yngre villaområdena. Kostnadsfri takkontroll och fast pris i offerten.");
  });

  it("40b BRF-guiden: briefens titel, meta och juristens steg 7, utan briefens ändringstabell", () => {
    const g = guide("byta-tak-brf-guide-styrelse");
    expect(g.title).toBe("Så byter ni tak i en BRF: guide för styrelsen");
    expect(g.excerpt).toBe("Guide för BRF-styrelser: takkontroll, underhållsplan, finansiering, stämmobeslut, upphandling och avtal. Så förbereder ni ett takbyte steg för steg.");
    const t = g.content.join("\n");
    expect(t).toContain("## Steg 7. Avtal");
    expect(t).not.toContain("Ändringar mot det som är live");
    expect(t).not.toContain("| # | Rad |");
    for (const borta of ["första besiktning", "Kräv garantibevis", "container"]) expect(t, borta).not.toContain(borta);
  });

  it("40c Husarö-guiden: a–g, och Finnhamn nämns inte i titel, meta, sökord eller text", () => {
    const g = guide("takbyte-husaro-finnhamn-oar");
    expect(g.title).toBe("Takbyte på Husarö: går det utan bilväg?");
    expect(g.excerpt).toBe("Husarö nås med båt. Så planeras ett takbyte på en ö utan bilväg, och så får du besked om ditt tak. Fast pris i offerten.");
    expect(g.title.length).toBe(39);
    expect(g.excerpt.length).toBe(120);
    expect(g.keywords).toEqual(["takbyte husarö", "takbyte ö utan bro", "byta tak på ö"]);
    expect(g.content[0]).toBe("Husarö är en ö i Österåkers kommun i mellersta Stockholms skärgård. Den nås med båt. Går det att byta tak där? Ja, men det behöver planeras på ett annat sätt än på fastlandet. Mer om ön finns på sidan [Husarö](/taklaggare-husaro).");
    expect(JSON.stringify({ title: g.title, excerpt: g.excerpt, keywords: g.keywords, content: g.content })).not.toMatch(/finnhamn/i);
    expect(g.slug).toBe("takbyte-husaro-finnhamn-oar"); // adressen ändras inte (regel 7)
  });
});
