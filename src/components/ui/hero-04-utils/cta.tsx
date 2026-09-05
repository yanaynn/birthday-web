import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CtaProps {
  ctaEnabled?: boolean
  text?: string
  link?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  icon?: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  className?: string
  children?: React.ReactNode
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta || !cta.ctaEnabled) return null

  const {
    text,
    link,
    variant = 'default',
    onClick,
    icon,
    className,
    children,
  } = cta

  const isLinkVariant = variant === 'link'

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }
    if (link && link.startsWith('#')) {
      e.preventDefault()
      const targetId = link.slice(1)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }

  if (isLinkVariant) {
    return (
      <a
        href={link || '#'}
        onClick={handleLinkClick}
        style={{ padding: '8px 12px' }}
        className={cn(
          'text-stone-500 hover:text-stone-900 text-sm font-medium underline-offset-4 hover:underline transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap',
          className,
        )}
      >
        {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
        {text && <span>{text}</span>}
        {children}
      </a>
    )
  }

  if (link && !onClick) {
    return (
      <a href={link} className="inline-block cursor-pointer">
        <button
          type="button"
          style={{
            padding: '12px 26px',
            minHeight: '44px',
            boxSizing: 'border-box',
          }}
          className={cn(
            'inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm cursor-pointer whitespace-nowrap',
            variant === 'default'
              ? 'bg-[#1C1917] text-white hover:bg-[#D97706]'
              : 'bg-stone-100 text-stone-800 hover:bg-stone-200',
            className,
          )}
        >
          {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
          {text && <span>{text}</span>}
          {children}
        </button>
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={
        variant === 'default'
          ? {
              padding: '12px 26px',
              minHeight: '44px',
              boxSizing: 'border-box',
            }
          : undefined
      }
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer select-none active:scale-95 whitespace-nowrap',
        variant === 'default'
          ? 'bg-[#1C1917] text-white hover:bg-[#D97706] hover:shadow-md px-6 py-3'
          : 'bg-stone-100 text-stone-800 hover:bg-stone-200 px-6 py-2.5',
        className,
      )}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      {text && <span className="whitespace-nowrap font-medium">{text}</span>}
      {children}
    </button>
  )
}

export default Cta
