import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export const services = [
  {
    icon: Home,
    slug: "takomlaggning",
    title: "Takomläggning",
    description: "Komplett byte av takmaterial med moderna lösningar. Allt arbete utförs enligt AMA-standard.",
  },
  {
    icon: Wrench,
    slug: "takrenovering",
    title: "Takrenovering",
    description: "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: Droplets,
    slug: "takavvattning",
    title: "Takavvattning",
    description: "Installation och byte av hängrännor, stuprör och kompletta takavvattningssystem.",
  },
  {
    icon: Sun,
    slug: "takkupor",
    title: "Takkupor & fönster",
    description: "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: ShieldCheck,
    slug: "takinspektion",
    title: "Takinspektion",
    description: "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: Ruler,
    slug: "platarbeten",
    title: "Plåtarbeten",
    description: "Taktäckning, beslag och plåtdetaljer utförda av certifierade plåtslagare.",
  },
  {
    icon: Sparkles,
    slug: "takvard",
    title: "Takvård",
    description: "Professionell taktvätt och takmålning som förlänger livslängden och fräschar upp ditt tak.",
  },
  {
    icon: AlertTriangle,
    slug: "eternit-asbest",
    title: "Eternit & asbestsanering",
    description: "Säker rivning och sanering av eternit- och asbesttak enligt Arbetsmiljöverkets regler. Vi hanterar allt från sanering till nytt tak.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="border-b border-border bg-background" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <h2
            id="services-heading"
            className="font-display text-3xl font-extrabold tracking-[-0.025em] text-foreground sm:text-4xl"
          >
            Allt inom tak — från kust till skärgård
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Vi hjälper dig hela vägen, oavsett om huset står vid vägen eller bakom en båttur. Läs mer om
            varje tjänst nedan — eller ring så guidar vi dig.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={Math.min(i, 6) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group flex h-full flex-col border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-32px_hsl(var(--primary)/0.5)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground transition-colors group-hover:bg-seafoam">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.02em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-2 text-base font-semibold text-primary">
                    Läs mer
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-5 border border-border bg-warm px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">
              Vet du inte vad ditt tak behöver?
            </p>
            <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
              Fast pris, 10 års utförandegaranti och 30 års materialgaranti — ROT-avdrag dras direkt.
            </p>
          </div>
          <a
            href="#offert"
            className="inline-flex shrink-0 items-center gap-3 bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-accent"
          >
            Räkna på ditt tak
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};


export default Services;
