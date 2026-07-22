import { useEffect, useRef, type RefObject } from "react";

type TrailImage = { src: string; alt: string };

export function useTrailImages(
  containerRef: RefObject<HTMLElement | null>,
  images: TrailImage[],
) {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(hover: none)").matches) return;

    let lastX = -9999;
    let lastY = -9999;
    let index = 0;
    let raf = 0;
    let lastTime = 0;
    const minDistance = 55;
    const throttleMs = 140;
    const nodes = imgRefs.current.filter(Boolean) as HTMLImageElement[];
    if (nodes.length === 0) return;

    function spawn(x: number, y: number) {
      const node = nodes[index % nodes.length];
      if (!node || !container) return;
      const asset = images[index % images.length];
      if (asset && node.getAttribute("src") !== asset.src) {
        node.src = asset.src;
        node.alt = asset.alt;
      }
      const rect = container.getBoundingClientRect();
      const width = 140 + Math.random() * 70;
      const rotate = (Math.random() - 0.5) * 16;
      node.style.width = `${width}px`;
      node.style.left = `${x - rect.left - width / 2}px`;
      node.style.top = `${y - rect.top - width * 0.65}px`;
      node.style.transform = `rotate(${rotate}deg) scale(0.88)`;
      node.style.opacity = "0";
      node.style.zIndex = String(10 + index);
      void node.offsetWidth;
      node.style.transform = `rotate(${rotate}deg) scale(1)`;
      node.style.opacity = "1";
      const current = node;
      setTimeout(() => {
        current.style.opacity = "0";
        current.style.transform = `rotate(${rotate}deg) scale(1.06)`;
      }, 750);
      index += 1;
      lastX = x;
      lastY = y;
    }

    function onMove(event: MouseEvent) {
      const now = Date.now();
      if (
        Math.hypot(event.clientX - lastX, event.clientY - lastY) <
          minDistance ||
        now - lastTime < throttleMs
      ) {
        return;
      }
      lastTime = now;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => spawn(event.clientX, event.clientY));
    }

    container.addEventListener("mousemove", onMove);
    return () => {
      container.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [containerRef, images]);

  return imgRefs;
}
