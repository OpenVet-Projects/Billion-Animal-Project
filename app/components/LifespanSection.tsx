import { useState } from "react";
import { colors } from "~/lib/theme";
import { LIFESPAN_TABS } from "~/lib/lifespan";

export function LifespanSection() {
  const [active, setActive] = useState(0);
  const tab = LIFESPAN_TABS[active];

  return (
    <section
      className="sec-pad"
      style={{
        backgroundColor: colors.cream,
        borderTop: `2px solid ${colors.navy}`,
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 36 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: colors.inkMuted,
              marginBottom: 12,
            }}
          >
            What it means
          </p>
          <h2
            style={{
              fontSize: "clamp(34px, 4.5vw, 58px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              marginBottom: 20,
              color: colors.navy,
            }}
          >
            Extend a
            <br />
            <span style={{ color: colors.blue }}>healthy</span>
            <br />
            lifespan.
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.2vw, 17px)",
              lineHeight: 1.75,
              color: colors.inkMuted,
              maxWidth: 640,
            }}
          >
            Longer, healthier lives, not more years of suffering. Tap a path to
            see how records make that possible.
          </p>
        </div>

        <div
          className="life-tabs"
          role="tablist"
          aria-label="Healthy lifespan mechanisms"
        >
          {LIFESPAN_TABS.map((item, index) => (
            <button
              key={item.n}
              type="button"
              role="tab"
              aria-selected={index === active}
              className="life-tab"
              onClick={() => setActive(index)}
              style={{
                borderColor:
                  index === active ? item.accent : "rgba(11,31,58,0.18)",
                color: index === active ? item.accent : colors.navy,
                backgroundColor:
                  index === active ? "rgba(0,87,255,0.06)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                }}
              >
                {item.n}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <div className="life-panel reveal" key={tab.n}>
          <div className="life-panel-img">
            <img src={tab.img} alt={tab.imgAlt} />
            <div
              className="life-panel-badge"
              style={{ backgroundColor: tab.accent }}
            >
              {tab.n}
            </div>
          </div>
          <div className="life-panel-copy">
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                color: colors.navy,
                marginBottom: 14,
              }}
            >
              {tab.title}
            </h3>
            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 20px)",
                fontWeight: 700,
                lineHeight: 1.45,
                color: colors.navy,
                marginBottom: 14,
              }}
            >
              {tab.blurb}
            </p>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: colors.inkMuted,
              }}
            >
              {tab.body}
            </p>
            {tab.source ? (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: colors.inkMuted,
                }}
              >
                Source: {tab.source}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
