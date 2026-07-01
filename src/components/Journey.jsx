import { steps } from '../data/journey';

export default function Journey({ active }) {
  return (
    <section className={`page${active ? ' active' : ''}`} id="page-journey">
      <div className="page-title-row">
        <svg className="title-doodle" viewBox="0 0 36 20" aria-hidden="true">
          <path d="M4 14 L14 4 L20 10 L32 2" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="2" r="1.8" fill="var(--muted)" stroke="none" />
        </svg>
        <div className="page-title mono">journey</div>
      </div>

      <div className="pipeline">
        {/* The winding board-game path connecting every tile, fading out past the last one */}
        <svg className="snake-path" viewBox="0 0 48 800" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="snakeFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="78%" stopColor="var(--accent)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M24 0
               C 42 40, 6 80, 24 120
               C 42 160, 6 200, 24 240
               C 42 280, 6 320, 24 360
               C 42 400, 6 440, 24 480
               C 42 520, 6 560, 24 600
               C 42 640, 6 680, 24 720
               C 34 745, 14 765, 24 800"
            fill="none"
            stroke="url(#snakeFade)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {steps.map((s, idx) => (
          <div key={s.date} className={`step${s.now ? ' now' : ''}`}>
            {s.now && <span className="now-pulse" />}
            <div className="step-marker mono">{s.now ? '★' : idx + 1}</div>
            <div className="step-date mono">{s.date}</div>
            <div className="step-role">{s.role}</div>
            {s.org && <div className="step-org">{s.org}</div>}
          </div>
        ))}

        {/* The path — and the journey — keeps going */}
        <div className="path-tail" aria-hidden="true">
          <span className="tail-dot" />
          <span className="tail-dot" />
          <span className="tail-dot" />
        </div>
      </div>
    </section>
  );
}