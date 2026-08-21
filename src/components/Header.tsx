import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/roslagstak-logo.png";
import logoWhite from "@/assets/roslagstak-logo-white.png";

type MenuItem = { label: string; to?: string; href?: string; note?: string };

const serviceItems: MenuItem[] = [
  { label: "Takomläggning", to: "/tjanster/takomlaggning" },
  { label: "Takrenovering", to: "/tjanster/takrenovering" },
  { label: "Takavvattning", to: "/tjanster/takavvattning" },
  { label: "Takkupor & fönster", to: "/tjanster/takkupor" },
  { label: "Takinspektion", to: "/tjanster/takinspektion" },
  { label: "Plåtarbeten", to: "/tjanster/platarbeten" },
  { label: "Takvård & taktvätt", to: "/tjanster/takvard" },
  { label: "Eternit & asbestsanering", to: "/tjanster/eternit-asbest" },
];

const roofTypeItems: MenuItem[] = [
  { label: "TP20 Plåttak", href: "#taktyper" },
  { label: "Tegelplåttak", href: "#taktyper" },
  { label: "Pannplåttak", href: "#taktyper" },
  { label: "Dubbelfalsat (bandtäckning)", href: "#taktyper" },
  { label: "Lertegeltak", href: "#taktyper" },
  { label: "Betongpannetak", href: "#taktyper" },
  { label: "Glaserade pannor", href: "#taktyper" },
  { label: "Papptak (ytpapp)", href: "#taktyper" },
];

const quoteItems: MenuItem[] = [
  {
    label: "Kostnadsfri konsultation",
    href: "#radgivning",
    note: "Vi ringer upp och bokar besiktning",
  },
  {
    label: "Konfigurera själv",
    href: "#offert",
    note: "Räkna fram din offert direkt",
  },
];

const navLinks: { href: string; label: string; items?: MenuItem[]; wide?: boolean }[] = [
  { href: "#tjanster", label: "Tjänster", items: serviceItems, wide: true },
  { href: "#taktyper", label: "Taktyper", items: roofTypeItems, wide: true },
  { href: "#hur-det-gar-till", label: "Så går det till" },
  { href: "#offert", label: "Få offert", items: quoteItems },
  { href: "#om-oss", label: "Om oss" },
  { href: "#kontakt", label: "Kontakt" },
];

export interface Crumb {
  label: string;
  to?: string;
}

const Header = ({ breadcrumb }: { breadcrumb?: Crumb[] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
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

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const openDropdown = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setOpenMenu(null);

    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={`${onHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        overlay
          ? "bg-transparent text-primary-foreground"
          : "bg-background/90 text-foreground shadow-[0_1px_0_0_hsl(var(--border)),0_10px_30px_-24px_hsl(var(--primary)/0.5)] backdrop-blur-xl"
      }`}
    >
      {/* Nästan osynlig fade så headern smälter in i heron (himlen till höger, navy till vänster) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[190%] bg-gradient-to-b from-primary/35 via-primary/10 to-transparent transition-opacity duration-700 ${
          overlay ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-500 ${
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
            const hasMenu = Boolean(link.items);
            const isOpen = openMenu === link.label;
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={hasMenu ? () => openDropdown(link.label) : undefined}
                onMouseLeave={hasMenu ? scheduleClose : undefined}
              >
                <a
                  href={link.href}
                  data-nav-link
                  aria-current={isActive ? "true" : undefined}
                  aria-expanded={hasMenu ? isOpen : undefined}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onFocus={hasMenu ? () => openDropdown(link.label) : undefined}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 text-[14.5px] font-semibold tracking-tight transition-colors ${
                    overlay
                      ? "text-primary-foreground/70 hover:text-primary-foreground"
                      : "text-foreground/65 hover:text-foreground"
                  } ${isActive ? (overlay ? "text-primary-foreground" : "text-primary") : ""}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className={`absolute inset-0 -z-10 ${
                        overlay ? "bg-primary-foreground/10" : "bg-primary/[0.07]"
                      }`}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                  {hasMenu && (
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-seafoam transition-transform duration-300 ${
                      isActive || isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>

                <AnimatePresence>
                  {hasMenu && isOpen && (
                    <motion.div
                      initial={reduce ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute left-0 top-full z-50 pt-3 ${link.wide ? "w-[22rem]" : "w-[19rem]"}`}
                    >
                      <div className="border-t-2 border-seafoam bg-primary p-2 text-primary-foreground shadow-[0_28px_60px_-28px_hsl(var(--primary)/0.6)]">
                        <ul className={link.wide ? "grid grid-cols-1" : ""}>
                          {link.items!.map((item) => {
                            const inner = (
                              <>
                                <span className="flex-1">
                                  <span className="block text-[14px] font-semibold leading-snug">
                                    {item.label}
                                  </span>
                                  {item.note && (
                                    <span className="mt-0.5 block text-[12px] leading-snug text-primary-foreground/55">
                                      {item.note}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-seafoam-light transition-transform group-hover/item:translate-x-1"
                                  aria-hidden="true"
                                />
                              </>
                            );
                            const cls =
                              "group/item flex items-start gap-3 px-4 py-3 transition-colors hover:bg-primary-foreground/[0.08]";
                            return (
                              <li key={item.label}>
                                {item.to ? (
                                  <Link to={item.to} onClick={() => setOpenMenu(null)} className={cls}>
                                    {inner}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    data-nav-link
                                    onClick={(e) => handleNavClick(e, item.href!)}
                                    className={cls}
                                  >
                                    {inner}
                                  </a>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

      {/* Brödsmulor — visas i headern på undersidor */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav
          aria-label="Brödsmulor"
          className="relative border-t border-border/70 bg-secondary/40"
        >
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {breadcrumb.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-muted-foreground/50">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-seafoam">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-seafoam">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Läsprogress */}
      <div
        aria-hidden="true"
        className={`relative h-[2px] w-full origin-left bg-seafoam transition-opacity duration-300 ${
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
            className="relative max-h-[80vh] overflow-y-auto border-t border-primary-foreground/10 bg-primary px-6 py-6 text-primary-foreground lg:hidden"
          >
            {navLinks.map((link, i) => (
              <div key={link.href}>
                <motion.a
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
                {link.items && (
                  <ul className="mb-2 mt-2 grid gap-1 pl-9">
                    {link.items.map((item) => (
                      <li key={item.label}>
                        {item.to ? (
                          <Link
                            to={item.to}
                            onClick={() => setMenuOpen(false)}
                            className="block py-1.5 text-[14px] text-primary-foreground/70"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            data-nav-link
                            onClick={(e) => handleNavClick(e, item.href!)}
                            className="block py-1.5 text-[14px] text-primary-foreground/70"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
