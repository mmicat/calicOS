import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Faux3DButton from '../components/Faux3DButton';
import styles from './FundTrackerView.module.css';
import { Coffee, DollarSign, ShoppingBag } from 'lucide-react';

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

const RATE_USD = 0.27;
const GOAL_AED = 2000;
const CURRENT_AED = 150; // Hardcoded current amount - update this as you get funds!

const FundTrackerView = () => {
  const [currency, setCurrency] = useState('AED');

  const toggleCurrency = () => {
    setCurrency(currency === 'AED' ? 'USD' : 'AED');
  };

  const getAmount = (aedAmount) => {
    return currency === 'AED' ? aedAmount : Math.round(aedAmount * RATE_USD);
  };

  const currentAmt = getAmount(CURRENT_AED);
  const goalAmt = getAmount(GOAL_AED);
  const progressPercent = Math.min((CURRENT_AED / GOAL_AED) * 100, 100);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.container}
    >
      <div className={styles.goalCard}>
        <a href="https://www.facebook.com/share/1UVeuTAtSm/" target="_blank" rel="noreferrer">
          {/*<div className={styles.imagePlaceholder}>
            <span style={{ fontSize: '3rem' }}>💻</span>
            <br />
            Lenovo ThinkBook 16 Gen 6
          </div>*/}
          <div className={styles.goalImageContainer}>
            <img
              src="/media/laptop.jpg"
              alt="Fundraising Goal"
              className={styles.goalImage}
            />
          </div>
        </a>
        
        <div className={styles.goalHeader}>
          <h2 className={styles.goalTitle}>raising funds for a new laptop &lt;3 </h2>
          <button onClick={toggleCurrency} className={styles.toggleBtn} title="Switch Currency">
            {currency} 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: '4px' }}>
              <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>
        
        <div className={styles.progressText}>
          {currentAmt} / {goalAmt} {currency}
        </div>
      </div>

      <p className={styles.personalMessage}>
        as a student, engineer and mutidisciplinary creative, my laptop has been my trusty companion. it has been a tool for learning, a canvas for creativity, and a gateway to opportunities!
        i've grown so much with it by my side, from my junior year of high school stretching to my sophomore year of university. but lately, as my work grows more complex and resource-demanding, i found it struggling to keep up with the demands of my work. 
        <br></br>
        i insist to be financially independent, which is why i won't be asking my parents for a new laptop; especially with the huge uncertainty of owning a family business and having only a single stable income.
        <br></br><br></br>
        so, i'm raising funds for a new laptop! i'm especially targeting these desired specs at minimum:
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
          <li> intel core i7 or amd ryzen 7</li>
          <li> 16gb ram</li>
          <li> 1tb ssd</li>
        </ul>
        <br></br>
        thank you for stopping by! ^^ 
        </p>


      <div className={styles.linksSectionWrapper}>
        <h3 className={styles.helpHeading}>how can i help?</h3>
        <div className={styles.linksSection}>
          <div className={styles.linkContainer}>
            <Faux3DButton color="var(--color-canary)" href="https://ko-fi.com/calic06/goal?g=2">
              <Coffee size={18} />
              Support on Ko-fi
            </Faux3DButton>
          </div>
          <div className={styles.linkContainer}>
            <Faux3DButton color="var(--color-royalblue)" href="https://paypal.me/mmi0111">
              <DollarSign size={18} />
              Send via PayPal
            </Faux3DButton>
          </div>
          <div className={styles.linkContainer}>
            <Faux3DButton color="var(--color-emerald)" href="https://acggoods.com/store/calicode">
              <ShoppingBag size={18} />
              Shop ACGGoods
            </Faux3DButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FundTrackerView;
