import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = ["About", "Skills", "Projects", "Contact"];

export default function Navbar({ toggleTheme, theme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: -18, opacity: 0, duration: 0.7, ease: "power3.out" });
    });
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const go = (name) => {
    document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav ref={ref} className={`portfolio-nav fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between">
          <button onClick={() => window.location.reload()} className="brand-mark" aria-label="Refresh website">
            AK<span>.</span>
          </button>

          <div className="hidden md:flex items-center gap-1 nav-panel">
            {links.map((link) => (
              <button key={link} onClick={() => go(link)} className="nav-link">{link}</button>
            ))}
            <span className="nav-divider" />
            <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              <span className="theme-icon">{theme === "dark" ? "☼" : "☾"}</span>
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="theme-toggle mobile-theme" aria-label="Toggle theme">
              <span className="theme-icon">{theme === "dark" ? "☼" : "☾"}</span>
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button onClick={() => setOpen(!open)} className="menu-button" aria-label="Open menu">
              <span className={open ? "open-a" : ""} />
              <span className={open ? "open-b" : ""} />
              <span className={open ? "open-c" : ""} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu fixed inset-0 z-[90] md:hidden ${open ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <div className="text-xs uppercase tracking-[0.24em] text-neutral-400 mb-8">Navigation</div>
          {links.map((link, i) => (
            <button key={link} onClick={() => go(link)} className="mobile-nav-link">
              <span>0{i + 1}</span>{link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
