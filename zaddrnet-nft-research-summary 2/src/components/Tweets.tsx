import { useState } from "react";
import { motion } from "framer-motion";
import { AtSign, Check, Copy, ExternalLink, Image, Repeat2 } from "lucide-react";

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

So I wrote my own anonymous pixel-face generator, a manifesto, and a WL mission log.

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

function TweetCard({ tweet, index }: { tweet: Tweet; index: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tweet.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

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
          onClick={copy}
          className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 font-mono2 text-[11px] font-bold tracking-[0.15em] transition-colors ${
            copied ? "bg-mint text-ink" : "bg-gold text-ink hover:bg-goldsoft"
          }`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "COPIED" : "COPY TEXT"}
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
          04 — TWEET ARSENAL
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
            Ready signal.<br />
            <span className="text-gold">One click, live.</span>
          </h2>
          <p className="mt-6 font-mono2 text-sm leading-relaxed text-dim">
            Four tones, four ranges. Copy, attach your face, post. Then repeat —
            the algorithm and the team both love repetition.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
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
