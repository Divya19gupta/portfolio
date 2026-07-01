export default function Nav({ pages, current, onGo }) {
  return (
    <div id="nav">
      <button className="nav-arrow mono" onClick={() => onGo(current - 1)} aria-label="Previous page">
        ←
      </button>
      <div className="dots">
        {pages.map((p, i) => (
          <div
            key={p}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => onGo(i)}
            role="button"
            aria-label={`Go to ${p}`}
          />
        ))}
      </div>
      <button className="nav-arrow mono" onClick={() => onGo(current + 1)} aria-label="Next page">
        →
      </button>
    </div>
  );
}
