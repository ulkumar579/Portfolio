import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-8 sm:px-6 md:px-16 lg:px-28">
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-white/40">
        <div>© 2026 UJJWAL KUMAR · ALL SIGNALS RESERVED</div>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="transition hover:text-[var(--neon-cyan)]"><Mail size={14} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-[var(--neon-cyan)]"><Linkedin size={14} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-[var(--neon-cyan)]"><Github size={14} /></a>
        </div>
        <div>LET_S_CONNECT.exe</div>
      </div>
    </footer>
  );
}