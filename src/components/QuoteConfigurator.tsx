import { useState, useEffect, useRef } from "react";
import { QUOTE_CONFIG } from "@/data/offert-text";
import { ArrowRight, CheckCircle, Home, Clock, Mail, Phone, MessageCircle, Loader2 } from "lucide-react";
import { withUtm } from "@/lib/utm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const roofTypeOptions = [
  "TP20 Plåttak",
  "Tegelplåttak",
  "Pannplåttak",
  "Dubbelfalsat plåttak",
  "Lertegeltak",
  "Betongpannetak",
  "Glacerade pannor",
  "Papptak",
  "Vet ej / Behöver rådgivning",
];

type TabMode = "configure" | "consultation";

const QuoteConfigurator = () => {
  const [mode, setMode] = useState<TabMode>("configure");
  const [currentRoof, setCurrentRoof] = useState("");
  const [newRoof, setNewRoof] = useState("");
  const [raspont, setRaspont] = useState("");
  const [gangbrygga, setGangbrygga] = useState(false);
  const [takstege, setTakstege] = useState(false);
  const [avvattning, setAvvattning] = useState("");
  const [floors, setFloors] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (submitted && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    const touched =
      currentRoof || newRoof || raspont || gangbrygga || takstege || avvattning || floors || name || phone || email || address || message;
    if (touched) {
      startedRef.current = true;
      trackEvent("begin_quote", { mode });
    }
  }, [mode, currentRoof, newRoof, raspont, gangbrygga, takstege, avvattning, floors, name, phone, email, address, message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      mode,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim() || null,
      current_roof: mode === "configure" ? currentRoof || null : null,
      new_roof: mode === "configure" ? newRoof || null : null,
      raspont: mode === "configure" ? raspont || null : null,
      gangbrygga: mode === "configure" ? gangbrygga : false,
      takstege: mode === "configure" ? takstege : false,
      avvattning: mode === "configure" ? avvattning || null : null,
      floors: mode === "configure" ? floors || null : null,
      message: withUtm(mode === "consultation" ? message : null),
    };

    const { error } = await supabase.from("quote_requests").insert(payload);

    if (error) {
      console.error("Quote request error:", error);
      toast({
        title: "Något gick fel",
        description: "Vänligen försök igen eller ring oss direkt på 070-154 36 39.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    trackEvent("generate_lead", { form: mode === "configure" ? "offert_konfigurator" : "offert_radgivning" });
    setSubmitted(true);
    setSubmitting(false);
    toast({
      title: "Tack för din förfrågan!",
      description:
        mode === "configure"
          ? "Vi svarar inom 24 timmar."
          : "Vi återkopplar till dig inom 24 timmar.",
    });
  };

  if (submitted) {
    return (
      <section ref={sectionRef} id="offert" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="quote-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <h2 className="font-display text-3xl text-foreground">Tack för din förfrågan!</h2>
            {mode === "configure" ? (
              <p className="text-muted-foreground">
                Vi svarar inom <strong>24 timmar</strong>.
              </p>
            ) : (
              <p className="text-muted-foreground">
                Vi återkopplar till dig <strong>inom 24 timmar</strong> från och med nu. 
                En av våra säljare kontaktar dig inom 24 timmar.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="offert" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="quote-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{QUOTE_CONFIG.eyebrow}</p>
          <h2 id="quote-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            {QUOTE_CONFIG.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {QUOTE_CONFIG.intro}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex rounded-2xl border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("configure")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition-colors ${
                mode === "configure"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <Mail className="w-4 h-4" />
              <div className="text-left">
                <div>Konfigurera själv</div>
                <div className={`text-xs font-normal ${mode === "configure" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Vi svarar inom 24 timmar
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode("consultation")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition-colors ${
                mode === "consultation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <div className="text-left">
                <div>Kostnadsfri rådgivning</div>
                <div className={`text-xs font-normal ${mode === "consultation" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Vi återkopplar inom 24 timmar
                </div>
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 space-y-8">
          
          {/* Info banner */}
          {mode === "configure" ? (
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{QUOTE_CONFIG.bannerTitle}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {QUOTE_CONFIG.bannerText}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Vi svarar inom 24 timmar</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Beskriv ditt takprojekt eller ställ en fråga. En av våra säljare kontaktar dig inom 24 timmar från att formuläret skickas in. Helt kostnadsfritt.
                </p>
              </div>
            </div>
          )}

          {mode === "configure" && (
            <>
              {/* Current roof */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  <Home className="w-4 h-4 inline mr-2 text-primary" />
                  Befintlig taktyp
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {roofTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCurrentRoof(opt)}
                      className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                        currentRoof === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* New roof */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Önskad ny taktyp</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {roofTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setNewRoof(opt)}
                      className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                        newRoof === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Råspontbyte */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Råspontbyte (underlagsbyte)</label>
                <div className="flex gap-3">
                  {["Ja", "Nej", "Vet ej"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRaspont(opt)}
                      className={`px-6 py-2.5 rounded-xl text-sm border transition-colors ${
                        raspont === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Taksäkerhet */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Taksäkerhet</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setGangbrygga(!gangbrygga)}
                    className={`px-5 py-2.5 rounded-xl text-sm border transition-colors ${
                      gangbrygga
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    Gångbrygga
                  </button>
                  <button
                    type="button"
                    onClick={() => setTakstege(!takstege)}
                    className={`px-5 py-2.5 rounded-xl text-sm border transition-colors ${
                      takstege
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    Takstege
                  </button>
                </div>
              </div>

              {/* Avvattning */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Byte av avvattning (hängrännor & stuprör)</label>
                <div className="flex gap-3">
                  {["Ja", "Nej", "Vet ej"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAvvattning(opt)}
                      className={`px-6 py-2.5 rounded-xl text-sm border transition-colors ${
                        avvattning === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Antal våningar */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Antal våningar</label>
                <div className="flex gap-3">
                  {["1", "1.5", "2", "2.5", "3+"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFloors(opt)}
                      className={`px-5 py-2.5 rounded-xl text-sm border transition-colors ${
                        floors === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "consultation" && (
            <div>
              <label htmlFor="quote-message" className="block text-sm font-semibold text-foreground mb-3">
                Beskriv ditt takprojekt eller ställ en fråga
              </label>
              <textarea
                id="quote-message"
                placeholder="T.ex. Vi har en sommarstuga på Ljusterö med ett gammalt papptak som behöver bytas. Vad rekommenderar ni?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          )}

          {/* Kontaktuppgifter */}
          <div className="border-t border-border pt-6">
            <label className="block text-sm font-semibold text-foreground mb-4">Dina kontaktuppgifter</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Namn"
                aria-label="Namn"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Telefon"
                aria-label="Telefon"
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="next"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="E-post"
                aria-label="E-post"
                autoComplete="email"
                enterKeyHint="next"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Adress / Ö (t.ex. Ljusterö)"
                aria-label="Adress eller ö"
                autoComplete="street-address"
                enterKeyHint="done"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 animate-subtle-pulse disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Skickar din förfrågan...
              </>
            ) : mode === "configure" ? (
              <>
                Skicka förfrågan
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Skicka förfrågan
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {submitting && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-foreground"
            >
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Vi tar emot din förfrågan – ett ögonblick...</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            {mode === "configure"
              ? QUOTE_CONFIG.finePrintConfigure
              : QUOTE_CONFIG.finePrintConsultation}
          </p>
          <p className="text-xs text-muted-foreground text-center">
            {QUOTE_CONFIG.privacy}{" "}
            <a href="/cookies" className="underline hover:text-foreground">{QUOTE_CONFIG.privacyLink}</a>.
          </p>
        </form>
      </div>
    </section>
  );
};

export default QuoteConfigurator;
