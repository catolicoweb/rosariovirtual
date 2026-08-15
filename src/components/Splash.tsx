import PrayerCard from './PrayerCard'

type MysteryId = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos'

type Props = {
  mysteryLabel: string
  mysteryDays: string
  coverImg: string
  onStart: () => void
  onSelectMystery: (id: MysteryId) => void
  onStandalonePrayer: (prayerId: 'letanias' | 'salve' | 'divina-misericordia') => void
  isManuallySelected: boolean
  showMeditaciones: boolean
  onToggleMeditaciones: () => void
  idioma: 'es' | 'en'
  onSetIdioma: (id: 'es' | 'en') => void
  latinPrayers: boolean
  onToggleLatinPrayers: () => void
}

export default function Splash({ mysteryLabel, mysteryDays, coverImg, onStart, isManuallySelected, idioma }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center pt-5">
        <div className="text-4xl font-medium tracking-wide">{idioma === 'en' ? 'The Holy Rosary' : 'Rosario Meditado'}</div>
        <div className="mt-2 text-lg text-[var(--rv-ink-muted)]">
          {!isManuallySelected && <div>{idioma === 'en' ? 'Today we meditate:' : 'Hoy meditamos:'}</div>}
          <div className="font-medium text-[25px] text-[#b2985f]">{mysteryLabel}</div>
          {isManuallySelected && <div className="text-[var(--rv-ink-muted)]">{mysteryDays}</div>}
        </div>
      </div>

      <PrayerCard onAdvance={onStart}>
        <img
          src={coverImg}
          alt={mysteryLabel}
          className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
          draggable={false}
        />
      </PrayerCard>
    </div>
  )
}
