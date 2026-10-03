import { GARANTI_RENOVERING_CHIP } from "@/data/guarantee";
import { ArrowRight, Award, Clock, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Telefon + "Boka kostnadsfri takkontroll" + förtroenderad med belagda fakta.
 * Samma klasser/mönster som redan användes i Hero.tsx, LocationPage.tsx och
 * ServiceLocationPage.tsx — ingen ny design, bara återanvänt på fler sidor
 * (sprint-offensiv-2026-09-28.md punkt 4) så att det syns i första skärmen på mobil.
 */
const QuickContactFacts = () => (
  <div className="mt-4 border-t border-border pt-4">
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <a
        href="tel:0701543639"
        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
      >
        <Phone className="w-4 h-4 text-primary" /> Ring 070-154 36 39
      </a>
      <Link
        to="/takkontroll"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        Boka kostnadsfri takkontroll <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
    <div className="mt-3 flex flex-wrap gap-4">
      <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Shield className="w-4 h-4 text-primary" /> 10 års utförandegaranti
      </div>
      <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Shield className="w-4 h-4 text-primary" /> {GARANTI_RENOVERING_CHIP}
      </div>
      <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Award className="w-4 h-4 text-primary" /> Fast pris, arbete enligt AMA
      </div>
      <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Clock className="w-4 h-4 text-primary" /> Svar inom 24 h
      </div>
    </div>
  </div>
);

export default QuickContactFacts;
