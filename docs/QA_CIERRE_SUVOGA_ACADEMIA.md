# QA cierre SuVoGa Academia

Fecha: 2026-06-19

## Estado Git inicial verificado

- Rama inicial: `main`.
- Base remota inicial: `0f149d6 test: complete Suvoga academic presentation QA`.
- No se ejecuto `git push`.
- Los archivos ajenos no rastreados se preservaron fuera de commits:
  - `.claude/`
  - `docs/PREMIUM_DESIGN_AUDIT_CHECKLIST.md`
  - `docs/PREMIUM_UI_UX_STANDARD.md`
  - `docs/SUVOGA_10000_USD_UPGRADE_PLAN.md`
  - `docs/SUVOGA_DESIGN_SYSTEM_PLAN.md`

## Scripts ejecutados

```text
npm run lint
npx tsc --noEmit
npm run build
npm run validate:courses
npm run test:content-filter
```

Resultado:

- TypeScript: OK.
- Build: OK.
- Catalogo: OK, 40 cursos oficiales, 38 publicados.
- Drafts: `CUR-020`, `CUR-031`.
- Content filter: OK, 55 grupos, 0 fallos.
- Lint: OK con advertencias preexistentes de `@next/next/no-img-element`.

## Advertencias conocidas

Lint mantiene advertencias de `<img>` en:

- `src/app/(home)/page.tsx`
- `src/app/historias/page.tsx`
- `src/components/suvoga/CourseCatalogClient.tsx`
- `src/components/suvoga/SocialProofSection.tsx`
- `src/components/suvoga/YouTubeLiteEmbed.tsx`

No son fallos nuevos de esta fase.

## Rutas HTTP verificadas en produccion local

Servidor local:

```text
http://127.0.0.1:3077
```

Resultados:

| Ruta | Estado |
| --- | ---: |
| `/` | 200 |
| `/cursos` | 200 |
| `/curso/master-en-drenaje-linfatico-curso-avanzado` | 200 |
| `/facilitadores` | 200 |
| `/facilitadores/sugeidy-volquez-garcia` | 200 |
| `/historias` | 200 |
| `/comunidad` | 200 |
| `/contacto` | 200 |
| `/admin` | 200 en entorno local actual |
| `/curso/CUR-020` | 404 |
| `/curso/CUR-031` | 404 |
| `/curso/slug-inexistente-qa` | 404 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |

## Correccion de QA aplicada

Durante QA se detecto que `/curso/CUR-020` respondia 308 por una colision entre
un alias legacy y el `sourceId` oficial draft `CUR-020`.

Correccion:

- `src/data/courses/course-index.ts` ahora ignora aliases legacy que colisionan
  con IDs oficiales.
- No se modificaron los JSON originales.
- `CUR-020` y `CUR-031` quedan en 404 publico.

## Formularios

Validado por HTTP:

- `POST /api/suvoga/inquiries` con payload invalido devuelve 400.
- La respuesta incluye errores de nombre, correo, canal de contacto y mensaje.

No se ejecuto POST valido de contacto o reserva porque escribiria en Google
Sheets. La arquitectura fue validada por build/typecheck y por la prueba de
payload invalido sin escritura.

## Correo

La arquitectura de correo esta implementada con proveedor desacoplado.

Estado:

- `EMAIL_PROVIDER=disabled` por defecto.
- No hay credenciales ni remitente verificado en repositorio.
- No se probo envio real.
- No se declara listo para produccion.

Bloqueo externo:

- falta proveedor configurado;
- falta `EMAIL_API_KEY`;
- falta `EMAIL_FROM` verificado;
- falta prueba de notificacion interna;
- falta prueba de confirmacion al usuario.

## Recursos externos

Validado por script Node:

- Drive file URL se convierte a preview.
- Drive folder URL se rechaza.
- Placeholder `example.com` se rechaza.

No se agregaron portadas definitivas, PDFs ni videos reales.

## Dominio

Preparado:

- `NEXT_PUBLIC_SITE_URL`;
- fallback Vercel;
- `metadataBase`;
- sitemap;
- robots;
- canonical/Open Graph de rutas publicas.

No se conecto dominio porque no existe dominio definitivo confirmado.

## Seguridad

- Honeypot en formularios.
- Validacion cliente/servidor.
- Normalizacion de telefono/correo.
- Rate limiting en memoria.
- Idempotencia por `submissionId`.
- API key de correo no expuesta al cliente.
- Logs sin payload completo.
- `/robots.txt` bloquea `/admin` y `/api`.

## Limitaciones honestas

- No se hizo QA visual automatizado por viewport con navegador.
- No se probo envio real de correo.
- No se probo POST valido para evitar escritura en Sheets sin autorizacion.
- No se verificaron permisos publicos de recursos Drive porque no hay URLs
  definitivas.
- `/admin` respondio 200 en local porque depende de variables `CRM_BASIC_AUTH_*`
  del entorno; con credenciales configuradas, middleware aplica Basic Auth.
