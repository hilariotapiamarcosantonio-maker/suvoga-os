// Visual family system for SuVoGa Academia.
//
// Nine families give each kind of program its own art direction while staying
// unmistakably part of one academy (deep green, cream, linen, warm white,
// discreet gold). Families differ in accent, texture, and editorial tone — not
// in a way that fractures the brand. Used to drive course covers, the premium
// editorial fallback (never an empty green rectangle), and card/detail eyebrows.

export type CourseVisualFamily =
  | "masters-diplomados"
  | "masoterapia"
  | "drenaje-postoperatorio"
  | "estetica-aparatologia"
  | "facial-cosmetologia"
  | "terapias-complementarias"
  | "cosmetica-artesanal"
  | "emprendimiento"
  | "tecnica-sanitaria";

export type FamilyDefinition = {
  /** Public-facing name shown as an eyebrow/label. */
  publicName: string;
  /** Art-direction guidance for photography (documentation for future covers). */
  photographyDirection: string;
  texture: string;
  lighting: string;
  composition: string;
  /** Lucide icon name used as the motif on cards/fallbacks. */
  iconName: string;
  /** Brand-aligned accent color (hex). Used sparingly. */
  accent: string;
  /** Soft accent used for tints/borders. */
  accentSoft: string;
  /** Two-stop gradient for the editorial fallback cover. */
  fallbackGradient: [string, string];
  /** Overlay treatment for photographic covers. */
  overlay: string;
  typographyTreatment: string;
  focalPosition: string;
  editorialTone: string;
};

/**
 * All accents stay inside the SuVoGa palette: deep greens (#072515–#1C5A38),
 * gold (#C5A028/#D4AF37) and warm neutrals. The variation is intentionally
 * subtle so the nine families read as one academy.
 */
