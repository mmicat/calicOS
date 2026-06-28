import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Splash = ({ onComplete }) => {
  const location = useLocation();
  const isArtist = location.pathname === '/artist';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          layoutId="heroTitle"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.5rem, 12vw, 8rem)',
            color: isArtist ? 'var(--color-watermelon)' : 'var(--color-text)',
            margin: 0,
            marginBottom: '1rem',
            lineHeight: 0.9,
            textAlign: 'left'
          }}
        >
          {isArtist ? "kelicode" : <>MIRA<br/>ISMAIL</>}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          layoutId="heroSubtitle"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: isArtist ? 'var(--color-text)' : 'var(--color-royalblue)',
            margin: 0,
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em'
          }}
        >
          {isArtist ? "Digital Artist" : "Creative Systems & Web Engineer"}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Splash;
