export type SequenceItem = {
  id: string
  text: string
  bead?: 'normal' | 'large'
}

export type SequenceConfig = {
  id: string
  title: string
  intro: string
  items: SequenceItem[]
}

export const PADRE_NUESTRO_TEXT =
  'Padre nuestro,\n' +
  'que estás en el cielo,\n' +
  'santificado sea tu Nombre;\n' +
  'venga a nosotros tu reino;\n' +
  'hágase tu voluntad\n' +
  'en la tierra como en el cielo.\n\n' +
  'Danos hoy nuestro pan de cada día;\n' +
  'perdona nuestras ofensas,\n' +
  'como también nosotros perdonamos\n' +
  'a los que nos ofenden;\n' +
  'no nos dejes caer en la tentación,\n' +
  'y líbranos del mal.\n\n' +
  'Amén'

export const AVE_MARIA_TEXT =
  'Dios te salve María\n' +
  'llena eres de gracia\n' +
  'el Señor es contigo;\n' +
  'bendita tú eres\n' +
  'entre todas las mujeres,\n' +
  'y bendito es el fruto\n' +
  'de tu vientre, Jesús.\n' +
  'Santa María, Madre de Dios,\n' +
  'ruega por nosotros, pecadores,\n' +
  'ahora y en la hora\n' +
  'de nuestra muerte. Amén.'

export const GLORIA_TEXT =
  'Gloria al Padre, y al Hijo, y al Espíritu\n' +
  'Santo. Como era en el principio, ahora\n' +
  'y siempre, por los siglos de los siglos. \n' +
  'Amén'

export const intencionesDelPapa: SequenceConfig = {
  id: 'intenciones-del-papa',
  title: 'Intenciones del Papa',
  intro: 'Rezamos por las intenciones del Santo Padre.',
  items: [
    {
      id: 'padre-nuestro',
      bead: 'large',
      text: PADRE_NUESTRO_TEXT,
    },
    {
      id: 'avemaria-1',
      text: AVE_MARIA_TEXT,
    },
    {
      id: 'avemaria-2',
      text: AVE_MARIA_TEXT,
    },
    {
      id: 'avemaria-3',
      text: AVE_MARIA_TEXT,
    },
    {
      id: 'gloria',
      bead: 'large',
      text: GLORIA_TEXT,
    },
  ],
}
