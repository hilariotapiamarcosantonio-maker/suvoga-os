# Auditoria de formularios y correo - SuVoGa Academia

Fecha de auditoria: 2026-06-19

## Alcance

Esta auditoria cubre los puntos de captacion visibles, endpoints relacionados,
escrituras a Google Sheets, variables de entorno y estado real del correo.
No se ejecutaron escrituras manuales a Google Sheets y no se probaron
credenciales externas de correo porque todavia no existe proveedor configurado.

## Estado Git al inicio

- Ruta de trabajo autorizada: `G:\suvoga-os\CRM En Sheets - copia\crm-admin`.
- Rama: `main`.
- `HEAD`: `0f149d6891726b0eb5b872dcc5cc944c671400f7`.
- `origin/main`: `0f149d6891726b0eb5b872dcc5cc944c671400f7`.
- Ultimo commit: `0f149d6 test: complete Suvoga academic presentation QA`.
- Archivos ajenos no rastreados preservados:
  - `.claude/`
  - `docs/PREMIUM_DESIGN_AUDIT_CHECKLIST.md`
  - `docs/PREMIUM_UI_UX_STANDARD.md`
  - `docs/SUVOGA_10000_USD_UPGRADE_PLAN.md`
  - `docs/SUVOGA_DESIGN_SYSTEM_PLAN.md`

## Puntos actuales de captacion

| Punto | Archivo | Campos | Destino actual | Sheets | Correo | Riesgo |
| --- | --- | --- | --- | --- | --- | --- |
| Formulario de contacto | `src/components/suvoga/ContactForm.tsx` | `nombre`, `contacto`, `interes`, `mensaje` | Abre `mailto:` a `contactInfo.correo` | No | No hay proveedor; depende del cliente de correo del visitante | Puede mostrar estado positivo aunque el usuario no envie el correo |
| Enlace de correo en contacto | `src/app/contacto/page.tsx` | Ninguno | `mailto:` | No | No hay envio servidor | No queda lead registrado |
| Modal de reserva de curso | `src/components/suvoga/InscriptionModal.tsx` | `nombreCompleto`, `whatsapp`, `cedula`, `provincia`, mas `idServicio` y `montoAnticipo` enviados desde el curso | `POST /api/suvoga/inscriptions` | Si, cuando Google Sheets esta configurado y acepta escritura | No | No tiene email del usuario ni notificacion interna |
| CTA de reserva en hero | `src/components/suvoga/CourseHeroCTA.tsx` | Usa el modal | Modal de reserva | Si, via modal | No | Mismo riesgo del modal |
| CTA sticky de curso | `src/components/suvoga/CourseLandingSignup.tsx` | Usa el modal | Modal de reserva | Si, via modal | No | Mismo riesgo del modal |
| WhatsApp global y contextual | `src/components/suvoga/SuvogaWhatsAppButton.tsx` | Mensaje prellenado | `wa.me` | No | No | Conversacion fuera de la app, sin registro automatico |
| Admin: programar curso | `src/app/admin/AdminClient.tsx` | curso, fecha, hora, cupos | Estado local de React | No | No | No persiste al recargar |
| Admin: crear curso demo | `src/app/admin/AdminClient.tsx` | nombre, precio, anticipo, cupos | `localStorage` demo | No | No | No crea cursos oficiales ni escribe en Sheets |

## Endpoint de reservas

Endpoint: `src/app/api/suvoga/inscriptions/route.ts`

Flujo actual:

1. Recibe JSON.
2. Valida presencia de `idServicio`, `nombreCompleto`, `whatsapp`, `cedula` y
   `provincia`.
3. Lee catalogo con `getCatalogo()`.
4. Si el curso existe, crea paciente con `postPaciente()`.
5. Crea inscripcion y anticipo con `postInscripcion()`.
6. Devuelve `success: true` solo si las escrituras terminaron sin excepcion.

Escrituras actuales:

- `Directorio_Pacientes`, mediante `postPaciente()`.
- `Inscripciones_Citas`, mediante `postInscripcion()`.
- `Control_Anticipos`, mediante `postAnticipo()` llamado dentro de
  `postInscripcion()`.

