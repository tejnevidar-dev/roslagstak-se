import { Star, ExternalLink } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://share.google/FsdpfTq9H3amLoTPe";

interface GoogleReviewsProps {
  /** Rubrik ovanför knappen. */
  title?: string;
  /** Kort förklarande text. */
  intro?: string;
  className?: string;
}

/**
 * Hänvisar till företagets riktiga omdömen på Google.
 * Vi publicerar inga egenskrivna omdömen på sajten.
 */
const GoogleReviews = ({
  title = "Omdömen från våra kunder",
  intro = "Vi skriver inga egna omdömen här. Alla recensioner ligger publikt på vår Google-företagsprofil, där du kan läsa dem i original — och lämna ett eget om vi har jobbat hos dig.",
  className = "",
}: GoogleReviewsProps) => {
  return (
    <div className={`border border-border bg-card p-8 md:p-10 ${className}`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <h2 className="mt-5 font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">{intro}</p>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 border border-border px-7 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Star className="h-4 w-4 fill-primary text-primary" />
        Läs våra omdömen på Google
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};

export { GOOGLE_REVIEWS_URL };
export default GoogleReviews;
