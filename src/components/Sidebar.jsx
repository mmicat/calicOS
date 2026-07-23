import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

// The icons we will use
import canaryIcon from '/media/bintu-ico-canary.png';
import emeraldIcon from '/media/bintu-ico-emerald.png';
import limeadeIcon from '/media/bintu-ico-limeade.png';
import royalblueIcon from '/media/bintu-ico-royalblue.png';
import watermelonIcon from '/media/bintu-ico-watermelon.png';

const ICONS = [watermelonIcon, canaryIcon, limeadeIcon, emeraldIcon, royalblueIcon];

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const Sidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [iconIndex, setIconIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // offset for better detection
      let current = sections[0]?.id;

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPos) {
          current = section.id;
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
        // Change icon color on section change just for fun!
        setIconIndex((prev) => (prev + 1) % ICONS.length);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  // Teetering animation variants
  const teeterVariants = {
    animate: {
      rotate: [-10, 10, -10],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
      <div className={styles.topBar}>
        <div className={styles.logoContainer} onClick={toggleMobileMenu}>
          <motion.img 
            src={ICONS[iconIndex]} 
            alt="Bintu Logo" 
            className={styles.logo}
            variants={teeterVariants}
            animate="animate"
          />
        </div>
        
        <div className={styles.viewToggle}>
          <div className={styles.toggleText}>View Mode</div>
          <Link to="/" className={`${styles.toggleBtn} ${location.pathname === '/' ? styles.activeToggle : ''}`}>Engineer</Link>
          <Link to="/artist" className={`${styles.toggleBtn} ${location.pathname === '/artist' ? styles.activeToggle : ''}`}>Artist</Link>
        </div>
      </div>
      
      <div className={styles.menuContent}>
        <ul className={styles.navList}>
          {location.pathname === '/fund' ? (
            <li>
              <Link to="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                ← Back
              </Link>
            </li>
          ) : (
            sections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`} 
                  className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))
          )}
        </ul>
        
        <div className={styles.contactSection}>
          {location.pathname !== '/fund' && (
            <Link to="/fund" className={styles.fundIconBtn} title="Fundraiser" onClick={() => setIsMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              </svg>
            </Link>
          )}
          <div className={styles.contactLocation}>Dubai, UAE</div>
          {location.pathname === '/artist' ? (
            <>
              <a href="mailto:misofartist@gmail.com" className={styles.contactLink}>Email <ArrowUpRight /></a>
              <a href="https://linkedin.com/in/mira-m-ismail" target="_blank" rel="noreferrer" className={styles.contactLink}>LinkedIn <ArrowUpRight /></a>
              <a href="https://github.com/mmicat" target="_blank" rel="noreferrer" className={styles.contactLink}>GitHub <ArrowUpRight /></a>
            </>
          ) : (
            <>
              <a href="mailto:mi6491@rit.edu" className={styles.contactLink}>Email <ArrowUpRight /></a>
              <a href="https://linkedin.com/in/mira-m-ismail" target="_blank" rel="noreferrer" className={styles.contactLink}>LinkedIn <ArrowUpRight /></a>
              <a href="https://github.com/mmicat" target="_blank" rel="noreferrer" className={styles.contactLink}>GitHub <ArrowUpRight /></a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
