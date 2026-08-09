import { useEffect, useRef } from 'react'

/**
 * Pointer position drives a gentle 3D tilt plus a soft light sweep
 * (the --mx/--my vars feed .card__sheen). Disabled under reduced-motion
 * and on touch, where a hover tilt only gets in the way.
 */
export function useCardTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover)').matches
    if (reduceMotion || !finePointer) return

    let raf: number | null = null
    let pending = { x: 0, y: 0 }

    const apply = () => {
      raf = null
      const r = card.getBoundingClientRect()
      let x = (pending.x - r.left) / r.width
      let y = (pending.y - r.top) / r.height
      x = Math.max(0, Math.min(1, x))
      y = Math.max(0, Math.min(1, y))
      const rx = (0.5 - y) * 10
      const ry = (x - 0.5) * 12
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(4px)`
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    }

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY }
      if (raf == null) raf = requestAnimationFrame(apply)
    }
    const onEnter = () => {
      card.classList.add('card--lit')
      card.style.animation = 'none' // pause the idle float while lit
    }
    const onLeave = () => {
      card.classList.remove('card--lit')
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
      card.style.transform = ''
      card.style.animation = '' // resume float (hero card)
    }

    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    return () => {
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      if (raf != null) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
