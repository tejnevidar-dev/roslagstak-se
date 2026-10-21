/**
 * Fingeravtryck per sida för lastmod i sajtkartan (gren 169c). Tidigare räknades hela den förrenderade sidan, inklusive JSON-LD och brödsmulor, och en ändring i en delad fil
 * (schemanoderna i gren 168, standardblock, hubblänkar) gav då alla sidor dagens datum: 494 av 497 adresser hade 2026-10-21 och lastmod sade ingenting. Nu räknas sidans egen
 * datakälla: ortssidor ur ortens post (locations.ts), titel/meta (seo-overrides.ts) och egna FAQ-svar (location-egna-faq.ts), tjänst × ort-sidor med egen text ur sin post i
 * combo-overrides.ts, och övriga sidor ur sin förrenderade text utan JSON-LD och brödsmulor. En ändring i delad kod ändrar alltså inte sidans datum.
 */
import { createHash } from "node:crypto";
import { locations } from "../src/data/locations";
import { ortSeoOverrides } from "../src/data/seo-overrides";
import { egnaFaqFor } from "../src/data/location-egna-faq";
import { comboOverrides } from "../src/data/combo-overrides";

interface SidaText {
  h1?: unknown;
  intro?: unknown;
  paragraphs?: unknown;
  title?: unknown;
  description?: unknown;
}

const sha = (x: unknown) => createHash("sha1").update(JSON.stringify(x)).digest("hex").slice(0, 16);

/** Vilken datakälla sidan har: "ort" (en post i locations.ts), "combo" (en post i combo-overrides.ts) eller "text" (sidans förrenderade text). */
export const sidaKalla = (path: string): { typ: "ort" | "combo" | "text"; nyckel?: string } => {
  const o = path.match(/^\/taklaggare-([a-z0-9-]+)$/);
  if (o && locations.some((l) => l.slug === o[1])) return { typ: "ort", nyckel: o[1] };
  const c = path.match(/^\/([a-z0-9-]+)$/);
  if (c && comboOverrides[c[1]]) return { typ: "combo", nyckel: c[1] };
  return { typ: "text" };
};

export const fingeravtryck = (path: string, page: SidaText): string => {
  const k = sidaKalla(path);
  if (k.typ === "ort") {
    const slug = k.nyckel!;
    return sha(["ort", locations.find((l) => l.slug === slug), ortSeoOverrides[slug] ?? null, egnaFaqFor(slug) ?? null]);
  }
  if (k.typ === "combo") return sha(["combo", comboOverrides[k.nyckel!]]);
  return sha(["text", page.h1, page.intro, page.paragraphs, page.title, page.description]);
};
