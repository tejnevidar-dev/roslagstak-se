import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
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
      message: message.trim(),
    });

    if (error) {
      console.error("Contact request error:", error);
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
      description: "Vi har tagit emot ditt meddelande och återkopplar inom 24 timmar.",
    });
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-background" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Kontakta oss</p>
            <h2 id="contact-heading" className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Begär en kostnadsfri offert
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Fyll i formuläret eller ring oss direkt. Vi återkommer inom 24 timmar med en offert anpassad efter ditt projekt.
            </p>

            <div className="space-y-5 mb-8">
              {[
                { icon: Phone, label: "070-154 36 39", href: "tel:+46701543639" },
                { icon: Mail, label: "info@roslagstak.se", href: "mailto:info@roslagstak.se" },
                { icon: MapPin, label: "Blidö, Norrtälje " },
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

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden border border-border aspect-[16/9]">
              <iframe
                title="RoslagsTak — Blidö, Norrtälje"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30000!2d18.8347!3d59.5933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f8e1a2d3c4b5e%3A0x1234567890abcdef!2sBlid%C3%B6!5e0!3m2!1ssv!2sse!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            className="bg-card border border-border rounded-lg p-8 space-y-5"
            onSubmit={handleSubmit}
            aria-label="Kontaktformulär"
          >
            {submitted && (
              <div className="flex items-start gap-3 rounded-md border border-primary/30 bg-primary/10 p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Tack för din förfrågan!</p>
                  <p className="text-xs text-muted-foreground mt-1">Vi har tagit emot ditt meddelande och återkopplar inom 24 timmar.</p>
                </div>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Namn</label>
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Ditt namn" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
                <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="070-000 00 00" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">E-post</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="din@epost.se" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Meddelande</label>
              <textarea id="message" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Beskriv ditt takprojekt..." />
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
                  Skickar din förfrågan...
                </>
              ) : (
                <>
                  Skicka förfrågan
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            {submitting && (
              <div role="status" aria-live="polite" className="flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Vi tar emot din förfrågan – ett ögonblick...</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">Vi återkommer inom 24 timmar. Kostnadsfritt och utan förbindelser.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
