import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  findSuvogaCourseByLegacyId,
  genericCourseDescription,
  suvogaCourses,
} from "@/data/courses";
import { getSheetsClient } from "../google-sheets";

const SHEETS = {
  catalogo: "Catalogo_Servicios",
  pacientes: "Directorio_Pacientes",
  inscripciones: "Inscripciones_Citas",
  anticipos: "Control_Anticipos",
  programacion_cursos: "Programacion_Cursos",
} as const;

type RawValue = string | number;
type RawTable = Record<string, RawValue>[];
type SheetRow = Record<string, RawValue | undefined>;
type Source = "google-sheets" | "local-fallback";

export type SuvogaServicio = {
  courseUid?: string;
  sourceId?: string;
  legacyIds?: string[];
  idServicio: string;
  nombre: string;
  tipo: "Curso" | "Spa" | string;
  category: string;
  description: string;
  precioTotal: number;
  montoAnticipo: number;
  cuposTotales: number;

  // Premium high-ticket landing fields
  slug?: string;
  subtitulo_premium?: string;
  duracion?: string;
  modalidad?: string;
  fechaTexto?: string;
  incluye?: string[];
  para_quien_es?: string[];
  que_aprenderas?: string[];
  imagen_url?: string;
  imagen_prompt?: string;
  youtube_url?: string;
  pdf_drive_url?: string;
  nivel?: string;
  certificado_incluido?: boolean;
  estado_publicacion?: string;
  orden_destacado?: number;
  publicationStatus?: string;
  pendingOwnerReview?: boolean;
  requiresOwnerReview?: boolean;
  requiresLegalReview?: boolean;
};

export type SuvogaProgramacionCurso = {
  idProgramacion: string;
  idServicio: string; // Refers to the course ID
  fechaHora: string;
  cuposTotales: number;
  cuposRestantes: number;
};

export type SuvogaPaciente = {
  idPaciente: string;
  nombreCompleto: string;
  whatsapp: string;
  cedula: string;
  provincia: string;
  fechaRegistro: string;
  esRegistroPrueba?: boolean;
  origenRegistro?: string;
  notaInterna?: string;
};

export type SuvogaInscripcionCita = {
  idInscripcion: string;
  idPaciente: string;
  idServicio: string;
  fechaProgramada: string;
  estadoAsistencia: string;
  esRegistroPrueba?: boolean;
  origenRegistro?: string;
  notaInterna?: string;
};

export type SuvogaAnticipo = {
  idInscripcion: string;
  montoPagado: number;
  balancePendiente: number;
  metodoPago: string;
  estadoPago: string;
};

export type SuvogaData = {
  catalogo: SuvogaServicio[];
  pacientes: SuvogaPaciente[];
  inscripciones: SuvogaInscripcionCita[];
  anticipos: SuvogaAnticipo[];
  programacionCursos: SuvogaProgramacionCurso[];
  source: Source;
};

export type NewPacienteInput = {
  idPaciente?: string;
  nombreCompleto: string;
  whatsapp: string;
  cedula?: string;
  provincia?: string;
  fechaRegistro?: string;
};

export type NewInscripcionInput = {
  idInscripcion?: string;
  idPaciente: string;
  idServicio: string;
  fechaProgramada: string;
  estadoAsistencia?: string;
  montoPagado?: number;
  balancePendiente?: number;
  metodoPago?: string;
  estadoPago?: string;
};

export type NewAnticipoInput = {
  idInscripcion: string;
  montoPagado: number;
  balancePendiente?: number;
  metodoPago?: string;
  estadoPago?: string;
};

export type NewProgramacionCursoInput = {
  idProgramacion?: string;
  idServicio: string;
  fechaHora: string;
  cuposTotales: number;
  cuposRestantes?: number;
};

