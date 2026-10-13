import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "ayushkumawat205@gmail.com";
const GITHUB = "https://github.com/ayush-kumawat-0";
const LINKEDIN = "https://www.linkedin.com/in/ayushhkumawat/?isSelfProfile=true";

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative z-10 py-28 sm:py-36 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-24">
          <div className="contact-reveal">
            <p className="section-kicker">04 / Contact</p>
            <p className="mt-5 text-sm text-neutral-400 leading-6 max-w-xs">For internships, collaborations, technical discussions or opportunities.</p>
          </div>
          <div className="contact-reveal">
            <h2 className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[.95] tracking-[-0.06em] font-medium max-w-3xl">Let's build something useful.</h2>
            <p className="mt-7 text-neutral-500 dark:text-neutral-400 leading-7 max-w-xl">I'm currently focused on developing my DevOps foundation and looking for opportunities where I can keep learning by working on real systems.</p>

            <div className="contact-reveal mt-10 flex flex-col sm:flex-row gap-5 sm:gap-8 text-sm">
              <a href={`mailto:${EMAIL}`} className="contact-link">{EMAIL} ↗</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="contact-link">GitHub ↗</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-link">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        <footer className="contact-reveal mt-28 pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-neutral-400">
          <span>© {new Date().getFullYear()} Ayush Kumawat</span>
          <span>MCA Student · Aspiring DevOps Engineer</span>
        </footer>
      </div>
    </section>
  );
}
