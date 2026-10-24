// Skickar en förfrågan från något av sajtens formulär. Reservvägen (incident 2026-10-24, sajtens Supabase ger NXDOMAIN):
// kroppen går till Cloudflare Pages-funktionen /api/forfragan (functions/api/forfragan.ts), som skickar den vidare till CRM:ets webhook.
// Vägen tillbaka till Supabase är att sätta FORFRAGAN_VIA till "supabase" (en rad); då laddas klienten som förut.
import { FALLA_FALT } from "../../functions/api/forfragan";

export const FORFRAGAN_VIA = "pages" as "pages" | "supabase";

export type ForfraganKropp = Record<string, string | boolean | null>;
export type ForfraganSvar = { error: Error | null; ignorerad?: boolean };

/** Värdet i den dolda fältfällan (finns bara om formuläret ritar <Falla />). */
const fallVarde = (formular?: HTMLFormElement | null): string => {
  const f = formular?.elements.namedItem(FALLA_FALT);
  return f instanceof HTMLInputElement ? f.value : "";
};

export const skickaForfragan = async (kropp: ForfraganKropp, formular?: HTMLFormElement | null): Promise<ForfraganSvar> => {
  if (FORFRAGAN_VIA === "supabase") {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("quote_requests").insert(kropp as never);
    return { error: error ? new Error(error.message) : null };
  }
  try {
    const r = await fetch("/api/forfragan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...kropp, [FALLA_FALT]: fallVarde(formular) }),
    });
    if (!r.ok) return { error: new Error(`forfragan ${r.status}`) };
    const svar = (await r.json().catch(() => null)) as { ok?: boolean; ignorerad?: boolean } | null;
    if (!svar?.ok) return { error: new Error("forfragan: oväntat svar") };
    return { error: null, ignorerad: svar.ignorerad === true };
  } catch (e) {
    return { error: e instanceof Error ? e : new Error("forfragan: nätverksfel") };
  }
};
