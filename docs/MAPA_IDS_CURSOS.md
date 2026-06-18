# MAPA DE IDS — Catálogo Oficial de 40 Cursos (SuVoGa Academia)

> Documento de control de identidad de cursos. Arquitectura **vigente** (migración aplicada).
> Fecha: 2026-06-18.

## 0. Fuente canónica

- **Archivo:** `docs/source/SuVoGa_Academia_Premium_Contenido_Saneado.md`
- **SHA-256:** `a90188d5e3ed4694826e10cce64b594e9b871dbb65a76c57e18080ee083ccd61`
- **Datos derivados:** `src/data/courses/cur-001.json` … `cur-040.json` (un archivo por curso).
- **Índice:** `src/data/courses/course-index.ts`. **Tipos:** `src/data/courses/course-types.ts`.

## 1. Modelo de identidad vigente

Cada curso es un `CourseRecord` con estos identificadores:

| Campo | Significado | Ejemplo |
|---|---|---|
| `sourceId` | ID oficial del documento. **Rango fijo: CUR-001 … CUR-040.** Es lo que viaja como `idServicio` a inscripciones/pagos. | `CUR-012` |
| `courseUid` | Identificador interno estable, derivado del `slug`. Independiente de la numeración. | `terapias-alternativas-vino-chocolate-barro-cafe` |
| `slug` | **URL pública canónica** del curso (`/curso/<slug>`). | `taller-de-kinesiotape` |
| `legacyIds` | Aliases históricos (IDs del catálogo anterior). Solo para redirección legacy. | `["CUR-013"]` |
| `publicationStatus` | `published` \| `draft` \| `archived`. Drafts no se listan ni se indexan. | `published` |

> **No existen IDs posicionales.** El `sourceId` es un dato almacenado en cada JSON, no el índice del array. **No se crean IDs numéricos internos posteriores a CUR-040** (no hay `systemId` CUR-026…CUR-041; esa estrategia quedó descartada).

### Resolución de rutas
- `/curso/<slug>` → curso canónico (solo si `published`).
- `/curso/CUR-XXX` (mayúsculas o minúsculas) → si `CUR-XXX` es un `legacyId`, redirige al `slug` del curso oficial; si es un `sourceId` publicado no canónico, también redirige al `slug`.
- Drafts (CUR-020, CUR-031): su ruta directa responde **404 real** (`notFound()`).
- Prioridad: **`legacyId` se resuelve antes que `sourceId`** (ver `findSuvogaCourseByIdentifier` en `src/data/courses.ts`).

## 2. Mapa oficial completo (40 cursos)

`legacyIds` proviene del catálogo anterior de 25 cursos. El desfase desde CUR-009 se debe a que el catálogo anterior incluía un duplicado ("Madeoterapia") que el documento oficial no tiene.

