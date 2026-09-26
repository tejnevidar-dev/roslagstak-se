/** Söksnippets: titel ≤ 60 tecken (inkl. " | RoslagsTak" där det läggs på) och beskrivning ≤ 160. */
const TITLE_MAX = 60;
const DESC_MAX = 160;
const SUFFIX = " | RoslagsTak";

/** Slutlig titel så som den visas i <title>. */
export const withSuffix = (title: string) =>
  title.length > 47 || title.includes("RoslagsTak") ? title : `${title}${SUFFIX}`;

/** Kapar titeln vid " — "/" | "/": " tills den ryms; kapar aldrig mitt i ett ord. */
export const fitTitle = (title: string): string => {
  let t = title.trim();
  while (withSuffix(t).length > TITLE_MAX) {
    const cut = Math.max(t.lastIndexOf(" — "), t.lastIndexOf(" | "), t.lastIndexOf(": "));
    if (cut > 15) {
      t = t.slice(0, cut).trim();
    } else {
      const words = t.split(" ");
      if (words.length < 3) break;
      t = words.slice(0, -1).join(" ");
    }
  }
  return t;
};

/** Kapar beskrivningen vid närmaste hela mening (eller ord) inom 160 tecken. */
export const fitDescription = (desc: string): string => {
  const d = desc.trim();
  if (d.length <= DESC_MAX) return d;
  const head = d.slice(0, DESC_MAX);
  const sentence = Math.max(head.lastIndexOf(". "), head.lastIndexOf("! "));
  if (sentence > 80) return head.slice(0, sentence + 1);
  const dash = head.lastIndexOf(" — ");
  if (dash > 80) return head.slice(0, dash).replace(/[,;:\s]+$/, "") + ".";
  const comma = head.lastIndexOf(", ");
  if (comma > 80) return head.slice(0, comma) + ".";
  return head.slice(0, head.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + ".";
};
