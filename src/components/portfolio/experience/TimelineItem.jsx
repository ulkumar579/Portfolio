import { motion } from "framer-motion";

export default function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-10"
    >
      <div className="absolute left-[6px] top-2 h-3 w-3 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_16px_var(--neon-cyan)]" />
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md transition hover:border-[var(--neon-cyan)]/40 sm:p-6">
        <div className="mb-1 font-mono text-[10px] tracking-widest text-[var(--neon-cyan)]">
          {item.period}
        </div>
        <h3 className="font-display text-xl font-semibold text-white">{item.role}</h3>
        <div className="mb-4 font-mono text-xs tracking-wider text-white/50">@ {item.company}</div>
        <ul className="space-y-2 text-sm text-white/70">
          {item.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex gap-2"
            >
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--holo-violet)]" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}