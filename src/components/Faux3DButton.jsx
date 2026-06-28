import React from 'react';
import { motion } from 'framer-motion';
import styles from './Faux3DButton.module.css';

const Faux3DButton = ({ children, color = 'var(--color-emerald)', onClick, className = '', type = 'button', href, ...props }) => {
  const content = (
    <motion.button
      type={type}
      className={`${styles.button} ${className}`}
      style={{ '--btn-color': color }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default Faux3DButton;
