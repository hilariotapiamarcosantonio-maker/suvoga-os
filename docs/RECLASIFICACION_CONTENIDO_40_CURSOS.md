# Reclasificación de contenido — 40 cursos SuVoGa Academia

Generado automáticamente por `scripts/generate-reclassification-table.ts` a partir de
`src/data/courses/cur-001.json`…`cur-040.json`. **No modifica los JSON fuente.**

Este documento es un insumo para validación de la propietaria, siguiendo el proceso de
`mh-content-information-design`: extraer sin editar, clasificar, señalar ambigüedades sin
resolverlas unilateralmente. Ningún dato se reescribe aquí — solo se identifica dónde está
y a dónde debería moverse, con su nivel de certeza.

Clasificaciones usadas: `correcto`, `mover`, `duplicado`, `ruido`, `ambiguo`,
`pendiente de propietaria`, `pendiente legal`.

---

## CUR-001 — Máster en Drenaje Linfático: Curso Avanzado

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| certifications | Incluye Certificado es Avalado por la Asociación Nacional de Masajistas, Terapeutas manuales y Afines y Manual | mover | avales/certificación | alta | no |
| certifications | Certificado Avalado por la Asociación Nacional de Masajistas AsNaMaTeM | mover | avales/certificación | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 2 línea(s) — ej. "Incluye Certificado es Avalado por la Asociación Nacional de…" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 2 línea(s); además filtrados en: certifications, certifications | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 9 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-002 — Taller De Drenaje Linfático Post Operatorio

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:** ninguno por heurística automática.

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 2 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-003 — Diplomado de Masaje Corporal

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| practices | Certificación avalada por SuVoGa Escuelas de Masajes. | mover | avales/certificación | alta | no |
| practices | Oportunidad de emprender y generar ingresos. | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | Certificación avalada por SuVoGa Escuelas de Masajes. | mover | avales/certificación | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 7 línea(s) — ej. "📘 CUR-003 - Diplomado de Masaje Corporal" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 2 línea(s); además filtrados en: practices, certifications | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 6 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | practices: "Oportunidad de emprender y generar ingresos." | ruido | media | sí |

---

## CUR-004 — Masaje Corporal Avanzado

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:** ninguno por heurística automática.

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "Certificación: Incluida" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 7 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 2 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-005 — Taller de Aparatología 9 en 1

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| indications == contraindications | ✨ ¿QUÉ APRENDERÁS? • Manejo correcto de la máquina 9 en 1 • Protocolos reductivos y reafirmantes • Combinación de técnicas para mejores resu… | duplicado | separar contenido real de indicaciones vs. contraindicaciones | alta | sí |
| indications | 💰 INVERSIÓN RD$3,500 | mover | pricing | alta | no |
| indications | 🔒 Reservación: RD$1,000 (No reembolsable) | mover | pricing | alta | no |
| contraindications | 💰 INVERSIÓN RD$3,500 | mover | pricing | alta | no |
| contraindications | 🔒 Reservación: RD$1,000 (No reembolsable) | mover | pricing | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "Certificación: Incluida" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 4 línea(s) | duplicado con contraindications | media | sí |
| Contraindicaciones | campo `contraindications`: 4 línea(s) | duplicado con indications | media | sí |
| Pricing | `pricing.rawLines`: 6 línea(s); precio también filtrado fuera de pricing en: indications, indications, contraindications, contraindications | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-006 — Taller de Ondas de Choques Aplicado a la Estetica

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| indications == contraindications | INDICACIONES- CONTRAINDICACIONES- BENEFICIOS \| TECNICAS Y PROTOCOLOS PARA TRABAJAR : \| Reducción de celulitis \| Moldea y tonifica \| Mejora l… | duplicado | separar contenido real de indicaciones vs. contraindicaciones | alta | sí |
| indications | INDICACIONES- CONTRAINDICACIONES- BENEFICIOS | ruido | (descartar — encabezado de documento) | alta | no |
| indications | FECHA Y HORARIO | ruido | (descartar — encabezado de documento) | alta | no |
| indications | INVERSIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| indications | INVERSIÓN: $3,500 | mover | pricing | alta | no |
| indications | MIEMBROS DE AsNaMaTeM: $2,500 | mover | pricing | alta | no |
| indications | RESERVACIÓN: $1,000 NO REEMBOLSABLE | mover | pricing | alta | no |
| contraindications | INDICACIONES- CONTRAINDICACIONES- BENEFICIOS | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | FECHA Y HORARIO | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | INVERSIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | INVERSIÓN: $3,500 | mover | pricing | alta | no |
| contraindications | MIEMBROS DE AsNaMaTeM: $2,500 | mover | pricing | alta | no |
| contraindications | RESERVACIÓN: $1,000 NO REEMBOLSABLE | mover | pricing | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 13 línea(s) | duplicado con contraindications | media | sí |
| Contraindicaciones | campo `contraindications`: 13 línea(s) | duplicado con indications | media | sí |
| Pricing | `pricing.rawLines`: 3 línea(s); precio también filtrado fuera de pricing en: indications, indications, indications, contraindications, contraindications, contraindications | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-007 — Taller de Radiofrecuencia Indiba

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| practices | ### Beneficios que te Destacan | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| practices | Aumenta tus ingresos | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| practices | Público General: RD$4,000 | mover | pricing | alta | no |
| practices | Miembros ASNAMATEM: RD$3,000 | mover | pricing | alta | no |
| practices | Reserva: RD$1,000 (y asegura tu lugar ahora mismo) | mover | pricing | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "Certificado de participación" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s); precio también filtrado fuera de pricing en: practices, practices, practices | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | practices: "### Beneficios que te Destacan"; practices: "Aumenta tus ingresos" | ruido | media | sí |

