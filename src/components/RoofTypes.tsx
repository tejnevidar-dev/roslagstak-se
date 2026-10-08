import { useState } from "react";
import { ChevronDown, ChevronUp, Coins } from "lucide-react";
import { ROT_FORBEHALL, STALLNING_MENING, belopp } from "@/data/prices";
import SectionHeading from "@/components/SectionHeading";
import { ROOF_PRICE_HEADING, ROOF_TYPES_HEADING, ROOF_TYPES_INTRO, ROOF_TYPE_TEXTS, roofPriceText } from "@/data/taktyper-text";
import imgTp20 from "@/assets/roof-type-tp20.jpg";
import imgDubbelfalsat from "@/assets/roof-type-dubbelfalsat.jpg";
import imgLertegel from "@/assets/roof-type-lertegel.jpg";
import imgBetongpanne from "@/assets/roof-type-betongpanne.jpg";
import imgPannplat from "@/assets/roof-type-pannplat.jpg";

/**
 * Sex kort i samma mall som förut (Marknadschefen, backlog 1cl, underlag-taktyper-2026-10-05.md). Varje kort har materialets
 * namn, en mening ordagrant ur den godkända materialtexten, länk till materialets sida och riktpris ur prices.ts.
 * Fälten för egenskaper, för- och nackdelar och livslängd är borta: de fanns bara här och saknade belägg.
 */
type RoofType = {
  id: string;
  name: string;
  sentence: string;
  /** Prisposten i prices.ts. */
  post: string;
  to: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
};

const roofTypes: RoofType[] = [
  {
    id: "tp20",
    ...ROOF_TYPE_TEXTS.tp20,
    post: "TP20 plåttak",
    to: "/material/tp20-plattak",
    linkLabel: "Läs mer om TP20-plåttak",
    image: imgTp20,
    imageAlt: "Närbild på trapetsprofilerad TP20-plåt",
  },
  {
    id: "pannplat",
    ...ROOF_TYPE_TEXTS.pannplat,
    post: "Pannplåttak",
    to: "/material/pannplat",
    linkLabel: "Läs mer om pannplåt",
    image: imgPannplat,
    imageAlt: "Svart pannplåt med karaktäristisk vågprofil",
  },
  {
    id: "dubbelfalsat",
    ...ROOF_TYPE_TEXTS.dubbelfalsat,
    post: "Dubbelfalsat plåttak",
    to: "/tjanster/platarbeten#falsat",
    linkLabel: "Läs mer om dubbelfalsat plåttak",
    image: imgDubbelfalsat,
    imageAlt: "Dubbelfalsat plåttak i svart bandtäckning på modern timmerbyggnad",
  },
  {
    id: "lertegel",
    ...ROOF_TYPE_TEXTS.lertegel,
    post: "Lertegeltak",
    to: "/tjanster/tegeltak",
    linkLabel: "Läs mer om tegeltak i lertegel",
    image: imgLertegel,
    imageAlt: "Närbild på tvåkupiga lertegelpannor i terrakotta",
  },
  {
    id: "betongpanne",
    ...ROOF_TYPE_TEXTS.betongpanne,
    post: "Betongpannetak",
    to: "/material/betongpannor",
    linkLabel: "Läs mer om betongpannor",
    image: imgBetongpanne,
    imageAlt: "Närbild på svart betongpannetak med vågprofil",
  },
  {
    id: "papptak",
    ...ROOF_TYPE_TEXTS.papptak,
    post: "Papptak",
    to: "/material/papptak",
    linkLabel: "Läs mer om papptak",
  },
];

const RoofTypes = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="taktyper" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="rooftypes-heading">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          meta={ROOF_TYPES_HEADING.meta}
          id="rooftypes-heading"
          title={<>{ROOF_TYPES_HEADING.titleA} <em className="font-normal italic text-primary">{ROOF_TYPES_HEADING.titleB}</em></>}
          intro={
            <>
              {ROOF_TYPES_INTRO.before}
              <a href="/takkontroll" className="text-primary underline decoration-primary/40 hover:no-underline">
                {ROOF_TYPES_INTRO.link}
              </a>
              {ROOF_TYPES_INTRO.after}
            </>
          }
          className="mb-14 lg:mb-20"
        />

        <div className="border-t border-foreground/10">
          {roofTypes.map((roof, i) => {
            const isExpanded = expandedId === roof.id;
            return (
              <article key={roof.id} className="border-b border-foreground/10">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : roof.id)}
                  className="group w-full flex items-center justify-between gap-6 py-7 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[10px] font-semibold tabular-nums tracking-[0.2em] text-muted-foreground pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl md:text-[1.75rem] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                        {roof.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1.5 max-w-xl">{roof.sentence}</p>
                    </div>
                  </div>
                  <span
                    className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                      isExpanded ? "bg-accent text-primary-foreground border-accent" : "border-foreground/20 text-foreground group-hover:border-foreground/40"
                    }`}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="pb-9 pt-2 md:pl-12 space-y-7 animate-fade-in">
                    <div className={roof.image ? "grid gap-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start" : ""}>
                      {roof.image && (
                        <img
                          src={roof.image}
                          alt={roof.imageAlt}
                          width={480}
                          height={360}
                          loading="lazy"
                          className="aspect-[4/3] w-full rounded-2xl object-cover sm:max-w-[15rem]"
                        />
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Riktpris (efter ROT, inkl. moms):</span>
                        <span className="font-semibold text-foreground">{belopp(roof.post)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/takkontroll"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
                      >
                        Boka takkontroll för {roof.name.toLowerCase()}
                      </a>
                      <a
                        href={roof.to}
                        className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:border-foreground/40 transition-colors"
                      >
                        {roof.linkLabel}
                      </a>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Vad kostar takbyte? */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h3 className="font-display text-2xl text-foreground mb-4">{ROOF_PRICE_HEADING}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {roofPriceText(STALLNING_MENING, ROT_FORBEHALL)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoofTypes;
