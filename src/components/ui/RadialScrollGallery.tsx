'use client'

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'

import { gsap, ScrollTrigger } from '@/lib/gsap'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') ref(node)
        else if (ref != null) (ref as React.MutableRefObject<T | null>).current = node
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs])
}

function useResponsiveValue(baseValue: number, mobileValue: number) {
  const [value, setValue] = useState(baseValue)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handle = () => setValue(window.innerWidth < 768 ? mobileValue : baseValue)
    handle()
    let t: ReturnType<typeof setTimeout>
    const debounced = () => {
      clearTimeout(t)
      t = setTimeout(handle, 100)
    }
    window.addEventListener('resize', debounced)
    return () => {
      window.removeEventListener('resize', debounced)
      clearTimeout(t)
    }
  }, [baseValue, mobileValue])
  return value
}

export interface RadialScrollGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Render function returning the items placed on the wheel; receives the hovered index. */
  children: (hoveredIndex: number | null) => ReactNode[]
  /** Vertical scroll distance (px) for one full 360° rotation. */
  scrollDuration?: number
  /** Percentage of the circle visible above the fold (10–100). */
  visiblePercentage?: number
  /** Circle radius on desktop (≥768px). */
  baseRadius?: number
  /** Circle radius on mobile (<768px). */
  mobileRadius?: number
  /** ScrollTrigger start position. */
  startTrigger?: string
  /** Fired when an item is clicked/selected. */
  onItemSelect?: (index: number) => void
  direction?: 'ltr' | 'rtl'
  disabled?: boolean
  /** Optional decorative layer rendered behind the wheel (inside the pinned area). */
  background?: ReactNode
  /** ScrollTrigger refresh priority (higher = refreshed earlier; set >0 when other
   *  pins appear lower on the page). */
  refreshPriority?: number
}

/**
 * Scroll-driven gallery — items ride a large, partially hidden circle. The section
 * pins while the user scrolls through the rotation. Ported from a framer/@gsap/react
 * design to the project's GSAP-only stack (imports from @/lib/gsap, gsap.context
 * cleanup). Reduced-motion: rotation/pin skipped, items render static.
 */
export const RadialScrollGallery = forwardRef<HTMLDivElement, RadialScrollGalleryProps>(
  (
    {
      children,
      scrollDuration = 2500,
      visiblePercentage = 45,
      baseRadius = 550,
      mobileRadius = 220,
      className = '',
      startTrigger = 'center center',
      onItemSelect,
      direction = 'ltr',
      disabled = false,
      background,
      refreshPriority = 0,
      ...rest
    },
    ref,
  ) => {
    const pinRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLUListElement>(null)
    const childRef = useRef<HTMLLIElement>(null)
    const mergedRef = useMergeRefs(ref, pinRef)

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [childSize, setChildSize] = useState<{ w: number; h: number } | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    const currentRadius = useResponsiveValue(baseRadius, mobileRadius)
    const circleDiameter = currentRadius * 2

    const { visibleDecimal, hiddenDecimal } = useMemo(() => {
      const clamped = Math.max(10, Math.min(100, visiblePercentage))
      const v = clamped / 100
      return { visibleDecimal: v, hiddenDecimal: 1 - v }
    }, [visiblePercentage])

    const childrenNodes = useMemo(
      () => childrenToArray(children(hoveredIndex)),
      [children, hoveredIndex],
    )
    const childrenCount = childrenNodes.length

    // Measure the first child to size the container so rotation never clips.
    useEffect(() => {
      setIsMounted(true)
      if (!childRef.current) return
      const observer = new ResizeObserver((entries) => {
        let changed = false
        for (const entry of entries) {
          setChildSize({ w: entry.contentRect.width, h: entry.contentRect.height })
          changed = true
        }
        if (changed) ScrollTrigger.refresh()
      })
      observer.observe(childRef.current)
      return () => observer.disconnect()
    }, [childrenCount])

    useIso(() => {
      if (!pinRef.current || !containerRef.current || childrenCount === 0) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current!.children,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'back.out(1.2)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
        gsap.to(containerRef.current, {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            start: startTrigger,
            end: `+=${scrollDuration}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Higher = refreshed before pins lower on the page (e.g. Références),
            // so their start positions account for this pin's spacer. Prevents overlap.
            refreshPriority,
          },
        })
      }, pinRef)
      return () => ctx.revert()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollDuration, currentRadius, startTrigger, childrenCount])

    if (childrenCount === 0) return null

    const scaleFactor = 1.25
    const calculatedBuffer = childSize ? childSize.h * scaleFactor - childSize.h + 60 : 150
    const visibleAreaHeight = childSize
      ? circleDiameter * visibleDecimal + childSize.h / 2 + calculatedBuffer
      : circleDiameter * visibleDecimal + 200

    return (
      <div
        ref={mergedRef}
        className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden ${className}`}
        {...rest}
      >
        {background ? (
          <div className="absolute inset-0 z-0">{background}</div>
        ) : null}
        <div
          className="pointer-events-none relative z-10 w-full overflow-hidden"
          style={{
            height: `${visibleAreaHeight}px`,
            maskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
          }}
        >
          <ul
            ref={containerRef}
            dir={direction}
            className={`absolute left-1/2 m-0 list-none -translate-x-1/2 p-0 transition-opacity duration-500 ease-out will-change-transform ${
              disabled ? 'pointer-events-none opacity-50 grayscale' : ''
            } ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: circleDiameter,
              height: circleDiameter,
              bottom: -(circleDiameter * hiddenDecimal),
            }}
          >
            {childrenNodes.map((child, index) => {
              const angle = (index / childrenCount) * 2 * Math.PI
              let x = currentRadius * Math.cos(angle)
              const y = currentRadius * Math.sin(angle)
              if (direction === 'rtl') x = -x
              const rotationAngle = (angle * 180) / Math.PI
              const isHovered = hoveredIndex === index
              const isAnyHovered = hoveredIndex !== null

              return (
                <li
                  key={index}
                  ref={index === 0 ? childRef : null}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    zIndex: isHovered ? 100 : 10,
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rotationAngle + 90}deg)`,
                  }}
                >
                  <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && onItemSelect?.(index)}
                    onKeyDown={(e) => {
                      if (disabled) return
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onItemSelect?.(index)
                      }
                    }}
                    onMouseEnter={() => !disabled && setHoveredIndex(index)}
                    onMouseLeave={() => !disabled && setHoveredIndex(null)}
                    onFocus={() => !disabled && setHoveredIndex(index)}
                    onBlur={() => !disabled && setHoveredIndex(null)}
                    className={`pointer-events-auto block cursor-pointer rounded-2xl text-left outline-none transition-all duration-500 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                      isHovered ? '-translate-y-8 scale-125' : 'scale-100'
                    } ${isAnyHovered && !isHovered ? 'opacity-40 blur-[2px] grayscale' : 'opacity-100 blur-0'}`}
                  >
                    {child}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
)

RadialScrollGallery.displayName = 'RadialScrollGallery'

// Tiny local replacement for React.Children.toArray on an already-built array.
function childrenToArray(nodes: ReactNode[]): ReactNode[] {
  return nodes.filter((n) => n !== null && n !== undefined && n !== false)
}
