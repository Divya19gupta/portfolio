import { useEffect, useRef, useState } from 'react';
import Ribbons from './Ribbons';
import RobotSvg from './RobotSvg';

// AI/ML + full-stack flavored status line, not security/compliance jargon —
// this should read like "a well-built, production-ready application", not an audit.
const STATUS_LINES = [
  { text: 'spinning up the model...', ok: false },
  { text: 'data pipeline: healthy', ok: true },
  { text: 'unit tests: passed', ok: true },
  { text: 'inference latency: optimized', ok: true },
  { text: 'model accuracy: validated', ok: true },
  { text: 'UI/UX: polished', ok: true },
  { text: 'system: production-ready ✓', ok: true },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Small generic glyphs — deliberately not the official GitHub/LinkedIn marks.
function CodeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5 L2 10 L7 15" />
      <path d="M13 5 L18 10 L13 15" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12 L12 8" />
      <path d="M9.5 5.5 L11 4 a3 3 0 0 1 4.2 4.2 L13.7 9.7" />
      <path d="M10.5 14.5 L9 16 a3 3 0 0 1-4.2-4.2 L6.3 10.3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5 L10 11 L17 5.5" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2.5 H12 L15.5 6 V17.5 H5 Z" />
      <path d="M12 2.5 V6 H15.5" />
      <path d="M7.5 10.5 H12.5 M7.5 13.5 H12.5" />
    </svg>
  );
}

export default function Home({ active, ready, setReady }) {
  const robotRef = useRef(null);

  const [typedTag, setTypedTag] = useState('');
  const [tagDone, setTagDone] = useState(false);
  const [typedRest, setTypedRest] = useState('');

  const [statusText, setStatusText] = useState('click to run');
  const [statusOk, setStatusOk] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function typeName() {
      const tag = '<Div>';
      const rest = 'ya Gupta';
      let t = '';
      for (const ch of tag) {
        if (cancelled) return;
        t += ch;
        setTypedTag(t);
        await sleep(95);
      }
      if (cancelled) return;
      await sleep(180);
      if (cancelled) return;
      setTagDone(true);
      let r = '';
      for (const ch of rest) {
        if (cancelled) return;
        r += ch;
        setTypedRest(r);
        await sleep(75);
      }
    }
    typeName();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRobotClick() {
    if (busy) return;
    if (ready) {
      setReady(false);
      setStatusText('click to run');
      setStatusOk(false);
      return;
    }
    setBusy(true);
    for (const line of STATUS_LINES) {
      setStatusText(line.text);
      setStatusOk(line.ok);
      await sleep(420);
    }
    setReady(true);
    setBusy(false);
  }

  return (
    <section className={`page${active ? ' active' : ''}`} id="page-home">
      <Ribbons robotRef={robotRef} aligned={ready} />

      <div className="home-content">
        <div className="terminal-frame">
          <svg className="corner-doodle corner-tl" viewBox="0 0 78 78" aria-hidden="true">
            <path d="M4 46 Q 12 8, 46 4" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
          <svg className="corner-doodle corner-tr" viewBox="0 0 68 68" aria-hidden="true">
            <circle cx="34" cy="34" r="26" strokeWidth="2" strokeDasharray="3 7" fill="none" />
          </svg>
          <svg className="corner-doodle corner-bl" viewBox="0 0 58 58" aria-hidden="true">
            <circle cx="10" cy="46" r="2.4" fill="var(--muted)" stroke="none" />
            <circle cx="22" cy="34" r="2.4" fill="var(--accent)" stroke="none" />
            <circle cx="34" cy="22" r="2.4" fill="var(--muted)" stroke="none" />
          </svg>
          <svg className="corner-doodle corner-br" viewBox="0 0 92 46" aria-hidden="true">
            <path d="M2 24 Q 24 4, 46 24 T 90 20" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
          <svg className="side-doodle side-doodle-left" viewBox="0 0 40 24" aria-hidden="true">
            <path d="M2 12 L 32 12" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 4 L 32 12 L 24 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <svg className="side-doodle side-doodle-right" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M15 2 V 28 M2 15 H 28 M5.5 5.5 L24.5 24.5 M24.5 5.5 L5.5 24.5" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <div className={`terminal-wrap${ready ? ' ready' : ''}`}>
            <div className="terminal-head">
              <span className="tdot red" />
              <span className="tdot yellow" />
              <span className="tdot green" />
              <span className="terminal-title mono">portfolio.sh</span>
            </div>

            <div className="terminal-body">
              <div id="name-type">
                <span className={tagDone ? 'tag-done' : 'grey'}>{typedTag}</span>
                <span className="grey">{typedRest}</span>
                <span className="cursor"></span>
              </div>

              <div className="eyebrow">
                <span className="eyebrow-rule" />
                <span className="eyebrow-dot" />
                <p className="eyebrow-text mono">AI/ML Engineer · Full Stack Developer · Researcher</p>
                <span className="eyebrow-dot" />
                <span className="eyebrow-rule" />
              </div>

              <blockquote className="statement">
                Building things that would've seemed like magic to my younger self.
              </blockquote>

              <div className="meta-divider" />

              <p className="details-text">
                I'm an MSc Computer Science student at Saarland University and a Research Assistant at
                CISPA, spending my days teaching machines to be a little fairer than the world that
                trained them. Outside of that, I'm probably knee-deep in a new side project, a research
                paper, or a browser tab I promised myself I'd read weeks ago. 
              </p>

              <div className="links">
                <a className="link-btn primary" href="/resume.pdf" download="Divya_Gupta_Resume.pdf">
                  <FileIcon /> CV
                </a>
                <a className="link-btn" href="https://github.com/Divya19gupta" target="_blank" rel="noreferrer">
                  <CodeIcon /> GitHub
                </a>
                <a className="link-btn" href="https://www.linkedin.com/in/divya-gupta-3a505617a" target="_blank" rel="noreferrer">
                  <LinkIcon /> LinkedIn
                </a>
                <a className="link-btn" href="mailto:divya2207.work@gmail.com" target="_blank" rel="noreferrer">
                  <MailIcon /> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="robot-wrap" ref={robotRef} onClick={handleRobotClick}>
          <svg className="doodle robot-doodle" viewBox="0 0 110 110" aria-hidden="true">
            <circle cx="55" cy="55" r="46" strokeWidth="1.4" strokeDasharray="3 7" />
          </svg>
          <RobotSvg on={ready} />
          <div className={`align-label mono${statusOk ? ' ok' : ''}${ready ? ' done' : ''}`}>
            {statusText}
          </div>
        </div>
      </div>
    </section>
  );
}