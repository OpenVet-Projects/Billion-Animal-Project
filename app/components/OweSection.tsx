import { colors } from "~/lib/theme";
import { OWE_ITEMS, OWE_LEAD } from "~/lib/owe";
import { cardTitle, lead, sectionTitle, statement } from "~/lib/type";
import { Eyebrow } from "./Eyebrow";

export function OweSection() {
  return (
    <section
      className="sec-pad"
      style={{ backgroundColor: colors.cream }}
      aria-labelledby="owe-heading"
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="owe-frame reveal">
          <header className="owe-head">
            <div>
              <Eyebrow style={{ marginBottom: 20 }}>The obligation</Eyebrow>
              <h2
                id="owe-heading"
                style={{ ...sectionTitle, color: colors.navy }}
              >
                What we owe them.
              </h2>
            </div>
            <p
              style={{ ...lead, maxWidth: 320, color: colors.inkMuted }}
            >
              Four parties to every animal&apos;s life. None of them can carry
              it alone.
            </p>
          </header>

          <div className="owe-lead">
            <Eyebrow tone="muted">
              {OWE_LEAD.number} · {OWE_LEAD.party}
            </Eyebrow>
            <p
              style={{
                ...statement,
                marginTop: 20,
                color: colors.navy,
                maxWidth: 900,
              }}
            >
              {OWE_LEAD.headline}
            </p>
            <p
              style={{
                marginTop: 20,
                fontSize: 16,
                lineHeight: 1.55,
                color: colors.navy,
                maxWidth: 560,
              }}
            >
              {OWE_LEAD.body}
            </p>
          </div>

          <div className="owe-grid">
            {OWE_ITEMS.map((item, i) => (
              <div
                key={item.number}
                className="owe-cell"
                style={{
                  backgroundColor:
                    i === OWE_ITEMS.length - 1 ? "#fcfbf8" : "transparent",
                }}
              >
                <Eyebrow tone="muted">
                  {item.number} · {item.party}
                </Eyebrow>
                <p
                  style={{ ...cardTitle, color: colors.navy }}
                >
                  {item.headline}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: colors.inkMuted,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
