"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { contactInfo } from "@/data/contact";

const interests = [
  "Orientación general",
  "Información de un curso",
  "Fechas y horarios",
  "Formas de pago",
  "Comunidad SuVoGa",
];

type FormState = {
  nombre: string;
  telefono: string;
  correo: string;
  interes: string;
  mensaje: string;
  website: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  email?: {
    notification?: { status?: string };
  };
};

const initialForm: FormState = {
  nombre: "",
  telefono: "",
  correo: "",
  interes: interests[0],
  mensaje: "",
  website: "",
};

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submissionId, setSubmissionId] = useState(createSubmissionId);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "partial" | "error">("idle");

  const canSubmit = useMemo(
    () =>
      form.nombre.trim() &&
      form.mensaje.trim() &&
      (form.telefono.trim() || form.correo.trim()) &&
      !isLoading,
    [form, isLoading]
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFeedback("");
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setFeedback("");
    setStatus("idle");

    try {
      const response = await fetch("/api/suvoga/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          submissionId,
          name: form.nombre,
          phone: form.telefono,
          email: form.correo,
          courseName: form.interes,
          message: form.mensaje,
          website: form.website,
          originPath: `${window.location.pathname}${window.location.search}`,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo registrar la solicitud.");
      }

      const notificationStatus = payload.email?.notification?.status;
      setStatus(notificationStatus === "sent" ? "success" : "partial");
      setFeedback(payload.message || "Solicitud registrada.");
      setForm(initialForm);
      setSubmissionId(createSubmissionId());
    } catch (caughtError) {
      setStatus("error");
      setFeedback(
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo registrar la solicitud."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const fieldClass =
    "h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus-visible:border-[#0D3B22] focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(event) => updateField("website", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-nombre" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            Nombre completo
          </label>
          <input
            id="contact-nombre"
            name="nombre"
            value={form.nombre}
            onChange={(event) => updateField("nombre", event.target.value)}
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-telefono" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            WhatsApp
          </label>
          <input
            id="contact-telefono"
            name="telefono"
            value={form.telefono}
            onChange={(event) => updateField("telefono", event.target.value)}
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-correo" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          Correo para confirmación
        </label>
        <input
          id="contact-correo"
          name="correo"
          type="email"
          value={form.correo}
          onChange={(event) => updateField("correo", event.target.value)}
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-interes" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          ¿En qué te ayudamos?
        </label>
        <select
          id="contact-interes"
          name="interes"
          value={form.interes}
          onChange={(event) => updateField("interes", event.target.value)}
          className={fieldClass}
        >
          {interests.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-mensaje" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          Tu mensaje
        </label>
        <textarea
          id="contact-mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={(event) => updateField("mensaje", event.target.value)}
          required
          rows={4}
          className="w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 py-3 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus-visible:border-[#0D3B22] focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#0D3B22]/40"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isLoading ? "Registrando..." : "Enviar solicitud"}
      </button>

      <p role="status" aria-live="polite" className="sr-only">
        {feedback}
      </p>

      {feedback ? (
        <p
          className={`rounded-2xl border px-4 py-3 text-center text-xs leading-relaxed ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : status === "partial"
                ? "border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#6B6048]"
                : "border-[#0D3B22]/15 bg-[#0D3B22]/[0.04] text-[#4E6658]"
          }`}
        >
          {feedback}
        </p>
      ) : (
        <p className="text-center text-[11px] leading-relaxed text-[#6B6048]">
          Tus datos se usan únicamente para orientarte. También puedes escribir a{" "}
          <span className="font-semibold text-[#0D3B22]">{contactInfo.correo}</span>.
        </p>
      )}
    </form>
  );
}
