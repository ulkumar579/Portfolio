import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ProjectCard({ project, onOpen }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 15 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const bg = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, oklch(0.86 0.15 200 / 0.18), transparent 60%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(project)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-colors hover:border-[var(--neon-cyan)]/50"
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <motion.div layoutId={`project-code-${project.id}`} className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)]">
        {project.code}
      </motion.div>
      <motion.h3 layoutId={`project-title-${project.id}`} className="font-display text-xl font-semibold text-white">
        {project.name}
      </motion.h3>
      <p className="mt-2 text-sm text-white/60">{project.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="rounded-sm border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/60">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 font-mono text-[10px] tracking-[0.3em] text-white/40 transition group-hover:text-[var(--neon-cyan)]">
        [EXPAND] →
      </div>
    </motion.div>
  );
}