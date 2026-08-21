import Reveal from "@/components/Reveal";

const items = [
  { no: "01", title: "10+30 års garanti", text: "10 års garanti på utförande och 30 års materialgaranti från tillverkaren." },
  { no: "02", title: "ROT-avdrag", text: "Vi hanterar administrationen direkt på fakturan." },
  { no: "03", title: "F-skatt & försäkrad", text: "Erfarna takläggare med fullständigt försäkringsskydd." },
  { no: "04", title: "Fri besiktning", text: "Vi bedömer ditt taks skick helt utan kostnad." },
];

/** Sober trust band — light surface, hairline dividers, numbered items. */
const TrustBar = () => {
  return (
    <section className="border-b border-border bg-warm" aria-label="Våra löften">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.06}>
              <div className="flex flex-col gap-2 px-0 py-9 sm:px-8 lg:first:pl-0">
                <span className="text-[11px] font-bold tabular-nums tracking-[0.28em] text-primary">{item.no}</span>
                <span className="font-display text-lg font-semibold tracking-tight text-foreground">{item.title}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{item.text}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustBar;
