import { EyeOff, Fingerprint, Ghost, KeyRound, Lock, Shield, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS: { icon: LucideIcon; text: string }[] = [
  { icon: Shield, text: "SHIELDED BY DEFAULT" },
  { icon: EyeOff, text: "OWNERS HIDDEN" },
  { icon: Zap, text: "ORCHARD POOL" },
  { icon: Lock, text: "2,800 FACES" },
  { icon: KeyRound, text: "ZK-SNARKS" },
  { icon: Fingerprint, text: "NAMES PUBLIC" },
  { icon: Ghost, text: "ZERO IDENTITIES" },
];

export default function Marquee() {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-3 px-6">
          <item.icon size={13} className="text-gold" strokeWidth={1.5} />
          <span className="font-mono2 text-xs font-bold tracking-[0.28em] text-bone">
            {item.text}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-panel py-3.5">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
