import { ShieldCheck, Package, Receipt, Search } from "lucide-react";
import Reveal from "@/components/Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "10 år",
    text: "Utförandegaranti",
  },
  {
    icon: Package,
    title: "30 år",
    text: "Materialgaranti",
  },
  {
    icon: Receipt,
    title: "ROT-avdrag",
    text: "Dras direkt på fakturan",
  },
  {
    icon: Search,
    title: "Fri besiktning",
    text: "Vi bedömer takets skick",
  },
];

/** Ljus trust-rad som lyfter upp över hero-kanten. */
const TrustBar = () => {
  return (
    <section className="relative z-20 -mt-14 bg-background pb-4" aria-label="Våra löften">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="border-b border-border last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Reveal delay={i * 0.06}>
                <div className="flex items-center gap-5 p-7">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <item.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[16px] text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustBar;
