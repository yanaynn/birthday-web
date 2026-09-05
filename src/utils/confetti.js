import confetti from 'canvas-confetti';

/**
 * Memicu ledakan konfeti bunga matahari dan kelopak emas
 * yang memenuhi layar saat buket bunga matahari diklik.
 */
export function triggerSunflowerBurst() {
  const sunflowerColors = ['#F6C343', '#E5A42D', '#D07B2D', '#8FA486', '#5E715B', '#FFF2B2'];

  let sunflowerShape;
  let sparkleShape;
  let heartShape;

  try {
    if (typeof confetti.shapeFromText === 'function') {
      sunflowerShape = confetti.shapeFromText({ text: '🌻', scalar: 2.2 });
      sparkleShape = confetti.shapeFromText({ text: '✨', scalar: 1.8 });
      heartShape = confetti.shapeFromText({ text: '💛', scalar: 1.8 });
    }
  } catch (e) {
    console.warn('Canvas confetti custom text shape fallback', e);
  }

  const shapes = sunflowerShape ? [sunflowerShape, sparkleShape, heartShape, 'circle'] : ['circle', 'square'];

  // 1. Massive Center Explosion (Ledakan tengah)
  confetti({
    particleCount: 120,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: sunflowerColors,
    shapes: shapes,
    scalar: 1.4,
    gravity: 0.8,
    ticks: 240,
  });

  // 2. Left and Right sweeping cannons after 150ms
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0.05, y: 0.65 },
      colors: sunflowerColors,
      shapes: shapes,
      scalar: 1.3,
      gravity: 0.75,
      ticks: 220,
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 0.95, y: 0.65 },
      colors: sunflowerColors,
      shapes: shapes,
      scalar: 1.3,
      gravity: 0.75,
      ticks: 220,
    });
  }, 180);

  // 3. Falling Petals Shower from top after 350ms to create covering screen effect
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { x: 0.5, y: 0.1 },
      colors: sunflowerColors,
      shapes: shapes,
      scalar: 1.5,
      gravity: 0.6,
      drift: 0.3,
      ticks: 260,
    });
  }, 350);
}

/**
 * Efek konfeti mini saat lilin ditiup atau kado dibuka
 */
export function triggerMiniCelebration() {
  const celebrationColors = ['#F6C343', '#E5A42D', '#FF8E72', '#FFFFFF', '#6BA368'];
  
  confetti({
    particleCount: 65,
    spread: 70,
    origin: { y: 0.6 },
    colors: celebrationColors,
    ticks: 180,
    scalar: 1.1,
  });
}
