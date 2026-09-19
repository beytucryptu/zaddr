import { useState } from "react";
import { motion } from "framer-motion";
import { AtSign, Check, Copy, ExternalLink, Image, Layers, Repeat2 } from "lucide-react";

/* ------------------------------------------------------------ */
/* THE THREAD — the full story, 6 posts                          */
/* ------------------------------------------------------------ */

const THREAD: string[] = [
  `I built a website to earn a spot on the @zaddrnet whitelist.

Not because the application form asked me to — because the idea demanded it.

A short thread on why:`,

  `The @zaddrnet thesis:

2,800 pixel faces — fully public.
Their owners — sealed in Zcash's Orchard pool.

Art you can verify. Owners you cannot find.

I realized the only honest way to say "I understand" was to build the idea myself.`,

  `So the site runs its own generator: anonymous pixel faces born from random seeds — public art, hex names, sealed owners.

Plus a manifesto, a WL protocol guide, and a tweet arsenal for the community.

My application isn't a form. It's a working prototype of the philosophy.`,

  `There is a paradox in promoting a privacy project loudly, in public — and that's exactly the point.

Privacy is not hiding. Privacy is choosing.

I choose for this work to be public. My wallet and identity stay sealed.

Selective disclosure, demonstrated by the applicant.`,

  `Mint date: TBA.
Application: free.

There is currently no way to buy conviction in this project — so time is the only currency it accepts.

This site is my non-refundable deposit.`,

  `Soon, 2,800 wallets will write this project's story.

Judge me by what I built BEFORE being selected, with zero guarantee of reward — it's the best data you have on what I'll do after.

Faces public. Owners hidden. Work public.

#ZADDR #Zcash #ZEC #Privacy`,
];

/* ------------------------------------------------------------ */
/* SINGLE TWEETS                                                 */
/* ------------------------------------------------------------ */

interface Tweet {
  tag: string;
  tone: string;
  text: string;
}

const TWEETS: Tweet[] = [
  {
    tag: "EN",
    tone: "THE BUILDER",
    text: `I didn't just apply for the @zaddrnet whitelist — I built a tribute site for it.

Why? Because the concept deserved code:

2,800 faces — public.
Every owner — sealed in Zcash's Orchard pool.

Faces public. Owners hidden — now running on my own code.

WL application is in. This is my signal.

#ZADDR #Zcash #ZEC #Privacy`,
  },
  {
    tag: "EN",
    tone: "GLOBAL REACH",
    text: `Privacy is not a feature. It is a right.

@zaddrnet gets it:
2,800 faces — public.
The owners — sealed in the dark.

Built on Zcash's Orchard pool, this is not another NFT drop. It is a statement.

WL applied. Count me in.

#ZADDR #Zcash #ZEC #NFT`,
  },
  {
    tag: "TR",
    tone: "MANİFESTO",
    text: `Gizlilik bir özellik değil, bir hak.

@zaddrnet tam da bunu anlıyor.

2.800 yüz — herkese açık.
Sahiplerin kimliği — tamamen gizli.

Zcash'in Orchard gizlilik havuzu üzerinde inşa edilen bu proje, NFT dünyasına bambaşka bir perspektif katıyor: yüzü görürsün, sahibini göremezsin.

Bu vizyona inanıyorum. WL başvurumu yaptım — bu yolculuğun parçası olmak istiyorum.

#ZADDR #Zcash #ZEC #NFT #Privacy`,
  },
  {
    tag: "TR",
    tone: "KISA VURUCU",
    text: `Yüzü görüyorum. Sahibini göremiyorum.

@zaddrnet NFT'yi olması gereken hale getiriyor: açık sanat, gizli sahiplik.

2.800 piksel portre, Zcash Orchard havuzunda.

WL için buradayım.

#ZADDR #Zcash #ZEC`,
  },
];

const NOTES = [
  { icon: AtSign, text: "TAG @zaddrnet EVERY TIME" },
  { icon: Image, text: "ATTACH YOUR GENERATED FACE" },
  { icon: Repeat2, text: "RT + COMMENT = SIGNAL" },
];

/* ------------------------------------------------------------ */

function useCopy(): [number | null, (i: number, text: string) => void] {
  const [copied, setCopied] = useState<number | null>(null);
  const copy = (i: number, text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(i);
        setTimeout(() => setCopied(null), 1600);
      })
      .catch(() => {});
  };
  return [copied, copy];
}

