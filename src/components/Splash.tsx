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

function Toggle({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className={
        'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ' +
        (checked ? 'bg-[#b2985f]' : 'bg-[rgba(26,26,26,0.2)]')
      }
    >
      <span
        className={
          'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ' +
          (checked ? 'translate-x-6' : 'translate-x-1')
        }
      />
    </button>
  )
}

export default function Splash({ mysteryLabel, mysteryDays, coverImg, onStart, onSelectMystery, onStandalonePrayer, isManuallySelected, showMeditaciones, onToggleMeditaciones, idioma, onSetIdioma, latinPrayers, onToggleLatinPrayers }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="absolute -right-2 -top-[26px] p-2 text-[var(--rv-ink-muted)] hover:text-[var(--rv-ink)]"
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {menuOpen ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--rv-border)] px-5 pb-4 pt-10">
              <span className="text-xl font-semibold text-[var(--rv-ink)]">
                {idioma === 'en' ? 'Menu' : 'Menú'}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-mr-2 p-2 text-[var(--rv-ink-muted)]"
                aria-label={idioma === 'en' ? 'Close' : 'Cerrar'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Mysteries */}
              <div className="px-5 pb-1 pt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--rv-ink-muted)]">
                {idioma === 'en' ? 'Mysteries' : 'Misterios'}
              </div>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onSelectMystery('gozosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Joyful Mysteries' : 'Misterios Gozosos'}
              </button>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onSelectMystery('dolorosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Sorrowful Mysteries' : 'Misterios Dolorosos'}
              </button>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onSelectMystery('gloriosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Glorious Mysteries' : 'Misterios Gloriosos'}
              </button>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onSelectMystery('luminosos'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Luminous Mysteries' : 'Misterios Luminosos'}
              </button>

              <div className="mx-5 my-3 border-t border-[var(--rv-border)]" />

              {/* Standalone prayers */}
              <div className="px-5 pb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--rv-ink-muted)]">
                {idioma === 'en' ? 'Prayers' : 'Oraciones'}
              </div>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onStandalonePrayer('divina-misericordia'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Chaplet of Divine Mercy' : 'Coronilla de la Divina Misericordia'}
              </button>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onStandalonePrayer('letanias'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Litany of the Virgin' : 'Letanías a la Virgen'}
              </button>
              <button
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => { onStandalonePrayer('salve'); setMenuOpen(false) }}
              >
                {idioma === 'en' ? 'Hail Holy Queen' : 'Salve'}
              </button>

              <div className="mx-5 my-3 border-t border-[var(--rv-border)]" />

              {/* Settings */}
              <div className="px-5 pb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--rv-ink-muted)]">
                {idioma === 'en' ? 'Settings' : 'Configuración'}
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[18px]">{idioma === 'en' ? 'Meditations' : 'Meditaciones'}</span>
                <Toggle checked={showMeditaciones} onToggle={onToggleMeditaciones} />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[18px]">{idioma === 'en' ? 'Language' : 'Idioma'}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSetIdioma('es') }}
                    className={
                      'rounded-md px-2 py-1 text-2xl ' +
                      (idioma === 'es' ? 'ring-2 ring-[#b2985f] bg-[rgba(178,152,95,0.10)]' : '')
                    }
                    aria-label="Español"
                  >
                    🇪🇸
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSetIdioma('en') }}
                    className={
                      'rounded-md px-2 py-1 text-2xl ' +
                      (idioma === 'en' ? 'ring-2 ring-[#b2985f] bg-[rgba(178,152,95,0.10)]' : '')
                    }
                    aria-label="English"
                  >
                    🇬🇧
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[18px]">{idioma === 'en' ? 'Latin prayers' : 'Oraciones en latín'}</span>
                <Toggle checked={latinPrayers} onToggle={onToggleLatinPrayers} />
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
