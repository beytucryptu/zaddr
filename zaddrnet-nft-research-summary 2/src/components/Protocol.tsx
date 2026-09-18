import { motion } from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  Check,
  ClipboardList,
  KeyRound,
  ListChecks,
  Quote,
  ScanSearch,
} from "lucide-react";

const STEPS = [
  {
    icon: AtSign,
    no: "01",
    title: "SIGN IN WITH X",
    desc: "Head to zaddr.net and connect your X account. Your face is public to all — your account only yours.",
  },
  {
    icon: ListChecks,
    no: "02",
    title: "COMPLETE THE TASKS",
    desc: "Follow, RT, comment. All of it is on record; don't leave them half-done, leave a mark on the list.",
  },
  {
    icon: KeyRound,
    no: "03",
    title: "SUBMIT A ZCASH ADDRESS",
    desc: "Have a shielded ZEC address ready. It's a required form field — don't leave it for the last minute.",
  },
  {
    icon: ScanSearch,
    no: "04",
    title: "MANUAL REVIEW",
    desc: "Every application is read by the team, one by one. Thousands applied — consistency stands out.",
  },
];

const TIPS = [
  "Tag @zaddrnet in every tweet",
  "RT + thoughtful comment = visibility",
  "Be active in community channels",
  "Have your ZEC address ready",
  "Finish the application on zaddr.net",
];

export default function Protocol() {
  return (
    <section id="wl" className="relative border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <div className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/50" />
          03 — WHITELIST PROTOCOL
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
            Four steps<br />
            <span className="text-stroke">into the list.</span>
          </h2>
          <a
            href="https://zaddr.net"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 font-mono2 text-xs font-bold tracking-[0.15em] text-gold"
          >
            START YOUR APPLICATION
            <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ink p-7 transition-colors hover:bg-panel"
            >
              <span className="absolute right-5 top-4 font-display text-5xl text-line transition-colors group-hover:text-gold/25">
                {s.no}
              </span>
              <s.icon size={24} strokeWidth={1.25} className="text-gold" />
              <h3 className="mt-16 font-display text-lg tracking-wide text-bone">{s.title}</h3>
              <p className="mt-3 font-mono2 text-[11px] leading-relaxed text-dim">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* pro tip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 border border-gold/40 bg-gold p-8 text-ink sm:p-10"
        >
          <div className="flex items-start gap-4">
            <Quote size={28} strokeWidth={1.5} className="mt-1 shrink-0" />
            <div>
              <p className="font-display text-2xl uppercase leading-tight sm:text-3xl">
                The secret: promotion is part of the selection.
              </p>
              <p className="mt-3 max-w-2xl font-mono2 text-xs font-medium leading-relaxed sm:text-sm">
                The ZADDR team says positive posts about the project on X raise your approval
                odds. Applying is free; the mint date is still in the dark.
                The only thing you can produce today: <span className="font-bold">signal</span>.
              </p>
            </div>
            <BadgeCheck size={28} strokeWidth={1.5} className="ml-auto mt-1 hidden shrink-0 sm:block" />
          </div>

          <div className="mt-8 grid gap-2 border-t border-ink/15 pt-6 sm:grid-cols-2 lg:grid-cols-5">
            {TIPS.map((t) => (
              <p key={t} className="flex items-center gap-2 font-mono2 text-[10px] font-bold tracking-wide">
                <Check size={12} strokeWidth={3} className="shrink-0" />
                {t.toUpperCase()}
              </p>
            ))}
          </div>
        </motion.div>

        {/* the one metric that matters */}
        <div className="mt-10 flex flex-wrap items-center gap-3 font-mono2 text-[10px] tracking-[0.25em] text-dim">
          <ClipboardList size={12} className="text-gold" />
          SELECTION METRIC: <span className="text-bone">CONSISTENCY × VISIBILITY × POSITIVITY</span>
        </div>
      </div>
    </section>
  );
}
