import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ArtCollageProps {
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  className?: string
}

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt = 'Featured moment',
  secondaryAlt = 'Secondary moment',
  className,
}: ArtCollageProps) {
  return (
    <div
      className={cn(
        'relative select-none flex items-center justify-center',
        className,
      )}
      style={{
        width: '100%',
        maxWidth: '310px',
        margin: '0 auto',
        paddingBottom: '32px',
        paddingRight: '20px',
      }}
    >
      {/* Soft Sunflower Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-full bg-amber-400/20 blur-2xl"
      />

      {/* Primary Portrait Card - Centered within bounding container */}
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 aspect-[4/5] w-[86%] overflow-hidden rounded-[1.5rem] bg-stone-100 shadow-[0_14px_30px_rgba(0,0,0,0.08)] border border-stone-200/70"
      >
        <img
          src={primaryImage}
          alt={primaryAlt}
          className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
      </motion.div>

      {/* Secondary Overlapping Card (Bottom-Right) */}
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="absolute bottom-0 right-0 z-20 aspect-square w-[50%] overflow-hidden rounded-[1.2rem] bg-stone-50 border-[4px] border-white shadow-[0_16px_32px_rgba(0,0,0,0.16)] ring-1 ring-black/5"
      >
        <img
          src={secondaryImage}
          alt={secondaryAlt}
          className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </motion.div>
    </div>
  )
}

export default ArtCollage
