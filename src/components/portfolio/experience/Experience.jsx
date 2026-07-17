import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const panels = experience.length + 2; // intro + roles + outro
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((panels - 1) / panels) * 100}%`]
  );
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      ref={targetRef}
      className="relative"
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="relative z-10 px-4 pt-16 sm:px-6 md:px-16 md:pt-20 lg:px-28">
          <SectionHeader
            code="// 02_REEL"
            title="Experience Reel"
            sub="[CINEMATIC_STREAM]"
          />
        </div>

        <div className="relative z-10 mx-4 mb-6 h-[2px] overflow-hidden rounded-full bg-white/10 sm:mx-6 md:mx-16 lg:mx-28">
          <motion.div
            style={{
              scaleX: progressScaleX,
              transformOrigin: "left",
              background:
                "linear-gradient(90deg, var(--neon-cyan), var(--holo-violet))",
              boxShadow: "0 0 12px var(--neon-cyan)",
            }}
            className="h-full"
          />
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x, width: `${panels * 100}%` }}
            className="flex h-full will-change-transform"
          >
            <Panel total={panels}>
              <div className="mx-auto max-w-2xl text-center">
                <div
                  className="mb-4 font-mono text-xs tracking-[0.3em]"
                  style={{ color: "var(--neon-cyan)" }}
                >
                  [SCENE_00 // INTRO]
                </div>
                <h3 className="mb-6 text-3xl font-light tracking-tight sm:text-5xl md:text-6xl">
                  A journey through
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, var(--neon-cyan), var(--holo-violet))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    frames of code.
                  </span>
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Scroll to advance the reel →
                </p>
              </div>
            </Panel>

            {experience.map((item, i) => (
              <Panel key={item.id} total={panels}>
                <ExperiencePanel item={item} index={i} />
              </Panel>
            ))}

            <Panel total={panels}>
              <div className="mx-auto max-w-xl text-center">
                <div
                  className="mb-4 font-mono text-xs tracking-[0.3em]"
                  style={{ color: "var(--neon-cyan)" }}
                >
                  [END_OF_REEL]
                </div>
                <h3 className="text-3xl font-light tracking-tight sm:text-5xl">
                  ...next chapter loading.
                </h3>
              </div>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Panel({ children, total }) {
  return (
    <div
      className="flex h-full flex-shrink-0 items-center justify-center px-4 sm:px-8 md:px-16 lg:px-28"
      style={{ width: `${100 / total}%` }}
    >
      {children}
    </div>
  );
}

function ExperiencePanel({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl overflow-hidden rounded-2xl border p-6 backdrop-blur-md sm:p-8 md:p-10"
      style={{
        borderColor: "rgba(255,255,255,0.12)",
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
    >
      <span
        className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2"
        style={{ borderColor: "var(--neon-cyan)" }}
      />
      <span
        className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2"
        style={{ borderColor: "var(--holo-violet)" }}
      />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div
          className="font-mono text-[10px] tracking-[0.3em] sm:text-xs"
          style={{ color: "var(--neon-cyan)" }}
        >
          SCENE_{String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="flex items-center gap-2 font-mono text-[10px] sm:text-xs"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <Calendar size={12} />
          {item.period}
        </div>
      </div>

      <div className="mb-2 flex items-center gap-3">
        <Briefcase size={20} style={{ color: "var(--neon-cyan)" }} />
        <h3 className="text-xl font-semibold tracking-tight sm:text-3xl">
          {item.role}
        </h3>
      </div>

      <div
        className="mb-6 flex items-center gap-2 text-sm sm:text-base"
        style={{ color: "var(--holo-violet)" }}
      >
        <MapPin size={14} />
        {item.company}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {item.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            className="flex items-start gap-2 text-xs sm:text-sm"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <CheckCircle2
              size={14}
              className="mt-0.5 flex-shrink-0"
              style={{ color: "var(--neon-cyan)" }}
            />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}