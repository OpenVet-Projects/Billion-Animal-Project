import { eyebrow } from "~/lib/type";
import { colors } from "~/lib/theme";

/**
 * The small mono label that opens a section or names a card. One component so
 * every section's eyebrow shares a size, a tracking and a colour.
 */
export function Eyebrow({
  children,
  tone = "accent",
  style,
}: {
  children: React.ReactNode;
  /** accent sits on paper, muted inside a card, onDark on a dark surface. */
  tone?: "accent" | "muted" | "onDark";
  style?: React.CSSProperties;
}) {
  const color =
    tone === "accent"
      ? colors.blue
      : tone === "muted"
        ? colors.inkMuted
        : colors.textOnDarkSoft;

  return <p style={{ ...eyebrow, color, ...style }}>{children}</p>;
}
