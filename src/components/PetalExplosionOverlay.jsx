import React, { useEffect, useRef, useState } from 'react';

/**
 * Helper: Pre-render 6 ragam sprite bunga matahari & bintang kilau emas
 * ke canvas offscreen untuk performa super mulus (60+ FPS di mobile & desktop).
 */
function createSunflowerSprites() {
  const configs = [
    // 0: Classic Golden Sunflower
    {
      outerColor: '#F59E0B',
      innerColor: '#FBBF24',
      coreColor: '#3A1D06',
      rimColor: '#D97706',
      petalCount: 16,
      coreRatio: 0.36,
    },
    // 1: Deep Amber Sunset Sunflower
    {
      outerColor: '#D97706',
      innerColor: '#F59E0B',
      coreColor: '#421B04',
      rimColor: '#B45309',
      petalCount: 16,
      coreRatio: 0.38,
    },
    // 2: Radiant Warm Gold Sunflower
    {
      outerColor: '#FBBF24',
      innerColor: '#FEF08A',
      coreColor: '#2C1405',
      rimColor: '#F59E0B',
      petalCount: 14,
      coreRatio: 0.34,
    },
    // 3: Dense Full-Bloom Giant Sunflower
    {
      outerColor: '#F59E0B',
      innerColor: '#FCD34D',
      coreColor: '#331804',
      rimColor: '#D97706',
      petalCount: 18,
      coreRatio: 0.40,
    },
    // 4: Sweet Honey Blossom
    {
      outerColor: '#FBBF24',
      innerColor: '#FCD34D',
      coreColor: '#452006',
      rimColor: '#B45309',
      petalCount: 12,
      coreRatio: 0.35,
    },
  ];

  const sprites = configs.map((cfg) => {
    const size = 128;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.47;
    const coreR = outerR * cfg.coreRatio;

    // Helper: bentuk kelopak bunga matahari melengkung halus dengan ujung runcing
    const drawPetal = (len, w, fill) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(coreR * 0.8, 0);
      ctx.quadraticCurveTo(coreR + (len - coreR) * 0.45, -w / 2, len, 0);
      ctx.quadraticCurveTo(coreR + (len - coreR) * 0.45, w / 2, coreR * 0.8, 0);
      ctx.closePath();
      ctx.fill();

      // Garis serat kelopak tipis di tengah
      ctx.beginPath();
      ctx.moveTo(coreR * 0.9, 0);
      ctx.lineTo(len * 0.85, 0);
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.28)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    };

    const count = cfg.petalCount;
    const step = (Math.PI * 2) / count;
    const petalW = (Math.PI * 2 * outerR / count) * 0.82;

    // 1. Lapisan Kelopak Luar (Outer Ray Florets)
    for (let i = 0; i < count; i++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(i * step);
      drawPetal(outerR, petalW, cfg.outerColor);
      ctx.restore();
    }

    // 2. Lapisan Kelopak Dalam (Inner Ray Florets, offset sudut)
    const innerPetalW = petalW * 0.88;
    const innerLen = outerR * 0.92;
    for (let i = 0; i < count; i++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(i * step + step / 2);
      drawPetal(innerLen, innerPetalW, cfg.innerColor);
      ctx.restore();
    }

    // 3. Piringan Tengah (Central Disc Head) - Cokelat Gelap khas Bunga Matahari
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 1.08, 0, Math.PI * 2);
    ctx.fillStyle = cfg.rimColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fillStyle = cfg.coreColor;
    ctx.fill();

    // Cincin florets berbintik
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
    ctx.lineWidth = 1.6;
    ctx.setLineDash([2, 2.5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pusat beludru inti
    ctx.beginPath();
    ctx.arc(cx, cy, coreR * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 14, 3, 0.9)';
    ctx.fill();

    // Bintik serbuk sari emas halus (pollen dots)
    ctx.fillStyle = 'rgba(252, 211, 77, 0.85)';
    for (let p = 0; p < 8; p++) {
      const a = (p * Math.PI) / 4;
      const d = coreR * 0.52;
      ctx.fillRect(cx + Math.cos(a) * d - 1, cy + Math.sin(a) * d - 1, 2, 2);
    }

    return c;
  });

  // Sprite 5: Bintang Kilau Emas (Golden Sparkle ✦)
  const starCanvas = document.createElement('canvas');
  starCanvas.width = 64;
  starCanvas.height = 64;
  const sCtx = starCanvas.getContext('2d');
  const scx = 32;
  const scy = 32;

  // Soft glow
  const sGlow = sCtx.createRadialGradient(scx, scy, 2, scx, scy, 28);
  sGlow.addColorStop(0, 'rgba(253, 230, 138, 0.9)');
  sGlow.addColorStop(0.4, 'rgba(245, 158, 11, 0.4)');
  sGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
  sCtx.fillStyle = sGlow;
  sCtx.beginPath();
  sCtx.arc(scx, scy, 28, 0, Math.PI * 2);
  sCtx.fill();

  // 4-point star
  sCtx.fillStyle = '#FFFFFF';
  sCtx.beginPath();
  sCtx.moveTo(scx, scy - 18);
  sCtx.quadraticCurveTo(scx, scy, scx + 18, scy);
  sCtx.quadraticCurveTo(scx, scy, scx, scy + 18);
  sCtx.quadraticCurveTo(scx, scy, scx - 18, scy);
  sCtx.quadraticCurveTo(scx, scy, scx, scy - 18);
  sCtx.closePath();
  sCtx.fill();

  sprites.push(starCanvas);
  return sprites;
}

