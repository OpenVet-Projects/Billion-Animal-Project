import { colors } from "~/lib/theme";
import { OWE_ITEMS, OWE_LEAD } from "~/lib/owe";

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 12,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: colors.inkMuted,
      }}
    >
      {children}
    </p>
  );
}

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
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: colors.blue,
                  marginBottom: 20,
                }}
              >
                The obligation
              </p>
              <h2
                id="owe-heading"
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.02,
                  color: colors.navy,
                }}
              >
                What we owe them.
              </h2>
            </div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                maxWidth: 320,
                color: colors.inkMuted,
              }}
            >
              Four parties to every animal&apos;s life. None of them can carry
              it alone.
            </p>
          </header>

          <div className="owe-lead">
            <Eyebrow>
              {OWE_LEAD.number} · {OWE_LEAD.party}
            </Eyebrow>
            <p
              style={{
                marginTop: 20,
                fontSize: "clamp(24px, 3.4vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
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
                <Eyebrow>
                  {item.number} · {item.party}
                </Eyebrow>
                <p
                  style={{
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: colors.navy,
                  }}
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