const FIELD_ALIASES: Record<string, string[]> = {
  id_servicio: ["ID_Servicio", "idServicio", "id_servicio"],
  nombre: ["Nombre", "nombre"],
  tipo: ["Tipo (Curso o Spa)", "Tipo", "tipo"],
  category: ["Categoria", "Categoría", "Category", "category", "categoria"],
  description: [
    "Descripcion",
    "Descripción",
    "Description",
    "description",
    "descripcion",
  ],
  precio_total: ["Precio_Total", "precioTotal", "precio_total"],
  monto_anticipo: ["Monto_Anticipo", "montoAnticipo", "monto_anticipo"],
  cupos_totales: ["Cupos_Totales", "cuposTotales", "cupos_totales"],
  id_paciente: ["ID_Paciente", "idPaciente", "id_paciente"],
  nombre_completo: ["Nombre_Completo", "nombreCompleto", "nombre_completo"],
  whatsapp: ["WhatsApp", "whatsapp", "Telefono", "telefono"],
  cedula: ["Cedula", "cedula"],
  provincia: ["Provincia", "provincia"],
  fecha_registro: ["Fecha_Registro", "fechaRegistro", "fecha_registro"],
  es_registro_prueba: [
    "Es_Registro_Prueba",
    "esRegistroPrueba",
    "es_registro_prueba",
  ],
  origen_registro: ["Origen_Registro", "origenRegistro", "origen_registro"],
  nota_interna: ["Nota_Interna", "notaInterna", "nota_interna"],
  id_inscripcion: ["ID_Inscripcion", "idInscripcion", "id_inscripcion"],
  fecha_programada: ["Fecha_Programada", "fechaProgramada", "fecha_programada"],
  estado_asistencia: [
    "Estado_Asistencia",
    "estadoAsistencia",
    "estado_asistencia",
  ],
  monto_pagado: ["Monto_Pagado", "montoPagado", "monto_pagado"],
  balance_pendiente: [
    "Balance_Pendiente",
    "balancePendiente",
    "balance_pendiente",
  ],
  metodo_pago: ["Metodo_Pago", "metodoPago", "metodo_pago"],
  estado_pago: ["Estado_Pago", "estadoPago", "estado_pago"],
  id_programacion: ["ID_Programacion", "idProgramacion", "id_programacion"],
  id_curso: ["ID_Curso", "idCurso", "id_curso"],
  fecha_hora: ["Fecha_Hora", "fechaHora", "fecha_hora"],
  cupos_totales_programados: [
    "Cupos_Totales",
    "cuposTotales",
    "cupos_totales_programados",
  ],
  cupos_restantes_programados: [
    "Cupos_Restantes",
    "cuposRestantes",
    "cupos_restantes_programados",
  ],
};

