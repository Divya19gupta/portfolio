import { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Projects from './components/Projects';
import Journey from './components/Journey';

const PAGES = ['home', 'projects', 'journey'];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);

  function goTo(i) {
    setCurrent(((i % PAGES.length) + PAGES.length) % PAGES.length);
  }

  return (
    <>

      <div id="app">
        <Home active={current === 0} ready={ready} setReady={setReady} />
        <Projects active={current === 1} />
        <Journey active={current === 2} />
      </div>

      <Nav pages={PAGES} current={current} onGo={goTo} />
    </>
  );
}