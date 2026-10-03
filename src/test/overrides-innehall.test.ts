/**
 * Tester för innehållsöverstyrningarna (textblock, FAQ, internlänkar) i SEO Command Center.
 */
import { describe, expect, it } from "vitest";
import monster from "@/data/seo-regler/forbjudna-monster.json";
import sparr from "@/data/seo-regler/sparrlista.json";
import {
  activeInnehallPosts,
  buildOverrideBlocks,
  innehallFile,
  innehallSomText,
  serializeInnehallFile,
  type InnehallFile,
} from "@/data/overrides";
import { applyOverrideBlocks } from "@/lib/innehall-apply";
import { checkInnehallPost, type Regel } from "@/lib/overrides-validate";

const regler = monster.monster as Regel[];
const bas = { andrad: "2026-10-12", orsak: "test" };
const fil: InnehallFile = {
  version: 1,
  poster: {
    "/taklaggare-taby": {
      textblock: {
        id: "seo-cc-2026-10-12-0001",
        rubrik: "Takbyte i Täby",
        stycken: ["Vi byter tak på villor i Täby och utgår från en kostnadsfri takkontroll, så att offerten bygger på det som faktiskt syns på taket."],
        ...bas,
      },
      faq: {
        id: "seo-cc-2026-10-12-0002",
        fragor: [{ fraga: "Hur lång tid tar det att få en offert?", svar: "Vi svarar inom 24 timmar och bokar en kostnadsfri takkontroll innan du får ett fast pris i offerten." }],
        ...bas,
      },
      lankar: {
        id: "seo-cc-2026-10-12-0003",
        lankar: [{ href: "/priser", text: "Se våra priser" }],
        ...bas,
      },
    },
  },
};
const ctx = { regler, sparr, kandaSidor: new Set(["/", "/taklaggare-taby", "/priser", "/takbyte-taby", "/offert/taby"]) };
const sida = { paragraphs: ["a"], links: [{ href: "/x", label: "X" }], headingAt: { 0: 2 as const } };

describe("innehållsöverstyrningar: tomt = ingen skillnad", () => {
  it("den incheckade filen är tom och ger inga block", () => {
    expect(innehallFile).toEqual({ version: 1, poster: {} });
    expect(buildOverrideBlocks("/taklaggare-taby")).toBeNull();
  });
  it("applyOverrideBlocks utan block returnerar samma objekt", () => {
    expect(applyOverrideBlocks(sida, null)).toBe(sida);
  });
});