---

## CUR-008 — Masaje reductor y maderoterapia

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| indications | Miembros de AsNaMaTeM: $2,000 | mover | pricing | alta | no |
| indications | Reservación: $1,000 (No reembolsable) | mover | pricing | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 15 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s); precio también filtrado fuera de pricing en: indications, indications | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-009 — Taller de Vacummterapia Corporal Estetico

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:** ninguno por heurística automática.

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 0 línea(s) | ambiguo | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 3 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 2 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-010 — Curso de Masaje Terapéutico

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:** ninguno por heurística automática.

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 4 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 1 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-011 — Curso Taller de Limpieza Facial Básica y Profunda

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| profile | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de participación" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 16 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 0 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 5 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-012 — Taller de Terapias Alternativas (Vino, chocolate, barro, café)

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| profile | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| requirements | ✔ Ofrece experiencias exclusivas de spa. | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| requirements | "Transforma ingredientes naturales en experiencias únicas de bienestar, relajación y belleza." 🍇🍫☕🧖‍♀️✨ | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | Beneficios | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de participación" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 0 línea(s) | ambiguo | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 6 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 2 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 4 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | requirements: "✔ Ofrece experiencias exclusivas de spa."; requirements: ""Transforma ingredientes naturales en experiencias únicas de bienestar, relajaci…" | ruido | media | sí |

---

## CUR-013 — Taller de Kinesiotape

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| profile | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| indications | MÓDULO II: ANATOMÍA Y FISIOLOGÍA APLICADA | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO X: PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | Taller Práctico | ruido | (descartar — encabezado de documento) | alta | no |
| practices | Corrección de Técnicas | ruido | (descartar — encabezado de documento) | alta | no |
| practices | Evaluación Práctica Final | ruido | (descartar — encabezado de documento) | alta | no |
| materials | INCLUYE | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de participación" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 7 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 11 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 6 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 4 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-014 — Taller de Elaboración de Productos de Spa

Estado: `published`

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| requirements | Eslogan inicial: Te invitan a vivir una experiencia transformadora | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 2 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 2 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 0 línea(s) | vacío | media | sí |
| Frases promocionales | requirements: "Eslogan inicial: Te invitan a vivir una experiencia transformadora" | ruido | media | sí |

---

## CUR-015 — Taller de Elaboración de Velas Artesanales

