import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Subtle scroll parallax: shifts its children against scroll based on how
 * far the element sits from the viewport center. rAF-throttled, disabled
 * under prefers-reduced-motion.
 */
export function Parallax({
  speed = 0.1,
  className,
  children,
}: {
  speed?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const delta = r.top + r.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
