import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Faux3DButton from '../components/Faux3DButton';
import GalleryDeck from '../components/GalleryDeck';
import styles from './ViewStyles.module.css';
import { ShoppingBag } from 'lucide-react';
import { Instagram } from '../components/BrandIcons';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const CURRENCY_RATES = {
  AED: { rate: 1, symbol: 'AED' },
  USD: { rate: 0.27, symbol: 'USD' },
  AUD: { rate: 0.41, symbol: 'AUD' },
  CAD: { rate: 0.37, symbol: 'CAD' }
};

const ArtistView = () => {
  const [currency, setCurrency] = useState('AED');

  const formatPrice = (aedPrice) => {
    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;
    const converted = Math.round(aedPrice * rate);
    return `${converted} ${symbol}`;
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.viewContainer}
    >
      <section id="art-hero" className={styles.section}>
        <motion.h1 layoutId="heroTitle" className={styles.heroTitle} style={{ color: 'var(--color-artist-title)', textShadow: '4px 4px 0px var(--color-artist-shadow)' }}>
          kelicode
        </motion.h1>
        <motion.p layoutId="heroSubtitle" className={styles.heroSubtitle}>Digital Artist</motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginTop: '2rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 className={styles.sectionTitle}>What can I do?</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-text-light)', lineHeight: '1.8' }}>
              <li>humans (semi-realism)</li>
              <li>animals & critters</li>
              <li>anthropomorphic</li>
              <li>typography</li>
              <li>sticker designs</li>
              <li>OCs and fanart</li>
            </ul>
          </div>
          
          <div style={{ flex: '1.2', minWidth: '300px' }}>
            <GalleryDeck />
          </div>
        </div>
      </section>

      <section id="commissions" className={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Commission Pricing</h2>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              padding: '0.5rem',
              fontFamily: 'var(--font-heading)',
              border: '2px solid var(--color-text)',
              borderRadius: '4px',
              backgroundColor: 'var(--color-canary)',
              color: 'var(--color-text)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="AED">AED</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'transparent' }}></th>
                <th>headshot/small graphic</th>
                <th>half-bod/medium graphic</th>
                <th>full/large graphic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>lineart</td>
                <td>{formatPrice(35)}</td>
                <td>{formatPrice(45)}</td>
                <td>{formatPrice(70)}</td>
              </tr>
              <tr>
                <td>flat color</td>
                <td>{formatPrice(45)}</td>
                <td>{formatPrice(70)}</td>
                <td>{formatPrice(100)}</td>
              </tr>
              <tr>
                <td>color + detail</td>
                <td>{formatPrice(60)}</td>
                <td>{formatPrice(90)}</td>
                <td>{formatPrice(120)} +</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className={styles.cardDesc} style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-text)' }}>any sketch: {formatPrice(30)}</p>
          <p className={styles.commissionNote} style={{ marginTop: '0.5rem' }}>* subject to minor change; feel free to ask for quotes!</p>
        </div>
      </section>

      <section id="storefront" className={styles.section}>
        <h2 className={styles.sectionTitle}>Links & Store</h2>
        <div className={styles.actionRow} style={{ marginTop: '2rem' }}>
          <Faux3DButton color="var(--color-emerald)" href="https://acggoods.com/store/calicode">
            <ShoppingBag size={18} />
            ACGGoods Store
          </Faux3DButton>
          <Faux3DButton color="var(--color-watermelon)" href="https://www.instagram.com/06sicle/">
            <Instagram size={18} />
            Instagram
          </Faux3DButton>
        </div>
      </section>
    </motion.div>
  );
};

export default ArtistView;
