/**
 * Regel- och formattester för SEO Command Center-lagret. Fixturerna (src/data/seo-regler/fixturer.json) körs även av
 * CRM:et mot samma regler. Reglerna ägs av Marknadschefen och juristen.
 */
import { describe, expect, it } from "vitest";
import fixturer from "@/data/seo-regler/fixturer.json";
import monster from "@/data/seo-regler/forbjudna-monster.json";
import sparr from "@/data/seo-regler/sparrlista.json";
import {
  activeMetaPosts,
  metaFile,
  overridePath,
  resolveMeta,
  serializeLogg,
  serializeMetaFile,
  type MetaFile,
} from "@/data/overrides";
import logg from "@/data/overrides/_logg.json";
import { checkPost, checkText, isSparrad, type Regel } from "@/lib/overrides-validate";

const regler = monster.monster as Regel[];

describe("förbjudna mönster mot fixturer", () => {
  for (const f of fixturer.bra) {
    it(`godkänner: ${f.text.slice(0, 50)}`, () => {
      expect(checkText(f.falt as "title" | "description", f.text, regler)).toEqual([]);
    });
  }
  for (const f of fixturer.daliga) {
    it(`underkänner (${f.regel}): ${f.text.slice(0, 50)}`, () => {
      const traffar = checkText(f.falt as "title" | "description", f.text, regler).map((t) => t.regel);
      expect(traffar).toContain(f.regel);
    });
  }
});

const falt = (id: string, text: string) => ({ id, text, andrad: "2026-10-12", orsak: "test" });

describe("överstyrningslagret", () => {
  it("tomma överstyrningar ändrar ingenting", () => {
    expect(Object.keys(metaFile.poster)).toEqual([]);
    const r = resolveMeta("/taklaggare-taby", { title: "Bas", description: "Beskrivning" });
    expect(r).toMatchObject({ title: "Bas", description: "Beskrivning", titleOverridden: false, descriptionOverridden: false, overrideIds: [] });
  });

  const fil: MetaFile = {
    version: 1,
    poster: {
      "/taklaggare-taby": { title: falt("seo-cc-2026-10-12-0001", "Ny titel"), description: falt("seo-cc-2026-11-12-0002", "Ny beskrivning") },
      "/priser": { title: falt("seo-cc-2026-10-12-0003", "Prisernas nya titel") },
    },
  };

  it("använder överstyrningen per fält och faller tillbaka på basen för fält som saknas", () => {
    const posts = activeMetaPosts(fil, { alla: false, ider: [] });
    expect(resolveMeta("/taklaggare-taby/", { title: "Bas", description: "Bas-beskrivning" }, posts)).toMatchObject({
      title: "Ny titel",
      description: "Ny beskrivning",
      overrideIds: ["seo-cc-2026-10-12-0001", "seo-cc-2026-11-12-0002"],
    });
    expect(resolveMeta("/priser", { title: "Bas", description: "Bas-beskrivning" }, posts)).toMatchObject({
      title: "Prisernas nya titel",
      description: "Bas-beskrivning",
      descriptionOverridden: false,
    });
  });

  it("avstängningsfilen stänger av ett FÄLT (id) eller alla", () => {
    const utanTitel = activeMetaPosts(fil, { alla: false, ider: ["seo-cc-2026-10-12-0001"] });
    expect(utanTitel["/taklaggare-taby"].title).toBeUndefined();
    expect(utanTitel["/taklaggare-taby"].description?.text).toBe("Ny beskrivning");
    expect(Object.keys(activeMetaPosts(fil, { alla: false, ider: ["seo-cc-2026-10-12-0003"] }))).toEqual(["/taklaggare-taby"]);
    expect(activeMetaPosts(fil, { alla: true, ider: [] })).toEqual({});
  });

  it("normaliserar sökvägar (gemener, utan snedstreck, query och hash)", () => {
    expect(overridePath("/Priser/")).toBe("/priser");
    expect(overridePath("/priser?x=1#y")).toBe("/priser");
    expect(overridePath("/")).toBe("/");
  });

  it("serialiseringen är stabil: sorterat på sökväg, fast fältordning, en rad per fält", () => {
    const text = serializeMetaFile(fil);
    expect(text.indexOf('"/priser"')).toBeLessThan(text.indexOf('"/taklaggare-taby"'));
    expect(text).toContain('      "title": {\n        "id": "seo-cc-2026-10-12-0001",\n        "text": "Ny titel",\n        "andrad": "2026-10-12",\n        "orsak": "test"\n      },\n      "description": {');
    expect(serializeMetaFile(JSON.parse(text))).toBe(text);
    expect(serializeLogg({ version: 1, rader: [] })).toBe('{\n  "version": 1,\n  "rader": []\n}\n');
    expect(serializeMetaFile(metaFile)).toBe('{\n  "version": 1,\n  "poster": {}\n}\n');
    expect(logg).toEqual({ version: 1, rader: [] });
  });
});

describe("kontroll av poster", () => {
  const ctx = { regler, sparr, kandaSidor: new Set(["/", "/taklaggare-taby", "/priser", "/offert/taby", "/brf/taby"]) };
  const bra = {
    title: falt("seo-cc-2026-10-12-0001", "Takbyte i Täby – fast pris"),
    description: falt("seo-cc-2026-10-12-0002", "Takbyte och takomläggning i Täby med kostnadsfri takkontroll utan förpliktelser, fast pris och svar inom 24 timmar."),
  };

  it("godkänner en ren post", () => {
    expect(checkPost("/taklaggare-taby", bra, ctx)).toEqual([]);
  });
  it("avvisar okända fält, felaktigt id, okänd sida och spärrad sida", () => {
    expect(checkPost("/taklaggare-taby", { ...bra, extra: "x" } as never, ctx).join()).toMatch(/okänt fält/);
    expect(checkPost("/taklaggare-taby", { title: { ...bra.title, id: "abc" } }, ctx).join()).toMatch(/id måste vara/);
    expect(checkPost("/taklaggare-taby", { title: { ...bra.title, extra: "x" } as never }, ctx).join()).toMatch(/okänt fält "extra"/);
    expect(checkPost("/finns-inte", bra, ctx).join()).toMatch(/finns inte i sajten/);
    expect(checkPost("/offert/taby", bra, ctx).join()).toMatch(/spärrlistan/);
    expect(checkPost("/brf/taby", bra, ctx).join()).toMatch(/spärrlistan/);
    expect(isSparrad("/tjanster/eternit-asbest", sparr)).toBe(true);
    expect(isSparrad("/taklaggare-taby", sparr)).toBe(false);
  });
  it("avvisar för lång titel och beskrivning och förbjudna påståenden", () => {
    expect(checkPost("/taklaggare-taby", { title: falt("seo-cc-2026-10-12-0001", "Takbyte i Täby med fast pris, kostnadsfri takkontroll och svar") }, ctx).join()).toMatch(/60 tecken/);
    expect(checkPost("/taklaggare-taby", { description: falt("seo-cc-2026-10-12-0002", "x".repeat(170)) }, ctx).join()).toMatch(/längre än 160/);
    expect(checkPost("/taklaggare-taby", { title: falt("seo-cc-2026-10-12-0001", "Tak som håller i 50 år") }, ctx).join()).toMatch(/livslangd-i-ar/);
  });
});
