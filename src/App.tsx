import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import AppShell from './components/AppShell'
import BeadTrail from './components/BeadTrail'
import PrayerCard from './components/PrayerCard'
import RosaryRail from './components/RosaryRail'
import Splash from './components/Splash'
import cruzPng from './assets/cruz.png'
import banderaVaticanoJpg from './assets/bandera-vaticano.jpg'
import misteriosDolorososJpg from './assets/misterios-dolorosos.jpg'
import misteriosGloriososJpg from './assets/misterios-gloriosos.jpg'
import misteriosGozososJpg from './assets/misterios-gozosos.jpg'
import misteriosLuminososJpg from './assets/misterios-luminosos.jpg'
import oracionHuertoJpg from './assets/oracion-huerto.jpg'
import flagelacionJpg from './assets/flagelacion.jpg'
import coronacionJpg from './assets/coronacion.jpg'
import cruzACuestasJpg from './assets/cruz-a-cuestas.jpg'
import crucifixionJpg from './assets/crucifixion.jpg'
import resurreccionJpg from './assets/Resurrecion.jpg'
import ascencionJpg from './assets/ascencion.jpg'
import pentecostesJpg from './assets/pentecostes.jpg'
import asuncionVirgenJpg from './assets/asuncion-virgen.jpg'
import coronacionVirgenJpg from './assets/coronacion-virgen.jpg'
import bautismoJpg from './assets/bautismo.jpg'
import bodasDeCanaJpg from './assets/bodas-de-cana.jpg'
import reinoDiosJpg from './assets/reino-Dios.jpg'
import transfiguracionJpg from './assets/transfiguracion.jpg'
import eucaristiaJpg from './assets/Eucaristia.jpg'
import anunciacionJpg from './assets/anunciacion.jpg'
import visitaJpg from './assets/visita.jpg'
import nacimientoJpg from './assets/Nacimiento.jpg'
import presentacionTemploJpg from './assets/presentacion-templo.jpg'
import perdidoHalladoTemploJpg from './assets/perdido-hallado-templo.jpg'
import { getMysteryOfDay, MYSTERIES, type MysteryId } from './data/mystery'
import { steps } from './data/prayerSteps'
import { AVE_MARIA_TEXT } from './data/intencionesDelPapa'
import { letaniasVirgen } from './data/letaniasVirgen'

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
  '"El Señor Jesús subió al cielo y está a la derecha del Padre."',
]

const TERCER_MISTERIO_MEDITACIONES = [
  '"El día de Pentecostés, se encontraban todos juntos en un mismo lugar."',
  '"De repente, vino del cielo un ruido, como una ráfaga de viento impetuoso, que llenó toda la casa."',
  '"Vieron aparecer unas como lenguas de fuego, que se posaron sobre cada uno de ellos."',
  '"Todos se llenaron del Espíritu Santo, y hablaban de las maravillas de Dios."',
  '"Había en Jerusalén muchos hombres piadosos, venidos de todas las naciones."',
  '"Pedro, presentándose con los Once, levantó la voz."',
  '"Les dijo: Arrepentíos y hacéos bautizar, y recibiréis el don del Espíritu Santo."',
  '"Los que acogieron sus palabras se hicieron bautizar, y aquel día se juntaron unos tres mil."',
  '"Envía tu Espíritu y serán creados, y se renovará la faz de la tierra."',
  '"Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor."',
]

const CUARTO_MISTERIO_MEDITACIONES = [
  '"Levántate, amada mía, hermosa mía, y ven.”',
  '"¿Quién es esta que surge como aurora, hermosa como la luna y resplandeciente como el sol?”',
  '"Muéstrame tu semblante y déjame oír tu voz.”',
  '"Desbordo de gozo con el Señor, porque me ha vestido con un traje de gala.”',
  '"Venid a ver las obras del Señor, las maravillas que hace en la tierra.”',
  '"Ya no te llamarán abandonada, te llamarán favorita, porque el Señor te prefiere a ti.”',
  '"Me alegro con mi Dios: me ha envuelto con un manto de triunfo.”',
  '"Bendita eres, hija del Altísimo, más que todas las mujeres de la tierra.”',
  '"Tú eres la gloria de Jerusalén, la alegría de Israel, y el honor de nuestra raza.”',
  '"Tu alabanza estará, siempre, en boca de todos.”',
]

