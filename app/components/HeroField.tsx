import { useEffect, useRef } from "react";

/** Soft interactive particle field for the hero — no animal photos. */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0.5, y: 0.5, active: false };
    const dots = Array.from({ length: 64 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + (i % 5) * 0.45,
      phase: i * 0.7,
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

    function frame(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;

      for (const dot of dots) {
        let x = dot.x * w + Math.sin(time * 0.6 + dot.phase) * 18;
        let y = dot.y * h + Math.cos(time * 0.5 + dot.phase) * 14;

        if (mouse.active) {
          const mx = mouse.x * w;
          const my = mouse.y * h;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 180) {
            const f = (1 - dist / 180) * 28;
            x += (dx / dist) * f;
            y += (dy / dist) * f;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(247,243,236,0.22)";
        ctx.arc(x, y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor glow
      if (mouse.active) {
        const g = ctx.createRadialGradient(
          mouse.x * w,
          mouse.y * h,
          0,
          mouse.x * w,
          mouse.y * h,
          140,
        );
        g.addColorStop(0, "rgba(0,168,150,0.18)");
        g.addColorStop(1, "rgba(0,168,150,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
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
  }, []);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
