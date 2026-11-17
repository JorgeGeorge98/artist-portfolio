export type Artwork = {
  title: string;
  description: string;
  dimensions: string;
  year: number | null;
  src: string;
  gallerySrc: string;
  // Actual image pixel dimensions, separate from the painting measurements above.
  width: number;
  height: number;
  alt: string;
  sold?: boolean;
  price: number | null;
  priceNote?: string;
};

// Updated from Obras.xlsx; pixel dimensions read from the current original images.
export const artworks: Artwork[] = [
  {
    "title": "Serenidad",
    "description": "Reflejo de la estabilidad alcanzada tras una etapa de cambios y transición. El busto de perfil revela el paso del movimiento hacia un encuentro con el equilibrio y la calma.",
    "dimensions": "55 × 38 cm",
    "year": 2026,
    "price": 250,
    "src": "/artworks/serenidad.jpg",
    "gallerySrc": "/gallery-artworks/serenidad.webp",
    "width": 2465,
    "height": 3610,
    "alt": "Serenidad, pintura de Daniela Salem."
  },
  {
    "title": "Florecer y Renacer",
    "description": "Florecer: Una invitación a nuevas experiencias y a la creación de un espacio lleno de sueños y ambiciones. Esta obra propone un punto de encuentro, inspiración y motivación donde la naturaleza y la figura humana se entrelazan.\n\nRenacer: Esta obra refleja el despertar de mi mundo interior y la fuerza para resurgir y reconstruir mis ambiciones y sueños. Nace desde la intención de dar vida a nuevas oportunidades, dejando atrás las inseguridades, los miedos y los bloqueos.",
    "dimensions": "60 × 30 cm cada obra",
    "year": 2026,
    "price": 200,
    "priceNote": "por obra",
    "src": "/artworks/florecer y renacer.jpg",
    "gallerySrc": "/gallery-artworks/florecer y renacer.webp",
    "width": 3041,
    "height": 3144,
    "alt": "Florecer y Renacer, pintura de Daniela Salem."
  },
  {
    "title": "Percepción",
    "description": "La forma en que percibimos nuestro entorno está influenciada por nuestras experiencias y vivencias personales. El cuerpo se presenta con una mirada reflexiva e inmersiva, adentrándose en un espacio lleno de recuerdos emotivos, donde cada huella demuestra el paso del tiempo y la forma de sobrellevar lo vivido.",
    "dimensions": "60 × 60 cm",
    "year": 2026,
    "price": 260,
    "src": "/artworks/percepcion.jpg",
    "gallerySrc": "/gallery-artworks/percepcion.webp",
    "width": 2721,
    "height": 2772,
    "alt": "Percepción, pintura de Daniela Salem."
  },
  {
    "title": "Presencia",
    "description": "Reflejo de un estado de cambio y movimiento donde cada vivencia forma parte de mi propia transformación. El gesto de la figura transmite la superación personal, recordando que el tiempo y la constancia son fundamentales en los días con menos fuerza y energía.",
    "dimensions": "50 × 40 cm",
    "year": 2026,
    "price": 210,
    "src": "/artworks/presencia.jpg",
    "gallerySrc": "/gallery-artworks/presencia.webp",
    "width": 2243,
    "height": 2904,
    "alt": "Presencia, pintura de Daniela Salem."
  },
  {
    "title": "Reconocimiento",
    "description": "Un proceso de exploración interior que nos invita a reconocer y comprender nuestras emociones, estableciendo un diálogo con nosotros mismos en la búsqueda de equilibrio y armonía interior.",
    "dimensions": "40 × 50 cm",
    "year": 2026,
    "price": 190,
    "src": "/artworks/reconocimiento.jpg",
    "gallerySrc": "/gallery-artworks/reconocimiento.webp",
    "width": 3420,
    "height": 4335,
    "alt": "Reconocimiento, pintura de Daniela Salem."
  },
  {
    "title": "Introspección",
    "description": "Un espacio de cambio y transformación que surge ante situaciones de incertidumbre e inquietud. Un punto de inflexión en el que la mente y el alma entran en diálogo, dando paso a una mirada más profunda hacia nuestro interior.",
    "dimensions": "40 × 40 cm",
    "year": 2025,
    "price": 190,
    "src": "/artworks/introspeccion.jpg",
    "gallerySrc": "/gallery-artworks/introspeccion.webp",
    "width": 2556,
    "height": 2544,
    "alt": "Introspección, pintura de Daniela Salem."
  },
  {
    "title": "Equilibrio",
    "description": "La búsqueda de un punto medio entre el ritmo de la vida cotidiana y la necesidad de encontrar calma. A través del yoga y la meditación, trabajamos la conexión entre cuerpo y mente, buscando un balance que nos permita mantenernos centrados y alcanzar una mayor estabilidad interior.",
    "dimensions": "40 × 30 cm",
    "year": 2025,
    "price": 150,
    "src": "/artworks/equilibrio.jpg",
    "gallerySrc": "/gallery-artworks/equilibrio.webp",
    "width": 2364,
    "height": 3201,
    "alt": "Equilibrio, pintura de Daniela Salem."
  },
  {
    "title": "Impulso",
    "description": "Una fuerza interior que despierta el deseo de transformar aquello que nos rodea. Un impulso espontáneo que nace de nuestro mundo emocional y se manifiesta a través del cuerpo como una necesidad de cambio.",
    "dimensions": "50 × 70 cm",
    "year": 2025,
    "price": 270,
    "src": "/artworks/impulso.jpg",
    "gallerySrc": "/gallery-artworks/impulso.webp",
    "width": 3408,
    "height": 4918,
    "alt": "Impulso, pintura de Daniela Salem."
  },
  {
    "title": "Memoria",
    "description": "Una representación de todos esos recuerdos y experiencias que dejan huella en nuestras vidas. Desde los viajes y los momentos compartidos con nuestra familia hasta las personas que nos acompañan en las etapas difíciles y las vivencias que nos ayudan a crecer. Recuerdos que permanecen con nosotros, nos conectan con quienes fuimos y forman parte de nuestra historia.",
    "dimensions": "50 × 60 cm",
    "year": 2026,
    "price": 270,
    "src": "/artworks/memoria.jpg",
    "gallerySrc": "/gallery-artworks/memoria.webp",
    "width": 3191,
    "height": 2638,
    "alt": "Memoria, pintura de Daniela Salem."
  },
  {
    "title": "Entrelazados",
    "description": "El pasado, el presente y el futuro están conectados y forman parte de nuestra historia. La obra representa la relación entre estas tres etapas y la importancia de encontrar un equilibrio entre ellas: aceptar lo que hemos vivido, aprender a disfrutar del presente y mirar al futuro sin dejar que la incertidumbre nos limite.",
    "dimensions": "50 × 50 cm",
    "year": 2026,
    "price": 250,
    "src": "/artworks/entrelazados.jpg",
    "gallerySrc": "/gallery-artworks/entrelazados.webp",
    "width": 3158,
    "height": 3178,
    "alt": "Entrelazados, pintura de Daniela Salem."
  },
  {
    "title": "Reinterpretación de la creación",
    "description": "Una reflexión sobre el vínculo entre lo divino y lo humano, y la conexión con una fuerza que va más allá de nosotros mismos. Una búsqueda que nace de la necesidad de encontrar sentido, orientación y un punto de apoyo ante las incertidumbres y dificultades de la vida.",
    "dimensions": "28 × 35 cm",
    "year": 2023,
    "price": 130,
    "src": "/artworks/reinterpretacion de la creacion.jpg",
    "gallerySrc": "/gallery-artworks/reinterpretacion de la creacion.webp",
    "width": 2983,
    "height": 2332,
    "alt": "Reinterpretación de la creación, pintura de Daniela Salem."
  },
  {
    "title": "Ruina en movimiento",
    "description": "La ruina representa la huella de aquello que fue y que, de alguna manera, sigue presente en nosotros. Las experiencias que vivimos nos transforman y dejan una marca en nuestra historia personal, influyendo en nuestra manera de ser y de entender el mundo.",
    "dimensions": "40 × 40 cm",
    "year": 2026,
    "price": 110,
    "src": "/artworks/ruina en movimiento.png",
    "gallerySrc": "/gallery-artworks/ruina en movimiento.webp",
    "width": 627,
    "height": 631,
    "alt": "Ruina en movimiento, pintura de Daniela Salem."
  },
  {
    "title": "Transición",
    "description": "Un proceso de transformación personal marcado por las experiencias, las dificultades y la capacidad de seguir adelante. Una etapa en la que el dolor, la fatiga y el cansancio estuvieron presentes, pero no fueron un impedimento para avanzar. Aprender a convivir con las dificultades, superar los propios límites y encontrar nuevas formas de continuar.",
    "dimensions": "65 × 81 cm",
    "year": 2025,
    "price": 420,
    "src": "/artworks/transicion.jpg",
    "gallerySrc": "/gallery-artworks/transicion.webp",
    "width": 1326,
    "height": 1068,
    "alt": "Transición, pintura de Daniela Salem."
  },
  {
    "title": "Mirada interior",
    "description": "Una invitación a mirar hacia dentro, reconocer aquello que necesitamos cambiar o mejorar y entender mejor lo que sentimos. Un proceso personal en el que aprendemos a sanar heridas, perdonar y dejar atrás aquello que nos sigue afectando, para sentirnos mejor con nosotros mismos y encontrar un poco más de paz.",
    "dimensions": "50 × 70 cm",
    "year": 2024,
    "price": null,
    "src": "/artworks/mirada interior.jpg",
    "gallerySrc": "/gallery-artworks/mirada interior.webp",
    "width": 3067,
    "height": 2211,
    "alt": "Mirada interior, pintura de Daniela Salem.",
    "sold": true
  },
  {
    "title": "Portal al alma",
    "description": "Una conexión con nuestra esencia y nuestra parte más sensible, con aquello que nos define y nos hace únicos. Una invitación a descubrir y aceptar quiénes somos, más allá de las expectativas y opiniones de los demás. Reconocer nuestra autenticidad y valorar aquello que nos diferencia.",
    "dimensions": "24 × 30 cm",
    "year": 2026,
    "price": 80,
    "src": "/artworks/portal al alma.jpg",
    "gallerySrc": "/gallery-artworks/portal al alma.webp",
    "width": 2657,
    "height": 2093,
    "alt": "Portal al alma, pintura de Daniela Salem."
  },
  {
    "title": "Umbral",
    "description": "Nuestra mirada influye en la forma en que vemos, interpretamos y entendemos lo que nos rodea. Cada persona percibe una misma situación de manera distinta, según sus experiencias y su forma de sentir. La obra invita a reflexionar sobre cómo nuestra manera de mirar puede cambiar la forma en que vivimos y damos sentido a las cosas.",
    "dimensions": "50 × 60 cm",
    "year": 2026,
    "price": 230,
    "src": "/artworks/umbral.jpg",
    "gallerySrc": "/gallery-artworks/umbral.webp",
    "width": 3724,
    "height": 3007,
    "alt": "Umbral, pintura de Daniela Salem."
  },
  {
    "title": "Naturaleza efímera",
    "description": "La naturaleza nos ofrece un espacio para alejarnos del ritmo del día a día y volver a conectar con nosotros mismos. A través de sus formas, colores y sensaciones, despierta nuestra parte más sensible y nos acerca a aquello que a veces dejamos de lado, nuestras emociones y nuestra esencia.",
    "dimensions": "70 × 50 cm",
    "year": 2026,
    "price": null,
    "src": "/artworks/IMG-20260819-WA0019.jpg",
    "gallerySrc": "/gallery-artworks/IMG-20260819-WA0019.webp",
    "width": 1336,
    "height": 923,
    "alt": "Naturaleza efímera, pintura de Daniela Salem.",
    "sold": true
  },
  {
    "title": "Visión",
    "description": "La mirada nos conecta con el mundo que nos rodea, con las personas y con las experiencias que forman parte de nuestra vida. Nuestra forma de percibir lo que sucede influye en cómo lo comprendemos, lo aceptamos y lo vivimos. La actitud con la que nos situamos ante cada situación puede cambiar nuestra perspectiva, ayudándonos a mantener la esperanza ante las dificultades y a seguir adelante sin perder de vista lo que realmente importa.",
    "dimensions": "50 × 70 cm",
    "year": 2026,
    "price": 250,
    "src": "/artworks/vision.jpg",
    "gallerySrc": "/gallery-artworks/vision.webp",
    "width": 4671,
    "height": 3311,
    "alt": "Visión, pintura de Daniela Salem."
  },
  {
    "title": "Diálogo entre miradas",
    "description": "A lo largo de la vida atravesamos distintas etapas que dejan huella en nuestra forma de ser. La obra representa el encuentro entre diferentes versiones de nosotros mismos y cómo se relacionan a través de nuestras experiencias. Esta conexión también nos acerca a la naturaleza y a todo aquello que despierta nuestra sensibilidad, nos transmite calma y nos ayuda a reconocer quiénes somos más allá de lo vivido.",
    "dimensions": "40 × 60 cm",
    "year": 2026,
    "price": 180,
    "src": "/artworks/dialogo entre miradas.jpg",
    "gallerySrc": "/gallery-artworks/dialogo entre miradas.webp",
    "width": 3111,
    "height": 4681,
    "alt": "Diálogo entre miradas, pintura de Daniela Salem."
  },
  {
    "title": "Armonía",
    "description": "La búsqueda de un espacio de calma en el que alejarnos del ruido exterior y de los pensamientos que nos acompañan en el día a día. Un lugar donde poder detenernos, conectar con nosotros mismos y encontrar esa tranquilidad que nos permite sentirnos en sintonía con lo que somos.",
    "dimensions": "60 × 60 cm",
    "year": 2026,
    "price": 240,
    "src": "/artworks/armonia.jpg",
    "gallerySrc": "/gallery-artworks/armonia.webp",
    "width": 3597,
    "height": 3758,
    "alt": "Armonía, pintura de Daniela Salem."
  },
  {
    "title": "Entre pétalos",
    "description": "Estar rodeados de naturaleza nos permite desconectar del ritmo cotidiano y conectar con nuestras sensaciones. Los colores, las formas y los aromas de las flores despiertan nuestra sensibilidad y nos trasladan a un espacio diferente, donde podemos dejar de lado las preocupaciones y disfrutar de lo que nos rodea.",
    "dimensions": "35 × 27 cm",
    "year": 2026,
    "price": 120,
    "src": "/artworks/entre petalos.jpg",
    "gallerySrc": "/gallery-artworks/entre petalos.webp",
    "width": 3546,
    "height": 4651,
    "alt": "Entre pétalos, pintura de Daniela Salem."
  },
  {
    "title": "Viaje onírico",
    "description": "Una conexión con nuestra parte más natural y sensible, donde podemos mostrarnos tal y como somos, sin máscaras ni apariencias. El cuerpo desnudo representa esa vulnerabilidad y la libertad de dejar atrás los miedos y las experiencias que nos han condicionado. La naturaleza nos acerca a esa parte más auténtica de nosotros mismos, donde podemos conectar con lo que sentimos y con quienes realmente somos.",
    "dimensions": "40 × 60 cm",
    "year": 2026,
    "price": 200,
    "src": "/artworks/viaje onirico.jpg",
    "gallerySrc": "/gallery-artworks/viaje onirico.webp",
    "width": 1017,
    "height": 1273,
    "alt": "Viaje onírico, pintura de Daniela Salem."
  }
];
