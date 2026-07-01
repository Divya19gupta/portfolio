import { useEffect, useRef } from 'react';

const COLORS = ['#e63988', '#ffb627', '#ff7a3c', '#2ec4b6', '#6a4fd6', '#ff5c8a'];
const MAX_PARTICLES = 320;

function hexToRgba(hex, a) {
  const b = parseInt(hex.slice(1), 16);
  return `rgba(${(b >> 16) & 255},${(b >> 8) & 255},${b & 255},${a})`;
}

export default function Ribbons({ robotRef, aligned }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const alignedRef = useRef(aligned);

  useEffect(() => {
    alignedRef.current = aligned;
  }, [aligned]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(originX, originY) {
      if (particlesRef.current.length >= MAX_PARTICLES) return;
      const angle = (-172 + Math.random() * 164) * (Math.PI / 180);
      const speed = 1.3 + Math.random() * 3.2;
      particlesRef.current.push({
        x: originX + (Math.random() - 0.5) * 12,
        y: originY + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        decay: 0.0038 + Math.random() * 0.004,
        drift: (Math.random() - 0.5) * 0.02,
      });
    }

    function frame() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      let originX = w / 2;
      let originY = h * 0.78;
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
      }

      const isAligned = alignedRef.current;
      if (!isAligned) {
        for (let i = 0; i < 4; i++) spawn(originX, originY);
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx += p.drift;
        p.life -= p.decay;
        const alpha = Math.max(p.life, 0) * 0.55;
        ctx.fillStyle = hexToRgba(p.color, alpha);
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });
      ctx.restore();

      particlesRef.current = particlesRef.current.filter(
        (p) => p.life > 0 && p.x > -100 && p.x < w + 100 && p.y > -100 && p.y < h + 100
      );

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [robotRef]);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}