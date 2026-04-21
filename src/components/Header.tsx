import { useState, useEffect } from "react";
import { Phone, Menu, X, MessageCircle, Hammer, Wrench, Droplets, Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const FULL_TEXT = "RoslagsTak";
const SPLIT_INDEX = 7; // "Roslags" = 7 chars

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [flashIndex, setFlashIndex] = useState(-1);

  useEffect(() => {
    if (displayCount < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setFlashIndex(displayCount);
        setDisplayCount((c) => c + 1);
        // Clear flash after a short moment
        setTimeout(() => setFlashIndex(-1), 150);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [displayCount]);

  const visibleText = FULL_TEXT.slice(0, displayCount);
  const prefix = visibleText.slice(0, SPLIT_INDEX);
  const suffix = visibleText.slice(SPLIT_INDEX);

  const navLinks = [
    { href: "#tjanster", label: "Tjänster" },
    { href: "#taktyper", label: "Taktyper" },
    { href: "#offert", label: "Få offert" },
    { href: "#om-oss", label: "Om oss" },
    { href: "#projekt", label: "Projekt" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  const categories = [
    { to: "/takbyte", label: "Takbyte", icon: Hammer },
    { to: "/takrenovering", label: "Takrenovering", icon: Wrench },
    { to: "/taktvatt", label: "Taktvätt & Takvård", icon: Droplets },
    { to: "/taksakerhet", label: "Taksäkerhet", icon: Shield },
  ];

  const isCategoryActive = (to: string) => {
    if (to === "/taktvatt")
      return location.pathname.startsWith("/taktvatt") || location.pathname === "/tjanster/takvard";
    if (to === "/takbyte")
      return location.pathname.startsWith("/takbyte") || location.pathname === "/tjanster/takomlaggning";
    if (to === "/takrenovering")
      return location.pathname.startsWith("/takrenovering") || location.pathname === "/tjanster/takrenovering";
    if (to === "/taksakerhet")
      return location.pathname.startsWith("/taksakerhet");
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent/95 backdrop-blur-sm border-b border-accent/80">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="font-display text-2xl md:text-3xl text-primary-foreground tracking-tight min-w-[140px]">
          {prefix.split("").map((ch, i) => (
            <span key={i} className={i === flashIndex && flashIndex < SPLIT_INDEX ? "text-primary transition-colors duration-150" : ""}>{ch}</span>
          ))}
          <span className="text-primary">
            {suffix.split("").map((ch, i) => {
              const globalIndex = SPLIT_INDEX + i;
              return (
                <span key={globalIndex} className={globalIndex === flashIndex ? "text-primary-foreground transition-colors duration-150" : ""}>{ch}</span>
              );
            })}
          </span>
          {displayCount < FULL_TEXT.length && <span className="animate-pulse text-primary">|</span>}
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-link
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#radgivning"
            onClick={(e) => handleNavClick(e, "#radgivning")}
            className="flex items-center gap-2 border border-primary text-primary px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors animate-subtle-pulse"
          >
            <MessageCircle className="w-4 h-4" />
            Fri rådgivning
          </a>
          <a
            href="tel:0701543639"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
          >
            <Phone className="w-4 h-4" />
            Ring oss
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary-foreground"
          aria-label="Öppna meny"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-accent border-t border-accent/80 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-link
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-primary-foreground/80 hover:text-primary font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-primary-foreground/10 space-y-2">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/50 font-semibold mb-2">Våra tjänster</p>
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 font-medium ${isCategoryActive(cat.to) ? "text-primary" : "text-primary-foreground/80 hover:text-primary"}`}
              >
                <cat.icon className="w-4 h-4" /> {cat.label}
              </Link>
            ))}
          </div>
          <a
            href="#radgivning"
            onClick={(e) => handleNavClick(e, "#radgivning")}
            className="flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-md text-sm font-semibold w-fit hover:animate-subtle-pulse"
          >
            <MessageCircle className="w-4 h-4" />
            Fri rådgivning
          </a>
          <a
            href="tel:0701543639"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold w-fit hover:animate-subtle-pulse"
          >
            <Phone className="w-4 h-4" />
            Ring oss
          </a>
        </div>
      )}

      {/* Category bar — always visible */}
      <div className="hidden md:block border-t border-primary-foreground/10 bg-accent/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-1 overflow-x-auto" aria-label="Tjänstekategorier">
            {categories.map((cat) => {
              const active = isCategoryActive(cat.to);
              return (
                <Link
                  key={cat.to}
                  to={cat.to}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? "text-primary border-primary"
                      : "text-primary-foreground/70 border-transparent hover:text-primary hover:border-primary/40"
                  }`}
                >
                  <cat.icon className="w-4 h-4" /> {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