function parseNumber(value: unknown) {
  const text = String(value ?? "")
    .replace("RD$", "")
    .replace("$", "")
    .replace(/,/g, "")
    .trim();
  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function normalizeKey(key: string) {
  return key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function readValue(row: Record<string, RawValue>, aliases: string[]) {
  for (const alias of aliases) {
    const direct = row[alias];
    if (direct !== undefined && String(direct).trim() !== "") return direct;
  }

  const normalizedAliases = new Set(aliases.map(normalizeKey));
  for (const [key, value] of Object.entries(row)) {
    if (normalizedAliases.has(normalizeKey(key)) && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function readString(row: Record<string, RawValue>, aliases: string[]) {
  return String(readValue(row, aliases) || "");
}

function readNumber(row: Record<string, RawValue>, aliases: string[]) {
  return parseNumber(readValue(row, aliases));
}

function readBoolean(row: Record<string, RawValue>, aliases: string[]) {
  const normalized = String(readValue(row, aliases) ?? "")
    .trim()
    .toLowerCase();
  return ["true", "1", "si", "sí", "yes"].includes(normalized);
}

function findStaticServicio(idServicio: string, nombre: string) {
  return (
    findSuvogaCourseByLegacyId(idServicio) ??
    suvogaCourses.find((course) => course.idServicio === idServicio) ??
    suvogaCourses.find(
      (course) => normalizeKey(course.nombre) === normalizeKey(nombre)
    )
  );
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((items) => items.some((item) => item !== ""));
}

function matrixToObjects(values: RawValue[][]): RawTable {
  const [headers, ...rows] = values;
  if (!headers) return [];

  return rows
    .filter((row) => row.some((cell) => String(cell ?? "").trim()))
    .map((row) =>
      headers.reduce<Record<string, RawValue>>((acc, header, index) => {
        const key = String(header);
        const value = row[index] ?? "";
        const current = acc[key];

        if (current === undefined || String(current).trim() === "") {
          acc[key] = value;
        }

        return acc;
      }, {})
    );
}

async function readLocalSheet(sheetName: string): Promise<RawTable> {
  const filePath = path.join(process.cwd(), "data", "suvoga_os", `${sheetName}.csv`);
  const text = await fs.readFile(filePath, "utf8");
  return matrixToObjects(parseCsv(text));
}

async function readSheetRange(sheetName: string): Promise<RawTable | null> {
  const { sheets, spreadsheetId } = await getSheetsClient();
  if (!sheets || !spreadsheetId) return null;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:AZ1000`,
      valueRenderOption: "UNFORMATTED_VALUE",
    });
    return matrixToObjects((response.data.values || []) as RawValue[][]);
  } catch (error) {
    const status =
      typeof error === "object" && error && "status" in error
        ? String((error as { status?: unknown }).status)
        : "sin status";
    console.warn(
      `No se pudo leer ${sheetName} desde Google Sheets (${status}); usando fallback local.`
    );
    return null;
  }
}

async function readTable(sheetName: string) {
  const remoteRows = await readSheetRange(sheetName);
  if (remoteRows) {
    return { rows: remoteRows, source: "google-sheets" as const };
  }

  return {
    rows: await readLocalSheet(sheetName),
    source: "local-fallback" as const,
  };
}

function resolveCanonicalField(header: string) {
  const normalizedHeader = normalizeKey(header);

  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    if (aliases.some((alias) => normalizeKey(alias) === normalizedHeader)) {
      return field;
    }
  }

  return normalizedHeader;
}

function valueForHeader(header: string, row: SheetRow) {
  const canonical = resolveCanonicalField(header);
  const aliases = FIELD_ALIASES[canonical] ?? [canonical, header];

  for (const alias of [canonical, ...aliases, header]) {
    const value = row[alias];
    if (value !== undefined) return value;
  }

  return "";
}

async function getHeaders(sheetName: string) {
  const { sheets, spreadsheetId } = await getSheetsClient();
  if (!sheets || !spreadsheetId) throw new Error("Google Sheets not configured");

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:AZ1`,
  });

  const headers = headerResponse.data.values?.[0] as string[] | undefined;
  if (!headers) throw new Error(`Could not read headers from ${sheetName}`);

  return { sheets, spreadsheetId, headers };
}

async function appendByHeaders(sheetName: string, data: SheetRow) {
  const { sheets, spreadsheetId, headers } = await getHeaders(sheetName);
  const newRow = headers.map((header) => valueForHeader(header, data));

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [newRow],
    },
  });
}

function todayInLaPaz() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function mapServicio(row: Record<string, RawValue>): SuvogaServicio {
  const idServicio = readString(row, FIELD_ALIASES.id_servicio);
  const nombre = readString(row, FIELD_ALIASES.nombre);
  const staticServicio = findStaticServicio(idServicio, nombre);

  return {
    idServicio,
    nombre,
    tipo: readString(row, FIELD_ALIASES.tipo),
    category:
      readString(row, FIELD_ALIASES.category) ||
      staticServicio?.category ||
      "General",
    description:
      readString(row, FIELD_ALIASES.description) ||
      staticServicio?.description ||
      genericCourseDescription,
    precioTotal: readNumber(row, FIELD_ALIASES.precio_total),
    montoAnticipo: readNumber(row, FIELD_ALIASES.monto_anticipo),
    cuposTotales: readNumber(row, FIELD_ALIASES.cupos_totales),

    // Merge local static premium high-ticket landing fields
    slug:
      staticServicio?.slug ||
      nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    subtitulo_premium: staticServicio?.subtitulo_premium || "",
    duracion: staticServicio?.duracion || "",
    modalidad: staticServicio?.modalidad || "",
    incluye: staticServicio?.incluye || [],
    para_quien_es: staticServicio?.para_quien_es || [],
    que_aprenderas: staticServicio?.que_aprenderas || [],
    imagen_url: staticServicio?.imagen_url || "",
    imagen_prompt: staticServicio?.imagen_prompt || "",
    youtube_url: staticServicio?.youtube_url || "",
    pdf_drive_url: staticServicio?.pdf_drive_url || "",
    nivel: staticServicio?.nivel || "",
    certificado_incluido: staticServicio?.certificado_incluido ?? true,
    estado_publicacion: staticServicio?.estado_publicacion || "Publicado",
    orden_destacado: staticServicio?.orden_destacado || 99,
  };
}

