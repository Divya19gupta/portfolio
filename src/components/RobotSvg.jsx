const GREEN = '#1fae5a';
const BLUSH = '#e6398f';

export default function RobotSvg({ on }) {
  const stroke = on ? GREEN : 'var(--muted)';

  return (
    <svg viewBox="0 0 64 64" fill="none">
      {/* antenna */}
      <line x1="32" y1="6" x2="32" y2="13" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3.4" fill={stroke} />

      {/* head */}
      <rect x="12" y="13" width="40" height="28" rx="12" stroke={stroke} strokeWidth="2.2" />

      {/* eyes */}
      <circle cx="24" cy="28" r="4.6" fill={stroke} />
      <circle cx="40" cy="28" r="4.6" fill={stroke} />
      <circle cx="22.4" cy="26.4" r="1.3" fill="#ffffff" />
      <circle cx="38.4" cy="26.4" r="1.3" fill="#ffffff" />

      {/* blush */}
      <circle cx="17" cy="33.5" r="2.6" fill={BLUSH} opacity={on ? 0.5 : 0} />
      <circle cx="47" cy="33.5" r="2.6" fill={BLUSH} opacity={on ? 0.5 : 0} />

      {/* smile */}
      <path d="M26 35 Q32 39 38 35" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* body / collar */}
      <path
        d="M32 44 L41 48 V56.5 C41 60.5 32 63 32 63 C32 63 23 60.5 23 56.5 V48 Z"
        stroke={stroke}
        strokeWidth="2.2"
        fill={on ? 'rgba(31,174,90,0.15)' : 'none'}
      />
    </svg>
  );
}