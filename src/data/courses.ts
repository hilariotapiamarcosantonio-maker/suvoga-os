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
    slug: "masaje-corporal-avanzado",
    subtitulo_premium: "Domina las técnicas profundas y ritmos de cabina para convertirte en un terapeuta de élite.",
    duracion: "8 clases (Sábados de 9:00 AM a 2:00 PM)",
    modalidad: "Práctica presencial intensiva",
    nivel: "Avanzado",
    certificado_incluido: true,
    estado_publicacion: "Publicado",
    orden_destacado: 1,
    imagen_url: "/images/courses/cur-004.png",
    imagen_prompt: "A premium wellness clinic spa room header background with a 16:9 aspect ratio. A professional therapist performing a relaxing massage treatment. The color palette features rich forest green towels, delicate ivory bed linen, warm amber candles glowing softly in the background, and raw botanicals like lavender and eucalyptus scattered around. Minimalist, serene, elegant, professional studio lighting.",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_drive_url: "", // Empty to verify "próximamente" state
    incluye: [
      "Manual técnico digital y material didáctico ilustrado.",
      "Kit de aceites esenciales y cremas para prácticas en cabina.",
      "Acceso a camillas profesionales y equipamiento de spa de última generación durante el curso.",
      "Doble certificación: Diploma SuVoGa Escuela de Masajes y aval de la asociación nacional de terapeutas."
    ],
    para_quien_es: [
      "Terapeutas de masaje que buscan especializarse en técnicas de tejido profundo y biomecánica corporal.",
      "Estudiantes de fisioterapia y kinesiología que desean complementar sus habilidades manuales.",
      "Emprendedores de bienestar y spa que desean ofrecer servicios premium de alta gama en sus centros."
    ],
    que_aprenderas: [
      "Fisiología y anatomía aplicada: biomecánica del terapeuta para evitar lesiones y fatiga.",
      "Protocolos paso a paso de Deep Tissue: presión controlada, uso de antebrazos, codos y nudillos.",
      "Rituales de experiencia de cliente: ambientación con aromaterapia, toallas calientes y modulación de la voz.",
      "Gestión y venta de servicios de masaje de alto valor y fidelización de clientes premium."
    ]
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
    slug: "jabones-artesanales-productos-spa",
    subtitulo_premium: "Aprende el arte de la formulación cosmética botánica y crea tu propia marca de spa desde cero.",
    duracion: "4 clases presenciales",
    modalidad: "Taller teórico-práctico presencial",
    nivel: "Básico a Intermedio",
    certificado_incluido: true,
    estado_publicacion: "Publicado",
    orden_destacado: 2,
    imagen_url: "/images/courses/cur-015.png",
    imagen_prompt: "An organic artisan soap making workshop scene with a 16:9 aspect ratio. Handmade soap bars in various saponification phases are arranged on a wooden table. Rich forest green and ivory packaging wraps, twine, and raw botanicals like rosemary and citrus slices are visible. The background is a rustic botanical spa lab with a soft, warm amber candle fire glow. Premium product photography style, clean and aesthetic.",
    youtube_url: "", // Empty to verify "próximamente" or hide video
    pdf_drive_url: "https://drive.google.com/file/d/1_H23456/view?usp=sharing",
    incluye: [
      "Ingredientes orgánicos premium: aceites vegetales puros, aceites esenciales, arcillas y colorantes botánicos.",
      "Molde de silicona profesional reutilizable y cortador de jabón manual.",
      "Guía completa de formulación y calculadora de saponificación SuVoGa.",
      "Certificado de aprobación en Cosmética Artesanal & Jabonería de Spa."
    ],
    para_quien_es: [
      "Emprendedores que sueñan con lanzar una línea de productos de baño y spa ecológicos y personalizados.",
      "Terapeutas y dueños de spa que desean elaborar amenidades exclusivas para sus establecimientos.",
      "Aficionados al cuidado de la piel natural que buscan formular productos libres de químicos sintéticos."
    ],
    que_aprenderas: [
      "Química cosmética: proceso de saponificación en frío (Cold Process) y en caliente (Hot Process).",
      "Diseño de recetas equilibradas utilizando el índice de yodo, dureza, limpieza y acondicionado.",
      "Técnicas de coloración natural con polvos botánicos y arcillas, y técnicas de diseño visual (swirls, capas).",
      "Costeo de productos, etiquetado regulatorio y estrategias de empaque de lujo para el mercado premium."
    ]
  },
  {
    nombre: "Taller de Velas de Masajes y Aromaterapia",
    category: "Emprendimiento",
    description:
      "Creación de velas de soja y parafinas con aceites esenciales",
    slug: "velas-masajes-aromaterapia",
    subtitulo_premium: "Domina la termodinámica de la cera de soja y crea velas de masaje y decorativas de lujo.",
    duracion: "3 clases teórico-prácticas",
    modalidad: "Taller práctico con kit incluido",
    nivel: "Todos los niveles",
    certificado_incluido: true,
    estado_publicacion: "Publicado",
    orden_destacado: 3,
    imagen_url: "/images/courses/cur-016.png",
    imagen_prompt: "Luxurious hand-poured soy wax candles in elegant amber glass containers with a 16:9 aspect ratio. The candles have lit cotton wicks casting a warm amber candle fire glow. Raw botanicals, dried flower petals, and ivory wax flakes are scattered around the candles on a dark forest green marble surface. Sophisticated and calm spa-like atmosphere, high-ticket product shot, clean composition.",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_drive_url: "https://drive.google.com/file/d/1_I34567/view?usp=sharing",
    incluye: [
      "Kit de inicio completo: 1kg de cera de soja premium, pabilos de algodón y madera, y aceites aromáticos aptos para cosmética.",
      "3 envases de vidrio ámbar de alta gama con tapas herméticas.",
      "Termómetro digital y jarra de vertido de precisión de acero inoxidable.",
      "Certificación académica en Creación de Velas Aromáticas y de Masaje Spa."
    ],
    para_quien_es: [
      "Apasionados de la decoración del hogar and el bienestar que buscan crear velas ecológicas de la más alta calidad.",
      "Emprendedores que deseen iniciar un negocio rentable de velas artesanales premium.",
      "Masajistas y profesionales de spa interesados en incorporar velas de masaje tibias en su menú de servicios."
    ],
    que_aprenderas: [
      "La física de la cera de soja: temperaturas de fusión, vertido y curado óptimas para evitar imperfecciones.",
      "Cálculo termodinámico de carga de fragancia (fragrance load) y compatibilidad de aceites esenciales.",
      "Técnicas avanzadas de vertido, colocación de pabilos dobles y diseño estético minimalista.",
      "Formulación de velas de masaje corporales seguras para la piel y técnicas de aplicación terapéutica tibia."
    ]
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
] as const;

