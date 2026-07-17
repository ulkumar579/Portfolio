import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive motion graphics that sit BEHIND the hero content.
 * - Concentric orbital rings with drifting satellite nodes
 * - Cursor-tracking holo spotlight
 * - Soft parallax on mouse move
 * - Ambient scanline sweep + glitch code strip
 */
export default function HeroBackdrop() {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const parallaxX = useTransform(smx, (v) => `${(v - 0.5) * -30}px`);
  const parallaxY = useTransform(smy, (v) => `${(v - 0.5) * -30}px`);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Respect reduced motion + only listen while the hero is on-screen,
    // and coalesce mousemove into one rAF tick to avoid layout thrash.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lastX = 0;
    let lastY = 0;
    let rect = el.getBoundingClientRect();
    const refreshRect = () => { rect = el.getBoundingClientRect(); };
    const flush = () => {
      raf = 0;
      mx.set((lastX - rect.left) / rect.width);
      my.set((lastY - rect.top) / rect.height);
    };
    const onMove = (e) => {
      lastX = e.clientX; lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("mousemove", onMove, { passive: true });
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("mousemove", onMove);
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? attach() : detach(); },
      { threshold: 0.01 }
    );
    io.observe(el);
    window.addEventListener("scroll", refreshRect, { passive: true });
    window.addEventListener("resize", refreshRect);
    return () => {
      io.disconnect();
      detach();
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("resize", refreshRect);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      {/* cursor spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x} ${y}, oklch(0.86 0.15 200 / 0.18), transparent 60%)`
          ),
        }}
      />

      {/* orbital system — parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        <svg viewBox="-450 -450 900 900" className="h-full w-full" style={{ willChange: "transform" }}>
          <defs>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.86 0.15 200)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.86 0.15 200)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringStroke" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.86 0.15 200 / 0.5)" />
              <stop offset="50%" stopColor="oklch(0.72 0.2 285 / 0.35)" />
              <stop offset="100%" stopColor="oklch(0.86 0.15 200 / 0.05)" />
            </linearGradient>
          </defs>

          {/* core */}
          <circle r="60" fill="url(#orbGlow)" />
          <circle r="6" fill="oklch(0.98 0.02 240)" />

          {[130, 200, 285, 380].map((R, i) => (
            <g key={R}>
              <motion.circle
                r={R}
                fill="none"
                stroke="url(#ringStroke)"
                strokeWidth="0.8"
                strokeDasharray="2 6"
                initial={{ rotate: 0 }}
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{ duration: 40 + i * 12, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "0 0" }}
              />
              <motion.g
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{ duration: 22 + i * 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "0 0" }}
              >
                <circle cx={R} cy={0} r={i === 1 ? 5 : 3} fill="oklch(0.86 0.15 200)">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur={`${3 + i}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {i === 2 && (
                  <circle cx={-R * 0.7} cy={R * 0.7} r={2.5} fill="oklch(0.72 0.2 285)" />
                )}
              </motion.g>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* corner HUD brackets */}
      {[
        "left-6 top-24",
        "right-6 top-24 rotate-90",
        "left-6 bottom-10 -rotate-90",
        "right-6 bottom-10 rotate-180",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute h-10 w-10 border-l border-t border-[var(--neon-cyan)]/40 ${pos}`}
        />
      ))}

      {/* scanline sweep */}
      <motion.div
        initial={{ y: "-20%" }}
        animate={{ y: "120%" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent"
      />

      {/* vertical code strip */}
      <div className="absolute right-2 top-1/4 hidden select-none flex-col gap-1 font-mono text-[9px] leading-none tracking-widest text-[var(--neon-cyan)]/25 md:flex">
        {"01011001UJJWALKUMAR11010".split("").map((c, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.1 }}
          >
            {c}
          </motion.span>
        ))}
      </div>

      {/* soft edge vignette to keep content legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.13_0.02_265/0.85)_100%)]" />
    </div>
  );
}