import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA } from './data/content';
import OpeningScreen from './components/OpeningScreen';
import MusicPlayer from './components/MusicPlayer';
import WishSection from './components/WishSection';
import GallerySection from './components/GallerySection';
import CandleSection from './components/CandleSection';
import GiftSection from './components/GiftSection';
import LiquidNavbar from './components/LiquidNavbar';
import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('wish'); // 'wish' | 'gallery' | 'candle' | 'gift'
  const [musicTriggered, setMusicTriggered] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setMusicTriggered(true);
  };

  const navTabs = [
    {
      id: 'wish',
      label: 'Wishes',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    },
    {
      id: 'gallery',
      label: 'Memories',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      id: 'candle',
      label: 'Blow Candle',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c.5 1.5 2 2.5 2 4s-1 3-2 3-2-1.5-2-3 1.5-2.5 2-4z" />
          <path d="M12 9v13" />
          <rect x="7" y="14" width="10" height="8" rx="2" />
        </svg>
      )
    },
    {
      id: 'gift',
      label: 'Gift Box',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" rx="1" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    },
  ];

  const [direction, setDirection] = useState(0);

  const currentIndex = navTabs.findIndex((t) => t.id === activeTab);

  const handleTabChange = (newTabId) => {
    const newIndex = navTabs.findIndex((t) => t.id === newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
  };

  const handleContentPanEnd = (event, info) => {
    // Abaikan jika gerakan dominan vertikal (scroll)
    if (Math.abs(info.offset.y) > 70) return;

    if (info.offset.x < -50 || info.velocity.x < -220) {
      // Swipe ke kiri -> Tab berikutnya
      if (currentIndex < navTabs.length - 1) {
        setDirection(1);
        setActiveTab(navTabs[currentIndex + 1].id);
      }
    } else if (info.offset.x > 50 || info.velocity.x > 220) {
      // Swipe ke kanan -> Tab sebelumnya
      if (currentIndex > 0) {
        setDirection(-1);
        setActiveTab(navTabs[currentIndex - 1].id);
      }
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 36 : -36,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -36 : 36,
      opacity: 0,
    }),
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Subtle Ambient Texture */}
      <div className="bg-minimal-ambient" />

      {/* Floating Vinyl Music Player */}
      <MusicPlayer musicData={BIRTHDAY_DATA.music} autoPlayTrigger={musicTriggered} />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* 1. OPENING SCREEN */
          <motion.div
            key="opening"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OpeningScreen
              onOpen={handleOpen}
              data={BIRTHDAY_DATA}
            />
          </motion.div>
        ) : (
          /* 2. MAIN HUB CONTENT */
          <motion.div
            key="main"
            className="main-hub-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '20px 20px 36px 20px',
              maxWidth: '1020px',
              margin: '0 auto',
            }}
          >
            {/* Top Brand & Replay Button (Clearance zone from floating music player) */}
            <header className="main-hub-header">
              <div className="main-hub-header-content">
                <div className="main-brand-badge">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--sunflower-amber)',
                    }}
                  />
                  <span
                    className="font-birthstone"
                    style={{
                      fontSize: '1.9rem',
                      fontWeight: 400,
                      color: 'var(--text-primary)',
                      letterSpacing: '0.01em',
                      lineHeight: 1,
                    }}
                  >
                    Ira's Birthday
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-bouquet-replay"
                  title="Return to sunflower bouquet"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>View Bouquet</span>
                </button>
              </div>
            </header>

            {/* iOS Liquid Glass Navigation Bar dengan gesture geser */}
            <LiquidNavbar
              tabs={navTabs}
              activeTab={activeTab}
              onChangeTab={handleTabChange}
            />

            {/* Content Display based on active tab dengan swipe gesture */}
            <motion.main
              onPanEnd={handleContentPanEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                {activeTab === 'wish' && (
                  <motion.div
                    key="wish-tab"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <WishSection
                      wishData={BIRTHDAY_DATA.wish}
                      recipientData={BIRTHDAY_DATA.recipient}
                    />
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery-tab"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <GallerySection
                      memories={BIRTHDAY_DATA.memories}
                      extraMemories={BIRTHDAY_DATA.extraMemories}
                    />
                  </motion.div>
                )}

                {activeTab === 'candle' && (
                  <motion.div
                    key="candle-tab"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CandleSection recipientName={BIRTHDAY_DATA.recipient.nickname} />
                  </motion.div>
                )}

                {activeTab === 'gift' && (
                  <motion.div
                    key="gift-tab"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <GiftSection giftData={BIRTHDAY_DATA.gift} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.main>

            {/* Editorial Footer */}
            <footer
              style={{
                marginTop: '36px',
                textAlign: 'center',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
              }}
            >
              <p>
                Dedicated with love to {BIRTHDAY_DATA.recipient.name || BIRTHDAY_DATA.recipient.nickname}
              </p>
              <p style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', marginTop: '4px', color: 'var(--text-muted)' }}>
                Happy Birthday to My Cimi
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
