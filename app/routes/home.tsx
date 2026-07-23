import { useRef } from "react";
import { useFetcher, useNavigation } from "react-router";
import { BillionToOneSection } from "~/components/BillionToOneSection";
import { LifespanSection } from "~/components/LifespanSection";
import { SpeciesSection } from "~/components/SpeciesSection";
import { ZoonoticSection } from "~/components/ZoonoticSection";
import { useTrailImages } from "~/hooks/useTrailImages";
import { OWE_ITEMS } from "~/lib/owe";
import { SPECIES } from "~/lib/species";
import { colors } from "~/lib/theme";
import type { WaitlistResult } from "~/routes/waitlist";
import type { Route } from "./+types/home";

const PILLARS = [
  {
    title: "THE RECORD",
    body: "The animal's record is not a product feature; it is a right of care. Every diagnosis, treatment, and outcome — saved, searchable, shared across every vet who touches that animal.",
  },
  {
    title: "THE REACH",
    body: "Rural clinics. Mobile units. Tele-vet. Field medicine. We go where the animals are, not where the infrastructure already exists.",
  },
  {
    title: "THE NETWORK",
    body: "Every clinic on the same platform. A discovery in São Paulo reaches San Francisco. A treatment that works in sheep informs care in goats.",
  },
  {
    title: "THE VOW",
    body: "One billion records. Longer, healthier lives. Concrete, measurable, public. We will be held to it — and we intend to meet it.",
  },
] as const;

const TRAIL_IMAGES = [
  ...SPECIES.map((s) => ({ src: s.img, alt: s.common })),
  { src: "/images/billion/wolf-hero.png", alt: "Wolf" },
  { src: "/images/billion/horses-migration.png", alt: "Horses" },
  { src: "/images/billion/jaguar-thriving.png", alt: "Jaguar" },
];

const ROLES = [
  ["CLINIC", "clinic"],
  ["VET", "vet"],
  ["PET OWNER", "owner"],
  ["ADVOCATE", "advocate"],
] as const;

