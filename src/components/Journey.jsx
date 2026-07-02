import { useEffect, useRef, useState } from 'react';
import { steps, now, cta, doodles } from '../data/journey';
import RobotSvg from './RobotSvg';

const PAD = { top: 90, right: 190, bottom: 50, left: 30 };

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function Doodle({ d }) {
  const style = { left: `${d.x}%`, top: `${d.y}%` };

  if (d.type === 'dashed-circle') {
    return (
      <svg className="road-doodle doodle-dashed-circle" style={{ ...style, width: d.size, height: d.size }} viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="26" strokeWidth="2" strokeDasharray="3 7" fill="none" />
      </svg>
    );
  }
  if (d.type === 'asterisk') {
    return (
      <svg className="road-doodle" style={{ ...style, width: d.size, height: d.size, color: d.color }} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 1 V19 M2.5 5.5 L17.5 14.5 M17.5 5.5 L2.5 14.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (d.type === 'squiggle') {
    return (
      <svg className="road-doodle" style={{ ...style, width: 70, height: 28, color: d.color }} viewBox="0 0 70 28" aria-hidden="true">
        <path d="M2 20 Q 14 4, 26 16 T 50 12 T 68 18" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (d.type === 'dots') {
    return (
      <div className="road-doodle road-doodle-dots" style={style}>
        <span /><span /><span />
      </div>
    );
  }
  if (d.type === 'caption') {
    return (
      <div className="road-doodle road-caption" style={style}>
        <span className="road-caption-text mono">{d.text}</span>
      </div>
    );
  }
  return null;
}

export default function Journey({ active }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 1000, h: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const innerW = Math.max(size.w - PAD.left - PAD.right, 1);
  const innerH = Math.max(size.h - PAD.top - PAD.bottom, 1);
  const toPx = (pt) => ({
    x: PAD.left + (pt.x / 100) * innerW,
    y: PAD.top + (pt.y / 100) * innerH,
  });

  const allStops = [...steps, now];
  const pixelStops = allStops.map(toPx);
  const roadPath = smoothPath(pixelStops);
  const dashedPath = smoothPath([toPx(now), toPx(cta)]);

  return (
    <section className={`page${active ? ' active' : ''}`} id="page-journey">
      <div className="page-title-row">
        <svg className="title-doodle" viewBox="0 0 36 20" aria-hidden="true">
          <path d="M4 14 L14 4 L20 10 L32 2" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="2" r="1.8" fill="var(--muted)" stroke="none" />
        </svg>
        <div className="page-title mono">journey</div>
      </div>

      <div className="road-wrap">
        <div className="road-container" ref={containerRef}>
          {doodles.map((d, i) => <Doodle key={i} d={d} />)}

          <svg className="road-svg" width={size.w} height={size.h} aria-hidden="true">
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6398f" />
                <stop offset="35%" stopColor="#2ec4b6" />
                <stop offset="65%" stopColor="#ffb627" />
                <stop offset="100%" stopColor="#6a4fd6" />
              </linearGradient>
            </defs>
            <path d={roadPath} className="road-base" fill="none" />
            <path d={roadPath} className="road-center" fill="none" />
            <path d={dashedPath} className="road-dashed" fill="none" />
          </svg>

          {pixelStops[0] && (
            <div className="road-flag" style={{ left: pixelStops[0].x, top: pixelStops[0].y }}>
              <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
                <path d="M4 2 V18" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 3 L16 6 L4 9 Z" fill="var(--accent-green)" />
              </svg>
              <span className="road-flag-label mono">START</span>
            </div>
          )}

          {steps.map((s, idx) => {
            const p = toPx(s);
            return (
              <div key={s.id} className="road-point" style={{ left: p.x, top: p.y }}>
                <div className="road-stop">{idx + 1}</div>
                <div className={`road-label ${s.labelPos} align-${s.labelAlign}`}>
                  <div className="road-label-date mono">{s.date}</div>
                  <div className="road-label-role">{s.role}</div>
                  {s.org && <div className="road-label-org">{s.org}</div>}
                </div>
              </div>
            );
          })}

          <div className="road-now" style={{ left: toPx(now).x, top: toPx(now).y }}>
            <span className="now-pulse-road" />
            <div className="road-token" aria-label="Current status">
              <RobotSvg on={true} />
            </div>
            <div className="road-label top align-center now-label">
              <div className="road-label-date mono">{now.date}</div>
              <div className="road-label-role">{now.role}</div>
            </div>
          </div>

          <div className="road-cta" style={{ left: toPx(cta).x, top: toPx(cta).y }}>
            <span className="road-cta-label mono">next stop<br /><strong>your team?</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}