import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Loader2, Phone } from "lucide-react";
import { utmLine } from "@/lib/utm";
import { confirmationText, isWithinOpeningHours, nextOpeningLabel } from "@/lib/booking";
/* Databasklienten (≈200 kB) hämtas först när någon börjar fylla i formuläret, inte vid sidladdning. */
const loadSupabase = () => import("@/integrations/supabase/client").then((m) => m.supabase);
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const PHONE_DISPLAY = "070-154 36 39";
type Slot = "formiddag" | "eftermiddag" | "ring_mig";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-[16px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
const todayISO = () => new Date().toISOString().slice(0, 10);

const slotLabel: Record<Slot, string> = {
  formiddag: "Förmiddag",
  eftermiddag: "Eftermiddag",
  ring_mig: "Ring mig inom 1 timme",
};

/**
 * Boka kostnadsfri takkontroll: namn, telefon, ort (valfritt) + välj dag/del av dag,
 * eller "ring mig inom 1 h" när sajten är öppen (mån–fre 07–20, lör–sön 09–19).
 * Skriver till samma quote_requests-tabell och samma trigger som övriga formulär (ingen
 * ny hemlighet eller databaskoppling behövs). Bokningsraden står tydligt märkt i meddelandet
 * så att CRM:s befintliga leadhantering ser den. En renare integration mot CRM:s dedikerade
 * bokningsendpoint (se ledning/marknad — kontraktet från Agent – CRM) kan läggas till senare
 * via en serverdriven databastrigger, som webhook-triggern för vanliga förfrågningar.
 */
const BookingWidget = ({ title = "Boka kostnadsfri takkontroll" }: { title?: string }) => {
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", municipality: "", date: todayISO(), slot: "formiddag" as Slot });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    setOpenNow(isWithinOpeningHours());
  }, []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const chooseSlot = (slot: Slot) => setForm((prev) => ({ ...prev, slot }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const bookingLine =
      form.slot === "ring_mig"
        ? "Bokning: ring mig inom 1 timme"
        : `Bokning: ${form.date} (${slotLabel[form.slot]})`;
    const message = [
      "Bokning kostnadsfri takkontroll",
      bookingLine,
      form.municipality.trim() ? `Ort: ${form.municipality.trim()}` : null,
      utmLine() || null,
    ]
      .filter(Boolean)
      .join("\n");

    const supabase = await loadSupabase();
    const { error } = await supabase.from("quote_requests").insert({
      mode: "consultation",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: "",
      address: form.municipality.trim() || null,
      message,
    });

    setSubmitting(false);

    if (error) {
      console.error("Booking form error:", error);
      toast({
        title: "Något gick fel",
        description: `Försök igen eller ring oss direkt på ${PHONE_DISPLAY}.`,
        variant: "destructive",
      });
      return;
    }

    trackEvent("generate_lead", { form: form.slot === "ring_mig" ? "callback" : "booking", slot: form.slot });
    setSubmitted(confirmationText(form.slot === "ring_mig" ? "ring_mig" : "boka"));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8" role="status">
        <CheckCircle className="h-9 w-9 text-accent" aria-hidden="true" />
        <h2 className="font-display text-2xl text-foreground">Tack, din bokning är mottagen.</h2>
        <p className="leading-relaxed text-muted-foreground">
          {submitted} Kostnadsfri takkontroll, utan förpliktelser: du betalar inget och binder dig inte.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => void loadSupabase()}
      aria-label={title}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[0_30px_70px_-45px_rgba(12,35,64,0.55)] md:p-8"
    >
      <div>
        <h2 className="font-display text-2xl text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kostnadsfritt, utan förpliktelser. Under 30 sekunder att boka.
        </p>
      </div>
      <div>
        <label htmlFor="booking-name" className={labelClass}>Namn</label>
        <input id="booking-name" required autoComplete="name" value={form.name} onChange={set("name")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="booking-phone" className={labelClass}>Telefon</label>
        <input id="booking-phone" type="tel" inputMode="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="booking-municipality" className={labelClass}>
          Ort <span className="font-normal text-muted-foreground">(valfritt)</span>
        </label>
        <input id="booking-municipality" autoComplete="address-level2" value={form.municipality} onChange={set("municipality")} className={inputClass} placeholder="T.ex. Norrtälje" />
      </div>

      <div>
        <span className={labelClass}>Välj tid</span>
        <div className="grid grid-cols-2 gap-2">
          {(["formiddag", "eftermiddag"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => chooseSlot(s)}
              aria-pressed={form.slot === s}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                form.slot === s
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-input bg-background text-foreground hover:border-accent"
              }`}
            >
              {slotLabel[s]}
            </button>
          ))}
        </div>
        {form.slot !== "ring_mig" && (
          <input
            type="date"
            required
            min={todayISO()}
            value={form.date}
            onChange={set("date")}
            className={`${inputClass} mt-2`}
            aria-label="Önskat datum"
          />
        )}
        {openNow !== null && (
          <button
            type="button"
            onClick={() => openNow && chooseSlot("ring_mig")}
            aria-pressed={form.slot === "ring_mig"}
            disabled={!openNow}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              form.slot === "ring_mig"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-input bg-background text-foreground hover:border-accent"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {openNow ? "Ring mig inom 1 timme" : `Vi ringer vid nästa öppning, ${nextOpeningLabel()}`}
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Skickar
          </>
        ) : (
          <>
            {form.slot === "ring_mig" ? "Boka - ring mig" : "Boka takkontroll"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
};

export default BookingWidget;
