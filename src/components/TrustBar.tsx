import { ShieldCheck, Receipt, BadgeCheck, Search } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "10 års garanti",
    text: "Vi tar fullt ansvar för material och arbete under ett helt decennium.",
  },
  {
    icon: Receipt,
    title: "ROT-avdrag",
    text: "Vi sköter all administration direkt på din faktura.",
  },
  {
    icon: BadgeCheck,
    title: "F-skatt & försäkrad",
    text: "Erfarna takläggare med fullständigt försäkringsskydd.",
  },
  {
    icon: Search,
    title: "Fri besiktning",
    text: "Vi kommer ut och bedömer ditt taks skick helt utan kostnad.",
  },
];

const TrustBar = () => {
  return (
    <section className="bg-accent py-16 md:py-20 px-6 lg:px-20 relative overflow-hidden" aria-label="Våra löften">
      <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="bg-primary-foreground" />
          <div className="border-8 border-primary-foreground" />
          <div className="bg-primary-foreground/40" />
          <div className="bg-primary-foreground" />
        </div>
      </div>

      <ul className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center">
              <item.icon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-accent-foreground leading-snug">{item.title}</p>
              <p className="text-sm text-accent-foreground/50 leading-relaxed mt-1">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustBar;