import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Hammer, Wrench, Droplets, Calculator } from "lucide-react";

type Item = {
  label: string;
  help: string;
  icon: typeof Hammer;
  to?: string;
  href?: string;
};

/* Snabbval direkt under heron — en bred hairline-remsa, inte kortrutnät */
const items: Item[] = [
  {
    label: "Byta tak",
    help: "Nytt tak från råspont till plåt",
    icon: Hammer,
    to: "/tjanster/takomlaggning",
  },
  {
    label: "Renovera tak",
    help: "Laga läckor, byta delar",
    icon: Wrench,
    to: "/tjanster/takrenovering",
  },
  {
    label: "Tvätta & måla tak",
    help: "Takvård som förlänger livet",
    icon: Droplets,
    to: "/tjanster/takvard",
  },
  {
    label: "Se vad taket kostar",
    help: "Räkna fram ditt pris direkt",
    icon: Calculator,
    href: "/offert",
  },
];

const QuickAccess = () => (
  <section aria-labelledby="snabbval" className="border-y border-border bg-background">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-primary">Snabbval</p>
          <h2
            id="snabbval"
            className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            Vad behöver du hjälp med?
          </h2>
        </div>
        <a
          href="tel:0701543639"
          className="inline-flex shrink-0 items-center gap-3 text-[17px] font-bold text-foreground underline decoration-accent decoration-2 underline-offset-[6px] hover:text-primary"
        >
          <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          Hellre prata? 070-154 36 39
        </a>
      </div>

      <ul className="grid border-t border-border lg:grid-cols-4">
        {items.map((item, i) => {
          const inner = (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0 bg-secondary/70 transition-[height] duration-500 ease-out group-hover:h-full"
              />
              <span className="relative flex items-center justify-between">
                <span className="text-[12px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground/70">
                  0{i + 1}
                </span>
                <item.icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
              </span>
              <span className="relative mt-14 block font-display text-[clamp(1.35rem,1.7vw,1.6rem)] font-bold leading-tight tracking-[-0.025em] text-foreground">
                {item.label}
              </span>
              <span className="relative mt-2 block text-[16px] leading-snug text-muted-foreground">
                {item.help}
              </span>
              <span className="relative mt-6 inline-flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.14em] text-primary">
                Vidare
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </span>
            </>
          );
          const cls =
            "group relative flex h-full flex-col overflow-hidden border-b border-border px-0 py-9 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0";
          return (
            <li key={item.label} className="lg:contents">
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
