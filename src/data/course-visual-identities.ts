import type { CourseVisualFamily } from "./course-visual-families";

// Per-course visual identity manifest for CUR-001…CUR-040.
//
// Rules honored here:
//  - IDs and publication status are NOT changed by this file.
//  - `primaryBenefit` is a professional-formation outcome derived from each
//    course's confirmed subject (title/category). It is NOT a medical claim and
//    invents no result. Phrasing stays at "what you learn to do".
//  - `coverStatus`:
//      "definitive"  → a final, course-specific premium cover exists.
//      "provisional" → a real but non-final local image is in use today.
//      "pending"     → no course-specific image exists; the premium editorial
//                      fallback is rendered (never a blank green rectangle).
//      "invalid"     → a provided URL failed validation and must not render.
//  - Local images cur-001..cur-017 (.png) and cur-018..cur-025 (.svg) exist and
//    are unique per course → "provisional". cur-026..cur-040 currently reuse
//    cur-025.svg (16-way duplicate) → marked "pending" so the fallback renders
//    instead of repeating one image. Replace coverImageUrl with a Google Drive
//    link to promote a course to "definitive".

export type CourseCoverStatus = "definitive" | "provisional" | "pending" | "invalid";
export type CourseResourceStatus = "ready" | "partial" | "pending" | "invalid";

export type CourseVisualIdentity = {
  courseId: string;
  family: CourseVisualFamily;
  eyebrow: string;
  /** Confirmed, non-medical formation benefit. */
  primaryBenefit: string;
  /** Full-resolution cover (Google Drive link). Empty until provided. */
  coverImageUrl?: string;
  /** Lighter thumbnail for cards (Google Drive link). Empty until provided. */
  coverThumbnailUrl?: string;
  /** Always describes the intended cover for accessibility. */
  coverAlt: string;
  focalPosition?: string;
  visualMotif?: string;
  accentVariant?: string;
  coverStatus: CourseCoverStatus;
  resourceStatus?: CourseResourceStatus;
};

