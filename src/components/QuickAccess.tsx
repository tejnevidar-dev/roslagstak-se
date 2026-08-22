import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

type Item = {
  label: string;
  help: string;
  cta: string;
  to?: string;
  href?: string;
  dark?: boolean;
};

/* Snabbval som två stora, tydliga paneler — en ljus och en djupblå */
const items: Item[] = [
  {
    label: "Byta eller renovera tak",
    help: "Nytt tak från råspont till plåt, eller punktinsatser där taket läcker. Vi bedömer skicket på plats och ger fast pris.",
    cta: "Se tjänster för villa & fritidshus",
    to: "/tjanster/takomlaggning",
  },
  {
    label: "Takvård & vad det kostar",
    help: "Taktvätt och målning som förlänger takets liv — eller räkna fram ett prisspann för ditt tak direkt i konfiguratorn.",
    cta: "Räkna på ditt tak",
    href: "/offert",
    dark: true,
  },
];

const QuickAccess = () => (
  <section aria-labelledby="snabbval" className="border-b border-border bg-secondary/50">
    <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <span aria-hidden="true" className="h-px w-12 bg-primary" />
            Snabbval
          </p>
          <h2
            id="snabbval"
            className="mt-6 max-w-xl font-display text-[clamp(1.9rem,3vw,2.9rem)] font-extrabold leading-[1.03] tracking-[-0.038em] text-foreground"
          >
            Vad behöver du hjälp med?
          </h2>
        </div>
        <a
          href="tel:0701543639"
          className="inline-flex shrink-0 items-center gap-3 text-[17px] font-bold text-foreground underline decoration-primary decoration-2 underline-offset-[6px] hover:text-primary"
        >
          <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          Hellre prata? 070-154 36 39
        </a>
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {items.map((item) => {
          const inner = (
            <>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
                {item.dark ? "02 / Underhåll & pris" : "01 / Nytt tak"}
              </span>
              <span
                className={`mt-8 block font-display text-[clamp(1.6rem,2.2vw,2.1rem)] font-bold leading-tight tracking-[-0.03em] ${
                  item.dark ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`mt-5 block flex-1 text-[17px] font-light leading-relaxed ${
                  item.dark ? "text-primary-foreground/75" : "text-muted-foreground"
                }`}
              >
                {item.help}
              </span>
              <span className="group/link mt-10 inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.22em]">
                {item.cta}
                <span
                  aria-hidden="true"
                  className={`h-[2px] w-8 transition-all group-hover:w-14 ${
                    item.dark ? "bg-primary-foreground" : "bg-primary"
                  }`}
                />
              </span>
            </>
          );
          const cls = `group flex h-full flex-col rounded-sm border p-8 transition-shadow sm:p-12 ${
            item.dark
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-primary hover:shadow-[var(--shadow-elevated)]"
          }`;
          return (
            <li key={item.label}>
              {item.to ? (
                <Link to={item.to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a href={item.href} className={cls}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default QuickAccess;
