import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCount(target: number, active: boolean, dur = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, dur]);
  return v;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const supply = useCount(2800, inView);
  const views = useCount(1.5, inView);
  const apps = useCount(4000, inView);

  const cells = [
    { label: "TOTAL SUPPLY", value: Math.round(supply).toLocaleString("en-US"), note: "HAND-DRAWN PIXEL AVATARS" },
    { label: "LAUNCH TWEET VIEWS", value: `${views.toFixed(1)}M+`, note: "AND STILL CLIMBING ON X" },
    { label: "WL APPLICATIONS", value: `${Math.round(apps / 100) / 10}K+`, note: "UNDER MANUAL REVIEW" },
    { label: "MINT DATE & PRICE", value: "TBA", note: "WAITING IN THE DARK" },
  ];

  return (
    <section ref={ref} className="border-b border-line">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {cells.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative border-b border-r border-line px-6 py-10 last:border-r-0 lg:border-b-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
          >
            <p className="font-mono2 text-[10px] tracking-[0.3em] text-dim">{c.label}</p>
            <p className="mt-4 font-display text-5xl text-gold transition-colors group-hover:text-bone sm:text-6xl">
              {c.value}
            </p>
            <p className="mt-3 font-mono2 text-[10px] tracking-[0.2em] text-dim/70">{c.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
