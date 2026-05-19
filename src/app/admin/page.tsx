import {
  AdminClient,
  type AdminCourse,
  type AdminInscriptionRow,
  type AdminScheduledCourse,
} from "./AdminClient";
import { getSuvogaData } from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toDateParts(value: string) {
  if (!value) {
    return { date: "", time: "09:00" };
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      date: parsed.toISOString().slice(0, 10),
      time: parsed.toISOString().slice(11, 16),
    };
  }

  const [date = "", rawTime = "09:00"] = value.split(/[T\s]/);
  return {
    date,
    time: rawTime.slice(0, 5) || "09:00",
  };
}

function sampleSchedule(courses: AdminCourse[]): AdminScheduledCourse[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const samples = [
    { offset: 3, time: "09:00" },
    { offset: 9, time: "14:00" },
    { offset: 16, time: "10:30" },
  ];

  return courses.slice(0, 3).map((course, index) => {
    const sample = samples[index];
    const date = new Date(year, month, today.getDate() + sample.offset);
    const capacity = course.cuposTotales || 12;

    return {
      id: `sample-${course.idServicio}`,
      courseId: course.idServicio,
      courseName: course.nombre,
      date: date.toISOString().slice(0, 10),
      time: sample.time,
      capacity,
      remaining: Math.max(capacity - index - 2, 1),
    };
  });
}

export default async function AdminPage() {
  const data = await getSuvogaData();
  const pacientesById = new Map(
    data.pacientes.map((paciente) => [paciente.idPaciente, paciente])
  );
  const cursosById = new Map(
    data.catalogo.map((servicio) => [servicio.idServicio, servicio])
  );
  const anticiposByInscripcion = new Map(
    data.anticipos.map((anticipo) => [anticipo.idInscripcion, anticipo])
  );

  const rows: AdminInscriptionRow[] = data.inscripciones.map((inscripcion) => {
    const paciente = pacientesById.get(inscripcion.idPaciente);
    const curso = cursosById.get(inscripcion.idServicio);
    const anticipo = anticiposByInscripcion.get(inscripcion.idInscripcion);

    return {
      idInscripcion: inscripcion.idInscripcion,
      nombreCompleto: paciente?.nombreCompleto || "Estudiante sin nombre",
      whatsapp: paciente?.whatsapp || "",
      cursoNombre: curso?.nombre || "Curso no encontrado",
      cedula: paciente?.cedula || "",
      provincia: paciente?.provincia || "",
      estadoAnticipo: anticipo?.estadoPago || "Anticipo pendiente",
    };
  });

  const courses: AdminCourse[] = data.catalogo
    .filter((servicio) => servicio.tipo.toLowerCase().includes("curso"))
    .map((servicio) => ({
      idServicio: servicio.idServicio,
      nombre: servicio.nombre,
      tipo: servicio.tipo,
      precioTotal: servicio.precioTotal,
      montoAnticipo: servicio.montoAnticipo,
      cuposTotales: servicio.cuposTotales,
    }));

  const scheduledCourses: AdminScheduledCourse[] = data.programacionCursos
    .map((programacion) => {
      const course = cursosById.get(programacion.idServicio);
      const parts = toDateParts(programacion.fechaHora);

      return {
        id: programacion.idProgramacion,
        courseId: programacion.idServicio,
        courseName: course?.nombre || "Curso sin nombre",
        date: parts.date,
        time: parts.time,
        capacity: programacion.cuposTotales || course?.cuposTotales || 12,
        remaining:
          programacion.cuposRestantes ||
          programacion.cuposTotales ||
          course?.cuposTotales ||
          12,
      };
    })
    .filter((event) => event.date);

  return (
    <AdminClient
      rows={rows}
      courses={courses}
      scheduledCourses={
        scheduledCourses.length > 0 ? scheduledCourses : sampleSchedule(courses)
      }
      source={data.source}
    />
  );
}
