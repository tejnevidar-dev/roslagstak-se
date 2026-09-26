import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
/* Databasklienten (≈200 kB) hämtas först när någon börjar fylla i formuläret, inte vid sidladdning. */
const loadSupabase = () => import("@/integrations/supabase/client").then((m) => m.supabase);
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const PHONE_DISPLAY = "070-154 36 39";

const topics = [
  "Takbyte",
  "Takrenovering eller reparation",
  "Takmålning eller taktvätt",
  "Takbesiktning",
  "Vet inte än",
] as const;

interface LeadFormProps {
  /** Text som hamnar först i meddelandet så att vi ser varifrån förfrågan kom. */
  source: string;
  /** Värde för GA4-händelsen generate_lead (parametern "form"). */
  formName: string;
  /** Valfri ort för GA4 (parametern "ort"). */
  ort?: string;
  defaultTopic?: (typeof topics)[number];
  addressPlaceholder?: string;
  title?: string;
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-[16px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

/** Kort förfrågningsformulär för privatkund. Sparas i quote_requests som "consultation". */
const LeadForm = ({
  source,
  formName,
  ort,
  defaultTopic = "Takbyte",
  addressPlaceholder = "Gatuadress och ort",
  title = "Begär kostnadsfri offert",
}: LeadFormProps) => {
  const initialForm = { name: "", phone: "", email: "", address: "", topic: defaultTopic as string, message: "" };
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const message = [source, `Gäller: ${form.topic}`, form.message.trim() ? `\n${form.message.trim()}` : null]
      .filter(Boolean)
      .join("\n");

    const supabase = await loadSupabase();
    const { error } = await supabase.from("quote_requests").insert({
      mode: "consultation",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim() || null,
      message,
    });

    setSubmitting(false);

    if (error) {
      console.error("Lead form error:", error);
      toast({
        title: "Något gick fel",
        description: `Försök igen eller ring oss direkt på ${PHONE_DISPLAY}.`,
        variant: "destructive",
      });
      return;
    }

    trackEvent("generate_lead", { form: formName, ort });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8" role="status">
        <CheckCircle className="h-9 w-9 text-accent" aria-hidden="true" />
        <h2 className="font-display text-2xl text-foreground">Tack, vi har tagit emot din förfrågan.</h2>
        <p className="leading-relaxed text-muted-foreground">
          Vi återkommer inom 24 timmar för att boka en tid. Vill du prata direkt kan du ringa {PHONE_DISPLAY}.
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
        <p className="mt-1 text-sm text-muted-foreground">Svar inom 24 timmar. Ingen förbindelse.</p>
      </div>
      <div>
        <label htmlFor="lead-name" className={labelClass}>Namn</label>
        <input id="lead-name" required autoComplete="name" value={form.name} onChange={set("name")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="lead-phone" className={labelClass}>Telefon</label>
        <input id="lead-phone" type="tel" inputMode="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="lead-email" className={labelClass}>E-post</label>
        <input id="lead-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="lead-address" className={labelClass}>Adress</label>
        <input id="lead-address" required autoComplete="street-address" value={form.address} onChange={set("address")} className={inputClass} placeholder={addressPlaceholder} />
      </div>
      <div>
        <label htmlFor="lead-topic" className={labelClass}>Vad gäller det?</label>
        <select id="lead-topic" value={form.topic} onChange={set("topic")} className={inputClass}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-message" className={labelClass}>
          Meddelande <span className="font-normal text-muted-foreground">(valfritt)</span>
        </label>
        <textarea id="lead-message" rows={3} value={form.message} onChange={set("message")} className={`${inputClass} resize-none`} />
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
            Skicka förfrågan <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
};

export default LeadForm;