function mapPaciente(row: Record<string, RawValue>): SuvogaPaciente {
  return {
    idPaciente: readString(row, FIELD_ALIASES.id_paciente),
    nombreCompleto: readString(row, FIELD_ALIASES.nombre_completo),
    whatsapp: readString(row, FIELD_ALIASES.whatsapp),
    cedula: readString(row, FIELD_ALIASES.cedula),
    provincia: readString(row, FIELD_ALIASES.provincia),
    fechaRegistro: readString(row, FIELD_ALIASES.fecha_registro),
    esRegistroPrueba: readBoolean(row, FIELD_ALIASES.es_registro_prueba),
    origenRegistro: readString(row, FIELD_ALIASES.origen_registro),
    notaInterna: readString(row, FIELD_ALIASES.nota_interna),
  };
}

function mapInscripcion(row: Record<string, RawValue>): SuvogaInscripcionCita {
  return {
    idInscripcion: readString(row, FIELD_ALIASES.id_inscripcion),
    idPaciente: readString(row, FIELD_ALIASES.id_paciente),
    idServicio: readString(row, FIELD_ALIASES.id_servicio),
    fechaProgramada: readString(row, FIELD_ALIASES.fecha_programada),
    estadoAsistencia: readString(row, FIELD_ALIASES.estado_asistencia),
    esRegistroPrueba: readBoolean(row, FIELD_ALIASES.es_registro_prueba),
    origenRegistro: readString(row, FIELD_ALIASES.origen_registro),
    notaInterna: readString(row, FIELD_ALIASES.nota_interna),
  };
}

function mapAnticipo(row: Record<string, RawValue>): SuvogaAnticipo {
  return {
    idInscripcion: readString(row, FIELD_ALIASES.id_inscripcion),
    montoPagado: readNumber(row, FIELD_ALIASES.monto_pagado),
    balancePendiente: readNumber(row, FIELD_ALIASES.balance_pendiente),
    metodoPago: readString(row, FIELD_ALIASES.metodo_pago),
    estadoPago: readString(row, FIELD_ALIASES.estado_pago),
  };
}

function mapProgramacionCurso(row: Record<string, RawValue>): SuvogaProgramacionCurso {
  return {
    idProgramacion: readString(row, FIELD_ALIASES.id_programacion),
    idServicio: readString(row, FIELD_ALIASES.id_curso),
    fechaHora: readString(row, FIELD_ALIASES.fecha_hora),
    cuposTotales: readNumber(row, FIELD_ALIASES.cupos_totales_programados),
    cuposRestantes: readNumber(row, FIELD_ALIASES.cupos_restantes_programados),
  };
}

export async function getCatalogo() {
  const table = await readTable(SHEETS.catalogo);
  const catalogo = table.rows.map(mapServicio);
  return catalogo.length > 0 ? catalogo : suvogaCourses;
}

export async function getPacientes() {
  const table = await readTable(SHEETS.pacientes);
  return table.rows.map(mapPaciente);
}

export async function getInscripciones() {
  const table = await readTable(SHEETS.inscripciones);
  return table.rows.map(mapInscripcion);
}

export async function getAnticipos() {
  const table = await readTable(SHEETS.anticipos);
  return table.rows.map(mapAnticipo);
}

export async function getProgramacionCursos() {
  const table = await readTable(SHEETS.programacion_cursos);
  return table.rows.map(mapProgramacionCurso);
}

export async function getSuvogaData(): Promise<SuvogaData> {
  const [catalogoTable, pacientesTable, inscripcionesTable, anticiposTable, programacionCursosTable] =
    await Promise.all([
      readTable(SHEETS.catalogo),
      readTable(SHEETS.pacientes),
      readTable(SHEETS.inscripciones),
      readTable(SHEETS.anticipos),
      readTable(SHEETS.programacion_cursos),
    ]);

  const source =
    catalogoTable.source === "google-sheets" &&
    pacientesTable.source === "google-sheets" &&
    inscripcionesTable.source === "google-sheets" &&
    anticiposTable.source === "google-sheets" &&
    programacionCursosTable.source === "google-sheets"
      ? "google-sheets"
      : "local-fallback";

  return {
    catalogo:
      catalogoTable.rows.length > 0
        ? catalogoTable.rows.map(mapServicio)
        : suvogaCourses,
    pacientes: pacientesTable.rows.map(mapPaciente),
    inscripciones: inscripcionesTable.rows.map(mapInscripcion),
    anticipos: anticiposTable.rows.map(mapAnticipo),
    programacionCursos: programacionCursosTable.rows.map(mapProgramacionCurso),
    source,
  };
}

