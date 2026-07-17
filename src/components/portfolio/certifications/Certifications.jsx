import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { certifications } from "@/data/portfolio";

function CertVisual({ cert }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${cert.color}55, transparent 60%), radial-gradient(circle at 80% 80%, ${cert.color}33, transparent 55%), #0a0a12`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(transparent 95%, rgba(255,255,255,0.15) 95%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.12) 95%)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 p-6 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border"
          style={{
            borderColor: `${cert.color}88`,
            background: `${cert.color}22`,
            boxShadow: `0 0 30px ${cert.color}55`,
          }}
        >
          <ShieldCheck size={28} style={{ color: "#fff" }} />
        </div>
        <div className="font-mono text-[9px] tracking-[0.4em] text-white/60">
          CERTIFIED · {cert.year}
        </div>
        <div className="font-display text-lg font-semibold leading-tight text-white">
          {cert.issuer}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[8px] tracking-[0.35em] text-white/40">
        // SIG_{cert.issuer.replace(/\s+/g, "_").toUpperCase().slice(0, 10)}
      </div>
    </div>
  );
}

export default function Certifications() {
  const [i, setI] = useState(0);
  const n = certifications.length;
  const go = (d) => setI((prev) => (prev + d + n) % n);
  const cert = certifications[i];

  return (
    <section id="credentials" className="relative px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-28 lg:py-32">
      <SectionHeader code="// 05_CREDENTIALS" title="Verified Credentials" sub={`[${String(i + 1).padStart(2, "0")}/${String(n).padStart(2, "0")}]`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Visual pane */}
        <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl md:h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CertVisual cert={cert} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Detail pane */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-[var(--neon-cyan)]">
                <Award size={12} /> CREDENTIAL_{String(i + 1).padStart(3, "0")}
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
                {cert.name}
              </h3>
              <div className="mt-2 font-mono text-[11px] tracking-[0.2em] text-white/50">
                ISSUED BY · <span className="text-white/80">{cert.issuer}</span> · {cert.year}
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--neon-cyan)]/50 bg-[var(--neon-cyan)]/[0.08] px-5 py-3 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/[0.15]"
              >
                VIEW CERTIFICATE <ExternalLink size={12} />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous credential"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition hover:border-[var(--neon-cyan)]/50 hover:text-[var(--neon-cyan)]"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next credential"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition hover:border-[var(--neon-cyan)]/50 hover:text-[var(--neon-cyan)]"
              >
                <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              {certifications.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to credential ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i
                      ? "w-6 bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}