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
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
