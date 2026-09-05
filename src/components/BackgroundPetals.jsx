import React, { useMemo } from 'react';

/**
 * BackgroundPetals: Partikel ambient kelopak bunga matahari yang melayang perlahan.
 * Dibuat sangat ringan dengan CSS GPU animation.
 */
export default function BackgroundPetals({ count = 15 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const left = Math.random() * 100; // 0% to 100%
      const duration = 12 + Math.random() * 14; // 12s to 26s
      const delay = Math.random() * 10; // 0s to 10s
      const size = 16 + Math.random() * 14; // 16px to 30px
      const rotate = Math.random() * 360;
      const opacity = 0.35 + Math.random() * 0.4;
      const color = index % 3 === 0 ? '#F6C343' : index % 3 === 1 ? '#E5A42D' : '#F9D878';

      return {
        id: index,
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: `${size * 1.5}px`,
        transform: `rotate(${rotate}deg)`,
        opacity,
        color,
      };
    });
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-floating"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: petal.width,
            height: petal.height,
            opacity: petal.opacity,
          }}
        >
          <svg viewBox="0 0 30 45" width="100%" height="100%">
            <path
              d="M 15 0 C 30 18 28 36 15 45 C 2 36 0 18 15 0 Z"
              fill={petal.color}
              stroke="rgba(217, 123, 45, 0.3)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
