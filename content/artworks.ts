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
    "description": "En mi obra exploro cómo el cuerpo y sus vivencias se transforman a través del color. Los tonos azules y el trazo gestual articulan un espacio dinámico donde las figuras se disuelven en el entorno, desplazando la carga del dolor físico hacia la calma, la quietud y el equilibrio.\n\nEn mis obras utilizo la pintura como un vehículo de resiliencia, comunicación y sanación volcado hacia la constante evolución y la esperanza.",
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
    "description": "",
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
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
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
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
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
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
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
    "description": "Esta serie explora la tensión entre la fortaleza exterior y la vulnerabilidad interna, confrontando los cánones de simetría de la escultura clásica griega con la vivencia corporal real. Al trascender la norma estética, la obra busca un equilibrio honesto entre la materia, el cuerpo y su constante transformación.",
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
    "description": "Esta serie explora la tensión entre la fortaleza exterior y la vulnerabilidad interna, confrontando los cánones de simetría de la escultura clásica griega con la vivencia corporal real. Al trascender la norma estética, la obra busca un equilibrio honesto entre la materia, el cuerpo y su constante transformación.",
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
    "description": "Esta serie explora la tensión entre la fortaleza exterior y la vulnerabilidad interna, confrontando los cánones de simetría de la escultura clásica griega con la vivencia corporal real. Al trascender la norma estética, la obra busca un equilibrio honesto entre la materia, el cuerpo y su constante transformación.",
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
    "description": "",
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
    "description": "En estas obras, el dibujo de las manos reemplaza a la palabra. La postura y el movimiento de las figuras articulan un diálogo directo sobre la empatía y la conexión humana.",
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
    "description": "En estas obras, el dibujo de las manos reemplaza a la palabra. La postura y el movimiento de las figuras articulan un diálogo directo sobre la empatía y la conexión humana.",
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
    "description": "Esta serie utiliza la metáfora de las ruinas para explorar cómo los recuerdos y las vivencias del pasado dejan una huella en nuestro presente. A través de estas formas, la obra reflexiona sobre la memoria, el paso del tiempo y la transformación personal.",
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
    "description": "Esta serie utiliza la metáfora de las ruinas para explorar cómo los recuerdos y las vivencias del pasado dejan una huella en nuestro presente. A través de estas formas, la obra reflexiona sobre la memoria, el paso del tiempo y la transformación personal.",
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
    "description": "Estas piezas abordan la mirada como un puente entre el entorno exterior y la vivencia personal. El dibujo de los ojos y los elementos naturales permite articular una forma propia de percibir el mundo, reconciliando lo que vemos con lo que sentimos a través del paisaje y la memoria.",
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
    "description": "Estas piezas abordan la mirada como un puente entre el entorno exterior y la vivencia personal. El dibujo de los ojos y los elementos naturales permite articular una forma propia de percibir el mundo, reconciliando lo que vemos con lo que sentimos a través del paisaje y la memoria.",
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
    "description": "",
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
    "description": "",
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
    "description": "",
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
    "description": "",
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
    "description": "",
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
    "description": "",
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
    "description": "",
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
