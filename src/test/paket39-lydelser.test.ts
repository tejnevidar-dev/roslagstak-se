/**
 * Paket 39: tre briefar byggs ordagrant (Knivsta-ortstexten, guiden om snörasskydd och ansvar, Husarö-guidens slutrad).
 * Meningsgrinden (content-coverage-check.ts) kontrollerar varje mening; det här testet fäster de lydelser som beställningen pekade ut.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { usesMall } from "@/data/location-mall";
import { locations } from "@/data/locations";
import { ROT_FORBEHALL } from "@/data/prices";

const guide = (slug: string) => blogPosts.find((b) => b.slug === slug)!;

describe("paket 39", () => {
  it("39a Knivsta: egen text, det gamla stycket struket, inte längre mallsida", () => {
    const k = locations.find((l) => l.slug === "knivsta")!;
    expect(k.extraContent).toBe("");
    expect(k.longDescription.startsWith("Den som söker takläggare i Knivsta")).toBe(true);
    expect(usesMall(k)).toBe(false);
    expect(JSON.stringify(k)).not.toContain("skriftligt prisunderlag");
  });

  it("39b snörasskydd och ansvar: juristens excerpt och ingress, priset med ROT-förbehåll, slutraden", () => {
    const g = guide("snorasskydd-krav-tak");
    expect(g.title).toBe("Snörasskydd och ansvar för fastighetsägare");
    expect(g.excerpt).toBe("Vem ansvarar för snö och is som kan rasa från taket mot gata eller trottoar? Vilka krav som gäller för ditt hus avgör kommunens byggnadsnämnd.");
    const t = g.content.join("\n");
    expect(t).toContain("Snörasskydd är en säkerhetsfråga, och för hus som ligger intill gata eller trottoar också en ansvarsfråga.");
    expect(t).toContain("Vad som gäller i ett enskilt fall kan vi inte bedöma. Fråga ditt försäkringsbolag.");
    expect(t).toContain("**Snörasskydd:** från 600 kr/löpmeter, efter ROT-avdrag, inkl. moms. " + ROT_FORBEHALL);
    expect(t).toContain("Lagtexten: ordningslagen (1993:1617) 3 kap. 3 §. Lagtexten läst 2026-10-09.");
    for (const borta of ["Vi monterar alla typer", "oavsett om du väljer", "starkast möjliga montage", "Vi ritar in hela taksäkerhetslösningen", "Som husägare kan du bli ansvarig"]) expect(t, borta).not.toContain(borta);
  });

  it("39c Husarö-guiden: slutraden följer briefen", () => {
    const t = guide("takbyte-husaro-finnhamn-oar").content.join("\n");
    expect(t).toContain("Har du hus på Husarö eller en annan ö utan bilväg och funderar på taket? Hör av dig på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.");
    expect(t).not.toContain("Har du hus på Husarö eller Finnhamn");
  });
});
