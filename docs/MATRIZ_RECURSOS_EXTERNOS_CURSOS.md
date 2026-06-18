# Matriz de recursos externos — SuVoGa Academia

Las portadas, PDFs y videos vivirán en **Google Drive / YouTube**. La app solo
consume enlaces; no se almacenan archivos pesados en el repositorio.

## Estado actual (todos los 40 cursos)

| Recurso | Campo | Estado hoy | Comportamiento |
|---------|-------|------------|----------------|
| Portada full | `coverImageUrl` (identity) | pendiente en los 40 | Ficha usa imagen local (CUR-001..025) o fallback (CUR-026..040) |
| Miniatura | `coverThumbnailUrl` (identity) | pendiente en los 40 | Tarjeta usa imagen local o fallback |
| PDF programa | `publicCopy.pdfUrl` / `pdf_drive_url` | 0 cursos con enlace | Botón "Ver programa en PDF" se **omite** si no hay URL válida |
| Video | `publicCopy.videoUrl` / `youtube_url` | 0 cursos con enlace | Embed YouTube-lite solo si la URL es válida |

## Reglas de consumo (`src/lib/course-resource-utils.ts`)
- `isValidHttpUrl` — descarta URLs vacías o malformadas.
- `isGoogleDriveUrl` / `getDriveFileId` — reconoce enlaces de Drive y extrae id.
- `toDriveDirectImageUrl` — convierte enlace de Drive a URL de visualización
  directa para `<img>` (no concede permisos; el archivo debe estar compartido).
- `toDrivePreviewUrl` — enlace de previsualización del PDF (abre, no descarga).
- `detectProvider` — etiqueta `google-drive` | `youtube` | `external`.
- `resolveCover` — remoto → local → fallback.

## Estados por recurso (`ExternalCourseResource`)
`definitive` | `provisional` | `pending` | `invalid`.

## Seguridad
- No se exponen enlaces privados ni permisos internos.
- No se asume que una URL de Drive sea pública.
- No se renderizan recursos con URL inválida (sin controles rotos).
- No se modifica Google Drive desde la app.

## Cómo añadir recursos (curso por curso, sin tocar componentes)
1. **Portada:** completar `coverImageUrl` y `coverThumbnailUrl` en
   `src/data/course-visual-identities.ts` y cambiar `coverStatus` a
   `"definitive"`.
2. **PDF:** poblar `pdfUrl` del curso con el enlace compartido de Drive.
3. **Video:** poblar `videoUrl` con el enlace de YouTube.

## Pendientes
- Portadas definitivas: 40 (prioridad: 15 en `pending`, CUR-026..040).
- PDFs: 40. Videos: 40. (Se enlazan cuando estén disponibles en Drive/YouTube.)
