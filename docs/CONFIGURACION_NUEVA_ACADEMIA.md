# Configuracion de una nueva academia

Fecha: 2026-06-19

Esta guia describe como clonar SuVoGa Academia hacia una nueva academia usando
la arquitectura actual de Luma Academia OS. No incluye secretos.

## 1. Crear copia aislada

1. Crear un nuevo repositorio o una nueva copia controlada del proyecto.
2. Mantener un despliegue independiente por cliente.
3. No reutilizar credenciales, spreadsheet ni dominio de SuVoGa.
4. Confirmar que el nuevo repo no contiene archivos `.env.local` del cliente
   anterior.

## 2. Cambiar configuracion de academia

Editar `src/config/academy.config.ts`:

- `id`
- `slug`
- `legalName`
- `publicName`
- `shortName`
- `description`
- `locale`
- `timezone`
- `currency`
- `country`
- `organization`
- `facilitatorDefaults`

No inventar certificaciones, avales ni datos academicos.

## 3. Cambiar marca

Editar `src/config/branding.config.ts`:

- `logoText`
- `productName`
- `parentBrand`
- `navigationTagline`
- `tagline`
- `description`
- colores;
- tipografias;
- radios;
- sombras;
- favicon;
- Open Graph image;
- footer;
- credito profesional.

Los enlaces de Marcos Hilario y Luma Premium son creditos profesionales, no
dominios de la academia cliente.

## 4. Cambiar contacto

Editar `src/config/contact.config.ts`:

- telefono visible;
- numero tecnico de WhatsApp;
- correo de recepcion;
- mensaje general de WhatsApp;
- ubicacion;
- horario;
- redes sociales confirmadas.

Si una red social no esta confirmada, dejarla como pendiente. No crear links
placeholder que parezcan cuentas oficiales.

## 5. Variables de entorno

Crear variables propias del cliente:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_URL` solo si se mantiene compatibilidad legacy;
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `CRM_BASIC_AUTH_USER`
- `CRM_BASIC_AUTH_PASSWORD`
- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `EMAIL_NOTIFICATION_TO`

No commitear valores sensibles.

## 6. Spreadsheet o base de datos

Cada academia necesita un spreadsheet propio o una base de datos propia.

Pasos minimos:

1. Copiar la estructura de tabs necesaria.
2. Compartir el spreadsheet con la cuenta de servicio del cliente.
3. Configurar el nuevo `GOOGLE_SHEETS_SPREADSHEET_ID`.
4. Probar lectura de catalogo.
5. Probar escritura con un registro de prueba autorizado.

No cambiar IDs de SuVoGa dentro de esta implementacion.

## 7. Cursos

Para cargar cursos:

1. Crear o importar el catalogo oficial del cliente.
2. Validar slugs, precios, modalidades y estados.
3. Marcar drafts como no publicos.
4. Mantener `sourceRaw` o equivalente para trazabilidad.
5. Ejecutar `npm run validate:courses`.
6. Ejecutar `npm run test:content-filter`.

No publicar cursos con fechas, precios o avales no confirmados.

## 8. Facilitadores

Editar `src/data/facilitators.ts`:

- `id`
- `slug`
- `name`
- `role`
- datos confirmados;
- `verified`;
- `provisionalPhoto`.

No agregar biografias, titulos, anos de experiencia ni credenciales sin
confirmacion del propietario.

## 9. Recursos externos

Usar URLs externas para:

- portada grande;
- miniatura;
- PDF;
- video de YouTube.

Verificar que los enlaces sean publicos antes de declararlos listos. No abrir
`remotePatterns` con wildcard global.

## 10. Dominio

Cuando exista dominio propio:

1. Configurar `NEXT_PUBLIC_SITE_URL`.
2. Revisar `metadataBase`, canonicals, sitemap y Open Graph.
3. Configurar DNS y Vercel en una fase separada.
4. Probar rutas publicas, formularios y correo.

No usar `lumapremium.com` ni `marcoshilario.com` como dominio de una academia.

## 11. Correo

Configurar proveedor y remitente verificado:

1. Crear dominio o remitente autorizado.
2. Configurar SPF/DKIM si aplica.
3. Completar variables `EMAIL_*`.
4. Probar notificacion interna.
5. Probar confirmacion al usuario.
6. Probar fallo del proveedor sin perder el lead.

Hasta completar esas pruebas, el correo no debe marcarse como listo para
produccion.

## 12. Despliegue y QA

Antes de publicar:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run validate:courses`
- `npm run test:content-filter`

Validar rutas publicas, admin, drafts 404, formulario valido, formulario
invalido, doble envio, sitemap, metadata, mobile y desktop.
