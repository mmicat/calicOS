import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GalleryDeck.module.css';

const INITIAL_IMAGES = [
  { id: 1, src: '/gallery/GD-canvas.png', title: 'Gallery Item 1' },
  { id: 2, src: '/gallery/moully-3doodle.png', title: 'Gallery Item 2' },
  { id: 3, src: '/gallery/bapc-clyde-doodle.png', title: 'Gallery Item 3' },
  { id: 4, src: '/gallery/nat 20.png', title: 'Gallery Item 4' },
  { id: 5, src: '/gallery/catalogue puppycat faces.png', title: 'Gallery Item 5' },
  { id: 6, src: '/gallery/Untitled267_20260329161352.png', title: 'Gallery Item 6' },
  { id: 7, src: '/gallery/20260327_005230.png', title: 'Gallery Item 7' },
  { id: 8, src: '/gallery/wormycat.png', title: 'Gallery Item 8' },
];

const GalleryDeck = () => {
  const [cards, setCards] = useState(INITIAL_IMAGES);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80;
    
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.offset.y) > swipeThreshold) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();
        newCards.push(topCard);
        return newCards;
      });
    }
  };

  return (
    <div className={styles.deckWrapper}>
      <motion.div 
        className={styles.swipeHint}
        animate={{ 
          opacity: [0.4, 1, 0.4]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }}
      >
        <svg width="60" height="30" viewBox="0 0 60 30" style={{ overflow: 'visible', transform: 'rotate(40deg)' }}>
          {/* Invisible curved path for text to follow */}
          <path id="arch" d="M 0 30 Q 30 -5 60 30" fill="transparent" />
          <text fontSize="13" fill="#aaaaaa" fontFamily="var(--font-body)" letterSpacing="1px">
            <textPath href="#arch" startOffset="50%" textAnchor="middle">
              swipe!
            </textPath>
          </text>
        </svg>
      </motion.div>

      {cards.map((card, index) => {
        const isTop = index === 0;

        return (
          <motion.div
            key={card.id}
            className={styles.card}
            style={{
              zIndex: cards.length - index,
            }}
            animate={isTop ? {
              top: 0,
              x: 0,
              rotate: 0,
              scale: 1,
              opacity: 1
            } : {
              top: index * 12,
              x: index % 2 !== 0 ? -20 : 20,
              rotate: index % 2 !== 0 ? -4 : 4,
              scale: 1 - index * 0.04,
              opacity: index > 2 ? 0 : 1 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            drag={isTop}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
          >
            <img src={card.src} alt={card.title} className={styles.image} draggable="false" /> 
          </motion.div>
        );
      })}
    </div>
  );
};

export default GalleryDeck;
