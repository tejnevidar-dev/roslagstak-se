import { ShieldCheck, Anchor, Clock, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "10 års garanti",
    text: "Skriftlig garanti på allt taktäckningsarbete vi utför.",
  },
  {
    icon: Anchor,
    title: "Specialister på öar",
    text: "Vi löser båttransport och logistik till öar utan bro.",
  },
  {
    icon: Clock,
    title: "Svar inom 24 timmar",
    text: "Du får återkoppling på din förfrågan nästa arbetsdag.",
  },
  {
    icon: BadgeCheck,
    title: "Fast pris & ROT",
    text: "Tydlig offert utan dolda kostnader – vi hjälper med ROT.",
  },
];

const TrustBar = () => {
  return (
    <section className="bg-gradient-accent py-12 md:py-14" aria-label="Våra löften">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <div className="w-11 h-11 shrink-0 rounded-md bg-primary-foreground/10 border border-primary-foreground/15 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-lg text-accent-foreground leading-snug">{item.title}</p>
                <p className="text-sm text-accent-foreground/70 leading-relaxed mt-1">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustBar;