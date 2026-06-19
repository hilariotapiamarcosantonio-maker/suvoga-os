# Roadmap de cierre - SuVoGa Academia Premium

Fecha de inicio: 2026-06-19

Este roadmap organiza la fase de cierre en bloques pequenos, con commits locales
separados y sin `git push`.

## Base verificada

- Rama inicial: `main`.
- Base local/remota: `0f149d6891726b0eb5b872dcc5cc944c671400f7`.
- Commit visible: `0f149d6 test: complete Suvoga academic presentation QA`.
- Archivos ajenos no rastreados que deben preservarse:
  - `.claude/`
  - `docs/PREMIUM_DESIGN_AUDIT_CHECKLIST.md`
  - `docs/PREMIUM_UI_UX_STANDARD.md`
  - `docs/SUVOGA_10000_USD_UPGRADE_PLAN.md`
  - `docs/SUVOGA_DESIGN_SYSTEM_PLAN.md`

## Bloque A - Auditoria y plan

Estado: completado en documentacion.

Entregables:

- `docs/AUDITORIA_FORMULARIOS_Y_CORREO.md`
- `docs/ROADMAP_CIERRE_SUVOGA_ACADEMIA.md`

Hallazgos principales:

- Contacto general usa `mailto:` y no registra lead.
- Modal de reserva escribe en Sheets via `/api/suvoga/inscriptions`.
- No hay proveedor ni arquitectura de correo.
- Falta validacion servidor robusta, antiabuso e idempotencia.
- Falta campo de correo en el modal de reserva.
- Falta configuracion central de academia/branding/seo/features.
- Facilitadora existe como tipo/componente parcial, pero no como entidad ni ruta.
- Recursos externos estan parcialmente preparados.
- `NEXT_PUBLIC_SITE_URL` existe en codigo, pero no esta en `.env.example`.

Commit sugerido:

`docs: audit Suvoga forms email and template readiness`

## Bloque B - Firma y configuracion central

Objetivo:

- Agregar firma profesional discreta al footer publico.
- Centralizar configuracion base de academia, contacto, SEO y features.
- Mantener copyright principal de SuVoGa.
- Usar `marcoshilario.com` y `lumapremium.com` solo como credito profesional.

Archivos probables:

- `src/config/academy.config.ts`
- `src/config/branding.config.ts`
- `src/config/contact.config.ts`
- `src/config/seo.config.ts`
- `src/config/features.config.ts`
- `src/components/suvoga/Footer.tsx`
- `.env.example`

Validaciones:

- `npm run lint`
- `npx tsc --noEmit`
- Verificacion visual del footer en paginas publicas.
- Confirmar que admin no recibe firma si se decide separar layout publico/admin.

Commits sugeridos:

- `refactor: centralize academy branding contact and seo config`
- `feat: add professional developer credit to public footer`

## Bloque C - Formularios y correo

Objetivo:

- Crear capa desacoplada de email.
- Mejorar validacion cliente/servidor.
- Registrar lead antes de notificar por correo.
- Notificar a `asnamatem@gmail.com`.
- Confirmar al usuario si proporciona correo.
- No perder leads cuando falle correo.

Archivos probables:

- `src/lib/email/email-types.ts`
- `src/lib/email/email-provider.ts`
- `src/lib/email/email-templates.ts`
- `src/lib/email/send-inquiry-notification.ts`
- `src/lib/inquiries/` o equivalente para validacion y normalizacion.
- `src/app/api/suvoga/inscriptions/route.ts`
- `src/components/suvoga/InscriptionModal.tsx`
- `src/components/suvoga/ContactForm.tsx`
- `.env.example`
- `docs/ARQUITECTURA_EMAIL_SUVOGA.md`

Reglas:

- No hardcodear secretos.
- No usar dominios de Luma o Marcos como remitente de SuVoGa.
- No afirmar correo listo para produccion sin probar credenciales y remitente.
- Si Sheets escribe y correo falla, reportar estado parcial sin perder lead.
- Si Sheets falla, no fingir exito.

Validaciones:

- Formulario correcto.
- Datos invalidos.
- Doble envio.
- Falta de API key.
- Fallo simulado de proveedor.
- Fallo simulado de registro.
- Confirmacion al usuario.
- Notificacion interna.

Commit sugerido:

