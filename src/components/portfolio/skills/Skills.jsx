import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Wrench, Sparkles } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { skills } from "@/data/portfolio";

const meta = {
  Frontend: { icon: Code2, level: 95, hex: "#22d3ee" },
  Backend: { icon: Server, level: 82, hex: "#a78bfa" },
  Databases: { icon: Database, level: 78, hex: "#f0abfc" },
  "Tools & DevOps": { icon: Wrench, level: 85, hex: "#22d3ee" },
  Concepts: { icon: Sparkles, level: 88, hex: "#a78bfa" },
};

function Ring({ value, color }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 110 110" className="h-28 w-28 -rotate-90">
      <circle cx="55" cy="55" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
      <motion.circle
        cx="55"
        cy="55"
        r={R}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        whileInView={{ strokeDashoffset: C - (C * value) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

export default function Skills() {
  const groups = Object.keys(skills);
  const [active, setActive] = useState(groups[0]);
  const list = skills[active];
  const m = meta[active];

  return (
    <section id="skills" className="relative px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-28 lg:py-32">
      <SectionHeader code="// 04_MATRIX" title="Skills Terminal" sub="[MASTERY: 92.7%]" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* left rail — group selector */}
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-xl">
          {groups.map((g, i) => {
            const M = meta[g];
            const Icon = M.icon;
            const isActive = active === g;
            return (
              <motion.button
                key={g}
                onClick={() => setActive(g)}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[var(--neon-cyan)]/50 bg-[var(--neon-cyan)]/[0.06]"
                    : "border-white/5 bg-transparent hover:border-white/15 hover:bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-rail"
                    className="absolute inset-y-0 left-0 w-[3px] bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]"
                  />
                )}
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-md border transition ${
                      isActive
                        ? "border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/[0.08] text-[var(--neon-cyan)]"
                        : "border-white/10 bg-white/[0.02] text-white/60"
                    }`}
                  >
                    <Icon size={15} />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-medium text-white">{g}</span>
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">
                      {skills[g].length.toString().padStart(2, "0")} MODULES
                    </span>
                  </span>
                </span>
                <span
                  className={`font-mono text-[10px] tracking-widest transition ${
                    isActive ? "text-[var(--neon-cyan)]" : "text-white/30"
                  }`}
                >
                  {M.level}%
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* right panel — active group readout */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-[0.35em] text-[var(--neon-cyan)]">
                    {"// GROUP_READOUT"}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {active}
                  </h3>
                  <div className="mt-2 font-mono text-[10px] tracking-widest text-white/40">
                    NODES: {list.length.toString().padStart(2, "0")} · PROFICIENCY: {m.level}%
                  </div>
                </div>
                <div className="relative">
                  <Ring value={m.level} color={m.hex} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                    <span className="text-lg font-semibold text-white">{m.level}</span>
                    <span className="text-[8px] tracking-[0.3em] text-white/40">LVL</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {list.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30 p-3 transition hover:border-[var(--neon-cyan)]/50"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120px circle at 50% 0%, ${m.hex}22, transparent 70%)`,
                      }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-wider text-white/80">
                        {s.name}
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: m.hex, textShadow: `0 0 8px ${m.hex}55` }}
                      >
                        {s.level}%
                      </span>
                    </div>
                    <div className="relative mt-2 h-[2px] w-full overflow-hidden rounded bg-white/10">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                        className="block h-full"
                        style={{ background: m.hex, boxShadow: `0 0 8px ${m.hex}` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}