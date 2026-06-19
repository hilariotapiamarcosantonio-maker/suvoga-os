# Arquitectura de email - SuVoGa Academia

Fecha: 2026-06-19

## Estado honesto

La arquitectura de correo queda implementada, pero el envio productivo depende
de credenciales y remitente verificado. No se debe declarar que el correo esta
listo para produccion hasta configurar y probar:

- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `EMAIL_NOTIFICATION_TO`
- remitente verificado por el proveedor

Mientras no exista dominio propio de SuVoGa, no se inventa correo corporativo.
No se usa `lumapremium.com` ni `marcoshilario.com` como remitente de SuVoGa.

## Proveedor elegido

Se preparo soporte para `resend` mediante API HTTP nativa (`fetch`), sin agregar
dependencias.

Motivo:

- Compatible con Vercel.
- Integracion pequena y mantenible.
- Permite mantener una interfaz desacoplada.
- Evita instalar paquetes mientras no existan credenciales reales.

Proveedor por defecto:

- `EMAIL_PROVIDER=disabled`
- No envia correo.
- Devuelve estado `skipped` para que la UI muestre que el registro fue recibido
  pero el correo esta pendiente de configuracion.

## Archivos principales

- `src/lib/email/email-types.ts`
- `src/lib/email/email-provider.ts`
- `src/lib/email/email-templates.ts`
- `src/lib/email/send-inquiry-notification.ts`
- `src/lib/inquiries/inquiry-types.ts`
- `src/lib/inquiries/inquiry-validation.ts`
- `src/lib/inquiries/rate-limit.ts`
- `src/app/api/suvoga/inquiries/route.ts`

## Flujo nuevo

Los formularios publicos envian a:

`POST /api/suvoga/inquiries`

El endpoint:

1. Aplica rate limiting en memoria por IP.
2. Valida honeypot.
3. Valida y normaliza datos.
4. Previene duplicados por `submissionId`.
5. Registra primero la solicitud en Google Sheets mediante las funciones
   existentes.
6. Intenta enviar notificacion interna.
7. Intenta enviar confirmacion al usuario si dejo correo.
8. Devuelve estado honesto:
   - `200` si registro y correo interno se enviaron.
   - `202` si el registro fue correcto pero el correo fue omitido o fallo.
   - `4xx/5xx` si el registro principal falla.

No se modifica `/api/suvoga/inscriptions`.

## Registro en Sheets

Reservas:

- `Directorio_Pacientes`
- `Inscripciones_Citas`
- `Control_Anticipos`

Contacto general:

- `Directorio_Pacientes`

Campos opcionales agregados a la capa de escritura:

- `correo`
- `origen_registro`
- `nota_interna`
- `es_registro_prueba`

Si la hoja no contiene esos encabezados, `appendByHeaders()` los ignora sin
romper la escritura existente.

## Variables

```text
EMAIL_PROVIDER=disabled
EMAIL_API_KEY=
EMAIL_FROM=
EMAIL_REPLY_TO=
EMAIL_NOTIFICATION_TO=asnamatem@gmail.com
```

Para Resend:

```text
EMAIL_PROVIDER=resend
EMAIL_API_KEY=valor-secreto-en-vercel
EMAIL_FROM=SuVoGa Academia <remitente-verificado>
EMAIL_REPLY_TO=asnamatem@gmail.com
EMAIL_NOTIFICATION_TO=asnamatem@gmail.com
```

## Plantillas

Notificacion interna:

`Nueva solicitud de orientación — SuVoGa Academia`

Incluye:

- nombre
- telefono / WhatsApp
- correo
- curso
- mensaje
- fecha y hora
- ruta de origen
- identificador de solicitud
- ID de paciente
- ID de inscripcion cuando aplica

Confirmacion al usuario:

`Hemos recibido tu solicitud — SuVoGa Academia`

No promete tiempos exactos.

## Seguridad

Implementado:

- Validacion servidor.
- Normalizacion basica de telefono y correo.
- Limites de longitud.
- Honeypot.
- Rate limiting en memoria.
- Idempotencia por `submissionId`.
- Escape de HTML en plantillas.
- Logs estructurados sin imprimir payload completo.
- API key solo en servidor.

Limitaciones conocidas:

- Rate limiting e idempotencia en memoria son best-effort en serverless.
- La escritura en Sheets no es transaccional.
- El contacto general se registra como paciente/lead porque no existe tabla
  dedicada de solicitudes.
- La confirmacion al usuario requiere que el visitante proporcione correo.

## Pruebas realizadas

- Validacion pura de `validateInquiryPayload` con caso valido e invalido:
  OK, sin escrituras ni envio.
- `npx tsc --noEmit`: OK.
- `npm run lint`: OK con advertencias preexistentes de `<img>`.
- `npm run validate:courses`: OK.
- `npm run test:content-filter`: OK.
- `npm run build`: OK; incluye `/api/suvoga/inquiries`.

No se ejecuto prueba real de envio porque no hay credenciales ni remitente
verificado. No se ejecuto POST real contra el endpoint para evitar escrituras de
prueba en Google Sheets sin autorizacion explicita.
