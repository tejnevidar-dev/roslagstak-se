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
export const checkText = (falt: "title" | "description", text: string, regler: Regel[]): Traff[] =>
  regler.filter((r) => r.falt.includes(falt) && regexOf(r).test(text)).map((r) => ({ regel: r.id, orsak: r.orsak }));

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
}

/** Fel för ett enskilt fält (titel eller beskrivning) i en post. */
export const checkFalt = (path: string, namn: FaltNamn, falt: MetaFalt, regler: Regel[]): string[] => {
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
  for (const t of checkText(namn, text, regler)) e(`bryter mot regeln ${t.regel}: ${t.orsak}`);
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
    if (falt) fel.push(...checkFalt(path, namn, falt, ctx.regler));
  }
  return fel;
};
