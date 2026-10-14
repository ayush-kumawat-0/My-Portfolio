import { useEffect, useRef } from "react";

export default function MeteorShower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Meteor {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        // Spawn from LEFT edge or TOP edge
        const fromLeft = Math.random() > 0.5;
        if (fromLeft) {
          this.x = -20 - Math.random() * 80;
          this.y = Math.random() * canvas.height;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = -20 - Math.random() * 80;
        }

        this.len   = Math.random() * 85 + 70;
        this.speed = Math.random() * 0.9 + 0.8;
        this.size  = Math.random() * 0.55 + 0.4;
        this.opacity = Math.random() * 0.28 + 0.24;

        // Angle: pointing toward bottom-RIGHT (~45deg)
        // cos(45) = 0.707, sin(45) = 0.707
        const angle = Math.PI / 4 + (Math.random() * 0.15 - 0.075); // tiny random spread
        this.vx =  Math.cos(angle) * this.speed; // positive = right
        this.vy =  Math.sin(angle) * this.speed; // positive = down

        if (initial) {
          const scatter = Math.random() * canvas.width * 0.8;
          this.x += Math.cos(angle) * scatter;
          this.y += Math.sin(angle) * scatter;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > canvas.width + this.len || this.y > canvas.height + this.len) {
          this.reset(false);
        }
      }

      draw() {
        // Tail is BEHIND the head (opposite direction of travel)
        const tailX = this.x - this.vx * (this.len / this.speed);
        const tailY = this.y - this.vy * (this.len / this.speed);

        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.4, `rgba(242,106,24,${this.opacity * 0.22})`);
        grad.addColorStop(1, `rgba(255,255,255,${this.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glowing head
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        glow.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        glow.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }

    const meteors = Array.from({ length: 15 }, () => new Meteor(true));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach(m => { m.update(); m.draw(); });
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.58 }}
    />
  );
}
