import { Star, ArrowRight, ExternalLink, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

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
    <section
      className="relative overflow-hidden py-24 md:py-36 bg-accent"
      aria-labelledby="testimonials-heading"
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 65%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          meta="Omdömen"
          index="03 / 04"
          tone="dark"
          id="testimonials-heading"
          title={<>Kunder i Roslagen om <em className="font-normal italic text-primary">arbetet vi lämnar efter oss</em></>}
          className="mb-14 lg:mb-20"
        />

        <div className="grid md:grid-cols-3 border-t border-primary-foreground/15">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <blockquote
                className={`h-full px-0 md:px-8 py-10 border-b border-primary-foreground/15 ${
                  i > 0 ? "md:border-l md:border-primary-foreground/15" : ""
                } ${i === 0 ? "md:pl-0" : ""}`}
              >
                <Quote className="w-7 h-7 text-primary mb-6" aria-hidden="true" />
                <p className="font-display text-xl leading-[1.35] tracking-[-0.02em] text-primary-foreground/90 mb-8">
                  {t.text}
                </p>
                <footer className="flex items-center justify-between gap-4 pt-5 border-t border-primary-foreground/10">
                  <div>
                    <cite className="not-italic font-semibold text-sm text-primary-foreground">{t.name}</cite>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-primary-foreground/45 mt-1">
                      {t.location}
                    </p>
                  </div>
                  <span className="flex gap-0.5" aria-label="5 av 5 stjärnor">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 mt-12">
          <a
            href="https://share.google/FsdpfTq9H3amLoTPe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-full hover:scale-[1.02] transition-transform"
          >
            <Star className="w-4 h-4 fill-current" />
            Se våra Google-recensioner
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Link
            to="/recensioner"
            className="inline-flex items-center gap-2 text-primary-foreground/80 font-semibold text-sm hover:text-primary-foreground transition-colors"
          >
            Läs alla 24 recensioner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
