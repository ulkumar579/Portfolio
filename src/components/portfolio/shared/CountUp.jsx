import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ to = 0, duration = 1.6, suffix = "", prefix = "", pad = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const str = pad ? String(n).padStart(pad, "0") : String(n);
  return (
    <span ref={ref}>
      {prefix}
      {str}
      {suffix}
    </span>
  );
}