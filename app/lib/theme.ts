/** Brand and WCAG AA contrast-safe color tokens for the Billion Animal Project site. */
export const colors = {
  // Brand
  cream: "#f7f3ec",
  navy: "#0b1f3a",
  blue: "#0057ff",
  teal: "#00a896",
  paleBlue: "#e8f2ff",

  /** Decorative brand slate. Do not use for body copy on cream. */
  slate: "#6b8fae",

  /** Body secondary on cream. Contrast is >=4.5:1 vs #f7f3ec. */
  inkMuted: "#3f5d78",

  /** Primary readable text on dark / navy gradients. */
  textOnDark: "#f7f3ec",
  /** Body secondary on dark. */
  textOnDarkMuted: "#d5dce6",
  /** Eyebrows / labels on dark. */
  textOnDarkSoft: "#b8c4d4",
  /** Sources and meta on dark. Contrast remains >=4.5:1 vs #090f1a. */
  textOnDarkMeta: "#9aabbd",

  /** Zoonotic diagram background. */
  darkBg: "#090f1a",
} as const;

export type ThemeColors = typeof colors;

/**
 * The dark surfaces. One place, so the palette can be retuned without
 * hunting inline styles across four components.
 *
 * Variant A ("mineral"): navy -> slate -> OpenVet mineral blue -> electric
 * blue. No green.
 */
export const gradients = {
  /** Hero. Steepest range, the page's first impression. */
  hero: "linear-gradient(155deg, #060E22 0%, #1B2E52 40%, #4F7180 74%, #0057ff 100%)",
  /** Billion -> one scroll story. */
  storyBase: "#060E22",
  story:
    "linear-gradient(155deg, #060E22 0%, #0b1f3a 40%, #35506B 72%, #0057ff 130%)",
  /** "Be part of it" form. */
  join: "linear-gradient(135deg, #060E22 0%, #24405F 50%, #0057ff 100%)",
  /** Sticky species tray. */
  tray: "linear-gradient(135deg, #060E22, #0b1f3a 60%, #0057ff)",
} as const;