const QUINTO_MISTERIO_MEDITACIONES = [
  '"Yo haré derivar hacia ella, como un río, la paz."',
  '"Ha aparecido, en el cielo, una señal prodigiosa: una mujer, vestida de sol, y la luna bajo sus pies."',
  '"El que siga sus caminos encontrará el favor de Dios."',
  '"Jamás se ocultará, y todos los hombres alabarán el poder de Dios."',
  '"Te doy las gracias de todo corazón, proclamando tus maravillas."',
  '"Abridme las puertas del triunfo, y entraré para dar gracias a Dios."',
  '"Cantaré a mi Dios un cántico nuevo: Tú eres grande y glorioso."',
  '"Gloria a Dios para siempre, goce el Señor con sus obras."',
  '"En Caná enseñó María el camino para conseguir la gracia: Haced lo que Él os diga."',
  '"Salve, Madre de Misericordia, protégenos contra todo mal."',
]

// Misterios Dolorosos
const DOLOROSO_1_MEDITACIONES = [
  '"Jesús fue con ellos a un huerto, llamado Getsemaní."',
  '"Les dijo: Mi alma está triste hasta la muerte; quedaos aquí y velad conmigo."',
  '"Adelantándose un poco, cayó rostro en tierra, orando."',
  '"Padre mío, si es posible, pase de mí este cáliz."',
  '"Pero no sea como yo quiero, sino como quieres Tú."',
  '"Vino a sus discípulos y los halló dormidos."',
  '"Velad y orad para que no entréis en tentación."',
  '"El espíritu está pronto, pero la carne es débil."',
  '"Se le apareció un ángel del cielo que le confortaba."',
  '"Entró en agonía, y su sudor se hizo como gotas de sangre."',
]

const DOLOROSO_2_MEDITACIONES = [
  '"Pilato tomó a Jesús y lo mandó azotar."',
  '"Él fue traspasado por nuestras iniquidades."',
  '"Fue molido por nuestros pecados."',
  '"El castigo, precio de nuestra paz, cayó sobre Él."',
  '"Y en sus llagas hemos sido curados."',
  '"Se ofreció porque Él mismo lo quiso."',
  '"Como cordero llevado al matadero, no abrió la boca."',
  '"Maltratado, se humillaba y no abría la boca."',
  '"Por las fatigas de su alma, verá luz."',
  '"Él cargó con los pecados de muchos."',
]

const DOLOROSO_3_MEDITACIONES = [
  '"Los soldados, tejiendo una corona de espinas, se la pusieron en la cabeza."',
  '"Y le vistieron un manto de púrpura."',
  '"Y le decían: ¡Salve, Rey de los judíos!"',
  '"Y le daban bofetadas."',
  '"Pilato salió y les dijo: Aquí os lo traigo fuera."',
  '"Jesús salió fuera llevando la corona de espinas y el manto de púrpura."',
  '"Pilato les dijo: He aquí el hombre."',
  '"No tenía apariencia ni belleza para que lo mirásemos."',
  '"Despreciado y abandonado de los hombres."',
  '"Varón de dolores y experimentado en el sufrimiento."',
]

const DOLOROSO_4_MEDITACIONES = [
  '"Llevando su propia cruz, salió hacia el Calvario."',
  '"Le seguía una gran multitud del pueblo y de mujeres."',
  '"Jesús les dijo: Hijas de Jerusalén, no lloréis por mí."',
  '"Llorad más bien por vosotras y por vuestros hijos."',
  '"Obligaron a un tal Simón de Cirene a llevar la cruz."',
  '"El que quiera venir en pos de mí, niéguese a sí mismo."',
  '"Tome su cruz cada día y sígame."',
  '"Si el grano de trigo no cae en tierra y muere, queda solo."',
  '"Pero si muere, da mucho fruto."',
  '"El que ama su vida la perderá."',
]