| sourceId | slug (URL pública) | legacyIds | Estado |
|---|---|---|---|
| CUR-001 | master-en-drenaje-linfatico-curso-avanzado | CUR-001 | published |
| CUR-002 | taller-de-drenaje-linfatico-post-operatorio | CUR-002 | published |
| CUR-003 | diplomado-de-masaje-corporal | CUR-003 | published |
| CUR-004 | masaje-corporal-avanzado | CUR-004 | published |
| CUR-005 | taller-de-aparatologia-9-en-1 | CUR-005 | published |
| CUR-006 | taller-de-ondas-de-choques-aplicado-a-la-estetica | CUR-006 | published |
| CUR-007 | taller-de-radiofrecuencia-indiba | CUR-007 | published |
| **CUR-008** | masaje-reductor-y-maderoterapia | **CUR-008, CUR-009** | published |
| CUR-009 | taller-de-vacummterapia-corporal-estetico | CUR-010 | published |
| CUR-010 | curso-de-masaje-terapeutico | CUR-011 | published |
| CUR-011 | curso-taller-de-limpieza-facial-basica-y-profunda | CUR-012 | published |
| **CUR-012** | terapias-alternativas-vino-chocolate-barro-cafe | **CUR-013** | published |
| **CUR-013** | **taller-de-kinesiotape** | CUR-014 | published |
| CUR-014 | taller-de-elaboracion-de-productos-de-spa | CUR-015 | published |
| CUR-015 | taller-de-elaboracion-de-velas-artesanales | CUR-016 | published |
| CUR-016 | taller-de-desintoxicacion-ionica | CUR-017 | published |
| CUR-017 | taller-de-manejo-profesional-de-maquina-g5 | CUR-018 | published |
| CUR-018 | taller-de-drenaje-brasileno | CUR-019 | published |
| CUR-019 | taller-de-manejo-de-complicaciones-postquirurgicas-esteticas | CUR-020 | published |
| **CUR-020** | taller-de-terapia-de-alineacion-estructura-osea | CUR-021 | **draft** |
| CUR-021 | taller-de-drenaje-linfatico-facial | CUR-022 | published |
| CUR-022 | taller-de-masaje-descontracturante | CUR-023 | published |
| CUR-023 | taller-de-depilacion-con-cera | CUR-024 | published |
| CUR-024 | curso-reflexologia-podal | CUR-025 | published |
| CUR-025 | curso-de-cosmetologia-profesional | — | published |
| CUR-026 | taller-de-masaje-tailandes | — | published |
| CUR-027 | curso-de-canalizacion-e-inyectologia | — | published |
| CUR-028 | taller-de-biomagnetismo | — | published |
| CUR-029 | taller-de-masajes-con-piedras-calientes-pindas-herbales-y-parafinoterapia | — | published |
| CUR-030 | taller-de-elaboracion-de-jabones-artesanales | — | published |
| **CUR-031** | taller-de-terapia-de-alineacion-estructura-osea-cur-031 | — | **draft** |
| CUR-032 | taller-de-vendaje-neuromuscular-aplicado-en-pacientes-postoperatorios-y-cicatrices | — | published |
| CUR-033 | curso-taller-de-masaje-deportivo-y-ventosaterapia | — | published |
| CUR-034 | taller-de-lifting-facial-con-maderoterapia | — | published |
| CUR-035 | taller-de-aparatologia-aplicada-a-pacientes-postoperatorios | — | published |
| CUR-036 | taller-de-aparatologia-aplicada-al-masaje-terapeutico | — | published |
| CUR-037 | taller-de-elaboracion-de-cremas-cosmeticas | — | published |
| CUR-038 | taller-de-elaboracion-de-exfoliantes-sales-de-bano-y-bombas-de-bano | — | published |
| CUR-039 | taller-de-elaboracion-de-piezas-en-resina | — | published |
| CUR-040 | taller-de-elaboracion-de-productos-capilares | — | published |

**Totales:** 40 cursos · 38 publicados · 2 draft (CUR-020, CUR-031).

## 3. Reglas de identidad confirmadas

1. **CUR-009 antiguo "Madeoterapia"** es alias histórico de **CUR-008** (Masaje Reductor y Maderoterapia). `legacyIds` de CUR-008 = `["CUR-008", "CUR-009"]`.
2. **Legacy CUR-013** redirige al oficial **CUR-012** (Terapias Alternativas), URL `/curso/terapias-alternativas-vino-chocolate-barro-cafe`.
3. **CUR-013 oficial (Kinesiotape)** vive en **`/curso/taller-de-kinesiotape`**. `/curso/CUR-013` **no** es URL de Kinesiotape.
4. **CUR-020 y CUR-031** permanecen **draft**: fuera de catálogo y sitemap; ruta directa 404.
5. Inscripciones y pagos viajan con `idServicio = sourceId` oficial.
6. **No** se generan IDs internos más allá de CUR-040.

## 4. Documentos relacionados
- Rutas canónicas y redirecciones: `docs/RUTAS_CANONICAS_CURSOS.md`
- Inconsistencias de contenido pendientes de la propietaria: `docs/INCONSISTENCIAS_CONTENIDO_DUENA.md`
- Plan/bitácora de migración: `docs/MIGRACION_40_CURSOS.md`
