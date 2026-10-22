/**
 * Gren 190 (Innehålls efterläsning 300): den automatiska länkningen i löpande text (styckenMedLankar) satte länkar mitt i ord ("vid <a>Alby</a>sjön", "<a>Söderby</a>malm"). Länktexten ska stå på hel ordgräns.
 * Före (bygget av 96f703e, sökning över alla byggda sidor): 6 träffar på 6 sidor: taklaggare-fittja (Albysjön), taklaggare-handen (Söderbymalm), taklaggare-vaddo (Älmstabron),
 * takrenovering-botkyrka (Albysjön), taktvatt-danderyd (Djursholms) och taktvatt-nacka (Saltsjöbadens).
 */
import { describe, expect, it } from "vitest";
import { styckenMedLankar } from "../../scripts/prerender-content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

describe("gren 190: länkar på hel ordgräns", () => {
  it("länkar inte inuti ett ord, men väl en hel förekomst längre fram i texten", () => {
    const ut = styckenMedLankar(["Ett radhus vid Albysjön och ett hus i Alby.", "Mer om Södermalm."], [{ href: "/taklaggare-alby", label: "Alby" }, { href: "/taklaggare-handen", label: "Söderby" }], esc);
    expect(ut[0]).toBe('Ett radhus vid Albysjön och ett hus i <a href="/taklaggare-alby">Alby</a>.');
    expect(ut.join(" ")).not.toContain(">Söderby<");
  });
  it("länkar på ordgräns vid skiljetecken och i början och slutet av stycket", () => {
    const ut = styckenMedLankar(["Täby, Danderyd och Vallentuna.", "Vaxholm"], [{ href: "/taklaggare-taby", label: "Täby" }, { href: "/taklaggare-danderyd", label: "Danderyd" }, { href: "/taklaggare-vaxholm", label: "Vaxholm" }], esc);
    expect(ut[0]).toBe('<a href="/taklaggare-taby">Täby</a>, <a href="/taklaggare-danderyd">Danderyd</a> och Vallentuna.');
    expect(ut[1]).toBe('<a href="/taklaggare-vaxholm">Vaxholm</a>');
  });
  it("etiketter med tecken som är särskilda i reguljära uttryck (parentes, punkt) fungerar", () => {
    const ut = styckenMedLankar(["Plåttak (TP20) och takpapp."], [{ href: "/material/tp20-plattak", label: "TP20" }], esc);
    expect(ut[0]).toBe('Plåttak (<a href="/material/tp20-plattak">TP20</a>) och takpapp.');
  });
});