const DOLOROSO_5_MEDITACIONES = [
  '"Llegados al lugar llamado Calvario, lo crucificaron."',
  '"Jesús decía: Padre, perdónalos, porque no saben lo que hacen."',
  '"Uno de los malhechores le decía: Acuérdate de mí cuando llegues a tu Reino."',
  '"Jesús le dijo: Hoy estarás conmigo en el Paraíso."',
  '"Viendo a su Madre y al discípulo, dijo: Mujer, ahí tienes a tu hijo."',
  '"Y al discípulo: Ahí tienes a tu Madre."',
  '"Jesús exclamó: Dios mío, Dios mío, ¿por qué me has abandonado?"',
  '"Tengo sed."',
  '"Todo está consumado."',
  '"Padre, en tus manos encomiendo mi espíritu."',
]

// Misterios Gozosos
const GOZOSO_1_MEDITACIONES = [
  '"El ángel Gabriel fue enviado a una virgen llamada María."',
  '"El ángel le dijo: Alégrate, llena de gracia, el Señor está contigo."',
  '"No temas, María, porque has hallado gracia delante de Dios."',
  '"Concebirás y darás a luz un hijo, y le pondrás por nombre Jesús."',
  '"El Espíritu Santo vendrá sobre ti."',
  '"Por eso el Santo que nacerá será llamado Hijo de Dios."',
  '"María dijo: He aquí la esclava del Señor."',
  '"Hágase en mí según tu palabra."',
  '"Y el Verbo se hizo carne y habitó entre nosotros."',
  '"Y hemos visto su gloria, gloria del Unigénito del Padre."',
]

const GOZOSO_2_MEDITACIONES = [
  '"María fue a la montaña, a una ciudad de Judá."',
  '"Entró en casa de Zacarías y saludó a Isabel."',
  '"Al oír Isabel el saludo de María, el niño saltó en su seno."',
  '"Isabel quedó llena del Espíritu Santo."',
  '"Bendita tú entre las mujeres, y bendito el fruto de tu vientre."',
  '"¿De dónde a mí que la madre de mi Señor venga a mí?"',
  '"Bienaventurada la que ha creído."',
  '"María dijo: Proclama mi alma la grandeza del Señor."',
  '"Se alegra mi espíritu en Dios, mi Salvador."',
  '"Desde ahora me felicitarán todas las generaciones."',
]

const GOZOSO_3_MEDITACIONES = [
  '"José y María subieron a Belén para empadronarse."',
  '"Estando allí, se cumplieron los días de su parto."',
  '"Dio a luz a su hijo primogénito."',
  '"Lo envolvió en pañales y lo acostó en un pesebre."',
  '"Porque no había lugar para ellos en la posada."',
  '"Había en la región unos pastores que velaban sus rebaños."',
  '"Un ángel del Señor se les apareció."',
  '"Les dijo: Os anuncio una gran alegría: os ha nacido un Salvador."',
  '"Gloria a Dios en las alturas y paz en la tierra."',
  '"Fueron aprisa y encontraron a María, a José y al niño."',
]

const GOZOSO_4_MEDITACIONES = [
  '"Cuando se cumplieron los días de la purificación, lo llevaron a Jerusalén."',
  '"Para presentarlo al Señor."',
  '"Había un hombre llamado Simeón, justo y piadoso."',
  '"Esperaba la consolación de Israel."',
  '"Tomó al niño en brazos y bendijo a Dios."',
  '"Ahora, Señor, puedes dejar ir a tu siervo en paz."',
  '"Porque han visto mis ojos tu salvación."',
  '"Luz para iluminar a las naciones y gloria de tu pueblo Israel."',
  '"Simeón les bendijo y dijo a María su madre."',
  '"Una espada atravesará tu alma."',
]