Manejo de errores actual:

- Si faltan campos, devuelve `400`.
- Si el servicio no existe en el catalogo, devuelve `404`.
- Si Google responde `403`, devuelve un mensaje especifico sobre permisos del
  Sheet.
- Para otros fallos, devuelve `500` con mensaje generico.

Riesgos del endpoint:

- No hay validacion de esquema, longitudes, formato de telefono, formato de
  cedula ni normalizacion robusta.
- No hay honeypot, rate limiting, idempotencia ni prevencion servidor de doble
  envio.
- El cliente evita doble clic con `isLoading`, pero dos requests directos pueden
  duplicar registros.
- Los IDs usan `Date.now()`, suficiente para uso bajo, pero no es una
  idempotencia real.
- No hay transaccion: si `postPaciente()` escribe y luego falla la inscripcion,
  puede quedar un paciente sin fila visible en la tabla principal de
  inscripciones.
- El modal no pide correo, por lo que no puede enviar confirmacion al usuario.
- No se captura ruta de origen, timestamp completo, user agent ni identificador
  estable de solicitud.
- `montoAnticipo` llega desde el cliente; el servidor lo usa si viene presente.
  Debe preferir el valor del catalogo para evitar manipulacion.

## Google Sheets

Lectura:

- `getSuvogaData()` intenta leer Google Sheets.
- Si falla la lectura o faltan credenciales, usa CSV local como fallback.
- La fuente se expone como `google-sheets` o `local-fallback`.

Escritura:

- Las escrituras pasan por `appendByHeaders()`.
- `appendByHeaders()` exige `SPREADSHEET_ID`, `GOOGLE_CLIENT_EMAIL` y
  `GOOGLE_PRIVATE_KEY`.
- Si faltan credenciales, lanza `Google Sheets not configured`.
- No existe fallback local para escrituras publicas, por lo que una reserva no
  debe fingir exito cuando Sheets no esta disponible.

## Estado del correo

Estado actual: ausente.

No se encontro:

- Dependencia de proveedor de correo en `package.json`.
- Variables `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `EMAIL_FROM`,
  `EMAIL_REPLY_TO` o `EMAIL_NOTIFICATION_TO` en `.env.example`.
- Endpoint servidor que envie correos.
- Plantillas HTML/texto plano.
- Confirmacion al usuario.
- Notificacion interna a `asnamatem@gmail.com`.

El formulario de contacto solo prepara un `mailto:`. Eso no equivale a envio
real ni registro de lead.

## Variables de entorno

Variables existentes en `.env.example`:

- `SPREADSHEET_ID`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `CRM_BASIC_AUTH_USER`
- `CRM_BASIC_AUTH_PASSWORD`
- `NEXT_PUBLIC_SUVOGA_WHATSAPP`
- `NEXT_PUBLIC_SUVOGA_EMAIL`
- `NEXT_PUBLIC_SUVOGA_WHATSAPP_MESSAGE`

Desalineacion encontrada:

- `src/lib/site-url.ts` usa `NEXT_PUBLIC_SITE_URL`.
- `.env.example` documenta `NEXT_PUBLIC_APP_URL`.

Variables requeridas para la fase de correo:

- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `EMAIL_NOTIFICATION_TO=asnamatem@gmail.com`
- `NEXT_PUBLIC_SITE_URL`

No deben incluirse secretos reales en el repositorio.

## Seguridad y antiabuso

Estado actual:

- Cliente: campos `required` y bloqueo por `isLoading` en el modal.
- Servidor: solo presencia de campos requeridos.
- Sin honeypot.
- Sin rate limiting.
- Sin idempotencia.
- Sin normalizacion central de telefono/correo.
- Sin limite explicito de longitud.
- Sin escape/plantillas de correo porque no existe envio.
- API key de correo no existe y no se expone al cliente.

## Facilitadores

Estado actual:

- Existe `FacilitatorProfile` dentro de `src/data/courses/course-types.ts`.
- Existe `FacilitatorCard`.
- El componente no renderiza nada si `verified !== true`.
- No existe entidad global reutilizable de facilitadores.
- No existen rutas `/facilitadores` ni `/facilitadores/[slug]`.
- Los cursos aun conservan `publicCopy.facilitator` como texto simple.

Dato confirmado encontrado en contenido de cursos: `Sugeidy Volquez Garcia`
aparece como facilitadora en varios cursos. Cargos, biografia, credenciales,
foto y redes requieren confirmacion de la propietaria antes de publicarse.

## Configuracion, dominio y metadata

Estado actual:

- Marca minima centralizada en `src/lib/brand.ts`.
- Contacto publico centralizado en `src/lib/suvoga-contact.ts` y
  `src/data/contact.ts`.
- `metadataBase` depende de `getSiteUrl()`.
- `getSiteUrl()` acepta `NEXT_PUBLIC_SITE_URL`, luego variables de Vercel, y
  finalmente `http://localhost:3000`.
