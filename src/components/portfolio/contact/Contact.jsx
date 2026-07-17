import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { profile } from "@/data/portfolio";

function Field({ label, type = "text", value, onChange, textarea, className = "" }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className={`relative ${className}`}>
      <Comp
        type={type}
        value={value}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-md border border-white/10 bg-black/30 px-4 pb-3 pt-6 font-mono text-sm text-white outline-none transition focus:border-[var(--neon-cyan)] focus:shadow-[0_0_20px_-8px_var(--neon-cyan)]"
      />
      <label
        className={`pointer-events-none absolute left-4 font-mono tracking-widest transition-all ${
          active ? "top-1.5 text-[9px] text-[var(--neon-cyan)]" : "top-4 text-xs text-white/40"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [state, setState] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (state !== "idle") return;
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;
    setState("sending");
    const mailSubject = subject || `Portfolio contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = mailto;
      setState("sent");
    }, 900);
    setTimeout(() => {
      setState("idle");
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    }, 3800);
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 md:px-16 md:py-28 lg:px-28 lg:py-32">
      <SectionHeader code="// 06_INTERCOM" title="Contact Intercom" sub="[SECURE_CHANNEL]" />
      <div className=" grid max-w-8xl grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl sm:p-8 md:grid-cols-[1fr_1.4fr] md:p-10">
        <div>
          <div className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--neon-cyan)]">// TRANSMITTER</div>
          <h3 className="mb-4 font-display text-2xl font-semibold text-white">Open the channel.</h3>
          <p className="mb-6 text-sm text-white/60">
            Available for frontend engineering roles, collaborations and unusual builds.
          </p>
          <div className="space-y-2 font-mono text-xs tracking-wider text-white/60">
            <div>{profile.email}</div>
            <div>{profile.phone}</div>
            <div>BENGALURU · IN</div>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="YOUR_NAME" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="PHONE_NUMBER" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="YOUR_EMAIL" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="SUBJECT" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
          </div>
          <Field label="YOUR_MESSAGE" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
          <button
            type="submit"
            disabled={state !== "idle"}
            className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-md border border-[var(--neon-cyan)]/60 bg-[var(--neon-cyan)]/[0.08] font-mono text-xs tracking-[0.35em] text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/[0.15] disabled:opacity-90"
          >
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Send size={14} /> TRANSMIT_PACKET
                </motion.span>
              )}
              {state === "sending" && (
                <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-3 w-3 rounded-full border-2 border-[var(--neon-cyan)] border-t-transparent"
                  />
                  ENCRYPTING…
                </motion.span>
              )}
              {state === "sent" && (
                <motion.span key="d" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Check size={14} /> PACKET_DELIVERED
                </motion.span>
              )}
            </AnimatePresence>
            {state === "sending" && (
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent"
              />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}