# INCONSISTENCIAS DE CONTENIDO — Requieren decisión de la propietaria

> Estas observaciones surgen del documento canónico `docs/source/SuVoGa_Academia_Premium_Contenido_Saneado.md`.
> **No se ha decidido nada de forma automática.** Nada se publica hasta que se resuelvan.
> Cada ítem cita la línea exacta del documento fuente.

---

## 1. Duplicado CUR-020 ⇄ CUR-031 — Alineación Estructural Ósea  `needs_owner_review`

Ambos describen el **mismo taller** ("Terapia de Alineación Estructura Ósea") pero con datos distintos:

| | CUR-020 (línea 2115) | CUR-031 (línea 4683) |
|---|---|---|
| Cuerpo | "**Descripción editable**" (placeholder, sin temario propio) + objetivo general | Temario completo (5 módulos), prácticas, materiales, certificación |
| Duración | 8 a 12 horas | 8 horas |
| Miembros ASNaMaTeM | RD$2.500 | RD$3.000 |
| Público general | RD$3.000 | RD$4.000 |
| Reservación | RD$1.000 | RD$1.000 |

**Acción:** se conservan **ambos** contenidos (no se elimina ninguno). Ambos quedan marcados `needs_owner_review`.
**Pregunta a la propietaria:** ¿son (a) el mismo taller en dos versiones, (b) un taller completo (CUR-031) y un intensivo/resumen (CUR-020), o (c) un duplicado accidental que debe fusionarse? Indique además qué **precio y duración** son los vigentes.

---

## 2. Categorías en placeholder `[Categoría]`  `needs_owner_review`

Estos cursos traen la categoría sin definir en el documento (`**Categoría Actual:** [Categoría]`):

| sourceId | Curso | Línea |
|---|---|---|
| CUR-015 | Elaboración de Velas Artesanales | 1077 |
| CUR-017 | Manejo Profesional de Máquina G5 | 1356 |
| CUR-019 | Complicaciones Postquirúrgicas Estéticas | 2113 |
| CUR-021 | Drenaje Linfático Facial | 2334 |
| CUR-022 | Masaje Descontracturante | 2521 |
| CUR-023 | Depilación con Cera | 2767 |
| CUR-024 | Reflexología Podal | 2971 |

**Acción propuesta (a confirmar):** asignar la categoría pública según la taxonomía de la Fase 6 (p. ej. CUR-015 → *Cosmética artesanal*; CUR-019 → *Drenaje y postoperatorio*; CUR-021 → *Facial y cosmetología*). **No se publicará `[Categoría]`.** Confirmar las asignaciones.

---

## 3. Cursos con "Descripción editable" (placeholder)  `needs_owner_review`

El documento trae literalmente `[Descripción editable: Ingrese aquí los detalles...]` en:

| sourceId | Curso | Línea |
|---|---|---|
| CUR-015 | Elaboración de Velas Artesanales | 1079 |
| CUR-017 | Manejo Profesional de Máquina G5 | 1358 |
| CUR-019 | Complicaciones Postquirúrgicas Estéticas | 2113 |
| CUR-020 | Alineación Estructura Ósea | 2117 |
| CUR-023 | Depilación con Cera | 2769 |
| CUR-024 | Reflexología Podal | 2973 |

**Acción:** **nunca** se mostrará "Descripción editable" en público. Se construirá una descripción pública usando **solo** el objetivo general y el temario real disponibles en cada ficha, **sin inventar beneficios**. El texto original se conserva en `sourceRaw`.

---

## 4. Fechas / horarios pendientes  (no se inventan)

| sourceId | Curso | Falta | Línea |
|---|---|---|---|
| CUR-007 | Radiofrecuencia Indiba | **Fecha y horario** vacíos | 257, 297–298 |
| CUR-014 | Elaboración de Productos de Spa | **Fecha** vacía (horario sí: 9:30 AM–4:00 PM) | 1048 |

**Acción:** mostrar **"Próxima fecha por anunciar"**; el campo queda listo para Google Sheets/admin. No se inventan fechas.

---

## 5. Cursos que requieren revisión legal  `requiresLegalReview`

