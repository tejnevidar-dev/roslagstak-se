import Reveal from "@/components/Reveal";

const items = [
  { meta: "Kvalitet", title: "10 års garanti", text: "Fullt ansvar för material och arbete i ett decennium." },
  { meta: "Avdrag", title: "ROT-avdrag", text: "Vi hanterar administrationen direkt på fakturan." },
  { meta: "Trygghet", title: "F-skatt & försäkrad", text: "Erfarna takläggare med fullständigt försäkringsskydd." },
  { meta: "Service", title: "Fri besiktning", text: "Vi bedömer ditt taks skick helt utan kostnad." },
];

const TrustBar = () => {
  return (
    <section className="relative z-20 bg-card border-b border-border px-6 md:px-12 lg:px-20" aria-label="Våra löften">
      <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.08}>
              <div className="px-0 sm:px-8 sm:first:pl-0 py-12 lg:py-16 flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent/40">{item.meta}</span>
                <span className="font-display text-2xl font-medium tracking-tight text-accent">{item.title}</span>
                <span className="text-sm text-accent/55 leading-relaxed">{item.text}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustBar;
