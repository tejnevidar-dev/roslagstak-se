// Reservväg för sajtens formulär (incident 2026-10-24: sajtens Supabase-projekt ger NXDOMAIN).
// Formulären postar hit i stället för till Supabase. Funktionen validerar, bygger om kroppen från en fast fältlista och skickar den
// server till server till CRM:ets roslagstak-webhook (crm/src/routes/api/public/roslagstak-webhook.ts) med hemligheten i headern X-Webhook-Secret.
// Hemligheten ligger bara som miljövariabel i Cloudflare Pages (ROSLAGSTAK_WEBHOOK_SECRET). Den står aldrig i koden, i sajtens JS eller i loggar.
// Ingen persondata loggas: bara händelse och statuskod.

export interface Env {
  ROSLAGSTAK_WEBHOOK_SECRET?: string;
  /** Valfritt: annan webhook-adress än standarden nedan. */
  ROSLAGSTAK_WEBHOOK_URL?: string;
}

export const STANDARD_WEBHOOK_URL = "https://admin-vt6.tejnevidar.workers.dev/api/public/roslagstak-webhook";
export const MAX_KROPP_BYTES = 16 * 1024;
/** Namnet på den dolda fältfällan. Formulären skriver ut ett tomt fält med exakt detta namn (src/components/Falla.tsx). */
export const FALLA_FALT = "webbplats";
const TILLATNA_VARDAR = new Set(["roslagstak.se", "www.roslagstak.se"]);
const TIMEOUT_MS = 7000;

// Samma gränser som RoslagstakPayloadSchema i CRM:et (roslagstak-webhook-payload.ts).
const TEXTFALT: Record<string, number> = {
  name: 255,
  phone: 64,
  email: 255,
  address: 500,
  current_roof: 255,
  new_roof: 255,
  raspont: 255,
  avvattning: 255,
  floors: 64,
  message: 5000,
  landing_path: 2000,
  utm_source: 255,
  utm_medium: 255,
  utm_campaign: 255,
  utm_content: 255,
};
const BOOLFALT = ["gangbrygga", "takstege"] as const;
const KALLOR = new Set(["google_organisk", "ads", "chatgpt", "direkt", "annan"]);

