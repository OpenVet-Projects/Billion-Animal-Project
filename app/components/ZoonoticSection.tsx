import { useEffect, useState, type TouchEvent } from "react";
import {
  DESKTOP_LAYOUT,
  MOBILE_LAYOUT,
  ZOONOTIC_DISEASES,
  ZOONOTIC_SPECIES,
  zoonoticPalette as m,
  type DiagramLayout,
  type ZoonoticDisease,
} from "~/lib/zoonotic";
import { colors } from "~/lib/theme";

function useIsNarrow(breakpoint = 768) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return matches;
}

type DiagramProps = {
  layout: DiagramLayout;
  hoveredSpecies: string | null;
  hoveredDisease: string | null;
  isActive: boolean;
  activeDiseaseIds: Set<string>;
  activeSpeciesIds: Set<string>;
  onSelectSpecies: (id: string) => void;
  onSelectDisease: (disease: ZoonoticDisease) => void;
  onClear: () => void;
};

function ZoonoticDiagram({
  layout,
  hoveredSpecies,
  hoveredDisease,
  isActive,
  activeDiseaseIds,
  activeSpeciesIds,
  onSelectSpecies,
  onSelectDisease,
  onClear,
}: DiagramProps) {
  const {
    w,
    h,
    species: speciesPos,
    disease: diseasePos,
    human,
    speciesLabel,
    diseaseLabel,
  } = layout;
  const isMobile = speciesLabel === "below";
  const speciesFont = isMobile ? 11 : 13;
  const diseaseFont = diseaseLabel === "right-tight" ? 12 : 13;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="zoonotic-svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Interactive diagram of animal species connected to shared and zoonotic diseases that reach humans"
      onMouseLeave={onClear}
    >
      <defs>
        <radialGradient id="humGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.blue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={colors.blue} stopOpacity="0" />
        </radialGradient>
      </defs>

      {ZOONOTIC_DISEASES.map((disease, di) =>
        disease.species.map((speciesId) => {
          const si = ZOONOTIC_SPECIES.findIndex((s) => s.id === speciesId);
          if (si < 0) return null;
          const sp = speciesPos(si);
          const dp = diseasePos(di);
          const lit =
            isActive &&
            activeDiseaseIds.has(disease.id) &&
            activeSpeciesIds.has(speciesId);
          const dimmed = isActive && !lit;
          const stroke =
            disease.type === "shared" ? m.sharedHi : m.zoonoticHi;

          if (isMobile) {
            const midY = (sp.y + dp.y) / 2;
            const d = `M ${sp.x} ${sp.y} C ${sp.x} ${midY}, ${dp.x} ${midY}, ${dp.x} ${dp.y}`;
            return (
              <path
                key={`${speciesId}-${disease.id}`}
                d={d}
                fill="none"
                stroke={lit ? stroke : m.lineBase}
                strokeWidth={lit ? 2 : 1}
                opacity={dimmed ? 0.04 : 1}
                style={{ transition: "stroke 0.18s, opacity 0.18s" }}
              />
            );
          }

          return (
            <line
              key={`${speciesId}-${disease.id}`}
              x1={sp.x}
              y1={sp.y}
              x2={dp.x}
              y2={dp.y}
              stroke={lit ? stroke : m.lineBase}
              strokeWidth={lit ? 2 : 1}
              opacity={dimmed ? 0.04 : 1}
              style={{
                transition: "stroke 0.18s, opacity 0.18s, stroke-width 0.18s",
              }}
            />
          );
        }),
      )}

      {ZOONOTIC_DISEASES.map((disease, di) => {
        const dp = diseasePos(di);
        const lit = isActive ? activeDiseaseIds.has(disease.id) : false;
        const dimmed = isActive && !lit;
        const stroke =
          disease.type === "shared"
            ? "rgba(0,168,150,0.6)"
            : "rgba(0,87,255,0.6)";

        if (isMobile) {
          const d = `M ${dp.x} ${dp.y} C ${dp.x + 90} ${dp.y}, ${human.x} ${human.y - 80}, ${human.x} ${human.y}`;
          return (
            <path
              key={`${disease.id}-human`}
              d={d}
              fill="none"
              stroke={lit ? stroke : m.lineBase}
              strokeWidth={lit ? 2 : 1}
              opacity={dimmed ? 0.04 : 1}
              style={{ transition: "stroke 0.18s, opacity 0.18s" }}
            />
          );
        }

        return (
          <line
            key={`${disease.id}-human`}
            x1={dp.x}
            y1={dp.y}
            x2={human.x}
            y2={human.y}
            stroke={lit ? stroke : m.lineBase}
            strokeWidth={lit ? 2 : 1}
            opacity={dimmed ? 0.04 : 1}
            style={{ transition: "stroke 0.18s, opacity 0.18s" }}
          />
        );
      })}

      <circle cx={human.x} cy={human.y} r={40} fill="url(#humGlow)" />
      <circle
        cx={human.x}
        cy={human.y}
        r={12}
        fill={isActive ? colors.blue : "#0d2d52"}
        stroke={colors.blue}
        strokeWidth={isActive ? 2.5 : 1.5}
        style={{ transition: "fill 0.2s" }}
      />
      <text
        x={human.x}
        y={human.y - 22}
        textAnchor="middle"
        fill={colors.blue}
        fontSize={11}
        fontWeight={900}
        letterSpacing={2}
        fontFamily="Helvetica Neue, Arial, sans-serif"
      >
        Human
      </text>
      <text
        x={human.x}
        y={human.y + 30}
        textAnchor="middle"
        fill={m.meta}
        fontSize={10}
        fontFamily="Helvetica Neue, Arial, sans-serif"
      >
        Homo sapiens
      </text>

      {ZOONOTIC_SPECIES.map((species, si) => {
        const pos = speciesPos(si);
        const lit = isActive ? activeSpeciesIds.has(species.id) : false;
        const hovered = hoveredSpecies === species.id;
        const dimmed = isActive && !lit;

        return (
          <g
            key={species.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onSelectSpecies(species.id)}
            onClick={() => onSelectSpecies(species.id)}
            onTouchEnd={(e: TouchEvent) => {
              e.preventDefault();
              onSelectSpecies(species.id);
            }}
          >
            <circle cx={pos.x} cy={pos.y} r={24} fill="transparent" />
            {isMobile ? (
              <rect
                x={pos.x - 36}
                y={pos.y + 10}
                width={72}
                height={28}
                rx={4}
                fill={m.bg}
                opacity={0.92}
              />
            ) : null}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={hovered ? 9 : 6}
              fill={lit ? m.speciesHi : "rgba(107,143,174,0.25)"}
              stroke={lit ? m.speciesHi : m.species}
              strokeWidth={1.5}
              opacity={dimmed ? 0.2 : 1}
              style={{ transition: "all 0.18s" }}
            />
            {speciesLabel === "left" ? (
              <>
                <text
                  x={pos.x - 18}
                  y={pos.y + 5}
                  textAnchor="end"
                  fill={lit ? m.speciesHi : dimmed ? m.meta : m.soft}
                  fontSize={speciesFont}
                  fontWeight={lit ? 900 : 600}
                  fontFamily="Helvetica Neue, Arial, sans-serif"
                  style={{ transition: "fill 0.18s" }}
                >
                  {species.label}
                </text>
                <text
                  x={pos.x - 18}
                  y={pos.y + 18}
                  textAnchor="end"
                  fill={dimmed ? m.meta : m.soft}
                  fontSize={10}
                  fontFamily="Helvetica Neue, Arial, sans-serif"
                  opacity={dimmed ? 0.55 : 0.85}
                >
                  {species.sub}
                </text>
              </>
            ) : (
              <>
                <text
                  x={pos.x}
                  y={pos.y + 22}
                  textAnchor="middle"
                  fill={lit ? m.speciesHi : dimmed ? m.meta : m.soft}
                  fontSize={speciesFont}
                  fontWeight={lit ? 900 : 700}
                  fontFamily="Helvetica Neue, Arial, sans-serif"
                  style={{ transition: "fill 0.18s" }}
                >
                  {species.label}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 34}
                  textAnchor="middle"
                  fill={dimmed ? m.meta : m.soft}
                  fontSize={9}
                  fontFamily="Helvetica Neue, Arial, sans-serif"
                  opacity={dimmed ? 0.55 : 0.85}
                >
                  {species.sub}
                </text>
              </>
            )}
          </g>
        );
      })}

      {ZOONOTIC_DISEASES.map((disease, di) => {
        const pos = diseasePos(di);
        const lit = isActive ? activeDiseaseIds.has(disease.id) : false;
        const hovered = hoveredDisease === disease.id;
        const dimmed = isActive && !lit;
        const accent = disease.type === "shared" ? m.shared : m.zoonotic;
        const accentHi = disease.type === "shared" ? m.sharedHi : m.zoonoticHi;
        const labelX = pos.x + (diseaseLabel === "right-tight" ? 16 : 18);
        const labelW = Math.max(110, disease.label.length * 9);

        return (
          <g
            key={disease.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onSelectDisease(disease)}
            onClick={() => onSelectDisease(disease)}
            onTouchEnd={(e: TouchEvent) => {
              e.preventDefault();
              onSelectDisease(disease);
            }}
          >
            <circle cx={pos.x} cy={pos.y} r={24} fill="transparent" />
            {hovered ? (
              <circle cx={pos.x} cy={pos.y} r={18} fill={`${accent}18`} />
            ) : null}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={hovered ? 8 : 6}
              fill={lit ? accentHi : `${accent}30`}
              stroke={lit ? accentHi : accent}
              strokeWidth={1.5}
              opacity={dimmed ? 0.12 : 1}
              style={{ transition: "all 0.18s" }}
            />
            <rect
              x={labelX - 4}
              y={pos.y - 11}
              width={labelW}
              height={22}
              rx={3}
              fill={m.bg}
            />
            <text
              x={labelX}
              y={pos.y + 5}
              textAnchor="start"
              fill={lit ? accentHi : dimmed ? m.meta : m.soft}
              fontSize={diseaseFont}
              fontWeight={lit ? 900 : 600}
              fontFamily="Helvetica Neue, Arial, sans-serif"
              style={{ transition: "fill 0.18s" }}
            >
              {disease.label}
            </text>
          </g>
        );
      })}

      {isMobile ? (
        <>
          <rect
            x={w / 2 - 50}
            y={12}
            width={100}
            height={22}
            rx={3}
            fill={m.bg}
          />
          <text
            x={w / 2}
            y={28}
            textAnchor="middle"
            fill={m.soft}
            fontSize={10}
            fontWeight={900}
            letterSpacing={2}
            fontFamily="Helvetica Neue, Arial, sans-serif"
          >
            Animals
          </text>
          <rect x={20} y={278} width={110} height={22} rx={3} fill={m.bg} />
          <text
            x={28}
            y={294}
            textAnchor="start"
            fill={m.soft}
            fontSize={10}
            fontWeight={900}
            letterSpacing={2}
            fontFamily="Helvetica Neue, Arial, sans-serif"
          >
            Diseases
          </text>
        </>
      ) : (
        <>
          <text
            x={speciesPos(0).x}
            y={26}
            textAnchor="middle"
            fill={m.soft}
            fontSize={10}
            fontWeight={900}
            letterSpacing={2}
            fontFamily="Helvetica Neue, Arial, sans-serif"
          >
            Animals
          </text>
          <text
            x={diseasePos(0).x}
            y={26}
            textAnchor="middle"
            fill={m.soft}
            fontSize={10}
            fontWeight={900}
            letterSpacing={2}
            fontFamily="Helvetica Neue, Arial, sans-serif"
          >
            Diseases
          </text>
        </>
      )}
    </svg>
  );
}

