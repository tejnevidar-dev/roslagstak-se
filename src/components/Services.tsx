import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    description: "Installation och byte av hängrännor, stuprör och takavvattningssystem som tål saltstänk.",
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
];

const Services = () => {
  return (
    <section id="tjanster" className="py-20 md:py-28 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Våra tjänster</p>
          <h2 id="services-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Allt inom tak — från kust till skärgård
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi erbjuder helhetslösningar för alla typer av takprojekt längs Roslagens kustlinje och öar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              to={`/tjanster/${service.slug}`}
              key={service.title}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 block"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-card-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                Läs mer <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
