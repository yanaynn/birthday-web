import React from 'react';
import ExpandableGallery from '@/components/ui/expandable-gallery';

/**
 * GallerySection: Galeri foto kenangan editorial dengan kartu yang dapat mekar (Expandable Gallery)
 * - Tampilan Awal: Tumpukan kartu foto estetik yang melayang dengan rotasi halus dan efek hover pegas.
 * - Tombol / Klik: Mekar menjadi grid interaktif penuh dengan animasi fluid spring layout.
 * - Klik Foto di Grid: Membuka cerita kenangan personal (story modal).
 */
export default function GallerySection({ memories, extraMemories }) {
  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Editorial Header */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <div className="badge-pastel badge-green" style={{ marginBottom: '6px' }}>
          <span>Memories & Moments</span>
        </div>
        <h2
          className="font-birthstone"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            marginBottom: '4px',
          }}
        >
          Callback Memories
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            maxWidth: '460px',
            margin: '0 auto',
          }}
        >
          Every moment of you is a timeless chapter.
        </p>
      </div>

      {/* Modern Expandable Gallery with fluid spring physics */}
      <ExpandableGallery
        photos={memories}
        extraPhotos={extraMemories}
        quote={
          <>
            More than just moments, it’s the comforting warmth of your presence.
          </>
        }
        ctaText="Open Photo Gallery"
      />
    </div>
  );
}
