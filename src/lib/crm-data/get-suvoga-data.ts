import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  findSuvogaCourseByLegacyId,
  genericCourseDescription,
  suvogaCourses,
} from "@/data/courses";
import { academyConfig } from "@/config/academy.config";
import { getSheetsClient } from "../google-sheets";

const SHEETS = {
  catalogo: "Catalogo_Servicios",
  pacientes: "Directorio_Pacientes",
  inscripciones: "Inscripciones_Citas",
  anticipos: "Control_Anticipos",
  programacion_cursos: "Programacion_Cursos",
  historial_pagos: "Historial_Pagos",
} as const;

const SHEET_READ_RANGES: Record<string, string> = {
  [SHEETS.catalogo]: "A1:Z200",
  [SHEETS.pacientes]: "A1:J500",
  [SHEETS.inscripciones]: "A1:L500",
  [SHEETS.anticipos]: "A1:E500",
  [SHEETS.programacion_cursos]: "A1:E500",
  [SHEETS.historial_pagos]: "A:O",
};

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
  precioMiembros?: number;
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
  nombreGrupo?: string;
  modalidad?: string;
  estadoProgramacion?: string;
  nota?: string;
};

export type SuvogaPaciente = {
  idPaciente: string;
  nombreCompleto: string;
  whatsapp: string;
  correo?: string;
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
  idProgramacion?: string;
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

export type SuvogaPago = {
  idPago: string;
  idInscripcion: string;
  idPaciente: string;
  idServicio: string;
  nombreAlumnoAlPagar: string;
  nombreProgramaAlPagar: string;
  fechaPago: string;
  fechaVencimiento: string;
  monto: number;
  metodoPago: string;
  concepto: string;
  estadoTiempo: string;
  nota: string;
  registradoPor: string;
  registradoEn: string;
};

export type SuvogaData = {
  catalogo: SuvogaServicio[];
  pacientes: SuvogaPaciente[];
  inscripciones: SuvogaInscripcionCita[];
  anticipos: SuvogaAnticipo[];
  programacionCursos: SuvogaProgramacionCurso[];
  historialPagos: SuvogaPago[];
  source: Source;
};

export type NewPacienteInput = {
  idPaciente?: string;
  nombreCompleto: string;
  whatsapp: string;
  correo?: string;
  cedula?: string;
  provincia?: string;
  fechaRegistro?: string;
  esRegistroPrueba?: boolean;
  origenRegistro?: string;
  notaInterna?: string;
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
  esRegistroPrueba?: boolean;
  origenRegistro?: string;
  notaInterna?: string;
};

export type NewAnticipoInput = {
  idInscripcion: string;
  montoPagado: number;
  balancePendiente?: number;
  metodoPago?: string;
  estadoPago?: string;
};

export type UpdateAnticipoInput = {
  idInscripcion: string;
  montoPagado: number;
  metodoPago?: string;
  action: "pendiente" | "confirmado" | "completa";
};

export type UpdateInscripcionInput = {
  idInscripcion: string;
  estadoAsistencia?: string;
  idProgramacion?: string | null;
};

export type NewProgramacionCursoInput = {
  idProgramacion?: string;
  idServicio: string;
  fechaHora: string;
  cuposTotales: number;
  cuposRestantes?: number;
  nombreGrupo?: string;
  modalidad?: string;
  estadoProgramacion?: string;
  nota?: string;
};

export type NewPagoInput = {
  idPago?: string;
  idInscripcion: string;
  idPaciente: string;
  idServicio: string;
  nombreAlumnoAlPagar: string;
  nombreProgramaAlPagar: string;
  fechaPago: string;
  fechaVencimiento?: string;
  monto: number;
  metodoPago?: string;
  concepto: string;
  nota?: string;
  registradoPor?: string;
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
  correo: ["Correo", "Email", "correo", "email"],
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
  nombre_grupo: ["Nombre_Grupo", "nombreGrupo", "nombre_grupo"],
  modalidad: ["Modalidad", "modalidad"],
  estado_programacion: ["Estado_Programacion", "estadoProgramacion", "estado_programacion"],
  nota: ["Nota", "nota"],
  id_pago: ["ID_Pago", "idPago", "id_pago"],
  nombre_alumno_al_pagar: [
    "Nombre_Alumno_Al_Pagar",
    "nombreAlumnoAlPagar",
    "nombre_alumno_al_pagar",
  ],
  nombre_programa_al_pagar: [
    "Nombre_Programa_Al_Pagar",
    "nombreProgramaAlPagar",
    "nombre_programa_al_pagar",
  ],
  fecha_pago: ["Fecha_Pago", "fechaPago", "fecha_pago"],
  fecha_vencimiento: ["Fecha_Vencimiento", "fechaVencimiento", "fecha_vencimiento"],
  monto: ["Monto", "monto"],
  concepto: ["Concepto", "concepto"],
  estado_tiempo: ["Estado_Tiempo", "estadoTiempo", "estado_tiempo"],
  registrado_por: ["Registrado_Por", "registradoPor", "registrado_por"],
  registrado_en: ["Registrado_En", "registradoEn", "registrado_en"],
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

type SheetName = (typeof SHEETS)[keyof typeof SHEETS];

const REQUIRED_SHEET_HEADERS: Record<SheetName, Array<{ label: string; aliases: string[] }>> = {
  [SHEETS.catalogo]: [
    { label: "ID_Servicio", aliases: FIELD_ALIASES.id_servicio },
    { label: "Nombre", aliases: FIELD_ALIASES.nombre },
    { label: "Tipo (Curso o Spa)", aliases: FIELD_ALIASES.tipo },
    { label: "Precio_Total", aliases: FIELD_ALIASES.precio_total },
    { label: "Monto_Anticipo", aliases: FIELD_ALIASES.monto_anticipo },
    { label: "Cupos_Totales", aliases: FIELD_ALIASES.cupos_totales },
  ],
  [SHEETS.pacientes]: [
    { label: "ID_Paciente", aliases: FIELD_ALIASES.id_paciente },
    { label: "Nombre_Completo", aliases: FIELD_ALIASES.nombre_completo },
    { label: "WhatsApp", aliases: FIELD_ALIASES.whatsapp },
    { label: "Correo", aliases: FIELD_ALIASES.correo },
    { label: "Cedula", aliases: FIELD_ALIASES.cedula },
    { label: "Provincia", aliases: FIELD_ALIASES.provincia },
    { label: "Fecha_Registro", aliases: FIELD_ALIASES.fecha_registro },
    { label: "Nota_Interna", aliases: FIELD_ALIASES.nota_interna },
  ],
  [SHEETS.inscripciones]: [
    { label: "ID_Inscripcion", aliases: FIELD_ALIASES.id_inscripcion },
    { label: "ID_Paciente", aliases: FIELD_ALIASES.id_paciente },
    { label: "ID_Servicio", aliases: FIELD_ALIASES.id_servicio },
    { label: "Fecha_Programada", aliases: FIELD_ALIASES.fecha_programada },
    { label: "Estado_Asistencia", aliases: FIELD_ALIASES.estado_asistencia },
    { label: "Nota_Interna", aliases: FIELD_ALIASES.nota_interna },
  ],
  [SHEETS.anticipos]: [
    { label: "ID_Inscripcion", aliases: FIELD_ALIASES.id_inscripcion },
    { label: "Monto_Pagado", aliases: FIELD_ALIASES.monto_pagado },
    { label: "Balance_Pendiente", aliases: FIELD_ALIASES.balance_pendiente },
    { label: "Metodo_Pago", aliases: FIELD_ALIASES.metodo_pago },
    { label: "Estado_Pago", aliases: FIELD_ALIASES.estado_pago },
  ],
  [SHEETS.programacion_cursos]: [
    { label: "ID_Programacion", aliases: FIELD_ALIASES.id_programacion },
    { label: "ID_Curso", aliases: FIELD_ALIASES.id_curso },
    { label: "Fecha_Hora", aliases: FIELD_ALIASES.fecha_hora },
    { label: "Cupos_Totales", aliases: FIELD_ALIASES.cupos_totales_programados },
    { label: "Cupos_Restantes", aliases: FIELD_ALIASES.cupos_restantes_programados },
  ],
  [SHEETS.historial_pagos]: [],
};

const HISTORIAL_PAGOS_HEADERS = [
  "ID_Pago",
  "ID_Inscripcion",
  "ID_Paciente",
  "ID_Servicio",
  "Nombre_Alumno_Al_Pagar",
  "Nombre_Programa_Al_Pagar",
  "Fecha_Pago",
  "Fecha_Vencimiento",
  "Monto",
  "Metodo_Pago",
  "Concepto",
  "Estado_Tiempo",
  "Nota",
  "Registrado_Por",
  "Registrado_En",
] as const;

function missingRequiredHeaders(sheetName: SheetName, headers: string[]) {
  const normalizedHeaders = new Set(headers.map(normalizeKey));
  return REQUIRED_SHEET_HEADERS[sheetName]
    .filter(({ aliases }) => !aliases.some((alias) => normalizedHeaders.has(normalizeKey(alias))))
    .map(({ label }) => label);
}

function reportSchemaWarning(sheetName: SheetName, headers: string[], operation: "read" | "write") {
  const missing = missingRequiredHeaders(sheetName, headers);
  if (missing.length === 0) return [];

  const message =
    `[Google Sheets schema warning] ${sheetName} (${operation}) missing required columns: ${missing.join(", ")}`;
  console.warn(message);
  return missing;
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
      range: `${sheetName}!${SHEET_READ_RANGES[sheetName] ?? "A1:Z200"}`,
      valueRenderOption: "UNFORMATTED_VALUE",
    });
    const values = (response.data.values || []) as RawValue[][];
    const headers = (values[0] || []).map(String);
    reportSchemaWarning(sheetName as SheetName, headers, "read");
    return matrixToObjects(values);
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

function columnToA1(columnNumber: number) {
  let current = columnNumber;
  let result = "";

  while (current > 0) {
    const remainder = (current - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    current = Math.floor((current - 1) / 26);
  }

  return result;
}

async function readSheetValuesForWrite(sheetName: SheetName) {
  const { sheets, spreadsheetId } = await getSheetsClient();
  if (!sheets || !spreadsheetId) throw new Error("Google Sheets not configured");

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${SHEET_READ_RANGES[sheetName]}`,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const values = (response.data.values || []) as RawValue[][];
  const headers = (values[0] || []).map(String);
  const missing = reportSchemaWarning(sheetName, headers, "write");

  if (missing.length > 0) {
    throw new Error(
      `Google Sheets schema incomplete for ${sheetName}. Missing required columns: ${missing.join(", ")}`
    );
  }

  return { sheets, spreadsheetId, headers, values };
}

async function updateById(
  sheetName: SheetName,
  idField: string,
  idValue: string,
  updates: Record<string, RawValue>,
  options?: { ignoreMissingFields?: boolean }
) {
  const normalizedId = idValue.trim();
  if (!normalizedId) throw new Error("Missing row ID");

  const { sheets, spreadsheetId, headers, values } = await readSheetValuesForWrite(sheetName);
  const idColumn = headers.findIndex((header) => resolveCanonicalField(header) === idField);

  if (idColumn < 0) throw new Error(`Missing identifier column ${idField}`);

  const matchingRows = values
    .slice(1)
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) => String(row[idColumn] ?? "").trim() === normalizedId);

  if (matchingRows.length === 0) throw new Error(`Row not found for ${normalizedId}`);
  if (matchingRows.length > 1) throw new Error(`Duplicate row ID ${normalizedId}`);

  const rowNumber = matchingRows[0].rowNumber;
  const data = Object.entries(updates).flatMap(([field, value]) => {
    const column = headers.findIndex((header) => resolveCanonicalField(header) === field);
    if (column < 0) {
      if (options?.ignoreMissingFields) return [];
      throw new Error(`Missing update column ${field}`);
    }

    return [{
      range: `${sheetName}!${columnToA1(column + 1)}${rowNumber}`,
      values: [[value]],
    }];
  });

  if (data.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data,
      },
    });
  }

  return {
    rowNumber,
    updatedFields: data.map((item) => resolveCanonicalField(item.range.split("!")[1].replace(/\d+$/, ""))),
  };
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

  const missing = reportSchemaWarning(sheetName as SheetName, headers, "write");
  if (missing.length > 0) {
    throw new Error(
      `Google Sheets schema incomplete for ${sheetName}. Missing required columns: ${missing.join(", ")}`
    );
  }

  return { sheets, spreadsheetId, headers };
}

async function appendByHeaders(
  sheetName: string,
  data: SheetRow,
  valueInputOption: "USER_ENTERED" | "RAW" = "USER_ENTERED"
) {
  const { sheets, spreadsheetId, headers } = await getHeaders(sheetName);
  const newRow = headers.map((header) => valueForHeader(header, data));

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    valueInputOption,
    requestBody: {
      values: [newRow],
    },
  });
}

async function ensureHistorialPagosSheet() {
  const { sheets, spreadsheetId } = await getSheetsClient();
  if (!sheets || !spreadsheetId) throw new Error("Google Sheets not configured");

  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties",
  });
  const exists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === SHEETS.historial_pagos
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEETS.historial_pagos } } }],
      },
    });
  }

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEETS.historial_pagos}!A1:O1`,
  });
  const existingHeaders = (headerResponse.data.values?.[0] || []).map(String);
  const hasAnyHeader = existingHeaders.some((header) => header.trim());
  const missingHeaders = HISTORIAL_PAGOS_HEADERS.filter(
    (header) => !existingHeaders.some((existing) => normalizeKey(existing) === normalizeKey(header))
  );

  if (hasAnyHeader && missingHeaders.length > 0) {
    throw new Error(
      `Google Sheets schema incomplete for ${SHEETS.historial_pagos}. Missing required columns: ${missingHeaders.join(", ")}`
    );
  }

  const headers = hasAnyHeader ? existingHeaders : [...HISTORIAL_PAGOS_HEADERS];

  if (!hasAnyHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEETS.historial_pagos}!A1:O1`,
      valueInputOption: "RAW",
      requestBody: { values: [HISTORIAL_PAGOS_HEADERS.slice()] },
    });
  }

  return { sheets, spreadsheetId, headers };
}

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

const PAYMENT_CONCEPTS = [
  "Anticipo",
  "Pago de clase",
  "Pago parcial",
  "Pago final",
  "Ajuste",
  "Otro",
] as const;

export async function postHistorialPago(input: NewPagoInput) {
  const idInscripcion = input.idInscripcion.trim();
  const fechaPago = input.fechaPago.trim();
  const fechaVencimiento = input.fechaVencimiento?.trim() ?? "";
  const monto = Number(input.monto);
  const concepto = input.concepto.trim();

  if (!idInscripcion || !input.idPaciente.trim() || !input.idServicio.trim()) {
    throw new Error("Payment references are required");
  }
  if (!Number.isFinite(monto) || monto <= 0) throw new Error("Payment amount must be positive");
  if (!isIsoDate(fechaPago) || (fechaVencimiento && !isIsoDate(fechaVencimiento))) {
    throw new Error("Payment dates are invalid");
  }
  if (!PAYMENT_CONCEPTS.includes(concepto as (typeof PAYMENT_CONCEPTS)[number])) {
    throw new Error("Payment concept is invalid");
  }

  const pago = {
    idPago: input.idPago?.trim() || `PAG-${Date.now()}`,
    idInscripcion,
    idPaciente: input.idPaciente.trim(),
    idServicio: input.idServicio.trim(),
    nombreAlumnoAlPagar: input.nombreAlumnoAlPagar.trim(),
    nombreProgramaAlPagar: input.nombreProgramaAlPagar.trim(),
    fechaPago,
    fechaVencimiento,
    monto,
    metodoPago: input.metodoPago?.trim() ?? "",
    concepto,
    estadoTiempo: !fechaVencimiento
      ? "Sin fecha límite"
      : fechaPago <= fechaVencimiento
        ? "A tiempo"
        : "Fuera de fecha",
    nota: input.nota?.trim() ?? "",
    registradoPor: input.registradoPor?.trim() || "Admin SuVoGa",
    registradoEn: new Date().toISOString(),
  };

  const [inscripciones, catalogo, anticipos] = await Promise.all([
    getInscripciones(),
    getCatalogo(),
    getAnticipos(),
  ]);
  const inscripcion = inscripciones.find((item) => item.idInscripcion === idInscripcion);
  const servicio = inscripcion
    ? catalogo.find((item) => item.idServicio === inscripcion.idServicio)
    : undefined;
  if (!inscripcion || !servicio) throw new Error("Inscription or course not found");

  const historialAntes = await getHistorialPagos();
  const anticipoPrevio = anticipos.find((item) => item.idInscripcion === idInscripcion);
  const { sheets, spreadsheetId, headers } = await ensureHistorialPagosSheet();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEETS.historial_pagos}!A:O`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [headers.map((header) => valueForHeader(header, pago))],
    },
  });

  const historialLeida = await getHistorialPagos();
  const historial = historialLeida.length > 0 || historialAntes.length === 0
    ? historialLeida
    : historialAntes;
  if (!historial.some((item) => item.idPago === pago.idPago)) {
    historial.push(pago);
  }

  const pagosDeInscripcion = historial.filter((item) => item.idInscripcion === idInscripcion);
  const totalHistorial = pagosDeInscripcion.reduce((total, item) => total + item.monto, 0);
  const historialPrevioDeInscripcion = historialAntes.filter(
    (item) => item.idInscripcion === idInscripcion
  );
  const historialTienePagosPrevios = historialPrevioDeInscripcion.length > 0 ||
    pagosDeInscripcion.some((item) => item.idPago !== pago.idPago);
  const pagoPrevioFueraDeHistorial = !historialTienePagosPrevios
    ? Math.max(anticipoPrevio?.montoPagado ?? 0, 0)
    : 0;
  const totalPagado = pagoPrevioFueraDeHistorial + totalHistorial;
  const balancePendiente = Math.max(servicio.precioTotal - totalPagado, 0);
  const estadoPago = totalPagado <= 0
    ? "Anticipo pendiente"
    : balancePendiente > 0
      ? "Parcial"
      : "Pagado";

  await updateById(SHEETS.anticipos, "id_inscripcion", idInscripcion, {
    monto_pagado: totalPagado,
    balance_pendiente: balancePendiente,
    metodo_pago: pago.metodoPago,
    estado_pago: estadoPago,
  });

  return {
    pago,
    totalPagado,
    balancePendiente,
    metodoPago: pago.metodoPago,
    estadoPago,
  };
}

