import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';

import Sidebar from './components/Sidebar';
import EngineerView from './views/EngineerView';
import ArtistView from './views/ArtistView';

import Splash from './components/Splash';

import './App.css'; // Global App layout styles

const ENGINEER_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' }
];

const ARTIST_SECTIONS = [
  { id: 'art-hero', label: 'Intro' },
  { id: 'commissions', label: 'Commissions' },
  { id: 'storefront', label: 'Links & Store' }
];

const AnimatedRoutes = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = React.useState(true);
  const isArtist = location.pathname === '/artist';
  const sections = isArtist ? ARTIST_SECTIONS : ENGINEER_SECTIONS;

  return (
    <LayoutGroup>
      <AnimatePresence>
        {showSplash && <Splash key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      {!showSplash && (
        <>
          <Sidebar sections={sections} />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EngineerView />} />
                <Route path="/artist" element={<ArtistView />} />
              </Routes>
            </AnimatePresence>
          </main>
        </>
      )}
    </LayoutGroup>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
