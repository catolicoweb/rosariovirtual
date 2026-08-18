export type MysteryId = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos'

export type Mystery = {
  id: MysteryId
  label: string
  firstMysteryTitle: string
  days: string
}

export const MYSTERIES: Record<MysteryId, Mystery> = {
  gozosos: {
    id: 'gozosos',
    label: 'Misterios Gozosos',
    firstMysteryTitle: 'La Anunciación del Ángel a María',
    days: 'Lunes y Sábados',
  },
  dolorosos: {
    id: 'dolorosos',
    label: 'Misterios Dolorosos',
    firstMysteryTitle: 'La Oración de Jesús en el Huerto',
    days: 'Martes y Viernes',
  },
  gloriosos: {
    id: 'gloriosos',
    label: 'Misterios Gloriosos',
    firstMysteryTitle: 'Resurrección de Jesús',
    days: 'Miércoles y Domingos',
  },
  luminosos: {
    id: 'luminosos',
    label: 'Misterios Luminosos',
    firstMysteryTitle: 'El Bautismo de Jesús en el Jordán',
    days: 'Jueves',
  },
}

export const MYSTERY_NAMES: Record<MysteryId, { es: string[]; en: string[] }> = {
  gozosos: {
    es: ['La Anunciación', 'La Visitación', 'El Nacimiento de Jesús', 'La Presentación en el Templo', 'El Niño Jesús Perdido y Hallado'],
    en: ['The Annunciation', 'The Visitation', 'The Nativity', 'The Presentation', 'Finding in the Temple'],
  },
  dolorosos: {
    es: ['La Oración en el Huerto', 'La Flagelación', 'La Coronación de Espinas', 'Jesús con la Cruz a Cuestas', 'La Crucifixión'],
    en: ['The Agony in the Garden', 'The Scourging at the Pillar', 'The Crowning with Thorns', 'Carrying the Cross', 'The Crucifixion'],
  },
  gloriosos: {
    es: ['La Resurrección', 'La Ascensión', 'La Venida del Espíritu Santo', 'La Asunción de María', 'La Coronación de la Virgen'],
    en: ['The Resurrection', 'The Ascension', 'The Descent of the Holy Spirit', 'The Assumption', 'The Coronation of Mary'],
  },
  luminosos: {
    es: ['El Bautismo de Jesús', 'Las Bodas de Caná', 'La Proclamación del Reino', 'La Transfiguración', 'La Institución de la Eucaristía'],
    en: ['The Baptism of Jesus', 'The Wedding at Cana', 'Proclamation of the Kingdom', 'The Transfiguration', 'The Institution of the Eucharist'],
  },
}

export const MYSTERY_DESCRIPTIONS: Record<MysteryId, { es: string; en: string }> = {
  gozosos: {
    en: 'Five joyful mysteries contemplating the Incarnation and early life of Jesus Christ, with the Blessed Virgin Mary.',
    es: 'Cinco misterios gozosos que contemplan la Encarnación y la vida temprana de Jesucristo, junto a la Santísima Virgen María.',
  },
  dolorosos: {
    en: 'Five sorrowful mysteries contemplating the suffering and Passion of Jesus Christ for the redemption of mankind.',
    es: 'Cinco misterios dolorosos que contemplan el sufrimiento y la Pasión de Jesucristo por la redención de la humanidad.',
  },
  gloriosos: {
    en: 'Five glorious mysteries contemplating the Resurrection of Christ and the glory that awaits us in Heaven.',
    es: 'Cinco misterios gloriosos que contemplan la Resurrección de Cristo y la gloria que nos espera en el Cielo.',
  },
  luminosos: {
    en: 'Five luminous mysteries contemplating key moments from the public ministry of Jesus Christ.',
    es: 'Cinco misterios luminosos que contemplan momentos clave del ministerio público de Jesucristo.',
  },
}

const mysteryByDay: Record<number, MysteryId> = {
  0: 'gloriosos',
  1: 'gozosos',
  2: 'dolorosos',
  3: 'gloriosos',
  4: 'luminosos',
  5: 'dolorosos',
  6: 'gozosos',
}

export function getMysteryOfDay(date: Date = new Date()): Mystery {
  const day = date.getDay()
  const id = mysteryByDay[day] ?? 'gozosos'
  return MYSTERIES[id]
}
