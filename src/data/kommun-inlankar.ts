/**
 * Gren 200 (länkhierarkin, Marknadschefens beställning 2026-10-24, Innehålls `innehall/lankhierarki-2026-10-24.md`): de 78 länkar till kommunernas ägarsidor som saknades i dag, som en mening per länk på ortssidan.
 * Meningarna är ordagrant de två godkända mönstren (M1 "Mer om kommunen finns på sidan om [takläggare i X](/taklaggare-x)." och M2 "Mer om grannorten finns på sidan om …"), med ankartexten "takläggare i <kommun>"
 * ("på" för Lidingö och Värmdö). Länkarna byggs i koden, inte i briefarna. Delas av LocationPage.tsx (React) och scripts/prerender-content.ts (serverns HTML). Startsidan ingår inte (spärrad text, förslag till Vidar).
 * Bara relativa importer.
 */
export const KOMMUN_INLANKAR: Record<string, readonly string[]> = {
  "vallentuna": [
    "Mer om grannorten finns på sidan om [takläggare i Norrtälje](/taklaggare-norrtalje).",
    "Mer om grannorten finns på sidan om [takläggare i Åkersberga](/taklaggare-akersberga).",
    "Mer om grannorten finns på sidan om [takläggare i Täby](/taklaggare-taby).",
    "Mer om grannorten finns på sidan om [takläggare i Upplands Väsby](/taklaggare-upplands-vasby).",
    "Mer om grannorten finns på sidan om [takläggare i Sigtuna](/taklaggare-sigtuna)."
  ],
  "akersberga": [
    "Mer om grannorten finns på sidan om [takläggare i Norrtälje](/taklaggare-norrtalje).",
    "Mer om grannorten finns på sidan om [takläggare i Vallentuna](/taklaggare-vallentuna).",
    "Mer om grannorten finns på sidan om [takläggare i Vaxholm](/taklaggare-vaxholm)."
  ],
  "vaddo": [
    "Mer om kommunen finns på sidan om [takläggare i Norrtälje](/taklaggare-norrtalje)."
  ],
  "vaxholm": [
    "Mer om grannorten finns på sidan om [takläggare i Åkersberga](/taklaggare-akersberga).",
    "Mer om grannorten finns på sidan om [takläggare på Värmdö](/taklaggare-varmdo)."
  ],
  "ljustero": [
    "Mer om kommunen finns på sidan om [takläggare i Åkersberga](/taklaggare-akersberga)."
  ],
  "taby": [
    "Mer om grannorten finns på sidan om [takläggare i Vallentuna](/taklaggare-vallentuna).",
    "Mer om grannorten finns på sidan om [takläggare i Danderyd](/taklaggare-danderyd).",
    "Mer om grannorten finns på sidan om [takläggare i Sollentuna](/taklaggare-sollentuna)."
  ],
  "lindholmen": [
    "Mer om kommunen finns på sidan om [takläggare i Vallentuna](/taklaggare-vallentuna)."
  ],
  "danderyd": [
    "Mer om grannorten finns på sidan om [takläggare i Täby](/taklaggare-taby).",
    "Mer om grannorten finns på sidan om [takläggare på Lidingö](/taklaggare-lidingo).",
    "Mer om grannorten finns på sidan om [takläggare i Solna](/taklaggare-solna)."
  ],
  "ella-gard": [
    "Mer om kommunen finns på sidan om [takläggare i Täby](/taklaggare-taby)."
  ],
  "sollentuna": [
    "Mer om grannorten finns på sidan om [takläggare i Danderyd](/taklaggare-danderyd).",
    "Mer om grannorten finns på sidan om [takläggare i Solna](/taklaggare-solna).",
    "Mer om grannorten finns på sidan om [takläggare i Upplands Väsby](/taklaggare-upplands-vasby).",
    "Mer om grannorten finns på sidan om [takläggare i Järfälla](/taklaggare-jarfalla)."
  ],
  "nora-kevinge": [
    "Mer om kommunen finns på sidan om [takläggare i Danderyd](/taklaggare-danderyd)."
  ],
  "varmdo": [
    "Mer om grannorten finns på sidan om [takläggare i Vaxholm](/taklaggare-vaxholm).",
    "Mer om grannorten finns på sidan om [takläggare i Nacka](/taklaggare-nacka)."
  ],
  "resaro": [
    "Mer om kommunen finns på sidan om [takläggare i Vaxholm](/taklaggare-vaxholm)."
  ],
  "rindo": [
    "Mer om kommunen finns på sidan om [takläggare i Vaxholm](/taklaggare-vaxholm)."
  ],
  "stockholm": [
    "Mer om grannorten finns på sidan om [takläggare på Lidingö](/taklaggare-lidingo).",
    "Mer om grannorten finns på sidan om [takläggare i Solna](/taklaggare-solna)."
  ],
  "skarsatra": [
    "Mer om kommunen finns på sidan om [takläggare på Lidingö](/taklaggare-lidingo)."
  ],
  "bo-rudboda": [
    "Mer om kommunen finns på sidan om [takläggare på Lidingö](/taklaggare-lidingo)."
  ],
  "solna": [
    "Mer om grannorten finns på sidan om [takläggare i Stockholm](/taklaggare-stockholm).",
    "Mer om grannorten finns på sidan om [takläggare i Sundbyberg](/taklaggare-sundbyberg)."
  ],
  "nacka": [
    "Mer om grannorten finns på sidan om [takläggare i Stockholm](/taklaggare-stockholm).",
    "Mer om grannorten finns på sidan om [takläggare på Värmdö](/taklaggare-varmdo).",
    "Mer om grannorten finns på sidan om [takläggare i Tyresö](/taklaggare-tyreso)."
  ],
  "alvsjo": [
    "Mer om kommunen finns på sidan om [takläggare i Stockholm](/taklaggare-stockholm)."
  ],
  "sundbyberg": [
    "Mer om grannorten finns på sidan om [takläggare i Solna](/taklaggare-solna)."
  ],
  "jarfalla": [
    "Mer om grannorten finns på sidan om [takläggare i Sundbyberg](/taklaggare-sundbyberg).",
    "Mer om grannorten finns på sidan om [takläggare i Upplands-Bro](/taklaggare-bro)."
  ],
  "duvbo": [
    "Mer om kommunen finns på sidan om [takläggare i Sundbyberg](/taklaggare-sundbyberg)."
  ],
  "ursvik": [
    "Mer om kommunen finns på sidan om [takläggare i Sundbyberg](/taklaggare-sundbyberg)."
  ],
  "upplands-vasby": [
    "Mer om grannorten finns på sidan om [takläggare i Sollentuna](/taklaggare-sollentuna).",
    "Mer om grannorten finns på sidan om [takläggare i Sigtuna](/taklaggare-sigtuna)."
  ],
  "sjoberg": [
    "Mer om kommunen finns på sidan om [takläggare i Sollentuna](/taklaggare-sollentuna)."
  ],
  "sigtuna": [
    "Mer om grannorten finns på sidan om [takläggare i Upplands Väsby](/taklaggare-upplands-vasby).",
    "Mer om grannorten finns på sidan om [takläggare i Upplands-Bro](/taklaggare-bro)."
  ],
  "bollstanas": [
    "Mer om kommunen finns på sidan om [takläggare i Upplands Väsby](/taklaggare-upplands-vasby)."
  ],
  "bro": [
    "Mer om grannorten finns på sidan om [takläggare i Järfälla](/taklaggare-jarfalla).",
    "Mer om grannorten finns på sidan om [takläggare i Ekerö](/taklaggare-ekero)."
  ],
  "barkarby": [
    "Mer om kommunen finns på sidan om [takläggare i Järfälla](/taklaggare-jarfalla)."
  ],
  "jakobsberg": [
    "Mer om kommunen finns på sidan om [takläggare i Järfälla](/taklaggare-jarfalla)."
  ],
  "tyreso": [
    "Mer om grannorten finns på sidan om [takläggare i Nacka](/taklaggare-nacka).",
    "Mer om grannorten finns på sidan om [takläggare i Haninge](/taklaggare-haninge)."
  ],
  "saltsjo-boo": [
    "Mer om kommunen finns på sidan om [takläggare i Nacka](/taklaggare-nacka)."
  ],
  "alta": [
    "Mer om kommunen finns på sidan om [takläggare i Nacka](/taklaggare-nacka)."
  ],
  "botkyrka": [
    "Mer om grannorten finns på sidan om [takläggare i Huddinge](/taklaggare-huddinge).",
    "Mer om grannorten finns på sidan om [takläggare i Ekerö](/taklaggare-ekero)."
  ],
  "haninge": [
    "Mer om grannorten finns på sidan om [takläggare i Huddinge](/taklaggare-huddinge).",
    "Mer om grannorten finns på sidan om [takläggare i Tyresö](/taklaggare-tyreso).",
    "Mer om grannorten finns på sidan om [takläggare i Nynäshamn](/taklaggare-nynashamn)."
  ],
  "marsta": [
    "Mer om kommunen finns på sidan om [takläggare i Sigtuna](/taklaggare-sigtuna)."
  ],
  "ekero": [
    "Mer om grannorten finns på sidan om [takläggare i Upplands-Bro](/taklaggare-bro).",
    "Mer om grannorten finns på sidan om [takläggare i Botkyrka](/taklaggare-botkyrka)."
  ],
  "alvsala": [
    "Mer om kommunen finns på sidan om [takläggare på Värmdö](/taklaggare-varmdo)."
  ],
  "djuro": [
    "Mer om kommunen finns på sidan om [takläggare på Värmdö](/taklaggare-varmdo)."
  ],
  "nynashamn": [
    "Mer om grannorten finns på sidan om [takläggare i Haninge](/taklaggare-haninge)."
  ],
  "dalaro": [
    "Mer om kommunen finns på sidan om [takläggare i Haninge](/taklaggare-haninge)."
  ],
  "fardala": [
    "Mer om kommunen finns på sidan om [takläggare i Tyresö](/taklaggare-tyreso)."
  ],
  "krusboda": [
    "Mer om kommunen finns på sidan om [takläggare i Tyresö](/taklaggare-tyreso)."
  ],
  "huddinge": [
    "Mer om grannorten finns på sidan om [takläggare i Botkyrka](/taklaggare-botkyrka)."
  ],
  "tullinge": [
    "Mer om kommunen finns på sidan om [takläggare i Botkyrka](/taklaggare-botkyrka)."
  ],
  "alvnas": [
    "Mer om kommunen finns på sidan om [takläggare i Ekerö](/taklaggare-ekero)."
  ],
  "trakvista": [
    "Mer om kommunen finns på sidan om [takläggare i Ekerö](/taklaggare-ekero)."
  ],
  "sodertalje": [
    "Mer om grannorten finns på sidan om [takläggare i Nynäshamn](/taklaggare-nynashamn)."
  ]
};

/** Meningarna för en ortssida som en löpande text med markdown-länkar (tomt när sidan inte har några). */
export const kommunInlankarMd = (slug: string): string => (KOMMUN_INLANKAR[slug] ?? []).join(" ");
