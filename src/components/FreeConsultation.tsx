import { Phone, MessageCircle, Clock, Shield } from "lucide-react";

const FreeConsultation = () => {
  return (
    <section id="radgivning" className="py-20 md:py-28 bg-accent" aria-labelledby="consultation-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <MessageCircle className="w-4 h-4" />
            Kostnadsfri rådgivning
          </div>

          <h2 id="consultation-heading" className="font-display text-3xl md:text-4xl lg:text-5xl text-accent-foreground">
            Osäker på taktyp? Vi hjälper dig!
          </h2>

          <p className="text-accent-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Du behöver inte vara expert på tak. Ring oss eller fyll i formuläret så ger vi dig kostnadsfri rådgivning 
            om vilken taktyp som passar bäst för just ditt hus — oavsett om du bor på en ö i skärgården eller längs kusten.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="bg-accent-foreground/5 border border-accent-foreground/10 rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-accent-foreground text-sm mb-1">Ring direkt</h3>
              <p className="text-accent-foreground/60 text-xs mb-3">Prata med en takexpert</p>
              <a
                href="tel:+46701234567"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                070-123 45 67
              </a>
            </div>

            <div className="bg-accent-foreground/5 border border-accent-foreground/10 rounded-lg p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-accent-foreground text-sm mb-1">Snabbt svar</h3>
              <p className="text-accent-foreground/60 text-xs mb-3">Vi svarar inom 24 timmar</p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Skicka meddelande
              </a>
            </div>

            <div className="bg-accent-foreground/5 border border-accent-foreground/10 rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-accent-foreground text-sm mb-1">Ingen förbindelse</h3>
              <p className="text-accent-foreground/60 text-xs mb-3">Helt gratis, inga krav</p>
              <a
                href="#offert"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Konfigurera offert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultation;