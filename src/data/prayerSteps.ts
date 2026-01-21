import {
  AVE_MARIA_TEXT,
  GLORIA_TEXT,
  intencionesDelPapa,
  PADRE_NUESTRO_TEXT,
  type SequenceConfig,
} from './intencionesDelPapa'
import { letaniasVirgen } from './letaniasVirgen'

export type TextStep = {
  id: string
  kind: 'text'
  title?: string
  paragraphs: string[]
}

export type SequenceStep = {
  id: string
  kind: 'sequence'
  sequence: SequenceConfig
}

export type Step = TextStep | SequenceStep

const primerMisterioDecada: SequenceConfig = {
  id: 'primer-misterio-decada',
  title: 'Primer Misterio',
  intro: 'Jesús dice: recen así...',
  items: [
    { id: 'padre-nuestro', bead: 'large', text: PADRE_NUESTRO_TEXT },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `avemaria-${i + 1}`,
      text: AVE_MARIA_TEXT,
    })),
    { id: 'gloria', bead: 'large', text: GLORIA_TEXT },
  ],
}

const segundoMisterioDecada: SequenceConfig = {
  id: 'segundo-misterio-decada',
  title: 'Segundo Misterio',
  intro: 'Jesús dice: recen así...',
  items: [
    { id: 'padre-nuestro', bead: 'large', text: PADRE_NUESTRO_TEXT },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `avemaria-${i + 1}`,
      text: AVE_MARIA_TEXT,
    })),
    { id: 'gloria', bead: 'large', text: GLORIA_TEXT },
  ],
}

const tercerMisterioDecada: SequenceConfig = {
  id: 'tercer-misterio-decada',
  title: 'Tercer Misterio',
  intro: 'Jesús dice: recen así...',
  items: [
    { id: 'padre-nuestro', bead: 'large', text: PADRE_NUESTRO_TEXT },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `avemaria-${i + 1}`,
      text: AVE_MARIA_TEXT,
    })),
    { id: 'gloria', bead: 'large', text: GLORIA_TEXT },
  ],
}

const cuartoMisterioDecada: SequenceConfig = {
  id: 'cuarto-misterio-decada',
  title: 'Cuarto Misterio',
  intro: 'Jesús dice: recen así...',
  items: [
    { id: 'padre-nuestro', bead: 'large', text: PADRE_NUESTRO_TEXT },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `avemaria-${i + 1}`,
      text: AVE_MARIA_TEXT,
    })),
    { id: 'gloria', bead: 'large', text: GLORIA_TEXT },
  ],
}

const quintoMisterioDecada: SequenceConfig = {
  id: 'quinto-misterio-decada',
  title: 'Quinto Misterio',
  intro: 'Jesús dice: recen así...',
  items: [
    { id: 'padre-nuestro', bead: 'large', text: PADRE_NUESTRO_TEXT },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `avemaria-${i + 1}`,
      text: AVE_MARIA_TEXT,
    })),
    { id: 'gloria', bead: 'large', text: GLORIA_TEXT },
  ],
}

export const steps: Step[] = [
  {
    id: 'inicio',
    kind: 'text',
    paragraphs: [
      'Por la señal de la Santa Cruz, de nuestros enemigos, líbranos Señor, Dios nuestro.',
      'En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.',
    ],
  },
  {
    id: 'credo',
    kind: 'text',
    title: 'Credo',
    paragraphs: [
      'Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra.',
      'Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.',
      'Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
    ],
  },
  {
    id: 'intenciones-del-papa',
    kind: 'sequence',
    sequence: intencionesDelPapa,
  },
  {
    id: 'primer-misterio',
    kind: 'sequence',
    sequence: primerMisterioDecada,
  },
  {
    id: 'segundo-misterio',
    kind: 'sequence',
    sequence: segundoMisterioDecada,
  },
  {
    id: 'tercer-misterio',
    kind: 'sequence',
    sequence: tercerMisterioDecada,
  },
  {
    id: 'cuarto-misterio',
    kind: 'sequence',
    sequence: cuartoMisterioDecada,
  },
  {
    id: 'quinto-misterio',
    kind: 'sequence',
    sequence: quintoMisterioDecada,
  },
  {
    id: 'la-salve',
    kind: 'text',
    title: 'La Salve',
    paragraphs: [
      'Dios te salve, Reina y Madre de misericordia,\nvida, dulzura y esperanza nuestra.\n\nDios te salve.',
      'A Ti clamamos los desterrados hijos de Eva,\na Ti suspiramos, gimiendo y llorando en este valle de lágrimas.',
      'Ea, pues, Señora Abogada Nuestra,\nvuelve a nosotros tus ojos misericordiosos,\ny después de este destierro, muéstranos a Jesús,\nfruto bendito de tu vientre.',
      'Oh, clemente, oh piadosa, oh dulce Virgen María.',
      'Ruega por nosotros, Santa Madre de Dios,\npara que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.',
      'Amén',
    ],
  },
  {
    id: 'antes-de-finalizar',
    kind: 'text',
    title: 'Antes de finalizar',
    paragraphs: [],
  },
  {
    id: 'letanias',
    kind: 'sequence',
    sequence: letaniasVirgen,
  },
  {
    id: 'cierre-final',
    kind: 'text',
    paragraphs: ['En el Nombre del Padre del Hijo y del Espiritu Santo, Amen.'],
  },
]
