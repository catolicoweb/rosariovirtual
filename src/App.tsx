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
import divinaMisericordiaJpg from './assets/DivinaMisericordia.jpg'
import divinaMisericordiaHuertoJpg from './assets/divinamicericordia-huerto.jpg'
import divinaMisericordiaFlagelacionJpg from './assets/divinamicericordia-flagelacion.jpg'
import divinaMisericordiaCoronacionJpg from './assets/divinamicericordia-coronacion.jpg'
import divinaMisericordiaCruzCuestasJpg from './assets/divinamicericordia-cruzcuestas.jpg'
import divinaMisericordiaCruzJpg from './assets/divinamicericordia-cruz.jpg'
import { getMysteryOfDay, MYSTERIES, type MysteryId } from './data/mystery'
import { steps } from './data/prayerSteps'
import { AVE_MARIA_TEXT, AVE_MARIA_LATIN_TEXT, PATER_NOSTER_TEXT, GLORIA_LATIN_TEXT, SIGNUM_CRUCIS_PARAGRAPHS, CREDO_LATIN_PARAGRAPHS, OUR_FATHER_EN_TEXT, HAIL_MARY_EN_TEXT, GLORY_BE_EN_TEXT, SIGN_OF_CROSS_EN_PARAGRAPHS, APOSTLES_CREED_EN_PARAGRAPHS } from './data/intencionesDelPapa'
import { letaniasVirgen } from './data/letaniasVirgen'
import { letaniasVirgenEn } from './data/letaniasVirgenEn'
import {
  GLORIOUS_1_EN_MEDITACIONES, GLORIOUS_2_EN_MEDITACIONES, GLORIOUS_3_EN_MEDITACIONES, GLORIOUS_4_EN_MEDITACIONES, GLORIOUS_5_EN_MEDITACIONES,
  SORROWFUL_1_EN_MEDITACIONES, SORROWFUL_2_EN_MEDITACIONES, SORROWFUL_3_EN_MEDITACIONES, SORROWFUL_4_EN_MEDITACIONES, SORROWFUL_5_EN_MEDITACIONES,
  JOYFUL_1_EN_MEDITACIONES, JOYFUL_2_EN_MEDITACIONES, JOYFUL_3_EN_MEDITACIONES, JOYFUL_4_EN_MEDITACIONES, JOYFUL_5_EN_MEDITACIONES,
  LUMINOUS_1_EN_MEDITACIONES, LUMINOUS_2_EN_MEDITACIONES, LUMINOUS_3_EN_MEDITACIONES, LUMINOUS_4_EN_MEDITACIONES, LUMINOUS_5_EN_MEDITACIONES,
} from './data/meditacionesEn'

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
  '"Jesús le respondió: «Mujer, ¿qué tenemos que ver nosotros? Mi hora no ha llegado todavía»"',
  '"Pero su madre dijo a los sirvientes: «Hagan todo lo que él les diga»"',
  '"Jesús dijo a los sirvientes: «Llenen de agua estas tinajas». Y las llenaron hasta el borde."',
  '"«Saquen ahora, agregó Jesús, y lleven al encargado del banquete». Así lo hicieron."',
  '"El encargado probó el agua cambiada en vino."',
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

// Biblical citations for each mystery
const CITAS_BIBLICAS: Record<string, Record<number, string>> = {
  gozosos: {
    1: 'Lc. 1, 26-38',
    2: 'Lc. 1, 29-45',
    3: 'Lc. 2, 1-7',
    4: 'Lc. 2, 22-24. 33-35',
    5: 'Lc. 2, 41-51',
  },
  luminosos: {
    1: 'Mt. 3, 13-17',
    2: 'Jn. 2, 1-12',
    3: 'Lc. 4, 14-21; Mc. 1, 14-15',
    4: 'Lc. 9, 28-36; Mt. 17, 1-9',
    5: 'Mt. 26, 26-29; Mc. 14, 22-25',
  },
  dolorosos: {
    1: 'Mt. 26, 36-46; Mc. 14, 32-37',
    2: 'Jn. 19, 1; Mc. 15, 13-15',
    3: 'Jn. 19, 2-7; Mc. 15, 16-20',
    4: 'Jn. 19, 16-17; Mt. 27, 21-22; Lc. 23, 26-32',
    5: 'Jn. 19, 18-36; Mc. 15, 23-39; Lc. 23, 33-38',
  },
  gloriosos: {
    1: 'Jn. 20, 1-10; Mt. 28, 1-8; Mc. 16, 5-7',
    2: 'Lc. 24, 50-53; Mc. 16, 19; Hech. 1, 8-11',
    3: 'Hech. 1, 12-14; Hech 2, 1-4',
    4: 'Jn. 14, 1-3; Lc. 1, 37',
    5: 'Lc. 1, 46-55',
  },
}

