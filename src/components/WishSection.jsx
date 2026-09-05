import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Hero04 } from '@/components/ui/hero-04';

/**
 * WishSection: Surat ucapan editorial minimalis dengan tipografi berkelas,
 * drop-cap klasik, micro-interaction tanda cinta, dan Hero04 showcase.
 */
export default function WishSection({ wishData, recipientData }) {
  const [likesCount, setLikesCount] = useState(0);

  const handleSendLove = () => {
    setLikesCount(prev => prev + 1);

    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.72, x: 0.5 },
      colors: ['#F59E0B', '#D97706', '#65A30D', '#FCD34D'],
      ticks: 160,
      scalar: 1.1,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* 21st.dev Hero04 Section */}
      <Hero04
        badge={
          <span className="badge-pastel badge-yellow inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono rounded-full shadow-2xs mb-2">
            <span>🌻</span>
            <span>{wishData?.hero?.badge || `${recipientData?.name || 'My Love'}'s Birthday Edition`}</span>
          </span>
        }
        title={wishData?.hero?.title || "A New Chapter for"}
        titleLine2={wishData?.hero?.titleLine2 || `${recipientData?.name || recipientData?.nickname || 'My Sunshine'}`}
        description={wishData?.hero?.description || "Happy 24th Birthday! Like a sunflower that always turns towards the light, every smile you share and every sweet memory we build brings boundless warmth into my life."}
        primaryImage={wishData?.hero?.primaryImage || "/image-wishessection/main.jpeg"}
        secondaryImage={wishData?.hero?.secondaryImage || "/image-wishessection/sub-photo.jpeg"}
        primaryAlt={wishData?.hero?.primaryAlt || `${recipientData?.nickname || recipientData?.name || 'Cimi'}'s photo`}
        secondaryAlt={wishData?.hero?.secondaryAlt || "Sunflower memory"}
        animation="subtle"
        primaryCTA={{
          ctaEnabled: true,
          text: "Send Love",
          onClick: handleSendLove,
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={likesCount > 0 ? '#F59E0B' : 'none'}
              stroke={likesCount > 0 ? '#F59E0B' : 'currentColor'}
              strokeWidth="2"
              className="transition-colors shrink-0"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ),
          children: likesCount > 0 ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(245, 158, 11, 0.25)',
                color: '#FDE68A',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                marginLeft: '4px',
              }}
            >
              +{likesCount}
            </span>
          ) : null,
        }}
        secondaryCTA={{
          ctaEnabled: true,
          text: "Read Birthday Letter ↓",
          link: "#birthday-letter",
          onClick: (e) => {
            if (e && e.preventDefault) e.preventDefault();
            const element = document.getElementById('birthday-letter');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          },
          variant: "link",
        }}
      />

      {/* Main Editorial Letter - Jarak tegas dan padding lega agar tidak dempet */}
      <motion.div
        id="birthday-letter"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="editorial-card w-full scroll-mt-28 relative"
        style={{
          marginTop: '84px',
          padding: 'clamp(36px, 6.5vw, 64px)',
        }}
      >
        {/* Subtle Category Tag */}
        <div style={{ marginBottom: '20px' }}>
          <span className="badge-pastel badge-yellow">
            {wishData?.badge || 'Special Letter'}
          </span>
        </div>

        {/* Letter Title */}
        <h3
          className="font-birthstone"
          style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 3.4rem)',
            color: 'var(--text-primary)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: '28px',
          }}
        >
          {wishData?.title || 'To the One Who Warms Every Corner of My Days'}
        </h3>

        {/* Letter Paragraphs */}
        <div
          style={{
            fontSize: 'clamp(0.98rem, 1.5vw, 1.08rem)',
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            textAlign: 'left',
          }}
        >
          {wishData?.paragraphs?.map((para, idx) => (
            <p key={idx} style={{ position: 'relative' }}>
              {idx === 0 && (
                <span
                  className="font-serif"
                  style={{
                    float: 'left',
                    fontSize: '3.4rem',
                    lineHeight: 0.82,
                    paddingRight: '14px',
                    paddingTop: '6px',
                    color: 'var(--sunflower-amber)',
                    fontWeight: 700,
                  }}
                >
                  {para.charAt(0)}
                </span>
              )}
              {idx === 0 ? para.slice(1) : para}
            </p>
          ))}
        </div>

        {/* Letter Sign-off */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            textAlign: 'right',
          }}
        >
          <span
            className="font-serif"
            style={{
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
            }}
          >
            {wishData?.closing || 'With all my love,'}
          </span>
          <span
            className="font-serif"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '4px',
              letterSpacing: '-0.02em',
            }}
          >
            {wishData?.sender || 'From your Moca'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
