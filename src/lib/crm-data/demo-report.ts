import type {
  SuvogaInscripcionCita,
  SuvogaPaciente,
  SuvogaPago,
} from "./get-suvoga-data";

export type PossibleDemoRecord = {
  tipoRegistro: "Paciente" | "Inscripción" | "Pago";
  id: string;
  idInscripcion?: string;
  nombre: string;
  whatsapp?: string;
  motivo: string;
};

function containsDemoSignal(value: string) {
  return /(^|[^a-z])(prueba|test|demo|fake|ficticio|ejemplo)([^a-z]|$)/i.test(value);
}

export function buildDemoRecordsReport({
  pacientes,
  inscripciones,
  historialPagos,
}: {
  pacientes: SuvogaPaciente[];
  inscripciones: SuvogaInscripcionCita[];
  historialPagos: SuvogaPago[];
}) {
  const pacientesById = new Map(pacientes.map((paciente) => [paciente.idPaciente, paciente]));
  const report: PossibleDemoRecord[] = [];

  for (const paciente of pacientes) {
    const motivo = paciente.esRegistroPrueba
      ? "marcado como registro de prueba"
      : containsDemoSignal(`${paciente.nombreCompleto} ${paciente.correo ?? ""} ${paciente.origenRegistro ?? ""} ${paciente.notaInterna ?? ""}`)
        ? "nombre, correo, origen o nota contiene una señal de prueba"
        : "";
    if (motivo) {
      report.push({
        tipoRegistro: "Paciente",
        id: paciente.idPaciente,
        nombre: paciente.nombreCompleto,
        whatsapp: paciente.whatsapp,
        motivo,
      });
    }
  }

  for (const inscripcion of inscripciones) {
    const paciente = pacientesById.get(inscripcion.idPaciente);
    const motivo = inscripcion.esRegistroPrueba
      ? "marcada como registro de prueba"
      : containsDemoSignal(`${inscripcion.origenRegistro ?? ""} ${inscripcion.notaInterna ?? ""}`)
        ? "origen o nota contiene una señal de prueba"
        : "";
    if (motivo) {
      report.push({
        tipoRegistro: "Inscripción",
        id: inscripcion.idInscripcion,
        idInscripcion: inscripcion.idInscripcion,
        nombre: paciente?.nombreCompleto || inscripcion.idPaciente,
        whatsapp: paciente?.whatsapp,
        motivo,
      });
    }
  }

  for (const pago of historialPagos) {
    const motivo = containsDemoSignal(
      `${pago.nombreAlumnoAlPagar} ${pago.nombreProgramaAlPagar} ${pago.nota}`
    );
    if (motivo) {
      report.push({
        tipoRegistro: "Pago",
        id: pago.idPago,
        idInscripcion: pago.idInscripcion,
        nombre: pago.nombreAlumnoAlPagar || pago.idInscripcion,
        motivo: "nombre de alumno, programa o nota contiene una señal de prueba",
      });
    }
  }

  return report;
}
