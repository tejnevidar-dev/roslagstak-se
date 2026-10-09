/**
 * Kampanjkälla (utm_source, utm_medium, utm_campaign, utm_content) ur URL:en. Sparas i
 * sessionStorage så att uppgiften följer med om besökaren byter sida, och läggs som en rad i
 * förfrågans message (inget nytt databasfält). Första kända kampanj i sessionen behålls tills en
 * ny utm-länk öppnas. Inga personuppgifter. gclid hanteras inte här (väntar på samtyckesbeslut).
 *
 * Lagring i webbläsaren kräver samtycke (juristens besked 2026-10-09): inget skrivs till sessionStorage förrän besökaren har godkänt
 * statistik, och nyckeln tas bort när valet nekas eller tas tillbaka (se lagring-samtycke.ts). Utan samtycke bygger kampanjraden
 * bara på utm-värdena i adressen till sidan där formuläret skickas.
 */
import { hasAnalyticsConsent } from "./consent";

const KEY = "rt_utm_v1";
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
type UtmKey = (typeof KEYS)[number];
type Utm = Partial<Record<UtmKey, string>>;

/** Tillåt bara korta, ofarliga värden (bokstäver, siffror, _ . - och mellanslag). */
const clean = (v: string | null): string | undefined => {
  const s = (v ?? "").trim().slice(0, 60);
  return /^[\p{L}\p{N}_.\- ]+$/u.test(s) ? s : undefined;
};

const read = (): Utm => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
};

/** utm-värdena i adressen till den aktuella sidan (ingen lagring). */
const utmFromUrl = (): Utm => {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of KEYS) {
      const v = clean(params.get(k));
      if (v) found[k] = v;
    }
    return found;
  } catch {
    return {};
  }
};

/** Det som gäller just nu: sparat (bara efter godkänd statistik) och adressen, där adressens värden gäller sist. */
const aktuell = (): Utm => ({ ...(hasAnalyticsConsent() ? read() : {}), ...utmFromUrl() });

/** Sparar utm-parametrar från aktuell URL om några finns, men bara efter godkänd statistik. */
export const captureUtm = () => {
  if (!hasAnalyticsConsent()) return;
  try {
    const found = utmFromUrl();
    if (Object.keys(found).length > 0) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* sessionStorage kan vara blockerat: då följer ingen kampanjkälla med */
  }
};

/** Tar bort det sparade (nekat eller återtaget val). */
export const clearUtm = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* sessionStorage kan vara blockerat */
  }
};

/** Rad att lägga i message, t.ex. "Kampanj: source=google, medium=cpc, campaign=taby-a". Tom sträng om okänd. */
export const utmLine = (): string => {
  const u = aktuell();
  const parts = KEYS.filter((k) => u[k]).map((k) => `${k.replace("utm_", "")}=${u[k]}`);
  return parts.length > 0 ? `Kampanj: ${parts.join(", ")}` : "";
};

/** Lägger kampanjraden först i ett meddelande (eller returnerar bara raden om meddelandet är tomt). */
export const withUtm = (message: string | null | undefined): string | null => {
  const line = utmLine();
  const base = message?.trim() ? message.trim() : "";
  if (!line) return base || null;
  return base ? `${line}\n${base}` : line;
};

/**
 * Strukturerade utm-fält för quote_requests-kolumner (#1d, VAL B) — null-värden om ingen
 * kampanj är känd. Använd i stället för withUtm()/utmLine() när attributionskolumnerna finns
 * (se supabase/migrations/*_attribution_columns_prepared.sql).
 */
export const utmFields = () => {
  const u = aktuell();
  return {
    utm_source: u.utm_source ?? null,
    utm_medium: u.utm_medium ?? null,
    utm_campaign: u.utm_campaign ?? null,
    utm_content: u.utm_content ?? null,
  };
};
