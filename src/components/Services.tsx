import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Anchor } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Takomläggning",
    description: "Komplett byte av takmaterial med moderna lösningar anpassade för kustklimat och havsnära miljöer.",
  },
  {
    icon: Wrench,
    title: "Takrenovering",
    description: "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: Droplets,
    title: "Takavvattning",
    description: "Installation och byte av hängrännor, stuprör och takavvattningssystem som tål saltstänk.",
  },
  {
    icon: Sun,
    title: "Takkupor & fönster",
    description: "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: ShieldCheck,
    title: "Takinspektion",
    description: "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: Ruler,
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
            <article
              key={service.title}
              className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-card-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;