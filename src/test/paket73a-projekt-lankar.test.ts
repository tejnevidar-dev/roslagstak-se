/**
 * Paket 73a ("Norrtälje först", bara länkar, inga ord ändras): de tre projektsidorna länkar "Norrtälje kommun" i sitt första brödtextstycke till /taklaggare-norrtalje.
 * Orden är desamma som förut.
 */
import { describe, expect, it } from "vitest";
import { projectTexts } from "@/data/project-texts";
import { prerenderContent } from "../../scripts/prerender-content";

const MAL = "/taklaggare-norrtalje";

describe("paket 73a: länkar till /taklaggare-norrtalje på projektsidorna", () => {
  it.each([
    ["takrenovering-blido", "Huset ligger i skogen på Blidö i [Norrtälje kommun](" + MAL + "). Uppdraget var ett komplett takbyte"],
    ["takbyte-singo", "Huset ligger på Singö i [Norrtälje kommun](" + MAL + "), med utsikt över fjärden."],
    ["takbyte-grisslehamn", "Huset ligger i Grisslehamn i [Norrtälje kommun](" + MAL + "). Uppdraget var ett komplett takbyte"],
  ])("projektsidan %s: länken ligger på 'Norrtälje kommun' i första brödtextstycket, och bara där", (slug, start) => {
    const p = projectTexts.find((x) => x.slug === slug)!;
    expect(p.description[0]).toContain(start);
    expect(p.description.slice(1).join("\n")).not.toContain(MAL);
    expect(p.summary).not.toContain("](");
    const sida = prerenderContent("/projekt/" + slug)!;
    expect(sida.links.filter((l) => l.href === MAL)).toHaveLength(1);
    expect(sida.paragraphs.join("\n")).toContain(start.split("[").join("").split("](" + MAL + ")").join(""));
  });
});
