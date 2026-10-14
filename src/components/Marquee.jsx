import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  "React", "GSAP", "JavaScript", "Tailwind CSS",
  "Open to Work", "Jaipur India", "Frontend Dev",
  "Node.js", "Git & GitHub", "Freelance Available",
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    track.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
    track.addEventListener("mouseleave", () => gsap.globalTimeline.resume());

    return () => {
      track.removeEventListener("mouseenter", () => gsap.globalTimeline.pause());
      track.removeEventListener("mouseleave", () => gsap.globalTimeline.resume());
    };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-neutral-200 dark:border-white/10 py-4 my-2">
      <div ref={trackRef} className="flex gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 flex items-center gap-3 text-sm font-medium text-gray-400 uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f26a18] flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
