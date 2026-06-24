# QA de portadas de cursos — 23 de junio de 2026

Proyecto: **SuVoGa Academia**

Alcance: portadas `CUR-009` a `CUR-040`, catálogo, fichas públicas, estados visuales y fallbacks.
Fuentes de verdad revisadas:

- `docs/REPORTE_AUDITORIA_TEXTOS_E_IMAGENES_2026-06-22.md`
- `public/images/courses/`
- `src/data/course-visual-identities.ts`

## Veredicto

La fase visual de los **38 cursos publicados queda terminada**. Las dos excepciones editoriales continúan fuera del catálogo público.

- `CUR-009` a `CUR-035`, excluyendo `CUR-020` y `CUR-031`, tienen una portada específica y suficientemente relacionada con el curso para continuar como `provisional`.
- `CUR-020` y `CUR-031` permanecen en `draft`, con `coverStatus: "pending"`, sin PNG propio y con fallback editorial.
- `CUR-036` a `CUR-040` recibieron nuevas portadas figurativas, específicas para cada curso, y pasan de `pending`/`requires-regeneration` a `coverStatus: "provisional"`.
- Ninguna portada fue cambiada a `definitive`.
- Los SVG antiguos se conservaron sin modificaciones y ya no son la ruta activa de portada.

## Correspondencia curso ↔ portada

| ID | Curso | Resultado visual | Estado |
|---|---|---|---|
| CUR-009 | Vacummterapia corporal | Equipo de vacumterapia y aplicación corporal reconocible. Corrimiento previo corregido. | Correcta, `provisional` |
| CUR-010 | Masaje terapéutico | Maniobra manual sobre espalda en entorno profesional. | Correcta, `provisional` |
| CUR-011 | Limpieza facial básica y profunda | Cabina facial, lupa y utensilios de limpieza. | Correcta, `provisional` |
| CUR-012 | Terapias alternativas | Ingredientes de vino, chocolate, barro y café en ambiente de spa. | Correcta, `provisional` |
| CUR-013 | Kinesiotape | Aplicación educativa de cinta sobre hombro. | Correcta, `provisional` |
| CUR-014 | Productos de spa | Elaboración y presentación de productos artesanales de spa. | Correcta, `provisional` |
| CUR-015 | Velas artesanales | Velas terminadas y elementos de elaboración. | Correcta, `provisional` |
| CUR-016 | Desintoxicación iónica | Baño iónico de pies y equipo visible. | Correcta, `provisional` |
| CUR-017 | Máquina G5 | Instructora, equipo y cabezales en demostración académica. | Correcta, `provisional` |
| CUR-018 | Drenaje brasileño | Demostración manual supervisada en clase. | Correcta, `provisional` |
| CUR-019 | Complicaciones postquirúrgicas estéticas | Explicación de protocolo con apoyo anatómico y camilla, sin contenido gráfico. | Correcta, `provisional` |
| CUR-020 | Alineación de estructura ósea | Sin portada propia por decisión editorial pendiente. | `draft`, `pending`, fallback |
| CUR-021 | Drenaje linfático facial | Maniobra facial suave y claramente visible. | Correcta, `provisional` |
| CUR-022 | Masaje descontracturante | Técnica manual sobre espalda con estudiantes observando. | Correcta, `provisional` |
| CUR-023 | Depilación con cera | Calentador, cera, espátulas y bandas en estación formativa. | Correcta, `provisional` |
| CUR-024 | Reflexología podal | Demostración sobre pie con mapa de zonas reflejas. | Correcta, `provisional` |
| CUR-025 | Cosmetología profesional | Práctica facial supervisada en aula de cosmetología. | Correcta, `provisional` |
| CUR-026 | Masaje tailandés | Estiramiento asistido reconocible sobre colchoneta. | Correcta, `provisional` |
| CUR-027 | Canalización e inyectología | Brazo de simulación y material clínico organizado; sin punción real. | Correcta, `provisional` |
| CUR-028 | Biomagnetismo | Demostración con elementos aplicados sobre modelo vestido y apoyo anatómico. | Correcta, `provisional` |
| CUR-029 | Piedras calientes, pindas y parafina | Piedras, pindas y recipiente de parafina en estación de trabajo. | Correcta, `provisional` |
| CUR-030 | Jabones artesanales | Taller de formulación con aceites, moldes y jabones terminados. | Correcta, `provisional` |
| CUR-031 | Alineación de estructura ósea | Sin portada propia; posible duplicado o versión de `CUR-020` pendiente de propietaria. | `draft`, `pending`, fallback |
| CUR-032 | Vendaje neuromuscular postoperatorio y cicatrices | Aplicación didáctica sobre modelo anatómico, sin lesión gráfica. | Correcta, `provisional` |
| CUR-033 | Masaje deportivo y ventosaterapia | Maniobra deportiva y copas visibles en uso. | Correcta, `provisional` |
| CUR-034 | Lifting facial con maderoterapia | Instrumentos pequeños de madera y técnica facial supervisada. | Correcta, `provisional` |
| CUR-035 | Aparatología en pacientes postoperatorios | Clase con equipo estético, paciente y estudiantes observando. | Correcta, `provisional` |
| CUR-036 | Aparatología aplicada al masaje terapéutico | Demostración de aparatología sobre masaje en camilla, con estudiantes observando. | Correcta, `provisional` |
| CUR-037 | Cremas cosméticas | Formulación guiada de crema con balanzas, probetas, aceites y materias primas. | Correcta, `provisional` |
| CUR-038 | Exfoliantes, sales y bombas de baño | Taller grupal con mezclas, sales, ingredientes botánicos y bombas terminadas. | Correcta, `provisional` |
| CUR-039 | Piezas en resina | Elaboración protegida con moldes, vertido de resina y piezas botánicas terminadas. | Correcta, `provisional` |
| CUR-040 | Productos capilares | Formulación guiada con aloe, plantas, aceites, balanza y mezcla de producto. | Correcta, `provisional` |

