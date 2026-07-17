import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative ml-1 flex h-8 w-14 items-center rounded-full border border-white/15 bg-white/[0.04] px-1 backdrop-blur transition hover:border-[var(--neon-cyan)] hover:shadow-[0_0_16px_-4px_var(--neon-cyan)]"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          isDark
            ? "bg-[var(--electric-indigo)] shadow-[0_0_12px_var(--electric-indigo)]"
            : "ml-auto bg-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-3.5 w-3.5 text-black" strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-3.5 w-3.5 text-black" strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}