import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
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
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,34%)_minmax(0,66%)]">
        {/* Vänster: fast rubrikpanel */}
        <div className="bg-secondary px-6 py-16 sm:px-10 lg:sticky lg:top-20 lg:h-fit lg:py-24 xl:px-16">
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
            <span aria-hidden="true" className="h-px w-10 bg-seafoam/50" />
            Tjänster
          </p>
          <h2
            id="services-heading"
            className="mt-6 font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground"
          >
            Allt inom tak — från kust till skärgård
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            Helhetslösningar för varje takprojekt längs Roslagens kustlinje och öar. Samma metodik,
            oavsett om huset står vid vägen eller bakom en båttur.
          </p>
          <a
            href="#offert"
            className="group mt-9 inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
          >
            Räkna på ditt projekt
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
            <span>AMA-standard</span>
            <span className="h-px w-6 bg-border" aria-hidden="true" />
            <span>10 års garanti</span>
            <span className="h-px w-6 bg-border" aria-hidden="true" />
            <span>ROT-avdrag</span>
            <span className="h-px w-6 bg-border" aria-hidden="true" />
            <span>Fast pris</span>
          </div>
        </div>

        {/* Höger: tjänsteruta i rutnät */}
        <div className="grid border-t border-border sm:grid-cols-2 lg:border-t-0">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i, 6) * 0.05}>
              <Link
                to={`/tjanster/${service.slug}`}
                className="group relative flex h-full flex-col border-b border-r border-border bg-background px-7 py-10 transition-colors hover:bg-primary xl:px-10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center border border-border transition-colors group-hover:border-primary-foreground/25 group-hover:bg-primary-foreground/10">
                    <service.icon className="h-5 w-5 text-seafoam transition-colors group-hover:text-seafoam-light" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-xl font-bold tracking-[-0.025em] text-foreground transition-colors group-hover:text-primary-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam transition-all group-hover:text-seafoam-light">
                  Läs mer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
