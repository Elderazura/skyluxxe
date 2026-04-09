'use client'

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

function styleWithoutTransform(
  style: CSSProperties | undefined,
): CSSProperties | undefined {
  if (!style || typeof style !== 'object') return undefined
  const rest = { ...style }
  delete rest.transform
  return rest
}

const ACTIVATION_PX = 40
const MAX_SHIFT_PX = 8
const LERP = 0.15
const PULL = 0.12

function distancePointToRect(
  px: number,
  py: number,
  r: DOMRectReadOnly,
): number {
  const cx = Math.max(r.left, Math.min(px, r.right))
  const cy = Math.max(r.top, Math.min(py, r.bottom))
  return Math.hypot(px - cx, py - cy)
}

function computeShift(
  mx: number,
  my: number,
  rect: DOMRectReadOnly,
): { x: number; y: number } {
  const dist = distancePointToRect(mx, my, rect)
  if (dist > ACTIVATION_PX) return { x: 0, y: 0 }

  const strength = 1 - dist / ACTIVATION_PX
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  let tx = (mx - cx) * PULL * strength
  let ty = (my - cy) * PULL * strength
  const mag = Math.hypot(tx, ty)
  if (mag > MAX_SHIFT_PX) {
    const s = MAX_SHIFT_PX / mag
    tx *= s
    ty *= s
  }
  return { x: tx, y: ty }
}

export type MagneticLinkProps<T extends ElementType = 'a'> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function MagneticLink<T extends ElementType = 'a'>(
  props: MagneticLinkProps<T>,
) {
  const { as, className, children, style: userStyle, ...rest } = props
  const Component = (as ?? 'a') as React.JSX.ElementType

  const elRef = useRef<HTMLElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    targetRef.current = computeShift(e.clientX, e.clientY, rect)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    function tick() {
      const t = targetRef.current
      const c = currentRef.current
      c.x += (t.x - c.x) * LERP
      c.y += (t.y - c.y) * LERP

      const node = elRef.current
      if (node) {
        node.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [onMouseMove])

  const setRef = useCallback((node: HTMLElement | null) => {
    elRef.current = node
  }, [])

  const mergedStyle = styleWithoutTransform(
    userStyle && typeof userStyle === 'object'
      ? (userStyle as CSSProperties)
      : undefined,
  )

  return (
    <Component
      ref={setRef}
      className={className}
      {...(rest as ComponentPropsWithoutRef<T>)}
      style={mergedStyle}
    >
      {children}
    </Component>
  )
}
