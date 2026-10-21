/**
 * Gren 188 (svaga-toppsidor-2026-10-22.md): ortssidorna i Norra Stockholm, Stockholms stad, Nordvästra Stockholm och Södra Stockholm länkar till den egna kommunens tre tjänstesidor
 * (takbyte, takrenovering, takomläggning) i stället för en grannkommuns, med etiketten "<tjänst> i <kommun>". Noindex-sidor länkas via tjänstens egen sida (combo-links.ts).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { hubLinksFor, kommunLankar } from "../data/hub-links";
import { prerenderContent } from "../../scripts/prerender-content";

const lankar = (slug: string) => prerenderContent(`/taklaggare-${slug}`)!.links;
const tjanstOrt = /^\/(takbyte|takomlaggning|takrenovering)-([a-z0-9-]+)$/;

describe("gren 188: ortssidornas länkar till den egna kommunens tjänstesidor", () => {
  it("Sollentunas orter länkar till Sollentuna, inte Täby", () => {
    for (const s of ["viby", "edsberg", "helenelund", "rotebro", "sjoberg"]) {
      const h = lankar(s).map((l) => l.href);
      for (const t of ["takbyte", "takrenovering", "takomlaggning"]) expect(h, `${s}: ${t}-sollentuna`).toContain(`/${t}-sollentuna`);
      expect(h.some((x) => tjanstOrt.test(x) && x.endsWith("-taby")), `${s}: länk till Täby`).toBe(false);
    }
    expect(lankar("viby").find((l) => l.href === "/takbyte-sollentuna")?.label).toBe("Takbyte i Sollentuna");
  });

  it("Stockholms orter länkar till alla tre Stockholm-sidorna och inte till Huddinge eller Järfälla", () => {
    for (const s of ["farsta", "bandhagen", "bagarmossen", "sodermalm", "vallingby", "skarholmen"].filter((x) => locations.some((l) => l.slug === x))) {
      const h = lankar(s).map((l) => l.href);
      for (const t of ["takbyte", "takrenovering", "takomlaggning"]) expect(h, `${s}: ${t}-stockholm`).toContain(`/${t}-stockholm`);
      expect(h.some((x) => tjanstOrt.test(x) && /-(huddinge|jarfalla)$/.test(x)), `${s}: länk till Huddinge eller Järfälla`).toBe(false);
    }
  });

  it("Märsta och Rosersberg länkar till Sigtuna, och noindex-sidorna går via tjänstens egen sida med oförändrad etikett", () => {
    const h = lankar("marsta");
    expect(h.some((l) => l.href === "/takbyte-sigtuna")).toBe(true);
    expect(h.some((l) => tjanstOrt.test(l.href) && l.href.endsWith("-jarfalla"))).toBe(false);
    const vasby = lankar("bollstanas");
    expect(vasby.find((l) => l.label === "Takbyte i Upplands Väsby")?.href).toBe("/takbyte-upplands-vasby");
    expect(vasby.find((l) => l.label === "Takomläggning i Upplands Väsby")?.href).toBe("/tjanster/takomlaggning");
    expect(vasby.find((l) => l.label === "Takrenovering i Upplands Väsby")?.href).toBe("/tjanster/takrenovering");
  });

  it("Täbys orter länkar till Täby, och kommunens egen sida får ingen extra rad", () => {
    expect(hubLinksFor("ensta").map((l) => l.href)).toEqual(expect.arrayContaining(["/takbyte-taby", "/takrenovering-taby", "/takomlaggning-taby"]));
    expect(kommunLankar("sollentuna")).toEqual([]);
    expect(kommunLankar("stockholm")).toEqual([]);
    expect(kommunLankar("taby")).toEqual([]);
  });

  it("ingen ort i de fyra regionerna länkar till en annan kommuns tjänst × ort-sida via kommunregeln", () => {
    const regioner = ["Norra Stockholm", "Stockholms stad", "Nordvästra Stockholm", "Södra Stockholm", "Västerort"];
    for (const l of locations.filter((x) => regioner.includes(x.region))) {
      const egna = new Set(kommunLankar(l.slug).map((x) => x.href));
      for (const x of kommunLankar(l.slug)) {
        const m = x.href.match(tjanstOrt);
        if (m) {
          const k = locations.find((y) => y.slug === m[2])!;
          expect(x.label, `${l.slug}: ${x.href}`).toContain(k.name);
        }
      }
      // minst en länk när orten inte själv är en kommun med egna sidor
      if (!["sollentuna", "danderyd", "sundbyberg", "upplands-vasby", "solna", "stockholm", "jarfalla", "sigtuna", "upplands-bro", "huddinge", "bro"].includes(l.slug)) expect(egna.size, l.slug).toBeGreaterThan(0);
    }
  });
});

describe("gren 176: 'Takrenovering i Stockholm' pekar på /takrenovering-stockholm", () => {
  it("orter i Stockholmsregionerna, även utanför Stockholms kommun, länkar dit och inte till guiden, utan dubblett", () => {
    for (const s of ["farsta", "stuvsta", "bromma", "sodermalm"].filter((x) => locations.some((l) => l.slug === x))) {
      const h = hubLinksFor(s);
      expect(h.map((x) => x.href), s).toContain("/takrenovering-stockholm");
      expect(h.map((x) => x.href), s).not.toContain("/blogg/takrenovering-stockholm-guide");
      expect(h.filter((x) => x.href === "/takrenovering-stockholm").length, s).toBe(1);
    }
    // Stockholms egen sida har länken bland de vanliga tjänst × ort-länkarna, inte som hubbrad
    expect(hubLinksFor("stockholm").map((x) => x.href)).not.toContain("/takrenovering-stockholm");
  });
});
