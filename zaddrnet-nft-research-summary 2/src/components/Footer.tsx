import { ArrowUpRight, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-display text-[18vw] uppercase leading-[0.8] text-stroke-gold sm:text-[11rem]">
            STAY<br />DARK.
          </h2>
          <div className="flex flex-col gap-3 font-mono2 text-xs">
            <a
              href="https://zaddr.net"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 border border-line px-5 py-3 tracking-[0.2em] text-bone transition-colors hover:border-gold hover:text-gold"
            >
              ZADDR.NET — OFFICIAL APPLICATION
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://x.com/zaddrnet"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 border border-line px-5 py-3 tracking-[0.2em] text-bone transition-colors hover:border-gold hover:text-gold"
            >
              X // @ZADDRNET
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-20 space-y-3 border-t border-line pt-6 font-mono2 text-[10px] leading-relaxed tracking-wide text-dim/70">
          <p className="flex items-start gap-2">
            <Shield size={12} className="mt-0.5 shrink-0 text-gold/60" />
            This page is an independent fan work dedicated to the @zaddrnet community.
            It is not affiliated with the official project or Electric Coin Co.
          </p>
          <p>
            Nothing here is financial advice. Do your own research — DYOR.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono2 text-[10px] tracking-[0.25em] text-dim/50">
          <span>ZADDR://TRIBUTE — 2026</span>
          <span className="redact text-gold/70">ID: 0x██████ — SEALED</span>
        </div>
      </div>
    </footer>
  );
}
