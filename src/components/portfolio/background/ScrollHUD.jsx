import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollHUD() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);
  const dash = useTransform(scrollYProgress, (v) => `${v * 138} 138`);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--electric-indigo)] to-[var(--holo-violet)] shadow-[0_0_12px_var(--neon-cyan)]"
      />
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-center gap-1 md:flex">
        <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
          <circle cx="26" cy="26" r="22" stroke="oklch(1 0 0 / 0.1)" strokeWidth="2" fill="none" />
          <motion.circle
            cx="26" cy="26" r="22"
            stroke="var(--neon-cyan)" strokeWidth="2" fill="none" strokeLinecap="round"
            style={{ strokeDasharray: dash }}
            className="drop-shadow-[0_0_6px_var(--neon-cyan)]"
          />
        </svg>
        <motion.span className="font-mono text-[10px] tracking-widest text-[var(--neon-cyan)]">{pct}</motion.span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">SCROLL</span>
      </div>
    </>
  );
}