const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-12 border-t border-accent-foreground/10" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-2xl mb-3">
              Roslags<span className="text-primary">tak</span>
            </p>
            <p className="text-accent-foreground/60 text-sm leading-relaxed">
              Professionell takläggning i Roslagen, Norrtälje, Täby, Vallentuna och Stockholms skärgård.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Tjänster</h3>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li>Takomläggning</li>
              <li>Takrenovering</li>
              <li>Takavvattning</li>
              <li>Plåtarbeten</li>
              <li>Takinspektion</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm text-accent-foreground/60">
              <li>070-123 45 67</li>
              <li>info@roslagstak.se</li>
              <li>Norrtälje, Roslagen</li>
              <li>Org.nr: 556xxx-xxxx</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-accent-foreground/10 pt-6 text-center text-xs text-accent-foreground/40">
          © {new Date().getFullYear()} Roslagstak. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
