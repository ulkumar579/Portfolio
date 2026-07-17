import { motion } from "framer-motion";
import { stats } from "@/data/portfolio";
import CountUp from "../shared/CountUp";

export default function HudStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md rounded-xl border border-[var(--neon-cyan)]/30 bg-white/[0.02] p-5 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-white/50">
        <span>// HUD_STAT_CONSOLE</span>
        <span className="text-[var(--neon-cyan)]">●●●</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * idx, duration: 0.4 }}
            className="rounded-lg border border-white/10 bg-black/30 p-4"
          >
            <div className="font-display text-3xl font-bold text-white">
              <CountUp to={s.value} suffix={s.suffix} pad={2} />
            </div>
            <div className="mt-1 whitespace-pre-line font-mono text-[9px] tracking-widest text-white/50">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 font-mono text-[9px] tracking-widest text-white/30">// SYS.SYNCED</div>
    </motion.div>
  );
}