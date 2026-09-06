import { colors } from "~/lib/theme";
import { LIFESPAN_STEPS, RECORDED_TODAY } from "~/lib/lifespan";

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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
                What it means
              </p>
              <h2
                id="lifespan-heading"
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.02,
                  color: colors.navy,
                  maxWidth: 640,
                }}
              >
                Extend the healthy part of a life.
              </h2>
            </div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                maxWidth: 340,
                color: colors.inkMuted,
              }}
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
                  <span style={{ fontFamily: MONO }}>{step.n}</span>
                  <i />
                </div>
              ))}
              <div className="life-track">
                <div style={{ width: `${RECORDED_TODAY}%` }} />
                <div style={{ width: `${100 - RECORDED_TODAY}%` }} />
              </div>
              <div className="life-scale" style={{ fontFamily: MONO }}>
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
                    fontFamily: MONO,
                    fontSize: 12,
                    color: colors.inkMuted,
                  }}
                >
                  {step.n}
                </p>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: colors.navy,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: colors.inkMuted,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
