# Auditoría de contenido académico — SuVoGa Academia

Complementa `RECLASIFICACION_CONTENIDO_40_CURSOS.md` (detalle por campo) con la
clasificación operativa que usa la capa de presentación.

Principio: **no se reescriben los datos de origen ni `sourceRaw`.** El contenido
contaminado se oculta en presentación; el ambiguo se registra para validación.

## Estados de revisión (`src/data/course-content-review.ts`)
- `confirmed` — correcto tal cual o vía override confirmado.
- `needs-review` — ambiguo; se expone para la propietaria, nunca se inventa.
- `hidden-from-presentation` — ruido contaminado que no debe renderizarse.

## Situaciones registradas

| Curso | Estado | Campos afectados | Nota |
|-------|--------|------------------|------|
| CUR-005 | needs-review | indications, contraindications, legalNotes | indicaciones = contraindicaciones (idénticas) + "¿Qué aprenderás?" + precios |
| CUR-006 | needs-review | indications, contraindications | duplicadas con encabezados administrativos y precios |
| CUR-011 | needs-review | pricing | precio público pendiente de propietaria (no inventado) |
| CUR-020 | needs-review | — | draft por decisión editorial |
| CUR-027 | needs-review | endorsements, competencies | facilitadora/modalidad incrustadas; contenido sanitario |
| CUR-031 | needs-review | materials, endorsements | draft; "Elaborado por" + cargo en materials |
| CUR-037 | needs-review | materials | autoría/cargo + frase promocional en materials |
| CUR-038 | needs-review | materials | "Elaborado por" + cargo en materials |
| CUR-039 | needs-review | materials | "Elaborado por" + cargo en materials |
| CUR-040 | needs-review | materials, certifications | autoría/cargo + posible cruce materials/certifications |

## Cómo se corrige hoy (solo en presentación)
El filtro `cleanList(..., context)` en `src/lib/course-presentation.ts` ya
elimina de la vista, según el contexto de la sección:
- encabezados y marketing en `legalNotes`;
- facilitadora/autoría/cargo en `materials` y `endorsements`;
- precios fuera de `pricing`;
- avales fuera de su sección;
- objetivos duplicados, competencias mezcladas con promoción, etc.

Las menciones legítimas de aval/certificación **sí** se permiten dentro de su
propia sección (contexto `certifications` / `endorsements`).

## No se hace (requiere validación humana)
- No se eliminan datos ambiguos del JSON.
- No se reinterpreta contenido dudoso como hecho.
- No se inventan biografías, títulos, certificaciones, avales, años de
  experiencia, instituciones, testimonios, modalidades, precios ni beneficios.
