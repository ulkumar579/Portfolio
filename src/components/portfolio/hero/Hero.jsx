import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Cpu, Radio, Zap, Download } from "lucide-react";
import MagneticButton from "../shared/MagneticButton";
import TypingStack from "./TypingStack";
import CountUp from "../shared/CountUp";
import HeroBackdrop from "./HeroBackdrop";
import { profile, stats } from "@/data/portfolio";
import profileImage from "../../../../assets/profile_image.png"
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const nameLetters = "UJJWAL".split("");
const lastLetters = "KUMAR".split("");

function LetterRow({ letters, delay = 0 }) {
  return (
    <span className="flex">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.06, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-block bg-gradient-to-b from-cyan-50 via-cyan-300 to-indigo-500 bg-clip-text text-transparent"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function InteractiveIdCard() {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 180, damping: 18 });
  const lightX = useTransform(mx, (v) => `${v * 100}%`);
  const lightY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-5 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 group-hover:border-[var(--neon-cyan)]/40 group-hover:shadow-[0_25px_80px_-20px_oklch(0.86_0.15_200/0.45)]"
      >
        {/* grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, oklch(0.86 0.15 200 / 0.25) 95%), linear-gradient(90deg, transparent 95%, oklch(0.86 0.15 200 / 0.2) 95%)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* cursor light */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x} ${y}, oklch(0.86 0.15 200 / 0.35), transparent 65%)`,
            ),
          }}
        />
        {/* animated border sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, oklch(0.86 0.15 200 / 0.55) 60deg, transparent 120deg, transparent 240deg, oklch(0.72 0.2 285 / 0.55) 300deg, transparent 360deg)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            animation: "spin 6s linear infinite",
          }}
        />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="mb-4 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-white/40">
            <span className="text-[var(--neon-cyan)]">// ID_CARD</span>
            <span>UK-2050</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--neon-cyan)]/40 bg-black/40 font-display text-2xl font-bold text-white shadow-[0_0_25px_oklch(0.86_0.15_200/0.35)]"
            >
              <img className="h-16 w-16 rounded-xl " src={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` || profileImage} alt="" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]" />
              <span className="absolute inset-0 rounded-xl border border-[var(--neon-cyan)]/0 transition group-hover:border-[var(--neon-cyan)]/80" />
            </motion.div>
            <div className="min-w-0">
              <div className="truncate font-display text-lg leading-tight text-white">
                {profile.name}
              </div>
              <div className="truncate font-mono text-[10px] tracking-[0.2em] text-white/50">
                {profile.title}
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-2 py-0.5 font-mono text-[8px] tracking-[0.3em] text-emerald-300">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                OPEN TO WORK
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[9px] tracking-[0.2em]">
            {[
              { icon: Cpu, k: "CORE", v: "REACT" },
              { icon: Radio, k: "PING", v: "12ms" },
              { icon: Zap, k: "PWR", v: "98%" },
            ].map(({ icon: Icon, k, v }) => (
              <motion.div
                key={k}
                whileHover={{ y: -2, borderColor: "oklch(0.86 0.15 200 / 0.6)" }}
                className="rounded-md border border-white/10 bg-black/30 p-2 transition"
              >
                <Icon size={11} className="mb-1 text-[var(--neon-cyan)]" />
                <div className="text-white/40">{k}</div>
                <div className="text-white/80">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:px-16 md:pb-16 lg:px-28"
    >
      <HeroBackdrop />
      <div className="relative z-10">
        {/* top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.35em] text-white/50"
        >
          <span className="flex items-center gap-2 text-[var(--neon-cyan)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)]" />
            </span>
            [SIGNAL_ACQUIRED] // 01_ID
          </span>
          <span className="hidden items-center gap-2 md:flex">
            <MapPin size={11} /> BENGALURU · IN · 12.97°N
          </span>
          <span>REC_ID :: UK.2050</span>
        </motion.div>

        {/* main hero */}
        <div className="grid grid-cols-12 items-stretch gap-x-8 gap-y-10">
          <div className="col-span-12 flex flex-col justify-end lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 font-mono text-[10px] tracking-[0.4em] text-white/40"
            >
              {"//"} FRONTEND ENGINEER · v4.0.YRS
            </motion.div>
            <h1
              className="hero-name group/name cursor-default font-display font-bold uppercase leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.75rem, 12vw, 12rem)" }}
            >
              <span className="block overflow-hidden">
                <LetterRow letters={nameLetters} delay={0.15} />
              </span>
              <span className="mt-1 block overflow-hidden">
                <span className="flex items-baseline gap-[0.15em]">
                  <LetterRow letters={lastLetters} delay={0.45} />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="inline-block h-3 w-3 translate-y-[-0.4em] rounded-full bg-[var(--neon-cyan)] shadow-[0_0_25px_var(--neon-cyan)] md:h-5 md:w-5"
                  />
                </span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              Crafting <span className="text-white">immersive, high-performance</span> web
              interfaces at the intersection of design systems, real-time data streams and
              AI-assisted UX. Four years shipping enterprise-grade React apps.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton onClick={() => scrollTo("contact")}>
                {">_ INITIATE CONTACT"}
              </MagneticButton>
              {/* <button
              onClick={() => scrollTo("projects")}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 font-mono text-[10px] tracking-[0.3em] text-white/70 backdrop-blur-md transition hover:border-[var(--neon-cyan)]/50 hover:text-white"
            >
              VIEW MODULES
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button> */}
              <a
                href="/UK_Resume.pdf"
                download
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/[0.06] px-5 py-3 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)] backdrop-blur-md transition hover:bg-[var(--neon-cyan)]/[0.14] hover:shadow-[0_0_25px_-4px_var(--neon-cyan)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <Download size={13} className="transition-transform group-hover:translate-y-0.5" />
                DOWNLOAD RESUME
              </a>
            </motion.div>
          </div>

          {/* right rail — holo ID card + typing terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="col-span-12 flex flex-col gap-4 lg:col-span-5"
          >
            <InteractiveIdCard />

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <span className="h-2 w-2 rounded-full bg-[var(--neon-cyan)]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">
                  STACK.log
                </span>
              </div>
              <TypingStack />
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between gap-4 bg-black/40 p-5 transition hover:bg-[var(--neon-cyan)]/[0.04]"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">0{i + 1}</span>
              <div>
                <div
                  className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl"
                  style={{ textShadow: "0 0 20px oklch(0.86 0.15 200 / 0.25)" }}
                >
                  <CountUp to={s.value} suffix={s.suffix} pad={2} />
                </div>
                <div className="mt-2 whitespace-pre-line font-mono text-[9px] leading-relaxed tracking-[0.25em] text-white/50">
                  {s.label}
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-[var(--neon-cyan)] transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </motion.div>

        {/* scroll cue */}
        <motion.button
          onClick={() => scrollTo("experience")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-14 flex items-center gap-3 self-start font-mono text-[10px] tracking-[0.4em] text-white/40 transition hover:text-[var(--neon-cyan)]"
        >
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5">
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1 w-1 rounded-full bg-[var(--neon-cyan)]"
            />
          </span>
          SCROLL_DOWN
        </motion.button>
      </div>
    </section>
  );
}
