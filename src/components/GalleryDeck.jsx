import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GalleryDeck.module.css';

const INITIAL_IMAGES = [
  { id: 1, src: '/gallery/GD-canvas.png', caption: 'Glow Daze for the Graphic Design Club at RIT Dubai' },
  { id: 2, src: '/gallery/moully-3doodle.png', caption: 'Moully\'s perfect donuts!' },
  { id: 3, src: '/gallery/bapc-clyde-doodle.png', caption: 'bee & puppycat commission' },
  { id: 4, src: '/gallery/nat 20.png', caption: 'nat 20, baby!' },
  { id: 5, src: '/gallery/catalogue puppycat faces.png', caption: 'puppycat sticker sheet' },
  { id: 6, src: '/gallery/Untitled267_20260329161352.png', caption: 'custom stickers' },
  { id: 7, src: '/gallery/20260327_005230.png', caption: 'custom doodles' },
  { id: 8, src: '/gallery/wormycat.png', caption: 'would you still love me if i was a worm?' },
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
    <div className={styles.container}>
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
              <img src={card.src} alt={card.caption} className={styles.image} draggable="false" /> 
            </motion.div>
          );
        })}
      </div>

      <motion.p 
        key={cards[0].id}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.captionText}
      >
        {cards[0].caption}
      </motion.p>
    </div>
  );
};

export default GalleryDeck;
