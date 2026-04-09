'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

const LERP = 0.15
const SIZE_DEFAULT = 12
const SIZE_HOVER = 48
const COLOR = '#DFA293'
const OPACITY_DEFAULT = 0.4
const OPACITY_HOVER = 0.55

function subscribePointerMode(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const fine = window.matchMedia('(pointer: fine)')
  const coarse = window.matchMedia('(pointer: coarse)')
  const handler = () => onChange()
  fine.addEventListener('change', handler)
  coarse.addEventListener('change', handler)
  return () => {
    fine.removeEventListener('change', handler)
    coarse.removeEventListener('change', handler)
  }
}

function getPointerCursorEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(pointer: coarse)').matches
  )
}

function getServerSnapshot() {
  return false
}

function isInteractiveTarget(node: Element | null): boolean {
  if (!node) return false
  if (node.closest('[data-cursor="pointer"]')) return true
  const el = node instanceof Element ? node : null
  if (!el) return false
  const closest = el.closest(
    'a[href], button, [role="button"], input[type="submit"], input[type="button"]',
  )
  return Boolean(closest)
}

export function Cursor() {
  const active = useSyncExternalStore(
    subscribePointerMode,
    getPointerCursorEnabled,
    getServerSnapshot,
  )

  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const sizeTargetRef = useRef(SIZE_DEFAULT)
  const sizeRef = useRef(SIZE_DEFAULT)
  const opacityTargetRef = useRef(OPACITY_DEFAULT)
  const opacityRef = useRef(OPACITY_DEFAULT)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY

      const top = document.elementFromPoint(e.clientX, e.clientY)
      const hover = isInteractiveTarget(top)
      sizeTargetRef.current = hover ? SIZE_HOVER : SIZE_DEFAULT
      opacityTargetRef.current = hover ? OPACITY_HOVER : OPACITY_DEFAULT
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    function tick() {
      const target = targetRef.current
      const p = posRef.current
      p.x += (target.x - p.x) * LERP
      p.y += (target.y - p.y) * LERP

      sizeRef.current +=
        (sizeTargetRef.current - sizeRef.current) * LERP
      opacityRef.current +=
        (opacityTargetRef.current - opacityRef.current) * LERP

      const el = document.getElementById('skyluxxe-custom-cursor')
      if (el) {
        const half = sizeRef.current / 2
        el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`
        el.style.width = `${sizeRef.current}px`
        el.style.height = `${sizeRef.current}px`
        el.style.opacity = String(opacityRef.current)
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = prevCursor
    }
  }, [active])

  if (!active) return null

  return (
    <div
      id="skyluxxe-custom-cursor"
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: SIZE_DEFAULT,
        height: SIZE_DEFAULT,
        borderRadius: '9999px',
        backgroundColor: COLOR,
        opacity: OPACITY_DEFAULT,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  )
}
