import { Link } from "react-router-dom";
import { ArrowRight, Phone, Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
import Reveal from "@/components/Reveal";

export const services = [
  {
    icon: Home,
    slug: "takomlaggning",
    title: "Takomläggning",
    short: "Komplett takbyte",
    description:
      "Komplett byte av takmaterial med moderna lösningar. Allt arbete utförs enligt AMA-standard.",
  },
  {
    icon: Wrench,
    slug: "takrenovering",
    title: "Takrenovering",
    short: "Laga & förlänga",
    description:
      "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: Droplets,
    slug: "takavvattning",
    title: "Takavvattning",
    short: "Rännor & stuprör",
    description:
      "Installation och byte av hängrännor, stuprör och kompletta takavvattningssystem.",
  },
  {
    icon: Sun,
    slug: "takkupor",
    title: "Takkupor & fönster",
    short: "Ljus på vinden",
    description:
      "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: ShieldCheck,
    slug: "takinspektion",
    title: "Takinspektion",
    short: "Besiktning & rapport",
    description:
      "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: Ruler,
    slug: "platarbeten",
    title: "Plåtarbeten",
    short: "Plåtslagare",
    description:
      "Taktäckning, beslag och plåtdetaljer utförda av certifierade plåtslagare.",
  },
  {
    icon: Sparkles,
    slug: "takvard",
    title: "Takvård",
    short: "Tvätt & målning",
    description:
      "Professionell taktvätt och takmålning som förlänger livslängden och fräschar upp ditt tak.",
  },
  {
    icon: AlertTriangle,
    slug: "eternit-asbest",
    title: "Eternit & asbestsanering",
    short: "Säker rivning",
    description:
      "Säker rivning och sanering av eternit- och asbesttak enligt Arbetsmiljöverkets regler. Vi hanterar allt från sanering till nytt tak.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="border-b border-border bg-background" aria-labelledby="services-heading">
      {/* Navy header band — matches Hero accent rhythm */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam-light">
              <span aria-hidden="true" className="h-px w-10 bg-seafoam-light/60" />
              Våra tjänster
            </p>
            <h2
              id="services-heading"
              className="mt-5 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]"
            >
              Allt inom tak — från kust till skärgård
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
              Vi hjälper dig hela vägen, oavsett om huset står vid vägen eller bakom en båttur. Välj
              en tjänst nedan — eller ring så guidar vi dig.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial numbered index — premium, not generic icon-boxes */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <ol className="divide-y divide-border border-y border-border">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-start gap-5 py-7 transition-colors duration-300 sm:grid-cols-[auto_1.4fr_1fr_auto] sm:gap-8 sm:py-8"
                >
                  {/* Nummer */}
                  <span className="font-display text-sm font-bold tabular-nums tracking-[0.1em] text-primary/70 transition-colors group-hover:text-primary sm:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Titel */}
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
                      {service.short}
                    </p>
                  </div>

                  {/* Beskrivning (desktop) */}
                  <p className="hidden max-w-md text-base leading-relaxed text-muted-foreground sm:block">
                    {service.description}
                  </p>

                  {/* Arrow CTA */}
                  <span className="flex shrink-0 items-center gap-2 self-center text-sm font-bold uppercase tracking-[0.12em] text-primary sm:pt-1">
                    <span className="hidden sm:inline">Läs mer</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Avslutande CTA-band */}
        <div className="mt-10 grid gap-6 border border-border bg-warm px-7 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
          <div>
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">
              Vet du inte vad ditt tak behöver?
            </p>
            <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
              Fast pris, 10 års utförandegaranti och 30 års materialgaranti — ROT-avdrag dras direkt.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#offert"
              className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-accent animate-subtle-pulse"
            >
              Räkna på ditt tak
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="tel:0701543639"
              className="inline-flex items-center justify-center gap-2.5 border border-primary px-7 py-4 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Ring oss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
