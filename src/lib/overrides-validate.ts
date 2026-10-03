/**
 * Kontroll av överstyrningar (SEO Command Center, S0). Ren logik utan filläsning, så att samma funktioner körs
 * av scripts/check-overrides.ts (bygget/CI), av vitest (src/test/overrides-regler.test.ts, med fixturerna i
 * src/data/seo-regler/fixturer.json) och kan återanvändas av CRM:et. Bara relativa importer.
 */
import type { FaltNamn, MetaFalt, MetaPost } from "../data/overrides";
import { FALT, overridePath } from "../data/overrides";
import { fitDescription, withSuffix } from "./seo-fit";

export interface Regel {
  id: string;
  monster: string;
  flaggor?: string;
  falt: ("title" | "description")[];
  orsak: string;
  /** Regeln gäller inte om sidans nuvarande (bas)värde redan innehåller ordet (T2, MATAKI). */
  utom_om_bas_har_ordet?: boolean;
}
export interface Sparrlista {
  sidor_exakt: string[];
  sidor_prefix: string[];
}
export interface Traff {
  regel: string;
  orsak: string;
}

const compiled = new Map<string, RegExp>();
const regexOf = (r: Regel) => {
  let re = compiled.get(r.id);
  if (!re) {
    re = new RegExp(r.monster, r.flaggor ?? "i");
    compiled.set(r.id, re);
  }
  return re;
};

/** Förbjudna mönster som träffar en text. Tom lista = texten är ren. */
export const checkText = (falt: "title" | "description", text: string, regler: Regel[], bas?: string): Traff[] =>
  regler
    .filter((r) => r.falt.includes(falt) && regexOf(r).test(text) && !(r.utom_om_bas_har_ordet && bas !== undefined && regexOf(r).test(bas)))
    .map((r) => ({ regel: r.id, orsak: r.orsak }));

export const ID_FORMAT = /^seo-cc-\d{4}-\d{2}-\d{2}-\d{4}$/;
export const POST_FIELDS: string[] = [...FALT];
export const FALT_FIELDS = ["id", "text", "andrad", "orsak"];

export const isSparrad = (path: string, sparr: Sparrlista): boolean => {
  const p = overridePath(path);
  return sparr.sidor_exakt.includes(p) || sparr.sidor_prefix.some((pre) => p === pre.replace(/\/$/, "") || p.startsWith(pre));
};

export interface PostKontext {
  regler: Regel[];
  sparr: Sparrlista;
  /** Sökvägar som finns i sajten (sitemap + startsidan). */
  kandaSidor: Set<string>;
  /** Sidans nuvarande (råa) titel eller beskrivning före överstyrning, för villkorade regler (T2). */
  bas?: (path: string, falt: FaltNamn) => string | undefined;
}

/** Fel för ett enskilt fält (titel eller beskrivning) i en post. */
export const checkFalt = (path: string, namn: FaltNamn, falt: MetaFalt, regler: Regel[], bas?: string): string[] => {
  const fel: string[] = [];
  const e = (m: string) => fel.push(`${path} ${namn}: ${m}`);
  for (const k of Object.keys(falt)) if (!FALT_FIELDS.includes(k)) e(`okänt fält "${k}"`);
  if (typeof falt.id !== "string" || !ID_FORMAT.test(falt.id)) e(`id måste vara på formen seo-cc-ÅÅÅÅ-MM-DD-NNNN (fick ${JSON.stringify(falt.id)})`);
  if (typeof falt.andrad !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(falt.andrad)) e("andrad måste vara ett ISO-datum (ÅÅÅÅ-MM-DD)");
  if (typeof falt.orsak !== "string" || !falt.orsak.trim() || falt.orsak.length > 200) e("orsak krävs och får vara högst 200 tecken");
  const text = falt.text;
  if (typeof text !== "string" || !text) {
    e("text krävs");
    return fel;
  }
  if (text !== text.trim()) e("texten har inledande eller avslutande blanksteg");
  if (namn === "title") {
    if (text.length < 15) e("titeln är kortare än 15 tecken");
    if (withSuffix(text).length > 60) e(`titeln blir längre än 60 tecken med suffix (${withSuffix(text).length})`);
  } else {
    if (text.length < 70) e("beskrivningen är kortare än 70 tecken");
    if (text.length > 160) e(`beskrivningen är längre än 160 tecken (${text.length})`);
    else if (fitDescription(text) !== text) e("beskrivningen skulle kapas av sajten");
  }
  for (const t of checkText(namn, text, regler, bas)) e(`bryter mot regeln ${t.regel}: ${t.orsak}`);
  return fel;
};

