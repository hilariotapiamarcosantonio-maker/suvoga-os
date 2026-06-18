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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            Nombre completo
          </span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
            className="h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
            WhatsApp o correo
          </span>
          <input
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
            className="h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          ¿En qué te ayudamos?
        </span>
        <select
          value={interes}
          onChange={(e) => setInteres(e.target.value)}
          className="h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 text-sm text-[#0D3B22] outline-none focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
        >
          {interests.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
          Tu mensaje
        </span>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={4}
          className="w-full rounded-2xl border border-[#D4AF37]/35 bg-white px-4 py-3 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332] disabled:cursor-not-allowed disabled:bg-[#0D3B22]/40"
      >
        <Send className="h-4 w-4" />
        Enviar mensaje
      </button>

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