export const COURSE_VISUAL_FAMILIES: Record<CourseVisualFamily, FamilyDefinition> = {
  "masters-diplomados": {
    publicName: "Másters y Diplomados",
    photographyDirection: "Sesión editorial sobria, manos expertas trabajando con foco profesional y profundidad de campo.",
    texture: "Lino fino y mármol cálido",
    lighting: "Luz natural lateral, sombras suaves",
    composition: "Sujeto centrado con aire editorial",
    iconName: "GraduationCap",
    accent: "#C5A028",
    accentSoft: "#E8D9A8",
    fallbackGradient: ["#062017", "#0D3B22"],
    overlay: "Degradado verde profundo de abajo hacia arriba",
    typographyTreatment: "Serif display con tracking ajustado",
    focalPosition: "center",
    editorialTone: "Autoridad académica y formación integral de largo alcance.",
  },
  masoterapia: {
    publicName: "Masoterapia",
    photographyDirection: "Manos sobre la espalda en sesión de masaje, ambiente sereno de spa.",
    texture: "Toallas de algodón y madera natural",
    lighting: "Cálida y envolvente",
    composition: "Plano cerrado de la técnica",
    iconName: "HandHeart",
    accent: "#1C5A38",
    accentSoft: "#BEDAC7",
    fallbackGradient: ["#0A2C1C", "#175235"],
    overlay: "Degradado verde medio difuminado",
    typographyTreatment: "Serif para el título, sans para el detalle",
    focalPosition: "center",
    editorialTone: "Técnica manual, bienestar y precisión terapéutica.",
  },
  "drenaje-postoperatorio": {
    publicName: "Drenaje y Postoperatorio",
    photographyDirection: "Trabajo de drenaje linfático con guantes/manos, contexto clínico-estético cuidado.",
    texture: "Algodón clínico, superficies limpias",
    lighting: "Clara y nítida",
    composition: "Detalle de la maniobra",
    iconName: "Droplets",
    accent: "#2A6F8E",
    accentSoft: "#BCD7E2",
    fallbackGradient: ["#0A2C2E", "#124047"],
    overlay: "Degradado verde-azulado profundo",
    typographyTreatment: "Serif sobria, jerarquía marcada",
    focalPosition: "center",
    editorialTone: "Recuperación, cuidado postquirúrgico y rigor profesional.",
  },
  "estetica-aparatologia": {
    publicName: "Estética y Aparatología",
    photographyDirection: "Equipo estético profesional en uso, manos del especialista guiando el cabezal.",
    texture: "Acero, vidrio y superficies pulidas",
    lighting: "Limpia con reflejos controlados",
    composition: "Equipo en primer plano, contexto desenfocado",
    iconName: "Sparkles",
    accent: "#B98D2E",
    accentSoft: "#E6D2A0",
    fallbackGradient: ["#0B2A1D", "#103A28"],
    overlay: "Degradado verde con brillo dorado sutil",
    typographyTreatment: "Serif display con acento dorado",
    focalPosition: "center",
    editorialTone: "Tecnología estética aplicada con criterio profesional.",
  },
  "facial-cosmetologia": {
    publicName: "Facial y Cosmetología",
    photographyDirection: "Tratamiento facial, piel luminosa, manos cuidando el rostro.",
    texture: "Algodón suave y cerámica mate",
    lighting: "Suave, difusa y favorecedora",
    composition: "Rostro y manos en plano cerrado",
    iconName: "Flower2",
    accent: "#C58BA0",
    accentSoft: "#E8CDD6",
    fallbackGradient: ["#0C2A20", "#123A2C"],
    overlay: "Degradado verde con calidez rosada tenue",
    typographyTreatment: "Serif elegante, generoso interlineado",
    focalPosition: "center",
    editorialTone: "Cuidado facial profesional y cosmetología cuidada.",
  },
  "terapias-complementarias": {
    publicName: "Terapias Complementarias",
    photographyDirection: "Elementos naturales y técnicas complementarias, atmósfera holística serena.",
    texture: "Fibras naturales, piedra y vegetal",
    lighting: "Cálida y orgánica",
    composition: "Bodegón de elementos + técnica",
    iconName: "Leaf",
    accent: "#7A8B3C",
    accentSoft: "#D5DCB6",
    fallbackGradient: ["#0A2818", "#123A24"],
    overlay: "Degradado verde botánico",
    typographyTreatment: "Serif orgánica, ritmo pausado",
    focalPosition: "center",
    editorialTone: "Abordajes complementarios con base técnica responsable.",
  },
  "cosmetica-artesanal": {
    publicName: "Cosmética Artesanal",
    photographyDirection: "Elaboración de productos cosméticos: ingredientes, texturas y proceso artesanal.",
    texture: "Madera, cristal ámbar e ingredientes naturales",
    lighting: "Cálida tipo taller",
    composition: "Flat-lay de ingredientes y producto",
    iconName: "FlaskConical",
    accent: "#B07A3C",
    accentSoft: "#E5CFAE",
    fallbackGradient: ["#0C2719", "#123823"],
    overlay: "Degradado verde con tierra cálida",
    typographyTreatment: "Serif artesanal, detalle hecho a mano",
    focalPosition: "center",
    editorialTone: "Formulación natural y oficio artesanal aplicado.",
  },
  emprendimiento: {
    publicName: "Emprendimiento Creativo",
    photographyDirection: "Producto terminado listo para vender, presentación cuidada y empaque.",
    texture: "Papel kraft, lino y producto final",
    lighting: "Cálida y aspiracional",
    composition: "Producto destacado con marca",
    iconName: "Store",
    accent: "#C5A028",
    accentSoft: "#E8D9A8",
    fallbackGradient: ["#0B2A1C", "#123A26"],
    overlay: "Degradado verde con acento dorado",
    typographyTreatment: "Serif con energía comercial sobria",
    focalPosition: "center",
    editorialTone: "Oficio que se convierte en negocio propio.",
  },
  "tecnica-sanitaria": {
    publicName: "Técnica Sanitaria",
    photographyDirection: "Procedimiento clínico controlado, bioseguridad y precisión.",
    texture: "Superficies clínicas asépticas",
    lighting: "Neutra y precisa",
    composition: "Detalle técnico del procedimiento",
    iconName: "Stethoscope",
    accent: "#2F7D6B",
    accentSoft: "#BBDDD4",
    fallbackGradient: ["#082420", "#0E382F"],
    overlay: "Degradado verde clínico profundo",
    typographyTreatment: "Sans técnica para datos, serif para títulos",
    focalPosition: "center",
    editorialTone: "Procedimiento seguro, ético y centrado en el paciente.",
  },
};

export function getFamilyDefinition(family: CourseVisualFamily): FamilyDefinition {
  return COURSE_VISUAL_FAMILIES[family];
}
