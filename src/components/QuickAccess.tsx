import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

/* Snabbval i nautisk asymmetri: bred ljus panel + smal accentpanel som skjuter upp */
const QuickAccess = () => (
  <section aria-labelledby="snabbval" className="bg-secondary/60 py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-12 items-end gap-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Snabbval
          </p>
          <h2
            id="snabbval"
            className="mt-5 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.15] text-foreground"
          >
            Vad behöver du hjälp med?
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:text-right">
          <a
            href="tel:0701543639"
            className="inline-flex items-center gap-3 text-[17px] font-semibold text-foreground underline decoration-seafoam decoration-2 underline-offset-[6px] hover:text-accent"
          >
            <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
            Hellre prata? 070-154 36 39
          </a>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-6">
        <Link
          to="/tjanster/takomlaggning"
          className="group col-span-12 flex flex-col justify-between bg-card p-10 shadow-[0_30px_70px_-50px_rgba(12,35,64,0.6)] transition-transform hover:-translate-y-1 lg:col-span-7 lg:p-14"
        >
          <div>
            <span className="font-display text-[11px] uppercase tracking-[0.3em] text-accent">
              01 — Nytt tak
            </span>
            <h3 className="mt-7 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-snug text-foreground">
              Byta eller renovera tak
            </h3>
            <p className="mt-5 max-w-md text-[17px] font-light leading-relaxed text-muted-foreground">
              Nytt tak från råspont till plåt, eller punktinsatser där taket läcker. Vi bedömer
              skicket på plats och lämnar fast pris.
            </p>
          </div>
          <span className="mt-10 inline-flex items-center gap-3 font-display text-[16px] italic text-accent">
            Se tjänster för villa &amp; fritidshus
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>

        <a
          href="/offert"
          className="group col-span-12 flex flex-col justify-between bg-accent p-10 text-accent-foreground transition-transform hover:-translate-y-1 lg:col-span-5 lg:-mt-12 lg:p-14"
        >
          <div>
            <span className="font-display text-[11px] uppercase tracking-[0.3em] text-primary">
              02 — Underhåll &amp; pris
            </span>
            <h3 className="mt-7 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-snug">
              Takvård &amp; vad det kostar
            </h3>
            <p className="mt-5 text-[17px] font-light leading-relaxed opacity-90">
              Taktvätt och målning som förlänger takets liv — eller räkna fram ett prisspann för
              ditt tak direkt i konfiguratorn.
            </p>
          </div>
          <span className="mt-10 inline-flex items-center gap-3 font-display text-[16px] italic">
            Räkna på ditt tak
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default QuickAccess;
