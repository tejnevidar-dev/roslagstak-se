import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anna Lindberg",
    location: "Norrtälje",
    text: "Fantastiskt jobb med vårt tak! Snyggt, snabbt och till det pris som utlovades. Rekommenderar varmt.",
  },
  {
    name: "Erik Johansson",
    location: "Täby",
    text: "Professionellt från start till slut. Hjälpte oss med ROT-avdraget och städade fint efter sig.",
  },
  {
    name: "Maria Karlsson",
    location: "Vallentuna",
    text: "Bästa takläggarna vi har anlitat. Noggranna, trevliga och levererade ett tak som ser fantastiskt ut.",
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
      </div>
    </section>
  );
};

export default Testimonials;
