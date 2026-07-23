/** Brand + WCAG AA contrast-safe color tokens for the Billion Animal Study site. */
export const colors = {
  // Brand
  cream: "#f7f3ec",
  navy: "#0b1f3a",
  blue: "#0057ff",
  teal: "#00a896",
  paleBlue: "#e8f2ff",

  /** Decorative brand slate — not for body copy on cream. */
  slate: "#6b8fae",

  /** Body secondary on cream — >=4.5:1 vs #f7f3ec. */
  inkMuted: "#3f5d78",

  /** Primary readable text on dark / navy gradients. */
  textOnDark: "#f7f3ec",
  /** Body secondary on dark. */
  textOnDarkMuted: "#d5dce6",
  /** Eyebrows / labels on dark. */
  textOnDarkSoft: "#b8c4d4",
  /** Sources / meta on dark — still >=4.5:1 vs #090f1a. */
  textOnDarkMeta: "#9aabbd",

  /** Zoonotic diagram background. */
  darkBg: "#090f1a",
} as const;

export type ThemeColors = typeof colors;
