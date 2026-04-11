import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Anna Lindberg",
    location: "Ljusterö",
    text: "Fantastiskt jobb med vårt tak på ön! Trots att vi bor på en ö fixade de allt smidigt. Snyggt, snabbt och till det pris som utlovades.",
  },
  {
    name: "Erik Johansson",
    location: "Vaxholm",
    text: "Professionellt från start till slut. Hjälpte oss med ROT-avdraget och städade fint efter sig. Offerten stämde på kronan.",
  },
  {
    name: "Maria Karlsson",
    location: "Grisslehamn",
    text: "Bästa takläggarna vi har anlitat. De levererade ett dubbelfalsat koppartak som verkligen håller. Otroligt fint hantverk.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-accent" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Omdömen</p>
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl text-accent-foreground mb-4">
            Vad våra kunder säger
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="bg-accent-foreground/5 border border-accent-foreground/10 rounded-lg p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-accent-foreground/80 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <footer className="text-accent-foreground">
                <cite className="not-italic font-semibold text-sm">{t.name}</cite>
                <p className="text-accent-foreground/60 text-xs">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/recensioner"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            Läs alla {24} recensioner <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://share.google/FsdpfTq9H3amLoTPe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity hover:animate-subtle-pulse"
          >
            <Star className="w-4 h-4 fill-current" />
            Se våra Google-recensioner
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;