export async function postPaciente(input: NewPacienteInput) {
  const paciente = {
    idPaciente: input.idPaciente ?? `PAC-${Date.now()}`,
    nombreCompleto: input.nombreCompleto.trim(),
    whatsapp: input.whatsapp.trim(),
    cedula: input.cedula?.trim() ?? "",
    provincia: input.provincia?.trim() ?? "",
    fechaRegistro: input.fechaRegistro ?? todayInLaPaz(),
  };

  await appendByHeaders(SHEETS.pacientes, {
    id_paciente: paciente.idPaciente,
    nombre_completo: paciente.nombreCompleto,
    whatsapp: paciente.whatsapp,
    cedula: paciente.cedula,
    provincia: paciente.provincia,
    fecha_registro: paciente.fechaRegistro,
  });

  return paciente;
}

export async function postAnticipo(input: NewAnticipoInput) {
  const montoPagado = Number(input.montoPagado) || 0;
  const balancePendiente = Math.max(Number(input.balancePendiente ?? 0) || 0, 0);
  const anticipo = {
    idInscripcion: input.idInscripcion,
    montoPagado,
    balancePendiente,
    metodoPago: input.metodoPago?.trim() ?? "",
    estadoPago:
      input.estadoPago ??
      (balancePendiente <= 0 && montoPagado > 0
        ? "Pagado"
        : montoPagado > 0
          ? "Parcial"
          : "Pendiente"),
  };

  await appendByHeaders(SHEETS.anticipos, {
    id_inscripcion: anticipo.idInscripcion,
    monto_pagado: anticipo.montoPagado,
    balance_pendiente: anticipo.balancePendiente,
    metodo_pago: anticipo.metodoPago,
    estado_pago: anticipo.estadoPago,
  });

  return anticipo;
}

export async function postInscripcion(input: NewInscripcionInput) {
  const idInscripcion = input.idInscripcion ?? `INS-${Date.now()}`;
  const inscripcion = {
    idInscripcion,
    idPaciente: input.idPaciente,
    idServicio: input.idServicio,
    fechaProgramada: input.fechaProgramada,
    estadoAsistencia: input.estadoAsistencia ?? "Programada",
  };

  await appendByHeaders(SHEETS.inscripciones, {
    id_inscripcion: inscripcion.idInscripcion,
    id_paciente: inscripcion.idPaciente,
    id_servicio: inscripcion.idServicio,
    fecha_programada: inscripcion.fechaProgramada,
    estado_asistencia: inscripcion.estadoAsistencia,
  });

  const catalogo = await getCatalogo();
  const servicio = catalogo.find((item) => item.idServicio === input.idServicio);
  const montoPagado = Number(input.montoPagado ?? 0) || 0;
  const balancePendiente = Math.max(
    Number(input.balancePendiente ?? servicio?.precioTotal ?? 0) - montoPagado,
    0
  );
  const anticipo = await postAnticipo({
    idInscripcion,
    montoPagado,
    balancePendiente,
    metodoPago: input.metodoPago,
    estadoPago: input.estadoPago,
  });

  return { inscripcion, anticipo };
}

export async function postProgramacionCurso(input: NewProgramacionCursoInput) {
  const idProgramacion = input.idProgramacion ?? `PROG-${Date.now()}`;
  const programacionCurso = {
    idProgramacion,
    idServicio: input.idServicio,
    fechaHora: input.fechaHora,
    cuposTotales: input.cuposTotales,
    cuposRestantes: input.cuposRestantes ?? input.cuposTotales, // Initially all cupos are remaining
  };

  await appendByHeaders(SHEETS.programacion_cursos, {
    id_programacion: programacionCurso.idProgramacion,
    id_curso: programacionCurso.idServicio,
    fecha_hora: programacionCurso.fechaHora,
    cupos_totales_programados: programacionCurso.cuposTotales,
    cupos_restantes_programados: programacionCurso.cuposRestantes,
  });

  return programacionCurso;
}