export const COURSE_VISUAL_IDENTITIES: Record<string, CourseVisualIdentity> = {
  "CUR-001": { courseId: "CUR-001", family: "masters-diplomados", eyebrow: "Máster profesional", primaryBenefit: "Domina el drenaje linfático a nivel avanzado para la práctica profesional.", coverAlt: "Sesión de drenaje linfático avanzado realizada por una especialista.", coverStatus: "provisional" },
  "CUR-002": { courseId: "CUR-002", family: "drenaje-postoperatorio", eyebrow: "Taller postoperatorio", primaryBenefit: "Aprende a aplicar drenaje linfático en el cuidado postoperatorio.", coverAlt: "Maniobra de drenaje linfático postoperatorio sobre el cuerpo.", coverStatus: "provisional" },
  "CUR-003": { courseId: "CUR-003", family: "masters-diplomados", eyebrow: "Diplomado", primaryBenefit: "Formación integral en masaje corporal con técnica y práctica supervisada.", coverAlt: "Sesión de masaje corporal en entorno académico de SuVoGa.", coverStatus: "provisional" },
  "CUR-004": { courseId: "CUR-004", family: "masoterapia", eyebrow: "Nivel avanzado", primaryBenefit: "Perfecciona técnicas avanzadas de masaje corporal.", coverAlt: "Técnica avanzada de masaje corporal sobre la espalda.", coverStatus: "provisional" },
  "CUR-005": { courseId: "CUR-005", family: "estetica-aparatologia", eyebrow: "Aparatología estética", primaryBenefit: "Maneja con criterio la aparatología estética 9 en 1.", coverAlt: "Equipo de aparatología estética 9 en 1 en uso profesional.", coverStatus: "provisional" },
  "CUR-006": { courseId: "CUR-006", family: "estetica-aparatologia", eyebrow: "Aparatología estética", primaryBenefit: "Aplica ondas de choque en protocolos estéticos profesionales.", coverAlt: "Aplicación de ondas de choque en tratamiento estético corporal.", coverStatus: "provisional" },
  "CUR-007": { courseId: "CUR-007", family: "estetica-aparatologia", eyebrow: "Aparatología estética", primaryBenefit: "Domina la radiofrecuencia Indiba en tratamientos estéticos.", coverAlt: "Tratamiento de radiofrecuencia Indiba sobre la piel.", coverStatus: "provisional" },
  "CUR-008": { courseId: "CUR-008", family: "masoterapia", eyebrow: "Masaje y maderoterapia", primaryBenefit: "Combina masaje reductor y maderoterapia en tu práctica.", coverAlt: "Sesión de masaje reductor con instrumentos de maderoterapia.", coverStatus: "provisional" },
  "CUR-009": { courseId: "CUR-009", family: "estetica-aparatologia", eyebrow: "Aparatología estética", primaryBenefit: "Aplica la vacumterapia corporal con enfoque estético.", coverAlt: "Tratamiento de vacumterapia corporal estética.", coverStatus: "provisional" },
  "CUR-010": { courseId: "CUR-010", family: "masoterapia", eyebrow: "Masaje terapéutico", primaryBenefit: "Aprende fundamentos y técnica del masaje terapéutico.", coverAlt: "Sesión de masaje terapéutico realizada por una profesional.", coverStatus: "provisional" },
  "CUR-011": { courseId: "CUR-011", family: "facial-cosmetologia", eyebrow: "Cuidado facial", primaryBenefit: "Realiza limpieza facial básica y profunda con técnica profesional.", coverAlt: "Procedimiento de limpieza facial profunda.", coverStatus: "provisional" },
  "CUR-012": { courseId: "CUR-012", family: "terapias-complementarias", eyebrow: "Terapias alternativas", primaryBenefit: "Ofrece experiencias de spa con vino, chocolate, barro y café.", coverAlt: "Elementos naturales para terapias alternativas de spa.", coverStatus: "provisional" },
  "CUR-013": { courseId: "CUR-013", family: "terapias-complementarias", eyebrow: "Vendaje funcional", primaryBenefit: "Aplica kinesiotape con criterio técnico.", coverAlt: "Aplicación de kinesiotape sobre la musculatura.", coverStatus: "provisional" },
  "CUR-014": { courseId: "CUR-014", family: "cosmetica-artesanal", eyebrow: "Productos de spa", primaryBenefit: "Elabora tus propios productos de spa artesanales.", coverAlt: "Elaboración artesanal de productos de spa.", coverStatus: "provisional" },
  "CUR-015": { courseId: "CUR-015", family: "emprendimiento", eyebrow: "Emprendimiento creativo", primaryBenefit: "Crea velas artesanales listas para comercializar.", coverAlt: "Velas artesanales terminadas y materiales de elaboración.", coverStatus: "provisional" },
  "CUR-016": { courseId: "CUR-016", family: "terapias-complementarias", eyebrow: "Terapia complementaria", primaryBenefit: "Aplica la desintoxicación iónica como servicio de bienestar.", coverAlt: "Equipo de desintoxicación iónica en sesión de bienestar.", coverStatus: "provisional" },
  "CUR-017": { courseId: "CUR-017", family: "estetica-aparatologia", eyebrow: "Aparatología estética", primaryBenefit: "Maneja profesionalmente la máquina G5.", coverAlt: "Manejo profesional de la máquina G5 en tratamiento corporal.", coverStatus: "provisional" },
  "CUR-018": { courseId: "CUR-018", family: "drenaje-postoperatorio", eyebrow: "Drenaje brasileño", primaryBenefit: "Aprende la técnica de drenaje brasileño.", coverAlt: "Maniobra de drenaje linfático brasileño.", coverStatus: "provisional" },
  "CUR-019": { courseId: "CUR-019", family: "drenaje-postoperatorio", eyebrow: "Postquirúrgico estético", primaryBenefit: "Maneja complicaciones postquirúrgicas estéticas con protocolo.", coverAlt: "Cuidado de complicaciones postquirúrgicas estéticas.", coverStatus: "provisional" },
  "CUR-020": { courseId: "CUR-020", family: "terapias-complementarias", eyebrow: "Terapia estructural", primaryBenefit: "Aprende terapia de alineación de la estructura ósea.", coverAlt: "Sesión de terapia de alineación estructural.", coverStatus: "pending" },
  "CUR-021": { courseId: "CUR-021", family: "drenaje-postoperatorio", eyebrow: "Drenaje facial", primaryBenefit: "Aplica drenaje linfático facial con técnica precisa.", coverAlt: "Drenaje linfático facial realizado por una especialista.", coverStatus: "provisional" },
  "CUR-022": { courseId: "CUR-022", family: "masoterapia", eyebrow: "Masaje descontracturante", primaryBenefit: "Domina el masaje descontracturante profesional.", coverAlt: "Sesión de masaje descontracturante sobre la espalda.", coverStatus: "provisional" },
  "CUR-023": { courseId: "CUR-023", family: "estetica-aparatologia", eyebrow: "Estética corporal", primaryBenefit: "Realiza depilación con cera de forma profesional y segura.", coverAlt: "Procedimiento de depilación con cera.", coverStatus: "provisional" },
  "CUR-024": { courseId: "CUR-024", family: "masoterapia", eyebrow: "Reflexología", primaryBenefit: "Aprende reflexología podal aplicada.", coverAlt: "Sesión de reflexología podal sobre los pies.", coverStatus: "provisional" },
  "CUR-025": { courseId: "CUR-025", family: "masters-diplomados", eyebrow: "Curso profesional", primaryBenefit: "Formación profesional integral en cosmetología.", coverAlt: "Práctica de cosmetología profesional en cabina.", coverStatus: "provisional" },
  "CUR-026": { courseId: "CUR-026", family: "masoterapia", eyebrow: "Masaje tailandés", primaryBenefit: "Aprende la técnica del masaje tailandés.", coverAlt: "Sesión de masaje tailandés tradicional.", coverStatus: "pending" },
  "CUR-027": { courseId: "CUR-027", family: "tecnica-sanitaria", eyebrow: "Técnica sanitaria", primaryBenefit: "Ejecuta canalización e inyectología con bioseguridad en práctica supervisada.", coverAlt: "Práctica supervisada de canalización e inyectología.", coverStatus: "pending" },
  "CUR-028": { courseId: "CUR-028", family: "terapias-complementarias", eyebrow: "Terapia complementaria", primaryBenefit: "Conoce y aplica los fundamentos del biomagnetismo.", coverAlt: "Sesión de biomagnetismo con imanes terapéuticos.", coverStatus: "pending" },
  "CUR-029": { courseId: "CUR-029", family: "masoterapia", eyebrow: "Masaje con calor", primaryBenefit: "Aplica piedras calientes, pindas herbales y parafinoterapia.", coverAlt: "Masaje con piedras calientes y pindas herbales.", coverStatus: "pending" },
  "CUR-030": { courseId: "CUR-030", family: "cosmetica-artesanal", eyebrow: "Cosmética artesanal", primaryBenefit: "Elabora jabones artesanales para uso y venta.", coverAlt: "Jabones artesanales terminados y materias primas.", coverStatus: "pending" },
  "CUR-031": { courseId: "CUR-031", family: "terapias-complementarias", eyebrow: "Terapia estructural", primaryBenefit: "Aprende terapia de alineación de la estructura ósea.", coverAlt: "Sesión de terapia de alineación de la estructura ósea.", coverStatus: "pending" },
  "CUR-032": { courseId: "CUR-032", family: "terapias-complementarias", eyebrow: "Vendaje neuromuscular", primaryBenefit: "Aplica vendaje neuromuscular en pacientes postoperatorios y cicatrices.", coverAlt: "Aplicación de vendaje neuromuscular sobre una cicatriz.", coverStatus: "pending" },
  "CUR-033": { courseId: "CUR-033", family: "masoterapia", eyebrow: "Masaje deportivo", primaryBenefit: "Domina el masaje deportivo y la ventosaterapia.", coverAlt: "Masaje deportivo combinado con ventosaterapia.", coverStatus: "pending" },
  "CUR-034": { courseId: "CUR-034", family: "facial-cosmetologia", eyebrow: "Lifting facial", primaryBenefit: "Realiza lifting facial con maderoterapia.", coverAlt: "Lifting facial con instrumentos de maderoterapia.", coverStatus: "pending" },
  "CUR-035": { courseId: "CUR-035", family: "drenaje-postoperatorio", eyebrow: "Postoperatorio estético", primaryBenefit: "Aplica aparatología en pacientes postoperatorios.", coverAlt: "Aparatología aplicada en cuidado postoperatorio.", coverStatus: "pending" },
  "CUR-036": { courseId: "CUR-036", family: "estetica-aparatologia", eyebrow: "Aparatología terapéutica", primaryBenefit: "Integra aparatología en el masaje terapéutico.", coverAlt: "Aparatología aplicada al masaje terapéutico.", coverStatus: "pending" },
  "CUR-037": { courseId: "CUR-037", family: "cosmetica-artesanal", eyebrow: "Cosmética artesanal", primaryBenefit: "Formula y elabora cremas cosméticas.", coverAlt: "Elaboración de cremas cosméticas con materias primas.", coverStatus: "pending" },
  "CUR-038": { courseId: "CUR-038", family: "cosmetica-artesanal", eyebrow: "Cosmética artesanal", primaryBenefit: "Crea exfoliantes, sales de baño y bombas de baño.", coverAlt: "Exfoliantes, sales y bombas de baño artesanales.", coverStatus: "pending" },
  "CUR-039": { courseId: "CUR-039", family: "emprendimiento", eyebrow: "Emprendimiento creativo", primaryBenefit: "Elabora piezas en resina listas para comercializar.", coverAlt: "Piezas decorativas en resina terminadas.", coverStatus: "pending" },
  "CUR-040": { courseId: "CUR-040", family: "cosmetica-artesanal", eyebrow: "Cosmética capilar", primaryBenefit: "Formula productos capilares artesanales.", coverAlt: "Elaboración de productos capilares con materias primas.", coverStatus: "pending" },
};

export function getCourseVisualIdentity(courseId: string): CourseVisualIdentity | undefined {
  return COURSE_VISUAL_IDENTITIES[courseId?.toUpperCase?.()];
}