const GOZOSO_5_MEDITACIONES = [
  '"Cuando Jesús tenía doce años, subieron a Jerusalén."',
  '"Al regresar, el niño Jesús se quedó en Jerusalén."',
  '"No lo echaron de menos sus padres."',
  '"Al cabo de tres días lo encontraron en el templo."',
  '"Sentado entre los maestros, escuchándolos y preguntándoles."',
  '"Todos estaban asombrados de su inteligencia y respuestas."',
  '"Su madre le dijo: Hijo, ¿por qué nos has hecho esto?"',
  '"Jesús les dijo: ¿No sabíais que debo ocuparme de los asuntos de mi Padre?"',
  '"Bajó con ellos y les estaba sujeto."',
  '"María guardaba todas estas cosas en su corazón."',
]

// Misterios Luminosos
const LUMINOSO_1_MEDITACIONES = [
  '"Jesús vino de Galilea al Jordán, para ser bautizado por Juan."',
  '"Juan se resistía diciendo: Soy yo quien necesita ser bautizado por ti."',
  '"Jesús le respondió: Conviene que cumplamos toda justicia."',
  '"Bautizado Jesús, salió del agua."',
  '"Se abrieron los cielos."',
  '"Vio al Espíritu de Dios que bajaba como paloma."',
  '"Y venía sobre Él."',
  '"Se oyó una voz del cielo que decía."',
  '"Este es mi Hijo amado."',
  '"En quien me complazco."',
]

const LUMINOSO_2_MEDITACIONES = [
  '"Se celebraba una boda en Caná de Galilea."',
  '"Estaba allí la madre de Jesús."',
  '"También fue invitado Jesús con sus discípulos."',
  '"Faltó el vino, y la madre de Jesús le dijo: No tienen vino."',
  '"Jesús le dijo: Mujer, ¿qué nos va a ti y a mí?"',
  '"Su madre dijo a los sirvientes: Haced lo que Él os diga."',
  '"Jesús les dijo: Llenad de agua las tinajas."',
  '"Ahora sacad y llevadlo al maestresala."',
  '"El maestresala probó el agua convertida en vino."',
  '"Este fue el primer signo de Jesús, y manifestó su gloria."',
]

const LUMINOSO_3_MEDITACIONES = [
  '"Jesús recorría toda Galilea, predicando el Evangelio del Reino."',
  '"Decía: Convertíos, porque está cerca el Reino de los Cielos."',
  '"Bienaventurados los pobres de espíritu."',
  '"Bienaventurados los limpios de corazón, porque ellos verán a Dios."',
  '"Bienaventurados los misericordiosos."',
  '"Bienaventurados los que trabajan por la paz."',
  '"Vosotros sois la luz del mundo."',
  '"Brille así vuestra luz ante los hombres."',
  '"Amad a vuestros enemigos y orad por los que os persiguen."',
  '"Sed perfectos como vuestro Padre celestial es perfecto."',
]

const LUMINOSO_4_MEDITACIONES = [
  '"Jesús tomó consigo a Pedro, Santiago y Juan."',
  '"Los llevó a un monte alto, aparte."',
  '"Se transfiguró delante de ellos."',
  '"Su rostro resplandeció como el sol."',
  '"Sus vestidos se volvieron blancos como la luz."',
  '"Se les aparecieron Moisés y Elías conversando con Él."',
  '"Pedro dijo: Señor, bueno es estarnos aquí."',
  '"Una nube luminosa los cubrió."',
  '"Una voz desde la nube dijo: Este es mi Hijo amado, escuchadlo."',
  '"Los discípulos cayeron rostro en tierra, llenos de temor."',
]

const LUMINOSO_5_MEDITACIONES = [
  '"Jesús tomó pan, lo bendijo, lo partió y lo dio a sus discípulos."',
  '"Dijo: Tomad, comed, esto es mi Cuerpo."',
  '"Tomó el cáliz, dio gracias y se lo dio."',
  '"Dijo: Bebed todos de él."',
  '"Porque esta es mi Sangre de la Alianza."',
  '"Que será derramada por muchos para remisión de los pecados."',
  '"Haced esto en memoria mía."',
  '"Yo soy el pan de vida."',
  '"El que come mi carne y bebe mi sangre tiene vida eterna."',
  '"Yo le resucitaré en el último día."',
]

