import { Anchor, Ship, Wrench, ArrowRight } from "lucide-react";
import { ISLAND_TEXT } from "@/data/taktyper-text";

/**
 * Skärgårdsblocket på /taktyper (Marknadschefen, backlog 1cl, underlag-taktyper-2026-10-05.md avsnitt 5): tre kort och ett
 * stycke. Ingen ö-lista (öarna utan bilväg, 10o), ingen "samma villkor som på fastlandet", ingen tätskiktsgaranti och
 * Blidö och Singö nämns högst en gång. Ö-lydelsen är den ur location-mall.ts.
 */
const highlights = [Ship, Wrench, Anchor].map((icon, i) => ({ icon, ...ISLAND_TEXT.highlights[i] }));

const IslandSpecialist = () => {
  return (
    <section
      id="o-specialist"
      className="border-b border-border bg-background py-24 md:py-36"
      aria-labelledby="island-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{ISLAND_TEXT.eyebrow}</p>
          <h2 id="island-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            {ISLAND_TEXT.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg text-card-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {ISLAND_TEXT.note}
            </p>
            <div className="mt-8">
              <a
                href="/takkontroll"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Boka kostnadsfri takkontroll
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
