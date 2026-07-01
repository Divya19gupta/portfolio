# &lt;Div&gt;ya Gupta — Portfolio

A minimal black-and-white single-page portfolio built with Vite + React 18.

## Structure

```
src/
  main.jsx            entry point
  App.jsx              page routing (home/projects/journey) + aligned state
  index.css            all styles, design tokens as CSS variables
  components/
    Nav.jsx             bottom dot navigation + arrows
    Home.jsx             name typing animation, subtext, robot, links
    Ribbons.jsx           canvas ribbon animation, anchored to the robot
    RobotSvg.jsx           the robot icon, color-shifts when "aligned"
    Doodles.jsx             decorative hand-drawn SVG accents
    Projects.jsx              Research / Development tabs + cards
    Journey.jsx                 vertical career pipeline
  data/
    projects.js       project list (edit here to add/remove projects)
    journey.js         career timeline (edit here to add/remove steps)
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Outputs a static `dist/` folder — deploy it directly to Vercel (zero config,
just point it at this repo) or any static host.

## Notes / things you'll likely want to tweak

- **Links**: GitHub/LinkedIn/Email hrefs in `Home.jsx` are still `#` — swap in your real URLs.
- **Project links**: `link: '#'` in `data/projects.js` — same deal.
- **Ribbons**: tune `RIBBON_COUNT`, `ANGLE_START`/`ANGLE_END`, and `amp`/`speed` in `Ribbons.jsx` to change density/spread/speed.
- **Colors**: everything is driven by CSS variables at the top of `index.css` (`:root` and `body.secured`) — change the palette in one place.
