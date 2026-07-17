import { useEffect, useState } from "react";
import { techStack } from "@/data/portfolio";

export default function TypingStack() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = techStack[i];
    const delay = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => (v + 1) % techStack.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <div className="max-w-md rounded-md border border-white/10 bg-black/40 p-4 font-mono text-sm text-white/80 backdrop-blur-md">
      <div className="mb-2 text-[10px] tracking-[0.3em] text-white/40">// TECH_STACK</div>
      <div className="flex items-center">
        <span className="mr-2 text-[var(--neon-cyan)]">{">"}</span>
        <span>{text}</span>
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[var(--neon-cyan)]" />
      </div>
    </div>
  );
}