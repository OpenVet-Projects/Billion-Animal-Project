import { useRef } from "react";
import { BillionToOneSection } from "~/components/BillionToOneSection";
import { JoinSection } from "~/components/JoinSection";
import { LifespanSection } from "~/components/LifespanSection";
import { OweSection } from "~/components/OweSection";
import { SiteFooter } from "~/components/SiteFooter";
import { SpeciesSection } from "~/components/SpeciesSection";
import { ZoonoticSection } from "~/components/ZoonoticSection";
import { useTrailImages } from "~/hooks/useTrailImages";
import { OPENANIMAL_URL, OPENVET_URL } from "~/lib/seo";
import { SPECIES } from "~/lib/species";
import { colors, gradients } from "~/lib/theme";
import type { Route } from "./+types/home";

const TRAIL_IMAGES = [
  ...SPECIES.map((s) => ({ src: s.img, alt: s.common })),
  { src: "/images/billion/wolf-hero.png", alt: "Wolf" },
  { src: "/images/billion/horses-migration.png", alt: "Horses" },
  { src: "/images/billion/jaguar-thriving.png", alt: "Jaguar" },
];

const PRODUCTS = [
  {
    name: "OpenVet",
    href: OPENVET_URL,
    domain: "openvet.ai",
    body: "Clinical decision support that helps veterinarians during care, and records what was recommended.",
  },
  {
    name: "OpenAnimal",
    href: OPENANIMAL_URL,
    domain: "openanimal.ai",
    body: "For owners, through daily life between visits, where what happened next actually happens.",
  },
] as const;

/**
 * The OpenVet OV mark -- the only brand shape on the page.
 *
 * The source asset is OpenVet's forest green (#0C4A2B). It is knocked out to
 * white here rather than shown in green: the page deliberately carries no
 * green, and this matches OpenVet's own dark-surface treatment of the mark.
 */
function OvMark() {
  return (
    <img
      src="/images/openvet-mark.png"
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      style={{
        display: "block",
        width: 28,
        height: 28,
        flexShrink: 0,
        filter: "brightness(0) invert(1)",
      }}
    />
  );
}