## Duplicados, cruces y archivos

- Los 30 PNG inspeccionados abren correctamente y tienen dimensiones válidas.
- Los 30 PNG tienen SHA-256 diferente: no hay duplicados binarios.
- No se detectaron duplicados visuales ni imágenes cruzadas entre los 30 cursos con PNG propio de `CUR-009` a `CUR-040`.
- `CUR-009` a `CUR-016` ya reflejan la reasignación indicada por la auditoría del 22 de junio.
- Los cinco PNG nuevos `CUR-036` a `CUR-040` abren correctamente, miden `1024 × 1024`, tienen SHA-256 distintos y se renderizan mediante la ruta local esperada.
- Los SVG `cur-018.svg` a `cur-025.svg` siguen presentes. Comparten el placeholder histórico, pero no se eliminaron ni se usan como portada activa.
- No se encontraron archivos rotos. Las imágenes válidas reportaron tamaño natural `1024 × 1024`.

## Recorte y QA responsive

Se revisó el recorte central de todas las portadas válidas en:

- tarjeta `16:10` con `object-fit: cover`;
- ficha `4:3` con `object-fit: cover`;
- anchos de viewport de **320, 390, 768 y 1440 px**.

Resultado:

- No hay desbordamiento horizontal en los cuatro anchos.
- El sujeto, equipo o proceso principal permanece visible en tarjetas y fichas.
- No se requieren ajustes de `focalPosition`.
- En `CUR-017` la tarjeta recorta parte del margen inferior del equipo, pero conserva instructora, máquina y cabezales; no afecta la lectura del curso.
- `CUR-036` a `CUR-040` se verificaron en tarjeta y ficha a **320, 390, 768 y 1440 px**. Las tarjetas mantienen recorte `16:10`; las fichas, `4:3`; todas usan `object-fit: cover` y posición central sin perder el proceso o producto principal.