function ThreadPanel() {
  const [copied, copy] = useCopy();
  const fullThread = THREAD.map((t, i) => `${i + 1}/${THREAD.length}\n\n${t}`).join("\n\n———\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-gold/50 bg-ink"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 bg-gold px-2.5 py-1 font-mono2 text-[10px] font-bold tracking-[0.2em] text-ink">
            <Layers size={12} />
            THREAD
          </span>
          <span className="font-mono2 text-[10px] tracking-[0.2em] text-dim">
            THE FULL STORY — {THREAD.length} POSTS · POST IN ORDER
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copy(999, fullThread)}
            className={`flex items-center gap-2 px-4 py-2 font-mono2 text-[10px] font-bold tracking-[0.15em] transition-colors ${
              copied === 999 ? "bg-mint text-ink" : "bg-gold text-ink hover:bg-goldsoft"
            }`}
          >
            {copied === 999 ? <Check size={12} /> : <Copy size={12} />}
            {copied === 999 ? "THREAD COPIED" : "COPY FULL THREAD"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(THREAD[0])}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-line px-4 py-2 font-mono2 text-[10px] font-bold tracking-[0.15em] text-bone transition-colors hover:border-gold hover:text-gold"
          >
            <ExternalLink size={12} />
            START ON X
          </a>
        </div>
      </div>

      <ol className="divide-y divide-line">
        {THREAD.map((t, i) => (
          <li key={i} className="group relative flex gap-5 px-6 py-5 transition-colors hover:bg-panel/60">
            <span className="font-display text-2xl text-gold/40 transition-colors group-hover:text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="flex-1 whitespace-pre-wrap font-mono2 text-[11px] leading-relaxed text-bone/85">
              {t}
            </p>
            <button
              onClick={() => copy(i, t)}
              className="mt-1 h-fit shrink-0 border border-line p-2 text-dim transition-colors hover:border-gold hover:text-gold"
              aria-label={`Copy post ${i + 1}`}
            >
              {copied === i ? <Check size={13} className="text-mint" /> : <Copy size={13} />}
            </button>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

function TweetCard({ tweet, index }: { tweet: Tweet; index: number }) {
  const [copied, copy] = useCopy();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col border border-line bg-panel p-6 transition-colors hover:border-gold/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="bg-gold px-2 py-1 font-mono2 text-[10px] font-bold tracking-[0.2em] text-ink">
            {tweet.tag}
          </span>
          <span className="border border-line px-2 py-1 font-mono2 text-[10px] tracking-[0.2em] text-dim">
            {tweet.tone}
          </span>
        </div>
        <span className="font-mono2 text-[10px] text-dim/60">{tweet.text.length} CH</span>
      </div>

      <p className="mt-5 flex-1 whitespace-pre-wrap font-mono2 text-[11px] leading-relaxed text-bone/85">
        {tweet.text}
      </p>

      <div className="mt-6 flex gap-2 border-t border-line pt-4">
        <button
          onClick={() => copy(index, tweet.text)}
          className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 font-mono2 text-[11px] font-bold tracking-[0.15em] transition-colors ${
            copied === index ? "bg-mint text-ink" : "bg-gold text-ink hover:bg-goldsoft"
          }`}
        >
          {copied === index ? <Check size={13} /> : <Copy size={13} />}
          {copied === index ? "COPIED" : "COPY TEXT"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet.text)}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 border border-line px-3 py-2.5 font-mono2 text-[11px] font-bold tracking-[0.15em] text-bone transition-colors hover:border-gold hover:text-gold"
        >
          <ExternalLink size={13} />
          POST ON X
        </a>
      </div>
    </motion.div>
  );
}

export default function Tweets() {
  return (
    <section id="tweetler" className="relative border-b border-line bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <div className="flex items-center gap-3 font-mono2 text-[10px] tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold/50" />
          05 — TWEET ARSENAL
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
            Ready signal.<br />
            <span className="text-gold">One click, live.</span>
          </h2>
          <p className="mt-6 font-mono2 text-sm leading-relaxed text-dim">
            Lead with the thread — it tells the full story. Then keep the
            single tweets in rotation. Copy, attach your face, post, repeat.
          </p>
        </div>

        <div className="mt-14">
          <ThreadPanel />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {TWEETS.map((t, i) => (
            <TweetCard key={i} tweet={t} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border border-line bg-ink px-6 py-4">
          {NOTES.map((n) => (
            <p key={n.text} className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.2em] text-dim">
              <n.icon size={12} className="text-gold" />
              {n.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
