import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

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
    <section
      id="tjanster"
      className="border-b border-border bg-secondary/40 py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Asymmetrisk 60/40-inledning */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="lg:w-[60%]">
            <SectionHeading
              meta="Tjänster"
              index="01 / 04"
              id="services-heading"
              title={
                <>
                  Allt inom tak — från
                  <br />
                  <span className="text-accent">kust till skärgård</span>
                </>
              }
            />
          </div>
          <div className="lg:w-[40%]">
            <p className="border-l-2 border-seafoam pl-6 text-lg leading-relaxed text-muted-foreground">
              Helhetslösningar för varje takprojekt längs Roslagens kustlinje och öar. Samma
              metodik, oavsett om huset står vid vägen eller bakom en båttur.
            </p>
            <a
              href="#offert"
              className="group mt-7 inline-flex items-center gap-3 pl-6 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground"
            >
              Räkna på ditt projekt
              <span className="flex h-9 w-9 items-center justify-center border border-primary/20 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        {/* Tjänstematris */}
        <div className="mt-14 grid border-l border-t border-primary/12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i, 7) * 0.04}>
              <Link
                to={`/tjanster/${service.slug}`}
                className="group relative flex h-full flex-col border-b border-r border-primary/12 bg-background p-8 transition-colors duration-300 hover:bg-primary"
              >
                <div className="flex items-start justify-between">
                  <span className="w-10 shrink-0 font-display text-[11px] tabular-nums tracking-[0.24em] text-seafoam">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <service.icon
                    className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-seafoam-light"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-10 font-display text-lg uppercase leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/70">
                  {service.description}
                </p>

                <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary transition-colors duration-300 group-hover:text-seafoam-light">
                  Läs mer
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
          <span>AMA-standard</span>
          <span aria-hidden="true" className="h-px w-8 bg-seafoam-light" />
          <span>10 års garanti</span>
          <span aria-hidden="true" className="h-px w-8 bg-seafoam-light" />
          <span>ROT-avdrag</span>
          <span aria-hidden="true" className="h-px w-8 bg-seafoam-light" />
          <span>Fast pris</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
