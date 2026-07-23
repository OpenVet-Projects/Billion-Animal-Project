import { useEffect, useRef, useState } from "react";
import { FlockField } from "~/components/FlockField";
import { colors } from "~/lib/theme";

type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  count: number;
};

const STAGES: Stage[] = [
  {
    id: "billion",
    label: "THE SCALE",
    title: "ONE BILLION LIVES",
    body: "A living field of animals — too many to hold in mind. Move your cursor. Watch them respond.",
    count: 1_000_000_000,
  },
  {
    id: "herds",
    label: "THE HERDS",
    title: "LIVESTOCK AT SCALE",
    body: "The cloud tightens into herds. Cattle. Sheep. Horses. Lives carried by a few pairs of human hands.",
    count: 412_000_000,
  },
  {
    id: "flocks",
    label: "THE FLOCKS",
    title: "BIRDS IN MOTION",
    body: "Then bands of birds — the ones that feed cities, and the ones that still need a chart when something goes wrong.",
    count: 88_000_000,
  },
  {
    id: "companions",
    label: "THE COMPANIONS",
    title: "THE ONES AT HOME",
    body: "Fewer now. Dogs. Cats. Rabbits. The animals whose names we know — and whose history still gets lost between clinics.",
    count: 1_240,
  },
  {
    id: "one",
    label: "ONE LIFE",
    title: "THEN JUST ONE",
    body: "A single animal. A single caretaker. A history that should never reset at the clinic door.",
    count: 1,
  },
  {
    id: "record",
    label: "THE RECORD",
    title: "HER MEMORY, MADE VISIBLE",
    body: "This is what one billion becomes for: a medical record that travels with the animal — so the next vet already knows.",
    count: 1,
  },
];

const RECORD = {
  name: "MIRA",
  species: "Canine · Mixed",
  age: "7 years",
  id: "BA-000000001",
  lines: [
    { k: "Vaccines", v: "Rabies · Distemper · Bordetella — Mar 2024" },
    { k: "Finding", v: "Early osteoarthritis, left hip" },
    { k: "Plan", v: "Weight protocol · NSAID trial · Recheck 90 days" },
    { k: "Shared", v: "Clinic Nairobi → Specialist Kentucky" },
  ],
};

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function formatCount(n: number) {
  if (n >= 1_000_000) return Math.round(n).toLocaleString("en-US");
  if (n >= 100) return Math.round(n).toLocaleString("en-US");
  return String(Math.max(1, Math.round(n)));
}

function sampleStage(progress: number) {
  const max = STAGES.length - 1;
  const scaled = progress * max;
  const i = Math.min(max, Math.floor(scaled));
  const t = scaled - i;
  const current = STAGES[i];
  const next = STAGES[Math.min(max, i + 1)];
  return {
    index: i,
    current,
    count: lerp(current.count, next.count, t),
  };
}

export function BillionToOneSection() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinMode, setPinMode] = useState<"before" | "pin" | "after">("before");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    function update() {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = Math.max(1, rect.height - viewH);
      setProgress(clamp(-rect.top / total));
      if (rect.top > 0) setPinMode("before");
      else if (rect.bottom >= viewH) setPinMode("pin");
      else setPinMode("after");
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const { index, current, count } = reduceMotion
    ? {
        index: STAGES.length - 1,
        current: STAGES[STAGES.length - 1],
        count: 1,
      }
    : sampleStage(progress);

  const showRecord = current.id === "record" || reduceMotion;
  const showOne = current.id === "one" || showRecord || count <= 1.5;
  const flockProgress = reduceMotion ? 1 : progress;

  return (
    <section
      ref={trackRef}
      id="billion-to-one"
      className="billion-track"
      aria-label="From one billion animals to one medical record"
    >
      <div
        className={`billion-sticky${
          reduceMotion
            ? ""
            : pinMode === "pin"
              ? " is-pinned"
              : pinMode === "after"
                ? " is-after"
                : ""
        }`}
      >
        <div className="billion-stage">
          <FlockField
            progress={flockProgress}
            className="billion-flock"
            interactive={!reduceMotion && !showRecord}
          />

          <div className={`billion-copy${showRecord ? " is-hidden" : ""}`}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.textOnDarkSoft,
                marginBottom: 14,
              }}
            >
              {current.label}
            </p>
            <div
              className="billion-count"
              style={{ color: showOne ? "#5ee0d0" : colors.textOnDark }}
            >
              {formatCount(count)}
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                color: colors.textOnDark,
                marginTop: 18,
                marginBottom: 14,
              }}
            >
              {current.title}
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.65,
                color: colors.textOnDarkMuted,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              {current.body}
            </p>
          </div>

          <div
            className={`billion-record${showRecord ? " is-visible" : ""}`}
            aria-hidden={!showRecord}
          >
            <div className="billion-record-card">
              <div className="billion-record-top">
                <div className="billion-record-mark" aria-hidden="true">
                  <span>M</span>
                </div>
                <div>
                  <p className="billion-record-eyebrow">Patient record</p>
                  <h3>{RECORD.name}</h3>
                  <p>
                    {RECORD.species} · {RECORD.age}
                  </p>
                  <p className="billion-record-id">{RECORD.id}</p>
                </div>
              </div>
              <div className="billion-record-lines">
                {RECORD.lines.map((line) => (
                  <div key={line.k}>
                    <span>{line.k}</span>
                    <p>{line.v}</p>
                  </div>
                ))}
              </div>
              <p className="billion-record-foot">
                One animal. One unbroken history. Repeated a billion times.
              </p>
            </div>
          </div>

          <div className="billion-progress" aria-hidden="true">
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={i === index ? "is-active" : undefined}
              />
            ))}
          </div>

          {!reduceMotion && progress < 0.92 && !showRecord ? (
            <p className="billion-hint">
              Scroll to zoom in · move cursor to disturb the field
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