Rutas verificadas directamente:

- `/cursos`
- `/curso/taller-de-vacummterapia-corporal-estetico` (`CUR-009`)
- `/curso/taller-de-manejo-profesional-de-maquina-g5` (`CUR-017`)
- `/curso/curso-de-cosmetologia-profesional` (`CUR-025`)
- `/curso/taller-de-aparatologia-aplicada-a-pacientes-postoperatorios` (`CUR-035`)
- `/curso/taller-de-aparatologia-aplicada-al-masaje-terapeutico` (`CUR-036`)
- `/curso/taller-de-elaboracion-de-cremas-cosmeticas` (`CUR-037`)
- `/curso/taller-de-elaboracion-de-exfoliantes-sales-de-bano-y-bombas-de-bano` (`CUR-038`)
- `/curso/taller-de-elaboracion-de-piezas-en-resina` (`CUR-039`)
- `/curso/taller-de-elaboracion-de-productos-capilares` (`CUR-040`)
- `/curso/CUR-020` y `/curso/CUR-031` (respuesta pública “Curso no encontrado” por permanecer en `draft`)

## Estado de CUR-020 y CUR-031

Ambos cursos continúan:

- con `publicationStatus: "draft"`;
- fuera de las 38 rutas públicas generadas;
- con `coverStatus: "pending"`;
- sin PNG específico;
- sin promoción a portada provisional o definitiva.

La decisión sobre si son el mismo programa, dos versiones o un intensivo continúa pendiente de Marcos o la propietaria.

## Lógica de resolución de imágenes

La ruta local se resuelve mediante `localCourseCoverPath` en `src/lib/course-presentation.ts`. `src/data/courses.ts`, `courseImage` y el catálogo heredado reutilizan esa función. La búsqueda de referencias no encontró decisiones de extensión `.png` divergentes en la lógica de cursos; la referencia fija de la portada destacada de inicio es una elección explícita y no un resolvedor alternativo.

## Resultados de pruebas

| Comando | Resultado |
|---|---|
| `npm run validate:courses` | **OK** — 40 cursos, 38 publicados, `CUR-020` y `CUR-031` en draft. Advertencia esperada: precio de `CUR-011` pendiente. |
| `npm run test:content-filter` | **OK** — 57 grupos, 0 fallos. Advertencia informativa de Node por módulo sin `type: module`. |
| `npm run lint` | **OK** — 0 errores, 7 advertencias preexistentes de `@next/next/no-img-element`. |
| `npx tsc --noEmit` | **OK** — sin errores. |
| `npm run build` | **OK** — compilación exitosa y 52 páginas estáticas generadas. |
| `git diff --check` inicial | **OK** — sin errores; solo avisos LF → CRLF. |

## Decisión sobre CUR-036 a CUR-040

Las cinco nuevas composiciones alcanzan el criterio mínimo de correspondencia curso ↔ imagen y quedan integradas como portadas `provisional`. Ninguna se declara `definitive` sin aprobación explícita de la propietaria.

1. `coverReview: "requires-regeneration"` se elimina de las cinco identidades;
2. el sitio usa `cur-036.png` a `cur-040.png` tanto en catálogo como en ficha;
3. el recorte central conserva sujetos, herramientas y productos en los cuatro anchos solicitados;
4. los SVG antiguos permanecen en disco y no fueron eliminados;
5. `CUR-020` y `CUR-031` siguen en `pending`, sin portada propia y fuera del catálogo público.

## Separación del trabajo textual previo

Antes de integrar las portadas se revisó el árbol de trabajo. Los cambios textuales anteriores de `scripts/test-content-filter.ts`, `src/app/curso/[id]/page.tsx` y `src/lib/course-presentation.ts`, además de la documentación no rastreada ajena a este QA, se mantuvieron fuera del commit visual. El commit de esta fase contiene únicamente las cinco portadas, el manifiesto visual y este documento de QA.
