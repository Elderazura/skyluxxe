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
      lerp: 0.08,
      duration: 1.2,
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
