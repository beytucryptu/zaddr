import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, ShieldCheck } from "lucide-react";
import { drawAvatar, generateAvatar, randomSeed } from "../lib/pixels";
import type { Avatar } from "../lib/pixels";

const SIZE = 360;

export default function Generator() {
  const [avatar, setAvatar] = useState<Avatar>(() => generateAvatar(randomSeed()));
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#0d0d09";
    ctx.fillRect(0, 0, SIZE, SIZE);
    drawAvatar(ctx, avatar, Math.floor(SIZE / avatar.N));
  }, [avatar]);

  const reroll = useCallback(() => {
    setSpinning(true);
    setAvatar(generateAvatar(randomSeed()));
    setTimeout(() => setSpinning(false), 500);
  }, []);

  const download = useCallback(() => {
    const out = document.createElement("canvas");
    const pad = 48;
    const px = 768 + pad * 2;
    out.width = px;
    out.height = px;
    const ctx = out.getContext("2d")!;
    ctx.fillStyle = "#0d0d09";
    ctx.fillRect(0, 0, px, px);
    drawAvatar(ctx, avatar, Math.floor(768 / avatar.N), pad, pad);
    ctx.strokeStyle = "#f4b728";
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, px - 20, px - 20);
    ctx.font = "500 26px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#908a78";
    ctx.fillText(`${avatar.id} — STAY DARK`, pad, px - pad + 22);
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = `zaddr-face-${avatar.id.toLowerCase()}.png`;
    a.click();
  }, [avatar]);

  return (
    <section id="yuz" className="relative border-b border-line bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <div className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/50" />
          02 — YOUR ANONYMOUS FACE
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* canvas frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="corner relative mx-auto w-full max-w-[420px] border border-line bg-panel p-4"
          >
            <i />
            <div className="relative overflow-hidden">
              <motion.div
                key={avatar.seed}
                initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <canvas
                  ref={canvasRef}
                  style={{ width: "100%", height: "auto" }}
                  className="pixelated block"
                />
              </motion.div>
              <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
            </div>

            <div className="mt-4 flex items-center justify-between font-mono2 text-[10px] tracking-[0.2em]">
              <span className="text-gold">{avatar.id}</span>
              <span className="flex items-center gap-1.5 text-mint">
                <ShieldCheck size={11} />
                IDENTITY: SEALED
              </span>
            </div>
          </motion.div>

          {/* controls */}
          <div>
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
              Seal your<br />
              <span className="text-gold">face.</span>
            </h2>
            <p className="mt-6 max-w-md font-mono2 text-sm leading-relaxed text-dim">
              The best way to catch the team's eye is to prove you live the concept.
              Generate your own shielded avatar, download the PNG and{" "}
              <span className="text-bone">attach it to your WL tweet</span>. The algorithm loves visuals.
            </p>

            {/* traits */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono2 text-[10px] font-bold tracking-[0.2em] text-gold">
                {avatar.tier}
              </span>
              {avatar.traits.length === 0 && (
                <span className="border border-line px-3 py-1.5 font-mono2 text-[10px] tracking-[0.2em] text-dim">
                  NO TRAITS — PURE FACE
                </span>
              )}
              {avatar.traits.map((t) => (
                <span
                  key={t.name}
                  className="border border-line px-3 py-1.5 font-mono2 text-[10px] tracking-[0.2em] text-bone"
                >
                  {t.name}
                </span>
              ))}
            </div>

            {/* cipher score */}
            <div className="mt-6 max-w-sm">
              <div className="flex justify-between font-mono2 text-[10px] tracking-[0.25em] text-dim">
                <span>CIPHER SCORE</span>
                <span className="text-gold">{avatar.score}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-line">
                <motion.div
                  className="h-1 bg-gold"
                  animate={{ width: `${Math.min(100, (avatar.score / 60) * 100)}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={reroll}
                className="group flex items-center gap-2 bg-gold px-6 py-3.5 font-mono2 text-xs font-bold tracking-[0.15em] text-ink transition-transform hover:-translate-y-0.5"
              >
                <RefreshCw size={14} className={spinning ? "animate-spin" : "transition-transform group-hover:rotate-90"} />
                NEW FACE
              </button>
              <button
                onClick={download}
                className="flex items-center gap-2 border border-line bg-panel px-6 py-3.5 font-mono2 text-xs font-bold tracking-[0.15em] text-bone transition-colors hover:border-gold hover:text-gold"
              >
                <Download size={14} />
                DOWNLOAD PNG
              </button>
            </div>

            <p className="mt-6 max-w-sm font-mono2 text-[10px] leading-relaxed tracking-wide text-dim/70">
              Attach the PNG to your tweet and drop the face's ID in the caption:
              every face public, every owner hidden. Just like zaddr.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
