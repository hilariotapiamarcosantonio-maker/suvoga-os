import { buildReservationCalendarEvent } from "../src/lib/google-calendar-event.ts";

const event = buildReservationCalendarEvent({
  courseName: "Curso de prueba",
  fechaProgramada: "2026-08-25",
  inscripcionId: "INS-VALIDATION",
  studentName: "Estudiante de validación",
  whatsapp: "0000000000",
  email: "",
  provincia: "Distrito Nacional",
  anticipoEstado: "Anticipo pendiente",
});

if (!event) throw new Error("No se pudo construir el evento de validación.");
if (event.summary !== "Reserva: Curso de prueba") throw new Error("Título inválido.");
if (event.start.timeZone !== "America/Santo_Domingo") throw new Error("Timezone inválido.");
if (!event.description.includes("INS-VALIDATION")) throw new Error("Descripción incompleta.");

console.log("Google Calendar validation passed without credentials or API calls.");
