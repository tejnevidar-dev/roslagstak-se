/**
 * Paket 100: övriga tjänstesidor enligt Innehålls passrapport 150 (innehall/tjanstesidor-lasning-2026-10-15.md), det Marknadschefen godkände 2026-10-15.
 * /takkupor utan märket om tätskiktsgarantin, /takrenovering i linje med problemsidan om underlagspapp, det obelagda borta på /platarbeten, /takavvattning och /tegeltak.
 * Plåtarbeten som eget jobb och adressen /tjanster/takinspektion är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { serviceDetails, serviceMeta, tatskiktChip } from "../data/service-page";

// hela serverns innehåll för sidan, som en enda sträng (stycken, rutor, specifikationer, länkar)
const sida = (p: string) => JSON.stringify(prerenderContent(p));

describe("paket 100: /tjanster/takkupor", () => {
  it("märket '30 års tätskiktsgaranti via MATAKI' är borta som chip (garantirutan med villkor står kvar)", () => {
    expect(tatskiktChip("takkupor")).toBeNull();
    const t = sida("/tjanster/takkupor");
    expect(t).not.toContain("30 års tätskiktsgaranti via MATAKI");
    expect(t).toContain("Vi lämnar 10 års garanti på utförandet.");
  });
  it("märket står kvar på de sidor där Marknadschefen lät det stå", () => {
    expect(tatskiktChip("platarbeten")).toContain("30 års tätskiktsgaranti när nytt tätskikt läggs (MATAKI)");
    expect(tatskiktChip("takomlaggning")).toContain("30 års tätskiktsgaranti via MATAKI");
  });
});

describe("paket 100: /tjanster/takrenovering", () => {
  const t = sida("/tjanster/takrenovering");
  it("underlaget och underlagspappen är inte längre en del av renoveringen", () => {
    expect(t).not.toContain("Papp och råspont");
    expect(t).not.toContain("underlagspapp, skadad råspont och trasiga pannor");
    expect(t).not.toContain("byta underlagspapp på en del av taket");
  });
  it("Innehålls lydelser står där: ingress, uppräkning och steg 3 i arbetsgången", () => {
    expect(t).toContain("Renovering handlar om att åtgärda det som är skadat, till exempel trasiga pannor, plåtdetaljer eller en läcka.");
    expect(t).toContain("laga läckor, reparera plåtbeslag eller byta skadad råspont där det behövs.");
    expect(serviceDetails.takrenovering.process[2]).toBe("Byte av skadad råspont, om det behövs");
  });
  it("garantin med villkor och punkten om råspont bland fördelarna är orörda; plåtbeslag står kvar (väntar på Vidars fråga 3)", () => {
    expect(t).toContain("När ett nytt tätskikt läggs, som vid takbyte och takomläggning, gäller dessutom 30 års tätskiktsgaranti via MATAKI.");
    expect(serviceDetails.takrenovering.benefits).toContain("Byte av skadad råspont");
    expect(t).toContain("reparera plåtbeslag");
  });
});

describe("paket 100: /tjanster/takavvattning och /tjanster/platarbeten", () => {
  it("'lackerad plåt' är borta på takavvattning, i texten, fördelarna, specifikationen och metan", () => {
    const t = sida("/tjanster/takavvattning");
    expect(t.toLowerCase()).not.toContain("lackerad");
    expect(t).toContain("Vi installerar och byter hängrännor, stuprör, ränndalar och plåtbeslag.");
    expect(serviceDetails.takavvattning.benefits[0]).toBe("Hängrännor och stuprör");
    expect(JSON.stringify(serviceMeta.takavvattning ?? {}).toLowerCase()).not.toContain("lackerad");
  });
  it("'Lackerad stålplåt' och 'inga hål som kan bli otäta' är borta på platarbeten, 'inga skruvhål i takytan' står där", () => {
    const t = sida("/tjanster/platarbeten");
    expect(t.toLowerCase()).not.toContain("lackerad");
    expect(t).not.toContain("inga hål som kan bli otäta");
    expect(t).toContain("Eftersom ingen skruv går igenom plåten finns det inga skruvhål i takytan.");
  });
  it("blockrubriken på platarbeten är 'Det du kan titta efter' (ingressens mening står kvar)", () => {
    const t = sida("/tjanster/platarbeten");
    expect(t).toContain("Det du kan titta efter");
    expect(t).not.toContain("Där många läckage börjar");
    expect(t).toContain("Bandtäckning, skorstensinklädnad, fotplåt och beslag. Det här kan du titta efter.");
  });
  it("startsidans tjänstekort är orörda (startsidan är spärrad): Services.tsx är som i paket 99", () => {
    const kort = readFileSync("src/components/Services.tsx", "utf8");
    expect(kort).toContain("fotplåt och beslag — där många läckage börjar.");
    expect(kort).toContain("det klassiska materialvalet som passar både äldre och nyare hus, med fast pris");
  });
  it("plåtarbeten som eget jobb är orört: sidan och dess svar om skorstensplåten står kvar", () => {
    const t = sida("/tjanster/platarbeten");
    expect(t).toContain("Kan ni göra om plåten runt skorstenen utan att byta taket?");
    expect(t).toContain("Beslaget kan också göras om för sig");
  });
});

describe("paket 100: /tjanster/tegeltak", () => {
  const t = sida("/tjanster/tegeltak");
  it("generaliseringarna är borta", () => {
    for (const borta of ["med ett uttryck som många vill behålla", "Det som oftast avgör hur länge", "är det ofta underlaget som har gjort sitt", "Varje panna ligger löst i förhållande till grannarna"]) {
      expect(t, borta).not.toContain(borta);
    }
  });
  it("ingressen kommer från startsidans kort (Services.tsx, spärrad): den står kvar tills Vidar svarat, och faktakortet och lead är ändrade", () => {
    expect(t).toContain("Vi lägger tegeltak i lertegel — det klassiska materialvalet som passar både äldre och nyare hus, med fast pris efter kostnadsfri takkontroll.");
    expect(t).not.toContain("Det klassiska valet som passar både äldre och nyare hus.");
    expect(t).not.toContain("Lertegel är det klassiska valet som passar");
  });
  it("Innehålls lydelser står där", () => {
    expect(t).toContain("Lertegel är det klassiska tegeltaket.");
    expect(t).toContain("Vi lägger tegeltak i lertegel — det klassiska tegeltaket. Materialet åldras");
    expect(t).toContain("Hur länge taket fungerar beror också på underlaget, läkten och detaljerna runt skorsten och genomföringar, inte bara på pannorna.");
    expect(t).toContain("På ett äldre tegeltak kan underlaget ha gjort sitt, även när pannorna ser hela ut, se dålig underlagspapp.");
  });
});

describe("paket 100: /hangrannor (landningssidan)", () => {
  it("'i lackerad plåt' är struket på alla fyra ställen", () => {
    const t = sida("/hangrannor");
    expect(t.toLowerCase()).not.toContain("lackerad");
    expect(readFileSync("src/data/landing-services.ts", "utf8").toLowerCase()).not.toContain("lackerad");
    expect(t).toContain("Nya hängrännor och stuprör. Fast pris efter kostnadsfri takkontroll");
  });
});

describe("paket 100: adressen /tjanster/takinspektion är orörd", () => {
  it("sidan finns kvar på samma adress", () => {
    expect(prerenderContent("/tjanster/takinspektion")).toBeTruthy();
  });
});
