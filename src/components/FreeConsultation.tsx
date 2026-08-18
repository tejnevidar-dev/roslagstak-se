import { ArrowRight, Phone } from "lucide-react";

const FreeConsultation = () => {
  return (
    <section id="radgivning" className="bg-accent py-20 md:py-28" aria-labelledby="consultation-heading">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-foreground/55">
              Kostnadsfri rådgivning
            </p>
            <h2
              id="consultation-heading"
              className="font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-accent-foreground"
            >
              Osäker på taktyp? Vi hjälper dig att välja rätt.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-accent-foreground/70">
              Du behöver inte vara expert på tak. Ring oss eller skicka en förfrågan — vi går igenom
              vilken taktyp som passar just ditt hus, oavsett om det ligger på en ö eller längs kusten.
            </p>
            <a
              href="tel:+46701543639"
              className="mt-8 inline-flex items-center gap-3 bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 animate-subtle-pulse"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-accent-foreground/20">
              {[
                { no: "01", title: "Ring direkt", text: "Prata med en takläggare, inte en säljare.", href: "tel:+46701543639", cta: "Ring nu" },
                { no: "02", title: "Svar inom 24 timmar", text: "Skicka ett meddelande och få besked snabbt.", href: "#kontakt", cta: "Skicka meddelande" },
                { no: "03", title: "Ingen förbindelse", text: "Kostnadsfri besiktning och offert — inga krav.", href: "#offert", cta: "Räkna på ditt tak" },
              ].map((item) => (
                <div
                  key={item.no}
                  className="flex flex-col gap-4 border-b border-accent-foreground/20 py-7 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-6">
                    <span className="pt-1 text-[10px] font-semibold tabular-nums tracking-[0.2em] text-accent-foreground/45">
                      {item.no}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-accent-foreground">{item.title}</h3>
                      <p className="mt-1 text-accent-foreground/65">{item.text}</p>
                    </div>
                  </div>
                  <a
                    href={item.href}
                    className="inline-flex shrink-0 items-center gap-2 border border-accent-foreground/30 px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-foreground hover:text-accent"
                  >
                    {item.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeConsultation;