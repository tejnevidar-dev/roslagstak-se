import { useState } from "react";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "@/assets/roslagstak-logo-white.png.asset.json";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: "#tjanster", label: "Tjänster" },
    { href: "#taktyper", label: "Taktyper" },
    { href: "#offert", label: "Få offert" },
    { href: "#om-oss", label: "Om oss" },
    { href: "#projekt", label: "Projekt" },
    { href: "#kontakt", label: "Kontakt" },
  ];

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
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="flex items-center shrink-0"
          aria-label="RoslagsTak — till startsidan"
        >
          <img
            src={logoWhite.url}
            alt="RoslagsTak logotyp"
            width={1437}
            height={535}
            className="h-9 md:h-11 w-auto"
          />
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
    </header>
  );
};

export default Header;
