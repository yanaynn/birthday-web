import React from 'react';

/**
 * SunflowerBouquet: Ilustrasi Buket Bunga Matahari Minimalis Modern
 * Dirancang dengan beberapa bunga matahari yang mekar indah, daun sage,
 * pembungkus kertas kraft berlapis, serta ikatan pita emas.
 */
export default function SunflowerBouquet({ onClick, isPulsing = true }) {
  return (
    <div 
      className="bouquet-container"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        position: 'relative',
        display: 'inline-block',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
      }}
      title="Tap the sunflower bouquet 🌻"
    >
      <svg
        viewBox="0 0 500 620"
        width="100%"
        height="100%"
        style={{
          maxWidth: '380px',
          maxHeight: '480px',
          filter: 'drop-shadow(0 18px 30px rgba(85, 60, 30, 0.15))',
          display: 'block',
          margin: '0 auto',
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="kraftPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5D3BC" />
            <stop offset="50%" stopColor="#D9C2A4" />
            <stop offset="100%" stopColor="#C4AA87" />
          </linearGradient>

          <linearGradient id="kraftFoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4BDA0" />
            <stop offset="100%" stopColor="#BFA583" />
          </linearGradient>

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7C85C" />
            <stop offset="50%" stopColor="#E5A42D" />
            <stop offset="100%" stopColor="#C97D1A" />
          </linearGradient>

          <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#F5BE47" />
            <stop offset="100%" stopColor="#E29725" />
          </linearGradient>

          <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7C642" />
            <stop offset="70%" stopColor="#E99F26" />
            <stop offset="100%" stopColor="#C87216" />
          </linearGradient>

          <radialGradient id="sunflowerCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5A3A1E" />
            <stop offset="65%" stopColor="#432812" />
            <stop offset="90%" stopColor="#321D0C" />
            <stop offset="100%" stopColor="#7E5224" />
          </radialGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E967A" />
            <stop offset="100%" stopColor="#51634E" />
          </linearGradient>
          
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Halo behind bouquet */}
        <circle cx="250" cy="240" r="160" fill="rgba(246, 195, 67, 0.16)" filter="url(#softGlow)" />

        {/* KRAFT BACK WRAPPING */}
        <g id="back-wrapping">
          {/* Back Paper Flaps */}
          <path d="M 120 280 L 250 80 L 380 280 L 320 540 L 180 540 Z" fill="url(#kraftPaperGrad)" />
          <path d="M 100 240 L 200 130 L 250 260 L 140 340 Z" fill="#D3BDA0" opacity="0.6" />
          <path d="M 400 240 L 300 130 L 250 260 L 360 340 Z" fill="#BFA583" opacity="0.6" />
        </g>

        {/* FOLIAGE / SAGE LEAVES (Background of flowers) */}
        <g id="leaves">
          {/* Left top leaf */}
          <path d="M 160 170 Q 110 140 100 190 Q 130 220 170 195 Z" fill="url(#leafGrad)" />
          <path d="M 100 190 Q 135 180 165 180" stroke="#8CA388" strokeWidth="2" fill="none" />

          {/* Right top leaf */}
          <path d="M 340 170 Q 390 140 400 190 Q 370 220 330 195 Z" fill="url(#leafGrad)" />
          <path d="M 400 190 Q 365 180 335 180" stroke="#8CA388" strokeWidth="2" fill="none" />

          {/* Far left accent leaf */}
          <path d="M 120 230 Q 70 240 85 285 Q 125 280 140 250 Z" fill="url(#leafGrad)" />
          {/* Far right accent leaf */}
          <path d="M 380 230 Q 430 240 415 285 Q 375 280 360 250 Z" fill="url(#leafGrad)" />

          {/* Delicate Baby's Breath / Little White Flowers Accent */}
          <g fill="#FFFFFF" opacity="0.9">
            <circle cx="160" cy="140" r="5" />
            <circle cx="172" cy="132" r="4" />
            <circle cx="150" cy="130" r="4.5" />
            
            <circle cx="340" cy="140" r="5" />
            <circle cx="330" cy="130" r="4" />
            <circle cx="355" cy="132" r="4.5" />

            <circle cx="250" cy="115" r="5.5" />
            <circle cx="238" cy="108" r="4" />
            <circle cx="262" cy="109" r="4" />
          </g>
        </g>

        {/* ----------------- SUNFLOWERS ----------------- */}

        {/* 1. TOP-CENTER SUNFLOWER (Slightly smaller, background depth) */}
        <g transform="translate(250, 180) scale(0.72)">
          {/* Petals */}
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 20})`}>
              <path
                d="M 0 0 C -12 -35 -16 -75 0 -95 C 16 -75 12 -35 0 0"
                fill="url(#petalGrad2)"
              />
              <path
                d="M 0 -10 C -9 -40 -10 -70 0 -85 C 10 -70 9 -40 0 -10"
                fill="url(#petalGrad1)"
              />
            </g>
          ))}
          {/* Core */}
          <circle cx="0" cy="0" r="42" fill="url(#sunflowerCore)" />
          {/* Seeds texture */}
          <circle cx="0" cy="0" r="32" fill="none" stroke="#6F4620" strokeWidth="2.5" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#6F4620" strokeWidth="2" strokeDasharray="2,3" />
        </g>

        {/* 2. LEFT SUNFLOWER (Tilted) */}
        <g transform="translate(180, 240) rotate(-12) scale(0.85)">
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 20})`}>
              <path
                d="M 0 0 C -13 -38 -18 -80 0 -102 C 18 -80 13 -38 0 0"
                fill="url(#petalGrad2)"
              />
              <path
                d="M 0 -10 C -10 -40 -12 -75 0 -92 C 12 -75 10 -40 0 -10"
                fill="url(#petalGrad1)"
              />
            </g>
          ))}
          <circle cx="0" cy="0" r="45" fill="url(#sunflowerCore)" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#6F4620" strokeWidth="3" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="22" fill="none" stroke="#6F4620" strokeWidth="2" strokeDasharray="2,3" />
        </g>

        {/* 3. RIGHT SUNFLOWER (Tilted) */}
        <g transform="translate(320, 240) rotate(14) scale(0.85)">
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 20})`}>
              <path
                d="M 0 0 C -13 -38 -18 -80 0 -102 C 18 -80 13 -38 0 0"
                fill="url(#petalGrad2)"
              />
              <path
                d="M 0 -10 C -10 -40 -12 -75 0 -92 C 12 -75 10 -40 0 -10"
                fill="url(#petalGrad1)"
              />
            </g>
          ))}
          <circle cx="0" cy="0" r="45" fill="url(#sunflowerCore)" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#6F4620" strokeWidth="3" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="22" fill="none" stroke="#6F4620" strokeWidth="2" strokeDasharray="2,3" />
        </g>

        {/* 4. MAIN HERO SUNFLOWER (Center-Front, Majestic & Large) */}
        <g transform="translate(250, 290) scale(1.05)">
          {/* Double Layer Petals */}
          {/* Back layer petals */}
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={`back-${i}`} transform={`rotate(${i * 18 + 9})`}>
              <path
                d="M 0 0 C -14 -40 -20 -86 0 -110 C 20 -86 14 -40 0 0"
                fill="url(#petalGrad2)"
              />
            </g>
          ))}
          {/* Front layer petals */}
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={`front-${i}`} transform={`rotate(${i * 18})`}>
              <path
                d="M 0 -8 C -12 -42 -14 -82 0 -102 C 14 -82 12 -42 0 -8"
                fill="url(#petalGrad1)"
              />
            </g>
          ))}
          {/* Core Center */}
          <circle cx="0" cy="0" r="50" fill="url(#sunflowerCore)" />
          {/* Rich Texture Rings */}
          <circle cx="0" cy="0" r="40" fill="none" stroke="#7A4E24" strokeWidth="3" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#7A4E24" strokeWidth="2.5" strokeDasharray="2.5,3" />
          <circle cx="0" cy="0" r="16" fill="none" stroke="#633F1D" strokeWidth="2" strokeDasharray="2,2" />
        </g>

        {/* KRAFT FRONT WRAPPING (Folded layers over the stems) */}
        <g id="front-wrapping">
          {/* Left Fold Paper */}
          <path
            d="M 130 330 Q 180 345 230 350 L 220 540 Q 180 535 150 500 Z"
            fill="url(#kraftPaperGrad)"
            stroke="#BD9E79"
            strokeWidth="1.5"
          />
          {/* Right Fold Paper (Overlaps Left) */}
          <path
            d="M 370 330 Q 320 345 220 355 L 240 540 Q 280 535 340 495 Z"
            fill="url(#kraftFoldGrad)"
            stroke="#BD9E79"
            strokeWidth="1.5"
          />
          {/* Crease lines */}
          <path d="M 230 350 L 225 540" stroke="#A98C68" strokeWidth="1.5" opacity="0.6" />
          <path d="M 270 348 L 245 530" stroke="#A98C68" strokeWidth="1" opacity="0.4" />
        </g>

        {/* RIBBON & BOW (Elegant Amber Ribbon around waist) */}
        <g id="ribbon" transform="translate(230, 420)">
          {/* Waist Ribbon Wrap */}
          <path
            d="M -50 -10 Q 5 2 60 -8 L 56 12 Q 5 22 -48 10 Z"
            fill="url(#ribbonGrad)"
            stroke="#B86C14"
            strokeWidth="1"
          />

          {/* Left Loop */}
          <path
            d="M 5 6 C -25 -25 -55 -15 -45 10 C -38 25 -10 18 5 6 Z"
            fill="url(#ribbonGrad)"
            stroke="#B86C14"
            strokeWidth="1"
          />
          {/* Left Inner shadow */}
          <path d="M -5 4 C -22 -10 -35 -4 -28 8 Z" fill="#B3620F" opacity="0.5" />

          {/* Right Loop */}
          <path
            d="M 5 6 C 35 -25 65 -15 55 10 C 48 25 20 18 5 6 Z"
            fill="url(#ribbonGrad)"
            stroke="#B86C14"
            strokeWidth="1"
          />
          {/* Right Inner shadow */}
          <path d="M 15 4 C 32 -10 45 -4 38 8 Z" fill="#B3620F" opacity="0.5" />

          {/* Ribbon Tails */}
          {/* Left Tail */}
          <path
            d="M -2 12 Q -25 45 -35 85 L -20 80 Q -10 50 6 15 Z"
            fill="url(#ribbonGrad)"
            stroke="#B86C14"
            strokeWidth="1"
          />
          {/* Right Tail */}
          <path
            d="M 10 12 Q 35 45 45 90 L 30 85 Q 20 52 2 15 Z"
            fill="url(#ribbonGrad)"
            stroke="#B86C14"
            strokeWidth="1"
          />

          {/* Bow Knot Center */}
          <ellipse cx="5" cy="7" rx="10" ry="8" fill="#D6861E" stroke="#9E5306" strokeWidth="1.2" />
        </g>

        {/* Small floating sparkles around bouquet */}
        <g fill="#F5BE47" opacity="0.85">
          <path d="M 100 130 Q 105 140 100 150 Q 95 140 100 130 Z" transform="rotate(25 100 140)" />
          <path d="M 390 120 Q 395 130 390 140 Q 385 130 390 120 Z" transform="rotate(-20 390 130)" />
          <circle cx="250" cy="65" r="3.5" fill="#FFE27D" />
          <circle cx="110" cy="270" r="2.5" />
          <circle cx="395" cy="270" r="2.5" />
        </g>
      </svg>

      <style>{`
        .bouquet-container:hover {
          transform: translateY(-8px) scale(1.03);
          filter: drop-shadow(0 24px 40px rgba(230, 164, 45, 0.28)) !important;
        }
        .bouquet-container:active {
          transform: scale(0.97);
        }
        ${isPulsing ? `
          .bouquet-container {
            animation: bouquetFloat 3.8s ease-in-out infinite;
          }
          @keyframes bouquetFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(0.6deg);
            }
          }
        ` : ''}
      `}</style>
    </div>
  );
}
