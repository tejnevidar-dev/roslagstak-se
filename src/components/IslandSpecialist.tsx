import { Anchor, Ship, Wrench, CheckCircle, ArrowRight } from "lucide-react";

const highlights = [
  {
    icon: Ship,
    title: "Uppdrag i skärgården",
    description:
      "Vi tar uppdrag på öar i Roslagens skärgård. Förutsättningarna för just ditt tak går vi igenom vid den kostnadsfria takkontrollen.",
  },
  {
    icon: Wrench,
    title: "Riktiga jobb",
    description:
      "Vi har gjort kompletta takbyten på Blidö i Norrtälje och på Singö i Grisslehamn. Båda finns med bilder under Projekt.",
  },
  {
    icon: Anchor,
    title: "Fast pris",
    description:
      "Offerten har fast pris där det framgår vad som ingår, även för ett tak på en ö. 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
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
      className="border-b border-border bg-background py-24 md:py-36"
      aria-labelledby="island-heading"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Skärgården
          </p>
          <h2
            id="island-heading"
            className="font-display text-3xl md:text-4xl text-foreground mb-4"
          >
            Takläggare i skärgården
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Vi tar uppdrag för <strong>takbyten och takrenoveringar på öar</strong> i
            Roslagens skärgård. På Blidö och Singö har vi gjort kompletta takbyten, och du
            hittar båda under{" "}
            <a href="/projekt" className="text-primary underline underline-offset-4 hover:no-underline">
              Projekt
            </a>
            .
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
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
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-xl text-card-foreground mb-4">
              Takbyte på en ö — så går det till
            </h3>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                På en ö utan bilväg går material och utrustning sjövägen, och det
                påverkar planeringen av ett takbyte. Hur det löses för just ditt tak
                går vi igenom vid takkontrollen, och det står i offerten.
              </p>
              <p>
                Processen börjar med en <strong>kostnadsfri takkontroll</strong>{" "}
                utan förpliktelser. Behöver något göras får du en offert med fast
                pris, där det framgår vad som ingår.
              </p>
              <p>
                Vi tar uppdrag för <strong>takbyten</strong> och{" "}
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
                . Samma villkor gäller som på fastlandet: fast pris,{" "}
                <strong>10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI</strong>.
              </p>
              <p>
                Behöver du en{" "}
                <strong>takläggare på en ö i Roslagen</strong>? Kontakta oss, så
                bokar vi en kostnadsfri takkontroll.
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
                href="/offert"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
              >
                Boka takkontroll för ditt ö-projekt
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
