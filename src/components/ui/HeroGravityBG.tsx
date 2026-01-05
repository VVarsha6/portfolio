import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  seed: number;
};

export default function HeroGravityBG({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const MAX = prefersReduced ? 55 : 150;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const seedParticles = (w: number, h: number) => {
      const ps: Particle[] = [];
      for (let i = 0; i < MAX; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h, // ✅ no navbar avoidance
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 0.95 + Math.random() * 1.8,
          // ✅ slightly brighter but controlled
          a: 0.20 + Math.random() * 0.28, // 0.20..0.48
          seed: Math.random() * 1000,
        });
      }
      particlesRef.current = ps;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;

      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) seedParticles(w, h);
    };

    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Track pointer only when inside hero bounds
    const onMove = (e: PointerEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;

      pointer.current.active =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    const onBlur = () => {
      pointer.current.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onBlur);

    let last = performance.now();

    const tick = (now: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;

      const dt = clamp((now - last) / 16.67, 0.5, 1.6);
      last = now;

      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;

      // ✅ Slower + calmer motion
      const time = now * 0.00045; // slower than before
      const swim = prefersReduced ? 0.012 : 0.022; // smaller drift

      // Cursor repel (interactive but not aggressive)
      const repelRadius = prefersReduced ? 150 : 230;
      const repelStrength = prefersReduced ? 1.0 : 1.6;

      // Light friction so motion stays alive
      const friction = prefersReduced ? 0.996 : 0.991;

      // ✅ More cyan + a touch brighter (still subtle)
      const CYAN = "34,211,238"; // Tailwind cyan-400 vibe

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Gentle swim (independent per particle; no herding)
        p.vx += Math.cos(time + p.seed) * swim * dt;
        p.vy += Math.sin(time * 0.9 + p.seed) * swim * dt;

        // Cursor repel bubble
        if (pointer.current.active) {
          const dx = p.x - pointer.current.x;
          const dy = p.y - pointer.current.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < repelRadius * repelRadius && d2 > 12) {
            const d = Math.sqrt(d2);
            const falloff = 1 - d / repelRadius;
            const push = repelStrength * falloff * falloff;
            p.vx += (dx / d) * push * dt;
            p.vy += (dy / d) * push * dt;
          }
        }

        // Integrate
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap inside hero bounds
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Draw (keep glow controlled so text stays readable)
        ctx.beginPath();
        ctx.fillStyle = `rgba(${CYAN},${p.a})`;
        ctx.shadowColor = `rgba(${CYAN},0.55)`;
        ctx.shadowBlur = 10; // controlled glow
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}
