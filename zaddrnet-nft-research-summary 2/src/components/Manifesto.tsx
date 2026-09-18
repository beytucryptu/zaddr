import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const TEXT =
  "Everyone knows your name — no one knows your balance. zaddr is 2,800 hand-drawn pixel portraits living inside Zcash's Orchard shielded pool: faces public, ownership sealed, transactions dark.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {children}&nbsp;
    </motion.span>
  );
}

const PILLARS = [
  {
    icon: Eye,
    title: "READABLE IDENTITY",
    desc: "You see the name. Never the address, the balance, the history. Identity ends at the handle.",
  },
  {
    icon: EyeOff,
    title: "PRIVATE BY DEFAULT",
    desc: "Sender, receiver and amount — they stay in Orchard's dark unless you say otherwise.",
  },
  {
    icon: ShieldCheck,
    title: "SEALED OWNERSHIP",
    desc: "The NFT is public; the owner is not. Proof lives on-chain, identity stays with you.",
  },
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = TEXT.split(" ");

  return (
    <section id="manifesto" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <div className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/50" />
          01 — THE CONCEPT
        </div>

        <div className="mt-10 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/* reveal paragraph */}
          <p
            ref={ref}
            className="font-display text-3xl uppercase leading-[1.15] text-bone sm:text-5xl"
          >
            {words.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {w}
              </Word>
            ))}
          </p>

          {/* orchard rings */}
          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
            <div className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-gold/30" />
            <div className="absolute inset-6 animate-spin-rev rounded-full border border-gold/15" />
            <div className="absolute inset-14 animate-spin-slower rounded-full border border-dashed border-mint/20" />
            <div className="absolute inset-24 rounded-full border border-line bg-panel/60 backdrop-blur" />
            <span className="relative z-10 font-display text-8xl text-gold sm:text-9xl">Z</span>
            <div className="absolute -bottom-8 w-full text-center font-mono2 text-[9px] tracking-[0.35em] text-dim">
              ORCHARD SHIELDED POOL /// MEMO: SEALED
            </div>
          </div>
        </div>

        {/* pillars */}
        <div className="mt-24 grid gap-px border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-panel p-8 transition-colors hover:bg-[#12120c]"
            >
              <p.icon size={26} strokeWidth={1.25} className="text-gold" />
              <h3 className="mt-6 font-display text-xl tracking-wide text-bone">{p.title}</h3>
              <p className="mt-3 font-mono2 text-xs leading-relaxed text-dim">{p.desc}</p>
              <p className="mt-6 font-mono2 text-[10px] tracking-[0.2em] text-dim/50">
                <span className="redact">0x████ · SEALED</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
