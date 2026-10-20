import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, ExternalLink, Heart, Gift, Loader2, Coffee, DollarSign, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Faux3DButton from '../components/Faux3DButton';
import styles from './WishlistView.module.css';

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

const normalizeTargetUrl = (url) => {
  // Expand shortlinks for screenshot services
  if (url === 'https://gofund.me/d767d1013') {
    return 'https://www.gofundme.com/f/together-we-can-change-lana-and-halas-story';
  }
  return url;
};

// Primary: Microlink Screenshot API (waits for network idle + 3.5s delay to ensure complete hydration)
const getScreenshotUrl = (url) => {
  const target = normalizeTargetUrl(url);
  return `https://api.microlink.io?url=${encodeURIComponent(target)}&screenshot=true&embed=screenshot.url&waitForTimeout=3500&waitUntil=networkidle2&viewport.width=1280&viewport.height=800`;
};

// Fallback: WordPress mShots Screenshot API
const getFallbackScreenshotUrl = (url) => {
  const target = normalizeTargetUrl(url);
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(target)}?w=1024`;
};

const getEffectiveScreenshot = (item) => {
  if (item.screenshotUrl) return item.screenshotUrl;
  return getScreenshotUrl(item.url);
};

const getPlatformName = (url) => {
  if (url.includes('chuffed.org')) return 'Chuffed.org';
  if (url.includes('gofundme.com') || url.includes('gofund.me')) return 'GoFundMe';
  if (url.includes('supernote.com')) return 'Supernote';
  if (url.includes('ko-fi.com')) return 'Ko-fi';
  if (url.includes('paypal.me')) return 'PayPal';
  return 'Campaign Link';
};

/* =====================================================================
   CAMPAIGN DONATION LINKS & WISHLIST ITEMS
   ===================================================================== */

// 1. Fundraiser Donation Links
const DONATION_LINKS = [
  {
    id: 'donation-178918',
    title: 'Help the Children in Gaza (Project Mohammed)',
    description: 'Youth-led emergency relief delivering food, clean water, medical aid, and infant formula.',
    url: 'https://chuffed.org/project/178918'
  },
  {
    id: 'donation-172937',
    title: 'Donate to the Handala Relief Project',
    description: 'Grassroots mutual aid collective providing direct food and hot meals distribution in Gaza.',
    url: 'https://chuffed.org/project/172937-donate-to-the-handala-relief-project?utm_campaign=campaign&utm_id=019cd343-58c3-7907-b2c5-75160c3df607&pdm=url_copy'
  },
  {
    id: 'donation-131107',
    title: 'Rohingya Refugees Flood & Landslide Relief',
    description: 'Emergency support and shelter aid for Rohingya refugee communities affected by flooding.',
    url: 'https://chuffed.org/project/131107'
  },
  {
    id: 'donation-175701',
    title: 'Support Education for Rohingya Children (RCP School)',
    description: 'Classroom resources, student supplies, and teacher stipends for refugee youth education.',
    url: 'https://chuffed.org/project/175701-support-education-for-rohingya-children-rcp-school?utm_campaign=campaign&utm_id=019d4b2c-88cf-7594-af50-b87971c71c5e&pdm=url_copy'
  },
  {
    id: 'donation-184959',
    title: 'Help Nada Survive in Gaza',
    description: 'Urgent survival mutual aid for clean water, essential groceries, and safe shelter.',
    url: 'https://chuffed.org/project/184959'
  },
  {
    id: 'donation-maysara',
    title: 'Support for Maysara and Family',
    description: 'Emergency aid for ongoing family healthcare, chronic illness medicine, and food security.',
    url: 'https://chuffed.org/project/maysara-famil'
  },
  {
    id: 'donation-yazan',
    title: 'Help Yazan Prepare for a New Baby',
    description: 'Vital infant care supplies, baby clothing, nutrition, and maternal healthcare assistance.',
    url: 'https://chuffed.org/project/help-yazan-prepare-for-a-new-baby'
  },
  {
    id: 'donation-147836',
    title: "Help Mahmoud's Family in Gaza",
    description: 'Critical mutual aid for family survival, essential insulin medication, and food aid.',
    url: 'https://chuffed.org/project/147836'
  },
  {
    id: 'donation-abdel',
    title: 'Support Abdel and His Family',
    description: 'Mutual aid for daily necessities, urgent medical care, and family emergency relief.',
    url: 'https://www.chuffed.org/project/abdel'
  },
  {
    id: 'donation-lana-hala',
    title: 'Help Build a Safe Haven for Lana and Hala',
    description: 'Direct GoFundMe emergency fundraiser for safe housing, warmth, and daily survival.',
    url: 'https://gofund.me/d767d1013'
  },
  {
    id: 'donation-206385',
    title: 'Saja From Gaza: Mother of 2 Young Boys',
    description: 'Emergency mutual aid for a 23-year-old mother providing shelter and food for her children.',
    url: 'https://chuffed.org/project/206385-saja-from-gaza-23-year-old-mother-of-2-beautiful-boys-needs-your-help'
  },
  {
    id: 'donation-195858',
    title: "Aria's Fundraiser",
    description: 'Community emergency mutual aid delivering urgent living assistance and relief.',
    url: 'https://chuffed.org/project/195858-arias-fundraiser'
  }
];

// 2. Birthday Wishlist Items
const WISHLIST_ITEMS = [
  {
    id: 'wish-supernote-manta',
    title: 'Supernote Manta (10.7" E-Ink Notebook)',
    description: 'FeelWrite 2 self-recovery soft film & Ceramic NeverReplace nib with flexible E Ink display for sketching and note-taking.',
    url: 'https://supernote.com/products/supernote-manta?variant=45959389348076'
  },
  {
    id: 'wish-d20-city-council-of-darkness-glow-crewneck-black',
    title: 'D20 City Council of Darkness Glow Crewneck Black',
    description: 'Glow-in-the-dark crewneck sweater with D20 City Council of Darkness design.',
    url: 'https://store.dropout.tv/products/d20-city-council-of-darkness-glow-crewneck-black?variant=50433102512373'
  }
];

/* Screenshot box with live rendering status */
const ScreenshotBox = ({ item, isWishlist }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    if (!e.currentTarget.dataset.fallback) {
      e.currentTarget.dataset.fallback = 'true';
      e.currentTarget.src = getFallbackScreenshotUrl(item.url);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.previewWrapper}>
      {/* Background fallback banner when image fails or is loading */}
      <div className={styles.fallbackBanner}>
        <span className={styles.fallbackPlatform}>
          {getPlatformName(item.url)}
        </span>
        <span className={styles.fallbackPrompt}>
          {isWishlist ? <Gift size={14} /> : <Heart size={14} />} Click to open in new tab
        </span>
      </div>

      {/* Loading overlay with spinner while rendering */}
      {loading && !hasError && (
        <div className={styles.loadingOverlay}>
          <Loader2 size={24} className={styles.spinner} />
          <span className={styles.loadingText}>Rendering preview...</span>
        </div>
      )}

      {/* Rendered Screenshot Image */}
      {!hasError && (
        <img
          src={getEffectiveScreenshot(item)}
          alt={item.title}
          loading="lazy"
          className={styles.screenshotImg}
          style={{ opacity: loading ? 0 : 1 }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Hover Overlay */}
      <div className={styles.cardHoverOverlay}>
        <span>Open Link ↗</span>
      </div>
    </div>
  );
};

/* Collapsed Bar Thumbnail with loading state */
const BarThumb = ({ item, isWishlist }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    if (!e.currentTarget.dataset.fallback) {
      e.currentTarget.dataset.fallback = 'true';
      e.currentTarget.src = getFallbackScreenshotUrl(item.url);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.barThumbWrapper}>
      <div className={styles.barThumbFallback}>
        {isWishlist ? <Gift size={20} /> : <Heart size={20} />}
      </div>

      {loading && !hasError && (
        <div className={styles.barThumbLoading}>
          <Loader2 size={16} className={styles.spinner} />
        </div>
      )}

      {!hasError && (
        <img
          src={getEffectiveScreenshot(item)}
          alt={item.title}
          loading="lazy"
          className={styles.barThumbImg}
          style={{ opacity: loading ? 0 : 1 }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

const WishlistView = () => {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'bars';
    }
    return 'grid';
  });
  const [hasManuallyToggled, setHasManuallyToggled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!hasManuallyToggled) {
        setViewMode(window.innerWidth <= 768 ? 'bars' : 'grid');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasManuallyToggled]);

  const handleSelectMode = (mode) => {
    setViewMode(mode);
    setHasManuallyToggled(true);
  };

  const renderItems = (items, isWishlist = false) => {
    if (viewMode === 'grid') {
      return (
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.gridCard}
              title={`Open ${item.title} in a new tab`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <ExternalLink size={16} className={styles.cardIcon} />
              </div>
              <p className={styles.cardDesc}>{item.description}</p>
              <ScreenshotBox item={item} isWishlist={isWishlist} />
            </a>
          ))}
        </div>
      );
    }

    return (
      <div className={styles.barsContainer}>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={styles.barItem}
            title={`Open ${item.title} in a new tab`}
          >
            <BarThumb item={item} isWishlist={isWishlist} />
            <div className={styles.barContent}>
              <h3 className={styles.barTitle}>{item.title}</h3>
              <p className={styles.barDesc}>{item.description}</p>
            </div>
            <div className={styles.barAction}>
              <ExternalLink size={18} />
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.container}
    >
      {/* Top Left Layout Toggle */}
      <div className={styles.topBar}>
        <div className={styles.viewToggleGroup}>
          <button
            type="button"
            className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
            onClick={() => handleSelectMode('grid')}
            title="Display as grid of boxes"
          >
            <LayoutGrid size={16} />
            <span>Grid</span>
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${viewMode === 'bars' ? styles.activeToggle : ''}`}
            onClick={() => handleSelectMode('bars')}
            title="Display as collapsed bars"
          >
            <List size={16} />
            <span>Bars</span>
          </button>
        </div>
      </div>

      {/* Group 1: Fundraiser donation links */}
      {renderItems(DONATION_LINKS, false)}

      {/* Faint divider & spacing (no section titles) */}
      <hr className={styles.faintDivider} />

      {/* Group 2: Wishlist items */}
      {renderItems(WISHLIST_ITEMS, true)}

      {/* Bottom links: Kofi + PayPal + ACGGoods */}
      <div className={styles.bottomSectionWrapper}>
        <h3 className={styles.commissionHeading}>
          <Link to="/artist#commissions" className={styles.commissionLink}>
            ...or commission me :)
          </Link>
        </h3>
        <div className={styles.linksRow}>
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

export default WishlistView;