export function ZoonoticSection() {
  const isNarrow = useIsNarrow(768);
  const [hoveredSpecies, setHoveredSpecies] = useState<string | null>(null);
  const [hoveredDisease, setHoveredDisease] = useState<string | null>(null);
  const [detail, setDetail] = useState<ZoonoticDisease | null>(null);

  function selectSpecies(id: string) {
    setHoveredSpecies(id);
    setHoveredDisease(null);
    setDetail(null);
  }

  function selectDisease(disease: ZoonoticDisease) {
    setHoveredDisease(disease.id);
    setHoveredSpecies(null);
    setDetail(disease);
  }

  function clear() {
    setHoveredSpecies(null);
    setHoveredDisease(null);
    setDetail(null);
  }

  const activeDiseaseIds = new Set<string>();
  const activeSpeciesIds = new Set<string>();

  if (hoveredSpecies) {
    ZOONOTIC_DISEASES.forEach((d) => {
      if (d.species.includes(hoveredSpecies)) activeDiseaseIds.add(d.id);
    });
    activeDiseaseIds.forEach((id) => {
      const disease = ZOONOTIC_DISEASES.find((d) => d.id === id);
      disease?.species.forEach((s) => activeSpeciesIds.add(s));
    });
  }

  if (hoveredDisease) {
    activeDiseaseIds.add(hoveredDisease);
    const disease = ZOONOTIC_DISEASES.find((d) => d.id === hoveredDisease);
    disease?.species.forEach((s) => activeSpeciesIds.add(s));
  }

  const isActive = hoveredSpecies !== null || hoveredDisease !== null;
  const layout = isNarrow ? MOBILE_LAYOUT : DESKTOP_LAYOUT;

  return (
    <section className="zoonotic-sec" style={{ backgroundColor: m.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 52px" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: m.soft,
            marginBottom: 16,
          }}
        >
          One Health
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 58px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            color: m.text,
            marginBottom: 28,
          }}
        >
          Animal diseases
          <br />
          are <span style={{ color: colors.teal }}>human diseases.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "20px 32px",
            marginBottom: 28,
          }}
        >
          {[
            {
              n: "6 in 10",
              label:
                "known human infectious diseases can spread from animals",
              src: "CDC",
            },
            {
              n: "3 in 4",
              label: "new or emerging human diseases originate in animals",
              src: "WHO",
            },
            {
              n: "4 in 10",
              label:
                "top human cancers have direct parallels in dogs and cats",
              src: "NIH",
            },
          ].map((stat) => (
            <div key={stat.n}>
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: colors.blue,
                }}
              >
                {stat.n}
              </div>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  color: m.dim,
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: m.meta,
                  marginTop: 4,
                }}
              >
                {stat.src}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: 1.8,
            color: m.dim,
            maxWidth: 680,
          }}
        >
          The diseases killing animals are the same diseases killing people.
          Cancer. Heart disease. Diabetes. Plus the pandemics that start in
          animals and reach us. Tap or hover any species or disease to see the
          connections.
        </p>

        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: colors.teal,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: m.dim,
              }}
            >
              Shared disease (same in animals and humans)
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: colors.blue,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: m.dim,
              }}
            >
              Zoonotic (crosses from animal to human)
            </span>
          </div>
        </div>
      </div>

      {detail ? (
        <div
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 32px" }}
        >
          <div
            style={{
              display: "inline-block",
              borderLeft: `4px solid ${detail.type === "shared" ? colors.teal : colors.blue}`,
              paddingLeft: 20,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: "0.04em",
                color: detail.type === "shared" ? colors.teal : m.zoonoticHi,
                marginBottom: 6,
              }}
            >
              {detail.type === "shared" ? "Shared disease" : "Zoonotic disease"}{" "}
              · {detail.label}
            </p>
            <p
              style={{
                fontSize: "clamp(18px, 2vw, 26px)",
                fontWeight: 900,
                color: m.text,
                marginBottom: 6,
              }}
            >
              {detail.stat}
            </p>
            <p style={{ fontSize: 14, color: m.dim, lineHeight: 1.6 }}>
              {detail.source}
            </p>
          </div>
        </div>
      ) : null}

      <div className="zoonotic-diagram">
        <ZoonoticDiagram
          layout={layout}
          hoveredSpecies={hoveredSpecies}
          hoveredDisease={hoveredDisease}
          isActive={isActive}
          activeDiseaseIds={activeDiseaseIds}
          activeSpeciesIds={activeSpeciesIds}
          onSelectSpecies={selectSpecies}
          onSelectDisease={selectDisease}
          onClear={clear}
        />
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "20px auto 0",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: m.meta,
          }}
        >
          Sources: CDC One Health · WHO · NIH Cancer Institute · AVMA. Tap or
          hover any species or disease
        </p>
        {isActive ? (
          <button
            type="button"
            onClick={clear}
            className="zoonotic-clear"
          >
            Clear selection
          </button>
        ) : null}
      </div>
    </section>
  );
}
