const GREEN = '#1fae5a';

export default function RobotSvg({ on }) {
  const stroke = on ? GREEN : 'var(--muted)';
  const eyeFill = on ? '#ffffff' : 'var(--muted)';

  return (
    <svg viewBox="0 0 64 64" fill="none">
      <line x1="32" y1="6" x2="32" y2="14" stroke={stroke} strokeWidth="2" />
      <circle cx="32" cy="5" r="3" fill={stroke} />
      <rect x="14" y="14" width="36" height="26" rx="6" stroke={stroke} strokeWidth="2" />
      <rect x="22" y="24" width="7" height="9" rx="1.5" fill={eyeFill} />
      <rect x="35" y="24" width="7" height="9" rx="1.5" fill={eyeFill} />
      <line x1="24" y1="42" x2="40" y2="42" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M32 45 L40 48 V56 C40 60 32 63 32 63 C32 63 24 60 24 56 V48 Z"
        stroke={stroke}
        strokeWidth="2"
        fill={on ? 'rgba(31,174,90,0.15)' : 'none'}
      />
    </svg>
  );
}
