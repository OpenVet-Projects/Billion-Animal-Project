import { useFetcher } from "react-router";
import { colors } from "~/lib/theme";
import type { WaitlistResult } from "~/routes/waitlist";

const ROLES = [
  ["Clinic", "clinic"],
  ["Veterinarian", "vet"],
  ["Owner", "owner"],
  ["Researcher", "researcher"],
  ["Organization", "organization"],
  ["Other", "other"],
] as const;

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 14px",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "inherit",
  border: "2px solid rgba(247,243,236,0.35)",
  backgroundColor: "transparent",
  color: colors.textOnDark,
  outline: "none",
  minWidth: 0,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  color: colors.textOnDarkSoft,
  marginBottom: 6,
};

export function JoinSection() {
  const fetcher = useFetcher<WaitlistResult>();
  const submitting = fetcher.state !== "idle";
  const result = fetcher.data;
  const done = result && "ok" in result && result.ok;

  return (
    <section
      id="join"
      className="sec-pad"
      style={{
        background:
          "linear-gradient(135deg, #011510 0%, #063d32 50%, #0057ff 100%)",
        color: colors.cream,
      }}
      aria-labelledby="join-heading"
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2
          id="join-heading"
          className="reveal"
          style={{
            fontSize: "clamp(30px, 5vw, 60px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 0.98,
            marginBottom: 18,
            color: colors.textOnDark,
          }}
        >
          Be part of it.
        </h2>
        <p
          className="reveal"
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            fontWeight: 500,
            lineHeight: 1.65,
            color: colors.textOnDarkMuted,
            marginBottom: 36,
          }}
        >
          Care for animals? Study them? Build something that could help? Tell us
          where you fit.
        </p>

        {done ? (
          <div
            role="status"
            style={{
              border: `2px solid ${colors.teal}`,
              padding: "24px 22px",
              backgroundColor: "rgba(0,168,150,0.12)",
            }}
          >
            <p
              style={{
                fontSize: 17,
                fontWeight: 700,
                lineHeight: 1.6,
                color: colors.textOnDark,
                margin: 0,
              }}
            >
              Thank you. We&apos;ll keep you informed as the initiative develops
              and get in touch where there is a useful way to work together.
            </p>
          </div>
        ) : (
          <fetcher.Form
            method="post"
            action="/waitlist"
            style={{ display: "grid", gap: 18 }}
          >
            <div>
              <label htmlFor="join-name" style={labelStyle}>
                Name
              </label>
              <input
                id="join-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="join-email" style={labelStyle}>
                Email
              </label>
              <input
                id="join-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="join-role" style={labelStyle}>
                Role
              </label>
              <select
                id="join-role"
                name="type"
                defaultValue="clinic"
                style={{ ...fieldStyle, appearance: "auto" }}
              >
                {ROLES.map(([label, value]) => (
                  <option key={value} value={value} style={{ color: "#0b1f3a" }}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="join-contribution" style={labelStyle}>
                How would you like to contribute?
              </label>
              <textarea
                id="join-contribution"
                name="contribution"
                rows={4}
                style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                justifySelf: "start",
                padding: "16px 28px",
                backgroundColor: colors.blue,
                color: colors.cream,
                border: `2px solid ${colors.blue}`,
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.02em",
                fontFamily: "inherit",
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Sending…" : "Be part of it"}
            </button>

            {result && "error" in result && result.error ? (
              <p
                role="alert"
                style={{ fontSize: 15, fontWeight: 700, color: "#5ee0d0" }}
              >
                {result.error}
              </p>
            ) : null}
          </fetcher.Form>
        )}

        <p
          style={{
            marginTop: 24,
            fontSize: 14,
            lineHeight: 1.65,
            color: colors.textOnDarkMeta,
          }}
        >
          This is an expression of interest, not consent to a study or a
          donation of records.
        </p>
      </div>
    </section>
  );
}
