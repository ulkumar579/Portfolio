import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, FileDown, Instagram, Youtube } from "lucide-react";
import { profile } from "@/data/portfolio";

const items = [
  { icon: Github, href: profile.github, label: "GITHUB" },
  { icon: Linkedin, href: profile.linkedin, label: "LINKEDIN" },
  { icon: Instagram, href: profile.instagram, label: "INSTAGRAM" },
  { icon: Youtube, href: profile.youtube, label: "YOU TUBE" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "EMAIL" },
  { icon: Phone, href: `tel:${profile.phone}`, label: "PHONE" },
  { icon: FileDown, href: "/UK_Resume.pdf", label: "RESUME", download: true },
];

export default function SocialStrip() {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-white/10 bg-black/40 px-2 py-4 backdrop-blur-xl shadow-[0_0_30px_-15px_var(--neon-cyan)]">
        <span className="font-mono text-[8px] tracking-[0.35em] text-[var(--neon-cyan)] [writing-mode:vertical-rl] rotate-180">
          LINK.NET
        </span>
        <span className="h-6 w-px bg-white/10" />
        {items.map(({ icon: Icon, href, label, download }) => (
          <motion.a
            key={label}
            href={href}
            target={download ? undefined : "_blank"}
            rel={download ? undefined : "noopener noreferrer"}
            download={download}
            aria-label={label}
            whileHover={{ scale: 1.15, x: 4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] hover:shadow-[0_0_20px_var(--neon-cyan)]"
          >
            <Icon className="h-4 w-4" strokeWidth={1.8} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-white/10 bg-black/70 px-2 py-1 font-mono text-[9px] tracking-[0.25em] text-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100">
              {label}
            </span>
          </motion.a>
        ))}
        <span className="h-6 w-px bg-white/10" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]" />
      </div>
    </motion.aside>
  );
}