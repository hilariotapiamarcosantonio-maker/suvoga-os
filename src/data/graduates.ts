export type Graduate = {
  id: string;
  nombre: string;
  cursoCompletado: string;
  cohorte: string;
  estado: "Graduada" | "En formación" | "Práctica completada";
  imagen_url: string;
  esDemo: boolean;
  curso_id?: string;
};

export const graduatesList: Graduate[] = [
  {
    id: "grad-001",
    nombre: "Ana Delia Ortiz",
    cursoCompletado: "Diplomado de Masaje Corporal",
    cohorte: "Clase de 2025",
    estado: "Graduada",
    imagen_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    esDemo: true,
    curso_id: "CUR-003",
  },
  {
    id: "grad-002",
    nombre: "Patricia Gómez",
    cursoCompletado: "Curso de Masaje de Drenaje Linfático",
    cohorte: "Primavera 2026",
    estado: "Práctica completada",
    imagen_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop",
    esDemo: true,
    curso_id: "CUR-006",
  },
  {
    id: "grad-003",
    nombre: "Ysabel Reyes",
    cursoCompletado: "Curso de Masaje de Maderoterapia",
    cohorte: "Invierno 2025",
    estado: "Graduada",
    imagen_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop",
    esDemo: true,
    curso_id: "CUR-008",
  },
  {
    id: "grad-004",
    nombre: "Diana Marmolejos",
    cursoCompletado: "Diplomado de Masaje Corporal",
    cohorte: "Clase de 2026",
    estado: "En formación",
    imagen_url: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=200&h=200&fit=crop",
    esDemo: true,
    curso_id: "CUR-003",
  }
];

// Demo records stay available for editorial review but are never rendered in public views.
export const publishedGraduates = graduatesList.filter((graduate) => !graduate.esDemo);
