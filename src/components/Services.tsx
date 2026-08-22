import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
import Reveal from "@/components/Reveal";
import roofProject from "@/assets/roof-project.jpg";

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
    <section id="tjanster" className="border-b border-border bg-card py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              <span aria-hidden="true" className="h-px w-12 bg-primary" />
              Vår expertis
            </p>
            <h2
              id="services-heading"
              className="mt-7 max-w-3xl font-display text-[clamp(2.1rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground text-balance"
            >
              Hantverk som sträcker sig över hela taket
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="text-[18px] font-light leading-relaxed text-muted-foreground">
              Vi hjälper dig hela vägen, oavsett om huset står vid vägen eller bakom en båttur.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/offert"
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-primary px-7 py-4 text-[17px] font-bold text-primary-foreground transition-colors hover:bg-accent animate-subtle-pulse"
              >
                Räkna på ditt tak
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-border px-6 py-4 text-[17px] font-bold text-foreground transition-colors hover:bg-secondary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                070-154 36 39
              </a>
            </div>
          </div>
        </div>

        {/* Full-bredds referensbild som sektionsavskiljare */}
        <div className="mt-16 overflow-hidden rounded-sm border border-border">
          <img
            src={roofProject}
            alt="Nylagt tak på hus i Roslagens skärgård"
            width={1600}
            height={600}
            loading="lazy"
            className="aspect-[16/6] w-full object-cover"
          />
        </div>

        {/* Tjänsteregister — hairline-rutnät i tre spalter */}
        <ul className="mt-20 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="border-b border-border md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(odd)]:border-r"
            >
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group flex h-full flex-col px-0 py-12 transition-colors md:px-10 md:first:pl-0 lg:[&:nth-child(3n+1)]:pl-0"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tabular-nums tracking-[0.3em] text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}/
                    </span>
                    <service.icon className="h-5 w-5 text-primary transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
                  </span>
                  <span className="mt-10 block font-display text-[clamp(1.35rem,1.8vw,1.7rem)] font-bold leading-tight tracking-[-0.028em] text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </span>
                  <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-primary/70">
                    {service.short}
                  </span>
                  <span className="mt-5 block flex-1 text-[17px] font-light leading-relaxed text-muted-foreground">
                    {service.description}
                  </span>
                  <span className="mt-8 inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    Läs mer
                    <span aria-hidden="true" className="h-[2px] w-8 bg-primary transition-all group-hover:w-14" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;

