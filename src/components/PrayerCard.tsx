import type { ReactNode } from 'react'

type Props = {
  title?: string
  subtitle?: string
  mark?: ReactNode
  children: ReactNode
  onAdvance?: () => void
}

export default function PrayerCard({ title, subtitle, mark, children, onAdvance }: Props) {
  return (
    <div
      className="w-full rounded-2xl border border-[var(--rv-border)] bg-white/60 px-6 py-7 shadow-sm backdrop-blur-sm"
      onClick={onAdvance}
      role={onAdvance ? 'button' : undefined}
      tabIndex={onAdvance ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onAdvance) return
        if (e.key === 'Enter' || e.key === ' ') onAdvance()
      }}
    >
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
        <div className="flex flex-col gap-4 text-[1.12rem] leading-relaxed text-[var(--rv-ink)]">
          {children}
        </div>
      </div>
    </div>
  )
}
