import { Anchor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { locationIndex as locations } from "@/data/location-index";
import { regionIntros, regionOrder } from "@/data/regions";
import {
  HOME_AREA_INTRO,
  HOME_AREA_PANEL,
  HOME_AREA_SEO_HEADING,
  HOME_AREA_SEO_PARAGRAPHS,
  homeAreaIntroText,
} from "@/data/home-area";
import type { ReactNode } from "react";

/** Fetstil i texterna är markerad med ** och interna länkar med [text](/länk) (se home-area.ts). */
const withBold = (s: string): ReactNode[] =>
  s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\))/).map((part, i) => {
    const länk = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (länk)
      return (
        <Link key={i} to={länk[2]} className="font-semibold underline decoration-marine/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
          {länk[1]}
        </Link>
      );
    const fet = part.match(/^\*\*([^*]+)\*\*$/);
    return fet ? <strong key={i} className="font-semibold">{fet[1]}</strong> : part;
  });

const areas = regionOrder
  .filter((region) => locations.some((l) => l.region === region))
  .map((region) => ({
    region,
    locations: locations.filter((l) => l.region === region),
    description: regionIntros[region] ?? "",
  }));

/* Marin geografisektion: teal fält, vit sifferpanel och regioner som sjökortsrader */
const ServiceArea = () => {
  return (
    <section id="omraden" className="bg-marine py-20 text-marine-foreground lg:py-28" aria-labelledby="area-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                {HOME_AREA_INTRO.eyebrow}
              </p>
              <h2
                id="area-heading"
                className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.14]"
              >
                {HOME_AREA_INTRO.headingA}{" "}
                <span className="italic text-accent">{HOME_AREA_INTRO.headingB}</span>
              </h2>
              <p className="mt-6 text-[17px] font-light leading-relaxed text-marine-foreground/80">
                {homeAreaIntroText(areas.length)}
              </p>


              <div className="mt-10 bg-card p-8 text-foreground shadow-[0_30px_70px_-50px_rgba(12,35,64,0.7)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {HOME_AREA_PANEL.label}
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-bold tabular-nums leading-none text-accent">
                    {areas.length}
                  </span>
                  <span className="font-display text-xl font-semibold text-foreground">
                    {HOME_AREA_PANEL.unit}
                  </span>
                </div>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-muted-foreground">
                  {HOME_AREA_PANEL.workflow}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-[14px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">{HOME_AREA_PANEL.islandLead}</span> {HOME_AREA_PANEL.islandText}
                </p>

              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            {areas.map((area, i) => (
              <div
                key={area.region}
                className="border-t border-marine-foreground/20 py-9 last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[12px] tabular-nums tracking-[0.24em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-3 font-display text-[clamp(1.35rem,2vw,1.8rem)] font-bold leading-tight">
                      <Anchor className="h-5 w-5 text-accent" aria-hidden="true" />
                      {area.region}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[16px] font-light leading-relaxed text-marine-foreground/80">
                      {area.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-marine-foreground/70">
                      {area.locations.map((place) => (
                        <li key={place.slug}>
                          <Link
                            to={`/taklaggare-${place.slug}`}
                            className="underline decoration-marine-foreground/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {place.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/omraden"
              className="mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-accent transition-colors hover:text-marine-foreground"
            >
              {HOME_AREA_PANEL.allLink}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* SEO-text i ljus panel som bryter det marina fältet */}
        <div className="mt-16 bg-card px-6 py-12 text-foreground shadow-[0_40px_90px_-60px_rgba(12,35,64,0.8)] sm:px-12 lg:mt-20 lg:px-16 lg:py-16">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <span
                aria-hidden="true"
                className="mb-6 block h-1 w-12 bg-accent"
              />
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-snug text-foreground">
                {HOME_AREA_SEO_HEADING}
              </h3>
            </div>
            <div className="col-span-12 space-y-5 text-[16px] font-light leading-relaxed text-marine lg:col-span-8 lg:columns-2 lg:gap-10 lg:space-y-0 [&>p]:mb-5">
              {HOME_AREA_SEO_PARAGRAPHS.map((stycke) => (
                <p key={stycke.slice(0, 40)}>{withBold(stycke)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
