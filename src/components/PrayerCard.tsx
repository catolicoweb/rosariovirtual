import type { ReactNode } from 'react'

type Props = {
  title?: string
  subtitle?: string
  mark?: ReactNode
  children: ReactNode
  onAdvance?: () => void
  menuSlot?: ReactNode
}

export default function PrayerCard({ title, subtitle, mark, children, onAdvance, menuSlot }: Props) {
  return (
    <div
      className="relative w-full rounded-2xl border border-[var(--rv-border)] bg-white/60 px-6 py-7 shadow-sm backdrop-blur-sm"
      onClick={onAdvance}
      role={onAdvance ? 'button' : undefined}
      tabIndex={onAdvance ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onAdvance) return
        if (e.key === 'Enter' || e.key === ' ') onAdvance()
      }}
    >
      {menuSlot}
      <div className="flex flex-col gap-4">
        {mark ? <div className="flex justify-center">{mark}</div> : null}
        {title ? (
          <h2 className="text-center text-2xl font-medium tracking-wide">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="text-center text-[var(--rv-rubric)]">{subtitle}</p>
        ) : null}
        <div className="flex flex-col gap-4 leading-relaxed text-[var(--rv-ink)]" style={{ fontSize: 'var(--rv-prayer-size)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
