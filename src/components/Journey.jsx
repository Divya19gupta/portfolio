import { steps } from '../data/journey';

export default function Journey({ active }) {
  return (
    <section className={`page${active ? ' active' : ''}`} id="page-journey">
     
    <div className="journey-layout">
      <div className="pipeline">
       
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

        <div className="path-tail" aria-hidden="true">
          <span className="tail-dot" />
          <span className="tail-dot" />
          <span className="tail-dot" />
        </div>
      </div>
     <div className="journey-right">

  <svg
    className="journey-network"
    viewBox="0 0 820 420"
    aria-hidden="true"
  >
    <g
      stroke="var(--border-strong)"
      strokeWidth="1.5"
      fill="none"
      opacity=".55"
    >
      <path d="M70 80 L180 120 L310 70 L430 150" />
      <path d="M180 120 L140 250 L280 320 L430 270" />
      <path d="M310 70 L330 200 L430 150" />
      <path d="M140 250 L70 330 L280 320" />
      <path d="M330 200 L430 270 L380 360" />
      <path d="M280 320 L380 360" />
    </g>

    <g fill="white" stroke="var(--fg)" strokeWidth="2">
      <circle cx="70" cy="80" r="10"/>
      <circle cx="180" cy="120" r="8"/>
      <circle cx="310" cy="70" r="12"/>
      <circle cx="430" cy="150" r="9"/>
      <circle cx="140" cy="250" r="7"/>
      <circle cx="330" cy="200" r="6"/>
      <circle cx="430" cy="270" r="10"/>
      <circle cx="280" cy="320" r="8"/>
      <circle cx="70" cy="330" r="9"/>
      <circle cx="380" cy="360" r="11"/>
    </g>

    <g fill="var(--accent)">
      <circle cx="180" cy="120" r="3"/>
      <circle cx="330" cy="200" r="3"/>
      <circle cx="280" cy="320" r="3"/>
      <circle cx="430" cy="270" r="3"/>
    </g>

  </svg>

  <div className="page-title-row big-title">
   
  </div>
  
<div className="page-title mono" style={{ fontSize: '38px', letterSpacing: '6px', fontWeight: '800' }}>
  <svg
      className="title-doodle"
      viewBox="0 0 36 20"
      aria-hidden="true"
    >
      <path
        d="M4 14 L14 4 L20 10 L32 2"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="2"
        r="1.8"
        fill="var(--muted)"
        stroke="none"
      />
    </svg>
  journey
</div>
</div>
    </div>
    </section>
  );
}