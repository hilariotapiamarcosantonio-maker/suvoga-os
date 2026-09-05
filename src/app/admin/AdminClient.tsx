"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Leaf,
  MessageCircle,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { brand } from "@/lib/brand";

// ─── Types ──────────────────────────────────────────────────────────────────

export type AdminCrmRow = {
  idInscripcion: string;
  idPaciente: string;
  idServicio: string;
  idProgramacion: string;
  nombreCompleto: string;
  whatsapp: string;
  cedula: string;
  provincia: string;
  cursoNombre: string;
  fechaProgramada: string;
  estadoAsistencia: string;
  estadoPago: string;
  metodoPago: string;
  montoPagado: number;
  balancePendiente: number;
  precioTotal: number;
  crmStatus: string;
  esRegistroPrueba?: boolean;
  origenRegistro?: string;
  notaInterna?: string;
};

/** Legacy alias kept so other imports don't break */
export type AdminInscriptionRow = {
  idInscripcion: string;
  nombreCompleto: string;
  whatsapp: string;
  cursoNombre: string;
  cedula: string;
  provincia: string;
  estadoAnticipo: string;
};

export type AdminCourse = {
  idServicio: string;
  nombre: string;
  tipo: string;
  precioTotal: number;
  montoAnticipo: number;
  cuposTotales: number;
};

export type AdminScheduledCourse = {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  time: string;
  capacity: number;
  remaining: number;
  groupName?: string;
  modality?: string;
  status?: string;
  note?: string;
  enrolled?: number;
  paymentsReceived?: number;
  pendingPayments?: number;
};

export type AdminPayment = {
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

export type AdminCourseView = {
  idServicio: string;
  nombre: string;
  cuposTotales: number;
  cuposRestantes: number;
  inscritas: number;
  anticiposPendientes: number;
  pagosRecibidos: number;
  balancePendienteTotal: number;
  proximaFecha: string;
};

type AdminClientProps = {
  crmRows: AdminCrmRow[];
  courses: AdminCourse[];
  scheduledCourses: AdminScheduledCourse[];
  courseViews: AdminCourseView[];
  historialPagos: AdminPayment[];
  source: string;
};

type AdminTab = "dashboard" | "crm" | "cursos_vista" | "calendario" | "cursos";

type CourseFormState = {
  nombre: string;
  precio: string;
  anticipo: string;
  cupos: string;
};

type CalendarCell = {
  day: number;
  date: string;
  currentMonth: boolean;
};

type PaymentAction = "pendiente" | "confirmado" | "completa";
type SaveMessage = {
  rowId: string;
  type: "success" | "error";
  text: string;
};
type PaymentDraft = {
  montoPagado: string;
  metodoPago: string;
};
type PaymentEntryDraft = {
  monto: string;
  metodoPago: string;
  concepto: AdminPayment["concepto"];
  fechaPago: string;
  fechaVencimiento: string;
  nota: string;
};

// ─── Constants ──────────────────────────────────────────────────────────────

const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const DEMO_COURSES_STORAGE_KEY = "suvoga_demo_courses";
const initialCourseForm: CourseFormState = {
  nombre: "",
  precio: "",
  anticipo: "1000",
  cupos: "12",
};

const ATTENDANCE_STATUSES = [
  "Inscrito",
  "Contactado",
  "Asistió",
  "No asistió",
  "Reprogramar",
  "Finalizada",
] as const;

const PAYMENT_ACTIONS: Array<[PaymentAction, string]> = [
  ["pendiente", "Anticipo pendiente"],
  ["confirmado", "Anticipo confirmado"],
  ["completa", "Inscripción completa"],
];

const SAVE_ERROR_MESSAGE = "No se pudo guardar. Revisa conexión o permisos.";
const PAYMENT_CONCEPTS: PaymentEntryDraft["concepto"][] = [
  "Anticipo",
  "Pago de clase",
  "Pago parcial",
  "Pago final",
  "Ajuste",
  "Otro",
];

const CRM_STATUS_COLORS: Record<string, string> = {
  "Nueva inscripción":    "border-blue-200 bg-blue-50 text-blue-700",
  "Contactar por WhatsApp": "border-orange-200 bg-orange-50 text-orange-700",
  "Pendiente":            "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#8D7530]",
  "Parcial":              "border-orange-200 bg-orange-50 text-orange-700",
  "Pagado":               "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Anticipo pendiente":   "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#8D7530]",
  "Anticipo confirmado":  "border-[#0D3B22]/15 bg-[#0D3B22]/10 text-[#0D3B22]",
  "Balance pendiente":    "border-orange-300 bg-orange-50 text-orange-800",
  "Inscripción completa": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Recordatorio enviado": "border-purple-200 bg-purple-50 text-purple-700",
  "Asistió":              "border-emerald-200 bg-emerald-50 text-emerald-700",
  "No asistió":           "border-red-200 bg-red-50 text-red-700",
  "Reprogramar":          "border-orange-200 bg-orange-50 text-orange-700",
  "Finalizada":           "border-gray-200 bg-gray-50 text-gray-600",
};

function statusColor(status: string) {
  return CRM_STATUS_COLORS[status] ?? "border-gray-200 bg-gray-50 text-gray-600";
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function cleanPhoneForWhatsapp(phone: string) {
  return phone.replace(/\D/g, "");
}

function whatsappHref(phone: string, name: string, curso: string) {
  const cleaned = cleanPhoneForWhatsapp(phone);
  if (!cleaned) return "";
  const msg = `Hola ${name}. Te escribimos de ${brand.productName} para confirmar tu solicitud para ${curso}.`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`;
}

function isPending(status: string) {
  const n = status.toLowerCase();
  return !n || n.includes("pendiente") || n.includes("parcial") || n.includes("nueva");
}

function isNewRegistration(status: string) {
  const normalized = status.toLowerCase();
  return normalized.includes("nueva") || normalized.includes("pendiente") || normalized.includes("contactar");
}

function dateSortValue(value: string) {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function advanceStatus(row: AdminCrmRow) {
  if (row.estadoPago.trim()) return row.estadoPago;
  if (row.montoPagado > 0 && row.balancePendiente > 0) return "Parcial";
  if (row.montoPagado > 0) return "Pagado";
  return "Pendiente";
}

function monthTitle(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function toIsoDate(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDayGrid(date: Date): CalendarCell[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const grid: CalendarCell[] = [];

  for (let index = firstDay - 1; index >= 0; index -= 1) {
    grid.push({ day: previousMonthDays - index, date: "", currentMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    grid.push({ day, date: toIsoDate(year, month, day), currentMonth: true });
  }
  while (grid.length < 42) {
    grid.push({ day: grid.length - firstDay - daysInMonth + 1, date: "", currentMonth: false });
  }
  return grid;
}

function parsePositiveNumber(value: string) {
  const normalized = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : NaN;
}

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("es-DO", { day: "2-digit", month: "short", year: "numeric" });
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeStoredCourses(value: unknown): AdminCourse[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const course = item as Partial<AdminCourse>;
      const idServicio = String(course.idServicio ?? "").trim();
      const nombre = String(course.nombre ?? "").trim();
      if (!idServicio || !nombre) return null;
      return {
        idServicio,
        nombre,
        tipo: String(course.tipo ?? "Curso"),
        precioTotal: Number(course.precioTotal) || 0,
        montoAnticipo: Number(course.montoAnticipo) || 1000,
        cuposTotales: Number(course.cuposTotales) || 12,
      };
    })
    .filter((course): course is AdminCourse => Boolean(course));
}

function readDemoCourses() {
  if (typeof window === "undefined") return [];
  try {
    return normalizeStoredCourses(
      JSON.parse(window.localStorage.getItem(DEMO_COURSES_STORAGE_KEY) || "[]")
    );
  } catch {
    return [];
  }
}

function writeDemoCourses(courses: AdminCourse[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_COURSES_STORAGE_KEY, JSON.stringify(courses));
  window.dispatchEvent(new Event("suvoga-demo-courses-updated"));
}

function mergeCourses(baseCourses: AdminCourse[], demoCourses: AdminCourse[]) {
  const byId = new Map<string, AdminCourse>();
  [...baseCourses, ...demoCourses].forEach((c) => byId.set(c.idServicio, c));
  return Array.from(byId.values());
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${statusColor(status)}`}>
      {status || "Sin estado"}
    </span>
  );
}

