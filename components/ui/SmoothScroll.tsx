'use client'

import Lenis from 'lenis'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    if (reducedMotion.matches) {
      return
    }

    const instance = new Lenis({
      // Lenis defaults to 0.1. At 0.08 the viewport kept coasting well after
      // the wheel stopped, which read as lag rather than smoothness — the more
      // so once GSAP's scrub and the CSS `scroll-behavior` piled on top.
      // `duration` is ignored whenever `lerp` is set, so it is not passed.
      lerp: 0.12,
      smoothWheel: true,
    })

    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) {
        setLenis(instance)
      }
    })

    let rafId = 0

    function raf(time: number) {
      instance.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(rafId)
      instance.destroy()
      queueMicrotask(() => {
        setLenis(null)
      })
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
