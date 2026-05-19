"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";

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
  cedula: string;
  provincia: string;
};

const initialForm: FormState = {
  nombreCompleto: "",
  whatsapp: "",
  cedula: "",
  provincia: "",
};

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
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#6B6048]">
        {label}
      </span>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        required
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full border-0 border-b border-[#0D3B22]/55 bg-transparent px-0 text-[15px] text-[#102318] outline-none transition-colors placeholder:text-[#9A927F] focus:border-[#D4AF37] focus:ring-0"
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(
    () => Object.values(form).every((value) => value.trim().length > 0),
    [form]
  );

  if (!isOpen || !course) return null;

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function closeAndReset() {
    setForm(initialForm);
    setError("");
    setSuccess(false);
    setIsLoading(false);
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!course || !canSubmit || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/suvoga/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idServicio: course.idServicio,
          montoAnticipo: course.montoAnticipo,
          ...form,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo guardar la inscripcion.");
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo guardar la inscripcion."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0D3B22]/45 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0 cursor-default"
        onClick={closeAndReset}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#FAFAFA] text-[#102318] shadow-2xl shadow-black/30">
        <div className="flex items-start justify-between gap-5 border-b border-[#D4AF37]/20 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8D7530]">
              Separar cupo
            </p>
            <h2 className="suvoga-serif mt-2 text-3xl font-semibold leading-tight text-[#0D3B22]">
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

        <div className="px-6 py-5">
          {success ? (
            <div className="rounded-lg border border-[#0D3B22]/15 bg-[#0D3B22]/[0.04] p-5 text-center">
              <CheckCircle2 className="mx-auto h-9 w-9 text-[#0D3B22]" />
              <h3 className="suvoga-serif mt-3 text-2xl font-semibold text-[#0D3B22]">
                Cupo solicitado con exito
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6048]">
                Guardamos tus datos en SuVoGa OS. El equipo puede confirmar el
                anticipo de {formatDop(course.montoAnticipo)} desde la base.
              </p>
              <button
                type="button"
                onClick={closeAndReset}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-[#0D3B22] px-5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#145332]"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 rounded-md border border-[#D4AF37]/25 bg-[#F5F0E5] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8D7530]">
                  Anticipo requerido
                </p>
                <p className="mt-1 text-xl font-semibold text-[#0D3B22]">
                  {formatDop(course.montoAnticipo)}
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
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
                  id="cedula"
                  label="Cedula"
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

                {error ? (
                  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSubmit || isLoading}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[#0D3B22] px-5 text-sm font-semibold text-[#FAFAFA] transition-colors hover:bg-[#145332] disabled:cursor-not-allowed disabled:bg-[#0D3B22]/45"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando en Sheets
                    </>
                  ) : (
                    "Confirmar y Separar Cupo"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
