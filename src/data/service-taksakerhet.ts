/**
 * Tjänstesidan /tjanster/taksakerhet (takstege, gångbrygga, snörasskydd). Texten är Innehålls underlag l
 * (ledning/marknad/innehall/guidetexter/l-underlag-tjanstesida-taksakerhet.md): Marknadschefens Grind-rad och juristens
 * ändringar (T1–T4) är inlagda. Inga lagkrav, BBR, Arbetsmiljöverket, mått eller monteringsdetaljer
 * (juristens besked 2026-10-05, ledning/jurist/kostnadsguide-taksakerhet-granskning.md avsnitt 3).
 * Läses av service-page.ts (meta och detaljer) och service-blocks.ts (SEO-huvud, faktakort, specialblock).
 * Bara relativa importer.
 */
import { GARANTI_UTFORANDE } from "./guarantee";
import { beloppLopande } from "./prices";

export const TAKSAKERHET_SLUG = "taksakerhet";

export const taksakerhetMeta = {
  accentLine: "med takstege, gångbrygga och snörasskydd.",
  specs: [
    { k: "Takkontroll", v: "Kostnadsfri" },
    { k: "Pris", v: "Fast i offerten" },
    { k: "Utförande", v: "AMA-standard" },
  ],
  specHeading: "I samband med takbyte eller för sig",
  lead: "Byter du tak är det enklast att montera taksäkerheten samtidigt.",
  craftLine: "Takstege, gångbrygga och snörasskydd är egna poster med egna priser.",
  photoNote: "Snörasskydd monterat vid takfoten.",
};

export const taksakerhetDetails = {
  longDesc:
    "Vid ett takbyte sätts fästena medan taket ändå är öppet, och utrustningen står med i samma offert. Taksäkerhet kan också monteras på ett befintligt tak. Vad som passar ditt tak, och hur fästena kan sättas i just din takkonstruktion, ser vi på plats.",
  priceRange: `Riktpris, efter ROT-avdrag och inkl. moms: takstege och gångbrygga ${beloppLopande("Takstege + gångbrygga")}, snörasskydd ${beloppLopande("Snörasskydd")}. Ditt pris står i offerten och är fast.`,
  benefits: [
    "Takstege: en fast stege på taket, från takfoten upp mot nocken eller skorstenen. Den används av den som ska till skorstenen eller upp på taket för att se över det.",
    "Gångbrygga: en fast gångväg på taket, till exempel fram till skorstenen. Kallas också takbrygga.",
    "Snörasskydd: monteras vid takfoten mot entréer och gångvägar, för att minska risken för ras där människor rör sig.",
    "Monteras i samband med ett takbyte eller som ett eget arbete på ett befintligt tak.",
  ],
  process: [
    "Kostnadsfri takkontroll utan förpliktelser: en av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
    "Fast pris i offerten.",
    "Utförande enligt AMA.",
  ],
};

export const taksakerhetBlocks = {
  seoTitle: "Takstege, gångbrygga och snörasskydd i Roslagen",
  seoDescription:
    "Vi monterar takstege, gångbrygga och snörasskydd i Roslagen och Storstockholm, för sig eller vid takbyte. Riktpriser efter ROT-avdrag och fast pris i offerten.",
  blockPlacement: "after-scope" as const,
  factCards: [
    {
      tone: "primary" as const,
      label: "Takkontroll",
      value: "Kostnadsfri",
      text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
    },
    {
      tone: "outline" as const,
      label: "Pris",
      value: "Fast i offerten",
      text: "Takstege, gångbrygga och snörasskydd är egna poster med egna priser.",
    },
    { tone: "accent" as const, label: "Garanti", value: "10 år på utförandet", text: GARANTI_UTFORANDE },
  ],
  block: {
    kind: "checklist" as const,
    eyebrow: "Bra att veta",
    heading: "Regler och vanliga frågor",
    intro: "Vilka krav som gäller för ditt hus beror på huset, på när det byggdes och på vad som ska göras.",
    groups: [
      {
        title: "Vilka krav gäller för mitt hus?",
        items: [
          "Det finns regler om taksäkerhet i Boverkets byggregler. De gäller i första hand när ett hus byggs eller ändras. Vad som gäller för ditt hus avgör kommunens byggnadsnämnd.",
          "Har din sotare eller ditt försäkringsbolag ställt krav på utrustning är det deras besked som gäller. Berätta vad de har sagt när du hör av dig, så utgår vi från det.",
        ],
      },
      {
        title: "Vanliga frågor",
        items: [
          "Kan ni montera snörasskydd utan att byta tak? Ja. Taksäkerhet kan monteras på ett befintligt tak. Hur det görs på ditt tak ser vi vid takkontrollen.",
          "Ingår taksäkerhet i ett takbyte? Det står i offerten. Takstege, gångbrygga och snörasskydd är egna poster med egna priser.",
          "Min sotare kräver takstege. Kan ni hjälpa till? Ja. Berätta vad sotaren har sagt, så utgår vi från det när vi tittar på taket.",
        ],
      },
    ],
  },
  relatedLinks: [
    { to: "/blogg/snorasskydd-tak-krav-placering-pris", label: "Snörasskydd: modeller, montering och pris" },
    { to: "/blogg/takstege-takbrygga-sakerhet", label: "Takstege och gångbrygga: vad de är och när de monteras" },
    { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    { to: "/priser", label: "Riktpriser" },
    { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
  ],
};
