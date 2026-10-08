/**
 * /taktypers texter (RoofTypes.tsx, IslandSpecialist.tsx, RoofTypesPage.tsx): delas av sidan (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AD4). Ändra texten här.
 * Sidans H1 och hero-text (PageHero) rörs inte.
 */
export const ROOF_TYPES_HEADING = { meta: "Materialbibliotek", titleA: "Taktyper —", titleB: "material och pris" };
export const ROOF_TYPES_INTRO = {
  before: "Öppna en taktyp för att läsa mer om materialet. ",
  link: "Boka kostnadsfri takkontroll",
  after: ". Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
};
export const roofTypesIntroText = () => `${ROOF_TYPES_INTRO.before}${ROOF_TYPES_INTRO.link}${ROOF_TYPES_INTRO.after}`;

/** Materialens namn och meningar, i den ordning korten visas. */
export const ROOF_TYPE_TEXTS: Record<string, { name: string; sentence: string }> = {
  tp20: { name: "TP20-plåttak", sentence: "TP20 är en trapetsprofilerad takplåt. Den är lätt och läggs i långa längder." },
  pannplat: { name: "Pannplåt", sentence: "Pannplåt är takplåt av stål som har pressats så att den ser ut som ett tak av takpannor." },
  dubbelfalsat: {
    name: "Dubbelfalsat plåttak (bandtäckning)",
    sentence:
      "Dubbelfalsat plåttak, även kallat bandtäckning, är den klassiska formen av plåttak: långa plåtbanor som fogas ihop genom att kanterna viks samman, utan en enda synlig skruv genom taket.",
  },
  lertegel: { name: "Lertegel", sentence: "Lertegel är det klassiska tegeltaket: pannor av bränd lera." },
  betongpanne: { name: "Betongpannor", sentence: "Betongpannor är gjutna pannor som ger ett klassiskt pannat tak." },
  papptak: { name: "Papptak", sentence: "Papptak är ett tätt, lätt tak av takpapp och ett av få material som fungerar på riktigt flacka tak." },
};
export const ROOF_TYPE_ORDER = ["tp20", "pannplat", "dubbelfalsat", "lertegel", "betongpanne", "papptak"];

export const ROOF_PRICE_HEADING = "Vad kostar takbyte?";
/** Stycket under korten; ställningsmeningen och ROT-förbehållet kommer ur prices.ts. */
export const roofPriceText = (stallning: string, rotForbehall: string) =>
  `Riktpriserna är efter ROT-avdrag och inkl. moms och gäller material och arbete. ${stallning} Exakt pris beror på takets storlek, lutning och underlagets skick. Du får ett fast pris i offerten efter en kostnadsfri takkontroll. ${rotForbehall}`;

export const ISLAND_TEXT = {
  eyebrow: "Skärgården",
  heading: "Tak i skärgården",
  highlights: [
    { title: "Uppdrag i skärgården", description: "Vi tar uppdrag i Roslagen och Storstockholm." },
    { title: "Riktiga jobb", description: "Vi har gjort kompletta takbyten på Blidö och Singö i Norrtälje kommun. Båda finns med bilder under Projekt." },
    { title: "Fast pris", description: "Du får ett fast pris i offerten. Vi lämnar 10 års utförandegaranti på det arbete vi utför." },
  ],
  note: "Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.",
};

export const ROOF_TYPES_PAGE = { eyebrow: "Taktyper", relatedTitle: "Mer om tak och pris" };
