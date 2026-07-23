import React from 'react';
import styles from './TechStack.module.css';

const TechStack = ({ tech = [] }) => {
  if (!tech || tech.length === 0) return null;

  return (
    <div className={styles.techContainer}>
      {tech.map((item, i) => (
        <span key={i} className={styles.techChip}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default TechStack;
