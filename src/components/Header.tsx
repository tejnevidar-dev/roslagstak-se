import { useState } from "react";
import { Phone, Menu, X, Mail, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/roslagstak-logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: "#tjanster", label: "Tjänster" },
    { href: "#taktyper", label: "Taktyper" },
    { href: "#hur-det-gar-till", label: "Så går det till" },
    { href: "#offert", label: "Få offert" },
    { href: "#om-oss", label: "Om oss" },
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b border-border">
      {/* Utility bar — direct contact, alltid synlig */}
      <div className="hidden md:block bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[13px]">
          <p className="flex items-center gap-2 text-accent-foreground/70">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Takläggare i Roslagen — Norrtälje, Blidö, Ljusterö, Vaxholm
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:info@roslagstak.se" className="flex items-center gap-2 text-accent-foreground/80 hover:text-accent-foreground">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> info@roslagstak.se
            </a>
            <a href="tel:0701543639" className="flex items-center gap-2 font-semibold">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> 070-154 36 39
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 md:h-20">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="flex items-center shrink-0"
          aria-label="RoslagsTak — till startsidan"
        >
          <img
            src={logo}
            alt="RoslagsTak logotyp"
            width={1437}
            height={535}
            className="h-9 md:h-11 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Huvudnavigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-link
              onClick={(e) => handleNavClick(e, link.href)}
              className="border-b-2 border-transparent py-1 text-[15px] font-medium text-foreground/75 transition-colors hover:border-primary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#radgivning"
            onClick={(e) => handleNavClick(e, "#radgivning")}
            className="hidden items-center gap-2 border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary lg:flex"
          >
            Fri rådgivning
          </a>
          <a
            href="#offert"
            onClick={(e) => handleNavClick(e, "#offert")}
            className="flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent animate-subtle-pulse"
          >
            Begär offert
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:0701543639"
            className="flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ring
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-border p-2.5 text-foreground"
            aria-label="Öppna meny"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-link
              onClick={(e) => handleNavClick(e, link.href)}
              className="block border-b border-border py-4 text-lg font-medium text-foreground hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#offert"
              onClick={(e) => handleNavClick(e, "#offert")}
              className="flex items-center justify-center gap-2 bg-primary px-5 py-4 text-base font-semibold text-primary-foreground animate-subtle-pulse"
            >
              Begär kostnadsfri offert
            </a>
            <a
              href="#radgivning"
              onClick={(e) => handleNavClick(e, "#radgivning")}
              className="flex items-center justify-center gap-2 border border-border px-5 py-4 text-base font-semibold text-foreground"
            >
              Boka fri rådgivning
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
