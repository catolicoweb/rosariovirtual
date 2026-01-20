import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import AppShell from './components/AppShell'
import BeadTrail from './components/BeadTrail'
import PrayerCard from './components/PrayerCard'
import RosaryRail from './components/RosaryRail'
import Splash from './components/Splash'
import cruzPng from './assets/cruz.png'
import resurrecionJpg from './assets/Resurrecion.jpg'
import ascencionJpg from './assets/ascencion.jpg'
import pentecostesJpg from './assets/pentecostes.jpg'
import asuncionVirgenJpg from './assets/asuncion-virgen.jpg'
import coronacionVirgenJpg from './assets/coronacion-virgen.jpg'
import banderaVaticanoJpg from './assets/bandera-vaticano.jpg'
import { getMysteryOfDay } from './data/mystery'
import { steps } from './data/prayerSteps'
import { AVE_MARIA_TEXT } from './data/intencionesDelPapa'

const PRIMER_MISTERIO_MEDITACIONES = [
  '“En verdad os digo, quedaréis tristes, pero vuestra tristeza se volverá en gozo.”',
  '“Volveré de nuevo, y se alegrará vuestro corazón, y nadie os quitará vuestra alegría.”',
  '“Muy de mañana, las mujeres fueron al sepulcro, con aromas que habían preparado.”',
  '“Un ángel bajó del cielo, e hizo rodar la piedra del sepulcro y se sentó sobre ella.”',
  '“Sé que buscáis a Jesús, el Crucificado: no está aquí.”',
  '“Ha resucitado de entre los muertos. Venid y ved el lugar en donde lo habían colocado.”',
  '“Él os precederá en Galilea; allí lo veréis.”',
  '“Ellas abandonaron el sepulcro llenas de gozo.”',
  '“Yo soy la resurrección y la vida. El que cree en mí, aunque haya muerto, vivirá.”',
  '“El que vive y cree en mí, no morirá para siempre.”',
]

const SEGUNDO_MISTERIO_MEDITACIONES = [
  '“Jesús llevó a sus discípulos hasta cerca de Betania, y levantando sus manos, los bendijo.”',
  '“Les dijo: Me ha sido dado todo el poder en el cielo y en la tierra.”',
  '“Id a todas las naciones y haced discípulos.”',
  '“Bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.”',
  '“Enseñándoles a cumplir todo lo que os he mandado.”',
  '“El que crea y se bautice se salvará.”',
  '“El que no crea será condenado.”',
  '“Yo estaré con vosotros hasta el fin del mundo.”',
  '“Dicho esto, fue levantado en presencia de ellos, y una nube lo ocultó a sus ojos.”',
  '“(Meditación 10)”',
]

const TERCER_MISTERIO_MEDITACIONES = [
  '“El día de Pentecostés, se encontraban todos juntos en un mismo lugar.”',
  '“De repente, vino del cielo un ruido, como una ráfaga de viento impetuoso, que llenó toda la casa.”',
  '“Vieron aparecer unas como lenguas de fuego, que se posaron sobre cada uno de ellos.”',
  '“Todos se llenaron del Espíritu Santo, y hablaban de las maravillas de Dios.”',
  '“Había en Jerusalén muchos hombres piadosos, venidos de todas las naciones.”',
  '“Pedro, presentándose con los Once, levantó la voz.”',
  '“Les dijo: Arrepentíos y hacéos bautizar, y recibiréis el don del Espíritu Santo.”',
  '“Los que acogieron sus palabras se hicieron bautizar, y aquel día se juntaron unos tres mil.”',
  '“(Meditación 9)”',
  '“(Meditación 10)”',
]

const CUARTO_MISTERIO_MEDITACIONES = [
  '“Levántate, amada mía, hermosa mía, y ven.”',
  '“¿Quién es esta que surge como aurora, hermosa como la luna y resplandeciente como el sol?”',
  '“Muéstrame tu semblante y déjame oír tu voz.”',
  '“Desbordo de gozo con el Señor, porque me ha vestido con un traje de gala.”',
  '“Venid a ver las obras del Señor, las maravillas que hace en la tierra.”',
  '“Ya no te llamarán abandonada, te llamarán favorita, porque el Señor te prefiere a ti.”',
  '“Me alegro con mi Dios: me ha envuelto con un manto de triunfo.”',
  '“Bendita eres, hija del Altísimo, más que todas las mujeres de la tierra.”',
  '“(Meditación 9)”',
  '“(Meditación 10)”',
]

