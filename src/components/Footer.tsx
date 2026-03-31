import { Link } from "react-router-dom";
import { useMemo } from "react";

const Footer = () => {
  const orgNr = useMemo(() => ["559", "539", "-", "3595"].join(""), []);
  return (
    <footer className="bg-accent text-accent-foreground py-12 border-t border-accent-foreground/10" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-2xl mb-3">
              Roslags<span className="text-primary">Tak</span>
            </p>
            <p className="text-accent-foreground/60 text-sm leading-relaxed">
              Takläggare i Roslagen. Takbyte och takrenovering på Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö, Vaxholm, Norrtälje och 20+ platser i skärgården.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Tjänster</h3>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li><Link to="/tjanster/takomlaggning" className="hover:text-primary transition-colors">Takomläggning</Link></li>
              <li><Link to="/tjanster/takrenovering" className="hover:text-primary transition-colors">Takrenovering</Link></li>
              <li><Link to="/tjanster/takavvattning" className="hover:text-primary transition-colors">Takavvattning</Link></li>
              <li><Link to="/tjanster/platarbeten" className="hover:text-primary transition-colors">Plåtarbeten</Link></li>
              <li><Link to="/tjanster/takinspektion" className="hover:text-primary transition-colors">Takinspektion</Link></li>
              <li><Link to="/priser" className="hover:text-primary transition-colors">Prislista</Link></li>
              <li><Link to="/recensioner" className="hover:text-primary transition-colors">Recensioner</Link></li>
              <li><Link to="/blogg" className="hover:text-primary transition-colors">Blogg & tips</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li>073-084 97 72</li>
              <li>info@roslagstak.se</li>
              <li>Norrtälje, Roslagen</li>
              <li data-nosnippet="">Org.nr: {orgNr}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-accent-foreground/10 pt-6 text-center text-xs text-accent-foreground/40">
          © {new Date().getFullYear()} RoslagsTak. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
