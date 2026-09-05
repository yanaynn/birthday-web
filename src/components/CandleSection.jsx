import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerMiniCelebration } from '../utils/confetti';

/**
 * CandleSection: Tiup lilin & Make a Wish bergaya minimalis arsitektural.
 */
export default function CandleSection({ recipientName }) {
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);

    setTimeout(() => {
      setWishMade(true);
      triggerMiniCelebration();
    }, 400);
  };

  const handleRelight = () => {
    setIsBlown(false);
    setWishMade(false);
  };

  return (
    <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
      {/* Title */}
      <div style={{ marginBottom: '35px' }}>
        <div className="badge-pastel badge-yellow" style={{ marginBottom: '12px' }}>
          <span>Make a Wish</span>
        </div>
        <h2
          className="font-birthstone"
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 3.6rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.01em',
            lineHeight: 1.15,
            marginBottom: '4px',
          }}
        >
          Blow the Birthday Candle
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', maxWidth: '440px', margin: '0 auto' }}>
          Make your heartfelt wish, then tap the candle to blow it out.
        </p>
      </div>

      {/* Birthday Cake Container */}
      <div
        className="editorial-card"
        style={{
          padding: '40px 24px 32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Interactive Cake Illustration */}
        <div
          onClick={handleBlowCandle}
          style={{
            cursor: isBlown ? 'default' : 'pointer',
            position: 'relative',
            width: '240px',
            height: '220px',
            margin: '0 auto',
          }}
          title={isBlown ? 'Candle is blown out' : 'Click to blow out the candle'}
        >
          {/* Flame & Smoke Container */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '32px',
              zIndex: 5,
            }}
          >
            {!isBlown ? (
              <div
                className="candle-flame-minimal"
                style={{
                  width: '14px',
                  height: '24px',
                  background: '#F59E0B',
                  borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)',
                  margin: '0 auto',
                }}
              />
            ) : (
              <div
                className="candle-smoke-minimal"
                style={{
                  width: '10px',
                  height: '20px',
                  background: 'rgba(150, 140, 130, 0.5)',
                  borderRadius: '50%',
                  margin: '0 auto',
                }}
              />
            )}
          </div>

          {/* Minimalist Flat Cake SVG */}
          <svg viewBox="0 0 240 200" width="100%" height="100%">
            {/* Cake Plate */}
            <ellipse cx="120" cy="180" rx="90" ry="10" fill="#E8E5E0" />
            <ellipse cx="120" cy="178" rx="86" ry="8" fill="#FAF9F6" stroke="#D6D1CA" strokeWidth="1" />

            {/* Cake Base */}
            <path
              d="M 50 125 C 50 142 190 142 190 125 L 190 165 C 190 180 50 180 50 165 Z"
              fill="#F6F5F2"
              stroke="#E8E5E0"
              strokeWidth="1"
            />

            {/* Cake Top */}
            <ellipse cx="120" cy="125" rx="70" ry="20" fill="#FFFFFF" stroke="#E8E5E0" strokeWidth="1" />

            {/* Cake Decorative Minimalist Rim */}
            <path
              d="M 50 125 
                 C 64 135 72 136 82 126 
                 C 92 137 104 138 114 126 
                 C 126 138 138 136 148 126 
                 C 160 137 172 135 186 125"
              fill="none"
              stroke="#FAF9F6"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Candle Wick & Body */}
            <line x1="120" y1="52" x2="120" y2="60" stroke="#1C1917" strokeWidth="2" />
            <rect x="115" y="60" width="10" height="48" rx="2" fill="#D97706" />
            {/* Candle minimal stripes */}
            <line x1="115" y1="72" x2="125" y2="76" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="115" y1="84" x2="125" y2="88" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="115" y1="96" x2="125" y2="100" stroke="#FEF3C7" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '16px' }}>
          {!isBlown ? (
            <button
              onClick={handleBlowCandle}
              className="btn-primary"
              style={{
                fontSize: '0.9rem',
                padding: '10px 24px',
              }}
            >
              <span>Blow Candle</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="btn-secondary"
              style={{
                fontSize: '0.84rem',
              }}
            >
              <span>Relight Candle</span>
            </button>
          )}
        </div>

        {/* Wish Card Modal / Reveal */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: '24px',
                padding: '18px 22px',
                background: 'var(--bg-surface-subtle)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                maxWidth: '460px',
                textAlign: 'center',
              }}
            >
              <h4
                className="font-birthstone"
                style={{
                  fontSize: 'clamp(1.9rem, 4vw, 2.5rem)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                  letterSpacing: '0.01em',
                  lineHeight: 1.15,
                }}
              >
                May All Your Wishes Come True, {recipientName || 'My Love'}
              </h4>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                Your sweet wish has been sent to Allah. May every step you take this year be embraced with serenity, happiness, and blooming smiles. Aamiin...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
