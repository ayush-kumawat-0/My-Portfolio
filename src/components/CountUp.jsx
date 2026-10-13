import { useEffect, useRef, useState } from "react";

// HOW TO USE:
// Replace static numbers in About.jsx stats section with this component
// Example: <CountUp end={5} suffix="+" /> instead of "5+"

export default function CountUp({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(update);
            else setCount(end);
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────
// IN About.jsx — find the stats array mapping:
//
// BEFORE:
// <p className="text-2xl font-bold text-[#f26a18]">{stat.number}</p>
//
// AFTER:
// import CountUp from "./CountUp";
//
// Change stats array from:
// { number: "5+", label: "Projects Built" }
// to:
// { end: 5, suffix: "+", label: "Projects Built" }
//
// Then in JSX:
// <p className="text-2xl font-bold text-[#f26a18]">
//   <CountUp end={stat.end} suffix={stat.suffix} />
// </p>
// ─────────────────────────────────────────────
