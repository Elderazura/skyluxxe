'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

const LERP = 0.15
const SIZE_DEFAULT = 12
const SIZE_HOVER = 48
const COLOR = '#DFA293'
const OPACITY_DEFAULT = 0.4
const OPACITY_HOVER = 0.55

/** Below this, the lerp has visually converged and the loop can idle. */
const SETTLE_EPSILON = 0.01

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

function isInteractiveTarget(node: EventTarget | null): boolean {
  if (!(node instanceof Element)) return false
  if (node.closest('[data-cursor="pointer"]')) return true
  return Boolean(
    node.closest(
      'a[href], button, [role="button"], input[type="submit"], input[type="button"]',
    ),
  )
}

export function Cursor() {
  const active = useSyncExternalStore(
    subscribePointerMode,
    getPointerCursorEnabled,
    getServerSnapshot,
  )

  const dotRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const sizeTargetRef = useRef(SIZE_DEFAULT)
  const sizeRef = useRef(SIZE_DEFAULT)
  const opacityTargetRef = useRef(OPACITY_DEFAULT)
  const opacityRef = useRef(OPACITY_DEFAULT)
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)

  useEffect(() => {
    if (!active) return

    const el = dotRef.current
    if (!el) return

    function tick() {
      const target = targetRef.current
      const p = posRef.current

      p.x += (target.x - p.x) * LERP
      p.y += (target.y - p.y) * LERP
      sizeRef.current += (sizeTargetRef.current - sizeRef.current) * LERP
      opacityRef.current += (opacityTargetRef.current - opacityRef.current) * LERP

      const half = SIZE_DEFAULT / 2
      const scale = sizeRef.current / SIZE_DEFAULT

      // Transform + opacity only. Writing width/height here forced a layout on
      // every frame; scaling a fixed-size dot stays on the compositor.
      el!.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0) scale(${scale})`
      el!.style.opacity = String(opacityRef.current)

      const settled =
        Math.abs(target.x - p.x) < SETTLE_EPSILON &&
        Math.abs(target.y - p.y) < SETTLE_EPSILON &&
        Math.abs(sizeTargetRef.current - sizeRef.current) < SETTLE_EPSILON &&
        Math.abs(opacityTargetRef.current - opacityRef.current) < SETTLE_EPSILON

      if (settled) {
        // Park the loop once everything has caught up, rather than burning a
        // frame forever while the pointer sits still.
        runningRef.current = false
        return
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    function wake() {
      if (runningRef.current) return
      runningRef.current = true
      rafRef.current = window.requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      wake()
    }

    // `pointerover` fires only when the pointer crosses into a different
    // element, so hover state costs one closest() per boundary instead of an
    // elementFromPoint() hit-test on every single mousemove.
    const onOver = (e: PointerEvent) => {
      const hover = isInteractiveTarget(e.target)
      sizeTargetRef.current = hover ? SIZE_HOVER : SIZE_DEFAULT
      opacityTargetRef.current = hover ? OPACITY_HOVER : OPACITY_DEFAULT
      wake()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })

    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    wake()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.cancelAnimationFrame(rafRef.current)
      runningRef.current = false
      document.body.style.cursor = prevCursor
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={dotRef}
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
        willChange: 'transform, opacity',
      }}
    />
  )
}