const QUINTO_MISTERIO_MEDITACIONES = [
  '“Yo haré derivar hacia ella, como un río, la paz.”',
  '“Ha aparecido, en el cielo, una señal prodigiosa: una mujer, vestida de sol, y la luna bajo sus pies.”',
  '“El que siga sus caminos encontrará el favor de Dios.”',
  '“Jamás se ocultará, y todos los hombres alabarán el poder de Dios.”',
  '“Te doy las gracias de todo corazón, proclamando tus maravillas.”',
  '“Abridme las puertas del triunfo, y entraré para dar gracias a Dios.”',
  '“Cantaré a mi Dios un cántico nuevo: Tú eres grande y glorioso.”',
  '“Gloria a Dios para siempre, goce el Señor con sus obras.”',
  '“En Caná enseñó María el camino para conseguir la gracia: Haced lo que Él os diga.”',
  '“Salve, Madre de Misericordia, protégenos contra todo mal.”',
]

type Screen =
  | { kind: 'splash' }
  | { kind: 'step'; stepIndex: number; sequenceIndex: number }
  | { kind: 'done' }

export default function App() {
  const mystery = useMemo(() => getMysteryOfDay(), [])

  const activeSteps = useMemo(() => {
    return steps.filter((s) => {
      if (s.id === 'segundo-misterio') return mystery.id === 'gloriosos'
      if (s.id === 'tercer-misterio') return mystery.id === 'gloriosos'
      if (s.id === 'cuarto-misterio') return mystery.id === 'gloriosos'
      if (s.id === 'quinto-misterio') return mystery.id === 'gloriosos'
      if (s.id === 'la-salve') return mystery.id === 'gloriosos'
      if (s.id === 'antes-de-finalizar') return mystery.id === 'gloriosos'
      if (s.id === 'letanias') return mystery.id === 'gloriosos'
      if (s.id === 'cierre-final') return mystery.id === 'gloriosos'
      return true
    })
  }, [mystery.id])

  const [screen, setScreen] = useState<Screen>({ kind: 'splash' })
  const [isFadingOut, setIsFadingOut] = useState(false)
  const pendingRef = useRef<Screen | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [showAveMariaFull, setShowAveMariaFull] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const raw = window.localStorage.getItem('rv_ave_maria_expanded')
      if (raw === '1') return true
      if (raw === '0') return false
      return false
    } catch {
      return false
    }
  })
  const [showPadreNuestroFull, setShowPadreNuestroFull] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const raw = window.localStorage.getItem('rv_padre_nuestro_expanded')
      if (raw === '1') return true
      if (raw === '0') return false
      return false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('rv_ave_maria_expanded', showAveMariaFull ? '1' : '0')
    } catch {
      return
    }
  }, [showAveMariaFull])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'rv_padre_nuestro_expanded',
        showPadreNuestroFull ? '1' : '0'
      )
    } catch {
      return
    }
  }, [showPadreNuestroFull])

  const beadsModel = (() => {
    if (screen.kind !== 'step') return null
    const step = activeSteps[screen.stepIndex]
    if (!step) return null

    if (step.kind === 'sequence') {
      return {
        total: step.sequence.items.length,
        completed: screen.sequenceIndex,
        currentIndex: screen.sequenceIndex,
        beadKinds: step.sequence.items.map((i) => i.bead ?? 'normal'),
      }
    }

    return null
  })()

  function CrossIcon({
    glow,
    size,
  }: {
    glow: boolean
    size: 'large' | 'small' | 'medium'
  }) {
    const dims =
      size === 'large'
        ? { wrap: 'h-28', img: 'h-24' }
        : size === 'small'
          ? { wrap: 'h-12', img: 'h-10' }
          : { wrap: 'h-16', img: 'h-14' }

    return (
      <div
        className={
          `flex w-full items-center justify-center ${dims.wrap}` +
          (glow ? ' rv-cross-glow' : '')
        }
        aria-hidden="true"
      >
        <img
          src={cruzPng}
          alt=""
          className={`${dims.img} w-auto opacity-90`}
          draggable={false}
        />
      </div>
    )
  }

  function computeNext(prev: Screen): Screen {
    if (prev.kind === 'splash') return { kind: 'step', stepIndex: 0, sequenceIndex: 0 }
    if (prev.kind === 'done') return prev

    const step = activeSteps[prev.stepIndex]
    if (!step) return { kind: 'done' }

    if (step.kind === 'sequence') {
      const nextSequenceIndex = prev.sequenceIndex + 1
      if (nextSequenceIndex < step.sequence.items.length) {
        return { kind: 'step', stepIndex: prev.stepIndex, sequenceIndex: nextSequenceIndex }
      }
      const nextStepIndex = prev.stepIndex + 1
      if (nextStepIndex >= activeSteps.length) return { kind: 'done' }
      return { kind: 'step', stepIndex: nextStepIndex, sequenceIndex: 0 }
    }

    const nextStepIndex = prev.stepIndex + 1
    if (nextStepIndex >= activeSteps.length) return { kind: 'done' }
    return { kind: 'step', stepIndex: nextStepIndex, sequenceIndex: 0 }
  }

  function computePrev(prev: Screen): Screen {
    if (prev.kind === 'splash') return prev
    if (prev.kind === 'done') return { kind: 'step', stepIndex: activeSteps.length - 1, sequenceIndex: 0 }

    const step = activeSteps[prev.stepIndex]
    if (!step) return { kind: 'splash' }

    if (step.kind === 'sequence' && prev.sequenceIndex > 0) {
      return { kind: 'step', stepIndex: prev.stepIndex, sequenceIndex: prev.sequenceIndex - 1 }
    }

    const prevStepIndex = prev.stepIndex - 1
    if (prevStepIndex < 0) return { kind: 'splash' }

    const prevStep = activeSteps[prevStepIndex]
    if (!prevStep) return { kind: 'splash' }

    if (prevStep.kind === 'sequence') {
      return {
        kind: 'step',
        stepIndex: prevStepIndex,
        sequenceIndex: Math.max(0, prevStep.sequence.items.length - 1),
      }
    }

    return { kind: 'step', stepIndex: prevStepIndex, sequenceIndex: 0 }
  }

  function navigate(next: Screen) {
    if (pendingRef.current || isFadingOut) return

    pendingRef.current = next
    setIsFadingOut(true)

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      const target = pendingRef.current
      pendingRef.current = null
      setScreen(target ?? next)
      setIsFadingOut(false)
    }, 300)
  }

  function advance() {
    navigate(computeNext(screen))
  }

  function restart() {
    pendingRef.current = null
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setIsFadingOut(false)
    setScreen({ kind: 'splash' })
  }

  function stepIndexById(id: string) {
    return activeSteps.findIndex((s) => s.id === id)
  }

  function goToStepId(id: string) {
    const idx = stepIndexById(id)
    if (idx < 0) return
    navigate({ kind: 'step', stepIndex: idx, sequenceIndex: 0 })
  }

  function back() {
    navigate(computePrev(screen))
  }

  const bottomAction = (() => {
    if (screen.kind === 'splash') return { label: 'Iniciar', onClick: advance }
    if (screen.kind === 'done') return { label: 'Volver al inicio', onClick: restart }
    return { label: 'Siguiente', onClick: advance }
  })()

  return (
    <AppShell>
      <motion.div
        key={
          screen.kind === 'step'
            ? `step-${screen.stepIndex}-${screen.sequenceIndex}`
            : screen.kind
        }
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isFadingOut ? 0 : 1, y: isFadingOut ? -8 : 0 }}
        transition={{ duration: isFadingOut ? 0.3 : 0.2, ease: 'easeOut' }}
        className="flex flex-col gap-6"
      >
          {screen.kind === 'splash' ? (
            <Splash
              mysteryLabel={mystery.label}
              onStart={advance}
            />
          ) : null}

          {screen.kind === 'step' ? (
            <>
              {(() => {
                const step = activeSteps[screen.stepIndex]
                if (!step) return null

                if (step.kind === 'text') {
                  const showCrossGlow = step.id === 'credo'
                  const crossSize =
                    step.id === 'inicio' ||
                    step.id === 'credo' ||
                    step.id === 'la-salve' ||
                    step.id === 'cierre-final'
                      ? 'large'
                      : 'small'
                  const crossMark =
                    step.id === 'inicio' ||
                    step.id === 'credo' ||
                    step.id === 'la-salve' ||
                    step.id === 'cierre-final' ? (
                      <CrossIcon glow={showCrossGlow} size={crossSize} />
                    ) : undefined

                  const isAntesDeFinalizar = step.id === 'antes-de-finalizar'
                  const isLetanias = step.id === 'letanias'
                  const isCierreFinal = step.id === 'cierre-final'

                  return (
                    <>
                      <PrayerCard
                        title={step.title}
                        mark={crossMark}
                        onAdvance={isAntesDeFinalizar || isLetanias || isCierreFinal ? undefined : advance}
                      >
                      {isAntesDeFinalizar ? (
                        <>
                          <button
                            type="button"
                            className="mt-2 flex w-full items-center justify-between rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3 text-left"
                            onClick={(e) => {
                              e.stopPropagation()
                              goToStepId('letanias')
                            }}
                          >
                            <span className="text-[0.98rem] text-[rgba(26,26,26,0.78)]">
                              Letanias a Virgen Maria
                            </span>
                            <span className="text-[rgba(26,26,26,0.38)]" aria-hidden="true">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M9 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>

                          <button
                            type="button"
                            className="mt-3 flex w-full items-center justify-between rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3 text-left"
                            onClick={(e) => {
                              e.stopPropagation()
                              goToStepId('cierre-final')
                            }}
                          >
                            <span className="text-[0.98rem] text-[rgba(26,26,26,0.78)]">
                              Saltear y Finalizar
                            </span>
                            <span className="text-[rgba(26,26,26,0.38)]" aria-hidden="true">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M9 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>
                        </>
                      ) : (
                        step.paragraphs.map((p: string) => (
                          <p
                            key={p}
                            className={
                              p === 'Jesús dice: recen así...'
                                ? 'text-center text-[1.02rem] text-[var(--rv-rubric)]'
                                : 'whitespace-pre-line'
                            }
                          >
                            {p}
                          </p>
                        ))
                      )}
                      </PrayerCard>
                    </>
                  )
                }

                const item = step.sequence.items[screen.sequenceIndex]
                const rubricLine = (() => {
                  if (step.id === 'intenciones-del-papa') {
                    if (item?.id === 'avemaria-1') return step.sequence.intro
                    if (item?.id === 'avemaria-2') return '2/3'
                    if (item?.id === 'avemaria-3') return '3/3'
                    return null
                  }
                  if (step.id.includes('misterio')) {
                    if (item?.id === 'padre-nuestro') return step.sequence.intro
                    return null
                  }
                  return step.sequence.intro
                })()

                const isIntencionesDelPapa = step.id === 'intenciones-del-papa'
                const isMisterio = step.id.includes('misterio')
                const isAveMariaMisterio = isMisterio && !!item?.id?.startsWith('avemaria-')
                const isPadreNuestroMisterio = isMisterio && item?.id === 'padre-nuestro'

                const isAveMariaExpandable =
                  isAveMariaMisterio ||
                  (isIntencionesDelPapa && !!item?.id?.startsWith('avemaria-'))
                const isPadreNuestroExpandable =
                  isPadreNuestroMisterio ||
                  (isIntencionesDelPapa && item?.id === 'padre-nuestro')

                const mysteryHeader = (() => {
                  if (!isMisterio) return null
                  if (step.id === 'primer-misterio') {
                    return {
                      label: 'Primer Misterio',
                      title: mystery.firstMysteryTitle,
                      imgSrc: resurrecionJpg,
                    }
                  }
                  if (step.id === 'segundo-misterio') {
                    return {
                      label: 'Segundo Misterio',
                      title: 'Ascención del Señor',
                      imgSrc: ascencionJpg,
                    }
                  }
                  if (step.id === 'tercer-misterio') {
                    return {
                      label: 'Tercer Misterio',
                      title: 'Pentecostés',
                      imgSrc: pentecostesJpg,
                    }
                  }
                  if (step.id === 'cuarto-misterio') {
                    return {
                      label: 'Cuarto Misterio',
                      title: 'La Asunción de María al Cielo',
                      imgSrc: asuncionVirgenJpg,
                    }
                  }
                  if (step.id === 'quinto-misterio') {
                    return {
                      label: 'Quinto Misterio',
                      title: 'La Coronación de María en el Cielo',
                      imgSrc: coronacionVirgenJpg,
                    }
                  }
                  return null
                })()

                const meditationText = (() => {
                  if (!isAveMariaMisterio) return null
                  const match = item?.id?.match(/avemaria-(\d+)/)
                  const idx = match?.[1] ? Number(match[1]) : NaN
                  if (!Number.isFinite(idx) || idx < 1) {
                    return null
                  }
                  if (step.id === 'primer-misterio') {
                    if (idx > PRIMER_MISTERIO_MEDITACIONES.length) return null
                    return PRIMER_MISTERIO_MEDITACIONES[idx - 1]
                  }
                  if (step.id === 'segundo-misterio') {
                    if (idx > SEGUNDO_MISTERIO_MEDITACIONES.length) return null
                    return SEGUNDO_MISTERIO_MEDITACIONES[idx - 1]
                  }
                  if (step.id === 'tercer-misterio') {
                    if (idx > TERCER_MISTERIO_MEDITACIONES.length) return null
                    return TERCER_MISTERIO_MEDITACIONES[idx - 1]
                  }
                  if (step.id === 'cuarto-misterio') {
                    if (idx > CUARTO_MISTERIO_MEDITACIONES.length) return null
                    return CUARTO_MISTERIO_MEDITACIONES[idx - 1]
                  }
                  if (step.id === 'quinto-misterio') {
                    if (idx > QUINTO_MISTERIO_MEDITACIONES.length) return null
                    return QUINTO_MISTERIO_MEDITACIONES[idx - 1]
                  }
                  return null
                })()
                return (
                  <>
                    <PrayerCard
                      title={isMisterio ? undefined : step.sequence.title}
                      onAdvance={advance}
                    >
                      {mysteryHeader ? (
                        <div className="text-center">
                          <div className="text-xl font-medium tracking-wide text-[#b2985f]">
                            {mysteryHeader.label}
                          </div>
                          <div className="mt-1 text-3xl font-medium tracking-wide text-[var(--rv-ink)]">
                            {mysteryHeader.title}
                          </div>
                          <div className="mt-4 flex justify-center">
                            <img
                              src={mysteryHeader.imgSrc}
                              alt=""
                              className="h-44 w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-cover"
                              draggable={false}
                            />
                          </div>
                        </div>
                      ) : null}

                      {isIntencionesDelPapa ? (
                        <div className="mt-1 flex justify-center">
                          <img
                            src={banderaVaticanoJpg}
                            alt=""
                            className="h-44 w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-cover"
                            draggable={false}
                          />
                        </div>
                      ) : null}

                      {rubricLine ? (
                        <p className="text-center text-[1.02rem] text-[var(--rv-rubric)]">
                          {rubricLine}
                        </p>
                      ) : null}

                      {isAveMariaExpandable ? (
                        <>
                          {isAveMariaMisterio && meditationText ? (
                            <p className="text-left text-[22px] italic whitespace-pre-line">
                              {meditationText}
                            </p>
                          ) : null}
                          <button
                            type="button"
                            className="mt-4 flex w-full items-center justify-between rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3 text-left"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowAveMariaFull((v) => !v)
                            }}
                          >
                            <span className="text-[0.98rem] text-[rgba(26,26,26,0.78)]">Avemaría</span>
                            <span
                              className={
                                'text-[rgba(26,26,26,0.38)] transition-transform duration-200 ' +
                                (showAveMariaFull ? 'rotate-180' : '')
                              }
                              aria-hidden="true"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6 9l6 6 6-6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>
                          {showAveMariaFull ? (
                            <div className="mt-3 rounded-xl border border-[rgba(178,152,95,0.12)] bg-[rgba(178,152,95,0.04)] px-4 py-3">
                              <p className="text-right whitespace-pre-line">{AVE_MARIA_TEXT}</p>
                            </div>
                          ) : null}
                        </>
                      ) : isPadreNuestroExpandable ? (
                        <>
                          <button
                            type="button"
                            className="mt-4 flex w-full items-center justify-between rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3 text-left"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowPadreNuestroFull((v) => !v)
                            }}
                          >
                            <span className="text-[0.98rem] text-[rgba(26,26,26,0.78)]">Padre Nuestro</span>
                            <span
                              className={
                                'text-[rgba(26,26,26,0.38)] transition-transform duration-200 ' +
                                (showPadreNuestroFull ? 'rotate-180' : '')
                              }
                              aria-hidden="true"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6 9l6 6 6-6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </button>
                          {showPadreNuestroFull ? (
                            <div className="mt-3 rounded-xl border border-[rgba(178,152,95,0.12)] bg-[rgba(178,152,95,0.04)] px-4 py-3">
                              <p className="text-right whitespace-pre-line">{item?.text}</p>
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <p className="text-center whitespace-pre-line">{item?.text}</p>
                      )}
                    </PrayerCard>
                  </>
                )
              })()}
            </>
          ) : null}

          {screen.kind === 'done' ? (
            <>
              <PrayerCard title="Fin">
                <p className="text-center">
                  Que el Señor te conceda perseverancia y paz.
                </p>
              </PrayerCard>
            </>
          ) : null}
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="w-full rounded-t-3xl border-t border-[rgba(26,26,26,0.10)] bg-white/90 shadow-2xl backdrop-blur">
          <div
            className="mx-auto w-full max-w-xl px-5 pt-5"
            style={{ paddingBottom: 'calc(14px + env(safe-area-inset-bottom))' }}
          >
            {beadsModel ? (
              <div className="mb-10 pt-1">
                {beadsModel.total === 12 ? (
                  <BeadTrail
                    totalBeads={beadsModel.total}
                    activeIndex={beadsModel.currentIndex}
                    segmentSize={4}
                    beadSpacing={44}
                    beadKinds={beadsModel.beadKinds}
                  />
                ) : (
                  <div className="px-2">
                    <RosaryRail
                      total={beadsModel.total}
                      completed={beadsModel.completed}
                      currentIndex={beadsModel.currentIndex}
                      beadKinds={beadsModel.beadKinds}
                    />
                  </div>
                )}
              </div>
            ) : null}

            {screen.kind === 'step' ? (
              (() => {
                const step = activeSteps[screen.stepIndex]

                const isCierreFinal = step?.kind === 'text' && step.id === 'cierre-final'
                if (isCierreFinal) {
                  return (
                    <button
                      type="button"
                      onClick={restart}
                      className="w-full rounded-2xl bg-[var(--rv-gold)] px-6 py-4 text-xl font-bold tracking-wide text-white shadow-lg"
                    >
                      Finalizar
                    </button>
                  )
                }

                const isAntesDeFinalizar = step?.kind === 'text' && step.id === 'antes-de-finalizar'
                const isLetanias = step?.kind === 'text' && step.id === 'letanias'
                if (isAntesDeFinalizar || isLetanias) {
                  return (
                    <button
                      type="button"
                      onClick={back}
                      className="w-full rounded-2xl border border-[var(--rv-gold)] bg-transparent px-6 py-4 text-xl font-bold tracking-wide text-[var(--rv-gold)]"
                    >
                      Atrás
                    </button>
                  )
                }

                return (
                  <div className="flex w-full gap-3 pb-1">
                    <button
                      type="button"
                      onClick={back}
                      className="w-1/2 rounded-2xl border border-[var(--rv-gold)] bg-transparent px-6 py-4 text-xl font-bold tracking-wide text-[var(--rv-gold)]"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={advance}
                      className="w-1/2 rounded-2xl bg-[var(--rv-gold)] px-6 py-4 text-xl font-bold tracking-wide text-white shadow-lg"
                    >
                      Siguiente
                    </button>
                  </div>
                )
              })()
            ) : (
              <button
                type="button"
                onClick={bottomAction.onClick}
                className="w-full rounded-2xl bg-[var(--rv-gold)] px-6 py-4 text-xl font-bold tracking-wide text-white shadow-lg"
              >
                {bottomAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
