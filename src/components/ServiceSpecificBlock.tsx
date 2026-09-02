import Reveal from "@/components/Reveal";
import type { SpecificBlock } from "@/data/service-blocks";

/** Rubrikhuvud som delas av alla blocktyper. */
const BlockHead = ({ eyebrow, heading, intro }: { eyebrow: string; heading: string; intro: string }) => (
  <div className="max-w-3xl">
    <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
      <span aria-hidden="true" className="h-px w-12 bg-primary" />
      {eyebrow}
    </p>
    <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-foreground">
      {heading}
    </h2>
    <p className="mt-5 text-[16px] leading-[1.8] text-muted-foreground">{intro}</p>
  </div>
);

/**
 * Tjänstspecifikt innehållsblock. Varje blocktyp har egen struktur
 * så att tjänstesidorna skiljer sig i uppbyggnad, inte bara i text.
 */
const ServiceSpecificBlock = ({ block }: { block: SpecificBlock }) => {
  if (block.kind === "matrix" || block.kind === "dimension") {
    const isDimension = block.kind === "dimension";
    return (
      <section className={`border-y border-border py-20 lg:py-24 ${isDimension ? "bg-background" : "bg-secondary/40"}`}>
        <div className="mx-auto max-w-7xl px-6">
          <BlockHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  {block.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] first:w-[30%]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={row[0]} className={ri % 2 ? "bg-secondary/50" : "bg-card"}>
                    {row.map((cell, ci) => (
                      <td
                        key={`${row[0]}-${ci}`}
                        className={`border-b border-border px-6 py-5 align-top ${
                          ci === 0
                            ? "font-display text-[15px] font-bold tracking-[-0.01em] text-foreground"
                            : ci === 1 && isDimension
                              ? "font-mono text-[14px] tabular-nums text-primary"
                              : "text-[14px] leading-[1.6] text-muted-foreground"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {block.footnote && (
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">{block.footnote}</p>
          )}
        </div>
      </section>
    );
  }

  if (block.kind === "signals") {
    return (
      <section className="border-y border-border bg-secondary/40 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <BlockHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

          <ul className="mt-12 space-y-px bg-border">
            <li className="hidden bg-primary px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground lg:grid lg:grid-cols-[1fr_1fr_1fr] lg:gap-8">
              <span>Signal på taket</span>
              <span>Vad det betyder</span>
              <span>Vår åtgärd</span>
            </li>
            {block.items.map((it) => (
              <li key={it.sign} className="bg-card">
                <Reveal>
                  <div className="grid gap-4 px-6 py-6 lg:grid-cols-[1fr_1fr_1fr] lg:gap-8">
                    <p className="font-display text-[16px] font-bold leading-snug tracking-[-0.015em] text-foreground">
                      {it.sign}
                    </p>
                    <p className="text-[14px] leading-[1.65] text-muted-foreground">{it.meaning}</p>
                    <p className="border-l-2 border-accent pl-4 text-[14px] leading-[1.65] text-foreground">
                      {it.action}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (block.kind === "regulatory") {
    return (
      <section className="bg-primary py-20 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-12 bg-accent" />
              {block.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-0.035em]">
              {block.heading}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-primary-foreground/75">{block.intro}</p>
          </div>

          <ol className="mt-14 grid gap-px bg-primary-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {block.steps.map((s, i) => (
              <li key={s.code} className="bg-primary">
                <Reveal delay={(i % 3) * 0.05}>
                  <div className="flex h-full flex-col gap-4 p-8">
                    <span className="font-mono text-[12px] tabular-nums text-accent">{s.code}</span>
                    <h3 className="font-display text-[1.15rem] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                    <p className="text-[14px] leading-[1.7] text-primary-foreground/70">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (block.kind === "checklist") {
    return (
      <section className="border-y border-border bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <BlockHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {block.groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.05}>
                <div>
                  <h3 className="flex items-baseline gap-3 border-b border-border pb-3 font-display text-[1.05rem] font-extrabold uppercase tracking-[0.14em] text-foreground">
                    <span className="font-mono text-[11px] tabular-nums text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {g.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[14px] leading-[1.6] text-muted-foreground">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // season
  return (
    <section className="border-y border-border bg-secondary/40 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <BlockHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {block.periods.map((p, i) => (
            <li key={p.label}>
              <Reveal delay={i * 0.06}>
                <div className="flex h-full flex-col gap-4 border-t-2 border-primary bg-card p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{p.label}</span>
                  <h3 className="font-display text-[1.2rem] font-extrabold leading-snug tracking-[-0.02em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServiceSpecificBlock;
