import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectDetail({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        layoutId={`project-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--neon-cyan)]/40 bg-[oklch(0.15_0.03_265)] p-8 shadow-[0_0_60px_-15px_var(--electric-indigo)]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md border border-white/10 p-2 text-white/60 transition hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]"
        >
          <X size={16} />
        </button>
        <motion.div layoutId={`project-code-${project.id}`} className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)]">
          {project.code}
        </motion.div>
        <motion.h3 layoutId={`project-title-${project.id}`} className="font-display text-3xl font-bold text-white">
          {project.name}
        </motion.h3>
        <p className="mt-3 text-white/70">{project.description}</p>
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/40 to-transparent" />
        <div className="mb-3 font-mono text-[10px] tracking-[0.3em] text-white/50">// KEY_OPS</div>
        <ul className="space-y-2 text-sm text-white/70">
          {project.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex gap-2"
            >
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--holo-violet)]" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-sm border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/[0.06] px-2.5 py-1 font-mono text-[10px] tracking-widest text-[var(--neon-cyan)]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}