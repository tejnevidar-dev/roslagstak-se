/**
 * Paket 101: de 17 nyare problemsidorna enligt Innehålls passrapport 151 (innehall/takproblem-17-lasning-2026-10-15.md), godkänt av Marknadschefen 2026-10-15 14:59.
 * "Så undersöks det" som på de tio äldre, rubriken "Vanliga åtgärder" och raden om takkontrollen i sidmallen för alla 27, tio generaliseringar.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ATGARDER_RAD, problems } from "../data/problems";
import { PROBLEM_PAGE_TEXT } from "../data/problem-page-text";
import { regionLinksForProblems } from "../data/problem-links";
import { RELATED_LINKS_INTRO } from "../data/related-links-text";
import { prerenderContent } from "../../scripts/prerender-content";

const TIO = ["lackage-vid-skorsten", "trasiga-takpannor", "mossa-pa-taket", "rostig-plat", "fukt-pa-vinden", "igensatta-hangrannor", "rutten-raspont", "kondens-pa-vinden", "dalig-underlagspapp", "istappar-pa-taket"];
const SJUTTON = problems.filter((x) => !TIO.includes(x.slug));
const FORSTA = "Vid takkontrollen tittar en av våra säljare på taket på plats.";
const K3 = "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.";
const STANDARD = `${FORSTA} ${K3}`;
const p = (slug: string) => problems.find((x) => x.slug === slug)!;
const sida = (slug: string) => JSON.stringify(prerenderContent(`/takproblem/${slug}`));

const RAD_KVAR: Record<string, string> = {
  "svackor-i-taket": "Pekar något mot takstolarna kan en konstruktörs bedömning behövas innan taket åtgärdas.",
  "fuktflack-i-innertaket": "Berätta var fläcken sitter, när du såg den första gången och i vilket väder den växer, eftersom det hjälper till att ringa in var på taket vattnet kommer in.",
  "yrsno-pa-vinden": "Berätta var på vinden snön låg och hur mycket det var, och fotografera gärna innan du tar bort den, eftersom det visar var den kom in.",
  "is-i-ranndalen": "Det går bäst att bedöma ränndalen när den är fri från snö och is, så en kontroll kan behöva vänta tills det har tinat. Berätta var det har läckt eller var isen brukar bygga upp, och fotografera gärna medan isen ligger kvar.",
};

describe("paket 101: 'Så undersöks det' på de 17 nyare problemsidorna", () => {
  it("det är 17 sidor, och alla börjar med samma mening och slutar med K3", () => {
    expect(SJUTTON.length).toBe(17);
    for (const x of SJUTTON) {
      expect(x.undersokning.startsWith(FORSTA), x.slug).toBe(true);
      expect(x.undersokning.endsWith(K3), x.slug).toBe(true);
    }
  });
  it("tretton sidor har bara standardmeningen, fyra behåller sitt råd till kunden mellan första och sista meningen", () => {
    for (const x of SJUTTON) {
      if (RAD_KVAR[x.slug]) expect(x.undersokning, x.slug).toBe(`${FORSTA} ${RAD_KVAR[x.slug]} ${K3}`);
      else expect(x.undersokning, x.slug).toBe(STANDARD);
    }
  });
  it("uppräkningen, meningarna om vinden och löftena om vad kontrollen visar är borta", () => {
    for (const x of SJUTTON) {
      for (const borta of ["Där vinden går att komma åt", "där vinden går att komma åt", "blir det tydligt här", "brukar också visa om det handlar om", "ser vi därifrån hur underlaget mår", "Syftet är att", "Rutten läkt på ett ställe betyder ofta"]) {
        expect(x.undersokning, `${x.slug}: ${borta}`).not.toContain(borta);
      }
    }
  });
  it("serverns HTML har samma text på alla 17", () => {
    for (const x of SJUTTON) expect(sida(x.slug), x.slug).toContain(x.undersokning.split('"').join('\\"'));
  });
});

describe("paket 101: rubrik och rad i sidmallen för alla 27", () => {
  it("de tios och de 17:s åtgärdstexter upprepar inte raden, mallen lägger den sist", () => {
    for (const x of problems) {
      expect(x.atgarder.includes(ATGARDER_RAD), x.slug).toBe(false);
      expect(sida(x.slug), x.slug).toContain(`${x.atgarder.split('"').join('\\"')} ${ATGARDER_RAD}`);
    }
  });
  it("raden står en gång på varje sida", () => {
    for (const x of problems) expect(sida(x.slug).split(ATGARDER_RAD).length - 1, x.slug).toBe(1);
  });
});

describe("paket 101: generaliseringarna", () => {
  it("tio ändringar enligt tabell 3 (rutten läkt försvinner med 'Så undersöks det')", () => {
    expect(p("losa-nockpannor").intro).toContain("De sitter högst upp på taket och tar emot mycket vind.");
    expect(p("lackande-ranndal").intro).toContain("och därför får den ta emot mycket vatten.");
    expect(p("lackande-ranndal").akut).toContain("Eftersom mycket vatten passerar just där bör även en liten fläck kontrolleras.");
    expect(p("lackage-vid-takkupa").intro).toContain("och det är där ett läckage kan börja.");
    expect(p("lackage-mellan-tak-och-vagg").intro).toContain("Anslutningen är utsatt, eftersom");
    expect(p("lackande-plattak").intro).toContain("När det börjar läcka sitter orsaken ofta där plåtarna möts, där de är fästa");
    expect(p("lackande-hangrannor").intro).toContain("och därför kan felet pågå länge.");
    expect(p("fuktflack-i-innertaket").orsaker).toContain("Källan kan vara en otät anslutning i taket snarare än själva takytan.");
    expect(p("porosa-betongpannor").atgarder).toContain("kan en takomläggning med nytt underlag, ny läkt och nya pannor vara rätt åtgärd.");
  });
  it("de gamla formuleringarna står inte kvar någonstans i datan", () => {
    const alla = JSON.stringify(problems);
    for (const borta of ["eftersom vinden tar som hårdast", "en av takets mest belastade delar", "fortsätter ofta att växa", "oftast där, inte i själva kupan", "anslutningar som oftast ger problem", "sitter orsaken sällan mitt i en plåt", "får felet ofta pågå länge", "En vanlig källa är en otät anslutning", "det som håller i längden"]) {
      expect(alla, borta).not.toContain(borta);
    }
  });
});

describe("paket 101: hubben, metatexterna och de gemensamma raderna (passrapport 153)", () => {
  const hubb = JSON.stringify(prerenderContent("/takproblem"));
  const HUB_INTRO = PROBLEM_PAGE_TEXT.hubIntro;
  it("H1–H3: hubbens ingress är samma text i serverns HTML och i React, utan 'sällan' och 'de vanligaste'", () => {
    expect(HUB_INTRO).toBe("Ett tak visar inte alltid att något är fel förrän skadan har pågått ett tag. Här har vi samlat takproblem som villaägare kan upptäcka: hur de visar sig, vad de kan bero på, vad du kan göra själv och när det är dags att låta en takläggare titta. Gå aldrig upp på taket själv, titta från marken och från vinden.");
    expect(hubb).toContain(HUB_INTRO);
    expect(readFileSync("src/pages/ProblemsPage.tsx", "utf8")).toContain("text={PROBLEM_PAGE_TEXT.hubIntro}");
    for (const borta of ["säger sällan ifrån", "de vanligaste takproblemen", "brukar bero på"]) expect(hubb, borta).not.toContain(borta);
  });
  it("H2: metabeskrivningen säger 'takproblem som villaägare kan upptäcka' i React och i serverns HTML", () => {
    expect(PROBLEM_PAGE_TEXT.hubMeta).toContain("Takproblem som villaägare kan upptäcka, hur du känner igen dem och när det är dags att ringa en takläggare.");
    expect(hubb).toContain(PROBLEM_PAGE_TEXT.hubMeta);
    expect(readFileSync("src/pages/ProblemsPage.tsx", "utf8")).toContain("description={PROBLEM_PAGE_TEXT.hubMeta}");
  });
  it("M1, M2, M4: metatiteln för underlagspapp, takpannornas metabeskrivning och kondensens metatitel", () => {
    expect(p("dalig-underlagspapp").metaTitle).toBe("Dålig underlagspapp – tecken på att den har gjort sitt");
    expect(p("trasiga-takpannor").metaDescription).toContain("takpannor kan släppa in vatten i underlaget.");
    expect(p("kondens-pa-vinden").metaTitle).toBe("Kondens på vinden – därför bildas den och vad som hjälper");
    expect(JSON.stringify(problems.map((x) => [x.metaTitle, x.metaDescription]))).not.toContain("takets viktigaste skydd");
  });
  it("G4: länktexterna 'Takläggare vid kusten' och 'Takläggare på Rådmansöhalvön' på alla 27 sidor", () => {
    const labels = regionLinksForProblems().map((l) => l.label);
    expect(labels).toContain("Takläggare vid kusten");
    expect(labels).toContain("Takläggare på Rådmansöhalvön");
    expect(labels).not.toContain("Takläggare i Kusten");
    expect(labels).not.toContain("Takläggare i Rådmansöhalvön");
    expect(labels).toContain("Takläggare i Norra skärgården");
    for (const x of problems) {
      const t = JSON.stringify(prerenderContent(`/takproblem/${x.slug}`));
      expect(t, x.slug).toContain("Takläggare vid kusten");
      expect(t, x.slug).not.toContain("Takläggare i Kusten");
    }
  });
  it("G5: raden under 'Fler takproblem' passar rubriken, på alla 27 sidor, och delas inte med övriga sidtyper", () => {
    expect(PROBLEM_PAGE_TEXT.relatedIntro).toBe("Fler takproblem och guider som hör ihop med det här.");
    for (const x of problems) {
      const t = sida(x.slug);
      expect(t, x.slug).toContain(PROBLEM_PAGE_TEXT.relatedIntro);
      expect(t, x.slug).not.toContain("Fortsätt till tjänsten, priserna eller frågorna");
    }
    expect(readFileSync("src/pages/ProblemPage.tsx", "utf8")).toContain("intro={PROBLEM_PAGE_TEXT.relatedIntro}");
    expect(RELATED_LINKS_INTRO).toBe("Fortsätt till tjänsten, priserna eller frågorna som är mest relevanta för ditt takprojekt.");
  });
});
