import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState('colorful');

  useEffect(() => {
    if (theme === 'monotone') {
      document.documentElement.setAttribute('data-theme', 'monotone');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div 
            className={styles.nodesContainer}
          >
            <motion.button
              className={`${styles.node} ${styles.colorfulNode}`}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -100, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme('colorful')}
              title="Colorful Theme"
            >
              <div className={styles.pie} />
            </motion.button>
            <motion.button
              className={`${styles.node} ${styles.monotoneNode}`}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme('monotone')}
              title="Monotone Theme"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button className={styles.mainButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 4.2c.42.31.68.8.68 1.33v8.56c0 .9-.73 1.63-1.63 1.63H7.29A1.63 1.63 0 0 1 5.66 16.78V8.22c0-.53.26-1.02.68-1.33L12 2.69z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
