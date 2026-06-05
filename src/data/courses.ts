import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";

export const genericCourseDescription =
  "Programa formativo de bienestar y técnica aplicada, creado para desarrollar habilidades profesionales con acompañamiento cercano.";

const courseCatalog = [
  {
    nombre: "Master en Drenaje Linfático",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Taller de Drenaje Linfático",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Diplomado de Masaje Corporal",
    category: "Diplomado",
    description:
      "Formación integral: Ética, Anatomía, Relajante, Deep Tissue, Drenaje Linfático, Maderoterapia, Ventosas y Piedras Calientes. 8 clases",
  },
  {
    nombre: "Masaje Corporal Avanzado",
    category: "General",
    description:
      "Especialización técnica avanzada en masaje corporal. Incluye protocolos estructurados de Deep Tissue, biomecánica y alineación corporal del terapeuta, y rituales de experiencia de cliente de lujo en cabina.",
  },
  {
    nombre: "Taller de Aparatología 9 en 1",
    category: "Estética",
    description:
      "Uso profesional de equipos para reducción y tonificación",
  },
  {
    nombre: "Taller de Ondas de Choques",
    category: "Estética",
    description:
      "Tratamiento de alta tecnología para celulitis y dolores",
  },
  {
    nombre: "Taller de Radiofrecuencia Indiba",
    category: "Estética",
    description:
      "Tecnología proiónica para regeneración celular y reafirmación",
  },
  {
    nombre: "Maderoterapia",
    category: "Especialidades",
    description:
      "Técnica milenaria con herramientas de madera para celulitis y grasa localizada. Taller",
  },
  {
    nombre: "Madeoterapia",
    category: "Especialidades",
    description:
      "Técnica milenaria con herramientas de madera para celulitis y grasa localizada. Taller",
  },
  {
    nombre: "Taller de Vacummterapia",
    category: "Estética",
    description:
      "Técnica de succión para levantamiento de glúteos y drenaje",
  },
  {
    nombre: "Curso de Masaje Terapéutico",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Curso Taller de Limpieza Facial Básica y Profunda",
    category: "Facial",
    description:
      "Protocolos de higiene cutánea, extracción y nutrición facial",
  },
  {
    nombre: "Taller de Terapias Alternativas (Vino, chocolate, barro, café)",
    category: "Terapias Alternativas",
    description:
      "Chocolaterapia, Vinoterapia y Fangoterapia aplicada",
  },
  {
    nombre: "Taller de Kinesiotape",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Jabones Artesanales & Productos de Spa",
    category: "Emprendimiento",
    description:
      "Formación práctica en saponificación en frío y caliente, técnicas avanzadas de pigmentación natural con arcillas y extractos botánicos, empaque orgánico de diseño y métricas de optimización de costos locales para emprendimientos de spa exitosos.",
  },
  {
    nombre: "Taller de Velas de Masajes y Aromaterapia",
    category: "Emprendimiento",
    description:
      "Creación de velas de soja y parafinas con aceites esenciales",
  },
  {
    nombre: "Taller de Desintoxicación Iónica",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Taller de Manejo de Máquina G5",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Taller de Drenaje Brasileño",
    category: "Estética",
    description:
      "Técnica manual de moldeado corporal con resultados inmediatos",
  },
  {
    nombre: "Taller Manejo de Complicaciones Post Quirúrgicas",
    category: "Estética",
    description:
      "Protocolos post-operatorios para recuperación rápida y reducción de inflamación",
  },
  {
    nombre: "Taller de Terapia de Alineación Estructura Ósea",
    category: "Terapias Alternativas",
    description:
      "Ajustes estructurales básicos para mejorar la postura",
  },
  {
    nombre: "Taller de Drenaje Linfático Facial",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Taller de Masaje Desestructurante",
    category: "Talleres Prácticos",
    description:
      "Combo de 5 técnicas: Relajante, Descontracturante, Piedras Calientes, Ventosas y Parafina. Taller",
  },
  {
    nombre: "Taller de Depilación con Cera",
    category: "General",
    description: genericCourseDescription,
  },
  {
    nombre: "Curso Reflexología Podal",
    category: "Especialidades",
    description:
      "Técnica de masaje en puntos específicos de los pies para mejorar la salud general. 6 clases",
  },
  {
    nombre: "Velas Aromáticas Premium",
    category: "Emprendimiento",
    description:
      "Aprende la física de fusión de la cera de soja, cálculo termodinámico de carga de fragancia y aceites esenciales, y el diseño estético de contenedores premium para crear velas decorativas y de masaje de alta gama.",
  },
] as const;

export const suvogaCourses: SuvogaServicio[] = courseCatalog.map(
  ({ nombre, category, description }, index) => ({
    idServicio: `CUR-${String(index + 1).padStart(3, "0")}`,
    nombre,
    tipo: "Curso",
    category,
    description,
    precioTotal: 0,
    montoAnticipo: 1000,
    cuposTotales: 12,
  })
);
