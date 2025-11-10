import { useEffect } from 'react'
import {
  cancelSmoothScroll,
  prefersReducedMotion,
  scrollToElement,
  supportsNativeSmoothScroll,
} from '@/lib/smoothScroll'

type UseSmoothScrollOptions = {
  duration?: number
  offset?: number
  enableHashChange?: boolean
}

// Global smooth scroll: attaches anchor click listener and hashchange fallback
export default function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const duration = options.duration ?? 500
  const offset = options.offset ?? 0
  const enableHashChange = options.enableHashChange ?? true

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Preserve default behavior for modified clicks or non-left clicks
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      // Find nearest anchor element
      let target = event.target as HTMLElement | null
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }
      const anchor = target as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      // Respect external links and targets
      if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      // Resolve absolute URL and check same-origin
      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      // Only handle in-page hash navigation
      const isSamePath = url.pathname === window.location.pathname
      const hasHash = !!url.hash
      if (!isSamePath || !hasHash) return

      const id = decodeURIComponent(url.hash.slice(1))
      const el = document.getElementById(id)
      if (!el) return

      // Accessibility: if reduced motion, do not intercept
      if (prefersReducedMotion()) return

      // Only intercept when native smooth scroll is not supported
      if (!supportsNativeSmoothScroll()) {
        event.preventDefault()
        cancelSmoothScroll()
        // Keep accessible focus after scroll
        scrollToElement(el, { duration, offset }).then(() => {
          try {
            // Update hash to reflect navigation
            history.pushState(null, '', `#${id}`)
          } catch (err) {
            // Intentionally swallow pushState errors (e.g., older browsers/Safari private mode)
            // Assign to a local to avoid the no-empty rule without affecting behavior
            const _ignored = err
          }
          // Focus target without triggering additional scroll
          el.setAttribute('tabindex', '-1')
          ;(el as HTMLElement).focus({ preventScroll: true })
          setTimeout(() => el.removeAttribute('tabindex'), 1000)
        })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => {
      // Provide proper options object to avoid explicit-any casts
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [duration, offset])

  useEffect(() => {
    if (!enableHashChange) return
    const onHashChange = () => {
      if (prefersReducedMotion() || supportsNativeSmoothScroll()) return
      const id = decodeURIComponent(window.location.hash.slice(1))
      const el = id ? document.getElementById(id) : null
      if (el) {
        cancelSmoothScroll()
        scrollToElement(el, { duration, offset })
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [duration, offset, enableHashChange])
}