export const suvogaCourses: SuvogaServicio[] = courseCatalog.map(
  (course, index) => {
    const { nombre, category, description } = course;
    const rest = course as unknown as Partial<SuvogaServicio>;
    return {
      idServicio: `CUR-${String(index + 1).padStart(3, "0")}`,
      nombre,
      tipo: "Curso",
      category,
      description,
      precioTotal: 0,
      montoAnticipo: 1000,
      cuposTotales: 12,
      slug: rest.slug || nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      subtitulo_premium: rest.subtitulo_premium || "",
      duracion: rest.duracion || "Duración según calendario",
      modalidad: rest.modalidad || "Práctica guiada presencial",
      incluye: rest.incluye || [],
      para_quien_es: rest.para_quien_es || [],
      que_aprenderas: rest.que_aprenderas || [],
      imagen_url: rest.imagen_url || `/images/courses/cur-${String(index + 1).padStart(3, "0")}.png`,
      imagen_prompt: rest.imagen_prompt || "",
      youtube_url: rest.youtube_url || "",
      pdf_drive_url: rest.pdf_drive_url || "",
      nivel: rest.nivel || "Todos los niveles",
      certificado_incluido: rest.certificado_incluido ?? true,
      estado_publicacion: rest.estado_publicacion || "Publicado",
      orden_destacado: rest.orden_destacado || 99,
    };
  }
);
