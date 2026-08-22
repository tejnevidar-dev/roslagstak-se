import { ShieldCheck, Package, Receipt, Search } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "10 års utförandegaranti" },
  { icon: Package, title: "30 års materialgaranti" },
  { icon: Receipt, title: "ROT-avdrag på fakturan" },
  { icon: Search, title: "Kostnadsfri besiktning" },
];

/* Hairline-remsa med runda ikonhållare — lugn, saklig, ingen kortkänsla */
const TrustBar = () => (
  <section className="border-b border-border bg-card" aria-label="Våra löften">
    <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-border px-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.title} className="group flex items-center gap-4 bg-card px-2 py-8 lg:justify-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-foreground">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default TrustBar;
