import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
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

            <div className="space-y-5">
              {[
                { icon: Phone, label: "073-084 97 72", href: "tel:+46730849772" },
                { icon: Mail, label: "info@roslagstak.se", href: "mailto:info@roslagstak.se" },
                { icon: MapPin, label: "Norrtälje, Roslagen" },
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
            className="bg-card border border-border rounded-lg p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Kontaktformulär"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Namn</label>
                <input id="name" type="text" required className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Ditt namn" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Telefon</label>
                <input id="phone" type="tel" required className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="070-000 00 00" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">E-post</label>
              <input id="email" type="email" required className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="din@epost.se" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Meddelande</label>
              <textarea id="message" rows={4} required className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Beskriv ditt takprojekt..." />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Skicka förfrågan
            </button>
            <p className="text-xs text-muted-foreground text-center">Vi återkommer inom 24 timmar. Kostnadsfritt och utan förbindelser.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
