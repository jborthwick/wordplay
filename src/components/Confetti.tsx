import { useEffect, useRef } from "react";

// Desaturated vintage 3-color palette
const COLORS = ["#B8957A", "#8A9E7E", "#7B8FA1"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
}

function makeParticle(canvasWidth: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: -10 - Math.random() * 40,
    vx: (Math.random() - 0.5) * 2.5,
    vy: 2.5 + Math.random() * 2.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.15,
    width: 6 + Math.random() * 6,
    height: 3 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.75 + Math.random() * 0.25,
  };
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    // Size canvas to viewport
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles in bursts early on, then taper off
    const particles: Particle[] = [];
    const TOTAL_FRAMES = 280;
    const BURST_FRAMES = 80;

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles in burst phase
      if (frame < BURST_FRAMES) {
        const rate = frame < 30 ? 6 : 3;
        for (let i = 0; i < rate; i++) {
          particles.push(makeParticle(canvas.width));
        }
      }

      // Update + draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.995;
        p.rotation += p.rotationSpeed;

        // Fade out near bottom or after burst phase ends
        if (frame > BURST_FRAMES) {
          p.opacity -= 0.006;
        }

        if (p.opacity <= 0 || p.y > canvas.height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      frame++;
      if (frame < TOTAL_FRAMES || particles.length > 0) {
        animId = requestAnimationFrame(tick);
      }
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
}
