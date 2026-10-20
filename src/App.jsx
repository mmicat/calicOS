import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';

import Sidebar from './components/Sidebar';
import EngineerView from './views/EngineerView';
import ArtistView from './views/ArtistView';

import Splash from './components/Splash';
import CautionTape from './components/CautionTape';
import ThemeToggle from './components/ThemeToggle';
import FundTrackerView from './views/FundTrackerView';
import WishlistView from './views/WishlistView';

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
  const isArtist = location.pathname === '/artist';
  const isFund = location.pathname === '/fund';
  const isWishlist = ['/wishlist', '/birthday', '/bday'].includes(location.pathname);
  const [showSplash, setShowSplash] = React.useState(!isWishlist);
  
  const shouldShowSplash = showSplash && !isWishlist;
  const sections = isFund || isWishlist ? [] : (isArtist ? ARTIST_SECTIONS : ENGINEER_SECTIONS);

  return (
    <LayoutGroup>
      <AnimatePresence>
        {shouldShowSplash && <Splash key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      {!shouldShowSplash && (
        <>
          <Sidebar sections={sections} />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EngineerView />} />
                <Route path="/artist" element={<ArtistView />} />
                <Route path="/fund" element={<FundTrackerView />} />
                <Route path="/wishlist" element={<WishlistView />} />
                <Route path="/birthday" element={<WishlistView />} />
                <Route path="/bday" element={<WishlistView />} />
              </Routes>
            </AnimatePresence>
            {!isWishlist && <CautionTape />}
            <ThemeToggle />
          </main>
        </>
      )}
    </LayoutGroup>
  );
};

function App() {
  useEffect(() => {
    const favicons = [
      '/media/bintu-ico-emerald.png',
      '/media/bintu-ico-limeade.png',
      '/media/bintu-ico-canary.png',
      '/media/bintu-ico-watermelon.png',
      '/media/bintu-ico-royalblue.png'
    ];
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % favicons.length;
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = favicons[currentIndex];
      }
    }, 2000); // 2 seconds interval

    return () => clearInterval(intervalId);
  }, []);

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
