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
  showMeditaciones: boolean
  onToggleMeditaciones: () => void
  idioma: 'es' | 'en'
  onSetIdioma: (id: 'es' | 'en') => void
  latinPrayers: boolean
  onToggleLatinPrayers: () => void
}

export default function Splash({ mysteryLabel, mysteryDays, coverImg, onStart, onSelectMystery, onStandalonePrayer, isManuallySelected, showMeditaciones, onToggleMeditaciones, idioma, onSetIdioma, latinPrayers, onToggleLatinPrayers }: Props) {
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
                {idioma === 'en' ? 'Joyful Mysteries' : 'Misterios Gozosos'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('dolorosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Sorrowful Mysteries' : 'Misterios Dolorosos'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('gloriosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Glorious Mysteries' : 'Misterios Gloriosos'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onSelectMystery('luminosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Luminous Mysteries' : 'Misterios Luminosos'}
              </button>
              <div className="my-2 border-t border-[var(--rv-border)]" />
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('divina-misericordia'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Chaplet of Divine Mercy' : 'Coronilla de la Divina Misericordia'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('letanias'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Litany of the Virgin' : 'Letanías a la Virgen'}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-[18px] hover:bg-[rgba(178,152,95,0.1)]"
                onClick={() => { onStandalonePrayer('salve'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Hail Holy Queen' : 'Salve'}
              </button>
              <div className="my-2 border-t border-[var(--rv-border)]" />
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-[18px]">{idioma === 'en' ? 'Meditations' : 'Meditaciones'}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showMeditaciones}
                  onClick={(e) => { e.stopPropagation(); onToggleMeditaciones() }}
                  className={
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ' +
                    (showMeditaciones ? 'bg-[#b2985f]' : 'bg-[rgba(26,26,26,0.2)]')
                  }
                >
                  <span
                    className={
                      'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ' +
                      (showMeditaciones ? 'translate-x-6' : 'translate-x-1')
                    }
                  />
                </button>
              </div>
              <div className="my-2 border-t border-[var(--rv-border)]" />
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-[18px]">{idioma === 'en' ? 'Language' : 'Idioma'}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSetIdioma('es') }}
                    className={
                      'rounded-md px-2 py-1 text-2xl transition-opacity ' +
                      (idioma === 'es' ? 'ring-2 ring-[#b2985f] opacity-100' : 'opacity-40')
                    }
                    aria-label="Español"
                  >
                    🇪🇸
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSetIdioma('en') }}
                    className={
                      'rounded-md px-2 py-1 text-2xl transition-opacity ' +
                      (idioma === 'en' ? 'ring-2 ring-[#b2985f] opacity-100' : 'opacity-40')
                    }
                    aria-label="English"
                  >
                    🇬🇧
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onToggleLatinPrayers() }}
                    className={
                      'rounded-md px-2 py-1 text-2xl transition-opacity ' +
                      (latinPrayers ? 'ring-2 ring-[#b2985f] opacity-100' : 'opacity-40')
                    }
                    aria-label="Latín"
                  >
                    🇻🇦
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-center pt-5">
          <div className="text-4xl font-medium tracking-wide">{idioma === 'en' ? 'The Holy Rosary' : 'Rosario Meditado'}</div>
          <div className="mt-2 text-lg text-[var(--rv-ink-muted)]">
            {!isManuallySelected && <div>{idioma === 'en' ? 'Today we meditate:' : 'Hoy meditamos:'}</div>}
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
