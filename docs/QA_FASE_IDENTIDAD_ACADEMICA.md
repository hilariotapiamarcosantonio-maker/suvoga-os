# QA — Fase Identidad Visual Académica

Validación de la fase de identidad visual y autoridad académica. Sin cambios en
Sheets, IDs, inscripciones, pagos, API ni rutas legacy.

## Comandos

| Comando | Resultado |
|---------|-----------|
| `npm run validate:courses` | OK — 40 cursos, 38 publicados, draft: CUR-020, CUR-031 |
| `npm run test:content-filter` | OK — 55 grupos de checks, 0 fallos |
| `npx tsc --noEmit` (typecheck) | OK — exit 0, sin errores de tipo |
| `npm run lint` | OK — solo warnings preexistentes de `<img>` (CourseCover los suprime con justificación) |
| `npm run build` | OK — exit 0, ✓ 49/49 páginas generadas |
| `git diff --check` | OK — sin conflictos ni espacios en blanco erróneos |

## Rutas verificadas (HTTP)

| Ruta | Esperado | Resultado |
|------|----------|-----------|
| `/` | 200 | 200 |
| `/cursos` | 200 | 200 |
| `/curso/diplomado-de-masaje-corporal` (provisional) | 200 | 200 |
| `/curso/taller-de-masaje-tailandes` (fallback) | 200 | 200 |
| `/curso/taller-de-elaboracion-de-piezas-en-resina` (fallback) | 200 | 200 |
| `/curso/taller-de-terapia-de-alineacion-estructura-osea` (CUR-020 draft) | 404 | 404 |
| `/curso/taller-de-terapia-de-alineacion-estructura-osea-cur-031` (CUR-031 draft) | 404 | 404 |
| `/curso/zzz-no-existe-xyz` (inexistente) | 404 | 404 |
| `/historias` `/comunidad` `/contacto` `/admin` | 200 | 200 |

## Responsive (overflow horizontal)

| Ancho | Catálogo | Ficha |
|-------|----------|-------|
| 320 px | sin overflow | sin overflow |
| 375 px | sin overflow | sin overflow |
| 390 px | sin overflow | sin overflow |
| 768 px | sin overflow | sin overflow |
| 1024 px | sin overflow | sin overflow |
| 1440 px | sin overflow | sin overflow |

## Verificaciones visuales

- Tarjetas: eyebrow de familia, beneficio principal, portada/fallback, precio +
  anticipo, CTA único "Ver programa". Altura uniforme, `line-clamp` en título y
  beneficio. Sin imágenes deformadas.
- Fallback editorial premium (CUR-026..040): gradiente por familia + motivo +
  chip + monograma. **No** rectángulo verde vacío ni imagen repetida 16×.
- Ficha hero: eyebrow de familia, beneficio principal, portada resiliente,
  precios, CTA "Reservar mi cupo". Sección de Avales solo si hay endorsements.
- Contenido: duración del hero/tarjeta ya **no** filtra "Facilitadora: <nombre>"
  ni precios (sanitizada). Encabezados del temario sin prefijo markdown `###`.
- WhatsApp: botón presente en páginas públicas, ausente en `/admin` y 404,
  número 18298389185, mensaje contextual por curso. No tapa el CTA de reserva.

## Hallazgo pendiente (preexistente, fuera de alcance)

- **Aviso de hidratación de `Reveal` (framer-motion)** en consola del home:
  `Prop did not match ... opacity:0;transform:translateY(22px)` vs
  `transform:none`. Proviene del componente de animación `Reveal.tsx`
  (preexistente, no introducido en esta fase). Las animaciones se abordan en la
  fase posterior (Antigravity 2.0); se documenta aquí, no se modifica ahora.

## No modificado (confirmado)

Google Sheets, Spreadsheet ID, IDs CUR-001..040, inscripciones, pagos,
`/api/suvoga/inscriptions`, credenciales, variables sensibles, rutas legacy,
redirects 308, `sourceRaw`, protección Git (`Bash(git push *)` en
`G:\suvoga-os\.claude\settings.local.json`). No se ejecutó `git push`.
