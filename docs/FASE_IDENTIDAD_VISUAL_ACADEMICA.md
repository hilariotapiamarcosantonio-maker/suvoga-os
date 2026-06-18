# Fase: Identidad Visual y Autoridad Académica — SuVoGa Academia

Objetivo: elevar la identidad visual individual de cada curso, la jerarquía
editorial y la autoridad académica hasta un nivel premium, sin alterar la
operación existente (Sheets, IDs, inscripciones, pagos, API, rutas legacy).

Esta fase prepara el terreno para que el acabado final (animaciones,
microinteracciones, navegación cinematográfica) se aplique después.

## Qué se implementó

### 1. Capa editorial segura (no destructiva)
- `src/data/course-content-review.ts` — registro de revisión con `ReviewStatus`
  (`confirmed` | `needs-review` | `hidden-from-presentation`). Documenta las
  ambigüedades conocidas (CUR-005/006 duplicados, autoría incrustada en
  CUR-027/031/037-040, precio pendiente en CUR-011) sin reinterpretarlas.
- `src/data/course-editorial-overrides.ts` — overrides **solo confirmados**
  (hoy vacío por diseño). Las correcciones inseguras NO van aquí.
- `sourceRaw` y los JSON de curso permanecen intactos. La limpieza visual la
  sigue haciendo el filtro de presentación (`src/lib/course-presentation.ts`).

### 2. Sistema visual por familias
- `src/data/course-visual-families.ts` — 9 familias tipadas
  (`masters-diplomados`, `masoterapia`, `drenaje-postoperatorio`,
  `estetica-aparatologia`, `facial-cosmetologia`, `terapias-complementarias`,
  `cosmetica-artesanal`, `emprendimiento`, `tecnica-sanitaria`) con dirección
  fotográfica, textura, iluminación, composición, iconografía, acento cromático,
  overlay, tipografía, foco, fallback y tono editorial. Todas dentro de la marca
  SuVoGa (verde profundo, crema, lino, dorado discreto).

### 3. Identidad individual de los 40 cursos
- `src/data/course-visual-identities.ts` — una entrada por CUR-001..CUR-040 con
  familia, eyebrow, `primaryBenefit` (derivado de contenido confirmado, sin
  inventar beneficios médicos), `coverAlt`, motivo y `coverStatus`
  (`definitive` | `provisional` | `pending`). IDs y estados de publicación no
  cambian; CUR-020 y CUR-031 siguen en draft.

### 4. Portadas y fallback editorial premium
- `src/components/suvoga/CourseCover.tsx` — resuelve remoto (Drive) → imagen
  local → **fallback editorial premium** (gradiente de familia + motivo + chip
  + monograma). Nunca un rectángulo verde vacío ni un placeholder repetido 16
  veces. Maneja error de carga en runtime (vuelve al fallback).
- `src/lib/course-resource-utils.ts` — validación de URLs, detección y
  transformación de enlaces de Google Drive/YouTube, sin asumir permisos
  públicos ni exponer IDs privados.
- `next.config.mjs` — allow-list scoped de imágenes remotas de Drive (sin
  wildcard global) listo para portadas definitivas.

### 5. Tarjetas y fichas elevadas
- Tarjeta: eyebrow de familia, beneficio principal, portada/fallback, CTA único
  "Ver programa". Filtros, búsqueda, slugs y accesibilidad intactos.
- Ficha: eyebrow de familia + beneficio principal en el hero, portada resiliente,
  sección de **Avales** (solo si hay endorsements confirmados), navegación
  interna actualizada. Sin secciones vacías ni duplicación.

## Almacenamiento externo (Google Drive / YouTube)
La app **solo consume enlaces**. No se guardan PDFs ni portadas pesadas en el
repositorio; las tarjetas usarán `coverThumbnailUrl` y las fichas
`coverImageUrl`. Si no hay recurso válido, se omite el control o se usa el
fallback. Ver `docs/MATRIZ_RECURSOS_EXTERNOS_CURSOS.md`.

## Lo deliberadamente NO modificado
Google Sheets, Spreadsheet ID, IDs CUR-001..040, inscripciones, pagos,
`/api/suvoga/inscriptions`, credenciales, rutas legacy, redirects 308,
`sourceRaw`, comportamiento administrativo, carpetas hermanas, protección Git.

## Pendiente de confirmación humana
- Portadas definitivas (enlaces Drive) por curso.
- Perfil enriquecido de facilitadora (foto/bio/credenciales verificadas).
- Testimonios verificados por curso.
- Reclasificación final de campos contaminados (ver `RECLASIFICACION_CONTENIDO_40_CURSOS.md`).
