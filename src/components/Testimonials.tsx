import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    name: "Anna Lindberg",
    location: "Ljusterö",
    project: "Takbyte, betongpannor",
    text: "Fantastiskt jobb med vårt tak på ön! Trots att vi bor på en ö fixade de allt smidigt. Snyggt, snabbt och till det pris som utlovades.",
  },
  {
    name: "Erik Johansson",
    location: "Vaxholm",
    project: "Takomläggning & plåt",
    text: "Professionellt från start till slut. Hjälpte oss med ROT-avdraget och städade fint efter sig. Offerten stämde på kronan.",
  },
  {
    name: "Maria Karlsson",
    location: "Grisslehamn",
    project: "Dubbelfalsat koppartak",
    text: "Bästa takläggarna vi har anlitat. De levererade ett dubbelfalsat koppartak som verkligen håller. Otroligt fint hantverk.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-b border-border bg-secondary py-20 md:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          meta="Omdömen"
          index="03 / 04"
          id="testimonials-heading"
          title="Vad kunderna säger om arbetet vi lämnar efter oss"
          className="mb-12"
        />

        <div className="grid border-t border-border md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <blockquote
                className={`h-full border-b border-border px-0 py-9 md:px-8 ${
                  i > 0 ? "md:border-l md:border-border" : ""
                } ${i === 0 ? "md:pl-0" : ""}`}
              >
                <span className="flex gap-0.5" aria-label="5 av 5 stjärnor">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </span>
                <p className="mt-6 text-[17px] leading-relaxed text-foreground">{t.text}</p>
                <footer className="mt-7 border-t border-border pt-5">
                  <cite className="block not-italic font-semibold text-foreground">{t.name}</cite>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                    {t.location} · {t.project}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <a
            href="https://share.google/FsdpfTq9H3amLoTPe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Star className="h-4 w-4 fill-primary text-primary" />
            Se våra Google-recensioner
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            to="/recensioner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Läs alla 24 recensioner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
