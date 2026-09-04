import { Star, ExternalLink, ShieldCheck, MapPin } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=RoslagsTak%20Blid%C3%B6";

interface GoogleReviewsProps {
  /** Rubrik ovanför knappen. */
  title?: string;
  /** Kort förklarande text. */
  intro?: string;
  /** "panel" = ljust kort, "band" = mörkt helbredds-avsnitt, "inline" = smal rad. */
  variant?: "panel" | "band" | "inline";
  /** Ort eller tjänst som nämns i texten, t.ex. "Blidö". */
  place?: string;
  className?: string;
}

const badges = [
  { icon: ShieldCheck, text: "Kan inte redigeras av oss" },
  { icon: MapPin, text: "Kunder i Roslagen & Storstockholm" },
  { icon: Star, text: "Namn och datum syns i original" },
];

/**
 * Hänvisar till företagets riktiga omdömen på Google.
 * Vi publicerar inga egenskrivna omdömen på sajten.
 */
const GoogleReviews = ({
  title = "Omdömen från våra kunder",
  intro,
  variant = "panel",
  place,
  className = "",
}: GoogleReviewsProps) => {
  const text =
    intro ??
    `Vi skriver inga egna omdömen här. Alla recensioner${
      place ? ` – även från jobb ${place} –` : ""
    } ligger publikt på vår Google-företagsprofil, där du kan läsa dem i original och lämna ett eget om vi har jobbat hos dig.`;

  if (variant === "inline") {
    return (
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 text-[15px] font-semibold transition-colors hover:text-accent ${className}`}
      >
        <span className="flex gap-0.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        Läs våra omdömen på Google
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    );
  }

  if (variant === "band") {
    return (
      <section
        aria-label="Omdömen på Google"
        className={`bg-primary py-16 text-primary-foreground lg:py-20 ${className}`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-10 px-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
              <span aria-hidden="true" className="h-px w-10 bg-seafoam/50" />
              Omdömen
            </p>
            <h2 className="mt-5 max-w-[28ch] font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-[1.16] tracking-[-0.02em]">
              {title}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[17px] font-light leading-[1.7] text-primary-foreground/80">
              {text}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {badges.map((b) => (
                <li key={b.text} className="flex items-center gap-2 text-[13px] text-seafoam/90">
                  <b.icon className="h-4 w-4" aria-hidden="true" />
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-seafoam px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-primary transition-transform duration-500 hover:-translate-y-0.5 hover:animate-subtle-pulse"
            >
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              Läs omdömena på Google
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={`border border-border bg-card p-8 md:p-10 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Verifierade omdömen på Google
        </span>
      </div>
      <h2 className="mt-5 font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{text}</p>
      <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
        {badges.map((b) => (
          <li key={b.text} className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <b.icon className="h-4 w-4 text-primary" aria-hidden="true" />
            {b.text}
          </li>
        ))}
      </ul>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Star className="h-4 w-4 fill-current" aria-hidden="true" />
        Läs våra omdömen på Google
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
};

export { GOOGLE_REVIEWS_URL };
export default GoogleReviews;
