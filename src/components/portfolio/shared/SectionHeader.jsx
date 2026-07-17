export default function SectionHeader({ code, title, sub }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-3 font-mono text-[10px] tracking-[0.4em] text-[var(--neon-cyan)]">
          {code}
        </div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
          {title}
        </h2>
      </div>
      {sub && (
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">{sub}</div>
      )}
    </div>
  );
}