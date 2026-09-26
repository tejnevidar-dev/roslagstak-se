/**
 * Kampanjkälla (utm_source, utm_medium, utm_campaign) ur URL:en. Sparas i sessionStorage så att
 * uppgiften följer med om besökaren byter sida, och läggs som en rad i förfrågans message
 * (inget nytt databasfält). Första kända kampanj i sessionen behålls tills en ny utm-länk öppnas.
 * Inga personuppgifter. gclid hanteras inte här (väntar på samtyckesbeslut).
 */
const KEY = "rt_utm_v1";
const KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
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

/** Anropas en gång vid start: sparar utm-parametrar från aktuell URL om några finns. */
export const captureUtm = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of KEYS) {
      const v = clean(params.get(k));
      if (v) found[k] = v;
    }
    if (Object.keys(found).length > 0) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* sessionStorage kan vara blockerat: då följer ingen kampanjkälla med */
  }
};

/** Rad att lägga i message, t.ex. "Kampanj: source=google, medium=cpc, campaign=taby-a". Tom sträng om okänd. */
export const utmLine = (): string => {
  const u = read();
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
