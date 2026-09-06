import { colors } from "~/lib/theme";
import { LIFESPAN_STEPS, RECORDED_TODAY } from "~/lib/lifespan";
import { FONT_MONO, body, cardTitle, lead, sectionTitle } from "~/lib/type";
import { Eyebrow } from "./Eyebrow";

export function LifespanSection() {
  return (
    <section
      className="sec-pad"
      style={{ backgroundColor: colors.cream }}
      aria-labelledby="lifespan-heading"
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="life-frame reveal">
          <header className="owe-head">
            <div>
              <Eyebrow style={{ marginBottom: 20 }}>What it means</Eyebrow>
              <h2
                id="lifespan-heading"
                style={{ ...sectionTitle, color: colors.navy, maxWidth: 640 }}
              >
                Extend the healthy part of a life.
              </h2>
            </div>
            <p
              style={{ ...lead, maxWidth: 340, color: colors.inkMuted }}
            >
              Not more years of suffering. Records move the same five things on
              every animal that has one.
            </p>
          </header>

          <div className="life-bar-wrap">
            <div className="life-bar" role="img" aria-label="A life, from birth to the years a medical record could add">
              {LIFESPAN_STEPS.map((step) => (
                <div
                  key={step.n}
                  className="life-tick"
                  style={{ left: `${step.at}%` }}
                >
                  <span style={{ fontFamily: FONT_MONO }}>{step.n}</span>
                  <i />
                </div>
              ))}
              <div className="life-track">
                <div style={{ width: `${RECORDED_TODAY}%` }} />
                <div style={{ width: `${100 - RECORDED_TODAY}%` }} />
              </div>
              <div className="life-scale" style={{ fontFamily: FONT_MONO }}>
                <div style={{ width: `${RECORDED_TODAY}%` }}>
                  <span>Birth</span>
                  <span>Life as recorded today</span>
                </div>
                <div style={{ width: `${100 - RECORDED_TODAY}%` }}>
                  <span>The years we are arguing for</span>
                </div>
              </div>
            </div>
          </div>

          <div className="life-grid">
            {LIFESPAN_STEPS.map((step, i) => (
              <div
                key={step.n}
                className="life-cell"
                style={{
                  backgroundColor:
                    i === LIFESPAN_STEPS.length - 1 ? "#fcfbf8" : "transparent",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    color: colors.inkMuted,
                  }}
                >
                  {step.n}
                </p>
                <h3 style={{ ...cardTitle, fontSize: 18, color: colors.navy }}>
                  {step.title}
                </h3>
                <p style={{ ...body, color: colors.inkMuted }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
