"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { brand } from "@/lib/brand";

type Course = {
  idServicio: string;
  nombre: string;
  tipo: string;
  category?: string;
  description?: string;
  precioTotal: number;
  montoAnticipo: number;
  cuposTotales: number;
};

type InscriptionModalProps = {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  nombreCompleto: string;
  whatsapp: string;
  correo: string;
  cedula: string;
  provincia: string;
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
  nombreCompleto: "",
  whatsapp: "",
  correo: "",
  cedula: "",
  provincia: "",
  website: "",
};

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
  type = "text",
  required = true,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  autoComplete?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530] block mb-1.5">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-[#FDFBF7] px-4 text-[14px] text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
      />
    </label>
  );
}

export function InscriptionModal({
  course,
  isOpen,
  onClose,
}: InscriptionModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submissionId, setSubmissionId] = useState(createSubmissionId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState<"sent" | "partial">("partial");
  const [consentPrivacyTerms, setConsentPrivacyTerms] = useState(false);
  const [consentPromotional, setConsentPromotional] = useState(false);

  const canSubmit = useMemo(
    () =>
      form.nombreCompleto.trim().length > 0 &&
      form.whatsapp.trim().length > 0 &&
      form.cedula.trim().length > 0 &&
      form.provincia.trim().length > 0 &&
      consentPrivacyTerms &&
      !isLoading,
    [form, consentPrivacyTerms, isLoading]
  );

  if (!isOpen || !course) return null;

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function closeAndReset() {
    setForm(initialForm);
    setSubmissionId(createSubmissionId());
    setError("");
    setSuccess(false);
    setSuccessMessage("");
    setEmailStatus("partial");
    setConsentPrivacyTerms(false);
    setConsentPromotional(false);
    setIsLoading(false);
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!course || !canSubmit || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/suvoga/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reservation",
          submissionId,
          courseId: course.idServicio,
          courseName: course.nombre,
          name: form.nombreCompleto,
          phone: form.whatsapp,
          email: form.correo,
          cedula: form.cedula,
          provincia: form.provincia,
          website: form.website,
          originPath: `${window.location.pathname}${window.location.search}`,
          consentPrivacyTerms,
          consentPromotional,
          policyVersion: "2026-06",
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as ApiResponse;
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo registrar la solicitud.");
      }

      setSuccess(true);
      setEmailStatus(payload.email?.notification?.status === "sent" ? "sent" : "partial");
      setSuccessMessage(payload.message || "Solicitud registrada.");
      setForm(initialForm);
      setSubmissionId(createSubmissionId());
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo registrar la solicitud."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0D3B22]/45 p-4 backdrop-blur-sm overflow-y-auto"
    >
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default"
        onClick={closeAndReset}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#D4AF37]/30 bg-[#FAFAFA] text-[#102318] shadow-2xl shadow-black/30 flex flex-col my-auto max-h-[92vh]">
        <div className="flex items-start justify-between gap-5 border-b border-[#D4AF37]/20 px-6 py-5 shrink-0 bg-[#FDFBF7]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8D7530]">
              Reserva privada de cupo
            </p>
            <h2 className="suvoga-serif mt-2 text-2xl font-semibold leading-tight text-[#0D3B22] truncate max-w-[280px] sm:max-w-none">
              {course.nombre}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={closeAndReset}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#0D3B22] transition-colors hover:bg-[#F2ECD9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-grow scrollbar-thin">
          {success ? (
            <div className="rounded-2xl border border-[#0D3B22]/15 bg-[#0D3B22]/[0.04] p-5 text-center">
              <CheckCircle2 className="mx-auto h-9 w-9 text-[#0D3B22]" />
              <h3 className="suvoga-serif mt-3 text-xl font-semibold text-[#0D3B22]">
                {emailStatus === "sent" ? "Cupo solicitado con éxito" : "Solicitud registrada"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B6048]">
                {successMessage || `Guardamos tus datos en ${brand.productName}.`}
              </p>
              <button
                type="button"
                onClick={closeAndReset}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#145332]"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 rounded-2xl border border-[#D4AF37]/35 bg-[#0D3B22]/[0.02] p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8D7530] font-semibold uppercase tracking-wider">Programa</span>
                  <span className="font-bold text-[#0D3B22] truncate max-w-[200px]">{course.nombre}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-[#D4AF37]/15 pt-2">
                  <span className="text-[#8D7530] font-semibold uppercase tracking-wider">Anticipo de Reserva</span>
                  <span className="font-bold text-[#0D3B22] text-sm">{formatDop(course.montoAnticipo)}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-[#D4AF37]/15 pt-2">
                  <span className="text-[#8D7530] font-semibold uppercase tracking-wider">Cupos Disponibles</span>
                  <span className="font-semibold text-[#0D3B22]">{course.cuposTotales || 12} libres</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
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
                <Field
                  id="nombreCompleto"
                  label="Nombre Completo"
                  value={form.nombreCompleto}
                  onChange={updateField}
                  autoComplete="name"
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={updateField}
                  autoComplete="tel"
                />
                <Field
                  id="correo"
                  label="Correo para confirmación"
                  value={form.correo}
                  onChange={updateField}
                  autoComplete="email"
                  type="email"
                  required={false}
                />
                <Field
                  id="cedula"
                  label="Cédula"
                  value={form.cedula}
                  onChange={updateField}
                />
                <Field
                  id="provincia"
                  label="Provincia"
                  value={form.provincia}
                  onChange={updateField}
                  autoComplete="address-level1"
                />

                <div className="space-y-3 py-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentPrivacyTerms}
                      onChange={(e) => {
                        setConsentPrivacyTerms(e.target.checked);
                        setError("");
                      }}
                      className="mt-1 h-4 w-4 rounded border-[#D4AF37]/35 text-[#0D3B22] focus:ring-[#0D3B22]/70"
                    />
                    <span className="text-xs leading-5 text-[#4E6658]">
                      He leído la{" "}
                      <Link href="/politica-de-privacidad" target="_blank" className="font-semibold text-[#0D3B22] underline hover:text-[#145332]">
                        Política de Privacidad
                      </Link>{" "}
                      y acepto los{" "}
                      <Link href="/terminos-y-condiciones" target="_blank" className="font-semibold text-[#0D3B22] underline hover:text-[#145332]">
                        Términos y Condiciones
                      </Link>
                      . <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentPromotional}
                      onChange={(e) => setConsentPromotional(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#D4AF37]/35 text-[#0D3B22] focus:ring-[#0D3B22]/70"
                    />
                    <span className="text-xs leading-5 text-[#4E6658]">
                      Acepto recibir novedades y promociones por correo o WhatsApp. <span className="text-[#8D7530] text-[10px] font-semibold">(Opcional)</span>
                    </span>
                  </label>
                </div>

                {error ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {error}
                  </p>
                ) : null}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!canSubmit || isLoading}
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#145332] disabled:cursor-not-allowed disabled:bg-[#0D3B22]/45"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando solicitud...
                      </>
                    ) : (
                      "Confirmar reserva de cupo"
                    )}
                  </button>
                  <p className="mt-3 text-center text-[10px] leading-relaxed text-[#6B6048]">
                    Tu información será usada solo para confirmar disponibilidad y seguimiento académico.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
