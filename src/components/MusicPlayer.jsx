import React, { useState, useRef, useEffect } from 'react';

/**
 * MusicPlayer: Pemutar musik minimalis modern dengan estetika piringan hitam.
 * - Desktop: Selalu menampilkan pemutar lengkap (piringan, info lagu, play/pause, mute).
 * - Mobile: Secara default HANYA menampilkan piringan hitam dan teks "Music".
 *   Ketika diklik, mengembang (expand) menampilkan full player dengan tombol tutup.
 */
export default function MusicPlayer({ musicData, autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const hasAppliedStartTime = useRef(false);

  const applyInitialStartTime = () => {
    if (!hasAppliedStartTime.current && musicData?.startTime && audioRef.current) {
      try {
        audioRef.current.currentTime = musicData.startTime;
        hasAppliedStartTime.current = true;
      } catch {
        // Browser will apply once metadata or buffer is ready
      }
    }
  };

  // Inisialisasi volume ke 30% (0.3)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
    if (autoPlayTrigger && audioRef.current) {
      applyInitialStartTime();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [autoPlayTrigger]);

  // Tutup panel mobile jika pengguna mengklik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMobileExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const togglePlay = (e) => {
    e && e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      applyInitialStartTime();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e && e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleContainerClick = () => {
    // Pada mobile jika belum expanded, klik akan membuka full player
    if (!isMobileExpanded) {
      setIsMobileExpanded(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`music-player-root ${isMobileExpanded ? 'is-mobile-expanded' : ''}`}
      onClick={handleContainerClick}
    >
      <audio
        ref={audioRef}
        src={musicData?.url}
        loop
        preload="auto"
        onPlay={(e) => {
          e.currentTarget.volume = 0.3;
          applyInitialStartTime();
        }}
        onLoadedMetadata={(e) => {
          e.currentTarget.volume = 0.3;
          applyInitialStartTime();
        }}
        onCanPlay={() => {
          applyInitialStartTime();
        }}
      />

      <div className="music-player-capsule">
        {/* Minimalist Vinyl Record */}
        <div
          onClick={togglePlay}
          className={`music-vinyl-disc ${isPlaying ? 'vinyl-rotating' : 'vinyl-rotating vinyl-paused'}`}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {/* Inner sunflower amber ring */}
          <div className="music-vinyl-center" />
        </div>

        {/* 1. Teks "Music" Sederhana (Ditampilkan di mobile saat collapsed) */}
        <div className="music-mobile-label">
          <span>Music</span>
          {isPlaying && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#D97706',
                display: 'inline-block',
              }}
            />
          )}
        </div>

        {/* 2. Detail Track Lagu (Tampil di desktop & saat mobile expanded) */}
        <div onClick={togglePlay} className="music-track-info">
          <span className="music-track-title">
            {musicData?.title || "Sunflower"}
          </span>
          <span className="music-track-status">
            {musicData?.artist ? `${musicData.artist} • ` : ''}{isPlaying ? "playing" : "paused"}
          </span>
        </div>

        {/* 3. Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="music-ctrl-btn"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* 4. Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="music-ctrl-btn"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* 5. Tombol Close di Mobile saat Expanded */}
        {isMobileExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileExpanded(false);
            }}
            className="music-close-mobile-btn"
            aria-label="Close music player"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <style>{`
        .music-player-root {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 50;
        }

        .music-player-capsule {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 14px 6px 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-subtle);
          transition: all 0.25s ease;
        }

        .music-vinyl-disc {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle, #292524 35%, #1C1917 75%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.12);
          flex-shrink: 0;
        }

        .music-vinyl-center {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #F59E0B;
          border: 2px solid #1C1917;
        }

        .music-mobile-label {
          display: none; /* Hanya muncul di mobile saat collapsed */
        }

        .music-track-info {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          max-width: 140px;
        }

        .music-track-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 1.2;
        }

        .music-track-status {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          margin-top: 2px;
        }

        .music-ctrl-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease;
        }

        .music-ctrl-btn:active {
          transform: scale(0.9);
        }

        .music-close-mobile-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: var(--text-muted);
          align-items: center;
          justify-content: center;
          margin-left: 2px;
        }

        /* ========================================================= */
        /* MOBILE STYLES (Layar <= 640px)                            */
        /* ========================================================= */
        @media (max-width: 640px) {
          .music-player-root {
            top: 14px;
            right: 14px;
            cursor: pointer;
          }

          /* Mode Default di Mobile (Collapsed: hanya piringan + teks "Music") */
          .music-player-root:not(.is-mobile-expanded) .music-player-capsule {
            padding: 5px 12px 5px 6px;
            gap: 8px;
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          }

          .music-player-root:not(.is-mobile-expanded) .music-mobile-label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: -0.01em;
          }

          .music-player-root:not(.is-mobile-expanded) .music-track-info,
          .music-player-root:not(.is-mobile-expanded) .music-ctrl-btn {
            display: none !important;
          }

          /* Mode Expanded di Mobile saat diklik */
          .music-player-root.is-mobile-expanded .music-player-capsule {
            padding: 6px 12px 6px 8px;
            gap: 10px;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
          }

          .music-player-root.is-mobile-expanded .music-track-info {
            display: flex;
            max-width: 120px;
          }

          .music-player-root.is-mobile-expanded .music-ctrl-btn {
            display: flex;
          }

          .music-player-root.is-mobile-expanded .music-close-mobile-btn {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