export default function Home(_props: Route.ComponentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const trailRefs = useTrailImages(heroRef, TRAIL_IMAGES);

  return (
    <div
      style={{
        fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
        backgroundColor: colors.cream,
        color: colors.navy,
      }}
    >
      <nav className="ba-nav" aria-label="Primary">
        <a
          href="/"
          className="ba-nav-title"
          style={{ color: colors.navy, textDecoration: "none" }}
        >
          <span className="ba-nav-name">Billion Animals</span>
          <span className="ba-nav-attr">An OpenVet initiative</span>
        </a>
        <a
          href="#join"
          style={{
            flexShrink: 0,
            fontSize: 13,
            fontWeight: 700,
            color: colors.blue,
            textDecoration: "none",
          }}
        >
          Be part of it →
        </a>
      </nav>

      <section
        ref={heroRef}
        className="ba-hero"
        style={{ background: gradients.hero }}
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
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: "clamp(14px, 1.8vw, 17px)",
              fontWeight: 600,
              color: colors.textOnDarkSoft,
              marginBottom: 22,
            }}
          >
            <OvMark />
            An OpenVet initiative.
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 8.4vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              color: colors.cream,
            }}
          >
            One billion animals.
            <br />
            <span style={{ color: "#7eb0ff" }}>Longer, healthier lives.</span>
          </h1>
          <p
            style={{
              marginTop: 26,
              fontSize: "clamp(16px, 1.9vw, 20px)",
              fontWeight: 500,
              lineHeight: 1.65,
              color: colors.textOnDark,
              maxWidth: 620,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            An OpenVet initiative to give animals a medical history that follows
            them through life, and to help medicine learn from what happens to
            them.
          </p>
          <div className="hero-actions">
            <a
              href="#join"
              style={{
                padding: "15px 26px",
                backgroundColor: colors.blue,
                color: colors.cream,
                border: `2px solid ${colors.blue}`,
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Be part of it
            </a>
            <a
              href="#the-idea"
              style={{
                padding: "15px 26px",
                border: "2px solid rgba(247,243,236,0.5)",
                color: colors.textOnDark,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Read the idea
            </a>
          </div>
        </div>
      </section>

      <BillionToOneSection />

      <section
        id="the-idea"
        className="sec-pad"
        style={{ maxWidth: 1160, margin: "0 auto", scrollMarginTop: 72 }}
        aria-labelledby="idea-heading"
      >
        <div className="reveal">
          <h2
            id="idea-heading"
            style={{
              fontSize: "clamp(32px, 4.6vw, 60px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              marginBottom: 28,
              maxWidth: 900,
            }}
          >
            Every animal has a history worth keeping
          </h2>
          <p
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 700,
              lineHeight: 1.45,
              marginBottom: 24,
              maxWidth: 780,
              color: colors.navy,
            }}
          >
            A dog treated for cancer. A horse recovering from an injury. A goat
            whose health supports a family.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: colors.inkMuted,
              marginBottom: 16,
              maxWidth: 760,
            }}
          >
            Their histories help the people caring for them make better
            decisions. Studied together, they may also show how disease and
            recovery differ across animals, and what they share.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: colors.inkMuted,
              maxWidth: 760,
            }}
          >
            Today much of that is lost. An animal&apos;s history disappears when
            it changes clinics, moves cities, or sees a specialist, and what one
            vet learns rarely reaches the next.
          </p>
        </div>
      </section>

      <section
        className="sec-pad-sm"
        style={{ maxWidth: 1160, margin: "0 auto", paddingTop: 0 }}
        aria-labelledby="begins-heading"
      >
        <div className="reveal">
          <h2
            id="begins-heading"
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            How it begins
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: colors.inkMuted,
              marginBottom: 14,
              maxWidth: 760,
            }}
          >
            OpenVet helps veterinarians during care. OpenAnimal helps owners
            through daily life. Together they are the start of a medical history
            that connects a recommendation with what happened next.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: colors.inkMuted,
              marginBottom: 28,
              maxWidth: 760,
            }}
          >
            A billion animals will take far more than one company. We want to
            work with people caring for animals in the places these first
            products do not yet reach.
          </p>
        </div>
        <div className="how-grid reveal">
          {PRODUCTS.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="pillar-card"
              style={{
                border: `2px solid ${colors.navy}`,
                padding: "24px 20px",
                backgroundColor: colors.cream,
                textDecoration: "none",
                display: "block",
              }}
            >
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  marginBottom: 6,
                  color: colors.navy,
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: colors.blue,
                  marginBottom: 12,
                }}
              >
                {product.domain} →
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 1.3vw, 15px)",
                  lineHeight: 1.7,
                  color: colors.inkMuted,
                }}
              >
                {product.body}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section
        className="sec-pad-sm"
        style={{
          background: `linear-gradient(135deg, ${colors.navy} 0%, #0a3060 100%)`,
        }}
        aria-labelledby="means-heading"
      >
        <div
          className="reveal"
          style={{ maxWidth: 960, margin: "0 auto" }}
        >
          <h2
            id="means-heading"
            style={{
              fontSize: "clamp(26px, 3.4vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: colors.textOnDark,
              marginBottom: 24,
              maxWidth: 720,
            }}
          >
            What one billion means
          </h2>
          <p
            style={{
              fontSize: "clamp(18px, 2vw, 23px)",
              fontWeight: 700,
              lineHeight: 1.5,
              color: colors.textOnDark,
              marginBottom: 20,
              maxWidth: 760,
            }}
          >
            We have two ambitions: a medical history for a billion animals, and
            a measurable improvement in their lives.
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.8,
              color: colors.textOnDarkMuted,
              maxWidth: 760,
            }}
          >
            Keeping a record is the beginning. The point is better care: illness
            understood earlier, treatment followed through, suffering reduced,
            and more healthy years.
          </p>
        </div>
      </section>

      <LifespanSection />
      <ZoonoticSection />

      <OweSection />
      <SpeciesSection />
      <JoinSection />
      <SiteFooter />
    </div>
  );
}