function CourseChip({ event }: { event: AdminScheduledCourse }) {
  return (
    <div
      className="rounded-xl bg-[#0D3B22] px-2.5 py-2 text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10"
      title={`${event.courseName} - ${event.time}`}
    >
      <p className="truncate text-[11px] font-semibold leading-tight">{event.courseName}</p>
      <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37]">
        <Clock className="h-3 w-3" />
        {event.time} - {event.remaining}/{event.capacity}
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminClient({
  crmRows,
  courses,
  scheduledCourses,
  courseViews,
  historialPagos,
  source,
}: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [crmQuery, setCrmQuery] = useState("");
  const [crmFilter, setCrmFilter] = useState<string>("Todos");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [events, setEvents] = useState<AdminScheduledCourse[]>(scheduledCourses);
  const [catalogCourses, setCatalogCourses] = useState<AdminCourse[]>(courses);
  const [courseId, setCourseId] = useState(courses[0]?.idServicio ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [capacity, setCapacity] = useState("12");
  const [groupName, setGroupName] = useState("");
  const [modality, setModality] = useState("");
  const [scheduleNote, setScheduleNote] = useState("");
  const [formError, setFormError] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState<CourseFormState>(initialCourseForm);
  const [courseFormError, setCourseFormError] = useState("");
  const [localCrmOverrides, setLocalCrmOverrides] = useState<Record<string, Partial<AdminCrmRow>>>({});
  const [paymentDrafts, setPaymentDrafts] = useState<Record<string, PaymentDraft>>({});
  const [paymentEntryDrafts, setPaymentEntryDrafts] = useState<Record<string, PaymentEntryDraft>>({});
  const [localPaymentHistory, setLocalPaymentHistory] = useState<Record<string, AdminPayment[]>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<SaveMessage | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [includeTestRecords, setIncludeTestRecords] = useState(false);

  const visibleCrmRows = useMemo(() => {
    const rows = (includeTestRecords ? crmRows : crmRows.filter((row) => !row.esRegistroPrueba))
      .map((row) => ({ ...row, ...localCrmOverrides[row.idInscripcion] }));
    return [...rows].sort((a, b) => {
      const aStatus = a.crmStatus;
      const bStatus = b.crmStatus;
      const newPriority = Number(isNewRegistration(bStatus)) - Number(isNewRegistration(aStatus));
      if (newPriority !== 0) return newPriority;
      return dateSortValue(b.fechaProgramada) - dateSortValue(a.fechaProgramada);
    });
  }, [crmRows, includeTestRecords, localCrmOverrides]);
  const testRecordCount = crmRows.filter((row) => row.esRegistroPrueba).length;
  const pendingCount = visibleCrmRows.filter((r) => isPending(r.crmStatus)).length;
  const paidCount = visibleCrmRows.filter((r) => !isPending(r.crmStatus)).length;
  const selectedCourse = catalogCourses.find((c) => c.idServicio === courseId);
  const dayGrid = getDayGrid(currentMonth);

  // Dashboard KPIs
  const topCourses = useMemo(() => {
    const counts: Record<string, { nombre: string; count: number }> = {};
    for (const row of visibleCrmRows) {
      const key = row.cursoNombre;
      if (!counts[key]) counts[key] = { nombre: key, count: 0 };
      counts[key].count += 1;
    }
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [visibleCrmRows]);

  const topProvincias = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const row of visibleCrmRows) {
      const prov = row.provincia || "Sin provincia";
      counts[prov] = (counts[prov] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [visibleCrmRows]);

  const maxCourseCount = topCourses[0]?.count || 1;
  const maxProvCount = topProvincias[0]?.[1] || 1;

  // CRM filtered rows
  const crmStatuses = useMemo(() => {
    const set = new Set(visibleCrmRows.map((r) => r.crmStatus));
    return ["Todos", ...Array.from(set)];
  }, [visibleCrmRows]);

  const filteredCrmRows = useMemo(() => {
    const needle = crmQuery.trim().toLowerCase();
    return visibleCrmRows.filter((row) => {
      const effectiveStatus = row.crmStatus;
      const matchFilter = crmFilter === "Todos" || effectiveStatus === crmFilter;
      if (!matchFilter) return false;
      if (!needle) return true;
      return [row.nombreCompleto, row.cursoNombre, row.provincia, row.cedula, effectiveStatus]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [crmQuery, crmFilter, visibleCrmRows]);

  const visibleCourseViews = useMemo(() => {
    const views = new Map(
      courseViews.map((course) => [
        course.idServicio,
        {
          ...course,
          inscritas: 0,
          anticiposPendientes: 0,
          pagosRecibidos: 0,
          balancePendienteTotal: 0,
        },
      ])
    );

    for (const row of visibleCrmRows) {
      const view = views.get(row.idServicio);
      if (!view) continue;
      const effectiveStatus = row.crmStatus;
      view.inscritas += 1;
      if (row.montoPagado > 0) view.pagosRecibidos += row.montoPagado;
      if (row.balancePendiente > 0) view.balancePendienteTotal += row.balancePendiente;
      if (isPending(effectiveStatus)) view.anticiposPendientes += 1;
    }

    return Array.from(views.values()).sort((a, b) => b.inscritas - a.inscritas);
  }, [courseViews, visibleCrmRows]);

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, AdminScheduledCourse[]>>((acc, event) => {
      acc[event.date] = [...(acc[event.date] ?? []), event];
      return acc;
    }, {});
  }, [events]);

  useEffect(() => {
    const mergedCourses = mergeCourses(courses, readDemoCourses());
    setCatalogCourses(mergedCourses);
    setCourseId((current) => current || mergedCourses[0]?.idServicio || "");
  }, [courses]);

  async function handleScheduleCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSaveMessage(null);
    const seats = Number.parseInt(capacity, 10);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(selectedDate);
    const validTime = /^\d{2}:\d{2}$/.test(selectedTime);
    if (!selectedCourse || !validDate || !validTime || !Number.isFinite(seats) || seats < 1) {
      setFormError("Completa curso, fecha, hora y cupos con formato valido.");
      return;
    }

    setSavingKey("programacion");
    try {
      const response = await fetch("/admin/api/programaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idServicio: selectedCourse.idServicio,
          fechaHora: `${selectedDate}T${selectedTime}`,
          cuposTotales: seats,
          nombreGrupo: groupName,
          modalidad: modality,
          nota: scheduleNote,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as Partial<AdminScheduledCourse> & { idProgramacion?: string; error?: string };
      const idProgramacion = payload.idProgramacion;
      if (!response.ok || !idProgramacion) throw new Error(payload.error || SAVE_ERROR_MESSAGE);

      setEvents((current) => [
        ...current,
        {
          id: idProgramacion,
          courseId: selectedCourse.idServicio,
          courseName: selectedCourse.nombre,
          date: selectedDate,
          time: selectedTime,
          capacity: seats,
          remaining: seats,
          groupName,
          modality,
          status: "Programada",
          note: scheduleNote,
          enrolled: 0,
          paymentsReceived: 0,
          pendingPayments: 0,
        },
      ]);
      setCurrentMonth(new Date(`${selectedDate}T12:00:00`));
      setSelectedDate("");
      setSelectedTime("09:00");
      setCapacity(String(selectedCourse.cuposTotales || 12));
      setGroupName("");
      setModality("");
      setScheduleNote("");
      setSaveMessage({ rowId: "programacion", type: "success", text: "Guardado correctamente" });
    } catch {
      setSaveMessage({ rowId: "programacion", type: "error", text: SAVE_ERROR_MESSAGE });
    } finally {
      setSavingKey(null);
    }
  }

  function paymentDraftFor(row: AdminCrmRow): PaymentDraft {
    return paymentDrafts[row.idInscripcion] ?? {
      montoPagado: row.montoPagado > 0 ? String(row.montoPagado) : "",
      metodoPago: row.metodoPago,
    };
  }

  function updatePaymentDraft(rowId: string, field: keyof PaymentDraft, value: string) {
    setPaymentDrafts((current) => ({
      ...current,
      [rowId]: {
        ...current[rowId],
        montoPagado: current[rowId]?.montoPagado ?? "",
        metodoPago: current[rowId]?.metodoPago ?? "",
        [field]: value,
      },
    }));
  }

  function paymentEntryDraftFor(row: AdminCrmRow): PaymentEntryDraft {
    return paymentEntryDrafts[row.idInscripcion] ?? {
      monto: "",
      metodoPago: row.metodoPago,
      concepto: "Anticipo",
      fechaPago: todayIsoDate(),
      fechaVencimiento: "",
      nota: "",
    };
  }

  function updatePaymentEntryDraft(
    rowId: string,
    field: keyof PaymentEntryDraft,
    value: string
  ) {
    const row = crmRows.find((item) => item.idInscripcion === rowId);
    setPaymentEntryDrafts((current) => ({
      ...current,
      [rowId]: {
        ...(current[rowId] ?? {
          monto: "",
          metodoPago: row?.metodoPago ?? "",
          concepto: "Anticipo" as const,
          fechaPago: todayIsoDate(),
          fechaVencimiento: "",
          nota: "",
        }),
        [field]: field === "concepto"
          ? value as PaymentEntryDraft["concepto"]
          : value,
      },
    }));
  }

  async function saveNewPayment(row: AdminCrmRow) {
    const draft = paymentEntryDraftFor(row);
    const monto = parsePositiveNumber(draft.monto);
    if (Number.isNaN(monto) || monto <= 0) {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: "Escribe un monto válido." });
      return;
    }

    setSavingKey(`${row.idInscripcion}:new-payment`);
    setSaveMessage(null);
    try {
      const response = await fetch("/admin/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idInscripcion: row.idInscripcion,
          idPaciente: row.idPaciente,
          idServicio: row.idServicio,
          nombreAlumnoAlPagar: row.nombreCompleto,
          nombreProgramaAlPagar: row.cursoNombre,
          fechaPago: draft.fechaPago,
          fechaVencimiento: draft.fechaVencimiento,
          monto,
          metodoPago: draft.metodoPago,
          concepto: draft.concepto,
          nota: draft.nota,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        pago?: AdminPayment;
        totalPagado?: number;
        balancePendiente?: number;
        estadoPago?: string;
        metodoPago?: string;
        error?: string;
      };
      if (!response.ok || !payload.pago || typeof payload.totalPagado !== "number") {
        throw new Error(payload.error || SAVE_ERROR_MESSAGE);
      }

      const nextStatus = payload.balancePendiente && payload.balancePendiente > 0
        ? "Anticipo confirmado"
        : "Inscripción completa";
      setLocalCrmOverrides((current) => ({
        ...current,
        [row.idInscripcion]: {
          ...current[row.idInscripcion],
          montoPagado: payload.totalPagado,
          balancePendiente: payload.balancePendiente ?? 0,
          estadoPago: payload.estadoPago ?? "",
          metodoPago: payload.metodoPago ?? draft.metodoPago,
          crmStatus: nextStatus,
        },
      }));
      setLocalPaymentHistory((current) => ({
        ...current,
        [row.idInscripcion]: [...(current[row.idInscripcion] ?? []), payload.pago as AdminPayment],
      }));
      setPaymentEntryDrafts((current) => ({
        ...current,
        [row.idInscripcion]: { ...draft, monto: "", nota: "" },
      }));
      setSaveMessage({ rowId: row.idInscripcion, type: "success", text: "Pago guardado correctamente" });
    } catch {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: SAVE_ERROR_MESSAGE });
    } finally {
      setSavingKey(null);
    }
  }

  async function savePayment(row: AdminCrmRow, action: PaymentAction) {
    const draft = paymentDraftFor(row);
    const montoPagado = parsePositiveNumber(draft.montoPagado || "0");
    if (Number.isNaN(montoPagado)) {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: "Escribe un monto válido." });
      return;
    }

    setSavingKey(`${row.idInscripcion}:payment`);
    setSaveMessage(null);
    try {
      const response = await fetch("/admin/api/anticipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idInscripcion: row.idInscripcion,
          action,
          montoPagado,
          metodoPago: draft.metodoPago,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as Partial<AdminCrmRow> & { error?: string };
      if (!response.ok || typeof payload.montoPagado !== "number") throw new Error(payload.error || SAVE_ERROR_MESSAGE);

      setLocalCrmOverrides((current) => ({
        ...current,
        [row.idInscripcion]: {
          ...current[row.idInscripcion],
          montoPagado: payload.montoPagado,
          balancePendiente: payload.balancePendiente ?? 0,
          estadoPago: payload.estadoPago ?? "",
          metodoPago: payload.metodoPago ?? draft.metodoPago,
          crmStatus: action === "completa"
            ? "Inscripción completa"
            : action === "confirmado"
              ? "Anticipo confirmado"
              : "Anticipo pendiente",
        },
      }));
      setPaymentDrafts((current) => ({
        ...current,
        [row.idInscripcion]: {
          montoPagado: String(payload.montoPagado),
          metodoPago: payload.metodoPago ?? draft.metodoPago,
        },
      }));
      setSaveMessage({ rowId: row.idInscripcion, type: "success", text: "Guardado correctamente" });
    } catch {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: SAVE_ERROR_MESSAGE });
    } finally {
      setSavingKey(null);
    }
  }

  async function saveAttendance(row: AdminCrmRow, estadoAsistencia: string) {
    setSavingKey(`${row.idInscripcion}:attendance`);
    setSaveMessage(null);
    try {
      const response = await fetch("/admin/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idInscripcion: row.idInscripcion, estadoAsistencia }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || SAVE_ERROR_MESSAGE);

      setLocalCrmOverrides((current) => ({
        ...current,
        [row.idInscripcion]: {
          ...current[row.idInscripcion],
          estadoAsistencia,
        },
      }));
      setSaveMessage({ rowId: row.idInscripcion, type: "success", text: "Guardado correctamente" });
    } catch {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: SAVE_ERROR_MESSAGE });
    } finally {
      setSavingKey(null);
    }
  }

  async function saveProgramacion(row: AdminCrmRow, idProgramacion: string) {
    setSavingKey(`${row.idInscripcion}:programacion`);
    setSaveMessage(null);
    try {
      const response = await fetch("/admin/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idInscripcion: row.idInscripcion,
          estadoAsistencia: row.estadoAsistencia || "Inscrito",
          idProgramacion,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        idProgramacion?: string;
        idProgramacionSupported?: boolean;
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error || SAVE_ERROR_MESSAGE);
      if (!payload.idProgramacionSupported) {
        setSaveMessage({
          rowId: row.idInscripcion,
          type: "error",
          text: "No se pudo asignar el grupo: falta la columna ID_Programacion.",
        });
        return;
      }

      setLocalCrmOverrides((current) => ({
        ...current,
        [row.idInscripcion]: {
          ...current[row.idInscripcion],
          idProgramacion: payload.idProgramacion ?? idProgramacion,
        },
      }));
      setEvents((current) => current.map((event) => {
        if (event.id === row.idProgramacion && event.id !== idProgramacion) {
          return { ...event, remaining: event.remaining + 1 };
        }
        if (event.id === idProgramacion && event.id !== row.idProgramacion) {
          return { ...event, remaining: Math.max(event.remaining - 1, 0) };
        }
        return event;
      }));
      setSaveMessage({ rowId: row.idInscripcion, type: "success", text: "Guardado correctamente" });
    } catch {
      setSaveMessage({ rowId: row.idInscripcion, type: "error", text: SAVE_ERROR_MESSAGE });
    } finally {
      setSavingKey(null);
    }
  }

  function updateCourseForm(field: keyof CourseFormState, value: string) {
    setCourseForm((current) => ({ ...current, [field]: value }));
    setCourseFormError("");
  }

  function closeCourseModal() {
    setIsCourseModalOpen(false);
    setCourseForm(initialCourseForm);
    setCourseFormError("");
  }

  function handleCreateCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCourseFormError("");
    const nombre = courseForm.nombre.trim();
    const precioTotal = parsePositiveNumber(courseForm.precio);
    const montoAnticipo = parsePositiveNumber(courseForm.anticipo);
    const cuposTotales = Math.floor(parsePositiveNumber(courseForm.cupos));

    if (!nombre) { setCourseFormError("Escribe el nombre del curso."); return; }
    if (Number.isNaN(precioTotal) || Number.isNaN(montoAnticipo) || Number.isNaN(cuposTotales) || cuposTotales < 1) {
      setCourseFormError("Precio, anticipo y cupos deben ser numeros validos."); return;
    }
    const newCourse: AdminCourse = {
      idServicio: `DEMO-${Date.now()}`,
      nombre,
      tipo: "Curso",
      precioTotal,
      montoAnticipo,
      cuposTotales,
    };
    const demoCourses = [...readDemoCourses(), newCourse];
    writeDemoCourses(demoCourses);
    setCatalogCourses((current) => mergeCourses(current, [newCourse]));
    setCourseId(newCourse.idServicio);
    setCapacity(String(newCourse.cuposTotales));
    closeCourseModal();
  }

  function tabClass(tab: AdminTab) {
    return activeTab === tab
      ? "bg-[#0D3B22] text-[#FDFBF7] shadow-sm"
      : "bg-transparent text-[#4E6658] hover:bg-[#FDFBF7]";
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#FDFBF7] px-4 py-8 text-[#0D3B22] sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin {brand.parentBrand}
              </div>
              <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-none text-[#0D3B22] sm:text-5xl">
                Academia & CRM Académico
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4E6658]">
                Gestión centralizada de inscripciones, seguimiento de alumnas, cupos y calendario operativo.
              </p>
              <label className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#FDFBF7] px-3 py-2 text-xs font-semibold text-[#4E6658]">
                <input
                  type="checkbox"
                  checked={includeTestRecords}
                  onChange={(event) => setIncludeTestRecords(event.target.checked)}
                  className="h-4 w-4 accent-[#0D3B22]"
                />
                <span>Incluir registros de prueba</span>
                {testRecordCount > 0 ? (
                  <span className="rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[#8D7530]">
                    {testRecordCount} QA
                  </span>
                ) : null}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[640px]">
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Inscritas</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-[#0D3B22]">{visibleCrmRows.length}</p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Pendientes</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-[#8D7530]">{pendingCount}</p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Confirmadas</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-[#0D3B22]">{paidCount}</p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Fuente</p>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold capitalize text-[#0D3B22] truncate">{source.replace("-", " ")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs — horizontally scrollable on narrow screens; short labels below sm
            keep every tab's full word visible instead of clipping mid-word, while
            aria-label preserves the complete name for assistive tech. */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none gap-1 rounded-2xl border border-[#D4AF37]/30 bg-white p-1 shadow-sm shadow-[#0D3B22]/5">
          {([
            { id: "dashboard", label: "Dashboard", shortLabel: "Dashboard", icon: <BarChart3 className="h-4 w-4" /> },
            { id: "crm", label: "CRM Académico", shortLabel: "CRM", icon: <Users className="h-4 w-4" /> },
            { id: "cursos_vista", label: "Vista por Curso", shortLabel: "Por curso", icon: <TrendingUp className="h-4 w-4" /> },
            { id: "calendario", label: "Calendario", shortLabel: "Agenda", icon: <CalendarDays className="h-4 w-4" /> },
            { id: "cursos", label: "Mis Cursos", shortLabel: "Cursos", icon: <BookOpen className="h-4 w-4" /> },
          ] as { id: AdminTab; label: string; shortLabel: string; icon: React.ReactNode }[]).map(({ id, label, shortLabel, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-label={label}
              aria-current={activeTab === id ? "page" : undefined}
              className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 ${tabClass(id)}`}
            >
              {icon}
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" ? (
          <section className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Inscripciones", value: visibleCrmRows.length, icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#C5A028]" />, color: "border-[#D4AF37]/30" },
                { label: "Confirmadas", value: paidCount, icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#0D3B22]" />, color: "border-[#0D3B22]/15" },
                { label: "Anticipo Pendiente", value: pendingCount, icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#C5A028]" />, color: "border-[#D4AF37]/30" },
                { label: "Cursos en Catálogo", value: catalogCourses.length, icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[#C5A028]" />, color: "border-[#D4AF37]/30" },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className={`rounded-2xl sm:rounded-3xl border ${color} bg-white p-3 sm:p-5 shadow-sm shadow-[#0D3B22]/5`}>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#FDFBF7]">{icon}</span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69] truncate">{label}</span>
                  </div>
                  <p className="mt-2.5 sm:mt-4 text-2xl sm:text-4xl font-bold text-[#0D3B22]">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top Courses */}
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-6 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                    <BarChart3 className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <div>
                    <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">Top Cursos</h3>
                    <p className="text-xs text-[#6B6048]">Por número de inscripciones</p>
                  </div>
                </div>
                {topCourses.length > 0 ? (
                  <div className="space-y-4">
                    {topCourses.map(({ nombre, count }, index) => (
                      <div key={nombre}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="flex items-center gap-2 text-sm font-medium text-[#0D3B22] min-w-0">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D3B22] text-[#FDFBF7] text-[10px] font-bold">{index + 1}</span>
                            <span className="truncate">{nombre.length > 30 ? nombre.slice(0, 28) + "…" : nombre}</span>
                          </span>
                          <span className="ml-2 shrink-0 text-sm font-bold text-[#0D3B22]">{count}</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-[#F0EAD8] overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#0D3B22] to-[#1a5c38] transition-all duration-700" style={{ width: `${(count / maxCourseCount) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                    <p className="mt-3 text-sm text-[#6B6048]">Sin inscripciones todavía</p>
                  </div>
                )}
              </div>

              {/* Province */}
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-6 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                    <Users className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <div>
                    <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">Por Provincia</h3>
                    <p className="text-xs text-[#6B6048]">Distribución geográfica</p>
                  </div>
                </div>
                {topProvincias.length > 0 ? (
                  <div className="space-y-3">
                    {topProvincias.map(([provincia, count]) => (
                      <div key={provincia}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#0D3B22]">{provincia}</span>
                          <span className="text-sm font-bold text-[#0D3B22]">{count}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#F0EAD8] overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] transition-all duration-700" style={{ width: `${(count / maxProvCount) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                    <p className="mt-3 text-sm text-[#6B6048]">Sin datos todavía</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent inscriptions */}
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-6 shadow-sm shadow-[#0D3B22]/5">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                  <TrendingUp className="h-5 w-5 text-[#C5A028]" />
                </span>
                <div>
                  <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">Últimas Inscripciones</h3>
                  <p className="text-xs text-[#6B6048]">Nuevas y pendientes primero · luego por fecha</p>
                </div>
              </div>
              {visibleCrmRows.length > 0 ? (
                <div className="space-y-3">
                  {visibleCrmRows.slice(0, 5).map((row) => (
                    <div key={row.idInscripcion} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E7DAC2] bg-[#FDFBF7] px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0D3B22]">
                          {row.nombreCompleto}
                          {row.esRegistroPrueba ? (
                            <span className="ml-2 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#8D7530]">QA</span>
                          ) : null}
                        </p>
                        <p className="truncate text-xs font-medium text-[#6B6048]">{row.cursoNombre}</p>
                        <p className="mt-0.5 truncate text-[11px] text-[#8A7D69]">{row.whatsapp || "WhatsApp no registrado"}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-[11px] font-semibold text-[#0D3B22]">{formatDate(row.fechaProgramada)}</span>
                        <StatusPill status={advanceStatus(row)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                  <p className="mt-3 text-sm text-[#6B6048]">Sin inscripciones todavía.</p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* ── CRM ACADÉMICO ── */}
        {activeTab === "crm" ? (
          <section className="space-y-5">
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">Seguimiento operativo</p>
                  <h2 className="suvoga-serif mt-1 text-3xl font-semibold text-[#0D3B22]">CRM Académico</h2>
                  <p className="mt-1 text-sm text-[#6B6048]">{filteredCrmRows.length} alumnas visibles</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Status filter */}
                  <select
                    value={crmFilter}
                    onChange={(e) => setCrmFilter(e.target.value)}
                    className="h-11 rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                  >
                    {crmStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {/* Search */}
                  <label className="relative block sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7D69]" />
                    <input
                      value={crmQuery}
                      onChange={(e) => setCrmQuery(e.target.value)}
                      placeholder="Buscar alumna, curso o provincia…"
                      className="h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] pl-9 pr-3 text-sm text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                    />
                  </label>
                </div>
              </div>

              {filteredCrmRows.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {filteredCrmRows.map((row) => {
                    const effectiveStatus = row.crmStatus;
                    const attendanceStatus = row.estadoAsistencia || "Inscrito";
                    const waHref = whatsappHref(row.whatsapp, row.nombreCompleto, row.cursoNombre);
                    const isExpanded = expandedRow === row.idInscripcion;
                    const paymentDraft = paymentDraftFor(row);
                    const paymentEntryDraft = paymentEntryDraftFor(row);
                    const rowPaymentHistory = [
                      ...historialPagos.filter((payment) => payment.idInscripcion === row.idInscripcion),
                      ...(localPaymentHistory[row.idInscripcion] ?? []),
                    ];
                    const paymentAmount = parsePositiveNumber(paymentDraft.montoPagado || "0");
                    const paymentBalance = Number.isNaN(paymentAmount)
                      ? row.balancePendiente
                      : Math.max(row.precioTotal - paymentAmount, 0);

                    return (
                      <div key={row.idInscripcion} className="rounded-2xl border border-[#E7DAC2] bg-[#FDFBF7] overflow-hidden transition-all duration-200">
                        {/* Row header */}
                        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          {/* Primary contact information */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <p className="text-sm font-semibold text-[#0D3B22]">
                                {row.nombreCompleto}
                                {row.esRegistroPrueba ? (
                                  <span className="ml-2 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#8D7530]">QA</span>
                                ) : null}
                              </p>
                              <span className="text-xs font-medium text-[#4E6658]">
                                {row.whatsapp || "WhatsApp no registrado"}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-xs font-medium text-[#6B6048]" title={row.cursoNombre}>{row.cursoNombre}</p>
                            <p className="mt-0.5 text-[11px] text-[#8A7D69]">{row.provincia || "Sin provincia"}</p>
                          </div>

                          {/* Date and payment state stay visible at a glance */}
                          <div className="flex flex-wrap items-center justify-between gap-3 sm:contents">
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Fecha</p>
                                <p className="mt-0.5 text-xs font-semibold text-[#0D3B22]">{formatDate(row.fechaProgramada)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Anticipo</p>
                                  <div className="mt-0.5"><StatusPill status={advanceStatus(row)} /></div>
                                </div>
                                {effectiveStatus !== advanceStatus(row) ? (
                                  <span className="hidden rounded-full border border-[#E7DAC2] bg-white px-2 py-1 text-[10px] font-semibold text-[#6B6048] sm:inline-flex">
                                    {effectiveStatus}
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 w-full sm:w-auto mt-1 sm:mt-0 justify-end">
                              {waHref && (
                                <a
                                  href={waHref}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex h-10 sm:h-9 items-center justify-center gap-1.5 rounded-xl bg-[#0D3B22] px-3.5 sm:px-3 text-xs font-semibold text-[#FDFBF7] shadow-sm transition-colors hover:bg-[#145332] flex-1 sm:flex-initial"
                                  title="Contactar por WhatsApp"
                                >
                                  <MessageCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => setExpandedRow(isExpanded ? null : row.idInscripcion)}
                                className="inline-flex h-10 sm:h-9 items-center justify-center gap-1.5 rounded-xl border border-[#D4AF37]/30 bg-white px-3.5 sm:px-3 text-xs font-semibold text-[#0D3B22] transition-colors hover:bg-[#F7F1E7] flex-1 sm:flex-initial"
                              >
                                <ExternalLink className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                                <span>{isExpanded ? "Cerrar" : "Detalle"}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded detail */}
                        {isExpanded && (
                          <div className="border-t border-[#E7DAC2] bg-white px-4 py-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">WhatsApp</p>
                                <p className="mt-1 text-sm font-medium text-[#0D3B22]">{row.whatsapp || "—"}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Cédula</p>
                                <p className="mt-1 text-sm font-medium text-[#0D3B22]">{row.cedula || "—"}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Fecha Programada</p>
                                <p className="mt-1 text-sm font-medium text-[#0D3B22]">{formatDate(row.fechaProgramada)}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Asistencia</p>
                                <p className="mt-1 text-sm font-medium text-[#0D3B22]">{row.estadoAsistencia || "Programada"}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Anticipo pagado</p>
                                <p className="mt-1 text-sm font-semibold text-emerald-700">{formatDop(row.montoPagado)}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Balance pendiente</p>
                                <p className="mt-1 text-sm font-semibold text-orange-700">{row.balancePendiente > 0 ? formatDop(row.balancePendiente) : "—"}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Estado de pago</p>
                                <p className="mt-1 text-sm font-medium text-[#0D3B22]">{row.estadoPago || "—"}</p>
                              </div>
                              <div className="rounded-xl border border-[#E7DAC2] bg-[#FDFBF7] p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">ID Inscripción</p>
                                <p className="mt-1 text-xs font-mono text-[#6B6048] break-all">{row.idInscripcion}</p>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-[#0D3B22]/15 bg-[#FDFBF7] p-4">
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Grupo / programación</p>
                                  <p className="mt-1 text-[11px] text-[#8A7D69]">Asigna esta inscripción a una fecha con cupos reales.</p>
                                </div>
                                {row.idProgramacion ? <StatusPill status="Grupo asignado" /> : <StatusPill status="Sin grupo" />}
                              </div>
                              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                                <select
                                  value={row.idProgramacion || ""}
                                  disabled={savingKey === `${row.idInscripcion}:programacion` || events.filter((event) => event.courseId === row.idServicio).length === 0}
                                  onChange={(event) => saveProgramacion(row, event.target.value)}
                                  className="h-10 min-w-0 flex-1 rounded-xl border border-[#D4AF37]/30 bg-white px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22] disabled:opacity-60"
                                >
                                  <option value="">Sin grupo asignado</option>
                                  {events
                                    .filter((event) => event.courseId === row.idServicio)
                                    .map((event) => (
                                      <option key={event.id} value={event.id}>
                                        {event.groupName || event.courseName} · {formatDate(event.date)} · {event.time} · {event.remaining}/{event.capacity}
                                      </option>
                                    ))}
                                </select>
                                {events.filter((event) => event.courseId === row.idServicio).length === 0 ? (
                                  <span className="text-xs text-[#8A7D69]">Crea primero una programación.</span>
                                ) : null}
                              </div>
                            </div>

                            {/* Persist payment information in Control_Anticipos */}
                            <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-4">
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Guardar anticipo</p>
                                  <p className="mt-1 text-[11px] text-[#8A7D69]">Actualiza Control_Anticipos y recalcula el balance.</p>
                                </div>
                                <span className="text-xs font-semibold text-[#0D3B22]">Balance calculado: {formatDop(paymentBalance)}</span>
                              </div>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Monto pagado</span>
                                  <input
                                    value={paymentDraft.montoPagado}
                                    onChange={(event) => updatePaymentDraft(row.idInscripcion, "montoPagado", event.target.value)}
                                    inputMode="decimal"
                                    placeholder="0"
                                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-white px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Método de pago</span>
                                  <input
                                    value={paymentDraft.metodoPago}
                                    onChange={(event) => updatePaymentDraft(row.idInscripcion, "metodoPago", event.target.value)}
                                    placeholder="Transferencia, efectivo…"
                                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-white px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                                  />
                                </label>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {PAYMENT_ACTIONS.map(([action, label]) => (
                                  <button
                                    key={action}
                                    type="button"
                                    disabled={savingKey === `${row.idInscripcion}:payment`}
                                    onClick={() => savePayment(row, action)}
                                    className="inline-flex min-h-9 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white px-3 text-xs font-semibold text-[#0D3B22] transition-colors hover:bg-[#F7F1E7] disabled:cursor-wait disabled:opacity-60"
                                  >
                                    {savingKey === `${row.idInscripcion}:payment` ? "Guardando…" : label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-2xl border border-[#D4AF37]/25 bg-white p-4">
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Registrar nuevo pago</p>
                                  <p className="mt-1 text-[11px] text-[#8A7D69]">Cada pago queda como historial y actualiza el resumen.</p>
                                </div>
                                <span className="text-xs font-semibold text-[#0D3B22]">Total pagado: {formatDop(row.montoPagado)}</span>
                              </div>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Monto</span>
                                  <input
                                    value={paymentEntryDraft.monto}
                                    onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "monto", event.target.value)}
                                    inputMode="decimal"
                                    placeholder="0"
                                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Método</span>
                                  <input
                                    value={paymentEntryDraft.metodoPago}
                                    onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "metodoPago", event.target.value)}
                                    placeholder="Transferencia, efectivo…"
                                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                                  />
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Concepto</span>
                                  <select
                                    value={paymentEntryDraft.concepto}
                                    onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "concepto", event.target.value)}
                                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
                                  >
                                    {PAYMENT_CONCEPTS.map((concept) => <option key={concept} value={concept}>{concept}</option>)}
                                  </select>
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Fecha de pago</span>
                                  <input type="date" value={paymentEntryDraft.fechaPago} onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "fechaPago", event.target.value)} className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]" />
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Vencimiento (opcional)</span>
                                  <input type="date" value={paymentEntryDraft.fechaVencimiento} onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "fechaVencimiento", event.target.value)} className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]" />
                                </label>
                                <label className="block">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">Nota</span>
                                  <input value={paymentEntryDraft.nota} onChange={(event) => updatePaymentEntryDraft(row.idInscripcion, "nota", event.target.value)} placeholder="Opcional" className="mt-1.5 h-10 w-full rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]" />
                                </label>
                              </div>
                              <button
                                type="button"
                                disabled={savingKey === `${row.idInscripcion}:new-payment`}
                                onClick={() => saveNewPayment(row)}
                                className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0D3B22] px-4 text-xs font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332] disabled:cursor-wait disabled:opacity-60"
                              >
                                <Save className="h-3.5 w-3.5" />
                                {savingKey === `${row.idInscripcion}:new-payment` ? "Guardando…" : "Guardar pago"}
                              </button>
                            </div>

                            <div className="rounded-2xl border border-[#0D3B22]/10 bg-[#FDFBF7] p-4">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Historial de pagos</p>
                                <span className="text-xs font-semibold text-[#8A7D69]">{rowPaymentHistory.length} registro{rowPaymentHistory.length === 1 ? "" : "s"}</span>
                              </div>
                              {rowPaymentHistory.length > 0 ? (
                                <div className="mt-3 space-y-2">
                                  {rowPaymentHistory.map((payment) => (
                                    <div key={payment.idPago} className="flex flex-col gap-2 rounded-xl border border-[#E7DAC2] bg-white p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                                      <div>
                                        <p className="font-semibold text-[#0D3B22]">{formatDate(payment.fechaPago)} · {payment.concepto}</p>
                                        <p className="mt-0.5 text-[#6B6048]">{payment.metodoPago || "Método no indicado"}{payment.fechaVencimiento ? ` · vence ${formatDate(payment.fechaVencimiento)}` : ""}</p>
                                        {payment.nota ? <p className="mt-0.5 text-[#8A7D69]">{payment.nota}</p> : null}
                                      </div>
                                      <div className="flex items-center gap-2 sm:justify-end">
                                        <span className="font-bold text-emerald-700">{formatDop(payment.monto)}</span>
                                        <StatusPill status={payment.estadoTiempo || "Sin fecha límite"} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="mt-3 text-sm text-[#8A7D69]">Todavía no hay pagos registrados en el historial.</p>
                              )}
                            </div>

                            {/* Persist attendance and follow-up in Inscripciones_Citas */}
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Asistencia y seguimiento</p>
                              <div className="flex flex-wrap gap-2">
                                {ATTENDANCE_STATUSES.map((status) => (
                                  <button
                                    key={status}
                                    type="button"
                                    disabled={savingKey === `${row.idInscripcion}:attendance`}
                                    onClick={() => saveAttendance(row, status)}
                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold transition-all disabled:cursor-wait disabled:opacity-60 ${
                                      attendanceStatus === status
                                        ? "border-[#0D3B22] bg-[#0D3B22] text-[#FDFBF7]"
                                        : "border-[#D4AF37]/30 bg-white text-[#0D3B22] hover:border-[#0D3B22]/30 hover:bg-[#FDFBF7]"
                                    }`}
                                  >
                                    {savingKey === `${row.idInscripcion}:attendance` ? "Guardando…" : status}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {saveMessage?.rowId === row.idInscripcion ? (
                              <p
                                role="status"
                                className={`rounded-xl border px-3 py-2 text-sm font-semibold ${saveMessage.type === "success" ? "border-[#0D3B22]/15 bg-[#0D3B22]/10 text-[#0D3B22]" : "border-red-200 bg-red-50 text-red-700"}`}
                              >
                                {saveMessage.text}
                              </p>
                            ) : null}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 rounded-3xl border border-dashed border-[#D4AF37]/35 bg-[#FDFBF7] p-8 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-[#D4AF37]" />
                  <p className="suvoga-serif mt-3 text-2xl font-semibold text-[#0D3B22]">Sin registros visibles</p>
                  <p className="mt-2 text-sm text-[#6B6048]">Los registros aparecerán aquí cuando se guarden en {brand.productName}.</p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* ── VISTA POR CURSO ── */}
        {activeTab === "cursos_vista" ? (
          <section className="space-y-5">
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">Análisis comercial</p>
                <h2 className="suvoga-serif mt-1 text-3xl font-semibold text-[#0D3B22]">Vista por Curso</h2>
                <p className="mt-1 text-sm text-[#6B6048]">Cupos, inscritas, anticipos y estado comercial de cada programa.</p>
              </div>

              {events.length > 0 ? (
                <div className="mb-6 rounded-2xl border border-[#0D3B22]/10 bg-[#FDFBF7] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Grupos y fechas reales</p>
                      <p className="mt-1 text-sm text-[#8A7D69]">Seguimiento de cupos y pagos por programación.</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D3B22]">{events.length} grupo{events.length === 1 ? "" : "s"}</span>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                      <article key={event.id} className="rounded-xl border border-[#E7DAC2] bg-white p-3">
                        <p className="text-sm font-semibold text-[#0D3B22]">{event.groupName || event.courseName}</p>
                        <p className="mt-1 text-xs text-[#6B6048]">{formatDate(event.date)} · {event.time}{event.modality ? ` · ${event.modality}` : ""}</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                          <div><span className="block text-[#8A7D69]">Cupos</span><strong className="text-[#0D3B22]">{event.remaining}/{event.capacity}</strong></div>
                          <div><span className="block text-[#8A7D69]">Inscritas</span><strong className="text-[#0D3B22]">{event.enrolled ?? 0}</strong></div>
                          <div><span className="block text-[#8A7D69]">Cobrado</span><strong className="text-emerald-700">{event.paymentsReceived ? formatDop(event.paymentsReceived) : "—"}</strong></div>
                        </div>
                        {event.pendingPayments ? <p className="mt-2 text-[11px] font-semibold text-orange-700">{event.pendingPayments} con balance pendiente</p> : null}
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {visibleCourseViews.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {visibleCourseViews.map((cv) => {
                    const occupancy = cv.cuposTotales > 0 ? Math.min((cv.inscritas / cv.cuposTotales) * 100, 100) : 0;
                    const commercialStatus =
                      occupancy >= 90 ? "Lleno" :
                      occupancy >= 60 ? "Alta demanda" :
                      occupancy >= 30 ? "En venta" :
                      cv.inscritas > 0 ? "Inicio lento" : "Sin inscritas";
                    const statusBadge =
                      occupancy >= 90 ? "border-red-200 bg-red-50 text-red-700" :
                      occupancy >= 60 ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                      occupancy >= 30 ? "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#8D7530]" :
                      "border-gray-200 bg-gray-50 text-gray-600";

                    return (
                      <article key={cv.idServicio} className="rounded-3xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-5 shadow-sm shadow-[#0D3B22]/5 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-300">
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22]">
                            <GraduationCap className="h-5 w-5" />
                          </span>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusBadge}`}>{commercialStatus}</span>
                        </div>

                        <h3 className="suvoga-serif mt-4 text-lg font-semibold leading-snug text-[#0D3B22]" title={cv.nombre}>
                          {cv.nombre.length > 40 ? cv.nombre.slice(0, 38) + "…" : cv.nombre}
                        </h3>
                        <p className="text-xs text-[#8A7D69] mt-0.5">{cv.idServicio}</p>

                        {/* Occupancy bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-xs font-medium text-[#6B6048] mb-1.5">
                            <span>{cv.inscritas} inscritas</span>
                            <span>{cv.cuposTotales} cupos</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-[#F0EAD8] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${occupancy >= 90 ? "bg-red-500" : occupancy >= 60 ? "bg-emerald-500" : "bg-[#D4AF37]"}`}
                              style={{ width: `${occupancy}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-xl border border-[#0D3B22]/8 bg-white p-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A7D69]">Anticipos pend.</p>
                            <p className="mt-0.5 font-bold text-orange-600">{cv.anticiposPendientes}</p>
                          </div>
                          <div className="rounded-xl border border-[#0D3B22]/8 bg-white p-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A7D69]">Cobrado</p>
                            <p className="mt-0.5 font-bold text-emerald-700">{cv.pagosRecibidos > 0 ? formatDop(cv.pagosRecibidos) : "—"}</p>
                          </div>
                          <div className="rounded-xl border border-[#0D3B22]/8 bg-white p-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A7D69]">Balance pend.</p>
                            <p className="mt-0.5 font-bold text-orange-700">{cv.balancePendienteTotal > 0 ? formatDop(cv.balancePendienteTotal) : "—"}</p>
                          </div>
                          <div className="rounded-xl border border-[#0D3B22]/8 bg-white p-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A7D69]">Próxima fecha</p>
                            <p className="mt-0.5 font-bold text-[#0D3B22]">{cv.proximaFecha ? formatDate(cv.proximaFecha) : "—"}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="h-10 w-10 text-[#D4AF37]/50" />
                  <p className="suvoga-serif mt-4 text-2xl font-semibold text-[#0D3B22]">Sin datos por curso</p>
                  <p className="mt-2 text-sm text-[#6B6048]">Los datos aparecerán cuando haya inscripciones en Google Sheets.</p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* ── CALENDARIO ── */}
        {activeTab === "calendario" ? (
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-4 shadow-sm shadow-[#0D3B22]/5 sm:p-5">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">Gestor de calendario</p>
                  <h2 className="suvoga-serif mt-2 text-3xl font-semibold capitalize text-[#0D3B22]">{monthTitle(currentMonth)}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Mes anterior"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mes siguiente"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
                <div className="min-w-[640px] sm:min-w-0">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                    {weekdays.map((day) => <div key={day} className="py-2">{day}</div>)}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {dayGrid.map((cell, index) => {
                      const dayEvents = cell.date ? eventsByDate[cell.date] ?? [] : [];
                      return (
                        <div
                          key={`${cell.day}-${index}`}
                          className={cell.currentMonth
                            ? "min-h-[128px] rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-2 shadow-sm"
                            : "min-h-[128px] rounded-2xl border border-[#E7DAC2]/70 bg-white p-2 opacity-55"}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={cell.currentMonth
                              ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0D3B22]"
                              : "text-sm font-semibold text-[#8A7D69]"}
                            >{cell.day}</span>
                          </div>
                          <div className="mt-2 space-y-1.5">
                            {dayEvents.slice(0, 2).map((event) => <CourseChip key={event.id} event={event} />)}
                            {dayEvents.length > 2 ? (
                              <p className="rounded-full border border-[#D4AF37]/25 bg-white px-2 py-1 text-center text-[10px] font-semibold text-[#8D7530]">+{dayEvents.length - 2} mas</p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                  <Plus className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">Programar curso</h3>
                  <p className="mt-1 text-sm leading-6 text-[#4E6658]">Crea una fecha y revisa el chip del curso en el calendario.</p>
                </div>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleScheduleCourse}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Curso</p>
                  <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                    {catalogCourses.map((course) => {
                      const selected = course.idServicio === courseId;
                      return (
                        <button
                          key={course.idServicio}
                          type="button"
                          onClick={() => { setCourseId(course.idServicio); setCapacity(String(course.cuposTotales || 12)); }}
                          className={selected
                            ? "flex w-full items-center gap-3 rounded-2xl border border-[#0D3B22]/20 bg-[#0D3B22] p-3 text-left text-[#FDFBF7] shadow-sm"
                            : "flex w-full items-center gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-3 text-left text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"}
                        >
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold">{course.nombre}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Fecha</span>
                    <input value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} inputMode="numeric" placeholder="2026-05-18" className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Hora</span>
                    <input value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} inputMode="numeric" placeholder="09:00" className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Cupos</span>
                  <input value={capacity} onChange={(e) => setCapacity(e.target.value)} inputMode="numeric" placeholder="12" className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                </label>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Nombre del grupo (opcional)</span>
                    <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Grupo de junio" className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Modalidad (opcional)</span>
                    <input value={modality} onChange={(e) => setModality(e.target.value)} placeholder="Presencial / Virtual" className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Nota (opcional)</span>
                  <textarea value={scheduleNote} onChange={(e) => setScheduleNote(e.target.value)} placeholder="Información operativa del grupo" rows={2} className="mt-2 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 py-2 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" />
                </label>

                <button type="submit" disabled={savingKey === "programacion"} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] disabled:cursor-wait disabled:opacity-60">
                  <Leaf className="h-4 w-4" />
                  {savingKey === "programacion" ? "Guardando…" : "Guardar programación"}
                </button>
                {formError ? <p className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-sm font-medium text-[#8D7530]">{formError}</p> : null}
                {saveMessage?.rowId === "programacion" ? (
                  <p role="status" className={`rounded-2xl border px-3 py-2 text-sm font-semibold ${saveMessage.type === "success" ? "border-[#0D3B22]/15 bg-[#0D3B22]/10 text-[#0D3B22]" : "border-red-200 bg-red-50 text-red-700"}`}>
                    {saveMessage.text}
                  </p>
                ) : null}
              </form>
            </aside>
          </section>
        ) : null}

        {/* ── MIS CURSOS ── */}
        {activeTab === "cursos" ? (
          <section className="space-y-5 rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">Catálogo vivo</p>
                <h2 className="suvoga-serif mt-2 text-3xl font-semibold text-[#0D3B22]">Mis Cursos</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4E6658]">Agrega programas durante la presentación y usalos al instante en el calendario o en el catálogo público.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37] px-5 text-sm font-bold text-[#0D3B22] shadow-xl shadow-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C5A028]"
              >
                <Plus className="h-4 w-4" />
                Crear Nuevo Curso
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalogCourses.map((course) => (
                <article
                  key={course.idServicio}
                  className="rounded-3xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-5 shadow-sm shadow-[#0D3B22]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-white hover:shadow-xl hover:shadow-[#D4AF37]/15"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22]">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-[#D4AF37]/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#C5A028]">
                      {course.idServicio.startsWith("DEMO-") ? "Demo" : "Curso"}
                    </span>
                  </div>
                  <h3 className="suvoga-serif mt-5 text-2xl font-semibold leading-tight text-[#0D3B22]">{course.nombre}</h3>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                    <div className="rounded-2xl border border-[#0D3B22]/10 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">Precio</p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">{course.precioTotal > 0 ? formatDop(course.precioTotal) : "A consultar"}</p>
                    </div>
                    <div className="rounded-2xl border border-[#D4AF37]/25 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">Anticipo</p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">{formatDop(course.montoAnticipo || 1000)}</p>
                    </div>
                    <div className="rounded-2xl border border-[#0D3B22]/10 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">Cupos</p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">{course.cuposTotales || 12}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── COURSE MODAL ── */}
        {isCourseModalOpen ? (
          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0D3B22]/45 p-4 backdrop-blur-sm"
          >
            <button type="button" aria-label="Cerrar formulario de curso" className="absolute inset-0 cursor-default" onClick={closeCourseModal} />
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-2xl shadow-[#0D3B22]/25">
              <div className="flex items-start justify-between gap-5 border-b border-[#D4AF37]/20 bg-[#FDFBF7] px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">Nuevo programa premium</p>
                  <h3 className="suvoga-serif mt-2 text-3xl font-semibold leading-tight text-[#0D3B22]">Crear Nuevo Curso</h3>
                </div>
                <button type="button" aria-label="Cerrar" onClick={closeCourseModal} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="space-y-5 px-6 py-6" onSubmit={handleCreateCourse}>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">Nombre del Curso</span>
                  <input value={courseForm.nombre} onChange={(e) => updateCourseForm("nombre", e.target.value)} placeholder="Ej. Diplomado de Spa Facial Premium" className="mt-2 h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-4 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]" autoFocus />
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  {(["precio", "anticipo", "cupos"] as const).map((field) => (
                    <label key={field} className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">{field === "precio" ? "Precio" : field === "anticipo" ? "Anticipo" : "Cupos Totales"}</span>
                      <div className={`relative mt-2 ${field !== "cupos" ? "" : ""}`}>
                        {field !== "cupos" && <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C5A028]" />}
                        <input
                          value={courseForm[field]}
                          onChange={(e) => updateCourseForm(field, e.target.value)}
                          inputMode={field === "cupos" ? "numeric" : "decimal"}
                          placeholder={field === "precio" ? "15000" : field === "anticipo" ? "1000" : "12"}
                          className={`h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] ${field !== "cupos" ? "pl-9 pr-3" : "px-4"} text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]`}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                {courseFormError ? <p className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-sm font-medium text-[#8D7530]">{courseFormError}</p> : null}

                <div className="flex flex-col-reverse gap-3 border-t border-[#D4AF37]/20 pt-5 sm:flex-row sm:justify-end">
                  <button type="button" onClick={closeCourseModal} className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white px-5 text-sm font-semibold text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]">Cancelar</button>
                  <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332]">
                    <Save className="h-4 w-4" />
                    Guardar Curso
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
