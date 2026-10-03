import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { bildNyckel, buildAltOverrides, buildOverrideBlocks } from "@/data/overrides";

/**
 * Tilläggsblock från SEO Command Center (src/data/overrides/innehall.json): textblock, FAQ och internlänkar, samt
 * alt-text för bilder. Blocken läser samma modell som den statiska HTML:en (buildOverrideBlocks) och ligger sist på
 * sidan, före sidfoten. Alt-överstyrningarna sätter bara alt-attributet på befintliga bilder (matchade på filnamn,
 * se bildNyckel) och följer med bilder som laddas in senare. Utan överstyrningar för sidan sker ingenting.
 */
const ContentOverrides = () => {
  const { pathname } = useLocation();
  const blocks = buildOverrideBlocks(pathname);
  const alt = buildAltOverrides(pathname);

  useEffect(() => {
    if (!alt) return;
    const apply = (root: ParentNode) => {
      root.querySelectorAll("img").forEach((img) => {
        const text = alt.alt[bildNyckel(img.currentSrc || img.getAttribute("src") || "")];
        if (text !== undefined && img.getAttribute("alt") !== text) img.setAttribute("alt", text);
      });
    };
    apply(document);
    const observer = new MutationObserver(() => apply(document));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!blocks) return null;
  return (
    <section className="border-t border-border bg-background py-16 md:py-20" data-seo-cc={blocks.ids.join(" ")}>
      <div className="mx-auto max-w-3xl space-y-12 px-6">
        {blocks.textblock && (
          <div className="space-y-4">
            {blocks.textblock.rubrik && <h2 className="font-display text-2xl text-foreground md:text-3xl">{blocks.textblock.rubrik}</h2>}
            {blocks.textblock.stycken.map((s) => (
              <p key={s} className="text-[17px] leading-relaxed text-muted-foreground">
                {s}
              </p>
            ))}
          </div>
        )}
        {blocks.faq && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground md:text-3xl">{blocks.faq.rubrik}</h2>
            {blocks.faq.fragor.map((f) => (
              <div key={f.fraga} className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{f.fraga}</h3>
                <p className="text-[17px] leading-relaxed text-muted-foreground">{f.svar}</p>
              </div>
            ))}
          </div>
        )}
        {blocks.lankar && (
          <nav aria-label={blocks.lankar.rubrik} className="space-y-3">
            <h2 className="font-display text-2xl text-foreground md:text-3xl">{blocks.lankar.rubrik}</h2>
            <ul className="space-y-2 text-[17px]">
              {blocks.lankar.lankar.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="font-medium text-primary underline underline-offset-4">
                    {l.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
};

export default ContentOverrides;
