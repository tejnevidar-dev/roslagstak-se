/**
 * Länkar till /takkontroll från sidor utan eget takkontrollformulär landar vid formuläret (#forfragan) i stället
 * för överst på sidan. Texten i länkarna och adressen i den statiska HTML:en är oförändrade (en länk utan ankare,
 * samma adress för sökmotorer): ankaret läggs på vid klick i webbläsaren, se components/TakkontrollAnkare.tsx.
 */
const SIDOR_MED_EGET_FORMULAR = ["/takkontroll", "/boka-takkontroll"];

export const ankareMal = (href: string | null, pathname: string): string | null => {
  if (href !== "/takkontroll") return null;
  if (SIDOR_MED_EGET_FORMULAR.includes(pathname) || pathname.startsWith("/offert/")) return null;
  return "/takkontroll#forfragan";
};
