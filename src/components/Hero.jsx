import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GITHUB = "https://github.com/ayush-kumawat-0";
const LINKEDIN = "https://www.linkedin.com/in/ayushhkumawat/?isSelfProfile=true";

export default function Hero() {
  const ref = useRef(null);
  const accentRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.fromTo(accentRef.current, { scaleX: 0, transformOrigin: "left center" }, {
        scaleX: 1,
        duration: prefersReducedMotion ? 0 : 0.75,
        delay: 0.25,
        ease: "power2.out",
      });

      if (prefersReducedMotion) return;

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const firstName = "Ayush";
      const lastName = "Kumawat.";
      const revealOrder = [...Array(firstName.length + lastName.length).keys()]
        .sort(() => Math.random() - 0.5);
      const scramble = (value, progress, offset) => value
        .split("")
        .map((char, index) => {
          const orderIndex = revealOrder.indexOf(offset + index);
          const threshold = orderIndex / revealOrder.length;
          return progress > threshold ? char : chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      const reveal = { progress: 0 };
      gsap.to(reveal, {
        progress: 1,
        duration: 2.05,
        delay: 0.08,
        ease: "power2.out",
        onUpdate: () => {
          if (firstNameRef.current) firstNameRef.current.textContent = scramble(firstName, reveal.progress, 0);
          if (lastNameRef.current) lastNameRef.current.textContent = scramble(lastName, reveal.progress, firstName.length);
        },
        onComplete: () => {
          if (firstNameRef.current) firstNameRef.current.textContent = firstName;
          if (lastNameRef.current) lastNameRef.current.textContent = lastName;
        },
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative z-10 min-h-[92vh] flex items-center px-5 sm:px-8 lg:px-12 pt-28 pb-20">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1.25fr_.75fr] gap-12 lg:gap-20 items-end">
        <div>
          <div className="hero-reveal flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500 mb-7">
            <span ref={accentRef} className="w-8 h-px bg-[#f26a18]" />
            DevOps / Cloud Journey
          </div>

          <h1 aria-label="Ayush Kumawat" className="hero-reveal text-[clamp(3.4rem,9vw,7.8rem)] leading-[.88] font-semibold tracking-[-0.065em]">
            <span ref={firstNameRef} aria-hidden="true">Ayush</span>
            <span ref={lastNameRef} aria-hidden="true" className="block text-neutral-400 dark:text-neutral-600">Kumawat.</span>
          </h1>

          <div className="hero-reveal mt-8 max-w-2xl">
            <p className="text-xl sm:text-2xl leading-relaxed text-neutral-700 dark:text-neutral-300">
              MCA Student <span className="text-[#f26a18]">/</span> Aspiring DevOps Engineer
            </p>
            <p className="mt-4 text-base sm:text-lg leading-8 text-neutral-500 dark:text-neutral-400 max-w-xl">
              Building my foundation in Linux, shell scripting, Python, Git and system administration through practical projects and hands-on troubleshooting.
            </p>
          </div>

          <div className="hero-reveal flex flex-wrap gap-3 mt-9">
            <button onClick={() => scrollTo("projects")} className="magnetic-btn px-5 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:scale-[1.03] transition-transform">
              View projects ↗
            </button>
            <button onClick={() => scrollTo("contact")} className="magnetic-btn px-5 py-3 rounded-full border border-neutral-300 dark:border-white/15 text-sm font-medium hover:border-[#f26a18] transition-colors">
              Get in touch
            </button>
          </div>

          <div className="hero-reveal flex items-center gap-6 mt-9 text-sm text-neutral-500">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-[#f26a18] transition-colors">GitHub ↗</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-[#f26a18] transition-colors">LinkedIn ↗</a>
          </div>
        </div>

        <div className="hero-reveal hidden lg:block justify-self-end w-full max-w-sm">
          <div className="hero-terminal rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.025] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="ml-auto text-[10px] text-neutral-400 tracking-wider">learning.log</span>
            </div>
            <div className="font-mono text-xs leading-7 text-neutral-500 dark:text-neutral-400 pt-4">
              <p><span className="text-[#f26a18]">$</span> whoami</p>
              <p className="text-neutral-800 dark:text-neutral-200">ayush / aspiring-devops</p>
              <p className="mt-2"><span className="text-[#f26a18]">$</span> currently_learning</p>
              <p className="text-neutral-800 dark:text-neutral-200">linux · bash · python · git</p>
              <p className="mt-2"><span className="text-[#f26a18]">$</span> next</p>
              <p className="text-neutral-800 dark:text-neutral-200">docker · cloud</p>
              <span className="inline-block w-1.5 h-3.5 bg-[#f26a18] align-middle ml-1 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
