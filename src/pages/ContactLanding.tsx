import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Loader2, Shield, MessageCircle, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

const ContactLanding = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const { error } = await supabase.from("quote_requests").insert({
      mode: "consultation",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim() || "Önskar kostnadsfri rådgivning (via kontaktsida)",
    });

    if (error) {
      console.error("Contact landing error:", error);
      toast({
        title: "Något gick fel",
        description: "Vänligen försök igen eller ring oss direkt på 070-154 36 39.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    toast({
      title: "Tack för din förfrågan!",
      description: "Vi återkopplar inom 24 timmar för att boka in din kostnadsfria rådgivning.",
    });
  };

  return (
    <>
      <SEOHead
        title="Kontakt & Kostnadsfri Rådgivning — RoslagsTak"
        description="Boka kostnadsfri rådgivning med RoslagsTak. Ring 070-154 36 39 eller fyll i formuläret — vi återkopplar inom 24 timmar. Takläggare i Roslagen, Blidö, Norrtälje & skärgården."
        canonical="https://roslagstak.se/kontakt"
      />

      <main className="min-h-screen bg-background">
        {/* Minimal header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
            <Link to="/" className="font-display text-xl text-foreground hover:text-primary transition-colors">
              RoslagsTak
            </Link>
            <Link
              to="/"
              aria-label="Gå till hemsidan"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 md:px-5 md:py-3 rounded-md text-sm md:text-base font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Home className="w-5 h-5" />
              <span>Till hemsidan</span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-accent py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <MessageCircle className="w-4 h-4" />
              Kostnadsfri rådgivning
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-accent-foreground">
              Boka rådgivning med en takexpert
            </h1>
            <p className="text-accent-foreground/70 text-base md:text-lg leading-relaxed">
              Ring oss direkt eller fyll i formuläret nedan. Vi återkopplar inom 24 timmar — helt kostnadsfritt och utan förbindelser.
            </p>
            <a
              href="tel:+46701543639"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-base font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
            >
              <Phone className="w-5 h-5" />
              Ring 070-154 36 39
            </a>
          </div>
        </section>

        {/* Form + info */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  Så fungerar det
                </h2>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: MessageCircle, title: "1. Du hör av dig", text: "Ring eller fyll i formuläret — beskriv kort ditt projekt." },
                    { icon: Clock, title: "2. Vi återkopplar inom 24h", text: "En takexpert kontaktar dig för rådgivning." },
                    { icon: Shield, title: "3. Kostnadsfritt offertbesök", text: "Vi kommer ut, mäter och ger dig en offert utan förbindelser." },
                  ].map((step) => (
                    <li key={step.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 border-t border-border pt-6">
                  {[
                    { icon: Phone, label: "070-154 36 39", href: "tel:+46701543639" },
                    { icon: Mail, label: "info@roslagstak.se", href: "mailto:info@roslagstak.se" },
                    { icon: MapPin, label: "Blidö, Norrtälje" },
                    { icon: Clock, label: "Mån–Lör 07:00–20:00 | Sön 09:00–20:00" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-foreground">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-sm hover:text-primary transition-colors">
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form
                className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5 h-fit"
                onSubmit={handleSubmit}
                aria-label="Boka kostnadsfri rådgivning"
              >
                <h2 className="font-display text-2xl text-foreground">Boka rådgivning</h2>

                {submitted && (
                  <div className="flex items-start gap-3 rounded-md border border-primary/30 bg-primary/10 p-4">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Tack för din förfrågan!</p>
                      <p className="text-xs text-muted-foreground mt-1">Vi återkopplar inom 24 timmar.</p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Namn</label>
                    <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Ditt namn" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
                    <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="070-000 00 00" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">E-post</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="din@epost.se" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Meddelande <span className="text-muted-foreground font-normal">(valfritt)</span>
                  </label>
                  <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Beskriv kort ditt takprojekt eller vad du vill ha rådgivning om..." />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors animate-subtle-pulse flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Boka kostnadsfri rådgivning
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Vi återkommer inom 24 timmar. Kostnadsfritt och utan förbindelser.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Bottom return-home CTA */}
        <section className="py-10 md:py-14 bg-accent border-t border-border">
          <div className="container mx-auto px-4 text-center space-y-4">
            <p className="text-accent-foreground/80 text-base md:text-lg">
              Vill du läsa mer om våra tjänster först?
            </p>
            <Link
              to="/"
              aria-label="Gå tillbaka till hemsidan"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-md text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
            >
              <Home className="w-6 h-6" />
              Tillbaka till hemsidan
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactLanding;