import { useEffect, useRef } from "react";

type LifeFieldProps = {
  accent: string;
  mode: "disease" | "cross" | "zoonotic" | "geo" | "early";
};

/** Abstract interactive panel — replaces animal photos in lifespan tabs. */
export function LifeField({ accent, mode }: LifeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0.5, y: 0.5, active: false };

    const nodes = Array.from({ length: 18 }, (_, i) => ({
      x: 0.15 + (i % 6) * 0.14,
      y: 0.2 + Math.floor(i / 6) * 0.28,
      phase: i * 0.9,
    }));

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
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#011510");
      g.addColorStop(0.55, "#0b1f3a");
      g.addColorStop(1, "#063d32");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const time = reduce ? 0 : t * 0.001;
      const mx = mouse.x * w;
      const my = mouse.y * h;

      if (mode === "disease" || mode === "early") {
        // Pulse rings — detection / pattern
        for (let i = 0; i < 5; i++) {
          const r = 28 + i * 36 + Math.sin(time + i) * 6;
          ctx.beginPath();
          ctx.strokeStyle = `${accent}${i === 0 ? "cc" : "55"}`;
          ctx.lineWidth = i === 0 ? 2.5 : 1.2;
          ctx.arc(
            w * 0.5 + (mouse.active ? (mx - w * 0.5) * 0.08 : 0),
            h * 0.5 + (mouse.active ? (my - h * 0.5) * 0.08 : 0),
            r,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = accent;
        ctx.arc(w * 0.5, h * 0.5, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (mode === "cross") {
        // Linked species nodes
        const pts = nodes.map((n, i) => {
          let x = n.x * w + Math.sin(time * 0.7 + n.phase) * 8;
          let y = n.y * h + Math.cos(time * 0.6 + n.phase) * 6;
          if (mouse.active) {
            const dx = x - mx;
            const dy = y - my;
            const d = Math.hypot(dx, dy) || 1;
            if (d < 120) {
              x += (dx / d) * (1 - d / 120) * 18;
              y += (dy / d) * (1 - d / 120) * 18;
            }
          }
          return { x, y, i };
        });
        ctx.strokeStyle = "rgba(126,176,255,0.35)";
        ctx.lineWidth = 1;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            if ((i + j) % 3 !== 0) continue;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        for (const p of pts) {
          ctx.beginPath();
          ctx.fillStyle = p.i % 2 === 0 ? accent : "#5ee0d0";
          ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (mode === "zoonotic") {
        // Two overlapping fields (animal ↔ human)
        const a = {
          x: w * 0.38 + Math.sin(time) * 6,
          y: h * 0.5,
        };
        const b = {
          x: w * 0.62 + Math.cos(time) * 6,
          y: h * 0.5,
        };
        if (mouse.active) {
          a.x += (mx - w * 0.5) * 0.05;
          b.x += (mx - w * 0.5) * 0.05;
        }
        for (const [c, color] of [
          [a, accent],
          [b, "#5ee0d0"],
        ] as const) {
          const rg = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, 110);
          rg.addColorStop(0, `${color}66`);
          rg.addColorStop(1, `${color}00`);
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 110, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.strokeStyle = "rgba(247,243,236,0.35)";
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Geography arcs
        ctx.strokeStyle = "rgba(247,243,236,0.18)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const y = h * (0.22 + i * 0.12);
          ctx.beginPath();
          ctx.moveTo(w * 0.08, y);
          for (let x = 0; x <= 1; x += 0.04) {
            const wave =
              Math.sin(x * 10 + time + i) * 8 +
              (mouse.active ? Math.sin(x * 20 + mouse.x * 8) * 4 : 0);
            ctx.lineTo(w * (0.08 + x * 0.84), y + wave);
          }
          ctx.stroke();
        }
        const dots = 12;
        for (let i = 0; i < dots; i++) {
          const x = w * (0.12 + (i / dots) * 0.76);
          const y =
            h * 0.5 +
            Math.sin(time * 0.8 + i) * 40 +
            (mouse.active ? (my - h * 0.5) * 0.1 : 0);
          ctx.beginPath();
          ctx.fillStyle = i % 2 === 0 ? accent : "#7eb0ff";
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [accent, mode]);

  return <canvas ref={canvasRef} className="life-field" aria-hidden="true" />;
}