type Screen =
  | { kind: 'splash' }
  | { kind: 'step'; stepIndex: number; sequenceIndex: number }
  | { kind: 'done' }
  | { kind: 'standalone'; prayerId: 'letanias' | 'salve'; stepIndex: number }

export default function App() {
  const [mystery, setMystery] = useState(() => getMysteryOfDay())
  const [isManuallySelected, setIsManuallySelected] = useState(false)

  const activeSteps = useMemo(() => {
    // All mystery types now have full support
    return steps
  }, [])

  const [screen, setScreen] = useState<Screen>({ kind: 'splash' })
  const [isFadingOut, setIsFadingOut] = useState(false)
  const pendingRef = useRef<Screen | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [showPrayerExpanded, setShowPrayerExpanded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const raw = window.localStorage.getItem('rv_prayer_expanded')
      if (raw === '1') return true
      if (raw === '0') return false
      return false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('rv_prayer_expanded', showPrayerExpanded ? '1' : '0')
    } catch {
      return
    }
  }, [showPrayerExpanded])

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
    if (prev.kind === 'standalone') {
      const maxIndex = prev.prayerId === 'letanias' ? letaniasVirgen.items.length - 1 : 5
      if (prev.stepIndex >= maxIndex) return { kind: 'splash' }
      return { kind: 'standalone', prayerId: prev.prayerId, stepIndex: prev.stepIndex + 1 }
    }

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
    if (prev.kind === 'standalone') {
      if (prev.stepIndex <= 0) return { kind: 'splash' }
      return { kind: 'standalone', prayerId: prev.prayerId, stepIndex: prev.stepIndex - 1 }
    }

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
              coverImg={{
                gloriosos: misteriosGloriososJpg,
                dolorosos: misteriosDolorososJpg,
                gozosos: misteriosGozososJpg,
                luminosos: misteriosLuminososJpg,
              }[mystery.id]}
              onStart={advance}
              onSelectMystery={(id: MysteryId) => {
                setMystery(MYSTERIES[id])
                setIsManuallySelected(true)
              }}
              isManuallySelected={isManuallySelected}
              onStandalonePrayer={(prayerId) => {
                navigate({ kind: 'standalone', prayerId, stepIndex: 0 })
              }}
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
                                : 'whitespace-pre-line text-[20px]'
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
                    if (item?.id === 'avemaria-1') return '1/3'
                    if (item?.id === 'avemaria-2') return '2/3'
                    if (item?.id === 'avemaria-3') return '3/3'
                    return null
                  }
                  if (step.id === 'letanias') {
                    return `${screen.sequenceIndex + 1}/${step.sequence.items.length}`
                  }
                  if (step.id.includes('misterio')) {
                    if (item?.id === 'padre-nuestro') return step.sequence.intro
                    return null
                  }
                  return step.sequence.intro
                })()

                const isIntencionesDelPapa = step.id === 'intenciones-del-papa'
                const isLetanias = step.id === 'letanias'
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
                  const titles = {
                    gloriosos: {
                      1: 'Resurrección de Jesús',
                      2: 'Ascención del Señor',
                      3: 'Pentecostés',
                      4: 'La Asunción de María al Cielo',
                      5: 'La Coronación de María en el Cielo',
                    },
                    dolorosos: {
                      1: 'La Oración de Jesús en el Huerto',
                      2: 'La Flagelación del Señor',
                      3: 'La Coronación de Espinas',
                      4: 'Jesús con la Cruz a Cuestas',
                      5: 'La Crucifixión y Muerte del Señor',
                    },
                    gozosos: {
                      1: 'La Anunciación del Ángel a María',
                      2: 'La Visitación de María a su Prima Isabel',
                      3: 'El Nacimiento del Hijo de Dios',
                      4: 'La Presentación de Jesús en el Templo',
                      5: 'El Niño Jesús Perdido y Hallado en el Templo',
                    },
                    luminosos: {
                      1: 'El Bautismo de Jesús en el Jordán',
                      2: 'Las Bodas de Caná',
                      3: 'El Anuncio del Reino de Dios',
                      4: 'La Transfiguración del Señor',
                      5: 'La Institución de la Eucaristía',
                    },
                  }
                  const images: Record<string, Record<number, string>> = {
                    gloriosos: {
                      1: resurreccionJpg,
                      2: ascencionJpg,
                      3: pentecostesJpg,
                      4: asuncionVirgenJpg,
                      5: coronacionVirgenJpg,
                    },
                    dolorosos: {
                      1: oracionHuertoJpg,
                      2: flagelacionJpg,
                      3: coronacionJpg,
                      4: cruzACuestasJpg,
                      5: crucifixionJpg,
                    },
                    gozosos: {
                      1: anunciacionJpg,
                      2: visitaJpg,
                      3: nacimientoJpg,
                      4: presentacionTemploJpg,
                      5: perdidoHalladoTemploJpg,
                    },
                    luminosos: {
                      1: bautismoJpg,
                      2: bodasDeCanaJpg,
                      3: reinoDiosJpg,
                      4: transfiguracionJpg,
                      5: eucaristiaJpg,
                    },
                  }
                  const mysteryNum = step.id === 'primer-misterio' ? 1
                    : step.id === 'segundo-misterio' ? 2
                    : step.id === 'tercer-misterio' ? 3
                    : step.id === 'cuarto-misterio' ? 4
                    : step.id === 'quinto-misterio' ? 5 : 0
                  if (mysteryNum === 0) return null
                  const labels = ['', 'Primer Misterio', 'Segundo Misterio', 'Tercer Misterio', 'Cuarto Misterio', 'Quinto Misterio']
                  return {
                    label: labels[mysteryNum],
                    title: titles[mystery.id]?.[mysteryNum as 1|2|3|4|5] ?? '',
                    imgSrc: images[mystery.id]?.[mysteryNum] ?? misteriosGloriososJpg,
                  }
                })()

                const meditationText = (() => {
                  if (!isAveMariaMisterio) return null
                  const match = item?.id?.match(/avemaria-(\d+)/)
                  const idx = match?.[1] ? Number(match[1]) : NaN
                  if (!Number.isFinite(idx) || idx < 1) return null
                  const meditaciones: Record<string, Record<number, string[]>> = {
                    gloriosos: {
                      1: PRIMER_MISTERIO_MEDITACIONES,
                      2: SEGUNDO_MISTERIO_MEDITACIONES,
                      3: TERCER_MISTERIO_MEDITACIONES,
                      4: CUARTO_MISTERIO_MEDITACIONES,
                      5: QUINTO_MISTERIO_MEDITACIONES,
                    },
                    dolorosos: {
                      1: DOLOROSO_1_MEDITACIONES,
                      2: DOLOROSO_2_MEDITACIONES,
                      3: DOLOROSO_3_MEDITACIONES,
                      4: DOLOROSO_4_MEDITACIONES,
                      5: DOLOROSO_5_MEDITACIONES,
                    },
                    gozosos: {
                      1: GOZOSO_1_MEDITACIONES,
                      2: GOZOSO_2_MEDITACIONES,
                      3: GOZOSO_3_MEDITACIONES,
                      4: GOZOSO_4_MEDITACIONES,
                      5: GOZOSO_5_MEDITACIONES,
                    },
                    luminosos: {
                      1: LUMINOSO_1_MEDITACIONES,
                      2: LUMINOSO_2_MEDITACIONES,
                      3: LUMINOSO_3_MEDITACIONES,
                      4: LUMINOSO_4_MEDITACIONES,
                      5: LUMINOSO_5_MEDITACIONES,
                    },
                  }
                  const mysteryNum = step.id === 'primer-misterio' ? 1
                    : step.id === 'segundo-misterio' ? 2
                    : step.id === 'tercer-misterio' ? 3
                    : step.id === 'cuarto-misterio' ? 4
                    : step.id === 'quinto-misterio' ? 5 : 0
                  if (mysteryNum === 0) return null
                  const arr = meditaciones[mystery.id]?.[mysteryNum]
                  if (!arr || idx > arr.length) return null
                  return arr[idx - 1]
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
                            <p className="text-left text-[28px] italic whitespace-pre-line">
                              {meditationText}
                            </p>
                          ) : null}
                          <div
                            className="mt-4 rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowPrayerExpanded((v) => !v)
                            }}
                          >
                            <div className="flex w-full items-center justify-between text-left cursor-pointer">
                              <span className="text-[20px] font-bold text-[rgba(26,26,26,0.78)]">Avemaría</span>
                              <span
                                className={
                                  'text-[rgba(26,26,26,0.38)] transition-transform duration-200 ' +
                                  (showPrayerExpanded ? 'rotate-180' : '')
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
                            </div>
                            {showPrayerExpanded ? (
                              <>
                                <div className="my-3 border-t border-[rgba(178,152,95,0.2)]" />
                                <p className="text-right whitespace-pre-line text-[20px]">{AVE_MARIA_TEXT}</p>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : isPadreNuestroExpandable ? (
                        <>
                          <div
                            className="mt-4 rounded-xl border border-[rgba(178,152,95,0.16)] bg-[rgba(178,152,95,0.06)] px-4 py-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowPrayerExpanded((v) => !v)
                            }}
                          >
                            <div className="flex w-full items-center justify-between text-left cursor-pointer">
                              <span className="text-[20px] font-bold text-[rgba(26,26,26,0.78)]">Padre Nuestro</span>
                              <span
                                className={
                                  'text-[rgba(26,26,26,0.38)] transition-transform duration-200 ' +
                                  (showPrayerExpanded ? 'rotate-180' : '')
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
                            </div>
                            {showPrayerExpanded ? (
                              <>
                                <div className="my-3 border-t border-[rgba(178,152,95,0.2)]" />
                                <p className="text-right whitespace-pre-line text-[20px]">{item?.text}</p>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : isLetanias ? (
                        <div className="space-y-4">
                          {item?.response ? (
                            <p className="text-left text-[20px] text-[var(--rv-rubric)]">Responder a cada línea:<br/><span className="font-bold">"{item.response}"</span></p>
                          ) : null}
                          <p className="text-left whitespace-pre-line text-[20px] text-[var(--rv-ink)]">{item?.text}</p>
                        </div>
                      ) : (
                        <p className="text-center whitespace-pre-line text-[20px]">{item?.text}</p>
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

          {screen.kind === 'standalone' ? (
            <>
              {screen.prayerId === 'letanias' ? (
                <PrayerCard
                  title={letaniasVirgen.title}
                  onAdvance={advance}
                >
                  <div className="space-y-4">
                    {letaniasVirgen.items[screen.stepIndex]?.response ? (
                      <p className="text-left text-[20px] text-[var(--rv-rubric)]">
                        Responder a cada línea:<br/>
                        <span className="font-bold">"{letaniasVirgen.items[screen.stepIndex].response}"</span>
                      </p>
                    ) : null}
                    <p className="text-left whitespace-pre-line text-[20px] text-[var(--rv-ink)]">
                      {letaniasVirgen.items[screen.stepIndex]?.text}
                    </p>
                  </div>
                </PrayerCard>
              ) : (
                <PrayerCard
                  title="La Salve"
                  onAdvance={restart}
                >
                  <p className="text-center whitespace-pre-line text-[20px]">
                    Dios te salve, Reina y Madre de misericordia,{'\n'}
                    vida, dulzura y esperanza nuestra.{'\n\n'}
                    Dios te salve.{'\n\n'}
                    A Ti clamamos los desterrados hijos de Eva,{'\n'}
                    a Ti suspiramos, gimiendo y llorando en este valle de lágrimas.{'\n\n'}
                    Ea, pues, Señora Abogada Nuestra,{'\n'}
                    vuelve a nosotros tus ojos misericordiosos,{'\n'}
                    y después de este destierro, muéstranos a Jesús,{'\n'}
                    fruto bendito de tu vientre.{'\n\n'}
                    Oh, clemente, oh piadosa, oh dulce Virgen María.{'\n\n'}
                    Ruega por nosotros, Santa Madre de Dios,{'\n'}
                    para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.{'\n\n'}
                    Amén
                  </p>
                </PrayerCard>
              )}
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