Estado: `published`

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | Miembros ASNaMaTeM: 2500 | mover | pricing | alta | no |
| objectives | Público General: RD$3000 | mover | pricing | alta | no |
| objectives | Reservación: RD$1,000 (No reembolsable Ni transferible a otro curso) TEMARIO | mover | pricing | alta | no |
| practices | PRÁCTICA FINAL | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Certificado de Participación Avalado por SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: Sugeidy Vólquez García – Directora de SuVoGa Escuela y Centro de Masajes. 🕯️✨ | mover | facilitador (nombre/autoría) | alta | no |
| certifications | Certificado de Participación Avalado por SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "Certificado de Participación Avalado por SuVoGa Escuela y Ce…" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 2 línea(s); además filtrados en: materials, certifications | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 16 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s); precio también filtrado fuera de pricing en: objectives, objectives, objectives | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 0 línea(s) | vacío | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-016 — TALLER DE DESINTOXICACIÓN IÓNICA

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| practices | PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| certifications | CERTIFICACIÓN - Certificado de Participación Avalado por la Asociación Nacional de Masajistas, Terapeutas Manuales y Afines (AsNaMaTeM) | mover | avales/certificación | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 2 línea(s) — ej. "✅ Certificado de participación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 2 línea(s); además filtrados en: certifications | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 8 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 5 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 7 línea(s) | correcto | media | no |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-017 — Taller de Manejo Profesional de Máquina G5

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| practices | PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| certifications | CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 4 línea(s) — ej. "✅ Certificado de participación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 4 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 8 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 5 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 10 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 9 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-018 — TALLER DE DRENAJE BRASILEÑO

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| indications | MÓDULO II: ANATOMÍA Y FISIOLOGÍA APLICADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| certifications | CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 8 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 6 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 8 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 6 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-019 — TALLER DE MANEJO DE COMPLICACIONES POSTQUIRÚRGICAS ESTÉTICAS

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones. | ruido | (descartar — encabezado de documento) | alta | no |
| practices | PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| certifications | CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación avalado." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 4 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 8 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 6 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 5 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 12 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-020 — Taller de Terapia de Alineación Estructura osea

Estado: `draft` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| practices | PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| certifications | CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación avalado." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 4 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 8 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 6 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 5 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-021 — TALLER DE DRENAJE LINFÁTICO FACIAL

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 11 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 6 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 9 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-022 — Taller de Masaje Descontracturante

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Beneficios | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 13 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 12 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 7 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 5 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-023 — Taller de Depilación con Cera

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ Formando profesionales en estética integral, bienestar y cuidado personal con excelencia, ética y compromiso. | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 15 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 8 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 6 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ Formando profesionales en estética integral, bienestar y cuidado personal co…" | ruido | media | sí |

---

## CUR-024 — Curso Reflexologia Podal

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL CURSO | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García" | correcto | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 0 línea(s) | ambiguo — sin certifications propio | media | sí |
| Avales | campo `endorsements`: 2 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 0 línea(s) | vacío | media | no |
| Indicaciones | campo `indications`: 6 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 7 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 5 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-025 — CURSO DE COSMETOLOGÍA PROFESIONAL

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| profile | Miembros ASNaMaTeM: RD$9,000 | mover | pricing | alta | no |
| profile | Público General: RD$10,000 | mover | pricing | alta | no |
| profile | Reservación: RD$1,000 (No reembolsable Ni transferible a otro curso) | mover | pricing | alta | no |
| objectives | OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones. | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Beneficios. | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones. | ruido | (descartar — encabezado de documento) | alta | no |
| materials | INCLUYE | ruido | (descartar — encabezado de documento) | alta | no |
| materials | PERFIL DEL EGRESADO | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Volquez García | mover | facilitador (nombre/autoría) | alta | no |
| materials | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: materials | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de aprobación" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 10 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s); precio también filtrado fuera de pricing en: profile, profile, profile | duplicado fuera de pricing | alta | no |
| Notas legales | campo `legalNotes`: 3 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-026 — TALLER DE MASAJE TAILANDES

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 15 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 6 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 8 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 5 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-027 — Curso de Canalización e Inyectología

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 👥 PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL CURSO | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones. | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO X: PRÁCTICA CLÍNICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICAS INCLUIDAS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 15 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 13 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 13 línea(s) | correcto | media | no |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-028 — Taller de Biomagnetismo

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 👥 PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | Indicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👥 PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 16 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 5 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 8 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 7 línea(s) | correcto | media | no |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-029 — TALLER DE MASAJES CON PIEDRAS CALIENTES, PINDAS HERBALES Y PARAFINOTERAPIA

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) | mover | avales/certificación | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ "Formando profesionales en terapias de Spa, bienestar integral y técnicas manuales especializadas con excelencia, ética y compromiso." | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 16 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 3 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 2 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 6 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ "Formando profesionales en terapias de Spa, bienestar integral y técnicas ma…" | ruido | media | sí |

