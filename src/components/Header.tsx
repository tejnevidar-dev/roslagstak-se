import { useEffect, useState } from "react";
import { Phone, Menu, X, Mail, MapPin, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/roslagstak-logo.png";
import logoWhite from "@/assets/roslagstak-logo-white.png";

const navLinks = [
  { href: "#tjanster", label: "Tjänster" },
  { href: "#taktyper", label: "Taktyper" },
  { href: "#hur-det-gar-till", label: "Så går det till" },
  { href: "#offert", label: "Få offert" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#kontakt", label: "Kontakt" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();

  const onHome = location.pathname === "/";
  /* Transparent, ljus header ovanpå den mörka heron — solid när man scrollat */
  const overlay = onHome && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Markera aktuell sektion i navigationen */
  useEffect(() => {
    if (!onHome) return;
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive("#" + visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        overlay
          ? "bg-primary text-primary-foreground"
          : "bg-background/95 text-foreground shadow-[0_1px_0_0_hsl(var(--border))] backdrop-blur-md"
      }`}
    >
      {/* Utility bar — direktkontakt */}
      <div
        className={`hidden overflow-hidden transition-all duration-500 md:block ${
          overlay ? "max-h-12 bg-accent" : "max-h-0 md:max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[12.5px] text-primary-foreground/80">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Takläggare i Roslagen — Norrtälje, Blidö, Ljusterö, Vaxholm
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:info@roslagstak.se" className="flex items-center gap-2 hover:text-primary-foreground">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> info@roslagstak.se
            </a>
            <a href="tel:0701543639" className="flex items-center gap-2 font-semibold text-primary-foreground">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> 070-154 36 39
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-500 ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="flex shrink-0 items-center"
          aria-label="RoslagsTak — till startsidan"
        >
          <img
            src={overlay ? logoWhite : logo}
            alt="RoslagsTak logotyp"
            width={1437}
            height={535}
            className={`w-auto transition-all duration-500 ${scrolled ? "h-8 md:h-9" : "h-9 md:h-11"}`}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Huvudnavigation">
          {navLinks.map((link) => {
            const isActive = onHome && active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                data-nav-link
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`group relative px-3 py-2 text-[14.5px] font-semibold tracking-tight transition-colors ${
                  overlay
                    ? "text-primary-foreground/75 hover:text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                } ${isActive ? (overlay ? "text-primary-foreground" : "text-foreground") : ""}`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-seafoam transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:0701543639"
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors lg:flex ${
              overlay
                ? "text-primary-foreground/85 hover:text-seafoam-light"
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            070-154 36 39
          </a>
          <span
            aria-hidden="true"
            className={`hidden h-6 w-px lg:block ${overlay ? "bg-primary-foreground/25" : "bg-border"}`}
          />
          <a
            href="#offert"
            onClick={(e) => handleNavClick(e, "#offert")}
            className={`group flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors animate-subtle-pulse ${
              overlay
                ? "bg-seafoam text-primary-foreground hover:bg-seafoam-light"
                : "bg-primary text-primary-foreground hover:bg-accent"
            }`}
          >
            Begär offert
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:0701543639"
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold ${
              overlay ? "bg-seafoam text-primary-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ring
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`border p-2.5 transition-colors ${
              overlay ? "border-primary-foreground/30 text-primary-foreground" : "border-border text-foreground"
            }`}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Läsprogress */}
      <div
        aria-hidden="true"
        className={`h-[2px] w-full origin-left bg-seafoam transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? undefined : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-primary-foreground/10 bg-primary px-6 py-6 text-primary-foreground lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                data-nav-link
                initial={reduce ? undefined : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between border-b border-primary-foreground/10 py-4 text-lg font-bold tracking-tight"
              >
                <span>
                  <span className="mr-3 text-[11px] font-bold text-seafoam-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-seafoam-light" aria-hidden="true" />
              </motion.a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#offert"
                onClick={(e) => handleNavClick(e, "#offert")}
                className="flex items-center justify-center gap-2 bg-seafoam px-5 py-4 text-base font-semibold text-primary-foreground animate-subtle-pulse"
              >
                Begär kostnadsfri offert
              </a>
              <a
                href="tel:0701543639"
                className="flex items-center justify-center gap-2 border border-primary-foreground/25 px-5 py-4 text-base font-semibold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[13px] text-primary-foreground/60">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Norrtälje · Blidö · Ljusterö · Vaxholm
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
