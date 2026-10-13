import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="relative z-10 py-28 sm:py-36 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-24">
        <div className="about-reveal">
          <p className="section-kicker">01 / About</p>
          <p className="mt-5 text-sm text-neutral-400 leading-6 max-w-xs">From building interfaces to understanding the systems that run them.</p>
        </div>

        <div>
          <h2 className="about-reveal text-3xl sm:text-5xl leading-tight tracking-[-0.04em] font-medium max-w-3xl">
            I started with web development. Now I'm building the systems behind software.
          </h2>
          <div className="about-reveal mt-8 grid md:grid-cols-2 gap-7 text-[15px] leading-7 text-neutral-500 dark:text-neutral-400 max-w-4xl">
            <p>
              I'm Ayush, currently pursuing an MCA at Vivekanand Global University (VGU) after completing my BCA. My learning has moved from frontend development toward Linux, system administration, shell scripting and Python.
            </p>
            <p>
              I learn by building and troubleshooting rather than collecting certificates or memorising commands. My current goal is to turn this foundation into practical DevOps and Cloud skills through real projects.
            </p>
          </div>

          <div className="about-reveal mt-12 pt-7 border-t border-neutral-200 dark:border-white/10 flex flex-wrap gap-x-10 gap-y-5 text-sm">
            <div><span className="block text-neutral-400 text-xs uppercase tracking-widest mb-1">Education</span><span>BCA — Completed</span></div>
            <div><span className="block text-neutral-400 text-xs uppercase tracking-widest mb-1">Currently</span><span>MCA — VGU Online</span></div>
            <div><span className="block text-neutral-400 text-xs uppercase tracking-widest mb-1">Based in</span><span>Jaipur, India</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
