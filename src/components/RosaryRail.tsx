import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type BeadKind = 'normal' | 'large'

type Props = {
  total: number
  completed: number
  currentIndex: number
  beadKinds?: BeadKind[]
}

const GOLD_SOLID = 'rgb(178, 152, 95)'
const GOLD_LIGHT_BORDER = 'rgba(178, 152, 95, 0.22)'
const BASE_LINE = 'rgba(26, 26, 26, 0.14)'

export default function RosaryRail({
  total,
  completed,
  currentIndex,
  beadKinds,
}: Props) {
  const prevCurrent = useRef<number>(currentIndex)
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)

  useEffect(() => {
    if (currentIndex > prevCurrent.current) {
      setPulseIndex(prevCurrent.current)
    }
    prevCurrent.current = currentIndex
  }, [currentIndex])

  const progressPct =
    total <= 1 ? 0 : (Math.max(0, Math.min(currentIndex, total - 1)) / (total - 1)) * 100

  return (
    <div className="relative w-full">
      <div
        className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2"
        style={{ backgroundColor: BASE_LINE }}
      />
      <div
        className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2"
        style={{ width: `${progressPct}%`, backgroundColor: GOLD_SOLID }}
      />
      <div className="relative flex items-center justify-between">
        {Array.from({ length: total }).map((_, idx) => {
          const kind: BeadKind = beadKinds?.[idx] ?? 'normal'
          const baseDiameter = kind === 'large' ? 25 : 20

          const isCompleted = idx < completed
          const isCurrent = idx === currentIndex
          const isFuture = idx > currentIndex

          const diameter = isCurrent ? baseDiameter * 1.4 : baseDiameter

          const activeBorderWidth = Math.max(3, Math.round(diameter * 0.2))
          const borderWidth = isCurrent ? activeBorderWidth : 1

          const haloSize = Math.max(4, Math.round(diameter * 0.24))

          const borderColor = isCompleted || isCurrent ? GOLD_SOLID : GOLD_LIGHT_BORDER
          const backgroundColor = isCompleted ? GOLD_SOLID : 'rgba(245, 240, 230, 1)'
          const boxShadow = isCurrent
            ? [
                `0 0 0 ${haloSize}px rgba(178, 152, 95, 0.22), 0 3px 10px rgba(0,0,0,0.10)`,
                `0 0 0 ${haloSize + 3}px rgba(178, 152, 95, 0.34), 0 3px 10px rgba(0,0,0,0.10)`,
              ]
            : '0 0 0 rgba(0,0,0,0)'

          const shouldPulse = pulseIndex === idx

          return (
            <motion.div
              key={idx}
              animate={{
                width: diameter,
                height: diameter,
                borderWidth,
                borderColor,
                backgroundColor: isCurrent
                  ? 'rgba(245, 240, 230, 1)'
                  : isCompleted
                    ? backgroundColor
                    : 'rgba(245, 240, 230, 1)',
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
                  ? { duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
                  : { duration: 0.22, ease: 'easeOut' },
              }}
              onAnimationComplete={() => {
                if (pulseIndex === idx) setPulseIndex(null)
              }}
              style={{
                borderStyle: 'solid',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              {isCompleted ? (
                <svg
                  width={Math.max(12, Math.round(diameter * 0.6))}
                  height={Math.max(12, Math.round(diameter * 0.6))}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: 'white', transform: 'translateY(-0.5px)' }}
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.6"
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
          )
        })}
      </div>
    </div>
  )
}