const svar = (status: number, kropp: Record<string, unknown>) =>
  new Response(JSON.stringify(kropp), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

/** Loggrad utan persondata: bara händelse och eventuell statuskod. */
const logga = (handelse: string, status?: number, extra?: Record<string, string>) => console.error(JSON.stringify({ funktion: "forfragan", handelse, status, tid: new Date().toISOString(), ...extra }));

/** Formulärets namn (till exempel "brf" eller "kontakt_sida") för loggraden; allt som inte är ett kort ord blir "okant". Skickas aldrig vidare till CRM. */
const formularNamn = (indata: unknown): string => {
  const v = indata && typeof indata === "object" ? (indata as Record<string, unknown>).formular : undefined;
  return typeof v === "string" && /^[a-z0-9_-]{1,40}$/.test(v) ? v : "okant";
};

type Rensad = { ok: true; payload: Record<string, unknown> } | { ok: false; fel: string };

/** Bygger webhook-kroppen ur den inkomna. Okända fält släpps, långa värden kortas (en förfrågan avvisas aldrig för en lång sträng), id och tid sätts här. */
export const rensa = (indata: unknown): Rensad => {
  if (!indata || typeof indata !== "object" || Array.isArray(indata)) return { ok: false, fel: "ogiltig_kropp" };
  const i = indata as Record<string, unknown>;
  if (i.mode !== "configure" && i.mode !== "consultation") return { ok: false, fel: "ogiltigt_mode" };
  const ut: Record<string, unknown> = { mode: i.mode };
  for (const [fält, max] of Object.entries(TEXTFALT)) {
    const v = i[fält];
    if (v === undefined || v === null) {
      ut[fält] = null;
      continue;
    }
    if (typeof v !== "string") return { ok: false, fel: `ogiltigt_${fält}` };
    const t = v.trim().slice(0, max);
    ut[fält] = t === "" ? null : t;
  }
  for (const fält of BOOLFALT) {
    const v = i[fält];
    ut[fält] = typeof v === "boolean" ? v : null;
  }
  // CRM:et (live) ger 400 för landing_path över 2 000 tecken och vill ha bara sökvägen: skär bort querysträng och fragment.
  if (typeof ut.landing_path === "string") ut.landing_path = ut.landing_path.split(/[?#]/)[0].slice(0, 2000) || null;
  ut.referrer_category =typeof i.referrer_category === "string" && KALLOR.has(i.referrer_category) ? i.referrer_category : null;
  // Obligatoriskt: namn och ett telefonnummer med minst sex siffror. E-post kontrolleras inte i format (en felstavad adress ska aldrig tysta en kund; CRM:et tolkar den tolerant).
  if (!ut.name) return { ok: false, fel: "namn_saknas" };
  if (!ut.phone || String(ut.phone).replace(/\D/g, "").length < 6) return { ok: false, fel: "telefon_ogiltig" };
  ut.id = crypto.randomUUID();
  ut.created_at = new Date().toISOString();
  return { ok: true, payload: ut };
};

const originOk = (request: Request): boolean => {
  const origin = request.headers.get("origin");
  if (!origin) return true; // server-till-server och vissa webbläsare utan Origin
  try {
    const u = new URL(origin);
    return TILLATNA_VARDAR.has(u.hostname) || u.origin === new URL(request.url).origin;
  } catch {
    return false;
  }
};

const skickaTillCrm = async (url: string, hemlighet: string, payload: Record<string, unknown>, hamta: typeof fetch): Promise<number | null> => {
  for (let forsok = 0; forsok < 2; forsok++) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
    try {
      const r = await hamta(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Webhook-Secret": hemlighet },
        body: JSON.stringify(payload),
        signal: ac.signal,
      });
      if (r.status < 500) return r.status;
      logga("crm_5xx", r.status);
    } catch {
      logga("crm_natverksfel");
    } finally {
      clearTimeout(timer);
    }
    // Andra försöket använder samma id, så CRM:ets dubblettskydd (external_id roslagstak:<id>) tar hand om en retur som kom fram.
  }
  return null;
};

export const hanteraForfragan = async (request: Request, env: Env, hamta: typeof fetch = fetch): Promise<Response> => {
  if (!originOk(request)) return svar(403, { ok: false, fel: "origin" });
  if (!(request.headers.get("content-type") ?? "").toLowerCase().includes("application/json")) return svar(415, { ok: false, fel: "content_type" });
  const langd = Number(request.headers.get("content-length") ?? "0");
  if (langd > MAX_KROPP_BYTES) return svar(413, { ok: false, fel: "for_stor" });
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_KROPP_BYTES) return svar(413, { ok: false, fel: "for_stor" });

  let indata: unknown;
  try {
    indata = JSON.parse(text);
  } catch {
    return svar(400, { ok: false, fel: "ogiltig_json" });
  }

  // Fältfällan: ett ifyllt dolt fält betyder en bot. Svara som om det gått bra, skicka ingenting, och låt formuläret inte räkna ett lead.
  const falla = indata && typeof indata === "object" ? (indata as Record<string, unknown>)[FALLA_FALT] : undefined;
  if (typeof falla === "string" && falla.trim() !== "") {
    // Loggraden har bara tid, formulär och "falla": aldrig fältvärden, IP-adress eller user agent.
    logga("falla", undefined, { formular: formularNamn(indata) });
    return svar(200, { ok: true, ignorerad: true });
  }

  const r = rensa(indata);
  if ("fel" in r) return svar(400, { ok: false, fel: r.fel });

  const hemlighet = env.ROSLAGSTAK_WEBHOOK_SECRET;
  if (!hemlighet) {
    logga("hemlighet_saknas");
    return svar(500, { ok: false, fel: "ej_konfigurerad" });
  }

  const status = await skickaTillCrm(env.ROSLAGSTAK_WEBHOOK_URL || STANDARD_WEBHOOK_URL, hemlighet, r.payload, hamta);
  if (status === 200 || status === 201) return svar(200, { ok: true });
  logga("crm_avvisade", status ?? undefined);
  return svar(502, { ok: false, fel: status === null ? "mottagaren_svarar_inte" : "mottagaren_avvisade" });
};

export const onRequestPost = ({ request, env }: { request: Request; env: Env }) => hanteraForfragan(request, env);

/** Alla andra metoder än POST. */
export const onRequest = () => svar(405, { ok: false, fel: "metod" });
