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
  idServicio: string;
  nombreCompleto: string;
  whatsapp: string;
  cedula: string;
  provincia: string;
  cursoNombre: string;
  fechaProgramada: string;
  estadoAsistencia: string;
  estadoPago: string;
  montoPagado: number;
  balancePendiente: number;
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

// ─── Constants ──────────────────────────────────────────────────────────────

const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const DEMO_COURSES_STORAGE_KEY = "suvoga_demo_courses";
const initialCourseForm: CourseFormState = {
  nombre: "",
  precio: "",
  anticipo: "1000",
  cupos: "12",
};

const CRM_STATUS_COLORS: Record<string, string> = {
  "Nueva inscripción":    "border-blue-200 bg-blue-50 text-blue-700",
  "Contactar por WhatsApp": "border-orange-200 bg-orange-50 text-orange-700",
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
  const [formError, setFormError] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState<CourseFormState>(initialCourseForm);
  const [courseFormError, setCourseFormError] = useState("");
  const [localCrmStatus, setLocalCrmStatus] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [includeTestRecords, setIncludeTestRecords] = useState(false);

  const visibleCrmRows = useMemo(
    () => includeTestRecords ? crmRows : crmRows.filter((row) => !row.esRegistroPrueba),
    [crmRows, includeTestRecords]
  );
  const testRecordCount = crmRows.filter((row) => row.esRegistroPrueba).length;
  const pendingCount = visibleCrmRows.filter((r) => isPending(localCrmStatus[r.idInscripcion] || r.crmStatus)).length;
  const paidCount = visibleCrmRows.filter((r) => !isPending(localCrmStatus[r.idInscripcion] || r.crmStatus)).length;
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
    const set = new Set(visibleCrmRows.map((r) => localCrmStatus[r.idInscripcion] || r.crmStatus));
    return ["Todos", ...Array.from(set)];
  }, [visibleCrmRows, localCrmStatus]);

  const filteredCrmRows = useMemo(() => {
    const needle = crmQuery.trim().toLowerCase();
    return visibleCrmRows.filter((row) => {
      const effectiveStatus = localCrmStatus[row.idInscripcion] || row.crmStatus;
      const matchFilter = crmFilter === "Todos" || effectiveStatus === crmFilter;
      if (!matchFilter) return false;
      if (!needle) return true;
      return [row.nombreCompleto, row.cursoNombre, row.provincia, row.cedula, effectiveStatus]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [crmQuery, crmFilter, visibleCrmRows, localCrmStatus]);

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
      const effectiveStatus = localCrmStatus[row.idInscripcion] || row.crmStatus;
      view.inscritas += 1;
      if (row.montoPagado > 0) view.pagosRecibidos += row.montoPagado;
      if (row.balancePendiente > 0) view.balancePendienteTotal += row.balancePendiente;
      if (isPending(effectiveStatus)) view.anticiposPendientes += 1;
    }

    return Array.from(views.values()).sort((a, b) => b.inscritas - a.inscritas);
  }, [courseViews, localCrmStatus, visibleCrmRows]);

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

  function handleScheduleCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const seats = Number.parseInt(capacity, 10);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(selectedDate);
    const validTime = /^\d{2}:\d{2}$/.test(selectedTime);
    if (!selectedCourse || !validDate || !validTime || !Number.isFinite(seats) || seats < 1) {
      setFormError("Completa curso, fecha, hora y cupos con formato valido.");
      return;
    }
    setEvents((current) => [
      ...current,
      {
        id: `local-${selectedCourse.idServicio}-${selectedDate}-${selectedTime}`,
        courseId: selectedCourse.idServicio,
        courseName: selectedCourse.nombre,
        date: selectedDate,
        time: selectedTime,
        capacity: seats,
        remaining: seats,
      },
    ]);
    setCurrentMonth(new Date(`${selectedDate}T12:00:00`));
    setSelectedDate("");
    setSelectedTime("09:00");
    setCapacity(String(selectedCourse.cuposTotales || 12));
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

  function updateLocalStatus(id: string, status: string) {
    setLocalCrmStatus((prev) => ({ ...prev, [id]: status }));
  }

  const ALL_CRM_STATUSES = [
    "Nueva inscripción",
    "Contactar por WhatsApp",
    "Anticipo pendiente",
    "Anticipo confirmado",
    "Balance pendiente",
    "Inscripción completa",
    "Recordatorio enviado",
    "Asistió",
    "No asistió",
    "Reprogramar",
    "Finalizada",
  ];

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
                  <p className="text-xs text-[#6B6048]">Las 5 más recientes</p>
                </div>
              </div>
              {visibleCrmRows.length > 0 ? (
                <div className="space-y-3">
                  {visibleCrmRows.slice(-5).reverse().map((row) => (
                    <div key={row.idInscripcion} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E7DAC2] bg-[#FDFBF7] px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0D3B22]">
                          {row.nombreCompleto}
                          {row.esRegistroPrueba ? (
                            <span className="ml-2 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#8D7530]">QA</span>
                          ) : null}
                        </p>
                        <p className="truncate text-xs text-[#6B6048]">{row.cursoNombre}</p>
                      </div>
                      <StatusPill status={localCrmStatus[row.idInscripcion] || row.crmStatus} />
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
                    const effectiveStatus = localCrmStatus[row.idInscripcion] || row.crmStatus;
                    const waHref = whatsappHref(row.whatsapp, row.nombreCompleto, row.cursoNombre);
                    const isExpanded = expandedRow === row.idInscripcion;

                    return (
                      <div key={row.idInscripcion} className="rounded-2xl border border-[#E7DAC2] bg-[#FDFBF7] overflow-hidden transition-all duration-200">
                        {/* Row header */}
                        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          {/* Name & course */}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#0D3B22]">
                              {row.nombreCompleto}
                              {row.esRegistroPrueba ? (
                                <span className="ml-2 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold text-[#8D7530]">QA</span>
                              ) : null}
                            </p>
                            <p className="mt-0.5 text-xs text-[#6B6048]">{row.cursoNombre} · {row.provincia || "Sin provincia"}</p>
                          </div>

                          {/* Middle details row for mobile, integrated in horizontal flow on desktop */}
                          <div className="flex flex-wrap items-center justify-between gap-3 sm:contents">
                            <StatusPill status={effectiveStatus} />

                            {/* Amounts */}
                            <div className="flex items-center gap-4 text-xs text-[#6B6048]">
                              {row.montoPagado > 0 && (
                                <span className="flex items-center gap-1">
                                  <span className="text-emerald-700 font-semibold">{formatDop(row.montoPagado)}</span> anticipo
                                </span>
                              )}
                              {row.balancePendiente > 0 && (
                                <span className="flex items-center gap-1">
                                  <span className="text-orange-700 font-semibold">{formatDop(row.balancePendiente)}</span> balance
                                </span>
                              )}
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

                            {/* Mark follow-up */}
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048] mb-2">Marcar seguimiento</p>
                              <div className="flex flex-wrap gap-2">
                                {ALL_CRM_STATUSES.map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => updateLocalStatus(row.idInscripcion, s)}
                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                                      effectiveStatus === s
                                        ? "border-[#0D3B22] bg-[#0D3B22] text-[#FDFBF7]"
                                        : "border-[#D4AF37]/30 bg-white text-[#0D3B22] hover:border-[#0D3B22]/30 hover:bg-[#FDFBF7]"
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                              <p className="mt-2 text-[10px] text-[#8A7D69]">El seguimiento es local hasta que se implemente escritura a Google Sheets.</p>
                            </div>
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

                {formError ? <p className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-sm font-medium text-[#8D7530]">{formError}</p> : null}

                <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332]">
                  <Leaf className="h-4 w-4" />
                  Crear Course Chip
                </button>
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
