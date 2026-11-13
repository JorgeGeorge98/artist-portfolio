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
};

// Imported from the artist's spreadsheet. Missing descriptions remain placeholders; missing years are null.
// The first three entries feature on the homepage.
export const artworks: Artwork[] = [
  {
    "title": "Ojo",
    "description": "*Descripcion*",
    "dimensions": "24 × 30 cm",
    "year": null,
    "src": "/artworks/ojo.jpg",
    "gallerySrc": "/gallery-artworks/ojo.webp",
    "width": 2657,
    "height": 2093,
    "alt": "Ojo, pintura de Daniela Salem."
  },
  {
    "title": "Reconocimiento",
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
    "dimensions": "40 × 50 cm",
    "year": 2026,
    "src": "/artworks/reconocimiento.jpg",
    "gallerySrc": "/gallery-artworks/reconocimiento.webp",
    "width": 2569,
    "height": 3211,
    "alt": "Reconocimiento, pintura de Daniela Salem."
  },
  {
    "title": "Ruina en movimiento",
    "description": "Esta serie utiliza la metáfora de las ruinas para explorar cómo los recuerdos y las vivencias del pasado dejan una huella en nuestro presente. A través de estas formas, la obra reflexiona sobre la memoria, el paso del tiempo y la transformación personal.",
    "dimensions": "40 × 40 cm",
    "year": null,
    "src": "/artworks/ruina en movimiento.png",
    "gallerySrc": "/gallery-artworks/ruina en movimiento.webp",
    "width": 627,
    "height": 631,
    "alt": "Ruina en movimiento, pintura de Daniela Salem."
  },
  {
    "title": "Serenidad",
    "description": "En mi obra exploro cómo el cuerpo y sus vivencias se transforman a través del color. Los tonos azules y el trazo gestual articulan un espacio dinámico donde las figuras se disuelven en el entorno, desplazando la carga del dolor físico hacia la calma, la quietud y el equilibrio.\n\nEn mis obras utilizo la pintura como un vehículo de resiliencia, comunicación y sanación volcado hacia la constante evolución y la esperanza.\"",
    "dimensions": "55 × 38 cm",
    "year": 2026,
    "src": "/artworks/serenidad.jpg",
    "gallerySrc": "/gallery-artworks/serenidad.webp",
    "width": 2465,
    "height": 3610,
    "alt": "Serenidad, pintura de Daniela Salem."
  },
  {
    "title": "Florecer y renacer",
    "description": "*Descripcion*",
    "dimensions": "60 × 30 cm",
    "year": 2025,
    "src": "/artworks/florecer y renacer.jpg",
    "gallerySrc": "/gallery-artworks/florecer y renacer.webp",
    "width": 3041,
    "height": 3144,
    "alt": "Florecer y renacer, pintura de Daniela Salem."
  },
  {
    "title": "Percepcion",
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
    "dimensions": "60 × 60 cm",
    "year": 2026,
    "src": "/artworks/percepcion.jpg",
    "gallerySrc": "/gallery-artworks/percepcion.webp",
    "width": 2721,
    "height": 2772,
    "alt": "Percepcion, pintura de Daniela Salem."
  },
  {
    "title": "Presencia",
    "description": "En mis obras se hacen visibles las capas, los gestos y las huellas que forman parte de mi manera de crear. Me alejo de la búsqueda de la perfección para encontrar una voz propia, un lenguaje que cobra vida a través del color y de trazos directos y espontáneos.",
    "dimensions": "50 × 40 cm",
    "year": 2026,
    "src": "/artworks/presencia.jpg",
    "gallerySrc": "/gallery-artworks/presencia.webp",
    "width": 2243,
    "height": 2904,
    "alt": "Presencia, pintura de Daniela Salem."
  },
  {
    "title": "Introspeccion",
    "description": "Esta serie explora la tensión entre la fortaleza exterior y la vulnerabilidad interna, confrontando los cánones de simetría de la escultura clásica griega con la vivencia corporal real. Al trascender la norma estética, la obra busca un equilibrio honesto entre la materia, el cuerpo y su constante transformación.",
    "dimensions": "40 × 40 cm",
    "year": 2025,
    "src": "/artworks/introspeccion.jpg",
    "gallerySrc": "/gallery-artworks/introspeccion.webp",
    "width": 2556,
    "height": 2544,
    "alt": "Introspeccion, pintura de Daniela Salem."
  },
  {
    "title": "Equilibrio",
    "description": "Esta serie explora la tensión entre la fortaleza exterior y la vulnerabilidad interna, confrontando los cánones de simetría de la escultura clásica griega con la vivencia corporal real. Al trascender la norma estética, la obra busca un equilibrio honesto entre la materia, el cuerpo y su constante transformación.",
    "dimensions": "40 × 30 cm",
    "year": 2025,
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
    "src": "/artworks/impulso.jpg",
    "gallerySrc": "/gallery-artworks/impulso.webp",
    "width": 1821,
    "height": 2549,
    "alt": "Impulso, pintura de Daniela Salem."
  },
  {
    "title": "Memoria",
    "description": "*Descripcion*",
    "dimensions": "50 × 60 cm",
    "year": 2026,
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
    "src": "/artworks/entrelazados.jpg",
    "gallerySrc": "/gallery-artworks/entrelazados.webp",
    "width": 3205,
    "height": 3246,
    "alt": "Entrelazados, pintura de Daniela Salem."
  },
  {
    "title": "Reinterpretacion de la creacion",
    "description": "En estas obras, el dibujo de las manos reemplaza a la palabra. La postura y el movimiento de las figuras articulan un diálogo directo sobre la empatía y la conexión humana.",
    "dimensions": "28 × 35 cm",
    "year": 2023,
    "src": "/artworks/reinterpretacion de la creacion.jpg",
    "gallerySrc": "/gallery-artworks/reinterpretacion de la creacion.webp",
    "width": 2983,
    "height": 2332,
    "alt": "Reinterpretacion de la creacion, pintura de Daniela Salem."
  },
  {
    "title": "Transicion",
    "description": "Esta serie utiliza la metáfora de las ruinas para explorar cómo los recuerdos y las vivencias del pasado dejan una huella en nuestro presente. A través de estas formas, la obra reflexiona sobre la memoria, el paso del tiempo y la transformación personal.",
    "dimensions": "65 × 81 cm",
    "year": null,
    "src": "/artworks/transicion.png",
    "gallerySrc": "/gallery-artworks/transicion.webp",
    "width": 776,
    "height": 631,
    "alt": "Transicion, pintura de Daniela Salem."
  },
  {
    "title": "Mirada interior",
    "description": "Estas piezas abordan la mirada como un puente entre el entorno exterior y la vivencia personal. El dibujo de los ojos y los elementos naturales permite articular una forma propia de percibir el mundo, reconciliando lo que vemos con lo que sentimos a través del paisaje y la memoria.",
    "dimensions": "50 × 70 cm",
    "year": 2024,
    "src": "/artworks/mirada interior.jpg",
    "gallerySrc": "/gallery-artworks/mirada interior.webp",
    "width": 3067,
    "height": 2211,
    "alt": "Mirada interior, pintura de Daniela Salem."
  },
  {
    "title": "Percepcion(2)",
    "description": "Estas piezas abordan la mirada como un puente entre el entorno exterior y la vivencia personal. El dibujo de los ojos y los elementos naturales permite articular una forma propia de percibir el mundo, reconciliando lo que vemos con lo que sentimos a través del paisaje y la memoria.",
    "dimensions": "24 × 30 cm",
    "year": 2026,
    "src": "/artworks/percepcion (2).jpg",
    "gallerySrc": "/gallery-artworks/percepcion (2).webp",
    "width": 3180,
    "height": 2308,
    "alt": "Percepcion(2), pintura de Daniela Salem."
  },
  {
    "title": "Naturaleza efimera",
    "description": "*Descripcion*",
    "dimensions": "70 × 50 cm",
    "year": null,
    "src": "/artworks/naturaleza efimera.jpg",
    "gallerySrc": "/gallery-artworks/naturaleza efimera.webp",
    "width": 1336,
    "height": 923,
    "alt": "Naturaleza efimera, pintura de Daniela Salem."
  }
];
