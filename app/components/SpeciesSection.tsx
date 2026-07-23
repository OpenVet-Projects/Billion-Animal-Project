import { useState } from "react";
import { colors } from "~/lib/theme";
import {
  CATEGORIES,
  SPECIES,
  SPECIES_CARD_COLORS,
  type Species,
  type SpeciesCategoryId,
} from "~/lib/species";

function markFor(species: Species) {
  return species.common.slice(0, 1).toUpperCase();
}

export function SpeciesSection() {
  const [filter, setFilter] = useState<SpeciesCategoryId>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [focus, setFocus] = useState<Species | null>(null);

  const visible =
    filter === "all" ? SPECIES : SPECIES.filter((s) => s.category === filter);
  const selectedSpecies = SPECIES.filter((s) => selected.includes(s.latin));

  function toggleSpecies(species: Species) {
    setFocus(species);
    setSelected((prev) =>
      prev.includes(species.latin)
        ? prev.filter((id) => id !== species.latin)
        : [...prev, species.latin],
    );
  }

  return (
    <section
      className="sec-pad"
      style={{
        backgroundColor: colors.cream,
        borderTop: `2px solid ${colors.navy}`,
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: 10,
              color: colors.navy,
            }}
          >
            EVERY SPECIES.
            <br />
            <span style={{ color: colors.inkMuted, fontWeight: 700 }}>
              WHO YOU CARE FOR.
            </span>
          </h2>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: colors.inkMuted,
              textTransform: "uppercase",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            40+ species. Each one entrusted to a human being.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: colors.inkMuted,
              maxWidth: 640,
            }}
          >
            Tap the animals you care for. Build your field — not a gallery of
            stock photos.
          </p>
        </div>

        <div
          className="species-filters"
          role="tablist"
          aria-label="Filter species"
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className="species-filter"
                onClick={() => setFilter(cat.id)}
                style={{
                  backgroundColor: isActive ? colors.navy : "transparent",
                  color: isActive ? colors.cream : colors.navy,
                  borderColor: colors.navy,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {focus ? (
          <div className="species-focus reveal" aria-live="polite">
            <div
              className="species-focus-mark"
              style={{ backgroundColor: SPECIES_CARD_COLORS[focus.col] }}
              aria-hidden="true"
            >
              <span>{markFor(focus)}</span>
            </div>
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: colors.blue,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {selected.includes(focus.latin)
                  ? "IN YOUR CARE"
                  : "CARED FOR BY"}
              </p>
              <h3
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                  color: colors.navy,
                }}
              >
                {focus.common}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: colors.inkMuted,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {focus.latin} · {focus.category}
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: colors.navy,
                  maxWidth: 520,
                }}
              >
                {focus.entrusted}
              </p>
            </div>
          </div>
        ) : null}

        <div className="species-grid">
          {visible.map((species) => {
            const isSelected = selected.includes(species.latin);
            return (
              <button
                key={species.latin}
                type="button"
                className={`sp-card sp-card-btn${isSelected ? " is-selected" : ""}`}
                onClick={() => toggleSpecies(species)}
                aria-pressed={isSelected}
                style={{
                  backgroundColor: SPECIES_CARD_COLORS[species.col],
                  borderColor: isSelected ? colors.blue : colors.navy,
                }}
              >
                <span className="sp-mark" aria-hidden="true">
                  {markFor(species)}
                </span>
                {isSelected ? (
                  <span className="sp-check" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
                <div className="sp-label">
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: colors.textOnDark,
                      lineHeight: 1.2,
                    }}
                  >
                    {species.common}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      color: colors.textOnDarkSoft,
                      marginTop: 2,
                    }}
                  >
                    {species.latin}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedSpecies.length > 0 ? (
        <div className="species-tray" role="status">
          <div className="species-tray-inner">
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: colors.teal,
                  marginBottom: 4,
                }}
              >
                In your care
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: colors.textOnDark,
                }}
              >
                {selectedSpecies.length} species ·{" "}
                {selectedSpecies
                  .slice(0, 4)
                  .map((s) => s.common)
                  .join(" · ")}
                {selectedSpecies.length > 4 ? "…" : ""}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => {
                  setSelected([]);
                  setFocus(null);
                }}
                style={{
                  padding: "12px 16px",
                  background: "transparent",
                  border: `1px solid ${colors.textOnDarkSoft}`,
                  color: colors.textOnDark,
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Clear
              </button>
              <a
                href="#join"
                style={{
                  padding: "12px 18px",
                  backgroundColor: colors.blue,
                  color: colors.textOnDark,
                  fontWeight: 900,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Get invited →
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
