import { useState } from 'react';
import { projects } from '../data/projects';

const TAG_COLORS = ['#e6398f', '#2ec4b6', '#ffb627', '#6a4fd6', '#ff7a3c'];

export default function Projects({ active }) {
  const [tab, setTab] = useState('research');

  return (
    <section className={`page${active ? ' active' : ''}`} id="page-projects">

      
      <div className="page-title-row">
        <svg className="title-doodle" viewBox="0 0 36 20" aria-hidden="true">
          <path d="M12 2 C 4 2, 4 9, 8 10 C 4 11, 4 18, 12 18" strokeWidth="1.8" fill="none" />
          <path d="M24 2 C 32 2, 32 9, 28 10 C 32 11, 32 18, 24 18" strokeWidth="1.8" fill="none" />
        </svg>
        <div className="page-title mono">projects</div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn mono${tab === 'research' ? ' active' : ''}`}
          onClick={() => setTab('research')}
        >
          Research
        </button>
        <button
          className={`tab-btn mono${tab === 'development' ? ' active' : ''}`}
          onClick={() => setTab('development')}
        >
          Development
        </button>
      </div>

      <div className="card-grid">
        {Object.entries(projects).map(([group, items]) =>
          items.map((p, idx) => (
            <div key={p.name} className={`card${group === tab ? ' show' : ''}`}>
              {group === tab && idx === 0 && (
                <svg className="doodle card-doodle" viewBox="0 0 26 26" aria-hidden="true">
                  <circle cx="13" cy="13" r="10" strokeWidth="1.6" strokeDasharray="2 5" />
                </svg>
              )}
              <div className="card-type mono">{p.type}</div>
              <div className="card-name">{p.name}</div>
              <div className="card-desc">{p.desc}</div>
              <div className="card-tags">
                {p.tags.map((t, i) => (
                  <span key={t} className="mono">
                    <span className="tag-dot" style={{ background: TAG_COLORS[i % TAG_COLORS.length] }} />
                    {t}
                  </span>
                ))}
              </div>
              <a className="card-link mono" href={p.link || 'https://github.com/Divya19gupta'}  target="_blank" rel="noreferrer">
                View →
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}