/**
 * PetalExplosionOverlay:
 * Engine animasi kanvas bunga matahari mekar yang meledak dari buket
 * memenuhi layar secara dramatis, lalu menyapu lembut membuka halaman utama.
 */
export default function PetalExplosionOverlay({ isTriggered, originPos, onScreenCovered, onComplete }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isTriggered) return;

    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const originX = originPos?.x || width / 2;
    const originY = originPos?.y || height / 2;

    // Render sprite bunga matahari berdefinisi tinggi
    const sprites = createSunflowerSprites();

    // Buat partikel bunga matahari
    const particles = [];
    const totalParticles = 210;

    for (let i = 0; i < totalParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 26; // kecepatan semburan awal
      const isSparkle = Math.random() < 0.14; // 14% bintang kilau emas
      const spriteIndex = isSparkle ? 5 : Math.floor(Math.random() * 5);

      // Target sebaran merata di seluruh layar
      const targetX = Math.random() * width;
      const targetY = Math.random() * height;

      // Variasi ukuran: ada bunga besar hero bloom dan bunga flurry sedang
      const isHeroBloom = !isSparkle && Math.random() < 0.18;
      const baseSize = isSparkle
        ? 18 + Math.random() * 20
        : isHeroBloom
        ? 52 + Math.random() * 32
        : 26 + Math.random() * 28;

      particles.push({
        x: originX + (Math.random() - 0.5) * 36,
        y: originY + (Math.random() - 0.5) * 36,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetX,
        targetY,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.16,
        baseSize,
        scale: 0.2 + Math.random() * 0.35, // mulai kecil seperti kuncup mekar
        targetScale: isHeroBloom ? 2.2 + Math.random() * 1.6 : 1.4 + Math.random() * 1.8,
        spriteIndex,
        isSparkle,
        delay: Math.random() * 0.22,
        wobbleSpeed: 2 + Math.random() * 3,
        wobblePhase: Math.random() * Math.PI * 2,
      });
    }

    const startTime = performance.now();
    let hasTriggeredCovered = false;

    function animate(time) {
      const elapsed = Math.max(0, (time - startTime) / 1000);
      ctx.clearRect(0, 0, width, height);

      // FASE 1: LEDAKAN BUNGA MATAHARI MEKAR & MEMENUHI LAYAR (0s - 1.25s)
      if (elapsed < 1.3) {
        // Shockwave riak lingkaran cahaya emas di awal (0s - 0.38s)
        if (elapsed < 0.38) {
          const shockT = Math.min(Math.max(elapsed / 0.38, 0), 1);
          const shockR = Math.max(0, shockT * Math.min(width, height) * 0.55);
          ctx.save();
          ctx.beginPath();
          ctx.arc(originX, originY, shockR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.75 * (1 - shockT)})`;
          ctx.lineWidth = 14 * (1 - shockT);
          ctx.stroke();
          ctx.restore();
        }

        // Jika mendekati 0.98s, layar telah tertutup penuh bunga matahari
        if (elapsed > 0.98 && !hasTriggeredCovered) {
          hasTriggeredCovered = true;
          onScreenCovered && onScreenCovered();
        }

        // Selimut kabut emas lembut di latar belakang
        if (elapsed > 0.45) {
          const veilOpacity = Math.min((elapsed - 0.45) / 0.52, 0.96);
          ctx.fillStyle = `rgba(251, 191, 36, ${veilOpacity * 0.9})`;
          ctx.fillRect(0, 0, width, height);
        }

        // Render bunga matahari berputar & membesar
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const localT = Math.max(0, (elapsed - p.delay) / 0.88);
          const pEase = 1 - Math.pow(1 - Math.min(localT, 1), 2.6);

          // Interpolasi dari titik ledakan awal ke posisi sebaran layar
          const curX = p.x + p.vx * Math.min(elapsed * 16, 12) + (p.targetX - p.x) * pEase;
          const curY = p.y + p.vy * Math.min(elapsed * 16, 12) + (p.targetY - p.y) * pEase;

          // Membesar saat mendekati kamera
          const curScale = p.scale + (p.targetScale - p.scale) * pEase;
          p.rotation += p.rotSpeed;

          const size = p.baseSize * curScale;
          const alpha = Math.min(elapsed * 4.5, 1);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(curX, curY);
          ctx.rotate(p.rotation);
          const spr = sprites[p.spriteIndex];
          if (spr) {
            ctx.drawImage(spr, -size / 2, -size / 2, size, size);
          }
          ctx.restore();
        }

        animFrameRef.current = requestAnimationFrame(animate);
      }
      // FASE 2: HAMBARAN BUNGA MATAHARI PENUH & TRANSISI HALAMAN (1.3s - 1.55s)
      else if (elapsed < 1.6) {
        if (!hasTriggeredCovered) {
          hasTriggeredCovered = true;
          onScreenCovered && onScreenCovered();
        }

        // Selimut emas hangat
        ctx.fillStyle = 'rgba(251, 191, 36, 0.98)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.rotation += p.rotSpeed * 0.4;
          const size = p.baseSize * p.targetScale;

          ctx.save();
          ctx.translate(p.targetX, p.targetY);
          ctx.rotate(p.rotation);
          const spr = sprites[p.spriteIndex];
          if (spr) {
            ctx.drawImage(spr, -size / 2, -size / 2, size, size);
          }
          ctx.restore();
        }

        animFrameRef.current = requestAnimationFrame(animate);
      }
      // FASE 3: ANGIN BERHEMBUS & BUNGA MATAHARI MENYAPU LEMBUT (1.6s - 2.4s)
      else if (elapsed < 2.45) {
        const exitT = (elapsed - 1.6) / 0.85; // 0 ke 1
        const exitEase = Math.pow(exitT, 2);
        const fadeAlpha = Math.max(0, 1 - exitT);

        ctx.globalAlpha = fadeAlpha;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const blowX = p.targetX + exitEase * (width * 0.35 + (i % 2 === 0 ? 250 : -250));
          const blowY = p.targetY - exitEase * (height * 0.3 + 120);
          p.rotation += p.rotSpeed * 1.4;

          const size = p.baseSize * p.targetScale * (1 - exitT * 0.18);

          ctx.save();
          ctx.translate(blowX, blowY);
          ctx.rotate(p.rotation);
          const spr = sprites[p.spriteIndex];
          if (spr) {
            ctx.drawImage(spr, -size / 2, -size / 2, size, size);
          }
          ctx.restore();
        }

        ctx.globalAlpha = 1;
        animFrameRef.current = requestAnimationFrame(animate);
      }
      // SELESAI
      else {
        ctx.clearRect(0, 0, width, height);
        setIsActive(false);
        onComplete && onComplete();
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isTriggered, originPos, onScreenCovered, onComplete]);

  if (!isActive && !isTriggered) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