/** Alla fel för en post (tom lista = godkänd). */
export const checkPost = (path: string, post: MetaPost, ctx: PostKontext): string[] => {
  const fel: string[] = [];
  const e = (m: string) => fel.push(`${path}: ${m}`);
  if (path !== overridePath(path)) e(`sökvägen är inte kanonisk (förväntat ${overridePath(path)})`);
  if (!ctx.kandaSidor.has(overridePath(path))) e("sidan finns inte i sajten (sitemap)");
  if (isSparrad(path, ctx.sparr)) e("sidan står på spärrlistan (seo-regler/sparrlista.json)");
  for (const k of Object.keys(post)) if (!POST_FIELDS.includes(k)) e(`okänt fält "${k}" (tillåtna: ${POST_FIELDS.join(", ")})`);
  if (!post.title && !post.description) e("minst ett av title och description krävs");
  for (const namn of FALT) {
    const falt = post[namn];
    if (falt) fel.push(...checkFalt(path, namn, falt, ctx.regler, ctx.bas?.(path, namn)));
  }
  return fel;
};

/* ---- Innehållsöverstyrningar (textblock, FAQ, internlänkar) ---- */
import type { FaqFalt, InnehallNamn, InnehallPost, LankarFalt, TextblockFalt } from "../data/overrides";
import { INNEHALL_FALT } from "../data/overrides";

export const INNEHALL_FIELDS: string[] = [...INNEHALL_FALT];
const BAS_FIELDS = ["id", "rubrik", "andrad", "orsak"];
const DATA_FIELD: Record<InnehallNamn, string> = { textblock: "stycken", faq: "fragor", lankar: "lankar" };

/** Alla förbjudna mönster gäller för brödtext, oavsett vilket fält (title/description) regeln skrevs för. */
export const checkBrodtext = (text: string, regler: Regel[], bas?: string): Traff[] =>
  regler
    .filter((r) => regexOf(r).test(text) && !(r.utom_om_bas_har_ordet && bas !== undefined && regexOf(r).test(bas)))
    .map((r) => ({ regel: r.id, orsak: r.orsak }));

export interface InnehallKontext extends PostKontext {
  /** Sidans nuvarande text (alla stycken) före tillägget, för villkorade regler (T2). */
  basText?: (path: string) => string | undefined;
}

const textFel = (where: string, s: unknown, min: number, max: number, regler: Regel[], bas?: string): string[] => {
  const fel: string[] = [];
  if (typeof s !== "string" || !s) return [`${where}: text krävs`];
  if (s !== s.trim()) fel.push(`${where}: inledande eller avslutande blanksteg`);
  if (s.length < min) fel.push(`${where}: kortare än ${min} tecken`);
  if (s.length > max) fel.push(`${where}: längre än ${max} tecken (${s.length})`);
  if (/[<>]|https?:|\{\{|\}\}|undefined|\n/.test(s)) fel.push(`${where}: får inte innehålla HTML, webbadresser, platshållare eller radbrytningar`);
  for (const t of checkBrodtext(s, regler, bas)) fel.push(`${where}: bryter mot regeln ${t.regel}: ${t.orsak}`);
  return fel;
};

