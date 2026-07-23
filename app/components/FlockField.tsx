import { useEffect, useRef } from "react";

type FlockFieldProps = {
  /** 0 = dense swarm, 1 = single being */
  progress: number;
  className?: string;
  interactive?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
};

type StageCfg = {
  count: number;
  scale: number;
  pull: number;
  teal: number;
};

const DOG_POINTS: [number, number][] = [
  [0.42, 0.62],
  [0.46, 0.48],
  [0.5, 0.4],
  [0.54, 0.36],
  [0.58, 0.34],
  [0.62, 0.36],
  [0.66, 0.42],
  [0.68, 0.5],
  [0.66, 0.58],
  [0.7, 0.62],
  [0.72, 0.7],
  [0.68, 0.74],
  [0.6, 0.72],
  [0.54, 0.7],
  [0.5, 0.74],
  [0.46, 0.7],
  [0.4, 0.72],
  [0.36, 0.66],
  [0.38, 0.58],
  [0.4, 0.5],
  [0.38, 0.42],
  [0.4, 0.36],
  [0.44, 0.4],
];

function stageWeights(progress: number): StageCfg {
  // Dense cloud → herds → flocks → companions → one
  if (progress < 0.2) return { count: 220, scale: 0.08, pull: 0.02, teal: 0.2 };
  if (progress < 0.4) return { count: 140, scale: 0.18, pull: 0.05, teal: 0.35 };
  if (progress < 0.58) return { count: 90, scale: 0.28, pull: 0.08, teal: 0.5 };
  if (progress < 0.75) return { count: 36, scale: 0.4, pull: 0.14, teal: 0.7 };
  if (progress < 0.88) return { count: 12, scale: 0.55, pull: 0.28, teal: 0.85 };
  return { count: 1, scale: 0.7, pull: 0.55, teal: 1 };
}

export function FlockField({
  progress,
  className,
  interactive = true,
}: FlockFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const particlesRef = useRef<Particle[]>([]);

  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: 240 }, (_, i) => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          seed: i * 12.9898,
        }));
      }
    }

    function targetFor(i: number, p: number, count: number) {
      if (p >= 0.88) {
        const pt = DOG_POINTS[i % DOG_POINTS.length];
        return { x: pt[0] * w, y: pt[1] * h };
      }
      if (p >= 0.75) {
        const a = (i / Math.max(count, 1)) * Math.PI * 2;
        return {
          x: w * 0.5 + Math.cos(a) * 18,
          y: h * 0.48 + Math.sin(a) * 14,
        };
      }
      if (p >= 0.58) {
        const cluster = i % 3;
        const cx = w * (0.28 + cluster * 0.22);
        const cy = h * (0.42 + (cluster % 2) * 0.12);
        const a = i * 1.7;
        return {
          x: cx + Math.cos(a) * 40,
          y: cy + Math.sin(a) * 28,
        };
      }
      if (p >= 0.4) {
        const row = i % 5;
        const t = i / Math.max(count, 1);
        return {
          x: w * (0.12 + t * 0.76),
          y: h * (0.28 + row * 0.1) + Math.sin(t * 14 + row) * 10,
        };
      }
      if (p >= 0.2) {
        const pack = i % 4;
        const cx = w * (0.2 + (pack % 2) * 0.45);
        const cy = h * (0.35 + Math.floor(pack / 2) * 0.28);
        const a = i * 2.1;
        const r = 20 + (i % 7) * 10;
        return {
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r * 0.7,
        };
      }
      const a = i * 2.399;
      const r = 40 + (i % 40) * 7;
      return {
        x: w * 0.5 + Math.cos(a) * r,
        y: h * 0.5 + Math.sin(a * 1.3) * r * 0.65,
      };
    }

    function frame() {
      if (!ctx) return;
      const p = progressRef.current;
      const cfg = stageWeights(p);
      const parts = particlesRef.current;
      const active = Math.max(1, Math.floor(cfg.count));

      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        20,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.55,
      );
      g.addColorStop(0, `rgba(0,168,150,${0.08 + cfg.teal * 0.1})`);
      g.addColorStop(0.55, "rgba(0,87,255,0.05)");
      g.addColorStop(1, "rgba(1,21,16,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const alive = i < active;
        const target = targetFor(i, p, active);
        const pull = cfg.pull;

        part.vx += (target.x - part.x) * pull * 0.08;
        part.vy += (target.y - part.y) * pull * 0.08;

        const swirl = 0.015 * (1 - p);
        part.vx += (-(part.y - h * 0.5) * swirl) / 40;
        part.vy += ((part.x - w * 0.5) * swirl) / 40;

        if (interactive && mouse.active) {
          const mx = mouse.x * w;
          const my = mouse.y * h;
          const dx = part.x - mx;
          const dy = part.y - my;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 160) {
            const force = (1 - dist / 160) * 1.8;
            part.vx += (dx / dist) * force;
            part.vy += (dy / dist) * force;
          }
        }

        part.vx *= 0.9;
        part.vy *= 0.9;
        part.x += part.vx;
        part.y += part.vy;

        if (!alive && p < 0.88) continue;

        const radius =
          p >= 0.88
            ? 3.2 + (i % 3) * 0.6
            : cfg.scale * 10 + (Math.sin(part.seed) * 0.5 + 0.5) * 2.2;

        const alpha =
          p >= 0.88
            ? 0.85
            : alive
              ? 0.35 + cfg.teal * 0.45
              : 0;

        if (alpha <= 0.02) continue;

        ctx.beginPath();
        ctx.fillStyle =
          p > 0.7
            ? `rgba(94,224,208,${alpha})`
            : p > 0.4
              ? `rgba(126,176,255,${alpha})`
              : `rgba(247,243,236,${alpha})`;
        ctx.arc(part.x, part.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (p > 0.8 && p < 0.95) {
        const t = (p - 0.8) / 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(94,224,208,${0.15 + t * 0.35})`;
        ctx.lineWidth = 2;
        ctx.arc(w * 0.5, h * 0.48, 28 + t * 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    }
    function onLeave() {
      mouseRef.current.active = false;
    }

    if (interactive) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true" />
  );
}
