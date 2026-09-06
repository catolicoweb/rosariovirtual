import { useLayoutEffect, useRef, useState } from 'react'

export type BeadState = 'done' | 'active' | 'todo'

type Point = { x: number; y: number }

// Organic, slightly asymmetric egg-shaped loop. Open at the bottom centre so the
// two ends meet at the medal where the pendant tail hangs. getPointAtLength()
// distributes the beads evenly by arc length along whatever curve we draw here.
const LOOP_PATH =
  'M 208 584 C 255 562, 332 468, 326 322 C 320 175, 268 44, 190 34 ' +
  'C 116 44, 58 172, 54 326 C 50 474, 126 560, 172 586'

const LOOP_BEADS = 55 // 5 decades × (1 Our Father + 10 Hail Mary)

const GOLD = '#b2985f'
const GOLD_SOFT = 'rgba(178,152,95,0.35)'
const OUTLINE = 'rgba(26,26,26,0.22)'
const STRING = 'rgba(26,26,26,0.16)'
// Empty beads are filled with a beige a touch darker than the app background so the
// connecting string is hidden behind them instead of showing through.
const EMPTY_FILL = '#ece4d3'

function beadFill(state: BeadState): string {
  if (state === 'done') return GOLD
  if (state === 'active') return GOLD_SOFT
  return EMPTY_FILL
}
function beadStroke(state: BeadState): string {
  return state === 'todo' ? OUTLINE : GOLD
}

// Deterministic tiny offset so the strung beads feel hand-made, not machined.
function jitter(i: number): Point {
  const s = Math.sin(i * 12.9898) * 43758.5453
  const t = Math.sin(i * 78.233) * 12345.6789
  return { x: ((s - Math.floor(s)) - 0.5) * 2.4, y: ((t - Math.floor(t)) - 0.5) * 2.4 }
}

export function RosaryProgress({
  loop,
  medal,
  tail,
  cross,
}: {
  loop: BeadState[] // length 55, index 0 = 1st Our Father near the medal
  medal: BeadState
  tail: BeadState[] // 4 beads top→bottom: [small, small, small, large Our Father]
  cross: BeadState
}) {
  const pathRef = useRef<SVGPathElement | null>(null)
  const [points, setPoints] = useState<Point[]>([])

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const pts: Point[] = []
    for (let i = 0; i < LOOP_BEADS; i++) {
      const p = path.getPointAtLength((len * (i + 0.5)) / LOOP_BEADS)
      const j = jitter(i)
      pts.push({ x: p.x + j.x, y: p.y + j.y })
    }
    setPoints(pts)
  }, [])

  const medalPt: Point = { x: 190, y: 604 }
  // Pendant tail hanging straight down from the medal, then the cross.
  const tailPts: Point[] = [
    { x: 190, y: 648 }, // small
    { x: 190, y: 684 }, // small
    { x: 190, y: 720 }, // small
    { x: 190, y: 762 }, // large Our Father
  ]
  const crossTop = 792

  return (
    <svg viewBox="0 0 380 872" className="h-auto w-full" role="img" aria-label="Rosario">
      {/* String — loop */}
      <path ref={pathRef} d={LOOP_PATH} fill="none" stroke={STRING} strokeWidth={1.4} />
      {/* String — medal to tail to cross */}
      <path
        d={`M ${medalPt.x} ${medalPt.y} L ${tailPts[0].x} ${tailPts[0].y} L ${tailPts[1].x} ${tailPts[1].y} L ${tailPts[2].x} ${tailPts[2].y} L ${tailPts[3].x} ${tailPts[3].y} L ${190} ${crossTop}`}
        fill="none"
        stroke={STRING}
        strokeWidth={1.4}
      />

      {/* Loop beads */}
      {points.map((p, i) => {
        const isOurFather = i % 11 === 0
        const r = isOurFather ? 9.5 : 6.5
        const state = loop[i] ?? 'todo'
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={r}
            fill={beadFill(state)}
            stroke={beadStroke(state)}
            strokeWidth={1.6}
            style={{ transition: 'fill 300ms ease, stroke 300ms ease' }}
          />
        )
      })}

      {/* Medal */}
      <circle
        cx={medalPt.x}
        cy={medalPt.y}
        r={11}
        fill={beadFill(medal)}
        stroke={beadStroke(medal)}
        strokeWidth={1.8}
        style={{ transition: 'fill 300ms ease, stroke 300ms ease' }}
      />

      {/* Tail beads */}
      {tailPts.map((p, i) => {
        const isOurFather = i === 3
        const state = tail[i] ?? 'todo'
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isOurFather ? 9.5 : 6.5}
            fill={beadFill(state)}
            stroke={beadStroke(state)}
            strokeWidth={1.6}
            style={{ transition: 'fill 300ms ease, stroke 300ms ease' }}
          />
        )
      })}

      {/* Cross — single outline so overlapping arms never show internal lines */}
      {(() => {
        const cx = 190
        const w = 11 // half thickness of each arm
        const top = crossTop
        const bottom = crossTop + 74
        const armTop = crossTop + 30 - w
        const armBottom = crossTop + 30 + w
        const left = cx - 30
        const right = cx + 30
        const l = cx - w
        const r = cx + w
        const d = [
          `M ${l} ${top}`,
          `L ${r} ${top}`,
          `L ${r} ${armTop}`,
          `L ${right} ${armTop}`,
          `L ${right} ${armBottom}`,
          `L ${r} ${armBottom}`,
          `L ${r} ${bottom}`,
          `L ${l} ${bottom}`,
          `L ${l} ${armBottom}`,
          `L ${left} ${armBottom}`,
          `L ${left} ${armTop}`,
          `L ${l} ${armTop}`,
          'Z',
        ].join(' ')
        return (
          <path
            d={d}
            fill={cross === 'todo' ? EMPTY_FILL : GOLD}
            stroke={cross === 'todo' ? OUTLINE : GOLD}
            strokeWidth={1.6}
            strokeLinejoin="round"
            style={{ transition: 'fill 300ms ease, stroke 300ms ease' }}
          />
        )
      })()}
    </svg>
  )
}
