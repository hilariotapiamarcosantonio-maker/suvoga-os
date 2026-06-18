# Auditoría de imágenes de cursos — SuVoGa Academia

Inventario real de `public/images/courses/` y de la resolución de imagen por
curso (`imageForCourse` en `src/data/courses.ts`).

## Inventario de archivos

| Rango | Formato | Estado |
|-------|---------|--------|
| CUR-001 … CUR-017 | `.png` | Archivo propio por curso |
| CUR-018 … CUR-025 | `.svg` | Archivo propio por curso |
| CUR-026 … CUR-040 | — | **Sin archivo propio** |

## Hallazgo crítico: duplicación de portada

La función `imageForCourse` devuelve `cur-025.svg` para todo CUR > 25, por lo
que **16 cursos comparten la misma imagen** (`cur-025.svg`): CUR-025 más
CUR-026..CUR-040. Mostrar la misma portada 16 veces rompe la percepción premium.

### Resolución aplicada
- Los cursos con `coverStatus: "pending"` (CUR-026..040) ya **no** muestran la
  imagen compartida: renderizan el **fallback editorial premium** por familia
  (`CourseCover` + `FamilyFallback`), distinto por familia y con motivo,
  eyebrow y monograma. Nunca un rectángulo vacío.
- Los cursos con imagen propia (CUR-001..025) se marcan `provisional` y siguen
  usándola hasta tener una portada definitiva en Google Drive.

## Otros riesgos observados
- **Genéricas / mal asociadas:** las imágenes locales son de stock temático y
  no necesariamente representan el curso exacto → marcadas `provisional`, a
  reemplazar por portadas definitivas curso por curso.
- **Texto incrustado / baja resolución / deformación:** se evita deformación con
  `aspect-[16/10]` (tarjeta) y `aspect-[4/3]` (hero) + `object-cover` y
  `object-position` (focal). El layout reserva el espacio (sin layout shift).
- **Alt text:** todas las portadas (imagen o fallback) exponen `coverAlt`
  descriptivo desde `course-visual-identities.ts`. El fallback usa `role="img"`
  con `aria-label`.
- **Fondos verdes vacíos:** eliminados como portada; el verde solo aparece como
  parte del fallback editorial compuesto.

## Optimización aplicada
- Dimensiones reservadas vía contenedor con aspect-ratio (sin CLS).
- `loading="lazy"` por defecto; `priority`/`eager` solo en el hero de la ficha.
- `decoding="async"` y `onError` → fallback en runtime ante recurso roto.
- `next.config.mjs` con allow-list scoped de Drive (sin wildcard global) para
  futuras portadas remotas optimizadas.

## Recomendación
Subir portadas definitivas a Google Drive y completar `coverImageUrl` /
`coverThumbnailUrl` en `course-visual-identities.ts`, promoviendo cada curso a
`coverStatus: "definitive"`. Prioridad: los 15 cursos hoy en `pending`.
