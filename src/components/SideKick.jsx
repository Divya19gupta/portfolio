import { useEffect, useRef, useState } from 'react';
import RobotSvg from './RobotSvg';

const PAGE_LINES = {
  projects: 'these are my favorites →',
  journey: 'long road, huh',
};

const CLICK_LINES = [
  'beep boop, hire her',
  '01001000 01101001',
  'you found me!',
  "let's build something",
  'nice click',
];

const BURST_COLORS = ['#e6398f', '#2ec4b6', '#ffb627', '#6a4fd6', '#ff7a3c'];

export default function Sidekick({ page }) {
  const [excited, setExcited] = useState(false);
  const [line, setLine] = useState(PAGE_LINES[page] || '');
  const timeoutRef = useRef(null);


  useEffect(() => {
    if (!excited) setLine(PAGE_LINES[page] || '');
  }, [page, excited]);

  function handleClick() {
    const random = CLICK_LINES[Math.floor(Math.random() * CLICK_LINES.length)];
    setLine(random);
    setExcited(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setExcited(false), 1500);
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const burstDots = BURST_COLORS.map((c, i) => {
    const angle = (i / BURST_COLORS.length) * Math.PI * 2 + Math.PI / 6;
    const dx = Math.cos(angle) * 58;
    const dy = Math.sin(angle) * 58;
    return { c, dx, dy, i };
  });

  return (
    <div className={`sidekick${excited ? ' excited' : ''}`}>
      <div className="sidekick-bubble mono">{line}</div>

      <button
        type="button"
        className="sidekick-btn"
        onClick={handleClick}
        aria-label="Say hi to the sidekick robot"
      >
        <RobotSvg on={true} />
        {excited && (
          <span className="sidekick-burst" aria-hidden="true">
            {burstDots.map(({ c, dx, dy, i }) => (
              <span
                key={i}
                className="burst-dot"
                style={{ '--c': c, '--dx': `${dx}px`, '--dy': `${dy}px` }}
              />
            ))}
          </span>
        )}
      </button>
    </div>
  );
}