---

## CUR-030 — TALLER DE ELABORACIÓN DE JABONES ARTESANALES

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 👥 PERFIL DEL PARTICIPANTE | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO IV. BIOSEGURIDAD Y BUENAS PRÁCTICAS DE MANUFACTURA | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 3 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-031 — Taller de Terapia de Alineación Estructura Ósea

Estado: `draft` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | 👐 PRÁCTICAS SUPERVISADAS | ruido | (descartar — encabezado de documento) | alta | no |
| indications | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 👐 PRÁCTICAS SUPERVISADAS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| practices | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| practices | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| practices | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| practices | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| materials | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| materials | 💚 “Formando profesionales en terapias manuales y bienestar integral con excelencia y compromiso.” | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: practices, practices, materials, materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: practices, materials | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: practices, materials | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 13 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 16 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 3 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | materials: "💚 “Formando profesionales en terapias manuales y bienestar integral con excelen…" | ruido | media | sí |

---

## CUR-032 — TALLER DE VENDAJE NEUROMUSCULAR APLICADO EN PACIENTES POSTOPERATORIOS Y CICATRICES

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | MÓDULO II. ANATOMÍA Y CICATRIZACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO V. APLICACIONES PRÁCTICAS EN PACIENTES POSTOPERATORIOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ "Formando profesionales en recuperación postquirúrgica, terapia manual y técnicas complementarias con excelencia, ética y compromiso." | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 6 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 7 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 2 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ "Formando profesionales en recuperación postquirúrgica, terapia manual y téc…" | ruido | media | sí |

---

## CUR-033 — Curso-Taller de Masaje Deportivo y Ventosaterapia

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO VII. PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ "Formando profesionales en masoterapia, rehabilitación complementaria y bienestar integral con excelencia, ética y compromiso." | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 3 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ "Formando profesionales en masoterapia, rehabilitación complementaria y bien…" | ruido | media | sí |

---

## CUR-034 — Taller de Lifting Facial con Maderoterapia

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO VIII. PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ "Formando profesionales en estética avanzada, terapias manuales y bienestar integral con excelencia, innovación y compromiso." | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 3 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ "Formando profesionales en estética avanzada, terapias manuales y bienestar …" | ruido | media | sí |

---

## CUR-035 — TALLER DE APARATOLOGÍA APLICADA A PACIENTES POSTOPERATORIOS

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| indications | MÓDULO II. ANATOMÍA Y FISIOLOGÍA APLICADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO VI. PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ "Formando profesionales en recuperación postquirúrgica, aparatología estética y terapias complementarias con excelencia, ética y comprom… | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 7 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 2 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 9 línea(s) | correcto | media | no |
| Frases promocionales | competencies: "💚✨ "Formando profesionales en recuperación postquirúrgica, aparatología estétic…" | ruido | media | sí |

---

## CUR-036 — TALLER DE APARATOLOGÍA APLICADA AL MASAJE TERAPÉUTICO

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| contraindications | Contraindicaciones | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO VI. PRÁCTICA SUPERVISADA | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| practices | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | 🎓 COMPETENCIAS A DESARROLLAR | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| competencies | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| competencies | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| competencies | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| competencies | 💚✨ “Formando profesionales en terapias manuales, aparatología terapéutica y bienestar integral con excelencia, ética y compromiso social.” | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, competencies, competencies | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: competencies | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials, competencies | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 14 línea(s) | correcto | media | no |
| Materiales | campo `materials`: 18 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 2 línea(s) | correcto tras filtrado | media | no |
| Contraindicaciones | campo `contraindications`: 7 línea(s) | correcto tras filtrado | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 6 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | competencies: "💚✨ “Formando profesionales en terapias manuales, aparatología terapéutica y bie…" | ruido | media | sí |

---