export const checkInnehallFalt = (path: string, namn: InnehallNamn, falt: TextblockFalt | FaqFalt | LankarFalt, ctx: InnehallKontext): string[] => {
  const fel: string[] = [];
  const w = `${path} ${namn}`;
  const e = (m: string) => fel.push(`${w}: ${m}`);
  const bas = ctx.basText?.(path);
  const tillatna = [...BAS_FIELDS, DATA_FIELD[namn]];
  for (const k of Object.keys(falt)) if (!tillatna.includes(k)) e(`okänt fält "${k}"`);
  if (typeof falt.id !== "string" || !ID_FORMAT.test(falt.id)) e(`id måste vara på formen seo-cc-ÅÅÅÅ-MM-DD-NNNN (fick ${JSON.stringify(falt.id)})`);
  if (typeof falt.andrad !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(falt.andrad)) e("andrad måste vara ett ISO-datum (ÅÅÅÅ-MM-DD)");
  if (typeof falt.orsak !== "string" || !falt.orsak.trim() || falt.orsak.length > 200) e("orsak krävs och får vara högst 200 tecken");
  if (falt.rubrik !== undefined) fel.push(...textFel(`${w} rubrik`, falt.rubrik, 5, 70, ctx.regler, bas));
  if (namn === "textblock") {
    const s = (falt as TextblockFalt).stycken;
    if (!Array.isArray(s) || s.length < 1 || s.length > 4) e("stycken måste vara en lista med 1–4 stycken");
    else {
      s.forEach((x, i) => fel.push(...textFel(`${w} stycke ${i + 1}`, x, 80, 700, ctx.regler, bas)));
      if (s.join("").length > 1600) e("stycken är sammanlagt längre än 1600 tecken");
    }
  } else if (namn === "faq") {
    const f = (falt as FaqFalt).fragor;
    if (!Array.isArray(f) || f.length < 1 || f.length > 5) e("fragor måste vara en lista med 1–5 frågor");
    else
      f.forEach((x, i) => {
        for (const k of Object.keys(x ?? {})) if (k !== "fraga" && k !== "svar") e(`fråga ${i + 1}: okänt fält "${k}"`);
        fel.push(...textFel(`${w} fråga ${i + 1}`, x?.fraga, 15, 140, ctx.regler, bas));
        if (typeof x?.fraga === "string" && !x.fraga.endsWith("?")) e(`fråga ${i + 1} måste sluta med ?`);
        fel.push(...textFel(`${w} svar ${i + 1}`, x?.svar, 60, 600, ctx.regler, bas));
      });
  } else {
    const l = (falt as LankarFalt).lankar;
    if (!Array.isArray(l) || l.length < 1 || l.length > 5) e("lankar måste vara en lista med 1–5 länkar");
    else {
      const seen = new Set<string>();
      l.forEach((x, i) => {
        for (const k of Object.keys(x ?? {})) if (k !== "href" && k !== "text") e(`länk ${i + 1}: okänt fält "${k}"`);
        const href = typeof x?.href === "string" ? x.href : "";
        if (href !== overridePath(href) || !href.startsWith("/")) e(`länk ${i + 1}: href måste vara en kanonisk sökväg (gemener, inledande /, utan avslutande /, fick ${JSON.stringify(x?.href)})`);
        else if (!ctx.kandaSidor.has(href)) e(`länk ${i + 1}: ${href} finns inte i sajten (sitemap)`);
        else if (href === overridePath(path)) e(`länk ${i + 1}: sidan får inte länka till sig själv`);
        if (seen.has(href)) e(`länk ${i + 1}: ${href} förekommer flera gånger`);
        seen.add(href);
        fel.push(...textFel(`${w} länktext ${i + 1}`, x?.text, 3, 60, ctx.regler, bas));
      });
    }
  }
  return fel;
};

export const checkInnehallPost = (path: string, post: InnehallPost, ctx: InnehallKontext): string[] => {
  const fel: string[] = [];
  const e = (m: string) => fel.push(`${path}: ${m}`);
  if (path !== overridePath(path)) e(`sökvägen är inte kanonisk (förväntat ${overridePath(path)})`);
  if (!ctx.kandaSidor.has(overridePath(path))) e("sidan finns inte i sajten (sitemap)");
  if (isSparrad(path, ctx.sparr)) e("sidan står på spärrlistan (seo-regler/sparrlista.json)");
  for (const k of Object.keys(post)) if (!INNEHALL_FIELDS.includes(k)) e(`okänt fält "${k}" (tillåtna: ${INNEHALL_FIELDS.join(", ")})`);
  if (!post.textblock && !post.faq && !post.lankar) e("minst ett av textblock, faq och lankar krävs");
  for (const namn of INNEHALL_FALT) {
    const falt = post[namn];
    if (falt) fel.push(...checkInnehallFalt(path, namn, falt, ctx));
  }
  return fel;
};