describe("innehållsöverstyrningar: modell och tillämpning", () => {
  const posts = activeInnehallPosts(fil, { alla: false, ider: [] });
  it("bygger block med standardrubriker", () => {
    const b = buildOverrideBlocks("/taklaggare-taby/", posts)!;
    expect(b.ids).toEqual(["seo-cc-2026-10-12-0001", "seo-cc-2026-10-12-0002", "seo-cc-2026-10-12-0003"]);
    expect(b.faq?.rubrik).toBe("Vanliga frågor");
    expect(b.lankar?.rubrik).toBe("Se även");
    expect(buildOverrideBlocks("/priser", posts)).toBeNull();
  });
  it("lägger till stycken, rubriker (h2/h3) och länkar utan att röra befintligt innehåll", () => {
    const ut = applyOverrideBlocks(sida, buildOverrideBlocks("/taklaggare-taby", posts));
    expect(ut.paragraphs.slice(0, 1)).toEqual(["a"]);
    expect(ut.paragraphs).toEqual(["a", "Takbyte i Täby", fil.poster["/taklaggare-taby"].textblock!.stycken[0], "Vanliga frågor", "Hur lång tid tar det att få en offert?", fil.poster["/taklaggare-taby"].faq!.fragor[0].svar]);
    expect(ut.headingAt).toEqual({ 0: 2, 1: 2, 3: 2, 4: 3 });
    expect(ut.links).toEqual([{ href: "/x", label: "X" }, { href: "/priser", label: "Se våra priser" }]);
    expect(sida.paragraphs).toEqual(["a"]);
  });
  it("avstängning stänger av ett fält (id) eller alla", () => {
    const utanFaq = activeInnehallPosts(fil, { alla: false, ider: ["seo-cc-2026-10-12-0002"] });
    expect(utanFaq["/taklaggare-taby"].faq).toBeUndefined();
    expect(utanFaq["/taklaggare-taby"].textblock).toBeDefined();
    expect(activeInnehallPosts(fil, { alla: false, ider: ["seo-cc-2026-10-12-0001", "seo-cc-2026-10-12-0002", "seo-cc-2026-10-12-0003"] })).toEqual({});
    expect(activeInnehallPosts(fil, { alla: true, ider: [] })).toEqual({});
  });
  it("serialiseringen är stabil och loggtexten har fast nyckelordning", () => {
    const text = serializeInnehallFile(fil);
    expect(serializeInnehallFile(JSON.parse(text))).toBe(text);
    expect(text.indexOf('"textblock"')).toBeLessThan(text.indexOf('"faq"'));
    expect(text.indexOf('"faq"')).toBeLessThan(text.indexOf('"lankar"'));
    expect(innehallSomText("lankar", fil.poster["/taklaggare-taby"].lankar!)).toBe('{"lankar":[{"href":"/priser","text":"Se våra priser"}]}');
    expect(innehallSomText("textblock", fil.poster["/taklaggare-taby"].textblock!)).toMatch(/^\{"rubrik":"Takbyte i Täby","stycken":\["Vi byter/);
  });
});

describe("kontroll av innehållsposter", () => {
  const post = fil.poster["/taklaggare-taby"];
  it("godkänner en ren post", () => {
    expect(checkInnehallPost("/taklaggare-taby", post, ctx)).toEqual([]);
  });
  it("avvisar spärrad sida, okänd sida och okända fält", () => {
    expect(checkInnehallPost("/offert/taby", post, ctx).join()).toMatch(/spärrlistan/);
    expect(checkInnehallPost("/finns-inte", post, ctx).join()).toMatch(/finns inte i sajten/);
    expect(checkInnehallPost("/taklaggare-taby", { ...post, extra: 1 } as never, ctx).join()).toMatch(/okänt fält "extra"/);
    expect(checkInnehallPost("/taklaggare-taby", { textblock: { ...post.textblock!, extra: 1 } as never }, ctx).join()).toMatch(/okänt fält "extra"/);
  });
  it("avvisar förbjudna påståenden, HTML och för korta eller för långa texter", () => {
    const dalig = (s: string) => checkInnehallPost("/taklaggare-taby", { textblock: { ...post.textblock!, stycken: [s] } }, ctx).join();
    expect(dalig("Vi är bättre än Vertex Tak på takbyte i Täby och ger dig ett tak som håller i 50 år utan underhåll.")).toMatch(/livslangd-i-ar|konkurrenter/);
    expect(dalig("<b>Vi byter tak</b> på villor i Täby och utgår från en kostnadsfri takkontroll, med fast pris i offerten.")).toMatch(/HTML/);
    expect(dalig("För kort.")).toMatch(/kortare än 80/);
    expect(dalig("x".repeat(701))).toMatch(/längre än 700/);
  });
  it("kräver frågetecken, kanoniska länkar som finns, inga självlänkar och inga dubbletter", () => {
    const f = (fraga: string) => checkInnehallPost("/taklaggare-taby", { faq: { ...post.faq!, fragor: [{ fraga, svar: post.faq!.fragor[0].svar }] } }, ctx).join();
    expect(f("Hur lång tid tar det att få en offert")).toMatch(/sluta med \?/);
    const l = (lankar: { href: string; text: string }[]) => checkInnehallPost("/taklaggare-taby", { lankar: { ...post.lankar!, lankar } }, ctx).join();
    expect(l([{ href: "/Priser/", text: "Se våra priser" }])).toMatch(/kanonisk/);
    expect(l([{ href: "/finns-inte", text: "Okänd sida" }])).toMatch(/finns inte i sajten/);
    expect(l([{ href: "/taklaggare-taby", text: "Samma sida" }])).toMatch(/länka till sig själv/);
    expect(l([{ href: "/priser", text: "Priser här" }, { href: "/priser", text: "Priser igen" }])).toMatch(/flera gånger/);
  });
});
