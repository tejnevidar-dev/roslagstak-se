import { services } from "@/components/Services";
import { canonicalPath } from "@/lib/canonical";

export interface InternalLink {
  to: string;
  label: string;
  description: string;
}

/** Navsidor som alla tjänste-, pris- och FAQ-sidor ska länka till och från. */
export const hubLinks: InternalLink[] = [
  {
    to: "/priser",
    label: "Priser & takpriser",
    description: "Vad ett takbyte kostar per kvadratmeter, material för material.",
  },
  {
    to: "/offert",
    label: "Räkna ut din offert",
    description: "Konfigurera taket och få ett prisförslag direkt — eller boka besiktning.",
  },
  {
    to: "/taktyper",
    label: "Taktyper & material",
    description: "Jämför livslängd, taklutning och kostnad för de vanligaste taken.",
  },
  {
    to: "/hur-det-gar-till",
    label: "Så går ett takbyte till",
    description: "Steg för steg från besiktning till slutbesiktning och plåtdetaljer.",
  },
  {
    to: "/offert#faq",
    label: "Vanliga frågor",
    description: "Garantier, ROT, tidplan och vad som ingår i ett fast pris.",
  },
  {
    to: "/recensioner",
    label: "Kundrecensioner",
    description: "Omdömen från takprojekt i Roslagen och Storstockholm.",
  },
];

/** Alla tjänstesidor som länkbara kort. */
export const serviceLinks: InternalLink[] = services.map((service) => ({
  to: canonicalPath(`/tjanster/${service.slug}`),
  label: service.title,
  description: service.short,
}));

const normalize = (path: string) => path.split("#")[0].replace(/\/$/, "") || "/";

/**
 * Returnerar relevanta internlänkar för en sida — tjänster först, sedan navsidor —
 * alltid utan länk till sidan man redan står på.
 */
export const getRelatedLinks = (
  currentPath: string,
  options: { serviceCount?: number; hubCount?: number } = {},
): InternalLink[] => {
  const { serviceCount = 3, hubCount = 3 } = options;
  const current = normalize(currentPath);

  const servicePool = serviceLinks.filter((link) => normalize(link.to) !== current);
  const hubPool = hubLinks.filter((link) => normalize(link.to) !== current);

  // Rotera tjänsteurvalet utifrån sökvägen så att olika sidor länkar till olika tjänster.
  const offset = current.length % Math.max(servicePool.length, 1);
  const rotated = [...servicePool.slice(offset), ...servicePool.slice(0, offset)];

  return [...rotated.slice(0, serviceCount), ...hubPool.slice(0, hubCount)];
};
