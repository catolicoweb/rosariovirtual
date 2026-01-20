import PrayerCard from './PrayerCard'

type Props = {
  mysteryLabel: string
  onStart: () => void
}

export default function Splash({ mysteryLabel, onStart }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="text-4xl font-medium tracking-wide">Rosario Meditado</div>
        <div className="mt-2 text-lg text-[var(--rv-ink-muted)]">
          <div>Hoy meditamos:</div>
          <div className="font-medium text-[var(--rv-ink)]">{mysteryLabel}</div>
        </div>
      </div>

      <PrayerCard onAdvance={onStart}>
        <div className="h-44 w-full rounded-xl border border-[var(--rv-border)] bg-white/40" />
      </PrayerCard>
    </div>
  )
}
