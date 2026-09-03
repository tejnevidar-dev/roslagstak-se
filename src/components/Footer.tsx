import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import logoWhite from "@/assets/roslagstak-logo-white.png";

const tjanster = [
  { to: "/tjanster/takomlaggning", label: "Takomläggning" },
  { to: "/tjanster/takrenovering", label: "Takrenovering" },
  { to: "/tjanster/takavvattning", label: "Takavvattning" },
  { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
  { to: "/tjanster/takinspektion", label: "Takinspektion" },
  { to: "/tjanster/takvard", label: "Takvård" },
  { to: "/taktvatt", label: "Taktvätt & mossborttagning" },
  { to: "/tjanster/eternit-asbest", label: "Eternit & asbest" },
];

const genvagar = [
  { to: "/priser", label: "Prislista" },
  { to: "/recensioner", label: "Recensioner" },
  { to: "/blogg", label: "Blogg & tips" },
  { to: "/boka", label: "Boka rådgivning" },
  { to: "/kontakt", label: "Kontakt" },
];

const Footer = () => {
  const orgNr = useMemo(() => ["559", "539", "-", "3595"].join(""), []);
  return (
    <footer className="bg-ink text-primary-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 border-b border-primary-foreground/15 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={logoWhite}
              alt="RoslagsTak logotyp"
              width={1437}
              height={535}
              loading="lazy"
              className="mb-6 h-10 w-auto"
            />
            <p className="max-w-sm text-[17px] leading-relaxed text-primary-foreground/70">
              Takläggare i Roslagen. Takbyte, takrenovering och plåtarbeten på Blidö, Ljusterö, Yxlan,
              Furusund, Husarö, Ingmarsö, Vaxholm, Norrtälje och övriga skärgården.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Tjänster">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam">Tjänster</h3>
            <ul className="space-y-3 text-[17px] text-primary-foreground/75">
              {tjanster.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-primary-foreground">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Genvägar">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam">Genvägar</h3>
            <ul className="space-y-3 text-[17px] text-primary-foreground/75">
              {genvagar.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-primary-foreground">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam">Kontakt</h3>
            <ul className="space-y-3 text-[17px] text-primary-foreground/75">
              <li>
                <a href="tel:0701543639" className="flex items-center gap-2 font-semibold text-primary-foreground">
                  <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
                </a>
              </li>
              <li>
                <a href="mailto:info@roslagstak.se" className="flex items-center gap-2 hover:text-primary-foreground">
                  <Mail className="h-4 w-4" aria-hidden="true" /> info@roslagstak.se
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Norrtälje, Roslagen
              </li>
              <li data-nosnippet="" className="text-primary-foreground/50">Org.nr: {orgNr}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-primary-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} RoslagsTak. Alla rättigheter förbehållna.</span>
          <span>Arbete enligt AMA-standard · F-skatt · Fullständigt försäkrade</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
