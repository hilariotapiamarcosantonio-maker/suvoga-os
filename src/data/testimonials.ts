export type Testimonial = {
  id: string;
  nombre: string;
  curso: string;
  comentario: string;
  rating: number;
  fuente: string;
  esDemo: boolean;
  imagen_url: string;
  fecha: string;
  url_referencia?: string;
};

export const studentTestimonials: Testimonial[] = [
  {
    id: "test-001",
    nombre: "Laura Méndez",
    curso: "Diplomado de Masaje Corporal",
    comentario: "El diplomado cambió por completo mi enfoque. Las prácticas reales en cabina me dieron la seguridad que necesitaba para abrir mi propio espacio de spa.",
    rating: 5,
    fuente: "Alumna Graduada",
    esDemo: true,
    imagen_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    fecha: "Mayo 2026",
  },
  {
    id: "test-002",
    nombre: "Camila Rodríguez",
    curso: "Curso de Masaje de Drenaje Linfático",
    comentario: "Excelente metodología. El profesorado explica con mucha paciencia la anatomía y la dirección exacta de las manipulaciones. Totalmente recomendado.",
    rating: 5,
    fuente: "Alumna Graduada",
    esDemo: true,
    imagen_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
    fecha: "Abril 2026",
  },
  {
    id: "test-003",
    nombre: "Valeria Castillo",
    curso: "Diplomado en Estética Corporal Avanzada",
    comentario: "Una experiencia de aprendizaje de primer nivel. El ambiente es sumamente profesional y los cupos limitados permiten que realmente aprendamos practicando.",
    rating: 5,
    fuente: "Alumna Activa",
    esDemo: true,
    imagen_url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop",
    fecha: "Junio 2026",
  }
];

export const googleReviews: Testimonial[] = [
  {
    id: "g-001",
    nombre: "Sofía Santos",
    curso: "Opinión General",
    comentario: "Las instalaciones son hermosas, limpias y preparadas para simular un ambiente de spa real. La instructora es muy profesional y domina a la perfección todas las técnicas.",
    rating: 5,
    fuente: "Google Maps",
    esDemo: true,
    imagen_url: "",
    fecha: "Hace 2 semanas",
    url_referencia: "https://maps.google.com"
  },
  {
    id: "g-002",
    nombre: "Gabriela Batista",
    curso: "Curso de Piedras Calientes",
    comentario: "Tomé el curso intensivo y me encantó la calidad de los materiales y aceites esenciales. Se siente la dedicación de la academia por ofrecer una formación premium.",
    rating: 5,
    fuente: "Google Maps",
    esDemo: true,
    imagen_url: "",
    fecha: "Hace 1 mes",
    url_referencia: "https://maps.google.com"
  },
  {
    id: "g-003",
    nombre: "Marianne Pérez",
    curso: "Diplomado de Masaje Corporal",
    comentario: "Muy buena inversión. Los horarios del fin de semana son perfectos para quienes trabajamos en la semana, y sales con conocimientos directos para cabina.",
    rating: 5,
    fuente: "Google Maps",
    esDemo: true,
    imagen_url: "",
    fecha: "Hace 3 meses",
    url_referencia: "https://maps.google.com"
  }
];

// Demo records stay available for editorial review but are never rendered in public views.
export const publishedStudentTestimonials = studentTestimonials.filter(
  (testimonial) => !testimonial.esDemo
);

export const publishedGoogleReviews = googleReviews.filter(
  (review) => !review.esDemo
);
