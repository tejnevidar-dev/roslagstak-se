import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export interface Crumb {
  name: string;
  /** Utelämnas för sista steget (nuvarande sida). */
  path?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** Sätt false när sidan redan renderar egen BreadcrumbList-JSON-LD. */
  withSchema?: boolean;
  className?: string;
}

/** Synliga brödsmulor + matchande BreadcrumbList-schema. */
const Breadcrumbs = ({ items, withSchema = true, className = "" }: BreadcrumbsProps) => {
  const schemaItems = items
    .filter((item): item is Required<Crumb> => Boolean(item.path))
    .map((item) => ({ name: item.name, path: item.path }));

  return (
    <div className={`border-b border-border bg-background ${className}`}>
      {withSchema && schemaItems.length > 1 && <JsonLd data={buildBreadcrumbSchema(schemaItems)} />}
      <nav
        aria-label="Brödsmulor"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4 text-sm text-muted-foreground"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-border" aria-hidden="true" />}
              {item.path && !isLast ? (
                <Link to={item.path} className="inline-flex items-center gap-1.5 transition-colors hover:text-primary">
                  {index === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
