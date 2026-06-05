import {
  AdminClient,
  type AdminCourse,
  type AdminCrmRow,
  type AdminScheduledCourse,
  type AdminCourseView,
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

/** Derive a CRM status label from payment + attendance data */
function deriveCrmStatus(
  estadoAsistencia: string,
  estadoPago: string,
  montoPagado: number,
  balancePendiente: number
): string {
  const asist = estadoAsistencia.toLowerCase();
  const pago = estadoPago.toLowerCase();

  if (asist.includes("asistió") || asist.includes("asistio") || asist.includes("completó") || asist.includes("completo")) {
    return balancePendiente > 0 ? "Balance pendiente" : "Finalizada";
  }
  if (asist.includes("no asistió") || asist.includes("no asistio") || asist.includes("ausente")) {
    return "No asistió";
  }
  if (asist.includes("reprogramar") || asist.includes("canceló") || asist.includes("cancelo")) {
    return "Reprogramar";
  }
  if (pago.includes("pagado") || pago.includes("completo") || pago.includes("completado")) {
    return balancePendiente <= 0 ? "Inscripción completa" : "Balance pendiente";
  }
  if (pago.includes("parcial") || (montoPagado > 0 && balancePendiente > 0)) {
    return "Anticipo confirmado";
  }
  if (montoPagado <= 0) {
    return "Anticipo pendiente";
  }
  return "Nueva inscripción";
}

export default async function AdminPage() {
  const data = await getSuvogaData();

  const pacientesById = new Map(
    data.pacientes.map((p) => [p.idPaciente, p])
  );
  const cursosById = new Map(
    data.catalogo.map((s) => [s.idServicio, s])
  );
  const anticiposByInscripcion = new Map(
    data.anticipos.map((a) => [a.idInscripcion, a])
  );
  const programacionByCurso = new Map<string, typeof data.programacionCursos[0]>();
  for (const prog of data.programacionCursos) {
    if (!programacionByCurso.has(prog.idServicio)) {
      programacionByCurso.set(prog.idServicio, prog);
    }
  }

  // Full CRM rows with all available fields
  const crmRows: AdminCrmRow[] = data.inscripciones.map((inscripcion) => {
    const paciente = pacientesById.get(inscripcion.idPaciente);
    const curso = cursosById.get(inscripcion.idServicio);
    const anticipo = anticiposByInscripcion.get(inscripcion.idInscripcion);
    const prog = programacionByCurso.get(inscripcion.idServicio);

    const montoPagado = anticipo?.montoPagado ?? 0;
    const balancePendiente = anticipo?.balancePendiente ?? 0;
    const estadoAsistencia = inscripcion.estadoAsistencia || "";
    const estadoPago = anticipo?.estadoPago || "";

    return {
      idInscripcion: inscripcion.idInscripcion,
      idServicio: inscripcion.idServicio,
      nombreCompleto: paciente?.nombreCompleto || "Estudiante sin nombre",
      whatsapp: paciente?.whatsapp || "",
      cedula: paciente?.cedula || "",
      provincia: paciente?.provincia || "",
      cursoNombre: curso?.nombre || "Curso no encontrado",
      fechaProgramada: inscripcion.fechaProgramada || prog?.fechaHora || "",
      estadoAsistencia,
      estadoPago,
      montoPagado,
      balancePendiente,
      crmStatus: deriveCrmStatus(estadoAsistencia, estadoPago, montoPagado, balancePendiente),
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

  // Course View: aggregate per course
  const courseViewMap = new Map<string, AdminCourseView>();

  for (const curso of courses) {
    const prog = programacionByCurso.get(curso.idServicio);
    const scheduledList = data.programacionCursos.filter(
      (p) => p.idServicio === curso.idServicio
    );
    const nextProg = scheduledList.sort((a, b) =>
      (a.fechaHora || "").localeCompare(b.fechaHora || "")
    )[0];

    courseViewMap.set(curso.idServicio, {
      idServicio: curso.idServicio,
      nombre: curso.nombre,
      cuposTotales: prog?.cuposTotales || curso.cuposTotales || 12,
      cuposRestantes: prog?.cuposRestantes || curso.cuposTotales || 12,
      inscritas: 0,
      anticiposPendientes: 0,
      pagosRecibidos: 0,
      balancePendienteTotal: 0,
      proximaFecha: nextProg?.fechaHora || "",
    });
  }

  for (const row of crmRows) {
    const view = courseViewMap.get(row.idServicio);
    if (!view) continue;
    view.inscritas += 1;
    if (row.montoPagado > 0) view.pagosRecibidos += row.montoPagado;
    if (row.balancePendiente > 0) view.balancePendienteTotal += row.balancePendiente;
    const isPend =
      !row.estadoPago ||
      row.estadoPago.toLowerCase().includes("pendiente") ||
      row.estadoPago.toLowerCase().includes("parcial");
    if (isPend) view.anticiposPendientes += 1;
  }

  const courseViews = Array.from(courseViewMap.values()).sort(
    (a, b) => b.inscritas - a.inscritas
  );

  return (
    <AdminClient
      crmRows={crmRows}
      courses={courses}
      scheduledCourses={
        scheduledCourses.length > 0 ? scheduledCourses : sampleSchedule(courses)
      }
      courseViews={courseViews}
      source={data.source}
    />
  );
}