| sourceId | Curso | Motivo | Línea (encabezado) |
|---|---|---|---|
| CUR-019 | Manejo de Complicaciones Postquirúrgicas Estéticas | Atención postquirúrgica | 1832 |
| CUR-027 | Canalización e Inyectología | **Procedimiento regulado / invasivo** | 3728 |
| CUR-032 | Vendaje Neuromuscular en Pacientes Postoperatorios y Cicatrices | Atención postoperatoria | 4768 |
| CUR-035 | Aparatología Aplicada a Pacientes Postoperatorios | Atención postoperatoria | 5221 |

**CUR-027** debe mostrar explícitamente: dirigido a personal autorizado; sujeto a la legislación local; práctica supervisada; **no habilita por sí solo para ejercer fuera del marco legal**.

### Terapias complementarias — disclaimers obligatorios (no son afirmaciones médicas)

| sourceId | Curso | Línea |
|---|---|---|
| CUR-016 | Desintoxicación Iónica | 1191 |
| CUR-028 | Biomagnetismo | 3945 |

Mantener notas de: **no sustituye diagnóstico médico**, **no sustituye tratamiento médico**, **no promete curación**, **sin resultados garantizados**. No se elimina el contenido original, pero no se convierte en afirmaciones médicas comerciales absolutas.

---

## 6. Choques de nombre / contenido entre sistema actual y documento oficial  `needs_owner_review`

### 6.1 — ID antiguo CUR-008 "Maderoterapia" vs oficial "Masaje Reductor y Maderoterapia"
El curso oficial CUR-008 amplía el alcance (incluye masaje reductor). Es el mismo curso con alcance actualizado al oficial; las inscripciones históricas con `idServicio` CUR-008 siguen resolviéndose a este curso. *Recomendación: sí, mismo curso, contenido actualizado al oficial.*

### 6.2 — ID antiguo CUR-009 "Madeoterapia" (duplicado/typo)
No existe en el documento oficial. Es una variante mal escrita de Maderoterapia. En la arquitectura vigente queda como **alias histórico (`legacyId`) de CUR-008**: `/curso/CUR-009` redirige al slug de *Masaje Reductor y Maderoterapia*. Confirmar si tuvo inscripciones (ver verificación en `MIGRACION_40_CURSOS.md` §Sheets).

### 6.3 — ID antiguo CUR-015 "Jabones Artesanales & Productos de Spa" vs oficial CUR-014 "Elaboración de Productos de Spa"
El sistema mezcla **jabones + productos de spa**. En el documento oficial son cursos **separados**: *Productos de Spa* = CUR-014 y *Jabones Artesanales* = CUR-030. **Pregunta:** ¿la inscripción histórica de CUR-015 corresponde a "Productos de Spa", a "Jabones", o a un combo? De ello depende a cuál oficial se ancla.

### 6.4 — ID antiguo CUR-023 "Masaje Desestructurante" vs oficial CUR-022 "Masaje Descontracturante"
Nombres distintos. Además, la ficha del sistema agrupa 5 técnicas (relajante, descontracturante, piedras, ventosas, parafina), mientras el oficial CUR-022 es específico de descontracturante. Confirmar el alcance vigente.

---

## 7. Datos que NO se modificarán sin confirmación (Fase 5)

Se normalizará solo presentación (ortografía, tildes, mayúsculas, formato monetario, viñetas). **No** se tocará: precios, número de clases, duración, requisitos, planes de pago, certificaciones, avales, contraindicaciones, contenido técnico, restricciones, ni el nombre de la facilitadora.

- **Facilitadora (constante en el documento):** Sugeidy Vólquez García — *Directora de SuVoGa Escuela y Centro de Masajes*.
- **Aval institucional:** Asociación Nacional de Masajistas, Terapeutas Manuales y Afines (ASNaMaTeM) + SuVoGa Escuela y Centro de Masajes.
- **Nombre legal "Escuela y Centro de Masajes":** se conserva como contenido original en certificaciones/atribuciones hasta que la propietaria confirme el nombre legal definitivo (ver Fase 3 del plan).
