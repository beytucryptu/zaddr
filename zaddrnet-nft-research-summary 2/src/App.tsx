import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Manifesto from "./components/Manifesto";
import Generator from "./components/Generator";
import Protocol from "./components/Protocol";
import Tweets from "./components/Tweets";
import Footer from "./components/Footer";

export default function App() {
  const [intro, setIntro] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 });

  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro]);

  return (
    <div className="min-h-screen bg-ink text-bone">
      {/* top scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gold"
        style={{ scaleX: progress }}
      />

      {/* film grain */}
      <div className="grain pointer-events-none fixed inset-0 z-40 opacity-[0.05]" />

      <AnimatePresence>
        {intro && <Intro key="intro" onDone={() => setIntro(false)} />}
      </AnimatePresence>

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Manifesto />
        <Generator />
        <Protocol />
        <Tweets />
        <Footer />
      </main>
    </div>
  );
}
