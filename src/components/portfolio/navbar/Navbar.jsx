import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "hero", label: "HOME", code: "00" },
  { id: "experience", label: "LOG", code: "02" },
  { id: "projects", label: "MODULES", code: "03" },
  { id: "skills", label: "MATRIX", code: "04" },
  { id: "credentials", label: "CERTIFICATIONS", code: "05" },
  { id: "contact", label: "INTERCOM", code: "06" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-40 flex justify-center px-2 pt-4 transition-all sm:px-4 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className={`flex max-w-[calc(100vw-1rem)] items-center gap-0.5 overflow-x-auto rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-all sm:gap-1 sm:px-2 sm:py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          scrolled
            ? "border-white/15 bg-black/50 shadow-[0_0_40px_-15px_var(--neon-cyan)]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <span className="hidden items-center gap-2 pl-3 pr-2 font-mono text-[9px] tracking-[0.35em] text-[var(--neon-cyan)] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]" />
          UK.SYS
        </span>
        <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        {links.map((l) => {
          const isActive = active === l.id;
          return (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className={`relative shrink-0 rounded-full px-2.5 py-1.5 font-mono text-[9px] tracking-[0.2em] transition sm:px-4 sm:text-[10px] sm:tracking-[0.25em] ${
                isActive ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_20px_var(--neon-cyan)]"
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <span className="hidden opacity-60 md:inline">{l.code}</span>
                {l.label}
              </span>
            </button>
          );
        })}
        <span className="mx-1 h-4 w-px bg-white/10" />
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}