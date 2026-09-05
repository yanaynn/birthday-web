import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SunflowerBouquet from './SunflowerBouquet';
import PetalExplosionOverlay from './PetalExplosionOverlay';

/**
 * OpeningScreen: Halaman pembuka dengan estetika editorial minimalis,
 * dan animasi ledakan kelopak bunga matahari yang memenuhi layar saat buket diklik.
 */
export default function OpeningScreen({ onOpen, data }) {
  const [isExploding, setIsExploding] = useState(false);
  const [explosionOrigin, setExplosionOrigin] = useState(null);
  const bouquetRef = useRef(null);

  const handleBouquetClick = (e) => {
    if (isExploding) return;

    // Hitung posisi tengah buket di layar sebagai titik asal ledakan
    if (bouquetRef.current) {
      const rect = bouquetRef.current.getBoundingClientRect();
      setExplosionOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setExplosionOrigin({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    setIsExploding(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      {/* Canvas Petal Explosion & Screen Coverage Overlay */}
      <PetalExplosionOverlay
        isTriggered={isExploding}
        originPos={explosionOrigin}
        onScreenCovered={onOpen}
      />

      {/* Editorial Badge */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="badge-pastel badge-yellow"
        style={{ marginBottom: '24px', textTransform: 'none', letterSpacing: '0.01em' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#D97706" stroke="#D97706" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>{data?.opening?.badge || "Build with Love by Your Moca"}</span>
      </motion.div>

      {/* Main Editorial Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          maxWidth: '820px',
          marginBottom: '18px',
        }}
      >
        <span
          className="font-script"
          style={{
            fontSize: 'clamp(3.4rem, 8.5vw, 5.6rem)',
            fontWeight: 400,
            display: 'block',
            color: 'var(--sunflower-amber)',
            lineHeight: 1.05,
            marginBottom: '4px',
          }}
        >
          Happy Birthday
        </span>
        <span
          className="font-birthstone"
          style={{
            fontSize: 'clamp(2.6rem, 6.8vw, 4.4rem)',
            fontWeight: 400,
            display: 'block',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginTop: '2px',
          }}
        >
          My Cimi
        </span>
      </motion.h1>

      {/* Subtitle */}
      {/* <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'var(--text-secondary)',
          maxWidth: '540px',
          margin: '0 auto 36px auto',
          fontWeight: 400,
          lineHeight: 1.7,
        }}
      >
        {data?.opening?.subtitle || "Seperti bunga matahari yang selalu menghadap cahaya, kehadiranmu selalu menghangatkan duniaku."}
      </motion.p> */}

      {/* Interactive Sunflower Bouquet */}
      <motion.div
        ref={bouquetRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isExploding ? [1, 0.94, 1.12] : 1,
          opacity: 1,
        }}
        transition={{
          duration: isExploding ? 0.4 : 0.8,
          delay: isExploding ? 0 : 0.5,
        }}
        style={{
          position: 'relative',
          margin: '10px auto 30px auto',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <SunflowerBouquet
          onClick={handleBouquetClick}
          isPulsing={!isExploding}
        />
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.8 }}
      >
        <button
          onClick={handleBouquetClick}
          className="btn-primary"
          style={{
            padding: '12px 28px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
          </svg>
          <span>Open Sunflower Bouquet</span>
        </button>
        {/* <p
          style={{
            marginTop: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.02em',
          }}
        >
          Tap the bouquet to release the sunflower petals
        </p> */}
      </motion.div>
    </div>
  );
}
