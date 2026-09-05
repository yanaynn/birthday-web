'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

import { Cta, type CtaProps } from '@/components/ui/hero-04-utils/cta'
import { ArtCollage } from '@/components/ui/hero-04-utils/art-collage'

export interface Hero04Props {
  badge?: React.ReactNode
  title: string
  titleLine2?: string
  titleLine2Font?: string
  description: string
  washImage?: string
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16',
    title: 'text-2xl sm:text-3xl md:text-[2.25rem]',
    description: 'max-w-md text-sm sm:text-base leading-relaxed',
    header: 'gap-4',
    grid: 'gap-8 md:gap-10',
  },
  compact: {
    section: 'pt-6 sm:pt-8 pb-8 sm:pb-10',
    title: 'text-xl sm:text-2xl md:text-3xl',
    description: 'max-w-sm text-sm leading-relaxed',
    header: 'gap-3',
    grid: 'gap-6 md:gap-8',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

export function Hero04({
  badge,
  title,
  titleLine2,
  titleLine2Font,
  description,
  washImage,
  primaryImage,
  secondaryImage,
  primaryAlt = '',
  secondaryAlt = '',
  animation = 'subtle',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
}: Readonly<Hero04Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const backgroundElement = washImage && (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-35 blur-3xl overflow-hidden"
      style={{
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 15%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 15%, transparent 70%)',
      }}
    >
      <img
        src={washImage}
        alt=""
        className="h-full w-full object-cover object-center"
      />
    </div>
  )

  const titleElement = title && (
    <div className="space-y-1">
      <h2
        className={cn(
          'text-foreground font-serif font-normal tracking-tight text-balance leading-snug',
          vs.title,
        )}
      >
        <Balancer>{title}</Balancer>
      </h2>
      {titleLine2 && (
        <span
          className={
            titleLine2Font ||
            'font-birthstone text-3xl sm:text-4xl md:text-[2.9rem] text-[#D97706] block leading-none font-normal'
          }
        >
          {titleLine2}
        </span>
      )}
    </div>
  )

  const descriptionElement = description && (
    <p className={cn('text-stone-600', vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  )

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="pt-2 flex flex-wrap items-center gap-4">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'link' }}
        />
      )}
    </div>
  )

  const mediaElement = (
    <ArtCollage
      primaryImage={primaryImage}
      secondaryImage={secondaryImage}
      primaryAlt={primaryAlt}
      secondaryAlt={secondaryAlt}
    />
  )

  return (
    <section className="bg-transparent relative isolate w-full">
      {backgroundElement}

      <motion.div
        className={cn(
          'relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-2 sm:px-4 md:px-0',
          vs.section,
          vs.grid,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-60px' }}
      >
        <Reveal
          active={animate}
          className={cn('flex flex-col items-start text-left', vs.header)}
        >
          {badge}
          {titleElement}
          {descriptionElement}
          {ctasElement}
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full flex items-center justify-center md:justify-end pt-6 md:pt-0">
          {mediaElement}
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero04