## CUR-037 — TALLER DE ELABORACIÓN DE CREMAS COSMÉTICAS

Estado: `published`

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| objectives | 🎯 OBJETIVO GENERAL | ruido | (descartar — encabezado de documento) | alta | no |
| objectives | 📚 TEMARIO DEL TALLER | ruido | (descartar — encabezado de documento) | alta | no |
| practices | MÓDULO II. MATERIAS PRIMAS Y ACTIVOS COSMÉTICOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 📖 MATERIALES INCLUIDOS | ruido | (descartar — encabezado de documento) | alta | no |
| materials | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM) y SuVoGa Escuela y Centro de Masajes. | mover | avales/certificación | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Vólquez García | mover | facilitador (nombre/autoría) | alta | no |
| materials | Directora de SuVoGa Escuela y Centro de Masajes | mover | cargo de facilitadora (campo inexistente hoy) | alta | sí |
| materials | 💚✨ "Aprende, crea y emprende en el apasionante mundo de la cosmética natural." | ruido | (descartar o reescribir como copy de marketing aparte) | media | sí |
| certifications | 🏅 CERTIFICACIÓN | ruido | (descartar — encabezado de documento) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | detectado embebido en: materials | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 3 línea(s) — ej. "✅ Certificado de participación y aprobación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 3 línea(s); además filtrados en: materials | mover (duplicado fuera de campo) | media | no |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 12 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 0 línea(s) | vacío | media | sí |
| Frases promocionales | materials: "💚✨ "Aprende, crea y emprende en el apasionante mundo de la cosmética natural."" | ruido | media | sí |

---

## CUR-038 — TALLER DE ELABORACIÓN DE EXFOLIANTES, SALES DE BAÑO Y BOMBAS DE BAÑO

Estado: `published`

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| materials | Incluye | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Volquez – Directora de SuVoGa Escuela y Centro de Masajes | mover | facilitador (nombre/autoría) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de participación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 6 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 0 línea(s) | vacío | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-039 — TALLER DE ELABORACIÓN DE PIEZAS EN RESINA

Estado: `published`

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| materials | Incluye | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Elaborado por: | mover | facilitador (nombre/autoría) | alta | no |
| materials | Sugeidy Volquez – Directora de SuVoGa Escuela y Centro de Masajes | mover | facilitador (nombre/autoría) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials, materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Certificado de participación." | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 6 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 0 línea(s) | vacío | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---

## CUR-040 — TALLER DE ELABORACIÓN DE PRODUCTOS CAPILARES

Estado: `published` · requiere revisión legal

**Contenido mal clasificado detectado:**

| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |
|---|---|---|---|---|---|
| practices | Módulo II. Materias Primas y Activos Cosméticos | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Incluye | ruido | (descartar — encabezado de documento) | alta | no |
| materials | Elaborado por: Sugeidy Volquez – Directora de SuVoGa Escuela y Centro de Masajes | mover | facilitador (nombre/autoría) | alta | no |

**Resumen por categoría:**

| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |
|---|---|---|---|---|
| Facilitadora | campo `facilitator`: "Sugeidy Vólquez García"; además filtrada en: materials | mover (duplicado fuera de campo) | alta | no |
| Cargo | no existe campo dedicado; no se encontró cargo embebido | pendiente de propietaria | media | sí |
| Certificación | campo `certifications`: 1 línea(s) — ej. "✅ Manual digital con formulaciones base. ✅ Guía de materias …" | correcto (revisar duplicidad con endorsements) | media | no |
| Avales | campo `endorsements`: 1 línea(s) | correcto | media | sí |
| Competencias | campo `competencies`: 0 línea(s) | pendiente — usa fallback de temario | media | sí |
| Materiales | campo `materials`: 4 línea(s) | correcto tras filtrado | media | no |
| Indicaciones | campo `indications`: 0 línea(s) | vacío | media | no |
| Contraindicaciones | campo `contraindications`: 0 línea(s) | vacío | media | no |
| Pricing | `pricing.rawLines`: 3 línea(s) | correcto | alta | no |
| Notas legales | campo `legalNotes`: 2 línea(s) (sin lenguaje legal reconocible) | pendiente legal | media | sí |
| Frases promocionales | sin hallazgos | correcto | media | no |

---
