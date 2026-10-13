import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MouseFollower from "./components/MouseFollower";
import ScrollProgress from "./components/ScrollProgress";
import MeteorShower from "./components/MeteorShower";

const SCROLL_KEY = "ayush-portfolio-scroll";

function getSavedScroll() {
  const values = [
    sessionStorage.getItem(SCROLL_KEY),
    localStorage.getItem(SCROLL_KEY),
  ];
  for (const value of values) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return 0;
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try { window.history.scrollRestoration = "manual"; } catch (_) {}

    let restoring = true;
    const restore = () => {
      const saved = getSavedScroll();
      if (!saved) return;
      window.scrollTo({ top: saved, left: 0, behavior: "auto" });
    };

    // The page contains animations and a remote iframe, so restore more than once
    // while the layout settles. This prevents refresh from snapping back to the top.
    restore();
    let frame = 0;
    const settle = () => {
      restore();
      frame += 1;
      if (frame < 12 && restoring) requestAnimationFrame(settle);
    };
    requestAnimationFrame(settle);
    const timers = [80, 250, 600, 1200].map((delay) => window.setTimeout(restore, delay));

    let saveFrame = 0;
    const save = () => {
      if (saveFrame) return;
      saveFrame = requestAnimationFrame(() => {
        const y = String(Math.round(window.scrollY));
        sessionStorage.setItem(SCROLL_KEY, y);
        localStorage.setItem(SCROLL_KEY, y);
        saveFrame = 0;
      });
    };

    const stopRestoring = () => { restoring = false; };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    window.addEventListener("beforeunload", save);
    window.addEventListener("pageshow", restore);
    window.addEventListener("load", restore);
    window.addEventListener("wheel", stopRestoring, { passive: true, once: true });
    window.addEventListener("touchstart", stopRestoring, { passive: true, once: true });

    return () => {
      restoring = false;
      timers.forEach(clearTimeout);
      if (saveFrame) cancelAnimationFrame(saveFrame);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("load", restore);
      window.removeEventListener("wheel", stopRestoring);
      window.removeEventListener("touchstart", stopRestoring);
    };
  }, []);

  return (
    <div className="site-shell bg-white dark:bg-[#090a0b] text-[#171717] dark:text-[#f4f4f2] transition-colors duration-500 cursor-none">
      <MeteorShower />
      <ScrollProgress />
      <MouseFollower />
      <Navbar theme={theme} toggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
