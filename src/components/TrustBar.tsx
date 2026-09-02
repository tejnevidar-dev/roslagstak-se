const items = [
  { value: "30 år", label: "Materialgaranti" },
  { value: "ROT", label: "Avdrag direkt på fakturan" },
  { value: "0 kr", label: "Besiktning på plats", accent: true },
  { value: "Logistik", label: "Pråm & transport till öar" },
];

/* Mörk marin faktamatris — vertikala accentlinjer istället för kort */
const TrustBar = () => (
  <section className="relative z-20 bg-primary py-14 lg:py-16" aria-label="Våra löften">
    <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-6 text-primary-foreground md:grid-cols-4 md:gap-12">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col border-l-2 border-seafoam py-1 pl-5">
          <span
            className={`font-display text-2xl font-bold lg:text-3xl ${
              item.accent ? "text-seafoam" : ""
            }`}
          >
            {item.value}
          </span>
          <span className="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-seafoam/90">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default TrustBar;
