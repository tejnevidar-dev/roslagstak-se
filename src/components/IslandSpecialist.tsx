import { Anchor, Ship, Wrench, CheckCircle, ArrowRight } from "lucide-react";

const highlights = [
  {
    icon: Ship,
    title: "Materialtransport sjövägen",
    description:
      "Vi transporterar allt material — takpannor, plåt, virke och verktyg — med båt till öar utan broförbindelse. Vi har den erfarenhet och utrustning som krävs.",
  },
  {
    icon: Wrench,
    title: "Anpassad logistik",
    description:
      "Varje ö-projekt kräver unik planering. Vi samordnar båttransporter, boendelösningar och arbetsscheman för att minimera störningar och hålla tidsplanen.",
  },
  {
    icon: Anchor,
    title: "Skärgårdserfarenhet",
    description:
      "Med över 70 års samlad erfarenhet har vi lagt tak på öar som Svartlöga, Norröra, Söderöra, Humlö, Gräskö, Finnhamn och Ingmarsö — platser dit andra takfirmor inte tar sig.",
  },
];

const islandList = [
  "Svartlöga",
  "Norröra",
  "Söderöra",
  "Humlö",
  "Gräskö",
  "Finnhamn",
  "Ingmarsö",
  "Husarö",
  "Högmarsö",
  "Arholma",
];

const IslandSpecialist = () => {
  return (
    <section
      id="o-specialist"
      className="py-20 md:py-28 bg-primary/[0.03]"
      aria-labelledby="island-heading"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Ö-specialisten
          </p>
          <h2
            id="island-heading"
            className="font-display text-3xl md:text-4xl text-foreground mb-4"
          >
            Takläggare på öar utan broförbindelse
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Vi utför <strong>takbyten på öar som bara nås med båt</strong>.
            RoslagsTak är specialiserade på den logistik och de utmaningar som
            skärgårdens mest avlägsna öar innebär — och vi har kompetensen att
            hantera varje steg, från materialtransport till färdigt tak.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg text-card-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* SEO-rich detail block */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 md:p-10">
            <h3 className="font-display text-xl text-card-foreground mb-4">
              Takbyte på ö utan bro — så gör vi
            </h3>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Att byta tak på en <strong>ö utan broförbindelse</strong> kräver
                mer än bara hantverksskicklighet. Det kräver noggrann
                logistikplanering, rätt utrustning och erfarenhet av att arbeta
                under de förhållanden som skärgården ställer. Vi på RoslagsTak
                har gjort detta i årtionden.
              </p>
              <p>
                Processen börjar med en <strong>kostnadsfri besiktning</strong>{" "}
                där vi åker ut till din ö, inspekterar taket och planerar hela
                projektet. Vi beräknar materialbehov, koordinerar
                båttransporter och säkerställer att allt — från{" "}
                <strong>takpannor och plåt</strong> till{" "}
                <strong>underlagspapp och verktyg</strong> — finns på plats innan
                arbetet börjar.
              </p>
              <p>
                Vi har utfört <strong>takbyten</strong> och{" "}
                <strong>takrenoveringar</strong> på öar som{" "}
                {islandList.map((island, i) => (
                  <span key={island}>
                    <strong>{island}</strong>
                    {i < islandList.length - 2
                      ? ", "
                      : i === islandList.length - 2
                      ? " och "
                      : ""}
                  </span>
                ))}
                . Dessa öar saknar bilväg — allt material fraktas sjövägen.
                Trots det levererar vi samma höga kvalitet och{" "}
                <strong>10 års garanti</strong> som på fastlandet.
              </p>
              <p>
                Behöver du en{" "}
                <strong>takläggare på en ö i Roslagen</strong>? Kontakta oss —
                vi tar oss dit andra inte når.
              </p>
            </div>

            {/* Island tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {islandList.map((island) => (
                <span
                  key={island}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  <Anchor className="w-3 h-3" />
                  {island}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#offert"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Begär offert för ditt ö-projekt
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslandSpecialist;