function todayInAcademyTimezone() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: academyConfig.timezone,
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
    correo: readString(row, FIELD_ALIASES.correo),
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
    idProgramacion: readString(row, FIELD_ALIASES.id_programacion),
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
    nombreGrupo: readString(row, FIELD_ALIASES.nombre_grupo),
    modalidad: readString(row, FIELD_ALIASES.modalidad),
    estadoProgramacion: readString(row, FIELD_ALIASES.estado_programacion),
    nota: readString(row, FIELD_ALIASES.nota),
  };
}

function mapPago(row: Record<string, RawValue>): SuvogaPago {
  return {
    idPago: readString(row, FIELD_ALIASES.id_pago),
    idInscripcion: readString(row, FIELD_ALIASES.id_inscripcion),
    idPaciente: readString(row, FIELD_ALIASES.id_paciente),
    idServicio: readString(row, FIELD_ALIASES.id_servicio),
    nombreAlumnoAlPagar: readString(row, FIELD_ALIASES.nombre_alumno_al_pagar),
    nombreProgramaAlPagar: readString(row, FIELD_ALIASES.nombre_programa_al_pagar),
    fechaPago: readString(row, FIELD_ALIASES.fecha_pago),
    fechaVencimiento: readString(row, FIELD_ALIASES.fecha_vencimiento),
    monto: readNumber(row, FIELD_ALIASES.monto),
    metodoPago: readString(row, FIELD_ALIASES.metodo_pago),
    concepto: readString(row, FIELD_ALIASES.concepto),
    estadoTiempo: readString(row, FIELD_ALIASES.estado_tiempo),
    nota: readString(row, FIELD_ALIASES.nota),
    registradoPor: readString(row, FIELD_ALIASES.registrado_por),
    registradoEn: readString(row, FIELD_ALIASES.registrado_en),
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

async function readOptionalSheet(sheetName: string) {
  try {
    const { sheets, spreadsheetId } = await getSheetsClient();
    if (!sheets || !spreadsheetId) return [];

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${SHEET_READ_RANGES[sheetName]}`,
      valueRenderOption: "UNFORMATTED_VALUE",
    });
    return matrixToObjects((response.data.values || []) as RawValue[][]);
  } catch {
    return [];
  }
}

export async function getHistorialPagos() {
  const rows = await readOptionalSheet(SHEETS.historial_pagos);
  return rows.map(mapPago);
}

export async function getSuvogaData(): Promise<SuvogaData> {
  const [catalogoTable, pacientesTable, inscripcionesTable, anticiposTable, programacionCursosTable, historialPagos] =
    await Promise.all([
      readTable(SHEETS.catalogo),
      readTable(SHEETS.pacientes),
      readTable(SHEETS.inscripciones),
      readTable(SHEETS.anticipos),
      readTable(SHEETS.programacion_cursos),
      getHistorialPagos(),
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
    historialPagos,
    source,
  };
}

export async function postPaciente(input: NewPacienteInput) {
  const paciente = {
    idPaciente: input.idPaciente ?? `PAC-${Date.now()}`,
    nombreCompleto: input.nombreCompleto.trim(),
    whatsapp: input.whatsapp.trim(),
    correo: input.correo?.trim() ?? "",
    cedula: input.cedula?.trim() ?? "",
    provincia: input.provincia?.trim() ?? "",
    fechaRegistro: input.fechaRegistro ?? todayInAcademyTimezone(),
    esRegistroPrueba: input.esRegistroPrueba ?? false,
    origenRegistro: input.origenRegistro?.trim() ?? "",
    notaInterna: input.notaInterna?.trim() ?? "",
  };

  await appendByHeaders(SHEETS.pacientes, {
    id_paciente: paciente.idPaciente,
    nombre_completo: paciente.nombreCompleto,
    whatsapp: paciente.whatsapp,
    correo: paciente.correo,
    cedula: paciente.cedula,
    provincia: paciente.provincia,
    fecha_registro: paciente.fechaRegistro,
    es_registro_prueba: paciente.esRegistroPrueba ? "TRUE" : "",
    origen_registro: paciente.origenRegistro,
    nota_interna: paciente.notaInterna,
  }, "RAW");

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

export async function updateAnticipo(input: UpdateAnticipoInput) {
  const idInscripcion = input.idInscripcion.trim();
  const montoSolicitado = Math.max(Number(input.montoPagado) || 0, 0);
  const [inscripciones, catalogo] = await Promise.all([getInscripciones(), getCatalogo()]);
  const inscripcion = inscripciones.find((item) => item.idInscripcion === idInscripcion);
  const servicio = inscripcion
    ? catalogo.find((item) => item.idServicio === inscripcion.idServicio)
    : undefined;

  if (!inscripcion || !servicio) throw new Error("Inscription or course not found");

  const precioTotal = Math.max(servicio.precioTotal, 0);
  const montoPagado = input.action === "pendiente"
    ? 0
    : input.action === "completa"
      ? precioTotal
      : montoSolicitado;

  if (input.action === "confirmado" && montoPagado <= 0) {
    throw new Error("A confirmed advance requires a paid amount");
  }

  const balancePendiente = Math.max(precioTotal - montoPagado, 0);
  const estadoPago = input.action === "pendiente"
    ? "Pendiente"
    : balancePendiente > 0
      ? "Parcial"
      : "Pagado";
  const metodoPago = input.metodoPago?.trim() ?? "";

  await updateById(SHEETS.anticipos, "id_inscripcion", idInscripcion, {
    monto_pagado: montoPagado,
    balance_pendiente: balancePendiente,
    metodo_pago: metodoPago,
    estado_pago: estadoPago,
  });

  return {
    idInscripcion,
    montoPagado,
    balancePendiente,
    metodoPago,
    estadoPago,
  };
}

async function adjustProgramacionCupos(idProgramacion: string, delta: number) {
  if (!idProgramacion || delta === 0) return;
  const programaciones = await getProgramacionCursos();
  const programacion = programaciones.find((item) => item.idProgramacion === idProgramacion);
  if (!programacion) throw new Error("Schedule not found");

  const cuposRestantes = Math.max(programacion.cuposRestantes + delta, 0);
  if (delta < 0 && programacion.cuposRestantes <= 0) {
    throw new Error("Schedule has no remaining seats");
  }

  await updateById(SHEETS.programacion_cursos, "id_programacion", idProgramacion, {
    cupos_restantes_programados: cuposRestantes,
  });
}

export async function updateInscripcion(input: UpdateInscripcionInput) {
  const idInscripcion = input.idInscripcion.trim();
  const estadoAsistencia = input.estadoAsistencia?.trim() ?? "";
  const shouldUpdateProgramacion = input.idProgramacion !== undefined;
  if (!idInscripcion || (!estadoAsistencia && !shouldUpdateProgramacion)) {
    throw new Error("Inscription ID and an update are required");
  }

  const current = (await getInscripciones()).find((item) => item.idInscripcion === idInscripcion);
  if (!current) throw new Error("Inscription not found");

  const previousProgramacion = current.idProgramacion?.trim() ?? "";
  const requestedProgramacion = shouldUpdateProgramacion
    ? input.idProgramacion?.trim() ?? ""
    : previousProgramacion;
  if (shouldUpdateProgramacion && requestedProgramacion && requestedProgramacion !== previousProgramacion) {
    const nextProgramacion = (await getProgramacionCursos()).find(
      (item) => item.idProgramacion === requestedProgramacion
    );
    if (!nextProgramacion) throw new Error("Schedule not found");
    if (nextProgramacion.cuposRestantes <= 0) throw new Error("Schedule has no remaining seats");
  }

  const updates: Record<string, RawValue> = {};
  if (estadoAsistencia) updates.estado_asistencia = estadoAsistencia;
  if (shouldUpdateProgramacion) updates.id_programacion = requestedProgramacion;

  const result = await updateById(
    SHEETS.inscripciones,
    "id_inscripcion",
    idInscripcion,
    updates,
    { ignoreMissingFields: true }
  );
  const idProgramacionSupported = result.updatedFields.includes("id_programacion");

  if (idProgramacionSupported && shouldUpdateProgramacion && requestedProgramacion !== previousProgramacion) {
    if (requestedProgramacion) await adjustProgramacionCupos(requestedProgramacion, -1);
    if (previousProgramacion) await adjustProgramacionCupos(previousProgramacion, 1);
  }

  return {
    idInscripcion,
    estadoAsistencia: estadoAsistencia || current.estadoAsistencia,
    idProgramacion: idProgramacionSupported ? requestedProgramacion : previousProgramacion,
    idProgramacionSupported,
  };
}

export async function postInscripcion(input: NewInscripcionInput) {
  const idInscripcion = input.idInscripcion ?? `INS-${Date.now()}`;
  const inscripcion = {
    idInscripcion,
    idPaciente: input.idPaciente,
    idServicio: input.idServicio,
    fechaProgramada: input.fechaProgramada,
    estadoAsistencia: input.estadoAsistencia ?? "Programada",
    esRegistroPrueba: input.esRegistroPrueba ?? false,
    origenRegistro: input.origenRegistro?.trim() ?? "",
    notaInterna: input.notaInterna?.trim() ?? "",
  };

  await appendByHeaders(SHEETS.inscripciones, {
    id_inscripcion: inscripcion.idInscripcion,
    id_paciente: inscripcion.idPaciente,
    id_servicio: inscripcion.idServicio,
    fecha_programada: inscripcion.fechaProgramada,
    estado_asistencia: inscripcion.estadoAsistencia,
    es_registro_prueba: inscripcion.esRegistroPrueba ? "TRUE" : "",
    origen_registro: inscripcion.origenRegistro,
    nota_interna: inscripcion.notaInterna,
  }, "RAW");

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
    nombreGrupo: input.nombreGrupo?.trim() ?? "",
    modalidad: input.modalidad?.trim() ?? "",
    estadoProgramacion: input.estadoProgramacion?.trim() || "Programada",
    nota: input.nota?.trim() ?? "",
  };

  const { sheets, spreadsheetId } = await getSheetsClient();
  if (!sheets || !spreadsheetId) throw new Error("Google Sheets not configured");

  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEETS.programacion_cursos}!A1:E1`,
  });
  const headers = (headerResponse.data.values?.[0] || []).map(String);
  const expectedFields = [
    "id_programacion",
    "id_curso",
    "fecha_hora",
    "cupos_totales",
    "cupos_restantes",
  ];
  const hasExpectedColumns = expectedFields.every(
    (field, index) => normalizeKey(headers[index] || "") === field
  );
  if (!hasExpectedColumns) {
    throw new Error("Programacion_Cursos must have the expected A:E columns");
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEETS.programacion_cursos}!A:E`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        programacionCurso.idProgramacion,
        programacionCurso.idServicio,
        programacionCurso.fechaHora,
        programacionCurso.cuposTotales,
        programacionCurso.cuposRestantes,
      ]],
    },
  });

  return programacionCurso;
}
