interface PageHeroProps {
  eyebrow?: string;
  title: string;
  text?: string;
}

/* Kompakt sidtopp för undersidor — matchar den mörka hero-identiteten */
const PageHero = ({ eyebrow, title, text }: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-border bg-secondary text-foreground">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-3xl"
    />
    <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pb-24 md:pt-40">
      {eyebrow && (
        <p className="mb-5 inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-balance text-foreground">
        {title}
      </h1>
      {text && (
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-muted-foreground md:text-[20px]">
          {text}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
