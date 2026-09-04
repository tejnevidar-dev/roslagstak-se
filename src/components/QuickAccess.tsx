import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

/* Snabbval i nautisk asymmetri: bred ljus panel + smal accentpanel som skjuter upp */
const QuickAccess = () => (
  <section aria-labelledby="snabbval" className="bg-secondary/60 py-16 lg:py-20">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-12 items-end gap-8">
        <div className="col-span-12 lg:col-span-7">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent"><span aria-hidden="true" className="h-px w-12 bg-accent/50" />Snabbval</p>
          <h2
            id="snabbval"
            className="mt-6 max-w-[26ch] font-display text-[clamp(1.85rem,3vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.02em] text-foreground"
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
          className="group col-span-12 flex flex-col justify-between bg-card p-10 shadow-[0_30px_70px_-50px_rgba(12,35,64,0.6)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 lg:col-span-7 lg:p-14"
        >
          <div>
            <span className="font-display text-[11px] uppercase tracking-[0.3em] text-accent">
              01 — Nytt tak
            </span>
            <h3 className="mt-7 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-[1.2] tracking-[-0.018em] text-foreground">
              Byta eller renovera taket
            </h3>
            <p className="mt-5 max-w-[46ch] text-[17px] font-light leading-[1.68] text-muted-foreground">
              Komplett takbyte från råspont till färdig plåt — eller en riktad åtgärd där taket
              läcker. Vi bedömer skicket på plats och lämnar ett fast pris innan vi börjar.
            </p>
          </div>
          <span className="mt-10 inline-flex items-center gap-3 font-display text-[16px] italic text-accent">
            Se tjänster för villa &amp; fritidshus
            <ArrowRight
              className="h-4 w-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </Link>

        <a
          href="/offert"
          className="group col-span-12 flex flex-col justify-between bg-accent p-10 text-accent-foreground transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 lg:col-span-5 lg:-mt-12 lg:p-14"
        >
          <div>
            <span className="font-display text-[11px] uppercase tracking-[0.3em] text-primary">
              02 — Underhåll &amp; pris
            </span>
            <h3 className="mt-7 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-[1.2] tracking-[-0.018em]">
              Takvård &amp; vad det kostar
            </h3>
            <p className="mt-5 max-w-[44ch] text-[17px] font-light leading-[1.68] opacity-90">
              Taktvätt, behandling och takmålning som förlänger takets livslängd — eller räkna
              fram ett prisspann för just ditt tak på under en minut.
            </p>
          </div>
          <span className="mt-10 inline-flex items-center gap-3 font-display text-[16px] italic">
            Räkna på ditt tak
            <ArrowRight
              className="h-4 w-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default QuickAccess;
