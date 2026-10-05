/**
 * Minimal inline-markdown för bloggtexter (#1y): "## Rubrik" som egen rad, [text](/länk) och **fet**.
 * Delas av BlogPost.tsx/ProjectPage.tsx (rendering) och scripts/prerender-content.ts (ren text +
 * länkar), så att crawlern och besökaren får samma text.
 */
import { Link } from "react-router-dom";

const PHONE_RE = /(070[- ]?154[ ]?36[ ]?39)/;

/** Gör telefonnumret i löpande text till en tel:-länk (klickbart på mobil, räknas som phone_click). */
export const linkPhone = (text: string) =>
  text.split(PHONE_RE).map((part, i) =>
    PHONE_RE.test(part) ? (
      <a key={i} href="tel:+46701543639" className="text-primary underline underline-offset-4 hover:no-underline">
        {part}
      </a>
    ) : (
      part
    ),
  );

export const INLINE_MD = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

/** Renderar [text](/länk) som intern länk och **text** som fet, resten som vanlig text. */
export const renderInline = (text: string) =>
  text.split(INLINE_MD).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link)
      return link[2].startsWith("/") ? (
        <Link key={i} to={link[2]} className="text-primary underline underline-offset-4 hover:no-underline">
          {link[1]}
        </Link>
      ) : (
        link[1]
      );
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-foreground">{bold[1]}</strong>;
    return linkPhone(part);
  });

export const isHeading = (p: string) => p.startsWith("## ");

/** Ren text utan markdown-syntax. */
export const stripInlineMd = (p: string): string =>
  (isHeading(p) ? p.slice(3) : p).replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

/** Alla interna länkar i texten. */
export const inlineMdLinks = (p: string): { href: string; label: string }[] =>
  [...p.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)].map((m) => ({ href: m[2], label: m[1] }));
