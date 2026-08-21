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
      {/* Ljus sektionsintro */}
      <div className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
              <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-accent" />
              Allt inom tak — från kust till skärgård
            </p>
            <h2
              id="services-heading"
              className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Våra tjänster
            </h2>
            <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-muted-foreground">
              Vi hjälper dig hela vägen, oavsett om huset står vid vägen eller bakom en båttur. Välj
              en tjänst nedan — eller ring så guidar vi dig.
            </p>
          </div>
        </div>
      </div>


      {/* Tjänstekort — ljusa, luftiga ytor med tydliga tryckytor */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-9 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-elevated)]"
                >
                  <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[18px] leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[17px] font-bold text-primary">
                    Läs mer
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Avslutande CTA-band */}
        <div className="mt-14 grid gap-6 rounded-3xl bg-primary px-9 py-10 text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.02em]">
              Vet du inte vad ditt tak behöver?
            </p>
            <p className="mt-2 text-[18px] leading-relaxed text-primary-foreground/80">
              Fast pris, 10 års utförandegaranti och 30 års materialgaranti — ROT-avdrag dras direkt.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/offert"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-card px-8 py-5 text-[18px] font-bold text-primary transition-colors hover:bg-secondary animate-subtle-pulse"
            >
              Räkna på ditt tak
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="tel:0701543639"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-primary-foreground/40 px-7 py-5 text-[18px] font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
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