- Falta centralizar `academy`, `branding`, `seo`, `features` y `navigation`.
- El fallback de sitio no es la URL actual de produccion
  `https://suvoga-os-tjaa.vercel.app`.

Sitemap:

- Actualmente incluye `/` y los cursos publicados.
- No incluye todavia `/cursos`, `/historias`, `/comunidad`, `/contacto` ni
  futuras rutas de facilitadores.
- No incluye admin.

## Recursos externos

Estado actual:

- Existe `src/lib/course-resource-utils.ts` para URLs HTTP, Drive y YouTube.
- Existe `CourseCover` con fallback editorial.
- Existe `CoursePdfResource`, que omite URLs invalidas.
- Existe `YouTubeLiteEmbed`, que carga iframe al hacer clic y usa
  `youtube-nocookie.com`.
- `next.config.mjs` limita imagenes remotas a Google Drive / Googleusercontent,
  sin wildcard global.

Pendientes:

- Texto del PDF debe alinearse con "Ver programa en PDF".
- `CoursePdfResource` puede usar `toDrivePreviewUrl()` para normalizar enlaces
  de Drive.
- No hay URLs reales de PDF/video cargadas en los cursos.

## Dependencias

Dependencias actuales relevantes:

- Next 14.2.15
- React 18
- `googleapis`
- `server-only`
- `lucide-react`
- No hay SDK de correo.
- No hay libreria de validacion de esquema como `zod`.

Decision para el siguiente bloque de correo:

- Crear primero una interfaz desacoplada de proveedor.
- Evitar hardcodear proveedor en la logica de negocio.
- Si se instala una dependencia, debe ser minima, compatible con Vercel y
  documentada.
- No afirmar produccion de correo hasta probar credenciales y remitente.

## Validaciones de linea base

Comandos ejecutados sin modificar datos:

- `npm run validate:courses`
  - OK.
  - 40 cursos oficiales.
  - 38 publicados.
  - Draft/revision: `CUR-020`, `CUR-031`.
  - Advertencia conocida: `CUR-011` precio publico pendiente de propietaria.
- `npm run test:content-filter`
  - OK.
  - 55 grupos de chequeo, 0 fallos.
  - Advertencia de Node por `type: module` ausente en `package.json`.
- `npm run lint`
  - OK con advertencias existentes sobre uso de `<img>`.
- `npx tsc --noEmit`
  - OK.

## Conclusiones

1. La reserva publica registra en Sheets cuando Sheets esta operativo, pero no
   envia correo.
2. El contacto general no registra nada; solo abre `mailto:`.
3. No existe arquitectura de correo ni proveedor configurado.
4. El sistema no pierde una reserva si el correo falla porque no hay correo, pero
   cuando se implemente debe mantener el registro aunque falle la notificacion.
5. La escritura a Sheets no es transaccional y puede dejar datos parciales ante
   fallos intermedios.
6. Falta validacion servidor robusta y proteccion antiabuso.
7. Falta correo del usuario en el modal para confirmacion.
8. Falta centralizar configuracion de academia/branding/seo/features para
   convertir SuVoGa en plantilla madre.
