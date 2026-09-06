import { colors } from "~/lib/theme";
import {
  CONTACT_EMAIL,
  FOOTER_LINE,
  OPENANIMAL_URL,
  OPENVET_URL,
} from "~/lib/seo";

const linkStyle: React.CSSProperties = {
  color: colors.navy,
  textDecoration: "none",
  fontWeight: 700,
};

export function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: colors.cream,
        borderTop: `2px solid ${colors.navy}`,
        padding: "48px 24px 0",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            fontWeight: 700,
            lineHeight: 1.5,
            color: colors.navy,
            maxWidth: 640,
            marginBottom: 24,
          }}
        >
          {FOOTER_LINE}
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.9,
            color: colors.inkMuted,
            paddingBottom: 28,
            borderBottom: "1px solid rgba(11,31,58,0.1)",
          }}
        >
          <a href={OPENVET_URL} style={linkStyle}>
            OpenVet
          </a>{" "}
          (openvet.ai) <span aria-hidden="true">·</span>{" "}
          <a href={OPENANIMAL_URL} style={linkStyle}>
            OpenAnimal
          </a>{" "}
          (openanimal.ai) <span aria-hidden="true">·</span>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
      <div style={{ overflow: "hidden", marginTop: 28 }} aria-hidden="true">
        <p className="footer-mega">Billion Animals</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: 10,
          padding: "12px 0",
          fontSize: 13,
          fontWeight: 600,
          color: colors.inkMuted,
        }}
      >
        <span>© 2026 OpenVet, Inc.</span>
      </div>
    </footer>
  );
}
