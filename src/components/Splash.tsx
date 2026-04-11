import { useState } from 'react'
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
}

export default function Splash({ mysteryLabel, mysteryDays, coverImg, onStart, onSelectMystery, onStandalonePrayer, isManuallySelected }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="absolute -right-2 -top-[26px] p-2 text-[var(--rv-ink-muted)] hover:text-[var(--rv-ink)]"
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {menuOpen ? (
          <div className="absolute -right-2 top-6 z-10 w-80 rounded-xl border border-[var(--rv-border)] bg-white shadow-lg">
            <div className="py-2">
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('gozosos'); setMenuOpen(false) }}
              >
                Misterios Gozosos
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('dolorosos'); setMenuOpen(false) }}
              >
                Misterios Dolorosos
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('gloriosos'); setMenuOpen(false) }}
              >
                Misterios Gloriosos
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('luminosos'); setMenuOpen(false) }}
              >
                Misterios Luminosos
              </button>
              <div className="my-2 border-t border-[var(--rv-border)]" />
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('divina-misericordia'); setMenuOpen(false) }}
              >
                Coronilla de la Divina Misericordia
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('letanias'); setMenuOpen(false) }}
              >
                Letanías a la Virgen
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('salve'); setMenuOpen(false) }}
              >
                Salve
              </button>
            </div>
          </div>
        ) : null}

        <div className="text-center pt-5">
          <div className="text-4xl font-medium tracking-wide">Rosario Meditado</div>
          <div className="mt-2 text-lg text-[var(--rv-ink-muted)]">
            {!isManuallySelected && <div>Hoy meditamos:</div>}
            <div className="font-medium text-[25px] text-[#b2985f]">{mysteryLabel}</div>
            {isManuallySelected && <div className="text-[var(--rv-ink-muted)]">{mysteryDays}</div>}
          </div>
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
