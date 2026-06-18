# MIGRACIÓN A 40 CURSOS OFICIALES — Documento Maestro

> Bitácora y plan de control de la migración del catálogo de SuVoGa Academia.
> **Estado global: Fase 0 y Fase 1 completadas. Nada publicado, nada migrado, sin push/deploy.**
> Fecha de inicio: 2026-06-18.

---

## FASE 0 — Backup e inventario  ✅ COMPLETADA

### Fuente canónica
- Recibida en: `docs/SuVoGa_Academia_Premium_Contenido_Saneado.md`
- **SHA-256:** `a90188d5e3ed4694826e10cce64b594e9b871dbb65a76c57e18080ee083ccd61`
- Copia de trabajo: `docs/source/SuVoGa_Academia_Premium_Contenido_Saneado.md`
- Copia inmutable (solo lectura): `docs/source/archive/SuVoGa_Academia_Premium_Contenido_Saneado__2026-06-18__a90188d5...ccd61.md`
- Verificación: los 3 archivos comparten el mismo SHA-256. Contiene CUR-001 … CUR-040 (CUR-010 escrito como `CUR-10`).

### Inventario del sistema actual
| Recurso | Ubicación | Estado |
|---|---|---|
| Catálogo de código (anterior) | `src/data/courses.ts` (histórico) | 25 cursos (CUR-001…CUR-025) con `idServicio` derivado del índice del array. **Reemplazado** por la arquitectura `src/data/courses/`. |
| Catálogo de datos (vigente) | `src/data/courses/cur-001…cur-040.json` + `course-index.ts` | 40 `CourseRecord` con `sourceId`/`courseUid`/`slug`/`legacyIds`. |
| Catálogo CSV (histórico) | `data/suvoga_os/Catalogo_Servicios.csv` | 25 filas + cabecera |
| Lectura de datos | `src/lib/crm-data/get-suvoga-data.ts` | tipo `SuvogaServicio` |
| Imágenes | `public/images/courses/` | cur-001…cur-017 PNG; cur-018…cur-025 SVG (placeholder) |

### Estado de Git  ⚠️ (reportar)
- La raíz `G:\suvoga-os` **NO** es repo git. El proyecto **sí** lo es: repo en `G:\suvoga-os\CRM En Sheets - copia\crm-admin\.git`.
- Rama actual: **`main`**. Tracking: `origin/main` (sin adelanto/atraso reportado).
- Remote `origin`: `https://github.com/hilariotapiamarcosantonio-maker/suvoga-os.git` (fetch y push).
- Último commit: `b5f0c22 fix: keep Suvoga public header fixed on scroll`.
- Cambios sin seguimiento al iniciar: solo los artefactos de esta fase (`docs/source/`, doc fuente y los 3 .md de control).
- Instrucción cumplida: **no se ejecutó `git init`**.

### Backups (pendiente de tu visto bueno sobre el método)
Al no haber repo en la raíz y trabajar dentro de un repo git, propongo backup por copia explícita antes de tocar datos:
`courses.ts → courses.ts.bak.2026-06-18`, ídem `Catalogo_Servicios.csv` y `get-suvoga-data.ts`. **Aún no se han creado** (no se ha tocado ningún dato en esta fase). El backup de las pestañas de Google Sheets debe hacerlo la propietaria (no tengo acceso a ese Sheet desde aquí) — ver Fase 9.

---

## FASE 1 — Identificadores  ✅ COMPLETADA (arquitectura vigente aplicada)

Detalle completo en **`MAPA_IDS_CURSOS.md`**. Resumen:

- Arquitectura vigente: cada curso es un `CourseRecord` con `sourceId` (CUR-001…CUR-040, **dato almacenado**, no posicional), `courseUid` (interno estable basado en slug), `slug` (URL pública canónica) y `legacyIds` (aliases históricos).
- **No** se usan IDs posicionales ni `systemId`; **no** se generan IDs internos posteriores a CUR-040.
- Desfase desde CUR-009: el catálogo anterior incluía un duplicado ("Madeoterapia") inexistente en el documento oficial; por eso `legacyId N+1` mapea al `sourceId N` a partir de CUR-009. El antiguo CUR-009 queda como `legacyId` de CUR-008.
- 38 cursos publicados; CUR-020 y CUR-031 en `draft`.

Inconsistencias para la propietaria en **`INCONSISTENCIAS_CONTENIDO_DUENA.md`**.

---

## Verificación de inscripciones/pagos — PENDIENTE (Fase 9, requiere acceso)

Antes de archivar CUR-009 o reanclar CUR-015/CUR-023 hay que comprobar en Google Sheets:
1. ¿Qué `idServicio` históricos tienen inscripciones reales?
2. ¿Qué pagos están asociados a cada `idServicio`?
3. Ninguna inscripción debe quedar apuntando a un curso distinto tras la migración.

> No tengo acceso al Sheet ni a `/api/suvoga/inscriptions` desde este entorno. La propietaria debe exportar/compartir las pestañas (catálogo, inscripciones, pagos, programación) o autorizar credenciales para la verificación.

---

## Reglas globales confirmadas en el documento fuente

- **Reservación combinada (línea 3):** dos cursos/talleres juntos → anticipo RD$2.000; cursos individuales → RD$1.000 (salvo distribución específica indicada en la ficha). ✔ coincide con el encargo.
- **Facilitadora:** Sugeidy Vólquez García. **Aval:** ASNaMaTeM + SuVoGa Escuela y Centro de Masajes.

---

## Plan de fases siguientes (no iniciadas)

- **Fase 2** — Marcar inconsistencias (hecho a nivel documental; falta decisión de la propietaria).
- **Fase 3** — Marca "SuVoGa Academia" (quitar "Spa" institucional; conservar "spa" en temarios).
- **Fase 4** — Nueva arquitectura de datos (`src/data/courses/` tipada, `sourceRaw` + `publicCopy`).
- **Fase 5** — Normalización sin alterar significado.
- **Fase 6** — Catálogo de 40 (buscador, filtros, orden, carga progresiva, mobile-first).
- **Fase 7** — Landing por curso (hero, plan de inversión, temario en acordeón, legal).
- **Fase 8** — Seguridad y contenido regulado (`requiresLegalReview`, disclaimers).
- **Fase 9** — Google Sheets y admin (aditivo, sin romper API/IDs).
- **Fase 10** — Imágenes (40 cursos; ver `IMAGENES_PENDIENTES_40_CURSOS.md`).
- **Fase 11** — QA automático (`scripts/validate-course-catalog.ts`).
- **Fase 12** — QA manual (responsive, dispositivos, rutas clave).
- **Fase 13** — Control de cambios: sin push/deploy hasta aprobación final.

---

## Bloqueo de entorno a resolver
- **Disco C: al 100% (0 bytes libres).** Node/Next.js y temporales escriben en C:; `npm install` y `npm run build` (Fases 11–12) probablemente fallarán hasta liberar espacio. El código vive en G: (331 GB libres), así que no afecta a los datos, solo a la compilación/QA.
