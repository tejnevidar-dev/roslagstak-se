import { Link } from "react-router-dom";
import { ArrowRight, Phone, Hammer, Wrench, Droplets, Calculator } from "lucide-react";

type Item = {
  label: string;
  help: string;
  icon: typeof Hammer;
  to?: string;
  href?: string;
};

/* Snabbval direkt under heron — stora ytor, tydligt språk, ett klick till målet */
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
    href: "/#offert",
  },
];

const QuickAccess = () => (
  <section aria-labelledby="snabbval" className="border-b border-border bg-warm">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h2
        id="snabbval"
        className="font-display text-2xl font-extrabold tracking-[-0.02em] text-foreground sm:text-3xl"
      >
        Vad behöver du hjälp med?
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Välj det som passar dig bäst — eller ring oss, vi svarar gärna på frågor innan du bestämmer
        något.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const inner = (
            <>
              <span className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground transition-colors group-hover:bg-seafoam">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-5 block font-display text-xl font-bold tracking-[-0.02em] text-foreground">
                {item.label}
              </span>
              <span className="mt-1.5 block text-base leading-snug text-muted-foreground">
                {item.help}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary">
                Läs mer
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </>
          );
          const cls =
            "group flex h-full min-h-[13rem] flex-col border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-32px_hsl(var(--primary)/0.55)]";
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

      {/* Hjälp-rad — extra tydlig väg för den som helst pratar med en människa */}
      <div className="mt-6 flex flex-col items-start gap-4 border border-primary bg-primary px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold leading-snug">
          Osäker på vad ditt tak behöver? Vi tittar på det kostnadsfritt.
        </p>
        <a
          href="tel:0701543639"
          className="inline-flex shrink-0 items-center gap-3 bg-seafoam px-7 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-seafoam-light animate-subtle-pulse"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Ring 070-154 36 39
        </a>
      </div>
    </div>
  </section>
);

export default QuickAccess;
