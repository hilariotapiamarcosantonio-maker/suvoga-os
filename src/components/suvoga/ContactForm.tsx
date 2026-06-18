"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { contactInfo } from "@/data/contact";

const interests = [
  "Orientación general",
  "Información de un curso",
  "Fechas y horarios",
  "Formas de pago",
  "Comunidad SuVoGa",
];

/**
 * Contact form that composes a prefilled email to the academy. It does not
 * write to Google Sheets or any backend — it only opens the visitor's mail
 * client with their message.
 */
export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [interes, setInteres] = useState(interests[0]);
  const [mensaje, setMensaje] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = nombre.trim() && contacto.trim() && mensaje.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const subject = `Orientación académica · ${interes}`;
    const body = [
      `Nombre: ${nombre}`,
      `Contacto: ${contacto}`,
      `Interés: ${interes}`,
      "",
      mensaje,
    ].join("\n");
    const href = `mailto:${contactInfo.correo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  const fieldClass =
    "h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus-visible:border-[#0D3B22] focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-nombre" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            Nombre completo
          </label>
          <input
            id="contact-nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-medio" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            WhatsApp o correo
          </label>
          <input
            id="contact-medio"
            name="contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-interes" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          ¿En qué te ayudamos?
        </label>
        <select
          id="contact-interes"
          name="interes"
          value={interes}
          onChange={(e) => setInteres(e.target.value)}
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
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={4}
          className={`w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 py-3 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus-visible:border-[#0D3B22] focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70`}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3B22]/70 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#0D3B22]/40"
      >
        <Send className="h-4 w-4" />
        Enviar mensaje
      </button>

      <p role="status" aria-live="polite" className="sr-only">
        {sent ? "Mensaje preparado y aplicación de correo abierta." : ""}
      </p>

      {sent ? (
        <p className="rounded-2xl border border-[#0D3B22]/15 bg-[#0D3B22]/[0.04] px-4 py-3 text-center text-xs leading-relaxed text-[#4E6658]">
          Abrimos tu aplicación de correo con el mensaje listo para enviar a{" "}
          <span className="font-semibold text-[#0D3B22]">{contactInfo.correo}</span>.
          Nuestro equipo te responderá en el horario de atención.
        </p>
      ) : (
        <p className="text-center text-[11px] leading-relaxed text-[#6B6048]">
          Tus datos se usan únicamente para orientarte. No se comparten con terceros.
        </p>
      )}
    </form>
  );
}
