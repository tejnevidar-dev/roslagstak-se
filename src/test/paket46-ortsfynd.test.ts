/**
 * Paket 46 (Marknadschefen 2026-10-11): Innehålls läsning av ortssidorna, omgång 1: Stuvsta S1–S5 med "Enligt Wikipedia" och L4-meningen, Norröra N1, Danderyd D1, Vallentuna V1, Rimbo R1.
 * N2 (filmtiteln på Norröra) och meningen om konstruktör ändras inte.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";

const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const text = (slug: string) => JSON.stringify(ort(slug));

describe("paket 46", () => {
  it("Stuvsta: S1 (husens ålder), S2 (grannar), S3 (värdeord), S4 (tom mening), S5 (slutmeningen), källan namnges och L4-meningen står sist", () => {
    const t = text("stuvsta");
    for (const borta of ["har kommit upp i en ålder där många ägare", "kan grannar ibland ha nytta av att planera", "ovanligt blandad kommundel", "trettio år gammalt kedjehus", "påminnelse om att Stuvsta är ett samhälle med lång historia", "Funderar du på att byta eller lägga om taket i Stuvsta", "Enligt beskrivningar av kommundelen"]) expect(t, borta).not.toContain(borta);
    for (const ny of [
      "Rad- och kedjehusen i Myrängen är från 1980- och 1990-talen. Husens ålder säger inte hur gammalt taket är, och hur underlaget ser ut i dag går inte att se från gatan.",
      "I en länga där husen byggdes samtidigt ser taken lika ut från gatan, men de har skötts var för sig. Varje hus får en egen takkontroll och ett eget pris.",
      "I Stuvsta kan alltså en hundraårig villa och ett kedjehus från 1990-talet ligga några kvarter från varandra. Vi är en takfirma med bas i Norrtälje och tar uppdrag i Stuvsta.",
      "Bor du i Stuvsta och funderar på taket?",
      "Enligt Wikipedia byggdes dessutom rad- och kedjehus i Myrängen under 1980- och 1990-talen.",
    ]) expect(t, ny).toContain(ny);
    expect(ort("stuvsta").sourceLink?.label).toBe("Wikipedia, Stuvsta");
  });
  it("Norröra N1: 'har hunnit läggas om igen' blir 'kan ha lagts om igen', och N2 (Saltkråkan) står kvar", () => {
    const t = text("norrora");
    expect(t).not.toContain("har det hunnit läggas om igen");
    expect(t).toContain("och sedan dess kan det ha lagts om igen");
    expect(t).toContain("Saltkråkan");
  });
  it("Danderyd D1: källan namnges", () => {
    expect(text("danderyd")).toContain("Under 1940-talet var enligt Wikipedia alla tomter bebyggda.");
    expect(text("danderyd")).not.toContain("enligt uppgifterna alla tomter");
  });
  it("Vallentuna V1: 'vid samma tillfälle' är borta på Vallentuna", () => {
    expect(text("vallentuna")).not.toContain("kan löna sig att titta på vid samma tillfälle");
    // gren 134 (Marknadschefens regler 2026-10-20): "ofta … behöver ses över ibland" ersatt med "kan det finnas fler tak än bostadshusets"
    expect(text("vallentuna")).not.toContain("behöver ses över ibland");
    expect(text("vallentuna")).toContain("På en gård kan det finnas fler tak än bostadshusets, till exempel uthus och bodar.");
  });
  it("Rimbo R1: reparation eller omläggning beror på underlaget, utan husets ålder", () => {
    expect(text("rimbo")).not.toContain("På hus från 1970- och 1980-talen som inte har fått nytt tak");
    expect(text("rimbo")).toContain("Om det räcker med en reparation eller om hela taket bör läggas om beror bland annat på underlaget under ytskiktet, och hur det ser ut i dag går inte att se från marken."); // gren 156 (Innehålls kommuner3/norrtalje3-rader): tidigare "… ytskiktet. Det syns sällan från marken." // paket 111 (O5): "bland annat"
  });
  it("meningen om konstruktör på Åkersberga och Vaxholm ändras inte", () => {
    expect(text("akersberga") + text("vaxholm")).toContain("bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs");
  });
});
