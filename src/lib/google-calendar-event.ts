export type ReservationCalendarInput = {
  courseName: string;
  fechaProgramada: string;
  inscripcionId: string;
  studentName: string;
  whatsapp: string;
  email: string;
  provincia: string;
  anticipoEstado: string;
};

const CALENDAR_TIME_ZONE = "America/Santo_Domingo";

function safeValue(value: string, maxLength = 500) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

export function buildReservationCalendarEvent(input: ReservationCalendarInput) {
  const date = input.fechaProgramada.trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  return {
    summary: `Reserva: ${safeValue(input.courseName, 120)}`,
    description: [
      `ID de inscripción: ${safeValue(input.inscripcionId, 120)}`,
      `Estudiante: ${safeValue(input.studentName)}`,
      `WhatsApp: ${safeValue(input.whatsapp, 80)}`,
      `Correo: ${safeValue(input.email, 160) || "no provisto"}`,
      `Provincia: ${safeValue(input.provincia, 80)}`,
      `Estado de anticipo: ${safeValue(input.anticipoEstado, 80)}`,
    ].join("\n"),
    start: {
      dateTime: `${date}T09:00:00`,
      timeZone: CALENDAR_TIME_ZONE,
    },
    end: {
      dateTime: `${date}T10:00:00`,
      timeZone: CALENDAR_TIME_ZONE,
    },
  };
}