export default function Home(_props: Route.ComponentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const trailRefs = useTrailImages(heroRef, TRAIL_IMAGES);
  const fetcher = useFetcher<WaitlistResult>();
  const navigation = useNavigation();
  const submitting =
    fetcher.state === "submitting" || navigation.state === "submitting";
  const actionData = fetcher.data;

  return (
    <div
      style={{
        fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
        backgroundColor: colors.cream,
        color: colors.navy,
        overflowX: "hidden",
      }}
    >
      <nav className="ba-nav" aria-label="Primary">
        <a
          href="/"
          className="ba-nav-title"
          style={{ color: colors.navy, textDecoration: "none" }}
        >
          Billion Animal Project
        </a>
        <a
          href="#join"
          style={{
            flexShrink: 0,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: colors.blue,
            textDecoration: "none",
          }}
        >
          GET INVITED →
        </a>
      </nav>

      <section
        ref={heroRef}
        className="ba-hero"
        style={{
          background:
            "linear-gradient(155deg, #011510 0%, #063d32 42%, #00a896 78%, #0057ff 100%)",
        }}
        aria-label="Hero"
      >
        {Array.from({ length: 14 }, (_, i) => {
          const asset = TRAIL_IMAGES[i % TRAIL_IMAGES.length];
          return (
            <img
              key={i}
              ref={(el) => {
                trailRefs.current[i] = el;
              }}
              src={asset.src}
              alt=""
              data-src={asset.src}
              className="trail-img"
              aria-hidden="true"
            />
          );
        })}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 20px",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.textOnDarkSoft,
              marginBottom: 20,
            }}
          >
            The Billion Animal Study
          </p>
          <h1
            style={{
              fontSize: "clamp(48px, 12vw, 130px)",
              fontWeight: 900,
              lineHeight: 0.91,
              letterSpacing: "-0.03em",
              color: colors.cream,
              textTransform: "uppercase",
            }}
          >
            ONE BILLION
            <br />
            <span style={{ color: "#7eb0ff" }}>ANIMALS.</span>
          </h1>
          <p
            style={{
              marginTop: 28,
              fontSize: "clamp(18px, 2.4vw, 22px)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.45,
              color: colors.textOnDark,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            So animals live longer, healthier lives.
          </p>
          <p
            style={{
              marginTop: 20,
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 500,
              letterSpacing: "0.03em",
              lineHeight: 1.7,
              color: colors.textOnDarkMuted,
              maxWidth: 460,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Every creature is entrusted to someone.
            <br />
            That someone deserves the best medicine on Earth.
            <br />
            So does the animal.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: colors.textOnDarkSoft,
          }}
        >
          ↓ SCROLL INTO THE STORY
        </div>
      </section>

      <BillionToOneSection />

      <section
        className="sec-pad"
        style={{ maxWidth: 1160, margin: "0 auto" }}
        aria-labelledby="mission-heading"
      >
        <div className="reveal">
          <h2
            id="mission-heading"
            style={{
              fontSize: "clamp(38px, 5vw, 68px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 0.93,
              marginBottom: 28,
            }}
          >
            THE MISSION
          </h2>
          <p
            style={{
              fontSize: "clamp(19px, 2.2vw, 26px)",
              fontWeight: 800,
              lineHeight: 1.35,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              marginBottom: 24,
              color: colors.navy,
            }}
          >
            GATHER THE MEDICAL RECORDS OF ONE BILLION ANIMALS.
            <br />
            SO ANIMALS LIVE LONGER, HEALTHIER LIVES.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 17px)",
              lineHeight: 1.85,
              color: colors.inkMuted,
              marginBottom: 14,
              maxWidth: 760,
            }}
          >
            Right now, every vet visit starts from zero. An animal&apos;s history
            disappears when it changes clinics, moves cities, or sees a
            specialist. Every breakthrough in one country is invisible to every
            other. Every mistake gets repeated.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 17px)",
              lineHeight: 1.85,
              color: colors.inkMuted,
              marginBottom: 14,
              maxWidth: 760,
            }}
          >
            We are building the shared memory of animal medicine. One record per
            animal, accessible everywhere, growing smarter with every case. When
            a vet in Kenya and a vet in Kentucky see the same disease, they
            should share the same knowledge.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              fontWeight: 700,
              lineHeight: 1.75,
              color: colors.navy,
              maxWidth: 760,
            }}
          >
            What endures is pride in becoming the kind of civilization that
            remembers its animals.
          </p>
        </div>
      </section>

      <section
        className="sec-pad-sm"
        style={{ maxWidth: 1160, margin: "0 auto", paddingTop: 0 }}
        aria-label="How the study works"
      >
        <div className="how-grid reveal">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card"
              style={{
                border: `2px solid ${colors.navy}`,
                padding: "24px 20px",
                backgroundColor: colors.cream,
              }}
            >
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  color: colors.navy,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(14px, 1.3vw, 15px)",
                  lineHeight: 1.7,
                  color: colors.inkMuted,
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="sec-pad-sm"
        style={{
          background: `linear-gradient(135deg, ${colors.navy} 0%, #0a3060 100%)`,
        }}
        aria-label="Study reach"
      >
        <div
          className="goal-stats reveal"
          style={{ maxWidth: 960, margin: "0 auto" }}
        >
          {[
            {
              n: "40+",
              label: "Species covered",
              sub: "Dogs and horses — and bees, eagles, axolotls",
            },
            {
              n: "195",
              label: "Countries to reach",
              sub: "Every vet. Every clinic. Everywhere.",
            },
            {
              n: "∞",
              label: "Knowledge shared",
              sub: "Every case teaches every vet that follows",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                borderTop: "2px solid rgba(247,243,236,0.25)",
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 900,
                  color: colors.textOnDark,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {stat.n}
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: colors.textOnDarkSoft,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: colors.textOnDarkMuted,
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      <LifespanSection />
      <ZoonoticSection />

      <section
        className="sec-pad"
        style={{ backgroundColor: colors.paleBlue }}
        aria-labelledby="owe-heading"
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2
            id="owe-heading"
            className="reveal"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: 48,
            }}
          >
            WHAT WE OWE THEM
          </h2>
          {OWE_ITEMS.map((item) => (
            <div
              key={item.number}
              className="reveal"
              style={{
                padding: "32px 0",
                borderTop: "1px solid rgba(11,31,58,0.11)",
              }}
            >
              <div className="ob-header">
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    color: colors.inkMuted,
                    paddingTop: 3,
                  }}
                >
                  {item.number}
                </p>
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 17px)",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: colors.blue,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.species}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "clamp(15px, 1.7vw, 18px)",
                  fontWeight: 500,
                  lineHeight: 1.7,
                  color: colors.navy,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SpeciesSection />

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
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2
            id="join-heading"
            className="reveal"
            style={{
              fontSize: "clamp(30px, 5vw, 64px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
              marginBottom: 20,
            }}
          >
            YOU ARE ALREADY
            <br />
            <span style={{ color: "#5ee0d0" }}>A CARETAKER.</span>
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: "clamp(14px, 1.3vw, 16px)",
              fontWeight: 500,
              color: colors.textOnDarkSoft,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              marginBottom: 16,
              lineHeight: 1.75,
            }}
          >
            Clinics. Vets. Owners. Farmers. Anyone responsible for an
            animal&apos;s life.
          </p>
          <p
            className="reveal"
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 700,
              color: colors.textOnDark,
              letterSpacing: "0.02em",
              marginBottom: 14,
              lineHeight: 1.55,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Join the waitlist for the Billion Animal Study.
          </p>
          <p
            className="reveal"
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              fontWeight: 500,
              color: colors.textOnDarkMuted,
              letterSpacing: "0.02em",
              marginBottom: 36,
              lineHeight: 1.7,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            OpenVet and OpenAnimal are tools in service of the vow — not the
            other way around. Leave your email. We&apos;ll invite you when
            enrollment opens.
          </p>

          {actionData && "ok" in actionData && actionData.ok ? (
            <div
              style={{
                display: "inline-block",
                padding: "20px 40px",
                backgroundColor: colors.blue,
                fontSize: 15,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              ✓ YOU&apos;RE ON THE LIST. WE&apos;LL OPEN THE DOOR.
            </div>
          ) : (
            <fetcher.Form
              method="post"
              action="/waitlist"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
                role="radiogroup"
                aria-label="How you care for animals"
              >
                {ROLES.map(([label, value]) => (
                  <label
                    key={value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: colors.textOnDark,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={value}
                      defaultChecked={value === "clinic"}
                      style={{ accentColor: colors.blue }}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="pledge-row">
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL"
                  required
                  autoComplete="email"
                  inputMode="email"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    padding: "16px 16px",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    border: "2px solid rgba(247,243,236,0.35)",
                    borderRight: "none",
                    backgroundColor: "transparent",
                    color: colors.textOnDark,
                    outline: "none",
                    textTransform: "uppercase",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "16px 20px",
                    backgroundColor: colors.blue,
                    color: colors.cream,
                    border: `2px solid ${colors.blue}`,
                    fontSize: 13,
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                    cursor: submitting ? "wait" : "pointer",
                    whiteSpace: "nowrap",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "SENDING…" : "GET INVITED →"}
                </button>
              </div>
              {actionData && "error" in actionData && actionData.error ? (
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#5ee0d0",
                  }}
                  role="alert"
                >
                  {actionData.error}
                </p>
              ) : null}
            </fetcher.Form>
          )}
        </div>
      </section>

      <footer
        style={{
          backgroundColor: colors.cream,
          borderTop: `2px solid ${colors.navy}`,
          padding: "40px 24px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            paddingBottom: 32,
            borderBottom: "1px solid rgba(11,31,58,0.1)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: colors.inkMuted,
                marginBottom: 8,
              }}
            >
              CONTACT
            </p>
            <p style={{ fontSize: 15, fontWeight: 700 }}>
              <a
                href="mailto:hello@billionanimals.org"
                style={{ color: colors.navy, textDecoration: "none" }}
              >
                hello@billionanimals.org
              </a>
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: colors.inkMuted,
                marginBottom: 8,
              }}
            >
              TOOLS IN SERVICE OF THE VOW
            </p>
            <p style={{ fontSize: 15, fontWeight: 700 }}>
              <a
                href="https://openvet.com"
                style={{ color: colors.navy, textDecoration: "none" }}
              >
                OpenVet
              </a>
              <span style={{ color: colors.inkMuted }}> · </span>
              <span>OpenAnimal</span>
            </p>
            <p
              style={{
                marginTop: 8,
                fontSize: 13,
                lineHeight: 1.5,
                color: colors.inkMuted,
                maxWidth: 420,
              }}
            >
              Independence is the point. The platforms serve the study — the
              study does not serve the platforms.
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: colors.inkMuted,
                marginBottom: 8,
              }}
            >
              OPEN SOURCE
            </p>
            <a
              href="https://github.com/openvet-projects/billion-animal-project"
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.navy,
                textDecoration: "none",
              }}
            >
              GitHub / Billion Animal Study
            </a>
          </div>
        </div>
        <div style={{ overflow: "hidden" }} aria-hidden="true">
          <p className="footer-mega">BILLION ANIMAL STUDY</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: 10,
            padding: "12px 0",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: colors.inkMuted,
          }}
        >
          <span>©{new Date().getFullYear()} THE BILLION ANIMAL STUDY</span>
        </div>
      </footer>
    </div>
  );
}