`feat: add resilient inquiry email notification workflow`

## Bloque D - Facilitadora

Objetivo:

- Crear entidad independiente de facilitadores.
- Agregar `/facilitadores` y `/facilitadores/[slug]`.
- Enlazar desde cursos cuando exista informacion suficiente.
- No inventar biografia, titulos, certificaciones ni anos de experiencia.

Datos confirmados:

- Nombre encontrado en contenido: `Sugeidy Volquez Garcia`.

Datos pendientes de propietaria:

- Bio.
- Rol publico exacto.
- Credenciales.
- Institucion.
- Foto real.
- Redes oficiales.

Commit sugerido:

`feat: add dynamic facilitator profiles`

## Bloque E - Plantilla madre

Objetivo:

- Convertir SuVoGa en primera implementacion de una plantilla clonable.
- Extraer hardcodes restantes hacia configuracion.
- Documentar como clonar para otra academia.
- Mantener despliegues y datos aislados por cliente.

Documentos probables:

- `docs/LUMA_ACADEMIA_OS_TEMPLATE_GUIDE.md`
- `docs/CONFIGURACION_NUEVA_ACADEMIA.md`

Commit sugerido:

`refactor: prepare Suvoga as reusable academy template`

## Bloque F - Recursos externos

Objetivo:

- Completar soporte defensivo para portadas, miniaturas, PDFs y videos por URL.
- Normalizar enlaces de Drive.
- Evitar recursos rotos y archivos pesados en el repo.
- Documentar carga de recursos.

Archivos probables:

- `src/lib/course-resource-utils.ts`
- `src/components/suvoga/CoursePdfResource.tsx`
- `src/components/suvoga/YouTubeLiteEmbed.tsx`
- `docs/RECURSOS_EXTERNOS_GOOGLE_DRIVE.md`

Commit sugerido:

`feat: support external course resources and domain readiness`

## Bloque G - Domain readiness

Objetivo:

- Centralizar URL oficial via `NEXT_PUBLIC_SITE_URL`.
- Usar fallback temporal de Vercel actual.
- Preparar `metadataBase`, canonical, sitemap, robots y Open Graph.
- No conectar dominio todavia.

Archivos probables:

- `src/lib/site-url.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/config/seo.config.ts`
- `docs/DOMAIN_READINESS_SUVOGA.md`

Validaciones:

- `/sitemap.xml`
- `/robots.txt`
- canonical por entidad.
- Open Graph base.
- Drafts fuera de sitemap.
- Admin fuera de sitemap.

## Bloque H - QA y documentacion final

Objetivo:

- Ejecutar QA funcional, visual y tecnico.
- Documentar resultados honestos.
- Crear commit final de pruebas.

Comandos minimos:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run validate:courses`
- `npm run test:content-filter`

Rutas a validar:

- `/`
- `/cursos`
- `/curso/[curso-publicado]`
- `/facilitadores`
- `/facilitadores/[slug]`
- `/historias`
- `/comunidad`
- `/contacto`
- `/admin`
- `CUR-020` como 404 publico
- `CUR-031` como 404 publico
- slug inexistente como 404 real

Resoluciones:

- 320
- 375
- 390
- 768
- 1024
- 1440

Commit sugerido:

`test: complete Suvoga closure phase QA`

## Riesgos a mantener visibles

- No hay correo productivo hasta probar credenciales y remitente.
- No hay dominio propio definitivo.
- No se deben inventar datos academicos.
- Los documentos de replicacion antiguos aun hablan de otro CRM y deben
  reemplazarse con guia de Luma Academia OS.
- El middleware de basic auth protege todo el sitio cuando las variables estan
  configuradas; revisar estrategia antes de produccion publica.
- Las escrituras a Sheets no son transaccionales.

## Acciones externas pendientes

Marcos:

- Proveer credenciales de correo o decidir proveedor.
- Probar/verificar remitente cuando exista dominio propio.
- Hacer `git push` manualmente cuando revise commits locales.
- Entregar dominio definitivo de SuVoGa cuando corresponda.

Propietaria:

- Confirmar datos de facilitadora.
- Proveer foto real o aprobar imagen provisional.
- Proveer PDFs, portadas y videos reales.
- Confirmar avales/certificaciones cuando existan dudas editoriales.
