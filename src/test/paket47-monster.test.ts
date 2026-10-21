/**
 * Paket 47 (Marknadschefen 2026-10-11): mönsterpaketet för ortstexterna (innehall/monsterpaket-2026-10-12.md), Rg/Va-fynden, Co2/Co3 och de kortade texterna för Edsbro och Kapellskär.
 * Sajten är facit: mönstren söks i alla datafilerna med ortstexter. Reglerna och antalen per mönster står i släppunderlaget (Del 47).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";

const kalla = (f: string) => readFileSync(f, "utf8");
const alla = () => ["src/data/locations.ts", "src/data/region-texts.ts", "src/data/villa-areas.ts", "src/data/combo-overrides.ts"].map(kalla).join("\n");
const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const text = (slug: string) => JSON.stringify(ort(slug));

describe("paket 47: mönstren är borta överallt", () => {
  it("S2: 'ha nytta av att planera' och 'i samma veva' finns inte, och grundlydelsen står på minst 28 ställen", () => {
    const t = alla();
    expect(t).not.toMatch(/ha nytta av att (planera|lägga om)[^.]*i samma veva/);
    expect(t).not.toContain("planera takbyten i samma veva");
    expect(t).not.toContain("i samma veva");
    expect(t.split("I ett kvarter där husen byggdes samtidigt ser taken lika ut från gatan, men de har skötts var för sig.").length - 1).toBeGreaterThanOrEqual(25);
    expect(t).not.toContain("Varje hus får ändå en egen takkontroll");
  });
  it("H2 och H2b: radhusmeningen om att taken hänger ihop med grannens är struken", () => {
    const t = alla();
    for (const borta of ["hänger taken ihop med grannens", "hänger taket ihop med grannens", "ihop med grannens tak", "möter taket grannens", "dikt an mot grannens", "delar anslutningar med grannens", "delar anslutning med grannens", "delas taket med grannen", "Kedjehus är sammanbyggda med grannhuset"]) expect(t, borta).not.toContain(borta);
  });
  it("V1: 'vid samma tillfälle' står bara kvar på Bergshamra (inte samma mönster, lämnas orörd)", () => {
    const t = alla();
    expect(t.split("vid samma tillfälle").length - 1).toBe(1);
    expect(text("bergshamra")).toContain("vid samma tillfälle");
    // gren 182: "som också behöver ses över ibland" är struken (ofta-rattning-2026-10-22.md)
    expect(t).not.toContain("som också behöver ses över ibland");
  });
  it("D1: 'enligt beskrivningar' och 'enligt uppgifterna' är bytta mot källans namn", () => {
    const t = alla();
    expect(t).not.toMatch(/enligt (beskrivning|uppgifterna)/i);
    expect(t).toContain("Under 1940-talet var enligt Wikipedia alla tomter bebyggda.");
  });
  it("Lh: 'lång historia' som egen mening är struken", () => {
    expect(alla()).not.toMatch(/(Platsen|Trakten|Bygden|Området|Byarna|Orten) (har|har en) (en )?lång historia/);
  });
  it("Slut: slutmeningen följer mönstret 'Bor du i <ort> och funderar på taket?'", () => {
    expect(text("viby")).toContain("Bor du i Viby och funderar på taket?");
    expect(text("radmanso")).toContain("Bor du på Rådmansö och funderar på taket?");
    expect(alla()).not.toContain("Bor du i Viby och funderar på att byta eller lägga om taket");
  });
});

describe("paket 47: fynd per sida och personnamn", () => {
  it("personnamn och varumärken enligt Pn1–Pn9, Ka1, Gl1, Fl1, Hv1 med flera är borta", () => {
    const t = alla();
    for (const borta of ["Franz Witte", "Israel Lagerfeldt", "Robert Ditzinger", "Gustav de Laval", "Allan Abenius", "J.E. Lignell", "K.A. Wallenberg", "C.F. Wahlberg", "E.W. Wallin", "Jarlabanke", "Millimeter-Kalle", "J A O Häggberg", "Viking Line", "Stockmos", "Hotell Havsbaden", "Grand Hotel Saltsjöbaden", "Rosättra Båtvarv"]) expect(t, borta).not.toContain(borta);
  });
  it("rankningar och värdeord enligt Mi2, Hb1, Mö1, Rö1, Ut1, Nb1, Sb1, Dj1, Gd1, Gl2, Ty1 med flera är borta", () => {
    const t = alla();
    for (const borta of ["Täbys äldsta brandstation", "första konsumföreningen i Storstockholm", "första bryggan på Lidingön", "ett av de äldre villasamhällena", "det äldsta huset i Broängen", "Täbys enda byggnadsminne", "ett av de äldsta namnen på trakten", "ett populärt turistmål", "en av de tidiga självbetjäningsbutikerna", "sällsynt vacker", "högborgerlig", "mest känd för sitt stenbrott"]) expect(t, borta).not.toContain(borta);
  });
  it("gatuadresser med husnummer (Adr1–Adr3) och Hägerstens FFNS är borta", () => {
    const t = alla();
    for (const borta of ["Kulstötarvägen 14", "Äppelviksvägen 31", "Dammtrappgatan 16–26", "Germaniavägen 21", "FFNS"]) expect(t, borta).not.toContain(borta);
  });
  it("brödtexten säger inte vad källan saknar (K-1–K-3, K4, K5, Hv2, In2, Kp1)", () => {
    const t = alla();
    for (const borta of ["framgår inte av källorna", "men källan anger inte när de byggdes", "anger inte när fritidshusen byggdes", "anger inga byggår för de övriga husen", "anger källan inget byggår", "Källorna anger när tomterna styckades", "Källorna anger ingen byggperiod för husen på Ingarö", "Källorna beskriver hamnen och inte bostadshusen"]) expect(t, borta).not.toContain(borta);
  });
  it("Rg2–Rg9 och Va1–Va5: personnamn, varumärken och radhusmening i region- och villaområdestexterna", () => {
    const t = kalla("src/data/region-texts.ts") + kalla("src/data/villa-areas.ts");
    for (const borta of ["Gustav II Adolf", "Viking Line", "Stockholms Hamnar", "Gräddö båtvarv", "Waxholmsbåt året runt", "Arvid Stille", "Per Olof Hallman", "Clas Eriksson Fleming", "Jacob Tegnér", "på parhus hänger taket ihop med grannens"]) expect(t, borta).not.toContain(borta);
    expect(kalla("src/data/region-texts.ts")).toContain("Staden grundades 1622.");
  });
});

describe("paket 47: Edsbro och Kapellskär (kortade texter)", () => {
  it("Edsbro: en kort ortsbeskrivning och standardblocket, utan bruket, pråmarna, fornborgarna och uthusmeningen", () => {
    const t = text("edsbro");
    expect(t).toContain("här tillverkades råjärn från 1686 till 1919, och ruinerna efter masugnen och klensmedjan är välbevarade. Kyrkan är från 1200-talet.");
    // gren 183 (briefrundan 2026-10-22): namnet, bruket och fornborgen kommer tillbaka i kortare form (Närdingen, Lundboborg, fornborgar tas därför inte längre med här)
    for (const borta of ["uthus och bodar", "grannens tak", "byggts till har ofta takdelar"]) expect(t, borta).not.toContain(borta);
    expect(t).toContain("Vilka garantier som gäller för ditt tak står i offerten.");
    expect(ort("edsbro").factBox).toEqual([{ label: "Kommun", value: "Norrtälje" }]);
  });
  it("Kapellskär: en kort ortsbeskrivning, faktarutan utan Förbindelse, och slutfrågan 'Har du hus i Kapellskär'", () => {
    const t = text("kapellskar");
    expect(t).toContain("Kapellskär är en udde längst ut på Rådmansö i Norrtälje kommun, omkring 90 kilometer nordost om Stockholm.");
    for (const borta of ["De flesta känner platsen som färjehamn", "andra änden av halvön", "Riddersholm", "Ett fritidshus som står tomt", "väg hela vägen", "Källorna beskriver hamnen"]) expect(t, borta).not.toContain(borta);
    expect(ort("kapellskar").factBox!.map((f) => f.label)).toEqual(["Kommun", "Läge"]);
    expect(t).toContain("Har du hus i Kapellskär eller på yttersta Rådmansö och funderar på taket?");
  });
});
