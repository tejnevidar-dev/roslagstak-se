/**
 * Text i en ortssidas extraSections kan innehålla radbrytningar (paket 72): rader som börjar med "- " blir en punktlista, rader som börjar med "1. " en numrerad lista, övriga rader egna stycken.
 * En text utan radbrytning är ett enda stycke, precis som förut (de flesta sidors texter har inga radbrytningar och är oförändrade). Delas av LocationPage.tsx och scripts/prerender-content.ts.
 */
export type SektionsBit = { typ: "p"; text: string } | { typ: "ul" | "ol"; rader: string[] };

export const sektionsBitar = (text: string): SektionsBit[] => {
  if (!text.includes("\n")) return [{ typ: "p", text }];
  const ut: SektionsBit[] = [];
  for (const rad of text.split("\n").map((r) => r.trim()).filter(Boolean)) {
    const ul = rad.match(/^-\s+(.*)$/);
    const ol = rad.match(/^\d+\.\s+(.*)$/);
    const typ = ul ? "ul" : ol ? "ol" : "p";
    const innehall = ul ? ul[1] : ol ? ol[1] : rad;
    const sista = ut[ut.length - 1];
    if (typ === "p") ut.push({ typ: "p", text: innehall });
    else if (sista && sista.typ === typ) sista.rader.push(innehall);
    else ut.push({ typ, rader: [innehall] });
  }
  return ut;
};

/**
 * Raderna som egna stycken i den statiska HTML:en, med listtecknet kvar ("- " eller "1. "), som i den löpande text sidorna hade förut och som briefens meningar har: meningsgrinden
 * (content-coverage-check.ts) jämför briefens rader ordagrant. En text utan radbrytning är ett stycke, som förut.
 */
export const sektionsStycken = (text: string): string[] =>
  sektionsBitar(text).flatMap((b) => (b.typ === "p" ? [b.text] : b.rader.map((r, i) => (b.typ === "ul" ? `- ${r}` : `${i + 1}. ${r}`))));
