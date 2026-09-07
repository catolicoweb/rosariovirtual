import { useEffect, useMemo } from 'react'

export type BeadState = 'done' | 'active' | 'todo'

type Pt = { x: number; y: number }

const GOLD = '#b2985f'
const OUTLINE = 'rgba(178,152,95,0.5)'
const STRING = 'rgba(178,152,95,0.38)'
// Empty beads take a beige a touch darker than the app background so the string
// is hidden behind them instead of showing through.
const EMPTY_FILL = '#ece4d3'

function beadFill(state: BeadState): string {
  return state === 'todo' ? EMPTY_FILL : GOLD
}
function beadStroke(state: BeadState): string {
  return state === 'todo' ? OUTLINE : GOLD
}

// ── Parametric geometry, computed in JS and cached per wobble ────────────────
function buildGeometry(wobble: number) {
  const k = wobble
  const rx = 148
  const ry = 202
  const N = 1400

  // Closed, gently rippling loop sampled from the bottom point (θ = π/2)
  const raw: Pt[] = []
  for (let i = 0; i < N; i++) {
    const theta = Math.PI / 2 + (i / N) * Math.PI * 2
    const w =
      1 +
      k * (0.055 * Math.sin(3 * theta + 0.7) + 0.03 * Math.sin(5 * theta + 2.1) + 0.022 * Math.cos(2 * theta - 0.4))
    let x = rx * w * Math.cos(theta) + k * 11 * Math.sin(2 * theta)
    const y = ry * w * Math.sin(theta)
    x += 0.07 * y // shear so it hangs naturally
    raw.push({ x, y })
  }

  // Loop path: join every 12th point, then close
  let d = ''
  for (let i = 0; i < N; i += 12) {
    d += `${i === 0 ? 'M' : 'L'} ${raw[i].x.toFixed(2)} ${raw[i].y.toFixed(2)} `
  }
  d += 'Z'

  // Cumulative arc length over the full-resolution closed curve
  const cum: number[] = new Array(N + 1)
  cum[0] = 0
  for (let i = 1; i <= N; i++) {
    const a = raw[i % N]
    const b = raw[i - 1]
    cum[i] = cum[i - 1] + Math.hypot(a.x - b.x, a.y - b.y)
  }
  const L = cum[N]
  const at = (s: number): Pt => {
    s = ((s % L) + L) % L
    let lo = 0
    let hi = N
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (cum[mid] < s) lo = mid + 1
      else hi = mid
    }
    const i1 = Math.max(1, lo)
    const i0 = i1 - 1
    const seg = cum[i1] - cum[i0] || 1
    const t = (s - cum[i0]) / seg
    const a = raw[i0 % N]
    const b = raw[i1 % N]
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
  }

  // 55 loop beads; every 11th (index % 11 === 0) is an Our Father (larger)
  const loopBeads: Pt[] = []
  for (let bi = 0; bi < 55; bi++) loopBeads.push(at(((bi + 0.62) * L) / 55))

  // Pendant: cubic Bézier from the loop's bottom point
  const P0 = raw[0]
  const C1 = { x: P0.x + 30 * k, y: P0.y + 86 }
  const C2 = { x: P0.x - 22 * k, y: P0.y + 182 }
  const P3 = { x: P0.x + 9 * k, y: P0.y + 292 }
  const cubic = (t: number): Pt => {
    const mt = 1 - t
    return {
      x: mt * mt * mt * P0.x + 3 * mt * mt * t * C1.x + 3 * mt * t * t * C2.x + t * t * t * P3.x,
      y: mt * mt * mt * P0.y + 3 * mt * mt * t * C1.y + 3 * mt * t * t * C2.y + t * t * t * P3.y,
    }
  }
  const pend: Pt[] = []
  for (let i = 0; i <= 400; i++) pend.push(cubic(i / 400))
  const pcum: number[] = [0]
  for (let i = 1; i < pend.length; i++) pcum[i] = pcum[i - 1] + Math.hypot(pend[i].x - pend[i - 1].x, pend[i].y - pend[i - 1].y)
  const PL = pcum[pcum.length - 1]
  const atFrac = (f: number): Pt => {
    const target = f * PL
    let i = 1
    while (i < pcum.length && pcum[i] < target) i++
    const i0 = i - 1
    const i1 = Math.min(i, pcum.length - 1)
    const seg = pcum[i1] - pcum[i0] || 1
    const t = (target - pcum[i0]) / seg
    return { x: pend[i0].x + (pend[i1].x - pend[i0].x) * t, y: pend[i0].y + (pend[i1].y - pend[i0].y) * t }
  }

  const medal = atFrac(0.06)
  const ave = [atFrac(0.3), atFrac(0.41), atFrac(0.52)]
  const pnPend = atFrac(0.72)
  const crossCenter = atFrac(0.955)
  const cA = atFrac(0.945)
  const cB = atFrac(0.965)
  const crossAngle = (Math.atan2(cB.y - cA.y, cB.x - cA.x) * 180) / Math.PI - 90

  const pendD = `M ${P0.x.toFixed(2)} ${P0.y.toFixed(2)} C ${C1.x.toFixed(2)} ${C1.y.toFixed(2)}, ${C2.x.toFixed(2)} ${C2.y.toFixed(2)}, ${P3.x.toFixed(2)} ${P3.y.toFixed(2)}`

  // Highest point of the loop — the sway pivot
  let top = raw[0]
  for (const p of raw) if (p.y < top.y) top = p

  // Bounding box (+ cross extent) for the viewBox
  const all: Pt[] = [...loopBeads, ...pend, medal, ...ave, pnPend, crossCenter]
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of all) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
  }
  maxY += 46 // room for the cross below its centre
  const pad = 34
  const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + 2 * pad).toFixed(1)} ${(maxY - minY + 2 * pad).toFixed(1)}`

  return { d, pendD, loopBeads, medal, ave, pnPend, crossCenter, crossAngle, top, viewBox }
}

function Bead({ p, r, state }: { p: Pt; r: number; state: BeadState }) {
  return (
    <>
      {state === 'active' ? (
        <circle className="rv-bead-halo" cx={p.x} cy={p.y} r={r * 1.9} fill={GOLD} />
      ) : null}
      <circle
        cx={p.x}
        cy={p.y}
        r={r}
        fill={beadFill(state)}
        stroke={beadStroke(state)}
        strokeWidth={1.5}
        style={{ transition: 'fill 300ms ease, stroke 300ms ease' }}
      />
    </>
  )
}

export function RosaryProgress({
  loop,
  medal,
  tail,
  cross,
  centerEyebrow,
  centerLabel,
  wobble = 1.15,
  onAdvance,
  onBack,
}: {
  loop: BeadState[] // 55, index 0 = 1st Our Father near the medal
  medal: BeadState
  tail: BeadState[] // 4 beads top→bottom: [ave, ave, ave, Our Father]
  cross: BeadState
  centerEyebrow?: string
  centerLabel?: string
  wobble?: number
  onAdvance?: () => void
  onBack?: () => void
}) {
  const g = useMemo(() => buildGeometry(wobble), [wobble])

  // Advance/back with keyboard (click is wired on the <svg>)
  useEffect(() => {
    if (!onAdvance && !onBack) return
    const handler = (e: KeyboardEvent) => {
      // Desktop only — the layout that mounts this graphic is hidden on mobile
      if (!window.matchMedia('(min-width: 768px)').matches) return
      const el = document.activeElement
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON')) return
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        onAdvance?.()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        onBack?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onAdvance, onBack])

  const crossFill = cross === 'todo' ? EMPTY_FILL : GOLD
  const crossStroke = cross === 'todo' ? OUTLINE : GOLD

  return (
    <svg
      viewBox={g.viewBox}
      className="h-auto w-full"
      role="img"
      aria-label="Rosario"
      onClick={onAdvance}
      style={onAdvance ? { cursor: 'pointer' } : undefined}
    >
      <g
        className="rv-rosary-sway"
        style={{ transformOrigin: `${g.top.x}px ${g.top.y}px` }}
      >
        {/* Strings */}
        <path d={g.d} fill="none" stroke={STRING} strokeWidth={1.1} />
        <path d={g.pendD} fill="none" stroke={STRING} strokeWidth={1.1} />

        {/* Loop beads */}
        {g.loopBeads.map((p, i) => (
          <Bead key={i} p={p} r={i % 11 === 0 ? 8 : 5.5} state={loop[i] ?? 'todo'} />
        ))}

        {/* Pendant beads */}
        <Bead p={g.medal} r={7} state={medal} />
        <Bead p={g.ave[0]} r={5} state={tail[0] ?? 'todo'} />
        <Bead p={g.ave[1]} r={5} state={tail[1] ?? 'todo'} />
        <Bead p={g.ave[2]} r={5} state={tail[2] ?? 'todo'} />
        <Bead p={g.pnPend} r={8} state={tail[3] ?? 'todo'} />

        {/* Cross — two rounded rects, rotated to follow the pendant tangent */}
        <g transform={`translate(${g.crossCenter.x} ${g.crossCenter.y}) rotate(${g.crossAngle})`}>
          <rect x={-6} y={-16} width={12} height={54} rx={3} fill={crossFill} stroke={crossStroke} strokeWidth={1.5} />
          <rect x={-19} y={-4} width={38} height={13} rx={3} fill={crossFill} stroke={crossStroke} strokeWidth={1.5} />
        </g>
      </g>

      {/* Centre label — static, inside the loop */}
      {centerEyebrow || centerLabel ? (
        <foreignObject x={-130} y={-72} width={260} height={170}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '8px',
              padding: '0 8px',
            }}
          >
            {centerEyebrow ? (
              <div style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', lineHeight: 1.15, color: GOLD }}>
                {centerEyebrow.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            ) : null}
            {centerLabel ? (
              <div style={{ fontSize: '27px', lineHeight: 1.2, color: 'var(--rv-ink)' }}>{centerLabel}</div>
            ) : null}
          </div>
        </foreignObject>
      ) : null}
    </svg>
  )
}
