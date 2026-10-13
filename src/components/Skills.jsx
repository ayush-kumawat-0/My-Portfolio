import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const groups = [
  { label: "DevOps foundation", skills: ["Linux", "Shell Scripting", "Git", "GitHub", "Python"] },
  { label: "Web development", skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "SASS", "Flask", "GSAP"] },
  { label: "Programming", skills: ["C", "C++"] },
  { label: "Database", skills: ["DBMS"] },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="skills" className="relative z-10 py-28 sm:py-36 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="skill-reveal grid lg:grid-cols-[.7fr_1.3fr] gap-12 lg:gap-24 mb-16">
          <div>
            <p className="section-kicker">02 / Skills</p>
            <p className="mt-5 text-sm text-neutral-400 leading-6 max-w-xs">Only the technologies I've actually worked with so far.</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-5xl tracking-[-0.04em] font-medium">A growing technical stack.</h2>
            <p className="mt-5 text-neutral-500 dark:text-neutral-400 leading-7 max-w-2xl">My strongest focus is currently Linux, shell scripting, Python and Git. My earlier web-development experience gives me a solid understanding of applications before they reach the infrastructure layer.</p>
          </div>
        </div>

        <div className="skill-list border-y border-neutral-200 dark:border-white/10">
          {groups.map((group, index) => (
            <div key={group.label} className="skill-reveal grid md:grid-cols-[.35fr_1fr] gap-6 md:gap-12 py-8 border-b last:border-b-0 border-neutral-200 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 pt-1">{group.label}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {group.skills.map((skill, i) => (
                  <span key={skill} className="skill-word text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 hover:text-[#f26a18] transition-colors">
                    {skill}{i < group.skills.length - 1 && <span className="text-neutral-300 dark:text-neutral-700 ml-4">/</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
