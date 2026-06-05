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

type AdminClientProps = {
  rows: AdminInscriptionRow[];
  courses: AdminCourse[];
  scheduledCourses: AdminScheduledCourse[];
  source: string;
};

type AdminTab = "dashboard" | "inscripciones" | "calendario" | "cursos";

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

const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const DEMO_COURSES_STORAGE_KEY = "suvoga_demo_courses";
const initialCourseForm: CourseFormState = {
  nombre: "",
  precio: "",
  anticipo: "1000",
  cupos: "12",
};

function cleanPhoneForWhatsapp(phone: string) {
  return phone.replace(/\D/g, "");
}

function whatsappLink(row: AdminInscriptionRow) {
  const phone = cleanPhoneForWhatsapp(row.whatsapp);
  const message = `Hola ${row.nombreCompleto}. Te escribimos de SuVoGa Escuela de Masajes para confirmar tu solicitud para ${row.cursoNombre}.`;

  return {
    phone,
    href: phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : "",
  };
}

function isPending(status: string) {
  const normalized = status.toLowerCase();
  return (
    !normalized ||
    normalized.includes("pendiente") ||
    normalized.includes("parcial")
  );
}

function monthTitle(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function toIsoDate(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

function getDayGrid(date: Date): CalendarCell[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const grid: CalendarCell[] = [];

  for (let index = firstDay - 1; index >= 0; index -= 1) {
    grid.push({
      day: previousMonthDays - index,
      date: "",
      currentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    grid.push({
      day,
      date: toIsoDate(year, month, day),
      currentMonth: true,
    });
  }

  while (grid.length < 42) {
    grid.push({
      day: grid.length - firstDay - daysInMonth + 1,
      date: "",
      currentMonth: false,
    });
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

  window.localStorage.setItem(
    DEMO_COURSES_STORAGE_KEY,
    JSON.stringify(courses)
  );
  window.dispatchEvent(new Event("suvoga-demo-courses-updated"));
}

function mergeCourses(baseCourses: AdminCourse[], demoCourses: AdminCourse[]) {
  const byId = new Map<string, AdminCourse>();

  [...baseCourses, ...demoCourses].forEach((course) => {
    byId.set(course.idServicio, course);
  });

  return Array.from(byId.values());
}

function StatusPill({ status }: { status: string }) {
  const pending = isPending(status);

  return (
    <span
      className={
        pending
          ? "inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#8D7530]"
          : "inline-flex rounded-full border border-[#0D3B22]/15 bg-[#0D3B22]/10 px-3 py-1 text-xs font-semibold text-[#0D3B22]"
      }
    >
      {status || "Anticipo pendiente"}
    </span>
  );
}

function ContactButton({ row }: { row: AdminInscriptionRow }) {
  const { href, phone } = whatsappLink(row);

  return (
    <a
      href={href || undefined}
      target="_blank"
      rel="noreferrer"
      aria-disabled={!phone}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] aria-disabled:pointer-events-none aria-disabled:opacity-45"
    >
      <MessageCircle className="h-4 w-4" />
      Contactar
    </a>
  );
}

function CourseChip({ event }: { event: AdminScheduledCourse }) {
  return (
    <div
      className="rounded-xl bg-[#0D3B22] px-2.5 py-2 text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10"
      title={`${event.courseName} - ${event.time}`}
    >
      <p className="truncate text-[11px] font-semibold leading-tight">
        {event.courseName}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37]">
        <Clock className="h-3 w-3" />
        {event.time} - {event.remaining}/{event.capacity}
      </p>
    </div>
  );
}

export function AdminClient({
  rows,
  courses,
  scheduledCourses,
  source,
}: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [query, setQuery] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [events, setEvents] = useState<AdminScheduledCourse[]>(scheduledCourses);
  const [catalogCourses, setCatalogCourses] = useState<AdminCourse[]>(courses);
  const [courseId, setCourseId] = useState(courses[0]?.idServicio ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [capacity, setCapacity] = useState("12");
  const [formError, setFormError] = useState("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] =
    useState<CourseFormState>(initialCourseForm);
  const [courseFormError, setCourseFormError] = useState("");

  const pendingCount = rows.filter((row) => isPending(row.estadoAnticipo)).length;
  const paidCount = rows.filter((row) => !isPending(row.estadoAnticipo)).length;
  const selectedCourse = catalogCourses.find(
    (course) => course.idServicio === courseId
  );
  const dayGrid = getDayGrid(currentMonth);

  // Dashboard KPIs
  const topCourses = useMemo(() => {
    const counts: Record<string, { nombre: string; count: number }> = {};
    for (const row of rows) {
      const key = row.cursoNombre;
      if (!counts[key]) counts[key] = { nombre: key, count: 0 };
      counts[key].count += 1;
    }
    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [rows]);

  const topProvincias = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const row of rows) {
      const prov = row.provincia || "Sin provincia";
      counts[prov] = (counts[prov] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [rows]);

  const maxCourseCount = topCourses[0]?.count || 1;
  const maxProvCount = topProvincias[0]?.[1] || 1;

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;

    return rows.filter((row) =>
      [
        row.nombreCompleto,
        row.cursoNombre,
        row.cedula,
        row.provincia,
        row.estadoAnticipo,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, rows]);

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

    if (!nombre) {
      setCourseFormError("Escribe el nombre del curso.");
      return;
    }

    if (
      Number.isNaN(precioTotal) ||
      Number.isNaN(montoAnticipo) ||
      Number.isNaN(cuposTotales) ||
      cuposTotales < 1
    ) {
      setCourseFormError("Precio, anticipo y cupos deben ser numeros validos.");
      return;
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
    <main className="min-h-[calc(100vh-5rem)] bg-[#FDFBF7] px-4 py-8 text-[#0D3B22] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin SuVoGa
              </div>
              <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-none text-[#0D3B22] sm:text-5xl">
                Centro academico y calendario
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4E6658]">
                Gestiona inscripciones, cupos y fechas de cursos desde un
                espacio sereno, claro y preparado para operacion diaria.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-4 lg:min-w-[640px]">
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                  Pendientes
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#0D3B22]">
                  {pendingCount}
                </p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                  Fechas
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#0D3B22]">
                  {events.length}
                </p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                  Cursos
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#0D3B22]">
                  {catalogCourses.length}
                </p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                  Fuente
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-[#0D3B22]">
                  {source.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="inline-flex rounded-2xl border border-[#D4AF37]/30 bg-white p-1 shadow-sm shadow-[#0D3B22]/5 flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${tabClass(
              "dashboard"
            )}`}
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("calendario")}
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${tabClass(
              "calendario"
            )}`}
          >
            <CalendarDays className="h-4 w-4" />
            Calendario
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cursos")}
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${tabClass(
              "cursos"
            )}`}
          >
            <BookOpen className="h-4 w-4" />
            Mis Cursos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inscripciones")}
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${tabClass(
              "inscripciones"
            )}`}
          >
            <Users className="h-4 w-4" />
            Inscripciones
          </button>
        </div>

        {activeTab === "dashboard" ? (
          <section className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                    <Users className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A7D69]">Inscripciones</span>
                </div>
                <p className="mt-4 text-4xl font-bold text-[#0D3B22]">{rows.length}</p>
                <p className="mt-1 text-xs text-[#6B6048]">Total registradas</p>
              </div>

              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#0D3B22]/15 bg-[#0D3B22]/5">
                    <TrendingUp className="h-5 w-5 text-[#0D3B22]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A7D69]">Pagadas</span>
                </div>
                <p className="mt-4 text-4xl font-bold text-[#0D3B22]">{paidCount}</p>
                <p className="mt-1 text-xs text-[#6B6048]">Anticipo confirmado</p>
              </div>

              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                    <DollarSign className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A7D69]">Pendientes</span>
                </div>
                <p className="mt-4 text-4xl font-bold text-[#8D7530]">{pendingCount}</p>
                <p className="mt-1 text-xs text-[#6B6048]">Requieren seguimiento</p>
              </div>

              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                    <GraduationCap className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A7D69]">Cursos</span>
                </div>
                <p className="mt-4 text-4xl font-bold text-[#0D3B22]">{catalogCourses.length}</p>
                <p className="mt-1 text-xs text-[#6B6048]">En catálogo activo</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top Courses Bar Chart */}
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
                          <span className="text-sm font-medium text-[#0D3B22] truncate max-w-[70%]" title={nombre}>
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D3B22] text-[#FDFBF7] text-[10px] font-bold mr-2">{index + 1}</span>
                            {nombre.length > 28 ? nombre.slice(0, 26) + "…" : nombre}
                          </span>
                          <span className="text-sm font-bold text-[#0D3B22]">{count}</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-[#F0EAD8] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#0D3B22] to-[#1a5c38] transition-all duration-700"
                            style={{ width: `${(count / maxCourseCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                    <p className="mt-3 text-sm text-[#6B6048]">Sin inscripciones todavía</p>
                  </div>
                )}
              </div>

              {/* Province Distribution */}
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-6 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7]">
                    <Users className="h-5 w-5 text-[#C5A028]" />
                  </span>
                  <div>
                    <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">Por Provincia</h3>
                    <p className="text-xs text-[#6B6048]">Distribución geográfica de alumnas</p>
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
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] transition-all duration-700"
                            style={{ width: `${(count / maxProvCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                    <p className="mt-3 text-sm text-[#6B6048]">Sin datos de provincia todavía</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Inscriptions */}
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
              {rows.length > 0 ? (
                <div className="space-y-3">
                  {rows.slice(-5).reverse().map((row) => (
                    <div key={row.idInscripcion} className="flex items-center justify-between gap-4 rounded-2xl border border-[#E7DAC2] bg-[#FDFBF7] px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0D3B22]">{row.nombreCompleto}</p>
                        <p className="truncate text-xs text-[#6B6048]">{row.cursoNombre}</p>
                      </div>
                      <span className={isPending(row.estadoAnticipo)
                        ? "shrink-0 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#8D7530]"
                        : "shrink-0 inline-flex rounded-full border border-[#0D3B22]/15 bg-[#0D3B22]/10 px-3 py-1 text-xs font-semibold text-[#0D3B22]"
                      }>
                        {row.estadoAnticipo || "Pendiente"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="h-8 w-8 text-[#D4AF37]/50" />
                  <p className="mt-3 text-sm text-[#6B6048]">Sin inscripciones todavía. Las registradas aparecerán aquí.</p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {activeTab === "calendario" ? (
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white p-4 shadow-sm shadow-[#0D3B22]/5 sm:p-5">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">
                    Gestor de calendario
                  </p>
                  <h2 className="suvoga-serif mt-2 text-3xl font-semibold capitalize text-[#0D3B22]">
                    {monthTitle(currentMonth)}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Mes anterior"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1,
                          1
                        )
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mes siguiente"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                          1
                        )
                      )
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#8A7D69]">
                {weekdays.map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-2">
                {dayGrid.map((cell, index) => {
                  const dayEvents = cell.date ? eventsByDate[cell.date] ?? [] : [];

                  return (
                    <div
                      key={`${cell.day}-${index}`}
                      className={
                        cell.currentMonth
                          ? "min-h-[128px] rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-2 shadow-sm"
                          : "min-h-[128px] rounded-2xl border border-[#E7DAC2]/70 bg-white p-2 opacity-55"
                      }
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={
                            cell.currentMonth
                              ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0D3B22]"
                              : "text-sm font-semibold text-[#8A7D69]"
                          }
                        >
                          {cell.day}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {dayEvents.slice(0, 2).map((event) => (
                          <CourseChip key={event.id} event={event} />
                        ))}
                        {dayEvents.length > 2 ? (
                          <p className="rounded-full border border-[#D4AF37]/25 bg-white px-2 py-1 text-center text-[10px] font-semibold text-[#8D7530]">
                            +{dayEvents.length - 2} mas
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                  <Plus className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                    Programar curso
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#4E6658]">
                    Crea una fecha y revisa el chip del curso en el calendario.
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleScheduleCourse}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                    Curso
                  </p>
                  <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                    {catalogCourses.map((course) => {
                      const selected = course.idServicio === courseId;

                      return (
                        <button
                          key={course.idServicio}
                          type="button"
                          onClick={() => {
                            setCourseId(course.idServicio);
                            setCapacity(String(course.cuposTotales || 12));
                          }}
                          className={
                            selected
                              ? "flex w-full items-center gap-3 rounded-2xl border border-[#0D3B22]/20 bg-[#0D3B22] p-3 text-left text-[#FDFBF7] shadow-sm"
                              : "flex w-full items-center gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-3 text-left text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                          }
                        >
                          <GraduationCap className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                            {course.nombre}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                      Fecha
                    </span>
                    <input
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                      inputMode="numeric"
                      placeholder="2026-05-18"
                      className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                      Hora
                    </span>
                    <input
                      value={selectedTime}
                      onChange={(event) => setSelectedTime(event.target.value)}
                      inputMode="numeric"
                      placeholder="09:00"
                      className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                    Cupos
                  </span>
                  <input
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                    inputMode="numeric"
                    placeholder="12"
                    className="mt-2 h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                  />
                </label>

                {formError ? (
                  <p className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-sm font-medium text-[#8D7530]">
                    {formError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332]"
                >
                  <Leaf className="h-4 w-4" />
                  Crear Course Chip
                </button>
              </form>
            </aside>
          </section>
        ) : null}

        {activeTab === "cursos" ? (
          <section className="space-y-5 rounded-3xl border border-[#D4AF37]/30 bg-white p-5 shadow-sm shadow-[#0D3B22]/5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5A028]">
                  Catalogo vivo
                </p>
                <h2 className="suvoga-serif mt-2 text-3xl font-semibold text-[#0D3B22]">
                  Mis Cursos
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4E6658]">
                  Agrega programas durante la presentacion y usalos al instante
                  en el calendario o en el catalogo publico de demo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37] px-5 text-sm font-bold text-[#0D3B22] shadow-xl shadow-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C5A028] hover:shadow-2xl hover:shadow-[#D4AF37]/25"
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
                  <h3 className="suvoga-serif mt-5 text-2xl font-semibold leading-tight text-[#0D3B22]">
                    {course.nombre}
                  </h3>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                    <div className="rounded-2xl border border-[#0D3B22]/10 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">
                        Precio
                      </p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">
                        {course.precioTotal > 0
                          ? formatDop(course.precioTotal)
                          : "A consultar"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#D4AF37]/25 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">
                        Anticipo
                      </p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">
                        {formatDop(course.montoAnticipo || 1000)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#0D3B22]/10 bg-white p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6048]">
                        Cupos
                      </p>
                      <p className="mt-1 font-semibold text-[#0D3B22]">
                        {course.cuposTotales || 12}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "inscripciones" ? (
          <section className="rounded-3xl border border-[#D4AF37]/30 bg-white p-4 shadow-sm shadow-[#0D3B22]/5 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                  Inscripciones
                </p>
                <p className="text-sm text-[#6B6048]">
                  {filteredRows.length} registros visibles
                </p>
              </div>
              <label className="relative block sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7D69]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar estudiante, curso o provincia"
                  className="h-11 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] pl-9 pr-3 text-sm text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                />
              </label>
            </div>

            <div className="mt-5 hidden overflow-hidden rounded-3xl border border-[#E7DAC2] md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F7F1E7] text-xs uppercase tracking-[0.12em] text-[#6B6048]">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Estudiante</th>
                    <th className="px-4 py-4 font-semibold">Curso</th>
                    <th className="px-4 py-4 font-semibold">Cedula</th>
                    <th className="px-4 py-4 font-semibold">Provincia</th>
                    <th className="px-4 py-4 font-semibold">Anticipo</th>
                    <th className="px-4 py-4 text-right font-semibold">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DAC2] bg-white">
                  {filteredRows.map((row) => (
                    <tr
                      key={row.idInscripcion}
                      className="transition-colors hover:bg-[#FDFBF7]"
                    >
                      <td className="px-4 py-4 font-semibold text-[#0D3B22]">
                        {row.nombreCompleto}
                        <div className="mt-1 text-xs font-normal text-[#8A7D69]">
                          {row.whatsapp || "Sin WhatsApp"}
                        </div>
                      </td>
                      <td className="max-w-[300px] px-4 py-4 text-[#4E6658]">
                        {row.cursoNombre}
                      </td>
                      <td className="px-4 py-4 text-[#4E6658]">{row.cedula}</td>
                      <td className="px-4 py-4 text-[#4E6658]">{row.provincia}</td>
                      <td className="px-4 py-4">
                        <StatusPill status={row.estadoAnticipo} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <ContactButton row={row} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 space-y-3 md:hidden">
              {filteredRows.map((row) => (
                <article
                  key={row.idInscripcion}
                  className="rounded-3xl border border-[#E7DAC2] bg-[#FDFBF7] p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#0D3B22]">
                        {row.nombreCompleto}
                      </p>
                      <p className="mt-1 text-xs text-[#8A7D69]">
                        {row.whatsapp || "Sin WhatsApp"}
                      </p>
                    </div>
                    <StatusPill status={row.estadoAnticipo} />
                  </div>
                  <div className="mt-4 rounded-2xl border border-[#D4AF37]/20 bg-white p-3 text-sm">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#8A7D69]">
                      Curso
                    </p>
                    <p className="mt-1 font-medium text-[#0D3B22]">
                      {row.cursoNombre}
                    </p>
                  </div>
                  <div className="mt-4">
                    <ContactButton row={row} />
                  </div>
                </article>
              ))}
            </div>

            {filteredRows.length === 0 ? (
              <div className="mt-5 rounded-3xl border border-dashed border-[#D4AF37]/35 bg-[#FDFBF7] p-8 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-[#D4AF37]" />
                <p className="suvoga-serif mt-3 text-2xl font-semibold text-[#0D3B22]">
                  Sin inscripciones visibles
                </p>
                <p className="mt-2 text-sm text-[#6B6048]">
                  Los registros apareceran aqui cuando se guarden en SuVoGa OS.
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        {isCourseModalOpen ? (
          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0D3B22]/45 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Cerrar formulario de curso"
              className="absolute inset-0 cursor-default"
              onClick={closeCourseModal}
            />
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-2xl shadow-[#0D3B22]/25">
              <div className="flex items-start justify-between gap-5 border-b border-[#D4AF37]/20 bg-[#FDFBF7] px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
                    Nuevo programa premium
                  </p>
                  <h3 className="suvoga-serif mt-2 text-3xl font-semibold leading-tight text-[#0D3B22]">
                    Crear Nuevo Curso
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={closeCourseModal}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="space-y-5 px-6 py-6" onSubmit={handleCreateCourse}>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                    Nombre del Curso
                  </span>
                  <input
                    value={courseForm.nombre}
                    onChange={(event) =>
                      updateCourseForm("nombre", event.target.value)
                    }
                    placeholder="Ej. Diplomado de Spa Facial Premium"
                    className="mt-2 h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-4 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                    autoFocus
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                      Precio
                    </span>
                    <div className="relative mt-2">
                      <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C5A028]" />
                      <input
                        value={courseForm.precio}
                        onChange={(event) =>
                          updateCourseForm("precio", event.target.value)
                        }
                        inputMode="decimal"
                        placeholder="15000"
                        className="h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] pl-9 pr-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                      Anticipo
                    </span>
                    <div className="relative mt-2">
                      <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C5A028]" />
                      <input
                        value={courseForm.anticipo}
                        onChange={(event) =>
                          updateCourseForm("anticipo", event.target.value)
                        }
                        inputMode="decimal"
                        placeholder="1000"
                        className="h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] pl-9 pr-3 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                      Cupos Totales
                    </span>
                    <input
                      value={courseForm.cupos}
                      onChange={(event) =>
                        updateCourseForm("cupos", event.target.value)
                      }
                      inputMode="numeric"
                      placeholder="12"
                      className="mt-2 h-12 w-full rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] px-4 text-sm font-medium text-[#0D3B22] outline-none transition-colors placeholder:text-[#8A7D69] focus:border-[#0D3B22]"
                    />
                  </label>
                </div>

                {courseFormError ? (
                  <p className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-sm font-medium text-[#8D7530]">
                    {courseFormError}
                  </p>
                ) : null}

                <div className="flex flex-col-reverse gap-3 border-t border-[#D4AF37]/20 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeCourseModal}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white px-5 text-sm font-semibold text-[#0D3B22] transition-colors hover:bg-[#F7F1E7]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332]"
                  >
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