type Screen =
  | { kind: 'splash' }
  | { kind: 'step'; stepIndex: number; sequenceIndex: number }
  | { kind: 'done' }
  | { kind: 'standalone'; prayerId: 'letanias' | 'salve' | 'divina-misericordia'; stepIndex: number }

export default function App() {
  const [mystery, setMystery] = useState(() => getMysteryOfDay())
  const [isManuallySelected, setIsManuallySelected] = useState(false)

  const activeSteps = useMemo(() => {
    // All mystery types now have full support
    return steps
  }, [])

  const [screen, setScreen] = useState<Screen>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('/divinamisericordia')) {
      return { kind: 'standalone', prayerId: 'divina-misericordia', stepIndex: 0 }
    }
    return { kind: 'splash' }
  })
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

  const [showMeditaciones, setShowMeditaciones] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    try {
      const raw = window.localStorage.getItem('rv_show_meditaciones')
      if (raw === '0') return false
      return true
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('rv_show_meditaciones', showMeditaciones ? '1' : '0')
    } catch {
      return
    }
  }, [showMeditaciones])

  const [idioma, setIdioma] = useState<'es' | 'en'>(() => {
    if (typeof window === 'undefined') return 'es'
    try {
      const raw = window.localStorage.getItem('rv_idioma')
      if (raw === 'en') return 'en'
      if (raw === 'es' || raw === 'la') return 'es'
      // No saved preference: detect from browser language
      const lang = navigator.language ?? ''
      if (lang.startsWith('en')) return 'en'
      return 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('rv_idioma', idioma)
    } catch {
      return
    }
  }, [idioma])

  const [latinPrayers, setLatinPrayers] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      // Migrate legacy 'la' idioma setting
      if (window.localStorage.getItem('rv_idioma') === 'la') return true
      return window.localStorage.getItem('rv_latin_prayers') === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('rv_latin_prayers', latinPrayers ? '1' : '0')
    } catch {
      return
    }
  }, [latinPrayers])

  function prayerText(itemId: string | undefined, originalText: string | undefined): string {
    if (!itemId || !originalText) return originalText ?? ''
    if (latinPrayers) {
      if (itemId === 'padre-nuestro') return PATER_NOSTER_TEXT
      if (itemId.startsWith('avemaria-')) return AVE_MARIA_LATIN_TEXT
      if (itemId === 'gloria') return GLORIA_LATIN_TEXT
      return originalText
    }
    if (idioma === 'en') {
      if (itemId === 'padre-nuestro') return OUR_FATHER_EN_TEXT
      if (itemId.startsWith('avemaria-')) return HAIL_MARY_EN_TEXT
      if (itemId === 'gloria') return GLORY_BE_EN_TEXT
      return originalText
    }
    return originalText
  }

  const [globalMenuOpen, setGlobalMenuOpen] = useState(false)

  useEffect(() => {
    if (
      screen.kind === 'standalone' &&
      screen.prayerId === 'divina-misericordia'
    ) {
      document.title = 'Coronilla de la Divina Misericordia - Rosario Virtual'
    } else {
      document.title = 'Rosario Virtual - Reza el Rosario y la Coronilla de la Divina Misericordia'
    }
  }, [screen])

  useEffect(() => {
    const isDivinaMisericordia =
      screen.kind === 'standalone' && screen.prayerId === 'divina-misericordia'
    const currentPath = window.location.pathname
    const onDivinaPath = currentPath.endsWith('/divinamisericordia')

    if (isDivinaMisericordia && !onDivinaPath) {
      const base = currentPath.replace(/\/$/, '')
      window.history.pushState(null, '', `${base}/divinamisericordia`)
    } else if (!isDivinaMisericordia && onDivinaPath) {
      const base = currentPath.replace(/\/divinamisericordia$/, '') || '/'
      window.history.pushState(null, '', base)
    }
  }, [screen])

  useEffect(() => {
    const handler = () => {
      if (window.location.pathname.endsWith('/divinamisericordia')) {
        setScreen({ kind: 'standalone', prayerId: 'divina-misericordia', stepIndex: 0 })
      } else {
        setScreen({ kind: 'splash' })
      }
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  function trackEvent(name: string, params: Record<string, string | number>) {
    if (typeof gtag === 'function') {
      gtag('event', name, params)
    }
  }

  const beadsModel = (() => {
    if (
      screen.kind === 'standalone' &&
      screen.prayerId === 'divina-misericordia' &&
      screen.stepIndex >= 4 &&
      screen.stepIndex <= 58
    ) {
      const beadInDecade = (screen.stepIndex - 4) % 11
      const beadKinds: Array<'large' | 'normal'> = [
        'large',
        ...(Array.from({ length: 10 }, () => 'normal') as 'normal'[]),
      ]
      return {
        total: beadKinds.length,
        completed: beadInDecade,
        currentIndex: beadInDecade,
        beadKinds,
      }
    }

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
      const maxIndex =
        prev.prayerId === 'letanias'
          ? letaniasVirgen.items.length - 1
          : prev.prayerId === 'divina-misericordia'
            ? 63
            : 5
      if (prev.prayerId === 'divina-misericordia') {
        const completedDecadeEnds = [14, 25, 36, 47, 58]
        if (completedDecadeEnds.includes(prev.stepIndex)) {
          const decadeNumber = completedDecadeEnds.indexOf(prev.stepIndex) + 1
          trackEvent('rosary_progress', { step_number: decadeNumber, mystery_name: 'Coronilla de la Divina Misericordia' })
        }
      }
      if (prev.stepIndex >= maxIndex) {
        if (prev.prayerId === 'divina-misericordia') {
          trackEvent('rosary_complete', { type: 'coronilla', mystery_name: 'Coronilla de la Divina Misericordia' })
        }
        return { kind: 'splash' }
      }
      return { kind: 'standalone', prayerId: prev.prayerId, stepIndex: prev.stepIndex + 1 }
    }

    const step = activeSteps[prev.stepIndex]
    if (!step) return { kind: 'done' }

    if (step.kind === 'sequence') {
      const nextSequenceIndex = prev.sequenceIndex + 1
      if (nextSequenceIndex < step.sequence.items.length) {
        return { kind: 'step', stepIndex: prev.stepIndex, sequenceIndex: nextSequenceIndex }
      }
      const misterioIds = ['primer-misterio', 'segundo-misterio', 'tercer-misterio', 'cuarto-misterio', 'quinto-misterio']
      if (misterioIds.includes(step.id)) {
        trackEvent('rosary_progress', { step_number: misterioIds.indexOf(step.id) + 1, mystery_name: mystery.label })
      }
      const nextStepIndex = prev.stepIndex + 1
      if (nextStepIndex >= activeSteps.length) {
        trackEvent('rosary_complete', { type: 'santo_rosario', mystery_name: mystery.label })
        return { kind: 'done' }
      }
      return { kind: 'step', stepIndex: nextStepIndex, sequenceIndex: 0 }
    }

    const nextStepIndex = prev.stepIndex + 1
    if (nextStepIndex >= activeSteps.length) {
      trackEvent('rosary_complete', { type: 'santo_rosario', mystery_name: mystery.label })
      return { kind: 'done' }
    }
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

    if (screen.kind === 'splash') {
      if (next.kind === 'step') {
        trackEvent('rosary_start', { type: 'santo_rosario', mystery_name: mystery.label })
      } else if (next.kind === 'standalone' && next.prayerId === 'divina-misericordia') {
        trackEvent('rosary_start', { type: 'coronilla', mystery_name: 'Coronilla de la Divina Misericordia' })
      }
    }

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

  const inCardHamburger = (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); setGlobalMenuOpen(true) }}
      className="absolute right-3 top-3 z-10 p-2 text-[var(--rv-ink-muted)] hover:text-[var(--rv-ink)]"
      aria-label={idioma === 'en' ? 'Menu' : 'Menú'}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  )

  const bottomAction = (() => {
    const labelStart = idioma === 'en' ? 'Begin' : 'Iniciar'
    const labelBack = idioma === 'en' ? 'Back to start' : 'Volver al inicio'
    const labelFinish = idioma === 'en' ? 'Finish' : 'Finalizar'
    const labelNext = idioma === 'en' ? 'Next' : 'Siguiente'
    if (screen.kind === 'splash') return { label: labelStart, onClick: advance }
    if (screen.kind === 'done') return { label: labelBack, onClick: restart }
    if (
      screen.kind === 'standalone' &&
      screen.prayerId === 'divina-misericordia' &&
      screen.stepIndex === 63
    ) {
      return { label: labelFinish, onClick: advance }
    }
    return { label: labelNext, onClick: advance }
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
              mysteryLabel={idioma === 'en' ? {
                gozosos: 'Joyful Mysteries',
                dolorosos: 'Sorrowful Mysteries',
                gloriosos: 'Glorious Mysteries',
                luminosos: 'Luminous Mysteries',
              }[mystery.id] : mystery.label}
              mysteryDays={idioma === 'en' ? {
                gozosos: 'Mondays and Saturdays',
                dolorosos: 'Tuesdays and Fridays',
                gloriosos: 'Wednesdays and Sundays',
                luminosos: 'Thursdays',
              }[mystery.id] : mystery.days}
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
              showMeditaciones={showMeditaciones}
              onToggleMeditaciones={() => setShowMeditaciones(v => !v)}
              idioma={idioma}
              onSetIdioma={setIdioma}
              latinPrayers={latinPrayers}
              onToggleLatinPrayers={() => setLatinPrayers(v => !v)}
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
                        title={
                          step.id === 'credo' && latinPrayers ? 'Credo'
                          : step.id === 'credo' && idioma === 'en' ? "Apostles' Creed"
                          : step.id === 'la-salve' && idioma === 'en' ? 'Hail Holy Queen'
                          : step.title
                        }
                        mark={crossMark}
                        onAdvance={isAntesDeFinalizar || isLetanias || isCierreFinal ? undefined : advance}
                      menuSlot={inCardHamburger}
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
                              {idioma === 'en' ? 'Litany of the Virgin Mary' : 'Letanias a Virgen Maria'}
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
                              {idioma === 'en' ? 'Skip and Finish' : 'Saltear y Finalizar'}
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
                        (latinPrayers && step.id === 'inicio' ? SIGNUM_CRUCIS_PARAGRAPHS
                          : idioma === 'en' && step.id === 'inicio' ? SIGN_OF_CROSS_EN_PARAGRAPHS
                          : latinPrayers && step.id === 'credo' ? CREDO_LATIN_PARAGRAPHS
                          : idioma === 'en' && step.id === 'credo' ? APOSTLES_CREED_EN_PARAGRAPHS
                          : step.paragraphs
                        ).map((p: string) => (
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
                    if (item?.id === 'padre-nuestro') return idioma === 'en' ? 'Jesus says: pray thus...' : step.sequence.intro
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
                  const titlesEs = {
                    gloriosos: {
                      1: 'Resurrección de Jesús',
                      2: 'Ascensión del Señor',
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
                  const titlesEn = {
                    gloriosos: {
                      1: 'The Resurrection of Jesus',
                      2: 'The Ascension of the Lord',
                      3: 'Pentecost',
                      4: 'The Assumption of Mary into Heaven',
                      5: 'The Coronation of Mary in Heaven',
                    },
                    dolorosos: {
                      1: 'The Agony in the Garden',
                      2: 'The Scourging at the Pillar',
                      3: 'The Crowning with Thorns',
                      4: 'Jesus Carries His Cross',
                      5: 'The Crucifixion and Death of the Lord',
                    },
                    gozosos: {
                      1: 'The Annunciation of the Angel to Mary',
                      2: 'The Visitation of Mary to her Cousin Elizabeth',
                      3: 'The Birth of the Son of God',
                      4: 'The Presentation of Jesus in the Temple',
                      5: 'The Finding of Jesus in the Temple',
                    },
                    luminosos: {
                      1: 'The Baptism of Jesus in the Jordan',
                      2: 'The Wedding at Cana',
                      3: 'The Proclamation of the Kingdom of God',
                      4: 'The Transfiguration of the Lord',
                      5: 'The Institution of the Eucharist',
                    },
                  }
                  const titles = idioma === 'en' ? titlesEn : titlesEs
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
                  const labelsEs = ['', 'Primer Misterio', 'Segundo Misterio', 'Tercer Misterio', 'Cuarto Misterio', 'Quinto Misterio']
                  const labelsEn = ['', 'First Mystery', 'Second Mystery', 'Third Mystery', 'Fourth Mystery', 'Fifth Mystery']
                  const labels = idioma === 'en' ? labelsEn : labelsEs
                  return {
                    label: labels[mysteryNum],
                    title: titles[mystery.id]?.[mysteryNum as 1|2|3|4|5] ?? '',
                    imgSrc: images[mystery.id]?.[mysteryNum] ?? misteriosGloriososJpg,
                    cita: CITAS_BIBLICAS[mystery.id]?.[mysteryNum] ?? '',
                  }
                })()

                const meditationText = (() => {
                  if (!isAveMariaMisterio) return null
                  const match = item?.id?.match(/avemaria-(\d+)/)
                  const idx = match?.[1] ? Number(match[1]) : NaN
                  if (!Number.isFinite(idx) || idx < 1) return null
                  const meditacionesEs: Record<string, Record<number, string[]>> = {
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
                  const meditacionesEn: Record<string, Record<number, string[]>> = {
                    gloriosos: {
                      1: GLORIOUS_1_EN_MEDITACIONES,
                      2: GLORIOUS_2_EN_MEDITACIONES,
                      3: GLORIOUS_3_EN_MEDITACIONES,
                      4: GLORIOUS_4_EN_MEDITACIONES,
                      5: GLORIOUS_5_EN_MEDITACIONES,
                    },
                    dolorosos: {
                      1: SORROWFUL_1_EN_MEDITACIONES,
                      2: SORROWFUL_2_EN_MEDITACIONES,
                      3: SORROWFUL_3_EN_MEDITACIONES,
                      4: SORROWFUL_4_EN_MEDITACIONES,
                      5: SORROWFUL_5_EN_MEDITACIONES,
                    },
                    gozosos: {
                      1: JOYFUL_1_EN_MEDITACIONES,
                      2: JOYFUL_2_EN_MEDITACIONES,
                      3: JOYFUL_3_EN_MEDITACIONES,
                      4: JOYFUL_4_EN_MEDITACIONES,
                      5: JOYFUL_5_EN_MEDITACIONES,
                    },
                    luminosos: {
                      1: LUMINOUS_1_EN_MEDITACIONES,
                      2: LUMINOUS_2_EN_MEDITACIONES,
                      3: LUMINOUS_3_EN_MEDITACIONES,
                      4: LUMINOUS_4_EN_MEDITACIONES,
                      5: LUMINOUS_5_EN_MEDITACIONES,
                    },
                  }
                  const meditaciones = idioma === 'en' ? meditacionesEn : meditacionesEs
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
                      title={isMisterio ? undefined
                        : step.id === 'letanias' && idioma === 'en' ? letaniasVirgenEn.title
                        : step.id === 'intenciones-del-papa' && idioma === 'en' ? "Pope's Intentions"
                        : step.sequence.title}
                      onAdvance={advance}
                    menuSlot={inCardHamburger}
                    >
                      {mysteryHeader ? (
                        <div className="text-center">
                          <div className="text-xl font-medium tracking-wide text-[#b2985f]">
                            {mysteryHeader.label}
                          </div>
                          <div className="mt-1 text-3xl font-medium tracking-wide text-[var(--rv-ink)]">
                            {mysteryHeader.title}
                          </div>
                          {mysteryHeader.cita ? (
                            <div className="mt-1 text-[var(--rv-rubric)]">
                              {mysteryHeader.cita}
                            </div>
                          ) : null}
                          <div className="mt-4 flex justify-center">
                            <img
                              src={mysteryHeader.imgSrc}
                              alt=""
                              className="h-auto max-h-80 w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
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
                            className="h-auto max-h-80 w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
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
                          {isAveMariaMisterio && meditationText && showMeditaciones ? (
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
                              <span className="text-[20px] font-bold text-[rgba(26,26,26,0.78)]">{idioma === 'en' ? 'Hail Mary' : 'Avemaría'}</span>
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
                                <div className="text-[20px]">
                                  <p>{(latinPrayers ? AVE_MARIA_LATIN_TEXT : idioma === 'en' ? HAIL_MARY_EN_TEXT : AVE_MARIA_TEXT).replace(/ A[m]e[n]\.$/i, '')}</p>
                                  <p className="text-right mt-1">{latinPrayers || idioma === 'en' ? 'Amen.' : 'Amén.'}</p>
                                </div>
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
                              <span className="text-[20px] font-bold text-[rgba(26,26,26,0.78)]">{idioma === 'en' ? 'Our Father' : 'Padre Nuestro'}</span>
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
                                <p className="text-right whitespace-pre-line text-[20px]">{prayerText(item?.id, item?.text)}</p>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : isLetanias ? (
                        <div className="space-y-4">
                          {(() => {
                            const letaniaItem = idioma === 'en' ? letaniasVirgenEn.items[screen.sequenceIndex] : item
                            return (
                              <>
                                {letaniaItem?.response ? (
                                  <p className="text-left text-[20px] text-[var(--rv-rubric)]">
                                    {idioma === 'en' ? 'Respond to each line:' : 'Responder a cada línea:'}<br/>
                                    <span className="font-bold">"{letaniaItem.response}"</span>
                                  </p>
                                ) : null}
                                <p className="text-left whitespace-pre-line text-[20px] text-[var(--rv-ink)]">{letaniaItem?.text}</p>
                              </>
                            )
                          })()}
                        </div>
                      ) : (
                        <p className="text-center whitespace-pre-line text-[20px]">{prayerText(item?.id, item?.text)}</p>
                      )}
                    </PrayerCard>
                  </>
                )
              })()}
            </>
          ) : null}

          {screen.kind === 'done' ? (
            <>
              <PrayerCard title={idioma === 'en' ? 'The End' : 'Fin'} menuSlot={inCardHamburger}>
                <p className="text-center">
                  {idioma === 'en'
                    ? 'May the Lord grant you perseverance and peace.'
                    : 'Que el Señor te conceda perseverancia y paz.'}
                </p>
              </PrayerCard>
            </>
          ) : null}

          {screen.kind === 'standalone' ? (
            <>
              {screen.prayerId === 'divina-misericordia' ? (
                screen.stepIndex === 0 ? (
                  <PrayerCard
                    title={idioma === 'en' ? 'Chaplet of Divine Mercy' : 'Coronilla de la Divina Misericordia'}
                    onAdvance={advance}
                  menuSlot={inCardHamburger}
                  >
                    <img
                      src={divinaMisericordiaJpg}
                      alt={idioma === 'en' ? 'Divine Mercy' : 'Divina Misericordia'}
                      className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
                      draggable={false}
                    />
                    <p className="whitespace-pre-line text-center text-[20px]">
                      {latinPrayers
                        ? SIGNUM_CRUCIS_PARAGRAPHS.join('\n\n')
                        : idioma === 'en'
                        ? SIGN_OF_CROSS_EN_PARAGRAPHS.join('\n\n')
                        : 'Por la señal de la Santa Cruz, de nuestros enemigos, líbranos Señor, Dios nuestro.\n\nEn el nombre del Padre, del Hijo y del Espíritu Santo. Amén.'}
                    </p>
                  </PrayerCard>
                ) : screen.stepIndex === 1 ? (
                  (() => {
                    const credoStep = activeSteps.find(
                      (s): s is Extract<typeof s, { kind: 'text' }> =>
                        s.kind === 'text' && s.id === 'credo',
                    )
                    return (
                      <PrayerCard
                        title={latinPrayers ? 'Credo' : idioma === 'en' ? "Apostles' Creed" : 'Credo'}
                        mark={<CrossIcon glow size="large" />}
                        onAdvance={advance}
                      menuSlot={inCardHamburger}
                      >
                        {(latinPrayers ? CREDO_LATIN_PARAGRAPHS : idioma === 'en' ? APOSTLES_CREED_EN_PARAGRAPHS : credoStep?.paragraphs ?? []).map((p) => (
                          <p key={p} className="whitespace-pre-line text-[20px]">
                            {p}
                          </p>
                        ))}
                      </PrayerCard>
                    )
                  })()
                ) : screen.stepIndex === 2 ? (
                  <PrayerCard
                    title={idioma === 'en' ? 'Hail Mary' : 'Ave María'}
                    mark={<CrossIcon glow size="large" />}
                    onAdvance={advance}
                  menuSlot={inCardHamburger}
                  >
                    <p className="text-[20px]">
                      {(latinPrayers ? AVE_MARIA_LATIN_TEXT : idioma === 'en' ? HAIL_MARY_EN_TEXT : AVE_MARIA_TEXT).replace(/ A[m]e[n]\.$/i, '')}
                    </p>
                    <p className="text-right text-[20px]">{latinPrayers || idioma === 'en' ? 'Amen.' : 'Amén.'}</p>
                  </PrayerCard>
                ) : screen.stepIndex === 3 ? (
                  <PrayerCard
                    title={latinPrayers ? 'Glória Patri' : idioma === 'en' ? 'Glory Be' : 'Gloria'}
                    mark={<CrossIcon glow size="large" />}
                    onAdvance={advance}
                  menuSlot={inCardHamburger}
                  >
                    <p className="whitespace-pre-line text-[20px]">
                      {latinPrayers
                        ? GLORIA_LATIN_TEXT.replace(/\nAmen$/, '')
                        : idioma === 'en'
                        ? GLORY_BE_EN_TEXT.replace(/\nAmen$/, '')
                        : 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos.'}
                    </p>
                    <p className="text-right text-[20px]">{latinPrayers || idioma === 'en' ? 'Amen.' : 'Amén.'}</p>
                  </PrayerCard>
                ) : screen.stepIndex >= 59 && screen.stepIndex <= 61 ? (
                  <PrayerCard onAdvance={advance} menuSlot={inCardHamburger}>
                    <img
                      src={divinaMisericordiaJpg}
                      alt="Divina Misericordia"
                      className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
                      draggable={false}
                    />
                    <p className="text-center text-[var(--rv-rubric)] text-[18px]">
                      {`${screen.stepIndex - 58}/3`}
                    </p>
                    <p className="whitespace-pre-line text-[20px]">
                      {idioma === 'en'
                        ? `Holy God, Holy Mighty One, Holy Immortal One,\nhave mercy on us and on the whole world.`
                        : `Santo Dios, Santo Fuerte, Santo Inmortal,\nten misericordia de nosotros y del mundo entero.`}
                    </p>
                  </PrayerCard>
                ) : screen.stepIndex === 62 ? (
                  <PrayerCard onAdvance={advance} menuSlot={inCardHamburger}>
                    <img
                      src={divinaMisericordiaJpg}
                      alt="Divina Misericordia"
                      className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
                      draggable={false}
                    />
                    <p className="whitespace-pre-line text-[20px]">
                      {idioma === 'en'
                        ? 'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in Thee.'
                        : 'Oh Sangre y Agua que brotasteis del Corazón de Jesús como una fuente de misericordia para nosotros, en Vos confío.'}
                    </p>
                  </PrayerCard>
                ) : screen.stepIndex === 63 ? (
                  <PrayerCard
                    mark={<CrossIcon glow size="large" />}
                    onAdvance={advance}
                  menuSlot={inCardHamburger}
                  >
                    <p className="whitespace-pre-line text-[20px]">
                      {idioma === 'en'
                        ? 'In the name of the Father, and of the Son, and of the Holy Spirit.'
                        : 'En el nombre del Padre, del Hijo y del Espíritu Santo.'}
                    </p>
                  </PrayerCard>
                ) : (() => {
                  const beadStep = screen.stepIndex - 4
                  const decadeIdx = Math.floor(beadStep / 11)
                  const beadInDecade = beadStep % 11
                  const decadeImages = [
                    divinaMisericordiaHuertoJpg,
                    divinaMisericordiaFlagelacionJpg,
                    divinaMisericordiaCoronacionJpg,
                    divinaMisericordiaCruzCuestasJpg,
                    divinaMisericordiaCruzJpg,
                  ]
                  const decadeAlts = [
                    'Jesús en el huerto',
                    'La flagelación',
                    'La coronación de espinas',
                    'Jesús con la cruz a cuestas',
                    'Jesús en la cruz',
                  ]
                  if (beadInDecade === 0) {
                    return (
                      <PrayerCard onAdvance={advance} menuSlot={inCardHamburger}>
                        <img
                          src={divinaMisericordiaJpg}
                          alt="Divina Misericordia"
                          className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
                          draggable={false}
                        />
                        <p className="whitespace-pre-line text-[20px]">
                          {idioma === 'en'
                            ? 'Eternal Father, I offer Thee the Body and Blood, Soul and Divinity of Thy dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.'
                            : 'Padre Eterno, te ofrezco el Cuerpo y Sangre, el Alma y la Divinidad de Tu Amadísimo Hijo y Señor Nuestro Jesucristo, en propiciación de nuestros pecados y los del mundo entero.'}
                        </p>
                      </PrayerCard>
                    )
                  }
                  return (
                    <PrayerCard onAdvance={advance} menuSlot={inCardHamburger}>
                      <img
                        src={decadeImages[decadeIdx]}
                        alt={decadeAlts[decadeIdx]}
                        className="w-full rounded-xl border border-[var(--rv-border)] bg-white/40 object-contain"
                        draggable={false}
                      />
                      <p className="whitespace-pre-line text-[20px]">
                        {idioma === 'en'
                          ? 'For the sake of His sorrowful Passion, have mercy on us and on the whole world.'
                          : 'Por Su Dolorosa Pasión, ten misericordia de nosotros y del mundo entero.'}
                      </p>
                    </PrayerCard>
                  )
                })()
              ) : screen.prayerId === 'letanias' ? (
                (() => {
                  const letaniaData = idioma === 'en' ? letaniasVirgenEn : letaniasVirgen
                  const letaniaItem = letaniaData.items[screen.stepIndex]
                  return (
                    <PrayerCard
                      title={letaniaData.title}
                      onAdvance={advance}
                    menuSlot={inCardHamburger}
                    >
                      <div className="space-y-4">
                        {letaniaItem?.response ? (
                          <p className="text-left text-[20px] text-[var(--rv-rubric)]">
                            {idioma === 'en' ? 'Respond to each line:' : 'Responder a cada línea:'}<br/>
                            <span className="font-bold">"{letaniaItem.response}"</span>
                          </p>
                        ) : null}
                        <p className="text-left whitespace-pre-line text-[20px] text-[var(--rv-ink)]">
                          {letaniaItem?.text}
                        </p>
                      </div>
                    </PrayerCard>
                  )
                })()
              ) : (
                <PrayerCard
                  title={idioma === 'en' ? 'Hail Holy Queen' : 'La Salve'}
                  onAdvance={restart}
                menuSlot={inCardHamburger}
                >
                  <p className="text-center whitespace-pre-line text-[20px]">
                    {idioma === 'en'
                      ? `Hail, Holy Queen, Mother of Mercy,\nour life, our sweetness, and our hope.\n\nHail, Holy Queen.\n\nTo thee do we cry, poor banished children of Eve;\nto thee do we send up our sighs,\nmourning and weeping in this valley of tears.\n\nTurn then, most gracious Advocate,\nthine eyes of mercy toward us;\nand after this our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\n\nO clement, O loving, O sweet Virgin Mary.\n\nPray for us, O holy Mother of God,\nthat we may be made worthy\nof the promises of Christ.\n\nAmen.`
                      : `Dios te salve, Reina y Madre de misericordia,\nvida, dulzura y esperanza nuestra.\n\nDios te salve.\n\nA Ti clamamos los desterrados hijos de Eva,\na Ti suspiramos, gimiendo y llorando en este valle de lágrimas.\n\nEa, pues, Señora Abogada Nuestra,\nvuelve a nosotros tus ojos misericordiosos,\ny después de este destierro, muéstranos a Jesús,\nfruto bendito de tu vientre.\n\nOh, clemente, oh piadosa, oh dulce Virgen María.\n\nRuega por nosotros, Santa Madre de Dios,\npara que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.\n\nAmén`}
                  </p>
                </PrayerCard>
              )}
            </>
          ) : null}
      </motion.div>

      {/* Hamburger on splash screen only — during prayer it lives inside the PrayerCard */}
      {screen.kind === 'splash' ? (
        <button
          type="button"
          onClick={() => setGlobalMenuOpen(true)}
          className="fixed right-4 top-4 z-40 p-2 text-[var(--rv-ink-muted)] hover:text-[var(--rv-ink)]"
          aria-label={idioma === 'en' ? 'Menu' : 'Menú'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      ) : null}

      {/* Global full-viewport drawer */}
      {globalMenuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--rv-border)] px-5 pb-4 pt-10">
            <span className="text-xl font-semibold text-[var(--rv-ink)]">
              {idioma === 'en' ? 'Menu' : 'Menú'}
            </span>
            <button
              type="button"
              onClick={() => setGlobalMenuOpen(false)}
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
            {([
              { id: 'gozosos', es: 'Misterios Gozosos', en: 'Joyful Mysteries' },
              { id: 'dolorosos', es: 'Misterios Dolorosos', en: 'Sorrowful Mysteries' },
              { id: 'gloriosos', es: 'Misterios Gloriosos', en: 'Glorious Mysteries' },
              { id: 'luminosos', es: 'Misterios Luminosos', en: 'Luminous Mysteries' },
            ] as const).map(m => (
              <button
                key={m.id}
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => {
                  setMystery(MYSTERIES[m.id])
                  setIsManuallySelected(true)
                  if (screen.kind !== 'splash') navigate({ kind: 'splash' })
                  setGlobalMenuOpen(false)
                }}
              >
                {idioma === 'en' ? m.en : m.es}
              </button>
            ))}

            <div className="mx-5 my-3 border-t border-[var(--rv-border)]" />

            {/* Standalone prayers */}
            <div className="px-5 pb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--rv-ink-muted)]">
              {idioma === 'en' ? 'Prayers' : 'Oraciones'}
            </div>
            {([
              { id: 'divina-misericordia', es: 'Coronilla de la Divina Misericordia', en: 'Chaplet of Divine Mercy' },
              { id: 'letanias', es: 'Letanías a la Virgen', en: 'Litany of the Virgin' },
              { id: 'salve', es: 'Salve', en: 'Hail Holy Queen' },
            ] as const).map(p => (
              <button
                key={p.id}
                type="button"
                className="w-full px-5 py-4 text-left text-[18px] hover:bg-[rgba(178,152,95,0.08)] active:bg-[rgba(178,152,95,0.15)]"
                onClick={() => {
                  navigate({ kind: 'standalone', prayerId: p.id, stepIndex: 0 })
                  setGlobalMenuOpen(false)
                }}
              >
                {idioma === 'en' ? p.en : p.es}
              </button>
            ))}

            <div className="mx-5 my-3 border-t border-[var(--rv-border)]" />

            {/* Settings */}
            <div className="px-5 pb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--rv-ink-muted)]">
              {idioma === 'en' ? 'Settings' : 'Configuración'}
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[18px]">{idioma === 'en' ? 'Meditations' : 'Meditaciones'}</span>
              <button
                type="button"
                role="switch"
                aria-checked={showMeditaciones}
                onClick={() => setShowMeditaciones(v => !v)}
                className={'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ' + (showMeditaciones ? 'bg-[#b2985f]' : 'bg-[rgba(26,26,26,0.2)]')}
              >
                <span className={'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ' + (showMeditaciones ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
            <div className="mx-5 border-t border-[var(--rv-border)]" />
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[18px]">{idioma === 'en' ? 'Language' : 'Idioma'}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIdioma('es')}
                  className={'rounded-md px-2 py-1 text-2xl ' + (idioma === 'es' ? 'ring-2 ring-[#b2985f] bg-[rgba(178,152,95,0.10)]' : '')}
                  aria-label="Español"
                >🇪🇸</button>
                <button
                  type="button"
                  onClick={() => setIdioma('en')}
                  className={'rounded-md px-2 py-1 text-2xl ' + (idioma === 'en' ? 'ring-2 ring-[#b2985f] bg-[rgba(178,152,95,0.10)]' : '')}
                  aria-label="English"
                >🇬🇧</button>
              </div>
            </div>
            <div className="mx-5 border-t border-[var(--rv-border)]" />
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[18px]">{idioma === 'en' ? 'Latin prayers' : 'Oraciones en latín'}</span>
              <button
                type="button"
                role="switch"
                aria-checked={latinPrayers}
                onClick={() => setLatinPrayers(v => !v)}
                className={'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ' + (latinPrayers ? 'bg-[#b2985f]' : 'bg-[rgba(26,26,26,0.2)]')}
              >
                <span className={'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ' + (latinPrayers ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

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
                      {idioma === 'en' ? 'Finish' : 'Finalizar'}
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
                      {idioma === 'en' ? 'Back' : 'Atrás'}
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
                      {idioma === 'en' ? 'Back' : 'Atrás'}
                    </button>
                    <button
                      type="button"
                      onClick={advance}
                      className="w-1/2 rounded-2xl bg-[var(--rv-gold)] px-6 py-4 text-xl font-bold tracking-wide text-white shadow-lg"
                    >
                      {idioma === 'en' ? 'Next' : 'Siguiente'}
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
