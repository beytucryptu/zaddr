import { useEffect, useRef } from "react";
import { generateAvatar, makeTile, randomSeed } from "../lib/pixels";

interface Cell {
  img: HTMLCanvasElement;
  next: HTMLCanvasElement | null;
  fadeStart: number;
  fadeDur: number;
  base: number;
  phase: number;
  x: number;
  y: number;
}

/**
 * Full-bleed mosaic of anonymous pixel faces.
 * Faces flicker in and out — identities never settle.
 */
export default function AvatarWall({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 82;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cells: Cell[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let lastMutate = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            img: makeTile(generateAvatar(randomSeed()), CELL),
            next: null,
            fadeStart: 0,
            fadeDur: 900,
            base: 0.1 + Math.random() * 0.26,
            phase: Math.random() * Math.PI * 2,
            x: c * CELL + (r % 2 ? CELL / 2 : 0) - CELL / 2,
            y: r * CELL - CELL / 2,
          });
        }
      }
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const frame = (t: number) => {
      if (t - lastMutate > 240 && cells.length) {
        lastMutate = t;
        const picks = 3;
        for (let i = 0; i < picks; i++) {
          const cell = cells[Math.floor(Math.random() * cells.length)];
          if (cell && !cell.next) {
            cell.next = makeTile(generateAvatar(randomSeed()), CELL);
            cell.fadeStart = t;
          }
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const cell of cells) {
        const hum = 0.05 * Math.sin(t * 0.0009 + cell.phase);
        const dx = mouse.x - (cell.x + CELL / 2);
        const dy = mouse.y - (cell.y + CELL / 2);
        const dist = Math.hypot(dx, dy);
        const boost = dist < 240 ? (1 - dist / 240) * 0.55 : 0;
        const drift = 1.6 * Math.sin(t * 0.00025 + cell.phase);

        if (cell.next) {
          const e = Math.min(1, (t - cell.fadeStart) / cell.fadeDur);
          ctx.globalAlpha = Math.max(0, cell.base + hum + boost) * (1 - e);
          ctx.drawImage(cell.img, cell.x + drift, cell.y);
          ctx.globalAlpha = Math.min(1, Math.max(0, cell.base + hum + boost) * e + e * 0.1);
          ctx.drawImage(cell.next, cell.x + drift, cell.y);
          if (e >= 1) {
            cell.img = cell.next;
            cell.next = null;
          }
        } else {
          ctx.globalAlpha = Math.max(0, Math.min(1, cell.base + hum + boost));
          ctx.drawImage(cell.img, cell.x + drift, cell.y);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`pixelated h-full w-full ${className}`} />;
}
