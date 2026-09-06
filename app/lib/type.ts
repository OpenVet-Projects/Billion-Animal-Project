/**
 * One type scale for the whole page. Section headings, statements and card
 * titles were each set by hand and had drifted to six different sizes and two
 * different weights; anything typographic that repeats across sections belongs
 * here so it can only be changed in one place.
 */
export const FONT_SANS =
  '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

/** Data, labels and numbers. Never body copy. */
export const FONT_MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/** The h2 that opens a section. */
export const sectionTitle = {
  fontSize: "clamp(30px, 4.4vw, 54px)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.03,
} as const;

/** A large statement set inside a section, below its title. */
export const statement = {
  fontSize: "clamp(22px, 3.2vw, 40px)",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  lineHeight: 1.15,
} as const;

/** The h3 on a card. */
export const cardTitle = {
  fontSize: "clamp(18px, 1.9vw, 24px)",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
} as const;

/** The standing paragraph that introduces a section. */
export const lead = {
  fontSize: "clamp(16px, 1.5vw, 18px)",
  lineHeight: 1.7,
} as const;

/** Ordinary supporting copy. */
export const body = {
  fontSize: 15,
  lineHeight: 1.6,
} as const;

/** The small mono label above a title. */
export const eyebrow = {
  fontFamily: FONT_MONO,
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
} as const;
