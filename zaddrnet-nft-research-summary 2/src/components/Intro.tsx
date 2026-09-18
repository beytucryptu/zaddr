import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const LINES = [
  "> ESTABLISHING SHIELDED CONNECTION…",
  "> ORCHARD POOL ACCESSED",
  "> LOADING 2,800 FACES",
  "> IDENTITIES ENCRYPTED  ████████",
];

export default function Intro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const granted = step >= LINES.length;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 420 * (i + 1)));
    });
    timers.push(setTimeout(onDone, 420 * (LINES.length + 1) + 500));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-ink px-6"
      onClick={onDone}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

      <div className="w-full max-w-md font-mono2 text-xs sm:text-sm">
        <div className="mb-6 flex items-center gap-2 text-gold">
          <Shield size={14} strokeWidth={1.5} />
          <span className="tracking-[0.3em]">ZADDR://TRIBUTE</span>
        </div>

        <div className="space-y-2 text-dim">
          {LINES.slice(0, step).map((l, i) => (
            <motion.p key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              <span className={i === LINES.length - 1 ? "text-mint" : ""}>{l}</span>
            </motion.p>
          ))}
          {granted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-2 font-bold tracking-[0.25em] text-gold"
            >
              ACCESS GRANTED
            </motion.p>
          )}
        </div>

        <div className="mt-8 h-px w-full bg-line">
          <motion.div
            className="h-px bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(100, (step / LINES.length) * 100)}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>

        <p className="mt-4 text-[10px] tracking-widest text-dim/60">
          CLICK TO SKIP <span className="animate-blink text-gold">▮</span>
        </p>
      </div>
    </motion.div>
  );
}
