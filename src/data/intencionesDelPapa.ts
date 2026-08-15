export type SequenceItem = {
  id: string
  text: string
  bead?: 'normal' | 'large'
  response?: string
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
  'Dios te salve, María, llena eres de gracia, el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.'

export const GLORIA_TEXT =
  'Gloria al Padre, y al Hijo, y al Espíritu\n' +
  'Santo. Como era en el principio, ahora\n' +
  'y siempre, por los siglos de los siglos. \n' +
  'Amén'

export const PATER_NOSTER_TEXT =
  'Pater noster,\n' +
  'qui es in cælis,\n' +
  'sanctificétur nomen tuum;\n' +
  'advéniat regnum tuum;\n' +
  'fiat volúntas tua,\n' +
  'sicut in cælo et in terra.\n\n' +
  'Panem nostrum quotidiánum da nobis hódie;\n' +
  'et dimítte nobis débita nostra,\n' +
  'sicut et nos dimíttimus debitóribus nostris;\n' +
  'et ne nos indúcas in tentatiónem;\n' +
  'sed líbera nos a malo.\n\n' +
  'Amen'

export const AVE_MARIA_LATIN_TEXT =
  'Ave María, grátia plena, Dóminus tecum; benedícta tu in muliéribus, et benedíctus fructus ventris tui, Iesus. Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.'

export const GLORIA_LATIN_TEXT =
  'Glória Patri, et Fílio, et Spirítui\n' +
  'Sancto. Sicut erat in princípio, et nunc,\n' +
  'et semper, et in sǽcula sæculórum.\n' +
  'Amen'

export const SIGNUM_CRUCIS_PARAGRAPHS = [
  'Per signum Crucis, de inimícis nostris, líbera nos, Dómine, Deus noster.',
  'In nómine Patris, et Fílii, et Spíritus Sancti. Amen.',
]

export const CREDO_LATIN_PARAGRAPHS = [
  'Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ.',
  'Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum, qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus, descéndit ad ínferos, tértia die resurréxit a mórtuis, ascéndit ad cælos, sedet ad déxteram Dei Patris omnipoténtis. Inde ventúrus est iudicáre vivos et mórtuos.',
  'Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen.',
]

export const OUR_FATHER_EN_TEXT =
  'Our Father,\n' +
  'who art in heaven,\n' +
  'hallowed be Thy name;\n' +
  'Thy kingdom come;\n' +
  'Thy will be done\n' +
  'on earth as it is in heaven.\n\n' +
  'Give us this day our daily bread;\n' +
  'and forgive us our trespasses,\n' +
  'as we forgive those\n' +
  'who trespass against us;\n' +
  'and lead us not into temptation,\n' +
  'but deliver us from evil.\n\n' +
  'Amen'

export const HAIL_MARY_EN_TEXT =
  'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'

export const GLORY_BE_EN_TEXT =
  'Glory be to the Father,\n' +
  'and to the Son,\n' +
  'and to the Holy Spirit.\n' +
  'As it was in the beginning,\n' +
  'is now, and ever shall be,\n' +
  'world without end.\n' +
  'Amen'

export const SIGN_OF_CROSS_EN_PARAGRAPHS = [
  'By the sign of the Holy Cross, deliver us from our enemies, O Lord our God.',
  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
]

export const APOSTLES_CREED_EN_PARAGRAPHS = [
  'I believe in God, the Father Almighty, Creator of heaven and earth.',
  'And in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead.',
  'I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
]

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
