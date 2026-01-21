export type MysteryId = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos'

export type Mystery = {
  id: MysteryId
  label: string
  firstMysteryTitle: string
}

export const MYSTERIES: Record<MysteryId, Mystery> = {
  gozosos: {
    id: 'gozosos',
    label: 'Misterios Gozosos',
    firstMysteryTitle: 'La Anunciación del Ángel a María',
  },
  dolorosos: {
    id: 'dolorosos',
    label: 'Misterios Dolorosos',
    firstMysteryTitle: 'La Oración de Jesús en el Huerto',
  },
  gloriosos: {
    id: 'gloriosos',
    label: 'Misterios Gloriosos',
    firstMysteryTitle: 'Resurrección de Jesús',
  },
  luminosos: {
    id: 'luminosos',
    label: 'Misterios Luminosos',
    firstMysteryTitle: 'El Bautismo de Jesús en el Jordán',
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
