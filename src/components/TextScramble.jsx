import { useEffect, useRef } from "react";

// HOW TO USE:
// Wrap any heading text with this component
// Example: <TextScramble text="Hi, I'm Ayush" className="text-7xl font-bold" />

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

export default function TextScramble({ text, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let frame = 0;
    let frameReq;
    const totalFrames = 30;

    const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const animate = () => {
      const progress = frame / totalFrames;
      let output = "";

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (i < Math.floor(progress * text.length)) {
          // Already resolved characters
          output += `<span style="color:inherit">${text[i]}</span>`;
        } else {
          // Still scrambling
          output += `<span style="opacity:0.4;color:#f26a18">${randomChar()}</span>`;
        }
      }

      el.innerHTML = output;
      frame++;

      if (frame <= totalFrames) {
        frameReq = requestAnimationFrame(animate);
      } else {
        el.innerHTML = text;
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameReq);
    };
  }, [text, delay]);

  return <span ref={ref} className={className}>{text}</span>;
}

// ─────────────────────────────────────────────
// IN Hero.jsx — find the first heading span:
//
// BEFORE:
// import statement at top — nothing to add
// <span className="block opacity-0">Hi, I'm Ayush</span>
//
// AFTER:
// import TextScramble from "./TextScramble";
//
// <span className="block opacity-0">
//   <TextScramble text="Hi, I'm Ayush" delay={800} />
// </span>
//
// delay={800} means it starts scrambling 800ms after mount
// which lines up perfectly after the GSAP entrance animation
// ─────────────────────────────────────────────
