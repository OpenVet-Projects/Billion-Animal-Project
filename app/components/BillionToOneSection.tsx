import { useEffect, useRef, useState } from "react";
import { colors } from "~/lib/theme";

type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  count: string;
  images: { src: string; alt: string }[];
};

const STAGES: Stage[] = [
  {
    id: "billion",
    label: "THE SCALE",
    title: "ONE BILLION LIVES",
    body: "Herds. Flocks. Colonies. Companions. A number so large it stops feeling like anyone.",
    count: "1,000,000,000",
    images: [
      { src: "/images/animals/cattle.png", alt: "Cattle" },
      { src: "/images/animals/sheep.png", alt: "Sheep" },
      { src: "/images/animals/chicken.png", alt: "Chicken" },
      { src: "/images/animals/horse.png", alt: "Horse" },
      { src: "/images/animals/pig.png", alt: "Pig" },
      { src: "/images/animals/goat.png", alt: "Goat" },
      { src: "/images/animals/duck.png", alt: "Duck" },
      { src: "/images/animals/dog.png", alt: "Dog" },
      { src: "/images/animals/cat.png", alt: "Cat" },
      { src: "/images/animals/camel.png", alt: "Camel" },
      { src: "/images/animals/bee.png", alt: "Bee" },
      { src: "/images/animals/eagle.png", alt: "Eagle" },
    ],
  },
  {
    id: "herds",
    label: "THE HERDS",
    title: "LIVESTOCK AT SCALE",
    body: "Cattle on the range. Sheep on the hillside. Horses in the dust. Millions of lives carried by a few pairs of human hands.",
    count: "412,000,000",
    images: [
      { src: "/images/animals/cattle.png", alt: "Cattle" },
      { src: "/images/animals/sheep.png", alt: "Sheep" },
      { src: "/images/animals/horse.png", alt: "Horse" },
      { src: "/images/animals/pig.png", alt: "Pig" },
      { src: "/images/animals/goat.png", alt: "Goat" },
      { src: "/images/animals/buffalo.png", alt: "Buffalo" },
      { src: "/images/animals/donkey.png", alt: "Donkey" },
      { src: "/images/animals/camel.png", alt: "Camel" },
    ],
  },
  {
    id: "flocks",
    label: "THE FLOCKS",
    title: "BIRDS IN MOTION",
    body: "Chickens, ducks, geese, raptors — flocks that feed cities and birds that still need a chart when something goes wrong.",
    count: "88,000,000",
    images: [
      { src: "/images/animals/chicken.png", alt: "Chicken" },
      { src: "/images/animals/duck.png", alt: "Duck" },
      { src: "/images/animals/goose.png", alt: "Goose" },
      { src: "/images/animals/turkey.png", alt: "Turkey" },
      { src: "/images/animals/eagle.png", alt: "Eagle" },
      { src: "/images/animals/parrot.png", alt: "Parrot" },
      { src: "/images/animals/pigeon.png", alt: "Pigeon" },
      { src: "/images/animals/owl.png", alt: "Owl" },
    ],
  },
  {
    id: "companions",
    label: "THE COMPANIONS",
    title: "THE ONES AT HOME",
    body: "Dogs. Cats. Rabbits. The animals whose names we know — and whose history still gets lost between clinics.",
    count: "1,240",
    images: [
      { src: "/images/animals/dog.png", alt: "Dog" },
      { src: "/images/animals/cat.png", alt: "Cat" },
      { src: "/images/animals/rabbit.png", alt: "Rabbit" },
      { src: "/images/animals/ferret.png", alt: "Ferret" },
      { src: "/images/animals/guinea_pig.png", alt: "Guinea Pig" },
      { src: "/images/animals/hamster.png", alt: "Hamster" },
    ],
  },
  {
    id: "one",
    label: "ONE LIFE",
    title: "THEN JUST ONE",
    body: "A single animal. A single caretaker. A history that should never reset at the clinic door.",
    count: "1",
    images: [{ src: "/images/animals/dog.png", alt: "Dog" }],
  },
  {
    id: "record",
    label: "THE RECORD",
    title: "HER MEMORY, MADE VISIBLE",
    body: "This is what one billion becomes for: a medical record that travels with the animal — so the next vet already knows.",
    count: "1",
    images: [{ src: "/images/animals/dog.png", alt: "Dog" }],
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

function stageIndex(progress: number) {
  const n = STAGES.length;
  return Math.min(n - 1, Math.max(0, Math.floor(progress * n)));
}

export function BillionToOneSection() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
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
      const total = rect.height - window.innerHeight;
      const raw = total <= 0 ? 0 : -rect.top / total;
      setProgress(Math.min(1, Math.max(0, raw)));
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

  const active = reduceMotion ? STAGES.length - 1 : stageIndex(progress);
  const stage = STAGES[active];
  const showRecord = stage.id === "record" || reduceMotion;
  const showOne = stage.id === "one" || showRecord;

  return (
    <section
      ref={trackRef}
      className="billion-track"
      aria-label="From one billion animals to one medical record"
    >
      <div className="billion-sticky">
        <div
          className="billion-stage"
          style={{
            background:
              "linear-gradient(155deg, #011510 0%, #0b1f3a 42%, #063d32 72%, #0057ff 120%)",
          }}
        >
          <div className="billion-swarm" aria-hidden="true">
            {stage.images.map((img, i) => {
              const angle = (i / Math.max(stage.images.length, 1)) * Math.PI * 2;
              const radius =
                showOne && stage.images.length === 1
                  ? 0
                  : 110 + (i % 3) * 36 + (1 - progress) * 40;
              const x = Math.cos(angle + progress * 2) * radius;
              const y = Math.sin(angle + progress * 1.4) * radius * 0.72;
              const scale =
                showOne && stage.images.length === 1
                  ? 1.35
                  : 0.55 + (i % 4) * 0.08;
              return (
                <img
                  key={`${stage.id}-${img.src}-${i}`}
                  src={img.src}
                  alt=""
                  className="billion-swarm-img"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                    opacity: showRecord ? 0.18 : showOne ? 1 : 0.88,
                    zIndex: showOne ? 3 : 1,
                  }}
                />
              );
            })}
          </div>

          <div className="billion-copy">
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
              {stage.label}
            </p>
            <div
              className="billion-count"
              style={{
                color: showOne ? "#5ee0d0" : colors.textOnDark,
              }}
            >
              {stage.count}
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
              {stage.title}
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
              {stage.body}
            </p>
          </div>

          <div
            className={`billion-record${showRecord ? " is-visible" : ""}`}
            aria-hidden={!showRecord}
          >
            <div className="billion-record-card">
              <div className="billion-record-top">
                <img src="/images/animals/dog.png" alt="Mira" />
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
                className={i === active ? "is-active" : undefined}
              />
            ))}
          </div>

          {!reduceMotion && progress < 0.96 ? (
            <p className="billion-hint">Scroll to zoom from a billion to one</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
