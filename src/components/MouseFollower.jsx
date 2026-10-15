import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MouseFollower() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    let mouseX = 0, mouseY = 0;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0, ease: "none" });

      // Ring follows with lag
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.35, ease: "power2.out" });
    };

    const moveTouchIndicator = (x, y) => {
      mouseX = x;
      mouseY = y;
      // Touch events can arrive while the page is scrolling. Positioning
      // directly avoids queuing animations behind the scroll gesture.
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = transform;
      cursor.style.transform = transform;
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      moveTouchIndicator(touch.clientX, touch.clientY);
      gsap.to(cursor, { opacity: 0.85, scale: 1, duration: 0.2 });
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) moveTouchIndicator(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.25 });
      gsap.to(dot, { opacity: 0, duration: 0.25 });
    };

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 2, opacity: 0.4, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    if (isTouchDevice) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    }

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (isTouchDevice) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
      }
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="mobile-cursor fixed top-0 left-0 w-8 h-8 rounded-full border border-[#1A1A1A] dark:border-[#E5E5E5] pointer-events-none z-[9999] "
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="mobile-cursor fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#F26A18] pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
