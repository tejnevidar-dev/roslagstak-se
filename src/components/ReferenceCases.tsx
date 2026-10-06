import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { projectTexts } from "@/data/project-texts";
import imgGrisslehamn from "@/assets/project-grisslehamn-hero.jpg";
import imgGrisslehamnAvif480 from "@/assets/project-grisslehamn-hero-480.avif";
import imgGrisslehamnAvif768 from "@/assets/project-grisslehamn-hero-768.avif";
import imgGrisslehamnWebp480 from "@/assets/project-grisslehamn-hero-480.webp";
import imgGrisslehamnWebp768 from "@/assets/project-grisslehamn-hero-768.webp";
import imgSingo from "@/assets/project-singo-hero.jpg";
import imgSingoAvif480 from "@/assets/project-singo-hero-480.avif";
import imgSingoAvif768 from "@/assets/project-singo-hero-768.avif";
import imgSingoWebp480 from "@/assets/project-singo-hero-480.webp";
import imgSingoWebp768 from "@/assets/project-singo-hero-768.webp";
import imgBlido from "@/assets/project-blido-hero.jpg";
import imgBlidoAvif480 from "@/assets/project-blido-hero-480.avif";
import imgBlidoAvif768 from "@/assets/project-blido-hero-768.avif";
import imgBlidoWebp480 from "@/assets/project-blido-hero-480.webp";
import imgBlidoWebp768 from "@/assets/project-blido-hero-768.webp";

/**
 * Startsidans referensjobb (Vidar 2026-10-06): de tre riktiga jobben högt upp på sidan.
 * Text kommer ur src/data/project-texts.ts (samma källa som projektsidorna, bara belagda fakta);
 * bilderna är samma hero-bilder som projektsidorna, i de två mindre varianterna.
 * Importerar medvetet inte src/data/projects.ts (den drar in hela orts-datan).
 */
const images: Record<string, { jpg: string; avif: string; webp: string }> = {
  "takbyte-grisslehamn": {
    jpg: imgGrisslehamn,
    avif: `${imgGrisslehamnAvif480} 480w, ${imgGrisslehamnAvif768} 768w`,
    webp: `${imgGrisslehamnWebp480} 480w, ${imgGrisslehamnWebp768} 768w`,
  },
  "takbyte-singo": {
    jpg: imgSingo,
    avif: `${imgSingoAvif480} 480w, ${imgSingoAvif768} 768w`,
    webp: `${imgSingoWebp480} 480w, ${imgSingoWebp768} 768w`,
  },
  "takrenovering-blido": {
    jpg: imgBlido,
    avif: `${imgBlidoAvif480} 480w, ${imgBlidoAvif768} 768w`,
    webp: `${imgBlidoWebp480} 480w, ${imgBlidoWebp768} 768w`,
  },
};

/** Nyaste jobbet först. */
const ORDER = ["takbyte-grisslehamn", "takbyte-singo", "takrenovering-blido"];
const SIZES = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw";

const ReferenceCases = () => {
  const cases = ORDER.map((slug) => projectTexts.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  );

  return (
    <section aria-labelledby="referensjobb" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 items-end gap-y-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
              <span aria-hidden="true" className="h-px w-12 bg-accent/50" />
              Referensjobb
            </p>
            <h2
              id="referensjobb"
              className="mt-6 max-w-[22ch] font-display text-[clamp(1.85rem,3vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.02em] text-foreground text-balance"
            >
              Tre tak vi har lagt, med bilder från jobben
            </h2>
          </div>
          <p className="col-span-12 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">
            Alla tre är utförda av RoslagsTak och visas med kundens samtycke. Varje jobb har en egen sida med fler bilder.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cases.map((p) => {
            const img = images[p.slug];
            return (
              <li key={p.slug} className="flex">
                <Link
                  to={`/projekt/${p.slug}`}
                  className="group flex w-full flex-col overflow-hidden bg-card shadow-[0_30px_70px_-50px_rgba(12,35,64,0.6)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <picture className="contents">
                      <source type="image/avif" srcSet={img.avif} sizes={SIZES} />
                      <source type="image/webp" srcSet={img.webp} sizes={SIZES} />
                      <img
                        src={img.jpg}
                        alt={p.heroAlt}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </picture>
                    <span className="absolute bottom-0 left-0 inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> {p.locationName}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-[1.45rem] font-bold leading-[1.2] tracking-[-0.015em] text-card-foreground">
                      {p.title}
                    </h3>
                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-y border-border py-4 text-[15px]">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Jobb</dt>
                      <dd className="text-foreground">{p.serviceName}</dd>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Material</dt>
                      <dd className="text-foreground">{p.material}</dd>
                      {p.period && (
                        <>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Utfört</dt>
                          <dd className="text-foreground">{p.period}</dd>
                        </>
                      )}
                    </dl>
                    <p className="mt-5 flex-1 text-[16px] leading-relaxed text-muted-foreground">{p.metaDescription ?? p.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
                      Läs hela caset
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10">
          <Link to="/projekt" className="text-[15px] font-semibold text-primary underline underline-offset-4 hover:no-underline">
            Se alla referensjobb
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ReferenceCases;
