import type { SVGProps } from "react";

/* Egna takrelaterade linjeikoner — ritade i samma 24-rutnät, 1.25px linje,
   raka hörn och samma taklutning (30°) så att hela serien hänger ihop. */

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/** Takomläggning — nytt taktäckningsskikt läggs över takstolarna. */
export const IconRoofNew = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2 12 12 4l10 8" />
    <path d="M4.6 14.1 12 8.3l7.4 5.8" />
    <path d="M7.2 16.2 12 12.6l4.8 3.6" />
    <path d="M4 19h16" />
  </svg>
);

/** Takrenovering — punktinsats på befintligt tak. */
export const IconRoofRepair = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2 13 12 5l10 8" />
    <path d="M5 19h14" />
    <path d="M9.4 15.6h5.2v3.4H9.4z" />
    <path d="M12 9.4v2.4" />
  </svg>
);

/** Takavvattning — hängränna och stuprör. */
export const IconGutter = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 11 12 4.5 20 11" />
    <path d="M3 13h18" />
    <path d="M3 13v2.2h18V13" />
    <path d="M18.4 15.2V21" />
    <path d="M18.4 21h2.6" />
  </svg>
);

/** Takkupa / takfönster — ljusinsläpp i takfallet. */
export const IconDormer = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2 14 12 5.5 22 14" />
    <path d="M4 19h16" />
    <path d="M8.2 19v-5.4l3-2.4 3 2.4V19" />
    <path d="M11.2 14.6h2.1" />
  </svg>
);

/** Takinspektion — besiktning med lupp. */
export const IconInspection = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 12.4 12 5l6 4.7" />
    <path d="M4.6 19h9.2" />
    <circle cx="17" cy="15" r="3.6" />
    <path d="M19.7 17.7 22 20" />
  </svg>
);

/** Plåtarbeten — falsad plåt med beslag. */
export const IconSheetMetal = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 19 8.2 5h2.1L5.1 19z" />
    <path d="M9.9 19 15.1 5h2.1L12 19z" />
    <path d="M16.8 19 21 5" />
  </svg>
);

/** Takvård — tvätt och behandling av taket. */
export const IconRoofCare = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 12.6 12 5l9 7.6" />
    <path d="M5.4 19h13.2" />
    <path d="M9 9.6v2.2" />
    <path d="M12.4 11.4v2.2" />
    <path d="M15.8 9.6v2.2" />
  </svg>
);

/** Eternit & asbest — märkt farligt material. */
export const IconAsbestos = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 4.4 21.2 19H2.8z" />
    <path d="M12 9.6v4" />
    <path d="M12 16.1h.01" />
  </svg>
);
