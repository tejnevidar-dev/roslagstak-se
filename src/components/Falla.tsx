import { FALLA_FALT } from "../../functions/api/forfragan";

/** Dold fältfälla mot bottar: människor ser och fyller aldrig i fältet (utanför bild, utan tangentbordsfokus, dolt för skärmläsare). Läses av skickaForfragan. */
const Falla = () => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Lämna tomt
      <input type="text" name={FALLA_FALT} tabIndex={-1} autoComplete="off" defaultValue="" />
    </label>
  </div>
);

export default Falla;
