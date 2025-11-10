export type SmoothScrollOptions = {
  duration?: number
  easing?: (t: number) => number
  offset?: number
}

let currentRaf: number | null = null
let isCancelling = false

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function supportsNativeSmoothScroll(): boolean {
  try {
    return typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports('scroll-behavior', 'smooth')
  } catch {
    return false
  }
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  } catch {
    return false
  }
}

export function cancelSmoothScroll() {
  if (currentRaf != null) {
    isCancelling = true
    cancelAnimationFrame(currentRaf)
    currentRaf = null
    isCancelling = false
  }
}

export function smoothScrollTo(targetY: number, options: SmoothScrollOptions = {}): Promise<void> {
  const duration = Math.max(0, options.duration ?? 500)
  const easing = options.easing ?? easeInOutCubic

  // Accessibility: respect reduced motion
  if (prefersReducedMotion()) {
    window.scrollTo({ top: targetY, behavior: 'auto' })
    return Promise.resolve()
  }

  // If native smooth scroll is supported, use it and return
  if (supportsNativeSmoothScroll()) {
    window.scrollTo({ top: targetY, behavior: 'smooth' })
    return Promise.resolve()
  }

  // JS fallback with rAF
  cancelSmoothScroll()

  return new Promise((resolve) => {
    const startY = window.pageYOffset
    const diff = targetY - startY
    const start = performance.now()

    const step = (now: number) => {
      if (isCancelling) return
      const t = Math.min(1, (now - start) / duration)
      const eased = easing(t)
      window.scrollTo(0, Math.round(startY + diff * eased))
      if (t < 1) {
        currentRaf = requestAnimationFrame(step)
      } else {
        currentRaf = null
        resolve()
      }
    }

    currentRaf = requestAnimationFrame(step)
  })
}

export function scrollToElement(el: HTMLElement, options: SmoothScrollOptions = {}): Promise<void> {
  const offset = options.offset ?? 0
  const targetY = Math.round(el.getBoundingClientRect().top + window.pageYOffset - offset)
  return smoothScrollTo(targetY, options)
}

export function scrollToId(id: string, options: SmoothScrollOptions = {}): Promise<boolean> {
  const el = document.getElementById(id)
  if (!el) return Promise.resolve(false)
  return scrollToElement(el, options).then(() => true)
}