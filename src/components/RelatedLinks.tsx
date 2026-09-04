import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { getRelatedLinks, type InternalLink } from "@/data/internal-links";

interface RelatedLinksProps {
  /** Sökvägen för sidan som visar blocket — utesluts alltid ur länkarna. */
  currentPath: string;
  title?: string;
  intro?: string;
  /** Egna länkar som läggs först, t.ex. ortssidor. */
  extraLinks?: InternalLink[];
  serviceCount?: number;
  hubCount?: number;
}

/** Internlänknav: knyter ihop tjänstesidor, prissidor och FAQ. */
const RelatedLinks = ({
  currentPath,
  title = "Läs vidare",
  intro = "Fortsätt till tjänsten, priserna eller frågorna som är mest relevanta för ditt takprojekt.",
  extraLinks = [],
  serviceCount,
  hubCount,
}: RelatedLinksProps) => {
  const links = [...extraLinks, ...getRelatedLinks(currentPath, { serviceCount, hubCount })];

  return (
    <section
      className="border-b border-border bg-muted/30 py-20 md:py-24"
      aria-labelledby="related-links-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading meta="Relaterat" id="related-links-heading" title={title} intro={intro} />
        <ul className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.to} className="bg-background">
              <Link
                to={link.to}
                className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-muted/50"
              >
                <span className="flex items-center justify-between gap-4 font-display text-lg text-foreground transition-colors group-hover:text-primary">
                  {link.label}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedLinks;
