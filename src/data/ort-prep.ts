/**
 * Prepositionen i sidtexter och länktexter för en ort: "på" för öar (isIsland) och för orter som sajten kallar "på" (Brevikshalvön, Södermalm, Värmdö), annars "i".
 * En halvö är ingen ö: den får inte ö-innehållet som isIsland styr ("Läge: Ö i skärgården", skärgårdsmeningen), därför en egen lista här.
 * EN regel för React och statisk HTML. Bara relativa importer.
 */
/** Gren 170 (L4, Marknadschefens ja 2026-10-21 22:31): Södermalm och Värmdö heter "på", som sajten och titeln redan sa på Värmdö; Väddö och Svartnö (170b) likaså. */
export const PA_HALVOAR: readonly string[] = ["brevikshalvon", "sodermalm", "varmdo", "vaddo", "svartno"];

export const ortPrep = (l: { slug: string; isIsland?: boolean }): "på" | "i" => (l.isIsland || PA_HALVOAR.includes(l.slug) ? "på" : "i");
