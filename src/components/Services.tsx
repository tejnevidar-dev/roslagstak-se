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
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,36%)_minmax(0,64%)]">
        {/* Vänster: fast rubrikpanel */}
        <div className="bg-secondary px-6 py-20 sm:px-12 lg:sticky lg:top-24 lg:h-fit lg:py-32 xl:px-20">
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
            <span aria-hidden="true" className="h-px w-10 bg-seafoam/50" />
            Våra tjänster
          </p>
          <h2
            id="services-heading"
            className="mt-8 font-display text-[clamp(2.1rem,3.6vw,3.25rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-foreground text-balance"
          >
            Vad behöver ditt tak?
          </h2>
          <p className="mt-7 max-w-md text-[19px] leading-[1.7] text-muted-foreground">
            Välj det som passar dig bäst — vi hjälper dig hela vägen. Samma arbetssätt oavsett om
            huset står vid vägen eller bakom en båttur.
          </p>

          <a
            href="#offert"
            className="group mt-10 inline-flex items-center gap-3 bg-primary px-9 py-5 text-[15px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
          >
            Räkna på ditt tak
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Vill du hellre prata? Ring{" "}
            <a href="tel:0701543639" className="font-semibold text-foreground underline decoration-seafoam decoration-2 underline-offset-4">
              070-154 36 39
            </a>
          </p>

          <ul className="mt-12 grid gap-3 border-t border-border pt-8 text-[15px] font-medium text-muted-foreground">
            {["Fast pris innan vi börjar", "10 års utförandegaranti", "30 års materialgaranti", "ROT-avdrag dras direkt"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-seafoam" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Höger: tjänsteruta i rutnät */}
        <div className="grid border-t border-border sm:grid-cols-2 lg:border-t-0">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i, 6) * 0.05}>
              <Link
                to={`/tjanster/${service.slug}`}
                className="group relative flex h-full flex-col border-b border-r border-border bg-background px-8 py-12 transition-colors hover:bg-primary xl:px-12 xl:py-14"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-0.5 w-0 bg-seafoam transition-all duration-500 group-hover:w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center border border-border transition-colors group-hover:border-primary-foreground/25 group-hover:bg-primary-foreground/10">
                    <service.icon className="h-6 w-6 text-seafoam transition-colors group-hover:text-seafoam-light" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-9 font-display text-[1.6rem] font-bold leading-[1.15] tracking-[-0.025em] text-foreground transition-colors group-hover:text-primary-foreground">
                  {service.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-muted-foreground transition-colors group-hover:text-primary-foreground/75">
                  {service.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam transition-all group-hover:text-seafoam-light">
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
