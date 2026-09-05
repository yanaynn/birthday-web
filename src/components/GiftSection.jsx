import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { triggerMiniCelebration } from '../utils/confetti';

/**
 * GiftSection: Kupon cinta romantis bergaya tiket voucher perforated editorial.
 */
export default function GiftSection({ giftData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [claimedCoupons, setClaimedCoupons] = useState({});

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerMiniCelebration();
    }
  };

  const handleClaim = (couponId) => {
    setClaimedCoupons(prev => ({
      ...prev,
      [couponId]: true
    }));
    triggerMiniCelebration();
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
      {/* Title */}
      <div style={{ marginBottom: '35px' }}>
        <div className="badge-pastel badge-yellow" style={{ marginBottom: '12px' }}>
          <span>Complimentary Vouchers</span>
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
          {giftData?.title || 'Love Coupons & Special Gift'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
          {giftData?.subtitle || 'Tap the gift box to reveal your lifetime date coupons.'}
        </p>
      </div>

      {/* Gift Box Unboxing Interaction */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={handleOpenGift}
          style={{
            cursor: 'pointer',
            padding: '36px 20px',
            maxWidth: '320px',
            margin: '0 auto',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Minimalist Gift Box SVG */}
          <svg viewBox="0 0 160 160" width="140" height="140" style={{ display: 'block', margin: '0 auto' }}>
            {/* Box Body */}
            <rect x="25" y="60" width="110" height="85" rx="6" fill="#FFFFFF" stroke="#D6D1CA" strokeWidth="1.5" />
            {/* Box Ribbon Vertical */}
            <rect x="72" y="60" width="16" height="85" fill="#D97706" />

            {/* Box Lid */}
            <rect x="18" y="44" width="124" height="20" rx="4" fill="#F6F5F2" stroke="#D6D1CA" strokeWidth="1.5" />
            <rect x="72" y="44" width="16" height="20" fill="#D97706" />

            {/* Ribbon Knot */}
            <ellipse cx="64" cy="35" rx="14" ry="9" fill="none" stroke="#D97706" strokeWidth="2.5" transform="rotate(-15 64 35)" />
            <ellipse cx="96" cy="35" rx="14" ry="9" fill="none" stroke="#D97706" strokeWidth="2.5" transform="rotate(15 96 35)" />
            <circle cx="80" cy="37" r="5" fill="#B45309" />
          </svg>

          <div style={{ marginTop: '20px' }}>
            <button className="btn-primary" style={{ padding: '10px 24px' }}>
              <span>Open Gift</span>
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Tap to open your love coupons
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Note Banner */}
          <div
            className="editorial-card"
            style={{
              padding: '22px 26px',
              marginBottom: '32px',
              textAlign: 'left',
              background: 'var(--bg-surface-subtle)',
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--sunflower-amber)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
              NOTE FROM ME
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
              {giftData?.specialMessage || 'The greatest gift is time, undivided attention, and my promise to always walk beside you.'}
            </p>
          </div>

          {/* Love Coupons (Perforated Ticket Stubs) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '20px',
              textAlign: 'left',
            }}
          >
            {giftData?.coupons?.map((coupon, index) => {
              const isClaimed = claimedCoupons[coupon.id];

              return (
                <div
                  key={coupon.id}
                  className="editorial-card"
                  style={{
                    padding: '20px',
                    position: 'relative',
                    background: isClaimed ? '#FBFDF9' : 'var(--bg-surface)',
                    border: isClaimed ? '1px solid #CBD5C9' : '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Header: Tag & Serial Number */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <span className="badge-pastel badge-yellow">
                        {coupon.tag}
                      </span>
                      <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        NO. SUN-00{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      className="font-birthstone"
                      style={{
                        fontSize: '1.85rem',
                        fontWeight: 400,
                        color: 'var(--text-primary)',
                        marginBottom: '6px',
                        letterSpacing: '0.01em',
                        lineHeight: 1.15,
                      }}
                    >
                      {coupon.title}
                    </h4>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        marginBottom: '20px',
                      }}
                    >
                      {coupon.desc}
                    </p>
                  </div>

                  {/* Perforation Divider Line */}
                  <div
                    style={{
                      borderTop: '1px dashed var(--border-subtle)',
                      paddingTop: '16px',
                      marginTop: '12px',
                    }}
                  >
                    <button
                      onClick={() => handleClaim(coupon.id)}
                      disabled={isClaimed}
                      style={{
                        width: '100%',
                        padding: '9px 14px',
                        borderRadius: '6px',
                        border: isClaimed ? '1px solid #A8B8A5' : '1px solid #1C1917',
                        background: isClaimed ? '#EDF3EC' : '#1C1917',
                        color: isClaimed ? '#2E4C2B' : '#FFFFFF',
                        fontWeight: 500,
                        fontSize: '0.84rem',
                        cursor: isClaimed ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isClaimed ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Coupon Claimed</span>
                        </>
                      ) : (
                        <span>Claim This Coupon</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
