import { motion } from "framer-motion";
import { Feather } from "lucide-react";

function P({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="font-mono2 text-sm leading-8 text-dim"
    >
      {children}
    </motion.p>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 border-gold py-1 pl-6 font-display text-2xl uppercase leading-snug text-bone sm:text-3xl"
    >
      {children}
    </motion.blockquote>
  );
}

export default function Letter() {
  return (
    <section id="letter" className="relative border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <div className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/50" />
          02 — THE OPEN LETTER
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          {/* sticky headline */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
              Not a form.<br />
              <span className="text-gold">A signal.</span>
            </h2>
            <p className="mt-6 max-w-sm font-mono2 text-sm leading-relaxed text-dim">
              Why this site exists — written for the people who will read
              thousands of applications and remember only a handful.
            </p>
            <div className="mt-8 flex items-center gap-2 font-mono2 text-[10px] tracking-[0.25em] text-dim/60">
              <Feather size={12} className="text-gold/70" />
              TO: THE 2,800 SELECTORS
            </div>
          </div>

          {/* the letter */}
          <div className="corner relative border border-line bg-panel p-7 sm:p-12">
            <i />
            <div className="scanlines pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative space-y-7">
              <P>
                <span className="font-bold tracking-wide text-gold">I'LL BE HONEST. </span>
                Thousands of people filled the same form I did. Same checkboxes,
                same tasks, same address field. If this whitelist were a lottery,
                this website would be a waste of time.
              </P>
              <P>
                But it isn't a lottery. You said it yourselves — applications are
                reviewed <span className="text-bone">manually</span>. And humans don't
                remember forms. <span className="text-bone">Humans remember stories.</span>{" "}
                So here is mine.
              </P>

              <Pull>
                I didn't build this page to decorate my application. I built it because the idea wouldn't leave me alone.
              </Pull>

              <P>
                2,800 faces everyone can see — owned by people nobody can identify.
                A gallery where the art is public and the collector is a ghost.
                That's not an NFT gimmick.{" "}
                <span className="text-bone">
                  That's a philosophy rendered in pixels, and the only honest way
                  to say "I understand it" was to build the idea myself.
                </span>
              </P>
              <P>
                Every face this site generates is born from a random seed and stays
                anonymous: named by a hex, owned by no one, downloadable by anyone.
                It is my small working homage to the Orchard pool —{" "}
                <span className="text-bone">
                  output you can verify, an owner you cannot find.
                </span>
              </P>
              <P>
                And yes, there's a paradox — it's my favorite part. I'm promoting a
                privacy project, loudly, in public. But that is exactly the zaddr
                thesis: <span className="text-bone">privacy is not hiding, privacy is
                choosing.</span> I choose for this work to be public. My wallet, my
                balance, my identity stay sealed. Selective disclosure — demonstrated
                by the applicant, inside the application.
              </P>

              <Pull>
                Mint is TBA. Applying is free. Time is the only currency this project accepts — this site is my non-refundable deposit.
              </Pull>

              <P>
                One more thing, the practical one. In a few months, 2,800 wallets
                will hold these faces, and the project will be judged by what its
                first holders do with the narrative.{" "}
                <span className="text-bone">
                  This page is what I did before I was chosen, with zero guarantee
                  of reward — and that is the most reliable data you have on what
                  I'll do after.
                </span>
              </P>
              <P>
                I'm not asking you to admire the site.
                I'm asking you to notice <span className="text-gold">what it predicts.</span>
              </P>

              <div className="border-t border-line pt-7">
                <p className="font-mono2 text-xs leading-relaxed text-dim">
                  Faces public. Owners hidden.
                  <br />
                  My work public. My conviction — see for yourself.
                </p>
                <p className="mt-5 font-mono2 text-xs tracking-[0.2em] text-dim/60">
                  — <span className="redact">THE APPLICANT</span> (name withheld. obviously.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
