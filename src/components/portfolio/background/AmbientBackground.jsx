import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = true;
    let particles = [];
    const isLight = theme === "light";
    const resize = () => {
      // Cap DPR — retina canvases at 3x DPR are the #1 scroll-jank culprit.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const isMobile = window.innerWidth < 768;
      const count = isMobile
        ? Math.min(35, Math.floor((window.innerWidth * window.innerHeight) / 38000))
        : Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.3,
        hue: Math.random() > 0.5 ? 190 : 275,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    // Pause the loop when tab is hidden or when the page is scrolled
    // far past the fold — the ambient bg is fixed but not visible then.
    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    const tick = () => {
      if (!running || reduce) { raf = 0; return; }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // shadowBlur per-particle triggers a full offscreen blur pass every
      // frame. Skip it and render a cheap 2-stop halo instead.
      const light = isLight ? 45 : 65;
      const alpha = isLight ? 0.55 : 0.75;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        ctx.fillStyle = `hsla(${p.hue}, 85%, ${light}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) tick();
    else {
      // Draw a single static frame so the layer isn't empty.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 85%, ${isLight ? 45 : 65}%, ${isLight ? 0.5 : 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme]);

  return (
    <div className="portfolio-ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[oklch(0.13_0.02_265)]">
      <motion.div
        style={{ rotate, scale, willChange: "transform" }}
        className="ambient-grid absolute left-1/2 top-1/2 h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.86 0.15 200 / 0.35) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.15 200 / 0.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
          }}
        />
      </motion.div>
      <div className="ambient-orb absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[oklch(0.62_0.24_280)] opacity-30 blur-[140px]" />
      <div className="ambient-orb absolute -right-40 top-2/3 h-[560px] w-[560px] rounded-full bg-[oklch(0.86_0.15_200)] opacity-20 blur-[160px]" />
      <div className="ambient-orb absolute left-1/3 top-[110%] h-[420px] w-[420px] rounded-full bg-[oklch(0.72_0.2_310)] opacity-25 blur-[140px]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="ambient-vignette absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.13_0.02_265)_100%)]" />
    </div>
  );
}