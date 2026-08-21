interface PageHeroProps {
  eyebrow?: string;
  title: string;
  text?: string;
}

/* Kompakt sidtopp för undersidor — matchar den mörka hero-identiteten */
const PageHero = ({ eyebrow, title, text }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-primary text-primary-foreground">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"
    />
    <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pb-24 md:pt-40">
      {eyebrow && (
        <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.28em] text-seafoam-light">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-balance">
        {title}
      </h1>
      {text && (
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-primary-foreground/75 md:text-[19px]">
          {text}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
