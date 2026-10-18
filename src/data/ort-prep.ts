/**
 * Prepositionen i sidtexter och länktexter för en ort: "på" för öar (isIsland) och för halvöar som sajten kallar "på" (Brevikshalvön), annars "i".
 * En halvö är ingen ö: den får inte ö-innehållet som isIsland styr ("Läge: Ö i skärgården", skärgårdsmeningen), därför en egen lista här.
 * EN regel för React och statisk HTML. Bara relativa importer.
 */
export const PA_HALVOAR: readonly string[] = ["brevikshalvon"];

export const ortPrep = (l: { slug: string; isIsland?: boolean }): "på" | "i" => (l.isIsland || PA_HALVOAR.includes(l.slug) ? "på" : "i");
