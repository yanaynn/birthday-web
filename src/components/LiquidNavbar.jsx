import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * LiquidNavbar: Navigasi Liquid Glass ala iOS
 * - Desktop: Berada di atas (sticky top), menampilkan icon + teks label.
 * - Mobile: Berada di bawah layar (floating bottom dock ala iOS), HANYA menampilkan icon tanpa teks.
 * - Gesture geser: Pil cairan bergerak preview, halaman baru berpindah saat jari/kursor dilepas.
 */
export default function LiquidNavbar({ tabs, activeTab, onChangeTab }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const isPointerDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastChangeTime = useRef(0);
  const pointerTargetEl = useRef(null);

  // previewTab: Menentukan posisi pil saat digeser (sebelum dilepas)
  const [previewTab, setPreviewTab] = useState(activeTab);
  const [isSliding, setIsSliding] = useState(false);

  // Sinkronisasi saat activeTab berubah dari luar
  useEffect(() => {
    if (!isPointerDown.current) {
      setPreviewTab(activeTab);
    }
  }, [activeTab]);

  // Fungsi utilitas untuk eksekusi pergantian tab yang aman dan instan
  const triggerTabChange = (newTabId) => {
    if (!newTabId) return;
    const now = Date.now();
    // Debounce 80ms untuk mencegah double firing antara pointerup dan click
    if (now - lastChangeTime.current < 80) return;
    lastChangeTime.current = now;
    setPreviewTab(newTabId);
    onChangeTab(newTabId);
  };

  // Cari tab berdasarkan posisi kursor horizontal (clientX)
  const getTabAtX = (clientX, shouldClamp = false) => {
    let closestTab = null;
    let minDistance = Infinity;

    for (let i = 0; i < tabs.length; i++) {
      const tabId = tabs[i].id;
      const el = buttonRefs.current[tabId];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (clientX >= rect.left - 6 && clientX <= rect.right + 6) {
          return tabId;
        }
        const centerX = (rect.left + rect.right) / 2;
        const dist = Math.abs(clientX - centerX);
        if (dist < minDistance) {
          minDistance = dist;
          closestTab = tabId;
        }
      }
    }
    return shouldClamp ? closestTab : null;
  };

  const handlePointerDown = (e) => {
    isPointerDown.current = true;
    isDragging.current = false;
    startX.current = e.clientX;
    pointerTargetEl.current = e.currentTarget;
    // JANGAN panggil setPointerCapture di sini agar native click button desktop tidak terblokir
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return;

    const diff = Math.abs(e.clientX - startX.current);

    // Hanya aktifkan mode drag jika pointer bergeser lebih dari 6px
    if (!isDragging.current && diff > 6) {
      isDragging.current = true;
      setIsSliding(true);
      try {
        if (pointerTargetEl.current) {
          pointerTargetEl.current.setPointerCapture(e.pointerId);
        }
      } catch (err) { }
    }

    if (isDragging.current) {
      const hoveredTabId = getTabAtX(e.clientX, true);
      if (hoveredTabId && hoveredTabId !== previewTab) {
        // HANYA memindahkan pil preview di navbar, TIDAK memindahkan halaman
        setPreviewTab(hoveredTabId);
      }
    }
  };

  const handlePointerUp = (e) => {
    if (!isPointerDown.current) return;

    // Lepas pointer capture jika sebelumnya aktif
    try {
      if (pointerTargetEl.current && isDragging.current) {
        pointerTargetEl.current.releasePointerCapture(e.pointerId);
      }
    } catch (err) { }

    const wasDragging = isDragging.current;
    isPointerDown.current = false;
    isDragging.current = false;
    setIsSliding(false);

    if (wasDragging) {
      // Saat gesture geser selesai dilepas, pindahkan halaman ke tab preview
      const finalTab = getTabAtX(e.clientX, true) || previewTab;
      if (finalTab) {
        triggerTabChange(finalTab);
      }
    } else {
      // Mode Klik / Tap biasa: langsung deteksi dan pindahkan tab
      const clickedTab = getTabAtX(e.clientX);
      if (clickedTab) {
        triggerTabChange(clickedTab);
      }
    }
  };

  const handleTabClick = (tabId) => {
    // Jika sedang dalam aksi drag/geser, abaikan click sintetis
    if (isDragging.current) return;
    triggerTabChange(tabId);
  };

  return (
    <>
      <nav className="liquid-nav-wrapper">
        {/* Outer iOS Liquid Glass Capsule Housing */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="liquid-nav-capsule"
          style={{
            cursor: isSliding ? 'grabbing' : 'grab',
          }}
        >
          {/* Subtle Liquid Top Reflection Sheen */}
          <div className="liquid-nav-sheen" />

          {tabs.map((tab) => {
            const isSelected = previewTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                ref={(el) => (buttonRefs.current[tab.id] = el)}
                onClick={() => handleTabClick(tab.id)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className={`liquid-nav-btn ${isSelected ? 'is-active' : ''}`}
                aria-label={tab.label}
              >
                {/* Liquid Active Sliding Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="liquidActivePill"
                    transition={{
                      type: 'spring',
                      stiffness: 440,
                      damping: 30,
                      mass: 0.8,
                    }}
                    animate={{
                      scaleX: isSliding ? 1.06 : 1,
                    }}
                    className="liquid-active-pill"
                  />
                )}

                {/* Tab Icon */}
                {tab.icon && (
                  <span className="liquid-nav-icon">
                    {tab.icon}
                  </span>
                )}

                {/* Tab Label (Otomatis tersembunyi di mobile lewat CSS) */}
                <span className="liquid-nav-label">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Helper text di desktop */}
        <span className="liquid-nav-hint">
        </span>
      </nav>

      {/* Scoped CSS untuk LiquidNavbar (Desktop vs Mobile) */}
      <style>{`
        /* Desktop (Default) */
        .liquid-nav-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
          position: sticky;
          top: 16px;
          z-index: 45;
          padding: 0 12px;
          transition: all 0.3s ease;
        }

        .liquid-nav-capsule {
          position: relative;
          display: flex;
          align-items: center;
          padding: 7px 9px;
          gap: 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(28px) saturate(190%) contrast(102%);
          -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(102%);
          border: 1px solid rgba(255, 255, 255, 0.88);
          box-shadow: 
            0 14px 38px -4px rgba(45, 30, 15, 0.09),
            0 4px 14px -2px rgba(0, 0, 0, 0.04),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.03);
          max-width: 100%;
          user-select: none;
          touch-action: none;
        }

        .liquid-nav-sheen {
          position: absolute;
          top: 1px;
          left: 14px;
          right: 14px;
          height: 40%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.05) 100%);
          border-radius: 9999px;
          pointer-events: none;
          z-index: 1;
        }

        .liquid-nav-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 24px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.96rem;
          font-family: var(--font-sans);
          font-weight: 500;
          color: #736C64;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          z-index: 2;
        }

        .liquid-nav-btn.is-active {
          font-weight: 600;
          color: #1A1715;
        }

        .liquid-active-pill {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.92);
          box-shadow: 
            0 5px 18px rgba(0, 0, 0, 0.09),
            0 1.5px 4px rgba(0, 0, 0, 0.04),
            inset 0 1px 0.5px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(0, 0, 0, 0.02);
          z-index: -1;
        }

        .liquid-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8A8279;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .liquid-nav-icon svg {
          width: 19px;
          height: 19px;
        }

        .liquid-nav-btn.is-active .liquid-nav-icon {
          color: #D97706;
          transform: scale(1.08);
        }

        .liquid-nav-label {
          position: relative;
          z-index: 3;
        }

        .liquid-nav-hint {
          margin-top: 8px;
          font-size: 0.76rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          opacity: 0.72;
          letter-spacing: 0.02em;
        }

        /* ========================================================= */
        /* MOBILE STYLES (Layar <= 640px)                            */
        /* ========================================================= */
        @media (max-width: 640px) {
          .liquid-nav-wrapper {
            position: fixed;
            top: auto;
            bottom: 24px;
            bottom: calc(22px + env(safe-area-inset-bottom, 0px));
            left: 0;
            right: 0;
            margin: 0 auto;
            width: fit-content;
            z-index: 70;
            padding: 0;
          }

          .liquid-nav-capsule {
            padding: 8px 12px;
            gap: 8px;
            box-shadow: 
              0 18px 42px -4px rgba(45, 30, 15, 0.18),
              0 6px 16px -2px rgba(0, 0, 0, 0.09),
              inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95);
          }

          /* Hilangkan teks label di mobile */
          .liquid-nav-label {
            display: none !important;
          }

          /* Hilangkan teks petunjuk di mobile */
          .liquid-nav-hint {
            display: none !important;
          }

          /* Tombol tab mobile berukuran lebih lega dan mantap untuk sentuhan jempol */
          .liquid-nav-btn {
            padding: 14px 22px;
            min-width: 60px;
            min-height: 52px;
          }

          .liquid-nav-icon svg {
            width: 23px !important;
            height: 23px !important;
          }
        }
      `}</style>
    </>
  );
}
