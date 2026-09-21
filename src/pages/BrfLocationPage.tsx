import { useLocation } from "react-router-dom";
import BrfPage, { type BrfPlace } from "@/pages/BrfPage";
import NotFound from "@/pages/NotFound";
import { locations } from "@/data/locations";
import { buildLocalSections } from "@/data/local-sections";
import { brfLocationSlugs } from "@/data/brf-locations";

/** BRF-sida per ort (/brf/<ort>): samma innehåll som /brf med ortens eget avsnitt. */
const BrfLocationPage = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/brf\//, "").replace(/\/$/, "");
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return <NotFound />;

  const prep = loc.isIsland ? "på" : "i";
  const [climate, buildings, inspect] = buildLocalSections(loc).blocks[0].paragraphs;
  const place: BrfPlace = {
    slug: loc.slug,
    name: loc.name,
    prep,
    region: loc.region,
    paragraphs: [
      `För en bostadsrättsförening ${prep} ${loc.name} börjar ett takbyte med en besiktning. ${climate} ${inspect}`,
      `${buildings} Styrelsen får ett skriftligt underlag med foton och ett fast pris att besluta på.`,
    ],
    nearby: loc.nearbyLocations
      .map((name) => locations.find((l) => l.name === name))
      .filter((l): l is (typeof locations)[number] => Boolean(l))
      .filter((l) => (brfLocationSlugs as readonly string[]).includes(l.slug))
      .map((l) => ({ slug: l.slug, name: l.name })),
  };

  return <BrfPage place={place} />;
};

export default BrfLocationPage;
