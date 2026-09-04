import GoogleReviews from "@/components/GoogleReviews";

const items = [
  { value: "10 + 30 år", label: "Utförande- & materialgaranti" },
  { value: "Fast pris", label: "Inga dolda kostnader" },
  { value: "0 kr", label: "Hembesök & offert utan förpliktelser", accent: true },
];


/* Mörk marin faktamatris — vertikala accentlinjer istället för kort */
const TrustBar = () => (
  <section className="relative z-20 bg-primary py-12 lg:py-14" aria-label="Våra löften">
    <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 px-6 text-primary-foreground md:grid-cols-3 md:gap-12">
      {items.map((item) => (
        <li
          key={item.label}
          className="group flex flex-col border-l-2 border-seafoam/60 py-1 pl-5 transition-[border-color,padding] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-seafoam hover:pl-6"
        >
          <span
            className={`font-display text-2xl font-bold tracking-[-0.015em] lg:text-[1.75rem] ${
              item.accent ? "text-seafoam" : ""
            }`}
          >
            {item.value}
          </span>
          <span className="mt-1.5 text-[11.5px] font-medium uppercase leading-[1.5] tracking-[0.18em] text-seafoam/85">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  </section>
);


export default TrustBar;
