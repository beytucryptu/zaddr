import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Shield, Zap } from "lucide-react";
import AvatarWall from "./AvatarWall";

const letterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};
const letter = {
  hidden: { y: "110%", opacity: 0, rotate: 4 },
  show: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SplitLine({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`block overflow-hidden ${className ?? ""}`}
      variants={letterContainer}
      initial="hidden"
      animate="show"
    >
      {text.split("").map((ch, i) => (
        <motion.span key={i} variants={letter} className="inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* live wall of anonymous faces */}
      <div className="absolute inset-0">
        <AvatarWall />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,7,5,0.55)_60%,#070705_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />

      {/* header */}
      <header className="relative z-20 flex items-center justify-between border-b border-line/70 px-5 py-4 sm:px-10">
        <a href="#top" className="flex items-center gap-2 text-gold">
          <Shield size={16} strokeWidth={1.5} />
          <span className="font-mono2 text-xs font-bold tracking-[0.3em]">ZADDR://TRIBUTE</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono2 text-[11px] tracking-[0.2em] text-dim md:flex">
          <a href="#manifesto" className="transition-colors hover:text-gold">CONCEPT</a>
          <a href="#yuz" className="transition-colors hover:text-gold">YOUR FACE</a>
          <a href="#wl" className="transition-colors hover:text-gold">WL PROTOCOL</a>
          <a href="#tweetler" className="transition-colors hover:text-gold">TWEETS</a>
        </nav>
        <a
          href="https://zaddr.net"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1 border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono2 text-[11px] font-bold tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          ZADDR.NET
          <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </header>

      {/* headline */}
      <div id="top" className="relative z-10 flex flex-1 flex-col justify-center px-5 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-3 font-mono2 text-[10px] tracking-[0.3em] text-gold sm:text-xs"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
          ZCASH // ORCHARD POOL — WL SEASON OPEN
        </motion.div>

        <h1 className="font-display uppercase leading-[0.88] tracking-tight">
          <SplitLine
            text="2,800 FACES."
            className="text-[13vw] text-bone sm:text-[11vw] lg:text-[9rem]"
          />
          <SplitLine
            text="ZERO IDENTITIES."
            className="text-stroke-gold text-[13vw] sm:text-[11vw] lg:text-[9rem]"
          />
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="max-w-md font-mono2 text-sm leading-relaxed text-dim"
          >
            You see the face. <span className="text-bone">You never see the owner.</span>
            <br />
            A tribute to @zaddrnet's privacy experiment — your WL mission log,
            anonymous face generator and tweet arsenal in one page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#yuz"
              className="group flex items-center gap-2 bg-gold px-6 py-3.5 font-mono2 text-xs font-bold tracking-[0.15em] text-ink transition-transform hover:-translate-y-0.5"
            >
              GENERATE YOUR FACE
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#wl"
              className="border border-line bg-panel/60 px-6 py-3.5 font-mono2 text-xs font-bold tracking-[0.15em] text-bone backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              WL PROTOCOL
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex items-center gap-2 font-mono2 text-[10px] tracking-[0.18em] text-gold/80"
        >
          <Zap size={11} />
          THE TEAM SAID IT: POSITIVE POSTS = APPROVAL ODDS ↑
        </motion.div>
      </div>
    </section>
  );
}
