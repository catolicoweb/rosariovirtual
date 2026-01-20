import { motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type BeadKind = 'normal' | 'large'

type Props = {
  totalBeads: number
  activeIndex: number
  segmentSize: number
  beadSpacing: number
  beadKinds?: BeadKind[]
  viewportWidth?: number
}

const GOLD_SOLID = 'rgb(178, 152, 95)'
const GOLD_LIGHT_BORDER = 'rgba(178, 152, 95, 0.22)'
const BASE_LINE = 'rgba(26, 26, 26, 0.14)'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function BeadTrail({
  totalBeads,
  activeIndex,
  segmentSize,
  beadSpacing,
  beadKinds,
  viewportWidth: viewportWidthProp,
}: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportWidthState, setViewportWidthState] = useState(0)

  const viewportWidth = viewportWidthProp ?? viewportWidthState

  // Measure visible "window" width responsively.
  useLayoutEffect(() => {
    if (viewportWidthProp != null) return
    const el = viewportRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      setViewportWidthState(el.getBoundingClientRect().width)
    })

    ro.observe(el)
    setViewportWidthState(el.getBoundingClientRect().width)

    return () => ro.disconnect()
  }, [viewportWidthProp])

  const prevActive = useRef<number>(activeIndex)
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex > prevActive.current) {
      setPulseIndex(prevActive.current)
    }
    prevActive.current = activeIndex
  }, [activeIndex])

  const startOffset = 28

  const xForIndex = useMemo(() => {
    return (i: number) => {
      return startOffset + i * beadSpacing
    }
  }, [beadSpacing, startOffset])

  const currentSegment = Math.floor(activeIndex / segmentSize)
  const segmentStart = currentSegment * segmentSize
  const segmentEnd = Math.min(totalBeads - 1, segmentStart + segmentSize - 1)

  const lastX = xForIndex(totalBeads - 1)
  const innerWidth = lastX + startOffset

  const targetX = useMemo(() => {
    if (!viewportWidth) return 0

    if (currentSegment === 0) return 0

    const startX = xForIndex(segmentStart)
    const endX = xForIndex(segmentEnd)
    const segmentCenter = (startX + endX) / 2
    const desired = viewportWidth / 2 - segmentCenter

    const minTranslate = viewportWidth - innerWidth
    const maxTranslate = 0

    return clamp(desired, minTranslate, maxTranslate)
  }, [currentSegment, innerWidth, segmentEnd, segmentStart, viewportWidth, xForIndex])

  const firstX = xForIndex(0)
  const lastCenterX = xForIndex(totalBeads - 1)
  const baseLineWidth = Math.max(0, lastCenterX - firstX)

  const progressLineWidth = useMemo(() => {
    if (totalBeads <= 1) return 0
    if (activeIndex <= 0) return 0
    const idx = clamp(activeIndex, 0, totalBeads - 1)
    return Math.max(0, xForIndex(idx) - firstX)
  }, [activeIndex, firstX, totalBeads, xForIndex])

  return (
    <div ref={viewportRef} className="w-full overflow-x-hidden overflow-y-visible">
      <motion.div
        className="relative"
        style={{ width: innerWidth, height: 40 }}
        animate={{ x: targetX }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Track line (base + progressed) */}
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2"
          style={{ left: firstX, width: baseLineWidth, backgroundColor: BASE_LINE }}
        />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2"
          style={{ left: firstX, width: progressLineWidth, backgroundColor: GOLD_SOLID }}
        />

        {/* Segment separators (subtle extra gap marker) */}
        {Array.from({ length: Math.max(0, Math.ceil(totalBeads / segmentSize) - 1) }).map(
          (_, s) => {
            const boundary = (s + 1) * segmentSize
            const left = (xForIndex(boundary - 1) + xForIndex(boundary)) / 2
            return (
              <div
                key={`sep-${s}`}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left,
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  backgroundColor: 'rgba(178, 152, 95, 0.10)',
                }}
                aria-hidden="true"
              />
            )
          },
        )}

        {Array.from({ length: totalBeads }).map((_, idx) => {
          const kind: BeadKind = beadKinds?.[idx] ?? 'normal'
          const baseDiameter = kind === 'large' ? 25 : 20

          const isCompleted = idx < activeIndex
          const isCurrent = idx === activeIndex
          const isFuture = idx > activeIndex

          const diameter = isCurrent ? baseDiameter * 1.4 : baseDiameter

          const activeBorderWidth = Math.max(3, Math.round(diameter * 0.2))
          const borderWidth = isCurrent ? activeBorderWidth : 1
          const haloSize = Math.max(3, Math.round(diameter * 0.12))

          const borderColor = isCompleted || isCurrent ? GOLD_SOLID : GOLD_LIGHT_BORDER
          const backgroundColor = isCompleted ? GOLD_SOLID : 'rgba(245, 240, 230, 1)'

          const boxShadow = isCurrent
            ? [
                `0 0 0 ${haloSize}px rgba(178, 152, 95, 0.18), 0 3px 10px rgba(0,0,0,0.10)`,
                `0 0 0 ${haloSize + 2}px rgba(178, 152, 95, 0.28), 0 3px 10px rgba(0,0,0,0.10)`,
              ]
            : '0 0 0 rgba(0,0,0,0)'

          const shouldPulse = pulseIndex === idx

          return (
            <div
              key={idx}
              className="absolute top-1/2"
              style={{ left: xForIndex(idx), transform: 'translate(-50%, -50%)' }}
              aria-hidden="true"
            >
              <motion.div
                style={{
                  borderStyle: 'solid',
                  borderRadius: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                animate={{
                  width: diameter,
                  height: diameter,
                  borderWidth,
                  borderColor,
                  backgroundColor: isCurrent ? 'rgba(245, 240, 230, 1)' : backgroundColor,
                  boxShadow: isCompleted ? '0 0 0 rgba(0,0,0,0)' : boxShadow,
                  scale: shouldPulse ? [1, 1.08, 1] : 1,
                }}
                transition={{
                  width: { duration: 0.32, ease: 'easeOut' },
                  height: { duration: 0.32, ease: 'easeOut' },
                  borderColor: { duration: 0.22, ease: 'easeOut' },
                  backgroundColor: { duration: 0.22, ease: 'easeOut' },
                  scale: { duration: 0.18, ease: 'easeOut' },
                  boxShadow: isCurrent
                    ? {
                        duration: 2.2,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'mirror',
                      }
                    : { duration: 0.22, ease: 'easeOut' },
                }}
                onAnimationComplete={() => {
                  if (pulseIndex === idx) setPulseIndex(null)
                }}
              >
                {isCompleted ? (
                  <svg
                    width={Math.max(10, Math.round(diameter * 0.52))}
                    height={Math.max(10, Math.round(diameter * 0.52))}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'white', transform: 'translateY(-0.5px)' }}
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <div
                    style={{
                      width: Math.max(4, Math.round(diameter * 0.28)),
                      height: Math.max(4, Math.round(diameter * 0.28)),
                      borderRadius: 9999,
                      backgroundColor: isCurrent
                        ? 'rgba(255, 255, 255, 0.92)'
                        : isFuture
                          ? 'rgba(26, 26, 26, 0.14)'
                          : 'rgba(245, 240, 230, 1)',
                    }}
                  />
                )}
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
