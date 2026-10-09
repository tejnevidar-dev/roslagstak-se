/**
 * Landningssida + referrer-kategori för en session, så att SEO-leads kan räknas per sida och
 * kluster i veckorapporten (#1d). Sparas i sessionStorage, precis som utm.ts, och skrivs bara en
 * gång per session (första sidan/referrern vinner, inte den sista klickade länken). Inga
 * personuppgifter — bara tekniska sidbesöksuppgifter från det egna besöket.
 *
 * Lagring i webbläsaren kräver samtycke (juristens besked 2026-10-09): captureAttribution() skriver inget förrän besökaren har godkänt
 * statistik, och nyckeln tas bort när valet nekas eller tas tillbaka (lagring-samtycke.ts). Godkänner besökaren mitt i besöket blir den
 * första sidan sidan där valet gjordes.
 *
 * VIKTIGT: attributionFields() ska INTE skickas till quote_requests.insert() förrän
 * migrationen i supabase/migrations/*_attribution_columns_prepared.sql är körd i produktion
 * (kolumnerna finns inte än) — se ledning/marknad/attribution-spec-2026-09-29.md.
 */
import { hasAnalyticsConsent } from "./consent";

const KEY = "rt_attribution_v1";

export type ReferrerCategory = "google_organisk" | "ads" | "chatgpt" | "direkt" | "annan";

interface Attribution {
  landing_path: string;
  referrer_category: ReferrerCategory;
}

const classifyReferrer = (params: URLSearchParams, referrer: string): ReferrerCategory => {
  const hasAdsSignal =
    params.has("gclid") ||
    params.has("gbraid") ||
    params.has("wbraid") ||
    ["cpc", "ppc", "paid"].includes((params.get("utm_medium") ?? "").toLowerCase());
  if (hasAdsSignal) return "ads";

  if (!referrer) return "direkt";

  try {
    const host = new URL(referrer).hostname;
    if (host === "chatgpt.com" || host === "chat.openai.com") return "chatgpt";
    if (/(^|\.)google\.[a-z.]+$/i.test(host)) return "google_organisk";
  } catch {
    /* ogiltig referrer-URL: faller igenom till "annan" */
  }
  return "annan";
};

/** Anropas en gång vid appstart (main.tsx), precis som captureUtm(). */
export const captureAttribution = () => {
  if (!hasAnalyticsConsent()) return;
  try {
    if (sessionStorage.getItem(KEY)) return; // redan satt denna session

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      landing_path: window.location.pathname,
      referrer_category: classifyReferrer(params, document.referrer),
    };
    sessionStorage.setItem(KEY, JSON.stringify(attribution));
  } catch {
    /* sessionStorage kan vara blockerat: då följer ingen attribution med */
  }
};

/** Tar bort det sparade (nekat eller återtaget val). */
export const clearAttribution = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* sessionStorage kan vara blockerat */
  }
};

const read = (): Attribution | null => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "null") as Attribution | null;
  } catch {
    return null;
  }
};

/**
 * Strukturerade fält att skicka med varje förfrågan (quote_requests-kolumner, INTE text i
 * message). Returnerar null-värden om captureAttribution() av någon anledning inte kört.
 */
export const attributionFields = () => {
  const a = read();
  return {
    landing_path: a?.landing_path ?? null,
    referrer_category: a?.referrer_category ?? null,
  };
};
